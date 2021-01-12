import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1082) /*Symbol-left-Vertbslash*/

/// n.r(t)
/*n.d(t, "DVerticalBarLeft", function () {
    return i
}),*/
/*n.d(t, "DVerticalBarLeftSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Vert";
        this.bracketText = "‖";
        this.delimiter = "open-Vert"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\Vert"
    }
    getSymbol() {
        return "‖"
    }
}
var SymbolLeftVertbslash = new o

export { i as DVerticalBarLeft }

export { o as DVerticalBarLeftSc }

export default SymbolLeftVertbslash