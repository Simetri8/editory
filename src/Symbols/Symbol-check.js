import React from 'react';
import IconOver from '../Elements/Icon-Over';
import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1330) /*Symbol-check*/

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
        return "ˇ"
    }
    getSymbolClassName() {
        return "check"
    }
    getMarginBottom() {
        return this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.2) : this.getRoundEmStr(-.05)
    }
}
var SymbolCheck = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\check"
    }
    getSymbol() {
        return "ˇ"
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

export default SymbolCheck