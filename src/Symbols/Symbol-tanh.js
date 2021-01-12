import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1291) /*Symbol-tanh*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolTanh = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\tanh"
    }
    getSymbol() {
        return "tanh"
    }
}

export default SymbolTanh