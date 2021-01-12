import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1278) /*Symbol-cos*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolCos = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\cos"
    }
    getSymbol() {
        return "cos"
    }
}

export default SymbolCos