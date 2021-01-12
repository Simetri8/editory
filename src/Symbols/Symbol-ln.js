import { ExtendedSymbolBaseB } from '../Mathcha/ExtendedSymbolBase';

/// xxx(1302) /*Symbol-ln*/

/// n.r(t)
/// var r = n(26)/*ExtendedSymbolBase*/;  // 1 times
var SymbolLn = new class extends ExtendedSymbolBaseB {
    getLatextName() {
        return "\\ln"
    }
    getSymbol() {
        return "ln"
    }
}

export default SymbolLn