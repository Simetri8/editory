import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1301) /*Symbol-exp*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolExp = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\exp"
    }
    getSymbol() {
        return "exp"
    }
}

export default SymbolExp