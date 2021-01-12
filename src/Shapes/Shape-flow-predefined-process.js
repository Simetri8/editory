import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(420) /*Shape-flow-predefined-process*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return m
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 11 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 6 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 3 times
/// d = n(8)/*ShapeUtil*/;  // 3 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.getLineD(e.outerBox),
        n = ShapeHelper.getLineD(e.line1),
        r = ShapeHelper.getLineD(e.line2),
        a = this.style(),
        i = this.styleNoFill();
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: t,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: n,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: r,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: t,
            style: a
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: i
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: i
        }))
    }
}
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = .125 * Geometry.rectWidth(e.data),
    i = n.y,
    o = r.y,
    l = n.x,
    c = n.x + a,
    h = r.x - a,
    u = r.x;
    return {
        outerBox: ShapeUtil.pointsTransformed(e.data, [{
            x: l,
            y: i
        },
        {
            x: u,
            y: i
        },
        {
            x: u,
            y: o
        },
        {
            x: l,
            y: o
        },
        {
            x: l,
            y: i
        }]),
        line1: ShapeUtil.pointsTransformed(e.data, [{
            x: c,
            y: i
        },
        {
            x: c,
            y: o
        }]),
        line2: ShapeUtil.pointsTransformed(e.data, [{
            x: h,
            y: i
        },
        {
            x: h,
            y: o
        }])
    }
}
class p extends ShapeBaseC {}
var m = new class extends ShapeBaseB {
    getComponent() {
        return h
    }
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
                    transform: "translate(1.5px,0.5px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4,4.44 L16.5,4.44 L16.5,15.33 L4,15.33 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0.5px)",
                    transformOrigin: "50% 50%"
                },
                d: " M5.56,4.44 L5.56,15.33"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0.5px)",
                    transformOrigin: "50% 50%"
                },
                d: " M14.94,4.44 L14.94,15.33"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 60,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "flow-predefined-process"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = u(e),
        n = Geometry.pointsToLines(t.outerBox),
        r = Geometry.pointsToLines(t.line1),
        a = Geometry.pointsToLines(t.line2);
        return {
            data: n.concat(r).concat(a)
        }
    }
    getSnapablePoints(e) {
        var t = u(e);
        return t.outerBox.concat(t.line1).concat(t.line2).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.getBoundingRectFromPoints(t.outerBox)
    }
}

export { m as ShapeFlowPredefinedProcessB }

export default u