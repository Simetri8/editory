import React from 'react';
import IconOver from '../Elements/Icon-Over';
import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1329) /*Symbol-breve*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(111)/*Icon-Over*/;  // 1 times
/// var o = n(78)/*Symbol-tilde-base*/;  // 2 times
class s extends SymbolTildeBase {
    constructor() {
        super(...arguments);
        this.shouldAdjustSymbolWithCharacterSign = !0
    }
    getSymbol() {
        return "˘"
    }
    getSymbolClassName() {
        return "breve"
    }
    getMarginBottom() {
        return this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.4) : this.getRoundEmStr(-.2)
    }
}
var SymbolBreve = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\breve"
    }
    getSymbol() {
        return "˘"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    symbol: this.symbol,
                    height: 6
                })
            }
        })
    }
}

export default SymbolBreve