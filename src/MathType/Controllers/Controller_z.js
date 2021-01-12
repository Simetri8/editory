import BlockHelper from '../../Elements/BlockHelper';
import Controller_G from './Controller_G';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import SelectionJoint from '../SelectionJoint';
import TabularHelper from '../../Tabular/TabularHelper';
import TabularUtils from '../../Tabular/TabularUtils';

/// xxx(1643) /*Controller_z*/

/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var T = n(7)/*PropUpdateHelper*/;  // 8 times
/// var b = n(45)/*TabularUtils*/;  // 1 times
/// var L = n(15)/*TabularHelper*/;  // 1 times
/// var SelectionJoint = n(1657)/*SelectionJoint*/;  // 1 times
/// var Controller_G = n(1644)/*Controller_G*/;  // 2 times
var z = new class {
    updateLine(e, t, n) {
        return {
            editorModel: PropUpdateHelper.set(e.editorModel, "lines.".concat(e.editorSelected.lineIndex), t),
            editorSelected: n,
            customData: e.customData
        };
    }
    updateLines(e, t, n) {
        var r = PropUpdateHelper.replaceWithArray(e.editorModel.lines, e.editorSelected.lineIndex, 1, t);
        return {
            editorModel: PropUpdateHelper.set(e.editorModel, "lines", r),
            editorSelected: n
        };
    }
    handleInnerEditor(e, t, n, r, a, i, o, s, l) {
        if (r) {
            var c = new SelectionJoint(n, r);
            if (c.isSameRoute()) {
                return c.fromSelected.selected && c.toSelected.selected ? this.handleNestedEditor(e, t, n, r, a, i, o) : a({
                    editorModel: t,
                    editorSelected: n,
                    selection: null,
                    usedToHasSelection: e.isInSelection(),
                    compositeParent: s,
                    compositeKey: l
                });
            }
            var d = c.fromSelected;
            var h = t;
            if (i) {
                var u = Controller_G.removeSelection(t.lines, c);
                if (h = PropUpdateHelper.set(t, "lines", u), c.isTabularRoute()) {
                    return d = PropUpdateHelper.update(d, {
                        key: TabularHelper.getTabularMinKey(c.fromSelected.key, c.toSelected.key),
                        selected: {
                            lineIndex: 0,
                            charIndex: 0
                        }
                    }),
                    this.handleNestedEditor(e, h, d, null, a, true, o);
                }
                d = PropUpdateHelper.update(d, {
                    selected: null,
                    key: null
                });
            }
            var p = i && e.isInSelection() && (null != s || c.isSameLine());
            return a({
                editorModel: h,
                editorSelected: d,
                selection: i ? null : c,
                usedToHasSelection: e.isInSelection(),
                compositeParent: s,
                removedLines: o ? Controller_G.getSelectionData(t.lines, c) : null,
                compositeKey: l,
                removedSelectionWithOneLineChanged: p
            });
        }
        return null != n.selected ? this.handleNestedEditor(e, t, n, r, a, i, o) : a({
            editorModel: t,
            editorSelected: n,
            selection: null,
            usedToHasSelection: e.isInSelection(),
            compositeParent: s,
            compositeKey: l
        });
    }
    handleNestedEditor(e, t, n, r, a, i, o) {
        var s = n.lineIndex;
        var l = n.charIndex;
        var c = n.key;
        var d = BlockHelper.blockFromIndex(t.lines[s], l);
        var h = d.block.elements[c];
        var u = null;
        if (r) {
            u = r.selected;
        }
        var p = this.handleInnerEditor(e, h, n.selected, u, a, i, o, d.block, c);
        return this.isUpperResult(p) ? p.uplevelHandler({
            editorSelected: n,
            editorModel: t,
            childSelectedBlock: d.block,
            childSelectedBlockIndex: d.blockIndex
        }) : null == p || null == p.editorModel || null == p.editorSelected ? p : {
            editorModel: PropUpdateHelper.set(t, "lines.".concat(s, ".blocks.").concat(d.blockIndex, ".elements.").concat(c), p.editorModel),
            editorSelected: PropUpdateHelper.set(n, "selected", p.editorSelected),
            customData: p.customData
        };
    }
    isUpperResult(e) {
        return e && null != e.uplevelHandler;
    }
    handleEditor(e, t) {
        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        return this.handleInnerEditor(e, e.model, e.cursorSelected, e.extendedCursorSelected, t, n, r);
    }
    travelForTabular(e, t) {
        var n = TabularUtils.getTabularKeysSelected(e);
        if (1 === n.length) {
            this.handleEditor(e, () => {
                return {
                    uplevelHandler: (e) => {
                        return t({
                            keys: n,
                            editor: e.editorModel,
                            selected: e.editorSelected,
                            block: e.childSelectedBlock,
                            blockIndex: e.childSelectedBlockIndex
                        });
                    }
                };
            },
            false)
        } else {
            this.handleEditor(e, (e) => {
                var r = e.editorModel.lines[e.editorSelected.lineIndex];
                var a = BlockHelper.blockFromIndex(r, e.editorSelected.charIndex);
                return t({
                    keys: n,
                    editor: e.editorModel,
                    selected: e.editorSelected,
                    block: a.block,
                    blockIndex: a.blockIndex
                });
            },
            false);
        }
    }
};
/*n.d(t, "a", function () {
    return z;
})*/

export default z