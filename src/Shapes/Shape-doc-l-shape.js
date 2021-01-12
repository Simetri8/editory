import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(415) /*Shape-doc-l-shape*/

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
/// s = n(2)/*lodash*/,  // 2 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 8 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 1 times
/// u = n(8)/*ShapeUtil*/;  // 5 times
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
    a = t.widthPercentage,
    i = void 0 === a ? .3 : a,
    o = t.heightPercentage,
    s = void 0 === o ? .3 : o,
    l = Geometry.rectWidth(e.data),
    d = Geometry.rectHeight(e.data),
    h = Math.min(l, d),
    p = Math.min(l, i * h),
    m = Math.min(d, s * h),
    f = n.y,
    g = n.y + m,
    y = r.y,
    A = n.x,
    E = n.x + p,
    v = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: A,
        y: f
    },
    {
        x: E,
        y: f
    },
    {
        x: E,
        y: g
    },
    {
        x: v,
        y: g
    },
    {
        x: v,
        y: y
    },
    {
        x: A,
        y: y
    },
    {
        x: A,
        y: f
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
                    transform: "translate(1px,0.5px)"
                },
                d: " M4.94,4.33 L11.67,4.33 L11.67,9.91 L15.44,9.91 L15.44,15.33 L4.94,15.33 Z"
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
        return "doc-l-shape"
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
        return m(e)
    }
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.widthPercentage,
        o = void 0 === i ? .3 : i,
        s = r.heightPercentage,
        l = void 0 === s ? .3 : s,
        d = Geometry.rectWidth(e.data),
        h = Geometry.rectHeight(e.data),
        p = Math.min(d, h),
        m = Math.min(d, o * p),
        f = Math.min(h, l * p),
        g = ShapeUtil.pointTransformed(e.data, {
            x: a.x + m,
            y: a.y
        }),
        y = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
            y: a.y + f
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: g
        },
        {
            key: "md2",
            type: "square",
            p: y
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectWidth(e.shape.data),
        i = Geometry.rectHeight(e.shape.data),
        o = Math.min(a, i);
        if ("md1" == e.key) {
            var s = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            d = (_.clamp(s.x, n.x, r.x) - n.x) / o;
            return this.changeShapeData(e.shape, "widthPercentage", d)
        }
        if ("md2" == e.key) {
            var h = ShapeUtil.reversePoint(e.shape.data, e.point),
            p = (_.clamp(h.y, n.y, r.y) - n.y) / o;
            return this.changeShapeData(e.shape, "heightPercentage", p)
        }
    }
}

export { g as ShapeDocLShapeB }

export default m