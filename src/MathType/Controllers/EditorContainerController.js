import _ from 'lodash';
import { Down, CursorMovingControllerUP, Left, Right } from './CursorMovingController';
import { KeyboardInputMapping } from '../KeyboardInputHandler';
import ActionDataController from './ActionDataController';
import BackspaceDeleteController from './BackspaceDeleteController';
import BlockHelper from '../../Elements/BlockHelper';
import BlockStyleCapture from './BlockStyleCapture';
import CheckObject from '../../Editor/CheckObject';
import CommonController from './CommonController';
import ConsoleLog from '../../ConsoleLog';
import Controller_G from './Controller_G';
import Controller_V from './Controller_V';
import Controller_z from './Controller_z';
import CreateEditorObject from '../../Elements/CreateEditorObject';
import CursorHistory from './CursorHistory';
import CursorPositionHelper from '../../Editor/CursorPositionHelper';
import DiagramController from './DiagramController';
import DiagramIdHelper from '../../Elements/DiagramIdHelper';
import ElementSwitchController from './ElementSwitchController';
import HistoryHandler from '../HistoryHandler';
import ImageViewer from '../../Editor/ImageViewer';
import InitHelper from '../../InitHelper';
import IntersectStyleChecker from '../../Elements/IntersectStyleChecker';
import LineHelper from '../../Editor/LineHelper';
import LongDivisionController from './LongDivisionController';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import SelectionBuilder from '../SelectionBuilder';
import SelectionController from './SelectionController';
import Serialization from '../../Serialization';
import StyleHelper from '../../Mathcha/StyleHelper';
import TabularController from './TabularController';
import TabularUtils from '../../Tabular/TabularUtils';
import TextUtils from '../../Editor/TextUtils';
import TheoremHelper from '../../Mathcha/TheoremHelper';

/// xxx(1630) /*EditorContainerController*/

