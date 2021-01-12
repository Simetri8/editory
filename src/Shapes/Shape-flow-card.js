import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(442) /*Shape-flow-card*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/,  // 4 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 5 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(8)/*ShapeUtil*/;  // 1 times
class c extends ShapeBase {
    render() {
        var e = d(this.shape()),
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
function d(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    o = void 0 === a ? 3 / 8 : a,
    s = Geometry.rectWidth(e.data) / 2,
    c = Geometry.rectHeight(e.data) / 2,
    d = Math.min(s, o * s),
    h = Math.min(c, o * c),
    u = n.y,
    p = n.y + h,
    m = r.y,
    f = n.x,
    g = n.x + d,
    y = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: f,
        y: m
    },
    {
        x: f,
        y: p
    },
    {
        x: g,
        y: u
    },
    {
        x: y,
        y: u
    },
    {
        x: y,
        y: m
    },
    {
        x: f,
        y: m
    }])
}
class h extends ShapeBaseC {}
var u = new class extends ShapeBaseB {
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
                    transform: "translate(1px,0px)"
                },
                d: "M4.7,14.4 L4.7,7.41 L6.8,5.8 L15.9,5.8 L15.9,14.4 Z"
            }))
        }
    }
    getComponent() {
        return c
    }
    getType() {
        return "flow-card"
    }
    getSettingsComponent() {
        return h
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(d(e))
        }
    }
    getSnapablePoints(e) {
        return d(e).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = d(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
}

export { u as ShapeFlowCardB }

export default d