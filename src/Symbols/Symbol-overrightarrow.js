import React from 'react';
import IconOver from '../Elements/Icon-Over';
import Svg from '../Elements/Svg';
import SvgCreator from '../Editor/SvgCreator';
import SymbolUnknown, { SymbolUnknownB } from './Symbol-unknown';

/// xxx(1259) /*Symbol-overrightarrow*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(128)/*SvgCreator*/;  // 2 times
/// var o = n(82)/*Svg*/;  // 1 times
/// var s = n(111)/*Icon-Over*/;  // 2 times
/// var l = n(253)/*Symbol-unknown*/;  // 2 times
var c = new SvgCreator;
c.push("M 0 217");
c.push("l -206 -217");
c.push("l -32 34");
c.push("l 126 152");
c.push("h -10");
c.push("v 59");
c.push("h 10");
c.push("l -126 152");
c.push("l 32 34");
var d = 1e3;
function h(e, t, n, r) {
    var o = (e || r) / d,
    s = c.scale(o, o).shift(t, 0),
    l = new SvgCreator,
    h = Math.max(0, t / o - 110);
    l.pushArr(["M 0 242", "h ".concat(h, " "), "v -59", "h ".concat(-h)]);
    var u = l.scale(o, o);
    return [React.createElement("path", {
        key: "0",
        d: "".concat(s.path(), " z ").concat(u.path(), " z"),
        stroke: "none"
    })]
}
var u = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
};
class p extends SymbolUnknown {
    getArrowStyle() {
        return {
            height: this.getRoundEmStr(.5),
            marginBottom: this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.52) : this.getRoundEmStr(-.35)
        }
    }
    getFontSizeForArrow() {
        if (this.isEmptyOrOneChar(this.props.data.elements.value)) return.9 * this.getFontSizePixel()
    }
    renderArrow() {
        return React.createElement("arrow-symbol", {
            key: "arrow",
            style: this.getArrowStyle()
        },
        React.createElement(Svg, {
            fixedContextHandler: this.context.fixedContextHandler,
            style: u,
            renderSvg: h.bind(this, this.getFontSizeForArrow()),
            changedData: this.props.data.elements.value
        }))
    }
}
var SymbolOverrightarrow = new class extends SymbolUnknownB {
    getViewComponent() {
        return p
    }
    getLatextName() {
        return "\\overrightarrow"
    }
    getSymbol() {
        return "→"
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    symbol: this.symbol,
                    height: 10
                })
            }
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\vec"],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    symbol: this.symbol,
                    height: 10
                })
            }
        })]
    }
    toLatex(e, t, n) {
        var r = "overrightarrow";
        return this.isEmptyOrOneCharEditor(e.elements.value) && (r = "vec"),
        "\\".concat(r, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
}

export default SymbolOverrightarrow