import jQuery from 'jquery';
import BlockHelper from '../Elements/BlockHelper';
import BlockUtils from '../Elements/BlockUtils';
import CursorPositionHelper from '../Editor/CursorPositionHelper';
import DOMHelper from '../Elements/DOMHelper';
import SelectionFinder from './SelectionFinder';

/// xxx(1652) /*CursorInformationBuilder*/

/// var m = n(4)/*DOMHelper*/;  // 6 times
/// var ye = n(5)/*sizzle*/;  // 2 times
/// var Ae = n.n(ye);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var he = n(49)/*CursorPositionHelper*/;  // 4 times
/// var pe = n(58)/*BlockUtils*/;  // 1 times
/// var SelectionFinder = n(1658)/*SelectionFinder*/;  // 1 times
var CursorInformationBuilder = new class {
    buildFullCursorInformation(e, t, n, r, a) {
        r = r || {};
        var i = BlockHelper.findLeafSelected(t);
        var o = "closest" == a ? "closest" : "null";
        var s = r.htmlEditor || SelectionFinder.getSelectedEditor(e, t, o);
        if (!s) {
            return "not-matched";
        }
        var l = r.htmLine;
        if (!l && DOMHelper.isEditAreaBlock(s) && (l = s), null == l && (l = DOMHelper.findLineByIndex(s, i.lineIndex)), null == l) {
            return "not-matched";
        }
        var c = jQuery(s).hasClass("text-mode") || jQuery(s).hasClass("root-editor");
        var d = BlockUtils.buildLineBlocks(l);
        var h = c ? CursorPositionHelper.getMovingIntention(r) : "none";
        var u = "closest" == a ? "closest" : "null";
        var p = CursorPositionHelper.calculateGeoPos({
            charIndex: i.charIndex,
            line: l,
            lineBlocks: d
        },
        h, u);
        if (!p) {
            return "not-matched";
        }
        var f = CursorPositionHelper.getBlockFromCharIndex(d, i.charIndex, false, p.attachElement);
        var g = this.geoPositionToElement(p.pos, n);
        return {
            lineIndex: i.lineIndex,
            charIndex: i.charIndex,
            editor: s,
            line: l,
            lineBlocks: d,
            isTextMode: c,
            relativeGeoPosition: g,
            attachGeoPosElement: p.attachElement,
            positionType: p.positionType,
            charIndexInBlock: p.charIndexInBlock,
            totalChar: CursorPositionHelper.getNumberOfChars(d),
            block: f,
            blockIndex: d.indexOf(f),
            maxRelativeXAxisPosition: this.calculateMaxXAxisPosition(r, g),
            isRootLine: DOMHelper.isRootEditLine(l),
            mathTypeElement: n,
            isEditAreaBlock: DOMHelper.isEditAreaBlock(s),
            isEditAreaLine: DOMHelper.isEditAreaLine(s),
            direction: r.direction,
            positionOnRange: r.positionOnRange
        };
    }
    geoPositionToElement(e, t) {
        var n = DOMHelper.getElementRect(t);
        return {
            left: e.left - n.left,
            top: e.top - n.top
        };
    }
    calculateMaxXAxisPosition(e, t) {
        return !e.maxRelativeXAxisPosition || "up" != e.direction && "down" != e.direction ? t : {
            left: e.maxRelativeXAxisPosition.left,
            top: t.top
        };
    }
};
/*n.d(t, "a", function () {
    return CursorInformationBuilder;
})*/

export default CursorInformationBuilder