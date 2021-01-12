import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(433) /*Shape-flow-display*/

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
/// i = n(0)/*React*/,  // 4 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 5 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 1 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
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
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.rectWidth(e.data),
    i = Geometry.rectHeight(e.data),
    o = .17 * a,
    l = n.y,
    c = r.y,
    h = n.x,
    u = r.x - o,
    p = r.x,
    m = Geometry.ellipseToCubicBeziers({
        x: p - 2 * o,
        y: l
    },
    {
        x: p,
        y: c
    });
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: h + o,
            y: l
        },
        p2: {
            x: u,
            y: l
        }
    },
    m[1], m[2], {
        p1: {
            x: u,
            y: c
        },
        p2: {
            x: h + o,
            y: c
        }
    },
    {
        p1: {
            x: h + o,
            y: c
        },
        p2: {
            x: h,
            y: l + i / 2
        }
    },
    {
        p1: {
            x: h,
            y: l + i / 2
        },
        p2: {
            x: h + o,
            y: l
        }
    }])
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
                d: " M6.18,5.25 L13.54,5.25 C14.9,5.25 16,7.49 16,10.25 C16,13.01 14.9,15.25 13.54,15.25 L6.18,15.25 L3.72,10.25 Z"
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
        return "flow-display"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: u(e)
        }
    }
    getSnapablePoints(e) {
        return u(e).map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { m as ShapeFlowDisplayB }

export default u