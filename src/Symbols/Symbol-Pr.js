import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1313) /*Symbol-Pr*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolPr = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\Pr"
    }
    getSymbol() {
        return "Pr"
    }
}

export default SymbolPr