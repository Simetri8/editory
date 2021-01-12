import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1288) /*Symbol-arctan*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArctan = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arctan"
    }
    getSymbol() {
        return "arctan"
    }
}

export default SymbolArctan