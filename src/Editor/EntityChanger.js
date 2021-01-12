import _ from 'lodash';
import EntityUtils from './EntityUtils';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(147) /*EntityChanger*/

/// var r = n(7)/*PropUpdateHelper*/;  // 5 times
/// var a = n(20)/*EntityUtils*/;  // 1 times
/// var i = n(2)/*lodash*/;  // 3 times
/// var o = n.n(i);
var EntityChanger = new class {
    changeEntityInData(e, t) {
        var n = EntityUtils.getEntityType(t);
        if ("diagram" == n) return t;
        if ("connection" == n) return this.setConnectionInData(e, t);
        if ("shape-arrow" == n) return this.setArrowInData(e, t);
        if ("shape-object" == n || "shape-composite" == n || "group" == n) return this.setShapeInData(e, t);
        if ("text" == n) return this.setEditorInData(e, t);
        if ("intersection" == n) return PropUpdateHelper.setProp(e, "intersections", t);
        if ("linked" == n) return e;
        throw new Error("not supported")
    }
    setConnectionInData(e, t) {
        var n = _.findIndex(e.connections, e => e.id === t.id);
        return PropUpdateHelper.set(e, "connections." + n, t)
    }
    setArrowInData(e, t) {
        var n = _.findIndex(e.shapes, e => e.id === t.id);
        return PropUpdateHelper.set(e, "shapes." + n, t)
    }
    setShapeInData(e, t) {
        var n = _.findIndex(e.shapes, e => e.id === t.id);
        return PropUpdateHelper.set(e, "shapes." + n, t)
    }
    setEditorInData(e, t) {
        return PropUpdateHelper.set(e, "elements." + t.id, t)
    }
    changeEntitiesInData(e, t) {
        return t.forEach(t => {
            e = this.changeEntityInData(e, t)
        }),
        e
    }
}

export default EntityChanger