import n456 from './n456';

/// xxx(463) /*n463*/

var r = {};
class a {
    constructor(e, t, n) {
        this.key = e;
        if (t) {
            this.data = t;
            return void(r[e] = t);
        }
        null == r[e] && n && (r[e] = n);
        this.data = r[e]
    }
    get() {
        return this.data
    }
    set(e) {
        return new a(this.key, e)
    }
}
/// var i = n(456)/*n456*/;  // 1 times
var n463 = new class {
    createOnInstance(e, t) {
        return new a(e, null, t)
    }
    createOnDocument(e, t) {
        return new n456(e, t)
    }
} ()

export default n463