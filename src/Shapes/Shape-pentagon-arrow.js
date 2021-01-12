import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(385) /*Shape-pentagon-arrow*/

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
/// i = n(1)/*Geometry*/,  // 5 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(2)/*lodash*/,  // 1 times
/// c = n.n(l)
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
    a = t.arrowPercentage,
    o = void 0 === a ? .4 : a,
    s = Geometry.rectWidth(e.data),
    l = Geometry.rectHeight(e.data),
    c = n.y,
    h = n.y + l / 2,
    u = r.y,
    p = n.x,
    m = r.x - s * o,
    f = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: p,
        y: c
    },
    {
        x: m,
        y: c
    },
    {
        x: f,
        y: h
    },
    {
        x: m,
        y: u
    },
    {
        x: p,
        y: u
    },
    {
        x: p,
        y: c
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
                key: "pentagon-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0.5px,0px)"
                },
                d: "M3.33,5.67 L13,5.67 L19,10.23 L13,14.78 L3.33,14.78 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "pentagon-arrow"
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
        l = void 0 === s ? .4 : s,
        c = Geometry.rectWidth(e.data),
        h = ShapeUtil.pointTransformed(e.data, {
            x: o.x - c * l,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: h
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2;
        if ("md1" == e.key) {
            var a = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            i = _.clamp(a.x, n.x, r.x),
            o = (r.x - i) / (r.x - n.x);
            return this.changeShapeData(e.shape, "arrowPercentage", o)
        }
        return e.shape
    }
}

export { m as ShapePentagonArrowB }

export default u