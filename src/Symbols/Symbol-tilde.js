import React from 'react';
import { SymbolTildeBaseB } from './Symbol-tilde-base';
import IconOver from '../Elements/Icon-Over';
import SymbolWidetilde from './Symbol-widetilde';

/// xxx(1320) /*Symbol-tilde*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
var i = SymbolWidetilde/*Symbol-widetilde*/
/// o = n(111)/*Icon-Over*/,  // 1 times
/// s = n(78)/*Symbol-tilde-base*/;  // 1 times
var SymbolTilde = new class extends SymbolTildeBaseB {
    getViewComponent() {
        return i.WideTilde
    }
    getLatextName() {
        return "\\tilde"
    }
    getSymbol() {
        return "~"
    }
    toLatex(e, t, n) {
        var r = "widetilde";
        return this.isEmptyOrOneCharEditor(e.elements.value) && (r = "tilde"),
        "\\".concat(r, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
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
                    height: 10
                })
            }
        })
    }
}

export default SymbolTilde