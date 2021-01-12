import _ from 'lodash';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(226) /*IntersectionEntityHelper*/

/// var r = n(2)/*lodash*/;  // 8 times
/// var a = n.n(r);
/// var i = n(7)/*PropUpdateHelper*/;  // 6 times
/// var o = n(6)/*DiagramIdHelper*/;  // 2 times
var IntersectionEntityHelper = new class {
    addEntity(e, t) {
        return e = this.removeEntity(e, t),
        PropUpdateHelper.setProp(e, "items", e.items.concat([{
            id: DiagramIdHelper.nextDiagramIntersectionId(),
            entities: [t.id]
        }]))
    }
    addEntities(e, t) {
        return PropUpdateHelper.setProp(e, "items", e.items.concat({
            id: DiagramIdHelper.nextDiagramIntersectionId(),
            entities: _.map(t, e => e.id)
        }))
    }
    removeEntity(e, t) {
        for (var n = [], r = 0; r < e.items.length; r++) {
            var o = e.items[r],
            s = o.entities;
            if (1 != s.length || s[0] != t.id) {
                var l = _.filter(s, e => e != t.id);
                l.length === s.length ? n.push(o) : l.length > 1 && n.push(PropUpdateHelper.setProp(o, "entities", l))
            }
        }
        return PropUpdateHelper.setProp(e, "items", n)
    }
    removeEntities(e, t) {
        for (var n = _.map(t, e => e.id), r = [], o = 0; o < e.items.length; o++) {
            var s = e.items[o],
            l = s.entities;
            if (this.isSubsetIntersection(s, n)) {
                var c = _.differenceBy(s.entities, t, "id");
                l = c.length > 1 ? c : null
            }
            l && r.push(PropUpdateHelper.setProp(s, "entities", l))
        }
        return PropUpdateHelper.setProp(e, "items", r)
    }
    isEntityIn(e, t) {
        return this.isSubset(e, [t])
    }
    isSubset(e, t) {
        var n = _.map(t, e => e.id);
        return _.some(e.items, e => _.intersection(e.entities, n).length === t.length)
    }
    isSubsetIntersection(e, t) {
        return this.isSubsetOf(t, e.entities)
    }
    isSubsetOf(e, t) {
        return _.intersection(t, e).length === e.length
    }
}

export default IntersectionEntityHelper