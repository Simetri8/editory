import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1308) /*Symbol-deg*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolDeg = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\deg"
    }
    getSymbol() {
        return "deg"
    }
}

export default SymbolDeg