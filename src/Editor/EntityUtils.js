import _ from 'lodash';
import DiagramIdHelper from '../Elements/DiagramIdHelper';

/// xxx(20) /*EntityUtils*/

/// var r = n(6)/*DiagramIdHelper*/;  // 22 times
/// var a = n(2)/*lodash*/;  // 4 times
/// var i = n.n(a);
var EntityUtils = new class {
    isDiagramEditor(e) {
        return DiagramIdHelper.isDiagramEditorId(e.id)
    }
    isStraightLineArrow(e) {
        return this.isShapeArrow(e) && !e.type
    }
    isQuadraticLineArrow(e) {
        return this.isShapeArrow(e) && "quadratic" == e.type
    }
    isCubicLineArrow(e) {
        return this.isShapeArrow(e) && "cubic" == e.type
    }
    isEllipse(e) {
        return "ellipse" == e.type
    }
    isRectangle(e) {
        return "rectangle" == e.type
    }
    isSquare(e) {
        return "square" == e.type
    }
    isPolygon(e) {
        return "polygon" == e.type
    }
    isCompositeShape(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id)
    }
    isConnection(e) {
        return DiagramIdHelper.isDiagramConnectionId(e.id)
    }
    isStraightConnection(e) {
        return this.isConnection(e) && !e.type
    }
    isQuadraticConnection(e) {
        return this.isConnection(e) && "quadratic" == e.type
    }
    isCubicConnection(e) {
        return this.isConnection(e) && "cubic" == e.type
    }
    isPolygonCurve(e) {
        return "polygon-curve" == e.type
    }
    isAxis2d(e) {
        return "axis2d" == e.type
    }
    isRullerArrow(e) {
        return "|" == e.shaft
    }
    isShapeArrow(e) {
        return DiagramIdHelper.isDiagramArrowId(e.id)
    }
    isShapeComposite(e) {
        return DiagramIdHelper.isDiagramCompositeShapeId(e.id)
    }
    isGroupedEntity(e) {
        return DiagramIdHelper.isDiagramGroupId(e.id)
    }
    isTemporaryEntity(e) {
        return DiagramIdHelper.isTemporaryEntity(e.id)
    }
    isPrimitiveShape(e) {
        return DiagramIdHelper.isDiagramShapeId(e.id)
    }
    isGeneralShape(e) {
        return this.isShapeArrow(e) || this.isPrimitiveShape(e) || this.isShapeComposite(e)
    }
    getEntityType(e) {
        return DiagramIdHelper.isTemporaryEntity(e.id) ? "temporary" : DiagramIdHelper.isDiagramEditorId(e.id) ? "text" : DiagramIdHelper.isDiagramConnectionId(e.id) ? "connection" : DiagramIdHelper.isDiagramArrowId(e.id) ? "shape-arrow" : DiagramIdHelper.isDiagramShapeId(e.id) ? "shape-object" : DiagramIdHelper.isDiagramCompositeShapeId(e.id) ? "shape-composite" : DiagramIdHelper.isDiagramIntersectionId(e.id) ? "intersection" : DiagramIdHelper.isDiagramGroupId(e.id) ? "group" : DiagramIdHelper.isDiagramLinkedId(e.id) ? "linked" : "diagram"
    }
    getEntityById(e, t) {
        return DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(t) ? _.find(e.shapes, e => e.id === t) : DiagramIdHelper.isDiagramGroupId(t) ? _.find(e.shapes, e => e.id === t) : DiagramIdHelper.isDiagramEditorId(t) ? e.elements[t] : DiagramIdHelper.isDiagramConnectionId(t) ? _.find(e.connections, e => e.id === t) : DiagramIdHelper.isDiagramIntersectionId(t) ? e.intersections : void 0
    }
    getEntities(e, t) {
        return _.map(t, t => this.getEntityById(e, t))
    }
}

export default EntityUtils