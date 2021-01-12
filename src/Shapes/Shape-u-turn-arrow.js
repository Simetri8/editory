import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(380) /*Shape-u-turn-arrow*/

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
/// s = n(1)/*Geometry*/,  // 15 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(2)/*lodash*/,  // 5 times
/// h = n.n(d)
/// u = n(8)/*ShapeUtil*/;  // 11 times
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
    a = t.arrowPercentage,
    i = void 0 === a ? .3 : a,
    o = t.arrowWidthPercentage,
    l = void 0 === o ? .5 : o,
    c = t.sizePercentage,
    d = void 0 === c ? .3 : c,
    h = t.bendRatio,
    p = void 0 === h ? .6 : h,
    m = t.downPercentage,
    f = void 0 === m ? .8 : m,
    g = Geometry.rectWidth(e.data),
    y = Geometry.rectHeight(e.data),
    A = Math.min(g, y),
    E = i * A,
    v = l * A,
    S = Math.min(A * d, v),
    C = y * f,
    x = Math.min(y - (v - S) / 2, (g - v / 2 + S / 2) / 2, C - E),
    I = n.y,
    T = n.y + S,
    b = n.y + C - E,
    L = n.y + C,
    R = r.y,
    M = n.x,
    w = n.x + S,
    O = r.x - v,
    D = r.x - v / 2 - S / 2,
    N = r.x - v / 2,
    k = r.x - v / 2 + S / 2,
    B = r.x,
    P = Math.max(x * p, 0),
    F = Math.max(0, P - S),
    H = Geometry.getLeftTopArc({
        x: M + P,
        y: I + P
    },
    P, P),
    _ = Geometry.getLeftTopArcReverse({
        x: w + F,
        y: T + F
    },
    F, F),
    U = Geometry.getRightTopArc({
        x: k - P,
        y: I + P
    },
    P, P),
    W = Geometry.getRightTopArcReverse({
        x: D - F,
        y: T + F
    },
    F, F);
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: M,
            y: R
        },
        p2: {
            x: M,
            y: I + P
        }
    },
    H, {
        p1: {
            x: M + P,
            y: I
        },
        p2: {
            x: k - P,
            y: I
        }
    },
    U, {
        p1: {
            x: k,
            y: I + P
        },
        p2: {
            x: k,
            y: b
        }
    },
    {
        p1: {
            x: k,
            y: b
        },
        p2: {
            x: B,
            y: b
        }
    },
    {
        p1: {
            x: B,
            y: b
        },
        p2: {
            x: N,
            y: L
        }
    },
    {
        p1: {
            x: N,
            y: L
        },
        p2: {
            x: O,
            y: b
        }
    },
    {
        p1: {
            x: O,
            y: b
        },
        p2: {
            x: D,
            y: b
        }
    },
    {
        p1: {
            x: D,
            y: b
        },
        p2: {
            x: D,
            y: T + F
        }
    },
    W, {
        p1: {
            x: D - F,
            y: T
        },
        p2: {
            x: w + F,
            y: T
        }
    },
    _, {
        p1: {
            x: w,
            y: T + F
        },
        p2: {
            x: w,
            y: R
        }
    },
    {
        p1: {
            x: w,
            y: R
        },
        p2: {
            x: M,
            y: R
        }
    }])
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
                key: "u-turn-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,1px)",
                    transformOrigin: "50% 50%"
                },
                d: " M2.5,16.91 L2.5,9.6 C2.5,6.07 5.37,3.2 8.9,3.2 L10.13,3.2 C13.66,3.2 16.53,6.07 16.53,9.6 L16.53,10.32 L19.3,10.32 L14.81,14.06 L10.32,10.32 L13.09,10.32 L13.09,9.6 C13.09,7.97 11.76,6.64 10.13,6.64 L8.9,6.64 C7.27,6.64 5.94,7.97 5.94,9.6 L5.94,16.91 L2.5,16.91"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "u-turn-arrow"
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
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.p2,
        o = r.arrowPercentage,
        l = void 0 === o ? .3 : o,
        c = r.arrowWidthPercentage,
        d = void 0 === c ? .5 : c,
        h = r.sizePercentage,
        p = void 0 === h ? .3 : h,
        m = r.bendRatio,
        f = void 0 === m ? .6 : m,
        g = r.downPercentage,
        y = void 0 === g ? .8 : g,
        A = Geometry.rectWidth(e.data),
        E = Geometry.rectHeight(e.data),
        v = Math.min(A, E),
        S = l * v,
        C = d * v,
        x = Math.min(v * p, C),
        I = E * y,
        T = Math.min(E - (C - x) / 2, (A - C / 2 + x / 2) / 2, I - S),
        b = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - C,
            y: a.y + I - S
        },
        a, i)),
        L = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + x,
            y: i.y
        },
        a, i)),
        R = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - C,
            y: i.y
        },
        a, i)),
        M = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + T * f,
            y: a.y
        },
        a, i)),
        w = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x,
            y: a.y + I
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
        },
        {
            key: "md5",
            type: "square",
            p: w
        }])
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 50,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key && "md4" != e.key && "md5" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = t.arrowPercentage,
        i = void 0 === a ? .3 : a,
        o = t.arrowWidthPercentage,
        l = void 0 === o ? .5 : o,
        c = t.sizePercentage,
        d = void 0 === c ? .3 : c,
        p = t.downPercentage,
        m = void 0 === p ? .8 : p,
        f = Geometry.rectWidth(e.shape.data),
        g = Geometry.rectHeight(e.shape.data),
        y = Math.min(f, g),
        A = i * y,
        E = l * y,
        v = Math.min(y * d, E),
        S = g * m,
        C = Math.min(g - (E - v) / 2, (f - E / 2 + v / 2) / 2, S - A);
        if ("md1" == e.key) {
            var x = ShapeUtil.reversePoint(e.shape.data, e.point),
            I = _.clamp(x.y, n.y + v, n.y + S),
            T = (n.y + S - I) / y;
            return this.changeShapeData(e.shape, "arrowPercentage", T)
        }
        if ("md2" == e.key) {
            var b = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            L = (_.clamp(b.x, n.x, n.x + y) - n.x) / y;
            return this.changeShapeData(e.shape, "sizePercentage", L)
        }
        if ("md3" == e.key) {
            var R = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            M = _.clamp(R.x, r.x - y, r.x),
            w = (r.x - M) / y;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", w)
        }
        if ("md4" == e.key) {
            var O = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            D = (_.clamp(O.x, n.x, n.x + C) - n.x) / C;
            return this.changeShapeData(e.shape, "bendRatio", D)
        }
        if ("md5" == e.key) {
            var N = ShapeUtil.reversePoint(e.shape.data, e.point),
            k = (_.clamp(N.y, n.y + v, r.y) - n.y) / g;
            return this.changeShapeData(e.shape, "downPercentage", k)
        }
    }
}

export { g as ShapeUTurnArrowB }

export default m