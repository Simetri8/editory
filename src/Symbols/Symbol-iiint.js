import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(1236) /*Symbol-iiint*/

/// n.r(t)
/// var r = n(92)/*Symbol-integral-base*/;  // 2 times
class a extends SymbolIntegralBase {
    getSymbol() {
        return "∭"
    }
    getFromClass() {
        return "from-iiint"
    }
    getToClass() {
        return "to-iiint"
    }
}
var SymbolIiint = new class extends SymbolIntegralBaseB {
    getViewComponent() {
        return a
    }
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.description = " Tripple Integral",
        e.searchText += e.description,
        e.filterTag = "integral  ",
        e
    }
    getLatextName() {
        return "\\iiint"
    }
    getSymbol() {
        return "∭"
    }
}

export default SymbolIiint