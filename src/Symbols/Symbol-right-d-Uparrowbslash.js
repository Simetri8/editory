import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1097) /*Symbol-right-d-Uparrowbslash*/

/// n.r(t)
/*n.d(t, "CloseDUparrow", function () {
    return i
}),*/
/*n.d(t, "CloseDUparrowSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Uparrow";
        this.bracketText = "⇑";
        this.delimiter = "close-Uparrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\Uparrow"
    }
    getSymbol() {
        return "⇑"
    }
}
var SymbolRightDUparrowbslash = new o

export { i as CloseDUparrow }

export { o as CloseDUparrowSc }

export default SymbolRightDUparrowbslash