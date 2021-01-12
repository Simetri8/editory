import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import EditAreaLine from '../Editor/EditAreaLine';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(1512) /*Symbol-sqrt*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 14 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(3)/*_.assignIn*/;  // 1 times
/// var s = n.n(o);
/// var l = n(5)/*sizzle*/;  // 4 times
/// var c = n.n(l);
/// var d = n(2)/*lodash*/;  // 5 times
/// var h = n.n(d);
/// var u = n(21)/*EditArea*/;  // 2 times
/// var p = n(112)/*EditAreaLine*/;  // 1 times
/// var m = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var f = n(4)/*DOMHelper*/;  // 1 times
/// var g = n(7)/*PropUpdateHelper*/;  // 2 times
/// var y = n(12)/*BlockHelper*/;  // 1 times
/// var E = n(76)/*MobileTabletClasses*/;  // 1 times
/// var v = n(13)/*CreateEditorObject*/;  // 2 times
var A = new class {
    constructor() {
        this.arr = [16, 596, 218, 488, 425, 927, 745, 23, 1590, 23, 1590, 71, 789, 71, 418, 1156, 141, 576, 29, 618];
        this.points = _.chunk(this.arr, 2).map((e) => {
            return {
                x: e[0],
                y: e[1]
            }
        })
    }
    getPoints(e, t, n, r) {
        var a = 18 / e * 43;
        var i = this.toScaledPoints(a);
        i = this.translateToCorrectPosition(i, e, t);
        i = this.extendTopLineToPositionX(i, r);
        i = this.extendTopLineToPositionY(i);
        i = this.calculateValleyPoint(i);
        return i;
    }
    calculateValleyPoint(e) {
        var t = Math.abs(e[4].y - e[5].y);
        var n = this.findLineEquation(e[1], e[2]);
        var r = this.findLineEquation(e[6], e[7]);
        r.b -= t * Math.sqrt(1 + Math.pow(r.a, 2));
        var a = n.a - r.a;
        var i = (r.b - n.b) / a;
        var o = this.findPointYByX(i, n);
        e[2] = {
            x: i,
            y: o
        };
        return e
    }
    findLineEquation(e, t) {
        var n = (t.y - e.y) / (t.x - e.x);
        return {
            a: n,
            b: e.y - n * e.x
        }
    }
    findPointYByX(e, t) {
        return t.a * e + t.b
    }
    extendTopLineToPositionY(e) {
        var t = e[5].y - e[4].y;
        e[3].y = 0;
        e[4].y = 0;
        e[5].y = t;
        e[6].y = t;
        return e
    }
    extendTopLineToPositionX(e, t) {
        e[4].x = t;
        e[5].x = t;
        return e
    }
    toScaledPoints(e) {
        return _.map(this.points, (t) => {
            return {
                x: t.x / e,
                y: t.y / e
            }
        })
    }
    translateToCorrectPosition(e, t, n) {
        var r = _.maxBy(e, (e) => {
            return e.y
        }).y;
        var a = t / 18 / 5;
        return _.map(e, (e) => {
            return {
                x: e.x,
                y: e.y - r + n + a
            }
        })
    }
};
class S extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "sqrt-symbol";
        this.calculateSqrtSymbol = () => {
            var e = this.getFontSizePixel();
            var t = A.getPoints(e, this.getElementHeight(this.sqrtEdit), e, this.getElementRect(this.sqrtEdit).width);
            var n = _.map(t, (e) => {
                return e.x + "," + e.y
            }).join(" ");
            jQuery(this.svgPolygon).attr("points", n);
            this.calculateRightTranslate(e)
        }
    }
    getEditContentTopBottom() {
        return this.getElementRect(jQuery(this.getRootDom()).children("sqrt-edit").get(0))
    }
    useCustomBaseLine() {
        return false
    }
    getPowerIndexInfo() {
        return {
            rect: this.getElementRect(this.sqrtEdit),
            shouldConsiderAsChar: false
        }
    }
    calculateSqrtPaddingTop() {
        return this.getRoundEmStr(.25)
    }
    calculateEditMarginTop() {
        return this.getRoundEmStr(.1)
    }
    isSqrtTopEmpty() {
        return this.isEditorEmpty(this.props.data.elements.sub1)
    }
    renderSetting() {
        if (!this.isSelectModeOnly()) {
            var e = {
                transform: MobileTabletClasses.getSettingScaleTransform()
            };
            if (!this.props.data.elements.sub1 && this.isDirectSelectedNoSelectionMode()) return React.createElement("x-add", {
                class: "no-print",
                key: "setting",
                style: e,
                onMouseDown: (e) => {
                    this.onSettingClick(e)
                }
            },
            React.createElement("i", {
                className: "fa fa-plus",
                "aria-hidden": "true"
            }));
            else return void 0
        }
    }
    getCompositeBlockStyle() {
        var e = super.getCompositeBlockStyle();
        return _.assignIn({},
        e, {
            paddingTop: this.calculateSqrtPaddingTop()
        })
    }
    afterReactRenderWhenDataChanged(e, t) {
        super.afterReactRenderWhenDataChanged(e, t);
        this.context.fixedContextHandler.getBatchUpdater().push(this.calculateSqrtSymbol, this)
    }
    calculateRightTranslate(e) {
        if (this.props.data.elements.sub1) {
            var t = DOMHelper.getElementHeight(this.sqrtEdit);
            var n = -.75;
            n = n + Math.min(.25, (t - e) / e / 8);
            jQuery(this.sqrtTop).css("margin-right", "".concat(n, "em"));
            jQuery(this.sqrtTop).css("min-width", "".concat(-n, "em"))
        }
    }
    onSettingClick(e) {
        e.stopPropagation();
        e.preventDefault();
        var t = PropUpdateHelper.set(this.props.data.elements, "sub1", CreateEditorObject.createEmptyEditor());
        this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "elements", t));
        this.selectElement("sub1")
    }
    getSympol() {
        return "\u221a"
    }
    renderTop() {
        if (this.props.data.elements.sub1) return React.createElement("sqrt-top", {
            key: "top",
            ref: this.getCachedRefMethod("sqrtTop", (e) => {
                return this.sqrtTop = e
            })
        },
        React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("sub1"), {
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: true,
            noSpacingRule: true,
            stripInfo: this.setStripInfo({
                stripDown: true,
                stripUp: true
            })
        })))
    }
    renderComponent() {
        var e = BlockHelper.isSingleLineEditor(this.props.data.elements.value) ? EditAreaLine : EditArea;
        return [this.renderTop(), React.createElement("sqrt-edit", {
            key: "edit",
            ref: this.getCachedRefMethod("sqrtEdit", (e) => {
                return this.sqrtEdit = e
            })
        },
        React.createElement(e, Object.assign({
            className: "edit-area",
            style: {
                marginTop: this.calculateEditMarginTop()
            }
        },
        this.buildMetaDataFromName("value"), {
            optimizeForOneLine: true
        })), React.createElement("sqrt-symbol-line", null, React.createElement("svg", {
            style: {
                stroke: "none"
            }
        },
        React.createElement("polygon", {
            ref: this.getCachedRefMethod("svgPolygon", (e) => {
                return this.svgPolygon = e
            }),
            points: ""
        })))), this.renderSetting()]
    }
}
var SymbolSqrt = new class extends CompositeSymbolBase {
    getViewComponent() {
        return S
    }
    getModelMeta() {
        return {
            text:
            "\\sqrt",
            keyInsertOnSelection: "value",
            elements: {
                value: {
                    onRemove: "all"
                },
                sub1: {
                    defaultHide: true,
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\sqrt"],
            height: 25,
            hasExpanded: true,
            description: "square root",
            renderSymbol(e) {
                var t = "square common-square-icon ";
                return t = t + (e ? "square-expand" : ""),
                React.createElement("div", {
                    className: "icon-sqrt"
                },
                React.createElement("div", {
                    className: t
                }), React.createElement("div", {
                    className: "align-end",
                    style: {
                        fontFamily: "Asana",
                        color: "black"
                    }
                },
                "\u221a"), React.createElement("div", {
                    className: "line"
                }), React.createElement("div", {
                    className: "big-square common-big-square-icon"
                }))
            }
        })
    }
    toLatex(e, t, n) {
        var r = e.elements.sub1;
        var a = e.elements.value;
        var i = this.isNotExistOrEmptyEditor(r) ? "" : "[".concat(n.toLatexFromEditor(r, t), "]");
        return "\\sqrt".concat(i, "{").concat(n.toLatexFromEditor(a, t), "}")
    }
    toMathml(e, t) {
        return e.elements.sub1 ? {
            type: "mroot",
            base: t.generateEditor(e.elements.value),
            index: t.generateEditor(e.elements.sub1)
        } : {
            type: "msqrt",
            base: t.generateEditor(e.elements.value)
        }
    }
    toModel(e, t, n) {
        var r = this.getModel();
        return t && t.length > 0 ? r.elements.sub1.lines = t : delete r.elements.sub1,
        r.elements.value = CreateEditorObject.createEditorWith(n),
        r
    }
}

export default SymbolSqrt