import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1277) /*Symbol-dim*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolDim = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\dim"
    }
    getSymbol() {
        return "dim"
    }
}

export default SymbolDim