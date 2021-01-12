import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(378) /*Shape-bend-arrow*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return m
});*/
/// var r = n(0)/*React*/,  // 4 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 12 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(2)/*lodash*/,  // 4 times
/// c = n.n(l)
/// d = n(8)/*ShapeUtil*/;  // 9 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
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
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.arrowPercentage,
    o = void 0 === a ? .5 : a,
    s = t.arrowWidthPercentage,
    l = void 0 === s ? .5 : s,
    c = t.sizePercentage,
    h = void 0 === c ? .3 : c,
    u = t.bendRatio,
    p = void 0 === u ? .6 : u,
    m = Geometry.rectWidth(e.data),
    f = Geometry.rectHeight(e.data),
    g = Math.min(m, f),
    y = Math.min(o * g, m),
    A = Math.min(l * g, f),
    E = Math.min(g * h, A),
    v = Math.min(f - (A - E) / 2, m - y),
    S = n.y,
    C = n.y + A / 2 - E / 2,
    x = n.y + A / 2,
    I = n.y + A / 2 + E / 2,
    T = n.y + A,
    b = r.y,
    L = n.x,
    R = n.x + E,
    M = r.x - y,
    w = r.x,
    O = v * p,
    D = Math.max(0, O - E),
    N = Geometry.getLeftTopArc({
        x: L + O,
        y: C + O
    },
    O, O),
    k = Geometry.getLeftTopArcReverse({
        x: R + D,
        y: I + D
    },
    D, D);
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: L,
            y: b
        },
        p2: {
            x: L,
            y: C + O
        }
    },
    {
        p1: {
            x: L,
            y: C + O
        },
        p2: {
            x: L + O,
            y: C
        },
        cp: N.cp,
        cp2: N.cp2
    },
    {
        p1: {
            x: L + O,
            y: C
        },
        p2: {
            x: M,
            y: C
        }
    },
    {
        p1: {
            x: M,
            y: C
        },
        p2: {
            x: M,
            y: S
        }
    },
    {
        p1: {
            x: M,
            y: S
        },
        p2: {
            x: w,
            y: x
        }
    },
    {
        p1: {
            x: w,
            y: x
        },
        p2: {
            x: M,
            y: T
        }
    },
    {
        p1: {
            x: M,
            y: T
        },
        p2: {
            x: M,
            y: I
        }
    },
    {
        p1: {
            x: M,
            y: I
        },
        p2: {
            x: R + D,
            y: I
        }
    },
    {
        p1: {
            x: R + D,
            y: I
        },
        p2: {
            x: R,
            y: I + D
        },
        cp: k.cp,
        cp2: k.cp2
    },
    {
        p1: {
            x: R,
            y: I + D
        },
        p2: {
            x: R,
            y: b
        }
    },
    {
        p1: {
            x: R,
            y: b
        },
        p2: {
            x: L,
            y: b
        }
    }])
}
class p extends ShapeBaseC {}
var m = new class extends ShapeBaseB {
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "bend-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.15,16.53 L3.15,10.04 C3.15,7.17 5.47,4.85 8.34,4.85 L13.26,4.85 L13.26,2.91 L19,6.63 L13.26,10.36 L13.26,8.42 L8.34,8.42 M6.72,10.04 C6.72,9.14 7.44,8.42 8.34,8.42 M6.72,10.04 L6.72,16.53 L3.15,16.53"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "bend-arrow"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: u(e)
        }
    }
    getSnapablePoints(e) {
        return u(e).map(e => e.p2)
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        o = r.p2,
        s = r.arrowPercentage,
        l = void 0 === s ? .5 : s,
        c = r.arrowWidthPercentage,
        h = void 0 === c ? .5 : c,
        u = r.sizePercentage,
        p = void 0 === u ? .3 : u,
        m = r.bendRatio,
        f = void 0 === m ? .6 : m,
        g = Geometry.rectWidth(e.data),
        y = Geometry.rectHeight(e.data),
        A = Math.min(g, y),
        E = l * A,
        v = h * A,
        S = Math.min(A * p, v),
        C = Math.min(y - (v - S) / 2, g - E),
        x = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + g - E,
            y: a.y
        },
        a, o)),
        I = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + S,
            y: o.y
        },
        a, o)),
        T = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: o.x,
            y: a.y + v
        },
        a, o)),
        b = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x + C * f,
            y: a.y
        },
        a, o));
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
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key && "md4" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = t.arrowPercentage,
        o = void 0 === a ? .5 : a,
        s = t.arrowWidthPercentage,
        l = void 0 === s ? .5 : s,
        h = t.sizePercentage,
        u = void 0 === h ? .3 : h,
        p = e.shape.data,
        m = Geometry.rectWidth(e.shape.data),
        f = Geometry.rectHeight(e.shape.data),
        g = Math.min(m, f),
        y = o * g,
        A = l * g,
        E = Math.min(g * u, A),
        v = Math.min(f - (A - E) / 2, m - y);
        if ("md1" == e.key) {
            var S = ShapeUtil.reversePointFixedY(p, n.y, e.point),
            C = _.clamp(S.x, n.x, r.x),
            x = (r.x - C) / g;
            return this.changeShapeData(e.shape, "arrowPercentage", x)
        }
        if ("md2" == e.key) {
            var I = ShapeUtil.reversePointFixedY(p, r.y, e.point),
            T = (_.clamp(I.x, n.x, n.x + g) - n.x) / g;
            return this.changeShapeData(e.shape, "sizePercentage", T)
        }
        if ("md3" == e.key) {
            var b = ShapeUtil.reversePoint(p, e.point),
            L = (_.clamp(b.y, n.y, r.y) - n.y) / g;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", L)
        }
        if ("md4" == e.key) {
            var R = ShapeUtil.reversePointFixedY(p, n.y, e.point),
            M = (_.clamp(R.x, n.x, n.x + v) - n.x) / v;
            return this.changeShapeData(e.shape, "bendRatio", M)
        }
    }
}

export { m as ShapeBendArrowB }

export default u