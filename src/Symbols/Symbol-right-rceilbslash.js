import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1089) /*Symbol-right-rceilbslash*/

/// n.r(t)
/*n.d(t, "RCeil", function () {
    return i
}),*/
/*n.d(t, "RCeilSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "ceil";
        this.bracketText = "⌉";
        this.delimiter = "close-ceil"
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
        return "\\right\\rceil"
    }
    getSymbol() {
        return "⌉"
    }
}
var SymbolRightRceilbslash = new o

export { i as RCeil }

export { o as RCeilSc }

export default SymbolRightRceilbslash