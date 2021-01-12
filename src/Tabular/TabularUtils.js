import _ from 'lodash';
import BlockHelper from '../Elements/BlockHelper';
import CreateEditorObject from '../Elements/CreateEditorObject';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TabularBehaviors from './TabularBehaviors';
import TabularCellHelper from './TabularCellHelper';
import TabularHelper from './TabularHelper';
import TabularNormalizer from './TabularNormalizer';

/// xxx(45) /*TabularUtils*/

/// var r = n(3);  // 6 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 17 times
/// var o = n.n(i);
/// var s = n(12)/*BlockHelper*/;  // 11 times
/// var l = n(64)/*TabularCellHelper*/;  // 12 times
/// var c = n(123)/*TabularBehaviors*/;  // 8 times
/// var d = n(329)/*TabularNormalizer*/;  // 1 times
/// var h = n(13)/*CreateEditorObject*/;  // 7 times
var u = new class {
    normalizeCells(e) {
        var t = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.fillMissingElement(t),
        t = TabularBehaviors.normalizeTabular(t)
    }
    makeSureNoWidthForHiddenColumn(e) {
        return TabularNormalizer.makeSureNoWidthForHiddenColumn(e)
    }
    fillMissingElement(e) {
        TabularCellHelper.cellLoop(e, (t) => {
            var n = t.key;
            if (!e.elements[n]) e.elements[n] = CreateEditorObject.createEmptyEditor()
        })
    }
};
/// var p = n(15)/*TabularHelper*/;  // 61 times
var m = new class {
    insertNewRowBelow(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(t);
        var r = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var a = e.elements[t];
        var i = n.row + TabularCellHelper.getRowSpan(a);
        var o = i;
        for (; o < e.row; o++) {
            var d = 0;
            for (; d < e.column; d++) {
                var m = TabularHelper.getKeyFromRowCol(o, d);
                var f = TabularHelper.getKeyFromRowCol(o + 1, d);
                r.elements[f] = e.elements[m]
            }
        }
        var g = 0;
        for (; g < e.column; g++) {
            var y = TabularHelper.getKeyFromRowCol(i, g);
            var A = TabularHelper.getKeyFromRowCol(n.row, g);
            var E = CreateEditorObject.createEmptyEditor();
            E.style = e.elements[A].style;
            r.elements[y] = E
        }
        return r.row++,
        r = TabularBehaviors.handleInsertNewRowBelow(r, i),
        r = u.normalizeCells(r)
    }
    insertNewRowAbove(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(t);
        var r = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var a = n.row;
        for (; a < e.row; a++) {
            var i = 0;
            for (; i < e.column; i++) {
                var o = TabularHelper.getKeyFromRowCol(a, i);
                var l = TabularHelper.getKeyFromRowCol(a + 1, i);
                r.elements[l] = e.elements[o]
            }
        }
        var d = 0;
        for (; d < e.column; d++) {
            var m = TabularHelper.getKeyFromRowCol(n.row, d);
            var f = TabularHelper.getKeyFromRowCol(n.row + 1, d);
            var g = CreateEditorObject.createEmptyEditor();
            g.style = r.elements[f].style;
            r.elements[m] = g
        }
        return r.row++,
        r = TabularBehaviors.handleInsertNewRowAbove(r, n.row),
        r = u.normalizeCells(r)
    }
};
var f = new class {
    insertColumnOnLeft(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(t);
        var r = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var a = n.column;
        for (; a < e.column; a++) {
            var i = 0;
            for (; i < e.row; i++) {
                var o = TabularHelper.getKeyFromRowCol(i, a);
                var l = TabularHelper.getKeyFromRowCol(i, a + 1);
                r.elements[l] = e.elements[o]
            }
        }
        var d = 0;
        for (; d < e.row; d++) {
            var m = TabularHelper.getKeyFromRowCol(d, n.column);
            r.elements[m] = CreateEditorObject.createEmptyEditor();
            var f = TabularHelper.getKeyFromRowCol(d, n.column + 1);
            r.elements[m].style = r.elements[f].style
        }
        return r.column++,
        r = TabularBehaviors.handleInsertColumnOnLeft(r, n.column),
        r = u.normalizeCells(r)
    }
    insertColumnOnRight(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(t);
        var r = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var a = e.elements[t];
        var i = n.column + TabularCellHelper.getColSpan(a);
        var o = i;
        for (; o < e.column; o++) {
            var d = 0;
            for (; d < e.row; d++) {
                var m = TabularHelper.getKeyFromRowCol(d, o);
                var f = TabularHelper.getKeyFromRowCol(d, o + 1);
                r.elements[f] = e.elements[m]
            }
        }
        var g = 0;
        for (; g < e.row; g++) {
            var y = TabularHelper.getKeyFromRowCol(g, i);
            r.elements[y] = CreateEditorObject.createEmptyEditor();
            var A = TabularHelper.getKeyFromRowCol(g, n.column);
            r.elements[y].style = e.elements[A].style
        }
        return r.column++,
        r = TabularBehaviors.handleInsertColumnOnRight(r, i),
        r = u.normalizeCells(r)
    }
};
/// var g = n(7)/*PropUpdateHelper*/;  // 1 times
var y = new class {
    mergeCells(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var r = TabularHelper.getMinMaxTabularKeyIndex(t);
        var a = _.clone(e.elements[TabularHelper.getKeyFromRowCol(r.minRow, r.minCol)]);
        var i = r.maxCol;
        var l = r.maxRow;
        var d = r.minRow;
        for (; d <= r.maxRow; d++) {
            var u = r.minCol;
            for (; u <= r.maxCol; u++) {
                var m = TabularHelper.getKeyFromRowCol(d, u);
                if (d != r.minRow || u != r.minCol) {
                    var f = n.elements[m];
                    if (f.lines.length > 1 || !BlockHelper.isEmptyLine(f.lines[0])) a.lines = a.lines.concat(f.lines);
                    n.elements[m] = CreateEditorObject.createEmptyEditor(e.elements[m].id);
                    n.elements[m].hidden = true;
                    var g = e.elements[m];
                    if (g.colSpan && u + g.colSpan - 1 > i) i = u + g.colSpan - 1;
                    if (g.rowSpan && d + g.rowSpan - 1 > l) l = d + g.rowSpan - 1
                } else n.elements[m] = a
            }
        }
        return i > r.minCol && (a.colSpan = i - r.minCol + 1),
        l > r.minRow && (a.rowSpan = l - r.minRow + 1),
        TabularBehaviors.normalizeTabular(n)
    }
    unmergeCells(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var r = _.clone(n.elements[t]);
        var a = TabularHelper.getTabularCellIndexFromKey(t);
        var i = a.row;
        for (; i < a.row + (r.rowSpan || 1); i++) {
            var l = a.column;
            for (; l < a.column + (r.colSpan || 1); l++) {
                var c = TabularHelper.getKeyFromRowCol(i, l);
                if (c != t) n.elements[c] = PropUpdateHelper.setProp(n.elements[c], "hidden", void 0)
            }
        }
        return r.colSpan = void 0,
        r.rowSpan = void 0,
        n.elements[t] = r,
        n
    }
    isMergable(e, t) {
        var n = TabularHelper.getMinMaxTabularKeyIndex(e);
        var r = {};
        var a = n.minRow;
        for (; a <= n.maxRow; a++) {
            var i = n.minCol;
            for (; i <= n.maxCol; i++) {
                var s = TabularHelper.getKeyFromRowCol(a, i);
                var l = t.elements[s];
                if (!l.hidden) if (l.colSpan || l.rowSpan) {
                    var c = l.colSpan || 1;
                    var d = l.rowSpan || 1;
                    var h = a;
                    for (; h < a + d; h++) {
                        var u = i;
                        for (; u < i + c; u++) r[TabularHelper.getKeyFromRowCol(h, u)] = true
                    }
                } else r[s] = true
            }
        }
        var m = (n = TabularHelper.getMinMaxTabularKeyIndex(_.keys(r))).minRow;
        for (; m <= n.maxRow; m++) {
            var f = n.minCol;
            for (; f <= n.maxCol; f++) if (!r[TabularHelper.getKeyFromRowCol(m, f)]) return false
        }
        return true
    }
};
var A = new class {
    removeRows(e, t) {
        var n = e;
        var r = _.chain(t).flatMap((t) => {
            var n = e.elements[t];
            if (this.hasRowSpan(n)) {
                var r = TabularHelper.getTabularCellIndexFromKey(t);
                return _.map(_.range(r.row, r.row + n.rowSpan), (e) => {
                    return TabularHelper.getKeyFromRowCol(e, r.column)
                })
            }
            return [t]
        }).map((e) => {
            return TabularHelper.getTabularCellIndexFromKey(e).row
        }).uniq().orderBy((e) => {
            return e
        },
        "desc").value();
        return _.forEach(r, (e) => {
            return n = this.removeRow(n, TabularHelper.getKeyFromRowCol(e, 0))
        }),
        n
    }
    removeRow(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(t).row;
        var r = _.assignIn({},
        e, {
            row: e.row - 1,
            elements: {}
        });
        return TabularCellHelper.cellLoop(e, (e) => {
            var t = e.key;
            var i = e.rIndex;
            var s = e.cIndex;
            var l = e.rowSpan;
            var c = e.editor;
            if (i === n && l > 1 && (r.elements[t] = {
                hidden: void 0,
                colSpan: c.colSpan,
                rowSpan: l <= 2 ? void 0 : l - 1
            }), !_.inRange(i, n, n + 1)) {
                var d = TabularHelper.getKeyFromRowCol(i < n ? i : i - 1, s);
                r.elements[d] = _.assignIn({},
                c, r.elements[d])
            }
        }),
        r = TabularBehaviors.handleRemoveRow(r, n),
        r = u.normalizeCells(r)
    }
    hasRowSpan(e) {
        return !! e.rowSpan
    }
};
var E = new class {
    removeColumns(e, t) {
        var n = e;
        var r = _.chain(t).flatMap((t) => {
            var n = e.elements[t];
            if (this.hasColSpan(n)) {
                var r = TabularHelper.getTabularCellIndexFromKey(t);
                return _.map(_.range(r.column, r.column + n.colSpan), (e) => {
                    return TabularHelper.getKeyFromRowCol(r.row, e)
                })
            }
            return [t]
        }).map((e) => {
            return TabularHelper.getTabularCellIndexFromKey(e).column
        }).uniq().orderBy((e) => {
            return e
        },
        "desc").value();
        return _.forEach(r, (e) => {
            return n = this.removeColumn(n, TabularHelper.getKeyFromRowCol(0, e))
        }),
        n
    }
    removeColumn(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(t).column;
        var r = _.assignIn({},
        e, {
            column: e.column - 1,
            elements: {}
        });
        return TabularCellHelper.cellLoop(e, (e) => {
            var t = e.key;
            var i = e.rIndex;
            var s = e.cIndex;
            var l = e.colSpan;
            var c = e.editor;
            if (s === n && l > 1 && (r.elements[t] = {
                hidden: void 0,
                colSpan: l <= 2 ? void 0 : l - 1,
                rowSpan: c.rowSpan
            }), !_.inRange(s, n, n + 1)) {
                var d = TabularHelper.getKeyFromRowCol(i, s < n ? s : s - 1);
                r.elements[d] = _.assignIn({},
                c, r.elements[d])
            }
        }),
        r = TabularBehaviors.handleRemoveColumn(r, n),
        r = u.normalizeCells(r)
    }
    hasColSpan(e) {
        return !! e.colSpan
    }
};
var v = new class {
    getRangedKeys(e, t) {
        var n = TabularHelper.getMinMaxTabularKeyIndex([e, t]);
        var r = [];
        var a = n.minRow;
        for (; a <= n.maxRow; a++) {
            var i = n.minCol;
            for (; i <= n.maxCol; i++) r.push(TabularHelper.getKeyFromRowCol(a, i))
        }
        return r
    }
    findSafeCursorBackward(e, t, n) {
        var r;
        var i = TabularHelper.getTabularCellIndexFromKey(n);
        var o = Math.min(i.column, e.column - 1);
        var s = Math.min(i.row, e.row - 1);
        for (;;) {
            if (o < 0 && s <= 0) {
                r = null;
                break
            }
            if (o < 0 && (o = e.column - 1, s--), r = TabularHelper.getKeyFromRowCol(s, o), !TabularCellHelper.isHiddenEditor(e.elements[r])) break;
            o--
        }
        return _.assignIn({},
        t, {
            key: TabularHelper.getKeyFromRowCol(Math.max(s, 0), Math.max(o, 0)),
            selected: {
                lineIndex: 0,
                charIndex: 0
            }
        })
    }
    checkAndFindValidKeyPosition(e, t) {
        if (this.isMergeableTabularModel(t)) {
            if (!t.elements[e].hidden) return e;
            var n = TabularHelper.getTabularCellIndexFromKey(e);
            var r = 0;
            for (; r < t.row; r++) {
                var a = 0;
                for (; a < t.column; a++) {
                    var i = TabularHelper.getKeyFromRowCol(r, a);
                    var o = t.elements[i];
                    if (o.colSpan || o.rowSpan) {
                        var s = TabularCellHelper.getColSpan(o);
                        var c = TabularCellHelper.getRowSpan(o);
                        if (n.column >= a && a + s > n.column && n.row >= r && r + c > n.row) return i
                    }
                }
            }
            return e
        }
        return e
    }
    getRightAvailableCellKey(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(e);
        var r = n.column + TabularCellHelper.getColSpan(t.elements[e]);
        return r >= t.column ? null : this.checkAndFindValidKeyPosition(TabularHelper.getKeyFromRowCol(n.row, r), t)
    }
    getLeftAvailableCellKey(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(e);
        var r = n.column - 1;
        return r < 0 ? null : this.checkAndFindValidKeyPosition(TabularHelper.getKeyFromRowCol(n.row, r), t)
    }
    getAboveAvailableCellKey(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(e);
        var r = n.row - 1;
        return r < 0 ? null : this.checkAndFindValidKeyPosition(TabularHelper.getKeyFromRowCol(r, n.column), t)
    }
    getBelowAvailableCellKey(e, t) {
        var n = TabularHelper.getTabularCellIndexFromKey(e);
        var r = n.row + TabularCellHelper.getRowSpan(t.elements[e]);
        return r >= t.row ? null : this.checkAndFindValidKeyPosition(TabularHelper.getKeyFromRowCol(r, n.column), t)
    }
    isMergeableTabularModel(e) {
        return "\\table" == e.text || "\\latex-table" == e.text
    }
};
var TabularUtils = new class {
    getRowSpan(e) {
        return TabularCellHelper.getRowSpan(e)
    }
    getColSpan(e) {
        return TabularCellHelper.getColSpan(e)
    }
    makeSureNoWidthForHiddenColumn(e) {
        return u.makeSureNoWidthForHiddenColumn(e)
    }
    removeRows(e, t) {
        return A.removeRows(e, t)
    }
    isMergable(e, t) {
        return y.isMergable(e, t)
    }
    mergeCells(e, t) {
        return y.mergeCells(e, t)
    }
    unmergeCells(e, t) {
        return y.unmergeCells(e, t)
    }
    getRangedKeys(e, t) {
        return v.getRangedKeys(e, t)
    }
    findSafeCursorBackward(e, t, n) {
        return v.findSafeCursorBackward(e, t, n)
    }
    checkAndFindValidKeyPosition(e, t) {
        return v.checkAndFindValidKeyPosition(e, t)
    }
    getRightAvailableCellKey(e, t) {
        return v.getRightAvailableCellKey(e, t)
    }
    getLeftAvailableCellKey(e, t) {
        return v.getLeftAvailableCellKey(e, t)
    }
    getAboveAvailableCellKey(e, t) {
        return v.getAboveAvailableCellKey(e, t)
    }
    getBelowAvailableCellKey(e, t) {
        return v.getBelowAvailableCellKey(e, t)
    }
    getTabularKeysSelected(e) {
        return e.isTabularCellsSelected() ? e.getTabularCellKeysSelected() : [BlockHelper.findLeafParentSelected(e.getJointSelected()).key]
    }
    modifyEditors(e, t, n) {
        var r = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var a = 0;
        for (; a < t.length; a++) {
            var i = t[a];
            var o = e.elements[i];
            r.elements[i] = n(o, i)
        }
        return r
    }
    normalizeCells(e) {
        return u.normalizeCells(e)
    }
    recalculateColumnWidth(e, t) {
        if (!e.columnWidths) return e;
        var n = _.clone(e);
        var r = (n = u.makeSureNoWidthForHiddenColumn(n)).columnWidths.slice(0, n.column).filter((e) => {
            return e
        });
        var a = _.sumBy(r, (e) => {
            return e + 1
        });
        var i = Math.max(0, n.column - r.length);
        if (t - a > 10 * i) return n;
        var s = r.length;
        var l = 10 * i - (t - a);
        var c = Math.ceil(l / s);
        var d = 0;
        var h = l;
        return n.columnWidths = _.map(n.columnWidths, (e) => {
            return e ? d === s - 1 ? e - h : (d++, h = h - c, e - c) : e
        }),
        n
    }
    replaceAtKey(e, t, n) {
        var r = TabularHelper.getTabularCellIndexFromKey(t);
        var a = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var i = 0;
        for (; i < n.row; i++) {
            var o = 0;
            for (; o < n.column; o++) {
                var l = TabularHelper.getKeyFromRowCol(i + r.row, o + r.column);
                var c = TabularHelper.getKeyFromRowCol(i, o);
                a.elements[l] = n.elements[c]
            }
        }
        return a.row = Math.max(a.row, r.row + n.row),
        a.column = Math.max(a.column, r.column + n.column),
        this.normalizeCells(a)
    }
    insertNewRowBelow(e, t) {
        return m.insertNewRowBelow(e, t)
    }
    insertNewRowAbove(e, t) {
        return m.insertNewRowAbove(e, t)
    }
    insertColumnOnLeft(e, t) {
        return f.insertColumnOnLeft(e, t)
    }
    insertColumnOnRight(e, t) {
        return f.insertColumnOnRight(e, t)
    }
    removeColumns(e, t) {
        return E.removeColumns(e, t)
    }
    adjustModelByRowCollumn(e, t, n) {
        var r = _.assignIn({},
        e, {
            row: t,
            column: n,
            elements: _.clone(e.elements)
        });
        var i = 0;
        for (; i < t; i++) {
            var s = 0;
            for (; s < n; s++) {
                var l = TabularHelper.getKeyFromRowCol(i, s);
                if (!r.elements[l]) r.elements[l] = CreateEditorObject.createEmptyEditor()
            }
        }
        return r
    }
    countNumberOfVLinesMoreThan1InMergeCells(e, t, n) {
        if (!e.vLines) return 0;
        var r = 0;
        var a = t + 1;
        for (; a < t + n; a++) {
            var i = e.vLines[a];
            if (i && i.nOfLines > 1) r = r + (i.nOfLines - 1)
        }
        return r
    }
    isPartialVLine(e, t) {
        return e.vLines && e.vLines[t] && !!e.vLines[t].borders
    }
}

export default TabularUtils