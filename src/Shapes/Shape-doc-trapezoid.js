import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(398) /*Shape-doc-trapezoid*/

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
        t = ShapeHelper.getLineD(e);
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
    i = void 0 === a ? .6 : a,
    o = Geometry.rectWidth(e.data) / 2,
    l = Geometry.rectHeight(e.data) / 2,
    c = Math.min(o, l),
    h = Math.min(o, i * c),
    u = n.y,
    p = r.y,
    m = n.x,
    f = n.x + h,
    g = r.x - h,
    y = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: m,
        y: p
    },
    {
        x: f,
        y: u
    },
    {
        x: g,
        y: u
    },
    {
        x: y,
        y: p
    },
    {
        x: m,
        y: p
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
                    transform: "translate(1px,0px)"
                },
                d: " M3.2,14.78 L6.46,5.8 L14.04,5.8 L17.3,14.78 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "doc-trapezoid"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(u(e))
        }
    }
    getSnapablePoints(e) {
        return u(e).concat(Geometry.getCenterPoint(e.data))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .6 : i,
        l = Geometry.rectWidth(e.data) / 2,
        c = Geometry.rectHeight(e.data) / 2,
        h = Math.min(l, c),
        u = Math.min(l, o * h),
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

export { m as ShapeDocTrapezoidB }

export default u