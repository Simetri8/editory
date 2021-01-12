import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1290) /*Symbol-cosh*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCosh = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\cosh"
    }
    getSymbol() {
        return "cosh"
    }
}

export default SymbolCosh