import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1292) /*Symbol-sech*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolSech = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\sech"
    }
    getSymbol() {
        return "sech"
    }
}

export default SymbolSech