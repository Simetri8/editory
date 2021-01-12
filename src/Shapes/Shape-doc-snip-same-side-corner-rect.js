import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(394) /*Shape-doc-snip-same-side-corner-rect*/

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
    y = r.y - m,
    A = r.y,
    E = n.x,
    v = n.x + p,
    S = n.x + m,
    C = r.x - p,
    x = r.x - m,
    I = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: E,
        y: g
    },
    {
        x: v,
        y: f
    },
    {
        x: C,
        y: f
    },
    {
        x: I,
        y: g
    },
    {
        x: I,
        y: y
    },
    {
        x: x,
        y: A
    },
    {
        x: S,
        y: A
    },
    {
        x: E,
        y: y
    },
    {
        x: E,
        y: g
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
                d: " M3.5,8.23 L6.43,5.31 L13.97,5.31 L16.9,8.23 L16.9,14.53 L16.9,14.53 L3.5,14.53 L3.5,14.53 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "doc-snip-same-side-corner-rect"
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
            x: i.x - f,
            y: a.y
        }),
        A = ShapeUtil.pointTransformed(e.data, {
            x: a.x + g,
            y: i.y
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
            h = _.clamp(c.x, r.x - l, r.x),
            u = (r.x - h) / l;
            return this.changeShapeData(e.shape, "snipPercentage", u)
        }
        if ("md2" == e.key) {
            var p = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            m = (_.clamp(p.x, n.x, n.x + l) - n.x) / l;
            return this.changeShapeData(e.shape, "snipPercentage2", m)
        }
    }
}

export { m as ShapeDocSnipSameSideCornerRectB }

export default u