import _ from 'lodash';

/// xxx(15) /*TabularHelper*/

/// var r = n(2)/*lodash*/;  // 4 times
/// var a = n.n(r);
var TabularHelper = new class {
    isKeyInTabularFormat(e) {
        return /^[0-9]+_[0-9]+$/.test(e)
    }
    getTabularCellIndexFromKey(e) {
        var t = e.split("_");
        return {
            row: Number.parseInt(t[0], 10),
            column: Number.parseInt(t[1], 10)
        }
    }
    getKeyFromRowCol(e, t) {
        return "".concat(e, "_").concat(t)
    }
    getMinMaxTabularKeyIndex(e) {
        var t = {
            minRow: 999,
            minCol: 999,
            maxRow: 0,
            maxCol: 0
        };
        return e.forEach(e => {
            var n = this.getTabularCellIndexFromKey(e);
            t = {
                minRow: Math.min(n.row, t.minRow),
                minCol: Math.min(n.column, t.minCol),
                maxRow: Math.max(n.row, t.maxRow),
                maxCol: Math.max(n.column, t.maxCol)
            }
        }),
        t
    }
    nextRowFormKey(e) {
        var t = this.getTabularCellIndexFromKey(e);
        return this.getKeyFromRowCol(t.row + 1, t.column)
    }
    nextColumnFormKey(e) {
        var t = this.getTabularCellIndexFromKey(e);
        return this.getKeyFromRowCol(t.row, t.column + 1)
    }
    getAllKeysFromRow(e, t) {
        return _.filter(_.keys(e.elements), e => this.getTabularCellIndexFromKey(e).row === t)
    }
    getAllKeysFromColumn(e, t) {
        return _.filter(_.keys(e.elements), e => this.getTabularCellIndexFromKey(e).column === t)
    }
    getTabularMinKey(e, t) {
        var n = this.getTabularCellIndexFromKey(e),
        r = this.getTabularCellIndexFromKey(t),
        a = {
            row: Math.min(n.row, r.row),
            column: Math.min(n.column, r.column)
        };
        return "".concat(a.row, "_").concat(a.column)
    }
    previousRowFormKey(e) {
        var t = this.getTabularCellIndexFromKey(e);
        return this.getKeyFromRowCol(Math.max(0, t.row - 1), t.column)
    }
    previousColumnFormKey(e) {
        var t = this.getTabularCellIndexFromKey(e);
        return this.getKeyFromRowCol(t.row, Math.max(0, t.column - 1))
    }
    nextCell(e, t, n) {
        var r = this.getTabularCellIndexFromKey(e),
        a = {
            column: (r.column + 1) % n,
            row: r.column + 1 >= n ? r.row + 1 : r.row
        };
        return a.row >= t ? e : this.getKeyFromRowCol(Math.min(t, a.row), Math.min(n, a.column))
    }
    previousCell(e, t, n) {
        var r = this.getTabularCellIndexFromKey(e),
        a = {
            column: this.mod(r.column - 1, n),
            row: r.column - 1 < 0 ? r.row - 1 : r.row
        };
        return a.row < 0 ? e : this.getKeyFromRowCol(Math.min(t, a.row), Math.min(n, a.column))
    }
    mod(e, t) {
        return (e % t + t) % t
    }
}

export default TabularHelper