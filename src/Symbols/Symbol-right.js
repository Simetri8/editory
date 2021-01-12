import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1079) /*Symbol-right*/

/// n.r(t)
/// var r = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var a = n(6)/*DiagramIdHelper*/;  // 1 times
/// var i = n(39)/*SymbolBracketBase*/;  // 1 times
class o extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "parenthesis";
        this.bracketText = ")";
        this.delimiter = "close-parenthesis"
    }
}
var SymbolRight = new class extends SymbolBracketBase {
    getLatextName() {
        return "\\right)"
    }
    getSymbol() {
        return ")"
    }
    getViewComponent() {
        return o
    }
    getModel() {
        return {
            id:
            DiagramIdHelper.nextId(),
            type: "single",
            text: ")"
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "single",
            names: ["\\right)", ")"],
            symbol: ")",
            description: "Height adjust automatically by its content"
        })
    }
    toLatex() {
        return "\\right)"
    }
}

export default SymbolRight