import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ColorTypeConverter from './ColorTypeConverter';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Geometry from '../Geometry/Geometry';
import PatternDef from './PatternDef';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(25) /*ColorHelper*/

/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 1 times
/// var o = n(2)/*lodash*/;  // 3 times
/// var s = n.n(o);
/// var l = n(223)/*PatternDef*/;  // 1 times
/// var c = n(70)/*TransformHelper*/;  // 4 times
/// var d = n(42)/*ColorTypeConverter*/;  // 5 times
/// var h = n(6)/*DiagramIdHelper*/;  // 1 times
/// var u = n(5)/*sizzle*/;  // 1 times
/// var p = n.n(u);
var ColorHelper = new class {
    getMathTypeBackgroundColor(e) {
        var t = jQuery(e).css("background-color"),
        n = ColorTypeConverter.colorToArr(t, void 0);
        return n && n[3] ? t : "white"
    }
    hasFillColor(e) {
        if (!e) return !0;
        var t = e.fill;
        return t && "none" != t && "transparent" != t
    }
    noFillColor(e) {
        return !this.hasFillColor(e)
    }
    buildTranslateAttributeTransform(e, t, n) {
        return n ? (new TransformHelper).translate(e, t).rotate(n).toSVG() : (new TransformHelper).translate(e, t).toSVG()
    }
    buildTranslateStyleTransform(e, t, n) {
        return n ? (new TransformHelper).translate(e, t).rotate(n).toCssStyle() : (new TransformHelper).translate(e, t).toCssStyle()
    }
    getEntityStyle(e, t) {
        return DiagramIdHelper.isDiagramEditorId(e.id) ? this.getEditorStyle(e, t) : this.getStyle(e.style, t)
    }
    getEditorStyle(e, t) {
        return this.getStyle(e.shape.style, t)
    }
    isGradient(e) {
        return e && null != e.stops
    }
    isPattern(e) {
        return null != e && null != e.size
    }
    isBasicColor(e) {
        return ! (this.isGradient(e) || this.isPattern(e))
    }
    getIconSvgStyle() {
        return {
            stroke: "gray",
            strokeWidth: 1,
            fill: "none",
            width: 23,
            height: 18,
            position: "relative"
        }
    }
    colorAsArray(e, t) {
        return _.isArray(e) ? e : ColorTypeConverter.stringToRgbaArr(e, t)
    }
    getStrokeDashArray(e, t) {
        return "-" != e && e ? t ? "~." == e || "2~." == e ? [t, t] : "." == e || "2." == e ? [1.125 * t, 3.35 + 3.35 * (t - 1) / 10] : "--" == e || "2--" == e ? [6 + 6 * (t - 1) / 4, 6] : void 0 : "~." == e || "2~." == e ? [1, 1] : "." == e || "2." == e ? [1.125, 3.35] : "--" == e || "2--" == e ? [6, 6] : [] : []
    }
    getStrokeDasharrayFromStrokeType(e, t) {
        var n = this.getStrokeDashArray(e, t);
        return !n || n.length <= 0 ? "" : n.join(" ")
    }
    getReactPaintFill(e, t) {
        if (_.isString(e)) return {
            style: e
        };
        if (_.isArray(e)) return {
            style: "rgba(".concat(e[0], ",").concat(e[1], ",").concat(e[2], ",").concat(e[3], ")")
        };
        var n = "_" + Math.random().toString(36).substr(2, 9),
        r = "url(#".concat(n, ")");
        return this.isPattern(e) ? {
            style: r,
            def: this.getPatternDef(e, n, t)
        } : {
            style: r,
            def: this.getGradientDef(e, n, t)
        }
    }
    getPatternDef(e, t, n) {
        return PatternDef.renderPatternDefs(e, t, n)
    }
    getGradientDef(e, t, n) {
        if (e && e.stops) {
            var r = Geometry.round2,
            o = [...e.stops].sort((e, t) => e.pos - t.pos),
            s = e.center || {
                x: 50,
                y: 50
            },
            l = {
                x: s.x / 100,
                y: s.y / 100
            },
            c = e.scale || 1;
            if (!e.type || "linear" == e.type) {
                var h = "translate(".concat(r(l.x - .5), ",").concat(r(l.y - .5), ")"),
                u = e.scale ? "matrix(".concat(r(c), ",0,0,").concat(r(c), ",").concat(r(.5 - .5 * c), ",").concat(r(.5 - .5 * c), ")") : "";
                return React.createElement("linearGradient", {
                    key: n,
                    id: t,
                    gradientTransform: "".concat(u, " ").concat(h, " rotate(").concat(e.rotation || 0, " 0.5 0.5)"),
                    x1: "0",
                    y1: "0.5",
                    x2: 1,
                    y2: .5
                },
                " ", o.map((e, t) => React.createElement("stop", {
                    key: t,
                    offset: r(e.pos),
                    style: {
                        stopColor: ColorTypeConverter.getHtmlColor(e.color)
                    }
                })))
            }
            var p = e.focal || {
                x: 0,
                y: 0
            },
            m = s.x + p.x,
            f = s.y + p.y,
            g = "matrix(".concat(r(c), ",0,0,").concat(r(c), ",").concat(r(.5 - .5 * c), ",").concat(r(.5 - .5 * c), ")");
            return React.createElement("radialGradient", {
                key: n,
                id: t,
                gradientTransform: g,
                cx: "".concat(l.x),
                cy: "".concat(l.y),
                fx: "".concat(m / 100),
                fy: "".concat(f / 100)
            },
            " ", o.map((e, t) => React.createElement("stop", {
                key: t,
                offset: r(e.pos),
                style: {
                    stopColor: ColorTypeConverter.getHtmlColor(e.color)
                }
            })))
        }
    }
    getStyle(e, t) {
        return e = e || {},
        "thickness" == t ? e[t] || 1 : "strokeColor" == t || "textColor" == t ? e[t] || "#000" : "fillColor" == t ? e[t] || "none" : "strokeType" == t ? e[t] || "-" : "lineJoin" == t ? e[t] : "lineCap" == t ? e[t] : void 0
    }
    getReactStyleInfo(e, t, n) {
        e = e || {};
        var r = {},
        i = [];
        return t.forEach(t => {
            switch (t) {
            case "strokeColor":
                !e.strokeColor && n ? r.stroke = n : r.stroke = ColorTypeConverter.getHtmlColor(this.getStyle(e, "strokeColor"));
                break;
            case "thickness":
                r.strokeWidth = this.getStyle(e, "thickness");
                break;
            case "fillColor":
                var a = this.getStyle(e, "fillColor"),
                o = this.getReactPaintFill(a, t);
                r.fill = o.style;
                o.def && i.push(o.def);
                break;
            case "strokeType":
                var s = this.getStyle(e, "strokeType"),
                l = this.getStyle(e, "thickness");
                r.strokeDasharray = this.getStrokeDasharrayFromStrokeType(s, l);
                break;
            case "lineJoin":
                r.strokeLinejoin = this.getStyle(e, "lineJoin");
                break;
            case "lineCap":
                r.strokeLinecap = this.getStyle(e, "lineCap")
            }
        }),
        {
            style: r,
            defs: i.length > 0 ? React.createElement("defs", null, " ", i) : void 0
        }
    }
}

export default ColorHelper