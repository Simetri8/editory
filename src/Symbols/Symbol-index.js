import React from 'react';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import SymbolPowerIndex, { PowerIndex } from './Symbol-power-index';

/// xxx(1216) /*Symbol-index*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(188)/*Symbol-power-index*/;  // 2 times
var SymbolIndex = new class extends CompositeSymbolBase {
    constructor() {
        super(...arguments);
        this.isDynamicPowerIndexPosition = !0
    }
    toModel() {
        throw new Error("Method not implemented.")
    }
    getViewComponent() {
        return PowerIndex
    }
    getModelMeta() {
        return {
            text:
            "\\index",
            elements: {
                indexValue: {
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\index"],
            height: 25,
            shortcut: {
                char: "_"
            },
            searchText: "index subscript",
            description: "index,subscript",
            renderSymbol: () => React.createElement("div", {
                style: {
                    fontFamily: "Asana"
                },
                className: "icon-index-symbol"
            },
            React.createElement("div", {
                className: "align-end"
            },
            "x"), React.createElement("div", {
                className: "square common-square-icon common-square-icon-expand"
            }))
        })
    }
    toLatex(e, t, n, r) {
        return SymbolPowerIndex.toLatex(e, t, n, r)
    }
    toMathml(e, t) {
        return {
            type:
            "msub",
            base: null,
            subscript: t.generateEditor(e.elements.indexValue)
        }
    }
}

export default SymbolIndex