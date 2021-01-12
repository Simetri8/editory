import _ from 'lodash';
import React from 'react';
import BezierReverser from '../Geometry/BezierReverser';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(408) /*Shape-doc-tear-drop*/

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
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 7 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 1 times
/// u = n(135)/*BezierReverser*/,  // 1 times
/// p = n(8)/*ShapeUtil*/;  // 3 times
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
    a = t.percentage,
    i = void 0 === a ? .5 : a,
    o = Object(BezierReverser)({
        p1: n,
        p2: r
    },
    0, 270),
    s = Geometry.rectWidth(e.data),
    l = Geometry.rectHeight(e.data),
    d = i * s,
    h = i * l,
    m = {
        p1: {
            x: n.x + s / 2,
            y: n.y
        },
        p2: {
            x: r.x - s / 2 + d,
            y: n.y + l / 2 - h
        },
        cp: {
            x: r.x - s / 2 + Math.min(s / 2, d),
            y: n.y
        }
    },
    f = {
        p1: {
            x: r.x - s / 2 + d,
            y: n.y + l / 2 - h
        },
        p2: {
            x: r.x,
            y: n.y + l / 2
        },
        cp: {
            x: r.x,
            y: n.y + l / 2 - Math.min(l / 2, h)
        }
    };
    return ShapeUtil.genericLinesTransformed(e.data, [...o, Geometry.quadraticToCubic(m), Geometry.quadraticToCubic(f)])
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
                d: " M15.4,10.21 C15.4,13.19 13.01,15.6 10.07,15.6 C7.13,15.6 4.74,13.19 4.74,10.21 C4.74,7.24 7.13,4.83 10.07,4.83 C13.62,4.83 15.4,4.83 15.4,4.83 C15.4,4.83 15.4,6.62 15.4,10.21 Z"
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
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .5 : i,
        s = Geometry.rectWidth(e.data),
        l = o * s,
        d = ShapeUtil.pointTransformed(e.data, {
            x: a.x + s / 2 + l,
            y: a.y
        });
        return n.concat([{
            key: "md1",
            p: d,
            type: "square"
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data.p1,
        n = Geometry.rectWidth(e.shape.data);
        switch (e.key) {
        case "md1":
            var r = ShapeUtil.reversePointFixedY(e.shape.data, t.y, e.point),
            a = (_.clamp(r.x, t.x + n / 2, t.x + n / 2 + n) - (t.x + n / 2)) / n;
            return this.changeShapeData(e.shape, "percentage", a)
        }
        return e.shape
    }
    getType() {
        return "doc-tear-drop"
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
        return f(e).map(e => e.p2)
    }
    getBoundingRect(e) {
        var t = f(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { y as ShapeDocTearDropB }

export default f