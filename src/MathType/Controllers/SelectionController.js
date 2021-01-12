import _ from 'lodash';
import ActionDataController from './ActionDataController';
import BlockHelper from '../../Elements/BlockHelper';
import BlockUtils from '../../Elements/BlockUtils';
import CheckComponent from '../../Editor/CheckComponent';
import CheckObject from '../../Editor/CheckObject';
import DOMHelper from '../../Elements/DOMHelper';
import SelectionBuilder from '../SelectionBuilder';

/// xxx(1649) /*SelectionController*/

/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var C = n(2)/*lodash*/;  // 15 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 6 times
/// var M = n(22)/*CheckComponent*/;  // 7 times
/// var W = n(31)/*CheckObject*/;  // 1 times
/// var pe = n(58)/*BlockUtils*/;  // 2 times
/// var ActionDataController = n(1641)/*ActionDataController*/;  // 9 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 11 times
class LineCharIterator {
    constructor(e, t) {
        this.line = e;
        this.charIndex = t;
        var n = BlockHelper.blockFromIndex(e, t);
        if (null != n) {
            var r = t - n.startIndex;
            this.currentResult = {
                block: n.block,
                blockStartIndex: n.startIndex,
                blockEndIndex: n.endIndex,
                blockIndex: n.blockIndex,
                localIndex: r,
                char: CheckComponent.charFromLocalIndex(n.block, r),
                charIndex: t
            };
        }
    }
    clone() {
        return _.clone(this);
    }
    next() {
        if (null == this.currentResult) {
            return null;
        }
        if (this.charIndex += 1, this.charIndex > this.currentResult.blockEndIndex) {
            var e = this.currentResult.blockIndex + 1;
            if (e >= this.line.blocks.length) {
                this.currentResult = null;
                return null;
            }
            var t = this.line.blocks[e];
            var n = CheckComponent.getCharCount(t);
            this.currentResult = {
                block: t,
                blockIndex: e,
                blockStartIndex: this.currentResult.blockEndIndex + 1,
                blockEndIndex: this.currentResult.blockEndIndex + n,
                localIndex: 0,
                char: CheckComponent.charFromLocalIndex(t, 0),
                charIndex: this.charIndex
            }
            return this.currentResult;
        }
        var r = _.clone(this.currentResult);
        r.charIndex += 1;
        r.localIndex += 1;
        r.char = CheckComponent.charFromLocalIndex(this.currentResult.block, r.localIndex);
        this.currentResult = r;
        return this.currentResult;
    }
    back() {
        if (null == this.currentResult) {
            return null;
        }
        if (this.charIndex -= 1, this.charIndex < this.currentResult.blockStartIndex) {
            var e = this.currentResult.blockIndex - 1;
            if (e < 0) {
                this.currentResult = null;
                return null;
            }
            var t = this.line.blocks[e];
            var n = CheckComponent.getCharCount(t);
            this.currentResult = {
                block: t,
                blockIndex: e,
                blockStartIndex: this.currentResult.blockStartIndex - n,
                blockEndIndex: this.currentResult.blockStartIndex - 1,
                localIndex: n - 1,
                char: CheckComponent.charFromLocalIndex(t, n - 1),
                charIndex: this.charIndex
            };
            return this.currentResult;
        }
        var r = _.clone(this.currentResult);
        r.charIndex -= 1;
        r.localIndex -= 1;
        r.char = CheckComponent.charFromLocalIndex(this.currentResult.block, r.localIndex);
        this.currentResult = r;
        return this.currentResult;
    }
    nextWhile(e) {
        for (; null != this.currentResult && e(this.currentResult);) {
            this.next();
        }
        return this.currentResult;
    }
    backWhile(e) {
        for (; null != this.currentResult && e(this.currentResult);) {
            this.back();
        }
        return this.currentResult;
    }
    current() {
        return this.currentResult;
    }
}
class et {
    constructor(e, t, n) {
        this.editor = e;
        this.lineIndex = t;
        this.currentLine = e.lines[t];
        this.lineCharIterator = new LineCharIterator(this.currentLine, n);
        if (null == this.lineCharIterator.current() && t >= this.editor.lines.length - 1) {
            return null;
        }
        this.currentResult = this.fillWithLineInfoOrLineBreakResult(this.lineCharIterator.current(), n);
    }
    next() {
        if (this.currentResult && this.currentResult.isLineBreak) {
            this.lineIndex++;
            this.currentLine = this.editor.lines[this.lineIndex];
            this.lineCharIterator = new LineCharIterator(this.currentLine, 0);
            this.currentResult = this.fillWithLineInfoOrLineBreakResult(this.lineCharIterator.current());
            return this.currentResult;
        }
        var e = this.lineCharIterator.next();
        if (e) {
            this.currentResult = this.fillWithLineInfoOrLineBreakResult(e);
            return this.currentResult;
        } else {
            if (this.lineIndex >= this.editor.lines.length - 1) {
                this.currentResult = null;
                return null;
            } else {
                this.currentResult = this.lineBreakResult(this.currentResult.charIndex + 1);
                return this.currentResult;
            }
        }
    }
    lineBreakResult(e) {
        return {
            block: null,
            blockIndex: 0,
            blockStartIndex: 0,
            blockEndIndex: 0,
            charIndex: e || 0,
            line: this.currentLine,
            isLineBreak: true,
            lineIndex: this.lineIndex,
            localIndex: 0,
            char: null
        };
    }
    back() {
        if (this.currentResult && this.currentResult.isLineBreak) {
            this.lineCharIterator = new LineCharIterator(this.currentLine, Math.max(0, BlockHelper.getTotalChar(this.currentLine.blocks) - 1));
            var e = this.lineCharIterator.current();
        } else {
            e = this.lineCharIterator.back();
        }
        if (e) {
            this.currentResult = this.fillWithLineInfoOrLineBreakResult(e);
            return this.currentResult;
        } else {
            if (this.lineIndex <= 0) {
                this.currentResult = null;
                return null;
            } else {
                this.lineIndex--;
                this.currentLine = this.editor.lines[this.lineIndex];
                this.lineCharIterator = null;
                this.currentResult = this.fillWithLineInfoOrLineBreakResult(null, BlockHelper.getTotalChar(this.currentLine.blocks));
                return this.currentResult;
            }
        }
    }
    current() {
        return this.currentResult;
    }
    nextWhile(e) {
        for (; null != this.currentResult && e(this.currentResult);) {
            this.next();
        }
        return this.currentResult;
    }
    backWhile(e) {
        for (; null != this.currentResult && e(this.currentResult);) {
            this.back();
        }
        return this.currentResult;
    }
    fillWithLineInfoOrLineBreakResult(e, t) {
        if (null == e) {
            return this.lineBreakResult(t);
        }
        var n = e;
        n.line = this.currentLine;
        n.lineIndex = this.lineIndex;
        return n;
    }
}
var SelectionController = new class {
    moveToNextBreak(e, t) {
        var n = this.getNextBreakSelected(e);
        return null == n ? null : ActionDataController.cursorPosition(n.cloneSelected, n.leafSelected, t);
    }
    getNextBreakSelected(e) {
        var t = this.cloneBasicSelected(e.cursorSelected);
        var n = SelectionBuilder.getLeafSelected(t);
        var r = SelectionBuilder.getLeafEditor(e.model, t);
        var a = new et(r, n.lineIndex, n.charIndex);
        a.nextWhile((e) => {
            return " " == e.char;
        });
        var i = a.current();
        var o = this.getBlockCategory(i, e.isTextModeSelected());
        for (; a.next();) {
            i = a.current();
            var s = this.getBlockCategory(i, e.isTextModeSelected());
            if ("space" == s || "line-break" == s || o != s) {
                n.charIndex = i.charIndex;
                n.lineIndex = i.lineIndex;
                return {
                    cloneSelected: t,
                    leafSelected: _.clone(n)
                };
            }
        }
        var l = BlockHelper.getTotalCharLastLine(r);
        var c = r.lines.length - 1;
        if (n.lineIndex === c && n.charIndex === l) {
            return null;
        } else {
            n.charIndex = BlockHelper.getTotalCharLastLine(r);
            n.lineIndex = r.lines.length - 1;
            return {
                cloneSelected: t,
                leafSelected: _.clone(n)
            };
        }
    }
    getBlockCategory(e, t) {
        if (!e) {
            return "null";
        }
        if (e.isLineBreak) {
            return "line-break";
        }
        if (!e.block) {
            return "null";
        }
        if (CheckObject.isComposite(e.block)) {
            return "composite";
        }
        var n = e.char;
        if (" " == n) {
            return "space";
        } else {
            if (!t || "(" != n && ")" != n && "{" != n && "}" != n && "[" != n && "]" != n && "." != n && "," != n && ";" != n && '"' != n && "'" != n) {
                return "normal-char";
            } else {
                return "non-normal-char";
            }
        }
    }
    cloneBasicSelected(e) {
        return {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex,
            key: e.key,
            selected: _.cloneDeep(e.selected)
        };
    }
    getPreviousBreakSelected(e) {
        var t = this.cloneBasicSelected(e.cursorSelected);
        var n = SelectionBuilder.getLeafSelected(t);
        var r = SelectionBuilder.getLeafEditor(e.model, t);
        var a = new et(r, n.lineIndex, Math.max(0, n.charIndex - 1));
        a.backWhile((e) => {
            return " " == e.char;
        });
        var i = a.current();
        if (!i) {
            return null;
        }
        var o = this.getBlockCategory(i, e.isTextModeSelected());
        var s = e.isTextModeSelected();
        if (0 === i.charIndex && t.charIndex > 0) {
            return n.charIndex = i.charIndex,
            n.lineIndex = i.lineIndex,
            {
                cloneSelected: t,
                leafSelected: _.clone(n)
            };
        }
        for (; a.back();) {
            i = a.current();
            var l = this.getBlockCategory(i, s);
            if (0 === i.charIndex) {
                n.charIndex = i.charIndex;
                n.lineIndex = i.lineIndex;
                return {
                    cloneSelected: t,
                    leafSelected: _.clone(n)
                };
            }
            if ("line-break" == l) {
                n.charIndex = i.charIndex;
                n.lineIndex = i.lineIndex;
                return {
                    cloneSelected: t,
                    leafSelected: _.clone(n)
                };
            }
            if ("space" == l || l != o) {
                n.charIndex = i.charIndex + 1;
                n.lineIndex = i.lineIndex;
                return {
                    cloneSelected: t,
                    leafSelected: _.clone(n)
                };
            }
        }
        if (0 === n.lineIndex && 0 === n.charIndex) {
            return null;
        } else {
            n.charIndex = 0;
            n.lineIndex = 0;
            return {
                cloneSelected: t,
                leafSelected: _.clone(n)
            };
        }
    }
    moveToPreviousBreak(e, t) {
        var n = this.getPreviousBreakSelected(e);
        return null == n ? null : ActionDataController.cursorPosition(n.cloneSelected, n.leafSelected, t);
    }
    moveEndEditor(e, t) {
        var n = {
            lineIndex: e.model.lines.length - 1,
            charIndex: BlockHelper.getTotalCharLastLine(e.model)
        };
        return ActionDataController.cursorPosition(n, n, t);
    }
    handleDoubleClickForRoot(e) {
        var t = this.cloneBasicSelected(e.cursorSelected);
        var n = this.cloneBasicSelected(e.cursorSelected);
        var r = SelectionBuilder.getLeafSelected(t);
        var a = SelectionBuilder.getLeafSelected(n);
        var i = SelectionBuilder.getLeafEditor(e.model, e.cursorSelected);
        var o = new LineCharIterator(i.lines[r.lineIndex], r.charIndex);
        var s = o.clone();
        var l = o.current();
        if (null == l) {
            return ActionDataController.emptyResult();
        }
        a.charIndex = a.charIndex + 1;
        var c;
        var d;
        var h = this.getBlockCategory(l, e.isTextModeSelected());
        for (;;) {
            if (!o.next()) {
                if (c) {
                    a.charIndex = c.charIndex + 1;
                }
                break;
            }
            c = o.current();
            if (h != this.getBlockCategory(c, e.isTextModeSelected())) {
                a.charIndex = c.charIndex;
                break;
            }
        }
        for (;;) {
            if (!s.back()) {
                if (d) {
                    r.charIndex = d.charIndex;
                }
                break;
            }
            d = s.current();
            if (h != this.getBlockCategory(d, e.isTextModeSelected())) {
                r.charIndex = d.charIndex + 1;
                break;
            }
        }
        return ActionDataController.selection(t, n, _.clone(a));
    }
    handleTripleClick(e) {
        return this.selectWholeLine(e);
    }
    selectWholeLine(e) {
        var t = this.cloneBasicSelected(e.cursorSelected);
        var n = this.cloneBasicSelected(e.cursorSelected);
        var r = SelectionBuilder.getLeafSelected(n);
        var a = BlockUtils.getNumberOfCharsFromLine(DOMHelper.findLineByIndex(e.cursorPos.editor, r.lineIndex));
        SelectionBuilder.getLeafSelected(t).charIndex = 0;
        r.charIndex = a;
        return ActionDataController.selection(t, n, _.clone(r));
    }
    handleDoubleClick(e) {
        return e.isTextModeSelected() ? this.handleDoubleClickForRoot(e) : this.selectWholeLine(e);
    }
    moveFirstLine(e, t) {
        var n = this.cloneBasicSelected(e.cursorSelected);
        var r = SelectionBuilder.getLeafSelected(n);
        r.charIndex = 0;
        return ActionDataController.cursorPosition(n, _.clone(r), t);
    }
    moveEndLine(e, t) {
        var n = this.cloneBasicSelected(e.cursorSelected);
        var r = SelectionBuilder.getLeafSelected(n);
        r.charIndex = BlockUtils.getNumberOfCharsFromLine(DOMHelper.findLineByIndex(e.cursorPos.editor, r.lineIndex));
        return ActionDataController.cursorPosition(n, _.clone(r), t);
    }
    moveHome(t) {
        var n = {
            lineIndex: 0,
            charIndex: 0
        };
        return ActionDataController.cursorPosition(n, n, t);
    }
};
/*n.d(t, "a", function () {
    return SelectionController;
})*/

export default SelectionController