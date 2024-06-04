import { TemplateResult } from 'lit-html';

export declare class AppNamePlugin extends RouterPlugin {
    protected static readonly _name: string;
    private __name;
    get name(): string;
    constructor(name: string);
    beforeNavigation(context: any): void;
}

export declare class CheckServiceWorkerUpdatePlugin extends RouterPlugin {
    protected static readonly _name: string;
    beforeNavigation(_context: Context): void;
}

export declare interface Config {
    fallback?: string;
    plugins?: RouterPluginInterface[];
    routes: RouteDefinition[];
}

declare interface Context {
    title?: string;
    query: Record<string, string>;
    params: Record<string, string>;
    url: URL;
    [key: string]: any;
}

export declare class DataPlugin extends RouterPlugin {
    private promise;
    protected static readonly _name: string;
    constructor(promise: (context: Context) => Promise<any>);
    beforeNavigation(context: Context): Promise<void>;
}

export declare class LazyImportPlugin extends LazyPlugin {
    protected static readonly _name: string;
    constructor(source: string);
}

export declare class LazyPlugin extends RouterPlugin {
    private fn;
    protected static readonly _name: string;
    constructor(fn: any);
    beforeNavigation(context: Context): void;
}

export declare const log: any;

export declare class OfflinePlugin extends RouterPlugin {
    private offlineRoute;
    protected static readonly _name: string;
    constructor(offlineRoute?: string);
    shouldNavigate(_context: Context): {
        condition: () => boolean;
        redirect: string;
    };
}

export declare class RedirectPlugin extends RouterPlugin {
    private path;
    protected static readonly _name: string;
    constructor(path: string);
    shouldNavigate(_context: Context): {
        condition: () => boolean;
        redirect: string;
    };
}

export declare type Render = (context: Context) => TemplateResult<1>;

export declare class ResetFocusPlugin extends RouterPlugin {
    protected static readonly _name: string;
    afterNavigation(context: Context): void;
}

export declare function resolveRouterPath(unresolvedPath?: string): string;

export declare interface Route extends RouteDefinition {
    urlPattern?: any;
}

export declare interface RouteDefinition extends RouteInfo {
    render(context: Context): TemplateResult<1>;
    plugins?: RouterPluginInterface[];
}

export declare class RouteEvent extends Event {
    context: Context;
    constructor(context: Context);
}

export declare interface RouteInfo {
    path: string;
    title: string | ((context: Partial<Context>) => string);
}

export declare class Router extends EventTarget {
    config: Config;
    context: Context;
    private routeMap;
    private routes;
    route: Route | null;
    addRoute(route: RouteDefinition): void;
    constructor(config: Config);
    init(): void;
    uninstall(): void;
    get url(): URL;
    get fallback(): URL;
    get baseUrl(): URL;
    render(): TemplateResult<1>;
    private _matchRoute;
    private _notifyUrlChanged;
    private _onPopState;
    private _onAnchorClick;
    private _collectPlugins;
    /**
     * @param url The URL to navigate to.
     * @param options An options object to configure the navigation. The backNav property specifies whether the navigation is a backward navigation, which doesn't push the navigation into browser nav history.
     */
    navigate(url: URL | string, options?: {
        backNav?: boolean;
        replace?: boolean;
    }): Promise<void>;
}

declare abstract class RouterPlugin implements RouterPluginInterface {
    protected static readonly _name: string;
    get name(): string;
    beforeNavigation(_context: Context): void;
    afterNavigation(_context: Context): void;
    shouldNavigate(_context: Context): {
        redirect: string;
        condition: () => boolean | (() => Promise<boolean>);
    };
}

export declare interface RouterPluginInterface {
    name: string;
    shouldNavigate?: (context: Context) => {
        redirect: string;
        condition: () => boolean | (() => Promise<Boolean>);
    };
    beforeNavigation?: (context: Context) => void;
    afterNavigation?: (context: Context) => void;
}

export declare class ScrollToId extends RouterPlugin {
    protected static readonly _name: string;
    beforeNavigation(context: Context): void;
}

export declare class ScrollToTopPlugin extends RouterPlugin {
    protected static readonly _name: string;
    beforeNavigation(_context: Context): void;
}

export { }
