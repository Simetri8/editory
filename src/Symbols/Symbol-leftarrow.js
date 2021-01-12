import React from 'react';
import HComposedSymbol from '../Elements/HComposedSymbol';
import SymbolArrowBase from '../Elements/SymbolArrowBase';
import SymbolUnknow from './Symbol-unknow';

/// xxx(1255) /*Symbol-leftarrow*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(205)/*HComposedSymbol*/;  // 1 times
/// var o = n(347)/*Symbol-unknow*/;  // 1 times
/// var s = n(241)/*SymbolArrowBase*/;  // 1 times
class l extends SymbolArrowBase {
    getArrow() {
        return "←"
    }
    renderComposedArrow() {
        return React.createElement(HComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            baseMathModeFontFamily: this.context.baseMathModeFontFamily,
            startChar: "⏮",
            repeatChar: "⏭"
        })
    }
}
var SymbolLeftarrow = new class extends SymbolUnknow {
    getViewComponent() {
        return l
    }
    getLatextName() {
        return "\\leftarrow"
    }
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.shortcut = {
            char:
            "<-"
        },
        e.description = "similar to: \\gets ",
        e
    }
    getSymbol() {
        return "←"
    }
}

export default SymbolLeftarrow