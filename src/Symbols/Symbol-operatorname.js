import jQuery from 'jquery';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import FontList from '../Font/FontList';

/// xxx(1274) /*Symbol-operatorname*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(5)/*sizzle*/;  // 1 times
/// var o = n.n(i);
/// var s = n(21)/*EditArea*/;  // 1 times
/// var l = n(29)/*CompositeBlock*/;  // 1 times
/// var c = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var d = n(48)/*FontList*/;  // 1 times
class h extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "operator-name";
        this.requestUpperHandled = !0
    }
    getEditContentTopBottom() {
        var e = jQuery(this.getRootDom()).children("edit-area").get(0);
        return this.getElementRect(e)
    }
    getPowerIndexInfo() {
        return {
            shouldConsiderAsChar: !0,
            rect: this.getElementRect(this.refMap.value.editor)
        }
    }
    shouldComponentUpdate(e, t) {
        var n = super.shouldComponentUpdate(e, t);
        return n = n || e.customDataStr != this.props.customDataStr
    }
    renderComponent() {
        return React.createElement(EditArea, Object.assign({
            key: "value",
            style: {
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathrm", this.context.baseMathModeFontFamily)
            },
            className: this.props.customDataStr,
            optimizeForOneLine: !0
        },
        this.buildMetaDataFromName("value"), {
            borderIfEmpty: this.isSelected()
        }))
    }
}
var SymbolOperatorname = new class extends CompositeScSymbolBase {
    constructor() {
        super(...arguments);
        this.isOperatorName = !0
    }
    getSymbol() {
        return ""
    }
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\operatorname"
    }
    toLatex(e, t, n) {
        return "\\operatorname{".concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            renderSymbol: () => React.createElement("div", null, React.createElement("div", {
                className: "common-big-square-icon"
            }))
        })]
    }
    toMathml(e, t) {
        t = t.withContextMathvariant("normal");
        var n = e.elements.value;
        return t.generateEditor(n)
    }
}

export default SymbolOperatorname