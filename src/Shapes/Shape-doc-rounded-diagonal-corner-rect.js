import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(392) /*Shape-doc-rounded-diagonal-corner-rect*/

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
        x: A - m,
        y: f + m
    },
    m, m),
    S = Geometry.getRightBottomArc({
        x: A - p,
        y: g - p
    },
    p, p),
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
            x: A - m,
            y: f
        }
    },
    v, {
        p1: {
            x: A,
            y: f + m
        },
        p2: {
            x: A,
            y: g - p
        }
    },
    S, {
        p1: {
            x: A - p,
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
                    transform: "translate(1.5px,0.5px)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.2,9.07 C3.2,6.88 4.97,5.11 7.16,5.11 L16.7,5.11 C16.7,5.11 16.7,5.11 16.7,5.11 L16.7,10.75 C16.7,12.93 14.93,14.71 12.74,14.71 L3.2,14.71 C3.2,14.71 3.2,14.71 3.2,14.71 L3.2,9.07"
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
            x: a.x + g,
            y: a.y
        }),
        E = ShapeUtil.pointTransformed(e.data, {
            x: i.x - y,
            y: a.y
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
            u = (_.clamp(h.x, n.x, n.x + c) - n.x) / c;
            return this.changeShapeData(e.shape, "cornerRadiusPercentage", u)
        }
        if ("md2" == e.key) {
            var p = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
            m = _.clamp(p.x, r.x - c, r.x),
            f = (r.x - m) / c;
            return this.changeShapeData(e.shape, "cornerRadiusPercentage2", f)
        }
        return e.shape
    }
    getType() {
        return "doc-rounded-diagonal-corner-rect"
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

export { m as ShapeDocRoundedDiagonalCornerRectB }

export default u