import _ from 'lodash';
import React from 'react';
import DOMHelper from '../Elements/DOMHelper';
import FontList from '../Font/FontList';
import IconLim from '../Elements/IconLim';
import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(120) /*Symbol-lim-like*/

/*n.d(t, "a", function () {
    return h
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 1 times
/// var o = n.n(i);
/// var s = n(92)/*Symbol-integral-base*/;  // 2 times
/// var l = n(4)/*DOMHelper*/;  // 4 times
/// var c = n(240)/*IconLim*/;  // 1 times
/// var d = n(48)/*FontList*/;  // 1 times
class h extends SymbolIntegralBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "lim-like-symbol limit-type"
    }
    shoudUseEditAreaBlock() {
        return !1
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.customDataStr != this.props.customDataStr
    }
    useCustomBaseLine() {
        return !1
    }
    getSymbol() {
        return "∑"
    }
    getClassName() {
        return super.getClassName() + (this.props.customDataStr ? " " + this.props.customDataStr : "")
    }
    getSymbolClassName() {
        return ""
    }
    isLimitKind() {
        return null != this.props.data.isLimitKind ? !!this.props.data.isLimitKind : !this.isInlineMode()
    }
    getFromStyle() {
        return {
            marginBottom: this.isLimitKind() ? DOMHelper.getEmRound(-.35, this.getFontSizePixel()) + "em" : DOMHelper.getEmRound(-.6, this.getFontSizePixel()) + "em"
        }
    }
    getToStyle() {
        return {
            marginTop: this.isLimitKind() ? DOMHelper.getEmRound(-.18, this.getFontSizePixel()) + "em" : DOMHelper.getEmRound(-.63, this.getFontSizePixel()) + "em"
        }
    }
    getSymbolFontFamily() {
        return FontList.mathFontFamiltyFromKey("\\mathrm", this.context.baseMathModeFontFamily)
    }
}
class u extends SymbolIntegralBaseB {
    constructor() {
        super();
        this.isOperatorName = !0
    }
    getModel(e) {
        var t = super.getModel(_.assignIn({},
        e, {
            isExpanded: !0
        }));
        return t.elements.from && delete t.elements.from,
        t
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            height: 30,
            renderSymbol() {
                return React.createElement(IconLim, {
                    symbol: this.symbol,
                    isExpanded: !0
                })
            }
        })
    }
    toMathml(e, t) {
        return e.elements.from || e.elements.to ? {
            type: "munderover",
            base: {
                type: "mo",
                value: this.getSymbol(),
                movablelimit: !0
            },
            overscript: t.generateEditor(e.elements.from),
            underscript: t.generateEditor(e.elements.to)
        } : {
            type: "mo",
            value: this.getSymbol(),
            largeop: !0
        }
    }
}

export { u as SymbolLimLikeB }

export default h