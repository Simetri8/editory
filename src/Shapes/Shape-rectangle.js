import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(127) /*Shape-rectangle*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
function mm(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    var n = e.data;
    var r = n.p1;
    var a = n.p2;
    var o = Geometry.getPointsRect(e.data);
    var l = Geometry.pointsToLines(o);
    if (t <= 0) return ShapeUtil.genericLinesTransformed(e.data, l);
    var c = a.x - r.x;
    var d = a.y - r.y;
    var h = t < c / 2 ? t : c / 2;
    var u = t < d / 2 ? t : d / 2;
    var p = {
        x: r.x + h,
        y: r.y + u
    };
    var m = {
        x: a.x - h,
        y: r.y + u
    };
    var f = {
        x: a.x - h,
        y: a.y - u
    };
    var g = {
        x: r.x + h,
        y: a.y - u
    };
    var y = Geometry.getLeftTopArc(p, h, u);
    var A = Geometry.getRightTopArc(m, h, u);
    var E = Geometry.getRightBottomArc(f, h, u);
    var v = Geometry.getLeftBottomArc(g, h, u);
    var S = [];
    return S.push(y),
    Geometry.distance2Points(l[0].p1, l[0].p2) > 2 * t && S.push({
        p1: Geometry.addPoint(l[0].p1, {
            x: t,
            y: 0
        }),
        p2: Geometry.addPoint(l[0].p2, {
            x: -t,
            y: 0
        })
    }),
    S.push(A),
    Geometry.distance2Points(l[1].p1, l[1].p2) > 2 * t && S.push({
        p1: Geometry.addPoint(l[1].p1, {
            x: 0,
            y: t
        }),
        p2: Geometry.addPoint(l[1].p2, {
            x: 0,
            y: -t
        })
    }),
    S.push(E),
    Geometry.distance2Points(l[2].p1, l[2].p2) > 2 * t && S.push({
        p1: Geometry.addPoint(l[2].p1, {
            x: -t,
            y: 0
        }),
        p2: Geometry.addPoint(l[2].p2, {
            x: t,
            y: 0
        })
    }),
    S.push(v),
    Geometry.distance2Points(l[3].p1, l[3].p2) > 2 * t && S.push({
        p1: Geometry.addPoint(l[3].p1, {
            x: 0,
            y: -t
        }),
        p2: Geometry.addPoint(l[3].p2, {
            x: 0,
            y: t
        })
    }),
    ShapeUtil.genericLinesTransformed(e.data, S)
}
/*n.d(t, "c", function () {
    return hh
});*/
/*n.d(t, "a", function () {
    return pp
});*/
/*n.d(t, "b", function () {
    return mm
});*/
/*n.d(t, "d", function () {
    return ff
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 19 times
/// var o = n(9)/*ShapeBase*/;  // 1 times
/// var s = n(8)/*ShapeUtil*/;  // 2 times
/// var l = n(10)/*ShapeHelper*/;  // 1 times
/// var c = n(25)/*ColorHelper*/;  // 1 times
/// var d = n(17)/*ItemDefaultSettings*/;  // 1 times
class hh extends ShapeBase {
    render() {
        var e = ItemDefaultSettings.getSettings(this.shape(), "cornerRadius");
        var t = mm(this.shape(), e);
        var n = ShapeHelper.pathsD(t);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), this.getTransparentOnlyNoFill(n), React.createElement("path", {
            className: "real",
            d: n,
            style: this.style()
        }))
    }
}
class u extends ShapeBaseC {}
class pp extends ShapeBaseB {
    getComponent() {
        return hh
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return {
            component: React.createElement("svg", {
                key: this.getType(),
                style: e
            },
            React.createElement("rect", {
                x: "5",
                y: "6",
                width: "13",
                height: "9"
            }))
        }
    }
    getType() {
        return "rectangle"
    }
    getSettingsComponent() {
        return u
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: mm(e)
        }
    }
    getSnapablePoints(e) {
        var t = e.data;
        var n = t.p1;
        var r = t.p2;
        var a = Geometry.getCenterPoint(n, r);
        return mm(e).map((e) => {
            return e.p2
        }).concat(a)
    }
}
var ff = new pp

export { hh as ShapeRectangleC }

export { mm as ShapeRectangleB }

export { ff as ShapeRectangleD }

export default pp