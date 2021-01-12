import React from 'react';
import CompositeBlock from './CompositeBlock';
import CompositeSymbolBase from './CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import FontList from '../Font/FontList';
import SymbolElementNames from '../Symbols/SymbolElementNames';
import TextBlockMetricInfo from '../Editor/TextBlockMetricInfo';

/// xxx(26) /*ExtendedSymbolBase*/

/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return p
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(29)/*CompositeBlock*/;  // 1 times
/// var o = n(97)/*SymbolElementNames*/;  // 2 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(159)/*TextBlockMetricInfo*/;  // 1 times
/// var c = n(6)/*DiagramIdHelper*/;  // 1 times
/// var d = n(48)/*FontList*/;  // 1 times
/// var h = n(13)/*CreateEditorObject*/;  // 1 times
class u extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "constant-text";
        this.requestUpperHandled = !0
    }
    shouldComponentUpdate(e, t) {
        var n = super.shouldComponentUpdate(e, t);
        return n = n || e.customDataStr != this.props.customDataStr
    }
    useCustomBaseLine() {
        return !1
    }
    renderText(e) {
        var t = TextBlockMetricInfo.fillMetricsForTextBlock(e, null),
        n = {
            fontFamily: FontList.mathFontFamiltyFromKey("raw", this.context.baseMathModeFontFamily)
        };
        return !t.haveUpperChar && this.props.stripInfo && this.props.stripInfo.stripUp && (n.marginTop = this.getRoundEmStr(SymbolElementNames.upperSmallMarginTopEm)),
        !t.haveLowerChar && this.props.stripInfo && this.props.stripInfo.stripDown && (n.marginBottom = this.getRoundEmStr(SymbolElementNames.lowerSmallMarginBottomEm)),
        React.createElement("constant-text", {
            style: n,
            class: this.props.customDataStr
        },
        e)
    }
    renderComponent() {
        var e = this.props.data.text.substr(1);
        return this.renderText(e)
    }
}
class p extends CompositeSymbolBase {
    constructor() {
        super();
        this.isConstantText = !0;
        this.isOperatorName = !0;
        this.category = "OpOrFn"
    }
    getViewComponent() {
        return u
    }
    getModel() {
        return this.getModelFromStructure({},
        this.getLatextName())
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
    toModel(e, t, n) {
        if (n && 0 === n.length) return {
            text: "",
            type: "composite",
            elements: {},
            id: DiagramIdHelper.nextId()
        };
        var r = this.getModel();
        return r.elements.value = CreateEditorObject.createEditorWith(n),
        r
    }
    toLatex() {
        return this.getLatextName()
    }
    toMathml(e, t) {
        return {
            type: "mi",
            value: this.getSymbol()
        }
    }
}

export { p as ExtendedSymbolBaseB }

export default u