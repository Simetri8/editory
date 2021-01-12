import _ from 'lodash';

/// xxx(55) /*ArrayHelper2*/
/*ArrayHelper'a TAŞINDI*/
/// var r = n(2)/*lodash*/;  // 4 times
/// var a = n.n(r);
var ArrayHelper2 = new class {
    exclude(e, t) {
        return _.filter(e, e => e != t)
    }
    splitAt(e, t) {
        return {
            first: _.slice(e, 0, t),
            tail: _.slice(e, t)
        }
    }
    setLength(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        if ((e = e || []).length === t) return e;
        if (e.length > t) return e.slice(0, t);
        var r = e.length;
        return e.length = t,
        e.fill(n, r),
        e
    }
    newArray(e) {
        return arguments.length > 1 && void 0 !== arguments[1] && !arguments[1] ? new Array(e) : Array.from({
            length: e
        })
    }
    cloneSetLength(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        return this.setLength(_.clone(e), t, n)
    }
}

export default ArrayHelper2