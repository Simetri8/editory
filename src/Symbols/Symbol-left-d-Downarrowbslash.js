import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1098) /*Symbol-left-d-Downarrowbslash*/

/// n.r(t)
/*n.d(t, "OpenDDownarrow", function () {
    return i
}),*/
/*n.d(t, "OpenDDownarrowSc", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(39)/*SymbolBracketBase*/;  // 1 times
class i extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "Downarrow";
        this.bracketText = "⇓";
        this.delimiter = "open-Downarrow"
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
        return "\\left\\Downarrow"
    }
    getSymbol() {
        return "⇓"
    }
}
var SymbolLeftDDownarrowbslash = new o

export { i as OpenDDownarrow }

export { o as OpenDDownarrowSc }

export default SymbolLeftDDownarrowbslash