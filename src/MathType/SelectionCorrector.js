import BlockHelper from '../Elements/BlockHelper';

/// xxx(1638) /*SelectionCorrector*/

/// var I = n(12)/*BlockHelper*/;  // 5 times
var SelectionCorrector = new class {
    correctIfChange(e, t, n) {
        return t === n ? t : this.correct(e, t);
    }
    correct(e, t) {
        return t ? this.build(e, t) : t;
    }
    build(e, t) {
        var n = t.lineIndex;
        if (!e.lines[n]) {
            n = e.lines.length - 1;
        }
        var r = t.charIndex;
        var a = e.lines[n];
        if (!t.selected) {
            return {
                lineIndex: n,
                charIndex: Math.min(r, BlockHelper.getTotalChar(a.blocks))
            };
        }
        var i = BlockHelper.blockFromIndex(a, r);
        if (!i) {
            return {
                lineIndex: n,
                charIndex: Math.min(r, BlockHelper.getTotalChar(a.blocks))
            };
        }
        if ("composite" != i.block.type) {
            return {
                lineIndex: n,
                charIndex: Math.min(r, BlockHelper.getTotalChar(a.blocks))
            };
        }
        var o = i.block.elements[t.key];
        return o ? {
            lineIndex: n,
            charIndex: r,
            key: t.key,
            selected: this.build(o, t.selected)
        } : {
            lineIndex: n,
            charIndex: Math.min(r, BlockHelper.getTotalChar(a.blocks))
        };
    }
};
/*n.d(t, "a", function () {
    return SelectionCorrector;
})*/

export default SelectionCorrector