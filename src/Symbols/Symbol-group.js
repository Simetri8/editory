import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';

/// xxx(538) /*Symbol-group*/

/// n.r(t)
/*n.d(t, "GroupSc", function () {
    return c
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
class l extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "math-group"
    }
    renderComponent() {
        return React.createElement(EditArea, Object.assign({
            borderIfEmpty: !0
        },
        this.buildMetaDataFromName("value")))
    }
}
class c extends CompositeScSymbolBase {
    constructor() {
        super(...arguments);
        this.isFlatten = !0
    }
    getViewComponent() {
        return l
    }
    getLatextName() {
        return "\\group"
    }
    getSymbol() {
        return "Group"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            renderSymbol: () => React.createElement("div", {
                className: "group-icon"
            },
            React.createElement("div", {
                className: "rectangle"
            }))
        })
    }
    toLatex(e, t, n) {
        return "{".concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toMathml(e, t) {
        return t.generateEditor(e.elements.value)
    }
}
var SymbolGroup = new c

export { c as GroupSc }

export default SymbolGroup