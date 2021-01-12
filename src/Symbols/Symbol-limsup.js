import React from 'react';
import SymbolLimLike, { SymbolLimLikeB } from './Symbol-lim-like';

/// xxx(1243) /*Symbol-limsup*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(120)/*Symbol-lim-like*/;  // 2 times
class o extends SymbolLimLike {
    getSymbol() {
        return React.createElement("span", null, "lim sup")
    }
    getFromClass() {
        return "from-limsup"
    }
    getToClass() {
        return "to-limsup"
    }
}
var SymbolLimsup = new class extends SymbolLimLikeB {
    getViewComponent() {
        return o
    }
    getLatextName() {
        return "\\limsup"
    }
    getSymbol() {
        return "limsup"
    }
}

export default SymbolLimsup