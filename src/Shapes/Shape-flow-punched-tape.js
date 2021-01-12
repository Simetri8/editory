import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(425) /*Shape-flow-punched-tape*/

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
/// i = n(1)/*Geometry*/,  // 12 times
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
    a = Geometry.rectWidth(e.data),
    o = .2 * Geometry.rectHeight(e.data),
    s = n.y,
    c = r.y,
    d = n.x,
    h = r.x,
    u = Geometry.ellipseToCubicBeziers({
        x: d,
        y: s
    },
    {
        x: d + a / 2,
        y: s + o
    }),
    p = Geometry.ellipseToCubicBeziers({
        x: d + a / 2,
        y: s
    },
    {
        x: h,
        y: s + o
    }),
    m = Geometry.ellipseToCubicBeziers({
        x: d + a / 2,
        y: c - o
    },
    {
        x: h,
        y: c
    }),
    f = Geometry.ellipseToCubicBeziers({
        x: d,
        y: c - o
    },
    {
        x: d + a / 2,
        y: c
    });
    return ShapeUtil.genericLinesTransformed(e.data, [Geometry.reverseBezierDirection(u[3]), Geometry.reverseBezierDirection(u[2]), p[0], p[1], {
        p1: p[1].p2,
        p2: {
            x: h,
            y: c - o / 2
        }
    },
    Geometry.reverseBezierDirection(m[1]), Geometry.reverseBezierDirection(m[0]), f[2], f[3], {
        p1: {
            x: d,
            y: c - o / 2
        },
        p2: {
            x: d,
            y: s + o / 2
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
                d: " M4,6.06 C4,6.65 5.32,7.12 6.95,7.12 C8.58,7.12 9.9,6.65 9.9,6.06 C9.9,5.47 11.22,5 12.85,5 C14.48,5 15.8,5.47 15.8,6.06 L15.8,14.54 C15.8,13.95 14.48,13.48 12.85,13.48 C11.22,13.48 9.9,13.95 9.9,14.54 C9.9,15.13 8.58,15.6 6.95,15.6 C5.32,15.6 4,15.13 4,14.54 Z"
            }))
        }
    }
    getType() {
        return "flow-punched-tape"
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
    getBoundingRect(e) {
        var t = d(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { u as ShapeFlowPunchedTapeB }

export default d