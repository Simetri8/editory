import _ from 'lodash';
import React from 'react';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { ShapeRectangleC, ShapeRectangleB } from './Shape-rectangle';
import ColorHelper from '../Mathcha/ColorHelper';
import Geometry from '../Geometry/Geometry';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeUtil from './ShapeUtil';

/// xxx(1538) /*Shape-square*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/// var o = n(1)/*Geometry*/;  // 12 times
/// var h = n(127)/*Shape-rectangle*/;  // 3 times
/// var p = n(35)/*slicedToArray*/;  // 1 times
/// var m = n.n(p);
/// var f = n(3);  // 2 times
/// var g = n.n(f);
/// var A = n(8)/*ShapeUtil*/;  // 1 times
/// var S = n(0)/*React*/;  // 2 times
/// var C = n.n(S);
/// var x = n(25)/*ColorHelper*/;  // 1 times
/*n.d(t, "b", function () {
    return ShapeSquare
});*/
class E extends ShapeBaseC {}
class v extends ShapeBaseB {
    getControlPoints(e) {
        return function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            var n = e.data.rotation;
            var r = Geometry.getCenterPoint(e.data.p1, e.data.p2);
            var a = ShapeUtil.rectTo4Points(e.data);
            var i = slicedToArray(a, 4);
            var s = i[0];
            var l = i[1];
            var c = i[2];
            var d = i[3];
            var h = Geometry.getMiddlePointLine(s, d);
            var u = Geometry.getMiddlePointLine(s, l);
            var p = Geometry.getMiddlePointLine(l, c);
            var f = Geometry.getMiddlePointLine(c, d);
            var g = e.data.flipX ? c : d;
            g = {
                x: (g = Geometry.pointRotate(g, r, -n)).x,
                y: g.y + 12
            };
            g = Geometry.pointRotate(g, r, n);
            var y = [{
                key: "top",
                p: u,
                cursor: "ns-resize",
                rotation: n
            },
            {
                key: "right",
                p: p,
                cursor: "ew-resize",
                rotation: n
            },
            {
                key: "bottom",
                p: f,
                cursor: "ns-resize",
                rotation: n
            },
            {
                key: "left",
                p: h,
                cursor: "ew-resize",
                rotation: n
            },
            {
                key: "skew-x",
                p: g,
                cursor: "crosshair",
                rotation: n,
                type: "skew"
            }];
            var E = Geometry.rectWidth(e.data);
            if (Geometry.rectHeight(e.data) * t <= 25 && E * t <= 25) y.forEach((e) => {
                return e.smaller = true
            });
            return y
        } (e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1)
    }
    moveControlPoint(e) {
        return e.isShift = true,
        super.moveControlPoint(e)
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 50,
            shapeHeight: e.shapeHeight || 50
        }))
    }
    scale(e, t, n, r) {
        var a = super.scale(e, t, n, r);
        return Geometry.rectWidth(a.data) != Geometry.rectHeight(a.data) ? _.assignIn({},
        a, {
            type: this.getTransformedShapeTypeWhenConstrainBroken()
        }) : a
    }
}
class I extends ShapeRectangleC {}
class T extends E {}
var ShapeSquare = new class extends v {
    getComponent() {
        return I
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return {
            component: React.createElement("svg", {
                key: this.getType(),
                style: e
            },
            React.createElement("rect", {
                x: "6",
                y: "5",
                width: "10",
                height: "10"
            }))
        }
    }
    getType() {
        return "square"
    }
    getSettingsComponent() {
        return T
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Object(ShapeRectangleB)(e)
        }
    }
    getSnapablePoints(e) {
        var t = e.data;
        var n = t.p1;
        var r = t.p2;
        var a = Geometry.getCenterPoint(n, r);
        return Object(ShapeRectangleB)(e).map((e) => {
            return e.p2
        }).concat(a)
    }
    getTransformedShapeTypeWhenConstrainBroken() {
        return "rectangle"
    }
}

export { ShapeSquare as ShapeSquareB }

export default ShapeSquare 