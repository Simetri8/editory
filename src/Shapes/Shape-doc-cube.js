import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(401) /*Shape-doc-cube*/

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
/// i = n(0)/*React*/,  // 6 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(1)/*Geometry*/,  // 9 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(10)/*ShapeHelper*/,  // 3 times
/// u = n(8)/*ShapeUtil*/;  // 5 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
        t = ShapeHelper.getLineD(e.outerBox),
        n = ShapeHelper.getLineD(e.line1),
        r = ShapeHelper.getLineD(e.line2),
        a = this.style(),
        i = this.styleNoFill();
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), this.getTransparentOnlyNoFill(t), this.getTransparentOnlyNoFill(n), this.getTransparentOnlyNoFill(r), React.createElement("path", {
            className: "real",
            d: t,
            style: a
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: i
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: i
        }))
    }
}
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? .3 : a,
    o = Geometry.rectWidth(e.data),
    s = Geometry.rectHeight(e.data),
    l = Math.min(o, s),
    d = Math.min(l - 1, i * l),
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
            y: p
        },
        {
            x: y,
            y: h
        },
        {
            x: E,
            y: h
        },
        {
            x: E,
            y: m
        },
        {
            x: A,
            y: f
        },
        {
            x: g,
            y: f
        },
        {
            x: g,
            y: p
        }]),
        line1: ShapeUtil.pointsTransformed(e.data, [{
            x: E,
            y: h
        },
        {
            x: A,
            y: p
        },
        {
            x: g,
            y: p
        }]),
        line2: ShapeUtil.pointsTransformed(e.data, [{
            x: A,
            y: p
        },
        {
            x: A,
            y: f
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
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4.1,7.4 L7.5,3.99 L16,3.99 L16,12.39 L12.6,15.8 L4.1,15.8 L4.1,7.4 M16,3.99 L12.6,7.4 L4.1,7.4 M12.6,7.4 L12.6,15.8"
            }))
        }
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.percentage,
        o = void 0 === i ? .3 : i,
        s = Geometry.rectHeight(e.data),
        l = Geometry.rectWidth(e.data),
        d = Math.min(l, s),
        h = Math.min(d - 1, o * d),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x,
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
        r = Geometry.rectWidth(e.shape.data),
        a = Math.min(r, n);
        if ("md1" == e.key) {
            var i = ShapeUtil.reversePoint(e.shape.data, e.point),
            o = (_.clamp(i.y, t.y, t.y + a) - t.y) / a;
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
        return "doc-cube"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = m(e),
        n = Geometry.pointsToLines(t.outerBox),
        r = Geometry.pointsToLines(t.line1),
        a = Geometry.pointsToLines(t.line2);
        return {
            data: n.concat(r).concat(a)
        }
    }
    getSnapablePoints(e) {
        var t = m(e);
        return t.outerBox.concat(t.line1).concat(t.line2)
    }
}

export { g as ShapeDocCubeB }

export default m