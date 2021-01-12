import _ from 'lodash';

/// xxx(65) /*ConsoleLog*/

/// var r = n(2)/*lodash*/;  // 1 times
/// var a = n.n(r);
var ConsoleLog = new class {
    constructor() {
        this.info("Log service initialized");
    }
    info(e) {
        this.logWithColor(e, "blue");
    }
    warn(e) {
        this.logWithColor(e, "orange");
    }
    error(e) {
        this.logWithColor(e, "red");
    }
    logWithColor(e, t) {
        if (e) {
            if (_.isString(e)) {
                this.log(e, t);
            } else {
                this.log(e.toString(), t);
                this.log(e.message, t);
                this.log(e, t);
            }
        }
    }
    log(e, t) {
        if (e) {
            var n = window && window.console || console;
            if (t) {
                n.log("%c ".concat(e), "color:".concat(t));
                if (e.stack) {
                    n.log(e.stack, "color:".concat(t));
                }
            } else {
                n.log(e);
            }
        }
    }
};

export default ConsoleLog