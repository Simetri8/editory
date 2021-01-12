import CheckObject from '../Editor/CheckObject';
import TabularHelper from './TabularHelper';

/// xxx(64) /*TabularCellHelper*/

/// var r = n(15)/*TabularHelper*/;  // 1 times
/// var a = n(31)/*CheckObject*/;  // 1 times
var TabularCellHelper = new class {
    cellLoop(e, t) {
        for (var n = {
            break: !1,
            result: null
        },
        r = 0; r < e.row; r++) for (var a = 0; a < e.column; a++) if (t(this.getCellInfo(e, r, a), n), n.
        break) return n.result;
        return n.result
    }
    getCellInfo(e, t, n) {
        var a = TabularHelper.getKeyFromRowCol(t, n),
        i = e.elements[a];
        return {
            key: a,
            rIndex: t,
            cIndex: n,
            colSpan: this.getColSpan(e.elements[a]),
            rowSpan: this.getRowSpan(e.elements[a]),
            editor: i,
            hidden: i && !!i.hidden
        }
    }
    getRowSpan(e) {
        return e ? e.rowSpan || 1 : 0
    }
    getColSpan(e) {
        return e ? e.colSpan || 1 : 0
    }
    isArrayModel(e) {
        return "\\array" == e.text
    }
    isTableModel(e) {
        return CheckObject.isTable(e)
    }
    isHiddenEditor(e) {
        return e && e.hidden
    }
}

export default TabularCellHelper