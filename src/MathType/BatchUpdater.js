import { Promise } from 'bluebird';
import PromiseRunner from '../Document/PromiseRunner';

/// xxx(1627) /*BatchUpdater*/

/// var mn = n(30)/*blubirdjs*/;  // 4 times
/// var fn = n.n(mn);
/// var Qo = n(176)/*PromiseRunner*/;  // 1 times
class BatchUpdater {
    constructor() {
        this.commands = [];
        this.tailCommands = [];
        this.isProcessing = false;
        this.requestAfterProcessCallbacks = [];
        this.recursiveCount = 0;
    }
    _pushTo(e, t, n) {
        if (!t) {
            throw new Error("command should not be null");
        }
        if (n && t.instanceToCheck) {
            if (t.instanceToCheck.alreadyInQueue) {
                return;
            }
            t.instanceToCheck.alreadyInQueue = true;
        }
        e.push(t);
    }
    isBusy() {
        return this.isProcessing;
    }
    pushOnCallback(e, t, n) {
        var r = PromiseRunner.toPromiseOnRequire(e);
        if (this.isPromise(r)) {
            this.push({
                promise: r
            },
            t, n);
        }
    }
    push(e, t, n) {
        e.instanceToCheck = t;
        this._pushTo(this.commands, e, n);
    }
    pushToEnd(e, t, n) {
        e.instanceToCheck = t;
        this._pushTo(this.tailCommands, e, n);
    }
    callCommand(e) {
        if (!e.instanceToCheck || !e.instanceToCheck.willComponentUnmount) {
            if (this.isPromisedCommand(e)) {
                return e.promise;
            }
            try {
                var t = e();
                return e.instanceToCheck && e.instanceToCheck.alreadyInQueue && (e.instanceToCheck.alreadyInQueue = false),
                t;
            } catch(t) {
                if (e.instanceToCheck && e.instanceToCheck.alreadyInQueue) {
                    e.instanceToCheck.alreadyInQueue = false;
                }
                console.log(t);
            }
        }
    }
    process(e, t) {
        if (this.isProcessing) {
            return t && t(),
            console.log("is processing,other process will be ignore"),
            false;
        }
        try {
            this._process(e);
        } finally {
            return true;
        }
    }
    promiseWhile(e, t) {
        return function n() {
            return e() ? t().then(n) : Promise.resolve();
        } ();
    }
    _process(e) {
        this.isProcessing = true;
        this.promiseWhile(() => {
            return this.commands.length > 0 || this.tailCommands.length > 0;
        },
        () => {
            var e = this.commands.concat([{
                promise: Promise.resolve()
            }]).concat(this.tailCommands);
            return this.tailCommands = [],
            this.commands = [],
            this.recursiveCount++,
            this.recursiveCount > 1e3 ? (this.recursiveCount = 0, console.log("warn possibily infinite loop"), Promise.resolve()) : this.promiseEach({
                commands: e,
                commandsLength: e.length,
                commandIndex: 0,
                nOfPromisedCommand: 0
            });
        }).
        catch((e) => {
            console.error("Something happen inside batch");
            console.error(e);
        }).
        finally(() => {
            if (this.clear(), e) {
                try {
                    e(this.commands.length > 0);
                } catch(e) {
                    console.log(e);
                }
            }
            return this.handleRequestAfterProcess(),
            null;
        });
    }
    promiseEach(e) {
        var t;
        for (; e.commandIndex < e.commandsLength;) {
            var n = e.commands[e.commandIndex];
            e.commandIndex += 1;
            var r = this.callCommand(n);
            if (this.isPromise(r)) {
                t = r;
                break;
            }
        }
        return t ? (e.nOfPromisedCommand += 1, t.then(() => {
            return this.promiseEach(e);
        })) : Promise.resolve(e);
    }
    isPromise(e) {
        return e && void 0 !== e.then;
    }
    isPromisedCommand(e) {
        return e && null != e.promise;
    }
    handleRequestAfterProcess() {
        if (0 != this.requestAfterProcessCallbacks.length) {
            this.requestAfterProcessCallbacks.forEach((e) => {
                return e();
            });
            this.requestAfterProcessCallbacks = [];
        }
    }
    clear() {
        this.commands = [];
        this.tailCommands = [];
        this.isProcessing = false;
        this.recursiveCount = 0;
    }
    requestAfterProcess(e) {
        if (0 === this.commands.length && 0 === this.tailCommands.length) {
            try {
                return e();
            } catch(e) {
                console.log(e);
            }
        }
        this.requestAfterProcessCallbacks.push(e);
    }
}
/*n.d(t, "a", function () {
    return BatchUpdater;
})*/

export default BatchUpdater