import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import BlockHelper from './BlockHelper';
import DataChangeModel from '../Editor/DataChangeModel';
import EditArea from '../Editor/EditArea';
import EditAreaLine from '../Editor/EditAreaLine';
import TabularActions from '../Tabular/TabularActions';
import TabularHelper from '../Tabular/TabularHelper';
import TabularUtils from '../Tabular/TabularUtils';

/// xxx(466) /*MatrixComponent*/

/// var r = n(0)/*React*/;  // 6 times
/// var a = n.n(r);
/// var i = n(5)/*sizzle*/;  // 2 times
/// var o = n.n(i);
/// var s = n(21)/*EditArea*/;  // 1 times
/// var l = n(112)/*EditAreaLine*/;  // 1 times
/// var d = n(45)/*TabularUtils*/,  // 1 times
/// h = n(12)/*BlockHelper*/,  // 1 times
/// u = n(203)/*DataChangeModel*/,  // 1 times
/// p = n(14)/*classnames*/,  // 3 times
/// m = n.n(p)
/// f = n(251)/*TabularActions*/,  // 1 times
/// g = n(15)/*TabularHelper*/;  // 2 times
/*n.d(t, "a", function () {
    return y
});*/
var c = new class {
    parseInt(e, t, n) {
        return e ? (e = parseInt(e, 10), isNaN(e) && (e = t), e > n && (e = n), e < t && (e = t), e) : "";
    }
};
class y extends TabularActions {
    constructor(e) {
        super(e);
        this.onRowChange = (e) => {
            var t = c.parseInt(e.target.value, 1, 100);
            this.setState({
                row: t
            });
            if (t && "string" != typeof t) {
                this.changeModelBaseOnRowColumn(t, this.state.column);
            }
        };
        this.onColumnChange = (e) => {
            var t = c.parseInt(e.target.value, 1, 50);
            this.setState({
                column: t
            });
            if (t && "string" != typeof t) {
                this.changeModelBaseOnRowColumn(this.state.row, t);
            }
        };
        this.updateMatrix = () => {
            if (this.compositeBlock) {
                var e = this.getElementRect(jQuery(this.compositeBlock).children("x-matrix").children("table").get(0)).height;
                jQuery(this.compositeBlock).children("x-matrix").children("svg").height(e);
            }
        };
        this.handleMatrixRef = (e) => {
            this.matrix = e;
        };
        this.state = {
            row: this.props.data.row,
            column: this.props.data.column,
            bracket: "(",
            showBorderDesign: false
        };
        this.selfManageBaseLine = true;
    }
    getClassName() {
        return classNames(super.getClassName(), "matrix-symbol", "matrix-like", "matrix-math-mode", "role-tabular");
    }
    componentWillUpdate(e) {
        if (! (e.data.row === this.props.data.row && e.data.column === this.props.data.column)) {
            this.setState({
                row: e.data.row,
                column: e.data.column
            });
        }
        if (! (e.selected === this.props.selected || e.selected)) {
            this.setState({
                showBorderDesign: false
            });
        }
    }
    useCustomBaseLine() {
        return false;
    }
    changeSelectedIfRequire(e, t) {
        var n = this.props.selected;
        if (n && n.key) {
            var r = TabularHelper.getTabularCellIndexFromKey(n.key);
            if (r.column >= t || r.row >= e) {
                var a = {
                    key: TabularHelper.getKeyFromRowCol(Math.min(r.row, e - 1), Math.min(r.column, t - 1)),
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                };
                this.props.onSelectedChanged(a);
            }
        }
    }
    changeModelBaseOnRowColumn(e, t) {
        if (this.props.data.row != e || this.props.data.column != t) {
            var n = TabularUtils.adjustModelByRowCollumn(this.props.data, e, t);
            this.props.onDataChanged(n, DataChangeModel.getBuilder().withFocusAcquired().build());
            this.changeSelectedIfRequire(n.row, n.column);
        }
    }
    getDisplayMode() {
        return this.props.displayMode;
    }
    shouldShowSmaller() {
        return false;
    }
    renderEditArea(e, t, n) {
        var r = this.shouldShowSmaller() ? .75 * this.props.fontSize : this.props.fontSize;
        var i = BlockHelper.isSingleLineEditor(this.props.data.elements[e]) ? EditAreaLine : EditArea;
        return React.createElement(i, Object.assign({},
        this.buildMetaDataFromName(e), {
            className: "editor-cell",
            showBorder: false,
            optimizeForOneLine: true,
            displayMode: this.getDisplayMode(),
            fontSize: r
        }));
    }
    shouldShowBorder() {
        return this.isChildSelected();
    }
    getColumnStyle(e) {}
    renderColumn(e, t) {
        var n = e + "_" + t;
        var r = classNames({
            selected: this.shouldShowBorder()
        });
        return React.createElement("td", {
            style: this.getColumnStyle(t),
            key: this.props.data.elements[n].id,
            className: r
        },
        this.renderEditArea(n, e, t));
    }
    renderRowContent(e) {
        var t = [];
        var n = this.props.data.column;
        var r = 0;
        for (; r < n; r++) {
            t.push(this.renderColumn(e, r));
        }
        return t;
    }
    renderRow(e) {
        var t = classNames("math-row", {
            selected: this.shouldShowBorder(),
            smaller: this.shouldShowSmaller()
        });
        return React.createElement("tr", {
            key: this.getKeyForRow(e),
            className: t
        },
        this.renderRowContent(e));
    }
    renderTables() {
        var e = [];
        var t = this.props.data.row;
        var n = 0;
        for (; n < t; n++) {
            e.push(this.renderRow(n));
        }
        return e;
    }
    isArray() {
        return "\\array" == this.props.data.text;
    }
    componentWillUnmount() {
        this.willComponentUnmount = true;
    }
    afterReactRenderWhenDataChanged() {
        this.context.fixedContextHandler.getBatchUpdater().push(this.updateMatrix, this);
    }
    currentSelectedColumn() {
        var e = this.props.selected.key;
        return parseInt(e.split("_")[1], 10);
    }
    renderPlaceHolderAtEnd() {
        return null;
    }
    getTableCssStyle() {
        return null;
    }
    renderColumns() {}
    renderBeforeTable() {
        return null;
    }
    renderAfterTable() {
        return null;
    }
    renderComponent() {
        return React.createElement("x-matrix", {
            ref: this.handleMatrixRef,
            class: this.props.data.text.substr(1)
        },
        this.renderBeforeTable(), React.createElement("table", {
            style: this.getTableCssStyle()
        },
        this.renderColumns(), React.createElement("tbody", null, this.renderTables())), this.renderAfterTable(), this.renderSetting(), this.renderPlaceHolderAtEnd());
    }
}

export default y