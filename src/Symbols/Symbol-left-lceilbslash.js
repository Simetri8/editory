import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1088) /*Symbol-left-lceilbslash*/

/// n.r(t)
/*n.d(t, "LCeil", function () {
    return i
}),*/
/*n.d(t, "LCeilSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "ceil";
        this.bracketText = "⌈";
        this.delimiter = "open-ceil"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\lceil"
    }
    getSymbol() {
        return "⌈"
    }
}
var SymbolLeftLceilbslash = new o

export { i as LCeil }

export { o as LCeilSc }

export default SymbolLeftLceilbslash