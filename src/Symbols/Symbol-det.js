import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1309) /*Symbol-det*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolDet = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\det"
    }
    getSymbol() {
        return "det"
    }
}

export default SymbolDet