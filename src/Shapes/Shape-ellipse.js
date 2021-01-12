import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(164) /*Shape-ellipse*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "b", function () {
    return d
}),*/
/*n.d(t, "a", function () {
    return h
}),*/
/*n.d(t, "c", function () {
    return p
});*/
/// var r = n(0)/*React*/,  // 4 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 3 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(8)/*ShapeUtil*/,  // 1 times
/// l = n(10)/*ShapeHelper*/,  // 1 times
/// c = n(25)/*ColorHelper*/;  // 1 times
class d extends ShapeBase {
    render() {
        var e = h(this.shape()),
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
function h(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.ellipseToCubicBeziers(n, r);
    return ShapeUtil.genericLinesTransformed(e.data, a)
}
class u extends ShapeBaseC {}
var p = new class extends ShapeBaseB {
    getComponent() {
        return d
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return {
            component: React.createElement("svg", {
                key: this.getType(),
                style: e
            },
            React.createElement("ellipse", {
                cx: "11",
                cy: "10",
                rx: "7",
                ry: "5"
            }))
        }
    }
    getType() {
        return "ellipse"
    }
    getSettingsComponent() {
        return u
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: h(e)
        }
    }
    getSnapablePoints(e) {
        var t = e.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.getCenterPoint(n, r);
        return h(e).map(e => e.p2).concat(a)
    }
    getBoundingRect(e) {
        var t = h(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { d as ShapeEllipseB }

export { p as ShapeEllipseC }

export default h