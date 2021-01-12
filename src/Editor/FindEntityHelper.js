import DiagramIdHelper from '../Elements/DiagramIdHelper';

/// xxx(86) /*FindEntityHelper*/

/// var r = n(6)/*DiagramIdHelper*/;  // 10 times
var FindEntityHelper = new class {
    findAllOriginalEditorIds(e) {
        return this.findAllLinkedEntities(e).map((e) => {
            return e.linkedId
        })
    }
    findAllLinkedEntities(e) {
        var t = [];
        var n = 0;
        for (; n < e.length; n++) {
            var a = e[n];
            if (DiagramIdHelper.isDiagramGroupId(a.id)) this.innerFindAllLinkedEntities(a, t);
            if (DiagramIdHelper.isDiagramLinkedId(a.id)) t.push(a)
        }
        return t
    }
    findAllOriginalEditors(e, t) {
        return this.findAllLinkedEntities(e).map((e) => {
            return t[e.linkedId]
        })
    }
    innerFindAllLinkedEntities(e, t) {
        var n = 0;
        for (; n < e.entities.length; n++) {
            var a = e.entities[n];
            if (DiagramIdHelper.isDiagramGroupId(a.id)) this.innerFindAllLinkedEntities(a, t);
            if (DiagramIdHelper.isDiagramLinkedId(a.id)) t.push(a)
        }
    }
    findLinkWithLinkToEditor(e, t) {
        var n = 0;
        for (; n < t.length; n++) {
            var a = t[n];
            if (DiagramIdHelper.isDiagramGroupId(a.id)) {
                var i = this.findLinkWithLinkToEditor(e, a.entities);
                if (i) return i
            }
            if (DiagramIdHelper.isDiagramLinkedId(a.id) && a.linkedId === e) return a
        }
        return null
    }
    findOriginalEntityFromLink(e, t) {
        return t[e.linkedId]
    }
    findGroupedEnityFromEditor(e, t) {
        var n = 0;
        for (; n < t.length; n++) {
            var a = t[n];
            if (DiagramIdHelper.isDiagramGroupId(a.id) && this.isEditorIdInGroup(e, a)) return a
        }
        return null
    }
    findGroupedEnityFromConnection(e, t) {
        var n = 0;
        for (; n < t.length; n++) {
            var a = t[n];
            if (DiagramIdHelper.isDiagramGroupId(a.id) && (this.isEditorIdInGroup(e.fromEditorId, a) || this.isEditorIdInGroup(e.toEditorId, a))) return a
        }
        return null
    }
    isEditorIdInGroup(e, t) {
        var n = 0;
        for (; n < t.entities.length; n++) {
            var a = t.entities[n];
            if (DiagramIdHelper.isDiagramGroupId(a.id) && this.isEditorIdInGroup(e, a)) return true;
            if (DiagramIdHelper.isDiagramLinkedId(a.id) && a.linkedId === e) return true
        }
        return false
    }
}

export default FindEntityHelper