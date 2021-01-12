import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1325) /*Symbol-dddot*/

/// n.r(t)
/// var r = n(78)/*Symbol-tilde-base*/;  // 2 times
class a extends SymbolTildeBase {
    getSymbol() {
        return "␒␒␒"
    }
    getSymbolClassName() {
        return "dddot"
    }
}
var SymbolDddot = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\dddot"
    }
    getSymbol() {
        return "..."
    }
}

export default SymbolDddot