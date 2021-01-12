import _ from 'lodash';
import { Promise } from 'bluebird';
import ReactDOM from 'react-dom';
import DOMHelper from '../Elements/DOMHelper';

/// xxx(1603) /*ResultHandler*/

/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var m = n(4)/*DOMHelper*/;  // 1 times
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var mn = n(30)/*blubirdjs*/;  // 3 times
/// var fn = n.n(mn);
class ResultHandler {
    constructor(e) {
        this.target = e;
        this.handleResult = (e, t) => {
            this.target.isBusy() && console.warn("Mathtype is in busy mode");
            if (e) {
                if ("StopComposition" == e.action) {
                    this.innerHandleResult(e, t);
                } else {
                    Promise.resolve(ReactDOM.unstable_batchedUpdates(() => {
                        this.innerHandleResult(e, t);
                    }));
                }
            } else {
                Promise.resolve();
            }
        };
    }
    innerHandleResult(e, t) {
        if (this.target.resetTempVariables(), null != e) {
            if (_.isArray(e)) {
                return Promise.each(e, (e) => {
                    return this.handleResult(e, t);
                });
            }
            if (e.data && void 0 !== e.data.status && "ok" != e.data.status) {
                var n = e.data;
                this.target.showMessage(n.message, n.status);
                if ("error" == n.status) {
                    return;
                }
            }
            if ("InsertRowColumnIndication" == e.action) {
                this.target.showTabularRowColumnIndication();
                return void this.preventEvent(t);
            }
            if ("Selection" == e.action) {
                var r = e.data;
                this.target.setSelection(r.fromSelected, r.toSelected);
                this.target.setPreventScroll(e.surpressScrollToCursor);
                return void this.preventEvent(t);
            }
            if ("ModelCursorPosition" == e.action) {
                var a = e.data;
                a.selection ? this.target.extendSelection(a.toSelected) : this.target.setSelected(a.toSelected);
                return void t.preventDefault();
            }
            if ("CursorChagnedFromCharId" == e.action) {
                var i = DOMHelper.closestEditor(e.cursorPos.line);
                e.surpressClearCursorHistory && this.target.setSurpressClearCursorHistory(true);
                i.reactInstance.select(e.cursorPos, e.keyInfo.selection);
                return void(e.keyInfo.noPreventDefault || this.preventEvent(t));
            }
            if ("DataOrCursorSelectedInfoChanged" == e.action) {
                this.target.setIsOneLineChanged(e.isOneLineChanged);
                if (this.target.changeModel(e.editorChangeInfo.model, e.isUndoRedo, {
                    mainSelected: e.editorChangeInfo.selected,
                    extendedMainSelected: void 0
                })) {
                    if (! (!t || e.keyInfo && e.keyInfo.noPreventDefault)) {
                        t.preventDefault();
                        t.stopPropagation();
                    }
                }
                if (! (!t || e.keyInfo && e.keyInfo.noPreventDefault)) {
                    if (t) {
                        t.preventDefault();
                    }
                }
                return void(e.keyInfo && e.keyInfo.ingoreFocusAfterChanged && this.target.needFocusAcquire());
            }
            if ("UndoRedo" == e.action) {
                this.target.changeModel(e.editorChangeInfo.model, e.isUndoRedo, {
                    mainSelected: e.editorChangeInfo.selected,
                    extendedMainSelected: e.editorChangeInfo.extendedSelected
                });
                return void this.preventEvent(t);
            }
            if ("SetStyle" == e.action) {
                if (this.target.isPlainTextOnly()) {
                    return;
                }
                this.target.setIsOneLineChanged(e.isOneLineChanged);
                this.target.changeModel(e.data, false, void 0);
                return void this.preventEvent(t);
            }
            if ("SetLineStyle" == e.action) {
                if (this.target.isPlainTextOnly()) {
                    return;
                }
                this.target.changeModel(e.data, false, void 0);
                return void this.preventEvent(t);
            }
            if ("StepOut" == e.action) {
                this.target.setSelected(e.editorChangeInfo.selected);
                return void this.preventEvent(t);
            }
            if ("ConfirmDelete" == e.action) {
                var o = e.data;
                if (this.target.isMathOnly() && 0 === o.lineIndex && 0 === o.charIndex && !o.selected) {
                    return void this.preventEvent(t);
                } else {
                    this.target.setState({
                        confirmDeleted: e.data
                    });
                    return void this.preventEvent(t);
                }
            }
            if ("SetTemporarySelectedBlockStyle" == e.action) {
                return this.target.hidenInputFocus(),
                this.target.setState({
                    temporarySelectedBlockStyle: e.data
                }),
                void this.preventEvent(t);
            }
            if ("ShowMessage" == e.action) {
                var s = e.data;
                this.target.showMessage(s.message, s.type);
                return void this.preventEvent(t);
            }
            if ("RequestImageLibrary" == e.action) {
                this.target.requestImageSelection(null, (e, t) => {
                    this.target.insertImageContainer(e, t && t.isInlineImage);
                },
                e.data);
                return void this.preventEvent(t);
            } else {
                if ("StopComposition" == e.action) {
                    this.target.forceStopCompositionOrReserve();
                } else {
                    if ("ExternalUndoRequest" == e.action) {
                        this.preventEvent(t);
                        return void this.target.onUndoRequest();
                    } else {
                        if ("ExternalRedoRequest" == e.action) {
                            this.preventEvent(t);
                            return void this.target.onRedoRequest();
                        } else {
                            if (null == e.action && e.keyInfo && !e.keyInfo.selection && this.target.getSafeExtendedSelected()) {
                                this.target.clearSelection();
                            }
                            if (null != e.action || e.keyInfo && e.keyInfo.noPreventDefault) {
                                return void 0;
                            } else {
                                if (e.keyInfo && e.keyInfo.event) {
                                    return void this.preventEvent(e.keyInfo.event);
                                } else {
                                    return void this.preventEvent(t);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    preventEvent(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
/*n.d(t, "a", function () {
    return ResultHandler;
})*/

export default ResultHandler