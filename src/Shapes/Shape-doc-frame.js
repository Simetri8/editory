import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(413) /*Shape-doc-frame*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return m
});*/
/// var r = n(0)/*React*/,  // 4 times
/// a = n.n(r)
/// i = n(2)/*lodash*/,  // 1 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 8 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 3 times
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
    a = t.percentage,
    i = void 0 === a ? .3 : a,
    o = Geometry.rectWidth(e.data) / 2,
    l = Geometry.rectHeight(e.data) / 2,
    c = Math.min(o, l),
    h = Math.min(c, i * c),
    u = n.y,
    p = n.y + h,
    m = r.y - h,
    f = r.y,
    g = n.x,
    y = n.x + h,
    A = r.x - h,
    E = r.x;
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: g,
            y: u
        },
        p2: {
            x: E,
            y: u
        }
    },
    {
        p1: {
            x: E,
            y: u
        },
        p2: {
            x: E,
            y: f
        }
    },
    {
        p1: {
            x: E,
            y: f
        },
        p2: {
            x: g,
            y: f
        }
    },
    {
        p1: {
            x: g,
            y: f
        },
        p2: {
            x: g,
            y: u
        }
    },
    {
        p1: {
            x: A,
            y: p
        },
        p2: {
            x: y,
            y: p
        }
    },
    {
        p1: {
            x: y,
            y: p
        },
        p2: {
            x: y,
            y: m
        }
    },
    {
        p1: {
            x: y,
            y: m
        },
        p2: {
            x: A,
            y: m
        }
    },
    {
        p1: {
            x: A,
            y: m
        },
        p2: {
            x: A,
            y: p
        }
    }])
}
class p extends ShapeBaseC {}
var m = new class extends ShapeBaseB {
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
                    transform: "translate(1px,0.5px)"
                },
                d: " M3.9,4.07 L16.1,4.07 L16.1,15.75 L3.9,15.75 Z M13.59,6.58 L6.41,6.58 L6.41,13.24 L13.59,13.24 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "doc-frame"
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
        return u(e).map(e => e.p1).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.genericLinesBbox(t)
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .3 : i,
        l = Geometry.rectWidth(e.data) / 2,
        c = Geometry.rectHeight(e.data) / 2,
        h = Math.min(l, c),
        u = Math.min(h, o * h),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + u,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: p
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data.p1,
        n = Geometry.rectWidth(e.shape.data) / 2,
        r = Geometry.rectHeight(e.shape.data) / 2,
        a = Math.min(n, r);
        if ("md1" == e.key) {
            var i = ShapeUtil.reversePointFixedY(e.shape.data, t.y, e.point),
            l = (_.clamp(i.x, t.x, t.x + n) - t.x) / a;
            return this.changeShapeData(e.shape, "percentage", l)
        }
    }
}

export { m as ShapeDocFrameB }

export default u