import _ from 'lodash';

/// xxx(1631) /*HistoryHandler*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
class HistoryHandler {
    constructor() {
        this.stack = [];
        this.index = -1;
    }
    push(e, t) {
        if (!e.mainSelected) {
            e = _.assignIn({},
            e, {
                mainSelected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            });
        }
        if (null == this.accumulateTimer) {
            this.innerHandlePush(e, t);
            this.accumulateTimer = setTimeout(() => {
                this.accumulateTimer = null;
            },
            1e3);
        } else {
            this.updateItemAtTopOfStack(e);
        }
    }
    updateItemAtTopOfStack(e) {
        if (this.stack.length <= 0) {
            throw new Error("something is wrong with handling history");
        }
        this.stack[this.stack.length - 1] = e;
    }
    innerHandlePush(e, t) {
        this.limitTheHistory();
        if (this.stack.length > this.index + 1) {
            this.stack = this.stack.slice(0, this.index + 1);
        }
        if (t && this.stack.length > 0) {
            this.stack[this.stack.length - 1] = t;
        }
        this.stack.push(e);
        this.index = this.stack.length - 1;
    }
    limitTheHistory() {
        if (this.stack.length > 200) {
            console.log("limit history:", this.stack.length);
            this.stack = this.stack.slice(100);
        }
    }
    clearAccumulateTimer() {
        if (this.accumulateTimer) {
            clearInterval(this.accumulateTimer);
            this.accumulateTimer = null;
        }
    }
    canUndo() {
        return ! (this.index - 1 < 0);
    }
    canRedo() {
        return ! (this.index + 1 >= this.stack.length);
    }
    asArray() {
        return this.stack;
    }
    setContentArray(e) {
        this.clearAccumulateTimer();
        this.stack = _.clone(e);
        this.index = e.length - 1;
    }
    undo() {
        return this.clearAccumulateTimer(),
        this.canUndo() ? (this.index--, this.stack[this.index]) : null;
    }
    redo() {
        return this.clearAccumulateTimer(),
        this.canRedo() ? (this.index = Math.min(this.stack.length - 1, this.index + 1), this.stack[this.index]) : null;
    }
    clear() {
        this.clearAccumulateTimer();
        this.index = -1;
        this.stack = [];
    }
}
/*n.d(t, "a", function () {
    return HistoryHandler;
})*/

export default HistoryHandler