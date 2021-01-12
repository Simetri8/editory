import _ from 'lodash';
import TabularCellHelper from './TabularCellHelper';

/// xxx(224) /*TabularExtraction*/

/// var r = n(64)/*TabularCellHelper*/;  // 1 times
/// var a = n(2)/*lodash*/;  // 2 times
/// var i = n.n(a);
var TabularExtraction = new class {
    extractInformation(e) {
        var t = {
            vLineIndexesPartialInMergedRows: [],
            hLineIndexesPartialInMergedColumns: [],
            hLineHiddenPositions: [],
            vLineHiddenPositions: []
        };
        TabularCellHelper.cellLoop(e, (n) => {
            var r = n.rIndex;
            var a = n.cIndex;
            var i = n.colSpan;
            var o = n.rowSpan;
            if (o > 1) {
                if (e.vLines && e.vLines[a] && e.vLines[a].borders) {
                    t.vLineIndexesPartialInMergedRows.push(a);
                }
                if (e.vLines && e.vLines[a + i] && e.vLines[a + i].borders) {
                    t.vLineIndexesPartialInMergedRows.push(a + i);
                }
            }
            if (i > 1) {
                if (e.hLines && e.hLines[r] && e.hLines[r].borders) {
                    t.hLineIndexesPartialInMergedColumns.push(r);
                }
                if (e.hLines && e.hLines[r + o] && e.hLines[r + o].borders) {
                    t.hLineIndexesPartialInMergedColumns.push(r + o);
                }
            }
            if (o > 1 || i > 1) {
                this.extractHiddenLines(n, t);
            }
        });
        t.vLineIndexesPartialInMergedRows = _.uniq(t.vLineIndexesPartialInMergedRows);
        t.hLineIndexesPartialInMergedColumns = _.uniq(t.hLineIndexesPartialInMergedColumns);
        return t;
    }
    extractHiddenLines(e, t) {
        var n = e.rIndex;
        for (; n < e.rIndex + e.rowSpan; n++) {
            var r = e.cIndex;
            for (; r < e.cIndex + e.colSpan; r++) {
                if (r > e.cIndex) {
                    t.vLineHiddenPositions.push({
                        lineIndex: r,
                        sectionIndex: n
                    });
                }
                if (n > e.rIndex) {
                    t.hLineHiddenPositions.push({
                        lineIndex: n,
                        sectionIndex: r
                    });
                }
            }
        }
    }
}

export default TabularExtraction