import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Geometry from '../Geometry/Geometry';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(167) /*ShapeScale*/

/// var r = n(35)/*slicedToArray*/;  // 1 times
/// var a = n.n(r);
/// var i = n(7)/*PropUpdateHelper*/;  // 1 times
/// var o = n(8)/*ShapeUtil*/;  // 2 times
/// var s = n(1)/*Geometry*/;  // 2 times
var ShapeScale = new class {
    scalePropertyInData(e, t, n, r, a) {
        var o = {};
        return t.forEach(t => {
            var i = this.scalePoint(e[t], n, r, a);
            o[t] = i
        }),
        PropUpdateHelper.update(e, o)
    }
    scalePoints(e, t, n, r) {
        var a = e.map(e => {
            var r = this.getFactor(e, t);
            return this.getPointFromFactor(n, r)
        });
        if (r) {
            var i = Geometry.getCenterPoint(n);
            a = ShapeUtil.pointsFlipped(i, !0, a)
        }
        return a
    }
    scalePoint(e, t, n, r) {
        var i = this.getFactor(e, t),
        l = this.getPointFromFactor(n, i);
        if (r) {
            var c = Geometry.getCenterPoint(n),
            d = ShapeUtil.pointsFlipped(c, !0, [l]);
            l = slicedToArray(d, 1)[0]
        }
        return l
    }
    getFactor(e, t) {
        return {
            x: (e.x - t.p1.x) / (t.p2.x - t.p1.x),
            y: (e.y - t.p1.y) / (t.p2.y - t.p1.y)
        }
    }
    getPointFromFactor(e, t) {
        return {
            x: e.p1.x + (e.p2.x - e.p1.x) * t.x,
            y: e.p1.y + (e.p2.y - e.p1.y) * t.y
        }
    }
}

export default ShapeScale