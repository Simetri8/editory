import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(383) /*Shape-striped-right-arrow*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return f
});*/
/// var r = n(0)/*React*/,  // 11 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 6 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 3 times
/// l = n(2)/*lodash*/,  // 2 times
/// c = n.n(l)
/// d = n(8)/*ShapeUtil*/;  // 7 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.getLineD(e.points1),
        n = ShapeHelper.getLineD(e.points2),
        r = ShapeHelper.getLineD(e.points3);
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
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: this.style()
        }))
    }
}
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.arrowPercentage,
    o = void 0 === a ? .6 : a,
    s = t.sizePercentage,
    l = void 0 === s ? .5 : s,
    c = Geometry.rectWidth(e.data),
    h = Geometry.rectHeight(e.data),
    u = .25 * Math.min(c, h),
    p = n.x,
    m = n.x + .2 * u,
    f = n.x + .4 * u,
    g = n.x + .8 * u,
    y = n.y,
    A = n.y + h / 2 * l,
    E = n.y + h / 2,
    v = n.y + h / 2 + h / 2 * (1 - l),
    S = r.y,
    C = n.x + u,
    x = n.x + c * o,
    I = r.x;
    return {
        points1: ShapeUtil.pointsTransformed(e.data, [{
            x: C,
            y: A
        },
        {
            x: x,
            y: A
        },
        {
            x: x,
            y: y
        },
        {
            x: I,
            y: E
        },
        {
            x: x,
            y: S
        },
        {
            x: x,
            y: v
        },
        {
            x: C,
            y: v
        },
        {
            x: C,
            y: A
        }]),
        points2: ShapeUtil.pointsTransformed(e.data, [{
            x: p,
            y: A
        },
        {
            x: m,
            y: A
        },
        {
            x: m,
            y: v
        },
        {
            x: p,
            y: v
        },
        {
            x: p,
            y: A
        }]),
        points3: ShapeUtil.pointsTransformed(e.data, [{
            x: f,
            y: A
        },
        {
            x: g,
            y: A
        },
        {
            x: g,
            y: v
        },
        {
            x: f,
            y: v
        },
        {
            x: f,
            y: A
        }])
    }
}
function p(e) {
    return e.points1.concat(e.points2).concat(e.points3)
}
class m extends ShapeBaseC {}
var f = new class extends ShapeBaseB {
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "striped-right-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0.5px)"
                },
                d: " M7.05,7.1 L12.46,7.1 L12.46,4 L18.9,10.35 L12.46,16.71 L12.46,13.61 L7.05,13.61 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0.5px)"
                },
                d: " M2.6,7.1 L3.04,7.1 L3.04,13.61 L2.6,13.61 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0.5px)"
                },
                d: " M4.82,7.1 L5.27,7.1 L5.27,13.61 L4.82,13.61 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "striped-right-arrow"
    }
    getSettingsComponent() {
        return m
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(p(u(e)))
        }
    }
    getSnapablePoints(e) {
        return p(u(e))
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.getBoundingRectFromPoints(p(t))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        o = r.arrowPercentage,
        s = void 0 === o ? .6 : o,
        l = r.sizePercentage,
        c = void 0 === l ? .5 : l,
        h = Geometry.rectWidth(e.data),
        u = Geometry.rectHeight(e.data),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + h * s,
            y: a.y
        }),
        m = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
            y: a.y + u / 2 * c
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: p
        },
        {
            key: "md2",
            type: "square",
            p: m
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2;
        if ("md1" == e.key) {
            var a = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            i = (_.clamp(a.x, n.x, r.x) - n.x) / (r.x - n.x);
            return this.changeShapeData(e.shape, "arrowPercentage", i)
        }
        if ("md2" == e.key) {
            var o = ShapeUtil.reversePoint(e.shape.data, e.point),
            s = r.y - n.y,
            l = (_.clamp(o.y, n.y, n.y + s / 2) - n.y) / (s / 2);
            return this.changeShapeData(e.shape, "sizePercentage", l)
        }
    }
}

export { f as ShapeStripedRightArrowB }

export default u