import ReactDOM from 'react-dom';

/// xxx(19) /*TimerHelper*/

/// var r = n(16)/*ReactDOM*/;  // 2 times
/// var a = n.n(r);
class i {
    constructor(e, t) {
        this.runInBatch = e;
        this.delay = t
    }
    later(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.delay;
        if (!this.timeoutId) if (this.runInBatch) this.timeoutId = setTimeout(() => {
            ReactDOM.unstable_batchedUpdates(e);
            this.timeoutId = null
        },
        t);
        else this.timeoutId = setTimeout(() => {
            e();
            this.timeoutId = null
        },
        t)
    }
    cancel() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null
        }
    }
}
class o {
    constructor(e, t) {
        this.runInBatch = e;
        this.delay = t
    }
    later(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.delay;
        if (this.timeoutId) clearTimeout(this.timeoutId);
        if (this.runInBatch) this.timeoutId = setTimeout(() => {
            ReactDOM.unstable_batchedUpdates(e);
            this.timeoutId = null
        },
        t);
        else this.timeoutId = setTimeout(() => {
            e();
            this.timeoutId = null
        },
        t)
    }
    cancel() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null
        }
    }
}
var TimerHelper = new class {
    constructor() {
        this.runImmediately = false
    }
    setRunImmediately() {
        this.runImmediately = true
    }
    next(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (this.runImmediately) e();
        else setTimeout(e, t)
    }
    waitABit(e) {
        if (this.runImmediately) e();
        else setTimeout(e, 10)
    }
    waitALitteWhile(e) {
        if (this.runImmediately) e();
        else setTimeout(e, 100)
    }
    createLaterRunObject(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if ("latest" == e) return new o(n, "a-little-while" == t ? 100 : t);
        if ("first-request" == e) return new i(n, "a-little-while" == t ? 100 : t);
        throw new Error("Not supported");
    }
}

export default TimerHelper