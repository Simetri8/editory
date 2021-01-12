import _ from 'lodash';
import React from 'react';
import BezierReverser from '../Geometry/BezierReverser';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(290) /*Shape-doc-arc*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return f
}),*/
/*n.d(t, "b", function () {
    return g
}),*/
/*n.d(t, "c", function () {
    return A
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 6 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 4 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 4 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 2 times
/// u = n(135)/*BezierReverser*/,  // 2 times
/// p = n(8)/*ShapeUtil*/;  // 3 times
class m extends ShapeBase {
    render() {
        var e = g(this.shape()),
        t = f(this.shape()),
        n = ShapeHelper.pathsD(e),
        r = ShapeHelper.pathsD(t);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: n,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: this.styleNoStroke()
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: this.styleNoFill()
        }))
    }
}
function f(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.angle1,
    i = void 0 === a ? 70 : a,
    o = t.angle2,
    s = void 0 === o ? 290 : o,
    d = Object(BezierReverser)({
        p1: n,
        p2: r
    },
    i, s),
    h = _.first(d),
    m = _.last(d),
    f = Geometry.getCenterPoint(e.data);
    return ShapeUtil.genericLinesTransformed(e.data, [...d, {
        p1: m.p2,
        p2: f
    },
    {
        p1: f,
        p2: h.p1
    }])
}
function g(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.angle1,
    i = void 0 === a ? 70 : a,
    o = t.angle2,
    s = void 0 === o ? 290 : o;
    return ShapeUtil.genericLinesTransformed(e.data, Object(BezierReverser)({
        p1: n,
        p2: r
    },
    i, s))
}
class y extends ShapeBaseC {}
var A = new class extends ShapeBaseB {
    getComponent() {
        return m
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
                d: " M8.81,16.33 C6.8,15.38 5.4,13.25 5.4,10.77 C5.4,7.42 7.97,4.69 11.15,4.69 C12.42,4.69 13.6,5.13 14.55,5.87"
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
        r = g(e);
        return n.concat([{
            key: "md1",
            p: r[0].p1,
            type: "square"
        },
        {
            key: "md2",
            p: r[r.length - 1].p2,
            type: "square"
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.key,
        n = e.shape,
        r = n.data.p2,
        a = Geometry.getCenterPoint(n.data),
        i = ShapeUtil.reversePoint(e.shape.data, e.point),
        o = Geometry.angleFrom3Points360({
            x: r.x,
            y: a.y
        },
        i, a);
        switch (t) {
        case "md1":
            return this.changeShapeData(e.shape, "angle1", o);
        case "md2":
            return this.changeShapeData(e.shape, "angle2", o)
        }
        return e.shape
    }
    getType() {
        return "doc-arc"
    }
    getSettingsComponent() {
        return y
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: g(e)
        }
    }
    getSnapablePoints(e) {
        var t = g(e);
        return [_.first(t).p1, _.last(t).p2].concat(Geometry.getCenterPoint(e.data))
    }
}

export { g as ShapeDocArcB }

export { A as ShapeDocArcC }

export default f