import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(411) /*Shape-doc-triangle*/

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
/// s = n(1)/*Geometry*/,  // 6 times
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
    a = t.percentage,
    i = void 0 === a ? .5 : a,
    o = Geometry.rectWidth(e.data),
    l = n.y,
    c = r.y,
    h = n.x,
    u = n.x + o * i,
    p = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: u,
        y: l
    },
    {
        x: p,
        y: c
    },
    {
        x: h,
        y: c
    },
    {
        x: u,
        y: l
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
                    transform: "translate(1px,-1px)"
                },
                d: " M10,5.75 L15.63,15.25 L4.38,15.25 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "doc-triangle"
    }
    getSettingsComponent() {
        return p
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .5 : i,
        l = Geometry.rectWidth(e.data) * o,
        c = ShapeUtil.pointTransformed(e.data, {
            x: a.x + l,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: c
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectWidth(e.shape.data);
        if ("md1" == e.key) {
            var i = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            l = (_.clamp(i.x, n.x, r.x) - n.x) / a;
            return this.changeShapeData(e.shape, "percentage", l)
        }
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
}

export { m as ShapeDocTriangleB }

export default u