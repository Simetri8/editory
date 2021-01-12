import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1314) /*Symbol-gcd*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolGcd = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\gcd"
    }
    getSymbol() {
        return "gcd"
    }
}

export default SymbolGcd