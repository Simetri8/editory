import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(428) /*Shape-flow-stored-data*/

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
    a = .16 * Geometry.rectWidth(e.data),
    o = n.y,
    s = r.y,
    c = n.x,
    d = n.x + a,
    h = r.x,
    u = Geometry.ellipseToCubicBeziers({
        x: c,
        y: o
    },
    {
        x: c + 2 * a,
        y: s
    }),
    p = Geometry.ellipseToCubicBeziers({
        x: h - a,
        y: o
    },
    {
        x: h + a,
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
    Geometry.reverseBezierDirection(p[0]), Geometry.reverseBezierDirection(p[3]), {
        p1: {
            x: h,
            y: s
        },
        p2: {
            x: d,
            y: s
        }
    },
    u[3], u[0]])
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
                    transform: "translate(1px,1px)",
                    transformOrigin: "50% 50%"
                },
                d: " M6.01,4.8 L16.35,4.8 C15.26,4.8 14.38,7.04 14.38,9.8 C14.38,12.56 15.26,14.8 16.35,14.8 L6.01,14.8 C4.93,14.8 4.04,12.56 4.04,9.8 C4.04,7.04 4.93,4.8 6.01,4.8 Z"
            }))
        }
    }
    getType() {
        return "flow-stored-data"
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

export { u as ShapeFlowStoredDataB }

export default d