import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(388) /*Shape-callout-left-right-arrow*/

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
/// s = n(1)/*Geometry*/,  // 11 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(2)/*lodash*/,  // 4 times
/// h = n.n(d)
/// u = n(8)/*ShapeUtil*/;  // 9 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
        t = ShapeHelper.getLineD(e);
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
    a = t.arrowPercentage,
    i = void 0 === a ? .3 : a,
    o = t.sizePercentage,
    l = void 0 === o ? .3 : o,
    c = t.arrowWidthPercentage,
    d = void 0 === c ? .6 : c,
    h = t.calloutWidthPercentage,
    p = void 0 === h ? .5 : h,
    m = Geometry.rectWidth(e.data),
    f = Geometry.rectHeight(e.data),
    g = Math.min(m / 2, f),
    y = Math.min(i * g, m / 2),
    A = d * g,
    E = Math.min(l * g, A),
    v = Math.min(p * m / 2, m / 2 - y),
    S = n.y,
    C = n.y + f / 2 - A / 2,
    x = n.y + f / 2 - E / 2,
    I = n.y + f / 2,
    T = n.y + f / 2 + E / 2,
    b = n.y + f / 2 + A / 2,
    L = r.y,
    R = n.x,
    M = n.x + y,
    w = n.x + m / 2 - v,
    O = n.x + m / 2 + v,
    D = r.x - y,
    N = r.x;
    return ShapeUtil.pointsTransformed(e.data, Geometry.clampPoints([{
        x: R,
        y: I
    },
    {
        x: M,
        y: C
    },
    {
        x: M,
        y: x
    },
    {
        x: w,
        y: x
    },
    {
        x: w,
        y: S
    },
    {
        x: O,
        y: S
    },
    {
        x: O,
        y: x
    },
    {
        x: D,
        y: x
    },
    {
        x: D,
        y: C
    },
    {
        x: N,
        y: I
    },
    {
        x: D,
        y: b
    },
    {
        x: D,
        y: T
    },
    {
        x: O,
        y: T
    },
    {
        x: O,
        y: L
    },
    {
        x: w,
        y: L
    },
    {
        x: w,
        y: T
    },
    {
        x: M,
        y: T
    },
    {
        x: M,
        y: b
    },
    {
        x: R,
        y: I
    }], n, r))
}
class f extends ShapeBaseC {}
var g = new class extends ShapeBaseB {
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "callout-left-right-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0.5px) ",
                    transformOrigin: "50% 50%"
                },
                d: " M3,10.15 L5.27,7.18 L5.27,8.53 L8,8.53 L8,4 L13.1,4 L13.1,8.53 L15.84,8.53 L15.84,7.18 L18.1,10.15 L15.84,13.13 L15.84,11.78 L13.1,11.78 L13.1,16.31 L8,16.31 L8,11.78 L5.27,11.78 L5.27,13.13 Z"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "callout-left-right-arrow"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(m(e))
        }
    }
    getSnapablePoints(e) {
        return m(e)
    }
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.p2,
        o = r.arrowPercentage,
        l = void 0 === o ? .3 : o,
        c = r.sizePercentage,
        d = void 0 === c ? .3 : c,
        h = r.arrowWidthPercentage,
        p = void 0 === h ? .6 : h,
        m = r.calloutWidthPercentage,
        f = void 0 === m ? .5 : m,
        g = Geometry.rectWidth(e.data),
        y = Geometry.rectHeight(e.data),
        A = Math.min(g / 2, y),
        E = Math.min(l * A, g / 2),
        v = p * A,
        S = Math.min(d * A, v),
        C = Math.min(f * g / 2, g / 2 - E),
        x = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - E,
            y: a.y
        },
        a, i)),
        I = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - E,
            y: a.y + y / 2 - S / 2
        },
        a, i)),
        T = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x,
            y: a.y + y / 2 - v / 2
        },
        a, i)),
        b = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + g / 2 + C,
            y: i.y
        },
        a, i));
        return n.concat([{
            key: "md1",
            type: "square",
            p: x
        },
        {
            key: "md2",
            type: "square",
            p: I
        },
        {
            key: "md3",
            type: "square",
            p: T
        },
        {
            key: "md4",
            type: "square",
            p: b
        }])
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 110,
            shapeHeight: e.shapeHeight || 60
        }))
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key && "md4" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = r.x - n.x,
        i = r.y - n.y,
        o = Math.min(a / 2, i);
        if ("md1" == e.key) {
            var s = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            l = _.clamp(s.x, r.x - a / 2, r.x),
            c = (r.x - l) / o;
            return this.changeShapeData(e.shape, "arrowPercentage", c)
        }
        if ("md2" == e.key) {
            var d = ShapeUtil.reversePoint(e.shape.data, e.point),
            p = n.y + i / 2,
            m = (p - _.clamp(d.y, p - i / 2, p)) / (o / 2);
            return this.changeShapeData(e.shape, "sizePercentage", m)
        }
        if ("md3" == e.key) {
            var f = ShapeUtil.reversePoint(e.shape.data, e.point),
            g = n.y + i / 2,
            y = (g - _.clamp(f.y, g - i / 2, g)) / (o / 2);
            return this.changeShapeData(e.shape, "arrowWidthPercentage", y)
        }
        if ("md4" == e.key) {
            var A = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            E = (_.clamp(A.x, n.x + a / 2, r.x) - (n.x + a / 2)) / (a / 2);
            return this.changeShapeData(e.shape, "calloutWidthPercentage", E)
        }
    }
}

export { g as ShapeCalloutLeftRightArrowB }

export default m