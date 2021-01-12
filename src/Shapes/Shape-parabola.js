import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(358) /*Shape-parabola*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return h
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/,  // 6 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 3 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(8)/*ShapeUtil*/,  // 1 times
/// l = n(10)/*ShapeHelper*/;  // 1 times
class c extends ShapeBase {
    render() {
        var e = h(this.shape()),
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
class d extends ShapeBaseC {}
function h(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = {
        p1: n,
        cp: {
            x: Geometry.getCenterPoint(n, r).x,
            y: n.y + 2 * (r.y - n.y)
        },
        p2: {
            x: r.x,
            y: n.y
        }
    },
    o = Geometry.quadraticToCubic(a);
    return ShapeUtil.genericLinesTransformed(e.data, [o])
}
var u = new class extends ShapeBaseB {
    getComponent() {
        return c
    }
    getType() {
        return "parabola"
    }
    getSettingsComponent() {
        return d
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: h(e)
        }
    }
    getSnapablePoints(e) {
        return this.getControlPoints(e).filter(e => "left-top" == e.key || "top-right" == e.key || "bottom" == e.key).map(e => e.p)
    }
    getIcon() {
        return {
            caption: React.createElement("div", {
                style: {
                    marginTop: -3
                }
            },
            "y=x", React.createElement("span", {
                style: {
                    fontSize: "0.8em",
                    verticalAlign: 2
                }
            },
            "2")),
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "parabola"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: "M3.664580556367241,4 Q9.83229027818362,28 16,4"
            }))
        }
    }
    getBoundingRect(e) {
        return e.data.rotation ? Geometry.genericLinesBbox(h(e)) : e.data
    }
}

export { u as ShapeParabolaB }

export default h