import _ from 'lodash';
import InterpolateHelper from './InterpolateHelper';

/// xxx(867) /*StrokeHelper*/

/// n.r(t)
/*n.d(t, "spaceEvenlyStrokes", function () {
    return l
});*/
/*n.d(t, "scaleAndSlide", function () {
    return d
});*/
/*n.d(t, "connectStrokes", function () {
    return s
});*/
/*n.d(t, "flatStrokesToArray", function () {
    return c
});*/
/// var r = n(2)/*lodash*/;  // 22 times
/// var a = n.n(r);
/// var i = n(544)/*InterpolateHelper*/;  // 2 times
/// var o = n.n(i);
function s(e) {
    if (e.length <= 1) return e;
    var t, n, r = 1,
    i = [e[0]];
    for (r = 1; r < e.length; r++) {
        var o = _.last(i),
        s = e[r];
        t = _.last(o);
        n = _.first(s);
        Math.sqrt((t.x - n.x) * (t.x - n.x) + (t.y - n.y) * (t.y - n.y)) < 8 ? i[i.length - 1] = _.last(i).concat(s) : i.push(s)
    }
    return i
}
function l(e) {
    return e = _.map([0, 1, 2, 3], t => {
        var n = e[t];
        return null == n ? [] : n
    }),
    _.map(e, e => {
        return e.length <= 1 ? _.map(_.range(20), () => ({
            x: 0,
            y: 0,
            time: 0
        })) : function (e) {
            var t = u(_.map(e, e => e.x)),
            n = u(_.map(e, e => e.y)),
            r = u(_.map(e, e => e.time)),
            i = new InterpolateHelper(r, t),
            s = new InterpolateHelper(r, n),
            l = function (e, t, n) {
                if (void 0 === n && (n = Math.max(Math.round(t - e) + 1, 1)), n < 2) return 1 === n ? [e] : [];
                var r, a = Array(n);
                for (r = --n; r >= 0; r--) a[r] = (r * t + (n - r) * e) / n;
                return a
            } (r[0], r[r.length - 1], 20);
            return _.map(l, e => {
                var a = {
                    x: h(i.interpolate(e)),
                    y: h(s.interpolate(e)),
                    time: e
                };
                if (isNaN(a.x) || isNaN(a.y)) throw console.log("xArr: ", t, "yArr: ", n, "timeArr: ", r),
                console.log("result: ", a),
                new Error("stop");
                return a
            })
        } (e)
    })
}
function c(e) {
    return _.flatMap(e, e => _.flatMap(e, e => [e.x, e.y]))
}
function d(e) {
    var t = _.flatMap(e, e => e),
    n = _.minBy(t, e => e.y).y,
    r = _.maxBy(t, e => e.y).y,
    i = _.minBy(t, e => e.x).x,
    o = _.maxBy(t, e => e.x).x,
    s = _.minBy(t, e => e.time).time,
    l = o - i + 1,
    c = r - n + 1,
    d = 1 / l,
    h = 1 / c,
    u = Math.min(d, h),
    p = l * u / 2,
    m = c * u / 2;
    return _.map(e, e => _.map(e, e => ({
        x: (e.x - i) * u - p,
        y: (e.y - n) * u - m,
        time: e.time - s + 1
    })))
}
function h(e) {
    return Math.round(1e4 * e) / 1e4
}
function u(e) {
    for (var t = 0; t < e.length - 1; t++) {
        e[t] == e[t + 1] && (e[t + 1] += .01)
    }
    return e
}

export { l as spaceEvenlyStrokes }

export { d as scaleAndSlide }

export { s as connectStrokes }

export { c as flatStrokesToArray }