import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';

/// xxx(1378) /*Symbol-page-count*/

/// n.r(t)
/// var r = n(29)/*CompositeBlock*/;  // 1 times
/// var a = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
class s extends CompositeBlock {
    renderComponent() {
        return React.createElement("span", {
            className: "page-print-item"
        },
        React.createElement("div", {
            className: "role-page-info-bg",
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                border: "1px solid lightgray"
            }
        }), React.createElement("span", {
            className: "role-page-count-value"
        },
        "10"), React.createElement("span", {
            className: "page-print-item-hover"
        },
        "Page Count"))
    }
}
var SymbolPageCount = new class extends CompositeSymbolBase {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\page-count"
    }
    getSymbol() {
        return "Page Count"
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

export default SymbolPageCount