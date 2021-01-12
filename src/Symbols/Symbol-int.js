import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(1232) /*Symbol-int*/

/// n.r(t)
/// var r = n(92)/*Symbol-integral-base*/;  // 2 times
class a extends SymbolIntegralBase {
    getSymbol() {
        return "∫"
    }
    getFromClass() {
        return "from-int"
    }
    getToClass() {
        return "to-int"
    }
}
var SymbolInt = new class extends SymbolIntegralBaseB {
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.description = " Integral",
        e.searchText += e.description,
        e.filterTag = "integral",
        e
    }
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\int"
    }
    getSymbol() {
        return "∫"
    }
}

export default SymbolInt