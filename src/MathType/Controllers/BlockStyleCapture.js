import _ from 'lodash';

/// xxx(1633) /*BlockStyleCapture*/

/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
var BlockStyleCapture = class {
    setStyle(e, t) {
        return this.blockStyle = _.clone(this.blockStyle || {}),
        this.blockStyle[e] = t || null,
        this.blockStyle;
    }
    getStyleObj() {
        return this.blockStyle;
    }
    clear() {
        this.blockStyle = null;
    }
};
/*n.d(t, "a", function () {
    return BlockStyleCapture;
})*/

export default BlockStyleCapture