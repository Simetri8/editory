import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(402) /*Shape-doc-bevel*/

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
/// i = n(0)/*React*/,  // 20 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 14 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 6 times
/// u = n(8)/*ShapeUtil*/;  // 8 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
        t = ShapeHelper.getLineD(e.outerBox),
        n = ShapeHelper.getLineD(e.innerBox),
        r = ShapeHelper.getLineD(e.leftTopLink),
        a = ShapeHelper.getLineD(e.rightTopLink),
        i = ShapeHelper.getLineD(e.rightBottomLink),
        s = ShapeHelper.getLineD(e.leftBottomLink),
        l = this.style(),
        c = this.styleNoFill();
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: t,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: n,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: r,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: a,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: i,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: s,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: t,
            style: l
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: c
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: c
        }), React.createElement("path", {
            className: "real",
            d: a,
            style: c
        }), React.createElement("path", {
            className: "real",
            d: i,
            style: c
        }), React.createElement("path", {
            className: "real",
            d: s,
            style: c
        }))
    }
}
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? .4 : a,
    o = Geometry.rectWidth(e.data),
    s = Geometry.rectHeight(e.data),
    l = Math.min(o / 2, s / 2),
    d = Math.min(l, i * l),
    h = n.y,
    p = n.y + d,
    m = r.y - d,
    f = r.y,
    g = n.x,
    y = n.x + d,
    A = r.x - d,
    E = r.x;
    return {
        outerBox: ShapeUtil.pointsTransformed(e.data, [{
            x: g,
            y: h
        },
        {
            x: E,
            y: h
        },
        {
            x: E,
            y: f
        },
        {
            x: g,
            y: f
        },
        {
            x: g,
            y: h
        }]),
        innerBox: ShapeUtil.pointsTransformed(e.data, [{
            x: y,
            y: p
        },
        {
            x: A,
            y: p
        },
        {
            x: A,
            y: m
        },
        {
            x: y,
            y: m
        },
        {
            x: y,
            y: p
        }]),
        leftTopLink: ShapeUtil.pointsTransformed(e.data, [{
            x: g,
            y: h
        },
        {
            x: y,
            y: p
        }]),
        rightTopLink: ShapeUtil.pointsTransformed(e.data, [{
            x: E,
            y: h
        },
        {
            x: A,
            y: p
        }]),
        rightBottomLink: ShapeUtil.pointsTransformed(e.data, [{
            x: E,
            y: f
        },
        {
            x: A,
            y: m
        }]),
        leftBottomLink: ShapeUtil.pointsTransformed(e.data, [{
            x: g,
            y: f
        },
        {
            x: y,
            y: m
        }])
    }
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
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4,4.2 L16,4.2 L16,15.77 L4,15.77 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M6.69,6.89 L13.31,6.89 L13.31,13.08 L6.69,13.08 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4,4.2 L6.69,6.89"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M16,4.2 L13.31,6.89"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M16,15.77 L13.31,13.08"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4,15.77 L6.69,13.08"
            }))
        }
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .4 : i,
        s = Geometry.rectHeight(e.data),
        l = Geometry.rectWidth(e.data),
        d = Math.min(l / 2, s / 2),
        h = Math.min(d, o * d),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + h,
            y: a.y
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
            var i = ShapeUtil.reversePointFixedY(e.shape.data, t.y, e.point),
            o = (_.clamp(i.x, t.x, t.x + a) - t.x) / a;
            return this.changeShapeData(e.shape, "percentage", o)
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
        return "doc-bevel"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = m(e),
        n = Geometry.pointsToLines(t.outerBox),
        r = Geometry.pointsToLines(t.innerBox),
        a = Geometry.pointsToLines(t.leftTopLink),
        i = Geometry.pointsToLines(t.rightTopLink),
        o = Geometry.pointsToLines(t.rightBottomLink),
        s = Geometry.pointsToLines(t.leftBottomLink);
        return {
            data: n.concat(r).concat(a).concat(i).concat(o).concat(s)
        }
    }
    getSnapablePoints(e) {
        var t = m(e);
        return t.outerBox.concat(t.innerBox).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.getBoundingRectFromPoints(t.outerBox)
    }
}

export { g as ShapeDocBevelB }

export default m