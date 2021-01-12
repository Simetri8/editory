import _ from 'lodash';
import Bezier from 'bezier-js';
import classNames from 'classnames';
import jsBezier from 'jsbezier';
import React from 'react';
import ArrayHelper from '../Mathcha/ArrayHelper';
import ControlPoints from '../Geometry/ControlPoints';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from './Toolbar/ItemDefaultSettings';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeSelection from '../Shapes/ShapeSelection';

/// xxx(139) /*ArrowRenderer*/

function A() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    switch (e) {
    case 1:
        return 5;
    case 2:
        return 6;
    case 3:
        return 7;
    case 4:
        return 8;
    case 5:
        return 9;
    case 6:
        return 10;
    case 7:
        return 12;
    case 8:
        return 14;
    default:
        return e + 2;
    }
}
function E() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    switch (e) {
    case 1:
        return 1;
    case 2:
        return 1.3;
    case 3:
        return 1.6;
    case 4:
        return 1.9;
    case 5:
        return 2.3;
    case 6:
        return 2.7;
    case 7:
        return 3.1;
    case 8:
        return 3.7;
    default:
        return 1 + Math.pow(e, 1.2) / 4;
    }
}
function v() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    switch (e) {
    case 1:
        return 1;
    case 2:
        return 1.2;
    case 3:
        return 1.4;
    case 4:
        return 1.6;
    case 5:
        return 1.7;
    case 6:
        return 2;
    case 7:
        return 2.3;
    case 8:
        return 2.7;
    default:
        return 1 + Math.pow(e, 1.2) / 4;
    }
}
function b(e, t, n, r) {
    e = _.clone(e);
    var a = t.head;
    var i = t.tail;
    var s = t.shaft;
    var l = S.getLineTailInfoCubic(e[0], i, r);
    e[0] = l.bezier;
    var c = S.getLineHeadInfoCubic(e[e.length - 1], a, r);
    e[e.length - 1] = c.bezier;
    e = function (e) {
        var t = e[0];
        if (t.p1.x === t.p2.x && t.p1.y === t.p2.y) {
            e.shift();
        }
        var n = e.length - 1;
        if (n >= 0 && e[n].p1.x === e[n].p2.x && e[n].p1.y === e[n].p2.y) {
            e.pop();
        }
        return e;
    } (e);
    var d = {
        headDoubleLineDistance: c.headDoubleLineDistance,
        tailDoubleLineDistance: l.tailDoubleLineDistance,
        headWaveLineDistance: c.headWaveLineDistance,
        tailWaveLineDistance: l.tailWaveLineDistance,
        headLineDistance: c.headLineDistance,
        tailLineDistance: l.tailLineDistance,
        settings: n
    };
    return {
        pathsInfo: S.getLineCubicShape(e, d, s),
        headInfo: c.headInfo,
        tailInfo: l.headInfo
    };
}
function L(e, t, n, r) {
    var a = t.head;
    var i = t.tail;
    var l = t.shaft;
    var c = e[0];
    var d = e[1];
    var h = e[e.length - 1];
    var u = e[e.length - 2];
    var p = S.getLineTailInfo({
        p1: c,
        p2: d
    },
    i, r);
    var m = S.getLineHeadInfo({
        p1: u,
        p2: h
    },
    a, r);
    var f = {
        headDoubleLineDistance: m.headDoubleLineDistance,
        tailDoubleLineDistance: p.tailDoubleLineDistance,
        headWaveLineDistance: m.headWaveLineDistance,
        tailWaveLineDistance: p.tailWaveLineDistance,
        headLineDistance: m.headLineDistance,
        tailLineDistance: p.tailLineDistance,
        settings: n
    };
    return (e = _.clone(e))[0] = p.p1,
    e[e.length - 1] = m.p2,
    e = Geometry.removePointsDuplicationAtStartEnd(e),
    {
        pathsInfo: S.getLineShape(l, e, f),
        headInfo: m.headInfo,
        tailInfo: p.headInfo
    };
}
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 7 times
/// var o = n.n(i);
/// var s = n(1)/*Geometry*/;  // 73 times
/// var l = n(43)/*ArrayHelper*/;  // 5 times
/// var c = n(84)/*ControlPoints*/;  // 9 times
/// var d = n(3);  // 2 times
/// var h = n.n(d);
/// var u = n(7)/*PropUpdateHelper*/;  // 4 times
/// n(108)/*bezierjs*/;  // 0 times
/// n(222)/*jsBezier*/;  // 0 times
class p {
    constructor(e, t) {
        this.perpendicularD = t;
        this.totalLength = 0;
        this.pathInfos = _.map(e, (e, t) => {
            var n = this.getLength(e);
            var r = {
                b: e,
                length: n,
                lengthSofar: this.totalLength,
                index: t
            };
            return this.totalLength += n,
            r;
        });
    }
    getMatchPath(e, t) {
        var n = t && this.lastInfo ? this.lastInfo.index : 0;
        for (; n < this.pathInfos.length; n++) {
            var r = this.pathInfos[n];
            if (r.lengthSofar <= e && e <= r.lengthSofar + r.length) {
                return r;
            }
        }
    }
    action(e, t, n, r) {
        var a = this.getPoint(t, n, r);
        return " ".concat(e).concat(Geometry.round2(a.x), ",").concat(Geometry.round2(a.y));
    }
    getPoint(e, t, n) {
        t = t || this.perpendicularD;
        var r = this.getMatchPath(e, n);
        return null == r && this.pathInfos && this.pathInfos[0] && (r = this.pathInfos[0]),
        null == r ? {
            x: 0,
            y: 0
        } : (this.lastInfo = r, this.getPointFromDistance(r.b, e - r.lengthSofar, t));
    }
}
class m extends p {
    getLength(e) {
        return Geometry.cubicBezierLength(e);
    }
    getPointFromDistance(e, t, n) {
        return Geometry.pointAtDistanceCubic(e, t, n);
    }
    getPointFromDistanceSecondPoint(e, t, n) {
        return Geometry.pointAtDistanceFromSecondPointCubic(e, t, n);
    }
}
class f extends p {
    getLength(e) {
        return Geometry.distance2Points(e.p1, e.p2);
    }
    getPointFromDistance(e, t, n) {
        return Geometry.pointAtDistance(e.p1, e.p2, t, n);
    }
    getPointFromDistanceSecondPoint(e, t, n) {
        return Geometry.pointAtDistanceFromSecondPoint(e.p1, e.p2, t, n);
    }
}
var g = new class {
    getWaveLines(e, t, n, r, a, i, o, l) {
        a = a || 0;
        i = i || 0;
        o = o || 0;
        l = l || 0;
        var c = Geometry.distance2Points(e, t);
        var d = null;
        var h = null;
        if (a) {
            d = Geometry.getMiddlePointLine(e, t, a / c, 0);
        }
        if (i) {
            h = Geometry.getMiddlePointLine(e, t, 1 - i / c, 0);
        }
        var u = [];
        if (d) {
            u.push({
                p1: e,
                p2: d,
                length: a
            });
        }
        var p = d || e;
        var m = h || t;
        var f = Geometry.distance2Points(p, m);
        var g = p;
        var y = 1;
        var A = n;
        for (; A <= f; A = A + n) {
            var E = Geometry.roundPoint(Geometry.pointAtDistance(p, m, A));
            var v = Geometry.roundPoint(Geometry.getMiddlePointLine(g, E, .5, r * y));
            u.push({
                p1: g,
                cp: v,
                p2: E,
                length: n
            });
            g = E;
            y = -y;
        }
        return A < f + n && (E = Geometry.roundPoint(Geometry.pointAtDistance(p, m, f)), u.push({
            p1: g,
            p2: E,
            length: Geometry.distance2Points(g, E)
        }), g = E),
        p != t && (E = Geometry.roundPoint(Geometry.pointAtDistance(e, t, c)), u.push({
            p1: g,
            p2: E,
            length: Geometry.distance2Points(g, E)
        }), g = E),
        o && (u = Geometry.insertBreakForPaths(u, o, l, "ratio")),
        u;
    }
    getWaveLineCubics(e, t, n, r, a, i, o, s, l, c) {
        return this.getWavePaths(e, t, n, r, a, i, o, s, l, c, m);
    }
    getWavePaths(e, t, n, r, a, i, l, c, d, h, p) {
        r = r || 0;
        a = a || 0;
        i = i || 0;
        c = c || 0;
        if ((l = l || 0) || c) {
            e = _.clone(e);
        }
        var m = new p(e, i);
        if (l && (e[0] = PropUpdateHelper.setProp(e[0], "p1", m.getPointFromDistance(e[0], l)), r = Math.max(0, r - l)), c) {
            var f = e[e.length - 1];
            e[e.length - 1] = PropUpdateHelper.setProp(f, "p2", m.getPointFromDistanceSecondPoint(f, c));
            a = Math.max(0, a - c);
        }
        var g = [];
        var y = (m = new p(e, i)).getPoint(0);
        if (r) {
            y = m.getPoint(r);
            g.push({
                p1: m.getPoint(0),
                p2: y,
                length: r
            });
        }
        var A = 1;
        var E = t + r;
        for (; E <= m.totalLength - a; E = E + t) {
            var v = m.getPoint(E - t / 2, m.perpendicularD + n * A, true);
            var S = m.getPoint(E, null, true);
            g.push({
                p1: y,
                cp: v,
                p2: S,
                length: t
            });
            A = -A;
            y = S;
        }
        return E < m.totalLength - a + t && (S = m.getPoint(m.totalLength - a, null, true), g.push({
            p1: y,
            p2: S,
            length: Geometry.distance2Points(y, S)
        }), y = S),
        a && (S = m.getPoint(m.totalLength, null, true), g.push({
            p1: y,
            p2: S,
            length: Geometry.distance2Points(y, S)
        }), y = S),
        d && (g = Geometry.insertBreakForPaths(g, d, h, "ratio")),
        g;
    }
    getRulerLinesFromPoints(e, t, n) {
        var r = Geometry.pointsToLines(e);
        return this.getRulerMarkPaths(r, t, n, 0, 0, 0, 0, 0, f);
    }
    getRulerBeziers(e, t, n) {
        var r = this.getRulerMarkPaths(e, t, n, 0, 0, 0, 0, 0, m);
        return e.concat(r);
    }
    getRulerMarkPaths(e, t, n, r, a, i, s, l, c) {
        r = r || 0;
        a = a || 0;
        s = s || 0;
        l = l || 0;
        var d = new c(e, i = i || 0);
        if ((s || l) && (e = _.clone(e)), s && (e[0] = PropUpdateHelper.setProp(e[0], "p1", d.getPointFromDistance(e[0], s)), r = Math.max(0, r - s)), l) {
            var h = e[e.length - 1];
            e[e.length - 1] = PropUpdateHelper.setProp(h, "p2", d.getPointFromDistanceSecondPoint(h, l));
            a = Math.max(0, a - l);
        }
        var p = [];
        var m = t + r;
        for (; m < d.totalLength - a; m = m + t) {
            var f = d.getPoint(m, d.perpendicularD + n / 2, true);
            var g = d.getPoint(m, d.perpendicularD - n / 2, true);
            p.push({
                p1: f,
                p2: g
            });
        }
        return p;
    }
};
/// var y = n(17)/*ItemDefaultSettings*/;  // 8 times
var S = new class {
    getLineShape(e, t, n) {
        var r = ItemDefaultSettings.getArrowOrConnectionSettings(n.settings, "breakWidth");
        var a = ItemDefaultSettings.getArrowOrConnectionSettings(n.settings, "breakPositionPercentage");
        switch (e) {
        case "-":
            case ".":
            case "--":
            return 2 === t.length && r ? {
                lines: Geometry.insertBreakForPaths([{
                    p1: t[0],
                    p2: t[1]
                }], r, a)
            } : {
                points: t
            };
        case "~":
            case "~.":
            return 2 === t.length && r ? {
                lines: g.getWaveLines(t[0], t[1], 5, 2.5, n.tailWaveLineDistance, n.headWaveLineDistance, r, a)
            } : {
                lines: this.getWaveLinesFromPoints(t, 5, 2.5, n.tailWaveLineDistance, n.headWaveLineDistance)
            };
        case "|":
            var i = ItemDefaultSettings.getArrowOrConnectionSettings(n.settings, "separatorDistance");
            var o = ItemDefaultSettings.getArrowOrConnectionSettings(n.settings, "separatorLength");
            return {
                lines: g.getRulerLinesFromPoints(t, i, o),
                points: t
            };
        case "2-":
            case "2.":
            case "2--":
            var l = this.createParallelLines(t, 3, n.tailDoubleLineDistance, n.headDoubleLineDistance);
            var c = l.lines1;
            var d = l.lines2;
            if (2 === t.length && r) {
                return c = Geometry.insertBreakForPaths([c[0]], r, a),
                d = Geometry.insertBreakForPaths([d[0]], r, a),
                {
                    lines: c.concat(d)
                };
            }
            var h = Geometry.jointParallelLines(c, d);
            return c = h.lines1,
            d = h.lines2,
            {
                lines: c.concat(d)
            };
        case "2~":
            case "2~.":
            var u = this.createParallelLines(t, 3, n.tailDoubleLineDistance, n.headDoubleLineDistance);
            var p = (c = u.lines1, d = u.lines2, n.tailDoubleLineDistance ? 3 : 0);
            var m = n.headDoubleLineDistance ? 3 : 0;
            if (2 === t.length && r) {
                var f = g.getWaveLines(c[0].p1, c[0].p2, 5, 2.5, p, m, r, a);
                var A = g.getWaveLines(d[0].p1, d[0].p2, 5, 2.5, p, m, r, a);
                return {
                    lines: f.concat(A)
                };
            }
            var E = Geometry.jointParallelLines(c, d);
            var v = (c = E.lines1, d = E.lines2, this.getWaveLines(c, 5, 2.5, p, m));
            var S = this.getWaveLines(d, 5, 2.5, p, m);
            return {
                lines: v.concat(S)
            };
        }
    }
    getLineCubicShape(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "-";
        var r = ItemDefaultSettings.getArrowOrConnectionSettings(t.settings, "breakWidth");
        var a = ItemDefaultSettings.getArrowOrConnectionSettings(t.settings, "breakPositionPercentage");
        switch (t.headLineDistance, t.tailLineDistance, n) {
        case "-":
            case ".":
            case "--":
            return 1 === e.length && r ? {
                lines: Geometry.insertBreakForPaths([e[0]], r, a)
            } : {
                lines: e
            };
        case "~":
            case "~.":
            return 1 === e.length && r ? {
                lines: g.getWaveLineCubics(e, 5, 2.5, t.tailWaveLineDistance, t.headWaveLineDistance, 0, 0, 0, r, a)
            } : {
                lines: g.getWaveLineCubics(e, 5, 2.5, t.tailWaveLineDistance, t.headWaveLineDistance, 0, 0, 0)
            };
        case "|":
            var i = ItemDefaultSettings.getArrowOrConnectionSettings(t.settings, "separatorDistance");
            var o = ItemDefaultSettings.getArrowOrConnectionSettings(t.settings, "separatorLength");
            return {
                lines: g.getRulerBeziers(e, i, o)
            };
        case "2-":
            case "2.":
            case "2--":
            var l = this.createCubicParallelLines(e, 3, t.tailDoubleLineDistance, t.headDoubleLineDistance);
            var c = l.beziers1;
            var d = l.beziers2;
            if (1 === e.length && r) {
                var h = Geometry.insertBreakForPaths(c, r, a);
                var u = Geometry.insertBreakForPaths(d, r, a);
                return {
                    lines: h.concat(u)
                };
            }
            return {
                lines: c.concat(d)
            };
        case "2~":
            case "2~.":
            if (1 === e.length && r) {
                var p = g.getWaveLineCubics(e, 5, 2.5, t.tailWaveLineDistance, t.headWaveLineDistance, 1.5, t.tailDoubleLineDistance, t.headDoubleLineDistance, r, a);
                var m = g.getWaveLineCubics(e, 5, 2.5, t.tailWaveLineDistance, t.headWaveLineDistance, -1.5, t.tailDoubleLineDistance, t.headDoubleLineDistance, r, a);
                return {
                    lines: p.concat(m)
                };
            }
            return p = g.getWaveLineCubics(e, 5, 2.5, t.tailWaveLineDistance, t.headWaveLineDistance, 1.5, t.tailDoubleLineDistance, t.headDoubleLineDistance),
            m = g.getWaveLineCubics(e, 5, 2.5, t.tailWaveLineDistance, t.headWaveLineDistance, -1.5, t.tailDoubleLineDistance, t.headDoubleLineDistance),
            {
                lines: p.concat(m)
            };
        }
    }
    createParallelLines(e, t, n, r) {
        var a = [];
        var i = [];
        var o = 0;
        for (; o < e.length - 1; o++) {
            var l = e[o];
            var c = e[o + 1];
            var d = Geometry.parallelLine(l, c, t / 2);
            var h = Geometry.parallelLine(l, c, -t / 2);
            if (0 === o) {
                d.p1 = Geometry.pointAtDistance(d.p1, d.p2, n);
                h.p1 = Geometry.pointAtDistance(h.p1, h.p2, n);
            }
            if (o === e.length - 2) {
                d.p2 = Geometry.pointAtDistanceFromSecondPoint(d.p1, d.p2, r);
                h.p2 = Geometry.pointAtDistanceFromSecondPoint(h.p1, h.p2, r);
            }
            a.push(d);
            i.push(h);
        }
        return {
            lines1: a,
            lines2: i
        };
    }
    createCubicParallelLines(e, t, n, r) {
        var a = [];
        var i = [];
        var o = 0;
        for (; o < e.length; o++) {
            var l = e[o];
            var c = Geometry.parallelCubicBezier(l, t / 2);
            var d = Geometry.parallelCubicBezier(l, -t / 2);
            a = a.concat(c);
            i = i.concat(d);
        }
        if (n && (a[0].p1 = Geometry.pointAtDistanceCubic(a[0], n), i[0].p1 = Geometry.pointAtDistanceCubic(i[0], n)), r) {
            var h = a.length - 1;
            a[h].p2 = Geometry.pointAtDistanceFromSecondPointCubic(a[h], r);
            i[h].p2 = Geometry.pointAtDistanceFromSecondPointCubic(i[h], r);
        }
        return {
            beziers1: a,
            beziers2: i
        };
    }
    getEmptyInfo(e, t) {
        return {
            p1: e,
            p2: t,
            headDoubleLineDistance: 0,
            tailDoubleLineDistance: 0,
            headWaveLineDistance: 0,
            tailWaveLineDistance: 0,
            headLineDistance: 0,
            tailLineDistance: 0,
            headInfo: null
        };
    }
    getCurveEmptyInfo(e) {
        return {
            headDoubleLineDistance: 0,
            tailDoubleLineDistance: 0,
            headWaveLineDistance: 0,
            tailWaveLineDistance: 0,
            headLineDistance: 0,
            tailLineDistance: 0,
            headInfo: null,
            bezier: e
        };
    }
    buildInfo(e, t, n, r, a, i, o) {
        return {
            p1: e,
            p2: t,
            headDoubleLineDistance: n.headDoubleLineDistance || 0,
            tailDoubleLineDistance: n.tailDoubleLineDistance || 0,
            headWaveLineDistance: n.headWaveLineDistance || 0,
            tailWaveLineDistance: n.tailWaveLineDistance || 0,
            headLineDistance: n.headLineDistance || 0,
            tailLineDistance: n.tailLineDistance || 0,
            headInfo: n.vectors(a, r, i, o)
        };
    }
    buildCurveInfo(e, t, n, r, a, i) {
        return {
            bezier: e,
            headDoubleLineDistance: t.headDoubleLineDistance || 0,
            tailDoubleLineDistance: t.tailDoubleLineDistance || 0,
            headWaveLineDistance: t.headWaveLineDistance || 0,
            tailWaveLineDistance: t.tailWaveLineDistance || 0,
            headLineDistance: t.headLineDistance || 0,
            tailLineDistance: t.tailLineDistance || 0,
            headInfo: t.vectors(r, n, a, i)
        };
    }
    getFirstPartStraightLine(e, t) {
        if (!t) {
            return e;
        }
        if (this.isSamePoint(e.p1, e.p2)) {
            return e;
        }
        if (t >= Geometry.distance2Points(e.p1, e.p2)) {
            return {
                p1: e.p1,
                p2: e.p1
            };
        }
        var n = Geometry.pointAtDistanceFromSecondPoint(e.p1, e.p2, t);
        return {
            p1: e.p1,
            p2: n
        };
    }
    getLineHeadInfo(e, t, n) {
        var r = e.p1;
        var a = e.p2;
        if (!t || "no" == t) {
            return this.getEmptyInfo(r, a);
        }
        var i = Geometry.angleFrom2Points360(r.x, r.y, a.x, a.y);
        var o = this.getArrowPartDrawingInfo(t, n);
        if (!o) {
            return this.getEmptyInfo(r, a);
        }
        var l = this.getFirstPartStraightLine(e, o.fromRight);
        var c = this.getFirstPartStraightLine(l, o.headLineDistance);
        return this.buildInfo(c.p1, c.p2, o, i, l.p2, "head", n);
    }
    getStartPartCurveByDistance(e, t, n) {
        if (this.isBezierAsOnePoint(e)) {
            return e;
        }
        var r = e;
        if (t >= n) {
            r = _.assignIn({},
            e, {
                p2: e.p1
            });
        } else {
            if (t) {
                var a = Geometry.bezierRatioFromDistance(e, n - t);
                r = Geometry.splitBezier(e, a)[0] || e;
            }
        }
        return r;
    }
    isBezierAsOnePoint(e) {
        return this.isSamePoint(e.p1, e.p2);
    }
    isSamePoint(e, t) {
        return e.x === t.x && e.y === t.y;
    }
    getLineHeadInfoCubic(e, t, n) {
        if (!t || "no" == t || this.isBezierAsOnePoint(e)) {
            return this.getCurveEmptyInfo(e);
        }
        var r = this.getArrowPartDrawingInfo(t, n);
        if (!r) {
            return this.getCurveEmptyInfo(e);
        }
        var a = Geometry.cubicBezierLength(e);
        var i = this.getStartPartCurveByDistance(e, r.fromRight, a);
        var o = Geometry.angleEndPointOfCubicLine360(e);
        var l = this.getStartPartCurveByDistance(i, r.headLineDistance, a);
        return this.buildCurveInfo(l, r, o, i.p2, "head", n);
    }
    getLastLineStraightLine(e, t) {
        return t ? this.isSamePoint(e.p1, e.p2) ? e : t >= Geometry.distance2Points(e.p1, e.p2) ? {
            p1: e.p2,
            p2: e.p2
        } : {
            p1: Geometry.pointAtDistance(e.p1, e.p2, t),
            p2: e.p2
        } : e;
    }
    getLineTailInfo(e, t, n) {
        var r = e.p1;
        var a = e.p2;
        if (!t || "no" == t) {
            return this.getEmptyInfo(r, a);
        }
        var i = this.getArrowPartDrawingInfo(t, n);
        if (!i) {
            return null;
        }
        var o = Geometry.angleFrom2Points360(r.x, r.y, a.x, a.y);
        var l = this.getLastLineStraightLine(e, i.fromLeft);
        var c = this.getLastLineStraightLine(l, i.tailLineDistance);
        return this.buildInfo(c.p1, c.p2, i, o, l.p1, "tail", n);
    }
    getEndPartCurveByDistance(e, t, n) {
        if (this.isBezierAsOnePoint(e)) {
            return e;
        }
        var r = e;
        if (t >= n) {
            r = _.assignIn({},
            e, {
                p1: e.p2
            });
        } else {
            if (t) {
                var a = Geometry.bezierRatioFromDistance(e, t);
                r = Geometry.splitBezier(e, a)[1] || e;
            }
        }
        return r;
    }
    getLineTailInfoCubic(e, t, n) {
        if (!t || "no" == t || this.isBezierAsOnePoint(e)) {
            return this.getCurveEmptyInfo(e);
        }
        var r = this.getArrowPartDrawingInfo(t, n);
        if (!r) {
            return this.getCurveEmptyInfo(e);
        }
        var a = Geometry.cubicBezierLength(e);
        var i = this.getEndPartCurveByDistance(e, r.fromLeft, a);
        var o = Geometry.angleStartPointOfCubicLine360(e);
        var l = this.getEndPartCurveByDistance(i, r.tailLineDistance, a);
        return this.buildCurveInfo(l, r, o, i.p1, "tail", n);
    }
    round2(e) {
        return +e.toFixed(2);
    }
    getWaveLines(e, t, n, r, a) {
        var i = [];
        var o = 0;
        for (; o < e.length; o++) {
            var l = e[o];
            var c = 0 === o ? r : 0;
            var d = o === e.length - 1 ? a : 0;
            var h = l.p1;
            var u = l.p2;
            var p = n;
            if (l.original && ("extend" == l.startPointScale && (c = Geometry.distance2Points(h, l.original.p1)), "reduce" == l.startPointScale)) {
                var m = Geometry.distance2Points(h, l.original.p1);
                var f = Number.parseInt(m / t);
                if ((c = t * (f + 1) - m) > 0 && (f + 1) % 2 === 1) {
                    p = -p;
                }
            }
            i = i.concat(g.getWaveLines(h, u, t, p, c, d));
        }
        return i;
    }
    getWaveLinesFromPoints(e, t, n, r, a) {
        var i = [];
        var o = 0;
        for (; o < e.length - 1; o++) {
            var s = e[o];
            var l = e[o + 1];
            var c = 0 === o ? r : 0;
            var d = o === e.length - 2 ? a : 0;
            i = i.concat(g.getWaveLines(s, l, t, n, c, d));
        }
        return i;
    }
    getArrowPartDrawingInfo(e, t) {
        var n = E(t);
        switch (e) {
        case "hook-down-(":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        arc: {
                            p1: {
                                x: 0,
                                y: 0
                            },
                            p2: {
                                x: 0,
                                y: 5.59 * r * 2
                            },
                            rx: 5.59 * r,
                            ry: 5.59 * r,
                            xRotation: 0
                        }
                    };
                }
            };
        case "hook-down-)":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        arc: {
                            p1: {
                                x: 0,
                                y: -5.59 * r * 2
                            },
                            p2: {
                                x: 0,
                                y: 0
                            },
                            rx: 5.59 * r,
                            ry: 5.59 * r,
                            xRotation: 0
                        }
                    };
                }
            };
        case "hook-up-(":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        arc: {
                            p1: {
                                x: 0,
                                y: -5.59 * r * 2
                            },
                            p2: {
                                x: 0,
                                y: 0
                            },
                            rx: 5.59 * r,
                            ry: 5.59 * r,
                            xRotation: 0
                        }
                    };
                }
            };
        case "hook-up-)":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        arc: {
                            p1: {
                                x: 0,
                                y: 0
                            },
                            p2: {
                                x: 0,
                                y: 5.59 * r * 2
                            },
                            rx: 5.59 * r,
                            ry: 5.59 * r,
                            xRotation: 0
                        }
                    };
                }
            };
        case ">":
            return {
                fromRight: 0,
                fromLeft: t + 1,
                headLineDistance: t + 1,
                headDoubleLineDistance: 6,
                tailDoubleLineDistance: -4,
                headWaveLineDistance: 8,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            }
                        },
                        {
                            p1: {
                                x: 0,
                                y: 0
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            }
                        }]
                    };
                }
            };
        case "f>":
            return {
                fromRight: 0,
                fromLeft: t + 1,
                headLineDistance: t + 1,
                tailLineDistance: -t,
                headDoubleLineDistance: 6,
                tailDoubleLineDistance: -4,
                headWaveLineDistance: 8,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        fill: true,
                        stroke: false,
                        rotation: t + 180,
                        p: e,
                        points: [{
                            x: 8.93 * r,
                            y: -4.29 * r
                        },
                        {
                            x: 0 * r,
                            y: 0 * r
                        },
                        {
                            x: 8.93 * r,
                            y: 4.29 * r
                        },
                        {
                            x: 8.93 * r,
                            y: -4.29 * r
                        }]
                    };
                }
            };
        case "fh>":
            return {
                fromRight: 0,
                fromLeft: t + 1,
                headLineDistance: t + 1,
                tailLineDistance: -t,
                headDoubleLineDistance: 6,
                tailDoubleLineDistance: -4,
                headWaveLineDistance: 8,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1) + .2;
                    return {
                        fill: true,
                        stroke: false,
                        rotation: t + 180,
                        p: e,
                        points: [{
                            x: 8.93 * r,
                            y: -4.29 * r
                        },
                        {
                            x: 0 * r,
                            y: 0 * r
                        },
                        {
                            x: 8.93 * r,
                            y: 4.29 * r
                        },
                        {
                            x: 5.93 * r,
                            y: 0 * r
                        },
                        {
                            x: 8.93 * r,
                            y: -4.29 * r
                        }]
                    };
                }
            };
        case "2>":
            return {
                fromRight: 0,
                fromLeft: t + 1,
                headLineDistance: t + 1,
                headDoubleLineDistance: 5,
                tailDoubleLineDistance: -4,
                headWaveLineDistance: 8,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case "<":
            return {
                fromRight: t + 1,
                fromLeft: 0,
                tailLineDistance: t + 1,
                headDoubleLineDistance: -4,
                tailDoubleLineDistance: 6,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 8,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "f<":
            return {
                fromRight: t + 1,
                fromLeft: 0,
                tailLineDistance: t + 1,
                headLineDistance: -t,
                headDoubleLineDistance: -4,
                tailDoubleLineDistance: 6,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 8,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        fill: true,
                        stroke: false,
                        rotation: t,
                        p: e,
                        points: [{
                            x: 8.93 * r,
                            y: -4.29 * r
                        },
                        {
                            x: 0 * r,
                            y: 0 * r
                        },
                        {
                            x: 8.93 * r,
                            y: 4.29 * r
                        },
                        {
                            x: 8.93 * r,
                            y: -4.29 * r
                        }]
                    };
                }
            };
        case "fh<":
            return {
                fromRight: t + 1,
                fromLeft: 0,
                tailLineDistance: t + 1,
                headLineDistance: -t,
                headDoubleLineDistance: -4,
                tailDoubleLineDistance: 6,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 8,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1) + .2;
                    return {
                        fill: true,
                        stroke: false,
                        rotation: t,
                        p: e,
                        points: [{
                            x: 8.93 * r,
                            y: -4.29 * r
                        },
                        {
                            x: 0 * r,
                            y: 0 * r
                        },
                        {
                            x: 8.93 * r,
                            y: 4.29 * r
                        },
                        {
                            x: 5.93 * r,
                            y: 0 * r
                        },
                        {
                            x: 8.93 * r,
                            y: -4.29 * r
                        }]
                    };
                }
            };
        case "2<":
            return {
                fromRight: t + 1,
                fromLeft: 0,
                tailLineDistance: t + 1,
                headDoubleLineDistance: -4,
                tailDoubleLineDistance: 5,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 8,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case ")":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        arc: {
                            p1: {
                                x: 5.59 * r,
                                y: -5.59 * r
                            },
                            p2: {
                                x: 5.59 * r,
                                y: 5.59 * r
                            },
                            rx: 5.59 * r,
                            ry: 5.59 * r,
                            xRotation: 0
                        }
                    };
                }
            };
        case "(":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        arc: {
                            p1: {
                                x: 5.59 * r,
                                y: -5.59 * r
                            },
                            p2: {
                                x: 5.59 * r,
                                y: 5.59 * r
                            },
                            rx: 5.59 * r,
                            ry: 5.59 * r,
                            xRotation: 0
                        }
                    };
                }
            };
        case "|":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        }]
                    };
                }
            };
        case "||":
            return {
                fromRight: A(t),
                fromLeft: A(t),
                vectors(e, t, n) {
                    var r = v(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return "head" == n ? {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: -3.35 * r * 1.5,
                                y: 5.59 * r
                            },
                            p2: {
                                x: -3.35 * r * 1.5,
                                y: -5.59 * r
                            }
                        }]
                    } : {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: -3.35 * r * 1.5,
                                y: 5.59 * r
                            },
                            p2: {
                                x: -3.35 * r * 1.5,
                                y: -5.59 * r
                            }
                        }]
                    };
                }
            };
        case ">>":
            return {
                fromRight: 0,
                fromLeft: (t - 1) / 2,
                headDoubleLineDistance: 13,
                tailDoubleLineDistance: -8,
                headWaveLineDistance: 14,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 17.64 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 3.29 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "2>>":
            return {
                fromRight: 0,
                fromLeft: (t - 1) / 2,
                headDoubleLineDistance: 11,
                tailDoubleLineDistance: -8,
                headWaveLineDistance: 14,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 17.64 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 4.9 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case "<<":
            return {
                fromRight: (t - 1) / 2,
                fromLeft: 0,
                headDoubleLineDistance: -8,
                tailDoubleLineDistance: 13,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 14,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 17.64 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 3.29 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "2<<":
            return {
                fromRight: (t - 1) / 2,
                fromLeft: 0,
                headDoubleLineDistance: -8,
                tailDoubleLineDistance: 11,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 14,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 17.64 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 4.9 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case ">|":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 7,
                tailDoubleLineDistance: 0,
                headWaveLineDistance: 8,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "2>|":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 5,
                tailDoubleLineDistance: 0,
                headWaveLineDistance: 8,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case "|<":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 0,
                tailDoubleLineDistance: 7,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 8,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "2|<":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 0,
                tailDoubleLineDistance: 5,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 8,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case "+":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 5,
                tailDoubleLineDistance: 5,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: -5.59 * r,
                                y: 0 * r
                            },
                            p2: {
                                x: 5.59 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        }]
                    };
                }
            };
        case "x":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 2,
                tailDoubleLineDistance: 2,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 45,
                        p: e,
                        lines: [{
                            p1: {
                                x: -5.59 * r,
                                y: 0 * r
                            },
                            p2: {
                                x: 5.59 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        }]
                    };
                }
            };
        case ">>|":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 14,
                tailDoubleLineDistance: 0,
                headWaveLineDistance: 14,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 17.64 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 3.29 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "2>>|":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 12,
                tailDoubleLineDistance: 0,
                headWaveLineDistance: 14,
                tailWaveLineDistance: 0,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t + 180,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 17.64 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 4.9 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case "|<<":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 0,
                tailDoubleLineDistance: 14,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 14,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 17.64 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 3.29 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -3.29 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -.45 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: .45 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 3.29 * r
                            }
                        }]
                    };
                }
            };
        case "2|<<":
            return {
                fromRight: 0,
                fromLeft: 0,
                headDoubleLineDistance: 0,
                tailDoubleLineDistance: 12,
                headWaveLineDistance: 0,
                tailWaveLineDistance: 14,
                vectors(e, t, n) {
                    var r = E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1);
                    return {
                        rotation: t,
                        p: e,
                        lines: [{
                            p1: {
                                x: 0 * r,
                                y: 5.59 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: -5.59 * r
                            }
                        },
                        {
                            p1: {
                                x: 17.64 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 6.71 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 6.71 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 11.67 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 17.64 * r,
                                y: 4.9 * r
                            }
                        },
                        {
                            p1: {
                                x: 10.93 * r,
                                y: -4.9 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: -1 * r
                            },
                            p2: {
                                x: 0 * r,
                                y: 0 * r
                            }
                        },
                        {
                            p1: {
                                x: 0 * r,
                                y: 0 * r
                            },
                            cp: {
                                x: 4.96 * r,
                                y: 1 * r
                            },
                            p2: {
                                x: 10.93 * r,
                                y: 4.9 * r
                            }
                        }]
                    };
                }
            };
        case "*":
            return {
                fromRight: 0,
                fromLeft: 0,
                vectors(e, t, n) {
                    return {
                        rotation: t,
                        p: e,
                        fill: true,
                        circle: {
                            cp: {
                                x: 0,
                                y: 0
                            },
                            r: 3.35 * E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1)
                        }
                    };
                }
            };
        case "o":
            return {
                fromRight: 0,
                fromLeft: 0,
                headLineDistance: 3.35 * n - 1,
                tailLineDistance: 3.35 * n - 1,
                vectors(e, t, n) {
                    return {
                        rotation: t,
                        p: e,
                        circle: {
                            cp: {
                                x: 0,
                                y: 0
                            },
                            r: 3.35 * E(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1)
                        }
                    };
                }
            };
        }
    }
};
/// var C = n(14)/*classnames*/;  // 2 times
/// var x = n.n(C);
/// var I = n(192)/*ShapeSelection*/;  // 1 times
/*n.d(t, "c", function () {
    return T;
});*/
/*n.d(t, "a", function () {
    return b;
});*/
/*n.d(t, "b", function () {
    return L;
});*/
class T extends React.Component {
    isStyleInfoDifferent(e, t) {
        return e != t && ( !! e != !!t || (!ArrayHelper.areEqualShallow(e.defs, t.defs) || !ArrayHelper.areEqualShallow(e.style, t.style)));
    }
    shouldComponentUpdate(e) {
        return ! (e.tail === this.props.tail && e.head === this.props.head && e.shaft === this.props.shaft && e.thickness === this.props.thickness && e.type === this.props.type && e.isSelected === this.props.isSelected && e.isGroupSelected === this.props.isGroupSelected && e.isRemoteSelected === this.props.isRemoteSelected && e.remoteSelectedColor === this.props.remoteSelectedColor && e.settings === this.props.settings && e.style === this.props.style && !this.isStyleInfoDifferent(e.htmlStyleInfo, this.props.htmlStyleInfo) && e.className === this.props.className) || ("straight" == this.props.type ? !ArrayHelper.arrayEquals(this.props.data, e.data, (e, t) => {
            return Geometry.pointEquals(e, t);
        }) : "quadratic" == this.props.type ? !ArrayHelper.arrayEquals(this.props.data, e.data, (e, t) => {
            return Geometry.pointEquals(e.p1, t.p1) && Geometry.pointEquals(e.cp, t.cp) && Geometry.pointEquals(e.p2, t.p2);
        }) : "cubic" == this.props.type ? !ArrayHelper.arrayEquals(this.props.data, e.data, (e, t) => {
            return Geometry.pointEquals(e.p1, t.p1) && Geometry.pointEquals(e.cp, t.cp) && Geometry.pointEquals(e.cp2, t.cp2) && Geometry.pointEquals(e.p2, t.p2);
        }) : e.data != this.props.data);
    }
    getSelectedClassName() {
        return classNames(this.props.className, {
            selected: this.props.isSelected,
            "group-selected": this.props.isGroupSelected
        });
    }
    getTransparentStyle() {
        return ShapeSelection.getSelectionStyle(this.props, this.props.thickness);
    }
    renderStraightArrow(e) {
        var t;
        var n;
        var r;
        var i;
        var s = this.props;
        var l = s.shaft;
        var d = s.thickness;
        var h = this.getSelectedClassName();
        var u = this.props.htmlStyleInfo.style;
        if (e.length > 1) {
            var p = L(e, this.props, this.props.settings, this.props.thickness || 1);
            var m = L(e, _.assign({},
            this.props, {
                shaft: "-",
                thickness: 1
            }), this.props.settings, this.props.thickness || 1);
            t = ControlPoints.fromPathInfo(p.pathsInfo, h + " real", u, {
                shaft: l,
                thickness: d
            });
            n = ControlPoints.fromPathInfo(m.pathsInfo, "connection transparent no-print", this.getTransparentStyle(), {
                shaft: "-",
                thickness: 1
            });
            i = ControlPoints.fromHeadInfo(p.headInfo, u);
            r = ControlPoints.fromHeadInfo(p.tailInfo, u);
        }
        return React.createElement("g", {
            className: this.getArrowClss(),
            style: this.props.style,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.props.htmlStyleInfo ? this.props.htmlStyleInfo.defs : void 0, t, i, r, n);
    }
    renderQuadraticGuideLineToControlPoints(e, t) {
        return !t || this.props.noControlPointGuideLine ? null : [React.createElement("line", {
            className: "control-point-guide",
            key: "controlp1",
            x1: e.p1.x,
            y1: e.p1.y,
            x2: e.cp.x,
            y2: e.cp.y
        }), React.createElement("line", {
            className: "control-point-guide",
            key: "controlp2",
            x1: e.p2.x,
            y1: e.p2.y,
            x2: e.cp.x,
            y2: e.cp.y
        })];
    }
    renderCubicGuideLineToControlPoints(e, t) {
        return !t || this.props.noControlPointGuideLine ? null : ControlPoints.getCubicControlPointGuides(e);
    }
    renderCubicArrow(e, t) {
        var n;
        var r;
        var i;
        var s;
        var l = this.props;
        var d = l.shaft;
        var h = l.thickness;
        var u = this.getSelectedClassName();
        var p = this.props.htmlStyleInfo.style;
        if (e.length > 0) {
            var m = b(e, this.props, this.props.settings, h);
            var f = b(e, _.assign({},
            this.props, {
                shaft: "-",
                thickness: h
            }), this.props.settings, h);
            n = ControlPoints.fromPathInfo(m.pathsInfo, u + " real", p, {
                shaft: d,
                thickness: h
            });
            r = ControlPoints.fromPathInfo(f.pathsInfo, "connection transparent no-print", this.getTransparentStyle(), {
                shaft: "-",
                thickness: h
            });
            s = ControlPoints.fromHeadInfo(m.headInfo, p);
            i = ControlPoints.fromHeadInfo(m.tailInfo, p);
        }
        return React.createElement("g", {
            className: this.getArrowClss(),
            style: this.props.style,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.props.htmlStyleInfo ? this.props.htmlStyleInfo.defs : void 0, r, n, i, s, t);
    }
    getArrowClss() {
        return classNames("arrow-line", {
            selected: this.props.isSelected,
            "group-selected": this.props.isGroupSelected
        });
    }
    render() {
        if ("straight" == this.props.type) {
            return this.renderStraightArrow(this.props.data);
        }
        if ("quadratic" == this.props.type) {
            var e = this.props.data;
            if (e.length > 1) {
                throw new Error("not supported");
            }
            var t = Geometry.quadraticToCubic(e[0]);
            var n = this.renderQuadraticGuideLineToControlPoints(e[0], this.props.isSelected);
            return this.renderCubicArrow([t], n);
        }
        if ("cubic" == this.props.type) {
            var r = this.props.data;
            var a = this.renderCubicGuideLineToControlPoints(r, this.props.isSelected);
            return this.renderCubicArrow(r, a);
        }
    }
}

export { T as ArrowRendererC }

export { L as ArrowRendererB }

export default b