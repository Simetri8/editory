import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(387) /*Shape-callout-right-arrow*/

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
/// s = n(1)/*Geometry*/,  // 10 times
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
    g = Math.min(m, f),
    y = i * g,
    A = d * g,
    E = Math.min(l * g, A),
    v = Math.min(p * m, m - y),
    S = n.y,
    C = n.y + f / 2 - A / 2,
    x = n.y + f / 2 - E / 2,
    I = n.y + f / 2,
    T = n.y + f / 2 + E / 2,
    b = n.y + f / 2 + A / 2,
    L = r.y,
    R = n.x,
    M = n.x + v,
    w = r.x - y,
    O = r.x;
    return ShapeUtil.pointsTransformed(e.data, Geometry.clampPoints([{
        x: R,
        y: S
    },
    {
        x: M,
        y: S
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
        y: C
    },
    {
        x: O,
        y: I
    },
    {
        x: w,
        y: b
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
        y: L
    },
    {
        x: R,
        y: L
    },
    {
        x: R,
        y: S
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
                key: "callout-right-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(2px,0.5px) ",
                    transformOrigin: "50% 50%"
                },
                d: " M2.6,4.11 L10.9,4.11 L10.9,8.56 L15.01,8.56 L15.01,6.27 L19.1,10.02 L15.01,13.77 L15.01,11.48 L10.9,11.48 L10.9,15.93 L2.6,15.93 Z"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "callout-right-arrow"
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
        A = Math.min(g, y),
        E = l * A,
        v = p * A,
        S = Math.min(d * A, v),
        C = Math.min(f * g, g - E),
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
            x: a.x + C,
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
            shapeWidth: e.shapeWidth || 150,
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
        o = Math.min(a, i);
        if ("md1" == e.key) {
            var s = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            l = _.clamp(s.x, r.x - a, r.x),
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
            E = (_.clamp(A.x, n.x, r.x) - n.x) / a;
            return this.changeShapeData(e.shape, "calloutWidthPercentage", E)
        }
    }
}

export { g as ShapeCalloutRightArrowB }

export default m