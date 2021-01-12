import _ from 'lodash';
import jQuery from 'jquery';
import DocumentCorruption from '../Document/DocumentCorruption';
import DOMHelper from '../Elements/DOMHelper';
import ElementTypes from '../Elements/ElementTypes';
import EventHelper from '../Mathcha/EventHelper';
import Global from '../Global';
import RectangleHelper from '../Geometry/RectangleHelper';

/// xxx(1595) /*MouseInputHandler*/

/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var g = n(95)/*DocumentCorruption*/;  // 1 times
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 2 times
/// var Ae = n.n(ye);
/// var ee = n(11)/*Global*/;  // 2 times
/// var ce = n(46)/*RectangleHelper*/;  // 1 times
/// var cn = n(24)/*EventHelper*/;  // 9 times
/// var yn = n(38)/*ElementTypes*/;  // 7 times
class MouseInputHandler {
    constructor(e) {
        this.target = e;
        this.onEditorMouseMove = (e) => {
            if (this.detectLeftButton(e) && this.mouseDown) {
                if (e.target != this.editorContainer && e.target != this.target.getEditorHtmlElement() && null != this.target.getCursorPosition()) {
                    if (!this.target.getContainerModel().isCursorControlled) {
                        e.preventDefault();
                        this.handleSelectFromPosition(EventHelper.getTargetOnMoveEvent(e), EventHelper.getLeftTopFromEvent(e), true);
                    }
                }
            }
        };
        this.getMathEditContainerRef = (e) => {
            this.editorContainer = e;
        };
        this.handleSelectFromPosition = (e, t, n) => {
            if (null == e) {
                return null;
            }
            if ("TD" === e.tagName && this.isTdWithEditarea(e)) {
                e.firstElementChild.reactInstance.selectCursorFromPosition(e.firstElementChild, t.left, t.top, n);
            } else {
                if ("COMPOSITE-BLOCK" == e.tagName && _.startsWith(e.className, "theorem")) {
                    var r = jQuery(e).find(">edit-area").get(0);
                    r.reactInstance.selectCursorFromPosition(r, t.left, t.top, n);
                } else {
                    if ("TD" === e.tagName && (e.className || "").indexOf("non-select") >= 0) {
                        var a = this.findSelectableTd(e, t);
                        if (a && this.isTdWithEditarea(a)) {
                            a.firstElementChild.reactInstance.selectCursorFromPosition(a.firstElementChild, t.left, t.top, n);
                        }
                    } else {
                        if (("LABEL" != e.tagName || "REF-TAG" != e.parentElement.tagName) && "BORDER-RESIZING-CONTAINER" != e.tagName && "BORDER-LINE" != e.tagName) {
                            if (e.tagName === ElementTypes.areaContainer) {
                                var i = e.parentNode;
                                return i.reactInstance.selectCursorFromPosition(i, t.left, t.top, n);
                            }
                            if (e.tagName === ElementTypes.editarea || e.tagName === ElementTypes.editareaBlock || e.tagName === ElementTypes.editareaLine) {
                                var o = e;
                                return o.reactInstance.selectCursorFromPosition(o, t.left, t.top, n);
                            }
                            var s = DOMHelper.closestEditor(e);
                            if (s) {
                                s.reactInstance.selectCursorFromPosition(e, t.left, t.top, n);
                            }
                        }
                    }
                }
            }
        };
        this.handleCursorMouseDown = (e, t) => {
            this.target.forceStopCompositionOrReserve();
            var n = EventHelper.getCustomEventInfo(t);
            var r = !n || !n.handledCursorSelected || n.requestCursorSelect;
            if (this.target.state.contextMenuShowInfo && false === this.target.state.contextMenuShowInfo.touchRelease) {
                return console.log("prevent"),
                t.preventDefault(),
                void EventHelper.cleanCustomInfo(t);
            }
            if (r) {
                this.mouseDown = true;
                var a = this.target.getController().isShiftKey(t);
                if (!a) {
                    this.target.clearSelection();
                }
                this.handleSelectFromPosition(e, EventHelper.getLeftTopFromEvent(t), a);
                t.preventDefault();
            }
            if (this.target.state.contextMenuShowInfo || this.target.state.isAutoCompleteShow) {
                this.target.setState({
                    isAutoCompleteShow: false,
                    contextMenuShowInfo: null
                });
            }
            if (! (n && n.focusAcquired)) {
                this.target.hidenInputFocus();
                t.preventDefault();
            }
            EventHelper.cleanCustomInfo(t);
        };
        this.onEditorMouseDown = (e) => {
            if (3 != e.nativeEvent.detail) {
                if (!DocumentCorruption.isCurrentDocumentInCorruption()) {
                    if (EventHelper.isLeftButtonOrTouch(e)) {
                        e.stopPropagation();
                        this.handleCursorMouseDown(e.target, e);
                    }
                }
            } else {
                this.handleTripleClick(e);
            }
        };
        this.onMathTypeMouseDown = (e) => {
            if (EventHelper.isRightButton(e)) {
                return e.preventDefault(),
                void e.stopPropagation();
            }
            if (EventHelper.isLeftButtonOrTouch(e)) {
                if (e.target === this.target.getMathTypeHtmlElement()) {
                    this.handleCursorMouseDown(this.target.getEditorHtmlElement(), e);
                }
                e.stopPropagation();
            }
        };
        this.onMathTypeMouseUp = () => {
            if (this.mouseDown) {
                this.handleStyleCopy();
                this.mouseDown = false;
            }
        };
        this.onEditorMouseUp = () => {};
        this.onEditorDoubleClick = () => {
            var e = this.target.getController().handleDoubleClick(this.target.getContainerModel());
            this.target.handleResult(e);
        };
    }
    detectLeftButton(e) {
        return !! Global.isMobileOrTablet() || (Global.isSafari() ? 1 === e.nativeEvent.which : 1 === e.buttons);
    }
    findSelectableTd(e, t) {
        var n = jQuery(e).parent().children("td:not(.non-select)").toArray().map((e) => {
            return DOMHelper.elementToRectWrapper(e);
        });
        var r = RectangleHelper.findNearestRectsInXAxis(n, t);
        return r && r.element;
    }
    isTdWithEditarea(e) {
        return e.firstElementChild && (e.firstElementChild.tagName === ElementTypes.editarea || e.firstElementChild.tagName === ElementTypes.editareaLine || e.firstElementChild.tagName === ElementTypes.editareaBlock);
    }
    handleTripleClick(e) {
        var t = this.target.getController().handleTripleClick(this.target.getContainerModel(), e);
        this.target.handleResult(t);
    }
    handleStyleCopy() {
        if (this.target.state.blockStyleClipboard) {
            var e = this.target.state.blockStyleClipboard;
            var t = this.target.getController();
            var n = this.target.getContainerModel();
            if (n.isTextModeSelected() == e.isTextMode) {
                var r = t.pasteCopiedStyle(n, e.style);
                this.target.handleResult(r);
            } else {
                var a = {
                    color: e.style.color
                };
                var i = t.pasteCopiedStyle(n, a);
                this.target.handleResult(i);
            }
            this.target.clearCopiedBlockStyle();
        }
    }
    setMouseDown(e) {
        this.mouseDown = e;
    }
}
/*n.d(t, "a", function () {
    return MouseInputHandler;
})*/

export default MouseInputHandler