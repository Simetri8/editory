import _ from 'lodash';
import React from 'react';
import BracketHelper from '../Editor/BracketHelper';
import DOMHelper, { DOMHelperB } from './DOMHelper';
import FontList from '../Font/FontList';
import Global from '../Global';
import ParenthesisSvgCreater, { ParenthesisSvgCreaterB } from '../Editor/ParenthesisSvgCreater';
import Svg from './Svg';
import SvgCreator from '../Editor/SvgCreator';

/// xxx(249) /*VComposedSymbol*/

/// var r = n(0)/*React*/;  // 42 times
/// var a = n.n(r);
/// var i = n(152)/*BracketHelper*/;  // 1 times
/// var o = n(2)/*lodash*/;  // 3 times
/// var s = n.n(o);
/// var l = n(4)/*DOMHelper*/;  // 6 times
/// var c = n(11)/*Global*/;  // 1 times
/// var d = n(48)/*FontList*/;  // 1 times
/// var u = n(82)/*Svg*/,  // 11 times
/// p = n(286)/*ParenthesisSvgCreater*/,  // 2 times
/// m = n(128)/*SvgCreator*/;  // 7 times
class h extends React.Component {
    constructor() {
        super(...arguments);
        this.updateComponent = () => {
            this.props.fixedContextHandler.getRenderingContext().nextCycleIfRequired(() => {
                this.forceUpdate();
            });
        };
    }
    renderRepeat(e, t) {
        t = t || DOMHelper.getComputedFontSize(this.rootElement);
        var n = this.getCurrentRootHeight();
        var r = [];
        var i = 0;
        var o = 0;
        for (; o <= n; o = o + t) {
            r.push(React.createElement("x-inside", {
                key: i
            },
            e));
            i++;
        }
        return r;
    }
    componentWillReceiveProps() {
        this.props.fixedContextHandler.getBatchUpdater().pushToEnd(this.updateComponent, this, true);
    }
    shouldComponentUpdate() {
        return false;
    }
    componentWillUnmount() {
        this.willComponentUnmount = true;
    }
    componentDidMount() {
        this.props.fixedContextHandler.getBatchUpdater().pushToEnd(this.updateComponent, this, true);
    }
    renderAs3Parts() {
        var e = this.props;
        var t = e.startChar;
        var n = e.repeatChar;
        var r = e.endChar;
        return React.createElement("vcomposed-symbol", {
            style: this.getStyle(this.getCurrentRootHeight()),
            class: this.getClassName(),
            ref: (e) => {
                return this.rootElement = e;
            }
        },
        t ? React.createElement("start", null, t) : null, React.createElement("x-middle", null, React.createElement("x-fixed", null, this.renderRepeat(n))), r ? React.createElement("end", null, r) : null);
    }
    getStyle(e) {
        var t = {};
        if (this.props.fontSizeEm) {
            var n = _.isFunction(this.props.fontSizeEm) ? this.props.fontSizeEm(e) : this.props.fontSizeEm;
            t.fontSize = n + "em";
        }
        return t;
    }
    getClassName() {
        return Global.isSafari() ? this.props.className : this.props.className + " non-safari";
    }
    getReverseScale() {
        return this.props.getReverseScale ? this.props.getReverseScale() : 1;
    }
    getCurrentRootHeight() {
        return this.getReverseScale() * DOMHelper.getElementRect(this.rootElement).height;
    }
    renderAs5Parts() {
        var e = this.props;
        var t = e.startChar;
        var n = e.repeatChar;
        var r = e.endChar;
        var i = e.middleChar;
        var o = this.props.fontSize;
        return React.createElement("vcomposed-symbol", {
            style: this.getStyle(this.getCurrentRootHeight()),
            class: this.getClassName(),
            ref: (e) => {
                return this.rootElement = e;
            }
        },
        t ? React.createElement("start", null, t) : null, React.createElement("x-middle", null, React.createElement("x-fixed", null, this.renderRepeat(n, 2 * o))), React.createElement("middle-center", null, i), React.createElement("x-middle", null, React.createElement("x-fixed", null, this.renderRepeat(n, 2 * o))), r ? React.createElement("end", null, r) : null);
    }
    render() {
        if (null == this.rootElement) {
            var e = this.props.heightChar || this.props.repeatChar;
            return React.createElement("vcomposed-symbol", {
                style: {
                    zIndex: this.props.zIndex,
                    fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.props.baseMathModeFontFamily)
                },
                class: this.getClassName(),
                ref: (e) => {
                    return this.rootElement = e;
                }
            },
            e);
        }
        return this.props.middleChar ? this.renderAs5Parts() : this.renderAs3Parts();
    }
}
var f = new SvgCreator;
f.push("M 531 0");
f.push("q 0 -5 -7 -5");
f.push("q -10 0 -30 10");
f.push("q -133 71 -192 226.5");
f.push("t -59 427.5");
f.push("h 95");
f.push("v -60");
f.push("q 0 -73 2 -124");
f.push("t 11 -125.5");
f.push("t 25.5 -128");
f.push("t 49 -107");
f.push("t 77.5 -87.5");
f.push("q 28 -20 28 -27");
var g = new SvgCreator;
g.push("M 338 0");
g.push("h -95");
g.push("v 20");
g.push("q 0 73 -20 133.5");
g.push("t -47 94");
g.push("t -57 56.5");
g.push("t -47.5 31");
g.push("t -20.5 8");
g.push("v 2");
g.push("q 3 0 20.5 8.5");
g.push("t 47.5 32");
g.push("t 57 58");
g.push("t 47 95");
g.push("t 20 133.5");
g.push("v 20");
g.push("h 95");
g.push("v -20");
g.push("q 0 -40 -8.5 -81");
g.push("t -29.5 -88.5");
g.push("t -63.5 -89");
g.push("t -102.5 -67.5");
g.push("q 60 -25 102.5 -66.5");
g.push("t 63.5 -89");
g.push("t 29.5 -89");
g.push("t 8.5 -81.5");
g.push("v -20");
var y = 648;
var A = 680;
var E = 1e3;
function v(e, t, n) {
    var r = n / 10;
    var i = Math.min(n / E, (t - 2 * r) / (2 * y + A));
    var o = _.clamp((t - 2 * r) / (2 * y + A), n / 1100, n / 1e3);
    var l = t - r;
    var c = f.scale(o, i).shift(0, r);
    var d = f.scale(o, i).flipY().shift(0, l);
    var h = g.scale(o, i).shift(0, t / 2 - A / 2 * i);
    var u = i < i ? 0 : Math.max(((t - 2 * r) / i - (2 * y + A)) / 2, 0);
    var p = new SvgCreator;
    p.pushArr(["M 243 0", "v ".concat(u, " "), "h 95", "v ".concat(-u)]);
    var v = p.scale(o, i).shift(0, r + y * i);
    var S = p.scale(o, i).shift(0, t / 2 + A / 2 * i);
    return [React.createElement("path", {
        key: "0",
        d: "".concat(c.path(), " z  ").concat(v.path(), " z ").concat(h.path(), " z ").concat(S.path(), " z"),
        stroke: "none"
    }), React.createElement("path", {
        key: "1",
        d: "".concat(d.path(), " z"),
        stroke: "none"
    })];
}
function S(e, t, n) {
    var r = n / 10;
    var i = Math.min(n / E, (t - 2 * r) / (2 * y + A));
    var o = _.clamp((t - 2 * r) / (2 * y + A), n / 1100, n / 1e3);
    var l = t - r;
    var c = n / 2;
    var d = f.scale(o, i).shift(-c, n / 10).flipX();
    var h = f.scale(o, i).flipY().shift(-c, l).flipX();
    var u = g.scale(o, i).shift(-c, t / 2 - A / 2 * i).flipX();
    var p = i < i ? 0 : Math.max(((t - 2 * r) / i - (2 * y + A)) / 2, 0);
    var v = new SvgCreator;
    v.pushArr(["M 243 0", "v ".concat(p, " "), "h 95", "v ".concat(-p)]);
    var S = v.scale(o, i).shift(-c, r + y * i).flipX();
    var C = v.scale(o, i).shift(-c, t / 2 + A / 2 * i).flipX();
    return [React.createElement("path", {
        key: "0",
        d: "".concat(d.path(), " z  ").concat(S.path(), " z ").concat(u.path(), " z ").concat(C.path(), " z"),
        stroke: "none"
    }), React.createElement("path", {
        key: "1",
        d: "".concat(h.path(), " z"),
        stroke: "none"
    })];
}
var C = new SvgCreator;
C.push("M 352 0");
C.push("l -6 -6");
C.push("q -64 2 -127 2");
C.push("q -60 0 -126 -2");
C.push("l -9 13");
C.push("q 9 34 9 185");
C.push("v 50");
C.push("h 84");
C.push("v -50");
C.push("q 0 -77 4 -126");
C.push("q 3 -35 70 -35");
C.push("h 97");
C.push("l 4 -5");
C.push("v -26");
var x = 231;
var I = 1e3;
function T(e, t, n) {
    var r = n / 10;
    var i = Math.min(n / I, (t - 2 * r) / (2 * x));
    var o = n / I;
    var s = t - r;
    var l = C.scale(o, i).shift(0, r);
    var c = C.scale(o, i).flipY().shift(0, s);
    var d = i < o ? 0 : Math.max((t - 2 * r) / i - 2 * x, 0);
    var h = new SvgCreator;
    h.pushArr(["M 93 0", "v ".concat(d, " "), "h 84", "v ".concat(-d)]);
    var u = h.scale(o, i).shift(0, x * i + r);
    return [React.createElement("path", {
        key: "0",
        d: "".concat(l.path(), " z ").concat(u.path(), " z "),
        stroke: "none"
    }), React.createElement("path", {
        key: "1",
        d: "".concat(c.path(), " z"),
        stroke: "none"
    })];
}
function b(e, t, n) {
    var r = n / 10;
    var i = Math.min(n / I, (t - 2 * r) / (2 * x));
    var o = n / I;
    var s = t - r;
    var l = n / 2.25;
    var c = C.scale(o, i).shift(-l, r).flipX();
    var d = C.scale(o, i).flipY().shift(-l, s).flipX();
    var h = i < o ? 0 : Math.max((t - 2 * r) / i - 2 * x, 0);
    var u = new SvgCreator;
    u.pushArr(["M 93 0", "v ".concat(h, " "), "h 84", "v ".concat(-h)]);
    var p = u.scale(o, i).shift(-l, x * i + r).flipX();
    return [React.createElement("path", {
        key: "0",
        d: "".concat(c.path(), " z ").concat(p.path(), " z"),
        stroke: "none"
    }), React.createElement("path", {
        key: "1",
        d: "".concat(d.path(), " z"),
        stroke: "none"
    })];
}
function L(e, t, n) {
    var r = n / 9;
    var i = n / 9;
    var o = "".concat(e.toFixed(2), ",").concat(i.toFixed(2), " ").concat(r.toFixed(2), ",").concat((t / 2).toFixed(2), " ").concat(e.toFixed(2), ",").concat((t - i).toFixed(2));
    return React.createElement("polyline", {
        points: o,
        strokeWidth: Object(DOMHelperB)(n),
        fill: "none"
    });
}
function R(e, t, n) {
    var r = n / 9;
    var i = n / 9;
    var o = "".concat(0, ",", i.toFixed(2), " ").concat((e - r).toFixed(2), ",").concat((t / 2).toFixed(2), " ", 0, ",").concat((t - i).toFixed(2));
    return React.createElement("polyline", {
        points: o,
        strokeWidth: Object(DOMHelperB)(n),
        fill: "none"
    });
}
function M(e, t, n) {
    var r = n / 9;
    var i = n / 9;
    var o = "".concat(e.toFixed(2), ",").concat(i.toFixed(2), " ").concat(r.toFixed(2), ",").concat((t - i).toFixed(2));
    return React.createElement("polyline", {
        points: o,
        strokeWidth: Object(DOMHelperB)(n),
        fill: "none"
    });
}
function w(e, t, n) {
    var r = n / 9;
    var i = n / 9;
    var o = "".concat(0, ",", i.toFixed(2), " ").concat((e - r).toFixed(2), ",").concat((t - i).toFixed(2));
    return React.createElement("polyline", {
        points: o,
        strokeWidth: Object(DOMHelperB)(n),
        fill: "none"
    });
}
function O(e, t, n) {
    var r = n / 9;
    return React.createElement("rect", {
        x: (e / 2 - n / 13 / 2).toFixed(2),
        y: r.toFixed(2),
        width: (n / 13).toFixed(2),
        height: (t - 2 * r).toFixed(2),
        stroke: "none"
    });
}
/*n.d(t, "a", function () {
    return D;
});*/
class D extends React.Component {
    shouldComponentUpdate(e) {
        return !this.props.updateOnlyOnNotifyDataChanged || e.notifyData != this.props.notifyData;
    }
    render() {
        var e = this.props;
        var t = void 0;
        var n = void 0;
        var r = void 0;
        var o = void 0;
        var s = void 0;
        var l = this.props.zIndex;
        switch (e.delimiter) {
        case "open-brace":
            return t = "{",
            n = "\u23a7",
            r = "\u23aa",
            o = "\u23a9",
            s = "\u23a8",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    width: "0.5em",
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: v,
                changedData: this.props.notifyData
            });
        case "close-brace":
            return t = "}",
            n = "\u23ab",
            r = "\u23aa",
            o = "\u23ad",
            s = "\u23ac",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    width: "0.5em",
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: S,
                changedData: this.props.notifyData
            });
        case "open-bracket":
            return t = "[",
            n = "\u23a1",
            r = "\u23a2",
            o = "\u23a3",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    width: "0.45em",
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: T,
                changedData: this.props.notifyData
            });
        case "close-bracket":
            return t = "]",
            n = "\u23a4",
            r = "\u23a5",
            o = "\u23a6",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    width: "0.45em",
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: b,
                changedData: this.props.notifyData
            });
        case "open-parenthesis":
            return t = "(",
            n = "\u239b",
            r = "\u239c",
            o = "\u239d",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    width: "0.5em",
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: ParenthesisSvgCreater,
                changedData: this.props.notifyData
            });
        case "close-parenthesis":
            return t = ")",
            n = "\u239e",
            r = "\u239f",
            o = "\u23a0",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    width: "0.5em",
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: ParenthesisSvgCreaterB,
                changedData: this.props.notifyData
            });
        case "open-vert":
            case "close-vert":
            return t = "|",
            r = "\u23f1",
            React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: O,
                changedData: this.props.notifyData
            });
        case "open-Vert":
            case "close-Vert":
            t = "\u2016";
            r = "\u23f0";
            break;
        case "open-floor":
            t = "\u230a";
            o = "\u23f6";
            r = "\u23f7";
            break;
        case "close-floor":
            t = "\u230b";
            o = "\u23f8";
            r = "\u23f9";
            break;
        case "open-ceil":
            t = "\u230a";
            n = "\u23f2";
            r = "\u23f3";
            break;
        case "close-ceil":
            t = "\u230b";
            n = "\u23f4";
            r = "\u23f5";
            break;
        case "open-uparrow":
            case "close-uparrow":
            t = "\u2191";
            n = "\u23fa";
            r = "\u23fb";
            break;
        case "open-downarrow":
            case "close-downarrow":
            t = "\u2193";
            o = "\u23fc";
            r = "\u23fd";
            break;
        case "open-updownarrow":
            case "close-updownarrow":
            t = "\u2195";
            n = "\u23fe";
            o = "\u23ff";
            r = "\u2400";
            break;
        case "open-Uparrow":
            case "close-Uparrow":
            t = "\u21d1";
            n = "\u2401";
            r = "\u2402";
            break;
        case "open-Downarrow":
            case "close-Downarrow":
            t = "\u2193";
            o = "\u2403";
            r = "\u2404";
            break;
        case "open-Updownarrow":
            case "close-Updownarrow":
            t = "\u21d5";
            n = "\u2401";
            o = "\u2403f";
            r = "\u2404";
            break;
        case "open-angle":
            return React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: L,
                changedData: this.props.notifyData
            });
        case "close-angle":
            return React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: R,
                changedData: this.props.notifyData
            });
        case "open-slash":
            return React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: M,
                changedData: this.props.notifyData
            });
        case "close-slash":
            return React.createElement(Svg, {
                fixedContextHandler: this.props.fixedContextHandler,
                style: {
                    zIndex: l
                },
                getReverseScale: this.props.getReverseScale,
                renderSvg: w,
                changedData: this.props.notifyData
            });
        }
        var c = e.fontSizeEm;
        return c || (c = function (e, t, n) {
            return BracketHelper.fontSizeEmByHeight(n, t, e);
        }.bind(this, e.delimiter, e.fontSize)),
        React.createElement(h, {
            fixedContextHandler: this.props.fixedContextHandler,
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            zIndex: l,
            getReverseScale: this.props.getReverseScale,
            fontSizeEm: c,
            fontSize: e.fontSize,
            className: e.delimiter,
            heightChar: t,
            startChar: n,
            middleChar: s,
            repeatChar: r,
            endChar: o
        });
    }
}

export default D