import jQuery from 'jquery';
import DOMHelper from '../Elements/DOMHelper';
import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1102) /*Symbol-left-anglebslash*/

/// n.r(t)
/*n.d(t, "LeftAngle", function () {
    return l
}),*/
/*n.d(t, "LeftAngleSc", function () {
    return c
});*/
/// var r = n(5)/*sizzle*/;  // 1 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 1 times
/// var o = n(39)/*SymbolBracketBase*/;  // 1 times
/// var s = n(71)/*OpenSymbolBlock*/;  // 1 times
class l extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "angle";
        this.bracketText = "<";
        this.delimiter = "open-angle"
    }
    componentDidMount() {
        super.componentDidMount();
        jQuery(this.ref).css("height", "1em")
    }
    setHeightInfo(e, t, n, r) {
        super.setHeightInfo(e, t, n, r);
        this.props.data.___normal = !1
    }
    clearCustomHeight() {
        var e = DOMHelper.getComputedFontSize(this.ref);
        var t = 4 * e / 5;
        this.setHeightInfo(t, e - t, e, !0);
        this.props.data.___normal = !0
    }
    renderBracket() {
        return this.renderComposed()
    }
}
class c extends SymbolBracketBase {
    getViewComponent() {
        return l
    }
    getLatextName() {
        return "\\left\\angle"
    }
    getSymbol() {
        return "<"
    }
    toLatex(e, t) {
        return "mathjax" == t.mathType ? "\\left< " : "\\left<"
    }
}
var SymbolLeftAnglebslash = new c

export { l as LeftAngle }

export { c as LeftAngleSc }

export default SymbolLeftAnglebslash