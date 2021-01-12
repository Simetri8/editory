import _ from 'lodash';
import jQuery from 'jquery';
// Not found 'var' for: import  from '../Elements/BlockUtils';
import BlockHelper from '../Elements/BlockHelper';
import CheckObject from '../Editor/CheckObject';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import SelectionBuilder from './SelectionBuilder';
import TabularHelper from '../Tabular/TabularHelper';
import TextUtils from '../Editor/TextUtils';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1590) /*FindReplaceHandler*/

/// var r = n(3)/*_.assignIn*/;  // 0 times
/// var m = n(4)/*DOMHelper*/;  // 4 times
/// var C = n(2)/*lodash*/;  // 7 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 0 times
/// var Ae = n.n(ye);
/// var I = n(12)/*BlockHelper*/;  // 3 times
/// var L = n(15)/*TabularHelper*/;  // 2 times
/// var w = n(36)/*TextUtils*/;  // 7 times
/// var O = n(13)/*CreateEditorObject*/;  // 1 times
/// var k = n(6)/*DiagramIdHelper*/;  // 1 times
/// var W = n(31)/*CheckObject*/;  // 6 times
/// var pe = n(58)/*BlockUtils*/;  // 0 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 2 times
var It = new class {
    blockStillTextModeFromRoot(e) {
        return "composite" == e.type && e.elements && ("\\table" == e.text || "\\theorem" == e.text || "\\latex-table" == e.text || "\\text-mode-group" == e.text || "\\underline-section" == e.text || "\\text-mode-group-inline" == e.text || "\\image-container" == e.text);
    }
    blockStillTextModeFromRootIncludeDiagram(e) {
        return this.blockStillTextModeFromRoot(e) || "composite" == e.type && e.elements && "\\table" == e.text;
    }
};
var Tt = 1e3;
var FindManagement = new class {
    getFindResultPositionFromIndex(e, t) {
        return this.countingFromFindResult(e, {
            count: 0
        },
        t);
    }
    countingFromFindResult(e, t, n) {
        var r = 0;
        for (; r < e.length; r++) {
            if (t.count === n) {
                return this.getFirstMostNested(e, r);
            }
            var a = e[r];
            if (a.from && a.to) {
                t.count++;
            } else {
                var i = this.countingFromFindResult(a.children, t, n);
                if (i) {
                    return {
                        resultIndex: r,
                        nestedPosition: i
                    };
                }
            }
        }
    }
    getFindResultFromPosition(e, t) {
        var n = e[t.resultIndex];
        if (!t.nestedPosition) {
            return {
                from: n.from,
                to: n.to,
                key: n.key
            };
        }
        var r = this.getFindResultFromPosition(n.children, t.nestedPosition);
        return {
            lineIndex: n.lineIndex,
            charIndex: n.charIndex,
            key: n.key,
            children: [r]
        };
    }
    findNext(e, t) {
        return this.innerFindNext(e.results, t, true);
    }
    innerFindNext(e, t, n) {
        if (!t.nestedPosition) {
            return (r = t.resultIndex + 1) < e.length ? this.getFirstMostNested(e, r) : n ? this.getFirstMostNested(e, 0) : null;
        }
        var r;
        var a = e[t.resultIndex];
        var i = this.innerFindNext(a.children, t.nestedPosition, false);
        return i ? {
            resultIndex: t.resultIndex,
            nestedPosition: i
        } : (r = t.resultIndex + 1) < e.length ? this.getFirstMostNested(e, r) : n ? this.getFirstMostNested(e, 0) : null;
    }
    findPrevious(e, t) {
        return this.innerFindPrevious(e.results, t, true);
    }
    innerFindPrevious(e, t, n) {
        if (!t.nestedPosition) {
            return (r = t.resultIndex - 1) >= 0 ? this.getLastMostNested(e, r) : n ? this.getFirstMostNested(e, e.length - 1) : null;
        }
        var r;
        var a = e[t.resultIndex];
        var i = this.innerFindPrevious(a.children, t.nestedPosition, false);
        return i ? {
            resultIndex: t.resultIndex,
            nestedPosition: i
        } : (r = t.resultIndex - 1) >= 0 ? this.getLastMostNested(e, r) : n ? this.getLastMostNested(e, e.length - 1) : null;
    }
    getFirstMostNested(e, t) {
        var n = e[t];
        return n.children ? {
            resultIndex: t,
            nestedPosition: this.getFirstMostNested(n.children, 0)
        } : {
            resultIndex: t
        };
    }
    getLastMostNested(e, t) {
        var n = e[t];
        return n.children ? {
            resultIndex: t,
            nestedPosition: this.getLastMostNested(n.children, n.children.length - 1)
        } : {
            resultIndex: t
        };
    }
    analyzeReplacementInfo(e, t, n) {
        var r = null;
        r = _.isString(t) ? [CreateEditorObject.createTextBlock(t)] : t;
        var a = [{
            id: DiagramIdHelper.nextId(),
            blocks: r
        }];
        return {
            repeatInReplacement: ("plain-text" == n ? this.findText(a, e) : this.findMath(a, e, false)).total
        };
    }
    find(e, t, n) {
        return "plain-text" == n ? this.findText(e, t) : this.findMath(e, t, true);
    }
    findText(e, t) {
        if (!t) {
            return {
                total: 0,
                results: []
            };
        }
        t = t.toLowerCase();
        var n = {
            total: 0
        };
        try {
            var r = [];
            return this.findTextLines(e, t, TextUtils.getUnistringUncached(t), void 0, r, n),
            {
                total: n.total,
                results: r
            };
        } catch(e) {
            if ("limited" == e.message) {
                return {
                    total: n.total,
                    results: r
                };
            }
            throw e;
        }
    }
    findMath(e, t) {
        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        var r = [];
        var a = {
            total: 0
        };
        if (!t) {
            return {
                total: 0,
                results: []
            };
        }
        try {
            return _.isString(t) ? (t = t.toLowerCase(), this.findMathLines(e, t, TextUtils.getUnistringUncached(t), void 0, r, n, a)) : (t = _.cloneDeep(t), this.addUnicodeInfo(t), this.findMathLinesByBlocks(e, t, void 0, r, n, a)),
            {
                total: a.total,
                results: r
            };
        } catch(e) {
            if ("limited" == e.message) {
                return {
                    total: a.total,
                    results: r
                };
            }
            throw e;
        }
    }
    addUnicodeInfo(e) {
        e.forEach((e) => {
            if (e.type == null) {
                e.___textUnicode = TextUtils.getUnistringUncached(e.text);
            }
        });
    }
    deepBlockContentCompare(e, t) {
        if (e.type != t.type) {
            return false;
        }
        if (e.text != t.text) {
            return false;
        }
        if (!CheckObject.isComposite(e)) {
            return true;
        }
        if (e.bracket != t.bracket) {
            return false;
        }
        var n = _.keys(e.elements);
        if (n.length != _.keys(t.elements).length) {
            return false;
        }
        var r = 0;
        for (; r < n.length; r++) {
            var a = n[r];
            var i = e.elements[a];
            var o = t.elements[a];
            if (i.lines.length != o.lines.length) {
                return false;
            }
            var s = 0;
            for (; s < i.lines.length; s++) {
                var l = i.lines[s];
                var c = o.lines[s];
                if (l.blocks.length != c.blocks.length) {
                    return false;
                }
                var d = 0;
                for (; d < l.blocks.length; d++) {
                    var h = l.blocks[d];
                    var u = c.blocks[d];
                    if (!this.deepBlockContentCompare(h, u)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    findMathLinesByBlocks(e, t, n, r, a, i) {
        function d() {
            if (0 !== o) {
                o = 0;
                s = t[0].type == null;
                l = void 0;
                c = 0;
            }
        }
        if (0 != t.length) {
            if (1 === t.length && t[0].type == null) {
                return this.findMathLines(e, t[0].text.toLowerCase(), TextUtils.getUnistringUncached(t[0].text), n, r, a, i);
            }
            var o;
            var s;
            var l = void 0;
            var c = 0;
            d();
            e.forEach((e, h) => {
                var u = "";
                var p = void 0;
                d();
                BlockHelper.blockEach(e, (m, f, g, y) => {
                    if (!m.type == null) {
                        var A = It.blockStillTextModeFromRoot(m);
                        var E = m.elements;
                        var v = [];
                        if (CheckObject.isDiagramBlock(m)) {
                            this.getElementKeys(m).forEach((e) => {
                                var n = E[e].isTextMode;
                                this.findMathLinesByBlocks(E[e].lines, t, e, v, n, i);
                            });
                        } else {
                            this.getElementKeys(m).forEach((e) => {
                                return this.findMathLinesByBlocks(E[e].lines, t, e, v, A, i);
                            });
                        }
                        if (v.length > 0) {
                            r.push({
                                key: n,
                                lineIndex: h,
                                charIndex: g,
                                children: v
                            });
                        }
                    }
                    if (!a) {
                        if (m.type == null) {
                            if (s) {
                                u = u + m.text.toLowerCase();
                                if (void 0 === p) {
                                    p = g;
                                }
                            } else {
                                d();
                            }
                        }
                        var S = f === e.blocks.length - 1;
                        if (!m.type == null || S) {
                            if (s && !u) {
                                return void d();
                            }
                            var C = TextUtils.getUnistringUncached(u);
                            if (s) {
                                var x = 0 === o;
                                var I = o < t.length - 1;
                                var T = o === t.length - 1;
                                var b = t[o].text.toLowerCase();
                                var L = t[o].___textUnicode;
                                if (x && u.endsWith(b)) {
                                    o++;
                                    s = false;
                                    l = p + C.length - L.length;
                                } else {
                                    if (I && u === b) {
                                        o++;
                                        s = false;
                                    } else {
                                        if (T && u.startsWith(b)) {
                                            o++;
                                            s = false;
                                            c = p + L.length - 1;
                                        }
                                    }
                                }
                                if (o >= t.length) {
                                    i.total++;
                                    r.push({
                                        key: n,
                                        from: {
                                            lineIndex: h,
                                            charIndex: l || 0
                                        },
                                        to: {
                                            lineIndex: h,
                                            charIndex: c
                                        }
                                    });
                                    d();
                                }
                            }
                            if (!s) {
                                if (this.deepBlockContentCompare(t[o], m)) {
                                    o++;
                                    if (void 0 === l) {
                                        l = g;
                                    }
                                } else {
                                    d();
                                }
                                if (o >= t.length) {
                                    i.total++;
                                    r.push({
                                        key: n,
                                        from: {
                                            lineIndex: h,
                                            charIndex: l
                                        },
                                        to: {
                                            lineIndex: h,
                                            charIndex: y
                                        }
                                    });
                                    d();
                                } else {
                                    s = t[o].type == null;
                                }
                            }
                            u = "";
                            p = void 0;
                        }
                    }
                });
            });
        }
    }
    findMathLines(e, t, n, r, a, i, o) {
        if (t) {
            var s = 0;
            e.forEach((e, l) => {
                var c = "";
                var d = void 0;
                BlockHelper.blockEach(e, (h, u, p) => {
                    if (h.type == null && !i && (c = c + h.text.toLowerCase(), void 0 === d && (d = p)), !h.type == null) {
                        var m = CheckObject.isTable(h) || CheckObject.isTheorem(h);
                        var f = h.elements;
                        var g = [];
                        if (CheckObject.isDiagramBlock(h)) {
                            this.getElementKeys(h).forEach((e) => {
                                var r = f[e].isTextMode;
                                this.findMathLines(f[e].lines, t, n, e, g, r, o);
                            });
                        } else {
                            this.getElementKeys(h).forEach((e) => {
                                return this.findMathLines(f[e].lines, t, n, e, g, m, o);
                            });
                        }
                        if (g.length > 0) {
                            a.push({
                                key: r,
                                lineIndex: l,
                                charIndex: p,
                                children: g
                            });
                        }
                    }
                    if (c && (!h.type == null || u === e.blocks.length - 1)) {
                        var y;
                        var A = 0;
                        var E = TextUtils.getUnistringUncached(c);
                        for (;
                        (y = c.indexOf(t, A)) >= 0;) {
                            if (++s > Tt) {
                                throw new Error("limited");
                            }
                            var v = E.getClusterIndexFromUTF16Index(y);
                            var S = d + v;
                            var C = d + v + n.length - 1;
                            o.total++;
                            a.push({
                                key: r,
                                from: {
                                    lineIndex: l,
                                    charIndex: S
                                },
                                to: {
                                    lineIndex: l,
                                    charIndex: C
                                }
                            });
                            A = y + t.length;
                        }
                        c = "";
                        d = void 0;
                    }
                });
            });
        }
    }
    getElementKeys(e) {
        if (e.row && e.column) {
            var t = e;
            return _.keys(e.elements).filter((e) => {
                if (!TabularHelper.isKeyInTabularFormat(e)) {
                    return true;
                }
                var n = TabularHelper.getTabularCellIndexFromKey(e);
                var r = n.row;
                var a = n.column;
                return r < t.row && a < t.column;
            });
        }
        return _.keys(e.elements).filter((t) => {
            return e.elements[t];
        });
    }
    findTextLines(e, t, n, r, a, i) {
        if (t) {
            var o = 0;
            e.forEach((e, s) => {
                var l = "";
                var c = void 0;
                BlockHelper.blockEach(e, (d, h, u) => {
                    if (It.blockStillTextModeFromRootIncludeDiagram(d)) {
                        var p = [];
                        var m = d.elements;
                        if (CheckObject.isDiagramBlock(d)) {
                            this.getElementKeys(d).forEach((e) => {
                                if (m[e].isTextMode) {
                                    this.findTextLines(d.elements[e].lines, t, n, e, p, i);
                                }
                            });
                        } else {
                            this.getElementKeys(d).forEach((e) => {
                                var r = d.elements[e];
                                if (r) {
                                    this.findTextLines(r.lines, t, n, e, p, i);
                                }
                            });
                        }
                        if (p.length > 0) {
                            a.push({
                                key: r,
                                lineIndex: s,
                                charIndex: u,
                                children: p
                            });
                        }
                    } else {
                        if (d.type == null) {
                            l = l + d.text.toLowerCase();
                            if (void 0 === c) {
                                c = u;
                            }
                        }
                    }
                    if (l && (!d.type == null || h === e.blocks.length - 1)) {
                        var f;
                        var g = 0;
                        var y = TextUtils.getUnistringUncached(l);
                        for (;
                        (f = l.indexOf(t, g)) >= 0;) {
                            if (++o > Tt) {
                                throw new Error("limited");
                            }
                            var A = y.getClusterIndexFromUTF16Index(f);
                            var E = c + A;
                            var v = c + A + n.length - 1;
                            i.total++;
                            a.push({
                                key: r,
                                from: {
                                    lineIndex: s,
                                    charIndex: E
                                },
                                to: {
                                    lineIndex: s,
                                    charIndex: v
                                }
                            });
                            g = f + t.length;
                        }
                        l = "";
                        c = void 0;
                    }
                });
            });
        }
    }
};
class FindReplaceHandler {
    constructor(e) {
        this.target = e;
        this.incrementFindDelayRunObj = TimerHelper.createLaterRunObject("latest", "a-little-while");
        this.runIncrementFindDelayFunc = () => {
            var e;
            var t;
            var n = this.lastFindInfo;
            var r = n.mode;
            var a = n.searchInfo;
            var i = n.inReplacing;
            var o = FindManagement.find(this.target.state.mainModel.lines, a, r);
            if (i) {
                var s = FindManagement.analyzeReplacementInfo(a, this.lastFindInfo.replaceInfo, r);
                console.log("analyzed:", s);
                e = this.target.getRegionHighlight().getSelectedInfo().currentIndexPosition;
                if ((e = e + s.repeatInReplacement) >= o.total) {
                    e = 0;
                }
            }
            if (this.target.getRegionHighlight()) {
                var l = DOMHelper.getElementRect(this.target.getMathTypeHtmlElement());
                t = this.target.getRegionHighlight().fromFindResult(o, this.target.getEditorHtmlElement(), l, {
                    isIncremental: true,
                    indexSuggestion: e,
                    requestScroll: this.lastFindInfo.requestScroll
                });
            }
            if (this.target.props.onIncrementalFindInfoChanged) {
                this.target.props.onIncrementalFindInfoChanged({
                    index: t,
                    result: o
                });
            }
            this.lastFindInfo = {
                searchInfo: a,
                mode: r,
                searchResult: o
            };
        };
    }
    find(e, t) {
        var n;
        var r;
        if (n = "plain-text" == t ? FindManagement.findText(this.target.state.mainModel.lines, e) : FindManagement.findMath(this.target.state.mainModel.lines, e, true), this.lastFindInfo = {
            searchInfo: e,
            mode: t,
            searchResult: n
        },
        this.target.getRegionHighlight()) {
            var a = DOMHelper.getElementRect(this.target.getMathTypeHtmlElement());
            r = this.target.getRegionHighlight().fromFindResult(n, this.target.getEditorHtmlElement(), a);
        }
        return {
            result: n,
            index: r
        };
    }
    findNext() {
        if (this.target.getRegionHighlight()) {
            return this.target.getRegionHighlight().findNext(DOMHelper.getElementRect(this.target.getMathTypeHtmlElement()));
        }
    }
    findPrevious() {
        if (this.target.getRegionHighlight()) {
            return this.target.getRegionHighlight().findPrevious(DOMHelper.getElementRect(this.target.getMathTypeHtmlElement()));
        }
    }
    requestReplace(e, t) {
        if (this.lastFindInfo) {
            var n = this.lastFindInfo;
            var r = n.mode;
            var a = n.searchResult;
            if (! (a.total <= 0)) {
                if (t != r) {
                    throw new Error("unexpected mode");
                }
                var i = this.target.getRegionHighlight().getSelectedInfo();
                if (i.currentFindPosition) {
                    var o = SelectionBuilder.buildCursorSelectedFindResultPosition(a.results, i.currentFindPosition);
                    console.log("range:", o);
                    this.lastFindInfo.inReplacing = true;
                    this.lastFindInfo.delay = 10;
                    this.lastFindInfo.scrollToView = true;
                    this.lastFindInfo.replaceInfo = e;
                    var s = this.target.getController().replaceSearch(this.target.state.mainModel, "plain-text" == t, o.from, o.to, e);
                    this.lastFindInfo.requestScroll = true;
                    this.target.handleResult(s);
                }
            }
        }
    }
    delayIncrementalFind(e) {
        if (this.lastFindInfo && this.target.getRegionHighlight() && this.target.getRegionHighlight().isInHighlightMode()) {
            var t = e ? 0 : 100;
            this.incrementFindDelayRunObj.later(this.runIncrementFindDelayFunc, void 0 === this.lastFindInfo.delay ? t : this.lastFindInfo.delay);
        }
    }
    requestReplaceAll(e, t) {
        if (this.lastFindInfo) {
            var n = this.lastFindInfo;
            var r = n.mode;
            var a = n.searchResult;
            var i = n.searchInfo;
            if (! (a.total <= 0)) {
                if (t != r) {
                    throw new Error("unexpected mode");
                }
                if (this.target.getRegionHighlight().getSelectedInfo().currentFindPosition) {
                    var o;
                    var s = a.total;
                    var l = this.target.state.mainModel;
                    var c = a;
                    var d = 0;
                    var h = FindManagement.getFindResultPositionFromIndex(c.results, 0);
                    var u = FindManagement.analyzeReplacementInfo(i, e, r);
                    var p = 0;
                    for (; p < s; p++) {
                        var m = SelectionBuilder.buildCursorSelectedFindResultPosition(c.results, h);
                        l = (o = this.target.getController().replaceSearch(l, "plain-text" == t, m.from, m.to, e)).editorChangeInfo.model;
                        c = FindManagement.find(l.lines, i, r);
                        d = d + u.repeatInReplacement;
                        h = FindManagement.getFindResultPositionFromIndex(c.results, d);
                    }
                    this.target.needFocusAcquire();
                    this.target.needPreventScroll();
                    this.target.handleResult(o);
                    this.lastFindInfo.delay = 0;
                }
            }
        }
    }
    closeFindSession() {
        if (this.target.getRegionHighlight()) {
            this.target.getRegionHighlight().closeFindSession();
            this.lastFindInfo = null;
        }
    }
}
/*n.d(t, "a", function () {
    return FindReplaceHandler;
});*/
/*n.d(t, "FindManagement", function () {
    return FindManagement;
});*/

export { FindManagement }

export default FindReplaceHandler