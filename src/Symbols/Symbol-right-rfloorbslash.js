import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1087) /*Symbol-right-rfloorbslash*/

/// n.r(t)
/*n.d(t, "RFloor", function () {
    return i
}),*/
/*n.d(t, "RFloorSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "floor";
        this.bracketText = "⌋";
        this.delimiter = "close-floor"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\rfloor"
    }
    getSymbol() {
        return "⌋"
    }
}
var SymbolRightRfloorbslash = new o

export { i as RFloor }

export { o as RFloorSc }

export default SymbolRightRfloorbslash