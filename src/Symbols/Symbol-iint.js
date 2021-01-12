import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(1235) /*Symbol-iint*/

/// n.r(t)
/// var r = n(92)/*Symbol-integral-base*/;  // 2 times
class a extends SymbolIntegralBase {
    getSymbol() {
        return "∬"
    }
    getFromClass() {
        return "from-iint"
    }
    getToClass() {
        return "to-iint"
    }
}
var SymbolIint = new class extends SymbolIntegralBaseB {
    getViewComponent() {
        return a
    }
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.description = " Double Integral",
        e.searchText += e.description,
        e.filterTag = "integral ",
        e
    }
    getLatextName() {
        return "\\iint"
    }
    getSymbol() {
        return "∬"
    }
}

export default SymbolIint