class $ {
  get name() {
    return $._name;
  }
  beforeNavigation(t) {
  }
  afterNavigation(t) {
  }
  shouldNavigate(t) {
    return {
      redirect: "",
      condition: () => !0
    };
  }
}
class Lt extends $ {
  get name() {
    return this.__name;
  }
  constructor(t) {
    super(), this.__name = t;
  }
  beforeNavigation(t) {
    t.title = `${this.__name} ${t.title}`;
  }
}
const I = class I extends $ {
  beforeNavigation(t) {
    "serviceWorker" in navigator && navigator.serviceWorker.getRegistration().then((e) => {
      e && e.update();
    });
  }
};
I._name = "CheckServiceWorkerUpdate";
let K = I;
const P = class P extends $ {
  constructor(t) {
    super(), this.promise = t;
  }
  async beforeNavigation(t) {
    t.data = await this.promise(t);
  }
};
P._name = "data";
let Y = P;
const B = class B extends $ {
  constructor(t) {
    super(), this.fn = t;
  }
  beforeNavigation(t) {
    this.fn(t);
  }
};
B._name = "lazy";
let C = B;
const j = class j extends C {
  constructor(t) {
    super(() => import(
      /* @vite-ignore */
      t
    ));
  }
};
j._name = "lazy-import";
let z = j;
const W = class W extends $ {
  constructor(t = "/offline") {
    super(), this.offlineRoute = t;
  }
  shouldNavigate(t) {
    return {
      condition: () => !navigator.onLine,
      redirect: this.offlineRoute
    };
  }
};
W._name = "offline";
let F = W;
const V = class V extends $ {
  constructor(t) {
    super(), this.path = t;
  }
  shouldNavigate(t) {
    return {
      condition: () => !1,
      redirect: this.path
    };
  }
};
V._name = "redirect";
let Z = V;
const M = Symbol.for("app-tools::log::1.x");
globalThis[M] = {
  setDebug: ft,
  debug: new URL(window.location.href).searchParams.has("app-tools-debug")
};
function ft(n) {
  globalThis[M].debug = !!n;
}
function pt(n, t) {
  globalThis[M].debug && (console.groupCollapsed(`[app-tools] ${n}`), t && console.log(t), console.groupEnd());
}
function _t(n) {
  return (t, e) => {
    pt(`${n}: ${t}`, e);
  };
}
const ot = "lamework", rt = "1.x";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis, T = y.trustedTypes, G = T ? T.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, at = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + A, At = `<${ht}>`, v = document, b = () => v.createComment(""), N = (n) => n === null || typeof n != "object" && typeof n != "function", ct = Array.isArray, gt = (n) => ct(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", S = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, Q = />/g, g = RegExp(`>|${S}(?:([^\\s"'>=/]+)(${S}*=${S}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), X = /'/g, tt = /"/g, lt = /^(?:script|style|textarea|title)$/i, mt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), dt = mt(1), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), m = v.createTreeWalker(v, 129);
function ut(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return G !== void 0 ? G.createHTML(t) : t;
}
const vt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", o = w;
  for (let d = 0; d < e; d++) {
    const a = n[d];
    let h, c, l = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, c = o.exec(a), c !== null); )
      f = o.lastIndex, o === w ? c[1] === "!--" ? o = J : c[1] !== void 0 ? o = Q : c[2] !== void 0 ? (lt.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = g) : c[3] !== void 0 && (o = g) : o === g ? c[0] === ">" ? (o = s ?? w, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? g : c[3] === '"' ? tt : X) : o === tt || o === X ? o = g : o === J || o === Q ? o = w : (o = g, s = void 0);
    const p = o === g && n[d + 1].startsWith("/>") ? " " : "";
    r += o === w ? a + At : l >= 0 ? (i.push(h), a.slice(0, l) + at + a.slice(l) + A + p) : a + A + (l === -2 ? d : p);
  }
  return [ut(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const d = t.length - 1, a = this.parts, [h, c] = vt(t, e);
    if (this.el = H.createElement(h, i), m.currentNode = this.el.content, e === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = m.nextNode()) !== null && a.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes())
          for (const l of s.getAttributeNames())
            if (l.endsWith(at)) {
              const f = c[o++], p = s.getAttribute(l).split(A), U = /([.?@])?(.*)/.exec(f);
              a.push({ type: 1, index: r, name: U[2], strings: p, ctor: U[1] === "." ? wt : U[1] === "?" ? yt : U[1] === "@" ? bt : L }), s.removeAttribute(l);
            } else
              l.startsWith(A) && (a.push({ type: 6, index: r }), s.removeAttribute(l));
        if (lt.test(s.tagName)) {
          const l = s.textContent.split(A), f = l.length - 1;
          if (f > 0) {
            s.textContent = T ? T.emptyScript : "";
            for (let p = 0; p < f; p++)
              s.append(l[p], b()), m.nextNode(), a.push({ type: 2, index: ++r });
            s.append(l[f], b());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ht)
          a.push({ type: 2, index: r });
        else {
          let l = -1;
          for (; (l = s.data.indexOf(A, l + 1)) !== -1; )
            a.push({ type: 7, index: r }), l += A.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = v.createElement("template");
    return i.innerHTML = t, i;
  }
}
function x(n, t, e = n, i) {
  var o, d;
  if (t === R)
    return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = N(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((d = s == null ? void 0 : s._$AO) == null || d.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = x(n, s._$AS(n, t.values), s, i)), t;
}
class xt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? v).importNode(e, !0);
    m.currentNode = s;
    let r = m.nextNode(), o = 0, d = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new E(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new Nt(r, this, t)), this._$AV.push(h), a = i[++d];
      }
      o !== (a == null ? void 0 : a.index) && (r = m.nextNode(), o++);
    }
    return m.currentNode = v, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class E {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), N(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : gt(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== u && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(ut(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s)
      this._$AH.p(e);
    else {
      const o = new xt(s, this), d = o.u(this.options);
      o.p(e), this.T(d), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    ct(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new E(this.S(b()), this.S(b()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = x(this, t, e, 0), o = !N(t) || t !== this._$AH && t !== R, o && (this._$AH = t);
    else {
      const d = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++)
        h = x(this, d[i + a], e, a), h === R && (h = this._$AH[a]), o || (o = !N(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class yt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class bt extends L {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? u) === R)
      return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const k = y.litHtmlPolyfillSupport;
k == null || k(H, E), (y.litHtmlVersions ?? (y.litHtmlVersions = [])).push("3.1.3");
const Rt = (n, t, e) => {
  const i = t;
  let s = i._$litPart$;
  return s === void 0 && (i._$litPart$ = s = new E(t.insertBefore(b(), null), null, void 0, {})), s._$AI(n), s;
}, $t = "router-focus", Ht = "position:absolute;top:0;width:1px;height:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);clip-path:inset(50%);margin:-1px;", Et = (n) => dt`
  <div
    ${ot}="true"
    .kVersion="${rt}"
    id="${$t}"
    tabindex="-1"
    aria-live="polite"
    style="${Ht}"
  >
    ${n}
  </div>
`, D = class D extends $ {
  afterNavigation(t) {
    const e = document.querySelector(
      `div[${ot}][kVersion="${rt}"]#${$t}`
    );
    e ? e.textContent = t.title : Rt(Et(t.title), document.body), e.addEventListener("blur", () => {
      e == null || e.style.setProperty("display", "none");
    }), e.style.removeProperty("display"), e.focus();
  }
};
D._name = "resetFocus";
let st = D;
const O = class O extends $ {
  beforeNavigation(t) {
    window.scrollTo(0, 0);
  }
};
O._name = "scrollToTop";
let it = O;
const q = class q extends $ {
  beforeNavigation(t) {
    if (t.path) {
      const e = document.getElementById(t.path);
      e && window.scrollTo(0, e.offsetTop);
      return;
    }
  }
};
q._name = "scrollToId";
let nt = q;
const _ = _t("router"), Ut = "/";
function St(n) {
  var t = Ut;
  return n && (t = t + n), t;
}
class Tt extends Event {
  constructor(t) {
    super("route-changed"), this.context = t;
  }
}
class kt extends EventTarget {
  constructor(t) {
    super(), this.config = t, this.context = {
      params: {},
      query: {},
      title: "",
      url: new URL(window.location.href)
    }, this.routeMap = /* @__PURE__ */ new Map(), this.routes = [], this.route = null, this._onPopState = () => {
      this.navigate(new URL(window.location.href), { backNav: !0 });
    }, this._onAnchorClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey)
        return;
      const i = e.composedPath().find((o) => {
        if (o instanceof HTMLAnchorElement)
          return o;
      });
      if (!i || !i.href)
        return;
      const s = new URL(i.href);
      if (this.url.href === s.href || s.host !== window.location.host || i.hasAttribute("download") || i.href.includes("mailto:"))
        return;
      const r = i.getAttribute("target");
      r && r !== "" && r !== "_self" || (e.preventDefault(), this.navigate(s));
    };
    for (const e of t.routes)
      this.addRoute(e);
    this.init();
  }
  addRoute(t) {
    const e = {
      ...t,
      // @ts-ignore
      urlPattern: new URLPattern({
        pathname: t.path,
        baseURL: window.location.href,
        search: "*",
        hash: "*"
      })
    };
    this.routeMap.set(t.path, e), this.routes.push(e);
  }
  init() {
    queueMicrotask(() => {
      this.navigate(new URL(window.location.href), { replace: !0 });
    }), window.addEventListener("popstate", this._onPopState), window.addEventListener("click", this._onAnchorClick), _("Initialized routes", this.routes);
  }
  uninstall() {
    window.removeEventListener("popstate", this._onPopState), window.removeEventListener("click", this._onAnchorClick);
  }
  get url() {
    return new URL(window.location.href);
  }
  get fallback() {
    var t;
    return new URL(
      ((t = this.config) == null ? void 0 : t.fallback) || this.baseUrl.href.substring(window.location.origin.length),
      this.baseUrl
    );
  }
  get baseUrl() {
    return new URL("./", document.baseURI);
  }
  render() {
    var e;
    _(
      `Rendering route ${this.context.url.pathname}${this.context.url.search}${this.context.url.hash}`,
      { context: this.context, route: this.route }
    );
    const t = this.route;
    return t ? (e = t.render) == null ? void 0 : e.call(t, this.context) : dt`<h1>404</h1>`;
  }
  _matchRoute(t) {
    var e;
    for (const i of this.routes) {
      const s = i.urlPattern.exec(t);
      if (s) {
        const { title: r } = i, o = Object.fromEntries(new URLSearchParams(t.search)), d = ((e = s == null ? void 0 : s.pathname) == null ? void 0 : e.groups) ?? {};
        return this.context = {
          url: t,
          title: typeof r == "function" ? r({ params: d, query: o, url: t }) : r,
          params: d,
          query: o
        }, i;
      }
    }
    return _(`No route matched for ${t.pathname}${t.search}${t.hash}`, t), null;
  }
  _notifyUrlChanged() {
    this.dispatchEvent(new Tt(this.context));
  }
  _collectPlugins(t) {
    var e;
    return [...((e = this.config) == null ? void 0 : e.plugins) ?? [], ...(t == null ? void 0 : t.plugins) ?? []];
  }
  /**
   * @param url The URL to navigate to.
   * @param options An options object to configure the navigation. The backNav property specifies whether the navigation is a backward navigation, which doesn't push the navigation into browser nav history.
   */
  async navigate(t, e = {
    backNav: !1,
    replace: !1
  }) {
    var r, o, d, a;
    typeof t == "string" && (t = new URL(t, this.baseUrl));
    let i = this._matchRoute(t) || this._matchRoute(this.fallback);
    _(`Navigating to ${t.pathname}${t.search}${t.hash}`, {
      context: this.context,
      route: this.route
    });
    let s = this._collectPlugins(i);
    for (const h of s)
      try {
        const c = (r = h == null ? void 0 : h.shouldNavigate) == null ? void 0 : r.call(h, this.context);
        c && (c.condition() || (t = new URL(c.redirect, this.baseUrl), i = this._matchRoute(t) || this._matchRoute(this.fallback), s = this._collectPlugins(i), _("Redirecting", { context: this.context, route: this.route })));
      } catch (c) {
        throw _(
          `RouterPluginInterface "${h.name}" error on shouldNavigate hook`,
          c
        ), c;
      }
    if (this.route = i, !this.route)
      throw new Error(`[ROUTER] No route or fallback matched for url ${t}`);
    for (const h of s)
      try {
        (o = h == null ? void 0 : h.beforeNavigation) == null || o.call(h, this.context);
      } catch (c) {
        throw _(
          `RouterPluginInterface "${h.name}" error on beforeNavigation hook`,
          c
        ), c;
      }
    e != null && e.replace ? window.history.replaceState(
      null,
      "",
      `${t.pathname}${t.search}${t.hash}`
    ) : e.backNav || window.history.pushState(
      null,
      "",
      `${t.pathname}${t.search}${t.hash}`
    ), document.title = ((d = this.context.title) == null ? void 0 : d.toString()) || "", this._notifyUrlChanged();
    for (const h of s)
      try {
        (a = h == null ? void 0 : h.afterNavigation) == null || a.call(h, this.context);
      } catch (c) {
        throw _(
          `RouterPluginInterface "${h.name}" error on afterNavigation hook`,
          c
        ), c;
      }
  }
}
export {
  Lt as AppNamePlugin,
  K as CheckServiceWorkerUpdatePlugin,
  Y as DataPlugin,
  z as LazyImportPlugin,
  C as LazyPlugin,
  F as OfflinePlugin,
  Z as RedirectPlugin,
  st as ResetFocusPlugin,
  Tt as RouteEvent,
  kt as Router,
  nt as ScrollToId,
  it as ScrollToTopPlugin,
  _ as log,
  St as resolveRouterPath
};
