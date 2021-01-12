import _ from 'lodash';
import BlockHelper from '../Elements/BlockHelper';
import TabularCellHelper from './TabularCellHelper';
import TabularHelper from './TabularHelper';

/// xxx(330) /*TableNormalizer*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(12)/*BlockHelper*/;  // 1 times
/// var o = n(64)/*TabularCellHelper*/;  // 2 times
/// var s = n(2)/*lodash*/;  // 2 times
/// var l = n.n(s);
/// var c = n(15)/*TabularHelper*/;  // 3 times
var TableNormalizer = new class {
    normalizeCells(e) {
        var t = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.normalizeColSpanAndRowSpan(t),
        this.normalizeHiddenCells(t),
        t
    }
    normalizeColSpanAndRowSpan(e) {
        TabularCellHelper.cellLoop(e, t => {
            var n = t.key,
            r = t.colSpan,
            i = t.rowSpan,
            o = t.rIndex,
            s = t.cIndex;
            if (r > 1) {
                var l = Math.min(r, this.countPossibleColumnSpans(e, o, s));
                r != l && (e.elements[n] = _.assignIn({},
                e.elements[n], {
                    colSpan: l <= 1 ? void 0 : l
                }))
            }
            if (i > 1) {
                var c = Math.min(i, this.countPossibleRowSpans(e, o, s));
                i != c && (e.elements[n] = _.assignIn({},
                e.elements[n], {
                    rowSpan: c <= 1 ? void 0 : c
                }))
            }
        })
    }
    countPossibleColumnSpans(e, t, n) {
        for (var r = 1, a = n + 1; a < e.column; a++) {
            var i = TabularHelper.getKeyFromRowCol(t, a),
            o = e.elements[i];
            if (o && (o.colSpan || o.rowSpan)) break;
            r++
        }
        return r
    }
    countPossibleRowSpans(e, t, n) {
        for (var r = 1, a = t + 1; a < e.row; a++) {
            var i = TabularHelper.getKeyFromRowCol(a, n),
            o = e.elements[i];
            if (o && (o.colSpan || o.rowSpan)) break;
            r++
        }
        return r
    }
    normalizeHiddenCells(e) {
        var t = this.buildCellMatrix(e);
        TabularCellHelper.cellLoop(e, n => {
            var r = n.rIndex,
            i = n.cIndex,
            o = n.hidden,
            s = n.editor,
            c = n.key;
            if ( !! t[r][i].hidden != o) return o ? (e.elements[c] = _.clone(s), void delete e.elements[c].hidden) : void(e.elements[c] = _.assignIn({},
            s, {
                hidden: !0
            }))
        })
    }
    buildCellMatrix(e) {
        for (var t = new Array(e.row), n = 0; n < e.row; n++) t[n] = _.times(e.column, () => ({
            hidden: !1
        }));
        for (var r = 0; r < e.row; r++) for (var a = 0; a < e.column; a++) {
            var i = TabularHelper.getKeyFromRowCol(r, a),
            o = e.elements[i];
            (o.colSpan || o.rowSpan) && this.fillHiddenSection(t, r, a, o.colSpan || 1, o.rowSpan || 1)
        }
        return t
    }
    fillHiddenSection(e, t, n, r, a) {
        for (var i = t; i < t + a; i++) for (var o = n; o < n + r; o++) i === t && o === n || (e[i][o].hidden = !0)
    }
}

export default TableNormalizer