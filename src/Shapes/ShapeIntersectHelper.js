import _ from 'lodash';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EntityUtils from '../Editor/EntityUtils';
import Geometry from '../Geometry/Geometry';
import ShapeLoader from './ShapeLoader';

/// xxx(189) /*ShapeIntersectHelper*/

/// var r = n(2)/*lodash*/;  // 7 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 35 times
/// var o = n(6)/*DiagramIdHelper*/;  // 4 times
/// var s = n(1532)/*ShapeLoader*/;  // 1 times
/// var l = n(20)/*EntityUtils*/;  // 4 times
var ShapeIntersectHelper = new class {
    getShapesIntersectOrInsideWithRect(e, t) {
        var n = {
            type: "rectangle",
            id: DiagramIdHelper.nextDiagramCompositeShapeId(),
            data: t
        },
        r = _.filter(e, e => this.shapePointInsideRect(e, t));
        return _.filter(_.difference(e, r), e => {
            var t = this.getIntersects(n, e);
            return t && t.length > 0
        }).concat(r)
    }
    shapePointInsideRect(e, t) {
        if (DiagramIdHelper.isDiagramGroupId(e.id)) {
            var n = e;
            return _.some(n.entities, e => this.shapePointInsideRect(e, t))
        }
        var r = this.getBreakDownInfo(e);
        return !! r && _.some(r.data, e => Geometry.pointInsideRect(e.p1, t) || Geometry.pointInsideRect(e.p2, t))
    }
    getIntersects(e, t) {
        if (DiagramIdHelper.isDiagramGroupId(e.id)) {
            var n = e;
            return _.flatMap(n.entities, e => this.getIntersects(e, t))
        }
        if (DiagramIdHelper.isDiagramGroupId(t.id)) {
            var r = t;
            return _.flatMap(r.entities, t => this.getIntersects(t, e))
        }
        var i = this.getBreakDownInfo(e),
        s = this.getBreakDownInfo(t);
        return i && s ? this.isBoxNoIntersection(i, s) ? [] : this.getIntersectsFromPaths(i.data, s.data, !1) : []
    }
    getIntersectsFromPaths(e, t, n) {
        return this.join(e, t, (e, t) => Geometry.isLineData(e) ? Geometry.isLineData(t) ? Geometry.intersectLineToLine(e, t) : Geometry.isEllipseData(t) ? Geometry.intersectLineToEllipse(e, t) : (Geometry.isQuadraticBezierData(t) && (t = Geometry.quadraticToCubic(t)), Geometry.intersectCubicBezierLineToLine(t, e)) : Geometry.isEllipseData(e) ? Geometry.isLineData(t) ? Geometry.intersectLineToEllipse(t, e) : Geometry.isEllipseData(t) ? Geometry.intersectEllipseToEllipse(t, e) : (Geometry.isQuadraticBezierData(t) && (t = Geometry.quadraticToCubic(t)), Geometry.intersectBezierToEllipse(t, e)) : (Geometry.isQuadraticBezierData(e) && (e = Geometry.quadraticToCubic(e)), Geometry.isLineData(t) ? Geometry.intersectCubicBezierLineToLine(e, t) : Geometry.isEllipseData(t) ? Geometry.intersectBezierToEllipse(e, t) : (Geometry.isQuadraticBezierData(t) && (t = Geometry.quadraticToCubic(t)), Geometry.intersectCubicBezierLineToCubicBezier(e, t))), n)
    }
    isBoxNoIntersection(e, t) {
        if (!e.boxLines && !t.boxLines) return !1;
        if (e.boxLines && t.boxLines) {
            if (Geometry.pointInsidePolygonLines(e.boxLines[0].p1, t.boxLines)) return !1;
            if (Geometry.pointInsidePolygonLines(t.boxLines[0].p1, e.boxLines)) return !1
        }
        if (e.boxLines && Geometry.pointInsidePolygonLines(t.data[0].p1, e.boxLines)) return !1;
        if (t.boxLines && Geometry.pointInsidePolygonLines(e.data[0].p1, t.boxLines)) return !1;
        var n = e.boxLines || e.data,
        r = t.boxLines || t.data;
        return this.getIntersectsFromPaths(n, r, !0).length <= 0
    }
    join(e, t, n, r) {
        for (var a = [], i = 0; i < e.length; i++) for (var o = e[i], s = 0; s < t.length; s++) {
            var l = n(o, t[s]);
            if (l && (l instanceof Array ? l.length > 0 && (a = a.concat(l)) : a.push(l), r && a.length > 0)) return a
        }
        return a
    }
    getBreakDownInfo(e) {
        var t = EntityUtils.getEntityType(e);
        if ("temporary" == t) return e.breakDownInfo;
        if ("shape-arrow" == t) return EntityUtils.isStraightLineArrow(e) ? {
            data: Geometry.pointsToLines(e.data)
        } : {
            data: Geometry.toAbsoluteControlPointCubics(e.data)
        };
        var n = e;
        if ("shape-composite" == t) return ShapeLoader.getShapeManagement(n).getBreakdownInfo(n);
        if ("shape-object" == t) {
            if (EntityUtils.isPolygon(n)) return {
                data: Geometry.pointsToLines(n.data.concat(n.data[0]))
            };
            if (EntityUtils.isPolygonCurve(n)) return {
                data: Geometry.toAbsoluteControlPointCubics(n.data)
            }
        }
    }
}

export default ShapeIntersectHelper