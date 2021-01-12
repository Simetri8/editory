import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1296) /*Symbol-arccoth*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArccoth = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arccoth"
    }
    getSymbol() {
        return "arccoth"
    }
}

export default SymbolArccoth