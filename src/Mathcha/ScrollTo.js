import jQuery from 'jquery';
import DOMHelper from '../Elements/DOMHelper';

/// xxx(107) /*ScrollTo*/

/// var r = n(5)/*sizzle*/;  // 7 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 1 times
function o(e) {
    var t = jQuery(this),
    n = this.scrollTop,
    r = this.scrollHeight,
    i = t.innerHeight(),
    o = e.originalEvent.wheelDelta,
    s = o > 0,
    l = function () {
        return e.stopPropagation(),
        e.preventDefault(),
        e.returnValue = !1,
        !1
    };
    return !s && -o > r - i - n ? (t.scrollTop(r), l()) : s && o > n ? (t.scrollTop(0), l()) : void 0
}
var ScrollTo = new class {
    getScrollSelector(e) {
        return e || "html,body"
    }
    getScrollSelectorFromContext(e) {
        return e || e.getEditorInfo ? e.getEditorInfo().scrollSelector : this.getScrollSelector(null)
    }
    registerEventToFixScroll(e) {
        jQuery(e).on("DOMMouseScroll mousewheel", o)
    }
    unregisterEventToFixScroll(e) {
        jQuery(e).off("DOMMouseScroll mousewheel", o)
    }
    scrollToElement(e, t, n) {
        var r = jQuery(e).get(0),
        o = jQuery(t).get(0),
        s = DOMHelper.findRectElementToElement(o, r);
        jQuery(r).animate({
            scrollTop: jQuery(r).scrollTop() + s.top - (void 0 === n.offsetToTop ? 200 : n.offsetToTop)
        },
        n.duration || 500, n.callback)
    }
}

export default ScrollTo