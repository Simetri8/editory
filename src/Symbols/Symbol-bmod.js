import ExtendedSymbolBase, { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1317) /*Symbol-bmod*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 2 times
class a extends ExtendedSymbolBase {
    renderComponent() {
        return this.renderText("mod")
    }
}
var SymbolBmod = new class extends ExtendedSymbolBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\bmod"
    }
    getSymbol() {
        return "bmod"
    }
}

export default SymbolBmod