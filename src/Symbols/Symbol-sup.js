import SymbolLimLike, { SymbolLimLikeB } from './Symbol-lim-like';

/// xxx(1245) /*Symbol-sup*/

/// n.r(t)
/// var r = n(120)/*Symbol-lim-like*/;  // 2 times
class a extends SymbolLimLike {
    getSymbol() {
        return "sup"
    }
    getFromClass() {
        return "from-sup"
    }
    getToClass() {
        return "to-sup"
    }
}
var SymbolSup = new class extends SymbolLimLikeB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\sup"
    }
    getSymbol() {
        return "sup"
    }
}

export default SymbolSup