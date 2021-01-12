import _ from 'lodash';
import jQuery from 'jquery';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import ArrayHelper2 from '../Mathcha/ArrayHelper2';
import BlockUtils from '../Elements/BlockUtils';
import CursorHelper from './CursorHelper';
import DOMHelper from '../Elements/DOMHelper';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import RectangleHelper from '../Geometry/RectangleHelper';
import Searching from '../Searching';
import TextUtils from './TextUtils';

/// xxx(49) /*CursorPositionHelper*/

/// var r = n(3);  // 2 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 68 times
/// var o = n(46)/*RectangleHelper*/;  // 16 times
/// var s = n(2)/*lodash*/;  // 21 times
/// var l = n.n(s);
/// var c = n(58)/*BlockUtils*/;  // 9 times
var d = new class {
    isStoredBaseLine(e) {
        return null != e.baseLine
    }
    getBlockBaseLineInfo(e, t, n) {
        if (DOMHelper.isEmptyLine(t)) return {
            top: DOMHelper.getElementMiddleTopBottom(e),
            positionType: "middle"
        };
        if (DOMHelper.isTextEditLine(t)) {
            var r = DOMHelper.getBaseLineIndicator(e);
            if (!r && DOMHelper.isInlineMathContainer(e)) return this.getFromInlineMathEditor(e);
            if (!r) {
                var a = e;
                return a.reactInstance && a.reactInstance.getDefaultBaseLine ? a.reactInstance.getDefaultBaseLine(n) : {
                    top: DOMHelper.getElementRect(e).bottom,
                    positionType: "bottom"
                }
            }
            return {
                top: DOMHelper.getElementMiddleTopBottom(r),
                positionType: "middle"
            }
        }
        var o = DOMHelper.getBaseLineBlock(t);
        return {
            top: DOMHelper.getElementRect(o).top,
            positionType: "baseline"
        }
    }
    getFromInlineMathEditor(e) {
        var t = e.firstElementChild;
        if ("AREA-BASELINE" == t.firstElementChild.tagName) return {
            top: DOMHelper.getElementMiddleTopBottom(t.firstElementChild),
            positionType: "middle"
        };
        var n = DOMHelper.getBaseLineBlock(t.firstElementChild);
        return {
            top: DOMHelper.getElementRect(n).top,
            positionType: "baseline"
        }
    }
};
/// var h = n(7)/*PropUpdateHelper*/;  // 1 times
/// var u = n(75)/*CursorHelper*/;  // 15 times
/// var p = n(35)/*slicedToArray*/;  // 3 times
/// var m = n.n(p);
/// var f = n(144)/*Searching*/;  // 4 times
/// var g = n(36)/*TextUtils*/;  // 2 times
/// var y = n(55)/*ArrayHelper2*/;  // 1 times
var A = new class {
    findSelectedRangeBinarySearch(e, t) {
        var n = 0;
        var r = 0;
        var a = TextUtils.getUnistring(e);
        var o = DOMHelper.rangeFrom2Indexes(e, 0, a.rawIndexAt(a.length));
        var s = DOMHelper.getLineHeight(e);
        var l = this.getRangeClientRects(o, s);
        var c = a.length;
        t = this.clampGeoPositionAndRects(t, l);
        for (; c - n > 1;) {
            var d = Math.floor((c + n) / 2);
            var h = DOMHelper.rangeFrom2Indexes(e, a.rawIndexAt(n), a.rawIndexAt(d));
            var u = this.getRangeClientRects(h, s);
            if (this.posInRects(t, u)) c = d;
            else if (n = d, ++r > 200) return console.log("wrong calculation for cursor search binary !!!!!"),
            null
        }
        if (n === c) return [n, "none"];
        var p = DOMHelper.rangeFromIndex(e, a.rawIndexAt(n));
        var m = DOMHelper.rangeFromIndex(e, a.rawIndexAt(c));
        var f = DOMHelper.getElementRect(p, "first-rect");
        var y = DOMHelper.getElementRect(m, "first-rect");
        return Math.abs(f.left - t.left) < Math.abs(y.left - t.left) ? [n, "left"] : y.top > f.top + 3 ? [n, "next-line"] : [c, "right"]
    }
    getRangeClientRects(e, t) {
        var n = e.getClientRects();
        var r = ArrayHelper2.newArray(n.length, true);
        var a = 0;
        for (; a < n.length; a++) {
            var i = n.item(a);
            var o = Math.max(0, t - i.height) / 2;
            r[a] = {
                left: i.left,
                right: i.right,
                width: i.width,
                top: i.top - o,
                bottom: i.bottom + o,
                height: i.height + 2 * o
            }
        }
        return r
    }
    clampGeoPositionAndRects(e, t) {
        e = _.clone(e);
        var n = {
            left: t[0].left,
            top: t[0].top,
            right: t[0].right,
            bottom: t[0].bottom
        };
        var r = 1;
        for (; r < t.length; r++) {
            var a = t[r];
            n = {
                left: Math.min(a.left, n.left),
                top: Math.min(a.top, n.top),
                right: Math.max(a.right, n.right),
                bottom: Math.max(a.bottom, n.bottom)
            }
        }
        e.top = Math.max(n.top + 1, e.top);
        e.top = Math.min(n.bottom - 1, e.top);
        e.left = Math.max(n.left + 1, e.left);
        e.left = Math.min(n.right - 1, e.left);
        var i = Number.MAX_SAFE_INTEGER;
        var o = -1;
        var s = 0;
        for (; s < t.length; s++) {
            var c = t[s];
            if (e.top >= c.top && e.top <= c.bottom) {
                i = Math.min(c.left, i);
                o = Math.max(c.right, o)
            }
        }
        return i != Number.MAX_SAFE_INTEGER ? {
            left: _.clamp(e.left, i, o),
            top: e.top
        } : e
    }
    posInRects(e, t) {
        return t.some((t) => {
            return t.left <= e.left && e.left <= t.right && t.top <= e.top && e.top <= t.bottom
        })
    }
};
var E = new class {
    cursorFromTextBlock(e, t, n, r) {
        if (!e) return CursorHelper.emptyLine(t, n);
        var a = (new CursorHelper).withLine(t).withEditor(n);
        if (DOMHelper.isNonChar(e)) {
            var s = DOMHelper.findBlocks(t);
            if (0 === s.length) return CursorHelper.emptyLine(t, n);
            var c = _.takeWhile(s, (t) => {
                return t != e
            });
            var d = a.withCharIndexBySumOfBlocks(c).build();
            return RectangleHelper.isOnMidLeft(DOMHelper.elementToRectWrapper(e), r) || (d.charIndex += 1),
            d
        }
        var h = this.calculateCharIndex(e, t, r);
        var p = slicedToArray(h, 2);
        var f = p[0];
        var g = p[1];
        return a.withPositionOnRange(g).withCharIndex(f).build()
    }
    calculateCharIndex(e, t, n) {
        var r = DOMHelper.findBlocks(t);
        var a = r.indexOf(e);
        var o = 0;
        var s = 0;
        for (; s < a; s++) o = o + BlockUtils.getNumberOfCharsInBlock(r[s]);
        var l = A.findSelectedRangeBinarySearch(e, n);
        var d = slicedToArray(l, 2);
        return [o + d[0], d[1]]
    }
};
var v = new class {
    buildForEditAreaBlock(e, t) {
        var n = (new CursorHelper).withLine(e).withEditor(e);
        if (!e.innerText) return n.withCharIndex(0).build();
        var r = A.findSelectedRangeBinarySearch(e, t);
        var a = slicedToArray(r, 1)[0];
        return n.withCharIndex(a > 0 ? 1 : 0).build()
    }
    buildForEditAreaLine(e, t) {
        var n = (new CursorHelper).withLine(e).withEditor(e);
        return DOMHelper.isEmptyLine(e) ? n.withCharIndex(0).build() : DOMHelper.isTextEditLine(e) ? this.forTextLine(e, e, t) : this.forNormalLine(e, e, t)
    }
    build(e, t, n) {
        var r = (new CursorHelper).withLine(e).withEditor(t);
        return DOMHelper.isEmptyLine(e) ? r.withCharIndex(0).build() : DOMHelper.isTextEditLine(e) ? this.forTextLine(e, t, n) : this.forNormalLine(e, t, n)
    }
    forTextLine(e, t, n) {
        var r = BlockUtils.buildLineBlocks(e);
        if (0 === r.length) return null;
        var a = _.filter(r, (e) => {
            return RectangleHelper.isRectClampPosInYAxis(e, n)
        });
        if (0 === a.length) {
            var i = _.minBy(r, (e) => {
                return e.rect.top
            }).rect.top;
            var s = _.maxBy(r, (e) => {
                return e.rect.bottom
            }).rect.bottom;
            if (n.top <= i) n.top = i + 1;
            else if (n.top >= s) n.top = s - 1;
            else {
                var d = RectangleHelper.findNearestVerticalStackOfRect(r, n);
                if (Math.abs(n.top - d.rect.top) <= Math.abs(n.top - d.rect.bottom)) n.top = d.rect.top + 1;
                else n.top = d.rect.bottom - 1
            }
            a = _.filter(r, (e) => {
                return RectangleHelper.isRectClampPosInYAxis(e, n)
            })
        }
        var h = Searching.getGeoBlocks(a);
        var u = this.findFromSingleLineBlock(h);
        if (u) {
            var p = _.clone(u.block);
            p.charIndex = 0;
            var m = Searching.getCurrentLineBlockRects(r, e, p, "right");
            if (! (y = _.find(m, (e) => {
                return RectangleHelper.isRectClampPosInXAxis(e, n)
            }))) return n.left <= m[0].rect.left ? E.cursorFromTextBlock(m[0].data.element, e, t, n) : E.cursorFromTextBlock(_.last(m).data.element, e, t, n);
            if (!RectangleHelper.isRectClampPosInYAxis(y.data, n)) return E.cursorFromTextBlock(y.data.element, e, t, n);
            if (RectangleHelper.isRectOnTheLeftOfRect(y, u)) {
                var g = RectangleHelper.setTopGeoPos(n, y.rect.bottom);
                return E.cursorFromTextBlock(y.data.element, e, t, g)
            }
            return g = RectangleHelper.setTopGeoPos(n, y.rect.top),
            E.cursorFromTextBlock(y.data.element, e, t, g)
        }
        var y;
        var A = _.find(h, (e) => {
            return RectangleHelper.isClientRectClampPosInYAxis(e.endRangeRect, n)
        });
        if (A && (m = Searching.getCurrentLineBlockRects(r, e, BlockUtils.toCharIndexedHtmlLineBlockAtEnd(A.block), "right")), !m) {
            var v = _.find(h, (e) => {
                return RectangleHelper.isClientRectClampPosInYAxis(e.startRangeRect, n)
            });
            if (v) m = Searching.getCurrentLineBlockRects(r, e, BlockUtils.toCharIndexedHtmlLineBlockAtStart(v.block), "right")
        }
        return m && 1 != m.length ? ((y = _.find(m, (e) => {
            return RectangleHelper.isRectClampPosInXAxis(e, n)
        })) || (y = m[0]), v ? (g = RectangleHelper.setTopGeoPos(n, y.rect.bottom), E.cursorFromTextBlock(y.data.element, e, t, g)) : (g = RectangleHelper.setTopGeoPos(n, y.rect.top), E.cursorFromTextBlock(y.data.element, e, t, g))) : E.cursorFromTextBlock(h[0].block.element, e, t, n)
    }
    findFromSingleLineBlock(e) {
        return _.find(e, (e) => {
            return !e.isMultiline
        })
    }
    forNormalLine(e, t, n) {
        var r = BlockUtils.buildLineBlocks(e);
        var a = RectangleHelper.findNearestRectsInXAxis(r, n);
        return E.cursorFromTextBlock(a.element, e, DOMHelper.closestEditor(e), n)
    }
};
/// var S = n(5)/*sizzle*/;  // 2 times
/// var C = n.n(S);
var CursorPositionHelper = new class {
    emptyCursorContext() {
        return {}
    }
    fullPosToDomPos(e) {
        return {
            charIndex: e.charIndex,
            lineIndex: e.lineIndex,
            line: e.line,
            editor: e.editor,
            direction: e.direction
        }
    }
    isSelectedDeepEqual(e, t) {
        return e === t || !!e == !!t && e.lineIndex === t.lineIndex && e.charIndex === t.charIndex && e.key === t.key && !!e.selected == !!t.selected && this.isSelectedDeepEqual(e.selected, t.selected)
    }
    cursorFromTextBlock(e, t, n, r) {
        return E.cursorFromTextBlock(e, t, n, r)
    }
    getFirstCursorNextBlock(e, t) {
        if (DOMHelper.isEmptyLine(e)) return CursorHelper.emptyLine(e);
        var n = (new CursorHelper).withLine(e);
        var r = BlockUtils.buildLineBlocks(e);
        if (null == t) return n.withCharIndex(r[0].startIndex).build();
        var a = _.find(r, (e) => {
            return e.element === t
        });
        return a.blockIndex === r.length - 1 ? n.withCharIndex(a.startIndex + a.numOfChar).build() : n.withCharIndex(r[a.blockIndex + 1].startIndex).build()
    }
    getFirstCursorFromBlock(e, t) {
        if (DOMHelper.isEmptyLine(e)) return CursorHelper.emptyLine(e);
        var n = BlockUtils.buildLineBlocks(e);
        var r = _.find(n, (e) => {
            return e.element === t
        });
        return (new CursorHelper).withLine(e).withCharIndex(r.startIndex).build()
    }
    getLastCursorPositionFormEditAreaBlock(e) {
        return CursorHelper.build(e, e, 0, DOMHelper.isInnerTextEmpty(e) ? 0 : 1)
    }
    getFirstCursorPositionFormEditAreaBlock(e) {
        return CursorHelper.build(e, e, 0, 0)
    }
    getLastCursorPositionFromLine(e) {
        if (DOMHelper.isEmptyLine(e)) return CursorHelper.emptyLine(e);
        var t = BlockUtils.buildLineBlocks(e);
        var n = _.last(t);
        return (new CursorHelper).withLine(e).withCharIndex(n.startIndex + n.numOfChar).build()
    }
    getBlockFromCharIndex(e, t, n, r) {
        if (r) {
            var i = 0;
            for (; i < e.length; i++) {
                var o = e[i];
                if (o.element === r) return _.assignIn({},
                o, {
                    charIndex: t - o.startIndex
                })
            }
        }
        var s = 0;
        for (; s < e.length; s++) {
            var c = e[s];
            var d = n && "rtl" == window.getComputedStyle(c.element).direction;
            if (c.endIndex + 1 === t && s < e.length - 1 && !d) return _.assign({},
            c, {
                charIndex: t - c.startIndex,
                subBlock: PropUpdateHelper.set(e[s + 1], "charIndex", 0)
            });
            if (t >= c.startIndex && (null == c.endIndex || t <= c.endIndex)) return _.assign({},
            c, {
                charIndex: t - c.startIndex
            })
        }
        return null
    }
    getNumberOfChars(e) {
        return _.sumBy(e, (e) => {
            return e.numOfChar
        })
    }
    findNextCharIndex(e) {
        return e.charIndex < e.totalChar ? e.charIndex + 1 : null
    }
    findPreviousCharIndex(e) {
        return e.charIndex > 0 ? e.charIndex - 1 : null
    }
    buildCursorPositionFromEvent(e, t) {
        return this.buildCursorPosition(e, t.target, {
            left: t.clientX,
            top: t.clientY
        })
    }
    findNearestLine(e, t) {
        var n = DOMHelper.findEditLines(e);
        var r = DOMHelper.elementsToRectWrappers(n);
        return RectangleHelper.findNearestVerticalStackOfRect(r, t).element
    }
    buildCursorPositionForEditAreaBlock(e, t) {
        return this.buildCursorPosition(e, e, t)
    }
    buildCursorPosition(e, t, n) {
        if (DOMHelper.isEditAreaBlock(t)) return v.buildForEditAreaBlock(e, n);
        if (DOMHelper.isEditAreaLine(e)) return v.buildForEditAreaLine(e, n);
        if (DOMHelper.isEditArea(t)) {
            var r = this.findNearestLine(t, n);
            return v.build(r, e, n)
        }
        if (DOMHelper.isEditorLine(t)) return v.build(t, e, n);
        if (DOMHelper.isBlocksInRootLine(t)) return v.build(t.parentElement, e, n);
        if (DOMHelper.isPrefix(t)) return v.build(t.parentElement, e, n);
        var a = t;
        return DOMHelper.isBlock(a) || (a = DOMHelper.closetAnyBlock(t)),
        jQuery(a).hasClass("role-prevent-selection") ? null : (r = DOMHelper.closetEditLine(a), E.cursorFromTextBlock(a, r, e, n))
    }
    calculateGeoPos(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "null";
        if (0 === e.charIndex) return this.calculateGeoPosBeginLine(e.line);
        var r = this.getBlockFromCharIndex(e.lineBlocks, e.charIndex, true);
        if (!r) {
            if ("null" == n) return console.warn("block not found with char index"),
            null;
            if (e.lineBlocks.length <= 0) return this.calculateGeoPosBeginLine(e.line);
            var o = _.last(e.lineBlocks);
            r = _.assignIn({},
            o, {
                charIndex: BlockUtils.getNumberOfCharsInBlock(o.element)
            })
        }
        var s = this.geoPosFromBlock(r.element, r.charIndex, e.line, t, n);
        if (null == s) return null;
        if (s.charIndexInBlock = r.charIndex, s.attachElement) {
            var d = DOMHelper.getElementRect(s.attachElement);
            s.pos.left = Math.max(s.pos.left, d.left);
            s.pos.left = Math.min(s.pos.left, d.right);
            if (s.pos.left === d.right && this.isFirstPairAlignTdCell(s.attachElement)) s.pos.left -= 1
        }
        return s
    }
    isFirstPairAlignTdCell(e) {
        var t = e.parentElement.parentElement.parentElement.parentElement;
        return "TD" == t.tagName && t.className.includes("first-in-pair")
    }
    getRangeOnIndexHandleOnEndOfWrappedLine(e, t) {
        try {
            return t >= e.innerText.length && e.nextElementSibling && DOMHelper.isChar(e.nextElementSibling) ? {
                range: DOMHelper.rangeFromIndex(e.nextElementSibling, 0),
                attachedBlock: e.nextElementSibling,
                newRawIndex: 0
            } : {
                range: DOMHelper.rangeFrom2Indexes(e, t, Math.min(t + 1, e.innerText.length)),
                attachedBlock: e,
                newRawIndex: t
            }
        } catch(e) {
            return console.warn("could not get range"),
            null
        }
    }
    getMovingIntention(e) {
        return "left" == e.direction || "right" == e.direction ? "right" == e.direction ? "right" : "left" : !e.positionOnRange || "left" != e.positionOnRange && "next-line" != e.positionOnRange ? "right" : "left"
    }
    getRangeIndexWithIntention(e, t, n) {
        return "right" != n && "none" != n && n ? this.getRangeOnIndexHandleOnEndOfWrappedLine(e, t) : {
            range: DOMHelper.rangeFromIndex(e, t),
            attachedBlock: e,
            newRawIndex: t
        }
    }
    geoPosFromBlock(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "null";
        if (DOMHelper.isNonChar(e)) return this.geoPosFromNonChar(e, t, n);
        var o = TextUtils.rawIndexAt(e, t);
        var s = this.getRangeIndexWithIntention(e, o, r);
        var l = s.range;
        var c = s.attachedBlock;
        var d = s.newRawIndex;
        if (null == l) {
            if ("null" == a) return console.warn("range not found with char index"),
            null;
            l = DOMHelper.rangeFromIndex(e, e.textContent.length)
        }
        var h = DOMHelper.getElementRect(l, "left" == r ? "second-rect" : "first-rect");
        var u = h.left;
        return c.innerText.length === d && (u = u + DOMHelper.getComputedStyleAsNumber(e, "padding-right")),
        {
            attachElement: c,
            positionType: "middle",
            pos: {
                left: u,
                top: h.top + h.height / 2
            }
        }
    }
    geoPosFromNonChar(e, t, n) {
        var r = DOMHelper.getElementRect(e);
        var a = 0;
        if (DOMHelper.isMathContainer(e)) {
            var o = getComputedStyle(e);
            a = +Number.parseFloat(o.getPropertyValue("margin-right"))
        }
        var s = d.getBlockBaseLineInfo(e, n, 0 === t ? "line-start" : void 0);
        return {
            attachElement: e,
            positionType: s.positionType,
            pos: {
                left: 0 === t ? r.left : r.right + a,
                top: s.top
            }
        }
    }
    calculateGeoPosBeginLine(e) {
        if (DOMHelper.isEditAreaBlock(e)) {
            var t = DOMHelper.getElementRect(e);
            var n = t.left;
            if (DOMHelper.isInnerTextEmpty(e)) {
                var r = jQuery(e).css("text-align");
                if ("center" == r) n = t.left + t.width / 2;
                else if ("right" == r) n = t.left + t.width
            } else n = DOMHelper.getElementRect(DOMHelper.rangeFromIndex(e, 0)).left;
            return {
                attachElement: e,
                positionType: "baseline",
                pos: {
                    left: n,
                    top: t.bottom - .18 * t.height
                }
            }
        }
        if (DOMHelper.isTextEditLine(e)) return this.calculateGeoPosBeginForTextModeLine(e);
        var a = DOMHelper.getFirstElementOrEmptyBlock(e);
        var o = DOMHelper.getElementRect(a).left;
        var s = d.getBlockBaseLineInfo(a, e, "line-start");
        return this.isSecondPairAlignTdCell(e) && (o = o + 2),
        {
            attachElement: a,
            positionType: s.positionType,
            pos: {
                left: o,
                top: s.top
            }
        }
    }
    isSecondPairAlignTdCell(e) {
        var t = e.parentElement.parentElement.parentElement;
        return "TD" == t.tagName && t.className.includes("second-in-pair")
    }
    calculateGeoPosBeginForTextModeLine(e) {
        var t = DOMHelper.getFirstElementOrEmptyBlock(e);
        var n = DOMHelper.getElementRect(t).left;
        if (DOMHelper.isEmptyLine(e) || DOMHelper.isComposite(t)) {
            var r = d.getBlockBaseLineInfo(t, e, "line-start");
            return {
                attachElement: t,
                positionType: r.positionType,
                pos: {
                    left: n,
                    top: r.top
                }
            }
        }
        return this.geoPosFromBlock(t, 0, e, "left")
    }
    cursorFromBlock(e, t, n) {
        return e ? {
            charIndex: e.startIndex,
            line: t,
            lineIndex: this.findLineIndex(t, n),
            editor: n
        } : CursorHelper.emptyLine(t, n)
    }
    findLineIndex(e, t) {
        return t || (t = DOMHelper.closestEditor(e)),
        DOMHelper.findEditLines(t).indexOf(e)
    }
}

export default CursorPositionHelper