import _ from 'lodash';
import jQuery from 'jquery';
import ElementTypes from './ElementTypes';
import Global from '../Global';
import RectangleHelper from '../Geometry/RectangleHelper';

/// xxx(4) /*DOMHelper*/

/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 5 times
/// var o = n.n(i);
/// var s = n(38)/*ElementTypes*/;  // 42 times
/// var l = n(46)/*RectangleHelper*/;  // 1 times
/// var c = n(11)/*Global*/;  // 1 times
/// var d = n(5)/*sizzle*/;  // 31 times
/// var h = n.n(d);
function u(e) {
    return e ? e > 26 ? 2 : Math.ceil(e / 30) : 1
}
var DOMHelper = new class {
    getTextDirectionFromLine(e) {
        return this.isRootEditLine(e) ? this.getTextDirection(this.getRootLineBlocksElement(e)) : this.getTextDirection(e)
    }
    findTabularReactInstance(e) {
        var t = e.line,
            n = jQuery(t).closest("composite-block.role-tabular");
        if (0 == n.length) throw new Error("should not find tabular");
        return n.get(0).reactInstance
    }
    measureInnerOneLineTextWidth(e) {
        var t = this.rangeFromIndex(e, 0),
            n = this.rangeFromIndex(e, e.innerText.length),
            r = n ? this.getElementRect(n) : null;
        if (null == r) {
            var i = this.getElementRect(e);
            r = _.assignIn({},
                i, {
                left: i.right,
                width: 0
            })
        }
        return r.left - this.getElementRect(t).left
    }
    getCompositeLatexName(e) {
        return e.reactInstance.getModel().text
    }
    isTabularComposite(e) {
        return jQuery(e).hasClass("role-tabular")
    }
    isTable(e) {
        return jQuery(e).hasClass("table-symbol")
    }
    isPageBreak(e) {
        return jQuery(e).hasClass("role-page-break-block")
    }
    isTextModeGroup(e) {
        return jQuery(e).hasClass("role-text-mode-group")
    }
    isUnderlineSection(e) {
        return jQuery(e).hasClass("underline-section-symbol")
    }
    getTopBottomInludeMargin(e) {
        var t = this.getElementRect(e),
            n = this.getComputedStyleAsNumber(e, "marginTop"),
            r = this.getComputedStyleAsNumber(e, "marginBottom");
        return {
            top: t.top - n,
            bottom: t.bottom + r
        }
    }
    mergeTopBottom(e, t) {
        return {
            top: Math.min(e.top, t.top),
            bottom: Math.max(e.bottom, t.bottom)
        }
    }
    getReactInternalInstance(e) {
        return e.reactInstance
    }
    isEditArea(e) {
        return e.tagName == ElementTypes.editarea
    }
    isEditAreaBlock(e) {
        if (e)
            return e.tagName == ElementTypes.editareaBlock
        else {
            debugger;
        }
    }
    isEditAreaLine(e) {
        return e.tagName == ElementTypes.editareaLine
    }
    isSymbolContainerOrRoot(e) {
        return jQuery(e).hasClass("main-container") || e.tagName == ElementTypes.composite
    }
    isRoot(e) {
        return e.tagName == ElementTypes.mathType
    }
    isEditorLine(e) {
        return e.tagName == ElementTypes.line
    }
    childrenArr(e) {
        return Array.prototype.slice.call(e.children)
    }
    isBlocksInRootLine(e) {
        return e.tagName == ElementTypes.blocks && e.parentElement.tagName == ElementTypes.line
    }
    isPrefix(e) {
        return e.tagName == ElementTypes.prefix
    }
    isComposite(e) {
        return e.tagName == ElementTypes.composite
    }
    hasChildEditor(e) {
        return !!this.isComposite(e) && e.reactInstance.hasEditor()
    }
    shouldNotMoveNestedEditor(e) {
        return e.reactInstance.shouldNotMoveInNestedEditor && e.reactInstance.shouldNotMoveInNestedEditor()
    }
    shouldNotMoveOutsideEditor(e) {
        return e.reactInstance.shouldNotMoveOutsideEditor && e.reactInstance.shouldNotMoveOutsideEditor()
    }
    isMathContainer(e) {
        return jQuery(e).hasClass("math-container-symbol")
    }
    isMultiline(e) {
        return jQuery(e).hasClass("role-multiline-block")
    }
    isTheorem(e) {
        return jQuery(e).hasClass("theorem")
    }
    isDiagram(e) {
        return jQuery(e).hasClass("math-diagram")
    }
    isAlignBlock(e) {
        return this.isComposite(e) && jQuery(e).hasClass("align-symbol")
    }
    isGatherBlock(e) {
        return this.isComposite(e) && jQuery(e).hasClass("gather-symbol")
    }
    isZSchemaBlock(e) {
        return this.isComposite(e) && jQuery(e).hasClass("z-schema-symbol")
    }
    isTocBlock(e) {
        return this.isComposite(e) && jQuery(e).hasClass("table-of-content")
    }
    isInlineMathContainer(e) {
        return jQuery(e).hasClass("math-container-symbol") && !jQuery(e).hasClass("display")
    }
    isSectionLine(e) {
        return jQuery(e).hasClass("section")
    }
    isNonChar(e) {
        return !this.isChar(e)
    }
    isChar(e) {
        return e.tagName == ElementTypes.block || e.tagName == ElementTypes.editareaBlock
    }
    isConstantTextSymbol(e) {
        return e.className && e.className.indexOf("constant-text") >= 0
    }
    isEmptyBlock(e) {
        return e.tagName == ElementTypes.emptyblock
    }
    isInnerTextEmpty(e) {
        return !e.innerText
    }
    isBlock(e) {
        return e.tagName == ElementTypes.block || e.tagName == ElementTypes.closesymbolblock || e.tagName == ElementTypes.composite || e.tagName == ElementTypes.emptyblock || e.tagName == ElementTypes.singleblock
    }
    blockHasAnyEditor(e) {
        return !jQuery(e).hasClass("no-editor")
    }
    isOpenCloseSymbol(e) {
        return e.tagName == ElementTypes.opensymbolblock || e.tagName == ElementTypes.closesymbolblock
    }
    isOpenSymbol(e) {
        return e.tagName == ElementTypes.opensymbolblock
    }
    isPowerSymbol(e) {
        return this.isPowerIndexSymbol(e) && "MIDDLE-BASE" == e.lastElementChild.tagName
    }
    isIndexSymbol(e) {
        return this.isPowerIndexSymbol(e) && "MIDDLE-BASE" == e.firstElementChild.tagName
    }
    isSqrtSymbol(e) {
        return jQuery(e).hasClass("sqrt-symbol")
    }
    isPowerIndexSymbol(e) {
        return e.className.indexOf("power-index-symbol-container") >= 0
    }
    isPreScriptSymbol(e) {
        return e.className.indexOf("pre-script-symbol-container") >= 0
    }
    closestSymbolContainerOrRoot(e) {
        var t = jQuery(e).parent().closest(ElementTypes.composite + ",math-type");
        return t.length > 0 ? t.get(0) : null
    }
    closestEditor(e) {
        return this.isEditAreaBlock(e) ? e : this.isEditAreaLine(e) ? e : jQuery(e).parent().closest("".concat(ElementTypes.editarea, ",").concat(ElementTypes.editareaLine)).get(0)
    }
    closetEditLine(e) {
        return this.isEditAreaBlock(e) ? e : jQuery(e).parent().closest("".concat(ElementTypes.line, ",").concat(ElementTypes.editareaLine)).get(0)
    }
    closetAnyBlock(e) {
        return jQuery(e).parent().closest("".concat(ElementTypes.block, ",").concat(ElementTypes.opensymbolblock, ",").concat(ElementTypes.closesymbolblock, ",").concat(ElementTypes.composite)).get(0)
    }
    findEditLines(e) {
        if (this.isEditAreaBlock(e)) return [e];
        if (this.isEditAreaLine(e)) return [e];
        var t = this.getAreaContainer(e);
        return t ? _.toArray(t.childNodes) : _.toArray(e.childNodes)
    }
    getFirstEditLine(e) {
        if (this.isEditAreaBlock(e)) return e;
        if (this.isEditAreaLine(e)) return e;
        var t = this.getAreaContainer(e);
        return t ? t.firstElementChild : e.firstElementChild
    }
    getAreaContainer(e) {
        var t = e.lastElementChild;
        if (t.tagName == ElementTypes.refTag) t = t.previousElementSibling;
        return t.tagName == ElementTypes.areaContainer ? t : null
    }
    findLineByIndex(e, t) {
        if (this.isEditAreaLine(e)) {
            if (0 != t) throw new Error("index should be 0");
            return e
        }
        var n = this.getFirstEditLine(e);
        for (var r = 0; null != n && r != t;) {
            r++;
            n = n.nextElementSibling;
        }
        return n
    }
    findEditLineIndex(e, t) {
        if (e.tagName == ElementTypes.editareaBlock) return 0;
        if (e.tagName == ElementTypes.editareaLine) return 0;
        for (var n = this.getFirstEditLine(e), r = 0; null != n;) {
            if (n == t) return r;
            n = n.nextElementSibling;
            r++
        }
        return -1
    }
    findBaseLineBlock(e) {
        return this.isRootEditLine(e) ? this.findBaseLineBlock(this.getRootLineBlocksElement(e)) : e.firstElementChild
    }
    findBlocks(e) {
        return this.isEditAreaBlock(e) ? this.isEmptyBlock(e) ? [] : [e] : this.isEmptyLine(e) ? [] : this.isRootEditLine(e) ? this.findBlocks(this.getRootLineBlocksElement(e)) : Array.from(e.children).filter(e => e.tagName != ElementTypes.baseLineBlock && e.tagName != ElementTypes.prefix && e.tagName != ElementTypes.refTag)
    }
    isRootEditLine(e) {
        return jQuery(e).hasClass("root")
    }
    isTextEditLine(e) {
        return jQuery(e).hasClass("root") || jQuery(e).hasClass("text-mode")
    }
    isMathContainerLine(e) {
        return jQuery(e).hasClass("math-container")
    }
    isRootNotMathContainerLine(e) {
        return this.isRootEditLine(e) && !this.isMathContainerLine(e)
    }
    findCharsInSameLineForward(e) {
        var t = [],
            n = e;
        for (t.push(e); null != n.nextElementSibling && !this.isNextCharInNextLines(n, n.nextElementSibling);) {
            t.push(n.nextElementSibling);
            n = n.nextElementSibling;
        }
        return t
    }
    getElementRound2DecimalRect(e) {
        var t = e.getBoundingClientRect();
        return {
            left: this.roundTo2Decimal(t.left),
            top: this.roundTo2Decimal(t.top),
            right: this.roundTo2Decimal(t.right),
            bottom: this.roundTo2Decimal(t.bottom),
            width: this.roundTo2Decimal(t.width),
            height: this.roundTo2Decimal(t.height)
        }
    }
    rangeInfoFromBlockAndRangeIndex(e, t) {
        return this.rangeInfoFromBlockAndRange(e, this.rangeFromIndex(e, t))
    }
    rangeInfoFromBlockAndRange(e, t) {
        var n = this.getElementRect(t),
            r = this.getLineSpacing(e, n.height);
        return {
            range: t,
            rangeRect: n,
            dy: r,
            computedRangeRect: RectangleHelper.createClientRectWithDy(n, r)
        }
    }
    rangeFromIndex(e, t) {
        if (t > e.textContent.length) return null;
        var n = document.createRange();
        return n.setStart(e.firstChild, t),
            n.collapse(!0),
            0 == n.getClientRects().length && console.log("why?"),
            n
    }
    rangeFrom2Indexes(e, t, n) {
        var r = document.createRange();
        return r.setStart(e.firstChild, t),
            r.setEnd(e.firstChild, n),
            r
    }
    getLineHeight(e) {
        var t = getComputedStyle(e)["line-height"];
        if ("normal" != t) {
            var n = Number.parseFloat(t);
            if (Number.isFinite(n)) return n
        }
        return null
    }
    getLineHeightOrFontSize(e) {
        var t = getComputedStyle(e)["line-height"];
        if ("normal" != t) {
            var n = Number.parseFloat(t);
            if (Number.isFinite(n)) return n
        }
        return this.getComputedFontSize(e)
    }
    getLineSpacing(e, t) {
        return (this.getLineHeight(e) - t) / 2
    }
    getElementClientSize(e) {
        return {
            width: e.clientWidth,
            height: e.clientHeight
        }
    }
    getElementRect(e, t) {
        if (Global.isNoBoundingClientRectSupportForRange() && e instanceof Range) {
            var n = e.getClientRects();
            return (!t || "second-rect" == t) && n.length > 1 && 0 != n[1].left ? n[1] : n[0]
        }
        return e.getBoundingClientRect()
    }
    getElementHeight(e) {
        return e.getBoundingClientRect().height
    }
    roundTo2Decimal(e) {
        return Math.round(100 * e) / 100
    }
    getElementHeightRound2Dec(e) {
        return this.roundTo2Decimal(e.getBoundingClientRect().height)
    }
    getBaselineOfFirstLine(e) {
        var t = e.firstElementChild.firstElementChild;
        return this.findPosCoresspondingTo(t, e).top
    }
    isNextCharInNextLines(e, t) {
        return e.getBoundingClientRect().left > t.getBoundingClientRect().left + 3
    }
    isPreviousCharInPreviousLine(e, t) {
        return t.getBoundingClientRect().left > e.getBoundingClientRect().left + 3
    }
    isInDifferentLineByWrap(e, t) {
        var n = e.getBoundingClientRect(),
            r = t.getBoundingClientRect();
        return n.bottom <= r.top + 3 || r.bottom <= n.top + 3
    }
    findPreviousChar(e) {
        return e.previousElementSibling
    }
    findNextChar(e) {
        return e.nextElementSibling
    }
    findNextLine(e) {
        return e.nextElementSibling
    }
    findPreviousLine(e) {
        return e.previousElementSibling
    }
    findPosCoresspondingToRound2Dec(e, t) {
        var n = e.getBoundingClientRect(),
            r = t.getBoundingClientRect();
        return {
            left: this.roundTo2Decimal(n.left) - this.roundTo2Decimal(r.left),
            top: this.roundTo2Decimal(n.top) - this.roundTo2Decimal(r.top)
        }
    }
    findPosCoresspondingTo(e, t) {
        var n = this.getElementRect(e),
            r = this.getElementRect(t);
        return {
            left: n.left - r.left,
            top: n.top - r.top
        }
    }
    findRectToRect(e, t) {
        return {
            left: e.left - t.left,
            top: e.top - t.top,
            width: e.width,
            height: e.height,
            right: e.left - t.left + e.width,
            bottom: e.top - t.top + e.height
        }
    }
    findRectsElementToRect(e, t) {
        for (var n = e.getClientRects(), r = [], a = 0; a < n.length; a++) {
            var i = n[a];
            r.push(this.findRectToRect(i, t))
        }
        return r
    }
    findRectElementToRect(e, t) {
        var n = this.getElementRect(e);
        return this.findRectToRect(n, t)
    }
    findRectElementToElement(e, t) {
        return this.findRectElementToRect(e, this.getElementRect(t))
    }
    emptyRectFromLine(e) {
        if (this.isEmptyLine(e)) return e.firstElementChild.getBoundingClientRect();
        var t = e.firstElementChild.getBoundingClientRect();
        return {
            left: t.left - .1,
            right: t.left + .1,
            top: t.top,
            bottom: t.bottom,
            width: .2,
            height: t.height
        }
    }
    isEmptyLine(e) {
        return this.isRootEditLine(e) ? this.isEmptyLine(this.getRootLineBlocksElement(e)) : !e.firstElementChild.nextElementSibling || e.firstElementChild.nextElementSibling.tagName == ElementTypes.emptyblock
    }
    getEmptyBlock(e) {
        return this.isRootEditLine(e) ? this.getEmptyBlock(this.getRootLineBlocksElement(e)) : e.firstElementChild.nextElementSibling
    }
    getFirstElementOrEmptyBlock(e) {
        return this.isRootEditLine(e) ? this.getFirstElementOrEmptyBlock(this.getRootLineBlocksElement(e)) : "REF-TAG" == e.firstElementChild.nextElementSibling.tagName ? e.firstElementChild.nextElementSibling.nextElementSibling : e.firstElementChild.nextElementSibling
    }
    getBaseLineIndicator(e) {
        return e.firstElementChild && e.firstElementChild.tagName == ElementTypes.baseLineIndicator ? e.firstElementChild : null
    }
    getRootLineBlocksElement(e) {
        return e.firstElementChild.nextElementSibling
    }
    hasNextLine(e) {
        return !this.isEditAreaBlock(e) && !this.isEditAreaLine(e) && null != e.nextElementSibling
    }
    getNextLine(e) {
        return this.isEditAreaBlock(e) ? null : this.isEditAreaLine(e) ? null : e.nextElementSibling
    }
    hasPreviousLine(e) {
        return !this.isEditAreaBlock(e) && !this.isEditAreaLine(e) && null != e.previousElementSibling
    }
    getPreviousLine(e) {
        return this.isEditAreaBlock(e) ? null : this.isEditAreaLine(e) ? null : e.previousElementSibling
    }
    getElementMiddleTopBottom(e) {
        var t = this.getElementRect(e);
        return t.top + t.height / 2
    }
    getBaseLineBlock(e) {
        return this.isRootEditLine(e) ? this.getBaseLineBlock(this.getRootLineBlocksElement(e)) : e.firstElementChild
    }
    isBaseLineBlock(e) {
        return e.tagName == ElementTypes.baseLineBlock
    }
    rectFromChar(e, t) {
        return e ? e.getBoundingClientRect() : this.emptyRectFromLine(t)
    }
    findEditors(e) {
        return e.reactInstance.getEditorDoms()
    }
    toRectWrapper(e, t) {
        return {
            element: e,
            rect: t
        }
    }
    elementToRectWrapper(e) {
        return this.toRectWrapper(e, e.getBoundingClientRect())
    }
    elementsToRectWrappers(e) {
        return _.map(e, e => ({
            element: e,
            rect: e.getBoundingClientRect()
        }))
    }
    lineBlocksToRectWrappers(e) {
        return _.map(e, e => ({
            data: e,
            rect: e.element.getBoundingClientRect()
        }))
    }
    geoPosFromCursor(e) {
        var t = this.getElementRect(e.mathTypeElement);
        return {
            left: e.relativeGeoPosition.left + t.left,
            top: e.relativeGeoPosition.top + t.top
        }
    }
    getMaxXAxisPos(e) {
        var t = this.getElementRect(e.mathTypeElement);
        return {
            left: e.maxRelativeXAxisPosition.left + t.left,
            top: e.maxRelativeXAxisPosition.top + t.top
        }
    }
    setHeightAsBoundingHeight(e) {
        var t = e.getBoundingClientRect().height;
        this.setCss(e, "height", t)
    }
    setCssEmRound(e, t, n) {
        var r = this.getComputedFontSize(e);
        jQuery(e).css(t, Math.round(r * n) / r + "em")
    }
    getEmRound(e, t) {
        return Math.round(e * t) / t
    }
    setCss(e, t, n) {
        var r = null == n ? "" : n;
        jQuery(e).css(t) != (r = _.isNumber(r) ? r + "px" : r) && jQuery(e).css(t, r)
    }
    setHeightEm(e, t, n) {
        n = n || this.getComputedFontSize(e);
        this.setCss(e, "height", t / n + "em")
    }
    setHeight(e, t) {
        this.setCss(e, "height", t)
    }
    setWidth(e, t) {
        this.setCss(e, "width", t)
    }
    setMinWidth(e, t) {
        this.setCss(e, "min-width", t)
    }
    getCssHeight(e) {
        return Number.parseFloat(getComputedStyle(e).height)
    }
    getComputedStyleAsNumber(e, t) {
        return Number.parseFloat(getComputedStyle(e)[t])
    }
    getTextDirection(e) {
        return window.getComputedStyle(e).direction
    }
    getComputedStyle(e, t) {
        return getComputedStyle(e)[t]
    }
    getComputedFontSize(e) {
        return this.getComputedStyleAsNumber(e, "font-size")
    }
    getComputedCharHeight(e) {
        var t = this.getComputedFontSize(e);
        return Math.round(t + t / 5)
    }
    setMarginTopEm(e, t, n) {
        n = n || this.getComputedFontSize(e);
        this.setCss(e, "margin-top", t / n + "em")
    }
    setMarginTop(e, t) {
        this.setCss(e, "margin-top", t)
    }
    findOpenCloseSymbolInfo(e) {
        return e.tagName == ElementTypes.opensymbolblock ? {
            bracketPosition: "open",
            bracketType: e.getAttribute("type"),
            element: e
        } : e.tagName == ElementTypes.closesymbolblock ? {
            bracketPosition: "close",
            bracketType: e.getAttribute("type"),
            element: e
        } : null
    }
    isPreviousBlockInPreviousLine(e, t) {
        return e.getBoundingClientRect().right <= t.getBoundingClientRect().left
    }
    isStillInDomeTree(e) {
        return null != e.offsetParent
    }
    notInDomeTree(e) {
        return null == e.offsetParent
    }
}

export { u as DOMHelperB }

export default DOMHelper