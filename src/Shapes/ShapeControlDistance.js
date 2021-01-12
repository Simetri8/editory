import Global from '../Global';

/// xxx(161) /*ShapeControlDistance*/

/// var r = n(11)/*Global*/;  // 3 times
var ShapeControlDistance = new class {
    skewControlDistance() {
        return Global.isMobileOrTablet() ? 26 : 12
    }
    rotateControlDistance() {
        return Global.isMobileOrTablet() ? 28 : 20
    }
    hiddenSelectLineWidth() {
        return Global.isMobileOrTablet() ? 10 : 6
    }
}

export default ShapeControlDistance