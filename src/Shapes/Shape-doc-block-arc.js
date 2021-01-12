import _ from 'lodash';
import React from 'react';
import BezierReverser from '../Geometry/BezierReverser';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(289) /*Shape-doc-block-arc*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return f
}),*/
/*n.d(t, "b", function () {
    return g
}),*/
/*n.d(t, "c", function () {
    return A
});*/
/// var r = n(3)/*_.assignIn*/,  // 3 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 4 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 8 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 11 times
/// d = n(10)/*ShapeHelper*/,  // 1 times
/// h = n(9)/*ShapeBase*/,  // 1 times
/// u = n(135)/*BezierReverser*/,  // 2 times
/// p = n(8)/*ShapeUtil*/;  // 5 times
class m extends ShapeBase {
    render() {
        var e = g(f(this.shape())),
        t = ShapeHelper.pathsD(e);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), this.getTransparentOnlyNoFill(t), React.createElement("path", {
            className: "real",
            d: t,
            style: this.style()
        }))
    }
}
function f(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.angle1,
    i = void 0 === a ? 70 : a,
    o = t.angle2,
    s = void 0 === o ? 290 : o,
    d = t.sizePercentage,
    h = void 0 === d ? .4 : d,
    m = Geometry.rectWidth(e.data),
    f = Geometry.rectHeight(e.data),
    g = Math.min(m / 2, f / 2),
    y = Math.min(g, g * h),
    A = Object(BezierReverser)({
        p1: n,
        p2: r
    },
    i, s),
    E = _.reverse(Geometry.reverseBeziersDirection(Object(BezierReverser)({
        p1: {
            x: n.x + y,
            y: n.y + y
        },
        p2: {
            x: r.x - y,
            y: r.y - y
        }
    },
    i, s))),
    v = _.first(A),
    S = _.last(A),
    C = _.first(E),
    x = _.last(E);
    return {
        outerCurve: ShapeUtil.genericLinesTransformed(e.data, A),
        innerCurve: ShapeUtil.genericLinesTransformed(e.data, E),
        firstConnectionLine: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: S.p2.x,
                y: S.p2.y
            },
            p2: {
                x: C.p1.x,
                y: C.p1.y
            }
        }]),
        secondConnectionLine: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: x.p2.x,
                y: x.p2.y
            },
            p2: {
                x: v.p1.x,
                y: v.p1.y
            }
        }])
    }
}
function g(e) {
    return [...e.outerCurve, ...e.firstConnectionLine, ...e.innerCurve, ...e.secondConnectionLine]
}
class y extends ShapeBaseC {}
var A = new class extends ShapeBaseB {
    getComponent() {
        return m
    }
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: this.getType()
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)"
                },
                d: " M12.01,15.53 C11.46,15.69 10.87,15.78 10.27,15.78 C6.92,15.78 4.2,13.19 4.2,9.99 C4.2,6.79 6.92,4.2 10.27,4.2 C12.67,4.2 14.75,5.53 15.73,7.47 L12.76,8.84 C12.29,8.02 11.35,7.47 10.27,7.47 C8.72,7.47 7.47,8.6 7.47,9.99 C7.47,11.38 8.72,12.51 10.27,12.51 C10.53,12.51 10.79,12.48 11.03,12.41 Z"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 70,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "doc-block-arc"
    }
    getSettingsComponent() {
        return y
    }
    getAngleCutPoints(e) {
        var t = f(e);
        return [{
            key: "ap1",
            p: _.first(t.outerCurve).p1,
            type: "square"
        },
        {
            key: "ap2",
            p: _.first(t.innerCurve).p1,
            type: "square"
        }]
    }
    getSnapablePoints(e) {
        var t = f(e);
        return t.outerCurve.concat(t.innerCurve).map(e => e.p2).concat([t.outerCurve[0].p1, t.innerCurve[0].p1, Geometry.getCenterPoint(e.data)])
    }
    getControlPoints(e, t) {
        return super.getControlPoints(e, t).concat(this.getAngleCutPoints(e))
    }
    moveControlPoint(e) {
        var t = e.key,
        n = e.shape,
        r = Geometry.getCenterPoint(n.data),
        i = n.data,
        o = i.p1,
        s = i.p2,
        d = ShapeUtil.reversePoint(e.shape.data, e.point),
        h = Geometry.angleFrom3Points360({
            x: s.x,
            y: r.y
        },
        d, r),
        u = s.x - o.x,
        m = s.y - o.y,
        f = Math.max(u, m),
        g = Math.min(u / 2, m / 2);
        switch (t) {
        case "ap1":
            return this.changeShapeData(e.shape, "angle1", h);
        case "ap2":
            var y = {
                p1: r,
                p2: Geometry.pointRotate({
                    x: s.x + f,
                    y: r.y
                },
                r, h)
            },
            A = Geometry.ellipseToCubicBeziers(o, s),
            E = n.data.sizePercentage,
            v = null;
            if (A.find(e => {
                var t = Geometry.splitBezierByLine(e, y);
                if (t && t.length > 0) return v = t[0].p2,
                !0
            }), v) {
                var S = Geometry.distance2Points(v, r),
                C = Geometry.distance2Points(d, r);
                E = _.clamp(S - C, 0, g) / g
            }
            return _.assignIn({},
            n, {
                data: _.assignIn({},
                n.data, {
                    angle2: h,
                    sizePercentage: E
                })
            })
        }
        return super.moveControlPoint(e)
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: g(f(e))
        }
    }
}

export { g as ShapeDocBlockArcB }

export { A as ShapeDocBlockArcC }

export default f