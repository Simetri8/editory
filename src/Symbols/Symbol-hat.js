import React from 'react';
import { SymbolTildeBaseB } from './Symbol-tilde-base';
import { WideHat } from './Symbol-wide-hat';
import IconHat from '../Elements/IconHat';

/// xxx(1322) /*Symbol-hat*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(536)/*Symbol-wide-hat*/,  // 1 times
/// o = n(349)/*IconHat*/,  // 1 times
/// s = n(78)/*Symbol-tilde-base*/;  // 1 times
var SymbolHat = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return WideHat
    }
    getLatextName() {
        return "\\hat"
    }
    getSymbol() {
        return "^"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconHat, {
                    symbol: this.symbol
                })
            }
        })
    }
    toLatex(e, t, n) {
        var r = "widehat";
        return this.isEmptyOrOneCharEditor(e.elements.value) && (r = "hat"),
        "\\".concat(r, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
}

export default SymbolHat