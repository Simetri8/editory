import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1090) /*Symbol-left-uparrowbslash*/

/// n.r(t)
/*n.d(t, "OpenUparrow", function () {
    return i
}),*/
/*n.d(t, "OpenUparrowSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "uparrow";
        this.bracketText = "↑";
        this.delimiter = "open-uparrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\uparrow"
    }
    getSymbol() {
        return "↑"
    }
}
var SymbolLeftUparrowbslash = new o

export { i as OpenUparrow }

export { o as OpenUparrowSc }

export default SymbolLeftUparrowbslash