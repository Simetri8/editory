import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(1527) /*Symbol-mathbb*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var l = n(18)/*StyleHelper*/;  // 1 times
class c extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "math-xx"
    }
    renderComponent() {
        return React.createElement(EditArea, Object.assign({
            borderIfEmpty: !0
        },
        this.buildMetaDataFromName("value")))
    }
}
class d extends CompositeScSymbolBase {
    getViewComponent() {
        return c
    }
    getSymbol() {
        return "mathxx"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement("div", {
                    className: "math-xx-icon"
                },
                React.createElement("div", {
                    style: {
                        width: "23px",
                        height: "12px",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        textAlign: "center",
                        borderColor: "gray",
                        fontFamily: "fantasy",
                        color: "black",
                        paddingTop: "1px",
                        fontSize: "9px",
                        lineHeight: "14px",
                        verticalAlign: "middle",
                        margin: "auto"
                    }
                },
                this.symbol))
            }
        })
    }
    toModel(e, t, n) {
        var r = super.toModel(e, t, n);
        if ("" == r.text) return r;
        var a = e;
        return (n = r.elements.value.lines)[0].blocks.forEach(e => StyleHelper.addStyleMod(e, "mathType", a)),
        n[0].blocks
    }
}
var SymbolMathbb = new class extends d {
    toMathml(e, t) {
        return t.generateEditor(e.elements.value)
    }
    getLatextName() {
        return "\\mathbb"
    }
    getSymbol() {
        return "ℕℝ"
    }
}

export default SymbolMathbb