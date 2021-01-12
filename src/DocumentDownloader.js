import { Promise } from 'bluebird';
import MathGlobal from './MathGlobal';

/// xxx(1563) /*DocumentDownloader*/

/// var Ne = n(30)/*blubirdjs*/;  // 2 times
/// var ke = n.n(Ne);
/// var Pa = n(28)/*MathGlobal*/;  // 1 times
var DocumentDownloader = new class {
    download(e) {
        return new Promise((t, n) => {
            var r = new XMLHttpRequest;
            var a = "https://resources-proxy.mathcha.io/".concat(e);
            if (MathGlobal.isElectronEnv() && e.startsWith("data-resources/")) {
                a = e;
            }
            r.open("GET", a, true);
            r.responseType = "blob";
            r.onloadend = function (e) {
                t(r.response);
            };
            r.onerror = function () {
                n();
            };
            r.send(null);
        });
    }
    downloadAsStr(e) {
        return new Promise((t, n) => {
            var r = new XMLHttpRequest;
            r.open("GET", e, true);
            r.responseType = "text";
            r.onloadend = function (e) {
                t(r.response);
            };
            r.onerror = function () {
                n();
            };
            r.send(null);
        });
    }
};
/*n.d(t, "a", function () {
    return DocumentDownloader;
});*/

export default DocumentDownloader