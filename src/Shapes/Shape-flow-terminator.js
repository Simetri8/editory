import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(424) /*Shape-flow-terminator*/

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
    a = .16 * Geometry.rectWidth(e.data),
    o = n.y,
    s = r.y,
    c = n.x,
    d = n.x + a,
    h = r.x - a,
    u = r.x,
    p = Geometry.ellipseToCubicBeziers({
        x: c,
        y: o
    },
    {
        x: c + 2 * a,
        y: s
    }),
    m = Geometry.ellipseToCubicBeziers({
        x: u - 2 * a,
        y: o
    },
    {
        x: u,
        y: s
    });
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: d,
            y: o
        },
        p2: {
            x: h,
            y: o
        }
    },
    m[1], m[2], {
        p1: {
            x: h,
            y: s
        },
        p2: {
            x: d,
            y: s
        }
    },
    p[3], p[0]])
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
                d: " M5.6,5.56 L14.74,5.56 C15.93,5.56 16.89,7.62 16.89,10.17 C16.89,12.71 15.93,14.78 14.74,14.78 L5.6,14.78 C4.41,14.78 3.44,12.71 3.44,10.17 C3.44,7.62 4.41,5.56 5.6,5.56 Z"
            }))
        }
    }
    getType() {
        return "flow-terminator"
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

export { u as ShapeFlowTerminatorB }

export default d