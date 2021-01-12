import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1094) /*Symbol-left-updownarrowbslash*/

/// n.r(t)
/*n.d(t, "OpenUpDownarrow", function () {
    return i
}),*/
/*n.d(t, "OpenUpDownarrowSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "updownarrow";
        this.bracketText = "↕";
        this.delimiter = "open-updownarrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\updownarrow"
    }
    getSymbol() {
        return "↕"
    }
}
var SymbolLeftUpdownarrowbslash = new o

export { i as OpenUpDownarrow }

export { o as OpenUpDownarrowSc }

export default SymbolLeftUpdownarrowbslash