import _ from 'lodash';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import TextHelper from '../Mathcha/TextHelper';

/// xxx(903) /*Symbol-qed*/

/// n.r(t)
/*n.d(t, "Qed", function () {
    return d
}),*/
/*n.d(t, "QedSc", function () {
    return h
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var c = n(77)/*TextHelper*/;  // 1 times
class d extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "qed-symbol"
    }
    getCompositeBlockStyle() {
        return _.assignIn({},
        super.getCompositeBlockStyle(), {
            float: this.props.isLastBlock ? "right" : void 0,
            paddingLeft: "1em"
        })
    }
    renderComponent() {
        var e = this.props.data.style && this.props.data.style.fontSize || "\\normalsize",
        t = TextHelper.fontSizePercentageFromCommand(e),
        n = this.context.mathFontSizeBase * t;
        return React.createElement("span", {
            style: {
                fontFamily: "Asana-Math,Asana",
                fontSize: n
            }
        },
        "□")
    }
}
class h extends CompositeSymbolBase {
    getViewComponent() {
        return d
    }
    getLatextName() {
        return "\\qed"
    }
    getSymbol() {
        return "qed"
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
            renderSymbol: () => React.createElement("span", {
                style: {
                    fontFamily: "Asana-Math,Asana",
                    fontSize: "1.2em"
                }
            },
            "□")
        })
    }
    toModel(e, t, n) {
        return this.getModel()
    }
    toLatex() {
        return "\\qed "
    }
    toMathml(e, t) {
        return {
            type: "empty"
        }
    }
}
var SymbolQed = new h

export { d as Qed }

export { h as QedSc }

export default SymbolQed