import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(416) /*Shape-doc-diagonal-stripe*/

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
/// c = n(1)/*Geometry*/,  // 7 times
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
    i = void 0 === a ? .5 : a,
    o = Geometry.rectWidth(e.data) * i,
    s = Geometry.rectHeight(e.data) * i,
    l = n.y,
    d = n.y + s,
    h = r.y,
    p = n.x,
    m = n.x + o,
    f = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: m,
        y: l
    },
    {
        x: f,
        y: l
    },
    {
        x: p,
        y: h
    },
    {
        x: p,
        y: d
    },
    {
        x: m,
        y: l
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
                    transform: "translate(1px,0px)"
                },
                d: " M9.43,5.38 L16.1,5.38 L4.4,15.4 L4.4,9.69 Z"
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
    getComponent() {
        return p
    }
    getType() {
        return "doc-diagonal-stripe"
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
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .5 : i,
        s = Geometry.rectWidth(e.data) * o,
        l = ShapeUtil.pointTransformed(e.data, {
            x: a.x + s,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: l
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectWidth(e.shape.data);
        if ("md1" == e.key) {
            var i = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            o = (_.clamp(i.x, n.x, r.x) - n.x) / a;
            return this.changeShapeData(e.shape, "percentage", o)
        }
    }
}

export { g as ShapeDocDiagonalStripeB }

export default m