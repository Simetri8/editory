
var LineHashTopBottom;
/// xxx(547) /*LineHashTopBottom*/

function r(e, t) {
    var n, r;
    if (0 === t.length) return e;
    n = 0;
    r = t.length;
    for (; n < r; n++) {
        e = (e << 5) - e + t.charCodeAt(n);
        e = e | 0
    };
    return e < 0 ? -2 * e : e
}
function a(e, t, n, i) {
    var o, s = r(r(r(e, n), (o = t, Object.prototype.toString.call(o))), typeof t);
    return null == t ? r(s, "null") : void 0 === t ? r(s, "undefined") : "object" == typeof t ? -1 !== i.indexOf(t) ? r(s, "[Circular]" + n) : (i.push(t), function (e, t, n) {
        return Object.keys(t).sort().reduce(function (e, r) {
            return a(e, t[r], r, n)
        },
        e)
    } (s, t, i)) : r(s, t.toString())
}
LineHashTopBottom = function (e) {
    return function (e, t) {
        for (; e.length < t;) e = "0" + e;
        return e
    } (a(0, e, "", []).toString(16), 8)
}

export default LineHashTopBottom