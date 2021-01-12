import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import DiagramIdHelper from './DiagramIdHelper';

/// xxx(39) /*SymbolBracketBase*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var a = n(6)/*DiagramIdHelper*/;  // 1 times
class i extends CompositeSymbolBase {
    constructor() {
        super();
        this.isBracket = !0
    }
    toLatex(e, t, n, r) {
        return this.getLatextName() + " "
    }
    toMathml(e) {
        var t = {
            type: "mo",
            fence: !0,
            value: this.getSymbol()
        };
        return e.___normal && (t.stretchy = !1),
        t
    }
    toModel() {
        return null
    }
    getModel() {
        return {
            id: DiagramIdHelper.nextId(),
            type: "single",
            text: this.getLatextName()
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "single",
            description: "Height adjust automatically by its content",
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
}

export default i