import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(1238) /*Symbol-oiint*/

/// n.r(t)
/// var r = n(92)/*Symbol-integral-base*/;  // 2 times
class a extends SymbolIntegralBase {
    getSymbol() {
        return "∯"
    }
    getFromClass() {
        return "from-oiint"
    }
    getToClass() {
        return "to-oiint"
    }
}
var SymbolOiint = new class extends SymbolIntegralBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\oiint"
    }
    getSymbol() {
        return "∯"
    }
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.description = " Double Contour Integral",
        e.searchText += e.description,
        e.filterTag = "integral  o",
        e
    }
    toLatex(e, t, n, r) {
        return "mathjax" == t.mathType ? (t.convertedInfo.addUnSupportedLatex(this.getLatextName()), this.getLatextName()):
        super.toLatex(e, t, n, r)
    }
}

export default SymbolOiint