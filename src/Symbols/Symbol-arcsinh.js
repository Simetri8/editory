import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1299) /*Symbol-arcsinh*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArcsinh = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arcsinh"
    }
    getSymbol() {
        return "arcsinh"
    }
}

export default SymbolArcsinh