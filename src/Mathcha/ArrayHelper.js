import _ from 'lodash';

/// xxx(43) /*ArrayHelper*/

/// var r = n(2)/*lodash*/;  // 2 times
/// var a = n.n(r);
var ArrayHelper = new class {
    constructor() {
        this.emptyArr = []
    }
    undefinedIfEmptyObj(e) {
        return _.isEmpty(e) ? void 0 : e
    }
    undefinedIfEmptyArr(e) {
        if (e) return e.length <= 0 ? void 0 : e
    }
    cloneObjectExclude(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        return this._objectWithoutProperties(e, n)
    }
    _objectWithoutProperties(e, t) {
        var n = {};
        for (var r in e) t.indexOf(r) >= 0 || (n[r] = e[r]);
        return n
    }
    objectMemberEquals(e, t) {
        for (var n in e) if (e.hasOwnProperty(n) && e[n] != t[n]) return !1;
        for (var r in t) if (t.hasOwnProperty(r) && t[r] != e[r]) return !1;
        return !0
    }
    minMax(e, t, n) {
        n = n || t;
        var r = {
            min: Number.MAX_SAFE_INTEGER,
            max: Number.MIN_SAFE_INTEGER
        };
        return _.forEach(e, e => {
            r.min = Math.min(r.min, t(e));
            r.max = Math.max(r.max, n(e))
        }),
        r
    }
    areEqualShallow(e, t) {
        if (e === t) return !0;
        if ( !! e != !!t) return !1;
        for (var n in e) if (! (n in t) || e[n] !== t[n]) return !1;
        for (var n in t) if (! (n in e) || e[n] !== t[n]) return !1;
        return !0
    }
    areEqualShallowFromLeft(e, t) {
        for (var n in e) if (! (n in t) || e[n] !== t[n]) return !1;
        return !0
    }
    objectReferenceCompare(e, t) {
        return e === t
    }
    arrayEquals(e, t, n) {
        if (n = n || this.objectReferenceCompare, e === t) return !0;
        if ( !! e != !!t) return !1;
        if (e.length != t.length) return !1;
        for (var r = 0; r < e.length; r++) if (!n(e[r], t[r])) return !1;
        return !0
    }
}

export default ArrayHelper