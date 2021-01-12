import _ from 'lodash';
// Not found 'var' for: import  from './FindReplaceHandler';
import BlockHelper from '../Elements/BlockHelper';
import CheckComponent from '../Editor/CheckComponent';
import CheckObject from '../Editor/CheckObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import SelectionBuilder from './SelectionBuilder';
import SelectionJoint from './SelectionJoint';
import StyleHelper from '../Mathcha/StyleHelper';
import SymbolElementNames from '../Symbols/SymbolElementNames';
import TabularHelper from '../Tabular/TabularHelper';
import TabularUtils from '../Tabular/TabularUtils';

/// xxx(1640) /*ContainerModel*/

/// var m = n(4)/*DOMHelper*/;  // 1 times
/// var C = n(2)/*lodash*/;  // 4 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 13 times
/// var b = n(45)/*TabularUtils*/;  // 1 times
/// var L = n(15)/*TabularHelper*/;  // 2 times
/// var M = n(22)/*CheckComponent*/;  // 2 times
/// var N = n(18)/*StyleHelper*/;  // 4 times
/// var k = n(6)/*DiagramIdHelper*/;  // 2 times
/// var W = n(31)/*CheckObject*/;  // 26 times
/// var gt = n(97)/*SymbolElementNames*/;  // 5 times
/// var FindReplaceHandler = n(1590)/*FindReplaceHandler*/;  // 0 times
/// var SelectionJoint = n(1657)/*SelectionJoint*/;  // 1 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 1 times
var positions = {
    "\\frac": ["value", "sub1"],
    "\\int": ["from", "to"],
    "\\leftarrow": ["top", "bottom"],
    "\\power-index": ["powerValue", "indexValue"],
    "\\sqrt": ["sub1", "value"],
    "\\overunderset": ["sub1", "value", "sub2"],
    "\\stackrel": ["sub1", "value"],
    "\\underset": ["value", "sub1"]
};
positions["\\rightarrow"] = positions["\\leftarrow"];
positions["\\overset"] = positions["\\stackrel"];
positions["\\overbrace"] = positions["\\stackrel"];
positions["\\underbrace"] = positions["\\underset"];
positions["\\dfrac"] = positions["\\frac"];
positions["\\cfrac"] = positions["\\frac"];
positions["\\tfrac"] = positions["\\frac"];
positions["\\iint"] = positions["\\int"];
positions["\\iiint"] = positions["\\int"];
positions["\\oint"] = positions["\\int"];
positions["\\oiint"] = positions["\\int"];
positions["\\oiiint"] = positions["\\int"];
positions["\\sum"] = positions["\\int"];
positions["\\bigcap"] = positions["\\int"];
positions["\\prod"] = positions["\\int"];
positions["\\coprod"] = positions["\\int"];
positions["\\bigcup"] = positions["\\int"];
positions["\\bigvee"] = positions["\\int"];
positions["\\bigwedge"] = positions["\\int"];
positions["\\lim"] = positions["\\int"];
positions["\\liminf"] = positions["\\int"];
positions["\\limsup"] = positions["\\int"];
positions["\\sup"] = positions["\\int"];
positions["\\varliminf"] = positions["\\int"];
positions["\\varlimsup"] = positions["\\int"];
var At = new class {
    next(e, t) {
        var n = this.nextElement(e.text, t);
        return e.elements[n] ? n : null;
    }
    previous(e, t) {
        var n = this.previousElement(e.text, t);
        return e.elements[n] ? n : null;
    }
    previousElement(e, t) {
        var n = positions[e];
        if (!n) {
            return null;
        }
        var r = n.indexOf(t);
        if (r <= 0) {
            return null;
        }
        var a = n[r - 1];
        return a || null;
    }
    nextElement(e, t) {
        var n = positions[e];
        if (!n) {
            return null;
        }
        var r = n.indexOf(t);
        if (r < 0) {
            return null;
        }
        var a = n[r + 1];
        return a || null;
    }
};
var Et = new class {
    scan(e) {
        var t = {
            insideDiagram: false,
            insideRawLatex: false,
            insideTextSymbol: false,
            insideTheorem: false,
            insideZSpec: false,
            isAtPlotCases: false,
            isAtTextModeGroup: false,
            isAtLongDivision: false,
            quickRowColumnInsertSupport: false,
            isAtTabularCell: false,
            isLastTabularCell: false,
            isTextMode: false,
            isRootLineSelected: false,
            isAtImageCaption: false,
            isAtTableCaption: false,
            isAtUnderlineSection: false,
            isAtTextModeGroupInline: false,
            selectedTableBlock: null,
            selectedMergeableTabularBlock: null,
            selectedBinomBlock: null,
            selectedLatexTableBlock: null,
            selectedLine: null,
            selectedTabularCellKeys: null,
            input: e
        };
        return e.joinSelected ? (this.traverseDown(e.model, e.joinSelected, t), t) : t;
    }
    detectByKey(e, t) {
        if (e === SymbolElementNames.theoremSymbolElementName) {
            t.insideTheorem = true;
        }
        if (DiagramIdHelper.isStrictDiagramEditorId(e)) {
            t.insideDiagram = true;
        }
        if (e === SymbolElementNames.textSymbolElementName) {
            t.insideTextSymbol = true;
        }
        if (e === SymbolElementNames.rawLatexSymbolElementName) {
            t.insideRawLatex = true;
        }
    }
    detectTabulars(e, t, n, r) {
        if (n) {
            if (1 === r.length) {
                t.isAtTabularCell = true;
                var a = TabularHelper.getTabularCellIndexFromKey(r[0]);
                var i = a.row;
                var o = a.column;
                if (e.row === i + 1 && e.column === o + 1) {
                    t.isLastTabularCell = true;
                }
            }
            if (CheckObject.isTable(e)) {
                t.selectedTableBlock = e;
            }
            if (CheckObject.isTable(e) || CheckObject.isLatexTable(e)) {
                t.selectedMergeableTabularBlock = e;
            }
            if (CheckObject.isBinom(e)) {
                t.selectedBinomBlock = e;
            }
            if (CheckObject.isLatexTable(e)) {
                t.selectedLatexTableBlock = e;
            }
            if (CheckObject.isPlotCases(e)) {
                t.isAtPlotCases = true;
            }
            if (! (CheckObject.isTable(e) || CheckObject.isBinom(e) || CheckObject.isLatexTable(e) || t.input.isCursorControlled)) {
                t.quickRowColumnInsertSupport = true;
            }
        }
    }
    determineAtCompositeLeaf(e, t, n, r) {
        if (CheckObject.isInTableNotCaption(e, n.key) || CheckObject.isLatexTable(e) || CheckObject.isTextModeGroup(e) || CheckObject.isTextModeGroupInline(e) || CheckObject.isTheorem(e) || CheckObject.isUnderlineSection(e) || CheckObject.isRawLatex(e)) {
            r.isTextMode = true;
        }
        if (CheckObject.isImageContainerBlock(e)) {
            r.isTextMode = true;
            r.isAtImageCaption = true;
        }
        if (CheckObject.isInTableCaption(e, n.key)) {
            r.isTextMode = true;
            r.isAtTableCaption = true;
        }
        if (CheckObject.isDiagramBlock(e) && t && t.isTextMode) {
            r.isTextMode = true;
        }
        if (CheckObject.isTextModeGroup(e)) {
            r.isAtTextModeGroup = true;
        }
        if (CheckObject.isUnderlineSection(e)) {
            r.isAtUnderlineSection = true;
        }
        if (CheckObject.isTextModeGroupInline(e)) {
            r.isAtTextModeGroupInline = true;
        }
        if (CheckObject.isLongDivision(e)) {
            r.isAtLongDivision = true;
        }
    }
    traverseDown(e, t, n) {
        var r = t.lineIndex;
        var a = t.charIndex;
        var i = !t.selected;
        if (i && e === n.input.model && !t.keys) {
            n.isTextMode = true;
            n.isRootLineSelected = true;
        }
        if (i) {
            n.selectedLine = e.lines[r];
        }
        if (t.key) {
            this.detectByKey(t.key, n);
        }
        if (t.keys) {
            n.selectedTabularCellKeys = t.keys;
        }
        var o = BlockHelper.blockFromIndex(e.lines[r], a);
        if (o && o.block) {
            var s = o.block;
            var l = !!t.selected && !t.selected.selected;
            var c = s && t.selected && t.key ? s.elements[t.key] : null;
            if (s.type && t.selected && CheckComponent.isZSpec(s)) {
                n.insideZSpec = true;
            }
            if (t.keys) {
                this.detectTabulars(s, n, true, t.keys);
                this.determineAtCompositeLeaf(s, null, t, n);
            } else {
                if (t.key && TabularHelper.isKeyInTabularFormat(t.key)) {
                    this.detectTabulars(s, n, l, [t.key]);
                }
            }
            if (l) {
                this.determineAtCompositeLeaf(s, c, t, n);
            }
            if (t.selected) {
                this.traverseDown(c, t.selected, n);
            }
        }
    }
};
class ContainerModel {
    constructor(e) {
        if (null != e) {
            this.target = e;
            this.model = e.mainModel;
            this.cursorSelected = e.mainSelected;
            this.extendedCursorSelected = e.extendedMainSelected;
            this.cursorPos = e.cursorPos;
            this.shortcutMatcher = e.shortcutMatcher;
            if (e.mainSelected) {
                this.leafCursorSelected = BlockHelper.findLeafSelected(e.mainSelected);
                if (!e.extendedMainSelected) {
                    this.selectedBlockModel = BlockHelper.getSelectedBlockFromRoot(e.mainModel, e.mainSelected);
                    this.isCursorControlled = this.leafCursorSelected.controlled;
                    if (this.selectedBlockModel) {
                        this.isDiagramSelected = CheckObject.isDiagramBlock(this.selectedBlockModel) && this.leafCursorSelected.controlled;
                        this.isImageContainerSelected = CheckObject.isImageContainerBlock(this.selectedBlockModel) && this.leafCursorSelected.controlled;
                        this.isInlineImageSelected = CheckObject.isInlineImageBlock(this.selectedBlockModel) && this.leafCursorSelected.controlled;
                    }
                }
            }
        }
    }
    modelDetect() {
        return this.detectionResult || (this.detectionResult = Et.scan({
            joinSelected: this.getJointSelected(),
            model: this.target.mainModel,
            isCursorControlled: this.isCursorControlled
        })),
        this.detectionResult;
    }
    isExternalUndoRedo() {
        return this.target.isExternalUndoRedo;
    }
    confirmDeleted() {
        return this.target.confirmDeleted;
    }
    selectOnly() {
        return this.target.selectOnly;
    }
    isPlainTextOnly() {
        return this.target.isPlainTextOnly;
    }
    isOneLine() {
        return this.target.isOneLineOnly;
    }
    isAtLongDivision() {
        return this.modelDetect().isAtLongDivision;
    }
    isAtUnderlineSection() {
        return this.modelDetect().isAtUnderlineSection;
    }
    insideZSpec() {
        return this.modelDetect().insideZSpec;
    }
    getListItemSelectedType() {
        return this.leafCursorSelected.controlled ? this.leafCursorSelected.listTypeSelect : null;
    }
    isListBulletSelected() {
        return !! this.getListItemSelectedType();
    }
    findInlineMathScope() {
        return BlockHelper.traverseDown(this.target.mainModel, this.getJointSelected(), (e, t) => {
            return CheckComponent.isInlineMathContainer(e) && !!t.selected;
        });
    }
    isHyperLinkSelected() {
        if (!this.isTextModeSelected()) {
            return false;
        }
        if (this.selectedBlockModel) {
            return !! StyleHelper.safeGetBlockStyle(this.selectedBlockModel, "hyperLink");
        }
        if (this.target.extendedMainSelected && this.isSameRoute(this.target.mainSelected, this.target.extendedMainSelected)) {
            var e = BlockHelper.getSelectedBlockFromRoot(this.target.mainModel, this.target.mainSelected);
            return !! StyleHelper.safeGetBlockStyle(e, "hyperLink");
        }
    }
    isAtTextModeGroup() {
        return this.modelDetect().isAtTextModeGroup;
    }
    isAtTextModeGroupInline() {
        return this.modelDetect().isAtTextModeGroupInline;
    }
    isAtImageCaption() {
        return this.modelDetect().isAtImageCaption;
    }
    isAtTableCaption() {
        return this.modelDetect().isAtTableCaption;
    }
    isSelected() {
        return null != this.target.mainSelected;
    }
    isSelectControlled() {
        return this.isCursorControlled;
    }
    isInSelection() {
        return null != this.target.extendedMainSelected && !this.isSameRoute(this.target.mainSelected, this.target.extendedMainSelected);
    }
    isSameRoute(e, t) {
        return SelectionBuilder.isSameRoute(e, t);
    }
    getScreenGeoCursorPos() {
        var e = DOMHelper.getElementRect(this.target.cursorElement);
        return {
            left: e.left,
            top: e.top + e.height / 2
        };
    }
    isRootLineSelected() {
        return this.modelDetect().isRootLineSelected;
    }
    isTextModeSelected() {
        return this.modelDetect().isTextMode;
    }
    findNextElementNameOfComposite() {
        if (this.isInSelection()) {
            return null;
        }
        var e = BlockHelper.findLeafParentSelected(this.target.mainSelected);
        if (!e) {
            return null;
        }
        var t = this.getParentBlockOfSelected();
        return At.next(t, e.key);
    }
    findPreviousElementNameOfComposite() {
        if (this.isInSelection()) {
            return null;
        }
        var e = BlockHelper.findLeafParentSelected(this.target.mainSelected);
        if (!e) {
            return null;
        }
        var t = this.getParentBlockOfSelected();
        return At.previous(t, e.key);
    }
    getParentBlockOfSelected() {
        var e = _.cloneDeep(this.target.mainSelected);
        var t = BlockHelper.findLeafParentSelected(e);
        return t.key = null,
        t.selected = null,
        BlockHelper.getSelectedBlockFromRoot(this.target.mainModel, e);
    }
    isMergedCell() {
        var e = BlockHelper.getSelectedEditor(this.target.mainModel, this.target.mainSelected);
        return !! e.colSpan || !!e.rowSpan;
    }
    isCellsMergable() {
        var e = this.getJointSelected();
        var t = BlockHelper.findLeafSelected(e);
        if (!t.keys) {
            return false;
        }
        var n = this.findMergeableSelected();
        return !! n && TabularUtils.isMergable(t.keys, n);
    }
    findTableSelected() {
        return this.modelDetect().selectedTableBlock;
    }
    findMergeableSelected() {
        return this.modelDetect().selectedMergeableTabularBlock;
    }
    findBinomSelected() {
        return this.modelDetect().selectedBinomBlock;
    }
    isTableSelected() {
        return !! this.findTableSelected();
    }
    isPlotCasesSelected() {
        return this.modelDetect().isAtPlotCases;
    }
    isInsideLatexTable() {
        return !! this.modelDetect().selectedLatexTableBlock;
    }
    getTabularCellKeysSelected() {
        return this.modelDetect().selectedTabularCellKeys;
    }
    isTabularCellsSelected() {
        return !! this.target.extendedMainSelected && !!this.getTabularCellKeysSelected();
    }
    quickRowColumnInsertionSupport() {
        return this.modelDetect().quickRowColumnInsertSupport;
    }
    isCursorBeginInRootLine() {
        var e = this.target.mainSelected;
        return null == this.target.extendedMainSelected && 0 === e.charIndex && !e.selected;
    }
    getSelectedLine() {
        return this.modelDetect().selectedLine;
    }
    isSelectedLineListType() {
        return "none" != StyleHelper.getLineStyle(this.getSelectedLine(), "listType", "none");
    }
    isSelectedLineSection() {
        return "section" == StyleHelper.getLineStyle(this.getSelectedLine(), "listType", "none");
    }
    isAtTabularCell() {
        return this.modelDetect().isAtTabularCell;
    }
    isLastTabularCell() {
        return this.modelDetect().isLastTabularCell;
    }
    getJointSelected() {
        if (this.target.mainSelected) {
            if (void 0 === this.joinStartSelected) {
                if (this.target.extendedMainSelected) {
                    this.joinStartSelected = (new SelectionJoint(this.target.mainSelected, this.target.extendedMainSelected)).getJoinStartSelected();
                } else {
                    this.joinStartSelected = this.target.mainSelected;
                }
            }
            return this.joinStartSelected;
        } else {
            return null;
        }
    }
    isInsideTextSymbol() {
        return this.modelDetect().insideTextSymbol;
    }
    isInsideTheorem() {
        return this.modelDetect().insideTheorem;
    }
    isInsideDiagram() {
        return this.modelDetect().insideDiagram;
    }
    isInsideRawLatex() {
        return this.modelDetect().insideRawLatex;
    }
    isSelectedInMathContainer() {
        return this.getJointSelected().key === SymbolElementNames.mathContainerElementName;
    }
    isSelectedInDisplayMathContainer() {
        var e = this.getJointSelected();
        return e.key === SymbolElementNames.mathContainerElementName && 0 === e.charIndex && this.target.mainModel.lines[e.lineIndex].blocks[0].displayMode;
    }
    isAnyMathScopeElement(e) {
        return "\\inline-math" == e || "\\math-container" == e || "\\align" == e || "\\multiline" == e || "\\gather" == e;
    }
    findOuterMostDiagramEditorScope() {
        var e = _.cloneDeep(this.target.mainSelected);
        var t = this.target.mainModel;
        var n = e;
        for (;;) {
            var r = BlockHelper.getBlockFromLineCharIndex(t, n.lineIndex, n.charIndex);
            if ("composite" == r.type && n.selected && n.key && DiagramIdHelper.isStrictDiagramEditorId(n.key)) {
                var a = n.key;
                return n.selected = null,
                n.key = null,
                {
                    block: r,
                    selectedFromRoot: e,
                    key: a
                };
            }
            if (!n.selected) {
                return null;
            }
            if ("composite" != r.type) {
                return null;
            }
            t = r.elements[n.key];
            n = n.selected;
        }
    }
    findOuterMostMathScope() {
        var e = _.cloneDeep(this.target.mainSelected);
        var t = this.target.mainModel;
        var n = e;
        for (;;) {
            var r = BlockHelper.getBlockFromLineCharIndex(t, n.lineIndex, n.charIndex);
            if ("composite" == r.type && this.isAnyMathScopeElement(r.text)) {
                return n.selected = null,
                n.key = null,
                {
                    block: r,
                    selectedFromRoot: e
                };
            }
            if (!n.selected) {
                return null;
            }
            if ("composite" != r.type) {
                return null;
            }
            t = r.elements[n.key];
            n = n.selected;
        }
    }
    clone() {
        return _.clone(this);
    }
}
/*n.d(t, "a", function () {
    return ContainerModel;
})*/

export default ContainerModel