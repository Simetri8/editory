import jQuery from 'jquery';
import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import DOMHelper from '../Elements/DOMHelper';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1103) /*Symbol-right-anglebslash*/

/// n.r(t)
/*n.d(t, "RightAngle", function () {
    return l
}),*/
/*n.d(t, "RightAngleSc", function () {
    return c
});*/
/// var r = n(5)/*sizzle*/;  // 1 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 1 times
/// var o = n(39)/*SymbolBracketBase*/;  // 1 times
/// var s = n(72)/*CloseSymbolBlock*/;  // 1 times
class l extends CloseSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "angle";
        this.bracketText = ">";
        this.delimiter = "close-angle"
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
        return "\\right\\angle"
    }
    getSymbol() {
        return ">"
    }
    toLatex(e, t) {
        return "mathjax" == t.mathType ? "\\right> " : "\\right>"
    }
}
var SymbolRightAnglebslash = new c

export { l as RightAngle }

export { c as RightAngleSc }

export default SymbolRightAnglebslash