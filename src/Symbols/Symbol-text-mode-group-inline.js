import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import GroupSymbolCollapsed from './GroupSymbolCollapsed';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(1383) /*Symbol-text-mode-group-inline*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 7 times
/// var o = n.n(i);
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(21)/*EditArea*/;  // 2 times
/// var c = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var d = n(194)/*GroupSymbolCollapsed*/;  // 1 times
/// var h = n(14)/*classnames*/;  // 2 times
/// var u = n.n(h);
/// var p = n(24)/*EventHelper*/;  // 4 times
/// var m = n(37)/*ToolbarIcons*/;  // 3 times
/// var f = n(96)/*BatchedUpdates*/;  // 1 times
class g extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.handleToggleCollapse = (() => {
            var e = GroupSymbolCollapsed.toggleShowHide(this.props.data, "math"),
            t = e.selected,
            n = e.data;
            this.props.selected ? BatchedUpdates. in (() => {
                this.props.onDataChanged(n);
                this.props.onSelectedChanged(t)
            }) : this.props.onDataChanged(n, {
                focusAcquired: !0,
                preventScroll: !0
            })
        })
    }
    getClassName() {
        return this.props.data.collapsed ? classNames(super.getClassName(), "text-mode-group-inline-collapsed", "role-text-mode-group-inline") : classNames(super.getClassName(), "text-mode-group-inline-expanded", "role-text-mode-group-inline")
    }
    renderShowHideElement() {
        return React.createElement("div", {
            key: "settings",
            className: "settings-show-hide no-print",
            style: {
                position: "absolute",
                left: -17,
                top: -1,
                bottom: -1,
                fontSize: 12,
                border: "1px solid lightgray",
                cursor: "pointer",
                width: 15,
                fill: "gray",
                zIndex: 400,
                background: "white",
                alignItems: "center",
                justifyContent: "center"
            },
            onMouseDown: EventHelper.onMouseDownStopPropagation,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation,
            onClick: this.handleToggleCollapse
        },
        React.createElement("span", {
            style: {
                width: "1em",
                height: "1em",
                display: "inline-block"
            }
        },
        ToolbarIcons.caretRight))
    }
    renderComponent() {
        return this.props.data.collapsed ? [React.createElement("span", {
            key: "ss",
            style: {
                display: "flex",
                position: "absolute",
                top: -1,
                bottom: -1,
                left: -1,
                fontSize: 12,
                border: "1px solid lightgray",
                cursor: "pointer",
                width: 18,
                fill: "gray",
                background: "white",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 600
            },
            onMouseDown: EventHelper.onMouseDownStopPropagation,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation,
            onClick: this.handleToggleCollapse
        },
        React.createElement("span", {
            style: {
                width: "1em",
                height: "1em",
                display: "inline-block",
                marginRight: "-0.2em"
            }
        },
        ToolbarIcons.caretLeft), React.createElement("span", {
            style: {
                width: "1em",
                height: "1em",
                display: "inline-block",
                marginLeft: "-0.2em"
            }
        },
        ToolbarIcons.caretRight)), React.createElement(EditArea, Object.assign({
            key: "editor-collapsed"
        },
        this.buildMetaDataFromName("value"), {
            showBorder: !1,
            isTextMode: !0,
            style: {
                display: "inline-block",
                marginLeft: 21
            }
        }))] : [React.createElement(EditArea, Object.assign({
            key: "editor-expanded"
        },
        this.buildMetaDataFromName("value"), {
            showBorder: this.isSelected(),
            isTextMode: !0
        })), this.renderShowHideElement()]
    }
    getCompositeBlockStyle() {
        if (this.props.data.collapsed) return _.assignIn({},
        super.getCompositeBlockStyle(), {
            border: "1px dotted lightgray"
        })
    }
}
var SymbolTextModeGroupInline = new class extends CompositeSymbolBase {
    getViewComponent() {
        return g
    }
    getLatextName() {
        return "\\text-mode-group-inline"
    }
    getSymbol() {
        return "group"
    }
    getModelMeta() {
        return {
            text:
            this.getLatextName(),
            keyInsertOnSelection: "value",
            elements: {
                value: {
                    onRemove: "all"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            insertInTextModeOnly: !0
        })
    }
    toModel() {
        return this.getModel()
    }
    toLatex(e, t, n) {
        return n.toLatexFromEditor(e.elements.value, t)
    }
}

export default SymbolTextModeGroupInline