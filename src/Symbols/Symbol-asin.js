import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(894) /*Symbol-asin*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolAsin = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\asin"
    }
    getSymbol() {
        return "asin"
    }
}

export default SymbolAsin