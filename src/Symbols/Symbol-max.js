import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1305) /*Symbol-max*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolMax = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\max"
    }
    getSymbol() {
        return "max"
    }
}

export default SymbolMax