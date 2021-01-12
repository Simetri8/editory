import _ from 'lodash';
import BlockHelper from '../../Elements/BlockHelper';
import CheckComponent from '../../Editor/CheckComponent';
import CheckObject from '../../Editor/CheckObject';
import CreateEditorObject from '../../Elements/CreateEditorObject';
import DiagramIdHelper from '../../Elements/DiagramIdHelper';
import LineHelper from '../../Editor/LineHelper';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import StyleHelper from '../../Mathcha/StyleHelper';
import TabularBehaviors from '../../Tabular/TabularBehaviors';
import TabularHelper from '../../Tabular/TabularHelper';
import TabularUtils from '../../Tabular/TabularUtils';
import TextUtils from '../../Editor/TextUtils';

/// xxx(1644) /*Controller_G*/

/// var r = n(3)/*_.assignIn*/;  // 19 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 5 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 19 times
/// var T = n(7)/*PropUpdateHelper*/;  // 77 times
/// var b = n(45)/*TabularUtils*/;  // 1 times
/// var L = n(15)/*TabularHelper*/;  // 3 times
/// var M = n(22)/*CheckComponent*/;  // 31 times
/// var w = n(36)/*TextUtils*/;  // 16 times
/// var O = n(13)/*CreateEditorObject*/;  // 6 times
/// var N = n(18)/*StyleHelper*/;  // 20 times
/// var k = n(6)/*DiagramIdHelper*/;  // 5 times
/// var P = n(80)/*LineHelper*/;  // 2 times
/// var tb = n(123)/*TabularBehaviors*/;  // 2 times
/// var W = n(31)/*CheckObject*/;  // 3 times
var D = new class {
    merge(e, t, n, r) {
        return CheckComponent.isPower(t) || CheckComponent.isIndex(t) ? this.handleMergeForPowerIndex(e, t, n, r) : null;
    }
    handleMergeForPowerIndex(e, t, n, r) {
        if (n > 0) {
            var a = e[i = n - 1];
            if (CheckComponent.isIndex(t) && CheckComponent.isPower(a)) {
                return this.appendIndex(a, e, i, r - 1);
            }
            if (CheckComponent.isPower(t) && CheckComponent.isIndex(a)) {
                return this.appendPower(a, e, i, r - 1);
            }
            if (CheckComponent.isPlainIntegralLike(a) && CheckComponent.isPower(t)) {
                return this.appendPowerIndexForIntegralLike(a, e, i, r, "from");
            }
            if (CheckComponent.isPlainIntegralLike(a) && CheckComponent.isIndex(t)) {
                return this.appendPowerIndexForIntegralLike(a, e, i, r, "to");
            }
        }
        if (n < e.length) {
            var i = n;
            if (CheckComponent.isIndex(t) && CheckComponent.isPower(e[i])) {
                return this.appendIndex(e[i], e, i, r);
            }
            if (CheckComponent.isPower(t) && CheckComponent.isIndex(e[i])) {
                return this.appendPower(e[i], e, i, r);
            }
        }
        return null;
    }
    appendPowerIndexForIntegralLike(e, t, n, r, a) {
        var i = PropUpdateHelper.set(e, "elements.from", CreateEditorObject.createEmptyEditor());
        return i = PropUpdateHelper.set(i, "elements.to", CreateEditorObject.createEmptyEditor()),
        {
            blocks: PropUpdateHelper.set(t, n, i),
            selected: {
                lineIndex: void 0,
                charIndex: r - 1,
                key: a,
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            }
        };
    }
    appendPower(e, t, n, r) {
        return this.append("powerValue", e, t, n, r);
    }
    appendIndex(e, t, n, r) {
        return this.append("indexValue", e, t, n, r);
    }
    append(e, t, n, r, a) {
        var i = PropUpdateHelper.set(t, "elements." + e, CreateEditorObject.createEmptyEditor());
        return i = PropUpdateHelper.set(i, "text", "\\power-index"),
        {
            blocks: PropUpdateHelper.set(n, r, i),
            selected: {
                lineIndex: void 0,
                charIndex: a,
                key: e,
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            }
        };
    }
};
var B = new class {
    handleIndentPattern(e, t, n, r) {
        if (r && 1 === t && n.type == null && " " == n.text && 1 === e.blocks.length && e.blocks[0].type == null && "-" == e.blocks[0].text) {
            if (StyleHelper.getLineStyle(e, "listType")) {
                return;
            }
            var a = PropUpdateHelper.setProp(e, "blocks", []);
            return {
                line: a = StyleHelper.setListType(a, "unorder"),
                selected: {
                    lineIndex: void 0,
                    charIndex: 0
                }
            };
        }
        return null;
    }
    handleReplaceTextEnd(e, t, n, r, i, o) {
        if (n <= 0) {
            return null;
        }
        if (e.length > 5) {
            return null;
        }
        if (e.length > 1 && TextUtils.length(t) > 1) {
            return null;
        }
        var s = i.shortcutMatcher.matchSequenceByInsertedOneChar(t, e, n);
        if (!s) {
            return null;
        }
        if ("char-sequence" == s.data.shortcut.type && s.data.shortcut.startAtLineOrWhiteSpace) {
            var l = s.data.shortcut.sequence;
            var c = t.toString() + e;
            var d = n - l.length + 1;
            var h = 0 === d && null == o;
            var u = d > 0 && " " == c[d - 1];
            var p = 0 === d && o && !o.type && " " == o.text[o.text.length - 1];
            if (! (h || u || p)) {
                return;
            }
        }
        var m = i.isTextMode ? s.data.textModeLine && s.data.textModeLine.blocks : s.data.mathModeLine && s.data.mathModeLine.blocks;
        if (!m || 0 === m.length) {
            return null;
        }
        var f = s.replacementInfo.deletedCount;
        var g = i.isTextMode ? s.replacementInfo.textModeInsertedCount : s.replacementInfo.mathModeInsertedCount;
        var y = i.isTextMode ? s.replacementInfo.singleTextModeTextOnly : s.replacementInfo.singleMathModeTextOnly;
        var A = TextUtils.getUnistring(r);
        if (y) {
            return {
                blocks: [_.assignIn({},
                r, {
                    text: TextUtils.strPslice(r, n + 1 - f, f, m[0].text)
                })],
                shouldNormalizeLine: false,
                charDelta: g - f
            };
        }
        var E = _.assignIn({},
        r, {
            text: TextUtils.unistrPslice(A, n + 1 - f, f, "")
        });
        return E.text ? {
            blocks: CheckComponent.splitBlockAndInsertMultipleModels(E, m, n + 1 - f, i.isTextMode),
            shouldNormalizeLine: true,
            charDelta: g - f
        } : {
            blocks: this.copyFormatForBlocks(r, m, i.isTextMode),
            shouldNormalizeLine: true,
            charDelta: g - f
        };
    }
    handleReplaceFromReplacementOfComposition(e, t, n, r, i) {
        var o = TextUtils.strPsliceWithWithOriginalUniStr(r, e, t, n);
        var s = o.firstSection;
        var l = o.result;
        if (!l) {
            return {
                blocks: [],
                charDelta: -t,
                shouldNormalizeLine: false,
                stopComposition: false
            };
        }
        var c = TextUtils.getUnistringUncached(n);
        var d = i.shortcutMatcher.matchSequence(s, c, s.length + c.length - 1);
        if (!d) {
            return {
                blocks: [PropUpdateHelper.setProp(r, "text", l)],
                charDelta: TextUtils.length(n) - t,
                shouldNormalizeLine: false,
                stopComposition: false
            };
        }
        var h = i.isTextMode ? d.data.textModeLine && d.data.textModeLine.blocks : d.data.mathModeLine && d.data.mathModeLine.blocks;
        if (!h || 0 === h.length) {
            return {
                blocks: [PropUpdateHelper.setProp(r, "text", l)],
                charDelta: c.length - t,
                shouldNormalizeLine: false,
                stopComposition: false
            };
        }
        var u = s.length + c.length;
        var p = TextUtils.getUnistringUncached(l);
        var m = d.replacementInfo.deletedCount;
        var f = i.isTextMode ? d.replacementInfo.textModeInsertedCount : d.replacementInfo.mathModeInsertedCount;
        var g = i.isTextMode ? d.replacementInfo.singleTextModeTextOnly : d.replacementInfo.singleMathModeTextOnly;
        var y = TextUtils.length(n) - t + f - m;
        if (g) {
            return {
                blocks: [PropUpdateHelper.setProp(r, "text", TextUtils.unistrPslice(p, u - m, m, h[0].text))],
                charDelta: y,
                shouldNormalizeLine: false,
                stopComposition: true
            };
        }
        var A = _.assignIn({},
        r, {
            text: TextUtils.unistrPslice(p, u - m, m, "")
        });
        return A.text ? {
            blocks: CheckComponent.splitBlockAndInsertMultipleModels(A, h, u - m, i.isTextMode),
            shouldNormalizeLine: true,
            charDelta: y,
            stopComposition: true
        } : {
            blocks: this.copyFormatForBlocks(A, h, i.isTextMode),
            shouldNormalizeLine: true,
            charDelta: y,
            stopComposition: true
        };
    }
    copyFormatForBlocks(e, t, n) {
        return t.map((t) => {
            return CheckComponent.copyFormatByMode(t, e, n);
        });
    }
};
class F {
    constructor(e, t) {
        this.style = e;
        this.value = t;
    }
    modifyRootStyleForMath(e) {
        return CheckComponent.addRootStyleForMath(e, this.style, this.value);
    }
    modifyStyle(e) {
        return StyleHelper.addStyle(e, this.style, this.value);
    }
    modifyPrefix(e) {
        return LineHelper.getSupportedStyleNames().includes(this.style) ? StyleHelper.addStyleForBulletLine(e, this.style, this.value) : e;
    }
}
class H {
    constructor(e) {
        this.blockStyle = e || {};
    }
    modifyRootStyleForMath(e) {
        return CheckComponent.overriddeRootStyleForMath(e, this.blockStyle);
    }
    modifyStyle(e) {
        return StyleHelper.overrideStyle(e, this.blockStyle);
    }
    modifyPrefix(e) {
        var t = {};
        return LineHelper.getSupportedStyleNames().forEach((e) => {
            t[e] = this.blockStyle[e];
        }),
        t = StyleHelper.normalizeStyle(t),
        _.assignIn({},
        e, {
            style: _.assignIn({},
            e.style, {
                listBulletStyle: t
            })
        });
    }
}
var U = new class {
    extract(e, t) {
        var n = TabularHelper.getMinMaxTabularKeyIndex(t);
        var r = _.assignIn({},
        e, {
            row: n.maxRow - n.minRow + 1,
            column: n.maxCol - n.minCol + 1,
            elements: {}
        });
        var i = n.minRow;
        for (; i <= n.maxRow; i++) {
            var o = n.minCol;
            for (; o <= n.maxCol; o++) {
                var s = TabularHelper.getKeyFromRowCol(i, o);
                var l = t.indexOf(s) >= 0;
                var c = TabularHelper.getKeyFromRowCol(i - n.minRow, o - n.minCol);
                r.elements[c] = l ? e.elements[s] : CreateEditorObject.createEmptyEditor();
            }
        }
        return r = TabularBehaviors.handleExtractTabular(r, n),
        TabularBehaviors.normalizeTabular(r);
    }
};
var G = new class {
    replaceBlock(e, t, n) {
        var r = PropUpdateHelper.set(e.blocks, n, t);
        return PropUpdateHelper.setProp(e, "blocks", r);
    }
    replaceBlockInEditor(e, t, n, r) {
        return PropUpdateHelper.set(e, "lines.".concat(n, ".blocks.").concat(r), t);
    }
    removeCompositeBlockInEditor(e, t, n) {
        var r = PropUpdateHelper.remove(e.lines[t].blocks, n);
        return PropUpdateHelper.set(e, "lines.".concat(t, ".blocks"), r);
    }
    removeBlock(e, t) {
        var n = PropUpdateHelper.remove(e.blocks, t);
        return PropUpdateHelper.setProp(e, "blocks", n);
    }
    splitLineAt(e, t) {
        var n = BlockHelper.blockEach(e, (n, r, a, i) => {
            if (t >= a && t <= i) {
                if (t === a) {
                    var o = e.blocks.slice(0, r);
                    var s = e.blocks.slice(r);
                } else {
                    var l = CheckComponent.splitBlock(n, t - a);
                    o = e.blocks.slice(0, r).concat([l[0]]);
                    s = [l[1]].concat(e.blocks.slice(r + 1));
                }
                return [PropUpdateHelper.setProp(e, "blocks", o), this.cloneLineProperty(e, s)];
            }
        });
        return n || [e, this.cloneLineProperty(e)];
    }
    splitBlockInLine(e, t) {
        var n = BlockHelper.blockEach(e, (n, r, a, i) => {
            if (t >= a && t <= i) {
                if (t === a) {
                    return e;
                }
                var o = CheckComponent.splitBlock(n, t - a);
                return PropUpdateHelper.setProp(e, "blocks", PropUpdateHelper.splice(e.blocks, r, 1, o[0], o[1]));
            }
        });
        return n || e;
    }
    cloneLineProperty(e, t) {
        var n = {
            id: DiagramIdHelper.nextId(),
            blocks: t || [],
            style: e.style ? _.cloneDeep(e.style) : null
        };
        return void 0 !== e.___tempIndentIndex && (n = StyleHelper.setLineStyle(n, "indentIndex", e.___tempIndentIndex)),
        StyleHelper.removeLineStyle(n, "listTypeSkip");
    }
    removeCharAt(e, t) {
        return BlockHelper.blockEach(e, (n, r, a, i) => {
            if (t >= a && t <= i) {
                if (!n.type == null) {
                    var o = PropUpdateHelper.remove(e.blocks, r);
                    return o = this.joinBlocksIfPossible(o, r - 1),
                    PropUpdateHelper.setProp(e, "blocks", o);
                }
                var s = n;
                if (1 === TextUtils.lengthByCache(s)) {
                    return o = PropUpdateHelper.remove(e.blocks, r),
                    o = this.joinBlocksIfPossible(o, r - 1),
                    PropUpdateHelper.setProp(e, "blocks", o);
                }
                var l = t - a;
                var c = PropUpdateHelper.setProp(n, "text", TextUtils.strPslice(s, l, 1, ""));
                return o = PropUpdateHelper.setIndex(e.blocks, r, c),
                PropUpdateHelper.setProp(e, "blocks", o);
            }
        }) || _.clone(e);
    }
    normalizeBlockStyle(e) {
        if (e.style) {
            e.style = StyleHelper.normalizeStyle(e.style);
        }
    }
    joinBlocksAndNormalizeStyleForLine(e) {
        if (0 === e.blocks.length) {
            return e;
        }
        if (1 === e.blocks.length) {
            return this.normalizeBlockStyle(e.blocks[0]),
            e;
        }
        var t = e.blocks;
        this.normalizeBlockStyle(t[0]);
        var n = 0;
        for (; n < t.length - 1; n++) {
            var r = t[n];
            var a = t[n + 1];
            a.style = StyleHelper.normalizeStyle(a.style);
            if (CheckComponent.are2TextBlockSameFormat(r, a)) {
                t = this.joinBlocksIfPossible(t, n);
                n--;
            } else {
                if (r.text || a.text) {
                    if (r.text) {
                        if (!a.text) {
                            t = PropUpdateHelper.splice(t, n + 1, 1);
                            n--;
                        }
                    } else {
                        t = PropUpdateHelper.splice(t, n, 1);
                        n--;
                    }
                } else {
                    t = PropUpdateHelper.splice(t, n, 2);
                    n = n - 2;
                }
            }
        }
        return t === e.blocks ? e : PropUpdateHelper.setProp(e, "blocks", t);
    }
    joinBlocksIfPossibleForLine(e, t) {
        var n = this.joinBlocksIfPossible(e.blocks, t);
        return n === e.blocks ? e : PropUpdateHelper.setProp(e, "blocks", n);
    }
    joinBlocksIfPossible(e, t) {
        if (t < 0 || t >= e.length - 1) {
            return e;
        }
        var n = e[t];
        var r = e[t + 1];
        if (CheckComponent.are2TextBlockSameFormat(n, r)) {
            var a = PropUpdateHelper.setProp(n, "text", n.text + r.text);
            return PropUpdateHelper.splice(e, t, 2, a);
        }
        return e;
    }
    mergeStyleForLines(e, t, n) {
        var r = 0;
        for (; r < t.length; r++) {
            var a = t[r];
            var i = 0;
            for (; i < a.blocks.length; i++) {
                var o = a.blocks[i];
                CheckComponent.mergeFormatMod(o, e, n ? "root" : "math");
            }
        }
        return t;
    }
    insertLinesAt(e, t, n, r) {
        var i = BlockHelper.isFirstLineWithSingleBlockLine(n);
        var o = BlockHelper.isLastLineWithSingleBlockLine(n);
        var s = BlockHelper.blockEach(e, (a, s, l, c) => {
            if (t >= l && t <= c) {
                this.mergeStyleForLines(a, n, r);
                var d = e.blocks;
                var h = s;
                if (t > l) {
                    var u = t - l;
                    d = PropUpdateHelper.replaceWithArray(e.blocks, s, 1, CheckComponent.splitBlock(a, u));
                    h = s + 1;
                }
                if (1 === n.length) {
                    if (i) {
                        return 0 === t ? [n[0], PropUpdateHelper.update(e, {
                            id: DiagramIdHelper.nextId(),
                            blocks: d
                        })] : [PropUpdateHelper.setProp(e, "blocks", d.slice(0, h)), n[0], PropUpdateHelper.update(e, {
                            id: DiagramIdHelper.nextId(),
                            blocks: d.slice(h)
                        })];
                    }
                    var p = PropUpdateHelper.replaceWithArray(d, h, 0, n[0].blocks);
                    var m = this.joinBlocksIfPossible(p, h - 1);
                    var f = h + n[0].blocks.length - 1;
                    return m.length < p.length && (f = f - 1),
                    m = this.joinBlocksIfPossible(m, f),
                    [PropUpdateHelper.setProp(e, "blocks", m)];
                }
                var g;
                var y;
                var A;
                var E = n[n.length - 1];
                if (i && o) {
                    if (g = PropUpdateHelper.setProp(e, "blocks", d.slice(0, h)), y = PropUpdateHelper.update(e, {
                        id: DiagramIdHelper.nextId(),
                        blocks: d.slice(h)
                    }), A = n, 0 === t) {
                        return A.concat([y]);
                    }
                } else {
                    if (i) {
                        var v = this.joinBlocksIfPossible(E.blocks.concat(d.slice(h)), E.blocks.length - 1);
                        if (g = PropUpdateHelper.setProp(e, "blocks", d.slice(0, h)), y = PropUpdateHelper.setProp(E, "blocks", v), A = n.slice(0, n.length - 1), 0 === t) {
                            return A.concat([y]);
                        }
                    } else {
                        if (o) {
                            var S = this.joinBlocksIfPossible(d.slice(0, h).concat(n[0].blocks), h - 1);
                            g = PropUpdateHelper.setProp(e, "blocks", S);
                            y = PropUpdateHelper.update(e, {
                                id: DiagramIdHelper.nextId(),
                                blocks: d.slice(h)
                            });
                            A = n.slice(1);
                        } else {
                            var C = this.joinBlocksIfPossible(d.slice(0, h).concat(n[0].blocks), h - 1);
                            var x = this.joinBlocksIfPossible(E.blocks.concat(d.slice(h)), E.blocks.length - 1);
                            g = PropUpdateHelper.setProp(e, "blocks", C);
                            y = PropUpdateHelper.setProp(E, "blocks", x);
                            A = n.slice(1, n.length - 1);
                        }
                    }
                }
                return [g].concat(A).concat([y]);
            }
        });
        if (s) {
            return s;
        }
        if (i) {
            return 0 === e.blocks.length ? n : [e].concat(n);
        }
        var l = this.joinBlocksIfPossible(e.blocks.concat(n[0].blocks), e.blocks.length - 1);
        var c = e.style;
        return c && 0 != _.keys(c).length || (c = n[0].style),
        1 === n.length ? [_.assignIn({},
        e, {
            blocks: l,
            style: c
        })] : [_.assignIn({},
        e, {
            blocks: l,
            style: c
        })].concat(n.slice(1));
    }
    buildInsertedModelResult(e, t) {
        return {
            line: e,
            selected: t
        };
    }
    checkToPreventCopyCertainStyle(e, t, n, r, i) {
        if (!e) {
            return t;
        }
        if (!n && e.style && e.style.mathType && !t.style) {
            var o = StyleHelper.safeGetBlockStyle(i, "mathType");
            var s = StyleHelper.safeGetBlockStyle(r, "mathType");
            return o === s && null != s ? t : _.assignIn({},
            t, {
                style: {
                    mathType: void 0
                }
            });
        }
        if (n && e.style && e.style.hyperLink && !t.style) {
            var l = StyleHelper.safeGetBlockStyle(i, "hyperLink");
            var c = StyleHelper.safeGetBlockStyle(r, "hyperLink");
            return l === c && null != c ? t : _.assignIn({},
            t, {
                style: {
                    hyperLink: void 0
                }
            });
        }
        return t;
    }
    handleEmptyLine(e, t, n) {
        e = this.checkToPreventCopyCertainStyle(t.blocks[0], e, n, null, null);
        var r = PropUpdateHelper.insert(t.blocks, t.blocks.length, e);
        return this.buildInsertedModelResult(PropUpdateHelper.set(t, "blocks", r));
    }
    handle_InsertNon_CurrentNon(e, t) {
        var n = t.block;
        var r = t.insertedIndex;
        var a = t.startIndex;
        var i = t.line;
        var o = t.blockIndex;
        var s = t.isTextMode;
        var l = t.previousBlock;
        var c = t.nextBlock;
        var d = a === r ? o : o + 1;
        e = a === r ? this.checkToPreventCopyCertainStyle(n, e, s, n, l) : this.checkToPreventCopyCertainStyle(n, e, s, c, n);
        (e = CheckComponent.copyFormatByMode(e, n, s)).style = StyleHelper.normalizeStyle(e.style);
        var h = D.merge(i.blocks, e, d, r);
        if (h) {
            return this.buildInsertedModelResult(PropUpdateHelper.setProp(i, "blocks", h.blocks), h.selected);
        }
        var u = PropUpdateHelper.insert(i.blocks, d, e);
        return this.buildInsertedModelResult(PropUpdateHelper.setProp(i, "blocks", u));
    }
    handle_InsertText_CurrentNon(e, t) {
        var n;
        var r = t.block;
        var a = t.line;
        var i = t.blockIndex;
        var o = t.isTextMode;
        var s = t.previousBlock;
        var l = t.insertedIndex;
        var c = t.startIndex;
        var d = t.nextBlock;
        if (c === l) {
            n = i;
            e = this.checkToPreventCopyCertainStyle(r, e, o, r, s);
        } else {
            n = i + 1;
            e = this.checkToPreventCopyCertainStyle(r, e, o, d, r);
        } (e = CheckComponent.copyFormatByMode(e, r, o)).style = StyleHelper.normalizeStyle(e.style);
        var h = PropUpdateHelper.insert(a.blocks, n, e);
        return this.buildInsertedModelResult(PropUpdateHelper.setProp(a, "blocks", h));
    }
    handle_InsertNon_CurrentText(e, t) {
        var n = t.line;
        var r = t.blockIndex;
        var a = t.isTextMode;
        var i = t.insertedIndex;
        var o = t.startIndex;
        var s = t.block;
        var l = t.previousBlock;
        var c = t.endIndex;
        var d = t.nextBlock;
        if (i === o) {
            e = this.checkToPreventCopyCertainStyle(s, e, a, s, l);
        } else {
            if (i === c + 1) {
                e = this.checkToPreventCopyCertainStyle(s, e, a, d, s);
            }
        }
        var h = i - o;
        var u = CheckComponent.splitBlockAndInsertModel(s, e, h, a);
        var p = n.blocks.slice(0, r).concat(u).concat(n.blocks.slice(r + 1));
        return this.buildInsertedModelResult(PropUpdateHelper.setProp(n, "blocks", p));
    }
    handle_InsertText_CurrentText(e, t, n) {
        var r = t.line;
        var i = t.blockIndex;
        var o = t.isTextMode;
        var s = t.insertedIndex;
        var l = t.startIndex;
        var c = t.block;
        var d = t.previousBlock;
        var h = t.endIndex;
        var u = t.nextBlock;
        if (s === l) {
            e = this.checkToPreventCopyCertainStyle(c, e, o, c, d);
        } else {
            if (s === h + 1) {
                e = this.checkToPreventCopyCertainStyle(c, e, o, u, c);
            }
        }
        var p = c;
        var m = e;
        var f = s - l;
        if (null != m.style && _.keys(m.style).length > 0) {
            var g = CheckComponent.splitBlockAndInsertModel(p, m, f, o);
            var y = r.blocks.slice(0, i).concat(g).concat(r.blocks.slice(i + 1));
            var A = PropUpdateHelper.setProp(r, "blocks", y);
            return A = this.joinBlocksAndNormalizeStyleForLine(A),
            this.buildInsertedModelResult(A);
        }
        var E = TextUtils.strPsliceWithWithOriginalUniStr(p, f, 0, m.text);
        var v = E.result;
        var S = E.originalTextUniStr;
        if (this.handleUnicodeCombinedCharAtMiddle(S, f, m.text)) {
            return this.buildInsertedModelResult(this.buildNewLineWithText(r, i, v), {
                lineIndex: void 0,
                charIndex: s
            });
        }
        var C = _.assignIn({},
        p, {
            text: v
        });
        var I = B.handleReplaceTextEnd(m.text, S, f, C, n, d);
        if (I) {
            var b = PropUpdateHelper.replaceWithArray(r.blocks, i, 1, I.blocks);
            var L = _.assignIn({},
            r, {
                blocks: b
            });
            return I.shouldNormalizeLine && (L = this.joinBlocksAndNormalizeStyleForLine(L)),
            this.buildInsertedModelResult(L, {
                lineIndex: void 0,
                charIndex: s + I.charDelta + 1
            });
        }
        return this.buildInsertedModelResult(_.assignIn({},
        r, {
            blocks: PropUpdateHelper.set(r.blocks, i, C)
        }));
    }
    insertModelAtNormal(e, t, n, r) {
        var a = B.handleIndentPattern(e, t, n, r.isTextMode);
        if (a) {
            return a;
        }
        var i = n.type == null;
        var o = BlockHelper.blockEach(e, (a, o, s, l, c) => {
            if (! (t < s || t > l + 1)) {
                var d = a.type == null;
                var h = !d && !i;
                var u = d && i;
                var p = e.blocks[o + 1];
                var m = {
                    insertedIndex: t,
                    block: a,
                    blockIndex: o,
                    isTextMode: r.isTextMode,
                    line: e,
                    previousBlock: c,
                    startIndex: s,
                    endIndex: l,
                    nextBlock: p
                };
                if (t === s) {
                    return h ? this.handle_InsertNon_CurrentNon(n, m) : u ? this.handle_InsertText_CurrentText(n, m, r) : i ? this.handle_InsertText_CurrentNon(n, m) : this.handle_InsertNon_CurrentText(n, m);
                }
                if (t === l + 1) {
                    if (h) {
                        return this.handle_InsertNon_CurrentNon(n, m);
                    }
                    if (u) {
                        return this.handle_InsertText_CurrentText(n, m, r);
                    }
                    if (p && p.type == null) {
                        return;
                    }
                    if (!i && p) {
                        return;
                    }
                    return i ? this.handle_InsertText_CurrentNon(n, m) : this.handle_InsertNon_CurrentText(n, m);
                }
                return i ? this.handle_InsertText_CurrentText(n, m, r) : this.handle_InsertNon_CurrentText(n, m);
            }
        });
        return o || this.handleEmptyLine(n, e, r.isTextMode);
    }
    handleUnicodeCombinedCharAtMiddle(e, t, n) {
        if (t > 0) {
            try {
                var r = e.clusterAt(t - 1);
                if (TextUtils.length(r + n) == TextUtils.length(n)) {
                    return true;
                }
            } catch(e) {}
        }
        return false;
    }
    shouldNotCopyStyle(e) {
        return e.style && !!e.style.mathType;
    }
    insertModelAt(e, t, n, r) {
        return this.insertModelAtNormal(e, t, n, r);
    }
    buildNewLineWithText(e, t, n) {
        var r = PropUpdateHelper.set(e.blocks[t], "text", n);
        var a = PropUpdateHelper.set(e.blocks, t, r);
        return PropUpdateHelper.setProp(e, "blocks", a);
    }
    replaceTextInBlockForComposition(e, t, n, r, a) {
        return B.handleReplaceFromReplacementOfComposition(e, t, n, r, a);
    }
    getSelectionForTabular(e, t) {
        var n = e[t.fromLineIndex];
        var r = BlockHelper.blockFromIndex(n, t.fromCharIndex).block;
        var a = this.extractAndNormalizeKeys(r, t);
        return a = TabularUtils.normalizeCells(a),
        [CreateEditorObject.createLineFromBlock(a)];
    }
    extractAndNormalizeKeys(e, t) {
        var n = t.getTabularSelectedKeys();
        return U.extract(e, n);
    }
    getSelectionData(e, t) {
        if (t.isTabularRoute()) {
            return this.getSelectionForTabular(e, t);
        }
        if (t.fromLineIndex === t.toLineIndex) {
            return [this.getSelectionDataInLine(e[t.fromLineIndex], t.fromCharIndex, t.toCharIndex)];
        }
        var n = e[t.fromLineIndex];
        var r = e[t.toLineIndex];
        return this.removeLineUntil(n, t.fromCharIndex).concat(e.slice(t.fromLineIndex + 1, t.toLineIndex)).concat(this.removeLineFrom(r, t.toCharIndex));
    }
    actionOnStyleForTabularSelection(e, t, n, r) {
        var i = t.getTabularSelectedKeys();
        var o = e[t.fromLineIndex];
        var s = BlockHelper.blockFromIndex(o, t.fromCharIndex);
        var l = s.block;
        var c = BlockHelper.cloneCompositeBlockWithNewElements(l);
        var d = 0;
        for (; d < i.length; d++) {
            var h = i[d];
            var u = l.elements[h];
            var p = [];
            var m = 0;
            for (; m < u.lines.length; m++) {
                var f = u.lines[m];
                var g = [];
                var y = 0;
                for (; y < f.blocks.length; y++) {
                    var A = f.blocks[y];
                    if (r && CheckObject.isComposite(A)) {
                        g.push(n.modifyRootStyleForMath(A));
                    } else {
                        g.push(n.modifyStyle(A));
                    }
                }
                p.push(PropUpdateHelper.setProp(f, "blocks", g));
            }
            c.elements[h] = _.assignIn({},
            u, {
                lines: p
            });
        }
        var E = this.replaceBlock(o, c, s.blockIndex);
        return PropUpdateHelper.setIndex(e, t.fromLineIndex, E);
    }
    setStyleForSelection(e, t, n, r, a) {
        return this.actionOnStyleForSelection(e, t, new F(n, r), a);
    }
    overrideStyleForSelection(e, t, n, r) {
        return this.actionOnStyleForSelection(e, t, new H(n), r);
    }
    modifyStyleForLineFrom(e, t, n, r, a) {
        var i = {};
        var o = n;
        for (; o < r; o++) {
            var s = e.blocks[o];
            i[o] = this.handleModifyBlockStyle(s, t, a);
        }
        return PropUpdateHelper.setProp(e, "blocks", PropUpdateHelper.update(e.blocks, i));
    }
    handleModifyBlockStyle(e, t, n) {
        return n && CheckObject.isComposite(e) ? CheckObject.isRootCompositeBlockAsTextBlockProperty(e) ? t.modifyStyle(e) : t.modifyRootStyleForMath(e) : t.modifyStyle(e);
    }
    modifyStyleForLine(e, t, n) {
        return _.assignIn({},
        e, {
            blocks: _.map(e.blocks, (e) => {
                return this.handleModifyBlockStyle(e, t, n);
            })
        });
    }
    actionOnStyleForSelection(e, t, n, r) {
        if (t.isSameRoute()) {
            return e;
        }
        if (t.isTabularRoute()) {
            return this.actionOnStyleForTabularSelection(e, t, n, r);
        }
        var a = this.splitBySelection(e, t);
        var i = {};
        var o = t.fromLineIndex;
        for (; o <= t.toLineIndex; o++) {
            var s = a[o];
            if (o === t.fromLineIndex && o === t.toLineIndex) {
                var l = BlockHelper.blockFromIndex(s, t.fromCharIndex).blockIndex;
                var c = BlockHelper.blockFromIndex(s, t.toCharIndex);
                var d = c ? c.blockIndex : s.blocks.length;
                s = this.modifyStyleForLineFrom(s, n, l, d, r);
                if (StyleHelper.getLineStyle(s, "listType") && 0 === t.fromCharIndex && d >= s.blocks.length - 1 && t.toCharIndex >= BlockHelper.getTotalChar(s.blocks)) {
                    s = n.modifyPrefix(s);
                }
            } else {
                if (o === t.fromLineIndex) {
                    var h = BlockHelper.blockFromIndex(s, t.fromCharIndex);
                    if (null != h) {
                        var u = h.blockIndex;
                        s = this.modifyStyleForLineFrom(s, n, u, s.blocks.length, r);
                    }
                    if (0 === t.fromCharIndex && StyleHelper.getLineStyle(s, "listType")) {
                        s = n.modifyPrefix(s);
                    }
                } else {
                    if (o === t.toLineIndex) {
                        var p = BlockHelper.blockFromIndex(s, t.toCharIndex);
                        var m = p ? p.blockIndex : s.blocks.length;
                        s = this.modifyStyleForLineFrom(s, n, 0, m, r);
                        if (StyleHelper.getLineStyle(s, "listType")) {
                            s = n.modifyPrefix(s);
                        }
                    } else {
                        s = this.modifyStyleForLine(a[o], n, r);
                        if (StyleHelper.getLineStyle(s, "listType")) {
                            s = n.modifyPrefix(s);
                        }
                    }
                }
            }
            s = this.joinBlocksAndNormalizeStyleForLine(s);
            i[o] = s;
        }
        return PropUpdateHelper.update(a, i);
    }
    splitBySelection(e, t) {
        if (t.isSameRoute()) {
            return e;
        }
        if (t.fromLineIndex === t.toLineIndex) {
            var n = this.splitBlockInLine(e[t.fromLineIndex], t.fromCharIndex);
            return (n = this.splitBlockInLine(n, t.toCharIndex)) == e[t.fromLineIndex] ? e : PropUpdateHelper.setIndex(e, t.fromLineIndex, n);
        }
        var r = this.splitBlockInLine(e[t.fromLineIndex], t.fromCharIndex);
        var a = this.splitBlockInLine(e[t.toLineIndex], t.toCharIndex);
        var i = {};
        return i[t.fromLineIndex] = r,
        i[t.toLineIndex] = a,
        PropUpdateHelper.update(e, i);
    }
    removeSelection(e, t) {
        if (t.isTabularRoute()) {
            var n = t.getTabularSelectedKeys();
            var r = e[t.fromLineIndex];
            var a = BlockHelper.blockFromIndex(r, t.fromCharIndex);
            var i = BlockHelper.cloneCompositeBlockWithNewElements(a.block);
            n.forEach((e) => {
                return i.elements[e] = PropUpdateHelper.setProp(i.elements[e], "lines", CreateEditorObject.createEmptyEditor().lines);
            });
            var o = this.replaceBlock(r, i, a.blockIndex);
            return PropUpdateHelper.setIndex(e, t.fromLineIndex, o);
        }
        if (t.fromLineIndex === t.toLineIndex) {
            var s = this.removeSelectionInLine(e[t.fromLineIndex], t.fromCharIndex, t.toCharIndex);
            return PropUpdateHelper.setIndex(e, t.fromLineIndex, s);
        }
        var l = e[t.fromLineIndex];
        var c = e[t.toLineIndex];
        var d = e.slice(0, t.fromLineIndex).concat(this.joinLines(this.removeLineFrom(l, t.fromCharIndex).concat(this.removeLineUntil(c, t.toCharIndex)))).concat(e.slice(t.toLineIndex + 1));
        return this.preserveOneLineIfEmpty(d);
    }
    preserveOneLineIfEmpty(e) {
        return e.length >= 1 ? e : [{
            id: e[0].id,
            blocks: []
        }];
    }
    getSelectionDataInLine(e, t, n) {
        if (t === n) {
            return _.assignIn({},
            e, {
                blocks: [],
                style: void 0
            });
        }
        var r = this.removeLineFrom(e, n);
        return 0 === r.length ? _.assignIn({},
        e, {
            blocks: [],
            style: void 0
        }) : 0 == (r = this.removeLineUntil(r[0], t)).length ? _.assignIn({},
        e, {
            blocks: [],
            style: void 0
        }) : r[0].blocks === e.blocks ? r[0] : _.assignIn({},
        r[0], {
            style: void 0
        });
    }
    removeSelectionInLine(e, t, n) {
        return t === n ? e : this.joinLines(this.removeLineFrom(e, t).concat(this.removeLineUntil(e, n)));
    }
    joinLines(e) {
        if (0 === e.length) {
            throw new Error("no lines to join");
        }
        if (1 === e.length) {
            return e[0];
        }
        var t = e[0].blocks;
        var n = 1;
        for (; n < e.length; n++) {
            var r = e[n];
            var a = t.concat(r.blocks);
            t = a = this.joinBlocksIfPossible(a, t.length - 1);
        }
        return PropUpdateHelper.setProp(e[0], "blocks", t);
    }
    removeLineFrom(e, t) {
        var n = e.blocks;
        var r = BlockHelper.blockEach(e, (e, r, a, i) => {
            if (t === a) {
                return n.slice(0, r);
            }
            if (t >= a && t <= i) {
                var o = CheckComponent.splitBlock(e, t - a);
                return n.slice(0, r).concat([o[0]]);
            }
        });
        return null == r ? [e] : 0 === r.length ? [PropUpdateHelper.setProp(e, "blocks", [])] : [PropUpdateHelper.setProp(e, "blocks", r)];
    }
    removeLineUntil(e, t) {
        if (0 === t) {
            return [e];
        }
        var n = e.blocks;
        var r = BlockHelper.blockEach(e, (e, r, a, i) => {
            if (t === a) {
                return n.slice(r);
            }
            if (t >= a && t <= i) {
                var o = CheckComponent.splitBlock(e, t - a);
                return [o[o.length - 1]].concat(n.slice(r + 1));
            }
        });
        return null == r || 0 === r.length ? [PropUpdateHelper.setProp(e, "blocks", [])] : [PropUpdateHelper.setProp(e, "blocks", r)];
    }
};
/*n.d(t, "a", function () {
    return G;
})*/

export default G