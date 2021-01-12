
var FreeLineCorrector;
/// xxx(712) /*FreeLineCorrector*/

function a(e, t, n) {
    var r = t.x;
    var a = t.y;
    var i = n.x - r;
    var o = n.y - a;
    if (0 !== i || 0 !== o) {
        var s = ((e.x - r) * i + (e.y - a) * o) / (i * i + o * o);
        if (s > 1) {
            r = n.x;
            a = n.y
        } else if (s > 0) {
            r = r + i * s;
            a = a + o * s
        }
    }
    return (i = e.x - r) * i + (o = e.y - a) * o
}
function i(e, t) {
    var n = e.length - 1;
    var r = [e[0]];
    return function e(t, n, r, i, o) {
        var s;
        var l = i;
        var c = n + 1;
        for (; c < r; c++) {
            var d = a(t[c], t[n], t[r]);
            if (d > l) {
                s = c;
                l = d
            }
        }
        if (l > i) {
            if (s - n > 1) e(t, n, s, i, o);
            o.push(t[s]);
            if (r - s > 1) e(t, s, r, i, o)
        }
    } (e, 0, n, t, r),
    r.push(e[n]),
    r
}
function v(e, t) {
    var n;
    var r;
    var a;
    var i;
    var o;
    var s = e[0];
    var l = [s];
    var c = 1;
    var d = e.length;
    for (; c < d; c++) {
        n = e[c];
        a = s;
        i = void 0;
        o = void 0;
        i = (r = n).x - a.x;
        o = r.y - a.y;
        if (i * i + o * o > t) {
            l.push(n);
            s = n
        }
    }
    if (s !== n) l.push(n);
    return l
}
function o(e, t, n) {
    if (e.length <= 2) return e;
    var r = void 0 !== t ? t * t : 1;
    return e = i(e = n ? e : v(e, r), r)
}
FreeLineCorrector = o

export default FreeLineCorrector