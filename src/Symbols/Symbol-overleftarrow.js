import React from 'react';
import HComposedSymbol from '../Elements/HComposedSymbol';
import SymbolUnknown, { SymbolUnknownB } from './Symbol-unknown';

/// xxx(1262) /*Symbol-overleftarrow*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
/// var i = n(205)/*HComposedSymbol*/;  // 1 times
/// var o = n(253)/*Symbol-unknown*/;  // 2 times
class s extends SymbolUnknown {
    renderArrow() {
        return React.createElement("arrow-symbol", {
            key: "arrow",
            style: this.getArrowStyle()
        },
        React.createElement(HComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            repeatChar: "⏭",
            startChar: "⏮",
            baseMathModeFontFamily: this.context.baseMathModeFontFamily
        }))
    }
}
var SymbolOverleftarrow = new class extends SymbolUnknownB {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\overleftarrow"
    }
    getSymbol() {
        return "←"
    }
}

export default SymbolOverleftarrow