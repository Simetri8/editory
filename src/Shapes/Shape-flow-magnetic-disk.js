import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(431) /*Shape-flow-magnetic-disk*/

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
/// s = n(1)/*Geometry*/,  // 4 times
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
    i = a / 2,
    o = Math.min(i, .35 * a),
    l = n.y,
    c = n.y + o / 2,
    h = r.y - o / 2,
    u = n.x,
    p = r.x,
    m = Geometry.ellipseToCubicBeziers({
        x: u,
        y: l
    },
    {
        x: p,
        y: c + o / 2
    }),
    f = Geometry.ellipseToCubicBeziers({
        x: u,
        y: h - o / 2
    },
    {
        x: p,
        y: h + o / 2
    });
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: p,
            y: c
        },
        p2: {
            x: p,
            y: h
        }
    },
    f[2], f[3], {
        p1: {
            x: u,
            y: h
        },
        p2: {
            x: u,
            y: c
        }
    },
    m[2], m[3], m[0], m[1]])
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
                d: " M4.6,5.98 C4.6,4.66 7.06,3.6 10.1,3.6 C13.14,3.6 15.6,4.66 15.6,5.98 C15.6,7.29 13.14,8.36 10.1,8.36 C7.06,8.36 4.6,7.29 4.6,5.98 L4.6,13.81 C4.6,15.13 7.06,16.2 10.1,16.2 C13.14,16.2 15.6,15.13 15.6,13.81 L15.6,5.98"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 60,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "flow-magnetic-disk"
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

export { m as ShapeFlowMagneticDiskB }

export default u