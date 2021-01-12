
/// xxx(1625) /*ChangeSessionHandler*/

class ChangeSessionHandler {
    constructor() {
        this.isUnmountedFlag = false;
        this.changeSessionInfo = {};
    }
    notifyUnmount() {
        this.isUnmountedFlag = true;
    }
    isUnmounted() {
        return this.isUnmountedFlag;
    }
    end() {
        this.changeSessionInfo = {};
    }
    setSessionValue(e, t) {
        this.changeSessionInfo[e] = t;
    }
    getSessionValue(e, t) {
        var n = this.changeSessionInfo[e];
        return void 0 === n ? t : n;
    }
    setContainerModel(e) {
        this.containerModel = e;
    }
    getContainerModel() {
        return this.containerModel;
    }
}
/*n.d(t, "a", function () {
    return ChangeSessionHandler;
})*/

export default ChangeSessionHandler