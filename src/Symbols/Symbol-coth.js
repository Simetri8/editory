import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1293) /*Symbol-coth*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCoth = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\coth"
    }
    getSymbol() {
        return "coth"
    }
}

export default SymbolCoth