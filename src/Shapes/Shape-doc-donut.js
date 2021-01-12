import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(403) /*Shape-doc-donut*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return g
});*/
/// var r = n(3)/*_.assignIn*/,  // 2 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 4 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 10 times
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
            style: _.assignIn({},
            this.style(), {
                fillRule: "evenodd"
            })
        }))
    }
}
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? .6 : a,
    o = Geometry.rectWidth(e.data),
    s = Geometry.rectHeight(e.data),
    l = Math.min(o / 2, s / 2),
    d = Math.min(i * l, l),
    h = Geometry.ellipseToCubicBeziers(n, r),
    p = Geometry.ellipseToCubicBeziers({
        x: n.x + d,
        y: n.y + d
    },
    {
        x: r.x - d,
        y: r.y - d
    });
    return ShapeUtil.genericLinesTransformed(e.data, p.concat(h))
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
                d: " M7.06,10.11 C7.06,8.61 8.43,7.39 10.11,7.39 C11.8,7.39 13.16,8.61 13.16,10.11 C13.16,11.61 11.8,12.82 10.11,12.82 C8.43,12.82 7.06,11.61 7.06,10.11 M3.67,10.11 C3.67,6.74 6.55,4 10.11,4 C13.67,4 16.56,6.74 16.56,10.11 C16.56,13.48 13.67,16.22 10.11,16.22 C6.55,16.22 3.67,13.48 3.67,10.11"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 60,
            shapeHeight: e.shapeHeight || 60
        }))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .6 : i,
        s = Geometry.rectHeight(e.data),
        l = Geometry.rectWidth(e.data),
        d = Math.min(l / 2, s / 2),
        h = Math.min(o * d, d),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + h,
            y: a.y + s / 2
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
        n = Geometry.rectHeight(e.shape.data),
        r = Geometry.rectWidth(e.shape.data),
        a = Math.min(r / 2, n / 2);
        if ("md1" == e.key) {
            var i = ShapeUtil.reversePointFixedY(e.shape.data, t.y + n / 2, e.point),
            o = (_.clamp(i.x, t.x, t.x + a) - t.x) / a;
            return this.changeShapeData(e.shape, "percentage", o)
        }
        return e.shape
    }
    getType() {
        return "doc-donut"
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
        return m(e).map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { g as ShapeDocDonutB }

export default m