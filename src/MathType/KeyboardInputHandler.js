import _ from 'lodash';
import React from 'react';
import ConsoleLog from '../ConsoleLog';
import DOMHelper from '../Elements/DOMHelper';
import EntityHelper from '../Editor/EntityHelper';
import Global from '../Global';
import HotkeyInfo from '../Mathcha/HotkeyInfo';
import StyleHelper from '../Mathcha/StyleHelper';
import TextUtils from '../Editor/TextUtils';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1594) /*KeyboardInputHandler*/

/// var i = n(0)/*React*/;  // 1 times
/// var o = n.n(i);
/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var w = n(36)/*TextUtils*/;  // 1 times
/// var N = n(18)/*StyleHelper*/;  // 1 times
/// var j = n(63)/*EntityHelper*/;  // 1 times
/// var q = n(65)/*ConsoleLog*/;  // 1 times
/// var ee = n(11)/*Global*/;  // 15 times
/// var X = n(143)/*HotkeyInfo*/;  // 2 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
class Ue {
    isListItemLine(e) {
        var t = e.model.lines[e.cursorSelected.lineIndex];
        return !! StyleHelper.getLineStyle(t, "listType", void 0);
    }
}
class We extends Ue {
    isSaveKey(e) {
        return e.metaKey && 83 === e.keyCode;
    }
    map(e, t) {
        switch (e.keyCode) {
        case 65:
            return e.metaKey ? "select-all" : null;
        case 66:
            return e.metaKey ? t.isTextModeSelected() ? "toggle-bold" : e.shiftKey ? "toggle-mathbb" : "toggle-mathbf" : null;
        case 73:
            return e.metaKey && t.isTextModeSelected() ? "toggle-italic" : null;
        case 85:
            return e.metaKey && t.isTextModeSelected() ? "toggle-underline" : null;
        case 67:
            return e.metaKey ? e.shiftKey && !t.isTextModeSelected() ? "toggle-mathcal" : "copy" : null;
        case 82:
            return e.metaKey && e.shiftKey ? "toggle-mathrm" : null;
        case 86:
            return e.metaKey ? "paste" : null;
        case 88:
            return e.metaKey ? "cut" : null;
        case 37:
            return e.metaKey ? "first-line" : e.altKey ? "previous-break" : "left";
        case 115:
            return e.metaKey || e.ctrlKey ? "home" : "first-line";
        case 38:
            return e.metaKey ? "home" : "up";
        case 39:
            return e.metaKey ? "end-line" : e.altKey ? "next-break" : "right";
        case 119:
            return e.metaKey || e.ctrlKey ? "end" : "end-line";
        case 40:
            return e.metaKey ? "end" : "down";
        case 13:
            return e.shiftKey ? "enter-clear" : "enter";
        case 8:
            return e.altKey ? "word-backspace" : "backspace";
        case 90:
            return e.metaKey && e.shiftKey ? "redo" : e.metaKey ? "undo" : null;
        case 9:
            return e.ctrlKey ? null : t.isAtTabularCell() ? e.shiftKey ? "previous-cell" : t.isLastTabularCell() ? "step-out" : "next-cell" : t.isTextModeSelected() ? this.isListItemLine(t) ? e.shiftKey ? "outdent" : "indent" : "tab" : e.shiftKey ? t.findPreviousElementNameOfComposite() ? "previous-element" : "none" : t.findNextElementNameOfComposite() ? "next-element" : "step-out";
        case 46:
            return e.altKey ? "word-delete" : "delete";
        }
    }
}
class Ge extends Ue {
    isSaveKey(e) {
        return e.ctrlKey && 83 === e.keyCode;
    }
    map(e, t) {
        switch (e.keyCode) {
        case 65:
            return e.ctrlKey ? "select-all" : null;
        case 66:
            return e.ctrlKey ? t.isTextModeSelected() ? "toggle-bold" : e.shiftKey ? "toggle-mathbb" : "toggle-mathbf" : null;
        case 73:
            return e.ctrlKey && t.isTextModeSelected() ? "toggle-italic" : null;
        case 85:
            return e.ctrlKey && t.isTextModeSelected() ? "toggle-underline" : null;
        case 67:
            return e.ctrlKey ? e.shiftKey && !t.isTextModeSelected() ? "toggle-mathcal" : "copy" : null;
        case 82:
            return e.ctrlKey && e.shiftKey ? "toggle-mathrm" : null;
        case 86:
            return e.ctrlKey ? "paste" : null;
        case 88:
            return e.ctrlKey ? "cut" : null;
        case 37:
            return e.ctrlKey ? "previous-break" : "left";
        case 36:
            return e.ctrlKey ? "home" : "first-line";
        case 38:
            return "up";
        case 35:
            return e.ctrlKey ? "end" : "end-line";
        case 39:
            return e.ctrlKey ? "next-break" : "right";
        case 40:
            return "down";
        case 13:
            return e.shiftKey ? "enter-clear" : "enter";
        case 8:
            return e.ctrlKey ? "word-backspace" : "backspace";
        case 89:
            return e.ctrlKey ? "redo" : null;
        case 90:
            return e.ctrlKey ? "undo" : null;
        case 9:
            return e.ctrlKey ? null : t.isAtTabularCell() ? e.shiftKey ? "previous-cell" : t.isLastTabularCell() ? "step-out" : "next-cell" : t.isTextModeSelected() ? this.isListItemLine(t) ? e.shiftKey ? "outdent" : "indent" : "tab" : e.shiftKey ? t.findPreviousElementNameOfComposite() ? "previous-element" : "none" : t.findNextElementNameOfComposite() ? "next-element" : "step-out";
        case 46:
            return e.ctrlKey ? "word-delete" : "delete";
        }
    }
}
var KeyboardInputMapping = new class {
    constructor() {
        if (Global.isMac()) {
            this.actionMapping = new We;
        } else {
            this.actionMapping = new Ge;
        }
    }
    isSaveKey(e) {
        return this.actionMapping.isSaveKey(e);
    }
    isAlphaBetaNumber(e) {
        return e >= 48 && e <= 57 || e >= 65 && e <= 90;
    }
    getCommandFrom(e, t) {
        if (!e.metaKey && !e.ctrlKey && !e.altKey && this.isAlphaBetaNumber(e.keyCode)) {
            return {
                action: null,
                e: e
            };
        }
        var n = this.actionMapping.map(e, t);
        return Global.isPossibleLinux() && 90 === e.keyCode && e.shiftKey && e.ctrlKey ? {
            action: "redo",
            e: e
        } : {
            action: n,
            e: e
        };
    }
};
class KeyboardInputHandler {
    constructor(e) {
        this.target = e;
        this.onEditorKeyDown = (e) => {
            if (!this.handleShortcut(e)) {
                if (Global.isMac()) {
                    if (75 === e.keyCode && e.metaKey) {
                        return void this.target.showLinkInput();
                    }
                } else {
                    if (75 === e.keyCode && e.ctrlKey) {
                        return void this.target.showLinkInput();
                    }
                }
                if (9 === e.keyCode && this.target.isConfirmDeleteWithTabular()) {
                    return e.preventDefault(),
                    e.stopPropagation(),
                    void this.target.requestConfirmDeleteTabularToggleRowColumn();
                }
                if (13 === e.keyCode && this.target.props.handleEnter) {
                    this.target.props.handleEnter(e);
                } else {
                    if (27 != e.keyCode) {
                        if (!Global.isIos() || (13 != e.keyCode && 32 != e.keyCode && 9 != e.keyCode || this.cleanReserveAndInput(e), 8 != e.keyCode || !this.hasAnyReserveInput() && !this.target.getController().isInInputComposition())) {
                            if (this.isArrowKey(e) && this.target.forceStopCompositionOrReserve(), KeyboardInputMapping.isSaveKey(e)) {
                                return e.stopPropagation(),
                                e.preventDefault(),
                                void(this.target.props.onSaveRequest && this.target.props.onSaveRequest());
                            }
                            if (Global.isMac()) {
                                if (e.metaKey && 82 === e.keyCode) {
                                    return void console.log("refresh");
                                }
                                if (e.metaKey && 70 === e.keyCode) {
                                    return void console.log("find");
                                }
                            } else {
                                if (116 === e.keyCode) {
                                    return void console.log("refresh");
                                }
                                if (e.ctrlKey && 70 === e.keyCode) {
                                    return void console.log("find");
                                }
                            }
                            if (this.target.needShowCursor(), this.matchAutoCompleteKey(e) && this.target.requestAutoComplete()) {
                                return e.preventDefault(),
                                void e.stopPropagation();
                            }
                            if (Global.isMac()) {
                                if (e.metaKey && 13 === e.keyCode && this.target.requestAutoComplete()) {
                                    return e.preventDefault(),
                                    void e.stopPropagation();
                                }
                            } else {
                                if (e.altKey && 13 === e.keyCode && this.target.requestAutoComplete()) {
                                    return e.preventDefault(),
                                    void e.stopPropagation();
                                }
                            }
                            var t = this.target.getController().handleKey(e, this.target.getContainerModel());
                            this.target.handleResult(t, e);
                        }
                    } else {
                        var n = this.target.getContainerModel();
                        if (n.isInsideDiagram() && !n.isCursorControlled) {
                            e.preventDefault();
                            e.stopPropagation();
                            var r = EntityHelper.buildDiagramControlledSelected(n.cursorSelected);
                            if (!r) {
                                return;
                            }
                            this.target.setSelected(r);
                        } else {
                            if (this.target.isConfirmDeleted()) {
                                this.target.clearConfirmDelete();
                            }
                        }
                    }
                }
            }
        };
        this.onEditorInput = (e) => {
            if (this.temporarySupressInputFromLastCompositionEnd) {
                var t = this.target.getHiddenInput();
                if (Global.isIos()) {
                    TimerHelper.waitABit(() => {
                        t.value = "";
                    });
                } else {
                    t.value = "";
                }
            } else {
                if (!this.temporarySupressInputUntilCompositionEnd) {
                    var n = this.target;
                    var r = e.currentTarget.value;
                    if ("\\" == r && this.target.requestAutoComplete()) {
                        return e.preventDefault(),
                        e.stopPropagation(),
                        void(e.currentTarget.value = "");
                    }
                    if ("\b" != r) {
                        if (!Global.isIos() || n.getController().isInInputComposition()) {
                            var a = n.getController().handleTextInput(r, n.getContainerModel());
                            n.handleResult(a, e);
                            this.reserveTextInput = "";
                            if (!_.isArray(a) && a && a.keyInfo && a.keyInfo.clearHiddenIputText) {
                                e.currentTarget.value = "";
                            }
                        } else {
                            var i = this.inferInputActionFromInput(e);
                            if (console.log("actionInfo", i), "insert" == i.action) {
                                var o = n.getController().handleTextInput(i.text, n.getContainerModel());
                                n.handleResult(o, e);
                            } else {
                                if ("backspace" == i.action) {
                                    var s = n.getController().requestBackSpaceCurrent(n.getContainerModel());
                                    n.handleResult(s, e);
                                } else {
                                    if ("clear" == i.action) {
                                        this.cleanReserveAndInput();
                                    }
                                }
                            }
                        }
                    } else {
                        ConsoleLog.warn("Composition:backspace inputted");
                    }
                }
            }
        };
        this.onEditorCompositionEnd = (e) => {
            if (console.log("compose end:", e.data), this.temporarySupressInputUntilCompositionEnd && (this.temporarySupressInputUntilCompositionEnd = false), this.hideCompositionIndicator(), !this.target.getController().isInInputComposition()) {
                return e.preventDefault(),
                e.stopPropagation(),
                e.currentTarget.value = "",
                void this.temporaryPreventInput();
            }
            if (Global.isFirefox()) {
                var t = this.target.getController().composeEnd(e.data, this.target.getContainerModel());
                this.target.handleResult(t);
            } else {
                if (Global.isIos()) {
                    var n = this.target.getController().composeEnd(e.data, this.target.getContainerModel());
                    this.target.handleResult(n);
                } else {
                    this.target.getController().composeEnd(e.data, this.target.getContainerModel());
                }
            }
            e.currentTarget.value = "";
            this.temporaryPreventInput();
        };
        this.onEditorCompositionStart = () => {
            console.log("Composition start");
            this.target.getController().composeStart();
        };
        this.getCompositionIndicatorRef = (e) => {
            this.compositionIndicator = e;
        };
    }
    changeSettings(e) {
        this.suggestionBoxHotkeyInfo = HotkeyInfo.safeParseHotkey(e && e.suggestionBoxTriggerShortcut);
    }
    matchAutoCompleteKey(e) {
        if (this.suggestionBoxHotkeyInfo) {
            try {
                return HotkeyInfo.match(e, this.suggestionBoxHotkeyInfo) || 220 === e.keyCode && !e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey;
            } catch(e) {}
        }
        return ! (220 != e.keyCode || e.shiftKey || e.metaKey || e.altKey || e.ctrlKey);
    }
    handleShortcut(e) {
        var t = this.target.getShortcutMatcher().matchHotkey(e, this.storedFirstHotkeyMatch);
        if (!t) {
            return this.storedFirstHotkeyMatch && (this.storedFirstHotkeyMatch = null),
            false;
        }
        if (e.preventDefault(), e.stopPropagation(), "first-matched" == t.type) {
            return console.log("handled!!"),
            this.storedFirstHotkeyMatch = t,
            true;
        }
        this.storedFirstHotkeyMatch = null;
        var n = this.target.getController();
        var r = this.target.getContainerModel();
        var a = r.isTextModeSelected() ? t.data.textModeLine : t.data.mathModeLine;
        if (!a) {
            return false;
        }
        console.log("handled!!");
        var i = n.insertLines([a], r);
        return this.target.handleResult(i),
        true;
    }
    cleanReserveAndInput(e) {
        if (Global.isIos()) {
            this.reserveTextInput = "";
            if (e) {
                e.currentTarget.value = "";
            } else {
                this.target.getHiddenInput().value = "";
            }
        }
    }
    hasAnyReserveInput() {
        return !! this.reserveTextInput;
    }
    temporaryPreventInputUntilCompositionEnd() {
        if (Global.isIos()) {
            this.temporarySupressInputUntilCompositionEnd = true;
            setTimeout(() => {
                this.temporarySupressInputUntilCompositionEnd = false;
            },
            1e3);
        }
    }
    temporaryPreventInput(e) {
        if (Global.isSafari() || Global.isIos()) {
            if (this.temporarySupressInputFromLastCompositionEnd = true, e) {
                return;
            }
            setTimeout(() => {
                this.temporarySupressInputFromLastCompositionEnd = false;
            },
            20);
        }
    }
    isArrowKey(e) {
        return 37 === e.keyCode || 38 === e.keyCode || 39 === e.keyCode || 40 === e.keyCode;
    }
    inferInputActionFromInput(e) {
        var t = e.currentTarget.value;
        if (!Global.isIos()) {
            return {
                action: "nothing"
            };
        }
        if (this.target.getController().isInInputComposition()) {
            return {
                action: "nothing"
            };
        }
        if (!this.reserveTextInput) {
            return this.reserveTextInput = t,
            {
                action: "insert",
                text: t
            };
        }
        if (this.reserveTextInput.length < t.length) {
            if (0 != t.indexOf(this.reserveTextInput)) {
                return {
                    action: "clear"
                };
            }
            var n = {
                action: "insert",
                text: t.substring(this.reserveTextInput.length)
            };
            return this.reserveTextInput = t,
            n;
        }
        return this.reserveTextInput.length > t.length ? 0 != this.reserveTextInput.indexOf(t) ? {
            action: "clear"
        } : (this.reserveTextInput = t, {
            action: "backspace"
        }) : {
            action: "nothing"
        };
    }
    calculateCompositionLineDrawing(e, t) {
        if (this.target.getController().isInInputComposition()) {
            if ("none" == this.compositionIndicator.style.display) {
                if (this.compositionIndicator.style.display = "", this.compositionIndicator.style.top = e.top + e.cursorHeight + "px", null != t.charIndexInBlock && t.charIndexInBlock > 0) {
                    var n = DOMHelper.rangeFromIndex(t.attachGeoPosElement, TextUtils.rawIndexAt(t.attachGeoPosElement, t.charIndexInBlock - 1));
                    var r = DOMHelper.findPosCoresspondingTo(n, this.target.getMathTypeHtmlElement());
                    this.compositionIndicator.style.left = r.left + "px";
                } else {
                    this.compositionIndicator.style.left = e.left - e.cursorHeight / 2 + "px";
                }
            }
            this.compositionIndicator.style.width = e.left - Number.parseFloat(this.compositionIndicator.style.left) + "px";
        }
    }
    hideCompositionIndicator() {
        this.compositionIndicator.style.display = "none";
    }
    renderCompositionIndicator() {
        return React.createElement("composition-indicator", {
            style: {
                display: "none"
            },
            ref: this.getCompositionIndicatorRef
        });
    }
}
/*n.d(t, "a", function () {
    return KeyboardInputHandler;
});*/
/*n.d(t, "KeyboardInputMapping", function () {
    return KeyboardInputMapping;
})*/

export { KeyboardInputMapping }

export default KeyboardInputHandler