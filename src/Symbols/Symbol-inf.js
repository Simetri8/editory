import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1307) /*Symbol-inf*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolInf = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\inf"
    }
    getSymbol() {
        return "inf"
    }
}

export default SymbolInf