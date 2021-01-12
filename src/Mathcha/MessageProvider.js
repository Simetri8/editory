
/// xxx(453) /*MessageProvider*/

var MessageProvider = new class {
    constructor() {
        this.messageProvider = null
    }
    setProvider(e) {
        this.messageProvider = e
    }
    showInfo(e) {
        this.messageProvider && this.messageProvider.showInfo(e)
    }
    clear() {
        this.messageProvider && this.messageProvider.clearMessage()
    }
    showError(e) {
        this.messageProvider && this.messageProvider.showError(e)
    }
}

export default MessageProvider