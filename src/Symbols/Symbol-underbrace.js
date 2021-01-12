import React from 'react';
import BraceTopWrapper from '../Elements/BraceTopWrapper';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import Global from '../Global';
import PromiseRunner from '../Document/PromiseRunner';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(1270) /*Symbol-underbrace*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 11 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 2 times
/// var o = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(7)/*PropUpdateHelper*/;  // 1 times
/// var c = n(254)/*BraceTopWrapper*/;  // 2 times
/// var d = n(4)/*DOMHelper*/;  // 2 times
/// var h = n(6)/*DiagramIdHelper*/;  // 2 times
/// var u = n(11)/*Global*/;  // 1 times
/// var p = n(13)/*CreateEditorObject*/;  // 1 times
/// var m = n(176)/*PromiseRunner*/;  // 1 times
class f extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "under-brace-symbol";
        this.state = {
            braceWidth: null
        };
        this.calculateBottomBrace = (() => {
            var e = this.getElementRect(this.refMap.value.editor).width + 2 * DOMHelper.getComputedStyleAsNumber(this.refMap.value.editor, "margin-left");
            return PromiseRunner.toPromiseOnRequire(t => {
                this.setState({
                    braceWidth: e
                },
                t)
            })
        });
        this.onSettingClick = (e => {
            e.stopPropagation();
            e.preventDefault();
            var t = PropUpdateHelper.set(this.props.data, "elements.sub1", {
                id: DiagramIdHelper.nextId(),
                lines: [{
                    id: DiagramIdHelper.nextId(),
                    blocks: []
                }]
            });
            this.props.onDataChanged(t);
            this.selectElement("sub1")
        });
        this.setParentHeight = (e => {
            this.bottomBrace && DOMHelper.setHeightEm(this.bottomBrace, e)
        })
    }
    shouldComponentUpdate(e, t) {
        return e.data != this.props.data || e.selected != this.props.selected || e.fontSize != this.props.fontSize || this.state.braceWidth != t.braceWidth
    }
    afterReactRenderWhenDataChanged() {
        this.context.fixedContextHandler.getBatchUpdater().push(this.calculateBottomBrace, this)
    }
    renderSetting() {
        if (this.isDirectSelectedNoSelectionMode() && !this.props.data.elements.sub1) {
            var e = {};
            return Global.isMobileOrTablet() && (e = {
                transform: "scale(1.3)"
            }),
            React.createElement("x-add", {
                class: "no-print",
                style: e,
                key: "setting"
            },
            React.createElement("i", {
                className: "fa fa-plus",
                onMouseDown: this.onSettingClick,
                "aria-hidden": "true"
            }))
        }
    }
    renderUnderEdit() {
        if (this.props.data.elements.sub1) return React.createElement(EditArea, Object.assign({
            key: "under",
            className: "underValue center"
        },
        this.buildMetaDataFromName("sub1"), {
            stripInfo: this.setStripInfo({
                stripUp: !0
            }),
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            borderIfEmpty: this.isSelected()
        }))
    }
    renderBrace() {
        return null == this.state.braceWidth ? React.createElement(BraceTopWrapper, {
            normalRenderClass: "zero-origin",
            isNormal: !0,
            isReverse: !0
        }) : React.createElement(BraceTopWrapper, {
            setParentHeight: this.setParentHeight,
            normalRenderClass: "zero-origin",
            isNormal: !1,
            isReverse: !0,
            width: this.state.braceWidth,
            fontSize: this.getFontSizePixel(),
            bracketWidth: this.getFontSizePixel()
        })
    }
    renderComponent() {
        return [React.createElement(EditArea, Object.assign({
            key: "value",
            className: "value center"
        },
        this.buildMetaDataFromName("value"), {
            stripInfo: this.setStripInfo({
                stripDown: !0
            }),
            optimizeForOneLine: !0,
            borderIfEmpty: this.isSelected()
        })), React.createElement("bottom-brace", {
            key: "brace",
            ref: this.getCachedRefMethod("bottomBrace", e => this.bottomBrace = e)
        },
        this.renderBrace()), this.renderUnderEdit(), this.renderSetting()]
    }
}
var SymbolUnderbrace = new class extends CompositeSymbolBase {
    getViewComponent() {
        return f
    }
    getLatextName() {
        return "\\underbrace"
    }
    getModelMeta() {
        return {
            text:
            this.getLatextName(),
            elements: {
                value: {
                    onRemove: "all"
                },
                sub1: {
                    defaultHide: !0,
                    onRemove: "only"
                }
            }
        }
    }
    getSymbol() {
        return "⏟"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            height: 28,
            hasExpanded: !0,
            renderSymbol(e) {
                var t = {};
                return e && (t.background = "white"),
                React.createElement("div", {
                    style: {
                        width: 12,
                        margin: "auto",
                        fontSize: 12,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }
                },
                React.createElement("div", {
                    className: "common-big-square-icon square"
                }), React.createElement("div", {
                    style: {
                        marginTop: -16,
                        height: 24
                    }
                },
                this.symbol), React.createElement("div", {
                    style: t,
                    className: "common-square-icon square"
                }))
            }
        })
    }
    toModel(e, t, n) {
        var r = this.getModel();
        return r.elements.value = CreateEditorObject.createEditorWith(t),
        n && n.elements.indexValue ? r.elements.sub1 = n.elements.indexValue : delete r.elements.sub1,
        r
    }
    toLatex(e, t, n) {
        var r = "\\underbrace{".concat(n.toLatexFromEditor(e.elements.value, t), "}");
        return e.elements.sub1 && (r += "_{".concat(n.toLatexFromEditor(e.elements.sub1, t), "}")),
        r
    }
    toMathml(e, t) {
        return e.elements.sub1 ? {
            type: "munder",
            base: {
                type: "munder",
                base: t.generateEditor(e.elements.value),
                underscript: {
                    type: "mo",
                    value: "⏟"
                }
            },
            underscript: t.generateEditor(e.elements.sub1)
        } : {
            type: "munder",
            base: t.generateEditor(e.elements.value),
            underscript: {
                type: "mo",
                value: "⏟"
            }
        }
    }
}

export default SymbolUnderbrace