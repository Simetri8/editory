import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1289) /*Symbol-sinh*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolSinh = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\sinh"
    }
    getSymbol() {
        return "sinh"
    }
}

export default SymbolSinh