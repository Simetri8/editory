import _ from 'lodash';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import BlockUtils from '../Elements/BlockUtils';
import DOMHelper from '../Elements/DOMHelper';
import SelectionFinder from './SelectionFinder';
import TabularBulbToggler from './TabularBulbToggler';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(1607) /*ConfirmDeleteHandler*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 7 times
/// var o = n.n(i);
/// var m = n(4)/*DOMHelper*/;  // 3 times
/// var C = n(2)/*lodash*/;  // 4 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var L = n(15)/*TabularHelper*/;  // 5 times
/// var pe = n(58)/*BlockUtils*/;  // 1 times
/// var TabularBulbToggler = n(1650)/*TabularBulbToggler*/;  // 2 times
/// var SelectionFinder = n(1658)/*SelectionFinder*/;  // 1 times
var ja = {
    background: "white",
    fontWeight: "normal",
    display: "inline-block",
    border: "1px solid lightgray",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 3,
    boxShadow: "rgb(232,229,229) 1px 1px 0px",
    position: "absolute",
    fontSize: 11,
    zIndex: 999999,
    color: "gray"
};
var qa = {
    position: "absolute",
    display: "block",
    backgroundColor: "rgba(255,0,0,0.37)",
    opacity: .3,
    border: "1px solid #e82b2b",
    boxSizing: "border-box",
    zIndex: 999999
};
class RemoveConfirmContainer extends React.Component {
    shouldComponentUpdate(e) {
        return e.confirmDeleteInfo != this.props.confirmDeleteInfo;
    }
    getForTabular(e, t) {
        var n;
        var r;
        var a = e.element;
        var i = TabularHelper.getTabularCellIndexFromKey(t.key);
        var o = TabularHelper.getAllKeysFromColumn(a.reactInstance.getModel(), i.column);
        var s = TabularHelper.getAllKeysFromRow(a.reactInstance.getModel(), i.row);
        return this.props.confirmDeleteInfo.columnDeleteSelected ? (n = o, r = s) : (n = s, r = o),
        this.props.rowOnly && (r = []),
        _.reduce(_.orderBy(_.uniq(n.concat(r))), (e, i) => {
            var o = a.reactInstance.refMap[i];
            return o && e.push({
                element: o.editor.parentElement,
                alternative: r.indexOf(i) >= 0,
                isPrimary: n.indexOf(i) >= 0,
                key: t.key
            }),
            e;
        },
        []);
    }
    getSelectedElements(e, t) {
        var n = DOMHelper.findLineByIndex(e, t.lineIndex);
        var r = BlockUtils.findSelectedBlock(n, t.charIndex);
        if (r.sub) {
            r = r.sub;
        }
        var a = r.element;
        if (t.selected) {
            var i = a.reactInstance.refMap[t.key].editor;
            return this.getSelectedElements(i, t.selected);
        }
        return t.key ? TabularHelper.isKeyInTabularFormat(t.key) ? this.getForTabular(r, t) : [{
            element: a.reactInstance.refMap[t.key].editor,
            key: t.key,
            isPrimary: true,
            alternative: false
        }] : t.keys ? t.keys.map((e) => {
            return {
                element: a.reactInstance.refMap[e].editor,
                key: e,
                isPrimary: true,
                alternative: false
            };
        }) : [{
            element: r.element,
            key: t.key,
            isPrimary: true,
            alternative: false
        }];
    }
    componentDidMount() {
        if (this.props.isTabular) {
            var e = SelectionFinder.getSelectedEditor(this.props.mainEditor.editor, this.props.selected);
            this.jBulb = TabularBulbToggler.tempraryHide(e);
        }
    }
    componentWillUnmount() {
        if (this.props.isTabular && this.jBulb) {
            TabularBulbToggler.restore(this.jBulb);
        }
    }
    getRectanglesInfo(e, t) {
        var n;
        return {
            elements: _.map(e, (e, r) => {
                var i = DOMHelper.getElementRect(e.element);
                var s = _.assignIn({},
                qa, {
                    left: i.left - t.left,
                    top: i.top - t.top,
                    width: i.width,
                    height: i.height,
                    backgroundColor: e.isPrimary ? "rgba(255,0,0,0.37)" : "transparent"
                });
                return this.props.isTabular && e.alternative && !n && (n = {
                    left: i.left,
                    top: i.top
                }),
                React.createElement("confirm", {
                    key: r,
                    style: s
                },
                " ");
            }),
            leftTopAlt: n
        };
    }
    getTabText(e, t) {
        if (this.props.isTabular && !this.props.rowOnly) {
            var n = this.props.confirmDeleteInfo.columnDeleteSelected ? {
                left: -40,
                top: 0
            } : {
                left: 0,
                top: -27
            };
            return React.createElement("div", {
                style: _.assignIn({},
                ja, {
                    left: e.left - t.left + n.left,
                    top: e.top - t.top + n.top
                })
            },
            "Tab");
        }
    }
    render() {
        if (!this.props.confirmDeleteInfo || !this.props.mainEditor) {
            return React.createElement("div", null);
        }
        var e = this.getSelectedElements(this.props.mainEditor.editor, this.props.confirmDeleteInfo);
        if (0 === e.length) {
            return React.createElement("div", null);
        }
        var t = DOMHelper.getElementRect(this.props.mathType);
        var n = this.getRectanglesInfo(e, t);
        var r = n.elements;
        var a = n.leftTopAlt;
        var i = this.getTabText(a, t);
        return React.createElement("remove-confirm-container", {
            style: {
                pointerEvents: "none"
            }
        },
        r, i);
    }
}
class ConfirmDeleteHandler {
    constructor(e) {
        this.target = e;
    }
    isConfirmDeleted() {
        return !! this.target.state.confirmDeleted;
    }
    clearConfirmDelete() {
        if (this.target.state.confirmDeleted) {
            this.target.setState({
                confirmDeleted: null
            });
        }
    }
    requestConfirmDeleteTabularToggleRowColumn() {
        if (!this.target.getContainerModel().isPlotCasesSelected()) {
            this.target.setState({
                confirmDeleted: _.assignIn({},
                this.target.state.confirmDeleted, {
                    columnDeleteSelected: !this.target.state.confirmDeleted.columnDeleteSelected
                })
            });
        }
    }
    isConfirmDeleteWithTabular() {
        if (!this.isConfirmDeleted()) {
            return false;
        }
        var e = BlockHelper.findLeafSelected(this.target.state.confirmDeleted).key;
        return TabularHelper.isKeyInTabularFormat(e);
    }
    renderConfirmDelete() {
        if (!this.target.state.confirmDeleted) {
            return null;
        }
        var e = this.target.getContainerModel();
        return React.createElement(RemoveConfirmContainer, {
            mainEditor: this.target.getEditorComponent(),
            rowOnly: e.isPlotCasesSelected(),
            isTabular: e.quickRowColumnInsertionSupport(),
            mathType: this.target.getMathTypeHtmlElement(),
            selected: e.cursorSelected,
            confirmDeleteInfo: this.target.state.confirmDeleted
        });
    }
}
/*n.d(t, "a", function () {
    return ConfirmDeleteHandler;
})*/

export default ConfirmDeleteHandler