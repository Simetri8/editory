import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(895) /*Symbol-atan*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolAtan = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\atan"
    }
    getSymbol() {
        return "atan"
    }
}

export default SymbolAtan