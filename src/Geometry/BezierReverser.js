import _ from 'lodash';
import Geometry from './Geometry';

/// xxx(135) /*BezierReverser*/

/*n.d(t, "a", function () {
    return o
});*/
/// var r = n(2)/*lodash*/;  // 5 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 10 times
function o(e, t, n) {
    var r = e.p1;
    var o = e.p2;
    var s = Geometry.getCenterPoint(r, o);
    var l = Geometry.rectWidth(e);
    var c = Geometry.rectHeight(e);
    var d = Math.max(l, c);
    var h = {
        p1: s,
        p2: Geometry.pointRotate({
            x: o.x + d,
            y: s.y
        },
        s, t)
    };
    var u = {
        p1: s,
        p2: Geometry.pointRotate({
            x: o.x + d,
            y: s.y
        },
        s, n)
    };
    var p = Geometry.ellipseToCubicBeziers(r, o);
    return function (e) {
        var t = _.findIndex(e, (e) => {
            return e.mark1;
        });
        var n = [];
        var r = 0;
        for (; r < e.length; r++) {
            var i = e[t];
            if (n.push(i), i.mark2) {
                break;
            }
            t++;
            t = t % e.length;
        }
        return n;
    } (p = function (e, t, n) {
        var r = false;
        return e = _.flatMap(e, (e) => {
            var n = Geometry.splitBezierByLine(e, t);
            return n.length > 0 ? (n.forEach((t) => {
                return t.mark1 = e.mark1;
            }), n[0].mark2 = true, r = true, n) : [e];
        }),
        r || (_.minBy(e, (e) => {
            return Geometry.angleDifferentFrom3Points180(e.p2, t.p2, n);
        }).mark2 = true),
        e;
    } (p = function (e, t, n) {
        var r = false;
        return e = _.flatMap(e, (e) => {
            var n = Geometry.splitBezierByLine(e, t);
            return n.length > 0 ? (n[1].mark1 = true, r = true, n) : [e];
        }),
        r || (_.minBy(e, (e) => {
            return Geometry.angleDifferentFrom3Points180(e.p1, t.p2, n);
        }).mark1 = true),
        e;
    } (p, h, s), u, s));
}

export default o