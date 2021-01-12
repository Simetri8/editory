import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1095) /*Symbol-right-updownarrowbslash*/

/// n.r(t)
/*n.d(t, "CloseUpDownarrow", function () {
    return i
}),*/
/*n.d(t, "CloseUpDownarrowSc", function () {
    return o
});*/
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "updownarrow";
        this.bracketText = "↕";
        this.delimiter = "close-updownarrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\right\\updownarrow"
    }
    getSymbol() {
        return "↕"
    }
}
var SymbolRightUpdownarrowbslash = new o

export { i as CloseUpDownarrow }

export { o as CloseUpDownarrowSc }

export default SymbolRightUpdownarrowbslash