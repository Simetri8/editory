import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import DiagramIdHelper from './DiagramIdHelper';
import EditArea from '../Editor/EditArea';
import Global from '../Global';
import HComposedSymbol from './HComposedSymbol';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(241) /*SymbolArrowBase*/

/*n.d(t, "a", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 9 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 2 times
/// var o = n(29)/*CompositeBlock*/;  // 1 times
/// var s = n(7)/*PropUpdateHelper*/;  // 1 times
/// var l = n(205)/*HComposedSymbol*/;  // 1 times
/// var c = n(6)/*DiagramIdHelper*/;  // 4 times
/// var d = n(11)/*Global*/;  // 1 times
class h extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "arrow-like-symbol";
        this.onSettingClick = (e => {
            e.stopPropagation();
            e.preventDefault();
            var t = {
                top: {
                    id: DiagramIdHelper.nextId(),
                    lines: [{
                        id: DiagramIdHelper.nextId(),
                        blocks: []
                    }]
                },
                bottom: {
                    id: DiagramIdHelper.nextId(),
                    lines: [{
                        id: DiagramIdHelper.nextId(),
                        blocks: []
                    }]
                }
            };
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "elements", t));
            this.selectElement("top")
        })
    }
    useCustomBaseLine() {
        return !1
    }
    renderSetting() {
        if (this.isDirectSelectedNoSelectionMode()) {
            var e = {};
            return Global.isMobileOrTablet() && (e = {
                transform: "scale(1.3)"
            }),
            React.createElement("x-add", {
                class: "no-print",
                style: e,
                key: 2,
                onMouseDown: this.onSettingClick
            },
            React.createElement("i", {
                className: "fa fa-plus",
                "aria-hidden": "true"
            }))
        }
    }
    getArrow() {
        return "⇔"
    }
    getMarginClass() {
        return "small-margin"
    }
    renderComposedArrow() {
        return React.createElement(HComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            baseMathModeFontFamily: this.context.baseMathModeFontFamily,
            repeatChar: "⏪",
            endChar: "⏫"
        })
    }
    renderMiddle() {
        return React.createElement("x-middle", {
            key: "middle"
        },
        React.createElement("x-inside", null, this.renderComposedArrow()))
    }
    renderSimpleArrow() {
        return React.createElement("arrow-like-simple", null, React.createElement("span", {
            key: 1
        },
        this.getArrow()), this.renderSetting())
    }
    renderTop() {
        return this.props.data.elements.top ? React.createElement(EditArea, Object.assign({
            key: "top",
            className: this.getMarginClass() + " top center",
            borderIfEmpty: this.isSelected()
        },
        this.buildMetaDataFromName("top"), {
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            stripInfo: this.setStripInfo({
                stripDown: !0
            })
        })) : null
    }
    renderBottom() {
        return this.props.data.elements.bottom ? React.createElement(EditArea, Object.assign({
            key: "bottom",
            className: this.getMarginClass() + " bottom center",
            borderIfEmpty: this.isSelected()
        },
        this.buildMetaDataFromName("bottom"), {
            fontSize: .7 * this.props.fontSize,
            noAreaContainer: !0,
            noSpacingRule: !0,
            stripInfo: this.setStripInfo({
                stripUp: !0
            })
        })) : null
    }
    renderComponent() {
        return this.hasElementsData() ? [this.renderTop(), this.renderMiddle(), this.renderBottom()] : this.renderSimpleArrow()
    }
}

export default h