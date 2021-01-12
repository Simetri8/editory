import jQuery from 'jquery';
import DOMHelper from '../Elements/DOMHelper';

/// xxx(1651) /*CursorDrawer*/

/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var ye = n(5)/*sizzle*/;  // 1 times
/// var Ae = n.n(ye);
var CursorDrawer = new class {
    drawRemote(e, t) {
        var n = e.relativeGeoPosition;
        var r = DOMHelper.getComputedFontSize(e.attachGeoPosElement);
        var a = this.calculateTop(e, r, true);
        return {
            height: r,
            left: n.left - 1,
            top: a,
            borderColor: t.color
        };
    }
    draw(e, t, n) {
        var r = e.relativeGeoPosition;
        var a = DOMHelper.getComputedFontSize(e.attachGeoPosElement);
        var i = t.isTextModeSelected;
        var o = t.insideDiagram;
        var s = this.calculateTop(e, a, t.isTextModeSelected);
        var l = this.getScaleCursor(o, e.attachGeoPosElement);
        var c = i ? "black" : "";
        return n && (c = i ? n.getTextCursorColor() : n.getMathCursorColor()),
        {
            drawnPosition: {
                left: r.left,
                top: s,
                cursorHeight: a
            },
            cursorStyle: {
                height: a,
                transform: "translate(".concat(r.left - 1, "px,").concat(s, "px) ").concat(l),
                borderColor: c
            }
        };
    }
    calculateTop(e, t, n) {
        var r = 0;
        var a = e.relativeGeoPosition.top;
        return r = "middle" == e.positionType ? a - t / 2 : "bottom" == e.positionType ? a - t - t / 15 : a - t / 1.1,
        r = r + (n ? 0 : t / 15);
    }
    getScaleCursor(e, t) {
        if (e) {
            var n = t;
            var r = jQuery(n).closest("math-diagram").get(0);
            if (!r) {
                return "";
            }
            var a = r.parentNode.reactInstance.getScale();
            return "scaleY(".concat(a, ")");
        }
        return "";
    }
};
/*n.d(t, "a", function () {
    return CursorDrawer;
})*/

export default CursorDrawer