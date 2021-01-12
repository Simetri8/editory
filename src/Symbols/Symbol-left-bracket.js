import DiagramIdHelper from '../Elements/DiagramIdHelper';
import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1076) /*Symbol-left-bracket*/

/// n.r(t)
/*n.d(t, "OpenBracket", function () {
    return o
});*/
/// var r = n(6)/*DiagramIdHelper*/;  // 1 times
/// var a = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var i = n(39)/*SymbolBracketBase*/;  // 1 times
class o extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "bracket";
        this.bracketText = "[";
        this.delimiter = "open-bracket"
    }
}
var SymbolLeftBracket = new class extends SymbolBracketBase {
    getLatextName() {
        return "\\left["
    }
    getSymbol() {
        return "["
    }
    getViewComponent() {
        return o
    }
    getModel() {
        return {
            id:
            DiagramIdHelper.nextId(),
            type: "single",
            text: "["
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "single",
            names: ["\\left[", "["],
            symbol: "[",
            description: "Height adjust automatically by its content"
        })
    }
    toLatex() {
        return "\\left["
    }
}

export { o as OpenBracket }

export default SymbolLeftBracket