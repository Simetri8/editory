import _ from 'lodash';
import ActionDataController from './ActionDataController';
import BlockHelper from '../../Elements/BlockHelper';
import CheckObject from '../../Editor/CheckObject';
import CommonController from './CommonController';
import Controller_G from './Controller_G';
import Controller_oe from './Controller_oe';
import CreateEditorObject from '../../Elements/CreateEditorObject';
import LongDivisionController from './LongDivisionController';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import Remainder from '../../Mathcha/Remainder';
import TabularHelper from '../../Tabular/TabularHelper';
import TabularUtils from '../../Tabular/TabularUtils';

/// xxx(1634) /*BackspaceDeleteController*/

/// var r = n(3)/*_.assignIn*/;  // 6 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 5 times
/// var x = n.n(C);
/// var st = n(61);  // 2 times
/// var lt = n.n(st);
/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var T = n(7)/*PropUpdateHelper*/;  // 4 times
/// var b = n(45)/*TabularUtils*/;  // 2 times
/// var L = n(15)/*TabularHelper*/;  // 2 times
/// var O = n(13)/*CreateEditorObject*/;  // 2 times
/// var W = n(31)/*CheckObject*/;  // 2 times
/// var ae = n(50)/*Remainder*/;  // 2 times
/// var ActionDataController = n(1641)/*ActionDataController*/;  // 8 times
/// var Controller_oe = n(1642)/*Controller_oe*/;  // 2 times
/// var Controller_G = n(1644)/*Controller_G*/;  // 4 times
/// var CommonController = n(1646)/*CommonController*/;  // 4 times
/// var LongDivisionController = n(1648)/*LongDivisionController*/;  // 2 times
var dt = new class {
    handleDeleteFromConfirmInfo(e, t) {
        var n = this.handleInnerEditor(e, t);
        if (null == n) {
            return ActionDataController.emptyResult();
        }
        var r = ActionDataController.fromDataOrCursorSelectedInfoChanged({
            model: n.editorModel,
            selected: n.editorSelected
        },
        {
            clearHiddenIputText: true
        });
        r.isOneLineChanged = true;
        return r;
    }
    handleTabular(e, t, n, r) {
        var i = t;
        return r.columnDeleteSelected ? t.column <= 1 ? (i = _.assignIn({},
        t, {
            elements: {}
        }), _.keys(t.elements).forEach((e) => {
            return i.elements[e] = CreateEditorObject.createEmptyEditor();
        }), this.buildNewModel(e, i, r, n)) : (i = TabularUtils.removeColumns(t, [r.key]), this.buildNewModel(e, i, r, n)) : t.row <= 1 ? (i = _.assignIn({},
        t, {
            elements: {}
        }), _.keys(t.elements).forEach((e) => {
            return i.elements[e] = CreateEditorObject.createEmptyEditor();
        }), this.buildNewModel(e, i, r, n)) : (i = TabularUtils.removeRows(t, [r.key]), this.buildNewModel(e, i, r, n));
    }
    buildNewModel(e, t, n, r) {
        var a = Controller_G.replaceBlockInEditor(e, t, n.lineIndex, r);
        var i = TabularHelper.getTabularCellIndexFromKey(n.key);
        var o = TabularHelper.getKeyFromRowCol(Math.min(i.row, t.row - 1), Math.min(i.column, t.column - 1));
        var s = (n.columnDeleteSelected, _.omit(n, ["columnDeleteSelected"]));
        return {
            editorModel: a,
            editorSelected: PropUpdateHelper.update(s, {
                key: o,
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            })
        };
    }
    confirmDeleteInfoToSelected(e, t) {
        return t ? {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex,
            selected: {
                lineIndex: 0,
                charIndex: 0
            },
            key: t
        } : {
            lineIndex: e.lineIndex,
            charIndex: e.charIndex
        };
    }
    handleInnerEditor(e, t) {
        if (null != t.selected) {
            return this.handleNestedEditor(e, t);
        }
        var n = BlockHelper.blockFromIndex(e.lines[t.lineIndex], t.charIndex);
        var r = n.block;
        if (t.key && CheckObject.isTabularCompositeBlock(r)) {
            return this.handleTabular(e, r, n.blockIndex, t);
        }
        if (null != t.key && !this.isPowerIndexLastItem(r)) {
            var i = PropUpdateHelper.set(r, "elements.".concat(t.key), void 0);
            delete i.elements[t.key];
            var o = Controller_G.replaceBlockInEditor(e, i, t.lineIndex, n.blockIndex);
            return this.handleBlockAfterRemove(i, o, t);
        }
        if (null != t.keys) {
            var s;
            var l = r;
            t.keys.forEach((e) => {
                delete(l = _.assignIn({},
                l, {
                    elements: _.assignIn({},
                    l.elements, {
                        [e] : void 0
                    })
                })).elements[e];
            });
            if (CheckObject.isLongDivision(l) && Remainder.isRemainderKey(t.keys[0])) {
                var c = Remainder.parseRemainderIndex(t.keys[0]);
                l = _.assignIn({},
                l, {
                    elements: LongDivisionController.normalizeElementsAndShiftSpaceLeft(l.elements, c)
                });
                s = LongDivisionController.findNextKey(t.keys[0], l.elements);
            }
            var d = Controller_G.replaceBlockInEditor(e, l, t.lineIndex, n.blockIndex);
            return this.handleBlockAfterRemove(l, d, t, s);
        }
        return {
            editorModel: Controller_G.removeCompositeBlockInEditor(e, t.lineIndex, n.blockIndex),
            editorSelected: this.confirmDeleteInfoToSelected(t, null)
        };
    }
    handleBlockAfterRemove(e, t, n, r) {
        if (null == (r = r || this.findFirstKey(e))) {
            return {
                editorModel: t,
                editorSelected: {
                    lineIndex: n.lineIndex,
                    charIndex: n.charIndex
                }
            };
        } else {
            return {
                editorModel: t,
                editorSelected: this.confirmDeleteInfoToSelected(n, r)
            };
        }
    }
    isPowerIndexLastItem(e) {
        return ("\\power-index" == e.text || "\\power" == e.text || "\\index" == e.text) && 1 === _.keys(e.elements).length;
    }
    findFirstKey(e) {
        return _.first(_.keys(e.elements));
    }
    handleNestedEditor(e, t) {
        var n = t.lineIndex;
        var r = t.charIndex;
        var i = t.columnDeleteSelected;
        var o = _.omit(t, ["columnDeleteSelected"]);
        var s = t.key;
        var l = BlockHelper.blockFromIndex(e.lines[n], r);
        var c = l.block.elements[s];
        var d = this.handleInnerEditor(c, _.assignIn({},
        t.selected, {
            columnDeleteSelected: i
        }));
        return null == d || null == d.editorModel || null == d.editorSelected ? d : {
            editorModel: PropUpdateHelper.set(e, "lines.".concat(n, ".blocks.").concat(l.blockIndex, ".elements.").concat(s), d.editorModel),
            editorSelected: PropUpdateHelper.set(o, "selected", d.editorSelected),
            customData: d.customData
        };
    }
};
class BackspaceDeleteController {
    constructor(e) {
        this.target = e;
    }
    handleBackspace(e, t) {
        var n = e.confirmDeleted();
        if (n) {
            return dt.handleDeleteFromConfirmInfo(e.model, n);
        }
        if (e.isCursorBeginInRootLine() && e.isSelectedLineListType()) {
            return this.target.removeListType(e);
        }
        var r = CommonController.removeCurrent(e, !!n);
        if (r instanceof Controller_oe) {
            return ActionDataController.confirmDelete(r.selected)
        } else {
            return this.target.toKeyHandledResult(r, t);
        }
    }
    handleDelete(e, t) {
        var n = e.confirmDeleted();
        if (n) {
            return dt.handleDeleteFromConfirmInfo(e.model, n);
        }
        var r = CommonController.removeCurrentForDelete(e, !!n);
        if (r instanceof Controller_oe) {
            return ActionDataController.confirmDelete(r.selected)
        } else {
            return this.target.toKeyHandledResult(r, t);
        }
    }
    handleWordBackspace(e, t) {
        if (e.isInSelection()) {
            return this.handleBackspace(e, t);
        }
        var n = this.target.moveToPreviousBreak(e, false);
        if (ActionDataController.isEmptyResult(n)) {
            return n;
        }
        var r = n.data;
        if (!r) {
            return ActionDataController.emptyResult();
        }
        var a = {
            cursorSelected: r.toSelected,
            extendedCursorSelected: e.cursorSelected,
            model: e.model,
            isInSelection: () => {
                return true;
            }
        };
        var i = CommonController.removeCurrent(a, true);
        return this.target.toKeyHandledResult(i, t);
    }
    handleWordDelete(e, t) {
        if (e.isInSelection()) {
            return this.handleDelete(e, t);
        }
        var n = this.target.moveToNextBreak(e, false);
        if (ActionDataController.isEmptyResult(n)) {
            return n;
        }
        var r = n.data;
        if (!r) {
            return ActionDataController.emptyResult();
        }
        var a = {
            cursorSelected: r.toSelected,
            extendedCursorSelected: e.cursorSelected,
            model: e.model,
            isInSelection: () => {
                return true;
            }
        };
        var i = CommonController.removeCurrent(a, true);
        return this.target.toKeyHandledResult(i, t);
    }
}
/*n.d(t, "a", function () {
    return BackspaceDeleteController;
})*/

export default BackspaceDeleteController