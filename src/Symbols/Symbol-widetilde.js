import React from 'react';
import { DOMHelperB } from '../Elements/DOMHelper';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import IconOver from '../Elements/Icon-Over';
import Svg from '../Elements/Svg';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(537) /*Symbol-widetilde*/

/// n.r(t)
/*n.d(t, "WideTilde", function () {
    return h
}),*/
/*n.d(t, "WideTildeSc", function () {
    return p
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(125)/*Symbol-hat-base*/;  // 1 times
/// var s = n(4)/*DOMHelper*/;  // 1 times
/// var l = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var c = n(82)/*Svg*/;  // 1 times
/// var d = n(111)/*Icon-Over*/;  // 1 times
class h extends SymbolHatBase {
    constructor(e) {
        super(e);
        this.renderSvg = ((e, t, n) => {
            var r = {
                left: 0,
                top: n / 18,
                right: e - 0,
                bottom: Math.max(Math.min(e / 4, t / 3), n / 9) + n / 18
            },
            i = {
                x: (r = this.translateToBottom(r, t, n)).left,
                y: r.bottom
            },
            o = {
                x: (r.right + r.left) / 16,
                y: r.top
            },
            l = {
                x: (r.right + r.left) / 4,
                y: r.top
            },
            c = {
                x: (r.right + r.left) / 2,
                y: (r.bottom - r.top) / 4 * 3 + r.top
            },
            d = {
                x: r.left + (r.right - r.left) / 16 * 15,
                y: r.top + (r.bottom - r.top) / 2
            },
            h = {
                x: r.right,
                y: r.top
            },
            u = "M".concat(i.x.toFixed(2), ",").concat(i.y.toFixed(2)) + " " + "C ".concat(o.x.toFixed(2), " ").concat(o.y.toFixed(2), ",").concat(l.x.toFixed(2), " ").concat(l.y.toFixed(2), ",").concat(c.x.toFixed(2), " ").concat(c.y.toFixed(2), " ") + " " + "S ".concat(d.x.toFixed(2), " ").concat(d.y.toFixed(2), ",").concat(h.x.toFixed(2), " ").concat(h.y.toFixed(2));
            return React.createElement("path", {
                d: u,
                strokeWidth: Object(DOMHelperB)(n),
                fill: "none"
            })
        });
        this.containerClassName = "wide-tilde-symbol"
    }
    translateToBottom(e, t, n) {
        var r = Math.max(t - e.bottom - n / 18, 0);
        return e.bottom += r,
        e.top += r,
        e
    }
    renderComponent() {
        var e = {
            display: "block",
            width: "100%",
            position: "relative",
            height: this.getRoundEmStr(.5),
            marginBottom: this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.3) : this.getRoundEmStr(-.1)
        };
        return [React.createElement("x-symbol", {
            key: "symbol",
            style: e
        },
        React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            style: u,
            renderSvg: this.renderSvg
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
var u = {
    position: "absolute",
    left: 0,
    top: 0,
    display: "block",
    width: "100%",
    height: "100%"
};
class p extends CompositeScSymbolBase {
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\widetilde"
    }
    getSymbol() {
        return "~"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    symbol: this.symbol
                })
            }
        })
    }
    toLatex(e, t, n) {
        var r = "widetilde";
        return this.isEmptyOrOneCharEditor(e.elements.value) && (r = "tilde"),
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
var SymbolWidetilde = new p

export { h as WideTilde }

export { p as WideTildeSc }

export default SymbolWidetilde