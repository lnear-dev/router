import { TemplateResult, html } from 'lit-html';
import { Context } from './Context.js';
import { RouterPluginInterface } from './Plugin';
import { createLogger } from '@lnear/utils';
export const log = createLogger('router');

// This function will resolve a path with whatever Base URL was passed to the vite build process.
// Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
// If no arg is passed to this function, it will return the base URL.

const baseURL: string = (import.meta as any).env.BASE_URL;
export function resolveRouterPath(unresolvedPath?: string) {
  var resolvedPath = baseURL;
  if (unresolvedPath) resolvedPath = resolvedPath + unresolvedPath;
  return resolvedPath;
}

export interface Config {
  fallback?: string;
  plugins?: RouterPluginInterface[];
  routes: RouteDefinition[];
}

export type Render = (context: Context) => TemplateResult<1>;

export interface RouteInfo {
  path: string;
  title: string | ((context: Partial<Context>) => string);
}
export interface RouteDefinition extends RouteInfo {
  render(context: Context): TemplateResult<1>;
  plugins?: RouterPluginInterface[];
}

export interface Route extends RouteDefinition {
  urlPattern?: any;
}
export class RouteEvent extends Event {
  constructor(public context: Context) {
    super('route-changed');
  }
}

export class Router extends EventTarget {
  public context: Context = {
    params: {},
    query: {},
    title: '',
    url: new URL(window.location.href),
  };
  private routeMap: Map<string, Route> = new Map(); //for faster route matching
  private routes: Route[] = [];
  public route: Route | null = null;

  public addRoute(route: RouteDefinition) {
    const r = {
      ...route,
      // @ts-ignore
      urlPattern: new URLPattern({
        pathname: route.path,
        baseURL: window.location.href,
        search: '*',
        hash: '*',
      }),
    };
    this.routeMap.set(route.path, r);
    this.routes.push(r);
  }
  constructor(public config: Config) {
    super();
    for (const route of config.routes) this.addRoute(route);
    this.init();
  }

  init() {
    queueMicrotask(() => {
      this.navigate(new URL(window.location.href), { replace: true });
    });
    window.addEventListener('popstate', this._onPopState);
    window.addEventListener('click', this._onAnchorClick);
    log('Initialized routes', this.routes);
  }

  uninstall() {
    window.removeEventListener('popstate', this._onPopState);
    window.removeEventListener('click', this._onAnchorClick);
  }

  get url() {
    return new URL(window.location.href);
  }

  get fallback() {
    return new URL(
      this.config?.fallback ||
      this.baseUrl.href.substring(window.location.origin.length),
      this.baseUrl
    );
  }

  get baseUrl() {
    return new URL('./', document.baseURI);
  }

  public render(): TemplateResult<1> {
    log(
      `Rendering route ${this.context.url.pathname}${this.context.url.search}${this.context.url.hash}`,
      { context: this.context, route: this.route }
    );
    const route = this.route;
    if (route) return route.render?.(this.context);
    return html`<h1>404</h1>`;
  }

  private _matchRoute(url: URL): Route | null {
    for (const route of this.routes) {
      const match = route.urlPattern.exec(url);
      if (match) {
        const { title } = route;
        const query = Object.fromEntries(new URLSearchParams(url.search));
        const params = match?.pathname?.groups ?? {};
        this.context = {
          url,
          title:
            typeof title === 'function' ? title({ params, query, url }) : title,
          params,
          query,
        };
        return route;
      }
    }
    log(`No route matched for ${url.pathname}${url.search}${url.hash}`, url);
    return null;
  }

  private _notifyUrlChanged() {
    this.dispatchEvent(new RouteEvent(this.context));
  }

  private _onPopState = () => {
    this.navigate(new URL(window.location.href), { backNav: true });
  };

  private _onAnchorClick = (e: MouseEvent) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }

    const a = e.composedPath().find((el) => {
      if (el instanceof HTMLAnchorElement) {
        return el;
      }
    }) as HTMLAnchorElement;
    if (!a || !a.href) return;

    const url = new URL(a.href);

    if (this.url.href === url.href) return;
    if (url.host !== window.location.host) return;
    if (a.hasAttribute('download') || a.href.includes('mailto:')) return;

    const target = a.getAttribute('target');
    if (target && target !== '' && target !== '_self') return;

    e.preventDefault();
    this.navigate(url);
  };

  private _collectPlugins(route: Route | null) {
    return [...(this.config?.plugins ?? []), ...(route?.plugins ?? [])];
  }

  /**
   * @param url The URL to navigate to.
   * @param options An options object to configure the navigation. The backNav property specifies whether the navigation is a backward navigation, which doesn't push the navigation into browser nav history.
   */
  async navigate(
    url: URL | string,
    options: { backNav?: boolean; replace?: boolean } = {
      backNav: false,
      replace: false,
    }
  ) {
    if (typeof url === 'string') {
      url = new URL(url, this.baseUrl);
    }

    let route = this._matchRoute(url) || this._matchRoute(this.fallback);
    log(`Navigating to ${url.pathname}${url.search}${url.hash}`, {
      context: this.context,
      route: this.route,
    });

    /** @type {RouterPluginInterface[]} */
    let plugins: RouterPluginInterface[] = this._collectPlugins(route);

    for (const plugin of plugins) {
      try {
        const result = plugin?.shouldNavigate?.(this.context);
        if (result) {
          const condition = result.condition();
          if (!condition) {
            url = new URL(result.redirect, this.baseUrl);
            route = this._matchRoute(url) || this._matchRoute(this.fallback);
            plugins = this._collectPlugins(route);
            log('Redirecting', { context: this.context, route: this.route });
          }
        }
      } catch (e) {
        log(
          `RouterPluginInterface "${plugin.name}" error on shouldNavigate hook`,
          e
        );
        throw e;
      }
    }

    this.route = route;

    if (!this.route) {
      throw new Error(`[ROUTER] No route or fallback matched for url ${url}`);
    }

    for (const plugin of plugins) {
      try {
        plugin?.beforeNavigation?.(this.context);
      } catch (e) {
        log(
          `RouterPluginInterface "${plugin.name}" error on beforeNavigation hook`,
          e
        );
        throw e;
      }
    }

    if (options?.replace) {
      window.history.replaceState(
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      );
    } else if (!options.backNav) {
      window.history.pushState(
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      );
    }

    document.title = this.context.title?.toString() || '';
    this._notifyUrlChanged();

    for (const plugin of plugins) {
      try {
        plugin?.afterNavigation?.(this.context);
      } catch (e) {
        log(
          `RouterPluginInterface "${plugin.name}" error on afterNavigation hook`,
          e
        );
        throw e;
      }
    }
  }
}

