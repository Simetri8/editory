import _ from 'lodash';
import React from 'react';
import BezierReverser from '../Geometry/BezierReverser';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(406) /*Shape-doc-chord*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return f
}),*/
/*n.d(t, "b", function () {
    return y
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 5 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 3 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 3 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 1 times
/// u = n(135)/*BezierReverser*/,  // 1 times
/// p = n(8)/*ShapeUtil*/;  // 2 times
class m extends ShapeBase {
    render() {
        var e = f(this.shape()),
        t = ShapeHelper.pathsD(e);
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
            className: "real",
            d: t,
            style: this.style()
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
    c = Object(BezierReverser)({
        p1: n,
        p2: r
    },
    i, s),
    d = _.first(c),
    h = _.last(c);
    return ShapeUtil.genericLinesTransformed(e.data, [...c, {
        p1: h.p2,
        p2: d.p1
    }])
}
class g extends ShapeBaseC {}
var y = new class extends ShapeBaseB {
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
                d: " M8.81,16.33 C6.8,15.38 5.4,13.25 5.4,10.77 C5.4,7.42 7.97,4.69 11.15,4.69 C12.42,4.69 13.6,5.13 14.55,5.87 Z"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 60,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = f(e);
        return n.concat([{
            key: "md1",
            p: r[0].p1,
            type: "square"
        },
        {
            key: "md2",
            p: r[r.length - 2].p2,
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
        return "doc-chord"
    }
    getSettingsComponent() {
        return g
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: f(e)
        }
    }
    getSnapablePoints(e) {
        var t = f(e);
        return [_.first(t).p1, t[t.length - 2].p2].concat(Geometry.getCenterPoint(e.data))
    }
}

export { y as ShapeDocChordB }

export default f