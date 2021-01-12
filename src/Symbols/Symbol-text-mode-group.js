import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import EditArea from '../Editor/EditArea';
import GroupSymbolCollapsed from './GroupSymbolCollapsed';

/// xxx(1382) /*Symbol-text-mode-group*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
/// var i = n(29)/*CompositeBlock*/;  // 1 times
/// var o = n(21)/*EditArea*/;  // 2 times
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(194)/*GroupSymbolCollapsed*/;  // 4 times
/// var c = n(14)/*classnames*/;  // 2 times
/// var d = n.n(c);
/// var h = n(2)/*lodash*/;  // 2 times
/// var u = n.n(h);
/// var p = n(96)/*BatchedUpdates*/;  // 1 times
class m extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.state = {};
        this.handleExpandIconEnter = (() => {
            this.setState({
                expandIconHover: !0
            })
        });
        this.handleExpandIconLeave = (() => {
            this.setState({
                expandIconHover: !1
            })
        });
        this.handleToggleCollapse = (() => {
            var e = GroupSymbolCollapsed.toggleShowHide(this.props.data, "text"),
            t = e.selected,
            n = e.data;
            BatchedUpdates. in (() => {
                this.props.onDataChanged(n);
                this.props.onSelectedChanged(t)
            })
        })
    }
    getClassName() {
        return this.props.data.collapsed ? classNames(super.getClassName(), GroupSymbolCollapsed.getCompositeBlockClassName(), "role-text-mode-group") : classNames(super.getClassName(), "text-mode-group-expanded", "role-text-mode-group")
    }
    renderShowHideElement() {
        if (this.props.isRootLine || this.isChildSelected()) return GroupSymbolCollapsed.renderShowHideElement(this.props.data.collapsed, this.handleToggleCollapse, this.handleExpandIconEnter, this.handleExpandIconLeave)
    }
    renderComponent() {
        var e = this.props.data;
        return f(e),
        e.collapsed ? [React.createElement(EditArea, Object.assign({
            key: "editor-collapsed"
        },
        this.buildMetaDataFromName("value"), {
            showBorder: !1,
            isTextMode: !0
        })), this.renderShowHideElement()] : [React.createElement(EditArea, Object.assign({
            key: "editor-expanded"
        },
        this.buildMetaDataFromName("value"), {
            showBorder: this.isSelected(),
            isTextMode: !0
        })), this.renderShowHideElement()]
    }
    getCompositeBlockStyle() {
        return {
            display: "block",
            outline: this.state.expandIconHover && !this.props.data.collapsed ? "1px dotted lightgray" : "none"
        }
    }
}
function f(e) {
    if (e.elements.textValue) {
        if (e.hiddenData = _.cloneDeep(e.elements.textValue), GroupSymbolCollapsed.assignDefaultStyle(e.hiddenData.lines, "text"), delete e.elements.textValue, e.collapsed) {
            var t = e.elements.value;
            e.elements.value = e.hiddenData;
            e.hiddenData = t
        }
    } else if (e.elements.collapsedValue && (e.hiddenData = _.cloneDeep(e.elements.collapsedValue), delete e.elements.collapsedValue, e.collapsed)) {
        var n = e.elements.value;
        e.elements.value = e.hiddenData;
        e.hiddenData = n
    }
}
var SymbolTextModeGroup = new class extends CompositeSymbolBase {
    getViewComponent() {
        return m
    }
    getLatextName() {
        return "\\text-mode-group"
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
            insertInTextModeOnly: !0,
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            singleBlockLine: !0
        })
    }
    toModel() {
        return this.getModel()
    }
    toLatex(e, t, n) {
        return f(e),
        n.toLatexFromEditor(e.elements.value, t)
    }
}

export default SymbolTextModeGroup