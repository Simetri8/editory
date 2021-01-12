import React from 'react';
import { DOMHelperB } from '../Elements/DOMHelper';
import CancelIcon from '../Elements/CancelIcon';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import Svg from '../Elements/Svg';

/// xxx(225) /*Symbol-cancel*/

/// n.r(t)
/*n.d(t, "Cancel", function () {
    return u
}),*/
/*n.d(t, "CancelSc", function () {
    return p
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var l = n(82)/*Svg*/;  // 1 times
/// var c = n(4)/*DOMHelper*/;  // 1 times
/// var d = n(337)/*CancelIcon*/;  // 1 times
/// var h = n(13)/*CreateEditorObject*/;  // 1 times
class u extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "cancel";
        this.wrapRenderSvg = ((e, t, n) => this.renderSvg(e, t, n))
    }
    getDy(e) {
        if (this.isOneChar(this.props.data.elements.value)) t = 0;
        else if (this.isOneOr2Char(this.props.data.elements.value)) var t = e / 5;
        else t = e / 4;
        return t
    }
    renderSvg(e, t, n) {
        var r = this.getDy(n),
        i = "".concat(e, ",").concat(0 + r, " ").concat(0, ",").concat(t - r);
        return React.createElement("polyline", {
            points: i,
            strokeWidth: Object(DOMHelperB)(n),
            fill: "none"
        })
    }
    renderComponent() {
        var e = {};
        return this.props.stripInfo && (this.props.stripInfo.stripUp || this.props.stripInfo.stripDown) && (e = {
            stripUp: !0,
            stripDown: !0
        }),
        React.createElement("cancel-symbol", null, React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            renderSvg: this.wrapRenderSvg,
            changedData: this.props.data
        }), React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("value"), {
            optimizeForOneLine: !0,
            stripInfo: e
        })))
    }
}
class p extends CompositeScSymbolBase {
    constructor() {
        super()
    }
    getViewComponent() {
        return u
    }
    getLatextName() {
        return "\\cancel"
    }
    getSymbol() {
        return "cancel"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            height: 25,
            renderSymbol: () => React.createElement(CancelIcon, null)
        })
    }
    toModel(e, t, n) {
        var r = this.getModel();
        return r.elements.value = CreateEditorObject.createEditorWith(n),
        r
    }
    toLatex(e, t, n) {
        var r = e.text;
        return t.convertedInfo.addPreable("\\require{\\cancel}"),
        "".concat(r, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toMathml(e, t) {
        return {
            type: "menclose",
            notation: "updiagonalstrike",
            element: t.generateEditor(e.elements.value)
        }
    }
}
var SymbolCancel = new p

export { u as Cancel }

export { p as CancelSc }

export default SymbolCancel