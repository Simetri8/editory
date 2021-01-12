import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1283) /*Symbol-arccos*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArccos = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arccos"
    }
    getSymbol() {
        return "arccos"
    }
}

export default SymbolArccos