import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(391) /*Shape-doc-rounded-same-side-corner-rect*/

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
/// i = n(2)/*lodash*/,  // 2 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 11 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 5 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
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
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.cornerRadiusPercentage,
    i = void 0 === a ? .4 : a,
    o = t.cornerRadiusPercentage2,
    l = void 0 === o ? 0 : o,
    c = Geometry.rectWidth(e.data) / 2,
    h = Geometry.rectHeight(e.data) / 2,
    u = Math.min(c, h),
    p = Math.min(u, i * u),
    m = Math.min(u, l * u),
    f = n.y,
    g = r.y,
    y = n.x,
    A = r.x,
    E = Geometry.getLeftTopArc({
        x: y + p,
        y: f + p
    },
    p, p),
    v = Geometry.getRightTopArc({
        x: A - p,
        y: f + p
    },
    p, p),
    S = Geometry.getRightBottomArc({
        x: A - m,
        y: g - m
    },
    m, m),
    C = Geometry.getLeftBottomArc({
        x: y + m,
        y: g - m
    },
    m, m);
    return ShapeUtil.genericLinesTransformed(e.data, [E, {
        p1: {
            x: y + p,
            y: f
        },
        p2: {
            x: A - p,
            y: f
        }
    },
    v, {
        p1: {
            x: A,
            y: f + p
        },
        p2: {
            x: A,
            y: g - m
        }
    },
    S, {
        p1: {
            x: A - m,
            y: g
        },
        p2: {
            x: y + m,
            y: g
        }
    },
    C, {
        p1: {
            x: y,
            y: g - m
        },
        p2: {
            x: y,
            y: f + p
        }
    }])
}
class p extends ShapeBaseC {}
var m = new class extends ShapeBaseB {
    getComponent() {
        return h
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
                    transform: "translate(1.5px,1px)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.13,8.38 C3.13,6.59 4.58,5.13 6.38,5.13 L13.63,5.13 C15.42,5.13 16.88,6.59 16.88,8.38 L16.88,14.63 C16.88,14.63 16.88,14.63 16.88,14.63 L3.13,14.63 C3.13,14.63 3.13,14.63 3.13,14.63 L3.13,8.38"
            }))
        }
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.p2,
        o = r.cornerRadiusPercentage,
        l = void 0 === o ? .4 : o,
        c = r.cornerRadiusPercentage2,
        h = void 0 === c ? 0 : c,
        u = Geometry.rectHeight(e.data),
        p = Geometry.rectWidth(e.data) / 2,
        m = u / 2,
        f = Math.min(p, m),
        g = Math.min(f, l * f),
        y = Math.min(f, h * f),
        A = ShapeUtil.pointTransformed(e.data, {
            x: i.x - g,
            y: a.y
        }),
        E = ShapeUtil.pointTransformed(e.data, {
            x: a.x + y,
            y: i.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: A
        },
        {
            key: "md2",
            type: "square",
            p: E
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectHeight(e.shape.data),
        i = Geometry.rectWidth(e.shape.data) / 2,
        l = a / 2,
        c = Math.min(i, l);
        if ("md1" == e.key) {
            var h = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            u = _.clamp(h.x, r.x - c, r.x),
            p = (r.x - u) / c;
            return this.changeShapeData(e.shape, "cornerRadiusPercentage", p)
        }
        if ("md2" == e.key) {
            var m = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            f = (_.clamp(m.x, n.x, n.x + c) - n.x) / c;
            return this.changeShapeData(e.shape, "cornerRadiusPercentage2", f)
        }
        return e.shape
    }
    getType() {
        return "doc-rounded-same-side-corner-rect"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: u(e)
        }
    }
    getSnapablePoints(e) {
        return u(e).map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
}

export { m as ShapeDocRoundedSameSideCornerRectB }

export default u