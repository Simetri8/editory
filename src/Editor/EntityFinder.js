import EntityUtils from './EntityUtils';
import FindEntityHelper from './FindEntityHelper';
import Geometry from '../Geometry/Geometry';
import ShapeConnectionHelper from '../Shapes/ShapeConnectionHelper';
import ShapeLoader from '../Shapes/ShapeLoader';
import TemporaryShapeCreator from '../Shapes/TemporaryShapeCreator';

/// xxx(119) /*EntityFinder*/

/// var r = n(1532)/*ShapeLoader*/;  // 1 times
/// var a = n(1)/*Geometry*/;  // 9 times
/// var i = n(99)/*TemporaryShapeCreator*/;  // 2 times
/// var o = n(130)/*ShapeConnectionHelper*/;  // 2 times
/// var s = n(86)/*FindEntityHelper*/;  // 1 times
/// var l = n(20)/*EntityUtils*/;  // 4 times
var c = {
    p1: {
        x: 0,
        y: 0
    },
    p2: {
        x: 0,
        y: 0
    }
};
var EntityFinder = new class {
    getFromEntities(e, t, n) {
        return Geometry.expandByMaxRectangles(e.map(e => this.get(e, t, n)))
    }
    get(e, t, n) {
        if (!e) return null;
        var i = EntityUtils.getEntityType(e);
        if ("shape-arrow" == i) {
            if (EntityUtils.isStraightLineArrow(e)) return Geometry.getBoundingRectFromPoints(e.data);
            var d = Geometry.toAbsoluteControlPointCubics(e.data);
            return Geometry.beziersBbox(d)
        }
        var h = e;
        if ("shape-composite" == i) return ShapeLoader.getShapeManagement(h).getBoundingRect(h);
        if ("shape-object" == i) {
            if (EntityUtils.isPolygon(h)) return Geometry.getBoundingRectFromPoints(h.data);
            if (EntityUtils.isPolygonCurve(h)) {
                var u = Geometry.toAbsoluteControlPointCubics(h.data);
                return Geometry.beziersBbox(u)
            }
        }
        if ("group" == i) return this.getFromEntities(e.entities, t, n);
        if (!t.editorRef) return c;
        if ("text" == i) return this.handleForText(e, t.editorRef);
        if ("connection" == i) {
            var p = e,
            m = ShapeConnectionHelper.getIdRectMap([p], t),
            f = ShapeConnectionHelper.getCalculatedPosition(p, m, t.editors);
            if (!f) {
                var g = t.editors[p.fromEditorId].shape.data.p,
                y = t.editors[p.toEditorId].shape.data.p,
                A = Geometry.getCenterPoint(g, y);
                return {
                    p1: A,
                    p2: A
                }
            }
            return Geometry.genericLinesBbox([f])
        }
        if ("linked" == i) {
            var E = FindEntityHelper.findOriginalEntityFromLink(e, t.editors);
            return this.handleForText(E, t.editorRef)
        }
        return null
    }
    handleForText(e, t) {
        var n = t[e.id];
        if (!n) return {
            p1: {
                x: 0,
                y: 0
            },
            p2: {
                x: 0,
                y: 0
            }
        };
        var r = n.editor.parentElement,
        a = TemporaryShapeCreator.getTextRectInfo(r, e);
        return TemporaryShapeCreator.findBoundingRect(a)
    }
}

export default EntityFinder