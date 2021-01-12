import React from 'react';
import { DOMHelperB } from '../Elements/DOMHelper';
import CancelIcon from '../Elements/CancelIcon';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import Svg from '../Elements/Svg';

/// xxx(1106) /*Symbol-not*/

/// n.r(t)
/*n.d(t, "Not", function () {
    return u
}),*/
/*n.d(t, "NotSc", function () {
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
        this.containerClassName = "not";
        this.wrapRenderSvg = ((e, t, n) => this.renderSvg(e, t, n))
    }
    renderSvg(e, t, n) {
        var r = n / 10,
        i = r;
        this.refMap.value && (r += (t - this.getElementRect(this.refMap.value.editor).height) / 2);
        var o = (e - n / 2) / 2,
        s = "".concat(e - o, ",").concat(0 + r, " ").concat(0 + o, ",").concat(t - i);
        return React.createElement("polyline", {
            points: s,
            strokeWidth: Object(DOMHelperB)(n),
            fill: "none"
        })
    }
    renderComponent() {
        return React.createElement("cancel-symbol", null, React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            renderSvg: this.wrapRenderSvg
        }), React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("value"), {
            stripInfo: this.setStripInfo({
                stripDown: !0,
                stripUp: !0
            })
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
        return "\\not"
    }
    getSymbol() {
        return "not"
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
        var r = this.getLatextName();
        return "".concat(r, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toMathml(e, t) {
        return {
            type: "menclose",
            notation: "updiagonalstrike",
            element: t.generateEditor(e.elements.value)
        }
    }
}
var SymbolNot = new p

export { u as Not }

export { p as NotSc }

export default SymbolNot