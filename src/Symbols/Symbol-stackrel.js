import React from 'react';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import StackrelIcon from '../Elements/StackrelIcon';

/// xxx(284) /*Symbol-stackrel*/

/// n.r(t)
/*n.d(t, "StackrelSc", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 2 times
/// var o = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(338)/*StackrelIcon*/;  // 1 times
/// var c = n(13)/*CreateEditorObject*/;  // 2 times
class d extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "stackrel-symbol"
    }
    useCustomBaseLine() {
        return !1
    }
    renderComponent() {
        return [React.createElement(EditArea, Object.assign({
            key: "top",
            className: "top cur-top center"
        },
        this.buildMetaDataFromName("sub1"), {
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            stripInfo: this.setStripInfo({
                stripDown: !0
            })
        })), React.createElement("div", {
            style: {
                clear: "both"
            },
            key: "value"
        },
        React.createElement(EditArea, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            stripInfo: this.setStripInfo({
                stripUp: !0
            }),
            showBorder: !1,
            className: "cur-value center",
            optimizeForOneLine: !0
        })))]
    }
}
class h extends CompositeSymbolBase {
    getViewComponent() {
        return d
    }
    getLatextName() {
        return "\\stackrel"
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            keyInsertOnSelection: "value",
            elements: {
                value: {
                    onRemove: "all"
                },
                sub1: {
                    onRemove: "all"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            renderSymbol: () => React.createElement(StackrelIcon, {
                isUnder: !1
            })
        })
    }
    toLatex(e, t, n) {
        return "".concat(this.getLatextName(), "{").concat(n.toLatexFromEditor(e.elements.sub1, t), "}{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toModel(e, t, n, r) {
        var a = this.getModel();
        return a.elements.sub1 = CreateEditorObject.createEditorWith(n),
        a.elements.value = CreateEditorObject.createEditorWith(r),
        a
    }
    toMathml(e, t) {
        return {
            type: "mover",
            base: t.generateEditor(e.elements.value),
            overscript: t.generateEditor(e.elements.sub1)
        }
    }
}
var SymbolStackrel = new h

export { h as StackrelSc }

export default SymbolStackrel