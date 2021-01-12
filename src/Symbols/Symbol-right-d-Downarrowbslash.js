import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1099) /*Symbol-right-d-Downarrowbslash*/

/// n.r(t)
/*n.d(t, "CloseDDownarrow", function () {
    return i
}),*/
/*n.d(t, "CloseDDownarrowSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Downarrow";
        this.bracketText = "⇓";
        this.delimiter = "close-Downarrow"
    }
}
class o extends SymbolBracketBase {
    constructor() {
        super()
    }
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\Downarrow"
    }
    getSymbol() {
        return "⇓"
    }
}
var SymbolRightDDownarrowbslash = new o

export { i as CloseDDownarrow }

export { o as CloseDDownarrowSc }

export default SymbolRightDDownarrowbslash