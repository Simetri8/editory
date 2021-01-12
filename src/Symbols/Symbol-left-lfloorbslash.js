import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1086) /*Symbol-left-lfloorbslash*/

/// n.r(t)
/*n.d(t, "LFloor", function () {
    return i
}),*/
/*n.d(t, "LFloorSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "floor";
        this.bracketText = "⌊";
        this.delimiter = "open-floor"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\lfloor"
    }
    getSymbol() {
        return "⌊"
    }
}
var SymbolLeftLfloorbslash = new o

export { i as LFloor }

export { o as LFloorSc }

export default SymbolLeftLfloorbslash