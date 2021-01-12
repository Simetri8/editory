import _ from 'lodash';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(31) /*CheckObject*/

/// var r = n(15)/*TabularHelper*/;  // 2 times
/// var a = n(2)/*lodash*/;  // 2 times
/// var i = n.n(a);
var CheckObject = new class {
    isTabularCompositeBlock(e) {
        return "\\binom" != e.text && TabularHelper.isKeyInTabularFormat(_.keys(e.elements)[0])
    }
    isTabularNotBinomAndTableAndLatexTable(e) {
        return "\\binom" != e.text && "\\table" != e.text && "\\latex-table" != e.text && TabularHelper.isKeyInTabularFormat(_.keys(e.elements)[0])
    }
    isSingeLineBlock(e) {
        return this.isComposite(e) && ("\\table" == e.text || "\\align" == e.text || "\\gather" == e.text || "\\diagram" == e.text || "\\image-container" == e.text || "\\theorem" == e.text || "\\table-of-content" == e.text || "\\multiline" == e.text || "\\horizontal-line" == e.text || "\\page-break" == e.text || "\\text-mode-group" == e.text || "\\z-schema" == e.text || "\\z-syntax" == e.text || "\\underline-section" == e.text || "\\math-container" == e.text && e.displayMode)
    }
    isLatexTable(e) {
        return this.isComposite(e) && "\\latex-table" == e.text
    }
    isTextModeGroup(e) {
        return this.isComposite(e) && "\\text-mode-group" == e.text
    }
    isTextModeGroupInline(e) {
        return this.isComposite(e) && "\\text-mode-group-inline" == e.text
    }
    isLongDivision(e) {
        return this.isComposite(e) && "\\longdivision" == e.text
    }
    isPlotCases(e) {
        return this.isComposite(e) && "\\plot-cases" == e.text
    }
    isTextSymbol(e) {
        return this.isComposite(e) && "\\text" == e.text
    }
    isTheorem(e) {
        return e && this.isComposite(e) && "\\theorem" == e.text
    }
    isUnderlineSection(e) {
        return e && this.isComposite(e) && "\\underline-section" == e.text
    }
    isRawLatex(e) {
        return e && this.isComposite(e) && "\\raw-latex" == e.text
    }
    isComposite(e) {
        return "composite" == e.type
    }
    isBinom(e) {
        return this.isComposite(e) && ("\\binom" == e.text || "\\tbinom" == e.text || "\\dbinom" == e.text)
    }
    isCheckbox(e) {
        return this.isComposite(e) && "\\checkbox" == e.text
    }
    isTable(e) {
        return this.isComposite(e) && "\\table" == e.text
    }
    isInTableCaption(e, t) {
        return this.isTable(e) && "caption" == t
    }
    isInTableNotCaption(e, t) {
        return this.isTable(e) && "caption" != t
    }
    isDiagramBlock(e) {
        return e && "composite" == e.type && "\\diagram" == e.text
    }
    isImageContainerBlock(e) {
        return e && "composite" == e.type && "\\image-container" == e.text
    }
    isInlineImageBlock(e) {
        return e && "composite" == e.type && "\\inline-image" == e.text
    }
    isSingleBlock(e) {
        return e.type && "composite" == e.type && ("\\math-container" == e.text && e.displayMode || "\\align" == e.text || "gather" == e.text)
    }
    isRootCompositeBlockAsTextBlockProperty(e) {
        return "composite" == e.type && ("\\mathcha" == e.text || "\\checkbox" == e.text || "\\page-number" == e.text || "\\page-count" == e.text || "\\page-section-level-1" == e.text || "\\page-section-level-2" == e.text || "\\page-section-level-3" == e.text || "\\tag-ref" == e.text)
    }
}

export default CheckObject