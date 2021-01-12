import { Promise } from 'bluebird';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import DOMHelper from '../Elements/DOMHelper';
import Global from '../Global';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1621) /*FocusHandler*/

/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var m = n(4)/*DOMHelper*/;  // 1 times
/// var mn = n(30)/*blubirdjs*/;  // 1 times
/// var fn = n.n(mn);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var ee = n(11)/*Global*/;  // 2 times
/// var Lt = n(19)/*TimerHelper*/;  // 4 times
class FocusHandler {
    constructor(e, t, n) {
        this.target = e;
        this.mobileSupportHandler = t;
        this.keyboardInputHandler = n;
        this.hiddenFocusDelayRunObj = TimerHelper.createLaterRunObject("first-request", 50);
        this.innerHiddenFocus = () => {
            var e = this.target.getSafeSelected();
            if (e) {
                if (BlockHelper.isControlledSelected(e)) {
                    if (document.activeElement === this.focusElement) {
                        return;
                    }
                    this.focusElement.focus();
                } else {
                    if (this.isHiddenInputFocus()) {
                        return;
                    }
                    if (this.hiddenInput) {
                        this.hiddenInput.focus();
                    }
                }
            }
        };
        this.getHiddenInputBackupWrapperRef = (e) => {
            this.hiddenInputWrapperBackup = e;
        };
        this.getHiddenInputBackupRef = (e) => {
            this.hiddenInputBackup = e;
        };
        this.getHiddenInputWrapperRef = (e) => {
            this.hiddenInputWrapper = e;
        };
        this.getHiddenInputRef = (e) => {
            this.hiddenInput = e;
        };
        this.getHiddenInputWrapperForFocusRef = (e) => {
            this.hiddenInputWrapperForFocusInput = e;
        };
        this.getHiddenFocusRef = (e) => {
            this.focusElement = e;
        };
        this.onMathTypeFocus = () => {
            console.log("[FocusHandler] Focus")
            this.target.cancelClearSelect();
            this.target.setCursorMathTypeFocus(true);
        };
        this.onMathTypeBlur = () => {
            console.log("[FocusHandler] Blur")
            this.target.setCursorMathTypeFocus(false);
        };
        this.onHiddenInputBlur = () => {
            console.log("[FocusHandler] onHiddenInput Blur")
            this.keyboardInputHandler.hideCompositionIndicator();
            this.target.setCursorInputFocus(false);
            this.mobileSupportHandler.hideSelectionMark();
        };
        this.onHiddenInputFocus = (e) => {
            console.log("[FocusHandler] onHiddenInput Focus")
            return this.target.cancelClearSelect(),
            this.target.setCursorInputFocus(true),
            e.preventDefault(),
            e.stopPropagation(),
            false;
        };
    }
    handleOnTargetMounted() {
        if (this.target.props.shouldFocusOnCreated) {
            TimerHelper.waitALitteWhile(() => {
                this.hidenInputFocus();
            });
        }
    }
    handleOnTargetOnBatchMounted() {
        if (!this.target.props.preventFocusOnCreated) {
            TimerHelper.waitABit(() => {
                this.hidenInputFocus();
            });
        }
    }
    hidenInputFocus(e) {
        if (!this.target.isReadOnly()) {
            if (this.target.getSafeSelected()) {
                if (e) {
                    this.innerHiddenFocus();
                } else {
                    this.hiddenFocusDelayRunObj.later(this.innerHiddenFocus);
                }
            }
        }
    }
    isHiddenInputFocus() {
        return document.activeElement === this.hiddenInput;
    }
    forceRefreshFocus() {
        return new Promise((e) => {
            this.hiddenInputWrapperBackup.style.left = this.hiddenInputWrapper.style.left;
            this.hiddenInputWrapperBackup.style.top = this.hiddenInputWrapper.style.top;
            this.target.temporaryPreventInput(true);
            this.hiddenInputBackup.focus();
            TimerHelper.waitABit(() => {
                this.target.temporaryPreventInput(false);
                this.hiddenInput.value = "";
                this.hiddenInput.focus();
                e();
            });
        });
    }
    calculateHiddenInputPosition(e, t) {
        var n = e.top;
        var r = e.left;
        if (t) {
            var a = this.target.getExpecEditorTopPosition();
            var i = DOMHelper.getElementRect(this.target.getMathTypeHtmlElement());
            n = 100 - Math.min(i.top - a, 0);
            r = 100 - Math.min(i.left - this.target.getLeftSideBarWidth() || 0, 0);
        }
        if (Global.shouldMoveHiddenInputOnFocus()) {
            if (Global.isMobileOrTablet()) {
                return this.hiddenInputWrapper.style.top = n + "px",
                this.hiddenInputWrapper.style.left = r + "px",
                this.hiddenInputWrapperForFocusInput.style.top = n + "px",
                void(this.hiddenInputWrapperForFocusInput.style.left = r + "px");
            }
            var o = "".concat(n + 25, "px");
            var s = "top:".concat(o, ";left:").concat(r, "px;");
            this.hiddenInputWrapperBackup.style.cssText = s;
            this.hiddenInputWrapperForFocusInput.style.cssText = s;
            this.hiddenInputWrapper.style.cssText = s;
        }
    }
    getHiddenInput() {
        return this.hiddenInput;
    }
    renderHiddenInputWrapper() {
        return React.createElement("hidden-input-wrapper", {
            ref: this.getHiddenInputBackupWrapperRef
        },
        React.createElement("input", {
            autoCorrect: "off",
            autoCapitalize: "off",
            ref: this.getHiddenInputBackupRef
        }));
    }
}
/*n.d(t, "a", function () {
    return FocusHandler;
})*/

export default FocusHandler