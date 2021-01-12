import _ from 'lodash';
import jQuery from 'jquery';
import objectAssign from 'object-assign';
import React from 'react';
import ReactDOM from 'react-dom';
// Not found 'var' for: import  from '../Editor/CheckComponent';
import { ParenthesisSvgCreaterB } from '../Editor/ParenthesisSvgCreater';
import BlockHelper from '../Elements/BlockHelper';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import GetSymbolLatex from '../Latex/GetSymbolLatex';
import NumberUtils from '../Mathcha/NumberUtils';
import Remainder from '../Mathcha/Remainder';
import RoleGridItemSelect from './RoleGridItemSelect';
import SymbolSettingButton from '../Elements/SymbolSettingButton';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(1508) /*Symbol-longdivision*/

function re(e) {
    switch (e) {
    case "left-top":
        return M;
    case "stacked-right-right":
        return w;
    case "medium-stacked-right-right":
        return O;
    case "short-stacked-right-right":
        return D;
    case "right-top":
        return k;
    case "left-slash-right":
        return P;
    case "left-bracket-right":
        return F;
    case "right-right":
        return H;
    case "stacked-left-left":
        return xx;
    default:
        return M
    }
}
/// n.r(t)
/// var r = n(3);  // 5 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 313 times
/// var o = n.n(i);
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var c = n(16)/*ReactDOM*/;  // 8 times
/// var d = n.n(c);
/// var h = n(21)/*EditArea*/;  // 22 times
/// var u = n(5)/*sizzle*/;  // 17 times
/// var p = n.n(u);
/// var m = n(4)/*DOMHelper*/;  // 17 times
/// var f = n(286)/*ParenthesisSvgCreater*/;  // 1 times
/// var g = n(70)/*TransformHelper*/;  // 1 times
/// var y = n(50)/*Remainder*/;  // 18 times
/// var A = n(102)/*GetSymbolLatex*/;  // 7 times
var E = new class {
    multicolumn(e, t, n) {
        return {
            type: "inline-environment",
            name: "multicolumn",
            options: [{
                type: "environment-option",
                bracketType: "brace",
                element: {
                    type: "raw-element",
                    rawText: e.toString()
                }
            },
            {
                type: "environment-option",
                bracketType: "brace",
                element: {
                    type: "raw-element",
                    rawText: t
                }
            }],
            element: n
        }
    }
    raw(e) {
        return {
            type: "raw-element",
            rawText: e
        }
    }
    tabular() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "tabular",
            rows: t
        }
    }
    tabularRow() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "tabular-row",
            cells: t
        }
    }
    array(e, t) {
        return {
            type: "environment",
            name: "array",
            options: [{
                type: "environment-option",
                bracketType: "brace",
                element: {
                    type: "raw-element",
                    rawText: e
                }
            }],
            element: t
        }
    }
    kern(e) {
        return {
            type: "raw-element",
            rawText: "\\kern".concat(e)
        }
    }
    lines() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "group-by-lines",
            lines: t
        }
    }
    group() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "group",
            elements: t
        }
    }
    spaceGroup() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "group",
            elements: t,
            delimiter: " "
        }
    }
    empty() {
        return {
            type: "empty"
        }
    }
};
/// var v = n(22)/*CheckComponent*/;  // 0 times
/// var S = n(2)/*lodash*/;  // 1 times
/// var C = n.n(S);
/// var x = n(12)/*BlockHelper*/;  // 1 times
var I = new class {
    countStartWhiteSpace(e) {
        if (e.lines.length > 1) return 0;
        var t = e.lines[0].blocks[0];
        return t && t.type == null ? _.takeWhile(t.text, (e) => {
            return " " == e
        }).length : 0
    }
    removeSpaceFirstBlock(e, t) {
        var n = e.lines[0].blocks[0];
        var r = _.assignIn({},
        n, {
            text: n.text.substr(t)
        });
        return BlockHelper.replaceBlockInEditor(e, 0, r)
    }
};
/// var T = n(52)/*NumberUtils*/;  // 30 times
var b = new class {
    buildRemainders(e, t, n, r) {
        var a = Remainder.getRemaindersSortedKeys(e);
        var i = 0;
        return {
            type: "environment",
            name: "array",
            options: [{
                type: "environment-option",
                bracketType: "square",
                element: {
                    type: "raw-element",
                    rawText: "t"
                }
            },
            {
                type: "environment-option",
                bracketType: "brace",
                element: {
                    type: "raw-element",
                    rawText: "l"
                }
            }],
            element: {
                type: "tabular",
                rows: a.map((a) => {
                    return a === r ? null : Remainder.parseRemainderIndex(a) % 2 === 0 ? this.buildForUnderline(e.elements[a], i, t, n) : (i = I.countStartWhiteSpace(e.elements[a]), this.buildEditorWithWhitespacePrefix(e.elements[a], t, n))
                }).filter((e) => {
                    return e
                })
            }
        }
    }
    buildEditorWithWhitespacePrefix(e, t, n) {
        var r = I.countStartWhiteSpace(e);
        return r > 0 ? E.spaceGroup(E.raw(this.getWhitespaceKern(r)), E.raw(n.toLatexFromEditor(I.removeSpaceFirstBlock(e, r), t))) : {
            type: "raw-element",
            rawText: n.toLatexFromEditor(e, t)
        }
    }
    getWhitespaceKern(e) {
        return "\\kern+".concat(NumberUtils.round2(e / 3.8), "em")
    }
    buildForUnderline(e, t, n, r) {
        var a = Math.min(I.countStartWhiteSpace(e), t);
        if (a > 0) {
            var i = this.getWhitespaceKern(a);
            var o = I.removeSpaceFirstBlock(e, a);
            return {
                type: "group",
                elements: [{
                    type: "raw-element",
                    rawText: i
                },
                {
                    type: "inline-environment",
                    name: "underline",
                    element: this.buildEditorWithWhitespacePrefix(o, n, r)
                }]
            }
        }
        return {
            type: "inline-environment",
            name: "underline",
            element: this.buildEditorWithWhitespacePrefix(e, n, r)
        }
    }
};
var L = new class {
    buildRemainders(e, t, n) {
        var r = Remainder.getRemaindersSortedKeys(e);
        var a = 0;
        return {
            type: "mtable",
            columnalign: "left",
            columnspacing: "0em",
            framespacing: "0em 0em",
            rows: r.map((r) => {
                return r === n ? null : Remainder.parseRemainderIndex(r) % 2 === 0 ? this.buildForUnderline(e.elements[r], a, t) : (a = I.countStartWhiteSpace(e.elements[r]), this.buildEditorWithWhitespacePrefix(e.elements[r], t))
            }).filter((e) => {
                return e
            }).map((e) => {
                return {
                    type: "mtr",
                    cells: [{
                        type: "mtd",
                        element: e
                    }]
                }
            })
        }
    }
    buildEditorWithWhitespacePrefix(e, t) {
        var n = I.countStartWhiteSpace(e);
        return n > 0 ? {
            type: "mrow",
            elements: [this.getWhitespaceKern(n), t.generateEditor(I.removeSpaceFirstBlock(e, n))]
        } : t.generateEditor(e)
    }
    getWhitespaceKern(e) {
        return {
            type: "mspace",
            width: "".concat(NumberUtils.round2(e / 3.8), "em")
        }
    }
    buildForUnderline(e, t, n) {
        var r = Math.min(I.countStartWhiteSpace(e), t);
        if (r > 0) {
            var a = this.getWhitespaceKern(r);
            var i = I.removeSpaceFirstBlock(e, r);
            return {
                type: "mrow",
                elements: [a, {
                    type: "munder",
                    base: this.buildEditorWithWhitespacePrefix(i, n),
                    accent: true,
                    underscript: {
                        type: "mo",
                        value: "_"
                    }
                }]
            }
        }
        return {
            type: "munder",
            base: this.buildEditorWithWhitespacePrefix(e, n),
            accent: true,
            underscript: {
                type: "mo",
                value: "_"
            }
        }
    }
};
var R = new class {
    table(e) {
        var t = arguments.length;
        var n = new Array(t > 1 ? t - 1 : 0);
        var r = 1;
        for (; r < t; r++) n[r - 1] = arguments[r];
        return _.assignIn({
            type: "mtable"
        },
        e, {
            rows: n
        })
    }
    tableRow() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "mtr",
            cells: t.map((e) => {
                return {
                    type: "mtd",
                    element: e
                }
            })
        }
    }
    underline(e) {
        return {
            type: "munder",
            base: e,
            accent: true,
            underscript: {
                type: "mo",
                value: "_"
            }
        }
    }
    overline(e) {
        return {
            type: "mover",
            base: e,
            accent: true,
            overscript: {
                type: "mo",
                value: "\u00af"
            }
        }
    }
    mrow() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) t[n] = arguments[n];
        return {
            type: "mrow",
            elements: t
        }
    }
    text(e) {
        return {
            type: "mtext",
            value: e
        }
    }
    mo(e) {
        return {
            type: "mo",
            value: e
        }
    }
    menclose(e, t) {
        return {
            type: "menclose",
            notation: e,
            element: t
        }
    }
};
var M = new class {
    getRendering(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement(EditArea, Object.assign({
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: n,
            style: {
                paddingRight: 5
            }
        })), React.createElement("div", {
            style: {
                paddingLeft: 2
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            style: {
                float: "left"
            },
            showBorder: n
        })), React.createElement("div", {
            style: {
                clear: "both"
            }
        }), React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: n
        })), Remainder.renderRestEditors(e, n)), t)
    }
    handleDrawingLines(e, t) {
        var n = jQuery(e).find(">div>div>.role-quotient-editor");
        var r = jQuery(e).find(">div>.role-divisor-editor");
        var a = jQuery(e).find(">div>div>.role-divident-editor");
        var i = jQuery(e).find(">div>.role-long-division-lines");
        var s = DOMHelper.getElementRect(e);
        var l = DOMHelper.findRectElementToRect(n.get(0), s);
        var c = DOMHelper.findRectElementToRect(r.get(0), s);
        var h = DOMHelper.findRectElementToRect(a.get(0), s);
        var u = NumberUtils.round2(l.left + -5 - 1);
        var A = NumberUtils.round2(l.right);
        var E = NumberUtils.round2(l.bottom);
        var v = "M".concat(u, ",").concat(E, " L").concat(A, ",").concat(E);
        var S = (new TransformHelper).translate(c.right + -5, Math.min(c.top - 1, h.top - 1)).toSVG();
        var C = Remainder.drawOtherLines(s, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: v,
            fill: "none"
        }), React.createElement("g", {
            transform: S
        },
        Object(ParenthesisSvgCreaterB)(0, Math.max(c.height + 1, h.height + 1), 13)), React.createElement("path", {
            d: C,
            fill: "none"
        })), i.get(0))
    }
    toLatex(e, t, n) {
        var r = {
            type: "environment",
            name: "array",
            options: [{
                type: "environment-option",
                bracketType: "brace",
                element: {
                    type: "raw-element",
                    rawText: "ll"
                }
            }],
            element: {
                type: "tabular",
                rows: [{
                    type: "tabular-row",
                    cells: [{
                        type: "empty"
                    },
                    {
                        type: "raw-element",
                        rawText: n.toLatexFromEditor(e.elements.quotient, t)
                    }]
                },
                {
                    type: "group-by-lines",
                    lines: [{
                        type: "raw-element",
                        rawText: "\\cline{2-2}"
                    },
                    {
                        type: "tabular-row",
                        cells: [{
                            type: "raw-element",
                            rawText: "".concat(n.toLatexFromEditor(e.elements.divisor, t), " )\\kern-0.7em")
                        },
                        {
                            type: "raw-element",
                            rawText: n.toLatexFromEditor(e.elements.divident, t)
                        }]
                    }]
                },
                {
                    type: "tabular-row",
                    cells: [{
                        type: "empty"
                    },
                    {
                        type: "group",
                        elements: [{
                            type: "raw-element",
                            rawText: "\\kern-0.4em"
                        },
                        b.buildRemainders(e, t, n)]
                    }]
                }]
            }
        };
        return GetSymbolLatex.fromEnvironment(r)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left",
            columnspacing: "0em 0em"
        },
        R.tableRow(t.getEmptyElement(), R.underline(t.generateEditor(e.elements.quotient))), R.tableRow(R.mrow(t.generateEditor(e.elements.divisor), R.text(")")), t.generateEditor(e.elements.divident)), R.tableRow(t.getEmptyElement(), L.buildRemainders(e, t)))
    }
};
var w = new class {
    getRendering(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement("div", {
            style: {
                paddingRight: 4
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: n
        })), Remainder.renderRestEditors(e, n)), React.createElement("div", {
            style: {
                paddingLeft: 6
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: n
        })), React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            showBorder: n
        }))), t)
    }
    handleDrawingLines(e, t) {
        var n = jQuery(e).find(">div>div>.role-divisor-editor");
        var r = jQuery(e).find(">div>.role-long-division-lines");
        var a = DOMHelper.getElementRect(e);
        var i = DOMHelper.findRectElementToRect(n.get(0), a);
        var s = NumberUtils.round2(i.left - 6);
        var l = NumberUtils.round2(a.height);
        var c = "M".concat(s, ",").concat(0, " L").concat(s, ",").concat(l, " M").concat(s, ",").concat(NumberUtils.round2(i.bottom), " L").concat(NumberUtils.round2(i.right), ",").concat(NumberUtils.round2(i.bottom));
        var h = Remainder.drawOtherLines(a, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: c,
            fill: "none"
        }), React.createElement("path", {
            d: h,
            fill: "none"
        })), r.get(0))
    }
    toLatex(e, t, n) {
        var r = E.array("l|l", E.tabular(E.tabularRow(E.raw(n.toLatexFromEditor(e.elements.divident, t)), E.raw(n.toLatexFromEditor(e.elements.divisor, t))), E.lines(E.raw("\\cline{2-2}"), E.tabularRow(E.spaceGroup(E.kern("-0.4em"), b.buildRemainders(e, t, n), E.kern("-0.4em")), E.raw(n.toLatexFromEditor(e.elements.quotient, t))))));
        return GetSymbolLatex.fromElement(r)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left",
            columnlines: "solid none"
        },
        R.tableRow(t.generateEditor(e.elements.divident), t.generateEditor(e.elements.divisor)), R.tableRow(L.buildRemainders(e, t), R.overline(t.generateEditor(e.elements.quotient))))
    }
};
var O = new class {
    handleDrawingLines(e, t) {
        return N.handleDrawingLines(e, t, false)
    }
    getRendering(e, t, n) {
        return N.getRendering(e, t, n)
    }
    toLatex(e, t, n) {
        return N.toLatex(e, t, n, false)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left"
        },
        R.tableRow(R.table({
            rowalign: "top",
            columnalign: "left left",
            columnlines: "solid none"
        },
        R.tableRow(t.generateEditor(e.elements.divident), t.generateEditor(e.elements.divisor)), R.tableRow(L.buildForUnderline(e.elements.r_0, 0, t), R.overline(t.generateEditor(e.elements.quotient))))), R.tableRow(L.buildRemainders(e, t, "r_0")))
    }
};
var D = new class {
    handleDrawingLines(e, t) {
        return N.handleDrawingLines(e, t, true)
    }
    getRendering(e, t, n) {
        return N.getRendering(e, t, n)
    }
    toLatex(e, t, n) {
        return N.toLatex(e, t, n, true)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left"
        },
        R.tableRow(R.table({
            rowalign: "top",
            columnalign: "left left"
        },
        R.tableRow(t.generateEditor(e.elements.divident), R.menclose("left", t.generateEditor(e.elements.divisor))), R.tableRow(L.buildForUnderline(e.elements.r_0, 0, t), R.overline(t.generateEditor(e.elements.quotient))))), R.tableRow(L.buildRemainders(e, t, "r_0")))
    }
};
var N = new class {
    getRendering(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement("div", {
            style: {
                paddingRight: 4
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: n
        })), React.createElement(EditArea, Object.assign({
            key: "r_0",
            className: "role-remainder-editor"
        },
        e.buildMetaDataFromName("r_0"), {
            showBorder: n
        }))), React.createElement("div", {
            className: "role-right-container",
            style: {
                paddingLeft: 6
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: n
        })), React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            showBorder: n
        })))), Remainder.renderRestEditors(e, n, "r_0"), t)
    }
    handleDrawingLines(e, t, n) {
        var r = jQuery(e).find(">div>div>div.role-right-container");
        var a = jQuery(e).find(">div>div>div>.role-divisor-editor");
        var i = jQuery(e).find(">div>.role-long-division-lines");
        var s = DOMHelper.getElementRect(e);
        var l = DOMHelper.findRectElementToRect(a.get(0), s);
        var c = DOMHelper.findRectElementToRect(r.get(0), s);
        var h = NumberUtils.round2(l.left - 6);
        var u = NumberUtils.round2(n ? l.height : c.height);
        var f = "M".concat(h, ",").concat(0, " L").concat(h, ",").concat(u, " M").concat(h, ",").concat(NumberUtils.round2(l.bottom), " L").concat(NumberUtils.round2(l.right), ",").concat(NumberUtils.round2(l.bottom));
        var g = Remainder.drawOtherLines(s, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: f,
            fill: "none"
        }), React.createElement("path", {
            d: g,
            fill: "none"
        })), i.get(0))
    }
    toLatex(e, t, n, r) {
        var a = {
            type: "tabular-row",
            cells: [b.buildForUnderline(e.elements.r_0, 0, t, n), {
                type: "raw-element",
                rawText: n.toLatexFromEditor(e.elements.quotient, t)
            }]
        };
        if (r) a = {
            type: "tabular-row",
            cells: [E.multicolumn(1, "l", b.buildForUnderline(e.elements.r_0, 0, t, n)), {
                type: "raw-element",
                rawText: n.toLatexFromEditor(e.elements.quotient, t)
            }]
        };
        var i = {
            type: "environment",
            name: "array",
            options: [{
                type: "environment-option",
                bracketType: "brace",
                element: {
                    type: "raw-element",
                    rawText: "l|l"
                }
            }],
            element: {
                type: "tabular",
                rows: [{
                    type: "tabular-row",
                    cells: [{
                        type: "raw-element",
                        rawText: n.toLatexFromEditor(e.elements.divident, t)
                    },
                    {
                        type: "raw-element",
                        rawText: n.toLatexFromEditor(e.elements.divisor, t)
                    }]
                },
                {
                    type: "group-by-lines",
                    lines: [{
                        type: "raw-element",
                        rawText: "\\cline{2-2}"
                    },
                    a]
                },
                {
                    type: "tabular-row",
                    cells: [E.multicolumn(2, "l", {
                        type: "group",
                        elements: [{
                            type: "raw-element",
                            rawText: "\\kern-0.4em"
                        },
                        b.buildRemainders(e, t, n, "r_0")]
                    })]
                }]
            }
        };
        return GetSymbolLatex.fromEnvironment(i)
    }
};
var k = new class {
    getRendering(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "block"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            showBorder: n
        })), React.createElement("div", {
            className: "role-right-container",
            style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: n
        })), Remainder.renderRestEditors(e, n)), React.createElement(EditArea, Object.assign({
            style: {
                paddingLeft: 6,
                paddingRight: 6
            },
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: n
        }))), t)
    }
    handleDrawingLines(e, t) {
        var n = jQuery(e).find(">div>div.role-right-container");
        var r = jQuery(e).find(">div>div>.role-divisor-editor");
        var a = jQuery(e).find(">div>.role-long-division-lines");
        var i = DOMHelper.getElementRect(e);
        var s = DOMHelper.findRectElementToRect(r.get(0), i);
        var l = DOMHelper.findRectElementToRect(n.get(0), i);
        var c = "";
        var h = NumberUtils.round2(l.left);
        var u = NumberUtils.round2(l.right);
        var f = NumberUtils.round2(l.top);
        c = c + "M".concat(h, ",").concat(f, " L").concat(u, ",").concat(f);
        c = c + " M".concat(NumberUtils.round2(s.left), ",").concat(NumberUtils.round2(s.top), " L").concat(NumberUtils.round2(s.left), ",").concat(NumberUtils.round2(s.bottom), " L").concat(NumberUtils.round2(s.right), ",").concat(NumberUtils.round2(s.bottom));
        var g = Remainder.drawOtherLines(i, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: c,
            fill: "none"
        }), React.createElement("path", {
            d: g,
            fill: "none"
        })), a.get(0))
    }
    toLatex(e, t, n) {
        var r = E.array("ll", E.tabular(E.multicolumn(2, "l", E.raw(n.toLatexFromEditor(e.elements.quotient, t))), E.lines(E.raw("\\hline"), E.tabularRow(E.raw(n.toLatexFromEditor(e.elements.divident, t)), E.multicolumn(1, "|l", E.raw(n.toLatexFromEditor(e.elements.divisor, t))))), E.lines(E.raw("\\cline{2-2}"), E.spaceGroup(E.kern("-0.4em"), b.buildRemainders(e, t, n), E.kern("-0.4em")))));
        return GetSymbolLatex.fromElement(r)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left"
        },
        R.tableRow(R.table({
            rowalign: "top",
            columnalign: "left left",
            rowlines: "solid none",
            framespacing: "0em 0em"
        },
        R.tableRow(t.generateEditor(e.elements.quotient)), R.tableRow(t.generateEditor(e.elements.divident), R.menclose("left bottom", t.generateEditor(e.elements.divisor))))), R.tableRow(L.buildRemainders(e, t)))
    }
};
var B = new class {
    getLeftRightFromType(e) {
        switch (e) {
        case "slash":
            return {
                left: "/",
                right: "\\"
            };
        default:
            return {
                left: ")",
                right: "("
            }
        }
    }
    getRendering(e, t, n, r) {
        var a = this.getLeftRightFromType(t);
        var i = a.left;
        var s = a.right;
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement(EditArea, Object.assign({
            style: {},
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: r
        })), React.createElement("span", {
            className: "role-division-svg-text",
            style: {
                paddingLeft: 3,
                paddingRight: 3
            }
        },
        i), React.createElement("div", {
            className: "role-right-container",
            style: {
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: r
        })), React.createElement("span", {
            className: "role-division-svg-text",
            style: {
                paddingLeft: 3,
                paddingRight: 3
            }
        },
        s), React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            showBorder: r
        }))), Remainder.renderRestEditors(e, r)), n)
    }
    handleDrawingLines(e, t) {
        var n = jQuery(e).find(">div>.role-long-division-lines");
        var r = DOMHelper.getElementRect(e);
        var a = Remainder.drawOtherLines(r, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: a,
            fill: "none"
        })), n.get(0))
    }
    getLeftRightLatexFromType(e) {
        switch (e) {
        case "slash":
            return {
                left: "/",
                right: "\\backslash"
            };
        default:
            return {
                left: ")",
                right: "("
            }
        }
    }
    toLatex(e, t, n, r) {
        var a = this.getLeftRightLatexFromType(r);
        var i = a.left;
        var o = a.right;
        var s = E.array("ll", E.tabular(E.tabularRow(E.spaceGroup(E.raw(n.toLatexFromEditor(e.elements.divisor, t)), E.raw("\\thinspace"), E.raw(i), E.kern("-0.7em")), E.spaceGroup(E.raw(n.toLatexFromEditor(e.elements.divident, t)), E.raw("\\thinspace"), E.raw(o), E.group(E.raw("\\thinspace"), E.raw(n.toLatexFromEditor(e.elements.quotient, t))))), E.tabularRow(E.empty(), E.spaceGroup(E.kern("-0.4em"), b.buildRemainders(e, t, n)))));
        return GetSymbolLatex.fromElement(s)
    }
    toMathml(e, t, n) {
        var r = this.getLeftRightFromType(n);
        var a = r.left;
        var i = r.right;
        return R.table({
            rowalign: "top",
            columnalign: "left left",
            columnspacing: "0em"
        },
        R.tableRow(R.mrow(t.generateEditor(e.elements.divisor), R.text(a)), R.mrow(t.generateEditor(e.elements.divident), R.text(i), t.generateEditor(e.elements.quotient))), R.tableRow(t.getEmptyElement(), L.buildRemainders(e, t)))
    }
};
var P = new class {
    handleDrawingLines(e, t) {
        return B.handleDrawingLines(e, t)
    }
    getRendering(e, t, n) {
        return B.getRendering(e, "slash", t, n)
    }
    toLatex(e, t, n) {
        return B.toLatex(e, t, n, "slash")
    }
    toMathml(e, t) {
        return B.toMathml(e, t, "slash")
    }
};
var F = new class {
    handleDrawingLines(e, t) {
        return B.handleDrawingLines(e, t)
    }
    getRendering(e, t, n) {
        return B.getRendering(e, "brackets", t, n)
    }
    toLatex(e, t, n) {
        return B.toLatex(e, t, n, "brackets")
    }
    toMathml(e, t) {
        return B.toMathml(e, t, "brackets")
    }
};
var H = new class {
    getRendering(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: n
        })), React.createElement("span", {
            className: "role-division-svg-text",
            style: {
                paddingLeft: 3,
                paddingRight: 3
            }
        },
        ":"), React.createElement(EditArea, Object.assign({
            style: {},
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: n
        })), React.createElement("span", {
            className: "role-division-svg-text",
            style: {
                paddingLeft: 3,
                paddingRight: 3
            }
        },
        "="), React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            showBorder: n
        }))), Remainder.renderRestEditors(e, n), t)
    }
    handleDrawingLines(e, t) {
        var n = jQuery(e).find(">div>.role-long-division-lines");
        var r = DOMHelper.getElementRect(e);
        var a = Remainder.drawOtherLines(r, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: a,
            fill: "none"
        })), n.get(0))
    }
    toLatex(e, t, n) {
        var r = E.array("ll", E.tabular(E.tabularRow(E.spaceGroup(E.raw(n.toLatexFromEditor(e.elements.divident, t)), E.raw(":"), E.raw(n.toLatexFromEditor(e.elements.divisor, t)), E.raw("="), E.raw(n.toLatexFromEditor(e.elements.quotient, t)))), E.tabularRow(E.spaceGroup(E.kern("-0.4em"), b.buildRemainders(e, t, n)))));
        return GetSymbolLatex.fromElement(r)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left",
            columnspacing: "0em"
        },
        R.tableRow(R.mrow(t.generateEditor(e.elements.divident), R.mo(":"), t.generateEditor(e.elements.divisor), R.mo("="), t.generateEditor(e.elements.quotient))), R.tableRow(L.buildRemainders(e, t)))
    }
};
var xx = new class {
    getRendering(e, t, n) {
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline",
                flexDirection: "row"
            }
        },
        React.createElement("div", {
            className: "role-long-division-lines",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement("div", {
            className: "role-left-container",
            style: {
                display: "flex",
                flexDirection: "column",
                paddingRight: 6
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divisor-editor"
        },
        e.buildMetaDataFromName("divisor"), {
            showBorder: n,
            lineStyle: {
                textAlign: "right"
            }
        })), React.createElement(EditArea, Object.assign({
            className: "role-quotient-editor"
        },
        e.buildMetaDataFromName("quotient"), {
            showBorder: n,
            lineStyle: {
                textAlign: "right"
            }
        }))), React.createElement("div", {
            className: "role-right-container",
            style: {
                display: "flex",
                flexDirection: "column",
                paddingLeft: 6
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "role-divident-editor"
        },
        e.buildMetaDataFromName("divident"), {
            showBorder: n
        })), Remainder.renderRestEditors(e, n)), t)
    }
    handleDrawingLines(e, t) {
        var n = jQuery(e).find(">div>div.role-left-container");
        var r = jQuery(e).find(">div>div>.role-divisor-editor");
        var a = jQuery(e).find(">div>.role-long-division-lines");
        var i = DOMHelper.getElementRect(e);
        var s = DOMHelper.findRectElementToRect(r.get(0), i);
        var l = DOMHelper.findRectElementToRect(n.get(0), i);
        var c = NumberUtils.round2(l.right);
        var h = NumberUtils.round2(l.height);
        var u = "M".concat(c, ",").concat(0, " L").concat(c, ",").concat(h, " M").concat(NumberUtils.round2(s.left), ",").concat(NumberUtils.round2(s.bottom), " L").concat(NumberUtils.round2(l.right), ",").concat(NumberUtils.round2(s.bottom));
        var f = Remainder.drawOtherLines(i, t);
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: u,
            fill: "none"
        }), React.createElement("path", {
            d: f,
            fill: "none"
        })), a.get(0))
    }
    toLatex(e, t, n) {
        var r = E.array("r|l", E.tabular(E.tabularRow(E.raw(n.toLatexFromEditor(e.elements.divisor, t)), E.raw(n.toLatexFromEditor(e.elements.divident, t))), E.lines(E.raw("\\cline{1-1}"), E.tabularRow(E.raw(n.toLatexFromEditor(e.elements.quotient, t)), E.spaceGroup(E.kern("-0.4em"), b.buildRemainders(e, t, n))))));
        return GetSymbolLatex.fromElement(r)
    }
    toMathml(e, t) {
        return R.table({
            rowalign: "top",
            columnalign: "left left",
            columnlines: "solid none",
            columnspacing: "0em"
        },
        R.tableRow(t.generateEditor(e.elements.divisor), t.generateEditor(e.elements.divident)), R.tableRow(R.overline(t.generateEditor(e.elements.quotient)), L.buildRemainders(e, t)))
    }
};
/// var U = n(106)/*SymbolSettingButton*/;  // 1 times
/// var W = n(24)/*EventHelper*/;  // 2 times
/// var G = n(334)/*RoleGridItemSelect*/;  // 1 times
/// var z = n(115)/*Object-assign2*/;  // 9 times
/// var Y = n.n(z);
/// var K = n(61);  // 9 times
/// var V = n.n(K);
var j = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M22.33 4.2H44v5.66H22.33z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M16.33 12.67h40.34"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M16.33 12.67C18.5 16 19.25 20 17 23.5"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M23.33 34.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M30.33 56.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M22.62 15.49h21.67v5.65H22.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M3.12 15.49h12.13v5.65H3.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M23.12 25.24h13.63v5.65H23.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M29.62 37.99h13.63v5.65H29.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M30.12 46.49h13.63v5.65H30.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M35.37 59.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    }))))
};
var q = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M32.33 17.17H54v5.65H32.33z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M29.83 15.17H54"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M5.33 26.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M12.33 48.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M4.62 7.49h21.67v5.65H4.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M33.12 7.49h12.13v5.65H33.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M5.12 17.24h13.63v5.65H5.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M11.62 29.99h13.63v5.65H11.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M12.12 38.49h13.63v5.65H12.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M17.37 51.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M29.5 5.67V63.2"
    }))))
};
var Q = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M31.33 17.17H53v5.65H31.33z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M28.83 15.17H53"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M7.33 26.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M14.33 48.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M6.62 7.49h18.63v5.65H6.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M32.12 7.49h12.13v5.65H32.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M7.12 17.24h13.63v5.65H7.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M13.62 29.99h13.63v5.65H13.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M14.12 38.49h13.63v5.65H14.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M19.37 51.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M28.5 5.67v19"
    }))))
};
var Z = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M31.33 17.17H53v5.65H31.33z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M28.83 15.17H53"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M7.33 26.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M14.33 48.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M6.62 7.49h18.63v5.65H6.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M32.12 7.49h12.13v5.65H32.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M7.12 17.24h13.63v5.65H7.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M13.62 29.99h13.63v5.65H13.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M14.12 38.49h13.63v5.65H14.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M19.37 51.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M28.5 5.67v10"
    }))))
};
var X = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M9.38 7.17h26.08v5.65H9.38z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M9 15.17h43.29"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M9.33 36.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M16.33 58.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M8.62 17.49H30v5.65H8.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M39.62 16.9h12.13v5.66H39.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M9.12 27.24h13.63v5.65H9.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M15.62 39.99h14.13v5.65H15.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M16.12 48.49h13.63v5.65H16.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M21.37 61.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M37.5 15.15v9.52"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M51.71 24.67H37.5"
    }))))
};
var J = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M38.63 8.42H52.5v5.65H38.63z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M19.33 26.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M26.33 48.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M2.87 8.74h8.38v5.65H2.87z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M19.12 17.24h9.63v5.65h-9.63z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M28.75 29.99h11v5.65h-11z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M28.5 38.49h11.25v5.65H28.5z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M31.37 51.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M13.83 15.33l2.92-8.08"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M36.75 14.75L34 7.25"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M18.63 8.42H32.5v5.65H18.63z",
        fill: "#d3d3d3",
        stroke: "none"
    }))))
};
var $ = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M38.63 9.42H52.5v5.65H38.63z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M19.33 27.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M26.33 49.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M2.87 9.74h8.38v5.65H2.87z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M19.12 18.24h9.63v5.65h-9.63z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M28.75 30.99h11v5.65h-11z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M28.5 39.49h11.25v5.65H28.5z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M31.37 52.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M18.63 9.42H32.5v5.65H18.63z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M14 8c2.17 3.33 2.54 5.07.29 8.57"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M36.29 8c-2 2.57-2 5.71.28 8.57"
    }))))
};
var ee = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M40.5 9.42h12v5.65h-12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M3.33 27.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M10.33 49.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M2.87 9.74h12.38v5.65H2.87z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M3.12 18.24h9.63v5.65H3.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M12.75 30.99h11v5.65h-11z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M12.5 39.49h11.25v5.65H12.5z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M15.37 52.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M23.75 9.42h6.75v5.65h-6.75z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M18.33 10.67c0-.74.6-1.34 1.34-1.34a1.336 1.336 0 1 1-1.34 1.34z",
        fill: "#000",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M18.33 14.07c0-.74.6-1.34 1.34-1.34a1.336 1.336 0 1 1-1.34 1.34z",
        fill: "#000",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M31.83 10.83h6.42"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M31.83 13.33h6.42"
    }))))
};
var te = (e) => {
    var t = e.styles;
    var n = void 0 === t ? {} : t;
    var r = _.omit(e, ["styles"]);
    return React.createElement("svg", objectAssign({
        xmlns: "http://www.w3.org/2000/svg",
        className: n["role-diagram-draw-area"] || "role-diagram-draw-area"
    },
    r), React.createElement("g", {
        className: n["shapes-region"] || "shapes-region",
        stroke: "#000",
        fill: "none"
    },
    React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M2.83 17.92H24.5v5.65H2.83z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M3.33 15.92H27.5"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M31.33 27.33h13"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M38.33 49.33h13"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M30.62 8.49h21.67v5.65H30.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M12.62 8.24h12.13v5.65H12.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M31.12 18.24h13.63v5.65H31.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M37.62 30.99h13.63v5.65H37.62z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M38.12 39.49h13.63v5.65H38.12z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["composite-shape"] || "composite-shape"
    },
    React.createElement("path", {
        className: n.real || "real",
        d: "M43.37 52.24h7.96v5.65h-7.96z",
        fill: "#d3d3d3",
        stroke: "none"
    })), React.createElement("g", {
        className: n["arrow-line"] || "arrow-line"
    },
    React.createElement("path", {
        className: (n.connection || "connection") + " " + (n.real || "real"),
        d: "M27.5 5.67V63.2"
    }))))
};
class ne extends React.Component {
    constructor(e) {
        super(e);
        this.handleItemSelect = (e) => {
            this.setState({
                selectedItem: e
            })
        };
        this.handleCommit = (e) => {
            this.props.onSelect(e.item)
        };
        this.groups = [{
            name: "root",
            items: ["left-top", "stacked-right-right", "medium-stacked-right-right", "short-stacked-right-right", "right-top", "left-slash-right", "left-bracket-right", "right-right", "stacked-left-left"]
        }];
        this.state = {
            selectedItem: {
                group: this.groups[0],
                item: this.props.layout
            }
        }
    }
    render() {
        var e = {
            width: 55,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
            border: "1px solid lightgray",
            display: "flex",
            cursor: "pointer",
            background: "white",
            overflow: "hidden",
            margin: 2,
            padding: 2
        };
        var t = _.assignIn({},
        e, {
            background: "rgb(227,253,225)"
        });
        return React.createElement(SymbolSettingButton, {
            smaller: true,
            closeOnClickOutside: true,
            style: {
                top: -20,
                left: -24
            }
        },
        React.createElement("x-setting", {
            class: "mt-common-dialog no-print",
            style: {
                top: -105,
                left: 0,
                position: "absolute",
                fontSize: 12,
                width: 350,
                height: 90
            },
            onMouseDown: EventHelper.focusAndCursorSelectAcquired,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
        React.createElement(RoleGridItemSelect, {
            itemContainerStyle: e,
            itemContainerStyleSelected: t,
            groups: this.groups,
            numberOfItemsPerLine: 5,
            renderGroupName: () => {
                return null
            },
            renderItem: (e, t, n) => {
                var r = {
                    width: "100%",
                    height: "100%"
                };
                switch (e) {
                case "left-top":
                    return React.createElement(j, {
                        style: r
                    });
                case "stacked-right-right":
                    return React.createElement(q, {
                        style: r
                    });
                case "medium-stacked-right-right":
                    return React.createElement(Q, {
                        style: r
                    });
                case "short-stacked-right-right":
                    return React.createElement(Z, {
                        style: r
                    });
                case "right-top":
                    return React.createElement(X, {
                        style: r
                    });
                case "left-slash-right":
                    return React.createElement(J, {
                        style: r
                    });
                case "left-bracket-right":
                    return React.createElement($, {
                        style: r
                    });
                case "right-right":
                    return React.createElement(ee, {
                        style: r
                    });
                case "stacked-left-left":
                    return React.createElement(te, {
                        style: r
                    })
                }
                return React.createElement("span", null, e)
            },
            selected: this.state.selectedItem,
            lastSelected: {
                group: this.groups[0],
                item: this.props.layout
            },
            onSelect: this.handleItemSelect,
            onCommit: this.handleCommit
        })))
    }
}
/*n.d(t, "LongDivision", function () {
    return ae
});*/
class ae extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "long-division-symbol";
        this.handleLayoutChange = (e) => {
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                layout: e
            }))
        };
        this.handleDrawingLines = () => {
            this.context.fixedContextHandler.getRenderingContext().nextCycleIfRequired(() => {
                var e = ReactDOM.findDOMNode(this);
                re(this.props.data.layout).handleDrawingLines(e, this.refMap)
            })
        }
    }
    getCompositeBlockStyle() {
        return _.assignIn({},
        super.getCompositeBlockStyle(), {
            verticalAlign: "baseline"
        })
    }
    getLineColor() {
        return this.context.fixedContextHandler.getDefaultBorderColor()
    }
    renderComponent() {
        return re(this.props.data.layout).getRendering(this, this.renderSettings(), this.isChildSelected())
    }
    renderSettings() {
        if (this.isDirectAndChildSelected()) return React.createElement(ne, {
            key: "settings",
            layout: this.props.data.layout || "left-top",
            onSelect: this.handleLayoutChange
        })
    }
    afterReactRenderWhenDataChanged() {
        this.context.fixedContextHandler.getBatchUpdater().pushToEnd(this.handleDrawingLines, this)
    }
}
var SymbolLongdivision = new class extends CompositeSymbolBase {
    getViewComponent() {
        return ae
    }
    getLatextName() {
        return "\\longdivision"
    }
    getSymbol() {
        return "longdivision"
    }
    getModelMeta() {
        return {
            text:
            this.getLatextName(),
            keyInsertOnSelection: "ulvalue",
            elements: {
                quotient: {
                    onRemove: "all"
                },
                divisor: {
                    onRemove: "all"
                },
                divident: {
                    onRemove: "all"
                },
                r_0: {
                    onRemove: "only"
                },
                r_1: {
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol: () => {
                return React.createElement("div", {
                    style: {
                        width: 30,
                        height: 40,
                        background: "#f7f7f7"
                    }
                },
                React.createElement(j, {
                    viewBox: "0 0 50 70",
                    style: {
                        width: "100%",
                        height: "100%"
                    }
                }))
            },
            description: "Long Division Layout",
            height: 40
        })
    }
    toModel(e, t, n) {
        return this.getModel()
    }
    toLatex(e, t, n) {
        return re(e.layout).toLatex(e, t, n)
    }
    toMathml(e, t) {
        return re(e.layout).toMathml(e, t)
    }
}

export { ae as LongDivision }

export default SymbolLongdivision