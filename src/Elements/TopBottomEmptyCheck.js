import BlockHelper from './BlockHelper';

/// xxx(231) /*TopBottomEmptyCheck*/

/// var r = n(12)/*BlockHelper*/;  // 4 times
var TopBottomEmptyCheck = new class {
    isBothTopBottomEmpty(e) {
        var t = !0;
        var n = !0;
        e.powerValue && (t = BlockHelper.isEditorEmpty(e.powerValue));
        e.indexValue && (n = BlockHelper.isEditorEmpty(e.indexValue));
        return t && n
    }
    isTopEmpty(e) {
        return !e.powerValue || BlockHelper.isEditorEmpty(e.powerValue)
    }
    isBottomEmpty(e) {
        return !e.indexValue || BlockHelper.isEditorEmpty(e.indexValue)
    }
}

export default TopBottomEmptyCheck