import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1100) /*Symbol-left-d-Updownarrowbslash*/

/// n.r(t)
/*n.d(t, "OpenDUpDownarrow", function () {
    return i
}),*/
/*n.d(t, "OpenDUpDownarrowSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Updownarrow";
        this.bracketText = "⇕";
        this.delimiter = "open-Updownarrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\Updownarrow"
    }
    getSymbol() {
        return "⇕"
    }
}
var SymbolLeftDUpdownarrowbslash = new o

export { i as OpenDUpDownarrow }

export { o as OpenDUpDownarrowSc }

export default SymbolLeftDUpdownarrowbslash