import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(372) /*Shape-down-arrow*/

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
/// i = n(1)/*Geometry*/,  // 8 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(2)/*lodash*/,  // 2 times
/// c = n.n(l)
/// d = n(8)/*ShapeUtil*/;  // 5 times
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
    a = t.arrowPercentage,
    o = void 0 === a ? .6 : a,
    s = t.sizePercentage,
    l = void 0 === s ? .5 : s,
    c = Geometry.rectWidth(e.data),
    h = Geometry.rectHeight(e.data),
    u = n.y,
    p = n.y + h * o,
    m = r.y,
    f = n.x,
    g = n.x + c / 2 * l,
    y = n.x + c / 2,
    A = n.x + c / 2 + c / 2 * (1 - l),
    E = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: f,
        y: p
    },
    {
        x: g,
        y: p
    },
    {
        x: g,
        y: u
    },
    {
        x: A,
        y: u
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
        x: y,
        y: m
    },
    {
        x: f,
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
                key: "down-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px) rotate(90deg) scaleX(0.8)",
                    transformOrigin: "50% 50%"
                },
                d: " M3,7 L12.07,7 L12.07,4 L20,10 L12.07,16 L12.07,13 L3,13 Z"
            }))
        }
    }
    getComponent() {
        return h
    }
    getType() {
        return "down-arrow"
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
        var t = e.data.p1,
        n = Geometry.rectWidth(e.data),
        r = {
            x: t.x + n / 2,
            y: t.y
        };
        return u(e).concat(Geometry.rotatePointsByShapeRect(e, [r]))
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.getBoundingRectFromPoints(t)
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
            x: a.x,
            y: a.y + u * s
        }),
        m = ShapeUtil.pointTransformed(e.data, {
            x: a.x + h / 2 * c,
            y: a.y
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
            var a = ShapeUtil.reversePoint(e.shape.data, e.point),
            i = (_.clamp(a.y, n.y, r.y) - n.y) / (r.y - n.y);
            return this.changeShapeData(e.shape, "arrowPercentage", i)
        }
        if ("md2" == e.key) {
            var o = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            s = r.x - n.x,
            l = (_.clamp(o.x, n.x, n.x + s / 2) - n.x) / (s / 2);
            return this.changeShapeData(e.shape, "sizePercentage", l)
        }
    }
}

export { m as ShapeDownArrowB }

export default u