import React from 'react';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import SymbolPowerIndex, { PowerIndex } from './Symbol-power-index';

/// xxx(1214) /*Symbol-power*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(188)/*Symbol-power-index*/;  // 2 times
var SymbolPower = new class extends CompositeSymbolBase {
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
            "\\power",
            elements: {
                powerValue: {
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\power"],
            height: 25,
            searchText: "power superscript",
            description: "power,superscript",
            shortcut: {
                char: "^"
            },
            renderSymbol: () => React.createElement("div", {
                className: "icon-power-symbol"
            },
            React.createElement("div", {
                className: "align-end",
                style: {
                    fontFamily: "Asana"
                }
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
            "msup",
            base: null,
            superscript: t.generateEditor(e.elements.powerValue)
        }
    }
}

export default SymbolPower