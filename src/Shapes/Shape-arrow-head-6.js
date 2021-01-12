import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeCreaterBase, { ShapeCreaterBaseB, ShapeCreaterBaseC } from './ShapeCreaterBase';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(367) /*Shape-arrow-head-6*/

/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 10 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 4 times
/// var o = n(10)/*ShapeHelper*/;  // 3 times
/// var s = n(93)/*ShapeCreaterBase*/;  // 3 times
/// var l = n(8)/*ShapeUtil*/;  // 3 times
class c extends ShapeCreaterBase {
    render() {
        var e = d(this.shape()),
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
function d(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.rectWidth(e.data),
    o = Geometry.rectHeight(e.data),
    s = Geometry.ellipseToCubicBeziers(n, r);
    return {
        circle: ShapeUtil.genericLinesTransformed(e.data, s),
        line1: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: n.x,
                y: n.y + o / 2
            },
            p2: {
                x: r.x,
                y: n.y + o / 2
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
class h extends ShapeCreaterBaseC {}
var u = new class extends ShapeCreaterBaseB {
    getComponent() {
        return c
    }
    getType() {
        return "arrow-head-6"
    }
    getSettingsComponent() {
        return h
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = d(e);
        return {
            data: t.circle.concat(t.line1).concat(t.line2)
        }
    }
    getBoundingRect(e) {
        var t = d(e);
        return Geometry.genericLinesBbox(t.circle)
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
                key: "arrow-head-6"
            },
            React.createElement("ellipse", {
                cx: "11.083",
                cy: "10.0491",
                rx: "6.4169",
                ry: "5.950",
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                }
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: "M4.666,10.0491 L17.5,10.0491 M11.083,4.098 L11.083,16"
            }))
        }
    }
}

export { u as ShapeArrowHead6B }

export default d