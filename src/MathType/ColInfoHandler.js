import BaseComponent from '../Elements/BaseComponent';

/// xxx(1618) /*ColInfoHandler*/

/// var an = n(62)/*BaseComponent*/;  // 1 times
class ColInfoHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.isColChangeSessionFlag = false;
    }
    setColChangeSession() {
        this.isColChangeSessionFlag = true;
    }
    releaseColChangeSession() {
        this.isColChangeSessionFlag = false;
    }
    isColChangeSession() {
        return this.isColChangeSessionFlag;
    }
}
/*n.d(t, "a", function () {
    return ColInfoHandler;
})*/

export default ColInfoHandler