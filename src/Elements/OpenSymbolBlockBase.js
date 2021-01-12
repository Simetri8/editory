import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import BracketHelper from '../Editor/BracketHelper';
import CompositeBlock from '../Mathcha/CompositeBlock';
import StyleHelper from '../Mathcha/StyleHelper';
import VComposedSymbol from './VComposedSymbol';

/// xxx(335) /*OpenSymbolBlockBase*/

/*n.d(t, "a", function () {
    return m
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
/// var s = n(14)/*classnames*/;  // 1 times
/// var l = n.n(s);
/// var c = n(29)/*CompositeBlock*/;  // 1 times
/// var d = n(152)/*BracketHelper*/;  // 2 times
/// var h = n(249)/*VComposedSymbol*/;  // 1 times
/// var u = n(18)/*StyleHelper*/;  // 1 times
var p = {
    heightTop: null,
    heightBottom: null,
    symmetric: null,
    hiddenSpanAlignSelf: null,
    hiddenSpanMarginTop: null,
    fontSize: null,
    fontSizeEm: null,
    height: null,
    calculatedHalfTop: null,
    calculatedHalfBottom: null
};
class m extends CompositeBlock {
    constructor(e) {
        super(e);
        this.handleRef = (e => {
            this.ref = e;
            e && (e.reactInstance = this)
        });
        this.cacheState = p;
        this.state = this.cacheState
    }
    shouldComponentUpdate(e, t) {
        return e.data != this.props.data || this.state.heightTop != t.heightTop || this.state.heightBottom != t.heightBottom || this.state.symmetric != t.symmetric
    }
    getVerticalInfo() {
        return null == this.cacheState.heightBottom ? null : this.cacheState.symmetric ? {
            heightTop: Math.max(this.cacheState.calculatedHalfTop, this.cacheState.calculatedHalfBottom) + this.getFontSizePixel() / 3.5,
            heightBottom: Math.max(this.cacheState.calculatedHalfTop, this.cacheState.calculatedHalfBottom) - this.getFontSizePixel() / 1.8
        } : {
            heightTop: this.cacheState.calculatedHalfTop,
            heightBottom: this.cacheState.calculatedHalfBottom
        }
    }
    setHeightInfo(e, t, n, r) {
        if (e = this.getUnscaledValue(e), t = this.getUnscaledValue(t), this.cacheState.heightTop != e || this.cacheState.heightBottom != t || this.cacheState.symmetric != r) {
            var a, i, o, s, l;
            if (r) {
                i = 0;
                o = "";
                var c = BracketHelper.getSymmetricBracketHeightInfo(e, t, n);
                s = c.halfTop;
                l = c.halfBottom;
                a = 2 * Math.max(s - n / 10, l + n / 10)
            } else {
                i = Math.round(e - 1.05 * n) / n + "em";
                o = "flex-start";
                a = e + t;
            }
            var h = BracketHelper.fontSizeEmByHeight(a, n, this.delimiter);
            if (!s) {
                s = e;
                l = t
            };
            this.cacheState = {
                hiddenSpanMarginTop: i,
                hiddenSpanAlignSelf: o,
                calculatedHalfTop: s,
                calculatedHalfBottom: l,
                symmetric: r,
                fontSizeEm: h,
                fontSize: n,
                height: Math.ceil(a) / n + "em",
                heightTop: e,
                heightBottom: t
            }
        }
    }
    flushUpdate() {
        this.state != this.cacheState && this.setState(this.cacheState)
    }
    clearCustomHeight() {
        null == this.cacheState.heightTop && null == this.cacheState.heightBottom && null == this.cacheState.symmetric || (this.cacheState = p)
    }
    renderNormal() {
        return React.createElement("bracket-span", null, this.bracketText)
    }
    renderComposed() {
        return React.createElement(VComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            baseMathModeFontFamily: this.context.baseMathModeFontFamily,
            getReverseScale: this.getReverseScale,
            delimiter: this.delimiter,
            fontSize: this.getFontSizePixel(),
            fontSizeEm: this.cacheState.fontSizeEm
        })
    }
    isNormalBracket() {
        return !this.state.heightTop
    }
    renderBracket() {
        return this.isNormalBracket() ? (this.props.data.___normal = !0, this.renderNormal()) : (this.props.data.___normal = !1, this.renderComposed())
    }
    renderHiddenSpan() {
        var e = {};
        return null !== this.hiddenSpanMarginTop && (e.marginTop = this.state.hiddenSpanMarginTop, e.alignSelf = this.state.hiddenSpanAlignSelf),
        React.createElement("hidden-span", {
            style: e
        },
        this.bracketText)
    }
    renderComponent() {}
    render() {
        var e = StyleHelper.getHtmlFromStyle(this.props.data, this.context.baseMathModeFontFamily);
        null !== this.state.height && (e = _.assignIn({},
        e, {
            height: this.state.height
        }));
        var t = classNames(this.bracketClassName, {
            normal: this.isNormalBracket()
        });
        return React.createElement(this.tagName, {
            ref: this.handleRef,
            className: t,
            type: this.bracketType,
            style: e
        },
        this.renderHiddenSpan(), this.renderBracket())
    }
}

export default m