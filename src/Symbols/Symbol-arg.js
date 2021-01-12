import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1312) /*Symbol-arg*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArg = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arg"
    }
    getSymbol() {
        return "arg"
    }
}

export default SymbolArg