import { GlobalA } from './Global';

/// xxx(28) /*MathGlobal*/

/// var r = n(11)/*Global*/;  // 1 times
var mathGlobal = window.mathGlobal;
var MathGlobal = new class extends GlobalA {
    isSaveDisabled() {
        return "main" != mathGlobal.appMode
    }
    isAppSettingStoreDisabled() {
        return "main" != mathGlobal.appMode
    }
    isForceQuickStart() {
        try {
            return window.location.href.indexOf("---quickstart---") >= 0
        } catch(e) {
            return !1
        }
    }
    isDisableSideBar() {
        return window.location.href.indexOf("---side-bar-off---") >= 0
    }
    shareFeatureDisabled() {
        return !! mathGlobal.shareDisabled
    }
    accountFeatureDisabled() {
        return !! mathGlobal.accountDisabled
    }
    headerAsTitle() {
        return !! mathGlobal.headerAsTitle
    }
    hideMenu() {
        return !! mathGlobal.hideMenu
    }
    licenseManagement() {
        return !! mathGlobal.licenseManagement
    }
    windowControls() {
        return !! mathGlobal.windowControls
    }
}

export default MathGlobal