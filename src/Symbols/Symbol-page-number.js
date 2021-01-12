import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';

/// xxx(1377) /*Symbol-page-number*/

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
            className: "role-page-number-value"
        },
        "1"), React.createElement("span", {
            className: "page-print-item-hover"
        },
        "Page Number"))
    }
}
var SymbolPageNumber = new class extends CompositeSymbolBase {
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\page-number"
    }
    getSymbol() {
        return "Page Number"
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

export default SymbolPageNumber