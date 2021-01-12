import _ from 'lodash';
import jQuery from 'jquery';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BlockHelper from '../Elements/BlockHelper';
import BlockUtils from '../Elements/BlockUtils';
import DOMHelper from '../Elements/DOMHelper';
import LineHelper from '../Editor/LineHelper';
import RectangleHelper from '../Geometry/RectangleHelper';
import SelectionFinder from './SelectionFinder';
import SelectionJoint from './SelectionJoint';
import TextUtils from '../Editor/TextUtils';

/// xxx(1656) /*SelectionBuilder*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var m = n(4)/*DOMHelper*/;  // 22 times
/// var C = n(2)/*lodash*/;  // 9 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 1 times
/// var Ae = n.n(ye);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var w = n(36)/*TextUtils*/;  // 3 times
/// var P = n(80)/*LineHelper*/;  // 2 times
/// var ne = n(43)/*ArrayHelper*/;  // 2 times
/// var ce = n(46)/*RectangleHelper*/;  // 2 times
/// var pe = n(58)/*BlockUtils*/;  // 1 times
/// var SelectionJoint = n(1657)/*SelectionJoint*/;  // 2 times
/// var SelectionFinder = n(1658)/*SelectionFinder*/;  // 1 times
class qe {
    static fromEmptyLine(e, t) {
        var n = DOMHelper.getElementRect(e);
        var r = DOMHelper.getElementRect(e.firstElementChild);
        return (new qe).withLTWH(r.left, n.top, 1, n.height).withAnchor(t).build();
    }
    static fromWidthHeight(e, t, n, r) {
        return (new qe).withLTWH(e, t, n, r).build();
    }
    static fromRightBottom(e, t, n, r) {
        return (new qe).withLTRB(e, t, n, r).build();
    }
    withLTWH(e, t, n, r) {
        return this.innerLeft = e,
        this.innerTop = t,
        this.innerWidth = n,
        this.innerHeight = r,
        this;
    }
    withLTRB(e, t, n, r) {
        return this.innerLeft = e,
        this.innerTop = t,
        this.innerRight = n,
        this.innerBottom = r,
        this;
    }
    withAnchor(e) {
        return this.anchor = e,
        this;
    }
    build() {
        var e = null == this.innerRight ? this.innerLeft + this.innerWidth : this.innerRight;
        var t = null == this.innerBottom ? this.innerTop + this.innerHeight : this.innerBottom;
        var n = null == this.innerWidth ? this.innerRight - this.innerLeft : this.innerWidth;
        var r = null == this.innerHeight ? this.innerBottom - this.innerTop : this.innerHeight;
        var a = this.innerLeft;
        var i = this.innerTop;
        return this.anchor && (e = (a = a - this.anchor.left) + n, t = (i = i - this.anchor.top) + r),
        {
            left: a,
            top: i,
            width: n,
            height: r,
            right: e,
            bottom: t
        };
    }
}
var Qe = new class {
    visitEditor(e) {
        var t = e.editorSelected;
        var n = e.extendedEditorSelected;
        var r = e.obj;
        var a = e.findSelectedEditor;
        var i = e.processEditor;
        var o = new SelectionJoint(t, n);
        if (o.isSameRoute() && t.selected) {
            var s = a(r, t.lineIndex, t.charIndex, t.key);
            return s ? this.visitEditor({
                editorSelected: t.selected,
                extendedEditorSelected: n.selected,
                obj: s,
                findSelectedEditor: a,
                processEditor: i
            }) : null;
        }
        return i(o, r);
    }
};
var SelectionBuilder = new class {
    getLeafSelected(e) {
        return null == e.selected ? e : this.getLeafSelected(e.selected);
    }
    getLeafEditor(e, t) {
        if (null == t.selected) {
            return e;
        }
        var n = this.getNestedEditor(e, t);
        return this.getLeafEditor(n, t.selected);
    }
    getNestedEditor(e, t) {
        var n = t.lineIndex;
        var r = t.charIndex;
        var a = t.key;
        return BlockHelper.blockFromIndex(e.lines[n], r).block.elements[a];
    }
    buildSelectionRectsFromEditor(e) {
        if ("text-selection" == e.type) {
            var t = e.rootEditor;
            var n = e.selected;
            var r = e.extendSelected;
            var a = e.elementToCalculate;
            var i = DOMHelper.getElementRect(a);
            return Qe.visitEditor({
                editorSelected: n,
                extendedEditorSelected: r,
                obj: t,
                findSelectedEditor: (e, t, n, r) => {
                    return this.getCompositeBlock(e, t, n).reactInstance.refMap[r].editor;
                },
                processEditor: (e, t) => {
                    return this.buildSelectionRects(t, e, i);
                }
            });
        }
        if ("list-type-selection" == e.type) {
            var o = e.rootEditor;
            var s = e.selected;
            var l = e.leafSelected;
            var c = e.elementToCalculate;
            var d = DOMHelper.getElementRect(c);
            var h = SelectionFinder.findLine(o, s);
            if ("single" == l.listTypeSelect) {
                return [this.findPrefixRectForLine(h, d)];
            }
            var u = LineHelper.expandRelatedListItemHtmlLines(h);
            return "level" == l.listTypeSelect ? LineHelper.findHtmlLinesSameLevel(h, u).map((e) => {
                return this.findPrefixRectForLine(e, d);
            }) : u.map((e) => {
                return this.findPrefixRectForLine(e, d);
            });
        }
        return [];
    }
    findPrefixRectForLine(e, t) {
        var n = jQuery(e).find(">x-prefix");
        if (0 === n.length) {
            throw new Error("must have prefix for line");
        }
        return DOMHelper.findRectElementToRect(n.get(0), t);
    }
    buildCursorSelectedFindResultPosition(e, t) {
        var n = {
            from: {
                lineIndex: 0,
                charIndex: 0
            },
            to: {
                lineIndex: 0,
                charIndex: 0
            }
        };
        return this.innerBuildCursorSelectedFindResultPosition(e, t, n.from, n.to),
        n;
    }
    innerBuildCursorSelectedFindResultPosition(e, t, n, r) {
        var a = e[t.resultIndex];
        if (t.nestedPosition) {
            n.lineIndex = a.lineIndex;
            n.charIndex = a.charIndex;
            r.lineIndex = a.lineIndex;
            r.charIndex = a.charIndex;
            n.selected = {
                lineIndex: 0,
                charIndex: 0
            };
            r.selected = {
                lineIndex: 0,
                charIndex: 0
            };
            var i = this.innerBuildCursorSelectedFindResultPosition(a.children, t.nestedPosition, n.selected, r.selected);
            n.key = i;
            r.key = i;
        } else {
            n.lineIndex = a.from.lineIndex;
            n.charIndex = a.from.charIndex;
            r.lineIndex = a.to.lineIndex;
            r.charIndex = a.to.charIndex + 1;
        }
        return a.key;
    }
    buildRectsFromFindResults(e, t, n) {
        var r = [];
        return this.innerBuildRectsFromFindResults(e, t, n, r),
        r;
    }
    innerBuildRectsFromFindResults(e, t, n, r) {
        var a = {};
        var i = 0;
        for (; i < t.length; i++) {
            var o = t[i];
            r.push({
                fromLineIndex: void 0 !== o.lineIndex ? o.lineIndex : o.from.lineIndex,
                rects: this.buildRectsFromLineResult(o, e, n, a)
            });
        }
    }
    buildRectsFromLineResult(e, t, n, r) {
        var a = [];
        if (e.from && e.to && (a = a.concat(this.buildNonTabularRects(t, {
            fromLineIndex: e.from.lineIndex,
            fromCharIndex: e.from.charIndex,
            toLineIndex: e.to.lineIndex,
            toCharIndex: e.to.charIndex + 1
        },
        n, r))), e.children) {
            var i = this.getCompositeBlock(t, e.lineIndex, e.charIndex);
            e.children.forEach((e) => {
                var t = i.reactInstance.refMap[e.key].editor;
                a = a.concat(this.buildRectsFromLineResult(e, t, n, {}));
            });
        }
        return a;
    }
    getCompositeBlock(e, t, n) {
        var r = DOMHelper.findEditLines(e)[t];
        var a = BlockUtils.findSelectedBlock(r, n);
        return a.sub && (a = a.sub),
        a.element;
    }
    buildRectsForTabularSelect(e, t, n) {
        var r = t.getTabularSelectedKeys();
        var a = this.getCompositeBlock(e, t.fromLineIndex, t.fromCharIndex);
        return _.flatMap(r, (e) => {
            var t = a.reactInstance.getEditorDomByKey(e);
            return t ? [RectangleHelper.getRelativeRect(DOMHelper.getElementRect(t), n)] : [];
        });
    }
    buildSelectionRects(e, t, n) {
        return t.isTabularRoute() ? this.buildRectsForTabularSelect(e, t, n) : this.isEmptySelection(t) ? [] : this.buildNonTabularRects(e, t, n);
    }
    buildNonTabularRects(e, t, n, r) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.buildSelectionInSingleCharBlock(e, n, t.fromCharIndex, t.toCharIndex);
        }
        var a = this.buildFirstAndLastRects(e, t, n, r);
        if ("all" == a.type) {
            return a.firstRects.concat(a.lastRects);
        }
        if (a.firstRects.length <= 0 || a.lastRects.length <= 0) {
            return a.firstRects.concat(a.lastRects);
        }
        var i = _.maxBy(a.firstRects, (e) => {
            return e.bottom;
        }).bottom;
        var o = _.minBy(a.lastRects, (e) => {
            return e.top;
        }).top;
        var s = this.buildMiddleRect(n, e, i, o);
        return s ? a.firstRects.concat([s]).concat(a.lastRects) : a.firstRects.concat(a.lastRects);
    }
    buildMiddleRect(e, t, n, r) {
        if (n + 2 < r) {
            var a = DOMHelper.getElementRect(t);
            var i = a.left - e.left;
            return qe.fromRightBottom(i, n, i + a.width, r);
        }
        return null;
    }
    findRectIncludingMargin(e, t) {
        var n = DOMHelper.findRectElementToRect(e, t);
        var r = window.getComputedStyle(e);
        var a = n.left - this.parseOrZero(r.marginLeft);
        var i = n.top - this.parseOrZero(r.marginTop);
        var o = n.right + this.parseOrZero(r.marginRight);
        var s = n.bottom + this.parseOrZero(r.marginBottom);
        return {
            left: a,
            top: i,
            right: o,
            bottom: s,
            width: o - a,
            height: s - i
        };
    }
    parseOrZero(e) {
        var t = Number.parseFloat(e);
        return Number.isNaN(t) ? 0 : t;
    }
    buildRectsFromLine(e, t, n, r) {
        var a = DOMHelper.findBlocks(e);
        if (0 === a.length) {
            var i = DOMHelper.getEmptyBlock(e);
            return [DOMHelper.findRectElementToRect(i, r)];
        }
        var o = 0;
        var s = ArrayHelper.emptyArr;
        var l = 0;
        for (; l < a.length; l++) {
            var c = a[l];
            var d = DOMHelper.isNonChar(c);
            var h = TextUtils.getUnistring(c);
            var u = d ? 1 : h.length;
            if (o + u <= t) {
                o = o + u;
            } else {
                if (d) {
                    if (s = s.concat([this.findRectIncludingMargin(c, r)]), (o = o + 1) >= n) {
                        break;
                    }
                } else {
                    var p = Math.max(0, t - o);
                    var f = Math.min(n - o, u);
                    if (0 === p && f === u) {
                        s = s.concat(DOMHelper.findRectsElementToRect(c, r));
                    } else {
                        var g = DOMHelper.rangeFrom2Indexes(c, h.rawIndexAt(p), h.rawIndexAt(f));
                        var y = DOMHelper.findRectsElementToRect(g, r);
                        s = s.concat(y);
                    }
                    if ((o = o + u) >= n) {
                        break;
                    }
                }
            }
        }
        if (0 === s.length && n >= o) {
            if ("ltr" == DOMHelper.getTextDirectionFromLine(e)) {
                var A = _.last(_.last(a).getClientRects());
                return [{
                    left: A.right - r.left,
                    right: A.right - r.left + 2,
                    width: 2,
                    top: A.top - r.top,
                    bottom: A.bottom - r.top,
                    height: A.height
                }];
            }
            var E = a.map((e) => {
                return {
                    r: DOMHelper.getElementRect(e),
                    b: e
                };
            });
            var v = _.orderBy(E, [(e) => {
                return e.r.bottom;
            },
            (e) => {
                return e.r.right;
            }], ["desc", "desc"]);
            var S = _.last(v).b;
            var C = _.last(S.getClientRects());
            return [{
                left: C.right - r.left,
                right: C.right - r.left + 2,
                width: 2,
                top: C.top - r.top,
                bottom: C.bottom - r.top,
                height: C.height
            }];
        }
        return this.joinRects(s);
    }
    joinRects(e) {
        if (0 === e.length) {
            return e;
        }
        var t = [];
        t.push(e[0]);
        var n = 1;
        for (; n < e.length; n++) {
            var r = e[n];
            var i = t[t.length - 1];
            if (this.equalTolerate(r.left, i.right) && this.equalTolerate(r.top, i.top) && this.equalTolerate(r.bottom, i.bottom)) {
                t[t.length - 1] = _.assignIn({},
                i, {
                    right: r.right,
                    width: r.right - i.left
                });
            } else {
                if (this.equalTolerate(r.left, i.right)) {
                    t[t.length - 1] = _.assignIn({},
                    i, {
                        right: r.left + .5,
                        width: r.left - i.left + .5
                    });
                    t.push(r);
                } else {
                    t.push(r);
                }
            }
        }
        return t;
    }
    equalTolerate(e, t) {
        return Math.abs(e - t) <= 2;
    }
    buildFirstAndLastRects(e, t, n, r) {
        var a;
        if (r ? (a = r.lines) || (a = DOMHelper.findEditLines(e), r.lines = a) : a = DOMHelper.findEditLines(e), t.fromLineIndex === t.toLineIndex) {
            return {
                type: "all",
                firstRects: this.buildRectsFromLine(a[t.fromLineIndex], t.fromCharIndex, t.toCharIndex, n),
                lastRects: ArrayHelper.emptyArr
            };
        }
        var i = a[t.fromLineIndex];
        var o = a[t.toLineIndex];
        var s = this.buildRectsFromLine(i, t.fromCharIndex, Number.MAX_SAFE_INTEGER, n);
        var l = this.buildRectsFromLine(o, 0, t.toCharIndex, n);
        return Math.abs(t.toLineIndex - t.fromLineIndex) <= 1 ? {
            type: "all",
            firstRects: s,
            lastRects: l
        } : {
            type: "partial",
            firstRects: s,
            lastRects: l
        };
    }
    buildSelectionInSingleCharBlock(e, t, n, r) {
        var a = DOMHelper.rangeFrom2Indexes(e, TextUtils.rawIndexAt(e, n), TextUtils.rawIndexAt(e, r)).getClientRects();
        return _.map(a, (e) => {
            return RectangleHelper.getRelativeRect(e, t);
        });
    }
    isEmptySelection(e) {
        return e.fromLineIndex === e.toLineIndex && e.fromCharIndex === e.toCharIndex;
    }
    isSameRoute(e, t) {
        return e.lineIndex === t.lineIndex && e.charIndex === t.charIndex && e.key === t.key && !!e.selected == !!t.selected && (!e.selected && !t.selected || this.isSameRoute(e.selected, t.selected));
    }
    isNoSelectionOrSameRoute(e, t) {
        return !e || !t || this.isSameRoute(e, t);
    }
    getFirstSelected(e, t) {
        return this.isNoSelectionOrSameRoute(e, t) ? e || t : (new SelectionJoint(e, t)).fromSelected;
    }
};
/*n.d(t, "a", function () {
    return SelectionBuilder;
})*/

export default SelectionBuilder