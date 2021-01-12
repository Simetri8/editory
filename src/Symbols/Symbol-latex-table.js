import _ from 'lodash';
import React from 'react';
import { SymbolMatrixC } from './Symbol-matrix';
import ArrayHelper2 from '../Mathcha/ArrayHelper2';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import LatexTableDesignerDialog from '../Editor/LatexTableDesignerDialog';
import LatexTableView from '../Latex/LatexTableView';
import TableLatexConverter from '../Latex/TableLatexConverter';
import TabularCellHelper from '../Tabular/TabularCellHelper';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(540) /*Symbol-latex-table*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var s = n(66)/*Symbol-matrix*/;  // 1 times
/// var l = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var c = n(461)/*LatexTableDesignerDialog*/;  // 1 times
/// var d = n(2)/*lodash*/;  // 2 times
/// var h = n.n(d);
/// var u = n(345)/*LatexTableView*/;  // 1 times
/// var p = n(64)/*TabularCellHelper*/;  // 1 times
/// var m = n(55)/*ArrayHelper2*/;  // 1 times
var f = new class {
    toLatexStructure(e) {
        var t = this.toInputTabular(e);
        return LatexTableView.toLatexStructure(t)
    }
    toInputTabular(e) {
        var t = e.columnWidths || [],
        n = {
            cells: ArrayHelper2.newArray(e.row),
            column: e.column,
            row: e.row,
            hLines: e.hLines || [],
            vLines: e.vLines || [],
            columnWidths: _.times(e.column, e => {
                var n = t[e];
                return "number" == typeof n ? n : "auto"
            }),
            tableWidth: e.tableWidth
        };
        return _.times(n.row).forEach(t => n.cells[t] = new Array(e.column)),
        TabularCellHelper.cellLoop(e, e => {
            var t = e.rIndex,
            r = e.cIndex,
            a = e.rowSpan,
            i = e.colSpan,
            o = e.hidden,
            s = e.editor,
            l = s.style && s.style.align ? s.style.align : "center";
            "justify" == l && (l = "left");
            n.cells[t][r] = {
                rowSpan: a,
                colSpan: i,
                hidden: o,
                data: s,
                align: l
            }
        }),
        n
    }
}
/// g = n(346)/*TableLatexConverter*/,  // 1 times
/// y = n(15)/*TabularHelper*/;  // 1 times
/*n.d(t, "LatexTableSc", function () {
    return A
});*/
class A extends CompositeSymbolBase {
    getViewComponent() {
        return LatexTableDesignerDialog
    }
    getModel(e) {
        for (var t = {}, n = 0; n < 3; n++) for (var r = 0; r < 3; r++) {
            t[TabularHelper.getKeyFromRowCol(n, r)] = "editor"
        }
        var a = this.getModelFromStructure(t, "\\latex-table");
        return a.row = 3,
        a.column = 3,
        a.hLines = [{
            nOfLines: 1
        },
        {
            nOfLines: 1
        },
        {
            nOfLines: 1
        },
        {
            nOfLines: 1
        }],
        a.vLines = [{
            nOfLines: 1
        },
        {
            nOfLines: 1
        },
        {
            nOfLines: 1
        },
        {
            nOfLines: 1
        }],
        a
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\latex-table"],
            height: 30,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement("svg", {
                style: {
                    width: 19,
                    height: 15,
                    transform: "translate(2px,1px)",
                    stroke: "gray"
                }
            },
            React.createElement("path", {
                style: {
                    transform: "translate(2px,2px)"
                },
                d: "M-0.5,0 L12.5,0 M-0.5,6 L12.5,6 M-0.5,12 L12.5,12 M0,0 L0,12 M6,0 L6,12 M12,0 L12,12",
                fill: "none"
            }))
        })
    }
    getLatexName() {
        return "\\latex-table"
    }
    toModel(e, t) {
        return Object(SymbolMatrixC)(this.getLatexName(), t)
    }
    isInMathExpression() {
        return !1
    }
    toLatex(e, t, n) {
        t = _.assignIn({},
        t, {
            inMathExpression: !1,
            inTable: !0
        });
        var r = f.toLatexStructure(e);
        return TableLatexConverter.toLatex(r, n, t)
    }
}
var SymbolLatexTable = new A

export { A as LatexTableSc }

export default SymbolLatexTable