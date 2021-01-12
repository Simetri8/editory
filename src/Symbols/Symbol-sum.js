import SymbolSummationLike, { SymbolSummationLikeB } from './Symbol-summation-like';

/// xxx(1248) /*Symbol-sum*/

/// n.r(t)
/// var r = n(104)/*Symbol-summation-like*/;  // 2 times
class a extends SymbolSummationLike {
    constructor() {
        super(...arguments);
        this.containerClassName = "summation-like-symbol limit-type"
    }
    getSymbol() {
        return "∑"
    }
    getEditorFromToMarginLeft() {
        return "lef-1-margin"
    }
    getToClass() {
        return "to-summation"
    }
}
var SymbolSum = new class extends SymbolSummationLikeB {
    getViewComponent() {
        return a
    }
    getFilterTag() {
        return "summation"
    }
    getLatextName() {
        return "\\sum"
    }
    getSymbol() {
        return "∑"
    }
}

export default SymbolSum