
/// xxx(1629) /*FixedContextHandler*/

class FixedContextHandler {
    constructor(e, t) {
        this.batchUpdater = e;
        this.renderingContext = t;
        this.darkMode = false;
    }
    getRenderingContext() {
        return this.renderingContext;
    }
    getBatchUpdater() {
        return this.batchUpdater;
    }
    setDarkMode(e) {
        this.darkMode = e;
    }
    isDarkMode() {
        return this.darkMode;
    }
    getOutlineSelected() {
        return this.darkMode ? "1px solid #525252" : "1px solid lightgray";
    }
    getDefaultBorderColor() {
        return this.darkMode ? "#e0e0e0" : "#000";
    }
    getMainThemeColor() {
        return this.darkMode ? "#1e1e1e" : "#FFF";
    }
    getTextCursorColor() {
        return this.darkMode ? "#e0e0e0" : "#000";
    }
    getMathCursorColor() {
        return this.darkMode ? "#03b703" : "#008000";
    }
    getSelectedMathBg() {
        return this.darkMode ? "#2a352a" : "rgb(244,249,244)";
    }
}
/*n.d(t, "a", function () {
    return FixedContextHandler;
})*/

export default FixedContextHandler