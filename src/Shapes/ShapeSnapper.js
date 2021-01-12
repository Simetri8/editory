import _ from 'lodash';
import EntityUtils from '../Editor/EntityUtils';
import Geometry from '../Geometry/Geometry';

/// xxx(287) /*ShapeSnapper*/

/// var r = n(1)/*Geometry*/;  // 6 times
/// var a = n(2)/*lodash*/;  // 2 times
/// var i = n.n(a);
/// var o = n(20)/*EntityUtils*/;  // 6 times
var ShapeSnapper = new class {
    snapEntities(e, t) {
        var n = Geometry.getPointsFromPointTupple(t.groupBox);
        return {
            delta: this.getMinDeltaForPoints(n, t),
            handled: !0
        }
    }
    snapSingle(e, t) {
        if (EntityUtils.isDiagramEditor(e)) return this.snapEditor(e, t);
        if (EntityUtils.isStraightLineArrow(e)) return this.snapStraightArrow(e, t);
        if (EntityUtils.isCubicLineArrow(e)) return this.snapCubicArrow(e, t);
        if (EntityUtils.isPolygon(e)) return this.snapPolygon(e, t);
        if (EntityUtils.isPolygonCurve(e)) return this.snapPolygonCurve(e, t);
        if (EntityUtils.isGroupedEntity(e)) {
            var n = Geometry.getPointsFromPointTupple(t.groupBox);
            return {
                delta: this.getMinDeltaForPoints(n, t),
                handled: !0
            }
        }
        return {
            delta: t.delta,
            handled: !1
        }
    }
    getMinDeltaForPoints(e, t) {
        for (var n = t.gridSize, a = t.delta, i = Number.MAX_SAFE_INTEGER, o = a, s = 0; s < e.length; s++) {
            var l = e[s],
            c = this.calculateNewDelta(l, a, n),
            d = Geometry.distanceFromVector(c);
            if (d < i) {
                o = c;
                i = d
            }
        }
        return o
    }
    snapPolygonCurve(e, t) {
        var n = e.data.map(e => e.p1).concat(_.last(e.data).p2);
        return {
            delta: this.getMinDeltaForPoints(n, t),
            handled: !0
        }
    }
    snapPolygon(e, t) {
        return {
            delta: this.getMinDeltaForPoints(e.data, t),
            handled: !0
        }
    }
    snapCubicArrow(e, t) {
        var n = e.data.map(e => e.p1).concat(_.last(e.data).p2);
        return {
            delta: this.getMinDeltaForPoints(n, t),
            handled: !0
        }
    }
    snapStraightArrow(e, t) {
        return {
            delta: this.getMinDeltaForPoints(e.data, t),
            handled: !0
        }
    }
    snapEditor(e, t) {
        var n = t.gridSize,
        r = t.delta;
        return {
            delta: this.calculateNewDelta(e.shape.data.p, r, n),
            handled: !0
        }
    }
    calculateNewDelta(e, t, n) {
        var a = Geometry.addPoint(e, t),
        i = Geometry.snapToGridSize(a, n);
        return Geometry.substractPoint(i, e)
    }
}

export default ShapeSnapper