import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1285) /*Symbol-arccsc*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolArccsc = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\arccsc"
    }
    getSymbol() {
        return "arccsc"
    }
}

export default SymbolArccsc