import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';

/// xxx(1374) /*Symbol-not-found-symbol*/

/// n.r(t)
/*n.d(t, "NfCheckbox", function () {
    return s
}),*/
/*n.d(t, "NfCheckboxSc", function () {
    return l
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(29)/*CompositeBlock*/;  // 1 times
/// var o = n(27)/*CompositeSymbolBase*/;  // 1 times
class s extends CompositeBlock {
    renderComponent() {
        return React.createElement("span", {
            style: {
                color: "red"
            }
        },
        "?")
    }
}
class l extends CompositeSymbolBase {
    constructor() {
        super()
    }
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\not-found-symbol"
    }
    getSymbol() {
        return "not-found-symbol"
    }
    getModel() {
        return this.getModelFromStructure({},
        this.getLatextName())
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            isHidden: !0
        })
    }
    toModel() {
        return this.getModel()
    }
    toLatex() {
        return "? "
    }
    toMathml(e, t) {
        return {
            type: "mtext",
            value: "Symbol not found"
        }
    }
}
var SymbolNotFoundSymbol = new l

export { s as NfCheckbox }

export { l as NfCheckboxSc }

export default SymbolNotFoundSymbol