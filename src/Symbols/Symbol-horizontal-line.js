import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';

/// xxx(1376) /*Symbol-horizontal-line*/

/// n.r(t)
/// var r = n(29)/*CompositeBlock*/;  // 1 times
/// var a = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
class s extends CompositeBlock {
    renderComponent() {
        return React.createElement("div", {
            style: {
                verticalAlign: "baseline"
            }
        },
        React.createElement("div", {
            style: {
                display: "inline-block",
                height: 0,
                borderBottom: "1px solid",
                width: "100%"
            }
        }))
    }
    getCompositeBlockStyle() {
        return {
            display: "block"
        }
    }
}
var SymbolHorizontalLine = new class extends CompositeSymbolBase {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\horizontal-line"
    }
    getSymbol() {
        return "Horizontal Line"
    }
    getModelMeta() {
        return {
            text:
            this.getLatextName(),
            elements: {}
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            insertInTextModeOnly: !0,
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
    toModel(e, t, n) {
        return this.getModel()
    }
    toLatex(e, t, n) {
        return ""
    }
}

export default SymbolHorizontalLine