import _ from 'lodash';
import BlockHelper from '../Elements/BlockHelper';
import TabularCellHelper from '../Tabular/TabularCellHelper';

/// xxx(331) /*MergeableBehaviors*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(12)/*BlockHelper*/;  // 4 times
/// var o = n(64)/*TabularCellHelper*/;  // 4 times
class s {
    handleExtractTabular(e, t) {
        throw new Error("Method not implemented.")
    }
    shouldHandle(e) {
        throw new Error("Method not implemented.")
    }
    handleInsertColumnOnLeft(e, t) {
        return this.expandColSpan(e, t)
    }
    handleInsertColumnOnRight(e, t) {
        return this.expandColSpan(e, t)
    }
    handleInsertNewRowBelow(e, t) {
        return this.expandRowSpan(e, t)
    }
    handleInsertNewRowAbove(e, t) {
        return this.expandRowSpan(e, t)
    }
    handleRemoveColumn(e, t) {
        return this.decreaseColSpanWithRemovedColumn(e, t)
    }
    handleRemoveRow(e, t) {
        return this.decreaseRowSpanWithRemovedRow(e, t)
    }
    normalizeTabular(e) {
        throw new Error("Method not implemented.")
    }
    expandColSpan(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return TabularCellHelper.cellLoop(n, e => {
            var r = e.hidden,
            i = e.colSpan,
            o = e.cIndex,
            s = e.key,
            l = e.editor; ! r && t > o && o + i > t && (n.elements[s] = _.assignIn({},
            l, {
                colSpan: i + 1
            }))
        }),
        n
    }
    expandRowSpan(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return TabularCellHelper.cellLoop(n, e => {
            var r = e.hidden,
            i = e.rowSpan,
            o = e.rIndex,
            s = e.key,
            l = e.editor; ! r && t > o && o + i > t && (n.elements[s] = _.assignIn({},
            l, {
                rowSpan: i + 1
            }))
        }),
        n
    }
    decreaseRowSpanWithRemovedRow(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return TabularCellHelper.cellLoop(n, e => {
            var r = e.key,
            i = e.rIndex,
            o = e.rowSpan,
            s = e.editor;
            i < t && i + o > t && (n.elements[r] = _.assignIn({},
            s, {
                rowSpan: o <= 2 ? void 0 : o - 1
            }))
        }),
        n
    }
    decreaseColSpanWithRemovedColumn(e, t) {
        var n = BlockHelper.cloneCompositeBlockWithNewElements(e);
        return TabularCellHelper.cellLoop(n, e => {
            var r = e.key,
            i = e.cIndex,
            o = e.colSpan,
            s = e.editor;
            i < t && i + o > t && (n.elements[r] = _.assignIn({},
            s, {
                colSpan: o <= 2 ? void 0 : o - 1
            }))
        }),
        n
    }
}

export default s