import jQuery from 'jquery';
import React from 'react';
import CursorDrawer from './CursorDrawer';
import CursorInformationBuilder from './CursorInformationBuilder';
import CursorPositionHelper from '../Editor/CursorPositionHelper';
import SelectionCorrector from './SelectionCorrector';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1622) /*EditorCursorHandler*/

/// var i = n(0)/*React*/;  // 1 times
/// var o = n.n(i);
/// var ye = n(5)/*sizzle*/;  // 3 times
/// var Ae = n.n(ye);
/// var he = n(49)/*CursorPositionHelper*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var SelectionCorrector = n(1638)/*SelectionCorrector*/;  // 1 times
/// var CursorDrawer = n(1651)/*CursorDrawer*/;  // 1 times
/// var CursorInformationBuilder = n(1652)/*CursorInformationBuilder*/;  // 1 times
class EditorCursorBlinkHandler {
    constructor() {
        this.isShow = false;
        this.cursorDisplayType = "hide";
        this.focusState = "completelyLostFocus";
        this.inputFocus = false;
        this.mathTypeFocus = false;
        this.cursorControlled = false;
        this.batchFuncs = [];
        this.batchOperationDelayRunObj = TimerHelper.createLaterRunObject("first-request", 10);
        this.batchOperationDelayRunFunc = () => {
            this.batchFuncs.forEach((e) => {
                return e();
            });
            this.batchFuncs = [];
        };
    }
    init() {
        this.refreshBlink = this.refreshBlink.bind(this);
    }
    isInputFocus() {
        return this.inputFocus;
    }
    setInputFocus(e) {
        this.inputFocus = e;
        this.refreshBlinkIfRequire();
    }
    setMathTypeFocus(e) {
        this.mathTypeFocus = e;
        this.refreshBlinkIfRequire();
    }
    setCursorControlled(e) {
        this.cursorControlled = e;
        this.refreshBlinkIfRequire();
    }
    inferDisplayType() {
        return this.cursorControlled ? "hide-by-controlled" : !this.inputFocus && this.mathTypeFocus ? "deactivated" : this.inputFocus && this.isShow ? "show" : "hide";
    }
    inferFocusState() {
        return !this.inputFocus && this.mathTypeFocus ? "lostInputFocus" : this.inputFocus ? "focus" : "completelyLostFocus";
    }
    refreshBlinkIfRequire(e) {
        var t = this.inferDisplayType();
        var n = this.inferFocusState();
        if (t != this.cursorDisplayType) {
            this.cursorDisplayType = t;
            this.batchOperation(this.refreshBlink);
        }
        if (n != this.focusState) {
            this.focusState = n;
            this.batchOperation(() => {
                this.focusStateChanged(this.focusState, this.cursorDisplayType);
            });
        }
        if (e) {
            this.batchOperation(() => {
                this.stopBlink();
                this.startBlink();
            });
        }
    }
    batchOperation(e) {
        this.batchFuncs.push(e);
        this.batchOperationDelayRunObj.later(this.batchOperationDelayRunFunc);
    }
    refreshBlink() {
        this.cursorDisplayChanged(this.cursorDisplayType);
    }
    startBlink() {
        this.timeoutId = setTimeout(() => {
            this.isShow = !this.isShow;
            this.refreshBlinkIfRequire();
            this.startBlink();
        },
        500);
    }
    clear() {
        this.stopBlink();
    }
    stopBlink() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    requestShow() {
        this.isShow = true;
        this.refreshBlinkIfRequire(true);
    }
}
class EditorCursorHandler {
    constructor(e, t, n, r) {
        this.target = e;
        this.focusHandler = t;
        this.keyboardInputHandler = n;
        this.mobileSupportHandler = r;
        this.cursorBlinkHandler = new EditorCursorBlinkHandler();
        this.getCursorRef = (e) => {
            this.cursor = e;
            if (e) {
                this.cursor.style.visibility = "hidden";
            }
        };
        this.cursorStateChanged = (e) => {
            if (this.cursor) {
                switch (e) {
                case "show":
                    this.cursor.style.visibility = "";
                    this.cursor.style.opacity = "1";
                    break;
                case "hide":
                    case "hide-by-controlled":
                    this.cursor.style.visibility = "hidden";
                    break;
                case "deactivated":
                    this.cursor.style.visibility = "";
                    this.cursor.style.opacity = "0.5";
                }
            }
        };
        this.focusStateChanged = (e, t) => {
            var n = this.target.getSelection();
            if (this.target.props.onFocusStateChanged && this.target.props.onFocusStateChanged(e), "focus" == e ? this.target.closeAutoComplete() : "lostInputFocus" == e && "hide-by-controlled" == t && this.target.closeAutoComplete(), n) {
                switch (e) {
                case "focus":
                    case "lostInputFocus":
                    n.setActive(true);
                    break;
                case "completelyLostFocus":
                    n.setActive(false);
                }
            }
        };
    }
    getSafeSelected() {
        return this.target.state.mainSelected;
    }
    correctSelected() {
        var corrected = SelectionCorrector.correct(this.target.state.mainModel, this.target.state.mainSelected);
        return this.lastCorrectedSelected && this.lastSelected && this.lastSelected === this.target.state.mainSelected ? this.lastCorrectedSelected : (this.lastSelected = this.target.state.mainSelected, this.lastCorrectedSelected = corrected, this.lastCorrectedSelected);
    }
    init() {
        if (!this.target.isReadOnly()) {
            this.cursorBlinkHandler.cursorDisplayChanged = this.cursorStateChanged;
            this.cursorBlinkHandler.focusStateChanged = this.focusStateChanged;
            this.cursorBlinkHandler.init();
        }
    }
    cleanUp() {
        if (this.cursorBlinkHandler) {
            this.cursorBlinkHandler.clear();
        }
    }
    startBlink() {
        if (this.cursorBlinkHandler) {
            this.cursorBlinkHandler.startBlink();
        }
    }
    getCursorPosition() {
        return this.cursorPosition;
    }
    setCursorMathTypeFocus(e) {
        this.cursorBlinkHandler.setMathTypeFocus(e);
    }
    setCursorInputFocus(e) {
        this.cursorBlinkHandler.setInputFocus(e);
    }
    getCursorHTMLElement() {
        return this.cursor;
    }
    requestShowCursor() {
        this.cursorBlinkHandler.requestShow();
    }
    getCursorGeoPosition() {
        return this.cursorPosition && this.cursorPosition.relativeGeoPosition;
    }
    calculateCursorPosition(e, t) {
        var n = this.getSafeSelected();
        if (n) {
            var r = CursorInformationBuilder.buildFullCursorInformation(this.target.getEditorHtmlElement(), n, this.target.getMathTypeHtmlElement(), e.cursorContext || CursorPositionHelper.emptyCursorContext(), "error");
            if (!t && "not-matched" == r) {
                throw new Error("selected is not matched with its content");
            }
            if ("not-matched" != r) {
                this.cursorPosition = r;
                if (e.isCursorControlled) {
                    this.cursorBlinkHandler.setCursorControlled(true);
                } else {
                    this.cursorBlinkHandler.setCursorControlled(false);
                }
                var a = this.drawCursorPosition({
                    cursorPos: this.cursorPosition,
                    cursorEnv: e
                });
                this.focusHandler.calculateHiddenInputPosition(a, e.isCursorControlled);
                this.keyboardInputHandler.calculateCompositionLineDrawing(a, this.cursorPosition);
                this.mobileSupportHandler.calculateSelectionMarkPosition(e.isCursorControlled, a);
            } else {
                console.warn("selected is not matched with its content");
            }
        }
    }
    renderCursor() {
        return React.createElement("span", {
            className: "text-cursor",
            ref: this.getCursorRef
        });
    }
    drawCursorPosition(e) {
        var t = e.cursorPos;
        var n = e.cursorEnv;
        var r = CursorDrawer.draw(t, n, this.target.getFixedContextHandler());
        var a = r.cursorStyle;
        jQuery(this.cursor).css("height", a.height);
        jQuery(this.cursor).css("transform", a.transform);
        jQuery(this.cursor).css("borderColor", a.borderColor);
        return r.drawnPosition;
    }
}
/*n.d(t, "a", function () {
    return EditorCursorHandler;
})*/

export default EditorCursorHandler