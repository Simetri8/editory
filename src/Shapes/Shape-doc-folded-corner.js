import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(404) /*Shape-doc-folded-corner*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return y
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 8 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 7 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 2 times
/// d = n(2)/*lodash*/,  // 1 times
/// h = n.n(d)
/// u = n(8)/*ShapeUtil*/;  // 4 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
        t = ShapeHelper.pathsD(e.outerBox),
        n = ShapeHelper.pathsD(e.corner);
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
            className: "real",
            d: t,
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: this.styleNoFill()
        }))
    }
}
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.cornerPercentage,
    i = void 0 === a ? .6 : a,
    o = Geometry.rectWidth(e.data),
    l = Geometry.rectHeight(e.data),
    c = Math.min(o / 2, l / 2),
    d = Math.min(c, i * c),
    h = .2 * d,
    p = n.y,
    m = r.y - d,
    f = r.y - d + h,
    g = r.y,
    y = n.x,
    A = r.x - d,
    E = r.x - d + h,
    v = r.x;
    return {
        outerBox: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: A,
                y: g
            },
            p2: {
                x: y,
                y: g
            }
        },
        {
            p1: {
                x: y,
                y: g
            },
            p2: {
                x: y,
                y: p
            }
        },
        {
            p1: {
                x: y,
                y: p
            },
            p2: {
                x: v,
                y: p
            }
        },
        {
            p1: {
                x: v,
                y: p
            },
            p2: {
                x: v,
                y: m
            }
        },
        {
            p1: {
                x: v,
                y: m
            },
            p2: {
                x: A,
                y: g
            }
        },
        {
            p1: {
                x: A,
                y: g
            },
            p2: {
                x: A,
                y: g
            }
        }]),
        corner: ShapeUtil.genericLinesTransformed(e.data, [{
            p1: {
                x: v,
                y: m
            },
            p2: {
                x: E,
                y: f
            }
        },
        {
            p1: {
                x: E,
                y: f
            },
            p2: {
                x: A,
                y: g
            }
        }])
    }
}
function f(e) {
    return e.outerBox.concat(e.corner)
}
class g extends ShapeBaseC {}
var y = new class extends ShapeBaseB {
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
                    transform: "translate(1px,0px)"
                },
                d: " M10.53,16.22 L5.44,16.22 L5.44,4.89 L15.63,4.89 L15.63,11.13 L10.53,16.22 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)"
                },
                d: " M15.63,11.13 L11.55,12.15 L10.53,16.22"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 50,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getComponent() {
        return p
    }
    getType() {
        return "doc-folded-corner"
    }
    getSettingsComponent() {
        return g
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: f(m(e))
        }
    }
    getSnapablePoints(e) {
        return f(m(e)).map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p2,
        i = r.cornerPercentage,
        o = void 0 === i ? .6 : i,
        l = Geometry.rectWidth(e.data),
        c = Geometry.rectHeight(e.data),
        d = Math.min(l / 2, c / 2),
        h = Math.min(d, o * d),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x - h,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            type: "square",
            p: p
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.rectWidth(e.shape.data),
        i = Geometry.rectHeight(e.shape.data),
        o = Math.min(a / 2, i / 2);
        if ("md1" == e.key) {
            var l = ShapeUtil.reversePointFixedY(e.shape.data, r.y, e.point),
            c = _.clamp(l.x, n.x - o, r.x),
            d = (r.x - c) / o;
            return this.changeShapeData(e.shape, "cornerPercentage", d)
        }
    }
}

export { y as ShapeDocFoldedCornerB }

export default m