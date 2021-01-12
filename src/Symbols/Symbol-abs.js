import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(897) /*Symbol-abs*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolAbs = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\abs"
    }
    getSymbol() {
        return "abs"
    }
}

export default SymbolAbs