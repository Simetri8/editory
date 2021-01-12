import Geometry from './Geometry';
import Global from '../Global';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import ShapeControlDistance from '../Shapes/ShapeControlDistance';

/// xxx(47) /*RotationControlPointHelper*/

/// var r = n(11)/*Global*/;  // 1 times
/// var a = n(1)/*Geometry*/;  // 3 times
/// var i = n(161)/*ShapeControlDistance*/;  // 1 times
/// var o = n(17)/*ItemDefaultSettings*/;  // 4 times
var RotationControlPointHelper = new class {
    constructor() {
        this.getRotationPoint = ((e, t, n) => {
            var r = Geometry.normalizePointTupple(e),
            o = r.p1,
            s = r.p2,
            l = Geometry.getCenterPoint(o, s),
            c = {
                x: l.x,
                y: l.y - (s.y - o.y) / 2 - ShapeControlDistance.rotateControlDistance() / n
            };
            return {
                p: Geometry.pointRotate(c, l, t),
                cp: l
            }
        })
    }
    baseStyle() {
        return {
            pointerEvents: "visiblePainted",
            cursor: "crosshair",
            fill: "green",
            stroke: "white"
        }
    }
    getScaledPoint(e, t) {
        return 1 === t ? e : {
            x: e.x * t,
            y: e.y * t
        }
    }
    getReverseScale(e) {
        return 1 / e
    }
    getCpRadius() {
        return Global.isMobileOrTablet() ? 10 : 5
    }
    isSnapToGrid(e, t) {
        return ItemDefaultSettings.getSettings(e, "grid") && ItemDefaultSettings.getSettings(e, "textSnapToGrid") && !t.ctrlKey
    }
    isSnapToOtherShapes(e, t) {
        return ItemDefaultSettings.getSettings(e, "snapToOtherShapes") && !t.ctrlKey
    }
    snapToGridSize(e) {
        return ItemDefaultSettings.getSettings(e, "gridSize")
    }
}

export default RotationControlPointHelper