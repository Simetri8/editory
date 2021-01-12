import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(410) /*Shape-doc-smiley-face*/

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
/// i = n(0)/*React*/,  // 14 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 10 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 4 times
/// u = n(8)/*ShapeUtil*/;  // 6 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
        t = ShapeHelper.pathsD(e.outerCircle),
        n = ShapeHelper.pathsD(e.eye1),
        r = ShapeHelper.pathsD(e.eye2),
        a = ShapeHelper.pathsD(e.smile),
        i = this.style(),
        s = this.styleNoFill();
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
            className: "real",
            d: t,
            style: i
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: i
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: i
        }), React.createElement("path", {
            className: "real",
            d: a,
            style: s
        }))
    }
}
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? 1 : a,
    o = Geometry.rectWidth(e.data),
    s = Geometry.rectHeight(e.data),
    l = .33 * o,
    d = .33 * s,
    h = .05 * o,
    p = .05 * s,
    m = Geometry.ellipseToCubicBeziers({
        x: n.x + l - h,
        y: n.y + d - p
    },
    {
        x: n.x + l + h,
        y: n.y + d + p
    }),
    f = Geometry.ellipseToCubicBeziers({
        x: r.x - l - h,
        y: n.y + d - p
    },
    {
        x: r.x - l + h,
        y: n.y + d + p
    }),
    g = .05 * s,
    y = .75 * s - g + (2 * g - g * i * 2),
    A = .25 * o,
    E = Geometry.quadraticToCubic({
        p1: {
            x: n.x + A,
            y: n.y + y
        },
        p2: {
            x: r.x - A,
            y: n.y + y
        },
        cp: {
            x: n.x + o / 2,
            y: n.y + .75 * s - 3 * g + g * i * 6
        }
    });
    return {
        outerCircle: ShapeUtil.genericLinesTransformed(e.data, Geometry.ellipseToCubicBeziers(n, r)),
        eye1: ShapeUtil.genericLinesTransformed(e.data, m),
        eye2: ShapeUtil.genericLinesTransformed(e.data, f),
        smile: ShapeUtil.genericLinesTransformed(e.data, [E])
    }
}
class f extends ShapeBaseC {}
var g = new class extends ShapeBaseB {
    constructor() {
        super(...arguments);
        this.getSupplementaryLines = (() => [])
    }
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
                d: " M3.4,10.4 C3.4,7.09 6.31,4.4 9.9,4.4 C13.49,4.4 16.4,7.09 16.4,10.4 C16.4,13.71 13.49,16.4 9.9,16.4 C6.31,16.4 3.4,13.71 3.4,10.4 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M7.04,8.36 C7.04,8.03 7.33,7.76 7.69,7.76 C8.05,7.76 8.34,8.03 8.34,8.36 C8.34,8.69 8.05,8.96 7.69,8.96 C7.33,8.96 7.04,8.69 7.04,8.36 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M11.46,8.36 C11.46,8.03 11.75,7.76 12.11,7.76 C12.47,7.76 12.76,8.03 12.76,8.36 C12.76,8.69 12.47,8.96 12.11,8.96 C11.75,8.96 11.46,8.69 11.46,8.36 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1.5px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M6.65,12.8 C8.82,14.4 10.98,14.4 13.15,12.8"
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
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? 1 : i,
        s = Geometry.rectHeight(e.data),
        l = Geometry.rectWidth(e.data),
        d = .05 * s,
        h = .75 * s - d + d * o * 2,
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + l / 2,
            y: a.y + h
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
        r = .05 * n;
        if ("md1" == e.key) {
            var a = ShapeUtil.reversePoint(e.shape.data, e.point),
            i = t.y + .75 * n,
            o = (_.clamp(a.y, i - r, i + r) - (i - r)) / (2 * r);
            return this.changeShapeData(e.shape, "percentage", o)
        }
        return e.shape
    }
    getType() {
        return "doc-smiley-face"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = m(e);
        return {
            data: t.outerCircle.concat(t.eye1).concat(t.eye2).concat(t.smile)
        }
    }
    getSnapablePoints() {
        return []
    }
    getBoundingRect(e) {
        var t = m(e);
        return Geometry.genericLinesBbox(t.outerCircle)
    }
}

export { g as ShapeDocSmileyFaceB }

export default m