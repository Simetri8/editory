import React from 'react';
import { StackrelSc } from './Symbol-stackrel';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import EditArea from '../Editor/EditArea';
import StackrelIcon from '../Elements/StackrelIcon';

/// xxx(1112) /*Symbol-underset*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var o = n(21)/*EditArea*/;  // 2 times
/// var s = n(284)/*Symbol-stackrel*/,  // 1 times
/// l = n(338)/*StackrelIcon*/;  // 1 times
class c extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "underset-symbol"
    }
    useCustomBaseLine() {
        return !1
    }
    renderComponent() {
        return [React.createElement("div", {
            key: "value"
        },
        React.createElement(EditArea, Object.assign({
            key: "value",
            className: "center"
        },
        this.buildMetaDataFromName("value"), {
            noSpacingRule: !0,
            optimizeForOneLine: !0,
            stripInfo: this.setStripInfo({
                stripDown: !0
            })
        }))), React.createElement(EditArea, Object.assign({
            key: "sub1",
            className: "bottom center"
        },
        this.buildMetaDataFromName("sub1"), {
            showBorder: !1,
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            stripInfo: this.setStripInfo({
                stripUp: !0
            })
        }))]
    }
}
var SymbolUnderset = new class extends StackrelSc {
    getViewComponent() {
        return c
    }
    getLatextName() {
        return "\\underset"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            renderSymbol: () => React.createElement(StackrelIcon, {
                isUnder: !0
            })
        })
    }
    toMathml(e, t) {
        return {
            type: "munder",
            base: t.generateEditor(e.elements.value),
            underscript: t.generateEditor(e.elements.sub1)
        }
    }
}

export default SymbolUnderset