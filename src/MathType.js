import _ from 'lodash';
import { Promise } from 'bluebird';
import classNames from 'classnames';
import jsBezier from 'jsbezier';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
// Not found 'var' for: import  from './Mathcha/spell-check-worker';
import ArrayHelper from './Mathcha/ArrayHelper';
import AutoCompleteHandler from './MathType/AutoCompleteHandler';
import BatchUpdater from './MathType/BatchUpdater';
import BlockHelper from './Elements/BlockHelper';
import CaptionNumberingHandler from './MathType/CaptionNumberingHandler';
import ChangeSessionHandler from './MathType/ChangeSessionHandler';
import ColInfoHandler from './MathType/ColInfoHandler';
import ConfirmDeleteHandler from './MathType/ConfirmDeleteHandler';
import ConsoleLog from './ConsoleLog';
import ContainerModel from './MathType/ContainerModel';
import ContextMenuHandler from './MathType/ContextMenuHandler';
import CopyPasteHandler from './MathType/CopyPasteHandler';
import CreateEditorObject from './Elements/CreateEditorObject';
import CursorPositionHelper from './Editor/CursorPositionHelper';
import DocumentCorruption from './Document/DocumentCorruption';
import EditAreaContainer from './MathType/EditAreaContainer';
import EditorContainerController from './MathType/Controllers/EditorContainerController';
import EditorCursorHandler from './MathType/EditorCursorHandler';
import EditorScrollHandler from './MathType/EditorScrollHandler';
import FindReplaceHandler from './MathType/FindReplaceHandler';
import FixedContextHandler from './MathType/FixedContextHandler';
import FocusHandler from './MathType/FocusHandler';
import Global from './Global';
import HandlerRenderSelect from './MathType/HandlerRenderSelect';
import HyperlinkInputBoxHandler from './MathType/HyperlinkInputBoxHandler';
import ImageLibraryHandler from './MathType/ImageLibraryHandler';
import InitHelper from './InitHelper';
import InsertDataHandler from './MathType/InsertDataHandler';
import ItemsBarHandler from './MathType/ItemsBarHandler';
import KeyboardInputHandler from './MathType/KeyboardInputHandler';
import LatexIoHandler from './MathType/LatexIoHandler';
import LatexTableTemplateHandler from './MathType/LatexTableTemplateHandler';
import LineTableSettingsHandler from './MathType/LineTableSettingsHandler';
import MathTagHandler from './MathType/MathTagHandler';
import MathTemplateHandler from './MathType/MathTemplateHandler';
import MathVisibleViewHandler from './MathType/MathVisibleViewHandler';
import MessageBoxHandler from './MathType/MessageBoxHandler';
import MessageProvider from './Mathcha/MessageProvider';
import MobileSupportHandler from './MathType/MobileSupportHandler';
import ModalDialog from './Editor/ModalDialog';
import MouseInputHandler from './MathType/MouseInputHandler';
import PageSettings from './Mathcha/PageSettings';
import RegionHighlightHandler from './MathType/RegionHighlightHandler';
import RemoteCursorHandler from './MathType/RemoteCursorHandler';
import RenderingContext from './MathType/RenderingContext';
import ResultHandler from './MathType/ResultHandler';
import SelectionBuilder from './MathType/SelectionBuilder';
import SelectionCorrector from './MathType/SelectionCorrector';
import SelectionHandler from './MathType/SelectionHandler';
import SelectionSettingsHandler from './MathType/SelectionSettingsHandler';
import Serialization from './Serialization';
import ShortcutManagerHandler from './MathType/ShortcutManagerHandler';
import SpecialSymbolHandler from './MathType/SpecialSymbolHandler';
import SpellCheckHandler from './MathType/SpellCheckHandler';
import TabularRowColumnHandler from './MathType/TabularRowColumnHandler';
import TheoremManagementHandler from './MathType/TheoremManagementHandler';
import TimerHelper from './Mathcha/TimerHelper';
import ToolbarHandler from './MathType/ToolbarHandler';

/// xxx(91) /*MathType*/

