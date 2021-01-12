import _ from 'lodash';
import GraphemeSplitter from 'grapheme-splitter';
import Unistring from 'unistring';

/// xxx(36) /*TextUtils*/

/// var r = n(704)/*grapheme-splitter*/;  // 1 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 1 times
/// var o = n.n(i);
/// var s = n(705)/*unistring*/;  // 1 times
/// var l = n.n(s);
var c = new GraphemeSplitter;
class d {
    constructor(e) {
        this.text = e
    }
    get length() {
        return this.text.length
    }
    clusterAt(e) {
        return this.text.charAt(e)
    }
    clusterIndexAt(e) {
        return e
    }
    rawStringAt(e) {
        return this.text.charAt(e)
    }
    rawIndexAt(e) {
        return e
    }
    charAt(e) {
        return this.text.charAt(e)
    }
    slice(e, t) {
        return new d(this.text.slice(e, t))
    }
    substring(e, t) {
        return new d(this.text.substring(e, t))
    }
    substr(e, t) {
        return new d(this.text.substr(e, t))
    }
    getClusterIndexFromUTF16Index(e) {
        return e
    }
    charCodeAt(e) {
        return this.text.charCodeAt(e)
    }
    codePointsAt(e) {
        return [this.text.codePointAt(e)]
    }
    toStringArray() {
        return this.text.split("")
    }
    toString() {
        return this.text
    }
    concat(e) {
        this.text = "string" != typeof e ? this.text.concat(e.text) : this.text.concat(e)
    }
}
var TextUtils = new class {
    getUnistring(e) {
        return this.buildOrGetCacheUnistring(e)
    }
    getUnistringUncached(e) {
        var t = this.checkGlobalTextCache(e);
        return t || this.createUniString(e)
    }
    length(e) {
        return _.isString(e) ? c.countGraphemes(e) : e.length
    }
    lengthByCache(e) {
        return this.buildOrGetCacheUnistring(e).length
    }
    charAt(e, t) {
        return this.buildOrGetCacheUnistring(e).clusterAt(t)
    }
    substring(e, t, n) {
        return this.buildOrGetCacheUnistring(e).substring(t, n).toString()
    }
    substr(e, t, n) {
        return this.buildOrGetCacheUnistring(e).substr(t, n).toString()
    }
    isEmpty(e) {
        return 0 === e.length
    }
    isSingleChar(e) {
        return 1 === this.length(e)
    }
    rawIndexAt(e, t) {
        return this.buildOrGetCacheUnistring(e).rawIndexAt(t)
    }
    clusterIndexAt(e, t) {
        return this.buildOrGetCacheUnistring(e).getClusterIndexFromUTF16Index(t)
    }
    buildOrGetCacheUnistring(e) {
        var t = e instanceof HTMLElement ? e.innerText : e.text,
        n = this.checkGlobalTextCache(t);
        return n || (t.length < 400 ? this.createUniString(t) : (e.___uniStr && e.___cacheText && e.___cacheText === t && e.___uniStr.slice || (e.___uniStr = this.fromGlobalCache(t), e.___cacheText = t), e.___uniStr))
    }
    checkGlobalTextCache(e) {
        if (this.globalTextCache && this.globalTextCache.slice) return this.globalTextCache[e] || (this.globalTextCache[e] = this.fromGlobalCache(e)),
        this.globalTextCache[e]
    }
    fromGlobalCache(e) {
        return this.createUniString(e)
    }
    createUniString(e) {
        var t = new Unistring(e);
        return null == t.clusters && (t = new d(e)),
        t
    }
    startGlobalTextCache() {
        this.globalTextCache || (this.globalTextCache = {})
    }
    endGlobalTextCahce() {
        this.globalTextCache = void 0
    }
    strPslice(e, t, n, r) {
        var a = this.buildOrGetCacheUnistring(e);
        return a.slice(0, t).toString() + r + a.slice(t + Math.abs(n)).toString()
    }
    unistrPslice(e, t, n, r) {
        return e.slice(0, t).toString() + r + e.slice(t + Math.abs(n)).toString()
    }
    normalPslice(e, t, n, r) {
        return e.slice(0, t).toString() + r + e.slice(t + Math.abs(n)).toString()
    }
    strPsliceWithWithOriginalUniStr(e, t, n, r) {
        var a = this.buildOrGetCacheUnistring(e),
        i = a.slice(0, t),
        o = a.slice(t + Math.abs(n));
        return {
            result: i.toString() + r + o.toString(),
            originalTextUniStr: a,
            firstSection: i,
            lastSection: o
        }
    }
}

export default TextUtils