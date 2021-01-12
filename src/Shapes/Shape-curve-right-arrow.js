import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(382) /*Shape-curve-right-arrow*/

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
/// i = n(0)/*React*/,  // 8 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 10 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 2 times
/// d = n(2)/*lodash*/,  // 3 times
/// h = n.n(d)
/// u = n(8)/*ShapeUtil*/;  // 7 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
        t = e.slice(0, 3),
        n = e.slice(3),
        r = ShapeHelper.pathsD(t),
        a = ShapeHelper.pathsD(n);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: r,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: a,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: a,
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
    d = void 0 === c ? .5 : c,
    h = Geometry.rectWidth(e.data),
    p = Geometry.rectHeight(e.data),
    m = Math.min(h, p),
    f = m * d,
    g = m * Math.min(i, .9),
    y = Math.min(m * l, f),
    A = n.y,
    E = r.y - f / 2 - y / 2,
    v = r.y - f / 2,
    S = r.y - f / 2 + y / 2,
    C = n.x,
    x = n.x + g,
    I = r.x,
    T = Geometry.ellipseToCubicBeziers({
        x: C - h,
        y: A
    },
    {
        x: I,
        y: E
    }),
    b = Geometry.ellipseToCubicBeziers({
        x: C - h,
        y: A + y
    },
    {
        x: I,
        y: S
    }),
    L = T[1],
    R = Geometry.reverseBezierDirection(b[1]),
    M = T[2],
    w = Geometry.reverseBezierDirection(b[2]),
    O = {
        p1: {
            x: x,
            y: r.y
        },
        p2: {
            x: x,
            y: n.y
        }
    },
    D = Geometry.splitBezierByLine(M, O)[0] || M,
    N = Geometry.splitBezierByLine(w, O)[1] || w,
    k = (f - y) / 2;
    return ShapeUtil.genericLinesTransformed(e.data, [R, {
        p1: {
            x: R.p2.x,
            y: R.p2.y
        },
        p2: {
            x: L.p1.x,
            y: L.p1.y
        }
    },
    L, D, {
        p1: {
            x: x,
            y: D.p2.y
        },
        p2: {
            x: x,
            y: D.p2.y - k
        }
    },
    {
        p1: {
            x: x,
            y: D.p2.y - k
        },
        p2: {
            x: C,
            y: v
        }
    },
    {
        p1: {
            x: C,
            y: v
        },
        p2: {
            x: x,
            y: N.p1.y + k
        }
    },
    {
        p1: {
            x: x,
            y: N.p1.y + k
        },
        p2: {
            x: x,
            y: N.p1.y
        }
    },
    N, {
        p2: {
            x: N.p2.x,
            y: N.p2.y
        },
        p1: {
            x: N.p2.x,
            y: N.p2.y - y
        }
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
                key: "curve-right-arrow"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px) scale(-1,1)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.5,7.16 C3.5,4.31 9.94,2 17.88,2 L17.88,5.38 C9.94,5.38 3.5,7.69 3.5,10.54"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)  scale(-1,1)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.5,10.54 C3.5,12.73 7.3,14.6 12.66,15.35 L12.66,17.28 L17.88,14.01 L12.66,10.03 L12.66,11.97 C7.3,11.22 3.5,9.35 3.5,7.16 M3.5,10.54 L3.5,7.16"
            }))
        }
    }
    getComponent() {
        return p
    }
    getType() {
        return "curve-right-arrow"
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
    createShape(e) {
        var t = super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 50,
            shapeHeight: e.shapeHeight || 70
        }));
        return t.style = {
            fillColor: [255, 255, 255, 1]
        },
        t
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
        p = void 0 === h ? .5 : h,
        m = Geometry.rectWidth(e.data),
        f = Geometry.rectHeight(e.data),
        g = Math.min(m, f),
        y = g * p,
        A = g * d,
        E = g * l,
        v = ShapeUtil.pointTransformed(e.data, {
            x: a.x + E,
            y: i.y
        }),
        S = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
            y: a.y + A
        }),
        C = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
            y: i.y - y
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
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key && "md3" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = r.x - n.x,
        i = r.y - n.y,
        o = Math.min(a, i);
        if ("md1" == e.key) {
            var s = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            l = (_.clamp(s.x, n.x, n.x + o) - n.x) / o;
            return this.changeShapeData(e.shape, "arrowPercentage", l)
        }
        if ("md2" == e.key) {
            var c = ShapeUtil.reversePoint(e.shape.data, e.point),
            d = (_.clamp(c.y, n.y, n.y + o) - n.y) / o;
            return this.changeShapeData(e.shape, "sizePercentage", d)
        }
        if ("md3" == e.key) {
            var p = ShapeUtil.reversePoint(e.shape.data, e.point),
            m = _.clamp(p.y, r.y - o, r.y),
            f = (r.y - m) / o;
            return this.changeShapeData(e.shape, "arrowWidthPercentage", f)
        }
    }
}

export { g as ShapeCurveRightArrowB }

export default m