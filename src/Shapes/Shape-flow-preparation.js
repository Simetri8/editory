import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(434) /*Shape-flow-preparation*/

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
    h = n.y,
    u = n.y + c,
    p = r.y,
    m = n.x,
    f = n.x + d,
    g = r.x - d,
    y = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: m,
        y: u
    },
    {
        x: f,
        y: h
    },
    {
        x: g,
        y: h
    },
    {
        x: y,
        y: u
    },
    {
        x: g,
        y: p
    },
    {
        x: f,
        y: p
    },
    {
        x: m,
        y: u
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
                d: "M3.7,10.3 L6.14,4.8 L14.26,4.8 L16.7,10.3 L14.26,15.8 L6.14,15.8 Z"
            }))
        }
    }
    getComponent() {
        return c
    }
    getType() {
        return "flow-preparation"
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

export { u as ShapeFlowPreparationB }

export default d