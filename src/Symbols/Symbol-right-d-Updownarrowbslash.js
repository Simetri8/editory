import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1101) /*Symbol-right-d-Updownarrowbslash*/

/// n.r(t)
/*n.d(t, "CloseDUpDownarrow", function () {
    return i
}),*/
/*n.d(t, "CloseDUpDownarrowSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Updownarrow";
        this.bracketText = "⇕";
        this.delimiter = "close-Updownarrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\Updownarrow"
    }
    getSymbol() {
        return "⇕"
    }
}
var SymbolRightDUpdownarrowbslash = new o

export { i as CloseDUpDownarrow }

export { o as CloseDUpDownarrowSc }

export default SymbolRightDUpdownarrowbslash