import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import ControlPoints from '../Geometry/ControlPoints';
import Geometry from '../Geometry/Geometry';
import ShapeHelper from '../Shapes/ShapeHelper';
import ShapeSelection from '../Shapes/ShapeSelection';

/// xxx(255) /*PolygonRenderer*/

/// var r = n(0)/*React*/;  // 6 times
/// var a = n.n(r);
/// var i = n(192)/*ShapeSelection*/;  // 3 times
/// var o = n(1)/*Geometry*/;  // 2 times
/// var s = n(25)/*ColorHelper*/;  // 1 times
/// var l = n(10)/*ShapeHelper*/;  // 1 times
/// var c = n(84)/*ControlPoints*/;  // 1 times
var PolygonRenderer = new class {
    renderPolygon(e, t, n, r, l, c) {
        for (var d = "", h = 0; h < t.length; h++) {
            var u = t[h];
            d += " ".concat(Geometry.round2(u.x), ",").concat(Geometry.round2(u.y))
        }
        var p = null;
        return (ColorHelper.noFillColor(l.style) || ShapeSelection.isAnySelection(c)) && (p = React.createElement("polygon", {
            className: "transparent no-print",
            points: d,
            style: ShapeSelection.getSelectionStyle(c, e)
        })),
        React.createElement("g", {
            key: e.id,
            className: n,
            onMouseDown: t => r(t, e),
            onTouchStart: t => r(t, e)
        },
        l.defs, p, React.createElement("polygon", {
            className: "real",
            points: d,
            style: l.style
        }))
    }
    renderPolygonCurve(e, t, n, r, o, s) {
        var c = ShapeHelper.pathsD(t),
        d = o.disableGuide ? void 0 : this.renderCubicGuideLineToControlPoints(t, o.isSelected);
        return React.createElement("g", {
            key: e.id,
            className: n,
            onMouseDown: t => s(t, e),
            onTouchStart: t => s(t, e)
        },
        r.defs, d, React.createElement("path", {
            className: "transparent no-print",
            d: c,
            style: ShapeSelection.getSelectionStyle(o, e)
        }), React.createElement("path", {
            className: "real",
            d: c,
            style: r.style
        }))
    }
    renderCubicGuideLineToControlPoints(e, t) {
        return t ? ControlPoints.getCubicControlPointGuides(e) : null
    }
}

export default PolygonRenderer