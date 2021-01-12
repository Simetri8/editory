import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1077) /*Symbol-right-bracket*/

/// n.r(t)
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(6)/*DiagramIdHelper*/;  // 1 times
/// var i = n(39)/*SymbolBracketBase*/;  // 1 times
class o extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "bracket";
        this.bracketText = "]";
        this.delimiter = "close-bracket"
    }
}
var SymbolRightBracket = new class extends SymbolBracketBase {
    getLatextName() {
        return "\\right]"
    }
    getSymbol() {
        return "]"
    }
    getViewComponent() {
        return o
    }
    getModel() {
        return {
            id:
            DiagramIdHelper.nextId(),
            type: "single",
            text: "]"
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "single",
            names: ["\\right]", "]"],
            symbol: "]",
            description: "Height adjust automatically by its content"
        })
    }
    toLatex() {
        return "\\right]"
    }
}

export default SymbolRightBracket