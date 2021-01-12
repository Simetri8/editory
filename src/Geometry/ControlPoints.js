import _ from 'lodash';
import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import Geometry from './Geometry';
import ShapeHelper from '../Shapes/ShapeHelper';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(84) /*ControlPoints*/

/// var r = n(0)/*React*/;  // 15 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 1 times
/// var o = n.n(i);
/// var s = n(1)/*Geometry*/;  // 2 times
/// var l = n(10)/*ShapeHelper*/;  // 4 times
/// var c = n(25)/*ColorHelper*/;  // 1 times
/// var d = n(70)/*TransformHelper*/;  // 1 times
var ControlPoints = new class {
    fromHeadInfo(e, t) {
        if (!e) return null;
        var n = e.rotation,
        r = e.p,
        i = e.points ? this.fromPoints(e.points) : void 0,
        o = e.lines ? this.fromPaths(e.lines) : void 0,
        s = e.circle ? this.fromCircle(e.circle) : void 0,
        l = e.arc ? this.fromArc(e.arc) : void 0,
        c = !1 === e.stroke ? "none" : t.stroke,
        h = e.fill ? t.stroke : void 0,
        u = {
            stroke: c,
            fill: h,
            strokeWidth: t.strokeWidth || 1
        };
        return React.createElement("g", {
            style: u,
            stroke: c,
            fill: h,
            transform: (new TransformHelper).rotateAround(n, r.x, r.y, "deg").translate(r.x, r.y).toCssStyle()
        },
        i, o, s, l)
    }
    fromPathInfo(e, t, n, r) {
        var i = ShapeHelper.pathsInfoD(e),
        o = r ? this.getStrokeDashArray(r.shaft, r.thickness) : void 0;
        return React.createElement("path", {
            className: t,
            strokeDasharray: o,
            style: n,
            d: i
        })
    }
    fromCircle(e, t, n, r) {
        if (!e) return null;
        var i = r ? this.getStrokeDashArray(r.shaft, r.thickness) : void 0;
        return React.createElement("circle", {
            className: t,
            strokeDasharray: i,
            cx: e.cp.x,
            cy: e.cp.y,
            r: e.r,
            style: n
        })
    }
    fromRectangleLike(e, t, n, r) {
        if (!e) return null;
        var i = r ? this.getStrokeDashArray(r.shaft, r.thickness) : void 0;
        return React.createElement("rect", {
            className: t,
            strokeDasharray: i,
            x: e.p1.x,
            y: e.p1.y,
            width: e.p2.x - e.p1.x,
            height: e.p2.y - e.p1.y,
            style: n
        })
    }
    fromPoints(e, t, n, r) {
        if (!e) return null;
        var i = ShapeHelper.getLineD(e),
        o = r ? this.getStrokeDashArray(r.shaft, r.thickness) : void 0;
        return React.createElement("path", {
            className: t,
            style: n,
            d: i,
            strokeDasharray: o
        })
    }
    fromPaths(e, t, n, r) {
        if (!e) return null;
        var i = ShapeHelper.pathsD(e),
        o = r ? this.getStrokeDashArray(r.shaft, r.thickness) : void 0;
        return React.createElement("path", {
            className: t,
            style: n,
            d: i,
            strokeDasharray: o
        })
    }
    fromArc(e, t, n, r) {
        var i = r ? this.getStrokeDashArray(r.shaft, r.thickness) : void 0;
        return React.createElement("path", {
            className: t,
            style: n,
            strokeDasharray: i,
            d: "M".concat(e.p1.x, ",").concat(e.p1.y, " A ").concat(e.rx, ",").concat(e.ry, " ").concat(e.xRotation, " 0,0 ").concat(e.p2.x, ",").concat(e.p2.y)
        })
    }
    getCubicControlPointGuides(e) {
        return _.flatMap(e, (e, t) => [React.createElement("line", {
            key: "c1" + t,
            className: "control-point-guide",
            x1: e.p1.x,
            y1: e.p1.y,
            x2: e.cp.x,
            y2: e.cp.y
        }), React.createElement("line", {
            key: "c2" + t,
            className: "control-point-guide",
            x1: e.p2.x,
            y1: e.p2.y,
            x2: e.cp2.x,
            y2: e.cp2.y
        })])
    }
    getAddShape(e, t) {
        var n = "translate(".concat(e.x - 8, ",").concat(e.y - 9, ") ");
        return React.createElement("g", {
            className: "add-label",
            transform: n,
            onMouseDown: t
        },
        React.createElement("path", {
            transform: "scale(0.41)",
            d: "M29.27,19.5h-6V13a2,2,0,1,0-4,0V19.5h-6a2,2,0,1,0,0,4h6v6a2,2,0,0,0,4,0v-6h6A2,2,0,0,0,29.27,19.5Z"
        }))
    }
    getStrokeDashArray(e, t) {
        return ColorHelper.getStrokeDasharrayFromStrokeType(e, t)
    }
    getDoubleWaveLine(e, t, n, r) {
        var i = Geometry.parallelLine(e, t, 1.5),
        o = Geometry.parallelLine(e, t, -1.5);
        return React.createElement("g", null, React.createElement("path", {
            d: this.getWaveLineD(i.p1, i.p2, n, r)
        }), React.createElement("path", {
            d: this.getWaveLineD(o.p1, o.p2, n, r)
        }))
    }
    getWaveLine(e, t, n, r, i, o) {
        return React.createElement("path", {
            d: this.getWaveLineD(e, t, n, r, i, o)
        })
    }
    round2(e) {
        return +e.toFixed(2)
    }
    getWaveLineD(e, t, n, r, a, i) {
        return ShapeHelper.getWaveLineD(e, t, n, r, a, i)
    }
}

export default ControlPoints