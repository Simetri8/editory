import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1295) /*Symbol-arccosh*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArccosh = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arccosh"
    }
    getSymbol() {
        return "arccosh"
    }
}

export default SymbolArccosh