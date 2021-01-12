import SymbolLimLike, { SymbolLimLikeB } from './Symbol-lim-like';

/// xxx(1240) /*Symbol-lim*/

/// n.r(t)
/// var r = n(120)/*Symbol-lim-like*/;  // 2 times
class a extends SymbolLimLike {
    getSymbol() {
        return "lim"
    }
    getFromClass() {
        return "from-lim"
    }
    getToClass() {
        return "to-lim"
    }
}
var SymbolLim = new class extends SymbolLimLikeB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\lim"
    }
    getSymbol() {
        return "lim"
    }
}

export default SymbolLim