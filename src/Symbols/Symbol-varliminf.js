import React from 'react';
import IconLim from '../Elements/IconLim';
import SymbolLimLike, { SymbolLimLikeB } from './Symbol-lim-like';

/// xxx(1247) /*Symbol-varliminf*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(120)/*Symbol-lim-like*/;  // 2 times
/// var o = n(240)/*IconLim*/;  // 1 times
class s extends SymbolLimLike {
    getSymbol() {
        return "lim"
    }
    getFromClass() {
        return "from-lim"
    }
    getToClass() {
        return "to-lim"
    }
    getSymbolClassName() {
        return "inf"
    }
}
var SymbolVarliminf = new class extends SymbolLimLikeB {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\varliminf"
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
                    isBorderBottom: !0
                })
            }
        })
    }
    toMathml(e, t) {
        var n = {
            type: "munder",
            accent: !0,
            base: {
                type: "mo",
                value: this.getSymbol(),
                largeop: !0
            },
            underscript: {
                type: "mo",
                value: "_"
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

export default SymbolVarliminf