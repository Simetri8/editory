import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(393) /*Shape-doc-snip-single-corner-rect*/

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
/// i = n(2)/*lodash*/,  // 1 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 10 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 3 times
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
    o = Geometry.rectWidth(e.data) / 2,
    l = Geometry.rectHeight(e.data) / 2,
    c = Math.min(o, l),
    h = Math.min(c, i * c),
    u = n.y,
    p = n.y + h,
    m = r.y,
    f = n.x,
    g = r.x - h,
    y = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: f,
        y: u
    },
    {
        x: g,
        y: u
    },
    {
        x: y,
        y: p
    },
    {
        x: y,
        y: m
    },
    {
        x: f,
        y: m
    },
    {
        x: f,
        y: u
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
                d: " M3.67,5.01 L13.9,5.01 L17.44,8.55 L17.44,14.78 L3.67,14.78 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "doc-snip-single-corner-rect"
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
        c = Geometry.rectWidth(e.data) / 2,
        h = Geometry.rectHeight(e.data) / 2,
        u = Math.min(c, h),
        p = Math.min(u, l * u),
        m = ShapeUtil.pointTransformed(e.data, {
            x: i.x - p,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: m
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
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
    }
}

export { m as ShapeDocSnipSingleCornerRectB }

export default u