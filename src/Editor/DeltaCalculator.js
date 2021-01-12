import Geometry from '../Geometry/Geometry';

/// xxx(354) /*DeltaCalculator*/

/// var r = n(1)/*Geometry*/;  // 2 times
var DeltaCalculator = new class {
    calculateDeltaFromAlignment(e, t, n) {
        var a = Geometry.getCenterPoint(e),
        i = Geometry.getCenterPoint(t);
        switch (n) {
        case "top":
            return {
                x: 0,
                y: e.p1.y - t.p1.y
            };
        case "middle":
            return {
                x: 0,
                y: a.y - i.y
            };
        case "bottom":
            return {
                x: 0,
                y: e.p2.y - t.p2.y
            };
        case "left":
            return {
                x: e.p1.x - t.p1.x,
                y: 0
            };
        case "center":
            return {
                x: a.x - i.x,
                y: 0
            };
        case "right":
            return {
                x: e.p2.x - t.p2.x,
                y: 0
            };
        case "central":
            return {
                x: a.x - i.x,
                y: a.y - i.y
            }
        }
        throw new Error("not supported")
    }
}

export default DeltaCalculator