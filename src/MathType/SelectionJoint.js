import BlockHelper from '../Elements/BlockHelper';
import TabularHelper from '../Tabular/TabularHelper';
import TabularUtils from '../Tabular/TabularUtils';

/// xxx(1657) /*SelectionJoint*/

/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var L = n(15)/*TabularHelper*/;  // 8 times
/// var b = n(45)/*TabularUtils*/;  // 1 times
class SelectionJoint {
    constructor(e, t) {
        if (this.fromLineIndex = e.lineIndex, this.fromCharIndex = e.charIndex, this.toLineIndex = t.lineIndex, this.toCharIndex = t.charIndex, this.fromSelected = e, this.toSelected = t, this.isSelectionRangeReverted()) {
            var n = this.fromSelected;
            this.fromSelected = this.toSelected;
            this.toSelected = n;
            this.revertLineAndCharFromTo();
        }
        if (!this.isSameRoute()) {
            if (this.isSelectedInComposite()) {
                this.toCharIndex += 1;
            }
        }
    }
    getJoinStartSelected() {
        return this.innerGetJoinStartSelected(this.fromSelected, this.toSelected);
    }
    isSameLine() {
        return this.fromLineIndex === this.toLineIndex;
    }
    innerGetJoinStartSelected(e, t) {
        return null == e.key || null == t.key ? {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex
        } : e.lineIndex === t.lineIndex && e.charIndex === t.charIndex && e.key === t.key ? {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex,
            key: e.key,
            selected: this.innerGetJoinStartSelected(e.selected, t.selected)
        } : e.lineIndex === t.lineIndex && e.charIndex === t.charIndex && TabularHelper.isKeyInTabularFormat(e.key) && TabularHelper.isKeyInTabularFormat(t.key) ? {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex,
            keys: this.innerGetTabularSelectedKeys(e.key, t.key)
        } : {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex
        };
    }
    forEach(e, t) {
        if (!this.isSameRoute()) {
            var n = false;
            var r = () => {
                n = true;
            };
            var a = this.fromLineIndex;
            for (; a <= this.toLineIndex; a++) {
                var i = e[a];
                if (! (i.blocks.length <= 0)) {
                    var o = 0;
                    var s = i.blocks.length - 1;
                    if (a === this.fromLineIndex) {
                        var l = BlockHelper.blockFromIndex(i, this.fromCharIndex);
                        if (null == l) {
                            continue;
                        }
                        o = l.blockIndex;
                    }
                    if (a === this.toLineIndex) {
                        var c = BlockHelper.blockFromIndex(i, this.toCharIndex - 1);
                        if (null == c) {
                            continue;
                        }
                        s = c.blockIndex;
                    }
                    var d = o;
                    for (; d <= s; d++) {
                        if (t(i.blocks[d], a, d, r), n) {
                            return;
                        }
                    }
                }
            }
        }
    }
    isTabularRoute() {
        return this.fromSelected.lineIndex === this.toSelected.lineIndex && this.fromSelected.charIndex === this.toSelected.charIndex && (TabularHelper.isKeyInTabularFormat(this.fromSelected.key) && TabularHelper.isKeyInTabularFormat(this.toSelected.key));
    }
    innerGetTabularSelectedKeys(e, t) {
        return TabularUtils.getRangedKeys(e, t);
    }
    getTabularSelectedKeys() {
        return this.innerGetTabularSelectedKeys(this.fromSelected.key, this.toSelected.key);
    }
    isSameRoute() {
        return this.fromLineIndex === this.toLineIndex && this.fromCharIndex === this.toCharIndex && (null == this.fromSelected && null == this.toSelected || this.fromSelected.key === this.toSelected.key);
    }
    isSameOrBefore(e, t) {
        if (e.lineIndex === t.lineIndex && e.charIndex === t.charIndex) {
            if (!e.selected && t.selected) {
                return true;
            }
            if (e.selected && !t.selected) {
                return false;
            }
            if (!e.selected && !t.selected) {
                return true;
            }
            if (e.key && t.selected.key && TabularHelper.isKeyInTabularFormat(e.key) && TabularHelper.isKeyInTabularFormat(t.key)) {
                var n = TabularHelper.getTabularCellIndexFromKey(e.key);
                var r = TabularHelper.getTabularCellIndexFromKey(t.key);
                if (n.row < r.row) {
                    return true;
                }
                if (n.row > r.row) {
                    return false;
                }
                if (n.column < r.column) {
                    return true;
                }
                if (n.column > r.column) {
                    return false;
                }
            }
            return this.isSameOrBefore(e.selected, t.selected);
        }
        return e.lineIndex < t.lineIndex || !(e.lineIndex > t.lineIndex) && e.charIndex <= t.charIndex;
    }
    isSelectionRangeReverted() {
        return !this.isSameOrBefore(this.fromSelected, this.toSelected);
    }
    revertLineAndCharFromTo() {
        var e = {
            toLineIndex: this.toLineIndex,
            toCharIndex: this.toCharIndex
        };
        this.toLineIndex = this.fromLineIndex;
        this.toCharIndex = this.fromCharIndex;
        this.fromLineIndex = e.toLineIndex;
        this.fromCharIndex = e.toCharIndex;
    }
    isSelectedInComposite() {
        return null != this.toSelected.selected;
    }
}
/*n.d(t, "a", function () {
    return SelectionJoint;
})*/

export default SelectionJoint