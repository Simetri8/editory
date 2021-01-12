import _ from 'lodash';
import DOMHelper from './DOMHelper';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TextUtils from '../Editor/TextUtils';

/// xxx(58) /*BlockUtils*/

/// var r = n(4)/*DOMHelper*/;  // 11 times
/// var a = n(2)/*lodash*/;  // 3 times
/// var i = n.n(a);
/// var o = n(7)/*PropUpdateHelper*/;  // 2 times
/// var s = n(36)/*TextUtils*/;  // 1 times
var BlockUtils = new class {
    findSelectedBlock(e, t, n) {
        for (var a = DOMHelper.findBlocks(e), i = 0, o = 0; o < a.length; o++) {
            var s = a[o],
            l = this.getNumberOfCharsInBlock(s);
            if (t >= i && t < i + l) return {
                element: s,
                localIndex: t - i
            };
            if (!n && t === i + l) {
                var c = {
                    element: s,
                    localIndex: t - i
                };
                return o < a.length - 1 && (c.sub = {
                    element: a[o + 1],
                    localIndex: 0
                }),
                c
            }
            i += l
        }
    }
    toCharIndexedHtmlLineBlockAtStart(e) {
        return PropUpdateHelper.set(e, "charIndex", 0)
    }
    toCharIndexedHtmlLineBlockAtEnd(e) {
        return PropUpdateHelper.set(e, "charIndex", this.getNumberOfCharsInBlock(e.element))
    }
    isLineBlock(e) {
        return ! (e instanceof HTMLElement)
    }
    buildLineBlocks(e) {
        if (DOMHelper.isEditAreaBlock(e)) {
            if (DOMHelper.isInnerTextEmpty(e)) return [];
            var t = e;
            return [{
                rect: DOMHelper.getElementRect(t),
                startIndex: 0,
                endIndex: null,
                element: t,
                isNonChar: !1,
                isChar: !0,
                isComposite: !1,
                hasChildEditor: !1,
                numOfChar: this.getNumberOfCharsInBlock(t),
                blockIndex: 0
            }]
        }
        var n = DOMHelper.findBlocks(e),
        a = 0;
        return _.map(n, (e, t) => {
            var i = DOMHelper.isNonChar(e),
            o = this.getNumberOfCharsInBlock(e),
            s = {
                rect: DOMHelper.getElementRect(e),
                startIndex: a,
                endIndex: t === n.length - 1 ? null : a + o - 1,
                element: e,
                isNonChar: i,
                isChar: !i,
                isComposite: DOMHelper.isComposite(e),
                hasChildEditor: DOMHelper.hasChildEditor(e),
                numOfChar: o,
                blockIndex: t
            };
            return a += o,
            s
        })
    }
    getNumberOfCharsInBlock(e) {
        return DOMHelper.isNonChar(e) ? 1 : TextUtils.lengthByCache(e)
    }
    toCharIndexLineBlock(e, t) {
        return _.assign({},
        e, {
            charIndex: t
        })
    }
    getNumberOfCharsFromLine(e) {
        return _.sumBy(DOMHelper.findBlocks(e), e => this.getNumberOfCharsInBlock(e))
    }
}

export default BlockUtils