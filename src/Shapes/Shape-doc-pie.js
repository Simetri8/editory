import _ from 'lodash';
import React from 'react';
import BezierReverser from '../Geometry/BezierReverser';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(407) /*Shape-doc-pie*/

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
/// c = n(1)/*Geometry*/,  // 4 times
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
    i = void 0 === a ? 0 : a,
    o = t.angle2,
    s = void 0 === o ? 270 : o,
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
                d: " M16.3,10.01 C16.3,10.04 16.3,10.07 16.3,10.1 C16.3,13.36 13.66,16 10.4,16 C7.14,16 4.5,13.36 4.5,10.1 C4.5,6.84 7.14,4.2 10.4,4.2 C10.44,4.2 10.49,4.2 10.53,4.2 L10.4,10.1 Z"
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
            p: r[r.length - 3].p2,
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
        return "doc-pie"
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
        return [_.first(t).p1, t[t.length - 3].p2].concat(Geometry.getCenterPoint(e.data))
    }
}

export { y as ShapeDocPieB }

export default f