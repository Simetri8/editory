import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1083) /*Symbol-right-Vertbslash*/

/// n.r(t)
/*n.d(t, "DVerticalBarRight", function () {
    return i
}),*/
/*n.d(t, "DVerticalBarRightSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Vert";
        this.bracketText = "‖";
        this.delimiter = "close-Vert"
    }
}
class o extends SymbolBracketBase {
    getSymbol() {
        return "‖"
    }
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\Vert"
    }
}
var SymbolRightVertbslash = new o

export { i as DVerticalBarRight }

export { o as DVerticalBarRightSc }

export default SymbolRightVertbslash