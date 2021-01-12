import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1096) /*Symbol-left-d-Uparrowbslash*/

/// n.r(t)
/*n.d(t, "OpenDUparrow", function () {
    return i
}),*/
/*n.d(t, "OpenDUparrowSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Uparrow";
        this.bracketText = "⇑";
        this.delimiter = "open-Uparrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\Uparrow"
    }
    getSymbol() {
        return "⇑"
    }
}
var SymbolLeftDUparrowbslash = new o

export { i as OpenDUparrow }

export { o as OpenDUparrowSc }

export default SymbolLeftDUparrowbslash