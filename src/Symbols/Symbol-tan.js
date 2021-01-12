import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1279) /*Symbol-tan*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolTan = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\tan"
    }
    getSymbol() {
        return "tan"
    }
}

export default SymbolTan