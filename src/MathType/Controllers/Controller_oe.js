import _ from 'lodash';

/// xxx(1642) /*Controller_oe*/

/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
class oe {
    constructor(e, t) {
        var n = _.cloneDeep(e);
        var r = this.getSecondLeafSelected(n);
        this.selected = n;
        if (t instanceof Array) {
            r.keys = t;
            r.key = void 0;
        } else {
            r.key = t;
        }
        r.selected = void 0;
    }
    getSecondLeafSelected(e) {
        return null == e.selected.selected ? e : this.getSecondLeafSelected(e.selected);
    }
}
/*n.d(t, "a", function () {
    return oe;
})*/

export default oe