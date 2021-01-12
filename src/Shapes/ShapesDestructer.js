import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import DiagramEntityHelper from '../Editor/DiagramEntityHelper';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EntityUtils from '../Editor/EntityUtils';

/// xxx(151) /*ShapesDestructer*/

/// var r = n(35)/*slicedToArray*/;  // 2 times
/// var a = n.n(r);
/// var i = n(6)/*DiagramIdHelper*/;  // 3 times
/// var o = n(190)/*DiagramEntityHelper*/;  // 1 times
/// var s = n(2)/*lodash*/;  // 1 times
/// var l = n.n(s);
/// var c = n(20)/*EntityUtils*/;  // 1 times
var ShapesDestructer = new class {
    destructAllLevelToShapes(e) {
        var t = {
            shapes: [],
            shapeOnly: !0
        };
        return this.innerDestructAllToShapes(e, t),
        t
    }
    innerDestructAllToShapes(e, t) {
        for (var n = 0; n < e.entities.length; n++) {
            var r = e.entities[n];
            switch (EntityUtils.getEntityType(r)) {
            case "text":
                case "connection":
                case "linked":
                t.shapeOnly = !1;
                continue;
            case "group":
                this.innerDestructAllToShapes(r, t);
            default:
                t.shapes.push(r)
            }
        }
    }
    partitionConnectedEntityByConnections(e, t) {
        var n = DiagramEntityHelper.partitionShapeAndNonShapeIds(e),
        r = slicedToArray(n, 2),
        s = r[0],
        c = r[1],
        d = this.findConnectedEditorAndConnections(c, t),
        h = _.partition(d, e => DiagramIdHelper.isDiagramEditorId(e)),
        u = slicedToArray(h, 2);
        return [s, u[0], u[1]]
    }
    findConnectedEditorAndConnections(e, t) {
        for (var n = this, r = [...e], a = [], o = function () {
            var e = r.pop();
            if (a.push(e), DiagramIdHelper.isDiagramEditorId(e)) n.findAllConnectionsToEditor(e, t).forEach(e => n.addIfNotExists(e, r, a));
            else if (DiagramIdHelper.isDiagramConnectionId(e)) {
                var o = t.connections.find(t => t.id === e);
                n.addIfNotExists(o.fromEditorId, r, a);
                n.addIfNotExists(o.toEditorId, r, a)
            }
        }; r.length > 0;) o();
        return a
    }
    addIfNotExists(e, t, n) {
        if (n.indexOf(e) < 0 && t.indexOf(e) < 0) t.push(e)
    }
    findAllConnectionsToEditor(e, t) {
        return t.connections.filter(t => t.fromEditorId === e || t.toEditorId === e).map(e => e.id)
    }
}

export default ShapesDestructer