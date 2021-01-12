import React from 'react';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import Svg from '../Elements/Svg';
import SymbolArcPathInfo from './SymbolArcPathInfo';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(1525) /*Symbol-underarc*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 11 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(125)/*Symbol-hat-base*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var l = n(82)/*Svg*/;  // 1 times
/// var c = n(350)/*SymbolArcPathInfo*/;  // 1 times
class d extends React.Component {
    render() {
        return React.createElement("div", {
            className: "under-symbol-icon",
            style: {
                margin: "auto",
                width: 12,
                fontSize: 12,
                marginLeft: 5
            }
        },
        React.createElement("div", {
            className: "common-big-square-icon square"
        }), React.createElement("div", {
            className: "under-wrapper",
            style: {
                marginTop: -16,
                marginLeft: -1
            }
        },
        this.props.symbol))
    }
}
/*n.d(t, "UnderArc", function () {
    return h
}),*/
/*n.d(t, "UnderArcSc", function () {
    return u
});*/
class h extends SymbolHatBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "under-arc-symbol";
        this.renderSvg = ((e, t, n) => {
            var r = SymbolArcPathInfo.getPathInfo(e, t, n, !0);
            return React.createElement("path", {
                d: r.path,
                strokeWidth: r.strokeWidth + "em",
                fill: r.fill
            })
        })
    }
    useCustomBaseLine() {
        return !1
    }
    renderComponent() {
        var e = {
            marginTop: this.isSingleTextBlockAndLowerSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.15) : "",
            height: this.getRoundEmStr(.5)
        };
        return React.createElement("over-arc", null, React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("value"), {
            borderIfEmpty: this.isSelected()
        })), React.createElement("x-symbol", {
            style: e
        },
        React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            renderSvg: this.renderSvg
        })))
    }
}
class u extends CompositeScSymbolBase {
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\underarc"
    }
    getSymbol() {
        return "⏝"
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(d, {
                    symbol: this.symbol
                })
            }
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\underparen"],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(d, {
                    symbol: this.symbol
                })
            }
        })]
    }
    toLatex(e, t, n) {
        return "\\underparen{".concat(n.toLatexFromEditor(e.elements.value, t), "}")
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
var SymbolUnderarc = new u

export { h as UnderArc }

export { u as UnderArcSc }

export default SymbolUnderarc