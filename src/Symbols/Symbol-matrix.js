import _ from 'lodash';
import React from 'react';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import ShapeMatrixElement from '../Shapes/ShapeMatrixElement';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(66) /*Symbol-matrix*/

/*n.d(t, "c", function () {
    return y
}),*/
/*n.d(t, "d", function () {
    return A
}),*/
/*n.d(t, "b", function () {
    return E
}),*/
/*n.d(t, "a", function () {
    return g
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 3 times
/// var o = n.n(i);
/// var s = n(0)/*React*/;  // 6 times
/// var l = n.n(s);
/// var c = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var d = n(6)/*DiagramIdHelper*/;  // 1 times
/// var h = n(117)/*MatrixViewComponent*/;  // 1 times
/// var u = n(165)/*ShapeMatrixElement*/;  // 6 times
/// var p = n(15)/*TabularHelper*/;  // 1 times
/// var m = n(13)/*CreateEditorObject*/;  // 2 times
var f = {
    "{": "Bmatrix",
    "[": "bmatrix",
    "(": "pmatrix",
    "|": "vmatrix",
    " ": "matrix",
    "‖": "Vmatrix"
};
class g extends CompositeSymbolBase {
    getViewComponent() {
        return MatrixViewComponent
    }
    getModel(e) {
        var t;
        e && e.names[0] && (t = e.names[0].substr(1));
        var n = this.bracketFromName(t),
        r = this.getModelFromStructure({
            "0_0": "editor",
            "0_1": "editor",
            "1_0": "editor",
            "1_1": "editor"
        },
        "\\matrix");
        return r.row = 2,
        r.column = 2,
        r.bracket = n,
        r
    }
    getLatexName() {
        return "\\matrix"
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: ["\\matrix"],
            height: 30,
            filterTag: "matrix ",
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: " "
            })
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\pmatrix"],
            height: 30,
            filterTag: "matrix",
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: "("
            })
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\bmatrix"],
            height: 30,
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: "["
            })
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\Bmatrix"],
            height: 30,
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: "{"
            })
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\vmatrix"],
            height: 30,
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: "|"
            })
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\Vmatrix"],
            height: 30,
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: "‖"
            })
        })]
    }
    bracketFromName(e) {
        return "pmatrix" == e ? "(": "Bmatrix" == e ? "{": "bmatrix" == e ? "[": "vmatrix" == e ? "|" : "Vmatrix" == e ? "‖" : "matrix" == e ? null : void 0
    }
    toModel(e, t, n, r) {
        var i = this.bracketFromName(e),
        o = y(this.getLatexName(), t);
        return _.assignIn({},
        o, {
            bracket: i
        })
    }
    isInMathExpression() {
        return !0
    }
    toLatex(e, t, n) {
        var r = e.bracket || " ",
        a = f[r];
        return this.innerToLatex(e, t, n, a)
    }
    toMathml(e, t) {
        var n = E(e, t),
        r = [{
            l: "\\pmatrix",
            left: "(",
            right: ")"
        },
        {
            l: "\\bmatrix",
            left: "[",
            right: "]"
        },
        {
            l: "\\Bmatrix",
            left: "{",
            right: "}"
        },
        {
            l: "\\vmatrix",
            left: "|",
            right: "|"
        },
        {
            l: "\\Vmatrix",
            left: "‖",
            right: "‖"
        }],
        a = r.find(t => t.l === e.text);
        return a ? {
            type: "mrow",
            elements: [{
                type: "mo",
                value: a.left,
                fence: !0
            },
            n, {
                type: "mo",
                value: a.right,
                fence: !0
            }]
        } : "\\matrix" == e.text && (a = r.find(t => t.left === e.bracket)) ? {
            type: "mrow",
            elements: [{
                type: "mo",
                value: a.left,
                fence: !0
            },
            n, {
                type: "mo",
                value: a.right,
                fence: !0
            }]
        } : n
    }
    innerToLatex(e, t, n, r) {
        return A({
            block: e,
            options: t,
            latexConverter: n,
            matrixName: r,
            arrayOption: null,
            forceHLine: !1,
            inMathExpression: this.isInMathExpression(),
            columnJoinText: this.getColumnJoinText()
        })
    }
    getColumnJoinText() {
        return " & "
    }
}
function y(e, t) {
    for (var n = t, r = {}, a = function (e) {
        for (var t = 0, n = 0; n < e.length; n++) {
            var r = e[n].sections ? e[n].sections.length : 0;
            t = Math.max(r, t)
        }
        return t
    } (t), i = n.length, o = 0; o < n.length; o++) {
        var s = n[o];
        s.sections = s.sections || [];
        for (var l = 0; l < a; l++) {
            r[o + "_" + l] = s.sections[l] ? s.sections[l] : CreateEditorObject.createEmptyEditor()
        }
    }
    return null == r["0_0"] && (r["0_0"] = CreateEditorObject.createEmptyEditor(), a = 1, i = 1),
    {
        id: DiagramIdHelper.nextId(),
        type: "composite",
        text: e,
        row: i,
        column: a,
        elements: r
    }
}
function A(e) {
    var t = e.arrayOption || "",
    n = _.assign({},
    e.options, {
        inMathExpression: e.inMathExpression
    }),
    r = e.matrixName;
    return "\\begin{".concat(r, "}").concat(t, "\n").concat(function (e, t, n, r, a) {
        for (var i = [], s = 0; s < e.row; s++) {
            var l = [],
            c = "";
            (r || e.hLines && e.hLines.indexOf(s) >= 0) && (c += "\\hline\n");
            for (var d = 0; d < e.column; d++) {
                var h = s + "_" + d,
                u = e.elements[h];
                l.push("".concat(n.toLatexFromEditor(u, t)))
            }
            c += l.join(a);
            "" == _.trim(c) && (c += " \\\\");
            i.push(c)
        } (r || e.hLines && e.hLines.indexOf(s) >= 0) && i.push("\\hline");
        return i.join("\\\\\n")
    } (e.block, n, e.latexConverter, e.forceHLine, e.columnJoinText), "\n\\end{").concat(r, "}")
}
function E(e, t) {
    for (var n = [], r = 0; r < e.row; r++) {
        var a = {
            type: "mtr",
            cells: []
        };
        n.push(a);
        for (var i = 0; i < e.column; i++) {
            var s = e.elements[TabularHelper.getKeyFromRowCol(r, i)];
            a.cells.push({
                type: "mtd",
                element: t.generateEditor(s)
            })
        }
    }
    return {
        type: "mtable",
        rows: n,
        columnalign: _.times(e.column, () => "center").join(" ")
    }
}
new g

export { y as SymbolMatrixC }

export { A as SymbolMatrixD }

export { E as SymbolMatrixB }

export default g