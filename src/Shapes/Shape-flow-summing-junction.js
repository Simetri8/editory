import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(426) /*Shape-flow-summing-junction*/

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
/// s = n(1)/*Geometry*/,  // 7 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 3 times
/// d = n(8)/*ShapeUtil*/;  // 3 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.pathsD(e.circle),
        n = ShapeHelper.pathsD(e.line1),
        r = ShapeHelper.pathsD(e.line2);
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
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: this.styleNoFill()
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: this.styleNoFill()
        }))
    }
}
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.ellipseToCubicBeziers(n, r),
    i = {
        p1: n,
        p2: r
    },
    o = {
        p1: {
            x: r.x,
            y: n.y
        },
        p2: {
            x: n.x,
            y: r.y
        }
    },
    l = Geometry.intersectCubicBezierLineToLine(a[0], i),
    c = Geometry.intersectCubicBezierLineToLine(a[2], i),
    h = Geometry.intersectCubicBezierLineToLine(a[1], o),
    u = Geometry.intersectCubicBezierLineToLine(a[3], o);
    return {
        circle: ShapeUtil.genericLinesTransformed(e.data, a),
        line1: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: l[0] || n,
            p2: c[0] || r
        }]),
        line2: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: h[0] || n,
            p2: u[0] || r
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
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4.44,10.77 C4.44,7.59 6.93,5 10,5 C13.07,5 15.56,7.59 15.56,10.77 C15.56,13.96 13.07,16.55 10,16.55 C6.93,16.55 4.44,13.96 4.44,10.77 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M6.07,6.69 L13.93,14.86"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M13.93,6.69 L6.07,14.86"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 70,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "flow-summing-junction"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = u(e);
        return {
            data: t.circle.concat(t.line1).concat(t.line2)
        }
    }
    getSnapablePoints(e) {
        return u(e).circle.map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.genericLinesBbox(t.circle)
    }
}

export { m as ShapeFlowSummingJunctionB }

export default u