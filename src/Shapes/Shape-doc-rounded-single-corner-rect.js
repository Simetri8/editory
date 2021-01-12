import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(390) /*Shape-doc-rounded-single-corner-rect*/

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
    a = t.cornerRadiusPercentage,
    i = void 0 === a ? .4 : a,
    o = Geometry.rectWidth(e.data) / 2,
    l = Geometry.rectHeight(e.data) / 2,
    c = Math.min(o, l),
    h = Math.min(c, i * c),
    u = n.y,
    p = r.y,
    m = n.x,
    f = r.x,
    g = Geometry.getLeftTopArc({
        x: m + h,
        y: u + h
    },
    h, h);
    return ShapeUtil.genericLinesTransformed(e.data, [g, {
        p1: {
            x: m + h,
            y: u
        },
        p2: {
            x: f,
            y: u
        }
    },
    {
        p1: {
            x: f,
            y: u
        },
        p2: {
            x: f,
            y: p
        }
    },
    {
        p1: {
            x: f,
            y: p
        },
        p2: {
            x: m,
            y: p
        }
    },
    {
        p1: {
            x: m,
            y: p
        },
        p2: {
            x: m,
            y: u + h
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
                d: " M3.8,9.93 C3.8,7.73 5.58,5.95 7.78,5.95 L16.9,5.95 L16.9,15.48 L3.8,15.48 L3.8,9.93"
            }))
        }
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.cornerRadiusPercentage,
        o = void 0 === i ? .4 : i,
        l = Geometry.rectHeight(e.data),
        c = Geometry.rectWidth(e.data) / 2,
        h = l / 2,
        u = Math.min(c, h),
        p = Math.min(u, o * u),
        m = ShapeUtil.pointTransformed(e.data, {
            x: a.x + p,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: m
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data.p1,
        n = Geometry.rectHeight(e.shape.data),
        r = Geometry.rectWidth(e.shape.data) / 2,
        a = n / 2,
        i = Math.min(r, a);
        if ("md1" == e.key) {
            var l = ShapeUtil.reversePointFixedY(e.shape.data, t.y, e.point),
            c = (_.clamp(l.x, t.x, t.x + i) - t.x) / i;
            return this.changeShapeData(e.shape, "cornerRadiusPercentage", c)
        }
        return e.shape
    }
    getType() {
        return "doc-rounded-single-corner-rect"
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
}

export { m as ShapeDocRoundedSingleCornerRectB }

export default u