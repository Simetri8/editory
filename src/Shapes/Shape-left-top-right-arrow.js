import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(376) /*Shape-left-top-right-arrow*/

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
    o = void 0 === a ? .3 : a,
    s = t.arrowWidthPercentage,
    l = void 0 === s ? .4 : s,
    c = t.sizePercentage,
    h = void 0 === c ? .15 : c,
    u = Geometry.rectWidth(e.data),
    p = Geometry.rectHeight(e.data),
    m = u / 2,
    f = Math.min(m, p),
    g = f * l,
    y = f * h,
    A = p - g,
    E = f * o,
    v = n.y,
    S = n.y + E,
    C = n.y + p - 2 * g,
    x = n.y + A - y,
    I = n.y + A,
    T = n.y + A + y,
    b = r.y,
    L = n.x,
    R = n.x + E,
    M = n.x + m - g,
    w = n.x + m - y,
    O = n.x + m,
    D = n.x + m + y,
    N = n.x + m + g,
    k = n.x + u - E,
    B = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: L,
        y: I
    },
    {
        x: R,
        y: C
    },
    {
        x: R,
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
        x: M,
        y: S
    },
    {
        x: O,
        y: v
    },
    {
        x: N,
        y: S
    },
    {
        x: D,
        y: S
    },
    {
        x: D,
        y: x
    },
    {
        x: k,
        y: x
    },
    {
        x: k,
        y: C
    },
    {
        x: B,
        y: I
    },
    {
        x: k,
        y: b
    },
    {
        x: k,
        y: T
    },
    {
        x: R,
        y: T
    },
    {
        x: R,
        y: b
    },
    {
        x: L,
        y: I
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
                key: "left-top-right-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,1px)",
                    transformOrigin: "50% 50%"
                },
                d: "   M2,12.33 L4.47,9.03 L4.47,11.1 L9.01,11.1 L9.01,5.01 L6.95,5.01 L10.25,2.53 L13.55,5.01 L11.49,5.01 L11.49,11.1 L16.02,11.1 L16.02,9.03 L18.5,12.33 L16.02,15.63 L16.02,13.57 L4.47,13.57 L4.47,15.63 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "left-top-right-arrow"
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
        return u(e)
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        o = r.p2,
        s = r.arrowPercentage,
        l = void 0 === s ? .3 : s,
        c = r.arrowWidthPercentage,
        h = void 0 === c ? .4 : c,
        u = r.sizePercentage,
        p = void 0 === u ? .15 : u,
        m = Geometry.rectWidth(e.data) / 2,
        f = Geometry.rectHeight(e.data),
        g = Math.min(m, f),
        y = g * h,
        A = g * p,
        E = g * l,
        v = ShapeUtil.pointTransformed(e.data, {
            x: o.x,
            y: a.y + E
        }),
        S = ShapeUtil.pointTransformed(e.data, {
            x: a.x + m - A,
            y: a.y + E
        }),
        C = ShapeUtil.pointTransformed(e.data, {
            x: a.x + m - y,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: v
        },
        {
            key: "md2",
            type: "square",
            p: S
        },
        {
            key: "md3",
            type: "square",
            p: C
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.arrowPercentage,
        a = void 0 === r ? .3 : r,
        o = Geometry.rectWidth(e.shape.data),
        s = Geometry.rectHeight(e.shape.data),
        l = o / 2,
        h = Math.min(l, s),
        u = h * a;
        if ("md1" == e.key) {
            var p = ShapeUtil.reversePoint(e.shape.data, e.point),
            m = (_.clamp(p.y, n.y, n.y + h) - n.y) / h;
            return this.changeShapeData(e.shape, "arrowPercentage", m)
        }
        if ("md2" == e.key) {
            var f = ShapeUtil.reversePointFixedY(e.shape.data, n.y + u, e.point),
            g = _.clamp(f.x, n.x + l - h, n.x + l),
            y = (n.x + l - g) / h;
            return this.changeShapeData(e.shape, "sizePercentage", y)
        }
        if ("md3" == e.key) {
            var A = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            E = _.clamp(A.x, n.x + l - h, n.x + l),
            v = (n.x + l - E) / h;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", v)
        }
    }
}

export { m as ShapeLeftTopRightArrowB }

export default u