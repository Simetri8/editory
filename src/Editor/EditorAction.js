import _ from 'lodash';
import DeltaCalculator from './DeltaCalculator';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import EntityFinder from './EntityFinder';
import Geometry from '../Geometry/Geometry';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeControlDistance from '../Shapes/ShapeControlDistance';
import SkewHelper from '../Geometry/SkewHelper';

/// xxx(98) /*EditorAction*/

/// var r = n(1)/*Geometry*/;  // 6 times
/// var a = n(4)/*DOMHelper*/;  // 2 times
/// var i = n(2)/*lodash*/;  // 3 times
/// var o = n.n(i);
/// var s = n(6)/*DiagramIdHelper*/;  // 3 times
/// var l = n(7)/*PropUpdateHelper*/;  // 2 times
/// var c = n(81)/*SkewHelper*/;  // 1 times
/// var d = n(119)/*EntityFinder*/;  // 1 times
/// var h = n(354)/*DeltaCalculator*/;  // 1 times
/// var u = n(161)/*ShapeControlDistance*/;  // 2 times
var EditorAction = new class {
    setEditorsInData(e, t) {
        if (!t || !t.length) return e;
        var n = _.clone(e.elements);
        return t.forEach(e => n[e.id] = e),
        PropUpdateHelper.set(e, "elements", n)
    }
    moveEditors(e, t) {
        for (var n = [], r = 0; r < e.length; r++) {
            var a = e[r];
            DiagramIdHelper.isDiagramEditorId(a.id) && n.push(this.moveEditor(a, t))
        }
        return n
    }
    alignEditors(e, t, n, r, a) {
        for (var i = [], o = 0; o < e.length; o++) {
            var l = e[o];
            if (DiagramIdHelper.isDiagramEditorId(l.id)) {
                var c = EntityFinder.get(l, t, a),
                u = DeltaCalculator.calculateDeltaFromAlignment(r, c, n);
                i.push(this.moveEditor(l, u))
            }
        }
        return i
    }
    moveEditor(e, t) {
        var n = Geometry.addPoint(e.shape.data.p, t);
        return PropUpdateHelper.set(e, "shape.data.p", n)
    }
    getRotationPoints(e, t, n) {
        var a = e.shape.data.p;
        return {
            cp: a,
            p: Geometry.pointRotate({
                x: a.x,
                y: a.y - t.clientHeight / 2 - ShapeControlDistance.rotateControlDistance() / n
            },
            a, e.shape.data.rotation || 0)
        }
    }
    getSkewPoint(e, t, n) {
        var a = e.shape.data,
        i = a.p,
        o = a.skewX,
        s = {
            x: i.x - t.clientWidth / 2 - 5,
            y: i.y + t.clientHeight / 2
        };
        return s = SkewHelper.pointsFromSkew(i, o, [s])[0],
        {
            cp: i,
            p: Geometry.pointRotate({
                x: s.x,
                y: s.y + ShapeControlDistance.skewControlDistance() / n
            },
            i, e.shape.data.rotation || 0)
        }
    }
    createEditorRectShapesTemporary(e, t, n, i) {
        var l = DOMHelper.getElementRect(n);
        return _.keys(e).map(e => {
            if (!t[e]) return null;
            var n = DOMHelper.findRectElementToRect(t[e].editor, l),
            o = {
                p1: {
                    x: n.left,
                    y: n.top
                },
                p2: {
                    x: n.right,
                    y: n.bottom
                }
            };
            o = Geometry.getScaleTuple(o, i);
            var c = Geometry.pointsToLines(Geometry.getPointsRect(o));
            return c.push({
                p1: o.p1,
                p2: o.p2
            }),
            c.push({
                p1: {
                    x: o.p1.x,
                    y: o.p2.y
                },
                p2: {
                    x: o.p2.x,
                    y: o.p1.y
                }
            }),
            {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: c
                },
                realId: e
            }
        }).filter(e => e)
    }
    changeEditorsInMap(e, t) {
        if (!t || 0 === t.length) return e;
        var n = _.clone(e);
        return t.forEach(e => n[e.id] = e),
        n
    }
}

export default EditorAction