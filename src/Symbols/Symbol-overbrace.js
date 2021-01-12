import React from 'react';
import BraceTopWrapper from '../Elements/BraceTopWrapper';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import PromiseRunner from '../Document/PromiseRunner';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(1523) /*Symbol-overbrace*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 14 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 2 times
/// var o = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(7)/*PropUpdateHelper*/;  // 1 times
/// var c = n(254)/*BraceTopWrapper*/;  // 2 times
/// var d = n(4)/*DOMHelper*/;  // 3 times
/// var h = n(6)/*DiagramIdHelper*/;  // 2 times
class u extends React.Component {
    render() {
        var e = {
            marginTop: 0,
            background: this.props.isExpanded ? "white" : ""
        };
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: 23,
                margin: "auto",
                fontSize: 12
            }
        },
        React.createElement("div", {
            className: "common-square-icon square",
            style: e
        }), React.createElement("div", {
            style: {
                marginBottom: -15
            }
        },
        this.props.symbol), React.createElement("div", {
            className: "common-big-square-icon square",
            style: {
                marginTop: 8
            }
        }))
    }
}
/// var p = n(76)/*MobileTabletClasses*/,  // 1 times
/// m = n(13)/*CreateEditorObject*/,  // 1 times
/// f = n(176)/*PromiseRunner*/;  // 1 times
class g extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "over-brace-symbol";
        this.state = {
            braceWidth: null
        };
        this.calculateTopBrace = (() => {
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
            this.topBrace && DOMHelper.setHeightEm(this.topBrace, e)
        })
    }
    shouldComponentUpdate(e, t) {
        return e.data != this.props.data || e.selected != this.props.selected || e.fontSize != this.props.fontSize || this.state.braceWidth != t.braceWidth
    }
    useCustomBaseLine() {
        return !1
    }
    afterReactRenderWhenDataChanged() {
        this.context.fixedContextHandler.getBatchUpdater().push(this.calculateTopBrace, this)
    }
    renderSetting() {
        if (this.isDirectSelectedNoSelectionMode() && !this.props.data.elements.sub1) {
            var e = {
                transform: MobileTabletClasses.getSettingScaleTransform()
            };
            return React.createElement("x-add", {
                class: "no-print",
                style: e,
                key: "add"
            },
            React.createElement("i", {
                className: "fa fa-plus",
                onMouseDown: this.onSettingClick,
                "aria-hidden": "true"
            }))
        }
    }
    renderBrace() {
        if (null == this.state.braceWidth) return React.createElement(BraceTopWrapper, {
            isNormal: !0,
            isReverse: !1
        });
        var e = DOMHelper.getComputedStyleAsNumber(this.compositeBlock, "font-size");
        return React.createElement(BraceTopWrapper, {
            setParentHeight: this.setParentHeight,
            isNormal: !1,
            isReverse: !1,
            width: this.state.braceWidth,
            bracketWidth: e,
            fontSize: e
        })
    }
    renderOverEdit() {
        if (this.props.data.elements.sub1) return React.createElement(EditArea, Object.assign({
            key: "over",
            className: "overValue center"
        },
        this.buildMetaDataFromName("sub1"), {
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            stripInfo: this.setStripInfo({
                stripDown: !0
            }),
            borderIfEmpty: this.isSelected()
        }))
    }
    renderComponent() {
        return [this.renderOverEdit(), React.createElement("top-brace", {
            key: "topBrace",
            style: {},
            ref: this.getCachedRefMethod("topBrace", e => this.topBrace = e)
        },
        this.renderBrace()), React.createElement("div", {
            key: "value",
            style: {
                clear: "both"
            }
        },
        React.createElement(EditArea, Object.assign({
            className: "center value",
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            stripInfo: this.setStripInfo({
                stripUp: !0
            }),
            optimizeForOneLine: !0,
            borderIfEmpty: this.isSelected()
        }))), this.renderSetting()]
    }
}
var SymbolOverbrace = new class extends CompositeSymbolBase {
    constructor() {
        super(...arguments);
        this.isOverSymbol = !0
    }
    getViewComponent() {
        return g
    }
    getLatextName() {
        return "\\overbrace"
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
        return "⏞"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            height: 28,
            hasExpanded: !0,
            renderSymbol(e) {
                return React.createElement(u, {
                    isExpanded: e,
                    symbol: this.symbol
                })
            }
        })
    }
    toModel(e, t, n) {
        var r = this.getModel();
        return r.elements.value = CreateEditorObject.createEditorWith(t),
        n && n.elements.powerValue ? r.elements.sub1 = n.elements.powerValue : delete r.elements.sub1,
        r
    }
    toLatex(e, t, n) {
        var r = "\\overbrace{".concat(n.toLatexFromEditor(e.elements.value, t), "}");
        return e.elements.sub1 && (r += "^{".concat(n.toLatexFromEditor(e.elements.sub1, t), "}")),
        r
    }
    toMathml(e, t) {
        return e.elements.sub1 ? {
            type: "mover",
            base: {
                type: "mover",
                base: t.generateEditor(e.elements.value),
                overscript: {
                    type: "mo",
                    value: "⏞"
                }
            },
            overscript: t.generateEditor(e.elements.sub1)
        } : {
            type: "mover",
            base: t.generateEditor(e.elements.value),
            overscript: {
                type: "mo",
                value: "⏞"
            }
        }
    }
}

export default SymbolOverbrace