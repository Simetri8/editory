import _ from 'lodash';
import ArrayHelper from '../Mathcha/ArrayHelper';

/// xxx(252) /*IntersectStyleChecker*/

/*n.d(t, "a", function () {
    return o
});*/
/// var r = n(2)/*lodash*/;  // 3 times
/// var a = n.n(r);
/// var i = n(43)/*ArrayHelper*/;  // 1 times
class o {
    constructor() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        this.intermidiateRequiredKeys = e;
        this.accummulations = {};
        this.count = 0;
        this.isFirst = !0;
    }
    next(e) {
        var t = e || {},
        n = this.accummulations;
        return this.count++,
        this.count > 50 ? "stop" : this.isFirst ? (_.keys(t).forEach(e => {
            n[e] = {
                styleValue: t[e],
                isDifferent: !1
            }
        }), this.isFirst = !1, "next") : (_.keys(n).forEach(e => {
            t[e] && this.styleValueEquals(t[e], n[e].styleValue) || (n[e].isDifferent = !0)
        }), _.keys(t).forEach(e => {
            n[e] ? this.styleValueEquals(n[e].styleValue, t[e]) || (n[e].isDifferent = !0) : n[e] = {
                styleValue: t[e],
                isDifferent: !0
            }
        }), "next")
    }
    styleValueEquals(e, t) {
        return e instanceof Array && t instanceof Array ? ArrayHelper.arrayEquals(e, t) : e === t
    }
    end() {
        var e = this.accummulations,
        t = {};
        for (var n in e) if (e.hasOwnProperty(n)) {
            var r = e[n];
            if (!this.intermidiateRequiredKeys.includes(n)) {
                if (r.isDifferent) continue;
                t[n] = r.styleValue
            }
            t[n] = r.isDifferent ? "" : r.styleValue
        }
        return t
    }
}

export default o