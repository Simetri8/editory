import _ from 'lodash';
import Bezier from 'bezier-js';
import jsBezier from 'jsbezier';
import Geometry from '../Geometry/Geometry';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(10) /*ShapeHelper*/

/// var r = n(1)/*Geometry*/;  // 45 times
/// var a = n(2)/*lodash*/;  // 3 times
/// var i = n.n(a);
/// var o = n(7)/*PropUpdateHelper*/;  // 4 times
/// n(108)/*bezierjs*/;  // 0 times
/// n(222)/*jsBezier*/;  // 0 times
class s {
    constructor(e, t) {
        this.perpendicularD = t;
        this.totalLength = 0;
        this.pathInfos = _.map(e, (e, t) => {
            var n = this.getLength(e);
            var r = {
                b: e,
                length: n,
                lengthSofar: this.totalLength,
                index: t
            };
            return this.totalLength += n,
            r
        })
    }
    getMatchPath(e, t) {
        var n = t && this.lastInfo ? this.lastInfo.index : 0;
        for (; n < this.pathInfos.length; n++) {
            var r = this.pathInfos[n];
            if (r.lengthSofar <= e && e <= r.lengthSofar + r.length) return r
        }
    }
    action(e, t, n, a) {
        var i = this.getPoint(t, n, a);
        return " ".concat(e).concat(Geometry.round2(i.x), ",").concat(Geometry.round2(i.y))
    }
    getPoint(e, t, n) {
        t = t || this.perpendicularD;
        var r = this.getMatchPath(e, n);
        return this.lastInfo = r,
        this.getPointFromDistance(r.b, e - r.lengthSofar, t)
    }
}
class l extends s {
    getLength(e) {
        return Geometry.cubicBezierLength(e)
    }
    getPointFromDistance(e, t, n) {
        return Geometry.pointAtDistanceCubic(e, t, n)
    }
    getPointFromDistanceSecondPoint(e, t, n) {
        return Geometry.pointAtDistanceFromSecondPointCubic(e, t, n)
    }
}
class c extends s {
    getLength(e) {
        return Geometry.distance2Points(e.p1, e.p2)
    }
    getPointFromDistance(e, t, n) {
        return Geometry.pointAtDistance(e.p1, e.p2, t, n)
    }
    getPointFromDistanceSecondPoint(e, t, n) {
        return Geometry.pointAtDistanceFromSecondPoint(e.p1, e.p2, t, n)
    }
}
var ShapeHelper = new class {
    pathsD(e) {
        if (!e || e.length <= 0) return "";
        var t = "";
        var n = null;
        var a = e.length > 1;
        var i = 0;
        for (; i < e.length; i++) {
            var o = Geometry.roundPath(e[i]);
            var s = i > 0 ? Geometry.roundPoint(e[i - 1].p2) : null;
            var l = s && Geometry.pointEquals(s, o.p1);
            var c = i === e.length - 1;
            var d = !o.cp;
            if (l && a && d && n && Geometry.pointEquals(o.p2, n.p1)) {
                t = t + " Z";
                n = null
            } else {
                if (!l) t = t + this.actionWith("M", o.p1);
                if (o.cp2) {
                    t = t + this.actionWith("C", o.cp);
                    t = t + this.actionWith("", o.cp2);
                    t = t + this.actionWith("", o.p2)
                } else if (o.cp) {
                    t = t + this.actionWith("Q", o.cp);
                    t = t + this.actionWith("", o.p2)
                } else t = t + this.actionWith("L", o.p2);
                if (a && n && c && Geometry.pointEquals(o.p2, n.p1)) {
                    t = t + " Z";
                    n = null
                } else if (!n) n = Geometry.roundPath(e[i])
            }
        }
        return t
    }
    pathsInfoD(e) {
        var t = "";
        return e.points && (t = t + (" " + this.getLineD(e.points))),
        e.lines && (t = t + (" " + this.pathsD(e.lines))),
        t
    }
    cubicBeziersD(e) {
        var t = "";
        var n = 0;
        for (; n < e.length; n++) {
            var a = Geometry.roundCubicBezier(e[n]);
            var i = n > 0 ? Geometry.roundPoint(e[n - 1].p2) : null;
            if (! (i && i.x === a.p1.x && i.y === a.p1.y)) t = t + this.actionWith("M", a.p1);
            t = t + this.actionWith("C", a.cp);
            t = t + this.actionWith("", a.cp2);
            t = t + this.actionWith("", a.p2)
        }
        return t
    }
    quadraticBeziersD(e) {
        var t = "";
        var n = 0;
        for (; n < e.length; n++) {
            var a = Geometry.roundQuadraticBezier(e[n]);
            var i = n > 0 ? Geometry.roundPoint(e[n - 1].p2) : null;
            if (! (i && i.x === a.p1.x && i.y === a.p1.y)) t = t + this.actionWith("M", a.p1);
            t = t + this.actionWith("Q", a.cp);
            t = t + this.actionWith("", a.p2)
        }
        return t
    }
    getBezierOrStraightLineD(e) {
        var t = "";
        var n = 0;
        for (; n < e.length; n++) {
            var a = e[n];
            if (! (n > 0 && e[n - 1].p2.x === a.p1.x && e[n - 1].p2.y === a.p1.y)) t = t + this.actionWith("M", Geometry.roundPoint(a.p1));
            if (a.cp && a.cp2) {
                t = t + this.actionWith("C", Geometry.roundPoint(a.cp));
                t = t + this.actionWith("", Geometry.roundPoint(a.cp2));
                t = t + this.actionWith("", Geometry.roundPoint(a.p2))
            } else if (a.cp) {
                t = t + this.actionWith("Q", Geometry.roundPoint(a.cp));
                t = t + this.actionWith("", Geometry.roundPoint(a.p2))
            } else t = t + this.actionWith("L", Geometry.roundPoint(a.p2))
        }
        return t
    }
    getLineD(e) {
        if (!e || e.length <= 0) return " ";
        var t = this.actionWith("M", e[0], true);
        var n = 1;
        for (; n < e.length; n++) {
            if (n > 0 && n === e.length - 1) {
                var r = e[0];
                var a = e[n];
                if (r.x === a.x && r.y === a.y) {
                    t = t + " Z";
                    continue
                }
            }
            t = t + this.actionWith("L", e[n], true)
        }
        return t
    }
    getWaveLineD(e, t, n, a, i, o, s, l) {
        i = i || 0;
        o = o || 0;
        s = s || 0;
        l = l || 0;
        var c = Geometry.distance2Points(e, t);
        var d = null;
        var h = null;
        if (i) d = Geometry.getMiddlePointLine(e, t, i / c, 0);
        if (o) h = Geometry.getMiddlePointLine(e, t, 1 - o / c, 0);
        var u = [];
        if (d) u.push({
            p1: e,
            p2: d,
            length: i
        });
        var p = d || e;
        var m = h || t;
        var f = Geometry.distance2Points(p, m);
        var g = p;
        var y = 1;
        var A = n;
        for (; A <= f; A = A + n) {
            var E = Geometry.roundPoint(Geometry.pointAtDistance(p, m, A));
            var v = Geometry.roundPoint(Geometry.getMiddlePointLine(g, E, .5, a * y));
            u.push({
                p1: g,
                cp: v,
                p2: E,
                length: n
            });
            g = E;
            y = -y
        }
        return A < f + n && (E = Geometry.roundPoint(Geometry.pointAtDistance(p, m, f)), u.push({
            p1: g,
            p2: E,
            length: Geometry.distance2Points(g, E)
        }), g = E),
        p != t && (E = Geometry.roundPoint(Geometry.pointAtDistance(e, t, c)), u.push({
            p1: g,
            p2: E,
            length: Geometry.distance2Points(g, E)
        }), g = E),
        s && (u = Geometry.insertBreakForPaths(u, s, l, "ratio")),
        this.getBezierOrStraightLineD(u)
    }
    getWaveLineCubicD(e, t, n, r, a, i, o, s, c, d) {
        return this.getWavePathD(e, t, n, r, a, i, o, s, c, d, l)
    }
    getWavePathD(e, t, n, a, s, l, c, d, h, u, p) {
        a = a || 0;
        s = s || 0;
        l = l || 0;
        d = d || 0;
        if ((c = c || 0) || d) e = _.clone(e);
        var m = new p(e, l);
        if (c && (e[0] = PropUpdateHelper.setProp(e[0], "p1", m.getPointFromDistance(e[0], c)), a = Math.max(0, a - c)), d) {
            var f = e[e.length - 1];
            e[e.length - 1] = PropUpdateHelper.setProp(f, "p2", m.getPointFromDistanceSecondPoint(f, d));
            s = Math.max(0, s - d)
        }
        var g = [];
        var y = (m = new p(e, l)).getPoint(0);
        if (a) {
            y = m.getPoint(a);
            g.push({
                p1: m.getPoint(0),
                p2: y,
                length: a
            })
        }
        var A = 1;
        var E = t + a;
        for (; E <= m.totalLength - s; E = E + t) {
            var v = m.getPoint(E - t / 2, m.perpendicularD + n * A, true);
            var S = m.getPoint(E, null, true);
            g.push({
                p1: y,
                cp: v,
                p2: S,
                length: t
            });
            A = -A;
            y = S
        }
        return E < m.totalLength - s + t && (S = m.getPoint(m.totalLength - s, null, true), g.push({
            p1: y,
            p2: S,
            length: Geometry.distance2Points(y, S)
        }), y = S),
        s && (S = m.getPoint(m.totalLength, null, true), g.push({
            p1: y,
            p2: S,
            length: Geometry.distance2Points(y, S)
        }), y = S),
        h && (g = Geometry.insertBreakForPaths(g, h, u, "ratio")),
        this.pathsD(g)
    }
    actionWith(e, t, n) {
        return n ? " ".concat(e).concat(Geometry.round2(t.x), ",").concat(Geometry.round2(t.y)) : " ".concat(e).concat(t.x, ",").concat(t.y)
    }
    getRulerLinesDFromPoints(e, t, n) {
        var r = "";
        var a = [];
        var i = 0;
        for (; i < e.length - 1; i++) {
            var o = e[i];
            var s = e[i + 1];
            if (0 === i) r = r + this.actionWith("M", o);
            r = r + this.actionWith("L", s);
            a.push({
                p1: o,
                p2: s
            })
        }
        return r = r + this.getRulerMarkPathD(a, t, n, 0, 0, 0, 0, 0, c)
    }
    getRulerBeziersD(e, t, n) {
        var r = this.cubicBeziersD(e);
        return r = r + this.getRulerMarkPathD(e, t, n, 0, 0, 0, 0, 0, l)
    }
    getRulerMarkPathD(e, t, n, r, a, s, l, c, d) {
        r = r || 0;
        a = a || 0;
        l = l || 0;
        c = c || 0;
        var h = new d(e, s = s || 0);
        if ((l || c) && (e = _.clone(e)), l && (e[0] = PropUpdateHelper.setProp(e[0], "p1", h.getPointFromDistance(e[0], l)), r = Math.max(0, r - l)), c) {
            var u = e[e.length - 1];
            e[e.length - 1] = PropUpdateHelper.setProp(u, "p2", h.getPointFromDistanceSecondPoint(u, c));
            a = Math.max(0, a - c)
        }
        var p = "";
        var m = t + r;
        for (; m < h.totalLength - a; m = m + t) {
            p = p + h.action("M", m, h.perpendicularD + n / 2, true);
            p = p + h.action("L", m, h.perpendicularD - n / 2, true)
        }
        return p
    }
}

export default ShapeHelper