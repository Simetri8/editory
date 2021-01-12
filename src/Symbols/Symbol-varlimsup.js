import React from 'react';
import DOMHelper from '../Elements/DOMHelper';
import IconLim from '../Elements/IconLim';
import SymbolLimLike, { SymbolLimLikeB } from './Symbol-lim-like';

/// xxx(1244) /*Symbol-varlimsup*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 2 times
/// var o = n(120)/*Symbol-lim-like*/;  // 2 times
/// var s = n(240)/*IconLim*/;  // 1 times
class l extends SymbolLimLike {
    getSymbol() {
        return "lim"
    }
    getFromClass() {
        return "from-varlimsup"
    }
    getToClass() {
        return "to-varlimsup"
    }
    getSymbolClassName() {
        return "sup"
    }
    getFromStyle() {
        return {
            marginBottom: this.isLimitKind() ? DOMHelper.getEmRound(0, this.getFontSizePixel()) + "em" : DOMHelper.getEmRound(-.49, this.getFontSizePixel()) + "em"
        }
    }
}
var SymbolVarlimsup = new class extends SymbolLimLikeB {
    getViewComponent() {
        return l
    }
    getLatextName() {
        return "\\varlimsup"
    }
    getSymbol() {
        return "lim"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            height: 30,
            renderSymbol() {
                return React.createElement(IconLim, {
                    symbol: this.symbol,
                    isExpanded: !0,
                    isBorderTop: !0
                })
            }
        })
    }
    toMathml(e, t) {
        var n = {
            type: "mover",
            accent: !0,
            base: {
                type: "mo",
                value: this.getSymbol(),
                largeop: !0
            },
            overscript: {
                type: "mo",
                value: "¯"
            }
        };
        return e.elements.from || e.elements.to ? {
            type: "munderover",
            base: n,
            overscript: t.generateEditor(e.elements.from),
            underscript: t.generateEditor(e.elements.to)
        } : n
    }
}

export default SymbolVarlimsup