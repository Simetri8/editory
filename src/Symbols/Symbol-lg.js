import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1315) /*Symbol-lg*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolLg = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\lg"
    }
    getSymbol() {
        return "lg"
    }
}

export default SymbolLg