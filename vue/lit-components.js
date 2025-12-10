var kt = Object.defineProperty;
var tt = (o) => {
  throw TypeError(o);
};
var St = (o, t, e) => t in o ? kt(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var b = (o, t, e) => St(o, typeof t != "symbol" ? t + "" : t, e), Ct = (o, t, e) => t.has(o) || tt("Cannot " + e);
var L = (o, t, e) => t.has(o) ? tt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e);
var N = (o, t, e) => (Ct(o, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, Z = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Y = Symbol(), et = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Y) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (o) => new mt(typeof o == "string" ? o : o + "", void 0, Y), Q = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[n + 1], o[0]);
  return new mt(e, o, Y);
}, Pt = (o, t) => {
  if (Z) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = H.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, it = Z ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return bt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ut, defineProperty: Mt, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Ot, getOwnPropertySymbols: zt, getPrototypeOf: Nt } = Object, m = globalThis, st = m.trustedTypes, Ht = st ? st.emptyScript : "", V = m.reactiveElementPolyfillSupport, C = (o, t) => o, q = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Ht : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, yt = (o, t) => !Ut(o, t), ot = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Mt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = Tt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const l = s == null ? void 0 : s.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, i = [...Ot(e), ...zt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(it(s));
    } else t !== void 0 && e.push(it(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Pt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : q).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : q;
      this._$Em = s;
      const h = a.fromAttribute(e, l.type);
      this[s] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var s;
    if (t !== void 0) {
      const n = this.constructor, r = this[t];
      if (i ?? (i = n.getPropertyOptions(t)), !((i.hasChanged ?? yt)(r, e) || i.useDefault && i.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: l } = r, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var n;
        return (n = s.hostUpdate) == null ? void 0 : n.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: A }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, R = P.trustedTypes, rt = R ? R.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, wt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + g, Rt = `<${vt}>`, _ = document, U = () => _.createComment(""), M = (o) => o === null || typeof o != "object" && typeof o != "function", X = Array.isArray, Dt = (o) => X(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, at = />/g, y = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, dt = /"/g, $t = /^(?:script|style|textarea|title)$/i, It = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), D = It(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), w = _.createTreeWalker(_, 129);
function _t(o, t) {
  if (!X(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(t) : t;
}
const jt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = S;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let h, p, d = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, p = r.exec(a), p !== null); ) u = r.lastIndex, r === S ? p[1] === "!--" ? r = nt : p[1] !== void 0 ? r = at : p[2] !== void 0 ? ($t.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = y) : p[3] !== void 0 && (r = y) : r === y ? p[0] === ">" ? (r = s ?? S, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, h = p[1], r = p[3] === void 0 ? y : p[3] === '"' ? dt : lt) : r === dt || r === lt ? r = y : r === nt || r === at ? r = S : (r = y, s = void 0);
    const f = r === y && o[l + 1].startsWith("/>") ? " " : "";
    n += r === S ? a + Rt : d >= 0 ? (i.push(h), a.slice(0, d) + wt + a.slice(d) + g + f) : a + g + (d === -2 ? l : f);
  }
  return [_t(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, p] = jt(t, e);
    if (this.el = T.createElement(h, i), w.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = w.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(wt)) {
          const u = p[r++], f = s.getAttribute(d).split(g), z = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: z[2], strings: f, ctor: z[1] === "." ? Vt : z[1] === "?" ? Bt : z[1] === "@" ? Wt : j }), s.removeAttribute(d);
        } else d.startsWith(g) && (a.push({ type: 6, index: n }), s.removeAttribute(d));
        if ($t.test(s.tagName)) {
          const d = s.textContent.split(g), u = d.length - 1;
          if (u > 0) {
            s.textContent = R ? R.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(d[f], U()), w.nextNode(), a.push({ type: 2, index: ++n });
            s.append(d[u], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === vt) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(g, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = _.createElement("template");
    return i.innerHTML = t, i;
  }
}
function k(o, t, e = o, i) {
  var r, l;
  if (t === E) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const n = M(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), n === void 0 ? s = void 0 : (s = new n(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = k(o, s._$AS(o, t.values), s, i)), t;
}
class Lt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? _).importNode(e, !0);
    w.currentNode = s;
    let n = w.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new O(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Gt(n, this, t)), this._$AV.push(h), a = i[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = w.nextNode(), r++);
    }
    return w.currentNode = _, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = k(this, t, e), M(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Dt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = T.createElement(_t(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const r = new Lt(s, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new O(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = k(this, t, e, 0), r = !M(t) || t !== this._$AH && t !== E, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = k(this, l[i + a], e, a), h === E && (h = this._$AH[a]), r || (r = !M(h) || h !== this._$AH[a]), h === c ? t = c : t !== c && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Bt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Wt extends j {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = k(this, t, e, 0) ?? c) === E) return;
    const i = this._$AH, s = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== c && (i === c || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const W = P.litHtmlPolyfillSupport;
W == null || W(T, O), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.1");
const qt = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new O(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class $ extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var gt;
$._$litElement$ = !0, $.finalized = !0, (gt = v.litElementHydrateSupport) == null || gt.call(v, { LitElement: $ });
const G = v.litElementPolyfillSupport;
G == null || G({ LitElement: $ });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.1");
const ct = "lit-button";
var I, xt;
class K extends $ {
  constructor() {
    super();
    L(this, I);
    this.label = "Click me", this.variant = "primary", this.disabled = !1;
  }
  render() {
    const e = this.variant === "secondary" ? "secondary" : "primary";
    return D`
      <button
        class=${e}
        ?disabled=${this.disabled}
        @click=${N(this, I, xt)}
      >
        ${this.label}
      </button>
    `;
  }
}
I = new WeakSet(), xt = function(e) {
  this.disabled || this.dispatchEvent(
    new CustomEvent("button-click", {
      detail: { sourceEvent: e },
      bubbles: !0,
      composed: !0
    })
  );
}, b(K, "properties", {
  label: { type: String },
  variant: { type: String },
  disabled: { type: Boolean, reflect: !0 }
}), b(K, "styles", Q`
    :host {
      display: inline-block;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.25s, background-color 0.25s, color 0.25s,
        box-shadow 0.25s;
    }

    button:focus-visible {
      outline: 3px solid rgba(67, 156, 255, 0.35);
      outline-offset: 2px;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      box-shadow: none;
    }

    .primary {
      background-color: #0f6bff;
      color: white;
      border-color: #0f6bff;
      box-shadow: 0 6px 20px rgba(15, 107, 255, 0.25);
    }

    .primary:hover:not(:disabled) {
      background-color: #0d60e6;
      border-color: #0d60e6;
    }

    .secondary {
      background-color: white;
      color: #0f6bff;
      border-color: #0f6bff;
    }

    .secondary:hover:not(:disabled) {
      background-color: #e8f1ff;
      border-color: #0d60e6;
      color: #0d60e6;
    }
  `);
customElements.get(ct) || customElements.define(ct, K);
const pt = "hello-greeting";
class F extends $ {
  constructor() {
    super(), this.name = "World", this.message = "Добро пожаловать!";
  }
  render() {
    return D`
      <div>
        Привет, <span class="name">${this.name}</span>!
        <div class="message">${this.message}</div>
      </div>
    `;
  }
}
b(F, "properties", {
  name: { type: String },
  message: { type: String }
}), b(F, "styles", Q`
    :host {
      display: inline-block;
      padding: 12px 16px;
      border-radius: 10px;
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      color: #1f2933;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
      box-shadow: 0 8px 30px rgba(31, 41, 51, 0.1);
    }

    .name {
      font-weight: 700;
      color: #0f6bff;
    }

    .message {
      margin-top: 6px;
      color: #3a4a5a;
    }
  `);
customElements.get(pt) || customElements.define(pt, F);
const Kt = '/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-duration:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--font-weight-semibold:600;--radius-md:.375rem;--radius-lg:.5rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.fixed{position:fixed}.relative{position:relative}.static{position:static}.bottom-0{bottom:calc(var(--spacing)*0)}.left-0{left:calc(var(--spacing)*0)}.z-\\[99999999\\]{z-index:99999999}.my-0{margin-block:calc(var(--spacing)*0)}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.h-fit{height:fit-content}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.flex-row{flex-direction:row}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:calc(var(--spacing)*2)}.gap-5{gap:calc(var(--spacing)*5)}.rounded-md{border-radius:var(--radius-md)}.rounded-t-lg{border-top-left-radius:var(--radius-lg);border-top-right-radius:var(--radius-lg)}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[\\#0D4A75\\]{border-color:#0d4a75}.bg-\\[\\#0D4A75\\]{background-color:#0d4a75}.bg-white{background-color:var(--color-white)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-5{padding-inline:calc(var(--spacing)*5)}.px-6{padding-inline:calc(var(--spacing)*6)}.py-2{padding-block:calc(var(--spacing)*2)}.py-8{padding-block:calc(var(--spacing)*8)}.text-center{text-align:center}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.leading-\\[26px\\]{--tw-leading:26px;line-height:26px}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-\\[\\#0D4A75\\]{color:#0d4a75}.text-white{color:var(--color-white)}.shadow-\\[0_4px_24px_0px_rgba\\(0\\,0\\,0\\,0\\.1\\)\\]{--tw-shadow:0 4px 24px 0px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-200{--tw-duration:.2s;transition-duration:.2s}.outline-solid{--tw-outline-style:solid;outline-style:solid}@media (hover:hover){.hover\\:border:hover{border-style:var(--tw-border-style);border-width:1px}.hover\\:border-\\[\\#0D4A75\\]:hover{border-color:#0d4a75}.hover\\:bg-white:hover{background-color:var(--color-white)}.hover\\:text-\\[\\#0D4A75\\]:hover{color:#0d4a75}.hover\\:opacity-80:hover{opacity:.8}}.active\\:border:active{border-style:var(--tw-border-style);border-width:1px}.active\\:border-\\[\\#0D4A75\\]:active{border-color:#0d4a75}.active\\:bg-white:active{background-color:var(--color-white)}.active\\:text-\\[\\#0D4A75\\]:active{color:#0d4a75}@media not all and (min-width:48rem){.max-md\\:w-full{width:100%}}@media (min-width:48rem){.md\\:h-20{height:calc(var(--spacing)*20)}.md\\:flex-row{flex-direction:row}.md\\:py-4{padding-block:calc(var(--spacing)*4)}.md\\:text-left{text-align:left}}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-duration{syntax:"*";inherits:false}', ut = "cookies-approved", ft = "cookie-alert";
var x, At, Et, Ft;
class J extends $ {
  constructor() {
    super();
    L(this, x);
    this.path = "/privacy", this.isVisible = !1;
  }
  firstUpdated() {
    const e = localStorage.getItem(ut);
    this.isVisible = !e, this.isVisible || N(this, x, At).call(this);
  }
  render() {
    return this.isVisible ? D`
      <div class="cookies-alert is-open">
        <div
          data-ui="ui-cookie"
          class="fixed bottom-0 left-0 z-[99999999] flex h-fit w-full flex-row items-center justify-center rounded-t-lg bg-white px-5 py-8 shadow-[0_4px_24px_0px_rgba(0,0,0,0.1)] md:h-20 md:py-4"
          role="region"
          aria-label="Уведомление о cookies"
        >
          <div class="flex flex-col items-center gap-5 md:flex-row">
            <slot>
              <p class="my-0 text-sm text-center md:text-left">
                Я принимаю условия
                <a href="${this.path}" target="_blank" class="text-[#0D4A75]"
                  >политики конфиденциальности и обработки персональных
                  данных</a
                >с использованием Cookies.
              </p>
            </slot>
            <button
              class="max-md:w-full rounded-md  px-6 py-2 text-sm leading-[26px] outline-solid  hover:text-[#0D4A75] active:text-[#0D4A75] active:bg-white active:border-[#0D4A75] hover:bg-white active:border hover:border hover:border-[#0D4A75] relative inline-flex items-center justify-center gap-2 font-semibold duration-200 text-white bg-[#0D4A75] border border-[#0D4A75]"
              @click=${N(this, x, Et)}
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    ` : null;
  }
}
x = new WeakSet(), At = function() {
  this.dispatchEvent(
    new CustomEvent("init", {
      detail: { isVisible: this.isVisible },
      bubbles: !0,
      composed: !0
    })
  );
}, Et = function() {
  localStorage.setItem(ut, "true"), this.isVisible = !1, this.dispatchEvent(
    new CustomEvent("approve", { bubbles: !0, composed: !0 })
  );
}, Ft = function() {
  return D`
      <a
        class="cursor-pointer text-cornflower-900 transition-opacity hover:opacity-80"
        href=${props.href}
        target=${props.target ?? c}
        rel=${props.rel ?? c}
      >
        политики конфиденциальности и обработки персональных данных
      </a>
    `;
}, b(J, "properties", {
  path: { type: Object },
  isVisible: { state: !0 }
}), b(J, "styles", [
  bt(Kt),
  Q`
      :host {
        position: relative;
        display: block;
      }

      .cookies-alert {
        transition: transform 0.3s ease;
      }

      .cookies-alert:not(.is-open) {
        transform: translateY(100%);
      }

      button {
        font-weight: 600;
      }
    `
]);
customElements.get(ft) || customElements.define(ft, J);
const Qt = "lit-button", Xt = "hello-greeting", te = "cookie-alert";
export {
  te as COOKIE_ALERT_TAG,
  Xt as HELLO_GREETING_TAG,
  Qt as LIT_BUTTON_TAG
};
