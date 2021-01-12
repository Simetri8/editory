import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1280) /*Symbol-sec*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolSec = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\sec"
    }
    getSymbol() {
        return "sec"
    }
}

export default SymbolSec