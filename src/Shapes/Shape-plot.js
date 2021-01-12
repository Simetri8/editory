import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import ArrayHelper from '../Mathcha/ArrayHelper';
import ColorHelper from '../Mathcha/ColorHelper';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import DiagramElementCreater from '../Editor/DiagramElementCreater';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import MathPlotSettingsBuilder from '../Mathcha/MathPlotSettingsBuilder';
import MovingHandler from '../Editor/MovingHandler';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import RunningBuiltinWorker from '../Mathcha/running-builtin-worker';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import TransformHelper from '../Editor/TransformHelper';
import WorkerInitializer from '../Mathcha/WorkerInitializer';

/// xxx(1539) /*Shape-plot*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/// var r = n(2)/*lodash*/;  // 1 times
/// var a = n.n(r);
/// var i = n(7)/*PropUpdateHelper*/;  // 2 times
/// var o = n(1)/*Geometry*/;  // 6 times
/// var s = n(6)/*DiagramIdHelper*/;  // 3 times
/// var p = n(35)/*slicedToArray*/;  // 1 times
/// var m = n.n(p);
/// var f = n(3);  // 5 times
/// var g = n.n(f);
/// var y = n(9)/*ShapeBase*/;  // 1 times
/// var S = n(0)/*React*/;  // 77 times
/// var C = n.n(S);
/// var x = n(25)/*ColorHelper*/;  // 2 times
/// var H = n(16)/*ReactDOM*/;  // 1 times
/// var rd = n.n(H);
/// var U = n(5)/*sizzle*/;  // 1 times
/// var W = n.n(U);
/// var G = n(206)/*MathPlotSettingsBuilder*/;  // 4 times
/// var z = n(57)/*MovingHandler*/;  // 1 times
/// var Y = n(70)/*TransformHelper*/;  // 1 times
/// var V = n(42)/*ColorTypeConverter*/;  // 4 times
/// var X = n(43)/*ArrayHelper*/;  // 2 times
/// var J = n(178)/*WorkerInitializer*/;  // 2 times
/// var rbw = n(669)/*running-builtin-worker*/;  // 1 times
/// var de = n(141)/*DiagramElementCreater*/;  // 1 times
/// var he = n(17)/*ItemDefaultSettings*/;  // 52 times
/*n.d(t, "b", function () {
    return ShapePlot
});*/
var K = new class {
    run(e, t) {
        var n = e.minMax;
        var r = e.unitType;
        var a = e.majorSteps;
        if ("radix10" != r) {
            if ("pi" == r) {
                var i = (n.max - n.min) / a;
                var s = this.parseAsPowerOf10(i / Math.PI);
                var l = this.getMapNumber(s.value);
                var c = _.assignIn({},
                s, {
                    value: l
                });
                var d = this.getNumberFromExponentInfo(c);
                var h = d * Math.PI;
                var u = this.getFirstStep(n.min, h);
                var p = this.getFirstStep(n.min / Math.PI, d);
                var m = 0;
                for (; u <= n.max; u = u + h, m = m + 1, p = p + d) {
                    var f = Geometry.round4(p);
                    var y = "".concat(f, "\u03c0");
                    if (1 === f) y = "\u03c0";
                    if (0 === f) y = "0";
                    t(u, m, h, y, 0 === f)
                }
            }
        } else {
            var A = (n.max - n.min) / a;
            var E = this.parseAsPowerOf10(A);
            var v = this.getMapNumber(E.value);
            var S = _.assignIn({},
            E, {
                value: v
            });
            var C = this.getNumberFromExponentInfo(S);
            var x = this.getFirstStep(n.min, C);
            var I = 0;
            for (; x <= n.max; x = x + C, I = I + 1) t(x = Geometry.round4(x), I, C, x.toString(), 0 === x)
        }
    }
    getFirstStep(e, t) {
        return e % t === 0 ? e : e + t < 0 ? Geometry.round2(e - (e + t) % t) : Geometry.round2(e + t - (e + t) % t)
    }
    getMapNumber(e) {
        if (e < 1.5) return 1;
        if (e < 2.3) return 2;
        if (e < 4) return 2.5;
        if (e < 7) return 5;
        if (e < 11) return 10;
        throw new Error("should not go here");
    }
    getNumberFromExponentInfo(e) {
        return Number("".concat(e.value, "e").concat(e.exponent))
    }
    parseAsPowerOf10(e) {
        var t = e.toExponential();
        var n = /e([-+]?\d+)$/g.exec(t);
        return {
            value: Number.parseInt("-" == t[0] ? t.substr(0, 2) : t[0]),
            exponent: Number.parseInt(n[1])
        }
    }
};
class j extends React.Component {
    getYPosition(e) {
        var t = this.props;
        var n = t.start;
        switch (t.halfSizePosition) {
        case "above":
            return {
                y1: n.y - e,
                y2: n.y
            };
        case "below":
            return {
                y1: n.y,
                y2: n.y + e
            };
        default:
            return {
                y1: n.y - e,
                y2: n.y + e
            }
        }
    }
    render() {
        var e;
        var t;
        var n = this.props;
        var r = n.start;
        var a = n.lineSize;
        var i = n.minMax;
        var o = n.zeroPosition;
        var s = n.showArrow;
        var l = n.showAxisLine;
        var c = this.props.axisInfo;
        var d = c.axisColor;
        var h = c.minorStep;
        var u = c.minorTickShow;
        var p = c.majorSteps;
        var m = c.unitType;
        var f = c.axisThickness;
        var g = ColorTypeConverter.getHtmlColor(d);
        var y = i.max - i.min;
        var A = [];
        var E = [];
        var v = {
            majorSteps: p,
            minMax: i,
            unitType: m
        };
        if (K.run(v, (n, s, l, c, d) => {
            if (void 0 === e) {
                e = n;
                t = l / (h + 1)
            }
            var u = (n - i.min) / y * a + r.x;
            if (!o || !d) {
                var p = this.getYPosition(4 + Math.floor(f));
                var m = p.y1;
                var E = p.y2;
                A.push(this.makeLine(s, u, m, u, E, g, f))
            }
        }), u) {
            var S = s ? i.max - 15 / a * y : i.max;
            var x = this.getYPosition(2 + Math.floor(f));
            var I = x.y1;
            var T = x.y2;
            var b = e;
            var L = 0;
            for (; b < S; b = b + t, L = L + 1) {
                var R = (b - i.min) / y * a + r.x;
                E.push(this.makeLine(L, R, I, R, T, g, f))
            }
            var M = e;
            var w = -1;
            for (; M > i.min; M = M - t, w = w - 1) {
                var O = (M - i.min) / y * a + r.x;
                E.push(this.makeLine(w, O, I, O, T, g, f))
            }
        }
        var D = r.x + a - 1.5 - Math.floor(f / 2);
        var N = 4 + Math.floor(f);
        var k = "M".concat(D - N, ",").concat(r.y - N, " L").concat(D, ",").concat(r.y, " L").concat(D - N, ",").concat(r.y + N);
        var B = s ? React.createElement("path", {
            d: k,
            stroke: g,
            strokeWidth: f
        }) : void 0;
        var P = l ? this.makeLine("axis-line", r.x, r.y, r.x + a - Math.round(f / 2) - .5, r.y, g, f) : void 0;
        return React.createElement("g", {
            style: {
                fontFamily: "Asana-Math,Asana"
            }
        },
        P, E, A, B)
    }
    makeLine(e, t, n, r, a, i, o) {
        return React.createElement("line", {
            key: e,
            x1: t,
            y1: n,
            x2: r,
            y2: a,
            fill: "none",
            stroke: i,
            strokeWidth: o
        })
    }
}
class q extends React.Component {
    getYPosition(e) {
        var t = this.props;
        var n = t.start;
        switch (t.halfSizePosition) {
        case "left":
            return {
                x1: n.x - e,
                x2: n.x
            };
        case "right":
            return {
                x1: n.x,
                x2: n.x + e
            };
        default:
            return {
                x1: n.x - e,
                x2: n.x + e
            }
        }
    }
    render() {
        var e;
        var t;
        var n = this.props;
        var r = n.start;
        var a = n.lineSize;
        var i = n.minMax;
        var o = n.zeroPosition;
        var s = n.showArrow;
        var l = n.showAxisLine;
        var c = this.props.axisInfo;
        var d = c.axisColor;
        var h = c.minorStep;
        var u = c.minorTickShow;
        var p = c.majorSteps;
        var m = c.unitType;
        var f = c.axisThickness;
        var g = ColorTypeConverter.getHtmlColor(d);
        var y = i.max - i.min;
        var A = [];
        var E = [];
        var v = {
            majorSteps: p,
            minMax: i,
            unitType: m
        };
        if (K.run(v, (n, s, l, c, d) => {
            if (void 0 === e) {
                e = n;
                t = l / (h + 1)
            }
            var u = a - (n - i.min) / y * a + r.y;
            if (!o || !d) {
                var p = this.getYPosition(4 + Math.floor(f));
                var m = p.x1;
                var E = p.x2;
                A.push(this.makeLine(s, m, u, E, u, g, f))
            }
        }), u) {
            var S = s ? i.max - 15 / a * y : i.max;
            var x = this.getYPosition(2 + Math.floor(f));
            var I = x.x1;
            var T = x.x2;
            var b = e;
            var L = 0;
            for (; b < S; b = b + t, L = L + 1) {
                var R = a - (b - i.min) / y * a + r.y;
                E.push(this.makeLine(L, I, R, T, R, g, f))
            }
            var M = e;
            var w = -1;
            for (; M > i.min; M = M - t, w = w - 1) {
                var O = a - (M - i.min) / y * a + r.y;
                E.push(this.makeLine(w, I, O, T, O, g, f))
            }
        }
        var D = r.y + 1.5 + Math.floor(f / 2);
        var N = 4 + Math.floor(f);
        var k = "M".concat(r.x - N, ",").concat(D + N, " L").concat(r.x, ",").concat(D, " L").concat(r.x + N, ",").concat(D + N);
        var B = s ? React.createElement("path", {
            d: k,
            stroke: g,
            strokeWidth: f
        }) : void 0;
        var P = l ? this.makeLine("axis-line", r.x, r.y + Math.round(f / 2) + .5, r.x, r.y + a, g, f) : void 0;
        return React.createElement("g", {
            style: {
                fontFamily: "Asana-Math,Asana"
            }
        },
        P, E, A, B)
    }
    makeLine(e, t, n, r, a, i, o) {
        return React.createElement("line", {
            key: e,
            x1: t,
            y1: n,
            x2: r,
            y2: a,
            fill: "none",
            stroke: i,
            strokeWidth: o
        })
    }
}
class Q extends React.Component {
    render() {
        var e = this.props;
        var t = e.start;
        var n = e.lineSize;
        var r = e.minMax;
        var a = e.zeroPosition;
        var i = e.preventShowingNumber;
        var o = this.props.axisInfo;
        var s = o.majorTextColor;
        var l = o.plotAxisNumering;
        var c = o.majorTextFontSize;
        var d = o.majorSteps;
        var h = o.unitType;
        var u = o.axisThickness;
        var p = ColorTypeConverter.getHtmlColor(s);
        var m = r.max - r.min;
        var f = [];
        var g = {
            majorSteps: d,
            minMax: r,
            unitType: h
        };
        if (K.run(g, (e, o, s, d, h) => {
            if (!a || !h) {
                var g = (e - r.min) / m * n + t.x;
                if (l && !i) f.push(React.createElement("text", {
                    textAnchor: "middle",
                    fontSize: c,
                    dominantBaseline: "hanging",
                    key: o,
                    stroke: "none",
                    fill: p,
                    x: g,
                    y: t.y + 7 + Math.floor(u / 2)
                },
                d))
            }
        }), l && !i && "left" == a && r.min < 0 && r.max > 0) {
            var y = (0 - r.min) / m * n + t.x;
            f.push(React.createElement("text", {
                textAnchor: "middle",
                fontSize: c,
                dominantBaseline: "hanging",
                key: "zero",
                stroke: "none",
                fill: p,
                x: y - 8 - Math.floor(u / 2),
                y: t.y + 5 + Math.floor(u / 2)
            },
            "0"))
        }
        return React.createElement("g", {
            style: {
                fontFamily: "Asana-Math,Asana"
            }
        },
        f)
    }
}
class Z extends React.Component {
    render() {
        var e = this.props;
        var t = e.start;
        var n = e.lineSize;
        var r = e.minMax;
        var a = e.zeroPosition;
        var i = e.preventShowingNumber;
        var o = this.props.axisInfo;
        var s = o.majorTextColor;
        var l = o.plotAxisNumering;
        var c = o.majorTextFontSize;
        var d = o.majorSteps;
        var h = o.unitType;
        var u = o.axisThickness;
        var p = ColorTypeConverter.getHtmlColor(s);
        var m = r.max - r.min;
        var f = [];
        var g = {
            majorSteps: d,
            minMax: r,
            unitType: h
        };
        if (K.run(g, (e, o, s, d, h) => {
            var g = n - (e - r.min) / m * n + t.y;
            if (! (a && h)) if (l && !i) f.push(React.createElement("text", {
                textAnchor: "end",
                dominantBaseline: "middle",
                fontSize: c,
                key: o,
                stroke: "none",
                fill: p,
                x: t.x - 8 - Math.floor(u / 2),
                y: g
            },
            d))
        }), l && !i && "lower" == a && r.min < 0 && r.max > 0) {
            var y = n - (0 - r.min) / m * n + t.y;
            f.push(React.createElement("text", {
                textAnchor: "end",
                dominantBaseline: "middle",
                fontSize: c,
                key: "zero",
                stroke: "none",
                fill: p,
                x: t.x - 8 - Math.floor(u / 2),
                y: y
            },
            "0"))
        }
        return React.createElement("g", {
            style: {
                fontFamily: "Asana-Math,Asana"
            }
        },
        f)
    }
}
var n669 = (RunningBuiltinWorker, {
    DEFAULT_WIDTH: 550,
    DEFAULT_HEIGHT: 350,
    TIP_X_EPS: 1,
    DEFAULT_ITERATIONS: null,
    MAX_ITERATIONS: 0
});
n669.DEFAULT_ITERATIONS = null;
n669.MAX_ITERATIONS = 4 * n669.DEFAULT_WIDTH;
var ee = n669;
var te = new WorkerInitializer("builtin.worker");
class ne {
    constructor() {
        this.id = Math.random().toString()
    }
    getWall() {
        if (null == te) te = new WorkerInitializer("builtin.worker");
        return te
    }
    plot(e, t) {
        var n = t.xDomain;
        var r = t.yDomain;
        var a = Math.min(ee.MAX_ITERATIONS, ee.DEFAULT_ITERATIONS || 2 * t.viewWidth);
        return this.getWall().request({
            yDomain: r,
            expressions: e,
            lowHight: {
                lo: n.from,
                hi: n.to
            },
            centerDelta: t.centerDelta,
            nSamples: a,
            yScale: t.yScale,
            xScale: t.xScale,
            settings: t
        },
        this.id)
    }
}
class re extends React.Component {
    constructor(e) {
        super(e);
        this.plotRun = new ne;
        this.handlePlotFinish = (e) => {
            var t = e.status;
            var n = e.data;
            if ("running" != t) {
                if (n.isError) this.props.onError();
                this.setState({
                    plotResult: n
                })
            }
        };
        this.state = {
            plotResult: {
                lines: []
            }
        }
    }
    componentDidMount() {
        this.requestPlot(this.props)
    }
    shouldComponentUpdate(e, t) {
        return t.plotResult != this.state.plotResult || (!(e.functions === this.props.functions && e.scaleXValue === this.props.scaleXValue && e.scaleYValue === this.props.scaleYValue && e.centerXDelta === this.props.centerXDelta && e.centerYDelta === this.props.centerYDelta && ArrayHelper.areEqualShallow(e.p1, this.props.p1) && ArrayHelper.areEqualShallow(e.p2, this.props.p2)) && this.requestPlot(e), false)
    }
    requestPlot(e) {
        var t = e.functions;
        var n = e.p1;
        var r = e.p2;
        var a = e.scaleXValue;
        var i = e.scaleYValue;
        var o = e.centerXDelta;
        var s = e.centerYDelta;
        var l = MathPlotSettingsBuilder.buildMathPlotSettings({
            p1: n,
            p2: r
        },
        a, i, o, s);
        var c = t.map((e) => {
            return MathPlotSettingsBuilder.editorModelToExpression(e.model)
        });
        this.plotRun.plot(c, l).then(this.handlePlotFinish)
    }
    render() {
        if (this.state.plotResult.isError) {
            var e = this.props;
            var t = e.p1;
            var n = e.p2;
            return React.createElement("g", null, React.createElement("text", {
                x: (t.x + n.x) / 2,
                y: (t.y + n.y) / 2 - 10,
                fontSize: 14,
                textAnchor: "middle",
                fill: "red",
                stroke: "none"
            },
            "Error occurred during plotting:"), React.createElement("text", {
                x: (t.x + n.x) / 2,
                y: (t.y + n.y) / 2 + 13,
                fontSize: 14,
                textAnchor: "middle",
                fill: "red",
                stroke: "none"
            },
            "$", this.state.plotResult.errorMessage))
        }
        var r = [];
        var a = 0;
        for (; a < this.state.plotResult.lines.length; a++) {
            var i = this.state.plotResult.lines[a];
            var o = this.props.functions[a];
            var s = ColorHelper.getReactStyleInfo(o.style, ["thickness", "strokeColor", "strokeType"], void 0);
            r.push(React.createElement("path", {
                key: o.model.id,
                d: i,
                style: s.style
            }))
        }
        return React.createElement("g", null, r)
    }
}
class ae extends React.Component {
    render() {
        var e;
        var t;
        var n = this.props;
        var r = n.start;
        var a = n.lineSize;
        var i = n.minMax;
        var o = n.fromY;
        var s = n.toY;
        var l = this.props.axisInfo;
        var c = l.majorSteps;
        var d = l.unitType;
        var h = l.minorStep;
        var u = l.minorGridShow;
        var p = i.max - i.min;
        var m = [];
        var f = [];
        var g = {
            majorSteps: c,
            minMax: i,
            unitType: d
        };
        if (K.run(g, (n, l, c) => {
            if (void 0 === e) {
                e = n;
                t = c / (h + 1)
            }
            var d = (n - i.min) / p * a + r.x;
            m.push(React.createElement("line", {
                key: l,
                x1: d,
                y1: o,
                x2: d,
                y2: s,
                fill: "none",
                stroke: "lightgray",
                strokeWidth: "0.5"
            }))
        }), u) {
            var y = e;
            var A = 0;
            for (; y < i.max; y = y + t, A = A + 1) {
                var E = (y - i.min) / p * a + r.x;
                f.push(React.createElement("line", {
                    key: A,
                    x1: E,
                    y1: o,
                    x2: E,
                    y2: s,
                    fill: "none",
                    stroke: "lightgray",
                    strokeWidth: "0.5"
                }))
            }
            var v = e;
            var S = -1;
            for (; v > i.min; v = v - t, S = S - 1) {
                var x = (v - i.min) / p * a + r.x;
                f.push(React.createElement("line", {
                    key: S,
                    x1: x,
                    y1: o,
                    x2: x,
                    y2: s,
                    fill: "none",
                    stroke: "lightgray",
                    strokeWidth: "0.5"
                }))
            }
        }
        return React.createElement("g", null, f, m)
    }
}
class ie extends React.Component {
    render() {
        var e;
        var t;
        var n = this.props;
        var r = n.start;
        var a = n.lineSize;
        var i = n.minMax;
        var o = n.fromX;
        var s = n.toX;
        var l = this.props.axisInfo;
        var c = l.majorSteps;
        var d = l.unitType;
        var h = l.minorStep;
        var u = l.minorGridShow;
        var p = i.max - i.min;
        var m = [];
        var f = [];
        var g = {
            majorSteps: c,
            minMax: i,
            unitType: d
        };
        if (K.run(g, (n, l, c) => {
            if (void 0 === e) {
                e = n;
                t = c / (h + 1)
            }
            var d = a - (n - i.min) / p * a + r.y;
            m.push(React.createElement("line", {
                key: l,
                x1: o,
                y1: d,
                x2: s,
                y2: d,
                fill: "none",
                stroke: "lightgray",
                strokeWidth: "0.5"
            }))
        }), u) {
            var y = e;
            var A = 0;
            for (; y < i.max; y = y + t, A = A + 1) {
                var E = a - (y - i.min) / p * a + r.y;
                f.push(React.createElement("line", {
                    key: A,
                    x1: o,
                    y1: E,
                    x2: s,
                    y2: E,
                    fill: "none",
                    stroke: "lightgray",
                    strokeWidth: "0.5"
                }))
            }
            var v = e;
            var S = -1;
            for (; v > i.min; v = v - t, S = S - 1) {
                var x = a - (v - i.min) / p * a + r.y;
                f.push(React.createElement("line", {
                    key: S,
                    x1: o,
                    y1: x,
                    x2: s,
                    y2: x,
                    fill: "none",
                    stroke: "lightgray",
                    strokeWidth: "0.5"
                }))
            }
        }
        return React.createElement("g", null, f, m)
    }
}
class oe extends React.Component {
    getXGridElement() {
        if (this.props.plotInfo.xAxis.plotGridShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewWidth;
            var n = e.viewHeight;
            var r = e.unscaledCenterDelta;
            var a = e.xScale;
            var i = this.props.renderInfo.viewPortPos.p1;
            var o = this.getXStart(i, n, r);
            var s = this.getXMinMax(r, a, t);
            return React.createElement(ae, {
                axisInfo: this.props.plotInfo.xAxis,
                start: o,
                lineSize: t,
                minMax: s,
                fromY: i.y,
                toY: i.y + n
            })
        }
    }
    getYGridElement() {
        if (this.props.plotInfo.yAxis.plotGridShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewWidth;
            var n = e.viewHeight;
            var r = e.unscaledCenterDelta;
            var a = e.yScale;
            var i = this.props.renderInfo.viewPortPos.p1;
            var o = this.getYTickStart(i, r);
            var s = this.getYMinMax(r, a, n);
            return React.createElement(ie, {
                axisInfo: this.props.plotInfo.yAxis,
                start: o,
                lineSize: n,
                minMax: s,
                fromX: i.x,
                toX: i.x + t
            })
        }
    }
    getYMinMax(e, t, n) {
        return {
            min: +e.y / t,
            max: (n + e.y) / t
        }
    }
    getYTickStart(e, t) {
        return {
            x: e.x + t.x,
            y: e.y
        }
    }
    getXMinMax(e, t, n) {
        return {
            min: -e.x / t,
            max: (n - e.x) / t
        }
    }
    getXStart(e, t, n) {
        return {
            x: e.x,
            y: t + e.y + n.y
        }
    }
}
class se extends oe {
    getYTickIntervalElement() {
        if (this.props.plotInfo.yAxis.plotAxisShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewHeight;
            var n = e.unscaledCenterDelta;
            var r = e.yScale;
            var a = this.props.renderInfo.originalViewPortPos.p1;
            var i = this.getYTickStart(a, n);
            var o = this.getYMinMax(n, r, t);
            return {
                ticks: React.createElement(q, {
                    key: "y-tick-interval",
                    axisInfo: this.props.plotInfo.yAxis,
                    showAxisLine: true,
                    zeroPosition: "none",
                    showArrow: true,
                    start: i,
                    lineSize: t,
                    minMax: o,
                    halfSizePosition: null
                }),
                label: React.createElement(Z, {
                    key: "y-tick-label",
                    preventShowingNumber: false,
                    axisInfo: this.props.plotInfo.yAxis,
                    zeroPosition: "none",
                    start: i,
                    lineSize: t,
                    minMax: o,
                    halfSizePosition: null
                })
            }
        }
        return {
            ticks: null,
            label: null
        }
    }
    getXTickIntervalElement() {
        if (this.props.plotInfo.xAxis.plotAxisShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewWidth;
            var n = e.viewHeight;
            var r = e.unscaledCenterDelta;
            var a = e.xScale;
            var i = this.props.renderInfo.originalViewPortPos.p1;
            var o = this.getXStart(i, n, r);
            var s = this.getXMinMax(r, a, t);
            return {
                ticks: React.createElement(j, {
                    key: "x-tick-interval",
                    axisInfo: this.props.plotInfo.xAxis,
                    zeroPosition: "left",
                    showAxisLine: true,
                    showArrow: true,
                    start: o,
                    lineSize: t,
                    minMax: s,
                    halfSizePosition: null
                }),
                label: React.createElement(Q, {
                    key: "x-tick-label",
                    preventShowingNumber: false,
                    axisInfo: this.props.plotInfo.xAxis,
                    zeroPosition: "left",
                    start: o,
                    lineSize: t,
                    minMax: s,
                    halfSizePosition: null
                })
            }
        }
        return {
            ticks: null,
            label: null
        }
    }
    renderBaseOnArrangement(e) {
        var t = slicedToArray(e, 5);
        var n = t[0];
        var r = t[1];
        var a = t[2];
        var i = t[3];
        var o = t[4];
        switch (this.props.plotInfo.axes.axisArrangement) {
        case "axis-plot-label":
            return [n, r, o, a, i];
        case "plot-axis-label":
            return [o, n, r, a, i];
        case "axis-label-plot":
            return [n, r, a, i, o]
        }
    }
    render() {
        var e = this.props.plotInfo;
        var t = e.xAxis;
        var n = e.yAxis;
        var r = this.props.renderInfo;
        var a = r.centerXDelta;
        var i = r.centerYDelta;
        var o = r.viewPortPos;
        var s = r.settings;
        var l = r.baseRectStyle;
        var c = o.p1;
        var d = o.p2;
        var h = s.viewWidth;
        var u = s.viewHeight;
        var p = _.assignIn({},
        l, {
            fill: "transparent",
            stroke: "none"
        });
        var m = this.getXTickIntervalElement();
        var f = m.ticks;
        var y = m.label;
        var A = this.getYTickIntervalElement();
        var E = A.ticks;
        var v = A.label;
        var S = React.createElement(re, {
            onError: this.props.onError,
            key: "plot",
            scaleXValue: t.scale,
            scaleYValue: n.scale,
            centerXDelta: a,
            centerYDelta: i,
            p1: c,
            p2: d,
            functions: this.props.functions
        });
        return React.createElement("g", null, React.createElement("g", {
            clipPath: "url(#".concat(this.props.clipPathId, ")")
        },
        this.getXGridElement(), this.getYGridElement(), this.renderBaseOnArrangement([f, E, y, v, S]), React.createElement("rect", {
            className: "real",
            x: c.x + 1,
            y: c.y + 1,
            width: h - 2,
            height: u - 2,
            style: p
        })))
    }
}
class le extends oe {
    getYTickIntervalElement() {
        if (this.props.plotInfo.yAxis.plotAxisShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewHeight;
            var n = e.unscaledCenterDelta;
            var r = e.yScale;
            var a = this.props.renderInfo;
            var i = a.originalViewPortPos;
            var o = a.viewPortPos;
            var s = i.p1;
            var l = i.p2;
            var c = o.p1;
            var d = this.getYMinMax(n, r, t);
            var h = React.createElement(q, {
                axisInfo: this.props.plotInfo.yAxis,
                showAxisLine: false,
                zeroPosition: null,
                showArrow: false,
                showZero: true,
                start: {
                    x: s.x + 15,
                    y: c.y
                },
                lineSize: t,
                minMax: d,
                halfSizePosition: "left"
            });
            var u = React.createElement(q, {
                axisInfo: this.props.plotInfo.yAxis,
                showAxisLine: false,
                zeroPosition: null,
                showArrow: false,
                showZero: true,
                start: {
                    x: l.x - 9,
                    y: c.y
                },
                lineSize: t,
                minMax: d,
                halfSizePosition: "right"
            });
            return {
                ticks: React.createElement("g", null, h, u),
                label: React.createElement(Z, {
                    axisInfo: this.props.plotInfo.yAxis,
                    showAxisLine: false,
                    zeroPosition: null,
                    showArrow: false,
                    showZero: true,
                    start: {
                        x: s.x + 15,
                        y: c.y
                    },
                    lineSize: t,
                    minMax: d,
                    preventShowingNumber: false,
                    halfSizePosition: "left"
                })
            }
        }
        return {
            ticks: null,
            label: null
        }
    }
    getXTickIntervalElement() {
        if (this.props.plotInfo.xAxis.plotAxisShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewWidth;
            var n = e.unscaledCenterDelta;
            var r = e.xScale;
            var a = this.props.renderInfo;
            var i = a.originalViewPortPos;
            var o = a.viewPortPos;
            var s = i.p1;
            var l = i.p2;
            var c = o.p1;
            var d = this.getXMinMax(n, r, t);
            var h = React.createElement(j, {
                axisInfo: this.props.plotInfo.xAxis,
                showAxisLine: false,
                zeroPosition: null,
                showArrow: false,
                showZero: true,
                start: {
                    x: c.x,
                    y: s.y + 4
                },
                lineSize: t,
                minMax: d,
                halfSizePosition: "above"
            });
            var u = React.createElement(j, {
                axisInfo: this.props.plotInfo.xAxis,
                showAxisLine: false,
                zeroPosition: null,
                showArrow: false,
                showZero: true,
                start: {
                    x: c.x,
                    y: l.y - 15
                },
                lineSize: t,
                minMax: d,
                halfSizePosition: "below"
            });
            return {
                ticks: React.createElement("g", null, h, u),
                label: React.createElement(Q, {
                    axisInfo: this.props.plotInfo.xAxis,
                    showAxisLine: false,
                    zeroPosition: null,
                    showArrow: false,
                    preventShowingNumber: false,
                    showZero: true,
                    start: {
                        x: c.x,
                        y: l.y - 15
                    },
                    lineSize: t,
                    minMax: d,
                    halfSizePosition: "below"
                })
            }
        }
        return {
            ticks: null,
            label: null
        }
    }
    render() {
        var e = this.props.plotInfo;
        var t = e.xAxis;
        var n = e.yAxis;
        var r = this.props.renderInfo;
        var a = r.centerXDelta;
        var i = r.centerYDelta;
        var o = r.viewPortPos;
        var s = r.settings;
        var l = r.baseRectStyle;
        var c = o.p1;
        var d = o.p2;
        var h = s.viewWidth;
        var u = s.viewHeight;
        var p = _.assignIn({},
        l, {
            fill: "transparent"
        });
        var m = this.getXTickIntervalElement();
        var f = m.ticks;
        var y = m.label;
        var A = this.getYTickIntervalElement();
        var E = A.ticks;
        var v = A.label;
        return React.createElement("g", null, React.createElement("g", {
            clipPath: "url(#".concat(this.props.clipPathId, ")")
        },
        this.getXGridElement(), this.getYGridElement(), React.createElement(re, {
            onError: this.props.onError,
            scaleXValue: t.scale,
            scaleYValue: n.scale,
            centerXDelta: a,
            centerYDelta: i,
            p1: c,
            p2: d,
            functions: this.props.functions
        }), React.createElement("rect", {
            className: "real",
            x: c.x + 1,
            y: c.y + 1,
            width: h - 2,
            height: u - 2,
            style: p
        })), f, E, y, v)
    }
}
class ce extends oe {
    getYTickIntervalElement() {
        if (this.props.plotInfo.yAxis.plotAxisShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewHeight;
            var n = e.unscaledCenterDelta;
            var r = e.yScale;
            var a = this.props.renderInfo;
            var i = a.originalViewPortPos;
            var o = a.viewPortPos;
            var s = i.p1;
            var l = o.p1;
            var c = this.getYMinMax(n, r, t);
            return {
                ticks: React.createElement(q, {
                    axisInfo: this.props.plotInfo.yAxis,
                    showAxisLine: true,
                    zeroPosition: null,
                    showArrow: false,
                    showZero: true,
                    start: {
                        x: s.x + 15,
                        y: l.y
                    },
                    lineSize: t,
                    minMax: c,
                    halfSizePosition: "left"
                }),
                label: React.createElement(Z, {
                    axisInfo: this.props.plotInfo.yAxis,
                    preventShowingNumber: false,
                    showAxisLine: true,
                    zeroPosition: null,
                    showArrow: false,
                    showZero: true,
                    start: {
                        x: s.x + 15,
                        y: l.y
                    },
                    lineSize: t,
                    minMax: c,
                    halfSizePosition: "left"
                })
            }
        }
        return {
            ticks: null,
            label: null
        }
    }
    getXTickIntervalElement() {
        if (this.props.plotInfo.xAxis.plotAxisShow) {
            var e = this.props.renderInfo.settings;
            var t = e.viewWidth;
            var n = e.unscaledCenterDelta;
            var r = e.xScale;
            var a = this.props.renderInfo;
            var i = a.originalViewPortPos;
            var o = a.viewPortPos;
            var s = i.p2;
            var l = o.p1;
            var c = this.getXMinMax(n, r, t);
            return {
                ticks: React.createElement(j, {
                    axisInfo: this.props.plotInfo.xAxis,
                    showAxisLine: true,
                    zeroPosition: null,
                    showArrow: false,
                    showZero: true,
                    start: {
                        x: l.x,
                        y: s.y - 15
                    },
                    lineSize: t,
                    minMax: c,
                    halfSizePosition: "below"
                }),
                label: React.createElement(Q, {
                    axisInfo: this.props.plotInfo.xAxis,
                    preventShowingNumber: false,
                    showAxisLine: true,
                    zeroPosition: null,
                    showArrow: false,
                    showZero: true,
                    start: {
                        x: l.x,
                        y: s.y - 15
                    },
                    lineSize: t,
                    minMax: c,
                    halfSizePosition: "below"
                })
            }
        }
        return {
            ticks: null,
            label: null
        }
    }
    render() {
        var e = this.props.plotInfo;
        var t = e.xAxis;
        var n = e.yAxis;
        var r = this.props.renderInfo;
        var a = r.centerXDelta;
        var i = r.centerYDelta;
        var o = r.viewPortPos;
        var s = r.settings;
        var l = r.baseRectStyle;
        var c = o.p1;
        var d = o.p2;
        var h = s.viewWidth;
        var u = s.viewHeight;
        var p = _.assignIn({},
        l, {
            fill: "transparent"
        });
        var m = this.getXTickIntervalElement();
        var f = m.ticks;
        var y = m.label;
        var A = this.getYTickIntervalElement();
        var E = A.ticks;
        var v = A.label;
        return React.createElement("g", null, React.createElement("g", {
            clipPath: "url(#".concat(this.props.clipPathId, ")")
        },
        this.getXGridElement(), this.getYGridElement(), React.createElement(re, {
            onError: this.props.onError,
            scaleXValue: t.scale,
            scaleYValue: n.scale,
            centerXDelta: a,
            centerYDelta: i,
            p1: c,
            p2: d,
            functions: this.props.functions
        }), React.createElement("rect", {
            className: "real",
            x: c.x + 1,
            y: c.y + 1,
            width: h - 2,
            height: u - 2,
            style: p
        })), f, E, y, v)
    }
}
class ue extends ShapeBase {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.handleOnPlotError = () => {};
        this.handleGroupRef = (e) => {
            this.groupRef = e
        };
        this.handleMouseWheel = (e) => {
            if (this.inSettingMode()) {
                e.preventDefault();
                e.stopPropagation();
                var t = this.props.shape;
                var n = this.props.shape.axes;
                var r = ItemDefaultSettings.getPlotSettings(n.xAxis, "scale");
                var a = ItemDefaultSettings.getPlotSettings(n.yAxis, "scale");
                var o = ItemDefaultSettings.getSettings(t, "centerXDelta");
                var s = ItemDefaultSettings.getSettings(t, "centerYDelta");
                var l = .05 * e.deltaY;
                var c = .05 * e.deltaY * a / r;
                if (r < 1 || a < 1) {
                    l = l / 32;
                    c = c / 32
                } else if (r < 3 || a < 3) {
                    l = l / 16;
                    c = c / 16
                } else if (r < 6 || a < 6) {
                    l = l / 8;
                    c = c / 8
                } else if (r < 10 || a < 10) {
                    l = l / 4;
                    c = c / 4
                } else if (r < 15 || a < 15) {
                    l = l / 2;
                    c = c / 2
                }
                var d = r + l;
                var h = a + c;
                if (! (d < .1 || h < .1)) {
                    var u = this.getPlotViewPort();
                    var p = o + (o - u.width / 2) / r * l;
                    var m = s + (u.height / 2 + s) / a * c;
                    var f = t;
                    var g = ItemDefaultSettings.setSetting(n.xAxis || {},
                    "scale", d);
                    var y = ItemDefaultSettings.setSetting(n.yAxis || {},
                    "scale", h);
                    var A = PropUpdateHelper.update(n, {
                        xAxis: g,
                        yAxis: y
                    });
                    f = PropUpdateHelper.setProp(f, "axes", A);
                    f = ItemDefaultSettings.setSetting(f, "centerXDelta", p);
                    f = ItemDefaultSettings.setSetting(f, "centerYDelta", m);
                    this.props.onShapeChanged(f)
                }
            }
        };
        this.handleMouseDown = (e) => {
            if (this.inSettingMode()) {
                if (!this.movingHandler.baseElement) {
                    var t = ReactDOM.findDOMNode(this);
                    var n = jQuery(t).closest("math-diagram").get(0);
                    this.movingHandler.setBaseElement(n);
                    this.movingHandler.setContainer(n)
                }
                this.movingHandler.mouseDown(e)
            } else this.props.onMouseDown(e)
        };
        this.state = {
            cacheShape: null
        };
        this.movingHandler.onMoving = (e, t, n) => {
            var r = this.props.shape;
            var a = ItemDefaultSettings.getSettings(r, "centerXDelta");
            var i = ItemDefaultSettings.getSettings(r, "centerYDelta");
            if (r.data.rotation) e = Geometry.pointRotate(e, {
                x: 0,
                y: 0
            },
            -r.data.rotation);
            var s = ItemDefaultSettings.setSetting(r, "centerXDelta", a + e.x);
            s = ItemDefaultSettings.setSetting(s, "centerYDelta", i + e.y);
            this.setState({
                cacheShape: s
            });
            n.customData = s
        };
        this.movingHandler.onMoved = (e) => {
            if (e && e.customData) {
                this.props.onShapeChanged(e.customData);
                this.setState({
                    cacheShape: null
                })
            }
            console.log("moved")
        }
    }
    shouldComponentUpdate(e, t) {
        return t.cacheShape != this.state.cacheShape || super.shouldComponentUpdate(e, t)
    }
    shape() {
        return this.state.cacheShape || this.props.shape
    }
    getPlotViewPort() {
        var e = this.getViewPortPos();
        var t = e.p1;
        var n = e.p2;
        return {
            width: n.x - t.x,
            height: n.y - t.y
        }
    }
    getOriginalViewPortPos() {
        var e = this.shape().data;
        var t = e.p1;
        var n = e.p2;
        return {
            p1: {
                x: 0,
                y: 0
            },
            p2: {
                x: n.x - t.x,
                y: n.y - t.y
            }
        }
    }
    getViewPortPos() {
        var e = this.shape();
        var t = ItemDefaultSettings.getPlotSettings(e.axes, "axisType");
        var n = this.getOriginalViewPortPos();
        var r = n.p1;
        var a = n.p2;
        return "scientific-clean" == t ? {
            p1: {
                x: r.x + 20,
                y: r.y
            },
            p2: {
                x: a.x,
                y: a.y - 20
            }
        } : "scientific" == t ? {
            p1: {
                x: r.x + 14,
                y: r.y + 3
            },
            p2: {
                x: a.x - 8,
                y: a.y - 14
            }
        } : {
            p1: r,
            p2: a
        }
    }
    inSettingMode() {
        return this.props.subSelection && "plot" == this.props.subSelection.type
    }
    renderBasedOnType() {
        var e = this.shape();
        var t = e.axes;
        switch (ItemDefaultSettings.getPlotSettings(t, "axisType")) {
        case "school":
            return React.createElement(se, {
                onError: this.handleOnPlotError,
                functions: e.functions,
                clipPathId: e.id,
                plotInfo: this.buildPlotInfo(),
                renderInfo: this.buildPlotRenderInfo()
            });
        case "scientific":
            return React.createElement(le, {
                onError: this.handleOnPlotError,
                functions: e.functions,
                clipPathId: e.id,
                plotInfo: this.buildPlotInfo(),
                renderInfo: this.buildPlotRenderInfo()
            });
        case "scientific-clean":
            return React.createElement(ce, {
                onError: this.handleOnPlotError,
                functions: e.functions,
                clipPathId: e.id,
                plotInfo: this.buildPlotInfo(),
                renderInfo: this.buildPlotRenderInfo()
            })
        }
    }
    renderNote(e, t, n) {
        if (this.props.subSelection && "plot" == this.props.subSelection.type) {
            var r = {
                x: e.x + t / 2,
                y: e.y + n + 10
            };
            return React.createElement("g", {
                className: "no-print"
            },
            React.createElement("rect", {
                x: r.x - 90,
                y: r.y + 5,
                width: 180,
                height: 25,
                fill: "white",
                stroke: "lightgray"
            }), React.createElement("text", {
                x: r.x,
                y: r.y + 16 + 5,
                textAnchor: "middle",
                fontSize: 12,
                fill: "orange",
                stroke: "none"
            },
            " Scroll to zoom,or drag to move "))
        }
    }
    componentDidMount() {
        if (this.groupRef) this.groupRef.addEventListener("wheel", this.handleMouseWheel, {
            passive: false
        })
    }
    componentWillUnmount() {
        if (this.groupRef) this.groupRef.removeEventListener("wheel", this.handleMouseWheel)
    }
    render() {
        var e = this.shape();
        var t = this.getViewPortPos();
        var n = t.p1;
        var r = t.p2;
        var a = this.props.shape.axes;
        var i = ItemDefaultSettings.getPlotSettings(a.xAxis, "scale");
        var s = ItemDefaultSettings.getPlotSettings(a.yAxis, "scale");
        var l = ItemDefaultSettings.getSettings(e, "centerXDelta");
        var c = ItemDefaultSettings.getSettings(e, "centerYDelta");
        var d = MathPlotSettingsBuilder.buildMathPlotSettings({
            p1: n,
            p2: r
        },
        i, s, l, c);
        var h = d.viewWidth;
        var u = d.viewHeight;
        var p = Geometry.getCenterPoint({
            p1: n,
            p2: r
        });
        var m = (new TransformHelper).orgin(p.x, p.y).translate(e.data.p1.x, e.data.p1.y);
        if (e.data.rotation) m = m.rotate(e.data.rotation);
        if (e.data.skewX) m = m.skew(e.data.skewX, 0);
        var f = this.getOriginalViewPortPos();
        return React.createElement("g", {
            className: this.props.className,
            ref: this.handleGroupRef,
            "data-amt": "diagram/shapes/plot",
            style: {
                transform: m.toCssStyle()
            },
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleMouseDown
        },
        React.createElement("defs", null, React.createElement("clipPath", {
            id: e.id
        },
        React.createElement("rect", {
            x: n.x + 1,
            y: n.y + 1,
            width: h - 2,
            height: u - 2
        }))), this.renderSelectinOutline(n, h, u), this.renderBasedOnType(), this.renderNote(f.p1, f.p2.x - f.p1.x, f.p2.y - f.p1.y))
    }
    renderSelectinOutline(e, t, n) {
        if (this.props.isGroupSelected || this.props.isRemoteSelected) return React.createElement("rect", {
            className: "transparent no-print",
            x: e.x + 1,
            y: e.y + 1,
            width: t - 2,
            height: n - 2,
            style: this.transparentStyle()
        })
    }
    buildPlotRenderInfo() {
        var e = this.shape();
        var t = this.getViewPortPos();
        var n = t.p1;
        var r = t.p2;
        var a = this.props.shape.axes;
        var i = ItemDefaultSettings.getPlotSettings(a.xAxis, "scale");
        var o = ItemDefaultSettings.getPlotSettings(a.yAxis, "scale");
        var s = ItemDefaultSettings.getSettings(e, "centerXDelta");
        var l = ItemDefaultSettings.getSettings(e, "centerYDelta");
        return {
            baseRectStyle: this.style(),
            centerXDelta: ItemDefaultSettings.getSettings(e, "centerXDelta"),
            centerYDelta: ItemDefaultSettings.getSettings(e, "centerYDelta"),
            originalViewPortPos: this.getOriginalViewPortPos(),
            viewPortPos: {
                p1: n,
                p2: r
            },
            settings: MathPlotSettingsBuilder.buildMathPlotSettings({
                p1: n,
                p2: r
            },
            i, o, s, l)
        }
    }
    buildPlotInfo() {
        var e = this.props.shape.axes;
        var t = e.xAxis || {};
        var n = e.yAxis || {};
        var r = {
            plotAxisShow: ItemDefaultSettings.getPlotSettings(t, "plotAxisShow"),
            plotAxisNumering: ItemDefaultSettings.getPlotSettings(t, "plotAxisNumering"),
            plotGridShow: ItemDefaultSettings.getPlotSettings(t, "plotGridShow"),
            majorSteps: ItemDefaultSettings.getPlotSettings(t, "majorSteps"),
            majorTextColor: ItemDefaultSettings.getPlotSettings(t, "majorTextColor"),
            majorTextFontSize: ItemDefaultSettings.getPlotSettings(t, "majorTextFontSize"),
            minorTickShow: ItemDefaultSettings.getPlotSettings(t, "minorTickShow"),
            minorGridShow: ItemDefaultSettings.getPlotSettings(t, "minorGridShow"),
            minorStep: ItemDefaultSettings.getPlotSettings(t, "minorStep"),
            unitType: ItemDefaultSettings.getPlotSettings(t, "unitType"),
            axisColor: ItemDefaultSettings.getPlotSettings(t, "axisColor"),
            scale: ItemDefaultSettings.getPlotSettings(t, "scale"),
            axisThickness: ItemDefaultSettings.getPlotSettings(t, "axisThickness"),
            blockIntersection: false
        };
        var a = {
            plotAxisShow: ItemDefaultSettings.getPlotSettings(n, "plotAxisShow"),
            plotAxisNumering: ItemDefaultSettings.getPlotSettings(n, "plotAxisNumering"),
            plotGridShow: ItemDefaultSettings.getPlotSettings(n, "plotGridShow"),
            majorSteps: ItemDefaultSettings.getPlotSettings(n, "majorSteps"),
            majorTextColor: ItemDefaultSettings.getPlotSettings(n, "majorTextColor"),
            majorTextFontSize: ItemDefaultSettings.getPlotSettings(n, "majorTextFontSize"),
            minorTickShow: ItemDefaultSettings.getPlotSettings(n, "minorTickShow"),
            minorGridShow: ItemDefaultSettings.getPlotSettings(n, "minorGridShow"),
            minorStep: ItemDefaultSettings.getPlotSettings(n, "minorStep"),
            unitType: ItemDefaultSettings.getPlotSettings(n, "unitType"),
            axisColor: ItemDefaultSettings.getPlotSettings(n, "axisColor"),
            scale: ItemDefaultSettings.getPlotSettings(n, "scale"),
            axisThickness: ItemDefaultSettings.getPlotSettings(n, "axisThickness"),
            blockIntersection: false
        };
        return {
            axes: {
                axisType: ItemDefaultSettings.getPlotSettings(e, "axisType"),
                axisArrangement: ItemDefaultSettings.getPlotSettings(e, "axisArrangement"),
                blockIntersection: false
            },
            xAxis: r,
            yAxis: a
        }
    }
}
class pe extends ShapeBaseC {}
var ShapePlot = new class extends ShapeBaseB {
    constructor() {
        super()
    }
    getComponent() {
        return ue
    }
    getType() {
        return "plot"
    }
    getSettingsComponent() {
        return pe
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: this.getRectangleBreakdownInfoData(e)
        }
    }
    getSettingDefaultValue(e) {
        var t = super.getSettingDefaultValue(e);
        return t || ("centerXDelta" == e ? 0 : "centerYDelta" == e ? 0 : void 0)
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return e = _.assign(e, {
            height: 20,
            strokeWidth: 1
        }),
        {
            caption: "plot",
            component: React.createElement("span", {
                key: "plot"
            },
            React.createElement("svg", {
                style: e
            },
            React.createElement("path", {
                d: "M2,4 L20,4 M2,11 L20,11 M2,18 L20,18   M4,2 L4,20 M11,2 L11,20 M18,2 L18,20"
            })))
        }
    }
    styleSupports() {
        return ["rotation", "skewX"]
    }
    createShape(e) {
        var t = super.createShape(e);
        return DiagramElementCreater.createBy(e, (e) => {
            return t.data = {
                p1: {
                    x: e.left + 20,
                    y: e.top + 20
                },
                p2: {
                    x: e.left + 450,
                    y: e.top + 220
                }
            },
            t.settings = {
                centerXDelta: 200,
                centerYDelta: -100
            },
            t.functions = [{
                model: {
                    id: DiagramIdHelper.nextId(),
                    lines: [{
                        id: DiagramIdHelper.nextId(),
                        blocks: [{
                            id: DiagramIdHelper.nextId(),
                            text: "4*sin(x)+5*cos(x/2)"
                        }]
                    }]
                },
                style: {
                    strokeColor: [74, 144, 226, 1],
                    thickness: 2
                }
            }],
            t.axes = {},
            t
        })
    }
}

export { ShapePlot as ShapePlotB }

export default ShapePlot 