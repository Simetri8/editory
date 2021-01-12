import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1081) /*Symbol-right-vbar*/

/// n.r(t)
/*n.d(t, "VerticalBarRight", function () {
    return i
}),*/
/*n.d(t, "VerticalBarRightSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "vert";
        this.bracketText = "|";
        this.delimiter = "close-vert"
    }
}
class o extends SymbolBracketBase {
    getSymbol() {
        return "|"
    }
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right|"
    }
}
var SymbolRightVbar = new o

export { i as VerticalBarRight }

export { o as VerticalBarRightSc }

export default SymbolRightVbar