import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1276) /*Symbol-sin*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolSin = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\sin"
    }
    getSymbol() {
        return "sin"
    }
}

export default SymbolSin