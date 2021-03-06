import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(384) /*Shape-notched-right-arrow*/

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
/// i = n(1)/*Geometry*/,  // 6 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(2)/*lodash*/,  // 2 times
/// c = n.n(l)
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
    a = t.arrowPercentage,
    o = void 0 === a ? .6 : a,
    s = t.sizePercentage,
    l = void 0 === s ? .5 : s,
    c = Geometry.rectWidth(e.data),
    h = Geometry.rectHeight(e.data),
    u = Math.min(c, h),
    p = n.y,
    m = n.y + h / 2 * l,
    f = n.y + h / 2,
    g = n.y + h / 2 + h / 2 * (1 - l),
    y = r.y,
    A = n.x,
    E = n.x + .25 * u,
    v = n.x + c * o,
    S = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: A,
        y: m
    },
    {
        x: v,
        y: m
    },
    {
        x: v,
        y: p
    },
    {
        x: S,
        y: f
    },
    {
        x: v,
        y: y
    },
    {
        x: v,
        y: g
    },
    {
        x: A,
        y: g
    },
    {
        x: E,
        y: f
    },
    {
        x: A,
        y: m
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
                key: "notched-right-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,1.5px)"
                },
                d: " M3,5.51 L11.67,5.51 L11.67,1.9 L18.11,8.9 L11.67,15.9 L11.67,12.29 L3,12.29 L6.5,8.9 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "notched-right-arrow"
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
        o = r.arrowPercentage,
        s = void 0 === o ? .6 : o,
        l = r.sizePercentage,
        c = void 0 === l ? .5 : l,
        h = Geometry.rectWidth(e.data),
        u = Geometry.rectHeight(e.data),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + h * s,
            y: a.y
        }),
        m = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
            y: a.y + u / 2 * c
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: p
        },
        {
            key: "md2",
            type: "square",
            p: m
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2;
        if ("md1" == e.key) {
            var a = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            i = (_.clamp(a.x, n.x, r.x) - n.x) / (r.x - n.x);
            return this.changeShapeData(e.shape, "arrowPercentage", i)
        }
        if ("md2" == e.key) {
            var o = ShapeUtil.reversePoint(e.shape.data, e.point),
            s = r.y - n.y,
            l = (_.clamp(o.y, n.y, n.y + s / 2) - n.y) / (s / 2);
            return this.changeShapeData(e.shape, "sizePercentage", l)
        }
    }
}

export { m as ShapeNotchedRightArrowB }

export default u