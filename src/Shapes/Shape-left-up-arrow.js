import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(377) /*Shape-left-up-arrow*/

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
/// s = n(1)/*Geometry*/,  // 5 times
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
    i = void 0 === a ? .2 : a,
    o = t.sizePercentage,
    l = void 0 === o ? .2 : o,
    c = t.arrowWidthPercentage,
    d = void 0 === c ? .5 : c,
    h = Geometry.rectWidth(e.data),
    p = Geometry.rectHeight(e.data),
    m = Math.min(h, p),
    f = i * m,
    g = l * m,
    y = d * m,
    A = n.y,
    E = n.y + f,
    v = r.y - y,
    S = r.y - y / 2 - g / 2,
    C = r.y - y / 2,
    x = r.y - y / 2 + g / 2,
    I = r.y,
    T = n.x,
    b = n.x + f,
    L = r.x - y,
    R = r.x - y / 2 - g / 2,
    M = r.x - y / 2,
    w = r.x - y / 2 + g / 2,
    O = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: T,
        y: C
    },
    {
        x: b,
        y: v
    },
    {
        x: b,
        y: S
    },
    {
        x: R,
        y: S
    },
    {
        x: R,
        y: E
    },
    {
        x: L,
        y: E
    },
    {
        x: M,
        y: A
    },
    {
        x: O,
        y: E
    },
    {
        x: w,
        y: E
    },
    {
        x: w,
        y: x
    },
    {
        x: b,
        y: x
    },
    {
        x: b,
        y: I
    },
    {
        x: T,
        y: C
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
                key: "left-up-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(2px,1px) ",
                    transformOrigin: "50% 50%"
                },
                d: " M1,13.18 L5.11,9.45 L5.11,11.3 L11.7,11.3 L11.7,6.11 L9.85,6.11 L13.57,2 L17.3,6.11 L15.45,6.11 L15.45,15.06 L5.11,15.06 L5.11,16.91 Z"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "left-up-arrow"
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
        l = void 0 === o ? .2 : o,
        c = r.sizePercentage,
        d = void 0 === c ? .2 : c,
        h = r.arrowWidthPercentage,
        p = void 0 === h ? .5 : h,
        m = Geometry.rectWidth(e.data),
        f = Geometry.rectHeight(e.data),
        g = Math.min(m, f),
        y = l * g,
        A = d * g,
        E = p * g,
        v = ShapeUtil.pointTransformed(e.data, {
            x: i.x,
            y: a.y + y
        }),
        S = ShapeUtil.pointTransformed(e.data, {
            x: i.x - E / 2 - A / 2,
            y: i.y - E / 2 - A / 2
        }),
        C = ShapeUtil.pointTransformed(e.data, {
            x: i.x - E,
            y: a.y
        });
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
        a = t.sizePercentage,
        i = void 0 === a ? .2 : a,
        o = t.arrowWidthPercentage,
        s = void 0 === o ? .5 : o,
        l = r.x - n.x,
        c = r.y - n.y,
        d = Math.min(l, c),
        p = i * d,
        m = s * d;
        if ("md1" == e.key) {
            var f = ShapeUtil.reversePoint(e.shape.data, e.point),
            g = (_.clamp(f.y, n.y, n.y + d) - n.y) / d;
            return this.changeShapeData(e.shape, "arrowPercentage", g)
        }
        if ("md2" == e.key) {
            var y = ShapeUtil.reversePoint(e.shape.data, e.point),
            A = r.y - m / 2 + p / 2,
            E = (A - _.clamp(y.y, A - d, A)) / d;
            return this.changeShapeData(e.shape, "sizePercentage", E)
        }
        if ("md3" == e.key) {
            var v = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            S = _.clamp(v.x, r.x - d, r.x),
            C = (r.x - S) / d;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", C)
        }
    }
}

export { g as ShapeLeftUpArrowB }

export default m