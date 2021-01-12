import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1281) /*Symbol-cot*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCot = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\cot"
    }
    getSymbol() {
        return "cot"
    }
}

export default SymbolCot