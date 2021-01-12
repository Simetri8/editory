import React from 'react';
import SymbolLimLike, { SymbolLimLikeB } from './Symbol-lim-like';

/// xxx(1246) /*Symbol-liminf*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(120)/*Symbol-lim-like*/;  // 2 times
class o extends SymbolLimLike {
    getSymbol() {
        return React.createElement("span", null, "lim inf")
    }
    getFromClass() {
        return "from-liminf"
    }
    getToClass() {
        return "to-liminf"
    }
}
var SymbolLiminf = new class extends SymbolLimLikeB {
    getViewComponent() {
        return o
    }
    getLatextName() {
        return "\\liminf"
    }
    getSymbol() {
        return "liminf"
    }
}

export default SymbolLiminf