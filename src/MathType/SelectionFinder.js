import _ from 'lodash';
import jQuery from 'jquery';
import BlockUtils from '../Elements/BlockUtils';
import DOMHelper from '../Elements/DOMHelper';

/// xxx(1658) /*SelectionFinder*/

/// var m = n(4)/*DOMHelper*/;  // 3 times
/// var C = n(2)/*lodash*/;  // 2 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 2 times
/// var Ae = n.n(ye);
/// var pe = n(58)/*BlockUtils*/;  // 3 times
var SelectionFinder = new class {
    getSelectedEditor(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "null";
        if (t.selected) {
            var r = DOMHelper.findLineByIndex(e, t.lineIndex);
            var a = BlockUtils.findSelectedBlock(r, t.charIndex);
            if (!a) {
                if ("null" == n) {
                    console.warn("char index out of bound");
                    return null;
                }
                var i = DOMHelper.findBlocks(r);
                if (i.length <= 0) {
                    return e;
                }
                a = {
                    element: _.last(i),
                    localIndex: BlockUtils.getNumberOfCharsInBlock(_.last(i))
                };
            }
            if (a.sub && (a = a.sub), !a.element.reactInstance) {
                return "null" == n ? (console.warn("selected block is not composite"), null) : e;
            }
            var o = a.element.reactInstance.refMap[t.key];
            return o ? this.getSelectedEditor(o.editor, t.selected) : "null" == n ? (console.warn("key is out of bound"), null) : e;
        }
        return e;
    }
    findLine(e, t) {
        var n = DOMHelper.findLineByIndex(e, t.lineIndex);
        if (!t.selected) {
            return n;
        }
        var r = BlockUtils.findSelectedBlock(n, t.charIndex);
        if (r.sub && (r = r.sub), !r.element.reactInstance) {
            throw new Error("selected is wrong:" + JSON.stringify(t));
        }
        var a = r.element.reactInstance.refMap[t.key].editor;
        return this.findLine(a, t.selected);
    }
    closestMathArea(e, t) {
        var n = this.getSelectedEditor(e, t);
        return jQuery(n).closest("composite-block.role-mathmode-area,dg-editor-container").get(0);
    }
    closestCompositeBlock(e, t) {
        var n = this.getSelectedEditor(e, t);
        console.warn("closestCompositeBlock", n);
        return jQuery(n).closest("composite-block").get(0);
    }
};
/*n.d(t, "a", function () {
    return SelectionFinder;
})*/

export default SelectionFinder