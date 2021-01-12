import React from 'react';
import SvgCreator from './SvgCreator';

/// xxx(286) /*ParenthesisSvgCreater*/

/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(128)/*SvgCreator*/;  // 3 times
var o = new SvgCreator;
o.push("M 389,0");
o.push("q 0 -7 -6 -7");
o.push("q -2 0 -6 2");
o.push("q -74 47 -129 110.5");
o.push("t -101 159.5");
o.push("t -70 236.5");
o.push("t -24 322.5");
o.push("v 53");
o.push("h 99");
o.push("v -53");
o.push("q 0 -102 3 -177");
o.push("t 16.5 -174");
o.push("t 36.5 -173");
o.push("t 67 -148.5");
o.push("t 105 -126.5");
o.push("q 9 -8 9 -25");
var s = 877,
l = 389,
c = 1e3;
function d(e, t, n) {
    var r = n / 10,
    l = Math.min(n / c, (t - 2 * r) / (2 * s)),
    d = n / c,
    h = t - r,
    u = o.scale(d, l).shift(0, r),
    p = o.scale(d, l).flipY().shift(0, h);
    if (l < d) {
        u = u.curveScaleX(.8, 1);
        p = p.curveScaleX(.8, 1)
    }
    var m = l < d ? 0 : Math.max((t - 2 * r) / l - 2 * s, 0),
    f = new SvgCreator;
    f.pushArr(["M 53 0", "v ".concat(m, " "), "h 99", "v ".concat(-m)]);
    var g = f.scale(d, l).shift(0, s * l + r);
    return [React.createElement("path", {
        key: "0",
        d: "".concat(u.path(), " z  ").concat(g.path(), " z"),
        stroke: "none"
    }), React.createElement("path", {
        key: "1",
        d: "".concat(p.path(), " z"),
        stroke: "none"
    })]
}
function h(e, t, n) {
    var r = n / 10,
    d = Math.min(n / c, (t - 2 * r) / (2 * s)),
    h = n / c,
    u = t - r,
    p = (l + 70) * h;
    d < h && (p += .5);
    var m = o.scale(h, d).shift(-p, r).flipX(),
    f = o.scale(h, d).flipY().shift(-p, u).flipX();
    if (d < h) {
        m = m.curveScaleX(.8, 1);
        f = f.curveScaleX(.8, 1)
    };
    var g = d < h ? 0 : Math.max((t - 2 * r) / d - 2 * s, 0),
    y = new SvgCreator;
    y.pushArr(["M 53 0", "v ".concat(g, " "), "h 99", "v ".concat(-g)]);
    var A = y.scale(h, d).shift(-p, s * d + r).flipX();
    return [React.createElement("path", {
        key: "0",
        d: "".concat(m.path(), " z ").concat(A.path(), " z"),
        stroke: "none"
    }), React.createElement("path", {
        key: "1",
        d: "".concat(f.path(), " z"),
        stroke: "none"
    })]
}

export { h as ParenthesisSvgCreaterB }

export default d