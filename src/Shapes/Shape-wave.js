import _ from 'lodash';
import React from 'react';
import DynamicSvg from '../Editor/DynamicSvg';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(355) /*Shape-wave*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return g
}),*/
/*n.d(t, "b", function () {
    return E
});*/
/// var r = n(3)/*_.assignIn*/,  // 2 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 17 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 5 times
/// l = n(10)/*ShapeHelper*/,  // 1 times
/// c = n(41)/*NumericSliderComponent*/,  // 2 times
/// d = n(89)/*DynamicSvg*/,  // 1 times
/// h = n(33)/*ItemRemoveSelected*/,  // 1 times
/// u = n(9)/*ShapeBase*/,  // 1 times
/// p = n(8)/*ShapeUtil*/;  // 1 times
var m = [{
    p1: {
        x: 0,
        y: 0
    },
    cp: {
        x: .5122866232565925,
        y: .5122866232565925
    },
    cp2: {
        x: 1.0023136857678987,
        y: 1
    },
    p2: {
        x: Math.PI / 2,
        y: 1
    }
},
{
    p1: {
        x: Math.PI / 2,
        y: 1
    },
    cp: {
        x: Math.PI / 2 + (Math.PI / 2 - 1.0023136857678987),
        y: 1
    },
    cp2: {
        x: Math.PI / 2 + (Math.PI / 2 - .5122866232565925),
        y: .5122866232565925
    },
    p2: {
        x: Math.PI,
        y: 0
    }
},
{
    p1: {
        x: Math.PI + 0,
        y: 0
    },
    cp: {
        x: Math.PI + .5122866232565925,
        y: -.5122866232565925
    },
    cp2: {
        x: Math.PI + 1.0023136857678987,
        y: -1
    },
    p2: {
        x: Math.PI + Math.PI / 2,
        y: -1
    }
},
{
    p1: {
        x: Math.PI + Math.PI / 2,
        y: -1
    },
    cp: {
        x: Math.PI + Math.PI / 2 + (Math.PI / 2 - 1.0023136857678987),
        y: -1
    },
    cp2: {
        x: Math.PI + Math.PI / 2 + (Math.PI / 2 - .5122866232565925),
        y: -.5122866232565925
    },
    p2: {
        x: Math.PI + Math.PI,
        y: 0
    }
}];
function f(e) {
    return void 0 === e.data.waveLength ? 50 : e.data.waveLength
}
function g(e) {
    for (var t = e.data, n = t.p1, r = t.p2, a = t.trimPercentage, i = void 0 === a ? 0 : a, o = f(e), l = r.y - n.y, c = Geometry.getCenterPoint(e.data), d = o * i, h = [], u = {
        p1: {
            x: n.x,
            y: n.y - 1
        },
        p2: {
            x: n.x,
            y: r.y + 1
        }
    },
    g = {
        p1: {
            x: r.x,
            y: n.y - 1
        },
        p2: {
            x: r.x,
            y: r.y + 1
        }
    },
    y = -d + n.x, A = 0; y < r.x; y += o / 4, A++) if (! (y + o / 4 <= n.x)) {
        var E = m[A % 4],
        v = o * Math.floor(A / 4) - d + n.x,
        S = Geometry.transformCubicBezier(E, o / Math.PI / 2, l / 2, v, c.y);
        (y + o / 4 > r.x || y < n.x) && (S = Geometry.splitBezierByVerticalLines(S, u, g));
        h.push(S)
    }
    return ShapeUtil.genericLinesTransformed(e.data, h)
}
class y extends ShapeBase {
    render() {
        var e = g(this.props.shape),
        t = ShapeHelper.pathsD(e);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.props.styleInfo.defs, React.createElement("path", {
            className: "transparent no-print",
            d: t,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            style: this.props.styleInfo.style,
            d: t
        }))
    }
}
class A extends ShapeBaseC {
    shouldComponentUpdate(e) {
        var t = e.entity.data,
        n = this.props.entity.data;
        return t.waveLength != n.waveLength || t.trimPercentage != n.trimPercentage
    }
    render() {
        var e = f(this.props.entity),
        t = this.props.entity.data.trimPercentage || 0;
        return React.createElement("wave-settings", {
            style: {
                display: "flex"
            }
        },
        React.createElement(NumericSliderComponent, {
            title: "Wave Length",
            unit: "px",
            min: 2,
            max: 200,
            step: 1,
            value: e,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible"
                }
            },
            React.createElement("path", {
                style: {
                    transform: "translate(-4px,0)"
                },
                d: " M3.65,10.28 C4.74,7.17 5.78,4.31 7,4.31 M7,4.31 C8.27,4.31 9.36,7.41 10.51,10.67 M10.51,10.67 C11.66,13.92 12.76,17.03 14.03,17.02 M14.03,17.02 C15.29,17.02 16.38,13.91 17.51,10.65 M17.51,10.65 C18.65,7.39 19.73,4.28 21,4.28 M21,4.28 C22.07,4.27 23.02,6.49 23.98,9.14"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: -1,
                    y: 11
                },
                p2: {
                    x: 13,
                    y: 11
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .6,
                    fill: "none",
                    fillOpacity: .6
                }
            })),
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "waveLength", e),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "waveLength", e, t)
        }), React.createElement(NumericSliderComponent, {
            title: "Wave Start Position",
            unit: "%",
            min: 0,
            max: 100,
            step: 1,
            value: 100 * t,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible"
                }
            },
            React.createElement("defs", null, React.createElement("pattern", {
                id: "demo-pattern",
                width: "5",
                height: "5",
                patternUnits: "userSpaceOnUse"
            },
            React.createElement("path", {
                d: "M0,5l5,-5M-1.25,1.25l2.5,-2.5M3.75,6.25l2.5,-2.5",
                stroke: "indianred",
                strokeWidth: "0.7",
                strokeLinecap: "square"
            }))), React.createElement("path", {
                style: {
                    transform: "translate(-4px,0)"
                },
                d: " M3.65,10.28 C4.74,7.17 5.78,4.31 7,4.31 M7,4.31 C8.27,4.31 9.36,7.41 10.51,10.67 M10.51,10.67 C11.66,13.92 12.76,17.03 14.03,17.02 M14.03,17.02 C15.29,17.02 16.38,13.91 17.51,10.65 M17.51,10.65 C18.65,7.39 19.73,4.28 21,4.28 M21,4.28 C22.07,4.27 23.02,6.49 23.98,9.14"
            }), React.createElement("rect", {
                x: "0",
                y: "2",
                width: "10",
                height: "15",
                style: {
                    stroke: "none",
                    fill: "url(#demo-pattern)"
                }
            })),
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "trimPercentage", e / 100),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "trimPercentage", e / 100, t)
        }), ItemRemoveSelected.separator())
    }
}
var E = new class extends ShapeBaseB {
    getComponent() {
        return y
    }
    getType() {
        return "wave"
    }
    getSettingsComponent() {
        return A
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = g(e);
        return {
            boxLines: super.getBreakdownInfoData(e),
            data: t
        }
    }
    getIcon() {
        return {
            caption: "wave",
            component: React.createElement("svg", {
                style: {
                    width: 25,
                    height: 20,
                    position: "relative"
                },
                key: "wave"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: " M2.59,10.62 C3.24,13.89 3.86,17 4.59,17 M4.59,17 C5.31,17 5.94,13.89 6.59,10.62 M6.59,10.62 C7.24,7.34 7.86,4.23 8.59,4.23 M8.59,4.23 C9.31,4.23 9.94,7.34 10.59,10.62 M10.59,10.62 C11.24,13.89 11.86,17 12.59,17 M12.59,17 C13.31,17 13.94,13.89 14.59,10.62 M14.59,10.62 C15.24,7.34 15.86,4.23 16.59,4.23 M16.59,4.23 C17.31,4.23 17.94,7.34 18.59,10.62 M18.59,10.62 C18.73,11.31 18.86,11.99 19,12.64"
            }))
        }
    }
    scale(e, t, n, r) {
        var i = super.scale(e, t, n, r),
        o = f(e),
        l = Geometry.rectWidth(i.data) / Geometry.rectWidth(e.data);
        return _.assignIn({},
        i, {
            data: _.assignIn({},
            i.data, {
                waveLength: o * l
            })
        })
    }
    styleSupports() {
        return ["thickness", "strokeColor", "strokeType", "rotation", "skewX"]
    }
}

export { E as ShapeWaveB }

export default g