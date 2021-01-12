import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1092) /*Symbol-left-downarrowbslash*/

/// n.r(t)
/*n.d(t, "OpenDownarrow", function () {
    return i
}),*/
/*n.d(t, "OpenDownarrowSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "downarrow";
        this.bracketText = "↓";
        this.delimiter = "open-downarrow"
    }
}
class o extends SymbolBracketBase {
    getViewComponent() {
        return i
    }
    getLatextName() {
        return "\\left\\downarrow"
    }
    getSymbol() {
        return "↓"
    }
}
var SymbolLeftDownarrowbslash = new o

export { i as OpenDownarrow }

export { o as OpenDownarrowSc }

export default SymbolLeftDownarrowbslash