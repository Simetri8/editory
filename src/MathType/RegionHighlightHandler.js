import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import { FindManagement } from './FindReplaceHandler';
import DOMHelper from '../Elements/DOMHelper';
import SelectionBuilder from './SelectionBuilder';
import TextUtils from '../Editor/TextUtils';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1605) /*RegionHighlightHandler*/

/// var i = n(0)/*React*/;  // 6 times
/// var o = n.n(i);
/// var m = n(4)/*DOMHelper*/;  // 1 times
/// var C = n(2)/*lodash*/;  // 4 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 4 times
/// var Ae = n.n(ye);
/// var w = n(36)/*TextUtils*/;  // 2 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var FindReplaceHandler = n(1590)/*TimerHelper*/;  // 6 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 4 times
class RegionHighlightContainer extends React.Component {
    constructor(e) {
        super(e);
        this.findInfo = null;
        this.state = {
            lineRects: null,
            currentLineRect: null,
            currentFindPosition: null,
            currentIndexPosition: 0
        };
    }
    shouldComponentUpdate(t) {
        return this.state != t;
    }
    findRectInView(e, t) {
        var n = 0;
        for (; n < e.length; n++) {
            if (e[n].rects[0].top + t.top > 80) {
                return n;
            }
        }
        return 0;
    }
    closeFindSession() {
        TextUtils.endGlobalTextCahce();
        this.setEmptyHighlight();
    }
    setEmptyHighlight() {
        this.setState({
            lineRects: [],
            currentLineRect: null
        });
        this.findInfo = null;
    }
    isInHighlightMode() {
        return !! this.findInfo;
    }
    getSelectedInfo() {
        return {
            currentFindPosition: this.state.currentFindPosition,
            currentIndexPosition: this.state.currentIndexPosition
        };
    }
    fromFindResult(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (e.total <= 0) {
            return this.setState({
                lineRects: [],
                currentLineRect: null
            }),
            void(this.findInfo = {
                findResult: e,
                rootEditorElement: t
            });
        }
        TextUtils.startGlobalTextCache();
        this.findInfo = {
            findResult: e,
            rootEditorElement: t
        };
        var a = (new Date).getTime();
        console.log("build rects take:", (new Date).getTime() - a);
        var i = 0;
        var o = SelectionBuilder.buildRectsFromFindResults(t, e.results, n);
        if (void 0 !== r.indexSuggestion) {
            i = r.indexSuggestion;
            i = _.clamp(i, 0, e.total - 1);
        } else {
            i = this.findRectInView(o, n);
        }
        var s = FindManagement.getFindResultPositionFromIndex(e.results, i);
        var l = FindManagement.getFindResultFromPosition(e.results, s);
        var c = SelectionBuilder.buildRectsFromFindResults(t, [l], n)[0];
        return this.setState({
            lineRects: o,
            currentFindPosition: s,
            currentLineRect: c,
            currentIndexPosition: i
        }),
        r.isIncremental && !r.requestScroll || this.props.requestScrollTo(c.rects[0].top),
        i;
    }
    findNext(e) {
        if (this.findInfo && !(this.findInfo.findResult.total <= 0)) {
            var t = this.findInfo;
            var n = t.findResult;
            var r = t.rootEditorElement;
            var a = FindManagement.findNext(n, this.state.currentFindPosition);
            var i = FindManagement.getFindResultFromPosition(n.results, a);
            var o = SelectionBuilder.buildRectsFromFindResults(r, [i], e)[0];
            var s = this.state.currentIndexPosition + 1;
            return s >= n.total && (s = 0),
            this.setState({
                currentFindPosition: a,
                currentLineRect: o,
                currentIndexPosition: s
            }),
            this.props.requestScrollTo(o.rects[0].top),
            s;
        }
    }
    findPrevious(e) {
        if (this.findInfo && !(this.findInfo.findResult.total <= 0)) {
            var t = this.findInfo;
            var n = t.findResult;
            var r = t.rootEditorElement;
            var a = FindManagement.findPrevious(n, this.state.currentFindPosition);
            var i = FindManagement.getFindResultFromPosition(n.results, a);
            var o = SelectionBuilder.buildRectsFromFindResults(r, [i], e)[0];
            var s = this.state.currentIndexPosition - 1;
            return s < 0 && (s = n.total - 1),
            this.setState({
                currentFindPosition: a,
                currentIndexPosition: s,
                currentLineRect: o
            }),
            this.props.requestScrollTo(o.rects[0].top),
            s;
        }
    }
    renderRects(e) {
        if (e && !(e.length <= 0)) {
            var t = _.flatMap(e, (e, t) => {
                return _.map(e.rects, (e, n) => {
                    var r = {
                        left: e.left,
                        top: e.top,
                        width: e.width,
                        height: e.height
                    };
                    return React.createElement("rh-rect", {
                        key: t + "_" + n,
                        style: r
                    });
                });
            });
            return React.createElement("rhc-all", null, t);
        }
    }
    renderSelectedRect() {
        if (this.state.currentLineRect && !(this.state.currentLineRect.rects.length <= 0)) {
            return _.map(this.state.currentLineRect.rects, (e, t) => {
                return React.createElement("rh-selected-rect", {
                    key: t,
                    style: {
                        left: e.left,
                        top: e.top,
                        width: e.width,
                        height: e.height
                    }
                });
            });
        }
    }
    render() {
        return React.createElement("region-highlight-container", {
            style: {
                zIndex: 1
            }
        },
        this.renderRects(this.state.lineRects), this.renderSelectedRect());
    }
}
class RegionHighlightHandler {
    constructor(e) {
        this.target = e;
        this.getRegionHighlightRef = (e) => {
            this.regionHighlight = e;
        };
        this.requestHighlightScrollTo = (e) => {
            var t = e - (this.target.getFindAndReplaceElement() ? jQuery(this.target.getFindAndReplaceElement()).height() : 30);
            var n = DOMHelper.getElementRect(this.target.getMathTypeHtmlElement());
            if (! (e + n.top > 100 && e + n.top < jQuery(window).height() - 30)) {
                TimerHelper.waitABit(() => {
                    var e = this.target.getScrollSelector();
                    jQuery(e).finish();
                    jQuery(e).animate({
                        scrollTop: t
                    });
                });
            }
        };
    }
    getRegionHighlight() {
        return this.regionHighlight;
    }
    renderRegionHighlight() {
        if (!this.target.isReadOnly() && !this.target.isRestrictedView()) {
            return React.createElement(RegionHighlightContainer, {
                requestScrollTo: this.requestHighlightScrollTo,
                ref: this.getRegionHighlightRef
            });
        }
    }
}
/*n.d(t, "a", function () {
    return RegionHighlightHandler;
})*/

export default RegionHighlightHandler