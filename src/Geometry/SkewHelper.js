import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Geometry from './Geometry';

/// xxx(81) /*SkewHelper*/

/// var r = n(35)/*slicedToArray*/;  // 4 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 23 times
var SkewHelper = new class {
    threePointsToRectangleInfo(e, t, n) {
        e.y === n.y && (n = {
            x: n.x,
            y: e.y + 1
        });
        var r = {
            x: n.x - (t.x - e.x),
            y: e.y + (n.y - t.y)
        },
        o = Geometry.angleFrom2Points360P(e, t),
        s = Geometry.angleDifferentFrom3Points180(e, n, t) - 90,
        l = Geometry.getMiddlePointLine(e, n, .5, 0),
        c = Geometry.pointsRotate([e, t, n, r], l, -o),
        d = this.pointsFromSkew(l, -s, c),
        h = slicedToArray(d, 3),
        u = h[0],
        p = h[2],
        m = Geometry.round2(o);
        return 360 === m && (m = 0),
        {
            p1: u,
            p2: p,
            skewX: Geometry.round2(s) || void 0,
            rotation: m || void 0
        }
    }
    pointsFromSkew(e, t, n) {
        if (!t) return n;
        var r = e.y,
        a = Math.tan(Geometry.toRadians(t));
        return n.map(e => {
            var t = e.y - r,
            n = a * t;
            return {
                x: e.x + n,
                y: e.y
            }
        })
    }
    pointsFromSkewedRect(e, t, n) {
        var r = Geometry.getCenterPoint(e);
        return this.pointsFromSkew(r, t, n)
    }
    genericLinesFromSkewedRect(e, t, n) {
        var r = Geometry.getCenterPoint(e);
        return this.genericLinesFromSkewedCenter(r, t, n)
    }
    genericLinesFromSkewedCenter(e, t, n) {
        return n.map(n => {
            if (!t) return n;
            if (Geometry.isCubicBezierData(n)) {
                var r = this.pointsFromSkew(e, t, [n.p1, n.p2, n.cp, n.cp2]),
                o = slicedToArray(r, 4);
                return {
                    p1: o[0],
                    p2: o[1],
                    cp: o[2],
                    cp2: o[3]
                }
            }
            if (Geometry.isQuadraticBezierData(n)) {
                var s = this.pointsFromSkew(e, t, [n.p1, n.p2, n.cp]),
                l = slicedToArray(s, 3);
                return {
                    p1: l[0],
                    p2: l[1],
                    cp: l[2]
                }
            }
            var c = this.pointsFromSkew(e, t, [n.p1, n.p2]),
            d = slicedToArray(c, 2);
            return {
                p1: d[0],
                p2: d[1]
            }
        })
    }
    pointsRotatedSkewedShape(e, t) {
        return Geometry.rotatePointsByShapeRect({
            data: e
        },
        this.pointsFromSkewedRect(e, e.skewX, t))
    }
    pointRotatedSkewedShape(e, t) {
        return Geometry.rotatePointsByShapeRect({
            data: e
        },
        this.pointsFromSkewedRect(e, e.skewX, [t]))[0]
    }
    pointRotatedSkewed(e, t, n, r) {
        var a = this.pointsFromSkew(e, n, [r])[0];
        return Geometry.pointRotate(a, e, t)
    }
    pointSkewed(e, t, n) {
        return this.pointsFromSkew(e, t, [n])[0]
    }
    reversePointRotatedSkewed(e, t, n, r) {
        var a = Geometry.pointRotate(r, e, -t);
        return this.pointsFromSkew(e, -n, [a])[0]
    }
    reversePointRotatedSkewedFixedY(e, t, n, r, a) {
        var o = Geometry.pointRotate(a, e, -t);
        return this.pointsFromSkew(e, -n, [{
            x: o.x,
            y: r
        }])[0]
    }
    genericLinesRotatedSkewedShape(e, t) {
        return Geometry.rotateGenericLinesByShapeRect({
            data: e
        },
        this.genericLinesFromSkewedRect(e, e.skewX, t))
    }
    pointUnskewedRect(e, t) {
        var n = Geometry.getCenterPoint(e);
        return this.pointsFromSkew(n, -e.skewX, t)
    }
    skewXAngleFromDisplacement(e, t, n) {
        var r = Geometry.getCenterPoint(e),
        a = (n.x - t.x) / (t.y - r.y);
        return Geometry.toDegree(Math.atan(a))
    }
    skewXAngleFromDisplacementCp(e, t, n) {
        var r = (n.x - t.x) / (t.y - e.y);
        return Geometry.toDegree(Math.atan(r))
    }
    rectTo4PointsSkewed(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
        r = e.p1,
        a = e.p2,
        o = this.pointsFromSkewedRect(e, t, [r, {
            x: a.x,
            y: r.y
        },
        a, {
            x: r.x,
            y: a.y
        }]),
        s = Geometry.getCenterPoint(e);
        return Geometry.pointsRotate(o, s, n)
    }
}

export default SkewHelper