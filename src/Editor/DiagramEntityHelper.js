import _ from 'lodash';
import DiagramIdHelper from '../Elements/DiagramIdHelper';

/// xxx(190) /*DiagramEntityHelper*/

/// var r = n(2)/*lodash*/;  // 2 times
/// var a = n.n(r);
/// var i = n(6)/*DiagramIdHelper*/;  // 8 times
var DiagramEntityHelper = new class {
    partitionShapeAndNonShapeIds(e) {
        return _.partition(e, e => !DiagramIdHelper.isDiagramEditorId(e) && !DiagramIdHelper.isDiagramConnectionId(e))
    }
    partitionShapeAndNonShapeEntities(e) {
        return _.partition(e, e => !DiagramIdHelper.isDiagramEditorId(e.id) && !DiagramIdHelper.isDiagramConnectionId(e.id))
    }
    getEntitiesByIds(e, t) {
        var n = [];
        return e.forEach(e => {
            if (DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(e) || DiagramIdHelper.isDiagramLinkedId(e)) {
                var r = t.shapes.find(t => t.id === e);
                r && n.push(r)
            } else if (DiagramIdHelper.isDiagramEditorId(e)) n.push(t.elements[e]);
            else if (DiagramIdHelper.isDiagramConnectionId(e)) {
                var a = t.connections.find(t => t.id === e);
                a && n.push(a)
            }
        }),
        n
    }
}

export default DiagramEntityHelper