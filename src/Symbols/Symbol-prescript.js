import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import EditArea from '../Editor/EditArea';
import EditAreaBlock from '../Elements/EditAreaBlock';
import EditAreaLine from '../Editor/EditAreaLine';
import GetSymbolLatex from '../Latex/GetSymbolLatex';
import TopBottomEmptyCheck from '../Elements/TopBottomEmptyCheck';

/// xxx(1217) /*Symbol-prescript*/

/// n.r(t)
/*n.d(t, "PreScript", function () {
    return p
}),*/
/*n.d(t, "PreScriptSc", function () {
    return m
});*/
/// var r = n(0)/*React*/;  // 10 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
/// var s = n(21)/*EditArea*/;  // 2 times
/// var l = n(231)/*TopBottomEmptyCheck*/;  // 2 times
/// var c = n(102)/*GetSymbolLatex*/;  // 1 times
/// var d = n(12)/*BlockHelper*/;  // 4 times
/// var h = n(163)/*EditAreaBlock*/;  // 2 times
/// var u = n(112)/*EditAreaLine*/;  // 2 times
class p extends CompositeBlock {
    constructor(e) {
        super(e);
        this.containerClassName = "pre-script-symbol-container";
        this.elementLighMethodsCache = {}
    }
    useCustomBaseLine() {
        return !1
    }
    renderTop() {
        var e = this.props.data.elements.powerValue;
        if (e) {
            if (BlockHelper.isEmptyOrOneTextEditor(e)) return React.createElement(EditAreaBlock, Object.assign({
                key: "1"
            },
            this.buildLightMetadata("powerValue"), {
                border: this.isChildSelected(),
                fontSize: .7 * this.props.fontSize,
                className: "power-value",
                stripInfo: this.setStripInfo({
                    stripDown: !0
                })
            }));
            var t = BlockHelper.isSingleLineEditor(e) ? EditAreaLine : EditArea;
            return React.createElement(t, Object.assign({
                key: "1",
                borderIfEmpty: TopBottomEmptyCheck.isBothTopBottomEmpty(this.props.data.elements)
            },
            this.buildMetaDataFromName("powerValue"), {
                className: "power-value",
                fontSize: .7 * this.props.fontSize,
                noSpacingRule: !0,
                noAreaContainer: !0,
                stripInfo: this.setStripInfo({
                    stripDown: !0
                })
            }))
        }
    }
    renderBottom() {
        var e = this.props.data.elements.indexValue;
        if (e) {
            if (BlockHelper.isEmptyOrOneTextEditor(e)) return React.createElement(EditAreaBlock, Object.assign({
                key: "3"
            },
            this.buildLightMetadata("indexValue"), {
                border: this.isChildSelected(),
                fontSize: .7 * this.props.fontSize,
                className: "index-value",
                stripInfo: this.setStripInfo({
                    stripUp: !0
                })
            }));
            var t = BlockHelper.isSingleLineEditor(e) ? EditAreaLine : EditArea;
            return React.createElement(t, Object.assign({
                key: "3",
                borderIfEmpty: TopBottomEmptyCheck.isBothTopBottomEmpty(this.props.data.elements)
            },
            this.buildMetaDataFromName("indexValue"), {
                className: "index-value",
                fontSize: .7 * this.props.fontSize,
                noSpacingRule: !0,
                noAreaContainer: !0,
                stripInfo: this.setStripInfo({
                    stripUp: !0
                })
            }))
        }
    }
    renderComponent() {
        return [this.renderTop(), React.createElement("middle-base", {
            key: "2"
        },
        React.createElement("in-line", null)), this.renderBottom()]
    }
}
class m extends CompositeSymbolBase {
    constructor() {
        super(...arguments);
        this.isDynamicPowerIndexPosition = !0
    }
    getViewComponent() {
        return p
    }
    getLatexName() {
        return "\\prescript"
    }
    getModelMeta() {
        return {
            text: this.getLatexName(),
            elements: {
                powerValue: {
                    onRemove: "only"
                },
                indexValue: {
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatexName()],
            searchText: "prescript pre-script",
            description: "prescript ",
            height: 25,
            renderSymbol: () => React.createElement("div", {
                className: "icon-power-index-symbol"
            },
            React.createElement("div", {
                className: "square-up common-square-icon common-square-icon-expand"
            }), React.createElement("div", {
                className: "square-down common-square-icon common-square-icon-expand"
            }), React.createElement("div", {
                className: "align-end"
            },
            "x"))
        })
    }
    toModel() {
        return this.getModel()
    }
    toMathml(e, t) {
        return {
            type: "msubsup",
            base: {
                type: "empty"
            },
            subscript: t.generateEditor(e.elements.indexValue),
            superscript: t.generateEditor(e.elements.powerValue)
        }
    }
    toLatex(e, t, n) {
        var r = e.elements.powerValue,
        a = e.elements.indexValue,
        i = "",
        o = "";
        r && (i = n.toLatexFromEditor(r, t));
        a && (o = n.toLatexFromEditor(a, t));
        var s = {
            type: "inline-environment",
            name: "prescript",
            element: {
                type: "raw-element",
                rawText: i
            },
            element2: {
                type: "raw-element",
                rawText: o
            },
            element3: {
                type: "raw-element",
                rawText: ""
            }
        };
        return GetSymbolLatex.fromElement(s)
    }
}
var SymbolPrescript = new m

export { p as PreScript }

export { m as PreScriptSc }

export default SymbolPrescript