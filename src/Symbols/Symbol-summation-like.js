import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CommonSquareIcon from '../Elements/CommonSquareIcon';
import SymbolIntegralBase, { SymbolIntegralBaseB } from './Symbol-integral-base';

/// xxx(104) /*Symbol-summation-like*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 1 times
/// var o = n.n(i);
/// var s = n(92)/*Symbol-integral-base*/;  // 2 times
/// var l = n(175)/*CommonSquareIcon*/;  // 1 times
var c = new class {
    getEditorStyle(e, t, n, r, i, o) {
        var s = this.rawGetEditorStyle(e, t, n, r, i, o);
        return _.assignIn({},
        s, {
            marginLeft: s.marginLeft ? "".concat(s.marginLeft, "em") : void 0,
            marginRight: s.marginRight ? "".concat(s.marginRight, "em") : void 0
        })
    }
    fromToLeft(e, t, n, r) {
        switch (e) {
        case "from":
            return {
                marginBottom: t,
                marginLeft: r
            };
        case "to":
            return {
                marginTop: n,
                marginLeft: r
            }
        }
    }
    rawGetEditorStyle(e, t, n, r, a, i) {
        switch (i) {
        case "Asana":
            return this.rawGetEditorStyleAsana(e, t, n, r, a);
        case "LatinModern":
            return this.rawGetEditorStyleLatin(e, t, n, r, a)
        }
    }
    rawGetEditorStyleAsana(e, t, n, r, a) {
        switch (r) {
        case "limit":
            switch (a) {
            case "inline":
                return this.fromToLeft(e, -.2, .07, void 0);
            case "display":
                return this.fromToLeft(e, -.45, .1, void 0)
            }
        case "non-limit":
            switch (a) {
            case "inline":
                switch (n) {
                case "\\prod":
                    case "\\coprod":
                    return this.fromToLeft(e, -.6, -.45, 1.1);
                case "\\bigcup":
                    case "\\bigcap":
                    return this.fromToLeft(e, -.6, -.45, 1)
                }
                return this.fromToLeft(e, -.6, -.45, .9);
            case "display":
                switch (n) {
                case "\\prod":
                    case "\\coprod":
                    return this.styleForDisplayNonLimit(e, 1.5, -1.2, -.55);
                case "\\bigcup":
                    case "\\bigcap":
                    return this.styleForDisplayNonLimit(e, 1.4, -1.2, -.55)
                }
                return this.styleForDisplayNonLimit(e, 1.3, -1.2, -.55)
            }
        }
    }
    rawGetEditorStyleLatin(e, t, n, r, a) {
        switch (r) {
        case "limit":
            switch (a) {
            case "inline":
                return this.fromToLeft(e, -.2, .1, void 0);
            case "display":
                return this.fromToLeft(e, -.4, .16, void 0)
            }
        case "non-limit":
            switch (a) {
            case "inline":
                switch (n) {
                case "\\sum":
                    return this.fromToLeft(e, -.6, -.4, 1.1);
                case "\\prod":
                    case "\\coprod":
                    return this.fromToLeft(e, -.6, -.4, 1)
                }
                return this.fromToLeft(e, -.6, -.4, .9);
            case "display":
                switch (n) {
                case "\\sum":
                    return this.styleForDisplayNonLimit(e, 1.6, -1.2, -.55);
                case "\\prod":
                    case "\\coprod":
                    return this.styleForDisplayNonLimit(e, 1.5, -1.2, -.55)
                }
                return this.styleForDisplayNonLimit(e, 1.35, -1.2, -.55)
            }
        }
    }
    styleForDisplayNonLimit(e, t, n, r) {
        return "from" == e ? {
            marginLeft: t,
            marginBottom: n
        } : {
            marginLeft: t,
            marginTop: r
        }
    }
}
/// d = n(16)/*ReactDOM*/,  // 1 times
/// h = n.n(d)
/// u = n(5)/*sizzle*/,  // 1 times
/// p = n.n(u);
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return f
});*/
class m extends SymbolIntegralBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "summation-like-symbol limit-type"
    }
    shoudUseEditAreaBlock() {
        return !1
    }
    getSymbol() {
        return "∑"
    }
    getSymbolClassName() {
        return ""
    }
    getEditorFromToMarginLeft() {
        return "lef-1-margin"
    }
    getPowerIndexInfo() {
        var e = ReactDOM.findDOMNode(this),
        t = jQuery(e).children("x-symbol").get(0) || e,
        n = this.getElementRect(t),
        r = .26 * n.height;
        return {
            shouldConsiderAsChar: !1,
            rect: {
                top: n.top + r,
                height: n.height - .95 * r
            }
        }
    }
    getSettingTopEm() {
        return this.isEditorEmpty(this.props.data.elements.from) ? -2.8 : -1.9
    }
    isLimitKind() {
        return null != this.props.data.isLimitKind ? !!this.props.data.isLimitKind : !this.isInlineMode()
    }
    getSumBaseEditorStyle(e) {
        var t = this.shoudUseEditAreaBlock(),
        n = this.isInlineMode(),
        r = this.isLimitKind();
        return c.getEditorStyle(e, t ? "editor-block" : "editor", this.props.data.text, r ? "limit" : "non-limit", n ? "inline" : "display", this.context.baseMathModeFontFamily)
    }
    getFromStyle() {
        var e = this.getSumBaseEditorStyle("from"),
        t = this.isInlineMode(),
        n = this.isLimitKind();
        return _.assignIn({},
        e, {
            marginBottom: this.getRoundEmStr(e.marginBottom),
            minHeight: n || t ? "" : this.getRoundEmStr(1.1)
        })
    }
    getToStyle() {
        var e = this.getSumBaseEditorStyle("to"),
        t = this.isInlineMode(),
        n = this.isLimitKind();
        return _.assignIn({},
        e, {
            marginTop: this.getRoundEmStr(e.marginTop),
            minHeight: n || t ? "" : this.getRoundEmStr(.9)
        })
    }
}
class f extends SymbolIntegralBaseB {
    getFilterTag() {
        return null
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            filterTag: this.getFilterTag(),
            height: 35,
            hasExpanded: !0,
            renderSymbol() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return React.createElement(CommonSquareIcon, {
                    symbol: this.symbol,
                    isExpanded: e
                })
            }
        })
    }
}

export { f as SymbolSummationLikeB }

export default m