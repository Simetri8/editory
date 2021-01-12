import _ from 'lodash';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditorAction from './EditorAction';
import FindEntityHelper from './FindEntityHelper';
import Global from '../Global';
import ItemDefaultSettings from './Toolbar/ItemDefaultSettings';
import ShapeConnectionHelper from '../Shapes/ShapeConnectionHelper';
import ShapeIntersectHelper from '../Shapes/ShapeIntersectHelper';

/// xxx(113) /*SnapToGridSize*/

/// var r = n(98)/*EditorAction*/;  // 1 times
/// var a = n(130)/*ShapeConnectionHelper*/;  // 2 times
/// var i = n(189)/*ShapeIntersectHelper*/;  // 1 times
/// var o = n(6)/*DiagramIdHelper*/;  // 2 times
/// var s = n(86)/*FindEntityHelper*/;  // 2 times
/// var l = n(2)/*lodash*/;  // 1 times
/// var c = n.n(l);
/// var d = n(11)/*Global*/;  // 1 times
/// var h = n(17)/*ItemDefaultSettings*/;  // 3 times
var SnapToGridSize = new class {
    getGridSizeIfSnapEnabled(e) {
        var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            ctrlKey: !1
        }).ctrlKey,
        n = ItemDefaultSettings.getSettings(e, "grid") && ItemDefaultSettings.getSettings(e, "textSnapToGrid"),
        r = ItemDefaultSettings.getSettings(e, "gridSize");
        return !t && n ? r : 0
    }
    getRandomPosYAround(e, t, n) {
        if (Global.isTestEnv()) return {
            y1: e,
            y2: t
        };
        var r = (t = t || e) - e;
        n = n || 1e4;
        var a = Math.floor(30 * Math.random() + 1);
        return {
            y1: (e = Math.max(0, Math.min(e, n - r))) + a,
            y2: e + r + a
        }
    }
    getShapeIdsIntersectWithRect(e, t, n, o, s) {
        var l = t.shapes || [],
        d = EditorAction.createEditorRectShapesTemporary(t.elements || {},
        n, o, 1 / s),
        h = ShapeConnectionHelper.getIdRectMap(t.connections, {
            editorRef: n,
            editors: t.elements
        }),
        u = ShapeConnectionHelper.createConnectionShapesTemporary(t.connections || [], h, t.elements),
        p = l.concat(d, u),
        m = ShapeIntersectHelper.getShapesIntersectOrInsideWithRect(p, e);
        return 0 === m.length ? [] : _.uniq(this.getIdsIfEntityInGroup(m, t))
    }
    getIdsIfEntityInGroup(e, t) {
        return e.map(e => {
            var n = e.realId || e.id;
            if (DiagramIdHelper.isDiagramEditorId(n) && t.elements[n].isInGroup) return FindEntityHelper.findGroupedEnityFromEditor(n, t.shapes).id;
            if (DiagramIdHelper.isDiagramConnectionId(n)) {
                var r = t.connections.find(e => e.id === n);
                if (r.isInGroup) return FindEntityHelper.findGroupedEnityFromConnection(r, t.shapes).id
            }
            return n
        })
    }
}

export default SnapToGridSize