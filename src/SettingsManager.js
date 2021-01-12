import AppStorage from './AppStorage';
import ConsoleLog from './ConsoleLog';
import MathGlobal from './MathGlobal';

/// xxx(1579) /*SettingsManager*/

/// var Rt = n(65)/*ConsoleLog*/;  // 2 times
/// var Pa = n(28)/*MathGlobal*/;  // 2 times
/// var appStorage = n(1551)/*AppStorage*/;  // 1 times
var SettingsManager = new class {
    constructor() {
        var isDisabled = this.isDisabled();
        try {
            ConsoleLog.info("appSetting enable:" + !isDisabled);
            ConsoleLog.info("web worker support:" + !!window.Worker);
        } catch(e) {
            console.warn(e);
        }
    }
    getPageWidth() {
        return this.getOrDefault("pageWidth", 700);
    }
    setPageWidth(e) {
        this.storeSetting("pageWidth", e);
    }
    isReadQuickStart() {
        return !MathGlobal.isForceQuickStart() && this.getOrDefault("isReadQuickStart", false);
    }
    isShowMobileTabletRestriction() {
        return this.getOrDefault("isShowMobileTabletRestriction", false);
    }
    setIsShowMobileTabletRestriction() {
        return this.storeSetting("isShowMobileTabletRestriction", true);
    }
    setIsReadQuickStart(e) {
        this.storeSetting("isReadQuickStart", e);
    }
    isDisabled() {
        var isAppSettingStoreDisabled = MathGlobal.isAppSettingStoreDisabled() || !AppStorage.isSupport;
        return isAppSettingStoreDisabled;
    }
    storeSetting(name, val) {
        if (!this.isDisabled()) {
            try {
                var settings = this.getAllSettings();
                settings[name] = val;
                window.localStorage.setItem("settings", JSON.stringify(settings));
            } catch(e) {
                console.warn(e);
            }
        }
    }
    getOrDefault(name, val) {
        if (this.isDisabled()) {
            return val;
        }
        var settings = this.getAllSettings();
        var setting = void 0 === settings[name] ? val : settings[name];
        return setting;
    }
    getAllSettings() {
        var e = window.localStorage.getItem("settings");
        var settings = e ? JSON.parse(e) : {};
        return settings;
    }
};
/*n.d(t, "a", function () {
    return SettingsManager;
});*/

export default SettingsManager