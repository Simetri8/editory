import React from 'react';
import CreateEditorObject from '../Elements/CreateEditorObject';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import SymbolMatrix, { SymbolMatrixB } from './Symbol-matrix';

/// xxx(1222) /*Symbol-binom*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 6 times
/// var a = n.n(r);
/// var i = n(66)/*Symbol-matrix*/;  // 2 times
/// var o = n(117)/*MatrixViewComponent*/;  // 1 times
/// var s = n(13)/*CreateEditorObject*/;  // 2 times
class l extends MatrixViewComponent {
    constructor(e) {
        super(e);
        this.containerClassName = "binom "
    }
    renderSetting() {
        return null
    }
    shouldShowSmaller() {
        return this.isInlineMode()
    }
}
var SymbolBinom = new class extends SymbolMatrix {
    getViewComponent() {
        return l
    }
    getModel() {
        var e = this.getModelFromStructure({
            "0_0":
            "editor",
            "1_0": "editor"
        },
        "\\binom");
        return e.row = 2,
        e.column = 1,
        e.bracket = "(",
        e.layoutType = this.getLayoutType(),
        e
    }
    getLayoutType() {
        return "binom"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\binom"],
            height: 30,
            renderSymbol() {
                var e = "square common-square-icon common-square-icon-expand";
                return React.createElement("div", {
                    style: {
                        display: "flex",
                        fontSize: "18px",
                        lineHeight: "14px"
                    }
                },
                React.createElement("div", null, "("), React.createElement("div", null, React.createElement("div", {
                    className: e,
                    style: {
                        marginTop: 1
                    }
                }), React.createElement("div", {
                    className: e
                })), React.createElement("div", null, ")"))
            }
        })
    }
    toModel(e, t, n, r) {
        var a = this.getModel();
        return a.elements["0_0"] = CreateEditorObject.createEditorWith(n),
        a.elements["1_0"] = CreateEditorObject.createEditorWith(r),
        a
    }
    toLatex(e, t, n) {
        var r = e.elements["0_0"],
        a = e.elements["1_0"];
        return "\\binom{".concat(n.toLatexFromEditor(r, t), "}{").concat(n.toLatexFromEditor(a, t), "}")
    }
    toMathml(e, t) {
        return {
            type: "mrow",
            elements: [{
                type: "mo",
                value: "(",
                fence: !0
            },
            Object(SymbolMatrixB)(e, t), {
                type: "mo",
                value: ")",
                fence: !0
            }]
        }
    }
}

export default SymbolBinom