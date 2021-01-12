import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1300) /*Symbol-arctanh*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArctanh = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arctanh"
    }
    getSymbol() {
        return "arctanh"
    }
}

export default SymbolArctanh