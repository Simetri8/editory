import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1303) /*Symbol-log*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolLog = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\log"
    }
    getSymbol() {
        return "log"
    }
}

export default SymbolLog