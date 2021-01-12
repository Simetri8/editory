import _ from 'lodash';
import process from 'process';
import Sniffr from 'sniffr';

/// xxx(11) /*Global*/

/// var e = n(169)/*process*/;  // 0 times
/*n.d(t, "a", function () {
    return Environment
});*/
/*n.d(t, "b", function () {
    return df
});*/
/// var r = n(543)/*sniffr*/;  // 2 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 1 times
/// var o = n.n(i);
class Environment {
    constructor() {
        var e = this.getWindow();
        var t = new Sniffr;
        t.sniff(e.navigator.userAgent);
        this.sniffr = t;
        this.browserName = this.sniffr.browser.name;
        this.browserMajorVersion = Number.parseInt(this.sniffr.browser.version[0], 10);
        this.cacheShouldMoveHiddenInputOnFocus = !0;
        var n = new Sniffr;
        n.sniff("Mozilla/5.0 (Android 5.1;Tablet;rv:55.0) Gecko/55.0 Firefox/55.0");
        var r = e.navigator.platform;
        this.isPossibleLinuxFlag = /Linux/.test(r)
    }
    getWindow() {
        return window
    }
    getOsName() {
        return this.sniffr.os.name
    }
    isFirefoxOs() {
        return "firefoxos" == this.sniffr.os.name
    }
    isMac() {
        return "macos" == this.getOsName()
    }
    isPossibleLinux() {
        return this.isPossibleLinuxFlag
    }
    isFirefox() {
        return "firefox" == this.browserName
    }
    isSafari() {
        return "safari" == this.browserName
    }
    isChrome() {
        return "chrome" == this.browserName
    }
    isNoBoundingClientRectSupportForRange() {
        return this.isSafari() || this.isIos()
    }
    shouldMoveHiddenInputOnFocus() {
        return this.cacheShouldMoveHiddenInputOnFocus
    }
    isDevEnv() {
        return window.mathGlobal && "dev" == window.mathGlobal.environment
    }
    isEdge() {
        return "edge" == this.browserName
    }
    shouldRangeDetach() {
        return !this.isEdge()
    }
    getBrowserMajorVersion() {
        return this.browserMajorVersion
    }
    isMobileOrTablet() {
        return "Unknown" !== this.sniffr.device.name || this.isIos() || this.isAndroid() || this.isFirefoxOs()
    }
    getScreenWidth() {
        return window.screen.width
    }
    shouldUseSmallLayout() {
        return this.isMobileOrTablet() && this.getScreenWidth() < 900
    }
    isIos() {
        return "ios" == this.sniffr.os.name
    }
    isAndroid() {
        return "android" == this.sniffr.os.name
    }
    isTestEnv() {
        return window.location.href.indexOf("---test---") >= 0
    }
    saveAsHtml() {
        return this.isTestEnv() || window.location.href.indexOf("-save-as-html-") >= 0
    }
    isTestWithBigBorderAsPadding() {
        return window.location.href.indexOf("-big-border-") >= 0
    }
    shouldUseBigBorder() {
        return this.isTestWithBigBorderAsPadding() || !this.isTestEnv()
    }
    isElectronEnv() {
        return !! Object({
            NODE_ENV: "production",
            NO_CDN: !1
        }).ELECTRON
    }
    isUploadHandleByService() {
        return this.isElectronEnv()
    }
    allowToChangeImage() {
        return !this.isUploadHandleByService()
    }
    useCdn() {
        return !Object({
            NODE_ENV: "production",
            NO_CDN: !1
        }).ELECTRON
    }
    resolveStaticAssetPath(e) {
        return e = this.makeSureStartWithSlash(e),
        this.useCdn() ? "http://localhost:3001".concat(e) : e
    }
    allowSaveAsMathchaFile() {
        return window.location.href.indexOf("---save-as-mathcha---") >= 0 || this.isElectronEnv()
    }
    allowImportFromMathchaFile() {
        return window.location.href.indexOf("---save-as-mathcha---") >= 0 || this.isElectronEnv()
    }
    headerDoubleClickToToggleMaximize() {
        return this.isElectronEnv()
    }
    isOfflineMode() {
        return this.isElectronEnv()
    }
    isMenuHandledByService() {
        return this.isElectronEnv()
    }
    isDataOffline() {
        return window.location.href.indexOf("---data-offline---") >= 0 || this.isOfflineMode()
    }
    supportTextJustify() {
        return this.isChrome()
    }
    makeSureStartWithSlash(e) {
        return _.startsWith(e, "/") ? e : "/" + e
    }
    inNodeEnv() {
        return false
    }
    supportSaveAsPDF() {
        return this.isElectronEnv()
    }
    moreFonts() {
        return !0
    }
    isCollaboratingTesting() {
        return window.location.href.indexOf("---collaborating---") >= 0
    }
    isDarkMode() {
        return window.location.href.indexOf("-dark-mode-") >= 0
    }
    suppressPreloadFont() {
        return window.location.href.indexOf("-suppress-font-preload-") >= 0
    }
}
var df = new Environment;
var Global = df;

export { Environment as GlobalA }

export { df as GlobalB }

export default Global