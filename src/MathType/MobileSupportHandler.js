import _ from 'lodash';
import classNames from 'classnames';
import Hammer from 'hammerjs';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import BlockHelper from '../Elements/BlockHelper';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import Global from '../Global';
import InitHelper from '../InitHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1593) /*MobileSupportHandler*/

/// var i = n(0)/*React*/;  // 23 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 3 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 2 times
/// var d = n.n(c);
/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var C = n(2)/*lodash*/;  // 3 times
/// var x = n.n(C);
/// var hn = n.n(dn);
/// var ye = n(5)/*sizzle*/;  // 13 times
/// var Ae = n.n(ye);
/// var I = n(12)/*BlockHelper*/;  // 3 times
/// var Y = n(32)/*InitHelper*/;  // 3 times
/// var ee = n(11)/*Global*/;  // 11 times
/// var Lt = n(19)/*TimerHelper*/;  // 3 times
/// var cn = n(24)/*EventHelper*/;  // 3 times
/// var dn = n(245)/*hammer*/;  // 1 times
class ln extends React.Component {
    shouldComponentUpdate(e) {
        return this.props.show != e.show || this.props.selectOnly != e.selectOnly || BlockHelper.isControlledSelected(this.props.mainSelected) != BlockHelper.isControlledSelected(e.mainSelected);
    }
    handleArrowMove(e, t) {
        this.props.handleArrowMove(e, t);
    }
    handleInsertMathOrTextSymbolFromKey(e, t) {
        this.props.handleInsertMathOrTextSymbolFromKey(e, t);
    }
    getKeyStyle(e) {
        return {
            width: e || "37px"
        };
    }
    getMathKeys() {
        return this.cacheMathKeys || (this.cacheMathKeys = _.map(["\\sqrt", "\\frac", "\\power", "\\index", "=", "+", "-", "\\vec", "\\int", "\\sum"], (e) => {
            var t = InitHelper.getByName(e);
            var n = e;
            return t.renderSymbol && (n = t.renderSymbol()),
            React.createElement("button", {
                key: e,
                className: "btn-ripple math-symbol",
                onTouchStart: this.handleInsertMathOrTextSymbolFromKey.bind(this, e),
                onMouseDown: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                },
                style: {
                    display: "none",
                    width: 37,
                    fontFamily: "Asana"
                }
            },
            n);
        })),
        this.cacheMathKeys;
    }
    getTextKeys() {
        return this.cacheTextKeys || (this.cacheTextKeys = _.map(["\\inline-math", "\\math-container"], (e) => {
            var t = InitHelper.getByName(e);
            var n = e;
            return t.renderSymbol && (n = t.renderSymbol()),
            React.createElement("button", {
                key: e,
                className: "btn-ripple text-to-math-symbol",
                onTouchStart: this.handleInsertMathOrTextSymbolFromKey.bind(this, e),
                onMouseDown: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                },
                style: {
                    display: "none",
                    width: 37,
                    fontFamily: "Asana"
                }
            },
            n);
        })),
        this.cacheTextKeys;
    }
    setBottomPosition(e) {
        var t = ReactDOM.findDOMNode(this);
        jQuery(t).css({
            top: "unset",
            bottom: e
        });
    }
    setEditMode(e) {
        if (this.props.show) {
            var t = ReactDOM.findDOMNode(this);
            if ("unknown" != e) {
                jQuery(t).css({
                    display: ""
                });
                jQuery(t).find(">.math-symbol").css({
                    display: "text" == e ? "none" : "inline-block"
                });
                jQuery(t).find(">.text-to-math-symbol").css({
                    display: "math" == e ? "none" : "inline-block"
                });
            } else {
                jQuery(t).css({
                    display: "none"
                });
            }
        }
    }
    render() {
        if (!this.props.show) {
            return React.createElement("x-empty", null);
        }
        var e;
        var t = {};
        if (BlockHelper.isControlledSelected(this.props.mainSelected)) {
            t.left = 35;
            e = React.createElement("button", {
                className: "btn-ripple",
                onMouseDown: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.props.requestCopy(e);
                },
                style: this.getKeyStyle(48)
            },
            "Copy");
        }
        var n = this.getKeyStyle();
        var r = this.getMathKeys();
        var a = this.getTextKeys();
        var i = classNames("mobile-keys-support-region", {
            "select-only": this.props.selectOnly,
            "is-android": Global.isAndroid()
        });
        return React.createElement("arrows-key-support", {
            class: i,
            style: t
        },
        React.createElement("button", {
            className: "btn-ripple",
            onTouchStart: this.handleArrowMove.bind(this, "left"),
            onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
            },
            onTouchEnd: this.props.endArrowMoveHold,
            onTouchCancel: this.props.endArrowMoveHold,
            style: n
        },
        React.createElement("i", {
            className: "fa fa-arrow-left",
            "aria-hidden": "true"
        })), React.createElement("button", {
            className: "btn-ripple",
            onTouchStart: this.handleArrowMove.bind(this, "right"),
            onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
            },
            onTouchEnd: this.props.endArrowMoveHold,
            onTouchCancel: this.props.endArrowMoveHold,
            style: n
        },
        React.createElement("i", {
            className: "fa fa-arrow-right",
            "aria-hidden": "true"
        })), React.createElement("button", {
            className: "btn-ripple",
            onTouchStart: this.handleArrowMove.bind(this, "up"),
            onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
            },
            onTouchEnd: this.props.endArrowMoveHold,
            onTouchCancel: this.props.endArrowMoveHold,
            style: n
        },
        React.createElement("i", {
            className: "fa fa-arrow-up",
            "aria-hidden": "true"
        })), React.createElement("button", {
            className: "btn-ripple",
            onTouchStart: this.handleArrowMove.bind(this, "down"),
            onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
            },
            onTouchEnd: this.props.endArrowMoveHold,
            onTouchCancel: this.props.endArrowMoveHold,
            style: n
        },
        React.createElement("i", {
            className: "fa fa-arrow-down",
            "aria-hidden": "true"
        })), e, React.createElement("button", {
            className: "btn-ripple",
            onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.props.requestPaste(e);
            },
            style: this.getKeyStyle(53)
        },
        "Paste"), r, a);
    }
}
class MobileSupportHandler {
    constructor(e) {
        this.target = e;
        this.arrowKeySupportLaterRunObj = TimerHelper.createLaterRunObject("latest", "a-little-while");
        this.onMathTypeTouchStart = (e) => {
            if (e.nativeEvent.handledTouchStart) {
                this.handledTouchStart = true;
            }
        };
        this.getSelectionMarkRef = (e) => {
            this.selectionMark = e;
        };
        this.getArrowsKeySupportRef = (e) => {
            this.arrowsKeySupport = e;
        };
        this.updateArrowsKeySupportStatusRunLaterFunc = () => {
            if (this.arrowsKeySupport) {
                var e = "unknown";
                if (this.target.getSafeSelected()) {
                    e = this.target.getContainerModel().isTextModeSelected() ? "text" : "math";
                }
                this.arrowsKeySupport.setEditMode(e);
            }
        };
        this.onMathTypeTouchEnd = () => {
            this.target.setMouseDown(false);
            if (this.target.state.contextMenuShowInfo) {
                TimerHelper.next(() => {
                    if (this.target.state.contextMenuShowInfo) {
                        this.target.state.contextMenuShowInfo.touchRelease = true;
                    }
                });
            }
            this.handledTouchStart = false;
        };
        this.onSelectionMarkTouchEnd = (e) => {
            this.selectionTouchMargin = null;
            jQuery(e.target).find(">exact-mark").css({
                display: "none"
            });
            e.preventDefault();
            e.stopPropagation();
        };
        this.onSelectionMarkTouchStart = (e) => {
            this.target.forceStopCompositionOrReserve();
            var t = EventHelper.getLeftTopFromEvent(e);
            var n = DOMHelper.getElementRect(this.target.getMathTypeHtmlElement());
            this.selectionTouchMargin = {
                dx: t.left - n.left - Number.parseInt(jQuery(e.target).css("left"), 10),
                dy: t.top - n.top - Number.parseInt(jQuery(e.target).css("top"), 10)
            };
            e.preventDefault();
            e.stopPropagation();
        };
        this.onSelectionMarkTouchMove = (e) => {
            var t = EventHelper.getLeftTopFromEvent(e);
            var n = DOMHelper.getElementRect(this.target.getMathTypeHtmlElement());
            var r = {
                left: t.left - n.left - this.selectionTouchMargin.dx,
                top: t.top - n.top - this.selectionTouchMargin.dy
            };
            jQuery(e.target).css(r);
            jQuery(e.target).find(">exact-mark").css({
                display: "block"
            });
            var a = {
                left: r.left + 19 + n.left,
                top: r.top - 27 + n.top
            };
            e.preventDefault();
            e.stopPropagation();
            if (! (a.left <= 0 || a.top <= 0 || a.left >= n.width || a.top >= n.height)) {
                ReactDOM.unstable_batchedUpdates(() => {
                    this.target.handleSelectFromPosition(document.elementFromPoint(a.left, a.top), a, true);
                });
            }
        };
        this.handleArrowMove = (e, t) => {
            t.preventDefault();
            t.stopPropagation();
            this.target.forceStopCompositionOrReserve();
            this.handleMovePosition(e);
            this.arrowFirstTimeout = setTimeout(() => {
                this.arrowFirstTimeout = void 0;
                this.handleMovePosition(e);
                this.arrowHoldInterval = setInterval(() => {
                    this.handleMovePosition(e);
                },
                80);
            },
            500);
        };
        this.handleMovePosition = (e) => {
            var t;
            switch (e) {
            case "left":
                t = this.target.getController().moveLeft(this.target.getContainerModel());
                break;
            case "up":
                t = this.target.getController().moveUp(this.target.getContainerModel());
                break;
            case "right":
                t = this.target.getController().moveRight(this.target.getContainerModel());
                break;
            case "down":
                t = this.target.getController().moveDown(this.target.getContainerModel());
            }
            this.target.handleResult(t);
        };
        this.handleInsertMathOrTextSymbolFromKey = (e, t) => {
            var n;
            if (t.preventDefault(), t.stopPropagation(), this.target.forceStopCompositionOrReserve(), _.startsWith(e, "\\")) {
                var r = InitHelper.getByName(e);
                n = this.target.getController().handleBySymbolInfo(r, this.target.getContainerModel());
            } else {
                n = this.target.getController().handleTextInput(e, this.target.getContainerModel());
            }
            this.target.handleResult(n);
        };
        this.endArrowMoveHold = () => {
            if (this.arrowHoldInterval || this.arrowFirstTimeout) {
                clearInterval(this.arrowHoldInterval);
                clearTimeout(this.arrowFirstTimeout);
                this.arrowHoldInterval = void 0;
                this.arrowFirstTimeout = void 0;
            }
        };
    }
    renderSelectionMark() {
        if (Global.isMobileOrTablet() && !this.target.isReadOnly()) {
            return React.createElement("selection-mark", {
                style: {
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    left: 200,
                    top: 200,
                    background: "green",
                    border: "1px solid lightgray",
                    borderRadius: "15px",
                    opacity: .5,
                    zIndex: 999
                },
                ref: this.getSelectionMarkRef
            },
            React.createElement("exact-mark", {
                style: {
                    position: "absolute",
                    left: "50%",
                    marginLeft: -3,
                    top: "-27px",
                    display: "none",
                    height: 5,
                    width: 5,
                    border: "1px solid gray",
                    background: "gray",
                    opacity: .6,
                    borderRadius: 3
                }
            }));
        }
    }
    renderCopyPasteButtonForMobile() {
        if (Global.isMobileOrTablet() && !this.target.isReadOnly() && !this.target.isRestrictedView() && this.target.getSafeExtendedSelected()) {
            var e = null;
            var t = null;
            if (!this.target.isSelectOnly()) {
                e = React.createElement("button", {
                    className: "btn-ripple",
                    onMouseDown: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.target.pasteFrom(this.target.getInternalClipboard().copyText);
                    },
                    style: this.getKeyStyle(53)
                },
                "Paste");
                t = React.createElement("button", {
                    className: "btn-ripple",
                    onMouseDown: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.target.getInternalClipboard().copyText = this.target.executeCut();
                    },
                    style: this.getKeyStyle(53)
                },
                "Cut");
            }
            var n = classNames("mobile-keys-support-region", {
                "select-only": this.target.isSelectOnly(),
                "is-android": Global.isAndroid()
            });
            return React.createElement("copy-paste-key-support", {
                class: n
            },
            React.createElement("button", {
                className: "btn-ripple",
                onMouseDown: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.target.getInternalClipboard().copyText = this.target.executeCopy();
                },
                style: this.getKeyStyle(48)
            },
            "Copy"), t, e, React.createElement("button", {
                className: "btn-ripple",
                onMouseDown: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    var t = this.target.getController().selectAll(this.target.getContainerModel());
                    this.target.handleResult(t);
                },
                style: this.getKeyStyle(77)
            },
            "Select All"));
        }
    }
    renderArrowKeySupport() {
        if (Global.isMobileOrTablet() && !(this.target.isReadOnly() || this.target.isSelectOnly() || this.target.isRestrictedView())) {
            return React.createElement(ln, {
                show: !this.target.getSafeExtendedSelected(),
                selectOnly: this.target.isSelectOnly(),
                ref: this.getArrowsKeySupportRef,
                requestPaste: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.target.forceStopCompositionOrReserve();
                    this.target.pasteFrom(this.target.getInternalClipboard().copyText);
                },
                requestCopy: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.target.forceStopCompositionOrReserve();
                    this.target.getInternalClipboard().copyText = this.target.executeCopy();
                },
                mainSelected: this.target.getSafeSelected(),
                handleArrowMove: this.handleArrowMove,
                handleInsertMathOrTextSymbolFromKey: this.handleInsertMathOrTextSymbolFromKey,
                endArrowMoveHold: this.endArrowMoveHold
            });
        }
    }
    registerTouchHold() {
        if (Global.isMobileOrTablet() && !this.target.isReadOnly()) {
            var e = this.target.getElementRoot();
            this.touchHoldHammer = new Hammer(e, {
                touchAction: "auto",
                preset: ["press"]
            });
            this.touchHoldHammer.get("press").set({
                time: 400
            });
            this.touchHoldHammer.on("press pressup", (e) => {
                if (!this.handledTouchStart) {
                    if ("pressup" != e.type) {
                        if (! (this.arrowFirstTimeout || this.arrowHoldInterval)) {
                            console.log("press", e);
                            this.target.showContextMenu({
                                left: e.center.x,
                                top: e.center.y
                            },
                            e.target, {
                                touchRelease: false
                            });
                        }
                    } else {
                        if (this.target.state.contextMenuShowInfo && false === this.target.state.contextMenuShowInfo.touchRelease) {
                            e.preventDefault();
                            TimerHelper.waitALitteWhile(() => {
                                this.target.showContextMenu({
                                    left: e.center.x,
                                    top: e.center.y
                                },
                                e.target, {
                                    touchRelease: true
                                });
                            });
                        }
                    }
                }
            });
        }
    }
    unregisterTouchHold() {
        if (Global.isMobileOrTablet() && !this.target.isReadOnly()) {
            this.touchHoldHammer.off("press");
        }
    }
    unregisterSelectionMarkTouchEvents() {
        if (Global.isMobileOrTablet() && this.selectionMark && !this.target.isReadOnly()) {
            this.selectionMark.removeEventListener("touchstart", this.onSelectionMarkTouchStart);
            this.selectionMark.removeEventListener("touchmove", this.onSelectionMarkTouchMove);
            this.selectionMark.removeEventListener("touchend", this.onSelectionMarkTouchEnd);
            this.selectionMark.removeEventListener("touchcancel", this.onSelectionMarkTouchEnd);
        }
    }
    registerSelectionMarkTouchEvents() {
        if (Global.isMobileOrTablet() && this.selectionMark && !this.target.isReadOnly()) {
            var e = EventHelper.getFalsePassiveObject();
            this.selectionMark.addEventListener("touchstart", this.onSelectionMarkTouchStart, e);
            this.selectionMark.addEventListener("touchmove", this.onSelectionMarkTouchMove, e);
            this.selectionMark.addEventListener("touchend", this.onSelectionMarkTouchEnd, e);
            this.selectionMark.addEventListener("touchcancel", this.onSelectionMarkTouchEnd, e);
        }
    }
    updateArrowsKeySupportStatus() {
        if (Global.isMobileOrTablet()) {
            if (!this.arrowsKeySupport) {
                return;
            }
            this.arrowKeySupportLaterRunObj.later(this.updateArrowsKeySupportStatusRunLaterFunc);
        }
    }
    calculateSelectionMarkPosition(e, t) {
        if (Global.isMobileOrTablet()) {
            if (this.selectionTouchMargin) {
                jQuery(this.selectionMark).css({
                    display: "block"
                });
            } else {
                if (!e && this.target.getSafeSelected()) {
                    jQuery(this.selectionMark).css({
                        left: t.left - 20,
                        top: t.top + 30,
                        display: "block"
                    });
                } else {
                    if (this.selectionMark) {
                        this.hideSelectionMark();
                    }
                }
            }
        }
    }
    isArrowKeyPressOrHold() {
        return ! (!this.arrowFirstTimeout && !this.arrowHoldInterval);
    }
    hideSelectionMark() {
        jQuery(this.selectionMark).css({
            display: "none"
        });
    }
    getKeyStyle(e) {
        return {
            width: e || "37px"
        };
    }
}
/*n.d(t, "a", function () {
    return MobileSupportHandler;
})*/

export default MobileSupportHandler