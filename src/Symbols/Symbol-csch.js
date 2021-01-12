import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1294) /*Symbol-csch*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCsch = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\csch"
    }
    getSymbol() {
        return "csch"
    }
}

export default SymbolCsch