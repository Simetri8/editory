import _ from 'lodash';

/// xxx(1632) /*CursorHistory*/

/// var C = n(2)/*lodash*/;  // 2 times
/// var x = n.n(C);
class CursorHistory {
    constructor() {
        this.stack = [];
    }
    handle(e) {
        if ("left" != e && "right" != e) {
            return this.clear(),
            null;
        }
        if (this.stack.length <= 0) {
            return null;
        }
        var t = _.last(this.stack);
        return t.historyDirection === e ? (this.stack.pop(), t.cursorPosition) : null;
    }
    isTheSame(e, t) {
        return e.lineIndex === t.lineIndex && e.charIndex === t.charIndex && e.editor === t.editor;
    }
    push(e, t) {
        var n = _.last(this.stack);
        if (! (n && this.isTheSame(n.cursorPosition, e))) {
            if (n && n.historyDirection != t) {
                this.clear();
            }
            this.stack.push({
                cursorPosition: e,
                historyDirection: t
            });
        }
    }
    clear() {
        if (this.stack.length > 0) {
            this.stack = [];
        }
    }
}
/*n.d(t, "a", function () {
    return CursorHistory;
})*/

export default CursorHistory