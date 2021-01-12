import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1297) /*Symbol-arccsch*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArccsch = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arccsch"
    }
    getSymbol() {
        return "arccsch"
    }
}

export default SymbolArccsch