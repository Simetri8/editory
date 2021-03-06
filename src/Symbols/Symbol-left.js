import DiagramIdHelper from '../Elements/DiagramIdHelper';
import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1078) /*Symbol-left*/

/// n.r(t)
/*n.d(t, "OpenParenthesis", function () {
    return o
});*/
/// var r = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var a = n(6)/*DiagramIdHelper*/;  // 1 times
/// var i = n(39)/*SymbolBracketBase*/;  // 1 times
class o extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "parenthesis";
        this.bracketText = "(";
        this.delimiter = "open-parenthesis"
    }
}
var SymbolLeft = new class extends SymbolBracketBase {
    getLatextName() {
        return "\\left("
    }
    getSymbol() {
        return "("
    }
    getViewComponent() {
        return o
    }
    getModel() {
        return {
            id:
            DiagramIdHelper.nextId(),
            type: "single",
            text: "("
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "single",
            names: ["\\left(", "("],
            symbol: "(",
            description: "Height adjust automatically by its content"
        })
    }
    toLatex() {
        return "\\left("
    }
}

export { o as OpenParenthesis }

export default SymbolLeft