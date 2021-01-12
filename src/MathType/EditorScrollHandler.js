import jQuery from 'jquery';
import DOMHelper from '../Elements/DOMHelper';
import Global from '../Global';
import ScrollTo from '../Mathcha/ScrollTo';

/// xxx(1597) /*EditorScrollHandler*/

/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var ye = n(5)/*sizzle*/;  // 4 times
/// var Ae = n.n(ye);
/// var ee = n(11)/*Global*/;  // 1 times
/// var fr = n(107)/*ScrollTo*/;  // 1 times
class EditorScrollHandler {
    constructor(e) {
        this.target = e;
    }
    scrollToPositionIfNotInView(t) {
        if (!this.target.isReadOnly() && !this.target.isRestrictedView()) {
            if (!this.preventScroll && this.target.getSafeSelected()) {
                if (!t || t.contextMenuShowInfo === this.target.state.contextMenuShowInfo) {
                    var n = this.target.getContainerModel();
                    if (!n.isDiagramSelected && !n.isImageContainerSelected) {
                        var r = this.getExpectedScrollPosition();
                        var a = this.getScrollSelector();
                        if (r.scrollLeft || r.scrollTop) {
                            jQuery(a).finish();
                            jQuery(a).animate(r);
                        }
                    }
                }
            } else {
                this.preventScroll = false;
            }
        }
    }
    getExpectedScrollPosition() {
        if (!this.scrollElement) {
            return {};
        }
        var e;
        var t;
        var n = DOMHelper.getElementRect(this.target.getCursorHTMLElement());
        var r = n.top + n.height / 2;
        var a = n.left;
        var i = this.getExpecEditorTopPosition();
        var o = this.getScrollInfo();
        if (r < i) {
            e = o.scrollTop - (i - r);
        } else {
            var s = jQuery(window).height();
            if (r + 40 > s) {
                e = o.scrollTop + (40 + r - s);
            }
        }
        if (a < 40) {
            t = o.scrollLeft - (40 - a);
        } else {
            var l = jQuery(window).width();
            if (a + 30 > l) {
                t = o.scrollLeft + (30 + a - l);
            }
        }
        return {
            scrollTop: e,
            scrollLeft: t
        };
    }
    getScrollInfo() {
        var e = DOMHelper.getElementRect(this.scrollElement);
        return {
            scrollTop: this.scrollElement.scrollTop,
            scrollLeft: this.scrollElement.scrollLeft,
            elementTop: e.top,
            elementLeft: e.left
        };
    }
    getExpecEditorTopPosition() {
        return Global.isMobileOrTablet() ? 130 : 100;
    }
    getScrollSelector() {
        return ScrollTo.getScrollSelector(this.scrollElement);
    }
    setScrollElement(e) {
        this.scrollElement = e;
    }
    needPreventScroll() {
        this.preventScroll = true;
    }
    setPreventScroll(e) {
        this.preventScroll = e;
    }
}
/*n.d(t, "a", function () {
    return EditorScrollHandler;
})*/

export default EditorScrollHandler