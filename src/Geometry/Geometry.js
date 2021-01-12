import _ from 'lodash';
import Bezier from 'bezier-js';
import Flatten from '@flatten-js/core';
import jsBezier from 'jsbezier';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(1) /*Geometry*/
/*github.com/thelonious/kld-intersections*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(295)/*flatten-js*/;  // 4 times
/// var o = n.n(i);
/// var s = n(108)/*bezierjs*/;  // 17 times
/// var l = n.n(s);
/// var c = n(2)/*lodash*/;  // 7 times
/// var d = n.n(c);
/// var h = n(222)/*jsBezier*/;  // 3 times
/// var u = n(7)/*PropUpdateHelper*/;/*Intersection*/  // 23 times
function p(e) {
    arguments.length > 0 && this.init(e)
}/*.Point2D*/
function m(e, t) {
    arguments.length > 0 && this.init(e, t)
}/*.Polynomial*/
function f() {
    this.init(arguments)
}/*.Vector2D*/
function g(e, t) {
    arguments.length > 0 && this.init(e, t)
}
Array.prototype.min = function () {
    var e = this[0];
    var t = 0;
    for (; t < this.length; t++) {
        if (this[t] < e) {
            e = this[t];
        }
    }
    return e;
};
Array.prototype.max = function () {
    var e = this[0];
    var t = 0;
    for (; t < this.length; t++) {
        if (this[t] > e) {
            e = this[t];
        }
    }
    return e;
};
p.prototype.init = function (e) {
    this.status = e;
    this.points = new Array;
};
p.prototype.appendPoint = function (e) {
    this.points.push(e);
};
p.prototype.appendPoints = function (e) {
    this.points = this.points.concat(e);
};
p.intersectShapes = function (e, t) {
    var n;
    var r = e.getIntersectionParams();
    var a = t.getIntersectionParams();
    if (null != r && null != a) {
        if ("Path" === r.name) {
            n = p.intersectPathShape(e, t);
        } else {
            if ("Path" === a.name) {
                n = p.intersectPathShape(t, e);
            } else {
                var i;
                var o;
                if (r.name < a.name ? (i = "intersect" + r.name + a.name, o = r.params.concat(a.params)) : (i = "intersect" + a.name + r.name, o = a.params.concat(r.params)), !(i in p)) {
                    throw new Error("Intersection not available: " + i);
                }
                n = p[i].apply(null, o);
            }
        }
    } else {
        n = new p("No Intersection");
    }
    return n;
};
p.intersectPathShape = function (e, t) {
    return e.intersectShape(t);
};
p.intersectBezier2Bezier2 = function (e, t, n, r, a, i) {
    var o;
    var s;
    var l;
    var c;
    var d;
    var h;
    var u = new p("No Intersection");
    g = t.multiply(-2);
    o = e.add(g.add(n));
    g = e.multiply(-2);
    y = t.multiply(2);
    s = g.add(y);
    l = new m(e.x, e.y);
    g = a.multiply(-2);
    c = r.add(g.add(i));
    g = r.multiply(-2);
    y = a.multiply(2);
    d = g.add(y);
    h = new m(r.x, r.y);
    var g = o.x * s.y - s.x * o.y;
    var y = c.x * s.y - s.x * c.y;
    var A = d.x * s.y - s.x * d.y;
    var E = s.x * (l.y - h.y) + s.y * (-l.x + h.x);
    var v = c.x * o.y - o.x * c.y;
    var S = d.x * o.y - o.x * d.y;
    var C = o.x * (l.y - h.y) + o.y * (-l.x + h.x);
    var x = (new f(-v * v, -2 * v * S, g * y - S * S - 2 * v * C, g * A - 2 * S * C, g * E - C * C)).getRoots();
    var I = 0;
    for (; I < x.length; I++) {
        var T = x[I];
        if (0 <= T && T <= 1) {
            var b = (new f(-o.x, -s.x, -l.x + h.x + T * d.x + T * T * c.x)).getRoots();
            var L = (new f(-o.y, -s.y, -l.y + h.y + T * d.y + T * T * c.y)).getRoots();
            if (b.length > 0 && L.length > 0) {
                var R = 0;
                e: for (; R < b.length; R++) {
                    var M = b[R];
                    if (0 <= M && M <= 1) {
                        var w = 0;
                        for (; w < L.length; w++) {
                            if (Math.abs(M - L[w]) < 1e-4) {
                                u.points.push(c.multiply(T * T).add(d.multiply(T).add(h)));
                                break e;
                            }
                        }
                    }
                }
            }
        }
    }
    return u;
};
p.intersectBezier2Bezier3 = function (e, t, n, r, a, i, o) {
    var s;
    var l;
    var c;
    var d;
    var h;
    var u;
    var y;
    var A;
    var E;
    var v;
    var S;
    var C = new p("No Intersection");
    s = t.multiply(-2);
    h = e.add(s.add(n));
    s = e.multiply(-2);
    l = t.multiply(2);
    u = s.add(l);
    y = new m(e.x, e.y);
    s = r.multiply(-1);
    l = a.multiply(3);
    c = i.multiply(-3);
    A = new g((d = s.add(l.add(c.add(o)))).x, d.y);
    s = r.multiply(3);
    l = a.multiply(-6);
    c = i.multiply(3);
    E = new g((d = s.add(l.add(c))).x, d.y);
    s = r.multiply(-3);
    l = a.multiply(3);
    v = new g((c = s.add(l)).x, c.y);
    S = new g(r.x, r.y);
    var x = y.x * y.x;
    var I = y.y * y.y;
    var T = u.x * u.x;
    var b = u.y * u.y;
    var L = h.x * h.x;
    var R = h.y * h.y;
    var M = S.x * S.x;
    var w = S.y * S.y;
    var O = v.x * v.x;
    var D = v.y * v.y;
    var N = E.x * E.x;
    var k = E.y * E.y;
    var B = A.x * A.x;
    var P = A.y * A.y;
    var F = (new f(-2 * h.x * h.y * A.x * A.y + L * P + R * B, -2 * h.x * h.y * E.x * A.y - 2 * h.x * h.y * E.y * A.x + 2 * R * E.x * A.x + 2 * L * E.y * A.y, -2 * h.x * v.x * h.y * A.y - 2 * h.x * h.y * v.y * A.x - 2 * h.x * h.y * E.x * E.y + 2 * v.x * R * A.x + R * N + L * (2 * v.y * A.y + k), 2 * y.x * h.x * h.y * A.y + 2 * y.y * h.x * h.y * A.x + u.x * u.y * h.x * A.y + u.x * u.y * h.y * A.x - 2 * S.x * h.x * h.y * A.y - 2 * h.x * S.y * h.y * A.x - 2 * h.x * v.x * h.y * E.y - 2 * h.x * h.y * v.y * E.x - 2 * y.x * R * A.x - 2 * y.y * L * A.y + 2 * S.x * R * A.x + 2 * v.x * R * E.x - b * h.x * A.x - T * h.y * A.y + L * (2 * S.y * A.y + 2 * v.y * E.y), 2 * y.x * h.x * h.y * E.y + 2 * y.y * h.x * h.y * E.x + u.x * u.y * h.x * E.y + u.x * u.y * h.y * E.x - 2 * S.x * h.x * h.y * E.y - 2 * h.x * S.y * h.y * E.x - 2 * h.x * v.x * h.y * v.y - 2 * y.x * R * E.x - 2 * y.y * L * E.y + 2 * S.x * R * E.x - b * h.x * E.x - T * h.y * E.y + O * R + L * (2 * S.y * E.y + D), 2 * y.x * h.x * h.y * v.y + 2 * y.y * h.x * v.x * h.y + u.x * u.y * h.x * v.y + u.x * u.y * v.x * h.y - 2 * S.x * h.x * h.y * v.y - 2 * h.x * S.y * v.x * h.y - 2 * y.x * v.x * R - 2 * y.y * L * v.y + 2 * S.x * v.x * R - b * h.x * v.x - T * h.y * v.y + 2 * L * S.y * v.y, -2 * y.x * y.y * h.x * h.y - y.x * u.x * u.y * h.y - y.y * u.x * u.y * h.x + 2 * y.x * h.x * S.y * h.y + 2 * y.y * S.x * h.x * h.y + u.x * S.x * u.y * h.y + u.x * u.y * h.x * S.y - 2 * S.x * h.x * S.y * h.y - 2 * y.x * S.x * R + y.x * b * h.x + y.y * T * h.y - 2 * y.y * L * S.y - S.x * b * h.x - T * S.y * h.y + x * R + I * L + M * R + L * w)).getRootsInInterval(0, 1);
    var H = 0;
    for (; H < F.length; H++) {
        var _ = F[H];
        var U = (new f(h.x, u.x, y.x - S.x - _ * v.x - _ * _ * E.x - _ * _ * _ * A.x)).getRoots();
        var W = (new f(h.y, u.y, y.y - S.y - _ * v.y - _ * _ * E.y - _ * _ * _ * A.y)).getRoots();
        if (U.length > 0 && W.length > 0) {
            var G = 0;
            e: for (; G < U.length; G++) {
                var z = U[G];
                if (0 <= z && z <= 1) {
                    var Y = 0;
                    for (; Y < W.length; Y++) {
                        if (Math.abs(z - W[Y]) < 1e-4) {
                            C.points.push(A.multiply(_ * _ * _).add(E.multiply(_ * _).add(v.multiply(_).add(S))));
                            break e;
                        }
                    }
                }
            }
        }
    }
    return C.points.length > 0 && (C.status = "Intersection"),
    C;
};
p.intersectBezier2Circle = function (e, t, n, r, a) {
    return p.intersectBezier2Ellipse(e, t, n, r, a, a);
};
p.intersectBezier2Ellipse = function (e, t, n, r, a, i) {
    var o;
    var s;
    var l;
    var c;
    var d;
    var h = new p("No Intersection");
    o = t.multiply(-2);
    l = e.add(o.add(n));
    o = e.multiply(-2);
    s = t.multiply(2);
    c = o.add(s);
    d = new m(e.x, e.y);
    var u = a * a;
    var g = i * i;
    var y = (new f(g * l.x * l.x + u * l.y * l.y, 2 * (g * l.x * c.x + u * l.y * c.y), g * (2 * l.x * d.x + c.x * c.x) + u * (2 * l.y * d.y + c.y * c.y) - 2 * (g * r.x * l.x + u * r.y * l.y), 2 * (g * c.x * (d.x - r.x) + u * c.y * (d.y - r.y)), g * (d.x * d.x + r.x * r.x) + u * (d.y * d.y + r.y * r.y) - 2 * (g * r.x * d.x + u * r.y * d.y) - u * g)).getRoots();
    var A = 0;
    for (; A < y.length; A++) {
        var E = y[A];
        if (0 <= E && E <= 1) {
            h.points.push(l.multiply(E * E).add(c.multiply(E).add(d)));
        }
    }
    return h.points.length > 0 && (h.status = "Intersection"),
    h;
};
p.intersectBezier2Line = function (e, t, n, r, a) {
    var i;
    var o;
    var s;
    var l;
    var c;
    var d;
    var h;
    var u = r.min(a);
    var y = r.max(a);
    var A = new p("No Intersection");
    i = t.multiply(-2);
    s = e.add(i.add(n));
    i = e.multiply(-2);
    o = t.multiply(2);
    l = i.add(o);
    c = new m(e.x, e.y);
    h = new g(r.y - a.y, a.x - r.x);
    d = r.x * a.y - a.x * r.y;
    var E = (new f(h.dot(s), h.dot(l), h.dot(c) + d)).getRoots();
    var v = 0;
    for (; v < E.length; v++) {
        var S = E[v];
        if (0 <= S && S <= 1) {
            var C = e.lerp(t, S);
            var x = t.lerp(n, S);
            var I = C.lerp(x, S);
            if (r.x === a.x) {
                if (u.y <= I.y && I.y <= y.y) {
                    A.status = "Intersection";
                    A.appendPoint(I);
                }
            } else {
                if (r.y === a.y) {
                    if (u.x <= I.x && I.x <= y.x) {
                        A.status = "Intersection";
                        A.appendPoint(I);
                    }
                } else {
                    if (I.gte(u) && I.lte(y)) {
                        A.status = "Intersection";
                        A.appendPoint(I);
                    }
                }
            }
        }
    }
    return A;
};
p.intersectBezier2Polygon = function (e, t, n, r) {
    var a = new p("No Intersection");
    var i = r.length;
    var o = 0;
    for (; o < i; o++) {
        var s = r[o];
        var l = r[(o + 1) % i];
        var c = p.intersectBezier2Line(e, t, n, s, l);
        a.appendPoints(c.points);
    }
    return a.points.length > 0 && (a.status = "Intersection"),
    a;
};
p.intersectBezier2Rectangle = function (e, t, n, r, a) {
    var i = r.min(a);
    var o = r.max(a);
    var s = new m(o.x, i.y);
    var l = new m(i.x, o.y);
    var c = p.intersectBezier2Line(e, t, n, i, s);
    var d = p.intersectBezier2Line(e, t, n, s, o);
    var h = p.intersectBezier2Line(e, t, n, o, l);
    var u = p.intersectBezier2Line(e, t, n, l, i);
    var f = new p("No Intersection");
    return f.appendPoints(c.points),
    f.appendPoints(d.points),
    f.appendPoints(h.points),
    f.appendPoints(u.points),
    f.points.length > 0 && (f.status = "Intersection"),
    f;
};
p.intersectBezier3Bezier3 = function (e, t, n, r, a, i, o, s) {
    var l;
    var c;
    var d;
    var h;
    var u;
    var m;
    var y;
    var A;
    var E;
    var v;
    var S;
    var C;
    var x = new p("No Intersection");
    l = e.multiply(-1);
    c = t.multiply(3);
    d = n.multiply(-3);
    u = new g((h = l.add(c.add(d.add(r)))).x, h.y);
    l = e.multiply(3);
    c = t.multiply(-6);
    d = n.multiply(3);
    m = new g((h = l.add(c.add(d))).x, h.y);
    l = e.multiply(-3);
    c = t.multiply(3);
    y = new g((d = l.add(c)).x, d.y);
    A = new g(e.x, e.y);
    l = a.multiply(-1);
    c = i.multiply(3);
    d = o.multiply(-3);
    E = new g((h = l.add(c.add(d.add(s)))).x, h.y);
    l = a.multiply(3);
    c = i.multiply(-6);
    d = o.multiply(3);
    v = new g((h = l.add(c.add(d))).x, h.y);
    l = a.multiply(-3);
    c = i.multiply(3);
    S = new g((d = l.add(c)).x, d.y);
    C = new g(a.x, a.y);
    var I = A.x * A.x;
    var T = A.x * A.x * A.x;
    var b = A.y * A.y;
    var L = A.y * A.y * A.y;
    var R = y.x * y.x;
    var M = y.x * y.x * y.x;
    var w = y.y * y.y;
    var O = y.y * y.y * y.y;
    var D = m.x * m.x;
    var N = m.x * m.x * m.x;
    var k = m.y * m.y;
    var B = m.y * m.y * m.y;
    var P = u.x * u.x;
    var F = u.x * u.x * u.x;
    var H = u.y * u.y;
    var _ = u.y * u.y * u.y;
    var U = C.x * C.x;
    var W = C.x * C.x * C.x;
    var G = C.y * C.y;
    var z = C.y * C.y * C.y;
    var Y = S.x * S.x;
    var K = S.x * S.x * S.x;
    var V = S.y * S.y;
    var j = v.x * v.x;
    var q = v.x * v.x * v.x;
    var Q = v.y * v.y;
    var Z = E.x * E.x;
    var X = E.x * E.x * E.x;
    var J = E.y * E.y;
    var $ = (new f(-F * (E.y * E.y * E.y) + _ * X - 3 * u.x * H * Z * E.y + 3 * P * u.y * E.x * J, -6 * u.x * v.x * H * E.x * E.y + 6 * P * u.y * v.y * E.x * E.y + 3 * v.x * _ * Z - 3 * F * v.y * J - 3 * u.x * H * v.y * Z + 3 * P * v.x * u.y * J, -6 * S.x * u.x * H * E.x * E.y - 6 * u.x * v.x * H * v.y * E.x + 6 * P * v.x * u.y * v.y * E.y + 3 * S.x * _ * Z + 3 * j * _ * E.x + 3 * S.x * P * u.y * J - 3 * u.x * S.y * H * Z - 3 * u.x * j * H * E.y + P * u.y * E.x * (6 * S.y * E.y + 3 * Q) + F * (-S.y * J - 2 * Q * E.y - E.y * (2 * S.y * E.y + Q)), y.x * m.y * u.x * u.y * E.x * E.y - y.y * m.x * u.x * u.y * E.x * E.y + 6 * S.x * v.x * _ * E.x + 3 * y.x * m.x * u.x * u.y * J + 6 * A.x * u.x * H * E.x * E.y - 3 * y.x * m.x * H * E.x * E.y - 3 * y.y * m.y * u.x * u.y * Z - 6 * A.y * P * u.y * E.x * E.y - 6 * C.x * u.x * H * E.x * E.y + 3 * y.y * m.y * P * E.x * E.y - 2 * m.x * k * u.x * E.x * E.y - 6 * S.x * u.x * v.x * H * E.y - 6 * S.x * u.x * H * v.y * E.x - 6 * u.x * S.y * v.x * H * E.x + 6 * S.x * P * u.y * v.y * E.y + 2 * D * m.y * u.y * E.x * E.y + q * _ - 3 * A.x * _ * Z + 3 * A.y * F * J + 3 * C.x * _ * Z + B * u.x * Z - N * u.y * J - 3 * A.x * P * u.y * J + 3 * A.y * u.x * H * Z - 2 * y.x * m.y * P * J + y.x * m.y * H * Z - y.y * m.x * P * J + 2 * y.y * m.x * H * Z + 3 * C.x * P * u.y * J - m.x * k * u.y * Z - 3 * C.y * u.x * H * Z + D * m.y * u.x * J - 3 * u.x * j * H * v.y + P * u.y * E.x * (6 * C.y * E.y + 6 * S.y * v.y) + P * v.x * u.y * (6 * S.y * E.y + 3 * Q) + F * (-2 * S.y * v.y * E.y - C.y * J - v.y * (2 * S.y * E.y + Q) - E.y * (2 * C.y * E.y + 2 * S.y * v.y)), 6 * y.x * m.x * u.x * u.y * v.y * E.y + y.x * m.y * u.x * v.x * u.y * E.y + y.x * m.y * u.x * u.y * v.y * E.x - y.y * m.x * u.x * v.x * u.y * E.y - y.y * m.x * u.x * u.y * v.y * E.x - 6 * y.y * m.y * u.x * v.x * u.y * E.x - 6 * A.x * v.x * _ * E.x + 6 * C.x * v.x * _ * E.x + 6 * A.y * F * v.y * E.y + 2 * B * u.x * v.x * E.x - 2 * N * u.y * v.y * E.y + 6 * A.x * u.x * v.x * H * E.y + 6 * A.x * u.x * H * v.y * E.x + 6 * A.y * u.x * v.x * H * E.x - 3 * y.x * m.x * v.x * H * E.y - 3 * y.x * m.x * H * v.y * E.x + 2 * y.x * m.y * v.x * H * E.x + 4 * y.y * m.x * v.x * H * E.x - 6 * A.x * P * u.y * v.y * E.y - 6 * A.y * P * v.x * u.y * E.y - 6 * A.y * P * u.y * v.y * E.x - 4 * y.x * m.y * P * v.y * E.y - 6 * C.x * u.x * v.x * H * E.y - 6 * C.x * u.x * H * v.y * E.x - 2 * y.y * m.x * P * v.y * E.y + 3 * y.y * m.y * P * v.x * E.y + 3 * y.y * m.y * P * v.y * E.x - 2 * m.x * k * u.x * v.x * E.y - 2 * m.x * k * u.x * v.y * E.x - 2 * m.x * k * v.x * u.y * E.x - 6 * C.y * u.x * v.x * H * E.x - 6 * S.x * u.x * S.y * H * E.x - 6 * S.x * u.x * v.x * H * v.y + 6 * C.x * P * u.y * v.y * E.y + 2 * D * m.y * u.x * v.y * E.y + 2 * D * m.y * v.x * u.y * E.y + 2 * D * m.y * u.y * v.y * E.x + 3 * S.x * j * _ + 3 * Y * _ * E.x - 3 * u.x * S.y * j * H - 3 * Y * u.x * H * E.y + P * v.x * u.y * (6 * C.y * E.y + 6 * S.y * v.y) + P * u.y * E.x * (6 * C.y * v.y + 3 * V) + S.x * P * u.y * (6 * S.y * E.y + 3 * Q) + F * (-2 * C.y * v.y * E.y - E.y * (2 * C.y * v.y + V) - S.y * (2 * S.y * E.y + Q) - v.y * (2 * C.y * E.y + 2 * S.y * v.y)), y.x * S.x * m.y * u.x * u.y * E.y + y.x * m.y * u.x * S.y * u.y * E.x + y.x * m.y * u.x * v.x * u.y * v.y - y.y * m.x * S.x * u.x * u.y * E.y - y.y * m.x * u.x * S.y * u.y * E.x - y.y * m.x * u.x * v.x * u.y * v.y - 6 * y.y * S.x * m.y * u.x * u.y * E.x - 6 * A.x * S.x * _ * E.x + 6 * C.x * S.x * _ * E.x + 2 * S.x * B * u.x * E.x + 6 * A.x * S.x * u.x * H * E.y + 6 * A.x * u.x * S.y * H * E.x + 6 * A.x * u.x * v.x * H * v.y + 6 * A.y * S.x * u.x * H * E.x - 3 * y.x * m.x * S.x * H * E.y - 3 * y.x * m.x * S.y * H * E.x - 3 * y.x * m.x * v.x * H * v.y + 2 * y.x * S.x * m.y * H * E.x + 4 * y.y * m.x * S.x * H * E.x - 6 * A.y * S.x * P * u.y * E.y - 6 * A.y * P * S.y * u.y * E.x - 6 * A.y * P * v.x * u.y * v.y - 6 * C.x * S.x * u.x * H * E.y - 6 * C.x * u.x * S.y * H * E.x - 6 * C.x * u.x * v.x * H * v.y + 3 * y.y * S.x * m.y * P * E.y - 3 * y.y * m.y * u.x * j * u.y + 3 * y.y * m.y * P * S.y * E.x + 3 * y.y * m.y * P * v.x * v.y - 2 * m.x * S.x * k * u.x * E.y - 2 * m.x * S.x * k * u.y * E.x - 2 * m.x * k * u.x * S.y * E.x - 2 * m.x * k * u.x * v.x * v.y - 6 * C.y * S.x * u.x * H * E.x - 6 * S.x * u.x * S.y * v.x * H + 6 * C.y * P * S.y * u.y * E.x + 2 * D * S.x * m.y * u.y * E.y + 2 * D * m.y * S.y * u.y * E.x + 2 * D * m.y * v.x * u.y * v.y - 3 * A.x * j * _ + 3 * C.x * j * _ + 3 * Y * v.x * _ + B * u.x * j + 3 * A.y * u.x * j * H + y.x * m.y * j * H + 2 * y.y * m.x * j * H - m.x * k * j * u.y - 3 * C.y * u.x * j * H - 3 * Y * u.x * H * v.y + D * m.y * u.x * (2 * S.y * E.y + Q) + y.x * m.x * u.x * u.y * (6 * S.y * E.y + 3 * Q) + S.x * P * u.y * (6 * C.y * E.y + 6 * S.y * v.y) + N * u.y * (-2 * S.y * E.y - Q) + A.y * F * (6 * S.y * E.y + 3 * Q) + y.y * m.x * P * (-2 * S.y * E.y - Q) + y.x * m.y * P * (-4 * S.y * E.y - 2 * Q) + A.x * P * u.y * (-6 * S.y * E.y - 3 * Q) + P * v.x * u.y * (6 * C.y * v.y + 3 * V) + C.x * P * u.y * (6 * S.y * E.y + 3 * Q) + F * (-2 * C.y * S.y * E.y - v.y * (2 * C.y * v.y + V) - C.y * (2 * S.y * E.y + Q) - S.y * (2 * C.y * E.y + 2 * S.y * v.y)), -A.x * y.x * m.y * u.x * u.y * E.y + A.x * y.y * m.x * u.x * u.y * E.y + 6 * A.x * y.y * m.y * u.x * u.y * E.x - 6 * A.y * y.x * m.x * u.x * u.y * E.y - A.y * y.x * m.y * u.x * u.y * E.x + A.y * y.y * m.x * u.x * u.y * E.x + y.x * y.y * m.x * m.y * u.x * E.y - y.x * y.y * m.x * m.y * u.y * E.x + y.x * C.x * m.y * u.x * u.y * E.y + y.x * C.y * m.y * u.x * u.y * E.x + y.x * S.x * m.y * u.x * u.y * v.y + y.x * m.y * u.x * S.y * v.x * u.y - C.x * y.y * m.x * u.x * u.y * E.y - 6 * C.x * y.y * m.y * u.x * u.y * E.x - y.y * m.x * C.y * u.x * u.y * E.x - y.y * m.x * S.x * u.x * u.y * v.y - y.y * m.x * u.x * S.y * v.x * u.y - 6 * y.y * S.x * m.y * u.x * v.x * u.y - 6 * A.x * C.x * _ * E.x - 6 * A.x * S.x * v.x * _ - 2 * A.x * B * u.x * E.x + 6 * C.x * S.x * v.x * _ + 2 * C.x * B * u.x * E.x + 2 * S.x * B * u.x * v.x + 2 * A.y * N * u.y * E.y - 6 * A.x * A.y * u.x * H * E.x + 3 * A.x * y.x * m.x * H * E.y - 2 * A.x * y.x * m.y * H * E.x - 4 * A.x * y.y * m.x * H * E.x + 3 * A.y * y.x * m.x * H * E.x + 6 * A.x * A.y * P * u.y * E.y + 6 * A.x * C.x * u.x * H * E.y - 3 * A.x * y.y * m.y * P * E.y + 2 * A.x * m.x * k * u.x * E.y + 2 * A.x * m.x * k * u.y * E.x + 6 * A.x * C.y * u.x * H * E.x + 6 * A.x * S.x * u.x * H * v.y + 6 * A.x * u.x * S.y * v.x * H + 4 * A.y * y.x * m.y * P * E.y + 6 * A.y * C.x * u.x * H * E.x + 2 * A.y * y.y * m.x * P * E.y - 3 * A.y * y.y * m.y * P * E.x + 2 * A.y * m.x * k * u.x * E.x + 6 * A.y * S.x * u.x * v.x * H - 3 * y.x * C.x * m.x * H * E.y + 2 * y.x * C.x * m.y * H * E.x + y.x * y.y * k * u.x * E.x - 3 * y.x * m.x * C.y * H * E.x - 3 * y.x * m.x * S.x * H * v.y - 3 * y.x * m.x * S.y * v.x * H + 2 * y.x * S.x * m.y * v.x * H + 4 * C.x * y.y * m.x * H * E.x + 4 * y.y * m.x * S.x * v.x * H - 2 * A.x * D * m.y * u.y * E.y - 6 * A.y * C.x * P * u.y * E.y - 6 * A.y * C.y * P * u.y * E.x - 6 * A.y * S.x * P * u.y * v.y - 2 * A.y * D * m.y * u.x * E.y - 2 * A.y * D * m.y * u.y * E.x - 6 * A.y * P * S.y * v.x * u.y - y.x * y.y * D * u.y * E.y - 2 * y.x * w * u.x * u.y * E.x + 3 * C.x * y.y * m.y * P * E.y - 2 * C.x * m.x * k * u.x * E.y - 2 * C.x * m.x * k * u.y * E.x - 6 * C.x * C.y * u.x * H * E.x - 6 * C.x * S.x * u.x * H * v.y - 6 * C.x * u.x * S.y * v.x * H + 3 * y.y * C.y * m.y * P * E.x + 3 * y.y * S.x * m.y * P * v.y + 3 * y.y * m.y * P * S.y * v.x - 2 * m.x * C.y * k * u.x * E.x - 2 * m.x * S.x * k * u.x * v.y - 2 * m.x * S.x * k * v.x * u.y - 2 * m.x * k * u.x * S.y * v.x - 6 * C.y * S.x * u.x * v.x * H - w * m.x * m.y * u.x * E.x + 2 * C.x * D * m.y * u.y * E.y + 6 * C.y * P * S.y * v.x * u.y + 2 * R * y.y * u.x * u.y * E.y + R * m.x * m.y * u.y * E.y + 2 * D * C.y * m.y * u.y * E.x + 2 * D * S.x * m.y * u.y * v.y + 2 * D * m.y * S.y * v.x * u.y + K * _ + 3 * I * _ * E.x - 3 * b * F * E.y + 3 * U * _ * E.x + O * P * E.x - M * H * E.y - y.x * w * P * E.y + R * y.y * H * E.x - 3 * I * u.x * H * E.y + 3 * b * P * u.y * E.x - R * k * u.x * E.y + w * D * u.y * E.x - 3 * Y * u.x * S.y * H - 3 * U * u.x * H * E.y + 3 * G * P * u.y * E.x + y.x * m.x * u.x * u.y * (6 * C.y * E.y + 6 * S.y * v.y) + N * u.y * (-2 * C.y * E.y - 2 * S.y * v.y) + A.y * F * (6 * C.y * E.y + 6 * S.y * v.y) + y.y * m.x * P * (-2 * C.y * E.y - 2 * S.y * v.y) + D * m.y * u.x * (2 * C.y * E.y + 2 * S.y * v.y) + y.x * m.y * P * (-4 * C.y * E.y - 4 * S.y * v.y) + A.x * P * u.y * (-6 * C.y * E.y - 6 * S.y * v.y) + C.x * P * u.y * (6 * C.y * E.y + 6 * S.y * v.y) + S.x * P * u.y * (6 * C.y * v.y + 3 * V) + F * (-2 * C.y * S.y * v.y - G * E.y - S.y * (2 * C.y * v.y + V) - C.y * (2 * C.y * E.y + 2 * S.y * v.y)), -A.x * y.x * m.y * u.x * u.y * v.y + A.x * y.y * m.x * u.x * u.y * v.y + 6 * A.x * y.y * m.y * u.x * v.x * u.y - 6 * A.y * y.x * m.x * u.x * u.y * v.y - A.y * y.x * m.y * u.x * v.x * u.y + A.y * y.y * m.x * u.x * v.x * u.y + y.x * y.y * m.x * m.y * u.x * v.y - y.x * y.y * m.x * m.y * v.x * u.y + y.x * C.x * m.y * u.x * u.y * v.y + y.x * C.y * m.y * u.x * v.x * u.y + y.x * S.x * m.y * u.x * S.y * u.y - C.x * y.y * m.x * u.x * u.y * v.y - 6 * C.x * y.y * m.y * u.x * v.x * u.y - y.y * m.x * C.y * u.x * v.x * u.y - y.y * m.x * S.x * u.x * S.y * u.y - 6 * A.x * C.x * v.x * _ - 2 * A.x * B * u.x * v.x + 2 * C.x * B * u.x * v.x + 2 * A.y * N * u.y * v.y - 6 * A.x * A.y * u.x * v.x * H + 3 * A.x * y.x * m.x * H * v.y - 2 * A.x * y.x * m.y * v.x * H - 4 * A.x * y.y * m.x * v.x * H + 3 * A.y * y.x * m.x * v.x * H + 6 * A.x * A.y * P * u.y * v.y + 6 * A.x * C.x * u.x * H * v.y - 3 * A.x * y.y * m.y * P * v.y + 2 * A.x * m.x * k * u.x * v.y + 2 * A.x * m.x * k * v.x * u.y + 6 * A.x * C.y * u.x * v.x * H + 6 * A.x * S.x * u.x * S.y * H + 4 * A.y * y.x * m.y * P * v.y + 6 * A.y * C.x * u.x * v.x * H + 2 * A.y * y.y * m.x * P * v.y - 3 * A.y * y.y * m.y * P * v.x + 2 * A.y * m.x * k * u.x * v.x - 3 * y.x * C.x * m.x * H * v.y + 2 * y.x * C.x * m.y * v.x * H + y.x * y.y * k * u.x * v.x - 3 * y.x * m.x * C.y * v.x * H - 3 * y.x * m.x * S.x * S.y * H + 4 * C.x * y.y * m.x * v.x * H - 2 * A.x * D * m.y * u.y * v.y - 6 * A.y * C.x * P * u.y * v.y - 6 * A.y * C.y * P * v.x * u.y - 6 * A.y * S.x * P * S.y * u.y - 2 * A.y * D * m.y * u.x * v.y - 2 * A.y * D * m.y * v.x * u.y - y.x * y.y * D * u.y * v.y - 2 * y.x * w * u.x * v.x * u.y + 3 * C.x * y.y * m.y * P * v.y - 2 * C.x * m.x * k * u.x * v.y - 2 * C.x * m.x * k * v.x * u.y - 6 * C.x * C.y * u.x * v.x * H - 6 * C.x * S.x * u.x * S.y * H + 3 * y.y * C.y * m.y * P * v.x + 3 * y.y * S.x * m.y * P * S.y - 2 * m.x * C.y * k * u.x * v.x - 2 * m.x * S.x * k * u.x * S.y - w * m.x * m.y * u.x * v.x + 2 * C.x * D * m.y * u.y * v.y - 3 * y.y * Y * m.y * u.x * u.y + 6 * C.y * S.x * P * S.y * u.y + 2 * R * y.y * u.x * u.y * v.y + R * m.x * m.y * u.y * v.y + 2 * D * C.y * m.y * v.x * u.y + 2 * D * S.x * m.y * S.y * u.y - 3 * A.x * Y * _ + 3 * C.x * Y * _ + 3 * I * v.x * _ - 3 * b * F * v.y + 3 * U * v.x * _ + Y * B * u.x + O * P * v.x - M * H * v.y + 3 * A.y * Y * u.x * H - y.x * w * P * v.y + y.x * Y * m.y * H + 2 * y.y * m.x * Y * H + R * y.y * v.x * H - m.x * Y * k * u.y - 3 * C.y * Y * u.x * H - 3 * I * u.x * H * v.y + 3 * b * P * v.x * u.y - R * k * u.x * v.y + w * D * v.x * u.y - 3 * U * u.x * H * v.y + 3 * G * P * v.x * u.y + D * m.y * u.x * (2 * C.y * v.y + V) + y.x * m.x * u.x * u.y * (6 * C.y * v.y + 3 * V) + N * u.y * (-2 * C.y * v.y - V) + A.y * F * (6 * C.y * v.y + 3 * V) + y.y * m.x * P * (-2 * C.y * v.y - V) + y.x * m.y * P * (-4 * C.y * v.y - 2 * V) + A.x * P * u.y * (-6 * C.y * v.y - 3 * V) + C.x * P * u.y * (6 * C.y * v.y + 3 * V) + F * (-2 * C.y * V - G * v.y - C.y * (2 * C.y * v.y + V)), -A.x * y.x * m.y * u.x * S.y * u.y + A.x * y.y * m.x * u.x * S.y * u.y + 6 * A.x * y.y * S.x * m.y * u.x * u.y - 6 * A.y * y.x * m.x * u.x * S.y * u.y - A.y * y.x * S.x * m.y * u.x * u.y + A.y * y.y * m.x * S.x * u.x * u.y - y.x * y.y * m.x * S.x * m.y * u.y + y.x * y.y * m.x * m.y * u.x * S.y + y.x * C.x * m.y * u.x * S.y * u.y + 6 * y.x * m.x * C.y * u.x * S.y * u.y + y.x * C.y * S.x * m.y * u.x * u.y - C.x * y.y * m.x * u.x * S.y * u.y - 6 * C.x * y.y * S.x * m.y * u.x * u.y - y.y * m.x * C.y * S.x * u.x * u.y - 6 * A.x * C.x * S.x * _ - 2 * A.x * S.x * B * u.x + 6 * A.y * C.y * F * S.y + 2 * C.x * S.x * B * u.x + 2 * A.y * N * S.y * u.y - 2 * N * C.y * S.y * u.y - 6 * A.x * A.y * S.x * u.x * H + 3 * A.x * y.x * m.x * S.y * H - 2 * A.x * y.x * S.x * m.y * H - 4 * A.x * y.y * m.x * S.x * H + 3 * A.y * y.x * m.x * S.x * H + 6 * A.x * A.y * P * S.y * u.y + 6 * A.x * C.x * u.x * S.y * H - 3 * A.x * y.y * m.y * P * S.y + 2 * A.x * m.x * S.x * k * u.y + 2 * A.x * m.x * k * u.x * S.y + 6 * A.x * C.y * S.x * u.x * H + 4 * A.y * y.x * m.y * P * S.y + 6 * A.y * C.x * S.x * u.x * H + 2 * A.y * y.y * m.x * P * S.y - 3 * A.y * y.y * S.x * m.y * P + 2 * A.y * m.x * S.x * k * u.x - 3 * y.x * C.x * m.x * S.y * H + 2 * y.x * C.x * S.x * m.y * H + y.x * y.y * S.x * k * u.x - 3 * y.x * m.x * C.y * S.x * H + 4 * C.x * y.y * m.x * S.x * H - 6 * A.x * C.y * P * S.y * u.y - 2 * A.x * D * m.y * S.y * u.y - 6 * A.y * C.x * P * S.y * u.y - 6 * A.y * C.y * S.x * P * u.y - 2 * A.y * D * S.x * m.y * u.y - 2 * A.y * D * m.y * u.x * S.y - y.x * y.y * D * S.y * u.y - 4 * y.x * C.y * m.y * P * S.y - 2 * y.x * w * S.x * u.x * u.y + 3 * C.x * y.y * m.y * P * S.y - 2 * C.x * m.x * S.x * k * u.y - 2 * C.x * m.x * k * u.x * S.y - 6 * C.x * C.y * S.x * u.x * H - 2 * y.y * m.x * C.y * P * S.y + 3 * y.y * C.y * S.x * m.y * P - 2 * m.x * C.y * S.x * k * u.x - w * m.x * S.x * m.y * u.x + 6 * C.x * C.y * P * S.y * u.y + 2 * C.x * D * m.y * S.y * u.y + 2 * R * y.y * u.x * S.y * u.y + R * m.x * m.y * S.y * u.y + 2 * D * C.y * S.x * m.y * u.y + 2 * D * C.y * m.y * u.x * S.y + 3 * I * S.x * _ - 3 * b * F * S.y + 3 * U * S.x * _ + O * S.x * P - M * S.y * H - 3 * G * F * S.y - y.x * w * P * S.y + R * y.y * S.x * H - 3 * I * u.x * S.y * H + 3 * b * S.x * P * u.y - R * k * u.x * S.y + w * D * S.x * u.y - 3 * U * u.x * S.y * H + 3 * G * S.x * P * u.y, A.x * A.y * y.x * m.y * u.x * u.y - A.x * A.y * y.y * m.x * u.x * u.y + A.x * y.x * y.y * m.x * m.y * u.y - A.y * y.x * y.y * m.x * m.y * u.x - A.x * y.x * C.y * m.y * u.x * u.y + 6 * A.x * C.x * y.y * m.y * u.x * u.y + A.x * y.y * m.x * C.y * u.x * u.y - A.y * y.x * C.x * m.y * u.x * u.y - 6 * A.y * y.x * m.x * C.y * u.x * u.y + A.y * C.x * y.y * m.x * u.x * u.y - y.x * C.x * y.y * m.x * m.y * u.y + y.x * y.y * m.x * C.y * m.y * u.x + y.x * C.x * C.y * m.y * u.x * u.y - C.x * y.y * m.x * C.y * u.x * u.y - 2 * A.x * C.x * B * u.x + 2 * A.y * N * C.y * u.y - 3 * A.x * A.y * y.x * m.x * H - 6 * A.x * A.y * C.x * u.x * H + 3 * A.x * A.y * y.y * m.y * P - 2 * A.x * A.y * m.x * k * u.x - 2 * A.x * y.x * C.x * m.y * H - A.x * y.x * y.y * k * u.x + 3 * A.x * y.x * m.x * C.y * H - 4 * A.x * C.x * y.y * m.x * H + 3 * A.y * y.x * C.x * m.x * H + 6 * A.x * A.y * C.y * P * u.y + 2 * A.x * A.y * D * m.y * u.y + 2 * A.x * y.x * w * u.x * u.y + 2 * A.x * C.x * m.x * k * u.y + 6 * A.x * C.x * C.y * u.x * H - 3 * A.x * y.y * C.y * m.y * P + 2 * A.x * m.x * C.y * k * u.x + A.x * w * m.x * m.y * u.x + A.y * y.x * y.y * D * u.y + 4 * A.y * y.x * C.y * m.y * P - 3 * A.y * C.x * y.y * m.y * P + 2 * A.y * C.x * m.x * k * u.x + 2 * A.y * y.y * m.x * C.y * P + y.x * C.x * y.y * k * u.x - 3 * y.x * C.x * m.x * C.y * H - 2 * A.x * D * C.y * m.y * u.y - 6 * A.y * C.x * C.y * P * u.y - 2 * A.y * C.x * D * m.y * u.y - 2 * A.y * R * y.y * u.x * u.y - A.y * R * m.x * m.y * u.y - 2 * A.y * D * C.y * m.y * u.x - 2 * y.x * C.x * w * u.x * u.y - y.x * y.y * D * C.y * u.y + 3 * C.x * y.y * C.y * m.y * P - 2 * C.x * m.x * C.y * k * u.x - C.x * w * m.x * m.y * u.x + 3 * b * y.x * m.x * u.x * u.y + 3 * y.x * m.x * G * u.x * u.y + 2 * C.x * D * C.y * m.y * u.y - 3 * I * y.y * m.y * u.x * u.y + 2 * R * y.y * C.y * u.x * u.y + R * m.x * C.y * m.y * u.y - 3 * U * y.y * m.y * u.x * u.y - T * _ + L * F + W * _ - z * F - 3 * A.x * U * _ - A.x * O * P + 3 * I * C.x * _ + A.y * M * H + 3 * A.y * G * F + C.x * O * P + I * B * u.x - 3 * b * C.y * F - b * N * u.y + U * B * u.x - M * C.y * H - N * G * u.y - A.x * R * y.y * H + A.y * y.x * w * P - 3 * A.x * b * P * u.y - A.x * w * D * u.y + A.y * R * k * u.x - y.x * w * C.y * P + 3 * I * A.y * u.x * H + I * y.x * m.y * H + 2 * I * y.y * m.x * H - 2 * b * y.x * m.y * P - b * y.y * m.x * P + R * C.x * y.y * H - 3 * A.x * G * P * u.y + 3 * A.y * U * u.x * H + y.x * U * m.y * H - 2 * y.x * G * m.y * P + C.x * w * D * u.y - y.y * m.x * G * P - I * m.x * k * u.y - 3 * I * C.y * u.x * H + 3 * b * C.x * P * u.y + b * D * m.y * u.x - R * C.y * k * u.x + 2 * U * y.y * m.x * H + 3 * C.x * G * P * u.y - U * m.x * k * u.y - 3 * U * C.y * u.x * H + D * G * m.y * u.x)).getRootsInInterval(0, 1);
    var ee = 0;
    for (; ee < $.length; ee++) {
        var te = $[ee];
        var ne = (new f(u.x, m.x, y.x, A.x - C.x - te * S.x - te * te * v.x - te * te * te * E.x)).getRoots();
        var re = (new f(u.y, m.y, y.y, A.y - C.y - te * S.y - te * te * v.y - te * te * te * E.y)).getRoots();
        if (ne.length > 0 && re.length > 0) {
            var ae = 0;
            e: for (; ae < ne.length; ae++) {
                var ie = ne[ae];
                if (0 <= ie && ie <= 1) {
                    var oe = 0;
                    for (; oe < re.length; oe++) {
                        if (Math.abs(ie - re[oe]) < 1E-4) {
                            x.points.push(E.multiply(te * te * te).add(v.multiply(te * te).add(S.multiply(te).add(C))));
                            break e;
                        }
                    }
                }
            }
        }
    }
    return x.points.length > 0 && (x.status = "Intersection"),
    x;
};
p.intersectBezier3Circle = function (e, t, n, r, a, i) {
    return p.intersectBezier3Ellipse(e, t, n, r, a, i, i);
};
p.intersectBezier3Ellipse = function (e, t, n, r, a, i, o) {
    var s;
    var l;
    var c;
    var d;
    var h;
    var u;
    var m;
    var y;
    var A = new p("No Intersection");
    s = e.multiply(-1);
    l = t.multiply(3);
    c = n.multiply(-3);
    h = new g((d = s.add(l.add(c.add(r)))).x, d.y);
    s = e.multiply(3);
    l = t.multiply(-6);
    c = n.multiply(3);
    u = new g((d = s.add(l.add(c))).x, d.y);
    s = e.multiply(-3);
    l = t.multiply(3);
    m = new g((c = s.add(l)).x, c.y);
    y = new g(e.x, e.y);
    var E = i * i;
    var v = o * o;
    var S = (new f(h.x * h.x * v + h.y * h.y * E, 2 * (h.x * u.x * v + h.y * u.y * E), 2 * (h.x * m.x * v + h.y * m.y * E) + u.x * u.x * v + u.y * u.y * E, 2 * h.x * v * (y.x - a.x) + 2 * h.y * E * (y.y - a.y) + 2 * (u.x * m.x * v + u.y * m.y * E), 2 * u.x * v * (y.x - a.x) + 2 * u.y * E * (y.y - a.y) + m.x * m.x * v + m.y * m.y * E, 2 * m.x * v * (y.x - a.x) + 2 * m.y * E * (y.y - a.y), y.x * y.x * v - 2 * y.y * a.y * E - 2 * y.x * a.x * v + y.y * y.y * E + a.x * a.x * v + a.y * a.y * E - E * v)).getRootsInInterval(0, 1);
    var C = 0;
    for (; C < S.length; C++) {
        var x = S[C];
        A.points.push(h.multiply(x * x * x).add(u.multiply(x * x).add(m.multiply(x).add(y))));
    }
    return A.points.length > 0 && (A.status = "Intersection"),
    A;
};
p.intersectBezier3Line = function (e, t, n, r, a, i) {
    var o;
    var s;
    var l;
    var c;
    var d;
    var h;
    var u;
    var m;
    var y;
    var A;
    var E = a.min(i);
    var v = a.max(i);
    var S = new p("No Intersection");
    o = e.multiply(-1);
    s = t.multiply(3);
    l = n.multiply(-3);
    d = new g((c = o.add(s.add(l.add(r)))).x, c.y);
    o = e.multiply(3);
    s = t.multiply(-6);
    l = n.multiply(3);
    h = new g((c = o.add(s.add(l))).x, c.y);
    o = e.multiply(-3);
    s = t.multiply(3);
    u = new g((l = o.add(s)).x, l.y);
    m = new g(e.x, e.y);
    A = new g(a.y - i.y, i.x - a.x);
    y = a.x * i.y - i.x * a.y;
    var C = (new f(A.dot(d), A.dot(h), A.dot(u), A.dot(m) + y)).getRoots();
    var x = 0;
    for (; x < C.length; x++) {
        var I = C[x];
        if (0 <= I && I <= 1) {
            var T = e.lerp(t, I);
            var b = t.lerp(n, I);
            var L = n.lerp(r, I);
            var R = T.lerp(b, I);
            var M = b.lerp(L, I);
            var w = R.lerp(M, I);
            if (a.x === i.x) {
                if (E.y <= w.y && w.y <= v.y) {
                    S.status = "Intersection";
                    S.appendPoint(w);
                }
            } else {
                if (a.y === i.y) {
                    if (E.x <= w.x && w.x <= v.x) {
                        S.status = "Intersection";
                        S.appendPoint(w);
                    }
                } else {
                    if (w.gte(E) && w.lte(v)) {
                        S.status = "Intersection";
                        S.appendPoint(w);
                    }
                }
            }
        }
    }
    return S;
};
p.intersectBezier3Polygon = function (e, t, n, r, a) {
    var i = new p("No Intersection");
    var o = a.length;
    var s = 0;
    for (; s < o; s++) {
        var l = a[s];
        var c = a[(s + 1) % o];
        var d = p.intersectBezier3Line(e, t, n, r, l, c);
        i.appendPoints(d.points);
    }
    return i.points.length > 0 && (i.status = "Intersection"),
    i;
};
p.intersectBezier3Rectangle = function (e, t, n, r, a, i) {
    var o = a.min(i);
    var s = a.max(i);
    var l = new m(s.x, o.y);
    var c = new m(o.x, s.y);
    var d = p.intersectBezier3Line(e, t, n, r, o, l);
    var h = p.intersectBezier3Line(e, t, n, r, l, s);
    var u = p.intersectBezier3Line(e, t, n, r, s, c);
    var f = p.intersectBezier3Line(e, t, n, r, c, o);
    var g = new p("No Intersection");
    return g.appendPoints(d.points),
    g.appendPoints(h.points),
    g.appendPoints(u.points),
    g.appendPoints(f.points),
    g.points.length > 0 && (g.status = "Intersection"),
    g;
};
p.intersectCircleCircle = function (e, t, n, r) {
    var a;
    var i = t + r;
    var o = Math.abs(t - r);
    var s = e.distanceFrom(n);
    if (s > i) {
        a = new p("Outside");
    } else {
        if (s < o) {
            a = new p("Inside");
        } else {
            a = new p("Intersection");
            var l = (t * t - r * r + s * s) / (2 * s);
            var c = Math.sqrt(t * t - l * l);
            var d = e.lerp(n, l / s);
            var h = c / s;
            a.points.push(new m(d.x - h * (n.y - e.y), d.y + h * (n.x - e.x)));
            a.points.push(new m(d.x + h * (n.y - e.y), d.y - h * (n.x - e.x)));
        }
    }
    return a;
};
p.intersectCircleEllipse = function (e, t, n, r, a) {
    return p.intersectEllipseEllipse(e, t, t, n, r, a);
};
p.intersectCircleLine = function (e, t, n, r) {
    var a;
    var i = (r.x - n.x) * (r.x - n.x) + (r.y - n.y) * (r.y - n.y);
    var o = 2 * ((r.x - n.x) * (n.x - e.x) + (r.y - n.y) * (n.y - e.y));
    var s = o * o - 4 * i * (e.x * e.x + e.y * e.y + n.x * n.x + n.y * n.y - 2 * (e.x * n.x + e.y * n.y) - t * t);
    if (s < 0) {
        a = new p("Outside");
    } else {
        if (0 === s) {
            a = new p("Tangent");
        } else {
            var l = Math.sqrt(s);
            var c = (-o + l) / (2 * i);
            var d = (-o - l) / (2 * i);
            if ((c < 0 || c > 1) && (d < 0 || d > 1)) {
                a = new p(c < 0 && d < 0 || c > 1 && d > 1 ? "Outside" : "Inside");
            } else {
                a = new p("Intersection");
                if (0 <= c && c <= 1) {
                    a.points.push(n.lerp(r, c));
                }
                if (0 <= d && d <= 1) {
                    a.points.push(n.lerp(r, d));
                }
            }
        }
    }
    return a;
};
p.intersectCirclePolygon = function (e, t, n) {
    var r;
    var a = new p("No Intersection");
    var i = n.length;
    var o = 0;
    for (; o < i; o++) {
        var s = n[o];
        var l = n[(o + 1) % i];
        r = p.intersectCircleLine(e, t, s, l);
        a.appendPoints(r.points);
    }
    return a.points.length > 0 ? a.status = "Intersection" : a.status = r.status,
    a;
};
p.intersectCircleRectangle = function (e, t, n, r) {
    var a = n.min(r);
    var i = n.max(r);
    var o = new m(i.x, a.y);
    var s = new m(a.x, i.y);
    var l = p.intersectCircleLine(e, t, a, o);
    var c = p.intersectCircleLine(e, t, o, i);
    var d = p.intersectCircleLine(e, t, i, s);
    var h = p.intersectCircleLine(e, t, s, a);
    var u = new p("No Intersection");
    return u.appendPoints(l.points),
    u.appendPoints(c.points),
    u.appendPoints(d.points),
    u.appendPoints(h.points),
    u.points.length > 0 ? u.status = "Intersection" : u.status = l.status,
    u;
};
p.intersectEllipseEllipse = function (e, t, n, r, a, i) {
    var o = [n * n, 0, t * t, -2 * n * n * e.x, -2 * t * t * e.y, n * n * e.x * e.x + t * t * e.y * e.y - t * t * n * n];
    var s = [i * i, 0, a * a, -2 * i * i * r.x, -2 * a * a * r.y, i * i * r.x * r.x + a * a * r.y * r.y - a * a * i * i];
    var l = p.bezout(o, s).getRoots();
    var c = .001 * (o[0] * o[0] + 2 * o[1] * o[1] + o[2] * o[2]);
    var d = .001 * (s[0] * s[0] + 2 * s[1] * s[1] + s[2] * s[2]);
    var h = new p("No Intersection");
    var u = 0;
    for (; u < l.length; u++) {
        var g = (new f(o[0], o[3] + l[u] * o[1], o[5] + l[u] * (o[4] + l[u] * o[2]))).getRoots();
        var y = 0;
        for (; y < g.length; y++) {
            var A = (o[0] * g[y] + o[1] * l[u] + o[3]) * g[y] + (o[2] * l[u] + o[4]) * l[u] + o[5];
            if (Math.abs(A) < c) {
                A = (s[0] * g[y] + s[1] * l[u] + s[3]) * g[y] + (s[2] * l[u] + s[4]) * l[u] + s[5];
                if (Math.abs(A) < d) {
                    h.appendPoint(new m(g[y], l[u]));
                }
            }
        }
    }
    return h.points.length > 0 && (h.status = "Intersection"),
    h;
};
p.intersectEllipseLine = function (e, t, n, r, a) {
    var i;
    var o = new g(r.x, r.y);
    var s = g.fromPoints(r, a);
    var l = new g(e.x, e.y);
    var c = o.subtract(l);
    var d = new g(s.x / (t * t), s.y / (n * n));
    var h = new g(c.x / (t * t), c.y / (n * n));
    var u = s.dot(d);
    var m = s.dot(h);
    var f = m * m - u * (e = c.dot(h) - 1);
    if (f < 0) {
        i = new p("Outside");
    } else {
        if (f > 0) {
            var y = Math.sqrt(f);
            var A = (-m - y) / u;
            var E = (-m + y) / u;
            if ((A < 0 || 1 < A) && (E < 0 || 1 < E)) {
                i = new p(A < 0 && E < 0 || A > 1 && E > 1 ? "Outside" : "Inside");
            } else {
                i = new p("Intersection");
                if (0 <= A && A <= 1) {
                    i.appendPoint(r.lerp(a, A));
                }
                if (0 <= E && E <= 1) {
                    i.appendPoint(r.lerp(a, E));
                }
            }
        } else {
            var v = -m / u;
            if (0 <= v && v <= 1) {
                (i = new p("Intersection")).appendPoint(r.lerp(a, v));
            } else {
                i = new p("Outside");
            }
        }
    }
    return i;
};
p.intersectEllipsePolygon = function (e, t, n, r) {
    var a = new p("No Intersection");
    var i = r.length;
    var o = 0;
    for (; o < i; o++) {
        var s = r[o];
        var l = r[(o + 1) % i];
        var c = p.intersectEllipseLine(e, t, n, s, l);
        a.appendPoints(c.points);
    }
    return a.points.length > 0 && (a.status = "Intersection"),
    a;
};
p.intersectEllipseRectangle = function (e, t, n, r, a) {
    var i = r.min(a);
    var o = r.max(a);
    var s = new m(o.x, i.y);
    var l = new m(i.x, o.y);
    var c = p.intersectEllipseLine(e, t, n, i, s);
    var d = p.intersectEllipseLine(e, t, n, s, o);
    var h = p.intersectEllipseLine(e, t, n, o, l);
    var u = p.intersectEllipseLine(e, t, n, l, i);
    var f = new p("No Intersection");
    return f.appendPoints(c.points),
    f.appendPoints(d.points),
    f.appendPoints(h.points),
    f.appendPoints(u.points),
    f.points.length > 0 && (f.status = "Intersection"),
    f;
};
p.intersectLineLine = function (e, t, n, r) {
    var a;
    var i = (r.x - n.x) * (e.y - n.y) - (r.y - n.y) * (e.x - n.x);
    var o = (t.x - e.x) * (e.y - n.y) - (t.y - e.y) * (e.x - n.x);
    var s = (r.y - n.y) * (t.x - e.x) - (r.x - n.x) * (t.y - e.y);
    if (0 != s) {
        var l = i / s;
        var c = o / s;
        if (0 <= l && l <= 1 && 0 <= c && c <= 1) {
            (a = new p("Intersection")).points.push(new m(e.x + l * (t.x - e.x), e.y + l * (t.y - e.y)));
        } else {
            a = new p("No Intersection");
        }
    } else {
        a = new p(0 === i || 0 === o ? "Coincident" : "Parallel");
    }
    return a;
};
p.intersectLinePolygon = function (e, t, n) {
    var r = new p("No Intersection");
    var a = n.length;
    var i = 0;
    for (; i < a; i++) {
        var o = n[i];
        var s = n[(i + 1) % a];
        var l = p.intersectLineLine(e, t, o, s);
        r.appendPoints(l.points);
    }
    return r.points.length > 0 && (r.status = "Intersection"),
    r;
};
p.intersectLineRectangle = function (e, t, n, r) {
    var a = n.min(r);
    var i = n.max(r);
    var o = new m(i.x, a.y);
    var s = new m(a.x, i.y);
    var l = p.intersectLineLine(a, o, e, t);
    var c = p.intersectLineLine(o, i, e, t);
    var d = p.intersectLineLine(i, s, e, t);
    var h = p.intersectLineLine(s, a, e, t);
    var u = new p("No Intersection");
    return u.appendPoints(l.points),
    u.appendPoints(c.points),
    u.appendPoints(d.points),
    u.appendPoints(h.points),
    u.points.length > 0 && (u.status = "Intersection"),
    u;
};
p.intersectPolygonPolygon = function (e, t) {
    var n = new p("No Intersection");
    var r = e.length;
    var a = 0;
    for (; a < r; a++) {
        var i = e[a];
        var o = e[(a + 1) % r];
        var s = p.intersectLinePolygon(i, o, t);
        n.appendPoints(s.points);
    }
    return n.points.length > 0 && (n.status = "Intersection"),
    n;
};
p.intersectPolygonRectangle = function (e, t, n) {
    var r = t.min(n);
    var a = t.max(n);
    var i = new m(a.x, r.y);
    var o = new m(r.x, a.y);
    var s = p.intersectLinePolygon(r, i, e);
    var l = p.intersectLinePolygon(i, a, e);
    var c = p.intersectLinePolygon(a, o, e);
    var d = p.intersectLinePolygon(o, r, e);
    var h = new p("No Intersection");
    return h.appendPoints(s.points),
    h.appendPoints(l.points),
    h.appendPoints(c.points),
    h.appendPoints(d.points),
    h.points.length > 0 && (h.status = "Intersection"),
    h;
};
p.intersectRayRay = function (e, t, n, r) {
    var a;
    var i = (r.x - n.x) * (e.y - n.y) - (r.y - n.y) * (e.x - n.x);
    var o = (t.x - e.x) * (e.y - n.y) - (t.y - e.y) * (e.x - n.x);
    var s = (r.y - n.y) * (t.x - e.x) - (r.x - n.x) * (t.y - e.y);
    if (0 != s) {
        var l = i / s;
        (a = new p("Intersection")).points.push(new m(e.x + l * (t.x - e.x), e.y + l * (t.y - e.y)));
    } else {
        a = new p(0 === i || 0 === o ? "Coincident" : "Parallel");
    }
    return a;
};
p.intersectRectangleRectangle = function (e, t, n, r) {
    var a = e.min(t);
    var i = e.max(t);
    var o = new m(i.x, a.y);
    var s = new m(a.x, i.y);
    var l = p.intersectLineRectangle(a, o, n, r);
    var c = p.intersectLineRectangle(o, i, n, r);
    var d = p.intersectLineRectangle(i, s, n, r);
    var h = p.intersectLineRectangle(s, a, n, r);
    var u = new p("No Intersection");
    return u.appendPoints(l.points),
    u.appendPoints(c.points),
    u.appendPoints(d.points),
    u.appendPoints(h.points),
    u.points.length > 0 && (u.status = "Intersection"),
    u;
};
p.bezout = function (e, t) {
    var n = e[0] * t[1] - t[0] * e[1];
    var r = e[0] * t[2] - t[0] * e[2];
    var a = e[0] * t[3] - t[0] * e[3];
    var i = e[0] * t[4] - t[0] * e[4];
    var o = e[0] * t[5] - t[0] * e[5];
    var s = e[1] * t[2] - t[1] * e[2];
    var l = e[1] * t[4] - t[1] * e[4];
    var c = e[1] * t[5] - t[1] * e[5];
    var d = e[2] * t[3] - t[2] * e[3];
    var h = e[3] * t[4] - t[3] * e[4];
    var u = e[3] * t[5] - t[3] * e[5];
    var p = c + h;
    var m = l - d;
    return new f(n * s - r * r, n * m + a * s - 2 * r * i, n * p + a * m - i * i - 2 * r * o, n * u + a * p - 2 * i * o, a * u - o * o);
};
m.prototype.init = function (e, t) {
    this.x = e;
    this.y = t;
};
m.prototype.add = function (e) {
    return new m(this.x + e.x, this.y + e.y);
};
m.prototype.addEquals = function (e) {
    return this.x += e.x,
    this.y += e.y,
    this;
};
m.prototype.scalarAdd = function (e) {
    return new m(this.x + e, this.y + e);
};
m.prototype.scalarAddEquals = function (e) {
    return this.x += e,
    this.y += e,
    this;
};
m.prototype.subtract = function (e) {
    return new m(this.x - e.x, this.y - e.y);
};
m.prototype.subtractEquals = function (e) {
    return this.x -= e.x,
    this.y -= e.y,
    this;
};
m.prototype.scalarSubtract = function (e) {
    return new m(this.x - e, this.y - e);
};
m.prototype.scalarSubtractEquals = function (e) {
    return this.x -= e,
    this.y -= e,
    this;
};
m.prototype.multiply = function (e) {
    return new m(this.x * e, this.y * e);
};
m.prototype.multiplyEquals = function (e) {
    return this.x *= e,
    this.y *= e,
    this;
};
m.prototype.divide = function (e) {
    return new m(this.x / e, this.y / e);
};
m.prototype.divideEquals = function (e) {
    return this.x /= e,
    this.y /= e,
    this;
};
m.prototype.eq = function (e) {
    return this.x === e.x && this.y === e.y;
};
m.prototype.lt = function (e) {
    return this.x < e.x && this.y < e.y;
};
m.prototype.lte = function (e) {
    return this.x <= e.x && this.y <= e.y;
};
m.prototype.gt = function (e) {
    return this.x > e.x && this.y > e.y;
};
m.prototype.gte = function (e) {
    return this.x >= e.x && this.y >= e.y;
};
m.prototype.lerp = function (e, t) {
    return new m(this.x + (e.x - this.x) * t, this.y + (e.y - this.y) * t);
};
m.prototype.distanceFrom = function (e) {
    var t = this.x - e.x;
    var n = this.y - e.y;
    return Math.sqrt(t * t + n * n);
};
m.prototype.min = function (e) {
    return new m(Math.min(this.x, e.x), Math.min(this.y, e.y));
};
m.prototype.max = function (e) {
    return new m(Math.max(this.x, e.x), Math.max(this.y, e.y));
};
m.prototype.toString = function () {
    return this.x + "," + this.y;
};
m.prototype.setXY = function (e, t) {
    this.x = e;
    this.y = t;
};
m.prototype.setFromPoint = function (e) {
    this.x = e.x;
    this.y = e.y;
};
m.prototype.swap = function (e) {
    var t = this.x;
    var n = this.y;
    this.x = e.x;
    this.y = e.y;
    e.x = t;
    e.y = n;
};
f.TOLERANCE = 1e-6;
f.ACCURACY = 6;
f.prototype.init = function (e) {
    this.coefs = new Array;
    var t = e.length - 1;
    for (; t >= 0; t--) {
        this.coefs.push(e[t]);
    }
};
f.prototype.eval = function (e) {
    var t = 0;
    var n = this.coefs.length - 1;
    for (; n >= 0; n--) {
        t = t * e + this.coefs[n];
    }
    return t;
};
f.prototype.multiply = function (e) {
    var t = new f;
    var n = 0;
    for (; n <= this.getDegree() + e.getDegree(); n++) {
        t.coefs.push(0);
    }
    n = 0;
    for (; n <= this.getDegree(); n++) {
        var r = 0;
        for (; r <= e.getDegree(); r++) {
            t.coefs[n + r] += this.coefs[n] * e.coefs[r];
        }
    }
    return t;
};
f.prototype.divide_scalar = function (e) {
    var t = 0;
    for (; t < this.coefs.length; t++) {
        this.coefs[t] /= e;
    }
};
f.prototype.simplify = function () {
    var e = this.getDegree();
    for (; e >= 0 && Math.abs(this.coefs[e]) <= f.TOLERANCE; e--) {
        this.coefs.pop();
    }
};
f.prototype.bisection = function (e, t) {
    var n;
    var r = this.eval(e);
    var a = this.eval(t);
    if (Math.abs(r) <= f.TOLERANCE) {
        n = e;
    } else {
        if (Math.abs(a) <= f.TOLERANCE) {
            n = t;
        } else {
            if (r * a <= 0) {
                var i = Math.log(t - e);
                var o = Math.log(10) * f.ACCURACY;
                var s = Math.ceil((i + o) / Math.log(2));
                var l = 0;
                for (; l < s; l++) {
                    n = .5 * (e + t);
                    var c = this.eval(n);
                    if (Math.abs(c) <= f.TOLERANCE) {
                        break;
                    }
                    if (c * r < 0) {
                        t = n;
                        a = c;
                    } else {
                        e = n;
                        r = c;
                    }
                }
            }
        }
    }
    return n;
};
f.prototype.toString = function () {
    var e = new Array;
    var t = new Array;
    var n = this.coefs.length - 1;
    for (; n >= 0; n--) {
        var r = this.coefs[n];
        if (0 != r) {
            var a = r < 0 ? " - " : " + ";
            r = Math.abs(r);
            if (n > 0) {
                if (1 === r) {
                    r = "x";
                } else {
                    r = r + "x";
                }
            }
            if (n > 1) {
                r = r + ("^" + n);
            }
            t.push(a);
            e.push(r);
        }
    }
    t[0] = " + " === t[0] ? "" : "-";
    var i = "";
    n = 0;
    for (; n < e.length; n++) {
        i = i + (t[n] + e[n]);
    }
    return i;
};
f.prototype.getDegree = function () {
    return this.coefs.length - 1;
};
f.prototype.getDerivative = function () {
    var e = new f;
    var t = 1;
    for (; t < this.coefs.length; t++) {
        e.coefs.push(t * this.coefs[t]);
    }
    return e;
};
f.prototype.getRoots = function () {
    var e;
    switch (this.simplify(), this.getDegree()) {
    case 0:
        e = new Array;
        break;
    case 1:
        e = this.getLinearRoot();
        break;
    case 2:
        e = this.getQuadraticRoots();
        break;
    case 3:
        e = this.getCubicRoots();
        break;
    case 4:
        e = this.getQuarticRoots();
        break;
    default:
        e = new Array;
    }
    return e;
};
f.prototype.getRootsInInterval = function (e, t) {
    var n;
    var r = new Array;
    if (1 === this.getDegree()) {
        if (null != (n = this.bisection(e, t))) {
            r.push(n);
        }
    } else {
        var a = this.getDerivative().getRootsInInterval(e, t);
        if (a.length > 0) {
            if (null != (n = this.bisection(e, a[0]))) {
                r.push(n);
            }
            var i = 0;
            for (; i <= a.length - 2; i++) {
                if (null != (n = this.bisection(a[i], a[i + 1]))) {
                    r.push(n);
                }
            }
            if (null != (n = this.bisection(a[a.length - 1], t))) {
                r.push(n);
            }
        } else {
            if (null != (n = this.bisection(e, t))) {
                r.push(n);
            }
        }
    }
    return r;
};
f.prototype.getLinearRoot = function () {
    var e = new Array;
    var t = this.coefs[1];
    return 0 != t && e.push(-this.coefs[0] / t),
    e;
};
f.prototype.getQuadraticRoots = function () {
    var e = new Array;
    if (2 === this.getDegree()) {
        var t = this.coefs[2];
        var n = this.coefs[1] / t;
        var r = n * n - 4 * (this.coefs[0] / t);
        if (r > 0) {
            var a = Math.sqrt(r);
            e.push(.5 * (-n + a));
            e.push(.5 * (-n - a));
        } else {
            if (0 === r) {
                e.push(.5 * -n);
            }
        }
    }
    return e;
};
f.prototype.getCubicRoots = function () {
    var e = new Array;
    if (3 === this.getDegree()) {
        var t = this.coefs[3];
        var n = this.coefs[2] / t;
        var r = this.coefs[1] / t;
        var a = (3 * r - n * n) / 3;
        var i = (2 * n * n * n - 9 * r * n + 27 * (this.coefs[0] / t)) / 27;
        var o = n / 3;
        var s = i * i / 4 + a * a * a / 27;
        var l = i / 2;
        if (Math.abs(s) <= f.TOLERANCE) {}
        if (s > 0) {
            var c;
            var d = Math.sqrt(s);
            c = (y = -l + d) >= 0 ? Math.pow(y, 1 / 3) : -Math.pow(-y, 1 / 3);
            if ((y = -l - d) >= 0) {
                c = c + Math.pow(y, 1 / 3);
            } else {
                c = c - Math.pow(-y, 1 / 3);
            }
            e.push(c - o);
        } else {
            if (s < 0) {
                var h = Math.sqrt(-a / 3);
                var u = Math.atan2(Math.sqrt(-s), -l) / 3;
                var p = Math.cos(u);
                var m = Math.sin(u);
                var g = Math.sqrt(3);
                e.push(2 * h * p - o);
                e.push(-h * (p + g * m) - o);
                e.push(-h * (p - g * m) - o);
            } else {
                var y;
                y = l >= 0 ? -Math.pow(l, 1 / 3) : Math.pow(-l, 1 / 3);
                e.push(2 * y - o);
                e.push(-y - o);
            }
        }
    }
    return e;
};
f.prototype.getQuarticRoots = function () {
    var e = new Array;
    if (4 === this.getDegree()) {
        var t = this.coefs[4];
        var n = this.coefs[3] / t;
        var r = this.coefs[2] / t;
        var a = this.coefs[1] / t;
        var i = this.coefs[0] / t;
        var o = (new f(1, -r, n * a - 4 * i, -n * n * i + 4 * r * i - a * a)).getCubicRoots()[0];
        var s = n * n / 4 - r + o;
        if (Math.abs(s) <= f.TOLERANCE && (s = 0), s > 0) {
            var l = Math.sqrt(s);
            var c = 3 * n * n / 4 - l * l - 2 * r;
            var d = c + (p = (4 * n * r - 8 * a - n * n * n) / (4 * l));
            var h = c - p;
            if (Math.abs(d) <= f.TOLERANCE && (d = 0), Math.abs(h) <= f.TOLERANCE && (h = 0), d >= 0) {
                var u = Math.sqrt(d);
                e.push(-n / 4 + (l + u) / 2);
                e.push(-n / 4 + (l - u) / 2);
            }
            if (h >= 0) {
                u = Math.sqrt(h);
                e.push(-n / 4 + (u - l) / 2);
                e.push(-n / 4 - (u + l) / 2);
            }
        } else {
            if (s < 0) {} else {
                var p;
                if ((p = o * o - 4 * i) >= -f.TOLERANCE) {
                    if (p < 0 && (p = 0), (c = 3 * n * n / 4 - 2 * r) + (p = 2 * Math.sqrt(p)) >= f.TOLERANCE) {
                        var m = Math.sqrt(c + p);
                        e.push(-n / 4 + m / 2);
                        e.push(-n / 4 - m / 2);
                    }
                    if (c - p >= f.TOLERANCE) {
                        m = Math.sqrt(c - p);
                        e.push(-n / 4 + m / 2);
                        e.push(-n / 4 - m / 2);
                    }
                }
            }
        }
    }
    return e;
};
g.prototype.init = function (e, t) {
    this.x = e;
    this.y = t;
};
g.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
g.prototype.dot = function (e) {
    return this.x * e.x + this.y * e.y;
};
g.prototype.cross = function (e) {
    return this.x * e.y - this.y * e.x;
};
g.prototype.unit = function () {
    return this.divide(this.length());
};
g.prototype.unitEquals = function () {
    return this.divideEquals(this.length()),
    this;
};
g.prototype.add = function (e) {
    return new g(this.x + e.x, this.y + e.y);
};
g.prototype.addEquals = function (e) {
    return this.x += e.x,
    this.y += e.y,
    this;
};
g.prototype.subtract = function (e) {
    return new g(this.x - e.x, this.y - e.y);
};
g.prototype.subtractEquals = function (e) {
    return this.x -= e.x,
    this.y -= e.y,
    this;
};
g.prototype.multiply = function (e) {
    return new g(this.x * e, this.y * e);
};
g.prototype.multiplyEquals = function (e) {
    return this.x *= e,
    this.y *= e,
    this;
};
g.prototype.divide = function (e) {
    return new g(this.x / e, this.y / e);
};
g.prototype.divideEquals = function (e) {
    return this.x /= e,
    this.y /= e,
    this;
};
g.prototype.perp = function () {
    return new g(-this.y, this.x);
};
g.fromPoints = function (e, t) {
    return new g(t.x - e.x, t.y - e.y);
};/*paper-PathFitter*/;
var Geometry = new class {
    bezierBbox(e) {
        var t = function (e, t, n, r, a, i, o, s) {
            var l;
            var c;
            var d;
            var h;
            var u;
            var p;
            var m;
            var f;
            var g = [];
            var y = [];
            var A = [];
            var E = 0;
            for (; E < 2; ++E) {
                if (0 === E ? (c = 6 * e - 12 * n + 6 * a, l = -3 * e + 9 * n - 9 * a + 3 * o, d = 3 * n - 3 * e) : (c = 6 * t - 12 * r + 6 * i, l = -3 * t + 9 * r - 9 * i + 3 * s, d = 3 * r - 3 * t), Math.abs(l) < 1e-12) {
                    if (Math.abs(c) < 1e-12) {
                        continue;
                    }
                    if (0 < (h = -d / c) && h < 1) {
                        g.push(h);
                    }
                } else {
                    if ((m = c * c - 4 * d * l) < 0) {
                        if (Math.abs(m) < 1e-12 && 0 < (h = -c / (2 * l)) && h < 1) {
                            g.push(h);
                        }
                    } else {
                        f = Math.sqrt(m);
                        if (0 < (u = (-c + f) / (2 * l)) && u < 1) {
                            g.push(u);
                        }
                        if (0 < (p = (-c - f) / (2 * l)) && p < 1) {
                            g.push(p);
                        }
                    }
                }
            }
            var v;
            var S = g.length;
            for (; S--;) {
                h = g[S];
                v = 1 - h;
                y[S] = v * v * v * e + 3 * v * v * h * n + 3 * v * h * h * a + h * h * h * o;
                A[S] = v * v * v * t + 3 * v * v * h * r + 3 * v * h * h * i + h * h * h * s;
            }
            return y.push(e, o),
            A.push(t, s),
            {
                min: {
                    x: Math.min.apply(0, y),
                    y: Math.min.apply(0, A)
                },
                max: {
                    x: Math.max.apply(0, y),
                    y: Math.max.apply(0, A)
                }
            };
        } (e.p1.x, e.p1.y, e.cp.x, e.cp.y, e.cp2.x, e.cp2.y, e.p2.x, e.p2.y);
        return {
            p1: {
                x: t.min.x,
                y: t.min.y
            },
            p2: {
                x: t.max.x,
                y: t.max.y
            }
        };
    }
    quadraticBezierBbox(e) {
        var t = this.quadraticToCubic(e);
        return this.bezierBbox(t);
    }
    lineBbox(e) {
        return {
            p1: {
                x: Math.min(e.p1.x, e.p2.x),
                y: Math.min(e.p1.y, e.p2.y)
            },
            p2: {
                x: Math.max(e.p1.x, e.p2.x),
                y: Math.max(e.p1.y, e.p2.y)
            }
        };
    }
    beziersBbox(e) {
        return this.expandByMaxRectangles(e.map((e) => {
            return this.bezierBbox(e);
        }));
    }
    rectWidth(e) {
        return e.p2.x - e.p1.x;
    }
    rectHeight(e) {
        return e.p2.y - e.p1.y;
    }
    rectWidthHeight(e) {
        return {
            width: this.rectWidth(e),
            height: this.rectHeight(e)
        };
    }
    genericLinesBbox(e) {
        return this.expandByMaxRectangles(e.map((e) => {
            return this.isCubicBezierData(e) ? this.bezierBbox(e) : this.isQuadraticBezierData(e) ? this.quadraticBezierBbox(e) : this.lineBbox(e);
        }));
    }
    expandByMaxRectangleByPoint(e, t) {
        return {
            p1: {
                x: Math.min(e.p1.x, t.x),
                y: Math.min(e.p1.y, t.y)
            },
            p2: {
                x: Math.max(e.p2.x, t.x),
                y: Math.max(e.p2.y, t.y)
            }
        };
    }
    expandByMaxRectangleAround(e, t) {
        return {
            p1: {
                x: e.p1.x - t,
                y: e.p1.y - t
            },
            p2: {
                x: e.p2.x + t,
                y: e.p2.y + t
            }
        };
    }
    expandByMaxRectangles(e) {
        if (!e || 0 === e.length) {
            return null;
        }
        var t = {
            p1: {
                x: Number.MAX_SAFE_INTEGER,
                y: Number.MAX_SAFE_INTEGER
            },
            p2: {
                x: Number.MIN_SAFE_INTEGER,
                y: Number.MIN_SAFE_INTEGER
            }
        };
        return e.reduce((e, t) => {
            return this.expandByMaxRectangle(e, t);
        },
        t);
    }
    expandByMaxRectangle(e, t) {
        return null == e ? t : null == t ? e : {
            p1: {
                x: Math.min(e.p1.x, t.p1.x),
                y: Math.min(e.p1.y, t.p1.y)
            },
            p2: {
                x: Math.max(e.p2.x, t.p2.x),
                y: Math.max(e.p2.y, t.p2.y)
            }
        };
    }
    boxCollideOrInsideEachOther(e, t) {
        return this.xyInsideRect(e.left, e.top, t) || this.xyInsideRect(e.right, e.top, t) || this.xyInsideRect(e.right, e.bottom, t) || this.xyInsideRect(e.left, e.bottom, t) || this.xyInsideRect(t.left, t.top, e) || this.xyInsideRect(t.right, t.top, e) || this.xyInsideRect(t.right, t.bottom, e) || this.xyInsideRect(t.left, t.bottom, e);
    }
    xyInsideRect(e, t, n) {
        return e >= n.left && e <= n.right && t >= n.top && t <= n.bottom;
    }
    getBoundingRectFromPoints(e) {
        var t = e[0].x;
        var n = e[0].x;
        var r = e[0].y;
        var a = e[0].y;
        var i = 0;
        for (; i < e.length; i++) {
            var o = e[i];
            t = Math.min(o.x, t);
            n = Math.max(o.x, n);
            r = Math.min(o.y, r);
            a = Math.max(o.y, a);
        }
        return {
            p1: {
                x: t,
                y: r
            },
            p2: {
                x: n,
                y: a
            }
        };
    }
    getScaleTuples(e, t) {
        return e.map((e) => {
            return this.getScaleTuple(e, t);
        });
    }
    getScaleLines(e, t) {
        return e.map((e) => {
            var n = e;
            return n.cp && n.cp2 ? PropUpdateHelper.update(n, {
                p1: this.scalePoint(n.p1, t),
                p2: this.scalePoint(n.p2, t),
                cp: this.scalePoint(n.cp, t),
                cp2: this.scalePoint(n.cp2, t)
            }) : n.cp ? PropUpdateHelper.update(n, {
                p1: this.scalePoint(n.p1, t),
                p2: this.scalePoint(n.p2, t),
                cp: this.scalePoint(n.cp, t)
            }) : PropUpdateHelper.update(n, {
                p1: this.scalePoint(n.p1, t),
                p2: this.scalePoint(n.p2, t)
            });
        });
    }
    getScaleTuple(e, t) {
        if (void 0 === t || 1 === t) {
            return e;
        }
        var n = e.p1;
        var r = e.p2;
        return {
            p1: {
                x: n.x * t,
                y: n.y * t
            },
            p2: {
                x: r.x * t,
                y: r.y * t
            }
        };
    }
    scalePoint(e, t) {
        return void 0 === t || 1 === t ? e : {
            x: e.x * t,
            y: e.y * t
        };
    }
    scaleSize(e, t) {
        return {
            width: e.width * t,
            height: e.height * t
        };
    }
    scaleRect(e, t) {
        return void 0 === t || 1 === t ? e : {
            left: e.left * t,
            top: e.top * t,
            right: e.right * t,
            bottom: e.bottom * t,
            width: e.width * t,
            height: e.height * t
        };
    }
    scaleRectangle(e, t) {
        return void 0 === t || 1 === t ? e : {
            p1: this.scalePoint(e.p1, t),
            p2: this.scalePoint(e.p2, t)
        };
    }
    getRotationInfo(e) {
        return {
            rotation: e.rotation,
            cp: this.getCenterPoint(e)
        };
    }
    removePointsDuplicationAtStartEnd(e) {
        if (e[0].x === e[1].x && e[0].y === e[1].y) {
            e.shift();
        }
        var t = e.length - 1;
        return t > 0 && e[t - 1].x === e[t].x && e[t - 1].y === e[t].y && e.pop(),
        e;
    }
    pointsToLines(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = [];
        var r = 0;
        for (; r < e.length - 1; r++) {
            var a = e[r];
            var i = e[r + 1];
            n.push({
                p1: a,
                p2: i
            });
        }
        if (e.length > 2 && t) {
            var o = _.last(e);
            var s = _.first(e);
            if (!this.pointEquals(s, o)) {
                n.push({
                    p1: o,
                    p2: s
                });
            }
        }
        return n;
    }
    snapLinePoint45(e, t) {
        var n = this.angleFrom2Points360(e.x, e.y, t.x, t.y);
        var r = this.nearToNumer(n, 45);
        var a = Math.max(Math.abs(t.x - e.x), Math.abs(t.y - e.y));
        switch (r) {
        case 0:
            return {
                x: e.x + a,
                y: e.y
            };
        case 45:
            return {
                x: e.x + a,
                y: e.y + a
            };
        case 90:
            return {
                x: e.x,
                y: e.y + a
            };
        case 135:
            return {
                x: e.x - a,
                y: e.y + a
            };
        case 180:
            return {
                x: e.x - a,
                y: e.y
            };
        case 225:
            return {
                x: e.x - a,
                y: e.y - a
            };
        case 270:
            return {
                x: e.x,
                y: e.y - a
            };
        case 315:
            return {
                x: e.x + a,
                y: e.y - a
            };
        case 360:
            return {
                x: e.x + a,
                y: e.y
            };
        }
        return this.pointRotate({
            x: e.x + this.distance2Points(e, t),
            y: e.y
        },
        e, r);
    }
    snapToGridSize(e, t, n) {
        return 0 === t ? e : (n = n || 10, {
            x: this.nearToNumer(e.x, t, n),
            y: this.nearToNumer(e.y, t, n)
        });
    }
    nearToNumer(e, t, n) {
        var r = Math.round(e / t) * t;
        return void 0 !== n && Math.abs(r - e) > n ? e : r;
    }
    addNewPointToPoints(e, t) {
        var n = e[t = void 0 === t ? e.length - 1 : t];
        return PropUpdateHelper.insert(e, t + 1, {
            x: n.x + 50,
            y: n.y + 50
        });
    }
    removePointFromPoints(e, t) {
        return PropUpdateHelper.remove(e, t);
    }
    addNewBeizer(e, t, n, r) {
        if ((n = r ? void 0 === n ? e.length - 1 : n : void 0 === n ? e.length : n) > e.length - 1) {
            var a = {
                p1: (i = e[e.length - 1]).p2,
                p2: this.addPoint(i.p2, {
                    x: 50,
                    y: 10
                }),
                cp: {
                    dx: 25,
                    dy: -25
                },
                cp2: {
                    dx: -25,
                    dy: 25
                }
            };
            return d = PropUpdateHelper.insert(e, n + 1, a),
            t ? this.smoothBeziers(d) : d;
        }
        var i = e[n];
        var o = this.toAbsoluteControlPointCubic(i);
        var s = this.splitBezier(o, .5);
        var l = this.toRelativeControlPointCubic(s[0]);
        var c = this.toRelativeControlPointCubic(s[1]);
        var d = PropUpdateHelper.setIndex(e, n, l);
        return d = PropUpdateHelper.insert(d, n + 1, c),
        t ? this.smoothBeziers(d) : d;
    }
    removeBezier(e, t, n) {
        return 0 === t ? e = PropUpdateHelper.remove(e, t) : t > e.length - 1 ? e = PropUpdateHelper.remove(e, t - 1) : (e = PropUpdateHelper.setIndex(e, t - 1, {
            p1: e[t - 1].p1,
            p2: e[t].p2,
            cp: e[t - 1].cp,
            cp2: e[t - 1].cp2
        }), e = PropUpdateHelper.remove(e, t)),
        n ? this.smoothBeziers(e) : e;
    }
    removeBezierClosed(e, t, n) {
        var r = this.previousIndexLoop(t, e.length);
        return e = PropUpdateHelper.setIndex(e, r, {
            p1: e[r].p1,
            p2: e[t].p2,
            cp: e[r].cp,
            cp2: e[r].cp2
        }),
        e = PropUpdateHelper.remove(e, t),
        n ? this.smoothBeziers(e, true) : e;
    }
    closePointFromPath(e, t) {
        if (this.isLineData(e)) {
            var n = new Bezier(e.p1, e.p2, e.p1, e.p2);
        } else {
            n = this.isCubicBezierData(e) ? new Bezier(e.p1, e.cp, e.cp2, e.p2) : new Bezier(e.p1, e.cp, e.p2);
        }
        return n.project(t);
    }
    insertBreakForPaths(e, t, n, r) {
        var a = _.sumBy(e, (e) => {
            return e.length || this.pathLength(e);
        });
        var i = a * n;
        var o = this.round2(Math.max(0, i - t / 2));
        var s = this.round2(Math.min(a, i + t / 2));
        var l = [];
        var c = 0;
        r = r || "distance";
        var h = 0;
        for (; h < e.length; h++) {
            var u = e[h];
            var p = u.length || this.pathLength(u);
            if (c + p <= o) {
                l.push(u);
            } else {
                if (c < o && o < c + p) {
                    if (this.isLineData(u) || "distance" != r) {
                        m = (o - c) / p;
                    } else {
                        var m = this.bezierRatioFromDistance(u, o - c);
                    }
                    var f = this.splitPath(u, m)[0];
                    if (f) {
                        l.push(f);
                    }
                }
            }
            if (c >= s) {
                l.push(u);
            } else {
                if (c < s && s < c + p) {
                    if (this.isLineData(u) || "distance" != r) {
                        m = (s - c) / p;
                    } else {
                        m = this.bezierRatioFromDistance(u, s - c);
                    }
                    l.push(this.splitPath(u, m)[1]);
                }
            }
            c = c + p;
        }
        return l;
    }
    jointParallelLines(e, t) {
        if (e.length <= 1) {
            return {
                lines1: e,
                lines2: t
            };
        }
        var n = 0;
        var r = 0;
        var a = [e[0]];
        var i = [t[0]];
        var o = 0;
        for (; o < e.length - 1; o++) {
            var s = a[n];
            var l = i[r];
            var c = e[o + 1];
            var d = t[o + 1];
            var h = this.jointNextLine(s, c);
            var u = this.jointNextLine(l, d);
            if (h.parallel || u.parallel) {
                a.push(c);
                i.push(d);
            } else {
                a[n] = h.line;
                if (h.middleLine) {
                    n++;
                    a.push(h.middleLine);
                }
                a.push(h.nextLine);
                i[r] = u.line;
                if (u.middleLine) {
                    r++;
                    i.push(u.middleLine);
                }
                i.push(u.nextLine);
            }
            n++;
            r++;
        }
        return {
            lines1: a,
            lines2: i
        };
    }
    jointNextLine(e, t) {
        var n = this.intersectLineToLine(e, t);
        if (n.length > 0) {
            return {
                parallel: false,
                line: {
                    p1: e.p1,
                    p2: n[0],
                    original: e.original || e,
                    startPointScale: e.startPointScale
                },
                nextLine: {
                    p1: n[0],
                    p2: t.p2,
                    original: t.original || t,
                    startPointScale: "reduce"
                },
                middleLine: null
            };
        }
        var r = this.intersectRayRay(e.p1, e.p2, t.p1, t.p2);
        if (!r) {
            return {
                parallel: true,
                line: e,
                nextLine: t,
                middleLine: null
            };
        }
        n = [r];
        var a = this.angleDifferentFrom3Points180(e.p1, t.p2, n[0]);
        return 180 === Number.parseInt(a, 10) ? {
            parallel: true,
            line: e,
            nextLine: t,
            middleLine: null
        } : a < 90 ? {
            parallel: false,
            line: e,
            nextLine: t,
            middleLine: {
                p1: e.p2,
                p2: t.p1
            }
        } : {
            parallel: false,
            line: {
                p1: e.p1,
                p2: n[0],
                original: e.original || e,
                startPointScale: e.startPointScale
            },
            nextLine: {
                p1: n[0],
                p2: t.p2,
                original: t.original || t,
                startPointScale: "extend"
            },
            middleLine: null
        };
    }
    isQuadraticBezierPath(e) {
        return null != e.cp && null == e.cp2;
    }
    pointInsidePolygonLines(e, t) {
        var n = e.x;
        var r = e.y;
        var a = false;
        var i = 0;
        var o = t.length - 1;
        for (; i < t.length; o = i++) {
            var s = t[i].p1.x;
            var l = t[i].p1.y;
            var c = t[o].p1.x;
            var d = t[o].p1.y;
            if (l > r != d > r && n < (c - s) * (r - l) / (d - l) + s) {
                a = !a;
            }
        }
        return a;
    }
    pointInsidePolygon(e, t) {
        var n = e.x;
        var r = e.y;
        var a = false;
        var i = 0;
        var o = t.length - 1;
        for (; i < t.length; o = i++) {
            var s = t[i].x;
            var l = t[i].y;
            var c = t[o].x;
            var d = t[o].y;
            if (l > r != d > r && n < (c - s) * (r - l) / (d - l) + s) {
                a = !a;
            }
        }
        return a;
    }
    quadraticToCubic(e) {
        var t = e.p1;
        var n = e.cp;
        var r = e.p2;
        return {
            p1: t,
            cp: {
                x: this.round2(t.x + 2 / 3 * (n.x - t.x)),
                y: this.round2(t.y + 2 / 3 * (n.y - t.y))
            },
            cp2: {
                x: this.round2(r.x + 2 / 3 * (n.x - r.x)),
                y: this.round2(r.y + 2 / 3 * (n.y - r.y))
            },
            p2: r
        };
    }
    getCenterPoint(e, t) {
        if (e.p1) {
            var n = e.p1;
            var r = e.p2;
        } else {
            n = e;
            r = t;
        }
        return {
            x: (n.x + r.x) / 2,
            y: (n.y + r.y) / 2
        };
    }
    splitBezierByLine(e, t) {
        var n = new Bezier(e.p1, e.cp, e.cp2, e.p2);
        var r = n.intersects(t);
        if (0 === r.length) {
            return [];
        }
        if (1 === r.length) {
            var a = n.split(r[0]);
            return [this.pointsToCubicBezier(a.left.points), this.pointsToCubicBezier(a.right.points)];
        }
        throw new Error("not supported");
    }
    splitBezier(e, t) {
        var n = (new Bezier(e.p1, e.cp, e.cp2, e.p2)).split(t);
        return [this.pointsToCubicBezier(n.left.points), this.pointsToCubicBezier(n.right.points)];
    }
    splitBezierByLineGetFirstPart(e, t) {
        var n = new Bezier(e.p1, e.cp, e.cp2, e.p2);
        var r = n.intersects(t);
        if (r.length > 0) {
            var a = n.split(r[0]);
            return this.pointsToCubicBezier(a.left.points);
        }
        return null;
    }
    splitBezierByVerticalLines(e, t, n) {
        var r = new Bezier(e.p1, e.cp, e.cp2, e.p2);
        var a = r.intersects(t);
        var i = r.intersects(n);
        if (a.length <= 0 && i.length <= 0) {
            return e;
        }
        if (a.length > 0 && i.length > 0 && (r = r.split(a[0], i[0])), a.length <= 0) {
            var o = r.split(i[0]);
            r = o.left;
        }
        return i.length <= 0 && (o = r.split(a[0]), r = o.right),
        this.pointsToCubicBezier(r.points);
    }
    pointsToCubicBezier(e) {
        return {
            p1: e[0],
            cp: e[1],
            cp2: e[2],
            p2: e[3]
        };
    }
    rotatePointsByShapeRect(e, t) {
        var n = e.data;
        var r = n.p1;
        var a = n.p2;
        var i = n.rotation;
        if (!i) {
            return t;
        }
        var o = this.getCenterPoint(r, a);
        return t.map((e) => {
            return this.pointRotate(e, o, i);
        });
    }
    rotateGenericLinesByShapeRect(e, t) {
        var n = e.data;
        var r = n.p1;
        var a = n.p2;
        var i = n.rotation;
        if (!i) {
            return t;
        }
        var o = this.getCenterPoint(r, a);
        return t.map((e) => {
            return this.isCubicBezierData(e) ? this.rotatePropertyInData(e, ["p1", "cp", "cp2", "p2"], i, o) : this.isQuadraticBezierData(e) ? this.rotatePropertyInData(e, ["p1", "cp", "p2"], i, o) : this.rotatePropertyInData(e, ["p1", "p2"], i, o);
        });
    }
    rotatePropertyInData(e, t, n, r) {
        var a = {};
        return t.forEach((t) => {
            var i = this.pointRotate(e[t], r, n);
            a[t] = i;
        }),
        PropUpdateHelper.update(e, a);
    }
    pointsRotate(e, t, n) {
        return e.map((e) => {
            return this.pointRotate(e, t, n);
        });
    }
    pointRotate(e, t, n) {
        if (!n) {
            return e;
        }
        var r = this.toFlattenPoint(t);
        return this.toFlattenPoint(e).rotate(this.toRadians(n), r);
    }
    bezierRotate(e, t, n) {
        return {
            p1: this.pointRotate(e.p1, t, n),
            cp: this.pointRotate(e.cp, t, n),
            cp2: this.pointRotate(e.cp2, t, n),
            p2: this.pointRotate(e.p2, t, n)
        };
    }
    quadraticBezierRotate(e, t, n) {
        return {
            p1: this.pointRotate(e.p1, t, n),
            cp: this.pointRotate(e.cp, t, n),
            p2: this.pointRotate(e.p2, t, n)
        };
    }
    lineRotate(e, t, n) {
        return {
            p1: this.pointRotate(e.p1, t, n),
            p2: this.pointRotate(e.p2, t, n)
        };
    }
    transformCubicBezier(e, t, n, r, a) {
        var i = e.p1;
        var o = e.cp;
        var s = e.cp2;
        var l = e.p2;
        return t = t || 1,
        n = n || 1,
        r = r || 0,
        a = a || 0,
        {
            p1: {
                x: i.x * t + r,
                y: i.y * n + a
            },
            cp: {
                x: o.x * t + r,
                y: o.y * n + a
            },
            cp2: {
                x: s.x * t + r,
                y: s.y * n + a
            },
            p2: {
                x: l.x * t + r,
                y: l.y * n + a
            }
        };
    }
    keepPointInRect(e, t) {
        return {
            x: Math.max(t.p1.x, Math.min(e.x, t.p2.x)),
            y: Math.max(t.p1.y, Math.min(e.y, t.p2.y))
        };
    }
    keepBetween(e, t, n) {
        return Math.max(t, Math.min(e, n));
    }
    keepPointInX(e, t, n) {
        return {
            x: Math.max(t, Math.min(e.x, n)),
            y: e.y
        };
    }
    keepPointInY(e, t, n) {
        return {
            x: e.x,
            y: Math.max(t, Math.min(e.y, n))
        };
    }
    pointInsideRect(e, t) {
        return t = this.normalizePointTupple(t),
        e.x >= t.p1.x && e.x <= t.p2.x && e.y >= t.p1.y && e.y <= t.p2.y;
    }
    normalizePointTupple(e) {
        return {
            p1: {
                x: Math.min(e.p1.x, e.p2.x),
                y: Math.min(e.p1.y, e.p2.y)
            },
            p2: {
                x: Math.max(e.p1.x, e.p2.x),
                y: Math.max(e.p1.y, e.p2.y)
            }
        };
    }
    getClientRect(e) {
        var t = this.normalizePointTupple(e);
        var n = t.p1;
        var r = t.p2;
        var a = Math.abs(r.x - n.x);
        var i = Math.abs(r.y - n.y);
        return {
            left: n.x,
            top: n.y,
            width: a,
            height: i,
            bottom: n.y + i,
            right: n.x + a
        };
    }
    getPointsRect(e) {
        return [(e = this.normalizePointTupple(e)).p1, {
            x: e.p2.x,
            y: e.p1.y
        },
        e.p2, {
            x: e.p1.x,
            y: e.p2.y
        },
        e.p1];
    }
    getPointsFromPointTupple(e) {
        return [e.p1, {
            x: e.p2.x,
            y: e.p1.y
        },
        e.p2, {
            x: e.p1.x,
            y: e.p2.y
        }];
    }
    getLeftTopArc(e, t, n) {
        var r = e.x;
        var a = e.y;
        return {
            p1: {
                x: r - t,
                y: a
            },
            p2: {
                x: r,
                y: a - n
            },
            cp: {
                x: r - t,
                y: a - .5522848 * n
            },
            cp2: {
                x: r - .5522848 * t,
                y: a - n
            }
        };
    }
    reverseBezierDirection(e) {
        return {
            p1: e.p2,
            p2: e.p1,
            cp: e.cp2,
            cp2: e.cp
        };
    }
    reverseBeziersDirection(e) {
        return e.map((e) => {
            return this.reverseBezierDirection(e);
        });
    }
    getLeftTopArcReverse(e, t, n) {
        return this.reverseBezierDirection(this.getLeftTopArc(e, t, n));
    }
    getRightTopArc(e, t, n) {
        var r = e.x;
        var a = e.y;
        var i = r + t;
        return {
            p1: {
                x: r,
                y: a - n
            },
            p2: {
                x: i,
                y: a
            },
            cp: {
                x: r + .5522848 * t,
                y: a - n
            },
            cp2: {
                x: i,
                y: a - .5522848 * n
            }
        };
    }
    getRightTopArcReverse(e, t, n) {
        return this.reverseBezierDirection(this.getRightTopArc(e, t, n));
    }
    getRightBottomArc(e, t, n) {
        var r = e.x;
        var a = e.y;
        var i = r + t;
        var o = a + n;
        return {
            p1: {
                x: i,
                y: a
            },
            p2: {
                x: r,
                y: o
            },
            cp: {
                x: i,
                y: a + .5522848 * n
            },
            cp2: {
                x: r + .5522848 * t,
                y: o
            }
        };
    }
    getLeftBottomArc(e, t, n) {
        var r = e.x;
        var a = e.y;
        var i = a + n;
        return {
            p1: {
                x: r,
                y: i
            },
            p2: {
                x: r - t,
                y: a
            },
            cp: {
                x: r - .5522848 * t,
                y: i
            },
            cp2: {
                x: r - t,
                y: a + .5522848 * n
            }
        };
    }
    ellipseToCubicBeziers(e, t) {
        var n = Math.abs(t.x - e.x);
        var r = Math.abs(t.y - e.y);
        var a = n / 2;
        var i = r / 2;
        var o = e.x + n / 2;
        var s = e.y + r / 2;
        var l = .5522848 * a;
        var c = .5522848 * i;
        var d = o + a;
        var h = s + i;
        return [{
            p1: {
                x: o - a,
                y: s
            },
            p2: {
                x: o,
                y: s - i
            },
            cp: {
                x: o - a,
                y: s - c
            },
            cp2: {
                x: o - l,
                y: s - i
            }
        },
        {
            p1: {
                x: o,
                y: s - i
            },
            p2: {
                x: d,
                y: s
            },
            cp: {
                x: o + l,
                y: s - i
            },
            cp2: {
                x: d,
                y: s - c
            }
        },
        {
            p1: {
                x: d,
                y: s
            },
            p2: {
                x: o,
                y: h
            },
            cp: {
                x: d,
                y: s + c
            },
            cp2: {
                x: o + l,
                y: h
            }
        },
        {
            p1: {
                x: o,
                y: h
            },
            p2: {
                x: o - a,
                y: s
            },
            cp: {
                x: o - l,
                y: h
            },
            cp2: {
                x: o - a,
                y: s + c
            }
        }];
    }
    smoothBeziers(e, t) {
        var n = [];
        var r = 0;
        for (; r < e.length; r++) {
            if (0 != r || t) {
                var a = e[r];
                var i = this.toAbsoluteControlPointCubic(a);
                var o = e[this.previousIndexLoop(r, e.length)];
                var s = this.toAbsoluteControlPointCubic(o);
                i.cp = this.reflectPoint(s.cp2, a.p1);
                n.push(this.toRelativeControlPointCubic(i));
            } else {
                n.push(e[r]);
            }
        }
        return n;
    }
    previousIndexLoop(e, t) {
        return e <= 0 ? t - 1 : e - 1;
    }
    nextIndexLoop(e, t) {
        return e >= t - 1 ? 0 : e + 1;
    }
    smoothBeziersFromCurrentPoint(e, t) {
        var n = [];
        var r = 0;
        for (; r < e.length; r++) {
            if (r != e.length - 1 || t) {
                var a = e[r];
                var i = this.toAbsoluteControlPointCubic(a);
                var o = e[this.nextIndexLoop(r, e.length)];
                var s = this.toAbsoluteControlPointCubic(o);
                i.cp2 = this.reflectPoint(s.cp, o.p1);
                n.push(this.toRelativeControlPointCubic(i));
            } else {
                n.push(e[e.length - 1]);
            }
        }
        return n;
    }
    reflectPoint(e, t) {
        var n = new Flatten.Point(e.x, e.y);
        return {
            x: (n = n.rotate(Math.PI, new Flatten.Point(t.x, t.y))).x,
            y: n.y
        };
    }
    moveCubicBeizerPoint(e, t, n, r) {
        if (0 === t && !r) {
            return PropUpdateHelper.setIndex(e, t, {
                p1: n,
                p2: e[0].p2,
                cp: e[0].cp,
                cp2: e[0].cp2
            });
        }
        if (t >= e.length && !r) {
            return t = e.length - 1,
            PropUpdateHelper.setIndex(e, t, {
                p1: e[t].p1,
                p2: n,
                cp: e[t].cp,
                cp2: e[t].cp2
            });
        }
        var a = {
            p1: n,
            p2: e[t].p2,
            cp: e[t].cp,
            cp2: e[t].cp2
        };
        var i = this.previousIndexLoop(t, e.length);
        var o = {
            p1: e[i].p1,
            p2: n,
            cp: e[i].cp,
            cp2: e[i].cp2
        };
        var s = PropUpdateHelper.setIndex(e, t, a);
        return PropUpdateHelper.setIndex(s, i, o);
    }
    addPoint(e, t) {
        return {
            x: e.x + t.x,
            y: e.y + t.y
        };
    }
    substractPoint(e, t) {
        return {
            x: e.x - t.x,
            y: e.y - t.y
        };
    }
    distance2Points(e, t) {
        var n = e.x - t.x;
        var r = e.y - t.y;
        return Math.sqrt(n * n + r * r);
    }
    quadraticBezierLength(e) {
        return (new Bezier(e.p1, e.cp, e.p2)).length();
    }
    cubicBezierLength(e) {
        return (new Bezier(e.p1, e.cp, e.cp2, e.p2)).length();
    }
    getMiddlePointLine(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .5;
        var r = arguments.length > 3 ? arguments[3] : void 0;
        var a = {
            dx: 0,
            dy: 0
        };
        return r && (a = this.calcTranslationExact(r, e, t), e = this.addToPoint(e, a), t = this.addToPoint(t, a)),
        {
            x: e.x + (t.x - e.x) * n,
            y: e.y + (t.y - e.y) * n
        };
    }
    pointEquals(e, t) {
        return arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? (e = this.roundPoint(e), t = this.roundPoint(t), e.x === t.x && e.y === t.y) : e.x === t.x && e.y === t.y;
    }
    splitPath(e, t) {
        if (this.isLineData(e)) {
            var n = this.distance2Points(e.p1, e.p2) * t;
            var r = this.pointAtDistance(e.p1, e.p2, n);
            return [{
                p1: e.p1,
                p2: r
            },
            {
                p1: r,
                p2: e.p2
            }];
        }
        if (this.isQuadraticBezierData(e) && (e = this.quadraticToCubic(e)), this.isCubicBezierData(e)) {
            return this.splitBezier(e, t);
        }
    }
    pathLength(e) {
        return this.isLineData(e) ? this.distance2Points(e.p1, e.p2) : this.isCubicBezierData(e) ? this.cubicBezierLength(e) : this.isQuadraticBezierData(e) ? this.quadraticBezierLength(e) : void 0;
    }
    isLineData(e) {
        return e.p1 && e.p2 && !e.cp;
    }
    isEllipseData(e) {
        return e.rx && e.ry;
    }
    isCubicBezierData(e) {
        return e.cp && e.cp2;
    }
    isQuadraticBezierData(e) {
        return e.cp && !e.cp2;
    }
    pointAtDistance(e, t, n, r) {
        if (r = r || 0) {
            var a = this.calcTranslationExact(r, e, t);
            e = this.addToPoint(e, a);
            t = this.addToPoint(t, a);
        }
        var i = n / this.distance2Points(e, t);
        return {
            x: (1 - i) * e.x + i * t.x,
            y: (1 - i) * e.y + i * t.y
        };
    }
    pointAtDistanceFromSecondPoint(e, t, n, r) {
        var a = this.distance2Points(e, t);
        return this.pointAtDistance(e, t, a - n, r);
    }
    pointAtDistanceQuadratic(e, t, n) {
        return this.pointAtDistanceCubic(this.quadraticToCubic(e), t, n);
    }
    pointAtDistanceCubic(e, t, n) {
        var r;
        if (n = n || 0, t <= 0) {
            return (r = new Bezier(e.p1, e.cp, e.cp2, e.p2)).offset(t / r.length(), -n);
        }
        if (t >= (r = new Bezier(e.p1, e.cp, e.cp2, e.p2)).length()) {
            return r.offset(t / r.length(), -n);
        }
        var a = jsBezier.locationAlongCurveFrom([e.p2, e.cp2, e.cp, e.p1], 0, t);
        return r.offset(a, -n);
    }
    ratioFromDistance(e, t, n) {
        return this.isLineData(e) ? t / (n = n || this.distance2Points(e.p1, e.p2)) : this.bezierRatioFromDistance(e, t);
    }
    bezierRatioFromDistance(e, t) {
        return this.isCubicBezierData(e) ? jsBezier.locationAlongCurveFrom([e.p2, e.cp2, e.cp, e.p1], 0, t) : jsBezier.locationAlongCurveFrom([e.p2, e.cp, e.p1], 0, t);
    }
    pointAtDistanceFromSecondPointCubic(e, t, n) {
        var r = this.cubicBezierLength(e);
        return this.pointAtDistanceCubic(e, r - t, n);
    }
    angleFrom2Points(e, t, n, r) {
        var a = r - t;
        var i = n - e;
        var o = Math.atan2(a, i);
        return o = o * (180 / Math.PI);
    }
    angleFrom2Points360P(e, t) {
        return this.angleFrom2Points360(e.x, e.y, t.x, t.y);
    }
    angleFrom2Points360(e, t, n, r) {
        var a = this.angleFrom2Points(e, t, n, r);
        return a < 0 && (a = 360 + a),
        this.round2(a);
    }
    angleEndPointOfQuadraticLine360(e, t, n) {
        var r = (new Bezier(e, t, n)).derivative(1);
        var a = 180 * Math.atan2(r.y, r.x) / Math.PI;
        return a < 0 && (a = 360 + a),
        this.round2(a);
    }
    angleStartPointOfQuadraticLine360(e, t, n) {
        var r = (new Bezier(e, t, n)).derivative(0);
        var a = 180 * Math.atan2(r.y, r.x) / Math.PI;
        return a < 0 && (a = 360 + a),
        this.round2(a);
    }
    angleEndPointOfCubicLine360(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var n = (new Bezier(e.p1, e.cp, e.cp2, e.p2)).derivative(1 - t);
        var r = 180 * Math.atan2(n.y, n.x) / Math.PI;
        return r < 0 && (r = 360 + r),
        this.round2(r);
    }
    angleEndPointOfCubicLine360Distance(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
        var n = this.pointAtDistanceFromSecondPointCubic(e, t);
        var r = this.angleFrom2Points360(n.x, n.y, e.p2.x, e.p2.y);
        return this.round2(r);
    }
    angleStartPointOfCubicLine360(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var n = (new Bezier(e.p1, e.cp, e.cp2, e.p2)).derivative(0 + t);
        var r = 180 * Math.atan2(n.y, n.x) / Math.PI;
        return r < 0 && (r = 360 + r),
        this.round2(r);
    }
    angleStartPointOfCubicLine360Distance(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
        var n = this.pointAtDistanceCubic(e, t);
        var r = this.angleFrom2Points360(e.p1.x, e.p1.y, n.x, n.y);
        return this.round2(r);
    }
    round2(e) {
        return Math.round(100 * e) / 100;
    }
    floor2(e) {
        return Math.floor(100 * e) / 100;
    }
    round4(e) {
        return Math.round(1E4 * e) / 1E4;
    }
    toRadians(e) {
        return e * (Math.PI / 180);
    }
    toDegree(e) {
        return e * (180 / Math.PI);
    }
    angleFrom3Points360(e, t, n) {
        var r = this.angleFrom2Points360(n.x, n.y, e.x, e.y);
        r = 0 === r ? 360 : r;
        var a = this.angleFrom2Points360(n.x, n.y, t.x, t.y);
        var i = (a = 0 === a ? 360 : a) - r;
        return i < 0 && (i = 360 + i),
        i;
    }
    angleDifferentFrom3Points180(e, t, n) {
        var r = this.angleFrom3Points360(e, t, n);
        return r > 180 && (r = 360 - r),
        r;
    }
    parallelLine(e, t, n) {
        var r = this.calcTranslationExact(n, e, t);
        return {
            p1: this.addToPoint(e, r),
            p2: this.addToPoint(t, r)
        };
    }
    toRelativeControlPointCubic(e) {
        return PropUpdateHelper.update(e, {
            cp: {
                dx: e.cp.x - e.p1.x,
                dy: e.cp.y - e.p1.y
            },
            cp2: {
                dx: e.cp2.x - e.p2.x,
                dy: e.cp2.y - e.p2.y
            }
        });
    }
    toAbsoluteControlPointCubic(e) {
        return PropUpdateHelper.update(e, {
            cp: {
                x: e.cp.dx + e.p1.x,
                y: e.cp.dy + e.p1.y
            },
            cp2: {
                x: e.cp2.dx + e.p2.x,
                y: e.cp2.dy + e.p2.y
            }
        });
    }
    toAbsoluteControlPointCubics(e) {
        return _.map(e, (e) => {
            return this.toAbsoluteControlPointCubic(e);
        });
    }
    setAbsoluteCpForBezier(e, t, n) {
        return t && (e = PropUpdateHelper.setProp(e, "cp", {
            dx: t.x - e.p1.x,
            dy: t.y - e.p1.y
        })),
        n && (e = PropUpdateHelper.setProp(e, "cp2", {
            dx: n.x - e.p2.x,
            dy: n.y - e.p2.y
        })),
        e;
    }
    toRelativeControlPoint(e, t, n) {
        var r = this.angleFrom3Points360(e, n, t);
        var a = this.distance2Points(t, e);
        var i = this.distance2Points(t, n);
        return {
            dh: Math.sin(this.toRadians(r)) * a,
            df: Math.cos(this.toRadians(r)) * a / i
        };
    }
    toAbsoluteConnectionControlPoint(e, t, n) {
        var r = e.df * this.distance2Points(t, n);
        var a = Math.sqrt(e.dh * e.dh + r * r);
        var i = this.angleFrom2Points360(t.x, t.y, n.x, n.y);
        var o = Math.atan2(e.dh, r);
        var s = this.toRadians(i) - o;
        var l = +(t.x + Math.cos(s) * a).toFixed(5);
        var c = +(t.y + Math.sin(s) * a).toFixed(5);
        return {
            x: this.round2(l),
            y: this.round2(c)
        };
    }
    parallelCubicBezier(e, t) {
        var n = (new Bezier(e.p1, e.cp, e.cp2, e.p2)).offset(-t);
        return _.map(n, (e) => {
            return {
                p1: e.points[0],
                cp: e.points[1],
                cp2: e.points[2],
                p2: e.points[3]
            };
        });
    }
    roundPoint(e) {
        return {
            x: this.round2(e.x),
            y: this.round2(e.y)
        };
    }
    roundLine(e) {
        return {
            p1: this.roundPoint(e.p1),
            p2: this.roundPoint(e.p2)
        };
    }
    roundQuadraticBezier(e) {
        return {
            p1: this.roundPoint(e.p1),
            cp: this.roundPoint(e.cp),
            p2: this.roundPoint(e.p2)
        };
    }
    roundCubicBezier(e) {
        return {
            p1: this.roundPoint(e.p1),
            cp: this.roundPoint(e.cp),
            cp2: this.roundPoint(e.cp2),
            p2: this.roundPoint(e.p2)
        };
    }
    roundPath(e) {
        var t = {
            p1: this.roundPoint(e.p1),
            p2: this.roundPoint(e.p2)
        };
        return e.cp && (t.cp = this.roundPoint(e.cp)),
        e.cp2 && (t.cp2 = this.roundPoint(e.cp2)),
        t;
    }
    addToPoint(e, t) {
        return {
            x: e.x + t.dx,
            y: e.y + t.dy
        };
    }
    calcTranslationExact(e, t, n) {
        var r;
        var a;
        var i = n.x - t.x;
        var o = n.y - t.y;
        if (0 === o) {
            if (t.x < n.x) {
                r = 0;
                a = -e;
            } else {
                r = 0;
                a = e;
            }
        } else {
            if (t.x === n.x && t.y < n.y) {
                r = e;
                a = 0;
            } else {
                if (t.y < n.y && t.x < n.x) {
                    var s = Math.atan(i / o);
                    r = e * Math.cos(s);
                    a = -e * Math.sin(s);
                } else {
                    if (t.y < n.y && t.x > n.x) {
                        var l = Math.atan(i / o);
                        r = e * Math.cos(l);
                        a = -e * Math.sin(l);
                    } else {
                        var c = Math.atan(i / o);
                        r = -e * Math.cos(c);
                        a = e * Math.sin(c);
                    }
                }
            }
        }
        return {
            dx: r,
            dy: a
        };
    }
    intersectRayRay(e, t, n, r) {
        var a = p.intersectRayRay(e, t, n, r);
        return a ? a.points[0] : null;
    }
    intersectLineToLine(e, t) {
        var n = p.intersectLineLine(this.pointToPoint2D(e.p1), this.pointToPoint2D(e.p2), this.pointToPoint2D(t.p1), this.pointToPoint2D(t.p2));
        return n ? n.points : [];
    }
    intersectLineToEllipse(e, t) {
        var n = p.intersectEllipseLine(this.pointToPoint2D(t.cp), t.rx, t.ry, this.pointToPoint2D(e.p1), this.pointToPoint2D(e.p2));
        return n ? n.points : [];
    }
    intersectBezierToEllipse(e, t) {
        var n = p.intersectBezier3Ellipse(this.pointToPoint2D(e.p1), this.pointToPoint2D(e.cp), this.pointToPoint2D(e.cp2), this.pointToPoint2D(e.p2), this.pointToPoint2D(t.cp), t.rx, t.ry);
        return n ? n.points : [];
    }
    intersectEllipseToEllipse(e, t) {
        var n = p.intersectEllipseEllipse(this.pointToPoint2D(e.cp), e.rx, e.ry, this.pointToPoint2D(t.cp), t.rx, t.ry);
        return n ? n.points : [];
    }
    intersectCubicBezierLineToLine(e, t) {
        var n = p.intersectBezier3Line(this.pointToPoint2D(e.p1), this.pointToPoint2D(e.cp), this.pointToPoint2D(e.cp2), this.pointToPoint2D(e.p2), this.pointToPoint2D(t.p1), this.pointToPoint2D(t.p2));
        return n ? n.points : [];
    }
    pointToPoint2D(e) {
        return new m(e.x, e.y);
    }
    intersectCubicBezierLineToCubicBezier(e, t) {
        var n = p.intersectBezier3Bezier3(this.pointToPoint2D(e.p1), this.pointToPoint2D(e.cp), this.pointToPoint2D(e.cp2), this.pointToPoint2D(e.p2), this.pointToPoint2D(t.p1), this.pointToPoint2D(t.cp), this.pointToPoint2D(t.cp2), this.pointToPoint2D(t.p2));
        return n ? n.points : [];
    }
    expandMaxRectBounding(e, t) {
        return null == e ? t : null == t ? e : {
            left: Math.min(e.left, t.left),
            top: Math.min(e.top, t.top),
            right: Math.max(e.right, t.right),
            bottom: Math.max(e.bottom, t.bottom)
        };
    }
    extendRect(e, t) {
        return {
            left: e.left - t,
            top: e.top - t,
            width: e.width + 2 * t,
            height: e.height + 2 * t,
            right: e.right + t,
            bottom: e.bottom + t
        };
    }
    extendRectDown(e, t) {
        return {
            left: e.left,
            top: e.top,
            width: e.width,
            height: e.height + t,
            right: e.right,
            bottom: e.bottom + t
        };
    }
    extendRectUpDown(e, t) {
        return {
            left: e.left,
            top: e.top - t,
            width: e.width,
            height: e.height + 2 * t,
            right: e.right,
            bottom: e.bottom + t
        };
    }
    reflectPointOverLine(e, t, n) {
        var r;
        var a;
        var i;
        var o;
        return i = ((r = n.x - t.x) * r - (a = n.y - t.y) * a) / (r * r + a * a),
        o = 2 * r * a / (r * r + a * a),
        {
            x: Math.round(i * (e.x - t.x) + o * (e.y - t.y) + t.x),
            y: Math.round(o * (e.x - t.x) - i * (e.y - t.y) + t.y)
        };
    }
    getMiddlePointQuadraticLine(e, t, n, r, a) {
        return (new Bezier(e, t, n)).offset(r, -a);
    }
    clampPoint(e, t, n) {
        return {
            x: _.clamp(e.x, t.x, n.x),
            y: _.clamp(e.y, t.y, n.y)
        };
    }
    clampPoints(e, t, n) {
        return e.map((e) => {
            return this.clampPoint(e, t, n);
        });
    }
    toFlattenPoint(e) {
        return e instanceof Flatten.Point ? e : new Flatten.Point(e.x, e.y);
    }
    toRectInfo(e) {
        return {
            left: e.p1.x,
            top: e.p1.y,
            width: e.p2.x - e.p1.x,
            height: e.p2.y - e.p1.y
        };
    }
    addRotation360() {
        var e = ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0) + (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0)) % 360;
        return e < 0 ? 360 + e : e;
    }
    moveRectBy2Points(e, t, n) {
        var r = this.substractPoint(n, t);
        return _.assignIn({},
        e, {
            p1: this.addPoint(e.p1, r),
            p2: this.addPoint(e.p2, r)
        });
    }
    absoluteToRelativePoint(e, t, n, r) {
        return {
            x: (t.x - e.x) / n,
            y: (t.y - e.y) / r
        };
    }
    relativeToAbsolutePoint(e, t, n, r) {
        return {
            x: e.x + n * t.x,
            y: e.y + r * t.y
        };
    }
    distanceFromVector(e) {
        return Math.sqrt(e.x * e.x + e.y * e.y);
    }
}

export default Geometry