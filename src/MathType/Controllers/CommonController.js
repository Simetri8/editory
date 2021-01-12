import _ from 'lodash';
import BlockHelper from '../../Elements/BlockHelper';
import CheckComponent from '../../Editor/CheckComponent';
import CheckObject from '../../Editor/CheckObject';
import ConsoleLog from '../../ConsoleLog';
import Controller_G from './Controller_G';
import Controller_oe from './Controller_oe';
import Controller_V from './Controller_V';
import Controller_z from './Controller_z';
import CreateEditorObject from '../../Elements/CreateEditorObject';
import DefaultSequenceShortcuts from '../DefaultSequenceShortcuts';
import DiagramIdHelper from '../../Elements/DiagramIdHelper';
import EntityHelper from '../../Editor/EntityHelper';
import InitHelper from '../../InitHelper';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import Remainder from '../../Mathcha/Remainder';
import ShortcutMatcher from '../ShortcutMatcher';
import TabularHelper from '../../Tabular/TabularHelper';
import TabularUtils from '../../Tabular/TabularUtils';

/// xxx(1646) /*CommonController*/

/// var r = n(3)/*_.assignIn*/;  // 16 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 9 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 9 times
/// var T = n(7)/*PropUpdateHelper*/;  // 23 times
/// var b = n(45)/*TabularUtils*/;  // 2 times
/// var L = n(15)/*TabularHelper*/;  // 3 times
/// var M = n(22)/*CheckComponent*/;  // 2 times
/// var O = n(13)/*CreateEditorObject*/;  // 3 times
/// var k = n(6)/*DiagramIdHelper*/;  // 2 times
/// var W = n(31)/*CheckObject*/;  // 15 times
/// var Y = n(32)/*InitHelper*/;  // 3 times
/// var j = n(63)/*EntityHelper*/;  // 2 times
/// var q = n(65)/*ConsoleLog*/;  // 2 times
/// var ae = n(50)/*Remainder*/;  // 3 times
/// var Controller_oe = n(1642)/*Controller_oe*/;  // 2 times
/// var Controller_z = n(1643)/*Controller_z*/;  // 15 times
/// var Controller_G = n(1644)/*Controller_G*/;  // 15 times
/// var Controller_V = n(1645)/*Controller_G*/;  // 1 times
/// var DefaultSequenceShortcuts = n(1653)/*DefaultSequenceShortcuts*/;  // 1 times
/// var ShortcutMatcher = n(1654)/*ShortcutMatcher*/;  // 1 times
var Q = new class {
    processVisitResult(e) {
        return this.processForCheckbox(e);
    }
    processForCheckbox(e) {
        try {
            var t = e.editorSelected.lineIndex;
            if (t <= 0) {
                return e;
            }
            var n = t - 1;
            var r = e.editorModel.lines[n];
            if (r.blocks.length <= 1 || !CheckObject.isCheckbox(r.blocks[0])) {
                return e;
            }
            var i = e.editorModel.lines[t];
            var o = _.assignIn({},
            i, {
                blocks: [InitHelper.getModelByName("\\checkbox")].concat(i.blocks)
            });
            return _.assignIn({},
            e, {
                editorModel: _.assignIn({},
                e.editorModel, {
                    lines: PropUpdateHelper.setIndex(e.editorModel.lines, e.editorSelected.lineIndex, o)
                }),
                editorSelected: _.assignIn({},
                e.editorSelected, {
                    charIndex: 1
                })
            });
        } catch(e) {}
        return e;
    }
};
var Z = new class {
    processVisitResult(e) {
        return this.processForCheckbox(e);
    }
    processForCheckbox(e) {
        try {
            var t = e.editorSelected.lineIndex;
            var n = e.editorModel.lines[t];
            if (1 != n.blocks.length || !CheckObject.isCheckbox(n.blocks[0]) || 1 != e.editorSelected.charIndex) {
                return null;
            }
            var r = _.assignIn({},
            n, {
                blocks: []
            });
            return _.assignIn({},
            e, {
                editorModel: _.assignIn({},
                e.editorModel, {
                    lines: PropUpdateHelper.setIndex(e.editorModel.lines, e.editorSelected.lineIndex, r)
                }),
                editorSelected: _.assignIn({},
                e.editorSelected, {
                    charIndex: 0
                })
            });
        } catch(e) {}
        return null;
    }
};
var CommonController = new class {
    getSelectionData(e) {
        var t;
        return null == e.extendedCursorSelected ? [] : (Controller_z.handleEditor(e, (e) => {
            return null == e.selection ? null : (t = Controller_G.getSelectionData(e.editorModel.lines, e.selection), null);
        },
        false), t || []);
    }
    extractDiagramSelected(e) {
        var t = e.selectedBlockModel;
        var n = e.leafCursorSelected.controlSelectedInfo && e.leafCursorSelected.controlSelectedInfo.selectedIds;
        if (!n || n.length <= 0) {
            return [CreateEditorObject.createLineFromBlock(t)];
        }
        var r = EntityHelper.extractSelectedEntities(t, n);
        return [CreateEditorObject.createLineFromBlock(r)];
    }
    insertLines(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        var r = arguments.length > 3 ? arguments[3] : void 0;
        return t.isDiagramSelected ? Controller_z.handleEditor(t, (n) => {
            var a = t.selectedBlockModel;
            var i = EntityHelper.mergeLines(e, a, n.editorSelected, {
                retainShapesInHeight: !!r
            });
            var o = BlockHelper.blockIndexFromCharIndex(n.editorModel.lines[n.editorSelected.lineIndex], n.editorSelected.charIndex);
            return {
                editorModel: Controller_G.replaceBlockInEditor(n.editorModel, i.block, n.editorSelected.lineIndex, o),
                editorSelected: i.selected
            };
        }) : !t.findBinomSelected() && !t.isPlotCasesSelected() && r && r.isTextMode === t.isTextModeSelected() && r && r.isTabularCellsSelected && (t.isAtTabularCell() || t.isTabularCellsSelected()) ? e[0].blocks.length <= 0 ? null : Controller_z.travelForTabular(t, (t) => {
            var n = TabularHelper.getMinMaxTabularKeyIndex(t.keys);
            var r = TabularHelper.getKeyFromRowCol(n.minRow, n.minCol);
            var a = TabularUtils.replaceAtKey(t.block, r, e[0].blocks[0]);
            return {
                editorModel: Controller_G.replaceBlockInEditor(t.editor, a, t.selected.lineIndex, t.blockIndex),
                editorSelected: PropUpdateHelper.update(t.selected, {
                    key: r,
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                })
            };
        }) : Controller_z.handleEditor(t, (r) => {
            return this.insertLinesToLine(t.isTextModeSelected(), e, n, r);
        });
    }
    replaceLines(e, t, n) {
        return Controller_z.handleEditor(e, (e) => {
            return this.insertLinesToLine(t, n, false, e);
        });
    }
    insertLinesToLine(e, t, n, r) {
        var a = r.editorSelected.lineIndex;
        var i = r.editorModel.lines[a];
        var o = Controller_G.insertLinesAt(i, r.editorSelected.charIndex, t, e);
        var s = r.editorSelected;
        return n || ((s = _.clone(r.editorSelected)).lineIndex = a + o.length - 1, BlockHelper.isLastLineWithSingleBlockLine(t) && !BlockHelper.isLastLineWithSingleBlockLine(o) ? s.charIndex = 0 : s.charIndex = BlockHelper.getTotalChar(t[t.length - 1].blocks), 1 === o.length && (s.charIndex += r.editorSelected.charIndex)),
        Controller_z.updateLines(r, o, s);
    }
    insertInput(e, t, n) {
        if (t.insideZSpec()) {
            if (!this.zSpecMathcher) {
                this.zSpecMathcher = new ShortcutMatcher(false);
                this.zSpecMathcher.setShortcutModels(DefaultSequenceShortcuts.getForZSpec());
            } (t = _.clone(t)).shortcutMatcher = this.zSpecMathcher;
        }
        return Controller_z.handleEditor(t, this.insertInputToLine.bind(this, t, e, n), true, CheckComponent.isCompositeBlockWithNestedEditor(e));
    }
    assignRemovedLine(e, t, n) {
        if (t.removedLines && CheckComponent.isCompositeBlockWithNestedEditor(e)) {
            var r = _.first(_.keys(e.elements));
            var i = InitHelper.getMetaDataByName(e.text);
            if (i && i.noInnerInsert) {
                return e;
            }
            if (i && i.keyInsertOnSelection) {
                r = i.keyInsertOnSelection;
            }
            if (CheckObject.isTabularCompositeBlock(e)) {
                r = "0_0";
            }
            var o = Controller_V.processLinesTo({
                inlineMathDisplayStyle: false,
                isInsideInlineMath: false,
                isPureText: false,
                isTextMode: n.isTextModeSelected(),
                lines: t.removedLines
            },
            {
                isTextMode: CheckObject.isTable(e) || CheckObject.isTheorem(e),
                isTextSymbol: CheckObject.isTextSymbol(e),
                isTheorem: n.isInsideTheorem(),
                isTable: n.isTableSelected(),
                rootSymbolSupports: null
            }).lines;
            return _.assignIn({},
            e, {
                elements: _.assignIn({},
                e.elements, {
                    [r] : CreateEditorObject.createEditorWith(o)
                })
            });
        }
        return e;
    }
    insertInputToLine(e, t, n, r) {
        var i;
        var o = r.editorSelected.lineIndex;
        var s = r.editorModel.lines[o];
        var l = false;
        if (!_.isString(t) && CheckObject.isComposite(t) && "\\theorem" == t.text && (r.editorSelected.charIndex > 0 || s.blocks.length > 0) && (l = true), t = this.assignRemovedLine(t, r, e), l) {
            var c = this.insertToNextSingleBlockLine(t, r);
            var d = r.editorSelected;
            return {
                editorModel: c,
                editorSelected: d = PropUpdateHelper.update(d, {
                    lineIndex: d.lineIndex + 1,
                    charIndex: 0,
                    key: "theorem",
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                })
            };
        }
        if (_.isString(t)) {
            i = {
                id: DiagramIdHelper.nextId(),
                text: t
            };
        } else {
            if (CheckObject.isComposite(t) && "\\math-container" == t.text && t.displayMode || "\\multiline" == t.text) {
                return {
                    editorModel: this.insertToNextSingleBlockLine(t, r),
                    editorSelected: PropUpdateHelper.update(r.editorSelected, {
                        lineIndex: r.editorSelected.lineIndex + 1,
                        charIndex: 0,
                        key: "mathValue",
                        selected: {
                            lineIndex: 0,
                            charIndex: 0
                        }
                    })
                };
            }
            if (CheckObject.isComposite(t) && "\\align" == t.text || "\\gather" == t.text) {
                return {
                    editorModel: this.insertToNextSingleBlockLine(t, r),
                    editorSelected: PropUpdateHelper.update(r.editorSelected, {
                        lineIndex: r.editorSelected.lineIndex + 1,
                        charIndex: 0,
                        key: "0_0",
                        selected: {
                            lineIndex: 0,
                            charIndex: 0
                        }
                    })
                };
            }
            if (n && n.singleBlockLine || l) {
                return {
                    editorModel: this.insertToNextSingleBlockLine(t, r),
                    editorSelected: n.selectControlled ? _.assignIn({},
                    r.editorSelected, {
                        lineIndex: r.editorSelected.lineIndex + 1,
                        charIndex: 0,
                        controlled: true
                    }) : _.assignIn({},
                    r.editorSelected, {
                        lineIndex: r.editorSelected.lineIndex + 1,
                        charIndex: 0,
                        key: _.keys(t.elements)[0],
                        selected: {
                            lineIndex: 0,
                            charIndex: 0
                        }
                    })
                };
            }
            i = t;
        }
        var h = Controller_G.insertModelAt(s, r.editorSelected.charIndex, i, {
            isTextMode: e.isTextModeSelected(),
            shortcutMatcher: e.shortcutMatcher
        });
        var u = r.editorSelected;
        return h.selected ? (h.selected.lineIndex = o, u = PropUpdateHelper.update(u, h.selected)) : u = BlockHelper.buildInsertedNewModel(i, r.editorSelected),
        Controller_z.updateLine(r, h.line, u);
    }
    replaceTextForComposition(e, t, n, r) {
        var a = {
            isTextMode: r.isTextModeSelected(),
            shortcutMatcher: r.shortcutMatcher
        };
        return Controller_z.handleEditor(r, this.replaceTextToLineForComposition.bind(this, e, t, n, a));
    }
    replaceTextToLineForComposition(e, t, n, r, i) {
        var o = i.editorSelected.lineIndex;
        var s = i.editorModel.lines[o];
        var l = BlockHelper.blockFromIndex(s, t);
        if (!l || !l.block) {
            return ConsoleLog.warn("Composition wrong:replace Text To Line with Block null"),
            null;
        }
        if (l.block.type) {
            return ConsoleLog.warn("Composition wrong:replace Text for Block which is composite"),
            null;
        }
        var c = Controller_G.replaceTextInBlockForComposition(t - l.startIndex, n, e, l.block, r);
        var d = _.assignIn({},
        i.editorSelected, {
            charIndex: i.editorSelected.charIndex + c.charDelta
        });
        var h = {
            stopComposition: c.stopComposition
        };
        if (i.customData = h, 0 === c.blocks.length) {
            var u = Controller_G.removeBlock(s, l.blockIndex);
            return Controller_z.updateLine(i, u, d);
        }
        var p = PropUpdateHelper.replaceWithArray(s.blocks, l.blockIndex, 1, c.blocks);
        var m = _.assignIn({},
        s, {
            blocks: p
        });
        return c.shouldNormalizeLine && (m = Controller_G.joinBlocksAndNormalizeStyleForLine(m)),
        Controller_z.updateLine(i, m, d);
    }
    insertNewLine(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return Controller_z.handleEditor(e, this.insertNewLineToEditor.bind(this, t));
    }
    supportEnterToNextRow(e) {
        return !CheckObject.isTable(e) && !CheckObject.isBinom(e) && !CheckObject.isLatexTable(e);
    }
    insertNewLineToEditor(e, t) {
        if (!e && t.compositeKey && CheckObject.isTabularCompositeBlock(t.compositeParent) && this.supportEnterToNextRow(t.compositeParent)) {
            return t.compositeParent.row >= 100 ? null : {
                uplevelHandler(e, n) {
                    var r = e.editorModel.lines[e.editorSelected.lineIndex];
                    var a = BlockHelper.blockFromIndex(r, e.editorSelected.charIndex);
                    var i = TabularUtils.insertNewRowBelow(a.block, e.editorSelected.key);
                    return {
                        editorModel: Controller_G.replaceBlockInEditor(e.editorModel, i, e.editorSelected.lineIndex, a.blockIndex),
                        editorSelected: PropUpdateHelper.update(e.editorSelected, {
                            key: TabularHelper.nextRowFormKey(t.compositeKey),
                            selected: {
                                lineIndex: 0,
                                charIndex: 0
                            }
                        }),
                        customData: {
                            isOneLineChanged: true
                        }
                    };
                }
            };
        }
        var n = Z.processVisitResult(t);
        if (n) {
            return n;
        }
        var r = t.editorSelected.lineIndex;
        var a = t.editorModel.lines[r];
        var i = t.editorModel;
        var o = Controller_G.splitLineAt(a, t.editorSelected.charIndex);
        var s = i.lines.slice(0, t.editorSelected.lineIndex).concat(o).concat(i.lines.slice(t.editorSelected.lineIndex + 1));
        var l = {
            editorModel: PropUpdateHelper.set(i, "lines", s),
            editorSelected: {
                lineIndex: t.editorSelected.lineIndex + 1,
                charIndex: 0
            },
            customData: {
                isOneLineChanged: null != t.compositeKey
            }
        };
        return Q.processVisitResult(l);
    }
    insertToNextSingleBlockLine(e, t) {
        var n = t.editorSelected.lineIndex;
        var r = t.editorModel.lines[n];
        var a = t.editorModel;
        var i = Controller_G.splitLineAt(r, t.editorSelected.charIndex);
        var o = {
            id: DiagramIdHelper.nextId(),
            blocks: [e]
        };
        i = [i[0], o, i[1]];
        var s = a.lines.slice(0, t.editorSelected.lineIndex).concat(i).concat(a.lines.slice(t.editorSelected.lineIndex + 1));
        return PropUpdateHelper.setProp(a, "lines", s);
    }
    removeSelection(e) {
        return Controller_z.handleEditor(e, (e) => {
            return e;
        });
    }
    removeCurrent(e, t) {
        var n = Controller_z.handleEditor(e, this.removeCurrentFromEditor.bind(this, t));
        return n && null != n.customData && null == n.editorModel ? new Controller_oe(e.cursorSelected, n.customData.key || n.customData.keys) : n;
    }
    removeCurrentForDelete(e, t) {
        var n = Controller_z.handleEditor(e, this.removeCurrentFromEditorForDelete.bind(this, t));
        return n && null != n.customData && null == n.editorModel ? new Controller_oe(e.cursorSelected, n.customData.key || n.customData.keys) : n;
    }
    handleConfirmDelete(e) {
        if (CheckObject.isLongDivision(e.compositeParent)) {
            if (!Remainder.isRemainderKey(e.compositeKey)) {
                return {
                    customData: {
                        key: void 0
                    }
                };
            }
            var t = Remainder.parseRemainderIndex(e.compositeKey);
            return {
                customData: {
                    keys: Remainder.getRemainderPairFromIndex(t)
                }
            };
        }
        if (CheckObject.isTabularNotBinomAndTableAndLatexTable(e.compositeParent)) {
            return {
                customData: {
                    key: e.compositeKey
                }
            };
        }
        var n = InitHelper.getMetaDataByName(e.compositeParent.text);
        if (!n || n.noInnerRemove) {
            return null;
        }
        if (!n.elements[e.compositeKey]) {
            return null;
        }
        var r = n.elements[e.compositeKey].onRemove;
        return "only" == r || "all" == r ? {
            customData: {
                key: "only" == r ? e.compositeKey : void 0
            }
        } : void 0;
    }
    removeCurrentFromEditor(e, t) {
        if (t.usedToHasSelection) {
            return _.assignIn({},
            t, {
                customData: {
                    isOneLineChanged: t.removedSelectionWithOneLineChanged
                }
            });
        }
        var n = t.editorSelected.lineIndex;
        var r = t.editorModel.lines[n];
        if (t.editorSelected.charIndex > 0) {
            var i = Controller_G.removeCharAt(r, t.editorSelected.charIndex - 1);
            var o = PropUpdateHelper.set(t.editorModel.lines, t.editorSelected.lineIndex, i);
            return {
                editorModel: PropUpdateHelper.set(t.editorModel, "lines", o),
                editorSelected: {
                    lineIndex: t.editorSelected.lineIndex,
                    charIndex: t.editorSelected.charIndex - 1
                },
                customData: {
                    isOneLineChanged: true
                }
            };
        }
        if (t.editorSelected.lineIndex <= 0) {
            return !e && t.compositeParent ? this.handleConfirmDelete(t) : null;
        }
        var s = t.editorModel.lines[t.editorSelected.lineIndex - 1];
        var l = BlockHelper.getTotalChar(s.blocks);
        var c = _.concat(s.blocks, r.blocks);
        c = Controller_G.joinBlocksIfPossible(c, s.blocks.length - 1);
        var d = PropUpdateHelper.set(s, "blocks", c);
        var h = PropUpdateHelper.set(t.editorModel.lines, t.editorSelected.lineIndex - 1, d);
        return h = PropUpdateHelper.remove(h, t.editorSelected.lineIndex),
        {
            editorModel: PropUpdateHelper.set(t.editorModel, "lines", h),
            editorSelected: {
                lineIndex: t.editorSelected.lineIndex - 1,
                charIndex: l
            },
            customData: {
                isOneLineChanged: null != t.compositeKey
            }
        };
    }
    removeCurrentFromEditorForDelete(e, t) {
        if (t.usedToHasSelection) {
            return _.assignIn({},
            t, {
                customData: {
                    isOneLineChanged: t.removedSelectionWithOneLineChanged
                }
            });
        }
        var n = t.editorSelected.lineIndex;
        var r = t.editorModel.lines[n];
        var i = BlockHelper.getTotalChar(r.blocks);
        if (t.editorSelected.charIndex <= i - 1) {
            var o = Controller_G.removeCharAt(r, t.editorSelected.charIndex);
            var s = PropUpdateHelper.set(t.editorModel.lines, t.editorSelected.lineIndex, o);
            return {
                editorModel: PropUpdateHelper.set(t.editorModel, "lines", s),
                editorSelected: {
                    lineIndex: t.editorSelected.lineIndex,
                    charIndex: t.editorSelected.charIndex
                },
                customData: {
                    isOneLineChanged: true
                }
            };
        }
        if (t.editorSelected.lineIndex >= t.editorModel.lines.length - 1) {
            return !e && t.compositeParent ? this.handleConfirmDelete(t) : null;
        }
        var l = t.editorModel.lines[t.editorSelected.lineIndex + 1];
        var c = _.concat(r.blocks, l.blocks);
        c = Controller_G.joinBlocksIfPossible(c, r.blocks.length - 1);
        var d = PropUpdateHelper.set(r, "blocks", c);
        var h = PropUpdateHelper.set(t.editorModel.lines, t.editorSelected.lineIndex, d);
        return h = PropUpdateHelper.remove(h, t.editorSelected.lineIndex + 1),
        {
            editorModel: PropUpdateHelper.set(t.editorModel, "lines", h),
            editorSelected: {
                lineIndex: t.editorSelected.lineIndex,
                charIndex: t.editorSelected.charIndex
            },
            customData: {
                isOneLineChanged: null != t.compositeKey
            }
        };
    }
};
/*n.d(t, "a", function () {
    return CommonController;
})*/

export default CommonController