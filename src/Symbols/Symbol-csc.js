import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1282) /*Symbol-csc*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCsc = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\csc"
    }
    getSymbol() {
        return "csc"
    }
}

export default SymbolCsc