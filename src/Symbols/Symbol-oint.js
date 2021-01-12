import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(1237) /*Symbol-oint*/

/// n.r(t)
/// var r = n(92)/*Symbol-integral-base*/;  // 2 times
class a extends SymbolIntegralBase {
    getSymbol() {
        return "∮"
    }
    getFromClass() {
        return "from-oint"
    }
    getToClass() {
        return "to-oint"
    }
}
var SymbolOint = new class extends SymbolIntegralBaseB {
    getViewComponent() {
        return a
    }
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.description = " Contour Integral",
        e.searchText += e.description,
        e.filterTag = "integral o",
        e
    }
    getLatextName() {
        return "\\oint"
    }
    getSymbol() {
        return "∮"
    }
}

export default SymbolOint