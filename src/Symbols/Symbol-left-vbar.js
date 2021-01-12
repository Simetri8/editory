import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1080) /*Symbol-left-vbar*/

/// n.r(t)
/*n.d(t, "VerticalBarLeft", function () {
    return i
}),*/
/*n.d(t, "VerticalBarLeftSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "vert";
        this.bracketText = "|";
        this.delimiter = "open-vert"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left|"
    }
    getSymbol() {
        return "|"
    }
}
var SymbolLeftVbar = new o

export { i as VerticalBarLeft }

export { o as VerticalBarLeftSc }

export default SymbolLeftVbar