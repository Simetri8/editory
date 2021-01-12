
var LatexParserCore;
/// xxx(708) /*LatexParserCore*/

function r(e, t, n, a) {
    this.message = e;
    this.expected = t;
    this.found = n;
    this.location = a;
    this.name = "SyntaxError";
    if ("function" === typeof Error.captureStackTrace) {
        Error.captureStackTrace(this, r);
    }
}
function runNow(e, t) {
    function n() {
        this.constructor = e;
    }
    n.prototype = t.prototype;
    e.prototype = new n;
}
runNow(r, Error);
r.buildMessage = function (e, t) {
    function r(e) {
        return e.charCodeAt(0).toString(16).toUpperCase();
    }
    function a(e) {
        return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (e) {
            return "\\x0" + r(e);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (e) {
            return "\\x" + r(e);
        });
    }
    function i(e) {
        return e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (e) {
            return "\\x0" + r(e);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (e) {
            return "\\x" + r(e);
        });
    }
    var n = {
        literal: function (e) {
            return '"' + a(e.text) + '"';
        },
        class: function (e) {
            var t;
            var n = "";
            t = 0;
            for (; t < e.parts.length; t++) {
                n = n + (e.parts[t] instanceof Array ? i(e.parts[t][0]) + "-" + i(e.parts[t][1]) : i(e.parts[t]));
            }
            return "[" + (e.inverted ? "^" : "") + n + "]";
        },
        any: function (e) {
            return "any character";
        },
        end: function (e) {
            return "end of input";
        },
        other: function (e) {
            return e.description;
        }
    };
    return "Expected " +
    function (e) {
        var t;
        var r;
        var a;
        var i = new Array(e.length);
        t = 0;
        for (; t < e.length; t++) {
            i[t] = (a = e[t], n[a.type](a));
        }
        if (i.sort(), i.length > 0) {
            t = 1;
            r = 1;
            for (; t < i.length; t++) {
                if (i[t - 1] !== i[t]) {
                    i[r] = i[t];
                    r++;
                }
            }
            i.length = r;
        }
        switch (i.length) {
        case 1:
            return i[0];
        case 2:
            return i[0] + " or " + i[1];
        default:
            return i.slice(0, -1).join(",") + ",or " + i[i.length - 1];
        }
    } (e) + " but " +
    function (e) {
        return e ? '"' + a(e) + '"' : "end of input";
    } (t) + " found.";
};
LatexParserCore = {
    SyntaxError: r,
    parse: function (e, t) {
        function Io() {
            return e.substring(Eo, Ao);
        }
        function To(e, t) {
            return {
                type: "literal",
                text: e,
                ignoreCase: t
            };
        }
        function bo(e, t, n) {
            return {
                type: "class",
                parts: e,
                inverted: t,
                ignoreCase: n
            };
        }
        function Lo(t) {
            var n;
            var r = vo[t];
            if (r) {
                return r;
            }
            n = t - 1;
            for (; ! vo[n];) {
                n--;
            }
            r = {
                line: (r = vo[n]).line,
                column: r.column
            };
            for (; n < t;) {
                if (10 === e.charCodeAt(n)) {
                    r.line++;
                    r.column = 1;
                } else {
                    r.column++;
                }
                n++;
            }
            return vo[t] = r,
            r;
        }
        function Ro(e, t) {
            var n = Lo(e);
            var r = Lo(t);
            return {
                start: {
                    offset: e,
                    line: n.line,
                    column: n.column
                },
                end: {
                    offset: t,
                    line: r.line,
                    column: r.column
                }
            };
        }
        function Mo(e) {
            if (! (Ao < So)) {
                if (Ao > So) {
                    So = Ao;
                    Co = [];
                }
                Co.push(e);
            }
        }
        function wo(e, t, n) {
            return new r(r.buildMessage(e, t), e, t, n);
        }
        function Oo() {
            var t;
            var n;
            t = [];
            if (f.test(e.charAt(Ao))) {
                n = e.charAt(Ao);
                Ao++;
            } else {
                n = a;
                if (0 === xo) {
                    Mo(g);
                }
            }
            for (; n !== a;) {
                t.push(n);
                if (f.test(e.charAt(Ao))) {
                    n = e.charAt(Ao);
                    Ao++;
                } else {
                    n = a;
                    if (0 === xo) {
                        Mo(g);
                    }
                }
            }
            return t;
        }
        function Do() {
            var t;
            var n;
            var r;
            if (t = Ao, n = [], x.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(I)), r !== a) {
                for (; r !== a;) {
                    n.push(r);
                    if (x.test(e.charAt(Ao))) {
                        r = e.charAt(Ao);
                        Ao++;
                    } else {
                        r = a;
                        if (0 === xo) {
                            Mo(I);
                        }
                    }
                }
            } else {
                n = a;
            }
            return n !== a && (Eo = t, n = y()),
            t = n;
        }
        function No() {
            var t;
            var n;
            return t = Ao,
            e.substr(Ao, 2) === T ? (n = T, Ao = Ao + 2) : (n = a, 0 === xo && Mo(b)),
            n === a && (e.substr(Ao, 2) === L ? (n = L, Ao = Ao + 2) : (n = a, 0 === xo && Mo(R)), n === a && (e.substr(Ao, 2) === M ? (n = M, Ao = Ao + 2) : (n = a, 0 === xo && Mo(w)), n === a && (e.substr(Ao, 2) === O ? (n = O, Ao = Ao + 2) : (n = a, 0 === xo && Mo(D)), n === a && (e.substr(Ao, 2) === N ? (n = N, Ao = Ao + 2) : (n = a, 0 === xo && Mo(k)), n === a && (e.substr(Ao, 2) === B ? (n = B, Ao = Ao + 2) : (n = a, 0 === xo && Mo(P)), n === a && (e.substr(Ao, 2) === F ? (n = F, Ao = Ao + 2) : (n = a, 0 === xo && Mo(H)))))))),
            n !== a && (Eo = t, n = _()),
            t = n;
        }
        function ko() {
            var t;
            return (t = function () {
                var t;
                var n;
                var r;
                var i;
                if (t = Ao, 92 === e.charCodeAt(Ao) ? (n = U, Ao++) : (n = a, 0 === xo && Mo(W)), n !== a) {
                    if (r = [], 32 === e.charCodeAt(Ao) ? (i = G, Ao++) : (i = a, 0 === xo && Mo(z)), i !== a) {
                        for (; i !== a;) {
                            r.push(i);
                            if (32 === e.charCodeAt(Ao)) {
                                i = G;
                                Ao++;
                            } else {
                                i = a;
                                if (0 === xo) {
                                    Mo(z);
                                }
                            }
                        }
                    } else {
                        r = a;
                    }
                    if (r !== a) {
                        Eo = t;
                        t = n = C();
                    } else {
                        Ao = t;
                        t = a;
                    }
                } else {
                    Ao = t;
                    t = a;
                }
                return t;
            } ()) === a && (t = function () {
                var t;
                var n;
                return t = Ao,
                e.substr(Ao, 2) === Y ? (n = Y, Ao = Ao + 2) : (n = a, 0 === xo && Mo(K)),
                n !== a && (Eo = t, n = C()),
                t = n;
            } ()) === a && (t = function () {
                var t;
                var n;
                return t = Ao,
                e.substr(Ao, 2) === V ? (n = V, Ao = Ao + 2) : (n = a, 0 === xo && Mo(j)),
                n !== a && (Eo = t, n = C()),
                t = n;
            } ()) === a && (t = function () {
                var t;
                var n;
                return t = Ao,
                e.substr(Ao, 2) === q ? (n = q, Ao = Ao + 2) : (n = a, 0 === xo && Mo(Q)),
                n !== a && (Eo = t, n = C()),
                t = n;
            } ()) === a && (t = function () {
                var t;
                var n;
                return t = Ao,
                e.substr(Ao, 2) === Z ? (n = Z, Ao = Ao + 2) : (n = a, 0 === xo && Mo(X)),
                n !== a && (Eo = t, n = y()),
                t = n;
            } ()) === a && (t = function () {
                var t;
                var n;
                return t = Ao,
                e.substr(Ao, 5) === J ? (n = J, Ao = Ao + 5) : (n = a, 0 === xo && Mo($)),
                n !== a && (Eo = t, n = ee()),
                t = n;
            } ()) === a && (t = function () {
                var t;
                var n;
                return t = Ao,
                e.substr(Ao, 6) === te ? (n = te, Ao = Ao + 6) : (n = a, 0 === xo && Mo(ne)),
                n !== a && (Eo = t, n = re()),
                t = n;
            } ()),
            t;
        }
        function Bo() {
            return function () {
                var e;
                var t;
                var n;
                e = Ao;
                t = [];
                if ((n = Wo()) === a && (n = Uo()) === a && (n = Fo()) === a && (n = Ho()) === a && (n = Po()) === a && (n = _o()) === a) {
                    n = Ko();
                }
                for (; n !== a;) {
                    t.push(n);
                    if ((n = Wo()) === a && (n = Uo()) === a && (n = Fo()) === a && (n = Ho()) === a && (n = Po()) === a && (n = _o()) === a) {
                        n = Ko();
                    }
                }
                return t !== a && (Eo = e, t = ae(t)),
                e = t;
            } ();
        }
        function Po() {
            var e;
            var t;
            var n;
            if (e = Ao, t = [], (n = Yo()) === a && (n = Go()), n !== a) {
                for (; n !== a;) {
                    t.push(n);
                    if ((n = Yo()) === a) {
                        n = Go();
                    }
                }
            } else {
                t = a;
            }
            return t !== a ? ((n = Ko()) === a && (n = null), n !== a ? (Eo = e, e = t = ie(t)) : (Ao = e, e = a)) : (Ao = e, e = a),
            e;
        }
        function Fo() {
            var t;
            var n;
            var r;
            var i;
            var o;
            var f;
            var g;
            var y;
            var A;
            var E;
            var v;
            return t = Ao,
            e.substr(Ao, 6) === h ? (n = h, Ao = Ao + 6) : (n = a, 0 === xo && Mo(u)),
            n !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (r = s, Ao++) : (r = a, 0 === xo && Mo(l)), r !== a && Oo() !== a ? (e.substr(Ao, 6) === oe ? (i = oe, Ao = Ao + 6) : (i = a, 0 === xo && Mo(se)), i === a && (e.substr(Ao, 5) === le ? (i = le, Ao = Ao + 5) : (i = a, 0 === xo && Mo(ce)), i === a && (e.substr(Ao, 7) === de ? (i = de, Ao = Ao + 7) : (i = a, 0 === xo && Mo(he)), i === a && (e.substr(Ao, 6) === ue ? (i = ue, Ao = Ao + 6) : (i = a, 0 === xo && Mo(pe))))), i !== a && Oo() !== a ? (125 === e.charCodeAt(Ao) ? (o = c, Ao++) : (o = a, 0 === xo && Mo(d)), o !== a && Oo() !== a && (f = ys()) !== a && Oo() !== a ? (e.substr(Ao, 4) === p ? (g = p, Ao = Ao + 4) : (g = a, 0 === xo && Mo(m)), g !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (y = s, Ao++) : (y = a, 0 === xo && Mo(l)), y !== a && Oo() !== a ? (e.substr(Ao, 6) === oe ? (A = oe, Ao = Ao + 6) : (A = a, 0 === xo && Mo(se)), A === a && (e.substr(Ao, 5) === le ? (A = le, Ao = Ao + 5) : (A = a, 0 === xo && Mo(ce)), A === a && (e.substr(Ao, 7) === de ? (A = de, Ao = Ao + 7) : (A = a, 0 === xo && Mo(he)), A === a && (e.substr(Ao, 6) === ue ? (A = ue, Ao = Ao + 6) : (A = a, 0 === xo && Mo(pe))))), A !== a ? (125 === e.charCodeAt(Ao) ? (E = c, Ao++) : (E = a, 0 === xo && Mo(d)), E !== a ? ((v = Ko()) === a && (v = null), v !== a ? (Eo = t, t = n = me(i, f)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function Ho() {
            var e;
            var t;
            return e = Ao,
            (t = $o()) === a && (t = es()),
            t !== a && (Eo = e, t = fe(t)),
            e = t;
        }
        function _o() {
            var t;
            var n;
            var r;
            var i;
            if (t = Ao, 92 === e.charCodeAt(Ao) ? (n = U, Ao++) : (n = a, 0 === xo && Mo(W)), n !== a) {
                r = [];
                i = zo();
                for (; i !== a;) {
                    r.push(i);
                    i = zo();
                }
                if (r !== a) {
                    Eo = t;
                    t = n = ge(r);
                } else {
                    Ao = t;
                    t = a;
                }
            } else {
                Ao = t;
                t = a;
            }
            return t;
        }
        function Uo() {
            var t;
            var n;
            var r;
            var i;
            var o;
            var f;
            var g;
            var y;
            var A;
            var E;
            var v;
            return t = Ao,
            e.substr(Ao, 6) === h ? (n = h, Ao = Ao + 6) : (n = a, 0 === xo && Mo(u)),
            n !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (r = s, Ao++) : (r = a, 0 === xo && Mo(l)), r !== a && Oo() !== a ? (e.substr(Ao, 9) === ye ? (i = ye, Ao = Ao + 9) : (i = a, 0 === xo && Mo(Ae)), i === a && (e.substr(Ao, 8) === Ee ? (i = Ee, Ao = Ao + 8) : (i = a, 0 === xo && Mo(ve)), i === a && (e.substr(Ao, 4) === Se ? (i = Se, Ao = Ao + 4) : (i = a, 0 === xo && Mo(Ce)))), i !== a && Oo() !== a ? (125 === e.charCodeAt(Ao) ? (o = c, Ao++) : (o = a, 0 === xo && Mo(d)), o !== a && Oo() !== a && (f = jo()) !== a && Oo() !== a ? (e.substr(Ao, 4) === p ? (g = p, Ao = Ao + 4) : (g = a, 0 === xo && Mo(m)), g !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (y = s, Ao++) : (y = a, 0 === xo && Mo(l)), y !== a && Oo() !== a ? (e.substr(Ao, 9) === ye ? (A = ye, Ao = Ao + 9) : (A = a, 0 === xo && Mo(Ae)), A === a && (e.substr(Ao, 8) === Ee ? (A = Ee, Ao = Ao + 8) : (A = a, 0 === xo && Mo(ve)), A === a && (e.substr(Ao, 4) === Se ? (A = Se, Ao = Ao + 4) : (A = a, 0 === xo && Mo(Ce)))), A !== a ? (125 === e.charCodeAt(Ao) ? (E = c, Ao++) : (E = a, 0 === xo && Mo(d)), E !== a ? ((v = Ko()) === a && (v = null), v !== a ? (Eo = t, t = n = xe(i, f)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function Wo() {
            var t;
            var n;
            var r;
            var i;
            var o;
            return t = Ao,
            e.substr(Ao, 2) === Ie ? (n = Ie, Ao = Ao + 2) : (n = a, 0 === xo && Mo(Te)),
            n !== a && Oo() !== a && (r = jo()) !== a && Oo() !== a ? (e.substr(Ao, 2) === Ie ? (i = Ie, Ao = Ao + 2) : (i = a, 0 === xo && Mo(Te)), i !== a ? ((o = Ko()) === a && (o = null), o !== a ? (Eo = t, t = n = be(n, r)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function Go() {
            var t;
            var n;
            var r;
            var i;
            var o;
            var s;
            var l;
            var c;
            return t = Ao,
            n = Ao,
            36 === e.charCodeAt(Ao) ? (r = Le, Ao++) : (r = a, 0 === xo && Mo(Re)),
            r !== a ? (i = Ao, xo++, 36 === e.charCodeAt(Ao) ? (o = Le, Ao++) : (o = a, 0 === xo && Mo(Re)), xo--, o === a ? i = void 0 : (Ao = i, i = a), i !== a ? n = r = [r, i] : (Ao = n, n = a)) : (Ao = n, n = a),
            n !== a && (r = Oo()) !== a && (i = jo()) !== a && (o = Oo()) !== a ? (36 === e.charCodeAt(Ao) ? (s = Le, Ao++) : (s = a, 0 === xo && Mo(Re)), s !== a ? (l = Ao, xo++, 36 === e.charCodeAt(Ao) ? (c = Le, Ao++) : (c = a, 0 === xo && Mo(Re)), xo--, c === a ? l = void 0 : (Ao = l, l = a), l !== a ? (Eo = t, t = n = Me(n, i)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function zo() {
            var t;
            var n;
            var r;
            if (t = Ao, n = [], we.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(Oe)), r !== a) {
                for (; r !== a;) {
                    n.push(r);
                    if (we.test(e.charAt(Ao))) {
                        r = e.charAt(Ao);
                        Ao++;
                    } else {
                        r = a;
                        if (0 === xo) {
                            Mo(Oe);
                        }
                    }
                }
            } else {
                n = a;
            }
            return n !== a && (Eo = t, n = De()),
            t = n;
        }
        function Yo() {
            var e;
            var t;
            return e = Ao,
            (t = zo()) !== a && (Eo = e, t = Ne(t)),
            e = t;
        }
        function Ko() {
            var t;
            var n;
            return t = Ao,
            10 === e.charCodeAt(Ao) ? (n = v, Ao++) : (n = a, 0 === xo && Mo(S)),
            n !== a && (Eo = t, n = ke()),
            t = n;
        }
        function Vo() {
            var t;
            var n;
            var r;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 2) === Be ? (n = Be, Ao = Ao + 2) : (n = a, 0 === xo && Mo(Pe)), n !== a ? ((r = as()) === a && (r = null), r !== a ? (Eo = t, t = Fe(r)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function jo() {
            var e;
            var t;
            var n;
            e = Ao;
            t = [];
            if ((n = Vo()) === a) {
                n = qo();
            }
            for (; n !== a;) {
                t.push(n);
                if ((n = Vo()) === a) {
                    n = qo();
                }
            }
            return t !== a && (Eo = e, t = He(t)),
            e = t;
        }
        function qo() {
            var e;
            var t;
            var n;
            if (e = Ao, t = [], (n = Jo()) === a && (n = Zo()), n !== a) {
                for (; n !== a;) {
                    t.push(n);
                    if ((n = Jo()) === a) {
                        n = Zo();
                    }
                }
            } else {
                t = a;
            }
            return t !== a ? ((n = Vo()) === a && (n = null), n !== a ? (Eo = e, e = t = _e(t, n)) : (Ao = e, e = a)) : (Ao = e, e = a),
            e;
        }
        function Qo() {
            var t;
            var n;
            var r;
            if (t = Ao, n = [], Ue.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(We)), r !== a) {
                for (; r !== a;) {
                    n.push(r);
                    if (Ue.test(e.charAt(Ao))) {
                        r = e.charAt(Ao);
                        Ao++;
                    } else {
                        r = a;
                        if (0 === xo) {
                            Mo(We);
                        }
                    }
                }
            } else {
                n = a;
            }
            return n !== a && (Eo = t, n = De()),
            t = n;
        }
        function Zo() {
            var e;
            var t;
            var n;
            if (e = Ao, t = [], (n = Qo()) === a && (n = ko()) === a && (n = Do()) === a && (n = No()), n !== a) {
                for (; n !== a;) {
                    t.push(n);
                    if ((n = Qo()) === a && (n = ko()) === a && (n = Do()) === a) {
                        n = No();
                    }
                }
            } else {
                t = a;
            }
            return t !== a && (Eo = e, t = Ge(t)),
            e = t;
        }
        function Xo() {
            var e;
            var t;
            var n;
            return (e = ds()) === a && (e = ls()) === a && (e = cs()) === a && (e = ss()) === a && (e = Ao, (t = os()) !== a && (n = is()) !== a ? e = t = [t, n] : (Ao = e, e = a), e === a && (e = us())),
            e;
        }
        function Jo() {
            var t;
            var n;
            return t = Ao,
            (n = ds()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                return t = Ao,
                (n = Oo()) !== a ? (e.substr(Ao, 5) === Cn ? (r = Cn, Ao = Ao + 5) : (r = a, 0 === xo && Mo(xn)), r !== a && Oo() !== a ? (91 === e.charCodeAt(Ao) ? (i = Yt, Ao++) : (i = a, 0 === xo && Mo(Kt)), i === a && (40 === e.charCodeAt(Ao) ? (i = Gt, Ao++) : (i = a, 0 === xo && Mo(zt)), i === a && (e.substr(Ao, 2) === B ? (i = B, Ao = Ao + 2) : (i = a, 0 === xo && Mo(P)), i === a && (124 === e.charCodeAt(Ao) ? (i = Vt, Ao++) : (i = a, 0 === xo && Mo(jt)), i === a && (e.substr(Ao, 2) === Pt ? (i = Pt, Ao = Ao + 2) : (i = a, 0 === xo && Mo(Ft)), i === a && (e.substr(Ao, 7) === In ? (i = In, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Tn)), i === a && (e.substr(Ao, 7) === bn ? (i = bn, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Ln)), i === a && (47 === e.charCodeAt(Ao) ? (i = wt, Ao++) : (i = a, 0 === xo && Mo(Ot)), i === a && (124 === e.charCodeAt(Ao) ? (i = Vt, Ao++) : (i = a, 0 === xo && Mo(jt)), i === a && (60 === e.charCodeAt(Ao) ? (i = Ut, Ao++) : (i = a, 0 === xo && Mo(Wt)), i === a && (e.substr(Ao, 7) === Rn ? (i = Rn, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Mn)), i === a && (e.substr(Ao, 5) === kt ? (i = kt, Ao = Ao + 5) : (i = a, 0 === xo && Mo(Bt)), i === a && (e.substr(Ao, 5) === wn ? (i = wn, Ao = Ao + 5) : (i = a, 0 === xo && Mo(On)), i === a && (e.substr(Ao, 6) === qt ? (i = qt, Ao = Ao + 6) : (i = a, 0 === xo && Mo(Qt)), i === a && (e.substr(Ao, 7) === Zt ? (i = Zt, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Xt)), i === a && (e.substr(Ao, 8) === Jt ? (i = Jt, Ao = Ao + 8) : (i = a, 0 === xo && Mo($t)), i === a && (e.substr(Ao, 8) === en ? (i = en, Ao = Ao + 8) : (i = a, 0 === xo && Mo(tn)), i === a && (e.substr(Ao, 10) === nn ? (i = nn, Ao = Ao + 10) : (i = a, 0 === xo && Mo(rn)), i === a && (e.substr(Ao, 10) === an ? (i = an, Ao = Ao + 10) : (i = a, 0 === xo && Mo(on)), i === a && (e.substr(Ao, 12) === sn ? (i = sn, Ao = Ao + 12) : (i = a, 0 === xo && Mo(ln)), i === a && (e.substr(Ao, 12) === cn ? (i = cn, Ao = Ao + 12) : (i = a, 0 === xo && Mo(dn)), i === a && (46 === e.charCodeAt(Ao) ? (i = Dn, Ao++) : (i = a, 0 === xo && Mo(Nn))))))))))))))))))))))), i !== a && Oo() !== a ? (Eo = t, n = kn(i), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                return t = Ao,
                (n = Oo()) !== a ? (e.substr(Ao, 6) === Bn ? (r = Bn, Ao = Ao + 6) : (r = a, 0 === xo && Mo(Pn)), r !== a && Oo() !== a ? (93 === e.charCodeAt(Ao) ? (i = fn, Ao++) : (i = a, 0 === xo && Mo(gn)), i === a && (41 === e.charCodeAt(Ao) ? (i = pn, Ao++) : (i = a, 0 === xo && Mo(mn)), i === a && (e.substr(Ao, 2) === F ? (i = F, Ao = Ao + 2) : (i = a, 0 === xo && Mo(H)), i === a && (124 === e.charCodeAt(Ao) ? (i = Vt, Ao++) : (i = a, 0 === xo && Mo(jt)), i === a && (e.substr(Ao, 2) === Pt ? (i = Pt, Ao = Ao + 2) : (i = a, 0 === xo && Mo(Ft)), i === a && (e.substr(Ao, 7) === Fn ? (i = Fn, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Hn)), i === a && (e.substr(Ao, 7) === _n ? (i = _n, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Un)), i === a && (e.substr(Ao, 10) === Dt ? (i = Dt, Ao = Ao + 10) : (i = a, 0 === xo && Mo(Nt)), i === a && (124 === e.charCodeAt(Ao) ? (i = Vt, Ao++) : (i = a, 0 === xo && Mo(jt)), i === a && (62 === e.charCodeAt(Ao) ? (i = hn, Ao++) : (i = a, 0 === xo && Mo(un)), i === a && (e.substr(Ao, 7) === Ht ? (i = Ht, Ao = Ao + 7) : (i = a, 0 === xo && Mo(_t)), i === a && (e.substr(Ao, 5) === kt ? (i = kt, Ao = Ao + 5) : (i = a, 0 === xo && Mo(Bt)), i === a && (e.substr(Ao, 5) === wn ? (i = wn, Ao = Ao + 5) : (i = a, 0 === xo && Mo(On)), i === a && (e.substr(Ao, 6) === yn ? (i = yn, Ao = Ao + 6) : (i = a, 0 === xo && Mo(An)), i === a && (e.substr(Ao, 7) === En ? (i = En, Ao = Ao + 7) : (i = a, 0 === xo && Mo(vn)), i === a && (e.substr(Ao, 8) === Jt ? (i = Jt, Ao = Ao + 8) : (i = a, 0 === xo && Mo($t)), i === a && (e.substr(Ao, 8) === en ? (i = en, Ao = Ao + 8) : (i = a, 0 === xo && Mo(tn)), i === a && (e.substr(Ao, 10) === nn ? (i = nn, Ao = Ao + 10) : (i = a, 0 === xo && Mo(rn)), i === a && (e.substr(Ao, 10) === an ? (i = an, Ao = Ao + 10) : (i = a, 0 === xo && Mo(on)), i === a && (e.substr(Ao, 12) === sn ? (i = sn, Ao = Ao + 12) : (i = a, 0 === xo && Mo(ln)), i === a && (e.substr(Ao, 12) === cn ? (i = cn, Ao = Ao + 12) : (i = a, 0 === xo && Mo(dn)), i === a && (46 === e.charCodeAt(Ao) ? (i = Dn, Ao++) : (i = a, 0 === xo && Mo(Nn))))))))))))))))))))))), i !== a && Oo() !== a ? (Eo = t, n = Wn(i), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = es()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                var o;
                var f;
                var g;
                var y;
                var A;
                var E;
                var v;
                return t = Ao,
                (n = Oo()) !== a ? (e.substr(Ao, 6) === h ? (r = h, Ao = Ao + 6) : (r = a, 0 === xo && Mo(u)), r !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (i = s, Ao++) : (i = a, 0 === xo && Mo(l)), i !== a && Oo() !== a ? (e.substr(Ao, 6) === oe ? (o = oe, Ao = Ao + 6) : (o = a, 0 === xo && Mo(se)), o === a && (e.substr(Ao, 5) === le ? (o = le, Ao = Ao + 5) : (o = a, 0 === xo && Mo(ce)), o === a && (e.substr(Ao, 7) === de ? (o = de, Ao = Ao + 7) : (o = a, 0 === xo && Mo(he)), o === a && (e.substr(Ao, 6) === ue ? (o = ue, Ao = Ao + 6) : (o = a, 0 === xo && Mo(pe))))), o !== a ? (125 === e.charCodeAt(Ao) ? (f = c, Ao++) : (f = a, 0 === xo && Mo(d)), f !== a && Oo() !== a && (g = ys()) !== a && Oo() !== a ? (e.substr(Ao, 4) === p ? (y = p, Ao = Ao + 4) : (y = a, 0 === xo && Mo(m)), y !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (A = s, Ao++) : (A = a, 0 === xo && Mo(l)), A !== a && Oo() !== a ? (e.substr(Ao, 6) === oe ? (E = oe, Ao = Ao + 6) : (E = a, 0 === xo && Mo(se)), E === a && (e.substr(Ao, 5) === le ? (E = le, Ao = Ao + 5) : (E = a, 0 === xo && Mo(ce)), E === a && (e.substr(Ao, 7) === de ? (E = de, Ao = Ao + 7) : (E = a, 0 === xo && Mo(he)), E === a && (e.substr(Ao, 6) === ue ? (E = ue, Ao = Ao + 6) : (E = a, 0 === xo && Mo(pe))))), E !== a && Oo() !== a ? (125 === e.charCodeAt(Ao) ? (v = c, Ao++) : (v = a, 0 === xo && Mo(d)), v !== a && Oo() !== a ? (Eo = t, n = Ye(o, g), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                var o;
                return t = Ao,
                (n = Oo()) !== a ? (e.substr(Ao, 5) === At ? (r = At, Ao = Ao + 5) : (r = a, 0 === xo && Mo(Et)), r === a && (e.substr(Ao, 5) === vt ? (r = vt, Ao = Ao + 5) : (r = a, 0 === xo && Mo(St)), r === a && (e.substr(Ao, 4) === Ct ? (r = Ct, Ao = Ao + 4) : (r = a, 0 === xo && Mo(xt)), r === a && (e.substr(Ao, 4) === It ? (r = It, Ao = Ao + 4) : (r = a, 0 === xo && Mo(Tt))))), r !== a ? (108 === e.charCodeAt(Ao) ? (i = bt, Ao++) : (i = a, 0 === xo && Mo(Lt)), i === a && (114 === e.charCodeAt(Ao) ? (i = Rt, Ao++) : (i = a, 0 === xo && Mo(Mt))), i === a && (i = null), i !== a && Oo() !== a ? (47 === e.charCodeAt(Ao) ? (o = wt, Ao++) : (o = a, 0 === xo && Mo(Ot)), o === a && (e.substr(Ao, 10) === Dt ? (o = Dt, Ao = Ao + 10) : (o = a, 0 === xo && Mo(Nt)), o === a && (e.substr(Ao, 5) === kt ? (o = kt, Ao = Ao + 5) : (o = a, 0 === xo && Mo(Bt)), o === a && (e.substr(Ao, 2) === Pt ? (o = Pt, Ao = Ao + 2) : (o = a, 0 === xo && Mo(Ft)), o === a && (e.substr(Ao, 7) === Ht ? (o = Ht, Ao = Ao + 7) : (o = a, 0 === xo && Mo(_t)), o === a && (60 === e.charCodeAt(Ao) ? (o = Ut, Ao++) : (o = a, 0 === xo && Mo(Wt)), o === a && (40 === e.charCodeAt(Ao) ? (o = Gt, Ao++) : (o = a, 0 === xo && Mo(zt)), o === a && (91 === e.charCodeAt(Ao) ? (o = Yt, Ao++) : (o = a, 0 === xo && Mo(Kt)), o === a && (e.substr(Ao, 2) === B ? (o = B, Ao = Ao + 2) : (o = a, 0 === xo && Mo(P)), o === a && (124 === e.charCodeAt(Ao) ? (o = Vt, Ao++) : (o = a, 0 === xo && Mo(jt)), o === a && (e.substr(Ao, 6) === qt ? (o = qt, Ao = Ao + 6) : (o = a, 0 === xo && Mo(Qt)), o === a && (e.substr(Ao, 7) === Zt ? (o = Zt, Ao = Ao + 7) : (o = a, 0 === xo && Mo(Xt)), o === a && (e.substr(Ao, 8) === Jt ? (o = Jt, Ao = Ao + 8) : (o = a, 0 === xo && Mo($t)), o === a && (e.substr(Ao, 8) === en ? (o = en, Ao = Ao + 8) : (o = a, 0 === xo && Mo(tn)), o === a && (e.substr(Ao, 10) === nn ? (o = nn, Ao = Ao + 10) : (o = a, 0 === xo && Mo(rn)), o === a && (e.substr(Ao, 10) === an ? (o = an, Ao = Ao + 10) : (o = a, 0 === xo && Mo(on)), o === a && (e.substr(Ao, 12) === sn ? (o = sn, Ao = Ao + 12) : (o = a, 0 === xo && Mo(ln)), o === a && (e.substr(Ao, 12) === cn ? (o = cn, Ao = Ao + 12) : (o = a, 0 === xo && Mo(dn)), o === a && (62 === e.charCodeAt(Ao) ? (o = hn, Ao++) : (o = a, 0 === xo && Mo(un)), o === a && (41 === e.charCodeAt(Ao) ? (o = pn, Ao++) : (o = a, 0 === xo && Mo(mn)), o === a && (93 === e.charCodeAt(Ao) ? (o = fn, Ao++) : (o = a, 0 === xo && Mo(gn)), o === a && (e.substr(Ao, 2) === F ? (o = F, Ao = Ao + 2) : (o = a, 0 === xo && Mo(H)), o === a && (e.substr(Ao, 6) === yn ? (o = yn, Ao = Ao + 6) : (o = a, 0 === xo && Mo(An)), o === a && (e.substr(Ao, 7) === En ? (o = En, Ao = Ao + 7) : (o = a, 0 === xo && Mo(vn))))))))))))))))))))))))), o !== a && Oo() !== a ? (Eo = t, n = Sn(r, i, o), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                return t = Ao,
                (n = Oo()) !== a ? (e.substr(Ao, 5) === ja ? (r = ja, Ao = Ao + 5) : (r = a, 0 === xo && Mo(qa)), r === a && (e.substr(Ao, 5) === na ? (r = na, Ao = Ao + 5) : (r = a, 0 === xo && Mo(ra))), r !== a ? (Yn.test(e.charAt(Ao)) ? (i = e.charAt(Ao), Ao++) : (i = a, 0 === xo && Mo(Kn)), i === a && (i = ns()) === a && (i = function () {
                    var t;
                    var n;
                    var r;
                    var i;
                    var o;
                    return t = Ao,
                    (n = Oo()) !== a ? (123 === e.charCodeAt(Ao) ? (r = s, Ao++) : (r = a, 0 === xo && Mo(l)), r !== a && (i = function () {
                        var t;
                        var n;
                        var r;
                        t = Ao;
                        n = [];
                        if (za.test(e.charAt(Ao))) {
                            r = e.charAt(Ao);
                            Ao++;
                        } else {
                            r = a;
                            if (0 === xo) {
                                Mo(Ya);
                            }
                        }
                        for (; r !== a;) {
                            n.push(r);
                            if (za.test(e.charAt(Ao))) {
                                r = e.charAt(Ao);
                                Ao++;
                            } else {
                                r = a;
                                if (0 === xo) {
                                    Mo(Ya);
                                }
                            }
                        }
                        return n !== a && (Eo = t, n = Ka()),
                        t = n;
                    } ()) !== a ? (125 === e.charCodeAt(Ao) ? (o = c, Ao++) : (o = a, 0 === xo && Mo(d)), o !== a ? (Eo = t, n = Va(i), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                    t;
                } ()), i !== a && Oo() !== a ? (Eo = t, n = Qa(i), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = ls()) === a && (n = cs()) === a && (n = ss()) === a && (n = os()) === a && (n = is()) === a && (n = $o()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                return t = Ao,
                (n = Oo()) !== a ? (e.substr(Ao, 7) === Za ? (r = Za, Ao = Ao + 7) : (r = a, 0 === xo && Mo(Xa)), r === a && (e.substr(Ao, 7) === Ja ? (r = Ja, Ao = Ao + 7) : (r = a, 0 === xo && Mo($a)), r === a && (e.substr(Ao, 11) === ei ? (r = ei, Ao = Ao + 11) : (r = a, 0 === xo && Mo(ti)), r === a && (e.substr(Ao, 7) === ni ? (r = ni, Ao = Ao + 7) : (r = a, 0 === xo && Mo(ri)), r === a && (e.substr(Ao, 7) === ai ? (r = ai, Ao = Ao + 7) : (r = a, 0 === xo && Mo(ii)), r === a && (e.substr(Ao, 8) === oi ? (r = oi, Ao = Ao + 8) : (r = a, 0 === xo && Mo(si)), r === a && (e.substr(Ao, 9) === li ? (r = li, Ao = Ao + 9) : (r = a, 0 === xo && Mo(ci)), r === a && (e.substr(Ao, 7) === di ? (r = di, Ao = Ao + 7) : (r = a, 0 === xo && Mo(hi)), r === a && (e.substr(Ao, 7) === ui ? (r = ui, Ao = Ao + 7) : (r = a, 0 === xo && Mo(pi)), r === a && (e.substr(Ao, 8) === mi ? (r = mi, Ao = Ao + 8) : (r = a, 0 === xo && Mo(fi)), r === a && (e.substr(Ao, 3) === gi ? (r = gi, Ao = Ao + 3) : (r = a, 0 === xo && Mo(yi)), r === a && (e.substr(Ao, 3) === Ai ? (r = Ai, Ao = Ao + 3) : (r = a, 0 === xo && Mo(Ei)), r === a && (e.substr(Ao, 3) === vi ? (r = vi, Ao = Ao + 3) : (r = a, 0 === xo && Mo(Si)), r === a && (e.substr(Ao, 3) === Ci ? (r = Ci, Ao = Ao + 3) : (r = a, 0 === xo && Mo(xi)), r === a && (e.substr(Ao, 4) === Ii ? (r = Ii, Ao = Ao + 4) : (r = a, 0 === xo && Mo(Ti)), r === a && (e.substr(Ao, 5) === bi ? (r = bi, Ao = Ao + 5) : (r = a, 0 === xo && Mo(Li)), r === a && (e.substr(Ao, 3) === Ri ? (r = Ri, Ao = Ao + 3) : (r = a, 0 === xo && Mo(Mi)), r === a && (e.substr(Ao, 3) === wi ? (r = wi, Ao = Ao + 3) : (r = a, 0 === xo && Mo(Oi))))))))))))))))))), r !== a && (i = rs()) !== a && Oo() !== a ? (Eo = t, n = Di(r, i), t = n) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = us()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                var o;
                return t = Ao,
                (n = Oo()) !== a ? (123 === e.charCodeAt(Ao) ? (r = s, Ao++) : (r = a, 0 === xo && Mo(l)), r !== a && Oo() !== a && (i = jo()) !== a && Oo() !== a ? (125 === e.charCodeAt(Ao) ? (o = c, Ao++) : (o = a, 0 === xo && Mo(d)), o !== a && Oo() !== a ? (Eo = t, n = ji(i), t = n) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
                t;
            } ()) === a && (n = function () {
                var t;
                var n;
                var r;
                var i;
                if (t = Ao, 37 === e.charCodeAt(Ao) ? (n = qi, Ao++) : (n = a, 0 === xo && Mo(Qi)), n !== a) {
                    r = [];
                    if (Zi.test(e.charAt(Ao))) {
                        i = e.charAt(Ao);
                        Ao++;
                    } else {
                        i = a;
                        if (0 === xo) {
                            Mo(Xi);
                        }
                    }
                    for (; i !== a;) {
                        r.push(i);
                        if (Zi.test(e.charAt(Ao))) {
                            i = e.charAt(Ao);
                            Ao++;
                        } else {
                            i = a;
                            if (0 === xo) {
                                Mo(Xi);
                            }
                        }
                    }
                    if (r !== a) {
                        Eo = t;
                        n = Ji(r);
                        t = n;
                    } else {
                        Ao = t;
                        t = a;
                    }
                } else {
                    Ao = t;
                    t = a;
                }
                return t;
            } ()) === a && (n = ps()),
            n !== a && (Eo = t, n = ze(n)),
            t = n;
        }
        function $o() {
            var t;
            var n;
            var r;
            var i;
            var o;
            var f;
            var g;
            var y;
            var A;
            var E;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 6) === h ? (n = h, Ao = Ao + 6) : (n = a, 0 === xo && Mo(u)), n !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (r = s, Ao++) : (r = a, 0 === xo && Mo(l)), r !== a && Oo() !== a ? (e.substr(Ao, 11) === Ke ? (i = Ke, Ao = Ao + 11) : (i = a, 0 === xo && Mo(Ve)), i === a && (e.substr(Ao, 7) === je ? (i = je, Ao = Ao + 7) : (i = a, 0 === xo && Mo(qe)), i === a && (e.substr(Ao, 7) === Qe ? (i = Qe, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Ze)), i === a && (e.substr(Ao, 7) === Xe ? (i = Xe, Ao = Ao + 7) : (i = a, 0 === xo && Mo(Je)), i === a && (e.substr(Ao, 7) === $e ? (i = $e, Ao = Ao + 7) : (i = a, 0 === xo && Mo(et)), i === a && (e.substr(Ao, 7) === tt ? (i = tt, Ao = Ao + 7) : (i = a, 0 === xo && Mo(nt)), i === a && (e.substr(Ao, 6) === rt ? (i = rt, Ao = Ao + 6) : (i = a, 0 === xo && Mo(at)), i === a && (e.substr(Ao, 8) === it ? (i = it, Ao = Ao + 8) : (i = a, 0 === xo && Mo(ot)), i === a && (e.substr(Ao, 5) === st ? (i = st, Ao = Ao + 5) : (i = a, 0 === xo && Mo(lt)), i === a && (e.substr(Ao, 8) === ct ? (i = ct, Ao = Ao + 8) : (i = a, 0 === xo && Mo(dt)), i === a && (e.substr(Ao, 7) === ht ? (i = ht, Ao = Ao + 7) : (i = a, 0 === xo && Mo(ut)))))))))))), i !== a ? (125 === e.charCodeAt(Ao) ? (o = c, Ao++) : (o = a, 0 === xo && Mo(d)), o !== a && Oo() !== a && (f = ys()) !== a && Oo() !== a ? (e.substr(Ao, 4) === p ? (g = p, Ao = Ao + 4) : (g = a, 0 === xo && Mo(m)), g !== a && Oo() !== a ? (123 === e.charCodeAt(Ao) ? (y = s, Ao++) : (y = a, 0 === xo && Mo(l)), y !== a && Oo() !== a ? (e.substr(Ao, 11) === Ke ? (A = Ke, Ao = Ao + 11) : (A = a, 0 === xo && Mo(Ve)), A === a && (e.substr(Ao, 7) === je ? (A = je, Ao = Ao + 7) : (A = a, 0 === xo && Mo(qe)), A === a && (e.substr(Ao, 7) === Xe ? (A = Xe, Ao = Ao + 7) : (A = a, 0 === xo && Mo(Je)), A === a && (e.substr(Ao, 7) === Qe ? (A = Qe, Ao = Ao + 7) : (A = a, 0 === xo && Mo(Ze)), A === a && (e.substr(Ao, 7) === $e ? (A = $e, Ao = Ao + 7) : (A = a, 0 === xo && Mo(et)), A === a && (e.substr(Ao, 7) === tt ? (A = tt, Ao = Ao + 7) : (A = a, 0 === xo && Mo(nt)), A === a && (e.substr(Ao, 6) === rt ? (A = rt, Ao = Ao + 6) : (A = a, 0 === xo && Mo(at)), A === a && (e.substr(Ao, 8) === it ? (A = it, Ao = Ao + 8) : (A = a, 0 === xo && Mo(ot)), A === a && (e.substr(Ao, 5) === st ? (A = st, Ao = Ao + 5) : (A = a, 0 === xo && Mo(lt)), A === a && (e.substr(Ao, 8) === ct ? (A = ct, Ao = Ao + 8) : (A = a, 0 === xo && Mo(dt)), A === a && (e.substr(Ao, 7) === ht ? (A = ht, Ao = Ao + 7) : (A = a, 0 === xo && Mo(ut)))))))))))), A !== a && Oo() !== a ? (125 === e.charCodeAt(Ao) ? (E = c, Ao++) : (E = a, 0 === xo && Mo(d)), E !== a && Oo() !== a ? (Eo = t, t = pt(i, f)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function es() {
            var t;
            var n;
            var r;
            var i;
            var o;
            var f;
            var g;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 6) === h ? (n = h, Ao = Ao + 6) : (n = a, 0 === xo && Mo(u)), n !== a && Oo() !== a ? (e.substr(Ao, 7) === ft ? (r = ft, Ao = Ao + 7) : (r = a, 0 === xo && Mo(gt)), r !== a && Oo() !== a && (i = function () {
                var t;
                var n;
                var r;
                var i;
                var o;
                if (Ue.test(e.charAt(Ao)) ? (t = e.charAt(Ao), Ao++) : (t = a, 0 === xo && Mo(We)), t === a) {
                    if (t = Ao, n = Ao, 123 === e.charCodeAt(Ao) ? (r = s, Ao++) : (r = a, 0 === xo && Mo(l)), r !== a) {
                        i = [];
                        if (Ue.test(e.charAt(Ao))) {
                            o = e.charAt(Ao);
                            Ao++;
                        } else {
                            o = a;
                            if (0 === xo) {
                                Mo(We);
                            }
                        }
                        if (o === a) {
                            if (A.test(e.charAt(Ao))) {
                                o = e.charAt(Ao);
                                Ao++;
                            } else {
                                o = a;
                                if (0 === xo) {
                                    Mo(E);
                                }
                            }
                        }
                        for (; o !== a;) {
                            i.push(o);
                            if (Ue.test(e.charAt(Ao))) {
                                o = e.charAt(Ao);
                                Ao++;
                            } else {
                                o = a;
                                if (0 === xo) {
                                    Mo(We);
                                }
                            }
                            if (o === a) {
                                if (A.test(e.charAt(Ao))) {
                                    o = e.charAt(Ao);
                                    Ao++;
                                } else {
                                    o = a;
                                    if (0 === xo) {
                                        Mo(E);
                                    }
                                }
                            }
                        }
                        if (i !== a) {
                            if (125 === e.charCodeAt(Ao)) {
                                o = c;
                                Ao++;
                            } else {
                                o = a;
                                if (0 === xo) {
                                    Mo(d);
                                }
                            }
                            if (o !== a) {
                                n = r = [r, i, o];
                            } else {
                                Ao = n;
                                n = a;
                            }
                        } else {
                            Ao = n;
                            n = a;
                        }
                    } else {
                        Ao = n;
                        n = a;
                    }
                    if (n !== a) {
                        Eo = t;
                        n = mt(n);
                    }
                    t = n;
                }
                return t;
            } ()) !== a && Oo() !== a && (o = ys()) !== a && Oo() !== a ? (e.substr(Ao, 4) === p ? (f = p, Ao = Ao + 4) : (f = a, 0 === xo && Mo(m)), f !== a && Oo() !== a ? (e.substr(Ao, 7) === ft ? (g = ft, Ao = Ao + 7) : (g = a, 0 === xo && Mo(gt)), g !== a && Oo() !== a ? (Eo = t, t = yt(i, o)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function ts() {
            var t;
            var n;
            var r;
            var i;
            return t = Ao,
            Oo() !== a ? (123 === e.charCodeAt(Ao) ? (n = s, Ao++) : (n = a, 0 === xo && Mo(l)), n !== a && Oo() !== a && (r = jo()) !== a && Oo() !== a ? (125 === e.charCodeAt(Ao) ? (i = c, Ao++) : (i = a, 0 === xo && Mo(d)), i !== a ? (Eo = t, t = Gn(r)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function ns() {
            var t;
            var n;
            var r;
            if (t = Ao, n = [], x.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(I)), r !== a) {
                for (; r !== a;) {
                    n.push(r);
                    if (x.test(e.charAt(Ao))) {
                        r = e.charAt(Ao);
                        Ao++;
                    } else {
                        r = a;
                        if (0 === xo) {
                            Mo(I);
                        }
                    }
                }
            } else {
                n = a;
            }
            return n !== a ? (Ue.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(We)), r !== a ? (Eo = t, t = n = zn(r)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function rs() {
            var t;
            return Yn.test(e.charAt(Ao)) ? (t = e.charAt(Ao), Ao++) : (t = a, 0 === xo && Mo(Kn)),
            t === a && (t = ns()) === a && (t = ts()) === a && (t = Xo()),
            t;
        }
        function as() {
            var t;
            var n;
            var r;
            var i;
            return t = Ao,
            Oo() !== a ? (91 === e.charCodeAt(Ao) ? (n = Yt, Ao++) : (n = a, 0 === xo && Mo(Kt)), n !== a && Oo() !== a ? ((r = function () {
                var e;
                var t;
                var n;
                e = Ao;
                t = [];
                if ((n = ms()) === a) {
                    n = Vo();
                }
                for (; n !== a;) {
                    t.push(n);
                    if ((n = ms()) === a) {
                        n = Vo();
                    }
                }
                return t !== a && (Eo = e, t = ao(t)),
                e = t;
            } ()) === a && (r = null), r !== a && Oo() !== a ? (93 === e.charCodeAt(Ao) ? (i = fn, Ao++) : (i = a, 0 === xo && Mo(gn)), i !== a ? (Eo = t, t = Gn(r)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function is() {
            var t;
            var n;
            var r;
            var i;
            var o;
            return t = Ao,
            Oo() !== a && (n = function () {
                var e;
                var t;
                return e = Ao,
                (t = hs()) !== a ? (Eo = Ao, (Vn(t) ? void 0 : a) !== a ? (Eo = e, e = t = jn(t)) : (Ao = e, e = a)) : (Ao = e, e = a),
                e;
            } ()) !== a && Oo() !== a ? (r = Ao, (i = Oo()) !== a ? (e.substr(Ao, 7) === qn ? (o = qn, Ao = Ao + 7) : (o = a, 0 === xo && Mo(Qn)), o === a && (e.substr(Ao, 9) === Zn ? (o = Zn, Ao = Ao + 9) : (o = a, 0 === xo && Mo(Xn))), o !== a ? r = i = [i, o] : (Ao = r, r = a)) : (Ao = r, r = a), r === a && (r = null), r !== a && (i = Oo()) !== a ? ((o = ps()) === a && (o = null), o !== a && Oo() !== a ? (Eo = t, t = Jn(n, r, o)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function os() {
            var t;
            var n;
            var r;
            var i;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 6) === $n ? (n = $n, Ao = Ao + 6) : (n = a, 0 === xo && Mo(er)), n === a && (e.substr(Ao, 5) === tr ? (n = tr, Ao = Ao + 5) : (n = a, 0 === xo && Mo(nr)), n === a && (e.substr(Ao, 6) === rr ? (n = rr, Ao = Ao + 6) : (n = a, 0 === xo && Mo(ar)), n === a && (e.substr(Ao, 6) === ir ? (n = ir, Ao = Ao + 6) : (n = a, 0 === xo && Mo(or)), n === a && (e.substr(Ao, 6) === sr ? (n = sr, Ao = Ao + 6) : (n = a, 0 === xo && Mo(lr)), n === a && (e.substr(Ao, 7) === cr ? (n = cr, Ao = Ao + 7) : (n = a, 0 === xo && Mo(dr)), n === a && (e.substr(Ao, 7) === hr ? (n = hr, Ao = Ao + 7) : (n = a, 0 === xo && Mo(ur)), n === a && (e.substr(Ao, 9) === pr ? (n = pr, Ao = Ao + 9) : (n = a, 0 === xo && Mo(mr)), n === a && (e.substr(Ao, 8) === fr ? (n = fr, Ao = Ao + 8) : (n = a, 0 === xo && Mo(gr)), n === a && (e.substr(Ao, 9) === yr ? (n = yr, Ao = Ao + 9) : (n = a, 0 === xo && Mo(Ar))))))))))), n !== a && (r = rs()) !== a && (i = function () {
                var t;
                return Ue.test(e.charAt(Ao)) ? (t = e.charAt(Ao), Ao++) : (t = a, 0 === xo && Mo(We)),
                t === a && (t = ns()) === a && (t = ts()) === a && (t = Xo()),
                t;
            } ()) !== a && Oo() !== a ? (Eo = t, t = Er(n, r, i)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function ss() {
            var t;
            var n;
            var r;
            var i;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 5) === vr ? (n = vr, Ao = Ao + 5) : (n = a, 0 === xo && Mo(Sr)), n === a && (e.substr(Ao, 12) === Cr ? (n = Cr, Ao = Ao + 12) : (n = a, 0 === xo && Mo(xr)), n === a && (e.substr(Ao, 11) === Ir ? (n = Ir, Ao = Ao + 11) : (n = a, 0 === xo && Mo(Tr)))), n !== a ? ((r = as()) === a && (r = null), r !== a && (i = rs()) !== a && Oo() !== a ? (Eo = t, t = br(n, r, i)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function ls() {
            var t;
            var n;
            var r;
            var i;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 10) === Lr ? (n = Lr, Ao = Ao + 10) : (n = a, 0 === xo && Mo(Rr)), n === a && (e.substr(Ao, 11) === Mr ? (n = Mr, Ao = Ao + 11) : (n = a, 0 === xo && Mo(wr))), n !== a && (r = rs()) !== a && Oo() !== a ? ((i = ps()) === a && (i = null), i !== a && Oo() !== a ? (Eo = t, t = Or(n, r, i)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function cs() {
            var t;
            var n;
            var r;
            return t = Ao,
            Oo() !== a ? (e.substr(Ao, 14) === Dr ? (n = Dr, Ao = Ao + 14) : (n = a, 0 === xo && Mo(Nr)), n === a && (e.substr(Ao, 10) === kr ? (n = kr, Ao = Ao + 10) : (n = a, 0 === xo && Mo(Br)), n === a && (e.substr(Ao, 6) === Pr ? (n = Pr, Ao = Ao + 6) : (n = a, 0 === xo && Mo(Fr)), n === a && (e.substr(Ao, 8) === Hr ? (n = Hr, Ao = Ao + 8) : (n = a, 0 === xo && Mo(_r)), n === a && (e.substr(Ao, 4) === Ur ? (n = Ur, Ao = Ao + 4) : (n = a, 0 === xo && Mo(Wr)), n === a && (e.substr(Ao, 4) === Gr ? (n = Gr, Ao = Ao + 4) : (n = a, 0 === xo && Mo(zr)), n === a && (e.substr(Ao, 5) === Yr ? (n = Yr, Ao = Ao + 5) : (n = a, 0 === xo && Mo(Kr)), n === a && (e.substr(Ao, 6) === Vr ? (n = Vr, Ao = Ao + 6) : (n = a, 0 === xo && Mo(jr)), n === a && (e.substr(Ao, 7) === qr ? (n = qr, Ao = Ao + 7) : (n = a, 0 === xo && Mo(Qr)), n === a && (e.substr(Ao, 9) === Zr ? (n = Zr, Ao = Ao + 9) : (n = a, 0 === xo && Mo(Xr)), n === a && (e.substr(Ao, 10) === Jr ? (n = Jr, Ao = Ao + 10) : (n = a, 0 === xo && Mo($r)), n === a && (e.substr(Ao, 15) === ea ? (n = ea, Ao = Ao + 15) : (n = a, 0 === xo && Mo(ta)), n === a && (e.substr(Ao, 5) === na ? (n = na, Ao = Ao + 5) : (n = a, 0 === xo && Mo(ra)), n === a && (e.substr(Ao, 5) === aa ? (n = aa, Ao = Ao + 5) : (n = a, 0 === xo && Mo(ia)), n === a && (e.substr(Ao, 9) === oa ? (n = oa, Ao = Ao + 9) : (n = a, 0 === xo && Mo(sa)), n === a && (e.substr(Ao, 8) === la ? (n = la, Ao = Ao + 8) : (n = a, 0 === xo && Mo(ca)), n === a && (e.substr(Ao, 4) === da ? (n = da, Ao = Ao + 4) : (n = a, 0 === xo && Mo(ha)), n === a && (e.substr(Ao, 6) === ua ? (n = ua, Ao = Ao + 6) : (n = a, 0 === xo && Mo(pa)), n === a && (e.substr(Ao, 6) === ma ? (n = ma, Ao = Ao + 6) : (n = a, 0 === xo && Mo(fa)), n === a && (e.substr(Ao, 6) === ga ? (n = ga, Ao = Ao + 6) : (n = a, 0 === xo && Mo(ya)), n === a && (e.substr(Ao, 6) === Aa ? (n = Aa, Ao = Ao + 6) : (n = a, 0 === xo && Mo(Ea)), n === a && (e.substr(Ao, 4) === va ? (n = va, Ao = Ao + 4) : (n = a, 0 === xo && Mo(Sa)), n === a && (e.substr(Ao, 10) === Ca ? (n = Ca, Ao = Ao + 10) : (n = a, 0 === xo && Mo(xa)), n === a && (e.substr(Ao, 8) === Ia ? (n = Ia, Ao = Ao + 8) : (n = a, 0 === xo && Mo(Ta)), n === a && (e.substr(Ao, 4) === ba ? (n = ba, Ao = Ao + 4) : (n = a, 0 === xo && Mo(La)), n === a && (e.substr(Ao, 7) === Ra ? (n = Ra, Ao = Ao + 7) : (n = a, 0 === xo && Mo(Ma)), n === a && (e.substr(Ao, 8) === wa ? (n = wa, Ao = Ao + 8) : (n = a, 0 === xo && Mo(Oa)), n === a && (e.substr(Ao, 8) === Da ? (n = Da, Ao = Ao + 8) : (n = a, 0 === xo && Mo(Na)), n === a && (e.substr(Ao, 11) === ka ? (n = ka, Ao = Ao + 11) : (n = a, 0 === xo && Mo(Ba)), n === a && (e.substr(Ao, 9) === Pa ? (n = Pa, Ao = Ao + 9) : (n = a, 0 === xo && Mo(Fa)), n === a && (e.substr(Ao, 13) === Ha ? (n = Ha, Ao = Ao + 13) : (n = a, 0 === xo && Mo(_a)), n === a && (e.substr(Ao, 6) === Ua ? (n = Ua, Ao = Ao + 6) : (n = a, 0 === xo && Mo(Wa))))))))))))))))))))))))))))))))), n !== a && (r = rs()) !== a && Oo() !== a ? (Eo = t, t = Ga(n, r)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function ds() {
            var t;
            var n;
            var r;
            return t = Ao,
            Oo() !== a ? (92 === e.charCodeAt(Ao) ? (n = U, Ao++) : (n = a, 0 === xo && Mo(W)), n !== a ? (32 === e.charCodeAt(Ao) ? (r = G, Ao++) : (r = a, 0 === xo && Mo(z)), r === a && (44 === e.charCodeAt(Ao) ? (r = Ni, Ao++) : (r = a, 0 === xo && Mo(ki)), r === a && (58 === e.charCodeAt(Ao) ? (r = Bi, Ao++) : (r = a, 0 === xo && Mo(Pi)), r === a && (59 === e.charCodeAt(Ao) ? (r = Fi, Ao++) : (r = a, 0 === xo && Mo(Hi)), r === a && (33 === e.charCodeAt(Ao) ? (r = _i, Ao++) : (r = a, 0 === xo && Mo(Ui)))))), r !== a && Oo() !== a ? (Eo = t, t = Wi(r)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function hs() {
            var t;
            var n;
            var r;
            var i;
            if (t = Ao, 92 === e.charCodeAt(Ao) ? (n = U, Ao++) : (n = a, 0 === xo && Mo(W)), n !== a) {
                if (r = [], Gi.test(e.charAt(Ao)) ? (i = e.charAt(Ao), Ao++) : (i = a, 0 === xo && Mo(zi)), i !== a) {
                    for (; i !== a;) {
                        r.push(i);
                        if (Gi.test(e.charAt(Ao))) {
                            i = e.charAt(Ao);
                            Ao++;
                        } else {
                            i = a;
                            if (0 === xo) {
                                Mo(zi);
                            }
                        }
                    }
                } else {
                    r = a;
                }
                if (r !== a) {
                    Eo = t;
                    t = n = Yi();
                } else {
                    Ao = t;
                    t = a;
                }
            } else {
                Ao = t;
                t = a;
            }
            return t;
        }
        function us() {
            var e;
            var t;
            return e = Ao,
            Oo() !== a && (t = hs()) !== a && Oo() !== a ? (Eo = Ao, (Ki(t) ? void 0 : a) !== a ? (Eo = e, e = Vi(t)) : (Ao = e, e = a)) : (Ao = e, e = a),
            e;
        }
        function ps() {
            var t;
            var n;
            var r;
            var i;
            var o;
            var s;
            return t = Ao,
            Oo() !== a ? (94 === e.charCodeAt(Ao) ? (n = $i, Ao++) : (n = a, 0 === xo && Mo(eo)), n === a && (95 === e.charCodeAt(Ao) ? (n = to, Ao++) : (n = a, 0 === xo && Mo(no))), n !== a ? (Ue.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(We)), r === a && (r = ts()) === a && (r = Xo()), r !== a ? (i = Ao, 94 === e.charCodeAt(Ao) ? (o = $i, Ao++) : (o = a, 0 === xo && Mo(eo)), o === a && (95 === e.charCodeAt(Ao) ? (o = to, Ao++) : (o = a, 0 === xo && Mo(no))), o !== a ? (Ue.test(e.charAt(Ao)) ? (s = e.charAt(Ao), Ao++) : (s = a, 0 === xo && Mo(We)), s === a && (s = ts()) === a && (s = Xo()), s !== a ? i = o = [o, s] : (Ao = i, i = a)) : (Ao = i, i = a), i === a && (i = null), i !== a ? (Eo = t, t = ro(n, r, i)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function ms() {
            var e;
            var t;
            var n;
            if (e = Ao, t = [], (n = gs()) === a && (n = Jo()), n !== a) {
                for (; n !== a;) {
                    t.push(n);
                    if ((n = gs()) === a) {
                        n = Jo();
                    }
                }
            } else {
                t = a;
            }
            return t !== a ? ((n = Vo()) === a && (n = null), n !== a ? (Eo = e, e = t = io(t, n)) : (Ao = e, e = a)) : (Ao = e, e = a),
            e;
        }
        function fs() {
            var t;
            var n;
            var r;
            if (t = Ao, n = [], oo.test(e.charAt(Ao)) ? (r = e.charAt(Ao), Ao++) : (r = a, 0 === xo && Mo(so)), r !== a) {
                for (; r !== a;) {
                    n.push(r);
                    if (oo.test(e.charAt(Ao))) {
                        r = e.charAt(Ao);
                        Ao++;
                    } else {
                        r = a;
                        if (0 === xo) {
                            Mo(so);
                        }
                    }
                }
            } else {
                n = a;
            }
            return n !== a && (Eo = t, n = De()),
            t = n;
        }
        function gs() {
            var e;
            var t;
            var n;
            if (e = Ao, t = [], (n = fs()) === a && (n = ko()) === a && (n = Do()) === a && (n = No()), n !== a) {
                for (; n !== a;) {
                    t.push(n);
                    if ((n = fs()) === a && (n = ko()) === a && (n = Do()) === a) {
                        n = No();
                    }
                }
            } else {
                t = a;
            }
            return t !== a && (Eo = e, t = lo(t)),
            e = t;
        }
        function ys() {
            var e;
            var t;
            var n;
            if (e = Ao, Oo() !== a) {
                t = [];
                if ((n = vs()) === a && (n = Vo()) === a) {
                    n = Es();
                }
                for (; n !== a;) {
                    t.push(n);
                    if ((n = vs()) === a && (n = Vo()) === a) {
                        n = Es();
                    }
                }
                if (t !== a && (n = Oo()) !== a) {
                    Eo = e;
                    e = co(t);
                } else {
                    Ao = e;
                    e = a;
                }
            } else {
                Ao = e;
                e = a;
            }
            return e;
        }
        function As() {
            var t;
            return e.substr(Ao, 6) === ho ? (t = ho, Ao = Ao + 6) : (t = a, 0 === xo && Mo(uo)),
            t;
        }
        function Es() {
            var e;
            var t;
            return e = Ao,
            Oo() !== a && (t = As()) !== a && Oo() !== a ? (Eo = e, e = po(t)) : (Ao = e, e = a),
            e;
        }
        function vs() {
            var t;
            var n;
            var r;
            var i;
            var o;
            if (t = Ao, Oo() !== a) {
                if ((n = As()) === a && (n = null), n !== a) {
                    if (Oo() !== a) {
                        if (r = [], (i = Ss()) === a && (38 === e.charCodeAt(Ao) ? (i = mo, Ao++) : (i = a, 0 === xo && Mo(fo))), i !== a) {
                            for (; i !== a;) {
                                r.push(i);
                                if ((i = Ss()) === a) {
                                    if (38 === e.charCodeAt(Ao)) {
                                        i = mo;
                                        Ao++;
                                    } else {
                                        i = a;
                                        if (0 === xo) {
                                            Mo(fo);
                                        }
                                    }
                                }
                            }
                        } else {
                            r = a;
                        }
                        if (r !== a && (i = Oo()) !== a) {
                            if ((o = Vo()) === a) {
                                o = null;
                            }
                            if (o !== a) {
                                Eo = t;
                                t = go(n, r, o);
                            } else {
                                Ao = t;
                                t = a;
                            }
                        } else {
                            Ao = t;
                            t = a;
                        }
                    } else {
                        Ao = t;
                        t = a;
                    }
                } else {
                    Ao = t;
                    t = a;
                }
            } else {
                Ao = t;
                t = a;
            }
            return t;
        }
        function Ss() {
            var t;
            var n;
            var r;
            if (t = Ao, n = [], (r = Zo()) === a && (r = Jo()), r !== a) {
                for (; r !== a;) {
                    n.push(r);
                    if ((r = Zo()) === a) {
                        r = Jo();
                    }
                }
            } else {
                n = a;
            }
            return n !== a ? (38 === e.charCodeAt(Ao) ? (r = mo, Ao++) : (r = a, 0 === xo && Mo(fo)), r === a && (r = null), r !== a ? (Eo = t, t = n = yo(n)) : (Ao = t, t = a)) : (Ao = t, t = a),
            t;
        }
        function Rs() {
            return {
                id: bs.nextId(),
                blocks: []
            };
        }
        function Os(e) {
            var t = xs.getCustomSymbolComponent("\\math-container").toModel(true, e);
            return {
                id: bs.nextId(),
                singleBlock: true,
                mathContainer: true,
                blocks: [t]
            };
        }
        function Ds(e) {
            return {
                id: bs.nextId(),
                text: e
            };
        }
        t = void 0 !== t ? t : {};
        var n;
        var a = {};
        var i = {
            Expression: Bo,
            MathExpression: jo
        };
        var o = Bo;
        var s = "{";
        var l = To("{", false);
        var c = (bo(["\r", "\n", " ", "\t", "\u02dc", "#", "$", "%", "^", "_", "\\", "{", "}", "&", "[", "]"], true, false), "}");
        var d = To("}", false);
        var h = "\\begin";
        var u = To("\\begin", false);
        var p = "\\end";
        var m = To("\\end", false);
        var f = /^[ \t\n\r]/;
        var g = bo([" ", "\t", "\n", "\r"], false, false);
        var y = (To("{aligned}", false), function () {
            return "";
        });
        var A = /^[ \t]/;
        var E = bo([" ", "\t"], false, false);
        var v = "\n";
        var S = To("\n", false);
        var C = function () {
            return " ";
        };
        var x = /^[ \t\r\n]/;
        var I = bo([" ", "\t", "\r", "\n"], false, false);
        var T = "\\&";
        var b = To("\\&", false);
        var L = "\\%";
        var R = To("\\%", false);
        var M = "\\$";
        var w = To("\\$", false);
        var O = "\\#";
        var D = To("\\#", false);
        var N = "\\_";
        var k = To("\\_", false);
        var B = "\\{";
        var P = To("\\{", false);
        var F = "\\}";
        var H = To("\\}", false);
        var _ = function () {
            return Io().substring(1);
        };
        var U = "\\";
        var W = To("\\", false);
        var G = " ";
        var z = To(" ", false);
        var Y = "\\,";
        var K = To("\\,", false);
        var V = "\\:";
        var j = To("\\:", false);
        var q = "\\;";
        var Q = To("\\;", false);
        var Z = "\\!";
        var X = To("\\!", false);
        var J = "\\quad";
        var $ = To("\\quad", false);
        var ee = function () {
            return " ";
        };
        var te = "\\qquad";
        var ne = To("\\qquad", false);
        var re = function () {
            return " ";
        };
        var ae = function (e) {
            return Ms(e, true);
        };
        var ie = function (e) {
            return {
                id: bs.nextId(),
                blocks: e
            };
        };
        var oe = "align*";
        var se = To("align*", false);
        var le = "align";
        var ce = To("align", false);
        var de = "gather*";
        var he = To("gather*", false);
        var ue = "gather";
        var pe = To("gather", false);
        var me = function (e, t) {
            if ("align*" === e) {
                e = "align";
            }
            if ("gather*" === e) {
                e = "gather";
            }
            e = "\\" + e;
            var n = xs.getCustomSymbolComponent(e).toModel(e, t);
            return {
                id: bs.nextId(),
                blocks: [n]
            };
        };
        var fe = function (e) {
            return Os([{
                id: bs.nextId(),
                blocks: [e]
            }]);
        };
        var ge = function (e) {
            return "\\" + e;
        };
        var ye = "equation*";
        var Ae = To("equation*", false);
        var Ee = "equation";
        var ve = To("equation", false);
        var Se = "math";
        var Ce = To("math", false);
        var xe = function (e, t) {
            return Os(t);
        };
        var Ie = "$$";
        var Te = To("$$", false);
        var be = function (e, t) {
            return Os(t);
        };
        var Le = "$";
        var Re = To("$", false);
        var Me = function (e, t) {
            return xs.getCustomSymbolComponent("\\math-container").toModel(false, t);
        };
        var we = /^[^\\\n\r$]/;
        var Oe = bo(["\\", "\n", "\r", "$"], true, false);
        var De = function () {
            return Io();
        };
        var Ne = function (e) {
            return {
                id: bs.nextId(),
                text: e
            };
        };
        var ke = function () {
            return Rs();
        };
        var Be = "\\\\";
        var Pe = To("\\\\", false);
        var Fe = function (e) {
            return Rs();
        };
        var He = function (e) {
            return Ms(e);
        };
        var _e = function (e, t) {
            return {
                id: bs.nextId(),
                blocks: e
            };
        };
        var Ue = /^[^\r\n \t\u02DC#$%\^_\\{}&]/;
        var We = bo(["\r", "\n", " ", "\t", "\u02dc", "#", "$", "%", "^", "_", "\\", "{", "}", "&"], true, false);
        var Ge = function (e) {
            return {
                id: bs.nextId(),
                text: e.join("")
            };
        };
        var ze = function (e) {
            return e;
        };
        var Ye = function (e, t) {
            var n = "";
            return "align*" != e && "align" != e || (n = "\\aligned", e = "align"),
            "gather*" != e && "gather" != e || (n = "\\gathered"),
            xs.getCustomSymbolComponent(n).toModel(e, t);
        };
        var Ke = "smallmatrix";
        var Ve = To("smallmatrix", false);
        var je = "pmatrix";
        var qe = To("pmatrix", false);
        var Qe = "Bmatrix";
        var Ze = To("Bmatrix", false);
        var Xe = "bmatrix";
        var Je = To("bmatrix", false);
        var $e = "vmatrix";
        var et = To("vmatrix", false);
        var tt = "Vmatrix";
        var nt = To("Vmatrix", false);
        var rt = "matrix";
        var at = To("matrix", false);
        var it = "eqnarray";
        var ot = To("eqnarray", false);
        var st = "cases";
        var lt = To("cases", false);
        var ct = "gathered";
        var dt = To("gathered", false);
        var ht = "aligned";
        var ut = To("aligned", false);
        var pt = function (e, t) {
            var n = "\\matrix";
            return "cases" === e && (n = "\\cases"),
            "gathered" === e && (n = "\\gathered"),
            "aligned" === e && (n = "\\aligned"),
            "eqnarray" === e && (n = "\\aligned"),
            "smallmatrix" === e && (n = "\\smallmatrix"),
            xs.getCustomSymbolComponent(n).toModel(e, t, "eqnarray" === e);
        };
        var mt = function (e) {
            return e[1].join("");
        };
        var ft = "{array}";
        var gt = To("{array}", false);
        var yt = function (e, t) {
            return xs.getCustomSymbolComponent("\\array").toModel("array", t, e);
        };
        var At = "\\bigg";
        var Et = To("\\bigg", false);
        var vt = "\\Bigg";
        var St = To("\\Bigg", false);
        var Ct = "\\big";
        var xt = To("\\big", false);
        var It = "\\Big";
        var Tt = To("\\Big", false);
        var bt = "l";
        var Lt = To("l", false);
        var Rt = "r";
        var Mt = To("r", false);
        var wt = "/";
        var Ot = To("/", false);
        var Dt = "\\backslash";
        var Nt = To("\\backslash", false);
        var kt = "\\Vert";
        var Bt = To("\\Vert", false);
        var Pt = "\\|";
        var Ft = To("\\|", false);
        var Ht = "\\rangle";
        var _t = To("\\rangle", false);
        var Ut = "<";
        var Wt = To("<", false);
        var Gt = "(";
        var zt = To("(", false);
        var Yt = "[";
        var Kt = To("[", false);
        var Vt = "|";
        var jt = To("|", false);
        var qt = "\\lceil";
        var Qt = To("\\lceil", false);
        var Zt = "\\lfloor";
        var Xt = To("\\lfloor", false);
        var Jt = "\\uparrow";
        var $t = To("\\uparrow", false);
        var en = "\\Uparrow";
        var tn = To("\\Uparrow", false);
        var nn = "\\downarrow";
        var rn = To("\\downarrow", false);
        var an = "\\Downarrow";
        var on = To("\\Downarrow", false);
        var sn = "\\updownarrow";
        var ln = To("\\updownarrow", false);
        var cn = "\\Updownarrow";
        var dn = To("\\Updownarrow", false);
        var hn = ">";
        var un = To(">", false);
        var pn = ")";
        var mn = To(")", false);
        var fn = "]";
        var gn = To("]", false);
        var yn = "\\rceil";
        var An = To("\\rceil", false);
        var En = "\\rfloor";
        var vn = To("\\rfloor", false);
        var Sn = function (e, t, n) {
            return "\\rangle" === n && (n = ">"),
            "\\|" === n && (n = "\\Vert"),
            xs.getCustomSymbolComponent("\\bigl").toModel(e.substring(1), t, n);
        };
        var Cn = "\\left";
        var xn = To("\\left", false);
        var In = "\\lbrack";
        var Tn = To("\\lbrack", false);
        var bn = "\\lbrace";
        var Ln = To("\\lbrace", false);
        var Rn = "\\langle";
        var Mn = To("\\langle", false);
        var wn = "\\vert";
        var On = To("\\vert", false);
        var Dn = ".";
        var Nn = To(".", false);
        var kn = function (e) {
            var t = "\\left" + e;
            return "\\left\\vert" === t && (t = "\\left|"),
            "[" != e && "(" != e || (t = e),
            "\\lbrack" === e && (t = "["),
            "\\lbrace" === e && (t = Is),
            "\\langle" != e && "<" != e || (t = "\\left\\angle"),
            "\\|" === e && (t = "\\left\\Vert"),
            e === "\\" + Is && (t = Is),
            {
                type: "single",
                id: bs.nextId(),
                text: t
            };
        };
        var Bn = "\\right";
        var Pn = To("\\right", false);
        var Fn = "\\rbrack";
        var Hn = To("\\rbrack", false);
        var _n = "\\rbrace";
        var Un = To("\\rbrace", false);
        var Wn = function (e) {
            var t = "\\right" + e;
            return "\\right\\vert" === t && (t = "\\right|"),
            "]" != e && ")" != e || (t = e),
            "\\rbrack" === e && (t = "]"),
            "\\rbrace" === e && (t = Ts),
            "\\rangle" != e && ">" != e || (t = "\\right\\angle"),
            "\\|" === e && (t = "\\right\\Vert"),
            e === "\\" + Ts && (t = Ts),
            {
                type: "single",
                id: bs.nextId(),
                text: t
            };
        };
        var Gn = function (e) {
            return e;
        };
        var zn = function (e) {
            return e;
        };
        var Yn = /^[^\r\n \t\u02DC#$%\^_\\{}&a-zA-Z]/;
        var Kn = bo(["\r", "\n", " ", "\t", "\u02dc", "#", "$", "%", "^", "_", "\\", "{", "}", "&", ["a", "z"], ["A", "Z"]], true, false);
        var Vn = function (e) {
            switch (e) {
            case "\\int":
                case "\\iint":
                case "\\iiint":
                case "\\oint":
                case "\\oiint":
                case "\\oiiint":
                case "\\sum":
                case "\\bigcap":
                case "\\coprod":
                case "\\bigcup":
                case "\\prod":
                case "\\bigvee":
                case "\\bigwedge":
                case "\\limsup":
                case "\\liminf":
                case "\\varliminf":
                case "\\lim":
                case "\\varlimsup":
                case "\\sup":
                return true;
            }
            return false;
        };
        var jn = function (e) {
            return e;
        };
        var qn = "\\limits";
        var Qn = To("\\limits", false);
        var Zn = "\\nolimits";
        var Xn = To("\\nolimits", false);
        var Jn = function (e, t, n) {
            return xs.getCustomSymbolComponent(e).toModel(e, (t || [])[1], n);
        };
        var $n = "\\cfrac";
        var er = To("\\cfrac", false);
        var tr = "\\frac";
        var nr = To("\\frac", false);
        var rr = "\\dfrac";
        var ar = To("\\dfrac", false);
        var ir = "\\tfrac";
        var or = To("\\tfrac", false);
        var sr = "\\binom";
        var lr = To("\\binom", false);
        var cr = "\\tbinom";
        var dr = To("\\tbinom", false);
        var hr = "\\dbinom";
        var ur = To("\\dbinom", false);
        var pr = "\\stackrel";
        var mr = To("\\stackrel", false);
        var fr = "\\overset";
        var gr = To("\\overset", false);
        var yr = "\\underset";
        var Ar = To("\\underset", false);
        var Er = function (e, t, n) {
            var r;
            return "\\dbinom" === e || "\\tbinom" === e ? ((r = xs.getCustomSymbolComponent("\\binom").toModel("\\binom", null, t, n)).style = r.style || {},
            r.style.mathModeType = "\\dbinom" === e ? "\\displaystyle" : "\\textstyle", r) : r = xs.getCustomSymbolComponent(e).toModel(e, null, t, n);
        };
        var vr = "\\sqrt";
        var Sr = To("\\sqrt", false);
        var Cr = "\\xrightarrow";
        var xr = To("\\xrightarrow", false);
        var Ir = "\\xleftarrow";
        var Tr = To("\\xleftarrow", false);
        var br = function (e, t, n) {
            return "\\xrightarrow" === e && (e = "\\rightarrow"),
            "\\xleftarrow" === e && (e = "\\leftarrow"),
            xs.getCustomSymbolComponent(e).toModel(e, t, n);
        };
        var Lr = "\\overbrace";
        var Rr = To("\\overbrace", false);
        var Mr = "\\underbrace";
        var wr = To("\\underbrace", false);
        var Or = function (e, t, n) {
            return xs.getCustomSymbolComponent(e).toModel(e, t, n);
        };
        var Dr = "\\overleftarrow";
        var Nr = To("\\overleftarrow", false);
        var kr = "\\widetilde";
        var Br = To("\\widetilde", false);
        var Pr = "\\tilde";
        var Fr = To("\\tilde", false);
        var Hr = "\\widehat";
        var _r = To("\\widehat", false);
        var Ur = "\\hat";
        var Wr = To("\\hat", false);
        var Gr = "\\dot";
        var zr = To("\\dot", false);
        var Yr = "\\ddot";
        var Kr = To("\\ddot", false);
        var Vr = "\\dddot";
        var jr = To("\\dddot", false);
        var qr = "\\ddddot";
        var Qr = To("\\ddddot", false);
        var Zr = "\\overline";
        var Xr = To("\\overline", false);
        var Jr = "\\underline";
        var $r = To("\\underline", false);
        var ea = "\\overrightarrow";
        var ta = To("\\overrightarrow", false);
        var na = "\\mbox";
        var ra = To("\\mbox", false);
        var aa = "\\fbox";
        var ia = To("\\fbox", false);
        var oa = "\\vphantom";
        var sa = To("\\vphantom", false);
        var la = "\\mathrel";
        var ca = To("\\mathrel", false);
        var da = "\\vec";
        var ha = To("\\vec", false);
        var ua = "\\acute";
        var pa = To("\\acute", false);
        var ma = "\\breve";
        var fa = To("\\breve", false);
        var ga = "\\check";
        var ya = To("\\check", false);
        var Aa = "\\grave";
        var Ea = To("\\grave", false);
        var va = "\\bar";
        var Sa = To("\\bar", false);
        var Ca = "\\overparen";
        var xa = To("\\overparen", false);
        var Ia = "\\overarc";
        var Ta = To("\\overarc", false);
        var ba = "\\not";
        var La = To("\\not", false);
        var Ra = "\\cancel";
        var Ma = To("\\cancel", false);
        var wa = "\\bcancel";
        var Oa = To("\\bcancel", false);
        var Da = "\\xcancel";
        var Na = To("\\xcancel", false);
        var ka = "\\underparen";
        var Ba = To("\\underparen", false);
        var Pa = "\\underarc";
        var Fa = To("\\underarc", false);
        var Ha = "\\operatorname";
        var _a = To("\\operatorname", false);
        var Ua = "\\boxed";
        var Wa = To("\\boxed", false);
        var Ga = function (e, t) {
            return "\\vphantom" === e ? {
                text: ""
            } : ("\\tilde" === e || "\\hat" === e) && t instanceof Array && 0 === t.length ? {
                id: bs.nextId(),
                text: ws[e]
            } : xs.getCustomSymbolComponent(e).toModel(e, null, t);
        };
        var za = /^[^}]/;
        var Ya = bo(["}"], true, false);
        var Ka = function () {
            return Io();
        };
        var Va = function (e) {
            return e;
        };
        var ja = "\\text";
        var qa = To("\\text", false);
        var Qa = function (e) {
            return xs.getCustomSymbolComponent("\\text").toModel(e);
        };
        var Za = "\\mathrm";
        var Xa = To("\\mathrm", false);
        var Ja = "\\mathbf";
        var $a = To("\\mathbf", false);
        var ei = "\\boldsymbol";
        var ti = To("\\boldsymbol", false);
        var ni = "\\mathit";
        var ri = To("\\mathit", false);
        var ai = "\\mathbb";
        var ii = To("\\mathbb", false);
        var oi = "\\mathcal";
        var si = To("\\mathcal", false);
        var li = "\\mathfrak";
        var ci = To("\\mathfrak", false);
        var di = "\\mathsf";
        var hi = To("\\mathsf", false);
        var ui = "\\mathtt";
        var pi = To("\\mathtt", false);
        var mi = "\\mathscr";
        var fi = To("\\mathscr", false);
        var gi = "\\rm";
        var yi = To("\\rm", false);
        var Ai = "\\bf";
        var Ei = To("\\bf", false);
        var vi = "\\it";
        var Si = To("\\it", false);
        var Ci = "\\bb";
        var xi = To("\\bb", false);
        var Ii = "\\cal";
        var Ti = To("\\cal", false);
        var bi = "\\frak";
        var Li = To("\\frak", false);
        var Ri = "\\sf";
        var Mi = To("\\sf", false);
        var wi = "\\tt";
        var Oi = To("\\tt", false);
        var Di = function (e, t) {
            return Cs.startsWith(e, "\\math") || "\\boldsymbol" === e || (e = "\\math" + e.substring(1)),
            xs.getCustomSymbolComponent("\\mathbb").toModel(e, null, t);
        };
        var Ni = ",";
        var ki = To(",", false);
        var Bi = ":";
        var Pi = To(":", false);
        var Fi = ";";
        var Hi = To(";", false);
        var _i = "!";
        var Ui = To("!", false);
        var Wi = function (e) {
            return "!" === e ? {
                text: ""
            } : Ds(" ");
        };
        var Gi = /^[a-zA-Z|]/;
        var zi = bo([["a", "z"], ["A", "Z"], "|"], false, false);
        var Yi = function () {
            return Io();
        };
        var Ki = function (e) {
            switch (e) {
            case "\\begin":
                case "\\end":
                case "\\item":
                case "\\section":
                case "\\subsection":
                case "\\subsubsection":
                case "\\hline":
                return false;
            }
            return true;
        };
        var Vi = function (e) {
            switch (e) {
            case "\\lVert":
                return {
                    type: "single",
                    id: bs.nextId(),
                    text: "\\left\\Vert"
                };
            case "\\rVert":
                return {
                    type: "single",
                    id: bs.nextId(),
                    text: "\\right\\Vert"
                };
            case "\\lvert":
                return {
                    type: "single",
                    id: bs.nextId(),
                    text: "\\left|"
                };
            case "\\rvert":
                return {
                    type: "single",
                    id: bs.nextId(),
                    text: "\\right|"
                };
            case "\\strut":
                case "\\mathstrut":
                return {
                    text: ""
                };
            case "\\tilde":
                return Ds("~");
            case "\\hat":
                return Ds("^");
            case "\\backslash":
                return Ds("\\");
            case "\\quad":
                return Ds(" ");
            case "\\qquad":
                return Ds(" ");
            case "\\gets":
                e = "\\leftarrow";
                break;
            case "\\to":
                e = "\\rightarrow";
                break;
            case "\\empty":
                e = "\\emptyset";
            }
            var t = xs.getByName(e);
            return t && null === t.type ? Ds(t.symbol) : t ? xs.getCustomSymbolComponent(e).toModel(e) : function (e) {
                return {
                    id: bs.nextId(),
                    type: "unknown-command",
                    text: e
                };
            } (e);
        };
        var ji = function (e) {
            return xs.getCustomSymbolComponent("\\group").toModel(null, null, e);
        };
        var qi = "%";
        var Qi = To("%", false);
        var Zi = /^[^\r\n]/;
        var Xi = bo(["\r", "\n"], true, false);
        var Ji = function (e) {
            return {
                type: "comment",
                text: e.join("")
            };
        };
        var $i = "^";
        var eo = To("^", false);
        var to = "_";
        var no = To("_", false);
        var ro = function (e, t, n) {
            return xs.getCustomSymbolComponent("\\power-index").toModel(e, t, n);
        };
        var ao = function (e) {
            return Ms(e);
        };
        var io = function (e, t) {
            return {
                id: bs.nextId(),
                blocks: e
            };
        };
        var oo = /^[^\r\n \t\u02DC#$%\^_\\{}&\]]/;
        var so = bo(["\r", "\n", " ", "\t", "\u02dc", "#", "$", "%", "^", "_", "\\", "{", "}", "&", "]"], true, false);
        var lo = function (e) {
            return {
                id: bs.nextId(),
                text: e.join("")
            };
        };
        var co = function (e) {
            return e.length > 0 && "\\hline" === e[e.length - 1] && (e.length > 1 ? (e[e.length - 2].lastHLine = true, e.splice(e.length - 1, 1)) : e[0] = {
                id: bs.nextId(),
                blocks: [],
                firstHLine: true
            }),
            e;
        };
        var ho = "\\hline";
        var uo = To("\\hline", false);
        var po = function (e) {
            return e;
        };
        var mo = "&";
        var fo = To("&", false);
        var go = function (e, t, n) {
            var r = 0;
            for (; r < t.length; r++) {
                if ("&" === t[r]) {
                    t[r] = Ls.createEmptyEditor();
                }
            }
            return {
                id: bs.nextId(),
                sections: t,
                firstHLine: null != e
            };
        };
        var yo = function (e) {
            return {
                id: bs.nextId(),
                lines: Ms([{
                    id: bs.nextId(),
                    blocks: e
                }])
            };
        };
        var Ao = 0;
        var Eo = 0;
        var vo = [{
            line: 1,
            column: 1
        }];
        var So = 0;
        var Co = [];
        var xo = 0;
        if ("startRule" in t) {
            if (! (t.startRule in i)) {
                throw new Error("Can't start parsing from rule \"" + t.startRule + '".');
            }
            o = i[t.startRule];
        }
        var Cs = t._;
        var xs = t.symbolProvider;
        var Is = t.openBraces;
        var Ts = t.closeBraces;
        var bs = t.generator;
        var Ls = (t.modelHelper, t.modelCreator);
        var Ms = t.grammarHelper.processLines;
        var ws = {
            "\\tilde": "~",
            "\\hat": "^"
        };
        if ((n = o()) !== a && Ao === e.length) {
            return n;
        }
        throw n !== a && Ao < e.length && Mo({
            type: "end"
        }),
        wo(Co, So < e.length ? e.charAt(So) : null, So < e.length ? Ro(So, So + 1) : Ro(So, So));
    }
}

export default LatexParserCore