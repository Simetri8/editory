import _ from 'lodash';
import React from 'react';
import BezierReverser from '../Geometry/BezierReverser';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(288) /*Shape-arc*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return g
}),*/
/*n.d(t, "b", function () {
    return A
});*/
/// var r = n(0)/*React*/,  // 10 times
/// a = n.n(r)
/// i = n(2)/*lodash*/,  // 3 times
/// o = n.n(i)
/// s = n(7)/*PropUpdateHelper*/,  // 1 times
/// l = n(1)/*Geometry*/,  // 4 times
/// c = n(10)/*ShapeHelper*/,  // 2 times
/// d = n(33)/*ItemRemoveSelected*/,  // 1 times
/// h = n(9)/*ShapeBase*/,  // 1 times
/// u = n(135)/*BezierReverser*/,  // 1 times
/// p = n(8)/*ShapeUtil*/,  // 2 times
/// m = n(17)/*ItemDefaultSettings*/;  // 4 times
class f extends ShapeBase {
    render() {
        var e = ItemDefaultSettings.getSettings(this.shape(), "centerConnectLine"),
        t = g(this.shape(), e),
        n = g(this.shape(), !0),
        r = ShapeHelper.pathsD(t),
        i = ShapeHelper.pathsD(n);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: r,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: i,
            style: this.styleNoStroke()
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: this.styleNoFill()
        }))
    }
}
function g(e, t) {
    var n = e.data,
    r = n.p1,
    a = n.p2,
    i = n.angle1,
    s = void 0 === i ? 70 : i,
    c = n.angle2,
    d = void 0 === c ? 290 : c,
    h = Object(BezierReverser)({
        p1: r,
        p2: a
    },
    s, d);
    if (t) {
        var m = Geometry.getCenterPoint({
            p1: r,
            p2: a
        }),
        f = _.first(h),
        g = _.last(h);
        h.push({
            p1: g.p2,
            p2: m
        });
        h.push({
            p1: m,
            p2: f.p1
        })
    }
    return ShapeUtil.genericLinesTransformed(e.data, h)
}
class y extends ShapeBaseC {
    shouldComponentUpdate(e) {
        var t = e.entity,
        n = this.props.entity;
        return this.isSettingDifferent(t, n, "centerConnectLine")
    }
    render() {
        var e = this.props.entity,
        t = ItemDefaultSettings.getSettings(e, "centerConnectLine");
        return React.createElement("arc-settings", null, React.createElement("main", null, React.createElement("x-item", {
            onMouseDown: () => this.props.onEntityPropertyChanged(e, "settings", "centerConnectLine", !t),
            class: t ? "selected" : "",
            style: {
                width: 23,
                marginLeft: 5
            }
        },
        React.createElement("svg", null, React.createElement("path", {
            style: {
                stroke: "#e0e0e0",
                fill: "none"
            },
            d: " M2.9,7.28 C5.34,5.68 8.34,4.74 11.58,4.74 C14.62,4.74 17.45,5.57 19.81,7 L11.579484798147945,18.368009507593335 Z"
        }), React.createElement("path", {
            style: {
                stroke: "green",
                fill: "none",
                strokeWidth: 2
            },
            d: "M19.81,7 L11.579484798147945,18.368009507593335 L2.9,7.28"
        }))), ItemRemoveSelected.separator()))
    }
}
var A = new class extends ShapeBaseB {
    getComponent() {
        return f
    }
    getType() {
        return "arc"
    }
    getSettingsComponent() {
        return y
    }
    getAngleCutPoints(e) {
        var t = g(e, ItemDefaultSettings.getSettings(e, "centerConnectLine"));
        return [{
            key: "ap1",
            p: t[0].p1,
            type: "square"
        },
        {
            key: "ap2",
            p: t[t.length - 1].p2,
            type: "square"
        }]
    }
    getSnapablePoints(e) {
        var t = e.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.getCenterPoint(n, r);
        return this.getAngleCutPoints(e).map(e => e.p).concat(a)
    }
    getControlPoints(e, t) {
        t = t || 1;
        var n = e.data,
        r = n.p1,
        a = n.p2,
        i = super.getControlPoints(e, t);
        i = (i = _.filter(i, e => "right" != e.key && "left" != e.key && "top" != e.key && "bottom" != e.key)).concat(this.getAngleCutPoints(e));
        var s = a.x - r.x;
        return (a.y - r.y) * t <= 30 && s * t <= 30 && i.forEach(e => e.smaller = !0),
        i
    }
    moveControlPoint(e) {
        var t = e.key,
        n = e.shape;
        switch (t) {
        case "ap1":
            case "ap2":
            var r = "ap1" == t ? "data.angle1" : "data.angle2",
            a = n.data.p2,
            i = Geometry.getCenterPoint(n.data),
            o = ShapeUtil.reversePoint(e.shape.data, e.point),
            c = Geometry.angleFrom3Points360({
                x: a.x,
                y: i.y
            },
            o, i);
            return PropUpdateHelper.set(n, r, c)
        }
        return super.moveControlPoint(e)
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: g(e, ItemDefaultSettings.getSettings(e, "centerConnectLine"))
        }
    }
}

export { A as ShapeArcB }

export default g