import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1298) /*Symbol-arcsech*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArcsech = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arcsech"
    }
    getSymbol() {
        return "arcsech"
    }
}

export default SymbolArcsech