import { Promise } from 'bluebird';
import LZString from 'lz-string';
import ConsoleLog from './ConsoleLog';
import DefaultDataModel from './DefaultDataModel';
import Serialization from './Serialization';

/// xxx(1551) /*AppStorage*/

/// var Mt = n(746)/*DefaultDataModel*/;  // 1 times
/// var wt = n.n(Mt);
/// var Ot = n(491)/*lz-string*/;  // 2 times
/// var Rt = n(65)/*ConsoleLog*/;  // 2 times
/// var Ne = n(30)/*blubirdjs*/;  // 1 times
/// var ke = n.n(Ne);
/// var K = n(136)/*Serialization*/  // 1 times
var AppStorage = new class {
    constructor() {
        this.isSupport = this.isSupported(window.localStorage);
        this.memoryStorage = {};
    }
    isSupported(e) {
        try {
            var t = "__some_random_key_you_are_not_going_to_use__";
            e.setItem(t, t);
            e.removeItem(t);
            ConsoleLog.info("Local Storage is supported");
            return true;
        } catch(e) {
            ConsoleLog.warn("Local Storage is NOT supported");
            return false;
        }
    }
    savePageContent(e) {
        var t = JSON.stringify(e, function (e, t) {
            if (! (e.length > 3 && "_" == e[0] && "_" == e[1] && "_" == e[2])) {
                return t;
            }
        });
        var n = LZString.compressToUTF16(t);
        if (this.isSupport) {
            window.localStorage.setItem("math-data", n);
        } else {
            this.memoryStorage["math-data"] = n;
        }
        return Promise.resolve("ok");
    }
    loadPageContent() {
        var e = this.isSupport ? window.localStorage.getItem("math-data") : this.memoryStorage["math-data"];
        if (e) {
            return JSON.parse(LZString.decompressFromUTF16(e));
        }
        var t = Serialization.parseFromSavedModel(DefaultDataModel);
        this.savePageContent(t);
        return t;
    }
};
/*n.d(t, "a", function () {
    return AppStorage;
});*/

export default AppStorage