import _ from 'lodash';
import CheckComponent from '../Editor/CheckComponent';
import CheckObject from '../Editor/CheckObject';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TabularHelper from '../Tabular/TabularHelper';
import TextHelper from '../Mathcha/TextHelper';
import TextUtils from '../Editor/TextUtils';

/// xxx(12) /*BlockHelper*/

/// var r = n(3)/*_.assignIn*/;  // 6 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 8 times
/// var o = n.n(i);
/// var s = n(7)/*PropUpdateHelper*/;  // 8 times
/// var l = n(22)/*CheckComponent*/;  // 7 times
/// var c = n(36)/*TextUtils*/;  // 3 times
/// var d = n(77)/*TextHelper*/;  // 2 times
/// var h = n(31)/*CheckObject*/;  // 3 times
/// var u = n(15)/*TabularHelper*/;  // 1 times
var BlockHelper = new class {
    replaceBlockInEditor(e, t, n) {
        var r = e.lines[t],
        i = PropUpdateHelper.replaceArrayByEntity(r.blocks, n),
        o = _.assignIn({},
        r, {
            blocks: i
        }),
        l = PropUpdateHelper.replaceArrayByEntity(e.lines, o);
        return _.assignIn({},
        e, {
            lines: l
        })
    }
    isControlledSelected(e) {
        return !! e && ( !! e.controlled || !!e.selected && this.isControlledSelected(e.selected))
    }
    setLineTag(e, t) {
        return t && null == t.tagId && (t = PropUpdateHelper.setProp(t, "tagId", "tid" + Math.random())),
        PropUpdateHelper.setProp(e, "tagInfo", t)
    }
    traverseDown(e, t, n) {
        var r = t.lineIndex,
        a = t.charIndex,
        i = this.blockFromIndex(e.lines[r], a);
        if (!i || !i.block) return null;
        if (n && n(i.block, t)) return i.block;
        if (!t.selected) return null;
        var o = i.block.elements[t.key];
        return this.traverseDown(o, t.selected, n)
    }
    getSelectedBlockFromRoot(e, t) {
        var n = t.lineIndex,
        r = t.charIndex,
        a = this.blockFromIndex(e.lines[n], r);
        if (!t.selected) return a ? a.block : null;
        if (!a) return null;
        var i = a.block.elements[t.key];
        return this.getSelectedBlockFromRoot(i, t.selected)
    }
    getParentSelectedBlockFromRoot(e, t) {
        var n = t.lineIndex,
        r = t.charIndex,
        a = this.blockFromIndex(e.lines[n], r);
        if (!t.selected) return null;
        if (!t.selected.selected) return a ? a.block : null;
        var i = a.block.elements[t.key];
        return this.getParentSelectedBlockFromRoot(i, t.selected)
    }
    getSelectedLineFromRoot(e, t) {
        var n = t.lineIndex;
        if (!t.selected) return e.lines[n];
        var r = t.charIndex,
        a = this.blockFromIndex(e.lines[n], r).block.elements[t.key];
        return this.getSelectedLineFromRoot(a, t.selected)
    }
    getSelectedEditor(e, t) {
        if (!t.selected) return e;
        var n = t.lineIndex,
        r = t.charIndex,
        a = this.blockFromIndex(e.lines[n], r).block.elements[t.key];
        return this.getSelectedEditor(a, t.selected)
    }
    findTabularBlock(e, t) {
        var n = t.lineIndex;
        if (!t.selected) return null;
        var r = t.charIndex,
        a = this.blockFromIndex(e.lines[n], r),
        i = a.block.elements[t.key],
        o = this.findTabularBlock(i, t.selected);
        return o || (t.key && TabularHelper.isKeyInTabularFormat(t.key) ? a.block : null)
    }
    nextTagId() {
        return "tid" + Math.random()
    }
    findParentSelectedOf(e, t) {
        return null == e.selected ? null : e.selected === t ? e : this.findParentSelectedOf(e.selected, t)
    }
    findLeafSelected(e) {
        return e ? e.selected ? this.findLeafSelected(e.selected) : e : null
    }
    findLeafParentSelected(e) {
        return e && e.selected ? e.selected.selected ? this.findLeafParentSelected(e.selected) : e : null
    }
    changeLeafSelected(e, t) {
        if (!e.selected) return _.assignIn({},
        e, t);
        var n = _.cloneDeep(e),
        r = this.findLeafParentSelected(n);
        return r.selected = _.assignIn({},
        r.selected, t),
        n
    }
    isAnyLowerBigLastLine(e) {
        var t = _.last(e.lines);
        return _.some(t.blocks, e => e.type == null ? TextHelper.isAnyLowerBig(e.text) : !!CheckComponent.isNonTextBlock(e) || void 0)
    }
    isAnyUpperBigFirstLine(e) {
        var t = _.first(e.lines);
        return _.some(t.blocks, e => e.type == null ? TextHelper.isAnyUpperBig(e.text) : !!CheckComponent.isNonTextBlock(e) || void 0)
    }
    isEmptyOrOneTextEditor(e) {
        if (!e) return !0;
        if (e.lines.length > 1 || e.lines[0].blocks.length > 1) return !1;
        var t = e.lines[0].blocks[0];
        return null == t || t.type == null && 1 === t.text.length
    }
    cloneCompositeBlockWithNewElements(e) {
        return _.assignIn({},
        e, {
            elements: _.assignIn({},
            e.elements)
        })
    }
    isSingleLineEditor(e) {
        return e.lines.length <= 1
    }
    isSingeLineBlockInLine(e) {
        return 1 === e.blocks.length && CheckObject.isSingeLineBlock(e.blocks[0])
    }
    isLineWithSingleBlockLine(e) {
        return 1 === e.blocks.length && CheckObject.isSingeLineBlock(e.blocks[0])
    }
    isLineWithSingleTheorem(e) {
        return 1 === e.blocks.length && CheckObject.isTheorem(e.blocks[0])
    }
    isFirstLineWithSingleBlockLine(e) {
        return ! (e.length <= 0) && this.isLineWithSingleBlockLine(e[0])
    }
    isLastLineWithSingleBlockLine(e) {
        return ! (e.length <= 0) && this.isLineWithSingleBlockLine(e[e.length - 1])
    }
    isSqrtLatexName(e) {
        return "\\sqrt" == e
    }
    isFracLatexName(e) {
        return "\\frac" == e
    }
    isFracClassLatexName(e) {
        return "\\frac" == e || "\\cfrac" == e || "\\dfrac" == e || "\\tfrac" == e
    }
    isTheoremLatexName(e) {
        return "\\theorem" == e
    }
    getChildModelKeys(e) {
        return _.keys(e.elements)
    }
    cloneCompositeWithoutStyle(e) {
        return PropUpdateHelper.setProp(e, "style", void 0)
    }
    isEmptyLine(e) {
        return 0 === e.blocks.length
    }
    isEditorEmpty(e) {
        return !e || 1 === e.lines.length && 0 === e.lines[0].blocks.length
    }
    blockEach(e, t) {
        for (var n = 0, r = 0; r < e.blocks.length; r++) {
            var a = e.blocks[r],
            i = n,
            o = CheckComponent.getCharCount(a),
            s = t(a, r, i, n + o - 1, e.blocks[r - 1]);
            if (s) return s;
            n += o
        }
    }
    getBlocksInfo(e) {
        var t = [];
        return this.blockEach(e, (e, n, r, a) => {
            t.push({
                block: e,
                blockIndex: n,
                start: r,
                end: a
            })
        }),
        t
    }
    getTotalChar(e) {
        return _.sumBy(e, e => CheckComponent.getCharCount(e))
    }
    getTotalCharLastLine(e) {
        var t = _.last(e.lines);
        return this.getTotalChar(t.blocks)
    }
    blockFromIndex(e, t) {
        return this.blockEach(e, (e, n, r, a) => {
            if (t >= r && t <= a) return {
                block: e,
                blockIndex: n,
                startIndex: r,
                endIndex: a
            }
        })
    }
    getBlockFromLineCharIndex(e, t, n) {
        var r = e.lines[t],
        a = this.blockFromIndex(r, n);
        return a ? a.block : null
    }
    blockIndexFromCharIndex(e, t) {
        for (var n = 0, r = 0; r < e.blocks.length; r++) {
            var a = e.blocks[r],
            i = n,
            o = n + CheckComponent.getCharCount(a) - 1;
            if (t >= i && t <= o) return r;
            n += CheckComponent.getCharCount(a)
        }
        return e.blocks.length - 1
    }
    buildInsertedNewModel(e, t) {
        if (CheckComponent.isNonTextBlock(e)) {
            var n = this.getChildModelKeys(e);
            return n.length > 0 ? PropUpdateHelper.update(t, {
                key: n[0],
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            }) : PropUpdateHelper.update(t, {
                charIndex: t.charIndex + 1,
                selected: null
            })
        }
        return PropUpdateHelper.update(t, {
            charIndex: t.charIndex + TextUtils.lengthByCache(e),
            selected: null
        })
    }
    toRawIndex(e, t) {
        var n = 0,
        r = 0;
        return this.blockEach(e, (e, a, i, o) => {
            if (i <= t && t <= o) return r = e.type ? n : n + TextUtils.rawIndexAt(e, t - i);
            n += e.type ? 1 : e.text.length
        }),
        r
    }
    toCharIndex(e, t) {
        var n = 0,
        r = 0;
        return this.blockEach(e, (e, a, i) => {
            var o = e.type ? 1 : e.text.length;
            if (n <= t && t <= n + o - 1) return r = e.type ? i : i + TextUtils.clusterIndexAt(e, t - n);
            n += o
        }),
        r
    }
}

export default BlockHelper