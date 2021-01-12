import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(896) /*Symbol-cosec*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCosec = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\cosec"
    }
    getSymbol() {
        return "cosec"
    }
}

export default SymbolCosec