/// var r = n(3)/*_.assignIn*/;  // 14 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 22 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 18 times
/// var T = n(7)/*PropUpdateHelper*/;  // 11 times
/// var b = n(45)/*TabularUtils*/;  // 1 times
/// var w = n(36)/*TextUtils*/;  // 1 times
/// var O = n(13)/*CreateEditorObject*/;  // 6 times
/// var N = n(18)/*StyleHelper*/;  // 18 times
/// var k = n(6)/*DiagramIdHelper*/;  // 3 times
/// var P = n(80)/*LineHelper*/;  // 6 times
/// var W = n(31)/*CheckObject*/;  // 2 times
/// var Y = n(32)/*InitHelper*/;  // 7 times
/// var K = n(136)/*Serialization*/;  // 2 times
/// var q = n(65)/*ConsoleLog*/;  // 1 times
/// var he = n(49)/*CursorPositionHelper*/;  // 2 times
/// var je = n(122)/*TheoremHelper*/;  // 2 times
/// var pt = n(191)/*ImageViewer2*/;  // 2 times
/// var mt = n(252)/*IntersectStyleChecker*/;  // 1 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 3 times
/// var KeyboardInputHandler = n(1594)/*KeyboardInputHandler*/;  // 2 times
/// var HistoryHandler = n(1631)/*HistoryHandler*/;  // 1 times
/// var CursorHistory = n(1632)/*CursorHistory*/;  // 1 times
/// var BlockStyleCapture = n(1633)/*BlockStyleCapture*/;  // 1 times
/// var BackspaceDeleteController = n(1634)/*BackspaceDeleteController*/;  // 1 times
/// var DiagramController = n(1635)/*DiagramController*/;  // 1 times
/// var TabularController = n(1636)/*TabularController*/;  // 1 times
/// var ElementSwitchController = n(1637)/*ElementSwitchController*/;  // 1 times
/// var ActionDataController = n(1641)/*ActionDataController*/;  // 47 times
/// var Controller_z = n(1643)/*Controller_z*/;  // 10 times
/// var Controller_G = n(1644)/*Controller_G*/;  // 4 times
/// var Controller_V = n(1645)/*Controller_V*/;  // 1 times
/// var CommonController = n(1646)/*CommonController*/;  // 15 times
/// var CursorMovingController = n(1647)/*CommonController*/;  // 4 times
/// var LongDivisionController = n(1648)/*LongDivisionController*/;  // 1 times
/// var SelectionController = n(1649)/*SelectionController*/;  // 10 times
var Ye = new class {
    handleText(e, t, n) {
        console.log("ECC.Ye.handleText");
        if (!e) {
            return null;
        }
        if (t.isTextModeSelected()) {
            if ("$" == e) {
                var r = InitHelper.getInlineMathContainerModel();
                n && (r = _.assignIn({},
                r, {
                    style: _.assignIn({},
                    r.style, {
                        mathModeType: "\\displaystyle"
                    })
                }));
                return r;
            }
            return null;
        }
        if (t.isInsideTextSymbol()) {
            return null;
        } else {
            if ("[" == e || "(" == e || "{" == e || "]" == e || ")" == e || "}" == e) {
                return InitHelper.getCompositeOrSingleModel(e);
            } else {
                if ("^" == e || "_" == e) {
                    return InitHelper.getCompositeOrSingleModel("^" == e ? "\\power" : "\\index");
                } else {
                    return null;
                }
            }
        }
    }
};
var Ke = new class {
    move(e) {
        console.log("ECC.Ke.move");
        var t = this.changeSelected(e.cursorSelected);
        return PropUpdateHelper.setProp(e, "cursorSelected", t);
    }
    changeSelected(e) {
        console.log("ECC.Ke.changeSelected");
        if (null == e.selected) {
            throw new Error("wrong data passed");
        }
        return null == e.selected.selected ? PropUpdateHelper.update(e, {
            selected: void 0,
            key: void 0,
            charIndex: e.charIndex + 1
        }) : PropUpdateHelper.setProp(e, "selected", this.changeSelected(e.selected));
    }
};
var Je = new class {
    expandSelectionWithSameStyle(e, t) {
        console.log("ECC.Je.expandSelectionWithSameStyle");
        if (SelectionBuilder.isNoSelectionOrSameRoute(e.cursorSelected, e.extendedCursorSelected)) {
            return this.expandSelectionWithSameStyleForNoSelection(e, t);
        }
        var n;
        var r;
        var a;
        var i;
        Controller_z.handleEditor(e, (e) => {
            var o = e.selection;
            a = o.fromSelected;
            i = o.toSelected;
            var s = e.editorModel.lines[a.lineIndex];
            var l = e.editorModel.lines[i.lineIndex];
            var c = BlockHelper.getBlocksInfo(s);
            var d = a.lineIndex === i.lineIndex ? c : BlockHelper.getBlocksInfo(l);
            return n = this.expandLeft(c, a, t),
            r = this.expandRight(d, i, t),
            null;
        },
        false);
        var o = this.buildNewRootSelected(e.cursorSelected, a, i, n, r);
        var s = this.buildNewRootSelected(e.extendedCursorSelected, a, i, n, r);
        return ActionDataController.selection(s, o, BlockHelper.findLeafSelected(o));
    }
    expandSelectionWithSameStyleForNoSelection(e, t) {
        console.log("ECC.Je.expandSelectionWithSameStyleForNoSelection");
        var n = BlockHelper.findLeafSelected(e.cursorSelected);
        var r = BlockHelper.getSelectedEditor(e.model, e.cursorSelected).lines[n.lineIndex];
        var a = BlockHelper.getBlocksInfo(r);
        var i = a.find((e) => {
            return e.start <= n.charIndex && n.charIndex <= e.end;
        });
        if (!i) {
            return ActionDataController.emptyResult();
        }
        if (!StyleHelper.safeGetBlockStyle(i.block, t)) {
            return ActionDataController.emptyResult();
        }
        var o = this.expandLeft(a, n, t);
        var s = this.expandRight(a, n, t);
        if (n === e.cursorSelected) {
            if (SelectionBuilder.isSameRoute(o, s)) {
                return ActionDataController.emptyResult();
            } else {
                return ActionDataController.selection(o, s, BlockHelper.findLeafSelected(o));
            }
        }
        var l = _.cloneDeep(e.cursorSelected);
        var c = _.cloneDeep(e.cursorSelected);
        var d = BlockHelper.findLeafParentSelected(l);
        var h = BlockHelper.findLeafParentSelected(c);
        d.selected = o;
        h.selected = s;
        if (SelectionBuilder.isSameRoute(l, c)) {
            return ActionDataController.emptyResult();
        } else {
            return ActionDataController.selection(d, h, BlockHelper.findLeafSelected(d));
        }
    }
    expandRight(e, t, n) {
        var r = e.find((e) => {
            return e.start <= t.charIndex && t.charIndex <= e.end;
        });
        if (!r) {
            return t;
        }
        var i = StyleHelper.safeGetBlockStyle(r.block, n);
        if (!i) {
            return t;
        }
        var o = _.assignIn({},
        t, {
            charIndex: r.end + 1
        });
        var s = r.blockIndex;
        for (; s < e.length; s++) {
            var l = e[s];
            if (StyleHelper.safeGetBlockStyle(l.block, n) != i) {
                break;
            }
            o = _.assignIn({},
            t, {
                charIndex: l.end + 1
            });
        }
        return o;
    }
    expandLeft(e, t, n) {
        var r = e.find((e) => {
            return e.start <= t.charIndex && t.charIndex <= e.end;
        });
        if (!r) {
            return t;
        }
        var i = StyleHelper.safeGetBlockStyle(r.block, n);
        if (!i) {
            return t;
        }
        var o = _.assignIn({},
        t, {
            charIndex: r.start
        });
        var s = r.blockIndex;
        for (; s >= 0; s--) {
            var l = e[s];
            if (StyleHelper.safeGetBlockStyle(l.block, n) != i) {
                break;
            }
            o = _.assignIn({},
            t, {
                charIndex: l.start
            });
        }
        return o;
    }
    buildNewRootSelected(e, t, n, r, a) {
        if (e === t) {
            return r;
        }
        if (e === n) {
            return a;
        }
        var i = BlockHelper.findParentSelectedOf(e, t);
        if (i) {
            var o = _.cloneDeep(e);
            return i.selected = r,
            o;
        }
        if (i = BlockHelper.findParentSelectedOf(e, n)) {
            var s = _.cloneDeep(e);
            return i.selected = a,
            s;
        }
        throw new Error("moust found");
    }
};
class EditorContainerController {
    constructor() {
        this.historyHandler = new HistoryHandler();
        this.inputComposition = null;
        this.cursorHistory = new CursorHistory();
        this.blockStyleCapture = new BlockStyleCapture();
        this.goOutOfRegionIfTextFlag = false;
        this.backspaceDeleteController = new BackspaceDeleteController(this);
        this.diagramController = new DiagramController(this);
        this.tabularController = new TabularController(this);
        this.elementSwitchController = new ElementSwitchController();
    }
    changeSettings(e) {
        this.settings = e;
    }
    clearTemporarySelectedBlockStyle() {
        this.blockStyleCapture.clear();
    }
    canUndo() {
        return this.historyHandler.canUndo();
    }
    canRedo() {
        return this.historyHandler.canRedo();
    }
    getSelectionData(e) {
        if (! (arguments.length > 1 && void 0 !== arguments[1] && arguments[1])) {
            return CommonController.getSelectionData(e);
        }
        if (e.isImageContainerSelected || e.isInlineImageSelected) {
            var t = e.selectedBlockModel;
            return [CreateEditorObject.createLineFromBlock(t)];
        }
        return e.isDiagramSelected ? CommonController.extractDiagramSelected(e) : CommonController.getSelectionData(e);
    }
    mergeTableCells(e) {
        return this.tabularController.mergeTableCells(e);
    }
    unmergeTableCells(e, t) {
        return this.tabularController.unmergeTableCells(e, t);
    }
    getIntersectTabularEditorStyle(e) {
        return this.tabularController.getIntersectTabularEditorStyle(e);
    }
    setTabularEditorsStyle(e, t, n) {
        return this.tabularController.setTabularEditorsStyle(e, t, n);
    }
    addToHistory(e, t) {
        this.historyHandler.push(e, t);
    }
    addTableCaption(e) {
        var t = _.cloneDeep(e.cursorSelected);
        var n = BlockHelper.findLeafParentSelected(t);
        n.key = void 0;
        n.selected = void 0;
        var r = Controller_z.handleEditor({
            cursorSelected: t,
            extendedCursorSelected: null,
            model: e.model,
            isInSelection: function () {
                return false;
            }
        },
        (e) => {
            var t = e.editorSelected;
            var n = t.lineIndex;
            var r = t.charIndex;
            var i = e.editorModel.lines[n];
            var o = BlockHelper.blockFromIndex(i, r);
            if (!o) {
                return null;
            }
            if (!CheckObject.isTable(o.block)) {
                return null;
            }
            var s = o.block;
            if (s.elements.caption) {
                return null;
            }
            var l = CreateEditorObject.createEmptyEditor();
            l.lines[0].style = {
                align: "center"
            };
            var c = _.assignIn({},
            s, {
                elements: _.assignIn({},
                s.elements, {
                    caption: l
                })
            });
            return {
                editorModel: Controller_G.replaceBlockInEditor(e.editorModel, c, n, o.blockIndex),
                editorSelected: _.assignIn({},
                e.editorSelected, {
                    key: "caption",
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                })
            };
        });
        return r ? this.toKeyHandledResult(r, {}) : ActionDataController.emptyResult();
    }
    getHistoryContents() {
        return this.historyHandler.asArray();
    }
    clearHistory() {
        this.historyHandler.clear();
    }
    notifyCursorChanged() {
        this.cursorHistory.clear();
    }
    isShiftKey(e) {
        return e.shiftKey;
    }
    handleKeyUp(e) {
        if (91 === e.keyCode) {
            return ActionDataController.clearCopy();
        }
    }
    handleDelete(e, t) {
        return this.backspaceDeleteController.handleDelete(e, t);
    }
    handleSetStyleForBulletSelected(e, t, n) {
        return this.callSetStyleForSelectedBullets(e, (e) => {
            return StyleHelper.addStyleForBulletLine(e, t, n);
        });
    }
    setStyle(e, t, n) {
        if (e.isListBulletSelected()) {
            return LineHelper.getSupportedStyleNames().includes(t) ? this.handleSetStyleForBulletSelected(e, t, n) : ActionDataController.emptyResult();
        }
        if (!e.isInSelection()) {
            return ActionDataController.setTemporarySelectedBlockStyle(this.blockStyleCapture.setStyle(t, n));
        }
        var r = Controller_z.handleEditor(e, (r) => {
            return this.setStyleHandler(e, t, n, r);
        },
        false);
        return ActionDataController.setStyle(r.editorModel, r.customData && r.customData.isOneLineChanged);
    }
    pasteCopiedStyle(e, t) {
        if (!e.isInSelection()) {
            return ActionDataController.emptyResult();
        }
        var n = Controller_z.handleEditor(e, this.overrideStyleHandler.bind(this, e, t), false);
        return ActionDataController.setStyle(n.editorModel, n.customData && n.customData.isOneLineChanged);
    }
    setStyleHandler(e, t, n, r) {
        var a = Controller_G.setStyleForSelection(r.editorModel.lines, r.selection, t, n, e.isTextModeSelected());
        return {
            editorSelected: r.editorSelected,
            editorModel: PropUpdateHelper.set(r.editorModel, "lines", a),
            customData: {
                isOneLineChanged: null != r.compositeKey || r.selection.isSameLine()
            }
        };
    }
    overrideStyleHandler(e, t, n) {
        var r = Controller_G.overrideStyleForSelection(n.editorModel.lines, n.selection, t, e.isTextModeSelected());
        return {
            editorSelected: n.editorSelected,
            editorModel: PropUpdateHelper.set(n.editorModel, "lines", r),
            customData: {
                isOneLineChanged: null != n.compositeKey || n.selection.isSameLine()
            }
        };
    }
    handleSetLineListType(e, t) {
        if (e.isTableSelected() && e.isTabularCellsSelected()) {
            return ActionDataController.emptyResult();
        }
        if (e.isListBulletSelected() && _.isString(t)) {
            return this.callSetStyleForSelectedBullets(e, (e) => {
                return StyleHelper.setListType(e, t);
            });
        }
        if (t instanceof Array) {
            var n = Controller_z.handleEditor(e, (n) => {
                var r;
                var a;
                if (n.selection) {
                    r = n.selection.fromLineIndex;
                    a = n.selection.toLineIndex;
                } else {
                    a = r = n.editorSelected.lineIndex;
                }
                var i = LineHelper.expandRelatedListItemLines(e.model.lines, r, a);
                var o = i.from;
                var s = i.to;
                return {
                    editorModel: this.setStyleForLinesForEditor(n.editorModel, o, s, (e) => {
                        return StyleHelper.setListType(e, t);
                    }),
                    editorSelected: n.editorSelected
                };
            },
            false);
            return ActionDataController.setLineStyle(n.editorModel);
        }
        return this.callSetStyleForLines(e, (e) => {
            return StyleHelper.setListType(e, t);
        });
    }
    setLineStyle(e, t, n) {
        if ("listType" == t) {
            return this.handleSetLineListType(e, n);
        }
        var r = (e) => {
            return StyleHelper.setLineStyle(e, t, n);
        };
        if (e.isTableSelected() && e.isTabularCellsSelected()) {
            var a = Controller_z.travelForTabular(e, (e) => {
                var t = TabularUtils.modifyEditors(e.block, e.keys, (e) => {
                    return this.setStyleForLinesForEditor(e, 0, e.lines.length - 1, r);
                });
                return {
                    editorModel: Controller_G.replaceBlockInEditor(e.editor, t, e.selected.lineIndex, e.blockIndex),
                    editorSelected: e.selected
                };
            });
            return ActionDataController.setStyle(a.editorModel, false);
        }
        return this.callSetStyleForLines(e, r);
    }
    setBulletLine(e, t) {
        return e.isListBulletSelected() ? this.callSetStyleForSelectedBullets(e, (e) => {
            return LineHelper.setBulletForLine(e, t);
        }) : e.isRootLineSelected() ? this.callSetStyleForLines(e, (e) => {
            return LineHelper.setBulletForLine(e, t);
        }) : ActionDataController.emptyResultPreventDefault();
    }
    indentLine(e) {
        return e.isRootLineSelected() ? this.callSetStyleForLines(e, (e) => {
            return StyleHelper.indentLine(e);
        }) : ActionDataController.emptyResultPreventDefault();
    }
    outdentLine(e) {
        return e.isRootLineSelected() ? this.callSetStyleForLines(e, (e) => {
            return StyleHelper.outdentLine(e);
        }) : ActionDataController.emptyResultPreventDefault();
    }
    callSetStyleForSelectedBullets(e, t) {
        var n = Controller_z.handleEditor(e, (e) => {
            var n = e.editorSelected;
            var r = LineHelper.findRelatedListItemLinesByAction(e.editorModel.lines, n.lineIndex, n.listTypeSelect);
            var i = r.scopeLineFrom;
            var o = r.scopeLineTo;
            var s = r.selectedLines;
            var l = _.clone(e.editorModel.lines);
            var c = i;
            for (; c <= o; c++) {
                var d = e.editorModel.lines[c];
                if (s.includes(d)) {
                    var h = t(d);
                    l[c] = h;
                }
            }
            return {
                editorModel: _.assignIn({},
                e.editorModel, {
                    lines: l
                }),
                editorSelected: e.editorSelected
            };
        },
        false);
        return ActionDataController.setLineStyle(n.editorModel);
    }
    callSetStyleForLines(e, t) {
        var n = Controller_z.handleEditor(e, (e) => {
            var n;
            var r;
            return e.selection ? (n = e.selection.fromLineIndex, r = e.selection.toLineIndex) : r = n = e.editorSelected.lineIndex,
            {
                editorModel: this.setStyleForLinesForEditor(e.editorModel, n, r, t),
                editorSelected: e.editorSelected
            };
        },
        false);
        return ActionDataController.setLineStyle(n.editorModel);
    }
    setStyleForLinesForEditor(e, t, n, r) {
        var a = _.range(t, n + 1);
        var i = e.lines;
        return a.forEach((e) => {
            var t = r(i[e]);
            i = PropUpdateHelper.set(i, e, t);
        }),
        PropUpdateHelper.set(e, "lines", i);
    }
    getStyleFromSelfSelected(e, t, n) {
        var r = e.lines[t.lineIndex];
        var a = t.charIndex - 1;
        var i = BlockHelper.blockEach(r, (e, t, i, o) => {
            if (a >= i && a <= o) {
                return e.type == null ? e : n ? n ? r.blocks[t + 1] : null : e;
            }
        });
        return i ? i.style || {} : 0 === r.blocks.length ? {} : _.last(r.blocks).style;
    }
    getSelectedStyleIgnoreSelection(e) {
        return this.getIntersectStyleInner(e, true);
    }
    getIntersectStyle(e) {
        return this.getIntersectStyleInner(e, false);
    }
    getIntersectStyleForBullets(e) {
        var t = {};
        return Controller_z.handleEditor(e, (e) => {
            var n = new IntersectStyleChecker(["fontSize"]);
            var r = e.editorSelected;
            var a = LineHelper.findRelatedListItemLinesByAction(e.editorModel.lines, r.lineIndex, r.listTypeSelect).selectedLines;
            var i = 0;
            for (; i < a.length; i++) {
                var o = a[i];
                if ("stop" == n.next(StyleHelper.getLineStyle(o, "listBulletStyle"))) {
                    break;
                }
            }
            return t = n.end(),
            null;
        }),
        t;
    }
    getIntersectStyleInner(e, t) {
        var n = {};
        return Controller_z.handleEditor(e, (r) => {
            if (!r.selection || t) {
                n = this.getStyleFromSelfSelected(r.editorModel, r.editorSelected, e.isTextModeSelected());
                var a = this.blockStyleCapture.getStyleObj();
                return a && (n = _.assign({},
                n, a)),
                null;
            }
            return n = StyleHelper.getIntersectStyle(r.editorModel.lines, r.selection, e.isTextModeSelected()),
            null;
        },
        false),
        n || {};
    }
    handleKeyForImageContainer(e, t) {
        switch (t.action) {
        case "backspace":
            case "delete":
            return this.backspaceDeleteController.handleDelete(e, null);
        }
        return null;
    }
    handleCursorLeftRightHistory(e, t, n) {
        var r;
        var a;
        return "left" == n.action ? (this.goOutOfRegionIfTextFlag = false, (r = this.cursorHistory.handle("left")) ? ((a = this.handledResultFromCursorPos(r, "left", {
            selection: e.shiftKey,
            clearHiddenIputText: true
        })).surpressClearCursorHistory = true, a) : (null != (a = this.innerHandleKey(e, t)).action && this.cursorHistory.push(CursorPositionHelper.fullPosToDomPos(t.cursorPos), "right"), a.surpressClearCursorHistory = true, a)) : "right" == n.action ? (this.goOutOfRegionIfTextFlag = false, (r = this.cursorHistory.handle("right")) ? ((a = this.handledResultFromCursorPos(r, "right", {
            selection: e.shiftKey,
            clearHiddenIputText: true
        })).surpressClearCursorHistory = true, a) : (null != (a = this.innerHandleKey(e, t)).action && this.cursorHistory.push(CursorPositionHelper.fullPosToDomPos(t.cursorPos), "left"), a.surpressClearCursorHistory = true, a)) : void 0;
    }
    handleKey(e, t) {
        if (null == t.cursorSelected) {
            return ActionDataController.emptyResult();
        }
        var n = KeyboardInputMapping.getCommandFrom(e, t);
        if (t.selectOnly()) {
            switch (n.action) {
            case "copy":
                case "left":
                case "right":
                case "up":
                case "down":
                case "select-all":
                case "first-line":
                case "previous-break":
                case "home":
                case "end-line":
                case "next-break":
                case "end":
                break;
            default:
                return ActionDataController.emptyResult();
            }
        }
        if (t.isDiagramSelected) {
            var r = this.diagramController.handleKeyForDiagram(t, n, e.shiftKey);
            if (r) {
                return r;
            }
        }
        if (t.isImageContainerSelected || t.isInlineImageSelected) {
            var a = this.handleKeyForImageContainer(t, n);
            if (a) {
                return a;
            }
        }
        var i = this.handleCursorLeftRightHistory(e, t, n);
        if (i) {
            return i;
        }
        this.cursorHistory.clear();
        var o = this.innerHandleKey(e, t, n);
        return this.goOutOfRegionIfTextFlag && o && (_.isArray(o) || o.action) && (this.goOutOfRegionIfTextFlag = false),
        o;
    }
    composeStart() {
        this.inputComposition = {
            text: ""
        };
    }
    composeEnd(e, t) {
        var n = null;
        var r = this.inputComposition;
        return this.inputComposition && (this.inputComposition = null),
        r && r.text != e ? (n = this.handleTextInput(e, t)) ? n instanceof Array ? (n[0] && (n[0].keyInfo = n[0].keyInfo || {},
        n[0].keyInfo.clearHiddenIputText = true), n) : (n.keyInfo = n.keyInfo || {},
        n.keyInfo.clearHiddenIputText = true, n) : null : n;
    }
    isInInputComposition() {
        return null != this.inputComposition;
    }
    cleanInputComposition() {
        this.inputComposition = null;
    }
    handleDoubleClick(e) {
        this.cursorHistory.clear();
        return SelectionController.handleDoubleClick(e);
    }
    handleTripleClick(e, t) {
        this.cursorHistory.clear();
        return SelectionController.handleTripleClick(e, t);
    }
    insertLines(e, t) {
        var n = CommonController.insertLines(e, t);
        return this.toKeyHandledResult(n, {
            clearHiddenIputText: true
        });
    }
    insertBlock(e, t) {
        return this.toKeyHandledResult(this.insertInput(e, t), null);
    }
    insertText(e, t) {
        return this.toKeyHandledResult(this.insertInput(e, t), null);
    }
    insertInput(e, t, n) {
        var r = this.blockStyleCapture.getStyleObj();
        if (r) {
            if (_.isString(e)) {
                e = CreateEditorObject.createTextBlock(e, {
                    style: _.clone(r)
                });
            } else {
                if (! (t.isTextModeSelected() || e.style)) {
                    e = PropUpdateHelper.setProp(e, "style", _.clone(r));
                }
            }
        }
        var a = CommonController.insertInput(e, t, n);
        if (this.goOutOfRegionIfTextFlag) {
            if ("-" == e) {
                return a;
            }
            console.log("got here");
            var i = _.cloneDeep(a.editorSelected);
            var o = BlockHelper.findLeafParentSelected(i);
            if (o) {
                o.selected = void 0;
                o.charIndex++;
            }
            this.goOutOfRegionIfTextFlag = false;
            a = PropUpdateHelper.setProp(a, "editorSelected", i);
        }
        return a;
    }
    isDisplayStyleForInlineMathSetting() {
        return this.settings && this.settings.displayStyleForInlineMath;
    }
    insertImageContainer(e, t, n) {
        return e.isTextModeSelected() ? n ? this.handleBySymbolInfo(_.assignIn({},
        InitHelper.getInlineImageBox(), {
            imageUrl: t
        }), e) : this.handleBySymbolInfo(_.assignIn({},
        InitHelper.getImageContainer(), {
            imageUrl: t
        }), e) : (ImageViewer.requestFileUpload = null, ActionDataController.message("error", "Can not insert image in Math Mode Area"));
    }
    handleBySymbolInfo(e, t) {
        if (this.cursorHistory.clear(), "composite" == e.type || "single" == e.type) {
            if (this.goOutOfRegionIfTextFlag = false, !("\\image-container" != e.names[0] && "\\inline-image" != e.names[0] || e.imageUrl || ImageViewer.requestFileUpload)) {
                return ActionDataController.requestImageLibrary("\\inline-image" == e.names[0]);
            }
            e = PropUpdateHelper.setProp(e, "isInsideMathDisplayMode", t.isSelectedInDisplayMathContainer());
            var n = InitHelper.getModelByInfo(e);
            if (this.isDisplayStyleForInlineMathSetting() && "\\inline-math" == e.names[0]) {
                n = _.assignIn({},
                n, {
                    style: _.assignIn({},
                    n.style, {
                        mathModeType: "\\displaystyle"
                    })
                });
            }
            var r = this.toKeyHandledResult(this.insertInput(n, t, e), {
                clearHiddenIputText: false
            });
            return r.isOneLineChanged = true,
            BlockHelper.isTheoremLatexName(e.names[0]) && (r.isOneLineChanged = false),
            r;
        }
        if ("template" == e.type) {
            this.goOutOfRegionIfTextFlag = false;
            var i = InitHelper.getLinesByInfo(e);
            var o = CommonController.insertLines(i.lines, t, null != i.selected);
            return i.selected && (o.editorSelected = this.modifyLeafSelected(o.editorSelected, (e) => {
                if (void 0 !== i.selected.charIndex) {
                    e.charIndex = e.charIndex + i.selected.charIndex;
                }
            })),
            this.toKeyHandledResult(o, {
                clearHiddenIputText: true
            });
        }
        if (e.forceCreateModel) {
            this.goOutOfRegionIfTextFlag = false;
            var s = CreateEditorObject.createTextBlock(e.symbol);
            return this.toKeyHandledResult(this.insertInput(s, t), {
                clearHiddenIputText: false
            });
        }
        if ("mathxx" == e.type) {
            this.goOutOfRegionIfTextFlag = false;
            var l = CreateEditorObject.createTextBlock(e.symbol, {
                style: {
                    mathType: e.mathxxType
                }
            });
            return this.toKeyHandledResult(this.insertInput(l, t), {
                clearHiddenIputText: false
            });
        }
        return this.handleTextInput(e.symbol, t);
    }
    modifyLeafSelected(e, t) {
        var n = _.cloneDeep(e);
        return function e(n) {
            if (n.selected) {
                e(n.selected);
            } else {
                t(n);
            }
        } (n),
        n;
    }
    isAtRootEditor(e) {
        return null == e.cursorSelected.selected;
    }
    pasteAction(e, t, n) {
        var r;
        try {
            r = Serialization.fromPasteText(e, t.isRootLineSelected());
        } catch(e) {
            return {
                status: "error",
                message: "Could not parse pasted data"
            };
        }
        var a = Controller_V.process(r, t, {
            rootSymbolSupports: n.rootSymbolSupports
        });
        if (!a.lines || a.lines.length <= 0) {
            return null;
        }
        if (t.isOneLine() && a.lines.length > 1) {
            return null;
        }
        if (t.isPlainTextOnly() && _.some(a.lines, (e) => {
            return _.some(e.blocks, (e) => {
                return CheckObject.isComposite(e);
            });
        })) {
            return null;
        }
        var i;
        var o = r.theoremInfo;
        if (o && o.theorems) {
            i = TheoremHelper.merge(t.model.theoremInfo, o);
            TheoremHelper.modifyLinesWithMergeMod(a.lines, i);
        }
        var s = CommonController.insertLines(a.lines, t, false, r);
        return s ? (i && i.info && (s.editorModel = PropUpdateHelper.setProp(s.editorModel, "theoremInfo", i.info)), {
            status: a.status,
            message: a.message,
            model: s.editorModel,
            selected: s.editorSelected,
            theoremInfo: i && i.info
        }) : void 0;
    }
    handleInternalShortcutForTextInput(e, t) {
        if (e.isPlainTextOnly()) {
            return null;
        }
        var n = Ye.handleText(t, e, this.isDisplayStyleForInlineMathSetting());
        if (!n) {
            return null;
        }
        var r = this.toKeyHandledResult(this.insertInput(n, e), {
            clearHiddenIputText: true
        });
        return this.isDisablePowerIndexOneChar() || _.isString(n) || "\\power" != n.text && "\\index" != n.text || (this.goOutOfRegionIfTextFlag = true),
        this.inputComposition ? [ActionDataController.stopComposition(), r] : r;
    }
    handleCompositionTextInput(e, t) {
        var n;
        var r = this.goOutOfRegionIfTextFlag;
        console.log("using compose input,text:", e);
        var a = r && !this.goOutOfRegionIfTextFlag;
        if ("" == this.inputComposition.text && e) {
            n = this.toKeyHandledResult(this.insertInput(e, t), {
                clearHiddenIputText: false
            });
        } else {
            var i = t.cursorPos.charIndex - TextUtils.length(this.inputComposition.text);
            var o = CommonController.replaceTextForComposition(e, i, this.inputComposition.text.length, t);
            n = this.toKeyHandledResult(o, {
                clearHiddenIputText: false
            });
            a = a || o.customData && o.customData.stopComposition;
        }
        return n.isOneLineChanged = true,
        this.inputComposition.text = e,
        a ? (console.log("stop composition"), [ActionDataController.stopComposition(), n]) : n;
    }
    handleTextInput(e, t) {
        if ((null == e || "" == e) && !this.inputComposition) {
            return null;
        }
        if ("\b" == e) {
            return ConsoleLog.warn("Insert text with backspace"),
            null;
        }
        this.cursorHistory.clear();
        var n = this.handleInternalShortcutForTextInput(t, this.inputComposition ? _.last(e) : e);
        if (n) {
            return n;
        }
        if (this.inputComposition) {
            return this.handleCompositionTextInput(e, t);
        }
        var r = this.toKeyHandledResult(this.insertInput(e, t), {
            clearHiddenIputText: true
        });
        return r.isOneLineChanged = true,
        r;
    }
    isDisablePowerIndexOneChar() {
        return this.settings && this.settings.isDisablePowerIndexOneChar;
    }
    toggleStyle(e, t) {
        var n = this.getIntersectStyle(t);
        return this.setStyle(t, e, !n[e]);
    }
    toggleSetStyle(e, t, n) {
        if (n.isInsideTextSymbol()) {
            return ActionDataController.emptyResult();
        }
        var r = this.getIntersectStyle(n);
        return this.setStyle(n, e, r[e] != t ? t : void 0);
    }
    toggleUnderline(e) {
        return "underline" == this.getIntersectStyle(e).textDecoration ? this.setStyle(e, "textDecoration", void 0) : this.setStyle(e, "textDecoration", "underline");
    }
    requestUndo() {
        var e = this.historyHandler.undo();
        if (!e) {
            return ActionDataController.emptyResultPreventDefault();
        }
        var t = ActionDataController.fromDataOrCursorSelectedInfoChanged({
            model: e.mainModel,
            selected: e.mainSelected,
            extendedSelected: e.extendedMainSelected
        },
        {
            selection: false,
            clearHiddenIputText: true
        },
        true);
        return null != t.action && (t.action = "UndoRedo"),
        t;
    }
    requestRedo() {
        var e = this.historyHandler.redo();
        if (!e) {
            return ActionDataController.emptyResultPreventDefault();
        }
        var t = ActionDataController.fromDataOrCursorSelectedInfoChanged({
            model: e.mainModel,
            selected: e.mainSelected,
            extendedSelected: e.extendedMainSelected
        },
        {
            selection: false,
            clearHiddenIputText: true
        },
        true);
        return null != t.action && (t.action = "UndoRedo"),
        t;
    }
    buildCopyHandleResult(e) {
        return null == e ? null : ActionDataController.prepareCopy(e);
    }
    copyAction(e) {
        return this.getSelectionData(e, true);
    }
    cutAction(e) {
        if (e.isImageContainerSelected || e.isInlineImageSelected) {
            var t = e.selectedBlockModel;
            return {
                cutLines: r = [CreateEditorObject.createLineFromBlock(t)],
                model: (n = this.handleKeyForImageContainer(e, {
                    action: "delete",
                    e: null
                })).editorChangeInfo.model,
                selected: n.editorChangeInfo.selected
            };
        }
        if (e.isDiagramSelected) {
            var n;
            t = e.selectedBlockModel;
            return {
                cutLines: r = CommonController.extractDiagramSelected(e),
                model: (n = this.diagramController.handleKeyForDiagram(e, {
                    action: "delete",
                    e: null
                },
                false)).editorChangeInfo.model,
                selected: n.editorChangeInfo.selected
            };
        }
        var r = CommonController.getSelectionData(e);
        var a = CommonController.removeSelection(e);
        return {
            cutLines: r,
            model: a.editorModel,
            selected: a.editorSelected
        };
    }
    buildCutHandleResult(t, n, r) {
        var a = {
            selection: r,
            clearHiddenIputText: true,
            noPreventDefault: true
        };
        var i = [this.toKeyHandledResult(t, a)];
        var o = n;
        return null != o && (i = [ActionDataController.prepareCopy(o)].concat(i)),
        i;
    }
    replaceSearch(e, t, n, r, a) {
        if (!_.isString(a)) {
            a = Serialization.cloneBlocks(a);
        }
        var i = {
            cursorSelected: n,
            extendedCursorSelected: r,
            model: e,
            isInSelection: () => {
                return true;
            }
        };
        var o = [];
        return _.isString(a) ? o.push({
            id: DiagramIdHelper.nextId(),
            blocks: [{
                id: DiagramIdHelper.nextId(),
                text: a
            }]
        }) : o.push({
            id: DiagramIdHelper.nextId(),
            blocks: a
        }),
        this.toKeyHandledResult(CommonController.replaceLines(i, t, o), {
            ingoreFocusAfterChanged: true
        });
    }
    replaceLines(e, t, n) {
        return this.toKeyHandledResult(CommonController.replaceLines(e, t, n), {});
    }
    innerHandleKey(e, t, n) {
        var r = this.getCursorPosition(t);
        var a = {
            selection: e.shiftKey,
            clearHiddenIputText: true
        };
        n = n || KeyboardInputMapping.getCommandFrom(e, t);
        var action = n.action;
        if (action) {
            switch (n.action) {
            case "toggle-bold":
                return this.toggleStyle("isBold", t);
            case "toggle-underline":
                return this.toggleUnderline(t);
            case "toggle-italic":
                return this.toggleStyle("isItalic", t);
            case "toggle-mathbf":
                return this.toggleSetStyle("mathType", "\\mathbf", t);
            case "toggle-mathbb":
                return this.toggleSetStyle("mathType", "\\mathbb", t);
            case "toggle-mathcal":
                return this.toggleSetStyle("mathType", "\\mathcal", t);
            case "toggle-mathrm":
                return this.toggleSetStyle("mathType", "\\mathrm", t);
            case "select-all":
                return ActionDataController.selectAll(t);
            case "previous-break":
                var i = SelectionController.moveToPreviousBreak(t, this.isShiftKey(e));
                if (i) {
                    return i;
                }
            case "left":
                return this.handledResultFromCursorPos(Left.move(r), "left", a);
            case "right":
                return this.handledResultFromCursorPos(Right.move(r), "right", a);
            case "up":
                return this.handledResultFromCursorPos(CursorMovingControllerUP.move(r), "up", a);
            case "down":
                return this.handledResultFromCursorPos(Down.move(r), "down", a);
            case "next-break":
                var o = SelectionController.moveToNextBreak(t, this.isShiftKey(e));
                if (o) {
                    return o;
                }
            case "home":
                return SelectionController.moveHome(t, this.isShiftKey(e));
            case "first-line":
                return SelectionController.moveFirstLine(t, this.isShiftKey(e));
            case "end-line":
                return SelectionController.moveEndLine(t, this.isShiftKey(e));
            case "end":
                return SelectionController.moveEndEditor(t, this.isShiftKey(e));
            case "enter":
                return this.handleEnter(t, a, false);
            case "enter-clear":
                var s = CommonController.insertNewLine(t, true);
                return this.toKeyHandledResult(s, a);
            case "backspace":
                return this.backspaceDeleteController.handleBackspace(t, a);
            case "word-backspace":
                return this.backspaceDeleteController.handleWordBackspace(t, a);
            case "delete":
                return this.backspaceDeleteController.handleDelete(t, a);
            case "word-delete":
                return this.backspaceDeleteController.handleWordDelete(t, a);
            case "undo":
                return t.isExternalUndoRedo() ? ActionDataController.externalUndoRedo("ExternalUndoRequest") : this.requestUndo();
            case "redo":
                return t.isExternalUndoRedo() ? ActionDataController.externalUndoRedo("ExternalRedoRequest") : this.requestRedo();
            case "indent":
                return this.indentLine(t);
            case "outdent":
                return this.outdentLine(t);
            case "step-out":
                return this.handleStepOut(t);
            case "tab":
                return this.toKeyHandledResult(this.insertInput("\t", t), {
                    clearHiddenIputText: true
                });
            case "next-element":
                return this.elementSwitchController.next(t);
            case "previous-element":
                return this.elementSwitchController.previous(t);
            case "previous-cell":
                return this.handlePreviousCell(t);
            case "next-cell":
                return this.handleNextCell(t);
            case "none":
                return ActionDataController.emptyResult();
            }
        }
    }
    handleNextCell(e) {
        return this.tabularController.handleNextCell(e);
    }
    handlePreviousCell(e) {
        return this.tabularController.handlePreviousCell(e);
    }
    handleStepOut(e) {
        var t = Ke.move(e);
        return ActionDataController.stepOut(t.cursorSelected);
    }
    moveToPreviousBreak(e, t) {
        return SelectionController.moveToPreviousBreak(e, t);
    }
    moveToNextBreak(e, t) {
        return SelectionController.moveToNextBreak(e, t);
    }
    requestDeleteCurrent(e) {
        return this.handleKey({
            keyCode: 46
        },
        e);
    }
    requestBackSpaceCurrent(e) {
        return this.handleKey({
            keyCode: 8
        },
        e);
    }
    moveLeft(e) {
        return this.handleKey({
            keyCode: 37
        },
        e);
    }
    moveUp(e) {
        return this.handleKey({
            keyCode: 38
        },
        e);
    }
    moveRight(e) {
        return this.handleKey({
            keyCode: 39
        },
        e);
    }
    moveDown(e) {
        return this.handleKey({
            keyCode: 40
        },
        e);
    }
    selectAll(e) {
        return ActionDataController.selectAll(e);
    }
    removeMostNestedTabular(e) {
        return this.tabularController.removeMostNestedTabular(e);
    }
    removeListType(e) {
        return this.callSetStyleForLines(e, (e) => {
            return StyleHelper.removeListType(e);
        });
    }
    outdentOrRemoveListType(e) {
        return StyleHelper.getLineStyle(e.getSelectedLine(), "indentIndex", 0) <= 0 || e.isSelectedLineSection() ? this.removeListType(e) : this.callSetStyleForLines(e, (e) => {
            var t = StyleHelper.outdentLine(e);
            return t = StyleHelper.removeLineStyle(t, "listTypeSkip");
        });
    }
    handleEnter(e, t, n) {
        if (e.isCursorBeginInRootLine() && e.isSelectedLineListType() && BlockHelper.isEmptyLine(e.getSelectedLine())) {
            return this.outdentOrRemoveListType(e);
        } else {
            if (e.quickRowColumnInsertionSupport()) {
                return ActionDataController.insertRowColumnIndication();
            } else {
                if (e.isAtLongDivision()) {
                    return this.toKeyHandledResult(LongDivisionController.handleEnter(e), t);
                } else {
                    if (e.isOneLine()) {
                        return ActionDataController.emptyResult();
                    } else {
                        return this.toKeyHandledResult(CommonController.insertNewLine(e, n), t);
                    }
                }
            }
        }
    }
    expandSelectionWithSameStyle(e, t) {
        this.cursorHistory.clear();
        return Je.expandSelectionWithSameStyle(e, t);
    }
    getCursorPosition(e) {
        return e.cursorPos;
    }
    toKeyHandledResult(e, t) {
        if (null == e) {
            return ActionDataController.emptyResult();
        }
        var n = ActionDataController.fromDataOrCursorSelectedInfoChanged({
            model: e.editorModel,
            selected: e.editorSelected
        },
        t);
        return e.customData && e.customData.isOneLineChanged && (n.isOneLineChanged = true),
        n;
    }
    handledResultFromCursorPos(e, t, n) {
        return null == e ? ActionDataController.emptyResult(n) : (e.direction = t, ActionDataController.fromCursorChagnedFromCharId(e, n));
    }
}
/*n.d(t, "a", function () {
    return EditorContainerController;
})*/

export default EditorContainerController