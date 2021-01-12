import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import EditAreaLine from '../Editor/EditAreaLine';
import HComposedSymbol from '../Elements/HComposedSymbol';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(1263) /*Symbol-overline*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 8 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(112)/*EditAreaLine*/;  // 1 times
/// var s = n(125)/*Symbol-hat-base*/;  // 1 times
/// var l = n(12)/*BlockHelper*/;  // 1 times
/// var c = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var d = n(205)/*HComposedSymbol*/;  // 1 times
class h extends SymbolHatBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "over-line-symbol"
    }
    getPowerIndexInfo() {
        return {
            rect: this.getElementRect(this.refMap.value.editor),
            shouldConsiderAsChar: this.isSingleTextBlockFirstLine(this.props.data.elements.value)
        }
    }
    renderEditArea() {
        return BlockHelper.isSingleLineEditor(this.props.data.elements.value) ? React.createElement(EditAreaLine, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"))) : React.createElement(EditArea, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            optimizeForOneLine: !0,
            borderIfEmpty: this.isSelected()
        }))
    }
    renderComponent() {
        var e = {
            height: this.getRoundEmStr(.25),
            marginTop: this.getRoundEmStr(.1),
            marginBottom: this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.35) : this.getRoundEmStr(-.1)
        };
        return [React.createElement("line-border", {
            key: "line",
            style: e
        },
        React.createElement(HComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            repeatChar: "⏨",
            baseMathModeFontFamily: this.context.baseMathModeFontFamily
        })), this.renderEditArea()]
    }
}
var SymbolOverline = new class extends CompositeScSymbolBase {
    constructor() {
        super(...arguments);
        this.isOverSymbol = !0
    }
    getSymbol() {
        return "¯"
    }
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\overline"
    }
    toLatex(e, t, n) {
        return "".concat(e.text, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toMathml(e, t) {
        return {
            type:
            "mover",
            base: t.generateEditor(e.elements.value),
            accent: !0,
            overscript: {
                type: "mo",
                value: this.getSymbol()
            }
        }
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            renderSymbol: () => React.createElement("div", {
                className: "over-line-icon"
            },
            React.createElement("div", {
                className: "common-big-square-icon"
            }))
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\bar"],
            renderSymbol: () => React.createElement("div", {
                className: "over-line-icon"
            },
            React.createElement("div", {
                className: "common-big-square-icon"
            }))
        })]
    }
}

export default SymbolOverline