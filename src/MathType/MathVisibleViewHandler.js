import _ from 'lodash';
import jQuery from 'jquery';
import BaseComponent from '../Elements/BaseComponent';
import DOMHelper from '../Elements/DOMHelper';

/// xxx(1614) /*MathVisibleViewHandler*/

/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 1 times
/// var Ae = n.n(ye);
/// var an = n(62)/*BaseComponent*/;  // 1 times
class MathVisibleViewHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.notifyChanged = () => {
            this.getTarget().onMathViewChanged(this.getRootHtmlLinesInView());
        };
    }
    init() {
        var e = jQuery(this.getTarget().getMathTypeHtmlElement()).closest("container-layer");
        if (! (e.length <= 0)) {
            this.scrollContainer = e.get(0);
            this.debounceFunc = _.debounce(this.notifyChanged, 300);
            this.scrollContainer.addEventListener("scroll", this.debounceFunc);
        }
    }
    requestVisibleLines() {
        return this.getRootHtmlLinesInView();
    }
    getRootHtmlLinesInView() {
        var e = DOMHelper.findEditLines(this.getTarget().getEditorHtmlElement());
        var t = window.innerHeight;
        var n = t + 100;
        return e.map((e, t) => {
            return {
                line: e,
                lineIndex: t,
                rect: DOMHelper.getElementRect(e)
            };
        }).filter((e) => {
            return ! (e.rect.bottom < -100 || e.rect.top > n);
        });
    }
    cleanUp() {
        if (this.scrollContainer) {
            this.scrollContainer.removeEventListener("scroll", this.debounceFunc);
            this.scrollContainer = null;
        }
    }
}
/*n.d(t, "a", function () {
    return MathVisibleViewHandler;
})*/

export default MathVisibleViewHandler