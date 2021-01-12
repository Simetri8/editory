import _ from 'lodash';

/// xxx(179) /*IsNumber*/

/*n.d(t, "c", function () {
    return i
}),*/
/*n.d(t, "b", function () {
    return s
}),*/
/*n.d(t, "a", function () {
    return l
});*/
/// var r = n(2)/*lodash*/;  // 2 times
/// var a = n.n(r);
var i = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = arguments.length > 2 ? arguments[2] : void 0;
    return void 0 !== n ? s(o(e, t), n) : o(e, t)
},
o = (e, t) => {
    if (_.isNumber(e)) return e;
    var n = Number.parseFloat(e);
    return Number.isNaN(n) ? t : n
},
s = (e, t) => +e.toFixed(t),
l = e => {
    if (_.isNumber(e)) return !0;
    var t = Number.parseFloat(e);
    return !Number.isNaN(t)
}

export { i as IsNumberC }

export { s as IsNumberB }

export default l