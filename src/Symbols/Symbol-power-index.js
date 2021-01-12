import _ from 'lodash';
import React from 'react';
// Not found 'var' for: import  from '../Editor/CheckComponent';
import BlockHelper from '../Elements/BlockHelper';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditArea from '../Editor/EditArea';
import EditAreaBlock from '../Elements/EditAreaBlock';
import EditAreaLine from '../Editor/EditAreaLine';
import TopBottomEmptyCheck from '../Elements/TopBottomEmptyCheck';

/// xxx(188) /*Symbol-power-index*/

/// n.r(t)
/*n.d(t, "PowerIndex", function () {
    return E
}),*/
/*n.d(t, "PowerIndexSc", function () {
    return v
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 10 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 8 times
/// var l = n.n(s);
/// var c = n(21)/*EditArea*/;  // 2 times
/// var d = n(29)/*CompositeBlock*/;  // 1 times
/// var h = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var u = n(12)/*BlockHelper*/;  // 4 times
/// var p = n(22)/*CheckComponent*/;  // 0 times
/// var m = n(6)/*DiagramIdHelper*/;  // 4 times
/// var f = n(163)/*EditAreaBlock*/;  // 2 times
/// var g = n(112)/*EditAreaLine*/;  // 2 times
/// var y = n(13)/*CreateEditorObject*/;  // 1 times
/// var A = n(231)/*TopBottomEmptyCheck*/;  // 3 times
class E extends CompositeBlock {
    constructor(e) {
        super(e);
        this.containerClassName = "power-index-symbol-container";
        this.elementLighMethodsCache = {}
    }
    useCustomBaseLine() {
        return !1
    }
    getCompositeBlockStyle() {
        var e = super.getCompositeBlockStyle();
        if (!this.props.data.elements.powerValue && !TopBottomEmptyCheck.isBottomEmpty(this.props.data.elements) && this.props.previousBlockInfo) {
            var t = this.props.previousBlockInfo.block;
            if (!t) return e;
            if (t.type == null && _.endsWith(t.text, "'")) return _.assignIn({},
            e, {
                marginLeft: "-0.25em"
            })
        }
        return e
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
class v extends CompositeSymbolBase {
    constructor() {
        super(...arguments);
        this.isDynamicPowerIndexPosition = !0
    }
    getViewComponent() {
        return E
    }
    getModelMeta() {
        return {
            text: "\\power-index",
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
            names: ["\\power-index"],
            searchText: "power index superscript subscript",
            description: "power index,superscript subscript",
            height: 25,
            renderSymbol: () => React.createElement("div", {
                className: "icon-power-index-symbol"
            },
            React.createElement("div", {
                className: "align-end"
            },
            "x"), React.createElement("div", {
                className: "square-up common-square-icon common-square-icon-expand"
            }), React.createElement("div", {
                className: "square-down common-square-icon common-square-icon-expand"
            }))
        })
    }
    parsePowerIndexToElements(e, t, n) {
        if (null == e) return null;
        var r = null;
        r = _.isString(t) ? CreateEditorObject.createOneTextEditor(t) : t.text ? {
            id: DiagramIdHelper.nextId(),
            lines: [{
                id: DiagramIdHelper.nextId(),
                blocks: [t]
            }]
        } : {
            id: DiagramIdHelper.nextId(),
            lines: t
        };
        "^" == e ? n.powerValue = r : n.indexValue = r
    }
    toModel(e, t, n) {
        var r = {},
        a = (n = n || [])[0],
        i = n[1];
        this.parsePowerIndexToElements(e, t, r);
        this.parsePowerIndexToElements(a, i, r);
        var o = "\\power-index";
        return null == a && (o = "^" == e ? "\\power" : "\\index"),
        {
            id: DiagramIdHelper.nextId(),
            type: "composite",
            elements: r,
            text: o
        }
    }
    isLastLatexArrPrime(e) {
        return ! (!e.latexArray || 0 === e.latexArray.length) && "'" == _.last(_.last(e.latexArray))
    }
    toMathml(e, t) {
        return {
            type: "msubsup",
            base: null,
            subscript: t.generateEditor(e.elements.indexValue),
            superscript: t.generateEditor(e.elements.powerValue)
        }
    }
    toLatex(e, t, n, r) {
        var a = e.elements.powerValue,
        i = e.elements.indexValue,
        o = "",
        s = "",
        c = "";
        if (a && (s = n.toLatexFromEditor(a, t)), i && (c = n.toLatexFromEditor(i, t)), this.isLastLatexArrPrime(r) && !_.isEmpty(s)) {
            var d = r.latexArray,
            h = d.pop().slice(0, -1);
            return d.push(h),
            o += "^{\\prime ".concat(s, "}"),
            _.isEmpty(c) || (o += "_{".concat(c, "}")),
            d.push(o),
            {
                arrStr: d
            }
        }
        return _.isEmpty(s) || (o += "^{".concat(s, "}")),
        _.isEmpty(c) || (o += "_{".concat(c, "}")),
        o
    }
}
var SymbolPowerIndex = new v

export { E as PowerIndex }

export { v as PowerIndexSc }

export default SymbolPowerIndex