import { Promise } from 'bluebird';

/// xxx(176) /*PromiseRunner*/

/// var r = n(30)/*blubirdjs*/;  // 1 times
/// var a = n.n(r);
var PromiseRunner = new class {
    isPendingPromise(e) {
        var x = e && (!e.isCancelled || !e.isCancelled());
        return x
    }
    calledCheckFunc(e) {
        e.called = true;
        if (e.callFunc) e.callFunc()
    }
    toPromiseOnRequire(e) {
        var t = {
            called: false,
            callFunc: void 0
        };
        e(this.calledCheckFunc.bind(this, t));
        if (!t.called) return new Promise((e) => {
            t.callFunc = e
        })
    }
}

export default PromiseRunner