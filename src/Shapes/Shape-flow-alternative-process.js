import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(419) /*Shape-flow-alternative-process*/

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
/// i = n(1)/*Geometry*/,  // 7 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(8)/*ShapeUtil*/;  // 1 times
class c extends ShapeBase {
    render() {
        var e = d(this.shape()),
        t = ShapeHelper.pathsD(e);
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
    a = Geometry.rectWidth(e.data) / 2,
    o = Geometry.rectHeight(e.data) / 2,
    s = Math.min(a, o),
    c = Math.min(s, .35 * s),
    d = n.y,
    h = r.y,
    u = n.x,
    p = r.x,
    m = Geometry.getLeftTopArc({
        x: u + c,
        y: d + c
    },
    c, c),
    f = Geometry.getRightTopArc({
        x: p - c,
        y: d + c
    },
    c, c),
    g = Geometry.getRightBottomArc({
        x: p - c,
        y: h - c
    },
    c, c),
    y = Geometry.getLeftBottomArc({
        x: u + c,
        y: h - c
    },
    c, c);
    return ShapeUtil.genericLinesTransformed(e.data, [m, {
        p1: {
            x: u + c,
            y: d
        },
        p2: {
            x: p - c,
            y: d
        }
    },
    f, {
        p1: {
            x: p,
            y: d + c
        },
        p2: {
            x: p,
            y: h - c
        }
    },
    g, {
        p1: {
            x: p - c,
            y: h
        },
        p2: {
            x: u + c,
            y: h
        }
    },
    y, {
        p1: {
            x: u,
            y: h - c
        },
        p2: {
            x: u,
            y: d + c
        }
    }])
}
class h extends ShapeBaseC {}
var u = new class extends ShapeBaseB {
    getComponent() {
        return c
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
                d: " M3.44,8.23 C3.44,6.57 4.79,5.23 6.45,5.23 L14,5.23 C15.66,5.23 17,6.57 17,8.23 L17,12.67 C17,14.33 15.66,15.67 14,15.67 L6.45,15.67 C4.79,15.67 3.44,14.33 3.44,12.67 L3.44,8.23"
            }))
        }
    }
    getType() {
        return "flow-alternative-process"
    }
    getSettingsComponent() {
        return h
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: d(e)
        }
    }
    getSnapablePoints(e) {
        return d(e).map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
}

export { u as ShapeFlowAlternativeProcessB }

export default d