import DiagramIdHelper from '../Elements/DiagramIdHelper';

/// xxx(1340) /*Symbol-brackets*/

/// n.r(t)
/// var r = n(6)/*DiagramIdHelper*/;  // 1 times
var SymbolBrackets = new class {
    getModel(e) {
        return {
            id:
            DiagramIdHelper.nextId(),
            text: e ? e.symbol : ""
        }
    }
    getSymbolInfo() {
        return [this.getSymbolBy("\\lparenthesis", "("), this.getSymbolBy("\\rparenthesis", ")"), this.getSymbolBy("\\lbrace", "{"), this.getSymbolBy("\\rbrace", "}"), this.getSymbolBy("\\lbracket", "["), this.getSymbolBy("\\rbracket", "]")]
    }
    getSymbolBy(e, t) {
        return {
            searchText: e + " " + t,
            names: [e],
            symbol: t,
            forceCreateModel: !0
        }
    }
}

export default SymbolBrackets