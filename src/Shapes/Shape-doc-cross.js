import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(417) /*Shape-doc-cross*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return g
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 4 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 8 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 1 times
/// u = n(8)/*ShapeUtil*/;  // 3 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
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
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? .6 : a,
    o = Geometry.rectWidth(e.data) / 2,
    s = Geometry.rectHeight(e.data) / 2,
    l = Math.min(o, s),
    d = Math.min(l, i * l),
    h = n.y,
    p = n.y + d,
    m = r.y - d,
    f = r.y,
    g = n.x,
    y = n.x + d,
    A = r.x - d,
    E = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: y,
        y: h
    },
    {
        x: A,
        y: h
    },
    {
        x: A,
        y: p
    },
    {
        x: E,
        y: p
    },
    {
        x: E,
        y: m
    },
    {
        x: A,
        y: m
    },
    {
        x: A,
        y: f
    },
    {
        x: y,
        y: f
    },
    {
        x: y,
        y: m
    },
    {
        x: g,
        y: m
    },
    {
        x: g,
        y: p
    },
    {
        x: y,
        y: p
    },
    {
        x: y,
        y: h
    }])
}
class f extends ShapeBaseC {}
var g = new class extends ShapeBaseB {
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
                    transform: "translate(1.5px,0px)"
                },
                d: " M7.84,4.14 L12.59,4.14 L12.59,7.7 L16.14,7.7 L16.14,12.73 L12.59,12.73 L12.59,16.29 L7.84,16.29 L7.84,12.73 L4.29,12.73 L4.29,7.7 L7.84,7.7 Z"
            }))
        }
    }
    getComponent() {
        return p
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 70,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "doc-cross"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(m(e))
        }
    }
    getSnapablePoints(e) {
        return m(e).concat(Geometry.getCenterPoint(e.data))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .6 : i,
        s = Geometry.rectWidth(e.data) / 2,
        l = Geometry.rectHeight(e.data) / 2,
        d = Math.min(s, l),
        h = Math.min(d, o * d),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + h,
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
            o = (_.clamp(i.x, t.x, t.x + n) - t.x) / a;
            return this.changeShapeData(e.shape, "percentage", o)
        }
    }
}

export { g as ShapeDocCrossB }

export default m