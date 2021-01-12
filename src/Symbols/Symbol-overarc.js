import React from 'react';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import Svg from '../Elements/Svg';
import SymbolArcPathInfo from './SymbolArcPathInfo';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(1524) /*Symbol-overarc*/

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
        return React.createElement("div", null, React.createElement("div", {
            style: {
                marginBottom: -7
            }
        },
        this.props.symbol), React.createElement("div", {
            className: "common-big-square-icon square"
        }))
    }
}
/*n.d(t, "OverArc", function () {
    return h
}),*/
/*n.d(t, "OverArcSc", function () {
    return p
});*/
class h extends SymbolHatBase {
    constructor(e) {
        super(e);
        this.containerClassName = "over-arc-symbol";
        this.renderSvg = this.renderSvg.bind(this);
        this.getEditContentTopBottom = void 0
    }
    useCustomBaseLine() {
        return !1
    }
    renderSvg(e, t, n) {
        var r = SymbolArcPathInfo.getPathInfo(e, t, n);
        return React.createElement("path", {
            d: r.path,
            strokeWidth: r.strokeWidth + "em",
            fill: r.fill
        })
    }
    renderComponent() {
        var e = {
            display: "block",
            width: "100%",
            position: "relative",
            height: this.getRoundEmStr(.5),
            marginBottom: this.getRoundEmStr(-.15)
        };
        return [React.createElement("x-symbol", {
            key: "symbol",
            style: e
        },
        React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            style: u,
            renderSvg: this.renderSvg
        })), React.createElement("div", {
            key: "value"
        },
        React.createElement(EditArea, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            stripInfo: this.setStripInfo({
                stripUp: !0
            }),
            optimizeForOneLine: !0,
            borderIfEmpty: this.isSelected()
        })))]
    }
}
var u = {
    position: "absolute",
    left: 0,
    top: 0,
    display: "block",
    width: "100%",
    height: "100%"
};
class p extends CompositeScSymbolBase {
    constructor() {
        super(...arguments);
        this.isOverSymbol = !0
    }
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\overarc"
    }
    getSymbol() {
        return "⏜"
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(d, {
                    style: m,
                    symbol: this.symbol
                })
            }
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\overparen"],
            symbol: "⏜",
            renderSymbol() {
                return React.createElement(d, {
                    style: m,
                    symbol: this.symbol
                })
            }
        })]
    }
    toLatex(e, t, n) {
        return "\\wideparen{".concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toMathml(e, t) {
        return {
            type: "mover",
            base: t.generateEditor(e.elements.value),
            accent: !0,
            overscript: {
                type: "mo",
                value: this.getSymbol()
            }
        }
    }
}
var m = {
    margin: "auto",
    width: 12,
    fontSize: 12
};
var SymbolOverarc = new p

export { h as OverArc }

export { p as OverArcSc }

export default SymbolOverarc