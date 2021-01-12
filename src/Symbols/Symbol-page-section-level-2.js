import _ from 'lodash';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';

/// xxx(1380) /*Symbol-page-section-level-2*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(29)/*CompositeBlock*/;  // 1 times
/// var o = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var s = n(0)/*React*/;  // 4 times
/// var l = n.n(s);
class c extends CompositeBlock {
    getCompositeBlockStyle() {
        return _.assignIn({},
        super.getCompositeBlockStyle(), {
            display: "inline"
        })
    }
    renderComponent() {
        return React.createElement("span", {
            className: "page-print-item role-page-section-level-2"
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
            className: "role-page-section-level1-value"
        },
        "Section Level 2"), React.createElement("span", {
            className: "page-print-item-hover"
        },
        "Page Section Level 2"))
    }
}
var SymbolPageSectionLevel2 = new class extends CompositeSymbolBase {
    getViewComponent() {
        return c
    }
    getLatextName() {
        return "\\page-section-level-2"
    }
    getSymbol() {
        return "Section Level 2"
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

export default SymbolPageSectionLevel2