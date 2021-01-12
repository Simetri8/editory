import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import CursorPositionHelper from '../Editor/CursorPositionHelper';
import DOMHelper from './DOMHelper';
import StyleHelper from '../Mathcha/StyleHelper';
import SymbolElementNames from '../Symbols/SymbolElementNames';
import TextBlockMetricInfo from '../Editor/TextBlockMetricInfo';
import TextUtils from '../Editor/TextUtils';

/// xxx(163) /*EditAreaBlock*/

/*n.d(t, "a", function () {
    return y
});*/
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 3 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var c = n(18)/*StyleHelper*/;  // 1 times
/// var d = n(36)/*TextUtils*/;  // 1 times
/// var h = n(159)/*TextBlockMetricInfo*/;  // 1 times
/// var u = n(4)/*DOMHelper*/;  // 1 times
/// var p = n(97)/*SymbolElementNames*/;  // 2 times
/// var m = n(14)/*classnames*/;  // 1 times
/// var f = n.n(m);
/// var g = n(49)/*CursorPositionHelper*/;  // 1 times
/// var pte = n(23)/*PropTypesExporter*/,  // 3 times
/// propTypes = n.n(pte);
class y extends React.Component {
    constructor() {
        super(...arguments);
        this.handleRef = (e => {
            if (e) {
                this.editor = e;
                e.reactInstance = this
            }
        })
    }
    getKeyName() {
        return this.props.keyName
    }
    getModel() {
        return this.props.model
    }
    getClassName() {
        return classNames(this.props.className, {
            selected: !!this.props.selected
        })
    }
    render() {
        var e = this.props.model.lines[0].blocks[0];
        if (!e || !e.text) {
            var t = _.assignIn({},
            this.props.style || {},
            {
                display: "inline-block",
                height: "1.2em",
                width: "0.5em",
                verticalAlign: "-0.17em",
                outline: this.props.selected || this.props.border ? this.context.fixedContextHandler.getOutlineSelected() : ""
            });
            return React.createElement("editarea-block", {
                ref: this.handleRef,
                class: this.getClassName(),
                style: t
            })
        }
        var n = this.buildStyleInfo(e, this.context.baseMathModeFontFamily),
        r = n.marginBottom,
        i = n.marginTop,
        s = n.style;
        return React.createElement("editarea-block", {
            ref: this.handleRef,
            "data-mgTop": i,
            "data-mgBottom": r,
            style: s,
            class: this.getClassName()
        },
        e.text)
    }
    selectCursorFromPosition(e, t, n, r) {
        var a = CursorPositionHelper.buildCursorPosition(this.getHtmlEditor(), e, {
            left: t,
            top: n
        });
        if (!a) return null;
        this.select(a, r)
    }
    getHtmlEditor() {
        return ReactDOM.findDOMNode(this)
    }
    select(e, t) {
        var n = {
            cursorContext: {
                direction: e.direction,
                maxRelativeXAxisPosition: e.maxRelativeXAxisPosition,
                htmlEditor: this.editor,
                htmLine: this.editor,
                positionOnRange: e.positionOnRange
            },
            isExtendingSelection: !!t
        };
        this.props.onSelectedChanged({
            lineIndex: e.lineIndex,
            charIndex: e.charIndex
        },
        n)
    }
    buildStyleInfo(e, t) {
        var n = TextUtils.getUnistring(e),
        r = TextBlockMetricInfo.fillMetricsForTextBlock(n),
        i = StyleHelper.getHtmlFromStyle(e, t) || {},
        o = 0,
        s = 0;
        if (i = _.assignIn({},
        i, this.props.style || {},
        {
            outline: this.props.selected ? this.context.fixedContextHandler.getOutlineSelected() : ""
        }), this.props.stripInfo) {
            var l = this.props.stripInfo;
            o = l.stripUp && !r.haveUpperChar ? this.getRoundEm(SymbolElementNames.upperSmallMarginTopEm) : 0;
            s = l.stripDown && !r.haveLowerChar ? this.getRoundEm(SymbolElementNames.lowerSmallMarginBottomEm) : 0;
            this.mergeMargin(i, "marginTop", o);
            this.mergeMargin(i, "marginBottom", s)
        }
        return {
            marginTop: o,
            marginBottom: s,
            style: i
        }
    }
    mergeMargin(e, t, n) {
        this.props.takeHeightIntoAccount && "marginTop" == t ? e[t] = Number.parseFloat((e[t] || "0").toString()) + n + "em" : e[t] = Number.parseFloat((e[t] || "0").toString()) / (this.props.fontScale || 1) + n + "em"
    }
    getFontSizePixel() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        return this.context.mathFontSizeBase * this.props.fontSize * e
    }
    getRoundEm(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return DOMHelper.getEmRound(e, this.getFontSizePixel(t))
    }
}
y.contextTypes = {
    mathFontSizeBase: PropTypes.any,
    baseMathModeFontFamily: PropTypes.any,
    fixedContextHandler: PropTypes.any
}

export default y