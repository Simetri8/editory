import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(444) /*Shape-flow-sort*/

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
/// i = n(0)/*React*/,  // 8 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 6 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 2 times
/// d = n(8)/*ShapeUtil*/;  // 2 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.getLineD(e.outside),
        n = ShapeHelper.getLineD(e.line);
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
            className: "real",
            d: t,
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: this.styleNoFill()
        }))
    }
}
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.rectWidth(e.data) / 2,
    i = Geometry.rectHeight(e.data) / 2,
    o = n.y,
    l = n.y + i,
    c = r.y,
    h = n.x,
    u = n.x + a,
    p = r.x;
    return {
        outside: ShapeUtil.pointsTransformed(e.data, [{
            x: u,
            y: o
        },
        {
            x: p,
            y: l
        },
        {
            x: u,
            y: c
        },
        {
            x: h,
            y: l
        },
        {
            x: u,
            y: o
        }]),
        line: ShapeUtil.pointsTransformed(e.data, [{
            x: h,
            y: l
        },
        {
            x: p,
            y: l
        }])
    }
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
                    transform: "translate(1px,0px)"
                },
                d: " M10.35,3.7 L15.88,9.95 L10.35,16.2 L4.83,9.95 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)"
                },
                d: " M4.83,9.95 L15.88,9.95"
            }))
        }
    }
    getComponent() {
        return h
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 70,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "flow-sort"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = u(e);
        return {
            data: Geometry.pointsToLines(t.outside).concat(Geometry.pointsToLines(t.line))
        }
    }
    getSnapablePoints(e) {
        return u(e).outside.concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = u(e).outside;
        return Geometry.getBoundingRectFromPoints(t)
    }
}

export { m as ShapeFlowSortB }

export default u