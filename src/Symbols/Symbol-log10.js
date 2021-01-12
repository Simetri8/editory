import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import SymbolElementNames from './SymbolElementNames';
import TextBlockMetricInfo from '../Editor/TextBlockMetricInfo';

/// xxx(899) /*Symbol-log10*/

/// n.r(t)
/*n.d(t, "Log10", function () {
    return h
}),*/
/*n.d(t, "Log10Sc", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
/// var i = n(29)/*CompositeBlock*/;  // 1 times
/// var o = n(97)/*SymbolElementNames*/;  // 2 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(159)/*TextBlockMetricInfo*/;  // 1 times
/// var c = n(6)/*DiagramIdHelper*/;  // 1 times
/// var d = n(13)/*CreateEditorObject*/;  // 1 times
class h extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "constant-text";
        this.requestUpperHandled = !0
    }
    shouldComponentUpdate() {
        return !1
    }
    useCustomBaseLine() {
        return !1
    }
    renderText(e) {
        var t = TextBlockMetricInfo.fillMetricsForTextBlock(e, null),
        n = {};
        return !t.haveUpperChar && this.props.stripInfo && this.props.stripInfo.stripUp && (n.marginTop = this.getRoundEmStr(SymbolElementNames.upperSmallMarginTopEm)),
        !t.haveLowerChar && this.props.stripInfo && this.props.stripInfo.stripDown && (n.marginBottom = this.getRoundEmStr(SymbolElementNames.lowerSmallMarginBottomEm)),
        React.createElement("constant-text", {
            style: n
        },
        e, React.createElement("ct-index", {
            style: {
                fontSize: "0.75em",
                verticalAlign: "-0.4em",
                paddingLeft: "0.1em"
            }
        },
        "10"))
    }
    renderComponent() {
        return this.renderText("log")
    }
}
class u extends CompositeSymbolBase {
    constructor() {
        super();
        this.isConstantText = !0;
        this.isOperatorName = !0;
        this.category = "OpOrFn"
    }
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\log10"
    }
    getSymbol() {
        return "log10"
    }
    getModel() {
        return this.getModelFromStructure({},
        this.getLatextName())
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
    toModel(e, t, n) {
        if (n && 0 === n.length) return {
            id: DiagramIdHelper.nextId(),
            text: ""
        };
        var r = this.getModel();
        return r.elements.value = CreateEditorObject.createEditorWith(n),
        r
    }
    toLatex() {
        return this.getLatextName()
    }
    toMathml(e, t) {
        return {
            type: "mi",
            value: this.getSymbol()
        }
    }
}
var SymbolLog10 = new u

export { h as Log10 }

export { u as Log10Sc }

export default SymbolLog10