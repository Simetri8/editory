import React from 'react';
import { DOMHelperB } from '../Elements/DOMHelper';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import IconHat from '../Elements/IconHat';
import Svg from '../Elements/Svg';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(536) /*Symbol-wide-hat*/

/// n.r(t)
/*n.d(t, "WideHat", function () {
    return h
}),*/
/*n.d(t, "WideHatSc", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(125)/*Symbol-hat-base*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var l = n(82)/*Svg*/;  // 1 times
/// var c = n(349)/*IconHat*/;  // 1 times
/// var d = n(4)/*DOMHelper*/;  // 1 times
class h extends SymbolHatBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "wide-hat-symbol";
        this.renderSvg = ((e, t, n) => {
            var r = {
                left: 0,
                top: n / 18,
                right: e - 0,
                bottom: t - n / 18
            };
            r = this.narrowHatHeight(r);
            var i = "".concat(r.left.toFixed(2), ",").concat(r.bottom.toFixed(2), " ").concat(((r.right + r.left) / 2).toFixed(2), ",").concat(r.top.toFixed(2), " ").concat(r.right.toFixed(2), ",").concat(r.bottom.toFixed(2));
            return React.createElement("polyline", {
                points: i,
                strokeWidth: Object(DOMHelperB)(n),
                fill: "none",
                strokeLinejoin: "bevel"
            })
        })
    }
    narrowHatHeight(e) {
        return (e.right - e.left) / (e.bottom - e.top) < 3 && (e.top = e.bottom - (e.right - e.left) / 3),
        e
    }
    getSymbolStyle() {
        return this.isSingleTextBlockLeftUpperSign(this.props.data.elements.value) ? p : this.isSingleTextBlockRightUpperSign(this.props.data.elements.value) ? m : f
    }
    renderComponent() {
        var e = {
            display: "block",
            width: "100%",
            position: "relative",
            height: this.getRoundEmStr(.5),
            marginBottom: this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.4) : this.getRoundEmStr(-.2)
        };
        return [React.createElement("x-symbol", {
            key: "symbol",
            style: e
        },
        React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            style: this.getSymbolStyle(),
            renderSvg: this.renderSvg,
            changedData: this.props.data,
            dimensionChangedInStyle: !0
        })), React.createElement(EditArea, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            style: {
                display: "inline-flex"
            },
            optimizeForOneLine: !0,
            borderIfEmpty: this.isSelected()
        }))]
    }
}
class u extends CompositeScSymbolBase {
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\widehat"
    }
    getSymbol() {
        return "^"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconHat, {
                    symbol: this.symbol
                })
            }
        })
    }
    toLatex(e, t, n) {
        var r = "widehat";
        return this.isEmptyOrOneCharEditor(e.elements.value) && (r = "hat"),
        "\\".concat(r, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
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
var p = {
    position: "absolute",
    left: 0,
    top: 0,
    display: "block",
    height: "100%",
    transform: "translate(-0.04em,0)",
    width: "0.4em",
    overflow: "visible"
},
m = {
    position: "absolute",
    left: 0,
    top: 0,
    display: "block",
    height: "100%",
    transform: "translate(0.2em,0)",
    width: "0.4em",
    overflow: "visible"
},
f = {
    position: "absolute",
    left: 0,
    top: 0,
    display: "block",
    width: "100%",
    height: "100%",
    overflow: "visible"
};
var SymbolWideHat = new u

export { h as WideHat }

export { u as WideHatSc }

export default SymbolWideHat