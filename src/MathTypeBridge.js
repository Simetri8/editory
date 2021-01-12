
/// xxx(1585) /*MathTypeBridge*/

class MathTypeBridge {
    changeCursorName(e, t) {
        this.mathType.changeCursorName(e, t);
    }
    setMathType(e) {
        this.mathType = e;
    }
    getModel() {
        return this.mathType.getModel();
    }
    getCursorSelected() {
        return this.mathType.getCursorSelected();
    }
    setPageSettings(e) {
        return this.mathType.setPageSettings(e);
    }
    setTheoremInfo(e) {
        return this.mathType.setTheoremInfo(e);
    }
    setRemoteCursors(e, t) {
        return this.mathType.setRemoteCursors(e, t);
    }
    colIncrementUpdate(e, t) {
        return this.mathType.colIncrementUpdate(e, t);
    }
    removeSites(e) {
        return this.mathType.removeSites(e);
    }
    getExtendedSelected() {
        return this.mathType.getExtendedSelected();
    }
}
/*n.d(t, "a", function () {
    return MathTypeBridge;
});*/

export default MathTypeBridge