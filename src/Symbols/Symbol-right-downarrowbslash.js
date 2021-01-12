import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1093) /*Symbol-right-downarrowbslash*/

/// n.r(t)
/*n.d(t, "CloseDownarrow", function () {
    return i
}),*/
/*n.d(t, "CloseDownarrowSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "downarrow";
        this.bracketText = "↓";
        this.delimiter = "close-downarrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\downarrow"
    }
    getSymbol() {
        return "↓"
    }
}
var SymbolRightDownarrowbslash = new o

export { i as CloseDownarrow }

export { o as CloseDownarrowSc }

export default SymbolRightDownarrowbslash