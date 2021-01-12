import SymbolSummationLike, { SymbolSummationLikeB } from './Symbol-summation-like';

/// xxx(1249) /*Symbol-prod*/

/// n.r(t)
/// var r = n(104)/*Symbol-summation-like*/;  // 2 times
class a extends SymbolSummationLike {
    getSymbol() {
        return "∏"
    }
    getEditorFromToMarginLeft() {
        return ""
    }
    getToClass() {
        return "to-prod"
    }
    getFromClass() {
        return "from-prod"
    }
}
var SymbolProd = new class extends SymbolSummationLikeB {
    getViewComponent() {
        return a
    }
    getFilterTag() {
        return "prod"
    }
    getLatextName() {
        return "\\prod"
    }
    getSymbol() {
        return "∏"
    }
}

export default SymbolProd