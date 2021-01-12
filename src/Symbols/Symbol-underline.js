import React from 'react';
import { DOMHelperB } from '../Elements/DOMHelper';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import Svg from '../Elements/Svg';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(1526) /*Symbol-underline*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 9 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(125)/*Symbol-hat-base*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
class l extends React.Component {
    render() {
        return React.createElement("div", {
            className: "under-line-icon",
            style: {
                margin: "auto",
                width: 12,
                fontSize: 12
            }
        },
        React.createElement("div", {
            className: "under-wrapper"
        },
        this.props.symbol), React.createElement("div", {
            className: "common-big-square-icon square",
            style: {
                marginTop: -12
            }
        }))
    }
}
/// var c = n(82)/*Svg*/,  // 1 times
/// d = n(4)/*DOMHelper*/;  // 2 times
var h = {
    overflow: "visible"
};
class u extends SymbolHatBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "under-line-symbol"
    }
    renderSvg(e, t, n) {
        var r = "".concat(0, ",", 0, " ", e, ",", 0);
        return React.createElement("polyline", {
            points: r,
            strokeWidth: Object(DOMHelperB)(n),
            fill: "none"
        })
    }
    renderComponent() {
        var e = this.getFontSizePixel(),
        t = Object(DOMHelperB)(e),
        n = {
            height: t,
            position: "absolute",
            left: 0,
            bottom: this.isSingleTextBlockAndLowerSmall(this.props.data.elements.value) ? -t : -this.getFontSizePixel() / 5 - t
        };
        return [React.createElement(EditArea, Object.assign({
            key: "value",
            optimizeForOneLine: !0
        },
        this.buildMetaDataFromName("value"), {
            borderIfEmpty: this.isSelected()
        })), React.createElement("line-border", {
            key: "line",
            style: n
        },
        React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            renderSvg: this.renderSvg,
            style: h
        }))]
    }
}
var SymbolUnderline = new class extends CompositeScSymbolBase {
    getViewComponent() {
        return u
    }
    getLatextName() {
        return "\\underline"
    }
    getModel() {
        return this.getModelFromStructure({
            value:
            "editor"
        },
        this.getLatextName())
    }
    getSymbol() {
        return "_"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(l, {
                    symbol: this.symbol
                })
            }
        })
    }
    toMathml(e, t) {
        return {
            type: "munder",
            base: t.generateEditor(e.elements.value),
            accent: !0,
            underscript: {
                type: "mo",
                value: this.getSymbol()
            }
        }
    }
}

export default SymbolUnderline