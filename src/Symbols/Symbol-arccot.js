import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1284) /*Symbol-arccot*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArccot = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arccot"
    }
    getSymbol() {
        return "arccot"
    }
}

export default SymbolArccot