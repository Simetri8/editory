import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(389) /*Shape-callout-quad-arrow*/

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
    d = void 0 === c ? .3 : c,
    h = t.calloutWidthPercentage,
    p = void 0 === h ? .5 : h,
    m = Geometry.rectWidth(e.data),
    f = Geometry.rectHeight(e.data),
    g = m / 2,
    y = f / 2,
    A = Math.min(g, y),
    E = Math.min(m, f),
    v = Math.min(i * A, A),
    S = Math.min(d * E, E),
    C = Math.min(l * A, S),
    x = Math.min(p * y, A - v),
    I = Math.min(p * g, A - v),
    T = n.y,
    b = n.y + v,
    L = n.y + y - x,
    R = n.y + y - S / 2,
    M = n.y + y - C / 2,
    w = n.y + y,
    O = n.y + y + C / 2,
    D = n.y + y + S / 2,
    N = n.y + y + x,
    k = r.y - v,
    B = r.y,
    P = n.x,
    F = n.x + v,
    H = n.x + g - I,
    _ = n.x + g - S / 2,
    U = n.x + g - C / 2,
    W = n.x + g,
    G = n.x + g + C / 2,
    z = n.x + g + S / 2,
    Y = n.x + g + I,
    K = r.x - v,
    V = r.x;
    return ShapeUtil.pointsTransformed(e.data, Geometry.clampPoints([{
        x: P,
        y: w
    },
    {
        x: F,
        y: R
    },
    {
        x: F,
        y: M
    },
    {
        x: H,
        y: M
    },
    {
        x: H,
        y: L
    },
    {
        x: U,
        y: L
    },
    {
        x: U,
        y: b
    },
    {
        x: _,
        y: b
    },
    {
        x: W,
        y: T
    },
    {
        x: z,
        y: b
    },
    {
        x: G,
        y: b
    },
    {
        x: G,
        y: L
    },
    {
        x: Y,
        y: L
    },
    {
        x: Y,
        y: M
    },
    {
        x: K,
        y: M
    },
    {
        x: K,
        y: R
    },
    {
        x: V,
        y: w
    },
    {
        x: K,
        y: D
    },
    {
        x: K,
        y: O
    },
    {
        x: Y,
        y: O
    },
    {
        x: Y,
        y: N
    },
    {
        x: G,
        y: N
    },
    {
        x: G,
        y: k
    },
    {
        x: z,
        y: k
    },
    {
        x: W,
        y: B
    },
    {
        x: _,
        y: k
    },
    {
        x: U,
        y: k
    },
    {
        x: U,
        y: N
    },
    {
        x: H,
        y: N
    },
    {
        x: H,
        y: O
    },
    {
        x: F,
        y: O
    },
    {
        x: F,
        y: D
    },
    {
        x: P,
        y: w
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
                key: "callout-quad-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0.5px) ",
                    transformOrigin: "50% 50%"
                },
                d: " M1.6,10.1 L3.85,7.85 L3.85,8.98 L6.8,8.98 L6.8,7.33 L8.73,7.33 L8.73,4.85 L7.6,4.85 L9.85,2.6 L12.1,4.85 L10.98,4.85 L10.98,7.33 L12.9,7.33 L12.9,8.98 L15.85,8.98 L15.85,7.85 L18.1,10.1 L15.85,12.35 L15.85,11.23 L12.9,11.23 L12.9,12.87 L10.98,12.87 L10.98,15.35 L12.1,15.35 L9.85,17.6 L7.6,15.35 L8.73,15.35 L8.73,12.87 L6.8,12.87 L6.8,11.23 L3.85,11.23 L3.85,12.35 Z"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "callout-quad-arrow"
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
        p = void 0 === h ? .3 : h,
        m = r.calloutWidthPercentage,
        f = void 0 === m ? .5 : m,
        g = Geometry.rectWidth(e.data),
        y = Geometry.rectHeight(e.data),
        A = g / 2,
        E = y / 2,
        v = Math.min(A, E),
        S = Math.min(g, y),
        C = Math.min(l * v, v),
        x = Math.min(p * S, S),
        I = Math.min(d * v, x),
        T = Math.min(f * A, v - C),
        b = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - C,
            y: a.y
        },
        a, i)),
        L = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - C,
            y: a.y + E - I / 2
        },
        a, i)),
        R = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x,
            y: a.y + E - x / 2
        },
        a, i)),
        M = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + A + T,
            y: i.y
        },
        a, i));
        return n.concat([{
            key: "md1",
            type: "square",
            p: b
        },
        {
            key: "md2",
            type: "square",
            p: L
        },
        {
            key: "md3",
            type: "square",
            p: R
        },
        {
            key: "md4",
            type: "square",
            p: M
        }])
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 110,
            shapeHeight: e.shapeHeight || 100
        }))
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key && "md4" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = r.x - n.x,
        i = r.y - n.y,
        o = a / 2,
        s = i / 2,
        l = Math.min(o, s);
        if ("md1" == e.key) {
            var c = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            d = _.clamp(c.x, r.x - o, r.x),
            p = (r.x - d) / l;
            return this.changeShapeData(e.shape, "arrowPercentage", p)
        }
        if ("md2" == e.key) {
            var m = ShapeUtil.reversePoint(e.shape.data, e.point),
            f = n.y + i / 2,
            g = (f - _.clamp(m.y, f - i / 2, f)) / l;
            return this.changeShapeData(e.shape, "sizePercentage", g)
        }
        if ("md3" == e.key) {
            var y = ShapeUtil.reversePoint(e.shape.data, e.point),
            A = _.clamp(y.y, n.y, n.y + s),
            E = (n.y + s - A) / l;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", E)
        }
        if ("md4" == e.key) {
            var v = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            S = (_.clamp(v.x, n.x + a / 2, r.x) - (n.x + a / 2)) / (a / 2);
            return this.changeShapeData(e.shape, "calloutWidthPercentage", S)
        }
    }
}

export { g as ShapeCalloutQuadArrowB }

export default m