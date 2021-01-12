import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import EditAreaLine from '../Editor/EditAreaLine';
import EventHelper from '../Mathcha/EventHelper';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolMatrix, { SymbolMatrixB } from './Symbol-matrix';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(1220) /*Symbol-plot-cases*/

/// n.r(t)
/*n.d(t, "Case", function () {
    return A
}),*/
/*n.d(t, "CaseSc", function () {
    return E
});*/
/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 15 times
/// var o = n.n(i);
/// var s = n(66)/*Symbol-matrix*/;  // 2 times
/// var l = n(117)/*MatrixViewComponent*/;  // 1 times
/// var c = n(12)/*BlockHelper*/;  // 1 times
/// var d = n(112)/*EditAreaLine*/;  // 1 times
/// var h = n(21)/*EditArea*/;  // 1 times
/// var u = n(14)/*classnames*/;  // 1 times
/// var p = n.n(u);
/// var m = n(51)/*SelectBoxContainer*/;  // 1 times
/// var f = n(24)/*EventHelper*/;  // 1 times
/// var g = n(15)/*TabularHelper*/;  // 2 times
/// var y = n(13)/*CreateEditorObject*/;  // 6 times
class A extends MatrixViewComponent {
    constructor(e) {
        super(e);
        this.handleComparisonChanged = ((e, t) => {
            var n = TabularHelper.getKeyFromRowCol(e, 0);
            var r = _.assignIn({},
            this.props.data.elements, {
                [n] : _.assignIn({},
                this.props.data.elements[n], {
                    comparison: t
                })
            });
            var i = _.assignIn({},
            this.props.data, {
                elements: r
            });
            this.props.onDataChanged(i)
        });
        this.selfManageBaseLine = !0
    }
    getComparison(e) {
        var t = TabularHelper.getKeyFromRowCol(e, 0);
        return this.props.data.elements[t].comparison || ">"
    }
    getClassName() {
        return classNames("matrix-symbol", "plot-case-symbol", "case-symbol", "role-tabular")
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
            var i = e + "_" + a;
            var s = this.isChildSelected() ? "selected" : "";
            1 === a ? t.push(React.createElement("td", {
                className: "non-select",
                key: a + "_if",
                style: {
                    fontFamily: "arial,verdana,geneva,lucida,'lucida grande',arial,helvetica,sans-serif",
                    paddingLeft: 2,
                    paddingRight: 2
                }
            },
            "if")) : 0 != a && t.push(React.createElement("td", {
                className: "non-select",
                key: a + "_middle",
                style: r
            }));
            2 === a && t.push(React.createElement("td", {
                className: "non-select",
                key: a + "_compare",
                style: r,
                onMouseDown: EventHelper.onMouseDownStopPropagation
            },
            React.createElement(SelectBoxContainer, {
                selectBoxStyle: {
                    height: 15,
                    fontFamily: "Asana-Math,Asana",
                    cursor: "pointer"
                },
                inputStyle: {
                    fontFamily: "Asana-Math,Asana",
                    fontSize: 17,
                    lineHeight: "0.9em",
                    color: "black"
                },
                itemsStyle: {
                    fontSize: 17,
                    fontFamily: "Asana-Math,Asana"
                },
                width: 30,
                data: v,
                value: this.getComparison(e),
                onChange: t => this.handleComparisonChanged(e, t)
            })));
            var l = BlockHelper.isSingleLineEditor(this.props.data.elements[i]) ? EditAreaLine : EditArea,
            u = React.createElement(l, Object.assign({},
            this.buildMetaDataFromName(i), {
                className: "editor-cell",
                optimizeForOneLine: !0,
                displayMode: !0,
                showBorder: !1
            }));
            t.push(React.createElement("td", {
                key: this.props.data.elements[i].id,
                className: s
            },
            u))
        }
        return t
    }
    renderSetting() {
        return null
    }
}
class E extends SymbolMatrix {
    getViewComponent() {
        return A
    }
    getModel(e) {
        var t = this.getModelFromStructure({
            "0_0": "editor",
            "0_1": "editor",
            "0_2": "editor",
            "1_0": "editor",
            "1_1": "editor",
            "1_2": "editor"
        },
        "\\plot-cases");
        return t.row = 2,
        t.column = 3,
        t.elements["0_0"] = CreateEditorObject.createOneTextEditor("5"),
        t.elements["0_1"] = CreateEditorObject.createOneTextEditor("x"),
        t.elements["0_2"] = CreateEditorObject.createOneTextEditor("1"),
        t.elements["1_0"] = CreateEditorObject.createOneTextEditor("-5"),
        t.elements["1_1"] = CreateEditorObject.createOneTextEditor("x"),
        t.elements["1_2"] = CreateEditorObject.createOneTextEditor("1"),
        t.elements["0_0"].comparison = "≥",
        t.elements["1_0"].comparison = "<",
        t
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\plot-cases"],
            renderSymbol() {
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
        return "\\plot-cases"
    }
    toModel(e, t) {
        return super.toModel(e, t)
    }
    toLatex(e, t, n) {
        return ""
    }
    toMathml(e, t) {
        return Object(SymbolMatrixB)(e, t)
    }
}
var v = [{
    key: "<",
    value: "<"
},
{
    key: ">",
    value: ">"
},
{
    key: "=",
    value: "="
},
{
    key: "≤",
    value: "≤"
},
{
    key: "≥",
    value: "≥"
},
{
    key: "≠",
    value: "≠"
}];
var SymbolPlotCases = new E

export { A as Case }

export { E as CaseSc }

export default SymbolPlotCases