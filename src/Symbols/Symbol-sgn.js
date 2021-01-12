import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1306) /*Symbol-sgn*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolSgn = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\sgn"
    }
    getSymbol() {
        return "sgn"
    }
}

export default SymbolSgn