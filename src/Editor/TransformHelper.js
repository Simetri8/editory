import _ from 'lodash';

/// xxx(70) /*TransformHelper*/
/*"function"==typeof Symbol&&Symbol.iterator;*/
function r(e) {
    return void 0 === e
}
function a(e) {
    return {
        a: 1,
        c: 0,
        e: e,
        b: 0,
        d: 1,
        f: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
    }
}
function i() {
    var e = arguments.length;
    var t = Array(e);
    for (var n = 0; n < e; n++) t[n] = arguments[n];
    var r, a = function (e, t) {
        return {
            a: e.a * t.a + e.c * t.b,
            c: e.a * t.c + e.c * t.d,
            e: e.a * t.e + e.c * t.f + e.e,
            b: e.b * t.a + e.d * t.b,
            d: e.b * t.c + e.d * t.d,
            f: e.b * t.e + e.d * t.f + e.f
        }
    };
    switch ((t = Array.isArray(t[0]) ? t[0] : t).length) {
    case 0:
        throw new Error("no matrices provided");
    case 1:
        return t[0];
    case 2:
        return a(t[0], t[1]);
    default:
        var o = (r = t, Array.isArray(r) ? r : Array.from(r)),
        s = o[0],
        l = o[1],
        c = o.slice(2),
        d = a(s, l);
        return i.apply(void 0, [d].concat(function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        } (c)))
    }
}
var o = Math.cos,
s = Math.sin,
l = Math.PI;
function c(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
    return function (e, t, n) {
        var l = o(e),
        c = s(e),
        d = {
            a: l,
            c: -c,
            e: 0,
            b: c,
            d: l,
            f: 0
        };
        return r(t) || r(n) ? d : i([a(t, n), d, a(-t, -n)])
    } (e * l / 180, t, n)
}
var d = Math.tan;
function h(e, t) {
    return function (e, t) {
        return {
            a: 1,
            c: d(e),
            e: 0,
            b: d(t),
            d: 1,
            f: 0
        }
    } (e * Math.PI / 180, t * Math.PI / 180)
}
function u(e) {
    return "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")"
}
/// var p = n(2)/*lodash*/,  // 1 times
/// m = n.n(p);
/*n.d(t, "a", function () {
    return f
});*/
class f {
    constructor(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        this.transforms = [];
        this.getMappedMatrix = (e => {
            var t = null;
            switch (e.type) {
            case "rotation":
                t = c(e.value, e.cx, e.cy);
                break;
            case "scale":
                t = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                    return r(t) && (t = e),
                    {
                        a: e,
                        c: 0,
                        e: 0,
                        b: 0,
                        d: t,
                        f: 0
                    }
                } (e.x, e.y);
                break;
            case "skew":
                t = h(e.x, e.y);
                break;
            case "translate":
                t = a(e.x, e.y)
            }
            return this.originValue && "translate" != e.type ? this.wrapAroundOrigin(t) : [t]
        });
        this.originValue = e;
        this.transforms = t
    }
    orgin(e, t) {
        return new f({
            x: e,
            y: t
        },
        this.transforms)
    }
    rotate() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "deg";
        return e ? new f(this.originValue, this.transforms.concat({
            type: "rotation",
            value: e,
            unit: t
        })) : this
    }
    rotateAround(e, t, n, r) {
        return e ? new f(this.originValue, this.transforms.concat({
            type: "rotation",
            value: e,
            unit: r,
            cx: t,
            cy: n
        })) : this
    }
    skew() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "deg";
        return e || t ? new f(this.originValue, this.transforms.concat({
            type: "skew",
            x: e,
            y: t,
            unit: n
        })) : this
    }
    translate() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return e || t ? new f(this.originValue, this.transforms.concat({
            type: "translate",
            x: e,
            y: t
        })) : this
    }
    scale() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
        t = arguments.length > 1 ? arguments[1] : void 0;
        return 1 != e || 1 != t && void 0 !== t ? new f(this.originValue, this.transforms.concat({
            type: "scale",
            x: e,
            y: t
        })) : this
    }
    wrapAroundOrigin(e) {
        return [a(this.originValue.x, this.originValue.y), e, a(-this.originValue.x, -this.originValue.y)]
    }
    transformResult() {
        var e = _.flatMap(this.transforms, this.getMappedMatrix);
        return e.length <= 0 ? null : i(...e)
    }
    toCssStyle() {
        var e = this.transformResult();
        return e ? u(e) : null
    }
    toSVG() {
        var e = this.transformResult();
        return e ? u(e) : null
    }
}

export default f