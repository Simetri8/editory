import _ from 'lodash';
import BlockUtils from '../Elements/BlockUtils';
import DOMHelper from '../Elements/DOMHelper';

/// xxx(75) /*CursorHelper*/

/*n.d(t, "a", function () {
    return c
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 7 times
/// var o = n(58)/*BlockUtils*/;  // 3 times
/// var s = n(2)/*lodash*/;  // 4 times
/// var l = n.n(s);
class c {
    constructor(e) {
        this.copiedCurPosition = e
    }
    static copyMetadata(e, t) {
        return t ? _.assignIn({},
        t, {
            direction: e.direction,
            maxRelativeXAxisPosition: e.maxRelativeXAxisPosition
        }) : t
    }
    withPositionOnRange(e) {
        return this.positionOnRange = e,
        this
    }
    withCopyPosition(e) {
        return this.copiedCurPosition = e,
        this
    }
    build() {
        var e = {
            line: this.line,
            lineIndex: this.findAndUpdateLineIndex(),
            charIndex: this.charIndex,
            editor: this.findAndUpdateEditor(),
            positionOnRange: this.positionOnRange
        };
        return this.copiedCurPosition && (e.direction = this.copiedCurPosition.direction, e.maxRelativeXAxisPosition = this.copiedCurPosition.maxRelativeXAxisPosition, e.positionOnRange = this.copiedCurPosition.positionOnRange),
        e
    }
    static build(e, t, n, r) {
        return {
            line: t,
            lineIndex: n,
            charIndex: r,
            editor: e
        }
    }
    static endOfLine(e, t) {
        var n = DOMHelper.findBlocks(e);
        return (new c).withLine(e).withEditor(t).withCharIndex(_.sumBy(n, e => BlockUtils.getNumberOfCharsInBlock(e))).build()
    }
    static endOfEditor(e) {
        var t = _.last(DOMHelper.findEditLines(e));
        return c.endOfLine(t, e)
    }
    static emptyLine(e, t) {
        return c.firstLine(e, t)
    }
    static firstLine(e, t) {
        return t = t || DOMHelper.closestEditor(e),
        {
            line: e,
            lineIndex: DOMHelper.findEditLineIndex(t, e),
            charIndex: 0,
            editor: t
        }
    }
    static fromBlock(e, t, n) {
        var r = e;
        if (null != r.startIndex) return c.fromCharIndex(r.startIndex, t, n);
        var a = BlockUtils.buildLineBlocks(t),
        i = _.find(a, t => t.element === e);
        return c.fromCharIndex(i.startIndex, t, n)
    }
    static fromCharIndex(e, t, n) {
        return (new c).withLine(t).withEditor(n).withCharIndex(e).build()
    }
    withLine(e) {
        return this.line = e,
        this
    }
    withEditor(e) {
        return this.editor = e,
        this
    }
    withCharIndex(e) {
        return this.charIndex = e,
        this
    }
    withCharIndexBySumOfBlocks(e) {
        return this.charIndex = _.sumBy(e, e => BlockUtils.getNumberOfCharsInBlock(e)),
        this
    }
    withLineIndex(e) {
        return this.lineIndex = e,
        this
    }
    findAndUpdateLineIndex() {
        if (null != this.lineIndex) return this.lineIndex;
        if (null == this.line) throw new Error("can not detect lineindex,missing line");
        var e = this.findAndUpdateEditor();
        if (DOMHelper.isEditAreaLine(e)) return 0;
        var t = DOMHelper.findEditLineIndex(e, this.line);
        if (t < 0) throw new Error("something wrong with line index");
        return this.lineIndex = t,
        t
    }
    findAndUpdateEditor() {
        if (this.editor) return this.editor;
        if (this.line) return DOMHelper.closestEditor(this.line);
        throw new Error("can not detect editor,missing and editor id")
    }
}

export default c