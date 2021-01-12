import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import EditAreaLine from '../Editor/EditAreaLine';
import EventHelper from '../Mathcha/EventHelper';
import MatrixComponent from '../Elements/MatrixComponent';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import SymbolAlignComponent from '../Elements/SymbolAlignComponent';
import SymbolMatrix, { SymbolMatrixC, SymbolMatrixD, SymbolMatrixB } from './Symbol-matrix';
import TableSettingComponent from '../Tabular/TableSettingComponent';
import TabularHelper from '../Tabular/TabularHelper';
import TabularUtils from '../Tabular/TabularUtils';

/// xxx(283) /*Symbol-cases*/

/// n.r(t)
/// var r = n(66)/*Symbol-matrix*/;  // 10 times
/// var a = n(0)/*React*/;  // 42 times
/// var i = n.n(a);
/// var o = n(117)/*MatrixViewComponent*/;  // 3 times
/// var s = n(12)/*BlockHelper*/;  // 1 times
/// var l = n(112)/*EditAreaLine*/;  // 1 times
/// var c = n(21)/*EditArea*/;  // 2 times
/// var d = n(14)/*classnames*/;  // 1 times
/// var h = n.n(d);
/// var u = n(2)/*lodash*/;  // 16 times
/// var p = n.n(u);
class m extends MatrixViewComponent {
    constructor(e) {
        super(e);
        this.selfManageBaseLine = !0
    }
    getClassName() {
        return classNames("matrix-symbol", "case-symbol", "role-tabular")
    }
    renderOpenBracket() {
        return this.renderBracket("open-brace")
    }
    renderCloseBracket() {
        return null
    }
    renderRowContent(e) {
        for (var t = [], n = this.props.data.column, r = {},
        a = 0; a < n; a++) {
            var o = e + "_" + a,
            d = this.isChildSelected() ? "selected" : "";
            0 != a && t.push(React.createElement("td", {
                className: "non-select",
                key: a + "_middle",
                style: r
            }));
            var h = BlockHelper.isSingleLineEditor(this.props.data.elements[o]) ? EditAreaLine : EditArea,
            u = React.createElement(h, Object.assign({},
            this.buildMetaDataFromName(o), {
                className: "editor-cell",
                optimizeForOneLine: !0,
                displayMode: !0,
                showBorder: !1
            }));
            t.push(React.createElement("td", {
                key: this.props.data.elements[o].id,
                className: d
            },
            u))
        }
        return t
    }
}
class f extends SymbolMatrix {
    getViewComponent() {
        return m
    }
    getModel(e) {
        var t = super.getModel(e);
        return t.text = "\\cases",
        delete t.bracket,
        t
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\cases"],
            renderSymbol: () => {
                var e = "square common-square-icon common-square-icon-expand";
                return React.createElement("div", {
                    className: "case-icon"
                },
                React.createElement("div", null, "{"), React.createElement("div", {
                    className: "display-flex"
                },
                React.createElement("div", null, React.createElement("div", {
                    className: e
                }), React.createElement("div", {
                    className: e
                })), React.createElement("div", null, React.createElement("div", {
                    className: e
                }), React.createElement("div", {
                    className: e
                }))))
            }
        })
    }
    getLatexName() {
        return "\\cases"
    }
    toModel(e, t) {
        return super.toModel(e, t)
    }
    toLatex(e, t, n) {
        return this.innerToLatex(e, t, n, "cases")
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        return n.columnalign = _.times(e.column, () => "left").join(" "),
        {
            type: "mrow",
            elements: [{
                type: "mo",
                value: "{",
                fence: !0
            },
            n, {
                type: "mo",
                value: "",
                fence: !0,
                stretchy: !0,
                symmetric: !0
            }]
        }
    }
}
/// var g = n(45)/*TabularUtils*/,  // 1 times
/// y = n(466)/*MatrixComponent*/,  // 1 times
/// A = n(7)/*PropUpdateHelper*/,  // 5 times
/// E = n(27)/*CompositeSymbolBase*/,  // 1 times
/// v = n(343)/*TableSettingComponent*/,  // 1 times
/// S = n(5)/*sizzle*/,  // 2 times
/// C = n.n(S)
/// x = n(4)/*DOMHelper*/,  // 4 times
/// I = n(24)/*EventHelper*/;  // 1 times
function T(e, t) {
    return t.indexOf(e) >= 0
}
function b(e, t, n) {
    T(e, t) ? n(_.filter(t, t => t != e)) : n(t.concat([e]))
}
var L = function (e) {
    var t = e.matrixRef,
    n = e.vLines,
    r = e.hLines,
    a = e.onVLineChanged,
    o = e.onHLineChanged,
    s = jQuery(t).find(">table>tbody>tr"),
    l = DOMHelper.getElementRect(t),
    c = jQuery(s.get(0)).find(">td"),
    d = DOMHelper.getComputedFontSize(t) / 3;
    return React.createElement("border-design", Object.assign({},
    EventHelper.getStopPropagationForFocusClickMouseDown()), _.flatMap(s, (e, t) => {
        var n = DOMHelper.getElementRect(e),
        a = {
            top: n.top - l.top - d / 2,
            left: n.left - l.left,
            width: n.width,
            height: d
        },
        c = [React.createElement("border-line", {
            class: T(t, r) ? "enabled" : "",
            key: t,
            style: a,
            onClick: () => b(t, r, o)
        },
        React.createElement("horizontal-line", null))];
        if (t === s.length - 1) {
            var h = _.clone(a);
            h.top = n.bottom - l.top - d / 2;
            c.push(React.createElement("border-line", {
                class: T(t + 1, r) ? "enabled" : "",
                key: t + 1,
                style: h,
                onClick: () => b(t + 1, r, o)
            },
            React.createElement("horizontal-line", null)))
        }
        return c
    }), _.flatMap(c, (e, t) => {
        var r = DOMHelper.getElementRect(e),
        o = {
            top: r.top - l.top,
            left: r.left - l.left - d / 2,
            width: d,
            height: l.height
        },
        s = [React.createElement("border-line", {
            class: T(t, n) ? "enabled" : "",
            key: t,
            style: o,
            onClick: () => b(t, n, a)
        },
        React.createElement("vertical-line", null))];
        if (t === c.length - 1) {
            var h = _.clone(o);
            h.left = r.right - l.left - d / 2;
            s.push(React.createElement("border-line", {
                class: T(t + 1, n) ? "enabled" : "",
                key: t + 1,
                style: h,
                onClick: () => b(t + 1, n, a)
            },
            React.createElement("vertical-line", null)))
        }
        return s
    }))
};
class R extends MatrixComponent {
    constructor() {
        super(...arguments);
        this.changeCurrentColumnAlign = (e => {
            var t = PropUpdateHelper.set(this.props.data.aligns || {},
            this.currentSelectedColumn(), e);
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "aligns", t))
        });
        this.onLayoutChange = (e => {
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "text", e))
        })
    }
    getCurrentAlign(e) {
        return void 0 === e && (e = this.currentSelectedColumn()),
        (this.props.data.aligns || {})[e] || "center"
    }
    isHLineEnabled(e) {
        return (this.props.data.hLines || []).indexOf(e) >= 0
    }
    isVLineEnabled(e) {
        return (this.props.data.vLines || []).indexOf(e) >= 0
    }
    renderColumn(e, t) {
        var n = e + "_" + t;
        var r = "";
        r += this.isChildSelected() ? " selected" : "";
        r += this.isVLineEnabled(t) ? " vline" : "";
        t === this.props.data.column - 1 && this.isVLineEnabled(t + 1) && (r += " last-vline");
        var a = "matrix-item editor-cell " + this.getCurrentAlign(t);
        return React.createElement("td", {
            key: t,
            className: r
        },
        React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName(n), {
            className: a,
            showBorder: !1
        })))
    }
    renderRow(e) {
        var t = this.isChildSelected() ? " selected" : "";
        return t += this.isHLineEnabled(e) ? " hline" : "",
        e === this.props.data.row - 1 && this.isHLineEnabled(e + 1) && (t += " last-hline"),
        React.createElement("tr", {
            key: e,
            className: t
        },
        this.renderRowContent(e))
    }
    renderPlaceHolderAtEnd() {
        return this.renderBorderDesign()
    }
    renderBorderDesign() {
        if (this.state.showBorderDesign && this.isArray()) return React.createElement(L, {
            matrixRef: this.matrix,
            vLines: this.props.data.vLines || [],
            hLines: this.props.data.hLines || [],
            onVLineChanged: e => this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "vLines", e)),
            onHLineChanged: e => this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "hLines", e))
        })
    }
    renderSetting() {
        if (!this.isSelectModeOnly()) {
            var e = this.props.data;
            return !this.isChildSelected() || this.isTabularDescendantSelected() || this.state.showBorderDesign ? void 0 : React.createElement(TableSettingComponent, {
                disableLayoutType: !!this.disableLayoutType,
                onLayoutChange: this.onLayoutChange,
                onRowChange: this.onRowChange,
                onColumnChange: this.onColumnChange,
                text: e.text,
                row: this.state.row,
                column: this.state.column,
                colAlign: this.getCurrentAlign(),
                onShowBorderDesignChange: e => this.setState({
                    showBorderDesign: e
                }),
                changeCurrentColumnAlign: this.changeCurrentColumnAlign
            })
        }
    }
}
class M extends CompositeSymbolBase {
    getViewComponent() {
        return R
    }
    getLatexName() {
        return "\\array"
    }
    getModel(e) {
        var t = this.getModelFromStructure({
            "0_0": "editor",
            "0_1": "editor",
            "1_0": "editor",
            "1_1": "editor"
        },
        "\\matrix");
        return t.row = 2,
        t.column = 2,
        t.text = this.getLatexName(),
        t
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\array"],
            renderSymbol: () => {
                var e = "square common-square-icon common-square-icon-expand";
                return React.createElement("div", {
                    className: "array-icon"
                },
                React.createElement("div", {
                    className: "display-flex"
                },
                React.createElement("div", {
                    className: e
                }), React.createElement("div", {
                    className: e
                }), React.createElement("div", {
                    className: e
                })), React.createElement("div", {
                    className: "display-flex"
                },
                React.createElement("div", {
                    className: e
                }), React.createElement("div", {
                    className: e
                }), React.createElement("div", {
                    className: e
                })))
            }
        })
    }
    toModel(e, t, n) {
        var a = Object(SymbolMatrixC)(this.getLatexName(), t),
        i = this.parseAlignAndVLines(n),
        o = i.aligns,
        s = i.vLines,
        l = i.column,
        c = Math.max(1, t.length);
        return (a = TabularUtils.adjustModelByRowCollumn(a, c, l)).aligns = o,
        a.vLines = s,
        a.row = c,
        a.column = Math.max(1, l),
        a.hLines = this.parseHLines(t),
        a
    }
    parseHLines(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var r = e[n];
            r.firstHLine && t.push(n);
            r.lastHLine && t.push(n + 1)
        }
        return t
    }
    parseAlignAndVLines(e) {
        for (var t = _.filter(e.split(""), e => !!_.trim(e)), n = [], r = [], a = 0; a < t.length; a++) {
            var i = t[a];
            "|" == i ? n.push(r.length) : r.push(this.getAlignFromChar(i))
        }
        var o = r.length;
        return {
            aligns: _.assign({},
            r),
            vLines: n,
            column: o
        }
    }
    getAlignFromChar(e) {
        switch (e) {
        case "l":
            return "left";
        case "r":
            return "right";
        default:
            return "center"
        }
    }
    toLatex(e, t, n) {
        var a = function (e, t) {
            var n = "";
            var r = e.vLines || [];
            var a = e.aligns || {};
            for (var i = 0; i < e.column; i++) {
                n += r.indexOf(i) >= 0 || t ? "|" : " ";
                n += w(a[i]);
            }
            return n = "{" + (n += r.indexOf(i) >= 0 || t ? "|" : " ") + "}"
        } (e);
        return Object(SymbolMatrixD)({
            block: e,
            options: t,
            latexConverter: n,
            arrayOption: a,
            matrixName: "array",
            columnJoinText: " & ",
            forceHLine: !1,
            inMathExpression: !0
        })
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        var a = _.times(e.column, () => "center");
        _.keys(e.aligns).forEach(t => {
            var n = Number.parseInt(t, 10);
            n < e.column && (a[n] = e.aligns[n])
        });
        n.columnalign = a.join(" ");
        var i = this.getBorderInfo(e),
        o = this.buildLinesStr(i.rowlines);
        o && (n.rowlines = o);
        var s = this.buildLinesStr(i.columnlines);
        return s && (n.columnlines = s),
        i.borderLeft || i.borderTop || i.borderRight || i.borderBottom ? {
            type: "menclose",
            notation: [i.borderLeft && "left", i.borderTop && "top", i.borderRight && "right", i.borderBottom && "bottom"].filter(e => e).join(" "),
            element: n
        } : n
    }
    buildLinesStr(e) {
        var t = _.max(e);
        var n = _.times(t, () => "none");
        e.forEach(e => n[e] = "solid");
        return n.join(" ")
    }
    getBorderInfo(e) {
        var t = e.vLines || [],
        n = e.hLines || [];
        return {
            borderLeft: t.some(e => 0 === e),
            borderRight: t.some(t => t === e.column),
            borderTop: n.some(e => 0 === e),
            borderBottom: n.some(t => t === e.row),
            rowlines: n.map(e => e - 1).filter(e => e >= 0),
            columnlines: t.map(e => e - 1).filter(e => e >= 0)
        }
    }
}
function w(e) {
    switch (e) {
    case "left":
        return "l";
    case "right":
        return "r";
    default:
        return "c"
    }
}
class O extends React.Component {
    render() {
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                border: "1px solid gray"
            }
        },
        React.createElement("div", {
            style: {
                margin: "1px auto",
                border: "1px solid gray",
                width: "14px",
                height: "0px"
            }
        }), React.createElement("div", {
            style: {
                margin: "1px auto",
                border: "1px solid gray",
                width: "10px",
                height: "0px"
            }
        }), React.createElement("div", {
            style: {
                margin: "1px auto",
                border: "1px solid gray",
                width: "6px",
                height: "0px"
            }
        }))
    }
}
class D extends MatrixViewComponent {
    renderOpenBracket() {
        return null
    }
    renderCloseBracket() {
        return null
    }
}
class N extends SymbolMatrix {
    getViewComponent() {
        return D
    }
    getModel() {
        var e = this.getModelFromStructure({
            "0_0": "editor",
            "0_1": "editor",
            "1_0": "editor",
            "1_1": "editor",
            "2_0": "editor",
            "2_1": "editor"
        },
        "\\gathered");
        return e.row = 3,
        e.column = 2,
        e
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\gathered"],
            renderSymbol: () => React.createElement(O, null)
        })
    }
    getLatexName() {
        return "\\gathered"
    }
    toModel(e, t) {
        return super.toModel(e, t)
    }
    getColumnJoinText() {
        return " & & "
    }
    toLatex(e, t, n) {
        return 1 === e.column ? this.innerToLatex(e, t, n, "gathered") : " " + this.innerToLatex(e, t, n, "aligned")
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        return n.width = void 0,
        n
    }
}
/// var k = n(344)/*SymbolAlignComponent*/,  // 1 times
/// B = n(15)/*TabularHelper*/,  // 3 times
/// P = n(13)/*CreateEditorObject*/;  // 1 times
class F extends MatrixViewComponent {
    renderOpenBracket() {
        return null
    }
    renderCloseBracket() {
        return null
    }
}
class H extends SymbolMatrix {
    getViewComponent() {
        return F
    }
    getModel() {
        var e = this.getModelFromStructure({
            "0_0": "editor",
            "0_1": "editor"
        },
        "\\aligned");
        return e.elements["0_1"] = CreateEditorObject.createOneTextEditor("="),
        e.row = 1,
        e.column = 2,
        e
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\aligned"],
            height: 30,
            renderSymbol: () => React.createElement(SymbolAlignComponent, null)
        })
    }
    getLatexName() {
        return "\\aligned"
    }
    toModel(e, t, n) {
        var r = super.toModel(e, t);
        return n && (r = this.realignColumnsForEqnArray(r)),
        r
    }
    realignColumnsForEqnArray(e) {
        for (var t = 0, n = {}, r = 0; r < e.column; r++) {
            for (var a = (r + 1) % 3 === 0, i = 0; i < e.row; i++) {
                var o = TabularHelper.getKeyFromRowCol(i, r),
                s = TabularHelper.getKeyFromRowCol(i, t);
                if (a) {
                    s = TabularHelper.getKeyFromRowCol(i, t - 1);
                    var l = _.last(e.elements[s].lines);
                    l.blocks = l.blocks.concat(e.elements[o].lines[0].blocks)
                } else n[s] = e.elements[o]
            }
            a || t++
        }
        return e.elements = n,
        e.column = t,
        e
    }
    toLatex(e, t, n) {
        return this.innerToLatex(e, t, n, "aligned")
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        return n.width = void 0,
        n.columnalign = _.times(e.column, e => e % 2 === 0 ? "right" : "left").join(" "),
        n.columnspacing = _.times(e.column, e => e % 2 === 0 ? "0em" : "2em").join(" "),
        n
    }
}
/*n.d(t, "arraySc", function () {
    return xx
}),*/
/*n.d(t, "caseSc", function () {
    return U
}),*/
/*n.d(t, "matrixSc", function () {
    return W
}),*/
/*n.d(t, "gatheredSc", function () {
    return G
}),*/
/*n.d(t, "alignedSc", function () {
    return z
});*/
var xx = new M,
U = new f,
W = new SymbolMatrix,
G = new N,
z = new H

export { xx as arraySc }

export { U as caseSc }

export { W as matrixSc }

export { G as gatheredSc }

export { z as alignedSc }