import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(375) /*Shape-quad-arrow*/

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
/// i = n(1)/*Geometry*/,  // 8 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(2)/*lodash*/,  // 3 times
/// c = n.n(l)
/// d = n(8)/*ShapeUtil*/;  // 7 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
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
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.arrowPercentage,
    o = void 0 === a ? .4 : a,
    s = t.arrowWidthPercentage,
    l = void 0 === s ? .4 : s,
    c = t.sizePercentage,
    h = void 0 === c ? .15 : c,
    u = Geometry.rectWidth(e.data),
    p = Geometry.rectHeight(e.data),
    m = p / 2,
    f = u / 2,
    g = Math.min(f, m),
    y = n.y,
    A = n.y + g * o,
    E = n.y + m - l * g,
    v = n.y + m - g * h,
    S = n.y + m,
    C = n.y + m + g * h,
    x = n.y + m + l * g,
    I = n.y + p - g * o,
    T = r.y,
    b = n.x,
    L = n.x + g * o,
    R = n.x + f - l * g,
    M = n.x + f - g * h,
    w = n.x + f,
    O = n.x + f + g * h,
    D = n.x + f + l * g,
    N = n.x + u - g * o,
    k = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: R,
        y: A
    },
    {
        x: w,
        y: y
    },
    {
        x: D,
        y: A
    },
    {
        x: O,
        y: A
    },
    {
        x: O,
        y: v
    },
    {
        x: N,
        y: v
    },
    {
        x: N,
        y: E
    },
    {
        x: k,
        y: S
    },
    {
        x: N,
        y: x
    },
    {
        x: N,
        y: C
    },
    {
        x: O,
        y: C
    },
    {
        x: O,
        y: I
    },
    {
        x: D,
        y: I
    },
    {
        x: w,
        y: T
    },
    {
        x: R,
        y: I
    },
    {
        x: M,
        y: I
    },
    {
        x: M,
        y: C
    },
    {
        x: L,
        y: C
    },
    {
        x: L,
        y: x
    },
    {
        x: b,
        y: S
    },
    {
        x: L,
        y: E
    },
    {
        x: L,
        y: v
    },
    {
        x: M,
        y: v
    },
    {
        x: M,
        y: A
    },
    {
        x: R,
        y: A
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
                key: "quad-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,1px)",
                    transformOrigin: "50% 50%"
                },
                d: "  M7.14,4.48 L10.29,2 L13.43,4.48 L11.53,4.48 L11.53,8.03 L16.09,8.03 L16.09,6.12 L18.58,9.27 L16.09,12.41 L16.09,10.5 L11.53,10.5 L11.53,14.05 L13.43,14.05 L10.29,16.53 L7.14,14.05 L9.05,14.05 L9.05,10.5 L4.48,10.5 L4.48,12.41 L2,9.27 L4.48,6.12 L4.48,8.03 L9.05,8.03 L9.05,4.48 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "quad-arrow"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(u(e))
        }
    }
    getSnapablePoints(e) {
        return u(e).concat(Geometry.getCenterPoint(e.data))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        o = r.p2,
        s = r.arrowPercentage,
        l = void 0 === s ? .4 : s,
        c = r.arrowWidthPercentage,
        h = void 0 === c ? .4 : c,
        u = r.sizePercentage,
        p = void 0 === u ? .15 : u,
        m = Geometry.rectWidth(e.data),
        f = Geometry.rectHeight(e.data) / 2,
        g = m / 2,
        y = Math.min(g, f),
        A = ShapeUtil.pointTransformed(e.data, {
            x: o.x,
            y: a.y + y * l
        }),
        E = ShapeUtil.pointTransformed(e.data, {
            x: a.x + g - y * p,
            y: a.y + y * l
        }),
        v = ShapeUtil.pointTransformed(e.data, {
            x: a.x + g - y * h,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: A
        },
        {
            key: "md2",
            type: "square",
            p: E
        },
        {
            key: "md3",
            type: "square",
            p: v
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.arrowPercentage,
        a = void 0 === r ? .4 : r,
        o = Geometry.rectWidth(e.shape.data),
        s = Geometry.rectHeight(e.shape.data) / 2,
        l = o / 2,
        h = Math.min(l, s);
        if ("md1" == e.key) {
            var u = ShapeUtil.reversePoint(e.shape.data, e.point),
            p = (_.clamp(u.y, n.y, n.y + h) - n.y) / h;
            return this.changeShapeData(e.shape, "arrowPercentage", p)
        }
        if ("md2" == e.key) {
            var m = ShapeUtil.reversePointFixedY(e.shape.data, n.y + h * a, e.point),
            f = _.clamp(m.x, n.x + l - h, n.x + l),
            g = (n.x + l - f) / h;
            return this.changeShapeData(e.shape, "sizePercentage", g)
        }
        if ("md3" == e.key) {
            var y = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            A = _.clamp(y.x, n.x + l - h, n.x + l),
            E = (n.x + l - A) / h;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", E)
        }
    }
}

export { m as ShapeQuadArrowB }

export default u