import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(901) /*Symbol-ceil-fun*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCeilFun = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\ceil-fun"
    }
    getSymbol() {
        return "ceil"
    }
}

export default SymbolCeilFun