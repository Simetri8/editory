import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(379) /*Shape-bend-up-arrow*/

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
/// s = n(1)/*Geometry*/,  // 9 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(2)/*lodash*/,  // 3 times
/// h = n.n(d)
/// u = n(8)/*ShapeUtil*/;  // 7 times
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
    a = t.arrowPercentage,
    i = void 0 === a ? .4 : a,
    o = t.sizePercentage,
    l = void 0 === o ? .3 : o,
    c = t.arrowWidthPercentage,
    d = void 0 === c ? .6 : c,
    h = Geometry.rectWidth(e.data),
    p = Geometry.rectHeight(e.data),
    m = Math.min(h, p),
    f = i * m,
    g = d * m,
    y = Math.min(l * m, g),
    A = n.y,
    E = n.y + f,
    v = r.y - y,
    S = r.y,
    C = n.x,
    x = r.x - g,
    I = r.x - g / 2 - y / 2,
    T = r.x - g / 2,
    b = r.x - g / 2 + y / 2,
    L = r.x;
    return ShapeUtil.pointsTransformed(e.data, Geometry.clampPoints([{
        x: C,
        y: v
    },
    {
        x: I,
        y: v
    },
    {
        x: I,
        y: E
    },
    {
        x: x,
        y: E
    },
    {
        x: T,
        y: A
    },
    {
        x: L,
        y: E
    },
    {
        x: b,
        y: E
    },
    {
        x: b,
        y: S
    },
    {
        x: C,
        y: S
    },
    {
        x: C,
        y: v
    }], n, r))
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
                key: "bend-up-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(2px,1px) ",
                    transformOrigin: "50% 50%"
                },
                d: " M3,12.34 L10.4,12.34 L10.4,7.39 L7.5,7.39 L12.5,2 L17.5,7.39 L14.6,7.39 L14.6,16.53 L3,16.53 Z"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "bend-up-arrow"
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
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.p2,
        o = r.arrowPercentage,
        l = void 0 === o ? .4 : o,
        c = r.sizePercentage,
        d = void 0 === c ? .3 : c,
        h = r.arrowWidthPercentage,
        p = void 0 === h ? .6 : h,
        m = Geometry.rectWidth(e.data),
        f = Geometry.rectHeight(e.data),
        g = Math.min(m, f),
        y = l * g,
        A = p * g,
        E = Math.min(d * g, A),
        v = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x,
            y: a.y + y
        },
        a, i)),
        S = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: a.x,
            y: i.y - E
        },
        a, i)),
        C = ShapeUtil.pointTransformed(e.data, Geometry.clampPoint({
            x: i.x - A,
            y: a.y
        },
        a, i));
        return n.concat([{
            key: "md1",
            type: "square",
            p: v
        },
        {
            key: "md2",
            type: "square",
            p: S
        },
        {
            key: "md3",
            type: "square",
            p: C
        }])
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 50,
            shapeHeight: e.shapeHeight || 60
        }))
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = r.x - n.x,
        i = r.y - n.y,
        o = Math.min(a, i);
        if ("md1" == e.key) {
            var s = ShapeUtil.reversePoint(e.shape.data, e.point),
            l = (_.clamp(s.y, n.y, r.y) - n.y) / o;
            return this.changeShapeData(e.shape, "arrowPercentage", l)
        }
        if ("md2" == e.key) {
            var c = ShapeUtil.reversePoint(e.shape.data, e.point),
            d = _.clamp(c.y, n.y, r.y),
            p = (r.y - d) / o;
            return this.changeShapeData(e.shape, "sizePercentage", p)
        }
        if ("md3" == e.key) {
            var m = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            f = _.clamp(m.x, n.x, r.x),
            g = (r.x - f) / o;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", g)
        }
    }
}

export { g as ShapeBendUpArrowB }

export default m