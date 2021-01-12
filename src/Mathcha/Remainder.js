import _ from 'lodash';
import React from 'react';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import NumberUtils from './NumberUtils';

/// xxx(50) /*Remainder*/

/// var r = n(4)/*DOMHelper*/;  // 12 times
/// var a = n(2)/*lodash*/;  // 5 times
/// var i = n.n(a);
/// var o = n(0)/*React*/;  // 1 times
/// var s = n.n(o);
/// var l = n(21)/*EditArea*/;  // 1 times
/// var c = n(52)/*NumberUtils*/;  // 3 times
var Remainder = new class {
    renderRestEditors(e, t, n) {
        var r = [];
        return this.getRemaindersSortedKeys(e.props.data).forEach(a => {
            a != n && r.push(React.createElement(EditArea, Object.assign({
                key: a
            },
            e.buildMetaDataFromName(a), {
                showBorder: t,
                className: "role-remainder-editor"
            })))
        }),
        r
    }
    getRemaindersSortedKeys(e) {
        return this.getRemaindersSortedKeys1(_.keys(e.elements))
    }
    getRemaindersSortedKeys1(e) {
        return _.sortBy(e.map(e => {
            if (this.isRemainderKey(e)) return {
                index: this.parseRemainderIndex(e),
                key: e
            }
        }).filter(e => e), e => e.index).map(e => e.key)
    }
    isRemainderKey(e) {
        return _.startsWith(e, "r_")
    }
    parseRemainderIndex(e) {
        return Number.parseInt(e.substr(2), 10)
    }
    buildRemainderKey(e) {
        return "r_".concat(e)
    }
    getRemainderPairFromIndex(e) {
        return e % 2 === 0 ? [this.buildRemainderKey(e), this.buildRemainderKey(e + 1)] : [this.buildRemainderKey(e - 1), this.buildRemainderKey(e)]
    }
    drawOtherLines(e, t) {
        var n = [],
        r = null;
        return _.keys(t).forEach(a => {
            this.isRemainderKey(a) && (this.parseRemainderIndex(a) % 2 != 1 ? n.push(this.drawUnderline(t[a].editor, e, r)) : r = t[a].editor)
        }),
        n.join("")
    }
    drawUnderline(e, t, n) {
        var a = DOMHelper.findRectElementToRect(e, t),
        i = this.findLeftRightPosition(e, t, a.left, a.bottom),
        o = i.left,
        s = i.right;
        if (n) {
            var l = DOMHelper.findRectElementToRect(e, t),
            d = this.findLeftRightPosition(n, t, l.left, l.bottom),
            h = d.left,
            u = d.right;
            o = Math.min(o, h);
            s = Math.max(s, u)
        }
        var p = NumberUtils.round2(o),
        m = NumberUtils.round2(s),
        f = NumberUtils.round2(a.bottom);
        return "M".concat(p, ",").concat(f, " L").concat(m, ",").concat(f, " ")
    }
    findLeftRightPosition(e, t, n, a) {
        var o = DOMHelper.findEditLines(e),
        s = _.last(o),
        l = DOMHelper.findBlocks(s),
        c = n,
        d = n + 10;
        e: for (var h = 0; h < l.length; h++) {
            var u = l[h];
            if (!DOMHelper.isChar(u)) {
                c = DOMHelper.findRectElementToRect(u, t).left;
                break
            }
            for (var p = 0; p < u.innerText.length; p++) if (" " != u.innerText[p] || p >= u.innerText.length - 1) {
                var m = DOMHelper.rangeFrom2Indexes(u, p, p + 1);
                c = DOMHelper.findRectElementToRect(m, t).left;
                break e
            }
        }
        e: for (var f = l.length - 1; f >= 0; f--) {
            var g = l[f];
            if (!DOMHelper.isChar(g)) {
                d = DOMHelper.findRectElementToRect(g, t).right;
                break
            }
            for (var y = g.innerText.length - 1; y >= 0; y--) if (" " != g.innerText[y]) {
                var A = DOMHelper.rangeFrom2Indexes(g, y, y + 1);
                d = DOMHelper.findRectElementToRect(A, t).right;
                break e
            }
        }
        return {
            left: c,
            right: Math.max(c + 10, d)
        }
    }
}

export default Remainder