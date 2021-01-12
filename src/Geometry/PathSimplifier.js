
/// xxx(539) /*PathSimplifier*/
/*paper.js PathFitter*//*.Numerical*/class r {
    static isZero(e) {
        return e >= -r.EPSILON && e <= r.EPSILON
    }
}
r.EPSILON = 1E-12;/*.Point*/class a {
    constructor(e, t) {
        this.x = e;
        this.y = t
    }
    subtract(e) {
        return new a(this.x - e.x, this.y - e.y)
    }
    getDistance(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = e.x - this.x;
        var r = e.y - this.y;
        var a = n * n + r * r;
        return t ? a : Math.sqrt(a)
    }
    normalize() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        var t = this.getLength();
        var n = 0 !== t ? e / t : 0;
        var r = new a(this.x * n, this.y * n);
        return n >= 0 && (r._angle = this._angle),
        r
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    add(e) {
        return new a(this.x + e.x, this.y + e.y)
    }
    negate() {
        return new a(-this.x, -this.y)
    }
    multiply(e) {
        return new a(this.x * e, this.y * e)
    }
    dot(e) {
        return this.x * e.x + this.y * e.y
    }
    isZero() {
        var e = r.isZero;
        return e(this.x) && e(this.y)
    }
}/*.Segment*/class i {
    constructor(e, t) {
        this._point = e;
        this._handleIn = t
    }
    setHandleOut(e) {
        this._handleOut = e
    }
    _transformCoordinates(e, t, n) {
        var r = this._point;
        var a = n && this._handleIn.isZero() ? null : this._handleIn;
        var i = n && this._handleOut.isZero() ? null : this._handleOut;
        var o = r.x;
        var s = r.y;
        var l = 2;
        return t[0] = o,
        t[1] = s,
        a && (t[2] = a.x + o, t[3] = a.y + s),
        i && (t[4] = i.x + o, t[5] = i.y + s),
        e && (e._transformCoordinates(t, t, l / 2), o = t[0], s = t[1], n ? (r.x = o, r.y = s, l = 2, a && (a.x = t[l++] - o, a.y = t[l++] - s), i && (i.x = t[l++] - o, i.y = t[l++] - s)) : (a || (t[l++] = o, t[l++] = s), i || (t[l++] = o, t[l++] = s))),
        t
    }
}
/*n.d(t, "a", function () {
    return o
});*/
class o {
    constructor(e) {
        this.points = [];
        this.points = e.map((e) => {
            return new a(e.x, e.y)
        })
    }
    simplify() {
        var e = this.fit();
        return this.toCubicBezier(e)
    }
    toCubicBezier(e) {
        var t;
        var n;
        var r;
        var a;
        var i;
        var o;
        var s;
        var l;
        var c = e.length;
        var d = new Array(6);
        var h = true;
        var u = [];
        if (!c) return [];
        var p = 0;
        for (; p < c; p++) {
            e[p]._transformCoordinates(null, d);
            t = d[0];
            n = d[1];
            if (h) h = false;
            else {
                i = d[2];
                o = d[3];
                u.push({
                    p1: {
                        x: r,
                        y: a
                    },
                    p2: {
                        x: t,
                        y: n
                    },
                    cp: {
                        x: s,
                        y: l
                    },
                    cp2: {
                        x: i,
                        y: o
                    }
                })
            }
            r = t;
            a = n;
            s = d[4];
            l = d[5]
        }
        return u
    }
    fit() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2.5;
        var t = this.points;
        var n = t.length;
        var r = [];
        return n > 0 && (r = [new i(t[0])], n > 1 && this.fitCubic(r, e, 0, n - 1, t[1].subtract(t[0]), t[n - 2].subtract(t[n - 1]))),
        r
    }
    fitCubic(e, t, n, r, a, i) {
        var o = this.points;
        if (r - n != 1) {
            var s;
            var l = this.chordLengthParameterize(n, r);
            var c = Math.max(t, t * t);
            var d = true;
            var h = 0;
            for (; h <= 4; h++) {
                var u = this.generateBezier(n, r, l, a, i);
                var p = this.findMaxError(n, r, u, l);
                if (p.error < t && d) return void this.addCurve(e, u);
                if (s = p.index, p.error >= c) break;
                d = this.reparameterize(n, r, l, u);
                c = p.error
            }
            var m = o[s - 1].subtract(o[s + 1]);
            this.fitCubic(e, t, n, s, a, m);
            this.fitCubic(e, t, s, r, m.negate(), i)
        } else {
            var f = o[n];
            var g = o[r];
            var y = f.getDistance(g) / 3;
            this.addCurve(e, [f, f.add(a.normalize(y)), g.add(i.normalize(y)), g])
        }
    }
    addCurve(e, t) {
        e[e.length - 1].setHandleOut(t[1].subtract(t[0]));
        e.push(new i(t[3], t[2].subtract(t[3])))
    }
    generateBezier(e, t, n, a, i) {
        var o = r.EPSILON;
        var s = Math.abs;
        var l = this.points;
        var c = l[e];
        var d = l[t];
        var h = [[0, 0], [0, 0]];
        var u = [0, 0];
        var p = 0;
        var m = t - e + 1;
        for (; p < m; p++) {
            var f = n[p];
            var g = 1 - f;
            var y = 3 * f * g;
            var A = g * g * g;
            var E = y * g;
            var v = y * f;
            var S = f * f * f;
            var C = a.normalize(E);
            var x = i.normalize(v);
            var I = l[e + p].subtract(c.multiply(A + E)).subtract(d.multiply(v + S));
            h[0][0] += C.dot(C);
            h[0][1] += C.dot(x);
            h[1][0] = h[0][1];
            h[1][1] += x.dot(x);
            u[0] += C.dot(I);
            u[1] += x.dot(I)
        }
        var T;
        var b;
        var L = h[0][0] * h[1][1] - h[1][0] * h[0][1];
        if (s(L) > o) {
            var R = h[0][0] * u[1] - h[1][0] * u[0];
            T = (u[0] * h[1][1] - u[1] * h[0][1]) / L;
            b = R / L
        } else {
            var M = h[0][0] + h[0][1];
            var w = h[1][0] + h[1][1];
            T = b = s(M) > o ? u[0] / M : s(w) > o ? u[1] / w : 0
        }
        var O;
        var D;
        var N = d.getDistance(c);
        var k = o * N;
        if (T < k || b < k) T = b = N / 3;
        else {
            var B = d.subtract(c);
            O = a.normalize(T);
            D = i.normalize(b);
            if (O.dot(B) - D.dot(B) > N * N) {
                T = b = N / 3;
                O = D = null
            }
        }
        return [c, c.add(O || a.normalize(T)), d.add(D || i.normalize(b)), d]
    }
    reparameterize(e, t, n, r) {
        var a = e;
        for (; a <= t; a++) n[a - e] = this.findRoot(r, this.points[a], n[a - e]);
        var i = 1;
        var o = n.length;
        for (; i < o; i++) if (n[i] <= n[i - 1]) return false;
        return true
    }
    findRoot(e, t, n) {
        var a = [];
        var i = [];
        var o = 0;
        for (; o <= 2; o++) a[o] = e[o + 1].subtract(e[o]).multiply(3);
        o = 0;
        for (; o <= 1; o++) i[o] = a[o + 1].subtract(a[o]).multiply(2);
        var s = this.evaluate(3, e, n);
        var l = this.evaluate(2, a, n);
        var c = this.evaluate(1, i, n);
        var d = s.subtract(t);
        var h = l.dot(l) + d.dot(c);
        return r.isZero(h) ? n : n - d.dot(l) / h
    }
    evaluate(e, t, n) {
        var r = t.slice();
        var a = 1;
        for (; a <= e; a++) {
            var i = 0;
            for (; i <= e - a; i++) r[i] = r[i].multiply(1 - n).add(r[i + 1].multiply(n))
        }
        return r[0]
    }
    chordLengthParameterize(e, t) {
        var n = [0];
        var r = e + 1;
        for (; r <= t; r++) n[r - e] = n[r - e - 1] + this.points[r].getDistance(this.points[r - 1]);
        var a = 1;
        var i = t - e;
        for (; a <= i; a++) n[a] /= n[i];
        return n
    }
    findMaxError(e, t, n, r) {
        var a = Math.floor((t - e + 1) / 2);
        var i = 0;
        var o = e + 1;
        for (; o < t; o++) {
            var s = this.evaluate(3, n, r[o - e]).subtract(this.points[o]);
            var l = s.x * s.x + s.y * s.y;
            if (l >= i) {
                i = l;
                a = o
            }
        }
        return {
            error: i,
            index: a
        }
    }
}

export default o