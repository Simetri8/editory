import React from 'react';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';

/// xxx(1514) /*Symbol-overunderset*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 10 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 3 times
/// var o = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
class l extends React.Component {
    render() {
        return React.createElement("div", {
            className: "stackrel-icon"
        },
        React.createElement("div", {
            className: "common-square-icon common-square-icon-expand"
        }), React.createElement("div", {
            className: "common-big-square-icon distance"
        }), React.createElement("div", {
            className: "common-square-icon common-square-icon-expand distance"
        }))
    }
}
/// var c = n(13)/*CreateEditorObject*/;  // 2 times
/*n.d(t, "OverUnderSetSc", function () {
    return h
});*/
class d extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "over-under-set-symbol"
    }
    useCustomBaseLine() {
        return !1
    }
    renderComponent() {
        return [React.createElement(EditArea, Object.assign({
            key: "top",
            className: "top center"
        },
        this.buildMetaDataFromName("sub1"), {
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            stripInfo: this.setStripInfo({
                stripDown: !0
            })
        })), React.createElement("div", {
            style: {
                clear: "both"
            },
            key: "value"
        },
        React.createElement(EditArea, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            className: "middle center",
            optimizeForOneLine: !0,
            stripInfo: this.setStripInfo({
                stripDown: !0,
                stripUp: !0
            })
        }))), React.createElement(EditArea, Object.assign({
            key: "bottom",
            className: "bottom center"
        },
        this.buildMetaDataFromName("sub2"), {
            showBorder: !1,
            noSpacingRule: !0,
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            stripInfo: this.setStripInfo({
                stripUp: !0
            })
        }))]
    }
}
class h extends CompositeSymbolBase {
    getViewComponent() {
        return d
    }
    getLatextName() {
        return "\\overunderset"
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {
                value: {
                    onRemove: "all"
                },
                sub1: {
                    onRemove: "all"
                },
                sub2: {
                    onRemove: "all"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            height: 30,
            renderSymbol: () => React.createElement(l, {
                isUnder: !1
            })
        })
    }
    toLatex(e, t, n) {
        return "\\underset{".concat(n.toLatexFromEditor(e.elements.sub2, t), "}{\\overset{").concat(n.toLatexFromEditor(e.elements.sub1, t), "}{").concat(n.toLatexFromEditor(e.elements.value, t), "}}")
    }
    toModel(e, t, n, r) {
        var a = this.getModel();
        return a.elements.sub1 = CreateEditorObject.createEditorWith(n),
        a.elements.value = CreateEditorObject.createEditorWith(r),
        a
    }
    toMathml(e, t) {
        return {
            type: "munderover",
            base: t.generateEditor(e.elements.value),
            overscript: t.generateEditor(e.elements.sub1),
            underscript: t.generateEditor(e.elements.sub2)
        }
    }
}
var SymbolOverunderset = new h

export { h as OverUnderSetSc }

export default SymbolOverunderset