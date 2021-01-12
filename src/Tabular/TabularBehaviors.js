import _ from 'lodash';
import BlockHelper from '../Elements/BlockHelper';
import LatexBehaviors from '../Latex/LatexBehaviors';
import MergeableBehaviors from '../Editor/MergeableBehaviors';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TabularNormalizer from './TabularNormalizer';

/// xxx(123) /*TabularBehaviors*/

/// var r = n(3);  // 7 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 7 times
/// var o = n.n(i);
/// var s = n(12)/*BlockHelper*/;  // 6 times
var l = new class {
    handleExtractTabular(e, t) {
        var n = this.normalizeAligns(e, t);
        return n = this.normalizeVLines(n, t),
        n = this.normalizeHLines(n, t)
    }
    normalizeAligns(e, t) {
        var n = e;
        return e.aligns && (n = _.assignIn({},
        n, {
            aligns: {}
        }), _.keys(e.aligns).forEach((r) => {
            var a = Number.parseInt(r, 10);
            if (a >= t.minCol && a <= t.maxCol) n.aligns[a - t.minCol] = e.aligns[a]
        })),
        n
    }
    normalizeVLines(e, t) {
        var n = e;
        return e.vLines && (n = _.assignIn({},
        n, {
            vLines: []
        }), e.vLines.forEach((e) => {
            if (e >= t.minCol && e <= t.maxCol + 1) n.vLines.push(e - t.minCol)
        })),
        n
    }
    normalizeHLines(e, t) {
        var n = e;
        return e.hLines && (n = _.assignIn({},
        n, {
            hLines: []
        }), e.hLines.forEach((e) => {
            if (e >= t.minRow && e <= t.maxRow + 1) n.hLines.push(e - t.minRow)
        })),
        n
    }
    normalizeTabular(e) {
        return e
    }
    handleRemoveColumn(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.removeVLinesAt(n, t),
        n
    }
    handleRemoveRow(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.removeHLinesAt(n, t),
        n
    }
    handleInsertNewRowBelow(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.adjustHLinesOneRowDown(n, t),
        n
    }
    handleInsertNewRowAbove(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.adjustHLinesOneRowDown(n, t),
        n
    }
    shouldHandle(e) {
        return "\\array" == e.text
    }
    handleInsertColumnOnLeft(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.adjustVLinesOneColumnRight(n, t),
        n
    }
    handleInsertColumnOnRight(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return this.adjustVLinesOneColumnRight(n, t),
        n
    }
    removeHLinesAt(e, t) {
        if (e.hLines) {
            var n = [];
            var r = 0;
            for (; r < e.hLines.length; r++) {
                var a = e.hLines[r];
                if (a < t) n.push(a);
                if (a > t) n.push(a - 1)
            }
            n = _.sortBy(n, (e) => {
                return e
            });
            e.hLines = n
        }
    }
    removeVLinesAt(e, t) {
        if (e.vLines) {
            var n = [];
            var r = 0;
            for (; r < e.vLines.length; r++) {
                var a = e.vLines[r];
                if (a < t) n.push(a);
                if (a > t) n.push(a - 1)
            }
            n = _.sortBy(n, (e) => {
                return e
            });
            e.vLines = n
        }
    }
    adjustHLinesOneRowDown(e, t) {
        if (e.hLines) {
            var n = _.clone(e.hLines);
            var r = 0;
            for (; r < e.hLines.length; r++) {
                var a = e.hLines[r];
                if (a === t) n.push(t);
                if (a >= t) n[r] = a + 1
            }
            n = _.sortBy(n, (e) => {
                return e
            });
            e.hLines = n
        }
    }
    adjustVLinesOneColumnRight(e, t) {
        if (e.vLines) {
            var n = _.clone(e.vLines);
            var r = 0;
            for (; r < e.vLines.length; r++) {
                var a = e.vLines[r];
                if (a === t) n.push(t);
                if (a >= t) n[r] = a + 1
            }
            n = _.sortBy(n, (e) => {
                return e
            });
            e.vLines = n
        }
    }
};
/// var c = n(7)/*PropUpdateHelper*/;  // 4 times
/// var d = n(329)/*TabularNormalizer*/;  // 1 times
/// var h = n(331)/*MergeableBehaviors*/;  // 1 times
var u = new class {
    constructor() {
        this.mergeableBehavior = new MergeableBehaviors
    }
    handleExtractTabular(e, t) {
        return e
    }
    normalizeTabular(e) {
        return TabularNormalizer.normalizeCells(e)
    }
    handleRemoveColumn(e, t) {
        var n = this.mergeableBehavior.handleRemoveColumn(e, t);
        return n.columnWidths ? _.assignIn({},
        n, {
            columnWidths: PropUpdateHelper.remove(n.columnWidths, t)
        }) : n
    }
    handleRemoveRow(e, t) {
        var n = this.mergeableBehavior.handleRemoveRow(e, t);
        return n.rowHeights ? _.assignIn({},
        n, {
            rowHeights: PropUpdateHelper.remove(n.rowHeights, t)
        }) : n
    }
    handleInsertNewRowBelow(e, t) {
        var n = this.mergeableBehavior.handleInsertNewRowBelow(e, t);
        return this.insertToRowHeights(n, t)
    }
    handleInsertNewRowAbove(e, t) {
        var n = this.mergeableBehavior.handleInsertNewRowAbove(e, t);
        return this.insertToRowHeights(n, t)
    }
    shouldHandle(e) {
        return "\\table" == e.text
    }
    handleInsertColumnOnLeft(e, t) {
        var n = this.mergeableBehavior.handleInsertColumnOnLeft(e, t);
        return this.recalculateColumnWidthsAfterInsert(n, t)
    }
    handleInsertColumnOnRight(e, t) {
        var n = this.mergeableBehavior.handleInsertColumnOnRight(e, t);
        return this.recalculateColumnWidthsAfterInsert(n, t)
    }
    recalculateColumnWidthsAfterInsert(e, t) {
        if (!e.columnWidths) return e;
        var n = _.assignIn({},
        e, {
            columnWidths: PropUpdateHelper.insert(e.columnWidths, t, 50)
        });
        var r = this.findColumnToReduceWidth(n, t);
        return r >= 0 && (n.columnWidths[r] -= 50),
        n
    }
    findColumnToReduceWidth(e, t) {
        if (!e.columnWidths) throw new Error("not supported");
        var n = t + 1;
        for (; n < e.columnWidths.length; n++) {
            var r = e.columnWidths[n];
            if (r && r >= 100) return n
        }
        var a = t - 1;
        for (; a >= 0; a--) {
            var i = e.columnWidths[a];
            if (i && i >= 100) return a
        }
        return null
    }
    insertToRowHeights(e, t) {
        return e.rowHeights ? _.assignIn({},
        e, {
            rowHeights: PropUpdateHelper.insert(e.rowHeights, t, null)
        }) : e
    }
};
/// var p = n(285)/*LatexBehaviors*/;  // 1 times
var TabularBehaviors = new class {
    constructor() {
        this.behaviors = [l, u, LatexBehaviors]
    }
    findBehaviors(e) {
        return this.behaviors.filter((t) => {
            return t.shouldHandle(e)
        })
    }
    handleInsertColumnOnLeft(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleInsertColumnOnLeft(e, t)
        },
        e)
    }
    handleInsertColumnOnRight(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleInsertColumnOnRight(e, t)
        },
        e)
    }
    handleInsertNewRowBelow(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleInsertNewRowBelow(e, t)
        },
        e)
    }
    handleInsertNewRowAbove(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleInsertNewRowAbove(e, t)
        },
        e)
    }
    handleRemoveColumn(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleRemoveColumn(e, t)
        },
        e)
    }
    handleRemoveRow(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleRemoveRow(e, t)
        },
        e)
    }
    normalizeTabular(e) {
        return this.findBehaviors(e).reduce((e, t) => {
            return t.normalizeTabular(e)
        },
        e)
    }
    handleExtractTabular(e, t) {
        return this.findBehaviors(e).reduce((e, n) => {
            return n.handleExtractTabular(e, t)
        },
        e)
    }
}

export default TabularBehaviors