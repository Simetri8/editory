import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1311) /*Symbol-hom*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolHom = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\hom"
    }
    getSymbol() {
        return "hom"
    }
}

export default SymbolHom