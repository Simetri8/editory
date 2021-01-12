import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(400) /*Shape-doc-can*/

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
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.yDiameterPercentage,
    i = void 0 === a ? .3 : a,
    o = Geometry.rectWidth(e.data),
    s = Geometry.rectHeight(e.data),
    l = s / 2,
    d = Math.min(o, s),
    h = Math.min(l, i * d),
    p = n.y,
    m = n.y + h / 2,
    f = r.y - h / 2,
    g = n.x,
    y = r.x,
    A = Geometry.ellipseToCubicBeziers({
        x: g,
        y: p
    },
    {
        x: y,
        y: m + h / 2
    }),
    E = Geometry.ellipseToCubicBeziers({
        x: g,
        y: f - h / 2
    },
    {
        x: y,
        y: f + h / 2
    });
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: y,
            y: m
        },
        p2: {
            x: y,
            y: f
        }
    },
    E[2], E[3], {
        p1: {
            x: g,
            y: f
        },
        p2: {
            x: g,
            y: m
        }
    },
    A[2], A[3], A[0], A[1]])
}
class f extends ShapeBaseC {}
var g = new class extends ShapeBaseB {
    getComponent() {
        return p
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
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.yDiameterPercentage,
        o = void 0 === i ? .3 : i,
        s = Geometry.rectHeight(e.data),
        l = Geometry.rectWidth(e.data),
        d = s / 2,
        h = Math.min(l, s),
        p = Math.min(d, o * h),
        m = ShapeUtil.pointTransformed(e.data, {
            x: a.x + l / 2,
            y: a.y + p
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
        r = Geometry.rectWidth(e.shape.data),
        a = n / 2,
        i = Math.min(r, n);
        if ("md1" == e.key) {
            var o = ShapeUtil.reversePoint(e.shape.data, e.point),
            s = (_.clamp(o.y, t.y, t.y + a) - t.y) / i;
            return this.changeShapeData(e.shape, "yDiameterPercentage", s)
        }
        return e.shape
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 60,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getType() {
        return "doc-can"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: m(e)
        }
    }
    getSnapablePoints(e) {
        return m(e).map(e => e.p2)
    }
}

export { g as ShapeDocCanB }

export default m