/// n.r(t)
/// var PageSettingsHandler = n(462)/*PageSettings*/;  // 1 times
/// var FindReplaceHandler = n(1590)/*FindReplaceHandler*/;  // 1 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 1 times
/// var LatexIoHandler = n(1591)/*LatexIoHandler*/;  // 1 times
/// var CopyPasteHandler = n(1592)/*CopyPasteHandler*/;  // 1 times
/// var MobileSupportHandler = n(1593)/*MobileSupportHandler*/;  // 1 times
/// var KeyboardInputHandler = n(1594)/*KeyboardInputHandler*/;  // 1 times
/// var MouseInputHandler = n(1595)/*MouseInputHandler*/;  // 1 times
/// var LineTableSettingsHandler = n(1596)/*LineTableSettingsHandler*/;  // 1 times
/// var EditorScrollHandler = n(1597)/*EditorScrollHandler*/;  // 1 times
/// var AutoCompleteHandler = n(1598)/*AutoCompleteHandler*/;  // 1 times
/// var ItemsBarHandler = n(1599)/*ItemsBarHandler*/;  // 1 times
/// var TheoremManagementHandler = n(1600)/*TheoremManagementHandler*/;  // 1 times
/// var MathTagHandler = n(1601)/*MathTagHandler*/;  // 1 times
/// var ToolbarHandler = n(1602)/*ToolbarHandler*/;  // 1 times
/// var ResultHandler = n(1603)/*ResultHandler*/;  // 1 times
/// var MessageBoxHandler = n(1604)/*MessageBoxHandler*/;  // 1 times
/// var RegionHighlightHandler = n(1605)/*RegionHighlightHandler*/;  // 1 times
/// var HyperlinkInputBoxHandler = n(1606)/*HyperlinkInputBoxHandler*/;  // 1 times
/// var ConfirmDeleteHandler = n(1607)/*ConfirmDeleteHandler*/;  // 1 times
/// var TabularRowColumnHandler = n(1608)/*TabularRowColumnHandler*/;  // 1 times
/// var ImageLibraryHandler = n(1609)/*ImageLibraryHandler*/;  // 1 times
/// var MathTemplateHandler = n(1610)/*MathTemplateHandler*/;  // 1 times
/// var SpecialSymbolHandler = n(1611)/*SpecialSymbolHandler*/;  // 1 times
/// var InsertDataHandler = n(1612)/*InsertDataHandler*/;  // 1 times
/// var SpellCheckHandler = n(1613)/*SpellCheckHandler*/;  // 1 times
/// var MathVisibleViewHandler = n(1614)/*MathVisibleViewHandler*/;  // 1 times
/// var ShortcutManagerHandler = n(1615)/*ShortcutManagerHandler*/;  // 1 times
/// var CaptionNumberingHandler = n(1616)/*CaptionNumberingHandler*/;  // 1 times
/// var RemoteCursorHandler = n(1617)/*RemoteCursorHandler*/;  // 1 times
/// var ColInfoHandler = n(1618)/*ColInfoHandler*/;  // 1 times
/// var ContextMenuHandler = n(1619)/*ContextMenuHandler*/;  // 1 times
/// var SelectionSettingsHandler = n(1620)/*SelectionSettingsHandler*/;  // 1 times
/// var FocusHandler = n(1621)/*FocusHandler*/;  // 1 times
/// var EditorCursorHandler = n(1622)/*EditorCursorHandler*/;  // 1 times
/// var SelectionHandler = n(1623)/*SelectionHandler*/;  // 1 times
/// var LatexTableTemplateHandler = n(1624)/*LatexTableTemplateHandler*/;  // 1 times
/// var ChangeSessionHandler = n(1625)/*ChangeSessionHandler*/;  // 1 times
/// var HandlerRenderSelect = n(1626)/*HandlerRenderSelect*/;  // 1 times
/// var BatchUpdater = n(1627)/*BatchUpdater*/;  // 1 times
/// var RenderingContext = n(1628)/*RenderingContext*/;  // 1 times
/// var FixedContextHandler = n(1629)/*FixedContextHandler*/;  // 1 times
/// var EditorContainerController = n(1630)/*EditorContainerController*/;  // 1 times
/// var SelectionCorrector = n(1638)/*SelectionCorrector*/;  // 2 times
/// var EditAreaContainer = n(1639)/*EditAreaContainer*/;  // 1 times
/// var ContainerModel = n(1640)/*ContainerModel*/;  // 1 times
/// n(556)/*core-js-556*/;  // 0 times
/// n(568)/*core-js-568*/;  // 0 times
/// n(222)/*jsBezier*/;  // 0 times
/// n(1432)/*spell-check-worker*/;  // 0 times
/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 15 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 4 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 4 times
/// var d = n.n(c);
/// var h = n(23)/*PropTypesExporter*/;  // 20 times
/// var u = n.n(h);
/// var g = n(95)/*DocumentCorruption*/;  // 5 times
/// var mn = n(30)/*blubirdjs*/;  // 2 times
/// var fn = n.n(mn);
/// var I = n(12)/*BlockHelper*/;  // 5 times
/// var O = n(13)/*CreateEditorObject*/;  // 4 times
/// var Y = n(32)/*InitHelper*/;  // 1 times
/// var K = n(136)/*Serialization*/;  // 3 times
/// var q = n(65)/*ConsoleLog*/;  // 1 times
/// var ee = n(11)/*Global*/;  // 9 times
/// var ne = n(43)/*ArrayHelper*/;  // 1 times
/// var he = n(49)/*CursorPositionHelper*/;  // 1 times
/// var St = n(124)/*ModalDialog*/;  // 2 times
/// var Ct = n(453)/*MessageProvider*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 2 times
var mathTypeLoadTime = 0;
class MathType extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            cursorShow: true,
            mainModel: this.props.model || this.getEmptyModel(),
            mainSelected: this.props.selected || this.getInitSelect(),
            confirmDeleted: null
        };
        this.pageSettingsHandler = new PageSettings(this);
        this.findReplaceHandler = new FindReplaceHandler(this);
        this.latexIoHandler = new LatexIoHandler(this);
        this.copyPasteHandler = new CopyPasteHandler(this);
        this.mobileSupportHandler = new MobileSupportHandler(this);
        this.keyboardInputHandler = new KeyboardInputHandler(this);
        this.mouseInputHandler = new MouseInputHandler(this);
        this.lineTableSettingsHandler = new LineTableSettingsHandler(this);
        this.editorScrollHandler = new EditorScrollHandler(this);
        this.autoCompleteHandler = new AutoCompleteHandler(this);
        this.itemsBarHandler = new ItemsBarHandler(this);
        this.theoremManagementHandler = new TheoremManagementHandler(this);
        this.mathTagHandler = new MathTagHandler(this);
        this.toolbarHandler = new ToolbarHandler(this);
        this.resultHandler = new ResultHandler(this);
        this.messageBoxHandler = new MessageBoxHandler(this);
        this.regionHighlightHandler = new RegionHighlightHandler(this);
        this.hyperlinkInputBoxHandler = new HyperlinkInputBoxHandler(this);
        this.confirmDeleteHandler = new ConfirmDeleteHandler(this);
        this.tabularRowColumnHandler = new TabularRowColumnHandler(this);
        this.imageLibraryHandler = new ImageLibraryHandler(this);
        this.mathTemplateHandler = new MathTemplateHandler(this);
        this.specialSymbolHandler = new SpecialSymbolHandler(this);
        this.insertDataHandler = new InsertDataHandler(this);
        this.spellCheckHandler = new SpellCheckHandler(this);
        this.mathVisibleViewHandler = new MathVisibleViewHandler(this);
        this.shortcutManagerHandler = new ShortcutManagerHandler(this);
        this.captionNumberingHandler = new CaptionNumberingHandler(this);
        this.remoteCursorHandler = new RemoteCursorHandler(this);
        this.colInfoHandler = new ColInfoHandler(this);
        this.contextMenuHandler = new ContextMenuHandler(this, this.copyPasteHandler, this.latexIoHandler);
        this.selectionSettingsHandler = new SelectionSettingsHandler(this);
        this.focusHandler = new FocusHandler(this, this.mobileSupportHandler, this.keyboardInputHandler);
        this.editorCursorHandler = new EditorCursorHandler(this, this.focusHandler, this.keyboardInputHandler, this.mobileSupportHandler);
        this.selectionHandler = new SelectionHandler(this);
        this.latexTableTemplateHandler = new LatexTableTemplateHandler(this);
        this.changeSessionHandler = new ChangeSessionHandler();
        this.mathTypeKey = this.nextMathKey();
        this.internalClipboard = {
            copyText: ""
        };
        this.error = false;
        this.handlerRenderSelect = new HandlerRenderSelect(this);
        this.batchUpdater = new BatchUpdater();
        this.renderingContext = new RenderingContext();
        this.unMounted = false;
        this.getMathTemplates = () => {
            return this.props.mathTemplateProvider && this.props.mathTemplateProvider.getTemplates() || [];
        };
        this.setMathTemplates = (e) => {
            return this.props.mathTemplateProvider ? this.props.mathTemplateProvider.saveTemplates(e) : Promise.reject("There is no service to handle saving templates");
        };
        this.requestDeleteHandle = () => {
            var e = this.changeSessionHandler.getContainerModel();
            var t = this.editorContainerController.requestDeleteCurrent(e);
            this.handleResult(t);
        };
        this.getTheoremInfo = () => {
            return this.state.mainModel.theoremInfo;
        };
        this.requestImageSelection = (e, t, n) => {
            return this.imageLibraryHandler.requestImageSelection(e, t, n);
        };
        this.notifyDataChanged = () => {
            if (this.props.onModelChanged) {
                this.props.onModelChanged(this.state.mainModel, true);
            }
        };
        this.requestExportDialog = (e, t) => {
            this.latexIoHandler.requestExportDialog(e, t);
        };
        this.selectFromPos = (e, t) => {
            this.handleSelectFromPosition(e, t, false);
            this.hidenInputFocus();
        };
        this.handleSelectFromPosition = (e, t, n) => {
            return this.mouseInputHandler.handleSelectFromPosition(e, t, n);
        };
        this.getEditorInfo = () => {
            return {
                isSelectionMode: null != this.state.extendedMainSelected,
                isReadOnly: this.props.readOnly,
                selectOnly: this.props.selectOnly,
                mathTypeRef: this.mathType,
                scrollSelector: this.getScrollSelector(),
                mainModel: this.state.mainModel,
                leftSideBarWidth: this.getLeftSideBarWidth(),
                rootEditorElement: this.editor && this.editor.editor
            };
        };
        this.showMessage = (e, t) => {
            this.messageBoxHandler.showMessage(e, t);
        };
        this.afterMountBatchProcessFunc = () => {
            if (this.initContainerModelAndCursorPosition(), this.props.readOnly) {
                return this.mathTagHandler.processLineTagNumbering(),
                    this.theoremManagementHandler.processTheoremNumbering(),
                    this.captionNumberingHandler.processImageCaptionNumbering(),
                    void this.captionNumberingHandler.processTableCaptionNumbering();
            }
            if (!this.props.externalUndoRedo) {
                this.editorContainerController.addToHistory({
                    mainModel: this.state.mainModel,
                    mainSelected: this.state.mainSelected,
                    extendedMainSelected: this.state.extendedMainSelected
                });
            }
            this.editorScrollHandler.scrollToPositionIfNotInView();
            this.itemsBarHandler.updateItemsBar();
            this.lineTableSettingsHandler.handleLineSetting();
            this.selectionSettingsHandler.setSelectionSettingState();
            this.focusHandler.handleOnTargetOnBatchMounted();
            this.mathTagHandler.processLineTagNumbering();
            this.theoremManagementHandler.processTheoremNumbering();
            this.captionNumberingHandler.processImageCaptionNumbering();
            this.captionNumberingHandler.processTableCaptionNumbering();
            this.changeSessionHandler.end();
            console.warn("time:", (new Date).getTime() - mathTypeLoadTime);
            Promise.resolve().then(() => {
                return this.renderingContext.setNextCycleLastRendering(false);
            });
            if (Global.isTestEnv()) {
                TimerHelper.waitALitteWhile(() => {
                    window.mathchaPageLoaded = true;
                });
            }
        };
        this.onDataChanged = (e, t) => {
            if (this.resetTempVariables(), t) {
                var n = this.changeSessionHandler.getSessionValue("focusAcquire");
                this.changeSessionHandler.setSessionValue("focusAcquire", !!t.focusAcquired || n);
                this.editorScrollHandler.setPreventScroll(!!t.preventScroll);
                this.changeSessionHandler.setSessionValue("isOneLineChanged", !!t.isOneLineChanged);
            }
            this.changeModel(e, false, null);
        };
        this.onSelectedChanged = (e, t) => {
            if (!this.shouldPreventSelect(e)) {
                t = t || {};
                e = this.handleListItemSelected(e);
                this.resetTempVariables();
                if (!this.changeSessionHandler.getSessionValue("surpressClearCursorHistory")) {
                    this.editorContainerController.notifyCursorChanged();
                }
                if (t.cursorContext) {
                    this.changeSessionHandler.setSessionValue("cursorContext", t.cursorContext);
                }
                if (t.isExtendingSelection) {
                    this.extendSelection(e);
                } else {
                    this.setSelected(e);
                }
                this.editorCursorHandler.requestShowCursor();
            }
        };
        this.getContainerModel = () => {
            return this.changeSessionHandler.getContainerModel();
        };
        this.handleResult = (e, t) => {
            this.resultHandler.handleResult(e, t);
        };
        this.getMathTypeRef = (e) => {
            this.mathType = e;
        };
        this.getRootEditAreaRef = (e) => {
            this.editor = e;
        };
        this.requestRenderToolBarComponent = (e) => {
            this.toolbarHandler.requestRenderToolBarComponent(e);
        };
        this.getCursorPosition = () => {
            return this.editorCursorHandler.getCursorPosition();
        };
        this.requestVisibleLines = () => {
            return this.mathVisibleViewHandler.requestVisibleLines();
        };
        this.handleRequestSpellCheckSuggestions = () => {
            return this.spellCheckHandler.handleRequestSpellCheckSuggestions();
        };
        this.fixedContextHandler = new FixedContextHandler(this.batchUpdater, this.renderingContext);
        InitHelper.initAll();
        this.editorContainerController = new EditorContainerController();
        this.editorCursorHandler.init();
        this.editorContainerController.changeSettings(e.settings || {});
        this.keyboardInputHandler.changeSettings(e.settings || {});
        this.shortcutManagerHandler.updateSingleShortcutService(e.settings || {});
        this.onMathTypeBlur = (e) => {
            this.focusHandler.onMathTypeBlur(e);
            this.clearSelect();
        }
    }
    getFixedContextHandler() {
        return this.fixedContextHandler;
    }
    isBusy() {
        return this.batchUpdater.isBusy();
    }
    getShortcutMatcher() {
        return this.shortcutManagerHandler.getShortcutMatcher();
    }
    getMathTypeSettings() {
        return this.props.settings || {};
    }
    raiseShortcutSettingsChange(e) {
        if (this.props.onShortcutsChange) {
            this.props.onShortcutsChange(e);
        }
    }
    requestRender(e) {
        this.handlerRenderSelect.requestRender(e);
    }
    closeRender(e) {
        this.handlerRenderSelect.closeRender(e);
    }
    showShortcutManager() {
        this.shortcutManagerHandler.showShortcutManager();
    }
    getSelection() {
        return this.selectionHandler.getSelection();
    }
    setCursorMathTypeFocus(e) {
        this.editorCursorHandler.setCursorMathTypeFocus(e);
    }
    setCursorInputFocus(e) {
        this.editorCursorHandler.setCursorInputFocus(e);
    }
    temporaryPreventInput(e) {
        return this.keyboardInputHandler.temporaryPreventInput(e);
    }
    getRegionHighlight() {
        return this.regionHighlightHandler.getRegionHighlight();
    }
    getEditorHtmlElement() {
        return this.editor && this.editor.editor;
    }
    getEditorComponent() {
        return this.editor;
    }
    getMathTypeHtmlElement() {
        return this.mathType;
    }
    nextMathKey() {
        return "key" + Math.random().toString();
    }
    requestRecreateWholePage() {
        this.mathTypeKey = this.nextMathKey();
        this.refreshThemeSettings();
        this.forceUpdate();
    }
    requestSpellCheckLanguageChange() {
        this.forceUpdate();
    }
    getInitSelect(e) {
        return this.props.readOnly ? null : this.isMathOnly(e) ? {
            lineIndex: 0,
            charIndex: 0,
            key: "mathValue",
            selected: {
                lineIndex: 0,
                charIndex: 0
            }
        } : {
                lineIndex: 0,
                charIndex: 0
            };
    }
    getEmptyModel(e) {
        if (this.isMathOnly(e)) {
            var t = CreateEditorObject.createComposite("\\inline-math");
            t.elements.mathValue = CreateEditorObject.createEmptyEditor();
            var n = CreateEditorObject.createEmptyEditor();
            return n.lines[0].blocks.push(t),
                n;
        }
        return CreateEditorObject.createEmptyEditor();
    }
    find(e, t) {
        return this.findReplaceHandler.find(e, t);
    }
    findNext() {
        return this.findReplaceHandler.findNext();
    }
    findPrevious() {
        return this.findReplaceHandler.findPrevious();
    }
    getController() {
        return this.editorContainerController;
    }
    requestReplace(e, t) {
        return this.findReplaceHandler.requestReplace(e, t);
    }
    requestReplaceAll(e, t) {
        return this.findReplaceHandler.requestReplaceAll(e, t);
    }
    needFocusAcquire() {
        this.changeSessionHandler.setSessionValue("focusAcquire", true);
    }
    needPreventScroll() {
        this.editorScrollHandler.needPreventScroll();
    }
    closeFindSession() {
        return this.findReplaceHandler.closeFindSession();
    }
    componentWillReceiveProps(e) {
        if (e.model != this.props.model) {
            this.setModel(e.model, e.selected);
        }
        this.editorContainerController.changeSettings(e.settings || {});
        this.keyboardInputHandler.changeSettings(e.settings || {});
        this.shortcutManagerHandler.updateSingleShortcutService(e.settings || {});
    }
    clearSelect() {
        if (!DocumentCorruption.isCurrentDocumentInCorruption()) {
            this.selectionHandler.clearSelected();
        }
    }
    requestClearSelect() {
        this.selectionHandler.requestClearSelect();
    }
    cancelClearSelect() {
        this.selectionHandler.cancelClearSelect();
    }
    notifyLayoutChanged() {
        this.refreshSelection(true);
        this.spellCheckHandler.refreshSpellCheckAll();
    }
    getModel() {
        return this.state.mainModel;
    }
    getHistoryContents() {
        var historyContents = this.editorContainerController.getHistoryContents();
        console.log("editorContainerController.historyContents", historyContents);
        return historyContents;
    }
    shouldComponentUpdate(e, t) {
        return !ArrayHelper.areEqualShallow(t, this.state) || e.model != this.props.model || e.oneMode != this.props.oneMode || e.selectOnly != this.props.selectOnly || e.isSidebarShown != this.props.isSidebarShown || e.itemsBarHide != this.props.itemsBarHide || e.sideBarWidth != this.props.sideBarWidth || e.settings != this.props.settings;
    }
    colIncrementUpdate(e, t) {
        if (!this.unMounted) {
            if (t) {
                t = {
                    selected: SelectionCorrector.correctIfChange(e, t.selected, this.state.mainSelected),
                    extendedSelected: SelectionCorrector.correctIfChange(e, t.extendedSelected, this.state.extendedMainSelected)
                };
            }
            if (t && t.extendedSelected && SelectionBuilder.isSameRoute(t.selected, t.extendedSelected)) {
                t = _.assignIn({},
                    t, {
                    extendedSelected: null
                });
            }
            this.changeSessionHandler.setSessionValue("surpressRaiseModelChanged", true);
            this.changeSessionHandler.setSessionValue("ignoreFindingMovingBlocksForRootEditor", true);
            ReactDOM.unstable_batchedUpdates(() => {
                this.editorScrollHandler.needPreventScroll();
                var n = t ? {
                    mainSelected: t.selected,
                    extendedMainSelected: t.extendedSelected
                } : {};
                this.setMainModel(e, n);
                this.colInfoHandler.setColChangeSession();
            });
        }
    }
    setModel(e, n) {
        n = n || this.getInitSelect();
        this.changeSessionHandler.setSessionValue("surpressRaiseModelChanged", true);
        this.changeSessionHandler.setSessionValue("ignoreFindingMovingBlocksForRootEditor", true);
        ReactDOM.unstable_batchedUpdates(() => {
            this.setMainModel(e, {
                isAutoCompleteShow: false,
                mainSelected: n,
                extendedMainSelected: null
            });
            if (!this.props.readOnly) {
                this.editorContainerController.clearHistory();
                this.mathTagHandler.clearLineTagSelection();
                this.changeSessionHandler.setSessionValue("ignoreAddingToHistory", true);
            }
        });
    }
    showImportFromLatex() {
        this.latexIoHandler.showImportFromLatex();
    }
    hidenInputFocus(e) {
        this.focusHandler.hidenInputFocus(e);
    }
    setTheoremInfo(e) {
        this.theoremManagementHandler.setTheoremInfo(e);
    }
    getChildContext() {
        var e = this.pageSettingsHandler.getPageSettings();
        return {
            requestRenderToolBarComponent: this.requestRenderToolBarComponent,
            requestRenderItemsBarComponent: this.itemsBarHandler.requestRenderItemsBarComponent,
            getEditorInfo: this.getEditorInfo,
            mathFontSizeBase: e.mathFontSize,
            fontSizeBase: e.fontSize,
            selectFromPos: this.selectFromPos,
            notifyLineTagRender: this.mathTagHandler.notifyLineTagRender,
            notifyTheoremNumbering: this.theoremManagementHandler.notifyTheoremNumbering,
            requestDelete: this.requestDeleteHandle,
            getTheoremInfo: this.getTheoremInfo,
            requestExportDialog: this.latexIoHandler.requestExportDialog,
            requestImageSelection: this.requestImageSelection,
            showMessage: this.showMessage,
            notifyDataChanged: this.notifyDataChanged,
            getImageCaptionInfo: this.captionNumberingHandler.getImageCaptionInfo,
            notifyImageCaptionNumbering: this.captionNumberingHandler.notifyImageCaptionNumbering,
            getTableCaptionInfo: this.captionNumberingHandler.getTableCaptionInfo,
            notifyTableCaptionNumbering: this.captionNumberingHandler.notifyTableCaptionNumbering,
            baseMathModeFontFamily: this.getBaseMathModeFontFamily(),
            fixedContextHandler: this.fixedContextHandler
        };
    }
    notifyTableCaptionNumbering() {
        this.captionNumberingHandler.notifyTableCaptionNumbering();
    }
    getLeftSideBarWidth() {
        return this.props.isSidebarShown ? this.props.sideBarWidth : 0;
    }
    getElementRoot() {
        return ReactDOM.findDOMNode(this);
    }
    componentDidMount() {
        if (!DocumentCorruption.isCurrentDocumentInCorruption()) {
            this.focusHandler.handleOnTargetMounted();
            this.editorCursorHandler.startBlink();
            this.processBatchAfterMounted();
            if (!this.props.readOnly) {
                MessageProvider.setProvider(this);
            }
            this.mobileSupportHandler.registerSelectionMarkTouchEvents();
            this.mobileSupportHandler.registerTouchHold();
            this.mobileSupportHandler.updateArrowsKeySupportStatus();
            this.changeSessionHandler.end();
        }
    }
    componentWillMount() {
        mathTypeLoadTime = (new Date).getTime();
        this.renderingContext.setNextCycleLastRendering(true);
        this.refreshThemeSettings();
    }
    refreshThemeSettings() {
        this.fixedContextHandler.setDarkMode(Global.isDarkMode() || !!this.getPageSettings().isDarkMode);
    }
    componentWillUnmount() {
        this.unMounted = true;
        this.mathVisibleViewHandler.cleanUp();
        this.mobileSupportHandler.unregisterSelectionMarkTouchEvents();
        this.mobileSupportHandler.unregisterTouchHold();
        this.editorCursorHandler.cleanUp();
    }
    showError(e) {
        this.messageBoxHandler.showError(e);
    }
    showInfo(e) {
        this.messageBoxHandler.showInfo(e);
    }
    clearMessage() {
        this.messageBoxHandler.clearMessage();
    }
    processBatchAfterMounted() {
        this.batchUpdater.process(this.afterMountBatchProcessFunc);
    }
    getSafeSelected() {
        return this.editorCursorHandler.getSafeSelected();
    }
    getSafeExtendedSelected() {
        return this.state.extendedMainSelected;
    }
    getExtendedSelected() {
        return this.state.extendedMainSelected;
    }
    afterChanged(t) {
        if (!this.unMounted) {
            var n = t.mainModel != this.state.mainModel;
            if (n && (this.mathTagHandler.processLineTagNumbering(), this.remoteCursorHandler.processUpdateRemoteCursorPositions()), this.theoremManagementHandler.processTheoremNumbering(), this.captionNumberingHandler.processImageCaptionNumbering(), this.captionNumberingHandler.processTableCaptionNumbering(), this.selectionHandler.handleSelectionChanged(t, this.state), !this.props.readOnly) {
                var r = this.changeSessionHandler.getContainerModel();
                var a = t.mainSelected != this.getSafeSelected();
                if (a) {
                    this.editorContainerController.clearTemporarySelectedBlockStyle();
                    this.setState({
                        temporarySelectedBlockStyle: null
                    });
                    this.hyperlinkInputBoxHandler.handleShowingInputOnMatched(r);
                }
                this.selectionSettingsHandler.triggerRenderSelectionSetting();
                if (!(!n || this.changeSessionHandler.getSessionValue("ignoreAddingToHistory") || this.props.externalUndoRedo)) {
                    this.editorContainerController.addToHistory({
                        mainModel: this.state.mainModel,
                        mainSelected: this.state.mainSelected,
                        extendedMainSelected: this.state.extendedMainSelected
                    },
                        {
                            mainModel: t.mainModel,
                            mainSelected: t.mainSelected,
                            extendedMainSelected: t.extendedMainSelected
                        });
                }
                if (n) {
                    this.findReplaceHandler.delayIncrementalFind();
                }
                this.lineTableSettingsHandler.handleLineSetting();
                this.toolbarHandler.updateUndoRedoState();
                this.itemsBarHandler.updateItemsBar();
                if (a) {
                    this.remoteCursorHandler.notifyMainSelectedPosition(this.editorCursorHandler.getCursorGeoPosition());
                }
            }
        }
    }
    initContainerModelAndCursorPosition() {
        var e = this.newContainerModel();
        var t = {
            insideDiagram: e.isInsideDiagram(),
            isTextModeSelected: e.isTextModeSelected(),
            isCursorControlled: e.isCursorControlled,
            cursorContext: this.changeSessionHandler.getSessionValue("cursorContext", CursorPositionHelper.emptyCursorContext())
        };
        this.editorCursorHandler.calculateCursorPosition(t, true);
        e.cursorPos = this.editorCursorHandler.getCursorPosition();
        this.changeSessionHandler.setContainerModel(e);
        return e;
    }
    setScrollElement(e) {
        this.editorScrollHandler.setScrollElement(e);
    }
    getScrollSelector() {
        return this.editorScrollHandler.getScrollSelector();
    }
    getExpecEditorTopPosition() {
        return this.editorScrollHandler.getExpecEditorTopPosition();
    }
    componentDidUpdate(e, t) {
        if (!DocumentCorruption.isCurrentDocumentInCorruption()) {
            var n = t.mainModel != this.state.mainModel;
            if (n && this.props.onModelChanged && !this.changeSessionHandler.getSessionValue("surpressRaiseModelChanged")) {
                this.props.onModelChanged(this.state.mainModel, this.changeSessionHandler.getSessionValue("isOneLineChanged"));
            }
            if (e.oneMode != this.props.oneMode) {
                TimerHelper.next(() => {
                    var e = this.props.selected || this.getInitSelect();
                    this.changeModel(this.props.model || this.getEmptyModel(), false, {
                        mainSelected: e,
                        extendedMainSelected: void 0
                    });
                });
            }
            this.batchUpdater.process(() => {
                this.initContainerModelAndCursorPosition();
                ReactDOM.unstable_batchedUpdates(() => {
                    this.afterChanged(t);
                    this.editorScrollHandler.scrollToPositionIfNotInView(e, t);
                    var r = t.mainSelected != this.getSafeSelected();
                    if (!this.changeSessionHandler.getSessionValue("focusAcquire") && (n || r) && !this.colInfoHandler.isColChangeSession()) {
                        var a = Global.isIos();
                        this.hidenInputFocus(a);
                    }
                    if (this.colInfoHandler.isColChangeSession()) {
                        this.colInfoHandler.releaseColChangeSession();
                    }
                });
                this.mobileSupportHandler.updateArrowsKeySupportStatus();
                this.changeSessionHandler.end();
            });
        }
    }
    insertBySymbolInfo(e) {
        this.insertDataHandler.insertBySymbolInfo(e);
    }
    insertText(e) {
        this.insertDataHandler.insertText(e);
    }
    buildTagSelection() {
        this.mathTagHandler.buildTagSelection();
    }
    showImportLatex() {
        this.latexIoHandler.showImportFromLatex();
    }
    showTheoremManagement() {
        this.theoremManagementHandler.showTheoremManagement();
    }
    needShowCursor() {
        this.editorCursorHandler.requestShowCursor();
    }
    getCursorGeoPosition() {
        return this.editorCursorHandler.getCursorGeoPosition();
    }
    checkIsOneLineChanged() {
        return this.changeSessionHandler.getSessionValue("isOneLineChanged");
    }
    setPreventScroll(e) {
        this.editorScrollHandler.setPreventScroll(e);
    }
    setSurpressClearCursorHistory(e) {
        this.changeSessionHandler.setSessionValue("surpressClearCursorHistory", e);
    }
    setIsOneLineChanged(e) {
        this.changeSessionHandler.setSessionValue("isOneLineChanged", e);
    }
    changeModel(e, t, n) {
        if (!this.isSelectOnly()) {
            if (!(this.isOneLineOnly() && e.lines.length > 1)) {
                this.changeSessionHandler.setSessionValue("ignoreAddingToHistory", t);
                if (n) {
                    this.setMainModel(e, {
                        contextMenuShowInfo: null,
                        mainSelected: n.mainSelected,
                        extendedMainSelected: n.extendedMainSelected
                    });
                } else {
                    this.setMainModel(e, {
                        contextMenuShowInfo: null
                    });
                }
                return true;
            }
        }
        return false;/*return !this.isSelectOnly() && (!(this.isOneLineOnly() && e.lines.length >1) && (this.changeSessionHandler.setSessionValue("ignoreAddingToHistory",t),n?this.setMainModel(e,{contextMenuShowInfo:null,mainSelected:n.mainSelected,extendedMainSelected:n.extendedMainSelected}):this.setMainModel(e,{contextMenuShowInfo:null}),true));*/
    }
    setMainModel(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        DocumentCorruption.clearDocumentCorruptionState();
        if (e && this.state.mainModel && e.id === this.state.mainModel.id) {
            this.pageSettingsHandler.setMainModelIfChanged(e);
        }
        this.setState(_.assignIn({},
            t, {
            mainModel: e
        }));
    }
    clearSelection() {
        this.selectionHandler.clearExtendedSelected();
    }
    shouldPreventSelect(e) {
        return this.isMathOnly() && e && !e.selected;
    }
    refreshSelection(e) {
        this.selectionHandler.refreshSelection(e);
    }
    clearCopiedBlockStyle() {
        this.selectionSettingsHandler.clearCopiedBlockStyle();
    }
    handleListItemSelected(e) {
        var t = BlockHelper.findLeafSelected(e);
        if (this.selectionHandler.isListItemSelected(t)) {
            var n = BlockHelper.findLeafSelected(this.getSafeSelected());
            if (!this.selectionHandler.isListItemSelected(n)) {
                return e;
            }
            if ("all" == n.listTypeSelect) {
                return BlockHelper.changeLeafSelected(e, {
                    listTypeSelect: "level"
                });
            }
            if ("level" == n.listTypeSelect) {
                return BlockHelper.changeLeafSelected(e, {
                    listTypeSelect: "single"
                });
            }
            if ("single" == n.listTypeSelect) {
                return BlockHelper.changeLeafSelected(e, {
                    listTypeSelect: "single"
                });
            }
        }
        return e;
    }
    newContainerModel() {
        return new ContainerModel({
            mainModel: this.state.mainModel,
            mainSelected: this.getSafeSelected(),
            extendedMainSelected: this.getSafeExtendedSelected(),
            cursorPos: this.getCursorPosition(),
            cursorElement: this.getCursorHTMLElement(),
            confirmDeleted: this.state.confirmDeleted,
            selectOnly: this.props.selectOnly,
            isRestrictedView: this.isRestrictedView(),
            isPlainTextOnly: this.isPlainTextOnly(),
            isOneLineOnly: this.isOneLineOnly(),
            shortcutMatcher: this.getShortcutMatcher(),
            editorHtmlElement: this.getEditorHtmlElement(),
            isExternalUndoRedo: !!this.props.externalUndoRedo
        });
    }
    forceStopCompositionOrReserve() {
        if (Global.isIos()) {
            if (this.editorContainerController.isInInputComposition()) {
                this.keyboardInputHandler.hideCompositionIndicator();
                this.editorContainerController.cleanInputComposition();
                this.keyboardInputHandler.cleanReserveAndInput();
                this.keyboardInputHandler.temporaryPreventInputUntilCompositionEnd();
                return void this.focusHandler.forceRefreshFocus();
            } else {
                if (this.keyboardInputHandler.hasAnyReserveInput()) {
                    this.keyboardInputHandler.cleanReserveAndInput();
                    return void this.focusHandler.forceRefreshFocus();
                } else {
                    return void 0;
                }
            }
        } else {
            if (this.editorContainerController.isInInputComposition()) {
                this.keyboardInputHandler.hideCompositionIndicator();
                this.editorContainerController.cleanInputComposition();
                return this.focusHandler.forceRefreshFocus();
            } else {
                return void 0;
            }
        }
    }
    resetTempVariables() {
        this.confirmDeleteHandler.clearConfirmDelete();
        this.tabularRowColumnHandler.clear();
    }
    isConfirmDeleteWithTabular() {
        return this.confirmDeleteHandler.isConfirmDeleteWithTabular();
    }
    isConfirmDeleted() {
        return this.confirmDeleteHandler.isConfirmDeleted();
    }
    clearConfirmDelete() {
        return this.confirmDeleteHandler.clearConfirmDelete();
    }
    requestConfirmDeleteTabularToggleRowColumn() {
        this.confirmDeleteHandler.requestConfirmDeleteTabularToggleRowColumn();
    }
    requestExportSelection() {
        return this.latexIoHandler.requestExportSelection();
    }
    requestExportAll() {
        return this.latexIoHandler.requestExportAll();
    }
    setMouseDown(e) {
        this.mouseInputHandler.setMouseDown(e);
    }
    getSelectedJson() {
        var e = this.editorContainerController.getSelectionData(this.getContainerModel());
        var t = this.getContainerModel();
        var res = Serialization.toCopyText(e, t, true);
        return res;
    }
    getMathTypeBaseClass() {
        return classNames("math-type-no-print", {
            "dark-mode": this.fixedContextHandler.isDarkMode()
        });
    }
    renderReadOnly() {
        return React.createElement("math-type", {
            "aria-label": "Editor Content",
            key: this.mathTypeKey,
            style: this.props.style,
            ref: this.getMathTypeRef,
            class: classNames(this.getMathTypeBaseClass(), "read-only", this.props.className)
        },
            this.renderMathEditContainer(true), this.remoteCursorHandler.render());
    }
    getRootEditStyle() {
        return this.props.rootEditorStyle ? _.assignIn({},
            this.pageSettingsHandler.getAsCssStyle(), this.props.rootEditorStyle) : this.pageSettingsHandler.getAsCssStyle();
    }
    renderMathEditContainer(readOnly) {
        var rootEditor = React.createElement(EditAreaContainer, {
            style: this.getRootEditStyle(),
            ignoreFindingMovingBlocks: this.changeSessionHandler.getSessionValue("ignoreFindingMovingBlocksForRootEditor"),
            fracLevel: 0,
            fontSize: 1,
            className: classNames("root-editor", {
                "restricted-view": this.isRestrictedView(),
                "test-view": Global.isTestEnv() && !this.props.restrictedView
            }),
            rootLevel: true,
            readOnly: this.props.readOnly,
            isOneLineChanged: this.changeSessionHandler.getSessionValue("isOneLineChanged"),
            ref: this.getRootEditAreaRef,
            data: this.state.mainModel,
            selected: this.state.mainSelected,
            onDataChanged: this.onDataChanged,
            onSelectedChanged: this.onSelectedChanged
        });
        return readOnly ? React.createElement("math-edit-container", {
            ref: this.mouseInputHandler.getMathEditContainerRef
        },
            rootEditor) : React.createElement("math-edit-container", {
                onMouseMove: this.mouseInputHandler.onEditorMouseMove,
                onMouseDown: this.mouseInputHandler.onEditorMouseDown,
                onMouseUp: this.mouseInputHandler.onEditorMouseUp,
                onDoubleClick: this.mouseInputHandler.onEditorDoubleClick,
                ref: this.mouseInputHandler.getMathEditContainerRef
            },
                rootEditor);
    }
    requestAutoComplete() {
        return this.autoCompleteHandler.requestAutoComplete();
    }
    executeCut(e) {
        return this.copyPasteHandler.executeCut(e);
    }
    executeCopy() {
        return this.copyPasteHandler.executeCopy();
    }
    getInternalClipboard() {
        return this.internalClipboard;
    }
    getHiddenInput() {
        return this.focusHandler.getHiddenInput();
    }
    pasteFrom(e) {
        return this.copyPasteHandler.pasteFrom(e);
    }
    isReadOnly() {
        return this.props.readOnly;
    }
    isSelectOnly() {
        return this.props.selectOnly;
    }
    isRestrictedView() {
        return this.props.restrictedView;
    }
    isPlainTextOnly() {
        return "plain-text" == this.props.oneMode;
    }
    isMathOnly() {
        return "math-mode" == (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props).oneMode;
    }
    isOneLineOnly() {
        return false === this.props.multiline;
    }
    showContextMenu(e, t, n) {
        this.contextMenuHandler.showContextMenu(e, t, n);
    }
    isArrowKeyPressOrHold() {
        return this.mobileSupportHandler.isArrowKeyPressOrHold();
    }
    isToolBarReady() {
        return this.toolbarHandler.isToolBarReady();
    }
    getRootEditorRef() {
        return this.editor;
    }
    setFindAndReplaceElementArea(e) {
        this.findAndReplaceElement = e;
    }
    getFindAndReplaceElement() {
        return this.findAndReplaceElement;
    }
    showPageSetting() {
        this.pageSettingsHandler.showPageSetting();
    }
    getCursorHTMLElement() {
        return this.editorCursorHandler.getCursorHTMLElement();
    }
    showLinkInput() {
        this.hyperlinkInputBoxHandler.showLinkInput(true);
    }
    unstable_handleError(e) {
        ConsoleLog.error(e);
        this.error = true;
        if (this.props.onError) {
            this.props.onError();
        }
        DocumentCorruption.requestDocumentCorruption();
    }
    showTabularRowColumnIndication() {
        this.tabularRowColumnHandler.show();
    }
    setMathFontName(e) {
        this.selectionSettingsHandler.setMathFontName(e);
    }
    insertImageContainer(e, t) {
        var n = this.editorContainerController.insertImageContainer(this.getContainerModel(), e, t);
        this.handleResult(n);
    }
    showMathTemplate() {
        this.mathTemplateHandler.showMathTemplate();
    }
    showSpecialSymbolDialog(e, t) {
        this.specialSymbolHandler.showSpecialSymbolDialog(e, t);
    }
    showLatexTemplateDialog() {
        this.latexTableTemplateHandler.showLatexTemplateDialog();
    }
    onMathViewChanged(e) {
        this.spellCheckHandler.onMathViewChanged(e);
    }
    getCurrentSpellCheckInfo() {
        var e = this.pageSettingsHandler.getPageSettings().spellCheck || {};
        var t = "none";
        Global.isTestEnv() && (t = "vi");
        return {
            language: e.language || t,
            ignoreWords: e ? void 0 === e.ignoreWords ? "ok\neg" : e.ignoreWords : "ok\neg"
        };
    }
    getPageSettings() {
        return this.pageSettingsHandler.getPageSettings();
    }
    setPageSettings(e) {
        this.pageSettingsHandler.setPageSettings(e, false);
    }
    addIgnoreWord(e) {
        this.pageSettingsHandler.addIgnoreWord(e);
    }
    closeAutoComplete() {
        this.autoCompleteHandler.closeAutoComplete();
    }
    forceImageCaptionNumbering() {
        this.captionNumberingHandler.processImageCaptionNumbering(true);
    }
    forceTableCaptionNumbering() {
        this.captionNumberingHandler.processTableCaptionNumbering(true);
    }
    raiseSavePageSettingsAsDefault(e) {
        if (this.props.onPageInformationChange) {
            this.props.onPageInformationChange({
                theoremInfo: this.state.mainModel.theoremInfo,
                pageSettings: e
            });
        }
    }
    getCursorSelected() {
        return this.getSafeSelected();
    }
    getBaseMathModeFontFamily() {
        return this.pageSettingsHandler.getPageSettings().mathFontName;
    }
    setRemoteCursors(e, t) {
        this.remoteCursorHandler.setRemoteCursors(e, t);
    }
    removeSites(e) {
        this.remoteCursorHandler.removeSites(e);
    }
    clearSelected() {
        this.selectionHandler.clearSelected();
    }
    setSelected(e) {
        if (!(this.isMathOnly() && !e.selected)) {
            this.selectionHandler.setSelected(e);
        }
    }
    setSelection(e, t) {
        this.selectionHandler.setSelection(e, t);
    }
    extendSelection(e) {
        this.selectionHandler.extendSelection(e);
    }
    changeCursorName(e, t) {
        this.remoteCursorHandler.changeCursorName(e, t);
    }
    onUndoRequest() {
        if (this.props.onUndoRequest) {
            this.props.onUndoRequest();
        }
    }
    onRedoRequest() {
        if (this.props.onRedoRequest) {
            this.props.onRedoRequest();
        }
    }
    getFontsLoader() {
        if (!this.props.fontsLoader) {
            throw new Error("not fonts loader");
        }
        return this.props.fontsLoader;
    }
    render() {
        return this.error
            ? React.createElement("math-type-error",
                {
                    style: {
                        padding: 10,
                        display: "inline-block",
                        color: "orange",
                        fontSize: 13
                    }
                },
                "This document has been corrupted,please report to ",
                React.createElement("b", null, "team@mathcha.io"), " for recovery,sorry for this issue.",
                React.createElement("br", null), "Please send your ",
                React.createElement("b", null, "username"), " and ",
                React.createElement("b", null, "name"), " of this document.")
            : this.isReadOnly()
                ? this.renderReadOnly()
                : React.createElement("math-type",
                    {
                        "aria-label": "Editor Content",
                        key: this.mathTypeKey,
                        style: this.props.style,
                        onContextMenu: this.contextMenuHandler.onMathTypeContextMenu,
                        class: classNames(this.getMathTypeBaseClass(), this.props.className, {
                            "select-only": this.props.selectOnly,
                            "mobile-tablet": Global.isMobileOrTablet(),
                            ios: Global.isIos(),
                            "math-only": this.isMathOnly()
                        }),
                        tabIndex: -1,
                        onDragEnter: this.imageLibraryHandler.handleDragEnter,
                        onDragOver: this.imageLibraryHandler.handleDragOver,
                        onDragLeave: this.imageLibraryHandler.handleDragLeave,
                        onDrop: this.imageLibraryHandler.handleDrop,
                        onMouseDown: this.mouseInputHandler.onMathTypeMouseDown,
                        onMouseUp: this.mouseInputHandler.onMathTypeMouseUp,
                        onTouchStart: this.mobileSupportHandler.onMathTypeTouchStart,
                        onTouchEnd: this.mobileSupportHandler.onMathTypeTouchEnd,
                        onTouchCancel: this.mobileSupportHandler.onMathTypeTouchEnd,
                        ref: this.getMathTypeRef,
                        onFocus: this.focusHandler.onMathTypeFocus,
                        onBlur: this.onMathTypeBlur
                    },
                    this.focusHandler.renderHiddenInputWrapper(),
                    React.createElement("hidden-input-wrapper",
                        {
                            "aria-hidden": true,
                            ref: this.focusHandler.getHiddenInputWrapperRef
                        },
                        React.createElement("textarea",
                            {
                                onCopy: this.copyPasteHandler.onCopy,
                                onCut: this.copyPasteHandler.onCut,
                                onPaste: this.copyPasteHandler.onPaste,
                                autoCorrect: "off",
                                autoCapitalize: "off",
                                ref: this.focusHandler.getHiddenInputRef,
                                onInput: this.keyboardInputHandler.onEditorInput,
                                onKeyDown: this.keyboardInputHandler.onEditorKeyDown,
                                readOnly: Global.isMobileOrTablet() && this.props.selectOnly,
                                onCompositionStart: this.keyboardInputHandler.onEditorCompositionStart,
                                onCompositionEnd: this.keyboardInputHandler.onEditorCompositionEnd,
                                onBlur: this.focusHandler.onHiddenInputBlur,
                                onFocus: this.focusHandler.onHiddenInputFocus
                            }
                        )
                    ),
                    React.createElement("hidden-input-wrapper",
                        {
                            "aria-hidden": true,
                            ref: this.focusHandler.getHiddenInputWrapperForFocusRef
                        },
                        React.createElement("input",
                            {
                                onCopy: this.copyPasteHandler.onCopy,
                                onCut: this.copyPasteHandler.onCut,
                                onPaste: this.copyPasteHandler.onPaste,
                                autoCorrect: "off",
                                autoCapitalize: "off",
                                className: "focus-element",
                                readOnly: true,
                                ref: this.focusHandler.getHiddenFocusRef,
                                onKeyDown: this.keyboardInputHandler.onEditorKeyDown
                            }
                        )
                    ),
                    this.toolbarHandler.renderToolBar(this.props.requestRenderToolbar),
                    this.renderMathEditContainer(false),
                    this.selectionHandler.renderSelection(),
                    this.editorCursorHandler.renderCursor(),
                    this.autoCompleteHandler.renderAutoComplete(),
                    this.latexIoHandler.renderExportSettings(),
                    this.messageBoxHandler.renderMessageBox(),
                    this.confirmDeleteHandler.renderConfirmDelete(),
                    this.latexIoHandler.renderImportLatexBox(),
                    this.keyboardInputHandler.renderCompositionIndicator(),
                    this.itemsBarHandler.renderItemsBar(),
                    this.mathTagHandler.renderTagContainer(),
                    this.contextMenuHandler.renderContextMenu(),
                    this.mobileSupportHandler.renderSelectionMark(),
                    this.mobileSupportHandler.renderArrowKeySupport(),
                    this.mobileSupportHandler.renderCopyPasteButtonForMobile(),
                    this.regionHighlightHandler.renderRegionHighlight(),
                    this.handlerRenderSelect.render(),
                    this.spellCheckHandler.render(),
                    this.remoteCursorHandler.render()
                );
    }
}
MathType.childContextTypes = {
    getEditorInfo: PropTypes.any,
    mathFontSizeBase: PropTypes.any,
    fontSizeBase: PropTypes.any,
    selectFromPos: PropTypes.any,
    requestRenderToolBarComponent: PropTypes.any,
    requestRenderItemsBarComponent: PropTypes.any,
    notifyTheoremNumbering: PropTypes.any,
    notifyLineTagRender: PropTypes.any,
    requestDelete: PropTypes.any,
    getTheoremInfo: PropTypes.any,
    requestExportDialog: PropTypes.any,
    requestImageSelection: PropTypes.any,
    showMessage: PropTypes.any,
    notifyDataChanged: PropTypes.any,
    getImageCaptionInfo: PropTypes.any,
    notifyImageCaptionNumbering: PropTypes.any,
    getTableCaptionInfo: PropTypes.any,
    notifyTableCaptionNumbering: PropTypes.any,
    baseMathModeFontFamily: PropTypes.any,
    fixedContextHandler: PropTypes.any
};
export { Serialization as serialization }

export { ModalDialog as ModalDialogFromMathType }

export default MathType