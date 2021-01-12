import React from 'react';
import IconOver from '../Elements/Icon-Over';
import SymbolTildeBase, { SymbolTildeBaseB } from './Symbol-tilde-base';

/// xxx(1328) /*Symbol-grave*/

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
        return "`"
    }
    getSymbolClassName() {
        return "grave"
    }
    getMarginBottom() {
        return this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.35) : this.getRoundEmStr(-.1)
    }
}
var SymbolGrave = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\grave"
    }
    getSymbol() {
        return "`"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    overStyle: {
                        fontFamily: "'Times New Roman',Times,serif"
                    },
                    symbol: this.symbol,
                    height: 4
                })
            }
        })
    }
}

export default SymbolGrave