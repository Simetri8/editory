import OpenSymbolBlockBase from './OpenSymbolBlockBase';

/// xxx(71) /*OpenSymbolBlock*/

/*n.d(t, "a", function () {
    return a
});*/
/// var r = n(335)/*OpenSymbolBlockBase*/;  // 1 times
class a extends OpenSymbolBlockBase {
    constructor() {
        super(...arguments);
        this.tagName = "opensymbol-block"
    }
}

export default a