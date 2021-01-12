import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1323) /*Symbol-dot*/

/// n.r(t)
/// var r = n(78)/*Symbol-tilde-base*/;  // 2 times
class a extends SymbolTildeBase {
    constructor() {
        super(...arguments);
        this.shouldAdjustSymbolWithCharacterSign = !0
    }
    getSymbol() {
        return "␒"
    }
    getSymbolClassName() {
        return "dot"
    }
}
var SymbolDot = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\dot"
    }
    getSymbol() {
        return "."
    }
}

export default SymbolDot