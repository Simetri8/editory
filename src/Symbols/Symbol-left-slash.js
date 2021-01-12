import jQuery from 'jquery';
import DOMHelper from '../Elements/DOMHelper';
import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1104) /*Symbol-left-slash*/

/// n.r(t)
/*n.d(t, "LeftSlash", function () {
    return l
}),*/
/*n.d(t, "LeftSlashSc", function () {
    return c
});*/
/// var r = n(5)/*sizzle*/;  // 1 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 1 times
/// var o = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var s = n(39)/*SymbolBracketBase*/;  // 1 times
class l extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "slash";
        this.bracketText = "/";
        this.delimiter = "open-slash"
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
        return "\\left/"
    }
    getSymbol() {
        return "/"
    }
    toLatex() {
        return "\\left/"
    }
}
var SymbolLeftSlash = new c

export { l as LeftSlash }

export { c as LeftSlashSc }

export default SymbolLeftSlash