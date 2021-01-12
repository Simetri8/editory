import _ from 'lodash';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TableNormalizer from './TableNormalizer';
import TabularHelper from './TabularHelper';

/// xxx(329) /*TabularNormalizer*/

/// var r = n(2)/*lodash*/;  // 1 times
/// var a = n.n(r);
/// var i = n(7)/*PropUpdateHelper*/;  // 1 times
/// var o = n(330)/*TableNormalizer*/;  // 1 times
/// var s = n(15)/*TabularHelper*/;  // 1 times
var TabularNormalizer = new class {
    normalizeCells(e) {
        var t = TableNormalizer.normalizeCells(e);
        return t = this.makeSureNoWidthForHiddenColumn(t)
    }
    makeSureNoWidthForHiddenColumn(e) {
        if (!e.columnWidths) return e;
        for (var t = _.clone(e), n = 0; n < e.column; n++) e.columnWidths[n] && this.isColumHidden(e, n) && (t.columnWidths = PropUpdateHelper.setIndex(t.columnWidths, n, void 0));
        return t
    }
    isColumHidden(e, t) {
        for (var n = 0; n < e.row; n++) {
            var r = TabularHelper.getKeyFromRowCol(n, t);
            if (!e.elements[r].hidden) return !1
        }
        return !0
    }
}

export default TabularNormalizer