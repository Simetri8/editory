import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Geometry from '../Geometry/Geometry';
import SkewHelper from '../Geometry/SkewHelper';

/// xxx(8) /*ShapeUtil*/

/// var r = n(35)/*slicedToArray*/;  // 6 times
/// var a = n.n(r);
/// var i = n(3)/*_.assignIn*/;  // 15 times
/// var o = n.n(i);
/// var s = n(81)/*SkewHelper*/;  // 7 times
/// var l = n(1)/*Geometry*/;  // 123 times
var ShapeUtil = new class {
    threePointsToRectangleInfo(e, t, n) {
        var r = {
            x: n.x - (t.x - e.x),
            y: e.y + (n.y - t.y)
        };
        var a = null;
        return this.isFlipped(e, t, n) ? (a = SkewHelper.threePointsToRectangleInfo(t, e, r), a = _.assignIn({},
        a, {
            flipX: true
        })) : (a = SkewHelper.threePointsToRectangleInfo(e, t, n), a = _.assignIn({},
        a, {
            flipX: void 0
        }));
        this.makeSureNonZeroWidthHeight(a)
    }
    makeSureNonZeroWidthHeight(e) {
        return e.p1.x === e.p2.x && e.p1.y === e.p2.y ? _.assignIn({},
        e, {
            p2: {
                x: e.p1.x + 1,
                y: e.p1.y + 1
            }
        }) : e.p1.x === e.p2.x ? _.assignIn({},
        e, {
            p2: {
                x: e.p1.x + 1,
                y: e.p2.y
            }
        }) : e.p1.y === e.p2.y ? _.assignIn({},
        e, {
            p2: {
                x: e.p2.x,
                y: e.p1.y + 1
            }
        }) : e
    }
    isFlipped(e, t, n) {
        var r = e;
        var a = n;
        var i = t;
        return (a.x - r.x) * (i.y - r.y) - (a.y - r.y) * (i.x - r.x) > 0
    }
    genericLinesTransformed(e, t) {
        var n = Geometry.getCenterPoint(e);
        var r = this.genericLinesFlipped(n, e.flipX, t);
        return SkewHelper.genericLinesRotatedSkewedShape(e, r)
    }
    pointsTransformed(e, t) {
        var n = Geometry.getCenterPoint(e);
        return t.map((t) => {
            return this.pointTransformedFromDetails(n, e.rotation, e.skewX, e.flipX, t)
        })
    }
    pointTransformed(e, t) {
        var n = Geometry.getCenterPoint(e);
        return this.pointTransformedFromDetails(n, e.rotation, e.skewX, e.flipX, t)
    }
    pointTransformedFromDetails(e, t, n, r, i) {
        var o = this.pointsFlipped(e, r, [i]);
        var l = slicedToArray(o, 1)[0];
        return SkewHelper.pointRotatedSkewed(e, t, n, l)
    }
    reversePointFixedY(e, t, n) {
        var r = Geometry.getCenterPoint(e);
        var a = SkewHelper.reversePointRotatedSkewedFixedY(r, e.rotation, e.skewX, t, n);
        return this.pointsFlipped(r, e.flipX, [a])[0]
    }
    reversePoint(e, t) {
        var n = Geometry.getCenterPoint(e);
        var r = SkewHelper.reversePointRotatedSkewed(n, e.rotation, e.skewX, t);
        return this.pointsFlipped(n, e.flipX, [r])[0]
    }
    pointsFlipped(e, t, n) {
        return t ? n.map((t) => {
            return {
                x: Geometry.reflectPoint(t, e).x,
                y: t.y
            }
        }) : n
    }
    genericLinesFlipped(e, t, n) {
        return t ? n.map((n) => {
            if (Geometry.isCubicBezierData(n)) {
                var r = this.pointsFlipped(e, t, [n.p1, n.p2, n.cp, n.cp2]);
                var i = slicedToArray(r, 4);
                return {
                    p1: i[0],
                    p2: i[1],
                    cp: i[2],
                    cp2: i[3]
                }
            }
            if (Geometry.isQuadraticBezierData(n)) {
                var o = this.pointsFlipped(e, t, [n.p1, n.p2, n.cp]);
                var s = slicedToArray(o, 3);
                return {
                    p1: s[0],
                    p2: s[1],
                    cp: s[2]
                }
            }
            var c = this.pointsFlipped(e, t, [n.p1, n.p2]);
            var d = slicedToArray(c, 2);
            return {
                p1: d[0],
                p2: d[1]
            }
        }) : n
    }
    rectTo4Points(e) {
        var t = e.skewX;
        var n = e.rotation;
        var r = e.flipX;
        var i = SkewHelper.rectTo4PointsSkewed(e, t, n);
        var o = slicedToArray(i, 4);
        var l = o[0];
        var c = o[1];
        var d = o[2];
        var h = o[3];
        return r ? [c, l, h, d] : [l, c, d, h]
    }
    moveControlPoint(e, t, n, r) {
        if (t.p1.x === t.p2.x) t = _.assignIn({},
        t, {
            p2: {
                x: t.p1.x + 1,
                y: t.p2.y
            }
        });
        if (t.p1.y === t.p2.y) t = _.assignIn({},
        t, {
            p2: {
                x: t.p2.x,
                y: t.p1.y + 1
            }
        });
        var i = this.rectTo4Points(t);
        var s = slicedToArray(i, 4);
        var c = s[0];
        var d = s[1];
        var h = s[2];
        var u = s[3];
        var p = Geometry.getCenterPoint(t);
        switch (e) {
        case "left-top":
            var m = Geometry.substractPoint(u, h);
            var f = Geometry.substractPoint(d, h);
            var g = n;
            var y = Geometry.intersectRayRay(g, Geometry.addPoint(g, m), h, d);
            var A = Geometry.intersectRayRay(g, Geometry.addPoint(g, f), h, u);
            var E = h;
            if (r.keepRatio) {
                var v = this.findMaxRatio(A, u, y, d, h);
                A = this.findPointByRatio(A, h, u, v);
                y = this.findPointByRatio(y, h, d, v);
                g = {
                    x: A.x + (y.x - h.x),
                    y: A.y - (h.y - y.y)
                }
            }
            if (r.symmetricResize) {
                E = Geometry.reflectPoint(g, p);
                y = Geometry.intersectRayRay(g, Geometry.addPoint(g, m), E, Geometry.addPoint(E, f))
            }
            var S = this.threePointsToRectangleInfo(g, y, E);
            return _.assignIn({},
            t, S);
        case "top":
            var C = Geometry.substractPoint(u, h);
            var x = Geometry.substractPoint(u, c);
            var I = Geometry.intersectRayRay(n, Geometry.addPoint(n, C), c, u);
            var T = Geometry.intersectRayRay(n, Geometry.addPoint(n, C), h, d);
            var b = h;
            if (r.keepRatio) {
                var L = Geometry.distance2Points(I, u) / Geometry.distance2Points(c, u);
                b = this.findPointByRatio(b, u, h, L);
                T = {
                    x: I.x + (b.x - u.x),
                    y: I.y + (b.y - u.y)
                }
            }
            if (r.symmetricResize) {
                var R = Geometry.reflectPoint(T, p);
                b = Geometry.intersectRayRay(R, Geometry.addPoint(R, C), T, Geometry.addPoint(T, x));
                I = Geometry.intersectRayRay(R, Geometry.addPoint(R, x), T, Geometry.addPoint(T, C))
            }
            var M = this.threePointsToRectangleInfo(I, T, b);
            return _.assignIn({},
            t, M);
        case "top-right":
            var w = Geometry.substractPoint(c, u);
            var O = Geometry.substractPoint(h, u);
            var D = n;
            var N = Geometry.intersectRayRay(D, Geometry.addPoint(D, O), u, c);
            var k = Geometry.intersectRayRay(D, Geometry.addPoint(D, w), u, h);
            if (r.keepRatio) {
                var B = this.findMaxRatio(N, c, k, h, u);
                N = this.findPointByRatio(N, u, c, B);
                k = this.findPointByRatio(k, u, h, B);
                D = {
                    x: N.x + (k.x - u.x),
                    y: N.y + (k.y - u.y)
                }
            }
            if (r.symmetricResize) {
                var P = Geometry.reflectPoint(D, p);
                N = Geometry.intersectRayRay(P, Geometry.addPoint(P, w), D, Geometry.addPoint(D, O));
                k = Geometry.intersectRayRay(P, Geometry.addPoint(P, O), D, Geometry.addPoint(D, w))
            }
            var F = this.threePointsToRectangleInfo(N, D, k);
            return _.assignIn({},
            t, F);
        case "right":
            var H = Geometry.substractPoint(c, u);
            var Sb = Geometry.substractPoint(h, u);
            var U = Geometry.intersectRayRay(n, Geometry.addPoint(n, H), c, d);
            var W = Geometry.intersectRayRay(n, Geometry.addPoint(n, H), u, h);
            var G = c;
            if (r.keepRatio) {
                var z = Geometry.distance2Points(U, c) / Geometry.distance2Points(d, c);
                W = this.findPointByRatio(W, U, W, z)
            }
            if (r.symmetricResize) {
                G = Geometry.reflectPoint(W, p);
                U = Geometry.intersectRayRay(G, Geometry.addPoint(G, Sb), W, Geometry.addPoint(W, H))
            }
            var Y = this.threePointsToRectangleInfo(G, U, W);
            return _.assignIn({},
            t, Y);
        case "right-bottom":
            var K = Geometry.substractPoint(c, u);
            var V = Geometry.substractPoint(c, d);
            var j = n;
            var q = c;
            var Q = Geometry.intersectRayRay(j, Geometry.addPoint(j, K), c, d);
            var Z = Geometry.intersectRayRay(j, Geometry.addPoint(j, V), c, u);
            if (r.keepRatio) {
                var X = this.findMaxRatio(Z, u, Q, d, c);
                Q = this.findPointByRatio(Q, c, d, X);
                Z = this.findPointByRatio(Z, c, u, X);
                j = {
                    x: Q.x - (c.x - Z.x),
                    y: Q.y + (Z.y - c.y)
                }
            }
            if (r.symmetricResize) {
                q = Geometry.reflectPoint(j, p);
                Q = Geometry.intersectRayRay(q, Geometry.addPoint(q, V), j, Geometry.addPoint(j, K))
            }
            var J = this.threePointsToRectangleInfo(q, Q, j);
            return _.assignIn({},
            t, J);
        case "bottom":
            var $ = Geometry.substractPoint(c, d);
            var ee = Geometry.substractPoint(h, d);
            var te = Geometry.intersectRayRay(n, Geometry.addPoint(n, $), d, h);
            var ne = Geometry.intersectRayRay(n, Geometry.addPoint(n, $), c, u);
            var re = c;
            var ae = d;
            if (r.keepRatio) {
                var ie = Geometry.distance2Points(te, d) / Geometry.distance2Points(h, d);
                re = this.findPointByRatio(re, d, c, ie);
                ne = Geometry.intersectRayRay(re, Geometry.addPoint(re, ee), te, Geometry.addPoint(te, $))
            }
            if (r.symmetricResize) {
                ae = Geometry.reflectPoint(ne, p);
                te = Geometry.intersectRayRay(ne, Geometry.addPoint(ne, $), ae, Geometry.addPoint(ae, ee));
                re = Geometry.intersectRayRay(ne, Geometry.addPoint(ne, ee), ae, Geometry.addPoint(ae, $))
            }
            var oe = this.threePointsToRectangleInfo(re, ae, te);
            return _.assignIn({},
            t, oe);
        case "bottom-left":
            var se = Geometry.substractPoint(h, d);
            var le = Geometry.substractPoint(c, d);
            var ce = n;
            var de = Geometry.intersectRayRay(ce, Geometry.addPoint(ce, se), c, d);
            var he = Geometry.intersectRayRay(ce, Geometry.addPoint(ce, le), h, d);
            var ue = d;
            if (r.keepRatio) {
                var pe = this.findMaxRatio(de, c, he, h, d);
                de = this.findPointByRatio(de, d, c, pe);
                he = this.findPointByRatio(he, d, h, pe);
                ce = Geometry.intersectRayRay(de, Geometry.addPoint(de, se), he, Geometry.addPoint(he, le))
            }
            if (r.symmetricResize) {
                ue = Geometry.reflectPoint(ce, p);
                de = Geometry.intersectRayRay(ce, Geometry.addPoint(ce, se), ue, Geometry.addPoint(ue, le));
                he = Geometry.intersectRayRay(ce, Geometry.addPoint(ce, le), ue, Geometry.addPoint(ue, se))
            }
            var me = this.threePointsToRectangleInfo(de, ue, he);
            return _.assignIn({},
            t, me);
        case "left":
            var fe = Geometry.substractPoint(d, h);
            var ge = Geometry.substractPoint(u, h);
            var ye = Geometry.intersectRayRay(n, Geometry.addPoint(n, fe), d, c);
            var Ae = d;
            var Ee = h;
            if (r.keepRatio) {
                var ve = Geometry.distance2Points(ye, d) / Geometry.distance2Points(c, d);
                Ae = this.findPointByRatio(Ae, h, d, ve);
                var Se = Geometry.intersectRayRay(n, Geometry.addPoint(n, fe), h, u);
                ye = {
                    x: Se.x + (Ae.x - h.x),
                    y: Se.y - (h.y - Ae.y)
                }
            }
            if (r.symmetricResize) {
                Ee = Geometry.reflectPoint(ye, p);
                Ae = Geometry.intersectRayRay(ye, Geometry.addPoint(ye, ge), Ee, Geometry.addPoint(Ee, fe))
            }
            var Ce = this.threePointsToRectangleInfo(ye, Ae, Ee);
            return _.assignIn({},
            t, Ce)
        }
        return t
    }
    findPointByRatio(e, t, n, r) {
        var a = Geometry.getMiddlePointLine(t, n, r);
        var i = Geometry.getMiddlePointLine(t, n, -r);
        return Geometry.distance2Points(e, a) < Geometry.distance2Points(e, i) ? a : i
    }
    findMaxRatio(e, t, n, r, a) {
        return Math.max(Geometry.distance2Points(e, a) / Geometry.distance2Points(t, a), Geometry.distance2Points(n, a) / Geometry.distance2Points(r, a))
    }
}

export default ShapeUtil