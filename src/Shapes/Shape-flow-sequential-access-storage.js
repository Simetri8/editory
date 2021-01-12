import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(430) /*Shape-flow-sequential-access-storage*/

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
    a = Geometry.rectHeight(e.data),
    i = Geometry.rectWidth(e.data),
    o = .15 * a,
    l = r.y,
    c = n.x,
    h = r.x,
    u = Geometry.ellipseToCubicBeziers(n, r),
    p = {
        p1: {
            x: c,
            y: l - o
        },
        p2: {
            x: h,
            y: l - o
        }
    },
    m = Geometry.splitBezierByLine(u[2], p)[0] || u[2];
    return ShapeUtil.genericLinesTransformed(e.data, [u[0], u[1], m, {
        p1: m.p2,
        p2: {
            x: h,
            y: l - o
        }
    },
    {
        p1: {
            x: h,
            y: l - o
        },
        p2: {
            x: h,
            y: l
        }
    },
    {
        p1: {
            x: h,
            y: l
        },
        p2: {
            x: c + i / 2,
            y: l
        }
    },
    u[3]])
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
                d: " M4.4,10 C4.4,7.13 6.91,4.8 10,4.8 C13.09,4.8 15.6,7.13 15.6,10 C15.6,11.17 15.18,12.25 14.48,13.12 L15.6,13.12 L15.6,15.2 L10,15.2 C6.91,15.2 4.4,12.87 4.4,10 Z"
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
        return "flow-sequential-access-storage"
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
        return u(e).map(e => e.p2)
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { m as ShapeFlowSequentialAccessStorageB }

export default u