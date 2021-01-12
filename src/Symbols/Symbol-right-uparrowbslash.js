import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1091) /*Symbol-right-uparrowbslash*/

/// n.r(t)
/*n.d(t, "CloseUparrow", function () {
    return i
}),*/
/*n.d(t, "CloseUparrowSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "uparrow";
        this.bracketText = "↑";
        this.delimiter = "close-uparrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\uparrow"
    }
    getSymbol() {
        return "↑"
    }
}
var SymbolRightUparrowbslash = new o

export { i as CloseUparrow }

export { o as CloseUparrowSc }

export default SymbolRightUparrowbslash