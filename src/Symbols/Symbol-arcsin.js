import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1287) /*Symbol-arcsin*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArcsin = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arcsin"
    }
    getSymbol() {
        return "arcsin"
    }
}

export default SymbolArcsin