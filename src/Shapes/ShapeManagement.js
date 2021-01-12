import _ from 'lodash';
import EntityUtils from '../Editor/EntityUtils';
import Geometry from '../Geometry/Geometry';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(44) /*ShapeManagement*/

/// var r = n(2)/*lodash*/;  // 4 times
/// var a = n.n(r);
/// var l = n(20)/*EntityUtils*/;  // 1 times
/// var o = n(1)/*Geometry*/;  // 3 times
/// var i = n(7)/*PropUpdateHelper*/;  // 5 times
var ShapeManagement = new class {
    changeConnection(e, t, n, r) {
        var o = _.findIndex(e, (e) => {
            return e.id === t
        });
        var s = e[o];
        var l = PropUpdateHelper.setProp(s, n, r);
        return PropUpdateHelper.setIndex(e, o, l)
    }
    changeConnectionObj(e, t, n) {
        var r = _.findIndex(e, (e) => {
            return e.id === t
        });
        var o = e[r];
        var s = PropUpdateHelper.update(o, n);
        return PropUpdateHelper.setIndex(e, r, s)
    }
    changeConnectionInData(e, t, n, r) {
        return PropUpdateHelper.setProp(e, "connections", this.changeConnection(e.connections, t, n, r))
    }
    getConnectionPoints(e, t, n) {
        var r = this.getConnection(e, n);
        return {
            from: t[r.fromEditorId].shape.data.p,
            to: t[r.toEditorId].shape.data.p
        }
    }
    getConnection(e, t) {
        return _.isString(t) ? _.find(e, (e) => {
            return e.id === t
        }) : t
    }
    getQuadraticAbsoluteControlPoint(e, t, n) {
        var r = this.getConnection(e, n);
        var a = this.getConnectionPoints(e, t, r);
        var i = a.from;
        var s = a.to;
        return Geometry.toAbsoluteConnectionControlPoint(r.data.cp, i, s)
    }
    getCubicAbsoluteControlPoints(e, t, n) {
        var r = this.getConnection(e, n);
        var a = this.getConnectionPoints(e, t, r);
        var i = a.from;
        var s = a.to;
        return [Geometry.toAbsoluteConnectionControlPoint(r.data.cp, i, s), Geometry.toAbsoluteConnectionControlPoint(r.data.cp2, i, s)]
    }
    getDataValue(e, t, n) {
        var r;
        return void 0 === (r = EntityUtils.isDiagramEditor(e) ? e.shape.data[t] : (e.data || {})[t]) ? n : r
    }
}

export default ShapeManagement