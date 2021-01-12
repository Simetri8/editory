import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(395) /*Shape-doc-snip-diagonal-corner-rect*/

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
/// i = n(2)/*lodash*/,  // 2 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 10 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 5 times
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
    a = t.snipPercentage,
    i = void 0 === a ? .7 : a,
    o = t.snipPercentage2,
    l = void 0 === o ? 0 : o,
    c = Geometry.rectWidth(e.data) / 2,
    h = Geometry.rectHeight(e.data) / 2,
    u = Math.min(c, h),
    p = Math.min(u, i * u),
    m = Math.min(u, l * u),
    f = n.y,
    g = n.y + p,
    y = n.y + m,
    A = r.y - p,
    E = r.y - m,
    v = r.y,
    S = n.x,
    C = n.x + p,
    x = n.x + m,
    I = r.x - p,
    T = r.x - m,
    b = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: C,
        y: f
    },
    {
        x: T,
        y: f
    },
    {
        x: b,
        y: y
    },
    {
        x: b,
        y: A
    },
    {
        x: I,
        y: v
    },
    {
        x: x,
        y: v
    },
    {
        x: S,
        y: E
    },
    {
        x: S,
        y: g
    },
    {
        x: C,
        y: f
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
                key: this.getType()
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0.5px)"
                },
                d: " M8.57,5.01 L16.71,5.01 L16.71,5.01 L16.71,10.01 L11.71,15.01 L3.57,15.01 L3.57,15.01 L3.57,10.01 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "doc-snip-diagonal-corner-rect"
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
        var t = e.data.p1,
        n = Geometry.rectHeight(e.data),
        r = {
            x: t.x,
            y: t.y + n / 2
        };
        return u(e).concat(Geometry.rotatePointsByShapeRect(e, [r])).concat(Geometry.getCenterPoint(e.data))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.p2,
        o = r.snipPercentage,
        l = void 0 === o ? .7 : o,
        c = r.snipPercentage2,
        h = void 0 === c ? 0 : c,
        u = Geometry.rectWidth(e.data) / 2,
        p = Geometry.rectHeight(e.data) / 2,
        m = Math.min(u, p),
        f = Math.min(m, l * m),
        g = Math.min(m, h * m),
        y = ShapeUtil.pointTransformed(e.data, {
            x: a.x + f,
            y: a.y
        }),
        A = ShapeUtil.pointTransformed(e.data, {
            x: i.x - g,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: y
        },
        {
            key: "md2",
            type: "square",
            p: A
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectWidth(e.shape.data) / 2,
        i = Geometry.rectHeight(e.shape.data) / 2,
        l = Math.min(a, i);
        if ("md1" == e.key) {
            var c = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            h = (_.clamp(c.x, n.x, n.x + l) - n.x) / l;
            return this.changeShapeData(e.shape, "snipPercentage", h)
        }
        if ("md2" == e.key) {
            var u = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            p = _.clamp(u.x, r.x - l, r.x),
            m = (r.x - p) / l;
            return this.changeShapeData(e.shape, "snipPercentage2", m)
        }
    }
}

export { m as ShapeDocSnipDiagonalCornerRectB }

export default u