import ConsoleLog from '../ConsoleLog';
import WorkerCreator from './WorkerCreator';

/// xxx(178) /*WorkerInitializer*/

/*n.d(t, "a", function () {
    return o
});*/
/// var r = n(65)/*ConsoleLog*/;  // 1 times
/// var a = n(351)/*WorkerCreator*/;  // 1 times
var i = 1e9;
class o {
    constructor(e) {
        this.workerPath = e;
        this.idMap = {};
        this.secondMap = {};
        this.initForceLoad();
    }
    initForceLoad() {
        try {
            if (Object({
                NODE_ENV: "production",
                NO_CDN: false
            }).IN_NODE_ENV) {
                return void console.log("In Node Environment");
            }
        } catch(e) {}
        setTimeout(() => {
            this.initWorker();
        },
        2e3);
    }
    initWorker() {
        if (Object({
            NODE_ENV: "production",
            NO_CDN: false
        }).IN_NODE_ENV) {
            console.log("In Node Environment");
        } else {
            if (!this.worker) {
                this.worker = Object(WorkerCreator)(this.workerPath);
                this.worker.onmessage = (e) => {
                    var t = e.data;
                    var n = t.id;
                    this.resolve(n, t.data);
                };
                this.worker.onerror = (e) => {
                    ConsoleLog.error(e);
                    this.reject(this.lastId, false);
                };
            }
        }
    }
    resolve(e, t) {
        var n = this.idMap[e];
        clearTimeout(n.timeout);
        n.resolve({
            data: t,
            status: "result"
        });
        this.idMap[e] = void 0;
        this.handleSecondRequest(e);
    }
    reject(e, t) {
        var n = this.idMap[e];
        if (n) {
            n.reject();
            if (t) {
                this.worker.terminate();
                this.initWorker();
            }
            this.handleSecondRequest(e);
        }
    }
    handleSecondRequest(e) {
        var t = this.secondMap[e];
        if (t) {
            this.idMap[e] = this.secondMap[e];
            this.secondMap[e] = void 0;
            var n = setTimeout(() => {
                this.reject(e, true);
            },
            i);
            this.idMap[e].timeout = n;
            this.worker.postMessage({
                id: e,
                data: t.requestParam
            });
        }
    }
    request(e, t) {
        this.lastId = t;
        this.initWorker();
        var n = this.idMap[t];
        return n ? this.secondMap[t] ? (this.secondMap[t].requestParam = e, Promise.resolve({
            data: null,
            status: "running"
        })) : new Promise((n, r) => {
            this.secondMap[t] = {
                id: t,
                resolve: n,
                reject: r,
                timeout: null,
                requestParam: e
            };
        }) : new Promise((r, a) => {
            var o = setTimeout(() => {
                this.reject(t, true);
            },
            i);
            n = {
                id: t,
                resolve: r,
                reject: a,
                timeout: o,
                requestParam: e
            };
            this.idMap[t] = n;
            this.worker.postMessage({
                id: t,
                data: e
            });
        });
    }
}

export default o