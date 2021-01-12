import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1331) /*Symbol-ring*/

/// n.r(t)
/// var r = n(78)/*Symbol-tilde-base*/;  // 2 times
class a extends SymbolTildeBase {
    constructor() {
        super(...arguments);
        this.shouldAdjustSymbolWithCharacterSign = !0
    }
    getSymbol() {
        return "˚"
    }
    getSymbolClassName() {
        return "ring"
    }
    getSymbolHeight() {
        return this.getRoundEmStr(.45)
    }
}
var SymbolRing = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return a
    }
    getLatextName() {
        return "\\ring"
    }
    getSymbol() {
        return "˚"
    }
}

export default SymbolRing