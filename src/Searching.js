import _ from 'lodash';
import BlockUtils from './Elements/BlockUtils';
import CursorPositionHelper from './Editor/CursorPositionHelper';
import DOMHelper from './Elements/DOMHelper';
import Global from './Global';
import PropUpdateHelper from './Mathcha/PropUpdateHelper';
import RectangleHelper from './Geometry/RectangleHelper';
import TextUtils from './Editor/TextUtils';

/// xxx(144) /*Searching*/

/// var r = n(2)/*lodash*/;  // 11 times
/// var a = n.n(r);
/// var i = n(58)/*BlockUtils*/;  // 5 times
/// var o = n(7)/*PropUpdateHelper*/;  // 3 times
/// var s = n(36)/*TextUtils*/;  // 1 times
/// var l = n(4)/*DOMHelper*/;  // 11 times
/// var c = n(46)/*RectangleHelper*/;  // 1 times
/// var d = n(11)/*Global*/;  // 1 times
/// var h = n(49)/*CursorPositionHelper*/;  // 1 times
var Searching = new class {
    getElementReactWithMarginTopBottom(e) {
        var t = DOMHelper.getElementRect(e);
        var n = DOMHelper.getComputedStyleAsNumber(e, "marginTop");
        var r = DOMHelper.getComputedStyleAsNumber(e, "marginBottom");
        return {
            top: t.top - n,
            bottom: t.bottom + r,
            height: t.bottom - t.top + r + n,
            left: t.left,
            right: t.right,
            width: t.width
        }
    }
    getGeoBlock(e) {
        if (e.isNonChar) {
            var t = this.getElementReactWithMarginTopBottom(e.element);
            return {
                isMultiline: false,
                rect: t,
                startLineLeft: t.left,
                endLineLeft: t.right,
                kind: "nonchar",
                block: e
            }
        }
        if (e.isChar) {
            var n = DOMHelper.rangeInfoFromBlockAndRangeIndex(e.element, 0);
            var r = DOMHelper.rangeInfoFromBlockAndRangeIndex(e.element, e.element.innerText.length);
            var a = n.computedRangeRect;
            var i = r.computedRangeRect;
            if (Global.isSafari()) {
                JSON.stringify(n.rangeRect);
                JSON.stringify(r.rangeRect)
            }
            var o = DOMHelper.getLineSpacing(e.element, n.rangeRect.height);
            return {
                isMultiline: !this.isRangeSameLine(n, r),
                rect: RectangleHelper.createClientRectWithDy(DOMHelper.getElementRect(e.element), o),
                startLineLeft: a.left,
                startRangeRect: a,
                endLineLeft: i.left,
                endRangeRect: i,
                startRange: n,
                endRange: r,
                lineHeight: a.height,
                kind: "char",
                block: e
            }
        }
    }
    getGeoBlocks(e) {
        return _.map(e, (e) => {
            return this.getGeoBlock(e)
        })
    }
    cursorRangeFromCursorPos(e, t) {
        var n = CursorPositionHelper.getRangeIndexWithIntention(e.element, TextUtils.rawIndexAt(e.element, e.charIndex), t);
        var r = n.range;
        var a = n.attachedBlock;
        return DOMHelper.rangeInfoFromBlockAndRange(a, r)
    }
    getLastLineBlocks(e) {
        var t = BlockUtils.buildLineBlocks(e);
        var n = _.last(t);
        return n ? n.isNonChar ? this.getCurrentLineBlockRects(t, e, n, "right") : this.getCurrentLineBlockRects(t, e, BlockUtils.toCharIndexLineBlock(n, n.numOfChar), "right") : []
    }
    getPreviousLineFromCharBlock(e, t, n, r, a, i) {
        var s = PropUpdateHelper.setProp(e, "charIndex", 0);
        var l = t;
        var c = this.getCurrentLineBlockRects(r, n, s, i);
        var d = this.getMaxTopBottom(c);
        return this.isTopBottomAdjacent(a, d) ? c : [{
            rect: {
                left: t.rect.left,
                right: t.rect.right,
                bottom: a.top - 2,
                top: a.top - l.lineHeight,
                width: t.rect.right - t.rect.left,
                height: l.lineHeight
            },
            data: e
        }]
    }
    getPreviousLineFromComposite(e, t, n) {
        var r = BlockUtils.buildLineBlocks(t);
        var o = _.find(r, (t) => {
            return t.element === e
        });
        return this.getPreviousLineBlockRects(o, t, r, n)
    }
    getPreviousLineBlockRects(e, t, n, r) {
        var o = this.getCurrentLineBlockRects(n, t, e, r);
        var s = this.getMaxTopBottom(o);
        var l = _.first(o);
        var c = this.getGeoBlock(l.data);
        if ("char" == c.kind) {
            var d = l.data;
            var h = c;
            var u = this.cursorRangeFromCursorPos(d, r);
            if (this.hasPreviousLine(h, u)) return this.getPreviousLineFromCharBlock(l.data, c, t, n, s, r)
        }
        if (0 === l.data.blockIndex) return [];
        var p = n[l.data.blockIndex - 1];
        return this.getCurrentLineBlockRects(n, t, BlockUtils.toCharIndexLineBlock(p, p.numOfChar), r)
    }
    getNextLineFromCharBlock(e, t, n, r, i) {
        var o = _.assign({},
        e, {
            charIndex: e.element.innerText.length
        });
        var s = this.getCurrentLineBlockRects(r, n, o, "right");
        var l = this.getMaxTopBottom(s);
        var c = t;
        return this.isTopBottomAdjacent(i, l) ? s : [{
            rect: {
                left: t.rect.left,
                right: t.rect.right,
                bottom: i.bottom + c.lineHeight,
                top: i.bottom + 2,
                width: t.rect.right - t.rect.left,
                height: c.lineHeight
            },
            data: e
        }]
    }
    getNextLineFromComposite(e, t) {
        var n = BlockUtils.buildLineBlocks(t);
        var r = _.find(n, (t) => {
            return t.element === e
        });
        return this.getNextLineBlockRects(r, t, n, "right")
    }
    getNextLineBlockRects(e, t, n, r) {
        var i = this.getCurrentLineBlockRects(n, t, e, r);
        var o = this.getMaxTopBottom(i);
        var s = _.last(i);
        var l = this.getGeoBlock(s.data);
        if ("char" == l.kind) {
            var c = s.data;
            var d = this.cursorRangeFromCursorPos(c, r);
            var h = l;
            if (this.hasNextLine(h, d)) return this.getNextLineFromCharBlock(s.data, l, t, n, o)
        }
        if (s.data.blockIndex === n.length - 1) return [];
        var u = n[s.data.blockIndex + 1];
        return this.getCurrentLineBlockRects(n, t, _.assign({},
        u, {
            charIndex: 0
        }), r)
    }
    isTopBottomAdjacent(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3;
        return e.top < t.top ? Math.abs(e.bottom - t.top) < n : Math.abs(t.bottom - e.top) < n
    }
    getMaxTopBottom(e) {
        if (0 === e.length) return null;
        var t = -99999;
        var n = 99999;
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r];
            n = Math.min(a.rect.top, n);
            t = Math.max(a.rect.bottom, t)
        }
        return {
            top: n,
            bottom: t,
            height: t - n
        }
    }
    getCurrentLineBlockRects(e, t, n, r) {
        var a = [];
        var i = this.getGeoBlock(n);
        var o = DOMHelper.getElementRect(t);
        if ("char" == i.kind) {
            var s = n;
            if (null == s.charIndex) throw new Error("need charIndex");
            var c = this.cursorRangeFromCursorPos(s, r);
            var d = i;
            var h = {
                rect: {
                    left: o.left,
                    right: o.right,
                    width: o.width,
                    top: c.computedRangeRect.top,
                    bottom: c.computedRangeRect.bottom,
                    height: c.computedRangeRect.height
                },
                data: n
            };
            if (!this.hasPreviousLine(d, c)) {
                h.rect.left = i.startLineLeft;
                h.rect.width = h.rect.right - i.startLineLeft;
                var u = this.getPreviousBlockRectsInLine(e, n.blockIndex, t, d.startLineLeft);
                a = a.concat(u)
            }
            if (a = a.concat([h]), !this.hasNextLine(d, c)) {
                h.rect.right = i.endLineLeft;
                h.rect.width = i.endLineLeft - h.rect.left;
                var p = this.getNextBlockRectsInLine(e, n.blockIndex, t, d.endLineLeft);
                a = a.concat(p)
            }
            return a
        }
        var m = {
            rect: i.rect,
            data: n
        };
        var f = this.getPreviousBlockRectsInLine(e, n.blockIndex, t, i.rect.left);
        return a = (a = a.concat(f)).concat([m]),
        f = this.getNextBlockRectsInLine(e, n.blockIndex, t, i.rect.right),
        a = a.concat(f)
    }
    getPreviousBlockRectsInLine(e, t, n, r) {
        var i = [];
        var s = DOMHelper.getElementRect(n);
        var c = r;
        var d = t - 1;
        for (; d >= 0; d--) {
            var h = e[d];
            var u = this.getGeoBlock(h);
            if (u.endLineLeft - 2 > c) return _.reverse(i);
            if (u.isMultiline) {
                var p = u;
                return i.push({
                    rect: {
                        bottom: u.rect.bottom,
                        left: s.left,
                        right: u.endLineLeft,
                        top: u.rect.bottom - p.lineHeight,
                        height: p.lineHeight,
                        width: u.endLineLeft - s.left
                    },
                    data: PropUpdateHelper.set(h, "charIndex", h.numOfChar)
                }),
                _.reverse(i)
            }
            i.push({
                rect: u.rect,
                data: h
            });
            c = u.rect.left
        }
        return _.reverse(i)
    }
    getNextBlockRectsInLine(e, t, n, r) {
        var a = [];
        var i = DOMHelper.getElementRect(n);
        var s = r;
        var c = t + 1;
        for (; c < e.length; c++) {
            var d = e[c];
            var h = this.getGeoBlock(d);
            if (h.startLineLeft + 2 < s) return a;
            if (h.isMultiline) {
                var u = h;
                var p = u.lineHeight;
                return a.push({
                    rect: {
                        bottom: h.rect.top + p,
                        left: u.startLineLeft,
                        right: i.right,
                        top: h.rect.top,
                        height: u.lineHeight,
                        width: i.right - u.startLineLeft
                    },
                    data: PropUpdateHelper.set(d, "charIndex", 0)
                }),
                a
            }
            a.push({
                rect: h.rect,
                data: d
            });
            s = h.rect.right
        }
        return a
    }
    hasPreviousLine(e, t) {
        return !this.isRangeSameLine(e.startRange, t)
    }
    hasNextLine(e, t) {
        return !this.isRangeSameLine(e.endRange, t)
    }
    isRangeSameLine(e, t) {
        var n = e.computedRangeRect;
        var r = t.computedRangeRect;
        return Math.abs(n.top - r.top) <= 3 && Math.abs(n.bottom - r.bottom) <= 3
    }
}

export default Searching