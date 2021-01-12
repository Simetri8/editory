
/// xxx(156) /*LatexTableModelNotifier*/

var LatexTableModelNotifier = new class {
    constructor() {
        this.data = null
    }
    subscribeModelHandler(e) {
        this.modelHandler = e;
        if (null != this.data) e.notifiy(this.data)
    }
    subscribeTablePropertiesHandler(e) {
        this.tablePropertiesHandler = e;
        if (null != this.data) e.notifiy(this.data)
    }
    unsubscribeModelHandler() {
        this.modelHandler = null;
        this.data = null
    }
    unsubscribeTablePropertiesHandler() {
        this.tablePropertiesHandler = null;
        this.data = null
    }
    changeData(e) {
        this.data = e;
        if (this.modelHandler) this.modelHandler.notifiy(this.data);
        if (this.tablePropertiesHandler) this.tablePropertiesHandler.notifiy(this.data)
    }
}

export default LatexTableModelNotifier