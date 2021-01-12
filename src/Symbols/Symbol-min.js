import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1304) /*Symbol-min*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolMin = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\min"
    }
    getSymbol() {
        return "min"
    }
}

export default SymbolMin