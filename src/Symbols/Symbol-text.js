import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(1272) /*Symbol-text*/

/// n.r(t)
/*n.d(t, "NormalText", function () {
    return d
}),*/
/*n.d(t, "NormalTextSc", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var l = n(7)/*PropUpdateHelper*/;  // 1 times
/// var c = n(13)/*CreateEditorObject*/;  // 1 times
class d extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "normal-text"
    }
    renderComponent() {
        return React.createElement(EditArea, Object.assign({
            borderIfEmpty: !0
        },
        this.buildMetaDataFromName("textValue"), {
            renderAsPlainText: !0
        }))
    }
}
class h extends CompositeScSymbolBase {
    getViewComponent() {
        return d
    }
    getLatextName() {
        return "\\text"
    }
    getSymbol() {
        return "text"
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {
                textValue: {
                    onRemove: "all"
                }
            }
        }
    }
    toModel(e) {
        e = e.replace(/\t\r\n/g, " ");
        var t = this.getModel();
        return t.elements.textValue = CreateEditorObject.createOneTextEditor(e),
        t
    }
    toLatex(e, t, n) {
        return t = PropUpdateHelper.setProp(t, "inMathExpression", !1),
        "\\text{".concat(n.toLatexFromEditor(e.elements.textValue, t), "}")
    }
    toMathml(e, t) {
        var n = e.elements.textValue && e.elements.textValue.lines[0].blocks[0];
        return {
            type: "mtext",
            value: (n && n.text || "").replace(/\s/g, " ")
        }
    }
}
var SymbolText = new h

export { d as NormalText }

export { h as NormalTextSc }

export default SymbolText