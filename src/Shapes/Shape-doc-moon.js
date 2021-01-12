import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(405) /*Shape-doc-moon*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return g
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 4 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 13 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 1 times
/// u = n(8)/*ShapeUtil*/;  // 3 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
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
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? .5 : a,
    o = Geometry.rectWidth(e.data),
    s = i * o,
    l = Geometry.rectHeight(e.data) / 2,
    d = n.x + o + s,
    h = n.y + l,
    p = {
        x: -s,
        y: -l
    },
    m = Math.pow(p.y, 2) / (1 - Math.pow(p.x, 2) / Math.pow(o, 2)),
    f = Math.sqrt(m),
    g = Geometry.ellipseToCubicBeziers({
        x: n.x,
        y: n.y
    },
    {
        x: n.x + 2 * o,
        y: r.y
    }),
    y = Geometry.ellipseToCubicBeziers({
        x: d - o,
        y: h - f
    },
    {
        x: d + o,
        y: h + f
    }),
    A = Geometry.splitBezierByLine(y[0], {
        p1: n,
        p2: {
            x: n.x + 2 * o,
            y: n.y
        }
    }),
    E = Geometry.splitBezierByLine(y[3], {
        p1: {
            x: n.x,
            y: r.y
        },
        p2: {
            x: n.x + 2 * o,
            y: r.y
        }
    }),
    v = Geometry.reverseBezierDirection(A.length > 0 ? A[0] : y[0]),
    S = Geometry.reverseBezierDirection(E.length > 0 ? E[1] : y[3]);
    return v.p1 = g[0].p2,
    S.p2 = g[3].p1,
    ShapeUtil.genericLinesTransformed(e.data, [g[3], g[0], v, S])
}
class f extends ShapeBaseC {}
var g = new class extends ShapeBaseB {
    getComponent() {
        return p
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
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M13.63,16 C9.76,16 6.63,13.37 6.63,10.13 C6.63,6.88 9.76,4.25 13.63,4.25 C11.08,5.21 9.3,7.48 9.3,10.13 C9.3,12.77 11.08,15.04 13.63,16 Z"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 40,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .5 : i,
        s = Geometry.rectWidth(e.data),
        l = Geometry.rectHeight(e.data),
        d = o * s,
        h = ShapeUtil.pointTransformed(e.data, {
            x: a.x + d,
            y: a.y + l / 2
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: h
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectWidth(e.shape.data),
        i = Geometry.rectHeight(e.shape.data);
        if ("md1" == e.key) {
            var o = ShapeUtil.reversePointFixedY(e.shape.data, n.y + i / 2, e.point),
            s = (_.clamp(o.x, n.x, r.x - a / 10) - n.x) / a;
            return this.changeShapeData(e.shape, "percentage", s)
        }
        return e.shape
    }
    getType() {
        return "doc-moon"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: m(e)
        }
    }
    getSnapablePoints(e) {
        return m(e).map(e => e.p2)
    }
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { g as ShapeDocMoonB }

export default m