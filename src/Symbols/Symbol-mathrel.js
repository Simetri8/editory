import { GroupSc } from './Symbol-group';

/// xxx(1319) /*Symbol-mathrel*/

/// n.r(t)
/// var r = n(538)/*Symbol-group*/;  // 1 times
var SymbolMathrel = new class extends GroupSc {
    constructor() {
        super(...arguments);
        this.isFlatten = !1
    }
    getLatextName() {
        return "\\mathrel"
    }
    getSymbol() {
        return "mathrel"
    }
    toLatex(e, t, n) {
        return "\\mathrel{".concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
}

export default SymbolMathrel