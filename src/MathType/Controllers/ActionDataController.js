import _ from 'lodash';
import BlockHelper from '../../Elements/BlockHelper';
import TabularHelper from '../../Tabular/TabularHelper';

/// xxx(1641) /*ActionDataController*/

/// var C = n(2)/*lodash*/;  // 6 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 9 times
/// var L = n(15)/*TabularHelper*/;  // 2 times
class ActionDataController {
    constructor() {
        this.surpressClearCursorHistory = false;
        this.surpressScrollToCursor = false;
        this.isOneLineChanged = false;
    }
    static stopComposition() {
        var e = new ActionDataController;
        return e.action = "StopComposition",
        e;
    }
    static requestImageLibrary(e) {
        var t = new ActionDataController;
        return t.action = "RequestImageLibrary",
        t.data = {
            isInlineImage: e
        },
        t;
    }
    static message(e, t) {
        var n = new ActionDataController;
        return n.action = "ShowMessage",
        n.data = {
            message: t,
            type: e
        },
        n;
    }
    static isEmptyResult(e) {
        return !e || !e.action;
    }
    static insertRowColumnIndication() {
        var e = new ActionDataController;
        return e.action = "InsertRowColumnIndication",
        e;
    }
    static emptyResult(e) {
        var t = new ActionDataController;
        return e && (t.keyInfo = e),
        t;
    }
    static confirmDelete(e) {
        var t = new ActionDataController;
        return t.action = "ConfirmDelete",
        t.data = e,
        t;
    }
    static emptyResultPreventDefault() {
        var e = ActionDataController.emptyResult();
        return e.keyInfo = {
            noPreventDefault: false,
            clearHiddenIputText: false
        },
        e;
    }
    static cursorPosition(e, t, n) {
        var r = new ActionDataController;
        return r.action = "ModelCursorPosition",
        r.data = {
            toSelected: e,
            cursorPosition: t,
            selection: n
        },
        r;
    }
    static selection(e, t, n, r) {
        var a = new ActionDataController;
        return a.action = "Selection",
        a.data = {
            fromSelected: e,
            toSelected: t,
            cursorPosition: n
        },
        a.surpressScrollToCursor = r,
        a;
    }
    static selectAllMathMode(e) {
        var t = e.findOuterMostMathScope();
        if (!t) {
            return null;
        }
        var n = t.block.text;
        return "\\inline-math" == n || "\\math-container" == n || "\\multiline" == n ? ActionDataController.selectAllForEditorScope(t, "mathValue") : "\\gather" == n || "\\align" == n ? ActionDataController.selectAllForTabularMathScope(t) : void 0;
    }
    static selectAll(e) {
        var t;
        if (!e.isTextModeSelected() && (t = ActionDataController.selectAllMathMode(e)), t) {
            return t;
        }
        if (e.isInsideDiagram()) {
            var n = e.findOuterMostDiagramEditorScope();
            return n ? ActionDataController.selectAllForEditorScope(n, n.key) : ActionDataController.emptyResult();
        }
        var r = {
            lineIndex: e.model.lines.length - 1,
            charIndex: BlockHelper.getTotalCharLastLine(e.model)
        };
        return ActionDataController.selection({
            lineIndex: 0,
            charIndex: 0
        },
        r, r);
    }
    static selectAllForTabularMathScope(e) {
        var t = e.block;
        var n = TabularHelper.getKeyFromRowCol(0, 0);
        var r = TabularHelper.getKeyFromRowCol(t.row - 1, t.column - 1);
        var a = t.elements[r];
        var i = _.cloneDeep(e.selectedFromRoot);
        var o = BlockHelper.findLeafSelected(i);
        o.key = n;
        o.selected = {
            lineIndex: 0,
            charIndex: 0
        };
        var s = _.cloneDeep(e.selectedFromRoot);
        var l = BlockHelper.findLeafSelected(s);
        return l.key = r,
        l.selected = {
            lineIndex: a.lines.length - 1,
            charIndex: BlockHelper.getTotalCharLastLine(a)
        },
        ActionDataController.selection(i, s, _.cloneDeep(BlockHelper.findLeafSelected(l)), true);
    }
    static selectAllForEditorScope(e, t) {
        var n = e.block.elements[t];
        var r = _.cloneDeep(e.selectedFromRoot);
        var a = BlockHelper.findLeafSelected(r);
        a.key = t;
        a.selected = {
            lineIndex: 0,
            charIndex: 0
        };
        var i = _.cloneDeep(e.selectedFromRoot);
        var o = BlockHelper.findLeafSelected(i);
        return o.key = t,
        o.selected = {
            lineIndex: n.lines.length - 1,
            charIndex: BlockHelper.getTotalCharLastLine(n)
        },
        ActionDataController.selection(r, i, _.cloneDeep(BlockHelper.findLeafSelected(o)), true);
    }
    static clearCopy() {
        var e = new ActionDataController;
        return e.action = "ClearCopy",
        e;
    }
    static prepareCopy(e) {
        var t = new ActionDataController;
        return t.action = "PrepareCopy",
        t.copiedLines = e,
        t;
    }
    static fromDataOrCursorSelectedInfoChanged(e, t, n) {
        if (null == e) {
            return ActionDataController.emptyResultPreventDefault();
        }
        var r = new ActionDataController;
        return r.isUndoRedo = n,
        r.action = "DataOrCursorSelectedInfoChanged",
        r.editorChangeInfo = e,
        r.keyInfo = t,
        r;
    }
    static fromCursorChagnedFromCharId(e, t) {
        var n = new ActionDataController;
        return n.action = "CursorChagnedFromCharId",
        n.cursorPos = e,
        n.keyInfo = t,
        n;
    }
    static setTemporarySelectedBlockStyle(e) {
        var t = new ActionDataController;
        return t.action = "SetTemporarySelectedBlockStyle",
        t.data = e,
        t;
    }
    static setStyle(e, t) {
        var n = new ActionDataController;
        return n.action = "SetStyle",
        n.data = e,
        n.isOneLineChanged = t,
        n;
    }
    static setLineStyle(e) {
        var t = new ActionDataController;
        return t.action = "SetLineStyle",
        t.data = e,
        t;
    }
    static stepOut(e) {
        var t = new ActionDataController;
        return t.action = "StepOut",
        t.editorChangeInfo = {
            selected: e,
            model: null
        },
        t;
    }
    static externalUndoRedo(e) {
        var t = new ActionDataController;
        return t.action = e,
        t;
    }
    getRelativeCursorPosition() {
        return this.getCursorPosition(this.editorChangeInfo.selected);
    }
    getRawCursorPos() {
        return this.cursorPos;
    }
    getCursorPosition(e) {
        return null != e.selected ? this.getCursorPosition(e.selected) : {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex
        };
    }
}
/*n.d(t, "a", function () {
    return ActionDataController;
})*/

export default ActionDataController