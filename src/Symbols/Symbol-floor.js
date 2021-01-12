import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(900) /*Symbol-floor*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolFloor = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\floor"
    }
    getSymbol() {
        return "floor"
    }
}

export default SymbolFloor