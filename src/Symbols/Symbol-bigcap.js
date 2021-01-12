import React from 'react';
import CommonSquareIcon from '../Elements/CommonSquareIcon';
import SymbolSummationLike, { SymbolSummationLikeB } from './Symbol-summation-like';

/// xxx(1253) /*Symbol-bigcap*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(104)/*Symbol-summation-like*/;  // 2 times
/// var o = n(175)/*CommonSquareIcon*/;  // 1 times
class s extends SymbolSummationLike {
    getSymbol() {
        return "⋂"
    }
    getEditorFromToMarginLeft() {
        return ""
    }
    getToClass() {
        return "to-cup"
    }
    getFromClass() {
        return "from-cup"
    }
    getSymbolClassName() {
        return "custom-symbol"
    }
}
var SymbolBigcap = new class extends SymbolSummationLikeB {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\bigcap"
    }
    getSymbol() {
        return "⋂"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            filterTag: "cap",
            height: 35,
            hasExpanded: !0,
            renderSymbol() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return React.createElement(CommonSquareIcon, {
                    symbol: this.symbol,
                    isSmall: !0,
                    isExpanded: e
                })
            }
        })
    }
}

export default SymbolBigcap