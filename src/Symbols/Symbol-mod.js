import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1316) /*Symbol-mod*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolMod = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\mod"
    }
    getSymbol() {
        return "mod"
    }
    toLatex() {
        return "\\bmod"
    }
}

export default SymbolMod