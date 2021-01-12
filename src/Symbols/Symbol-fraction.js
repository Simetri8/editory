import classNames from 'classnames';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CommonBigSquare from '../Elements/CommonBigSquare';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import EditAreaLine from '../Editor/EditAreaLine';

/// xxx(1513) /*Symbol-fraction*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 8 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(21)/*EditArea*/;  // 2 times
/// var s = n(112)/*EditAreaLine*/;  // 2 times
/// var l = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var c = n(12)/*BlockHelper*/;  // 2 times
/// var d = n(14)/*classnames*/;  // 1 times
/// var h = n.n(d);
class u extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "fraction-symbol";
        this.baselineClass = ""
    }
    useCustomBaseLine() {
        return !1
    }
    getClassName() {
        return classNames("fraction-symbol", {
            smaller: "\\frac" == this.props.data.text,
            "frac-inline": this.shouldBeSmaller()
        })
    }
    shouldBeSmaller() {
        if ("\\tfrac" != this.props.data.text) if ("\\cfrac" != this.props.data.text && "\\dfrac" != this.props.data.text) if (! (this.isFirstMathModeLevel() && this.isInlineMode() && "\\frac" == this.props.data.text)) if ("\\frac" == this.props.data.text) return this.getFracLevel() > 0;
        return false
    }
    renderComponent() {
        var e = !1,
        t = null,
        n = {
            marginBottom: this.getRoundEmStr(-.5)
        },
        r = {
            marginTop: this.getRoundEmStr(-.41)
        };
        if (this.shouldBeSmaller()) {
            var i = .75 * this.props.fontSize;
            var e = !0;
            var t = {
                verticalAlign: "0.35em"
            };
            var n = {
                marginBottom: this.getRoundEmStr(-.4),
                paddingTop: this.getRoundEmStr(.05)
            };
            var r = {
                marginTop: this.getRoundEmStr(-.57),
                marginBottom: this.getRoundEmStr(-.05)
            }
        } else i = this.props.fontSize;
        var l = BlockHelper.isSingleLineEditor(this.props.data.elements.value) ? EditAreaLine : EditArea,
        d = BlockHelper.isSingleLineEditor(this.props.data.elements.sub1) ? EditAreaLine : EditArea;
        return [React.createElement(l, Object.assign({
            key: "1"
        },
        this.buildMetaDataFromName("value"), {
            style: n,
            className: "frac-edit-area enumerator",
            showBorder: this.isDirectAndChildSelected() && "value" == this.props.selected.key,
            fontSize: i,
            fracLevel: this.getFracLevel() + 1,
            noAreaContainer: !0,
            noSpacingRule: e,
            stripInfo: this.setStripInfo({
                stripDown: !1,
                stripUp: !0
            })
        })), React.createElement("div", {
            key: "2",
            className: "frac-line"
        },
        React.createElement("in-line", {
            style: t
        })), React.createElement(d, Object.assign({
            key: "3"
        },
        this.buildMetaDataFromName("sub1"), {
            style: r,
            className: "frac-edit-area denominator",
            showBorder: this.isDirectAndChildSelected() && "sub1" == this.props.selected.key,
            fontSize: i,
            fracLevel: this.getFracLevel() + 1,
            noAreaContainer: !0,
            noSpacingRule: e,
            stripInfo: this.setStripInfo({
                stripDown: !0,
                stripUp: !1
            })
        }))]
    }
}
/// var p = n(230)/*CommonBigSquare*/,  // 4 times
/// m = n(13)/*CreateEditorObject*/;  // 2 times
var SymbolFraction = new class extends CompositeSymbolBase {
    getViewComponent() {
        return u
    }
    getModel(e) {
        var t = super.getModel(e);
        return e && "\\cfrac" == e.names[0] && (t.text = "\\cfrac"),
        e && "\\dfrac" == e.names[0] && (t.text = "\\dfrac"),
        e && "\\tfrac" == e.names[0] && (t.text = "\\tfrac"),
        t
    }
    getModelMeta() {
        return {
            text:
            "\\frac",
            keyInsertOnSelection: "value",
            elements: {
                value: {
                    onRemove: "all"
                },
                sub1: {
                    onRemove: "all"
                }
            }
        }
    }
    getSymbolInfo() {
        return [{
            type: "composite",
            names: ["\\frac"],
            description: "fraction",
            filterTag: "fraction",
            height: 30,
            renderSymbol: () => React.createElement(CommonBigSquare, null)
        },
        {
            type: "composite",
            names: ["\\cfrac"],
            filterTag: "fraction",
            description: "Output fractions with the same size characters",
            height: 30,
            renderSymbol: () => React.createElement(CommonBigSquare, null)
        },
        {
            type: "composite",
            names: ["\\dfrac"],
            filterTag: "fraction",
            description: "Normal fractions font in \\inline-math",
            height: 30,
            renderSymbol: () => React.createElement(CommonBigSquare, null)
        },
        {
            type: "composite",
            names: ["\\tfrac"],
            filterTag: "fraction",
            description: "Smaller fractions font in \\math-container",
            height: 30,
            renderSymbol: () => React.createElement(CommonBigSquare, null)
        }]
    }
    toLatex(e, t, n) {
        return "".concat(e.text, "{").concat(n.toLatexFromEditor(e.elements.value, t), "}{").concat(n.toLatexFromEditor(e.elements.sub1, t), "}")
    }
    toMathml(e, t) {
        var n = {
            type: "mfrac",
            numerator: t.generateEditor(e.elements.value),
            denominator: t.generateEditor(e.elements.sub1)
        };
        return "\\dfrac" == e.text || "\\cfrac" == e.text ? {
            type: "mstyle",
            displaystyle: !0,
            scriptlevel: "0",
            element: n
        } : "\\tfrac" == e.text ? {
            type: "mstyle",
            displaystyle: !1,
            scriptlevel: "0",
            element: n
        } : n
    }
    toModel(e, t, n, r) {
        var a = this.getModel();
        return a.text = e,
        a.elements.value = CreateEditorObject.createEditorWith(n),
        a.elements.sub1 = CreateEditorObject.createEditorWith(r),
        a
    }
}

export default SymbolFraction