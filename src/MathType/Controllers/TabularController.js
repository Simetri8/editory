import _ from 'lodash';
import ActionDataController from './ActionDataController';
import BlockHelper from '../../Elements/BlockHelper';
import CommonController from './CommonController';
import Controller_G from './Controller_G';
import Controller_z from './Controller_z';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import StyleHelper from '../../Mathcha/StyleHelper';
import TabularHelper from '../../Tabular/TabularHelper';
import TabularUtils from '../../Tabular/TabularUtils';

/// xxx(1636) /*TabularController*/

/// var C = n(2)/*lodash*/;  // 4 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 4 times
/// var T = n(7)/*PropUpdateHelper*/;  // 3 times
/// var b = n(45)/*TabularUtils*/;  // 4 times
/// var L = n(15)/*TabularHelper*/;  // 5 times
/// var N = n(18)/*StyleHelper*/;  // 3 times
/// var ActionDataController = n(1641)/*ActionDataController*/;  // 5 times
/// var Controller_z = n(1643)/*Controller_z*/;  // 4 times
/// var Controller_G = n(1644)/*Controller_G*/;  // 3 times
/// var CommonController = n(1646)/*CommonController*/;  // 1 times
class TabularController {
    constructor(e) {
        this.target = e;
    }
    handleNextCell(e) {
        try {
            var t = BlockHelper.findTabularBlock(e.model, e.cursorSelected);
            var n = _.cloneDeep(e.cursorSelected);
            var r = BlockHelper.findLeafParentSelected(n);
            var a = TabularHelper.nextCell(r.key, t.row, t.column);
            return r.key = a,
            r.selected = {
                lineIndex: 0,
                charIndex: 0
            },
            ActionDataController.cursorPosition(n, _.clone(r.selected), false);
        } catch(e) {
            return ActionDataController.emptyResult();
        }
    }
    handlePreviousCell(e) {
        try {
            var t = BlockHelper.findTabularBlock(e.model, e.cursorSelected);
            var n = _.cloneDeep(e.cursorSelected);
            var r = BlockHelper.findLeafParentSelected(n);
            var a = TabularHelper.previousCell(r.key, t.row, t.column);
            return r.key = a,
            r.selected = {
                lineIndex: 0,
                charIndex: 0
            },
            ActionDataController.cursorPosition(n, _.clone(r.selected), false);
        } catch(e) {
            return ActionDataController.emptyResult();
        }
    }
    mergeTableCells(e) {
        var t = Controller_z.travelForTabular(e, (e) => {
            var t = TabularUtils.mergeCells(e.block, e.keys);
            t = TabularUtils.makeSureNoWidthForHiddenColumn(t);
            var n = Controller_G.replaceBlockInEditor(e.editor, t, e.selected.lineIndex, e.blockIndex);
            var r = TabularHelper.getMinMaxTabularKeyIndex(e.keys);
            return {
                editorModel: n,
                editorSelected: PropUpdateHelper.update(e.selected, {
                    key: TabularHelper.getKeyFromRowCol(r.minRow, r.minCol),
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                })
            };
        });
        return this.target.toKeyHandledResult(t, null);
    }
    unmergeTableCells(e, t) {
        var n = Controller_z.travelForTabular(e, (e) => {
            var n = TabularUtils.unmergeCells(e.block, e.keys[0]);
            return n = TabularUtils.recalculateColumnWidth(n, t),
            {
                editorModel: Controller_G.replaceBlockInEditor(e.editor, n, e.selected.lineIndex, e.blockIndex),
                editorSelected: e.selected
            };
        });
        return this.target.toKeyHandledResult(n, null);
    }
    getIntersectTabularEditorStyle(e) {
        var t = null;
        return Controller_z.travelForTabular(e, (e) => {
            return t = StyleHelper.getIntersectEditorStyleForTabular(e.block, e.keys),
            null;
        }),
        t;
    }
    setTabularEditorsStyle(e, t, n) {
        var r = Controller_z.travelForTabular(e, (e) => {
            var r;
            return r = "border" == t && "string" == typeof n ? StyleHelper.setBorderStyleForTabular(e.block, e.keys, n) : StyleHelper.setStyleForTabular(e.block, e.keys, t, n),
            {
                editorModel: Controller_G.replaceBlockInEditor(e.editor, r, e.selected.lineIndex, e.blockIndex),
                editorSelected: e.selected
            };
        });
        return ActionDataController.setStyle(r.editorModel, true);
    }
    removeMostNestedTabular(e) {
        var t = {
            cursorSelected: this.goOutMostNestedTabular(e.cursorSelected),
            extendedCursorSelected: null,
            model: e.model,
            isInSelection: () => {
                return false;
            }
        };
        var n = CommonController.removeCurrentForDelete(t, false);
        return this.target.toKeyHandledResult(n, {
            selection: false,
            clearHiddenIputText: true
        });
    }
    goOutMostNestedTabular(e) {
        var t = null;
        return e.selected && (t = this.goOutMostNestedTabular(e.selected)),
        t ? PropUpdateHelper.setProp(e, "selected", t) : e.key && TabularHelper.isKeyInTabularFormat(e.key) ? PropUpdateHelper.update(e, {
            key: void 0,
            selected: void 0
        }) : null;
    }
}
/*n.d(t, "a", function () {
    return TabularController;
})*/

export default TabularController