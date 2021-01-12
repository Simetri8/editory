import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1324) /*Symbol-ddot*/

/// n.r(t)
/// var r = n(78)/*Symbol-tilde-base*/;  // 2 times
class a extends SymbolTildeBase {
    getSymbol() {
        return "␒␒"
    }
}
var SymbolDdot = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\ddot"
    }
    getSymbol() {
        return ".."
    }
}

export default SymbolDdot