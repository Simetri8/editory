import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(868) /*Symbol-acos*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolAcos = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\acos"
    }
    getSymbol() {
        return "acos"
    }
}

export default SymbolAcos