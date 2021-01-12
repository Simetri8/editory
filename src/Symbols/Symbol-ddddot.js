import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1326) /*Symbol-ddddot*/

/// n.r(t)
/// var r = n(78)/*Symbol-tilde-base*/;  // 2 times
class a extends SymbolTildeBase {
    getSymbol() {
        return "␒␒␒␒"
    }
    getSymbolClassName() {
        return "ddddot"
    }
}
var SymbolDdddot = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\ddddot"
    }
    getSymbol() {
        return "...."
    }
}

export default SymbolDdddot