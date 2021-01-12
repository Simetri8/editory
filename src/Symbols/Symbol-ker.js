import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1310) /*Symbol-ker*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolKer = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\ker"
    }
    getSymbol() {
        return "ker"
    }
}

export default SymbolKer