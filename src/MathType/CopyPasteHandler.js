import ReactDOM from 'react-dom';
import Global from '../Global';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import Serialization from '../Serialization';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1592) /*CopyPasteHandler*/

/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var T = n(7)/*PropUpdateHelper*/;  // 1 times
/// var K = n(136)/*Serialization*/;  // 2 times
/// var ee = n(11)/*Global*/;  // 2 times
/// var Lt = n(19)/*TimerHelper*/;  // 2 times
class CopyPasteHandler {
    constructor(e) {
        this.target = e;
        this.onCopy = (e) => {
            var t = this.executeCopy();
            if (t) {
                var n = this.target.getHiddenInput();
                if (Global.isSafari()) {
                    n.value = t;
                    n.select();
                    TimerHelper.waitALitteWhile(() => {
                        n.value = "";
                    });
                } else {
                    e.clipboardData.setData("text/plain", t);
                    e.preventDefault();
                }
            } else {
                e.preventDefault();
            }
        };
        this.onCut = (e) => {
            var t = this.executeCut(e);
            if (t) {
                var n = this.target.getHiddenInput();
                if (Global.isSafari()) {
                    n.value = t;
                    n.select();
                    TimerHelper.waitALitteWhile(() => {
                        n.value = "";
                    });
                } else {
                    e.clipboardData.setData("text/plain", t);
                    e.preventDefault();
                }
            } else {
                e.preventDefault();
            }
        };
        this.onPaste = (e) => {
            if (console.log("------------------onpaste------------------"), this.target.isReadOnly() || this.target.isSelectOnly()) {
                return e.preventDefault(),
                null;
            }
            var t = e.clipboardData.getData("text/plain");
            this.pasteFrom(t);
            e.preventDefault();
        };
    }
    executeCopy() {
        console.log("------------------executeCopy------------------");
        var e = this.target.getContainerModel();
        var t = this.target.getController().copyAction(e);
        return !t || t.length <= 0 ? null : Serialization.toCopyText(t, e);
    }
    executeCut(e) {
        if (console.log("------------------executeCut------------------"), this.target.isReadOnly() || this.target.isSelectOnly()) {
            return e && e.preventDefault(),
            null;
        }
        var t = this.target.getContainerModel();
        var n = this.target.getController().cutAction(t);
        return !n || n.cutLines.length <= 0 ? null : (this.target.changeModel(n.model, false, {
            mainSelected: n.selected,
            extendedMainSelected: void 0
        }), Serialization.toCopyText(n.cutLines, t));
    }
    pasteFrom(e) {
        if (e) {
            ReactDOM.unstable_batchedUpdates(() => {
                var t = this.target;
                var n = t.getContainerModel();
                var r = t.getController().pasteAction(e, n, {
                    rootSymbolSupports: t.props.rootSymbolSupports
                });
                if (r) {
                    if (r.theoremInfo) {
                        r.model = PropUpdateHelper.setProp(r.model, "theoremInfo", r.theoremInfo);
                    }
                    if ("error" !== r.status) {
                        t.changeModel(r.model, false, {
                            mainSelected: r.selected,
                            extendedMainSelected: void 0
                        });
                        if ("ok" !== r.status) {
                            t.showMessage(r.message, r.status);
                        }
                    } else {
                        t.showError(r.message);
                    }
                }
            });
        }
    }
}
/*n.d(t, "a", function () {
    return CopyPasteHandler;
})*/

export default CopyPasteHandler