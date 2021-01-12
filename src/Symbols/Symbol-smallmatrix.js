import React from 'react';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import ShapeMatrixElement from '../Shapes/ShapeMatrixElement';
import SymbolMatrix, { SymbolMatrixB } from './Symbol-matrix';

/// xxx(1221) /*Symbol-smallmatrix*/

/// n.r(t)
/*n.d(t, "SmallMatrixSc", function () {
    return c
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(66)/*Symbol-matrix*/;  // 2 times
/// var o = n(165)/*ShapeMatrixElement*/;  // 1 times
/// var s = n(117)/*MatrixViewComponent*/;  // 1 times
class l extends MatrixViewComponent {
    constructor() {
        super(...arguments);
        this.disableLayoutType = !0
    }
    shouldShowSmaller() {
        return !0
    }
    renderOpenBracket() {
        return null
    }
    renderCloseBracket() {
        return null
    }
}
class c extends SymbolMatrix {
    getViewComponent() {
        return l
    }
    getModel() {
        var e = this.getModelFromStructure({
            "0_0": "editor",
            "0_1": "editor",
            "1_0": "editor",
            "1_1": "editor"
        },
        "\\smallmatrix");
        return e.row = 2,
        e.column = 2,
        e.bracket = "",
        e
    }
    getLatexName() {
        return "\\smallmatrix"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\smallmatrix"],
            height: 30,
            renderSymbol: () => React.createElement(ShapeMatrixElement, {
                bracketType: " ",
                smaller: !0
            })
        })
    }
    bracketFromName() {
        return null
    }
    toLatex(e, t, n) {
        return this.innerToLatex(e, t, n, "smallmatrix")
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        return n.displaystyle = !1,
        n.columnspacing = "0.333em",
        n.rowspacing = "0.2em",
        {
            type: "mstyle",
            scriptlevel: "1",
            element: n
        }
    }
}
var SymbolSmallmatrix = new c

export { c as SmallMatrixSc }

export default SymbolSmallmatrix