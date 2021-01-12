import SymbolSummationLike, { SymbolSummationLikeB } from './Symbol-summation-like';

/// xxx(1250) /*Symbol-coprod*/

/// n.r(t)
/// var r = n(104)/*Symbol-summation-like*/;  // 2 times
class a extends SymbolSummationLike {
    getSymbol() {
        return "∐"
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
var SymbolCoprod = new class extends SymbolSummationLikeB {
    getViewComponent() {
        return a
    }
    getFilterTag() {
        return "coprod"
    }
    getLatextName() {
        return "\\coprod"
    }
    getSymbol() {
        return "∐"
    }
}

export default SymbolCoprod