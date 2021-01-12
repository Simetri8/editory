import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(374) /*Shape-up-down-arrow*/

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
/// i = n(1)/*Geometry*/,  // 7 times
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
    o = void 0 === a ? .5 : a,
    s = t.sizePercentage,
    l = void 0 === s ? .5 : s,
    c = Geometry.rectWidth(e.data),
    h = Geometry.rectHeight(e.data),
    u = n.y,
    p = n.y + h / 2 * o,
    m = n.y + h / 2 + (h / 2 - h / 2 * o),
    f = r.y,
    g = n.x,
    y = n.x + c / 2 * l,
    A = n.x + c / 2,
    E = n.x + c / 2 + c / 2 * (1 - l),
    v = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: g,
        y: p
    },
    {
        x: A,
        y: u
    },
    {
        x: v,
        y: p
    },
    {
        x: E,
        y: p
    },
    {
        x: E,
        y: m
    },
    {
        x: v,
        y: m
    },
    {
        x: A,
        y: f
    },
    {
        x: g,
        y: m
    },
    {
        x: y,
        y: m
    },
    {
        x: y,
        y: p
    },
    {
        x: g,
        y: p
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
                key: "up-down-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px) rotate(90deg) scaleX(0.8)",
                    transformOrigin: "50% 50%"
                },
                d: "  M1.43,10.07 L7.14,4.4 L7.14,7.23 L13.62,7.23 L13.62,4.4 L19.33,10.07 L13.62,15.73 L13.62,12.9 L7.14,12.9 L7.14,15.73 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "up-down-arrow"
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
        l = void 0 === s ? .5 : s,
        c = r.sizePercentage,
        h = void 0 === c ? .5 : c,
        u = Geometry.rectWidth(e.data),
        p = Geometry.rectHeight(e.data),
        m = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
            y: a.y + p / 2 * l
        }),
        f = ShapeUtil.pointTransformed(e.data, {
            x: a.x + u / 2 * h,
            y: o.y - p / 2 * l
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: m
        },
        {
            key: "md2",
            type: "square",
            p: f
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = t.arrowPercentage,
        i = void 0 === a ? .5 : a,
        o = r.y - n.y;
        if ("md1" == e.key) {
            var s = ShapeUtil.reversePoint(e.shape.data, e.point),
            l = (_.clamp(s.y, n.y, n.y + o / 2) - n.y) / (o / 2);
            return this.changeShapeData(e.shape, "arrowPercentage", l)
        }
        if ("md2" == e.key) {
            var h = ShapeUtil.reversePointFixedY(e.shape.data, r.y - o / 2 * i, e.point),
            u = r.x - n.x,
            p = (_.clamp(h.x, n.x, n.x + u / 2) - n.x) / (u / 2);
            return this.changeShapeData(e.shape, "sizePercentage", p)
        }
    }
}

export { m as ShapeUpDownArrowB }

export default u