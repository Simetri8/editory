import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1286) /*Symbol-arcsec*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArcsec = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arcsec"
    }
    getSymbol() {
        return "arcsec"
    }
}

export default SymbolArcsec