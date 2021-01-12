import _ from 'lodash';
import BlockHelper from '../../Elements/BlockHelper';
import Controller_z from './Controller_z';
import CreateEditorObject from '../../Elements/CreateEditorObject';
import Remainder from '../../Mathcha/Remainder';

/// xxx(1648) /*LongDivisionController*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 6 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 4 times
/// var O = n(13)/*CreateEditorObject*/;  // 2 times
/// var ae = n(50)/*Remainder*/;  // 10 times
/// var Controller_z = n(1643)/*Controller_z*/;  // 1 times
var LongDivisionController = new class {
    constructor() {
        this.handleNewLineOnLeaf = (e) => {
            return {
                uplevelHandler: (t) => {
                    var n = this.findNextIndexToInsert(e.compositeKey);
                    var r = this.shiftToInsertPairFromIndex(n, t.childSelectedBlock);
                    var i = BlockHelper.replaceBlockInEditor(t.editorModel, t.editorSelected.lineIndex, r);
                    var o = Remainder.buildRemainderKey(n);
                    var s = r.elements[o].lines[0].blocks[0];
                    var l = s ? s.text.length : 0;
                    return {
                        editorSelected: _.assignIn({},
                        t.editorSelected, {
                            key: o,
                            selected: {
                                lineIndex: 0,
                                charIndex: l
                            }
                        }),
                        editorModel: i
                    };
                }
            };
        };
    }
    handleEnter(e) {
        return Controller_z.handleEditor(e, this.handleNewLineOnLeaf);
    }
    findNextKey(e, t) {
        var n = Remainder.parseRemainderIndex(e);
        for (; n >= 0;) {
            if (t[Remainder.buildRemainderKey(n)]) {
                return Remainder.buildRemainderKey(n);
            }
            n--;
        }
        return _.keys(t)[0];
    }
    normalizeElementsAndShiftSpaceLeft(e, t) {
        var n = this.extractOrderedEditors(e);
        this.shiftWhiteSpaceLeft(n, t);
        var r = _.clone(e);
        return this.constructElementMap(r, n),
        r;
    }
    constructElementMap(e, t) {
        _.keys(e).forEach((t) => {
            if (Remainder.isRemainderKey(t)) {
                delete e[t];
            }
        });
        t.forEach((t, n) => {
            e[Remainder.buildRemainderKey(n)] = t;
        });
    }
    shiftToInsertPairFromIndex(e, t) {
        var n = this.extractOrderedEditors(t.elements);
        var r = n[e - 1];
        n.splice(e, 0, this.buildEditorAtLevel(r), this.buildEditorAtLevel(r));
        this.shiftWhiteSpaceRight(n, e + 2);
        var a = BlockHelper.cloneCompositeBlockWithNewElements(t);
        return this.constructElementMap(a.elements, n),
        a;
    }
    shiftWhiteSpaceRight(e, t) {
        var n = 0;
        for (; n < e.length; n++) {
            if (n >= t) {
                var r = e[n];
                var i = r.lines[0].blocks[0];
                if (!i || !i.type == null) {
                    continue;
                }
                var o = _.assignIn({},
                i, {
                    text: " " + i.text
                });
                var s = BlockHelper.replaceBlockInEditor(r, 0, o);
                e[n] = s;
            }
        }
    }
    shiftWhiteSpaceLeft(e, t) {
        var n = 0;
        for (; n < e.length; n++) {
            if (n >= t) {
                var r = e[n];
                var i = r.lines[0].blocks[0];
                if (!i || !i.type == null) {
                    continue;
                }
                var o = i.text;
                if (" " == o[0]) {
                    o = o.substr(1);
                }
                if (" " == o[0]) {
                    o = o.substr(1);
                }
                var s = _.assignIn({},
                i, {
                    text: o
                });
                var l = BlockHelper.replaceBlockInEditor(r, 0, s);
                e[n] = l;
            }
        }
    }
    extractOrderedEditors(e) {
        var t = _.keys(e).map((t) => {
            return Remainder.isRemainderKey(t) ? {
                editor: e[t],
                index: Remainder.parseRemainderIndex(t)
            } : void 0;
        }).filter((e) => {
            return e;
        });
        return _.sortBy(t, (e) => {
            return e.index;
        }).map((e) => {
            return e.editor;
        });
    }
    countBeginWhiteSpace(e) {
        var t = e.lines[0].blocks;
        var n = 0;
        var r = 0;
        e: for (; r < t.length; r++) {
            var a = t[r];
            if (!a.type == null) {
                break;
            }
            var i = 0;
            for (; i < a.text.length; i++) {
                if (" " != a.text[i]) {
                    break e;
                }
                n++;
            }
        }
        return n;
    }
    buildEditorAtLevel(e) {
        if (!e) {
            return CreateEditorObject.createEmptyEditor();
        }
        var t = this.countBeginWhiteSpace(e);
        return CreateEditorObject.createEditorWith(_.repeat(" ", t + 2));
    }
    findNextIndexToInsert(e) {
        if (!Remainder.isRemainderKey(e)) {
            return 0;
        }
        var t = Remainder.parseRemainderIndex(e);
        return t % 2 === 0 ? t + 2 : t + 1;
    }
};
/*n.d(t, "a", function () {
    return LongDivisionController;
})*/

export default LongDivisionController