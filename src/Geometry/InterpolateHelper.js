
var InterpolateHelper;
/// xxx(544) /*InterpolateHelper*/

var n;
n = function () {
    function e(e, t) {
        var n;
        var r;
        var a;
        var i;
        var o;
        var s;
        var l;
        var c;
        var d;
        var h;
        var u;
        var p;
        var m;
        var f;
        var g;
        var y;
        var A;
        a = [];
        s = [];
        n = [];
        r = [];
        i = [];
        c = [];
        o = 0;
        f = (l = e.length) - 1;
        for (; 0 <= f ? o < f : o > f; 0 <= f ? o = o + 1 : o = o - 1) {
            a[o] = (t[o + 1] - t[o]) / (e[o + 1] - e[o]);
            if (o > 0) s[o] = (a[o - 1] + a[o]) / 2
        }
        s[0] = a[0];
        s[l - 1] = a[l - 2];
        d = [];
        o = 0;
        g = l - 1;
        for (; 0 <= g ? o < g : o > g; 0 <= g ? o = o + 1 : o = o - 1) if (0 === a[o]) d.push(o);
        h = 0;
        p = d.length;
        for (; h < p; h++) s[o = d[h]] = s[o + 1] = 0;
        o = 0;
        y = l - 1;
        for (; 0 <= y ? o < y : o > y; 0 <= y ? o = o + 1 : o = o - 1) {
            n[o] = s[o] / a[o];
            r[o] = s[o + 1] / a[o];
            i[o] = Math.pow(n[o], 2) + Math.pow(r[o], 2);
            c[o] = 3 / Math.sqrt(i[o])
        }
        d = [];
        o = 0;
        A = l - 1;
        for (; 0 <= A ? o < A : o > A; 0 <= A ? o = o + 1 : o = o - 1) if (i[o] > 9) d.push(o);
        u = 0;
        m = d.length;
        for (; u < m; u++) {
            s[o = d[u]] = c[o] * n[o] * a[o];
            s[o + 1] = c[o] * r[o] * a[o]
        }
        this.x = e.slice(0, l);
        this.y = t.slice(0, l);
        this.m = s
    }
    return e.prototype.interpolate = function (e) {
        var t;
        var n;
        var r;
        var a;
        var i;
        var o;
        var s;
        var l;
        var c;
        var d;
        i = d = this.x.length - 2;
        for (;
        (d <= 0 ? i <= 0 : i >= 0) && !(this.x[i] <= e); d <= 0 ? i = i + 1 : i = i - 1);
        if (0 == (t = this.x[i + 1] - this.x[i])) throw new Error("error h is zero");
        if (o = (e - this.x[i]) / t, s = Math.pow(o, 2), r = (l = Math.pow(o, 3)) - 2 * s + o, n = -2 * l + 3 * s, a = l - s, c = (2 * l - 3 * s + 1) * this.y[i] + r * t * this.m[i] + n * this.y[i + 1] + a * t * this.m[i + 1], isNaN(c)) throw console.log("error:", e),
        new Error("error");
        return c
    },
    e
} ();
(function () {
    function e(e, t, n, r) {
        var a;
        var i;
        var o;
        var s;
        var l;
        var c;
        var d;
        var h;
        var u;
        var p;
        var m;
        var f;
        var g;
        var y;
        if (null != e && null != t) {
            o = null != n && null != r;
            u = e.length - 1;
            l = [];
            f = [];
            h = [];
            m = [];
            g = [];
            i = [];
            a = [];
            s = [];
            d = [];
            p = [];
            c = 0;
            for (; 0 <= u ? c < u : c > u; 0 <= u ? c = c + 1 : c = c - 1) {
                l[c] = e[c + 1] - e[c];
                d[c] = t[c + 1] - t[c];
                p[c] = d[c] / l[c]
            }
            if (o) {
                f[0] = 3 * (t[1] - t[0]) / l[0] - 3 * n;
                f[u] = 3 * r - 3 * (t[u] - t[u - 1]) / l[u - 1]
            }
            c = 1;
            for (; 1 <= u ? c < u : c > u; 1 <= u ? c = c + 1 : c = c - 1) f[c] = 3 / l[c] * (t[c + 1] - t[c]) - 3 / l[c - 1] * (t[c] - t[c - 1]);
            if (o) {
                h[0] = 2 * l[0];
                m[0] = .5;
                g[0] = f[0] / h[0]
            } else {
                h[0] = 1;
                m[0] = 0;
                g[0] = 0
            }
            c = 1;
            for (; 1 <= u ? c < u : c > u; 1 <= u ? c = c + 1 : c = c - 1) {
                h[c] = 2 * (e[c + 1] - e[c - 1]) - l[c - 1] * m[c - 1];
                m[c] = l[c] / h[c];
                g[c] = (f[c] - l[c - 1] * g[c - 1]) / h[c]
            }
            if (o) {
                h[u] = l[u - 1] * (2 - m[u - 1]);
                g[u] = (f[u] - l[u - 1] * g[u - 1]) / h[u];
                i[u] = g[u]
            } else {
                h[u] = 1;
                g[u] = 0;
                i[u] = 0
            }
            c = y = u - 1;
            for (; y <= 0 ? c <= 0 : c >= 0; y <= 0 ? c = c + 1 : c = c - 1) {
                i[c] = g[c] - m[c] * i[c + 1];
                a[c] = (t[c + 1] - t[c]) / l[c] - l[c] * (i[c + 1] + 2 * i[c]) / 3;
                s[c] = (i[c + 1] - i[c]) / (3 * l[c])
            }
            this.x = e.slice(0, u + 1);
            this.a = t.slice(0, u);
            this.b = a;
            this.c = i.slice(0, u);
            this.d = s
        }
    }
    e.prototype.derivative = function () {
        var e;
        var t;
        var n;
        var r;
        var a;
        var i;
        var o;
        var s;
        var l;
        var c;
        var d;
        (n = new this.constructor).x = this.x.slice(0, this.x.length);
        n.a = this.b.slice(0, this.b.length);
        a = 0;
        o = (l = this.c).length;
        for (; a < o; a++) {
            e = l[a];
            n.b = 2 * e
        }
        i = 0;
        s = (c = this.d).length;
        for (; i < s; i++) {
            t = c[i];
            n.c = 3 * t
        }
        r = 0;
        d = this.d.length;
        for (; 0 <= d ? r < d : r > d; 0 <= d ? r = r + 1 : r = r - 1) n.d = 0;
        return n
    };
    e.prototype.interpolate = function (e) {
        var t;
        var n;
        var r;
        n = r = this.x.length - 1;
        for (;
        (r <= 0 ? n <= 0 : n >= 0) && !(this.x[n] <= e); r <= 0 ? n = n + 1 : n = n - 1);
        return t = e - this.x[n],
        this.a[n] + this.b[n] * t + this.c[n] * Math.pow(t, 2) + this.d[n] * Math.pow(t, 3)
    }
})();
InterpolateHelper = n

export default InterpolateHelper