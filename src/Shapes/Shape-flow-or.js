import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(427) /*Shape-flow-or*/

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
/// s = n(1)/*Geometry*/,  // 5 times
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
    a = Geometry.rectWidth(e.data),
    i = Geometry.rectHeight(e.data),
    o = Geometry.ellipseToCubicBeziers(n, r);
    return {
        circle: ShapeUtil.genericLinesTransformed(e.data, o),
        line1: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: n.x,
                y: n.y + i / 2
            },
            p2: {
                x: r.x,
                y: n.y + i / 2
            }
        }]),
        line2: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: n.x + a / 2,
                y: n.y
            },
            p2: {
                x: n.x + a / 2,
                y: r.y
            }
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
                    transform: "translate(1.5px,1px) rotate(45deg)",
                    transformOrigin: "50% 50%"
                },
                d: " M4.44,10.77 C4.44,7.59 6.93,5 10,5 C13.07,5 15.56,7.59 15.56,10.77 C15.56,13.96 13.07,16.55 10,16.55 C6.93,16.55 4.44,13.96 4.44,10.77 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,1px) rotate(45deg)",
                    transformOrigin: "50% 50%"
                },
                d: " M6.07,6.69 L13.93,14.86"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,1px) rotate(45deg)",
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
        return "flow-or"
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

export { m as ShapeFlowOrB }

export default u