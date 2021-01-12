import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';

/// xxx(1231) /*Symbol-prefix-block*/

/// n.r(t)
/*n.d(t, "PrefixBlock", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
class s extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "prefix-block"
    }
    renderComponent() {
        var e = this.props.data.prefixText,
        t = e.split("."),
        n = {
            display: "inline-block"
        };
        return 1 === t.length && (n.width = "1em"),
        2 === t.length && (n.width = "2em"),
        3 === t.length && (n.width = "3em"),
        4 === t.length && (n.width = "4em"),
        React.createElement("span", {
            style: n,
            "data-line-id": this.props.data.lineId
        },
        e)
    }
}
var SymbolPrefixBlock = new class extends CompositeSymbolBase {
    toModel() {
        throw new Error("Method not implemented.")
    }
    getModelMeta() {
        return {
            text:
            this.getLatextName(),
            elements: {}
        }
    }
    getViewComponent() {
        return s
    }
    getLatextName() {
        return "\\prefix-block"
    }
    getSymbol() {
        return ""
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol: () => "Prefix Block"
        })
    }
    toLatex(e) {
        return e.prefixText
    }
}

export { s as PrefixBlock }

export default SymbolPrefixBlock