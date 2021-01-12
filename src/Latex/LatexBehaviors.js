import _ from 'lodash';
import MergeableBehaviors from '../Editor/MergeableBehaviors';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TableNormalizer from '../Tabular/TableNormalizer';
import TabularExtraction from '../Tabular/TabularExtraction';
import Toggler from '../Editor/Toggler';

/// xxx(285) /*LatexBehaviors*/

/// var r = n(3)/*_.assignIn*/;  // 12 times
/// var a = n.n(r);
/// var i = n(7)/*PropUpdateHelper*/;  // 11 times
/// var o = n(146)/*Toggler*/;  // 4 times
/// var s = n(2)/*lodash*/;  // 2 times
/// var l = n.n(s);
/// var c = n(331)/*MergeableBehaviors*/;  // 1 times
/// var d = n(330)/*TableNormalizer*/;  // 1 times
/// var h = n(224)/*TabularExtraction*/;  // 1 times
var LatexBehaviors = new class {
    constructor() {
        this.mergeableBehavior = new MergeableBehaviors
    }
    handleExtractTabular(e, t) {
        var n = e;
        return n.vLines && (n = _.assignIn({},
        n, {
            vLines: n.vLines.slice(t.minCol, t.maxCol + 2)
        })),
        n.hLines && (n = _.assignIn({},
        n, {
            hLines: n.hLines.slice(t.minRow, t.maxRow + 2)
        })),
        n
    }
    shouldHandle(e) {
        return "\\latex-table" == e.text
    }
    handleInsertColumnOnLeft(e, t) {
        var n = this.mergeableBehavior.handleInsertColumnOnLeft(e, t);
        return this.handleInsertColumn(n, t)
    }
    handleInsertColumnOnRight(e, t) {
        var n = this.mergeableBehavior.handleInsertColumnOnRight(e, t);
        return this.handleInsertColumn(n, t)
    }
    handleInsertNewRowBelow(e, t) {
        var n = this.mergeableBehavior.handleInsertNewRowBelow(e, t);
        return this.handleInsertRow(n, t)
    }
    handleInsertNewRowAbove(e, t) {
        var n = this.mergeableBehavior.handleInsertNewRowAbove(e, t);
        return this.handleInsertRow(n, t)
    }
    handleRemoveColumn(e, t) {
        var n = this.mergeableBehavior.handleRemoveColumn(e, t);
        return n.vLines && (n.vLines = PropUpdateHelper.remove(n.vLines, t)),
        n.columnWidths && (n.columnWidths = PropUpdateHelper.remove(n.columnWidths, t)),
        n.hLines && (n = _.assignIn({},
        n, {
            hLines: n.hLines.map((n, r) => {
                if (n && n.borders) {
                    var a = PropUpdateHelper.remove(n.borders, t);
                    return Toggler.normalizeLineInfo(a, n, e.column, 0 === r || r >= e.row)
                }
                return n
            })
        })),
        n
    }
    handleRemoveRow(e, t) {
        var n = this.mergeableBehavior.handleRemoveRow(e, t);
        return n.hLines && (n.hLines = PropUpdateHelper.remove(n.hLines, t)),
        n.vLines && (n = _.assignIn({},
        n, {
            vLines: n.vLines.map((n) => {
                if (n && n.borders) {
                    var r = PropUpdateHelper.remove(n.borders, t);
                    return Toggler.normalizeLineInfo(r, n, e.row, false)
                }
                return n
            })
        })),
        n
    }
    normalizeTabular(e) {
        var t = TableNormalizer.normalizeCells(e);
        return this.adjustHLineInMergeCells(t)
    }
    adjustHLineInMergeCells(e) {
        if (!e.hLines) return e;
        var t = e;
        var n = 1;
        for (; n < e.row; n++) {
            var r = e.hLines[n];
            if (r && r.nOfLines > 0 && this.isHLineInMergeRow(t, n)) t = _.assignIn({},
            t, {
                hLines: PropUpdateHelper.setIndex(t.hLines, n, _.assignIn({},
                r, {
                    nOfLines: 1
                }))
            })
        }
        return t
    }
    isHLineInMergeRow(e, t) {
        return TabularExtraction.extractInformation(e).hLineHiddenPositions.some((e) => {
            return e.lineIndex === t
        })
    }
    handleInsertColumn(e, t) {
        var n = e;
        if (n.vLines) {
            var r = (n = _.assignIn({},
            n, {
                vLines: PropUpdateHelper.insert(n.vLines, t, null)
            })).vLines[t - 1];
            if (r) {
                if (r.nOfLines > 0) n.vLines[t] = _.assignIn({},
                r, {
                    nOfLines: 1
                });
                if (r.borders) n.vLines[t] = _.clone(r)
            }
        }
        return n.columnWidths && (n = _.assignIn({},
        n, {
            columnWidths: PropUpdateHelper.insert(n.columnWidths, t, null)
        })),
        n.hLines && (n = _.assignIn({},
        n, {
            hLines: n.hLines.map((n, r) => {
                if (!n) return n;
                if (n.borders) {
                    var a = PropUpdateHelper.insert(n.borders, t, false);
                    return a[t - 1] && a[t + 1] && (a[t] = true),
                    Toggler.normalizeLineInfo(a, n, e.column, 0 === r || r >= e.row)
                }
                return n
            })
        })),
        n
    }
    handleInsertRow(e, t) {
        var n = e;
        if (n.hLines) {
            var r = (n = _.assignIn({},
            n, {
                hLines: PropUpdateHelper.insert(n.hLines, t, null)
            })).hLines[t - 1];
            if (r) {
                if (r.nOfLines > 0) n.hLines[t] = {
                    nOfLines: 1
                };
                if (r.borders) n.hLines[t] = _.clone(r)
            }
        }
        return n.vLines && (n = _.assignIn({},
        n, {
            vLines: n.vLines.map((n) => {
                if (!n) return n;
                if (n.borders) {
                    var r = PropUpdateHelper.insert(n.borders, t, false);
                    return r[t - 1] && r[t + 1] && (r[t] = true),
                    Toggler.normalizeLineInfo(r, n, e.row, false)
                }
                return n
            })
        })),
        n
    }
}

export default LatexBehaviors