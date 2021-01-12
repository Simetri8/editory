
/// xxx(131) /*KeyDownEventRegisterer*/

var KeyDownEventRegisterer = new class {
    constructor() {
        this.funcArr = [];
        this.handleKeyDown = (e) => {
            console.log("handle key global keydown");
            if (! (this.funcArr.length <= 0)) {
                var t = {
                    keyCode: e.keyCode,
                    stopOther: false
                };
                var n = 0;
                for (; n < this.funcArr.length && ((0, this.funcArr[n])(t), !t.stopOther); n++) {}
            }
        };
    }
    stack(e) {
        this.funcArr.unshift(e);
        this.registerOrDeregisterEvent();
    }
    remove(e) {
        this.funcArr = this.funcArr.filter((t) => {
            return t != e;
        });
        this.registerOrDeregisterEvent();
    }
    registerOrDeregisterEvent() {
        if (document) {
            if (this.funcArr.length > 0) {
                document.addEventListener("keydown", this.handleKeyDown);
            } else {
                document.removeEventListener("keydown", this.handleKeyDown);
            }
        }
    }
};

export default KeyDownEventRegisterer