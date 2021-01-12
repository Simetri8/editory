import OpenSymbolBlockBase from './OpenSymbolBlockBase';

/// xxx(72) /*CloseSymbolBlock*/

/*n.d(t, "a", function () {
    return a
});*/
/// var r = n(335)/*OpenSymbolBlockBase*/;  // 1 times
class a extends OpenSymbolBlockBase {
    constructor() {
        super(...arguments);
        this.tagName = "closesymbol-block"
    }
}

export default a