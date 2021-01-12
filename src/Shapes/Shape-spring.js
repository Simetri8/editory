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

/// xxx(360) /*Shape-spring*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return S
});*/
/// var r = n(3)/*_.assignIn*/,  // 2 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 18 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 9 times
/// l = n(10)/*ShapeHelper*/,  // 1 times
/// c = n(41)/*NumericSliderComponent*/,  // 3 times
/// d = n(89)/*DynamicSvg*/,  // 3 times
/// h = n(33)/*ItemRemoveSelected*/,  // 1 times
/// u = n(9)/*ShapeBase*/,  // 1 times
/// p = n(8)/*ShapeUtil*/;  // 1 times
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = y(e),
    i = A(e),
    o = E(e),
    l = Geometry.getCenterPoint(e.data),
    c = [],
    d = {
        p1: {
            x: n.x - a,
            y: r.y
        },
        cp: {
            x: n.x - a - i,
            y: r.y
        },
        cp2: {
            x: n.x - a - i,
            y: n.y
        },
        p2: {
            x: n.x,
            y: n.y
        }
    },
    h = Geometry.splitBezierByLine(d, {
        p1: {
            x: n.x - a - i - 100,
            y: l.y
        },
        p2: {
            x: n.x + a + i + 100,
            y: l.y
        }
    });
    0 === h.length && (h = [d, d]);
    var u = n.x - h[1].p1.x;
    d = Geometry.transformCubicBezier(h[1], 1, 1, u, 0);
    var m = u * o;
    if (m === u) {
        u = 0;
        d = null
    } else if (m > 0) {
        u = u - m;
        if ((h = Geometry.splitBezierByLine(d, {
            p1: {
                x: n.x + m,
                y: n.y - 100
            },
            p2: {
                x: n.x + m,
                y: r.y + 100
            }
        })).length > 0) d = Geometry.transformCubicBezier(h[1], 1, 1, -m, 0)
    }
    var g = {
        p1: {
            x: r.x,
            y: n.y - 1
        },
        p2: {
            x: r.x,
            y: r.y + 1
        }
    };
    if (d) {
        d = f(d, g);
        c.push(d)
    }
    for (var v = n.x + u, S = !1; v < r.x; v += a, S = !S) {
        var C = void 0,
        x = f(C = S ? {
            p1: {
                x: v,
                y: r.y
            },
            cp: {
                x: v - i,
                y: r.y
            },
            cp2: {
                x: v - i,
                y: n.y
            },
            p2: {
                x: v + a,
                y: n.y
            }
        } : {
            p1: {
                x: v,
                y: n.y
            },
            cp: {
                x: v + a + i,
                y: n.y
            },
            cp2: {
                x: v + a + i,
                y: r.y
            },
            p2: {
                x: v + a,
                y: r.y
            }
        },
        g),
        I = x != C;
        if (x && c.push(x), I) break
    }
    return ShapeUtil.genericLinesTransformed(e.data, c)
}
function f(e, t) {
    return Geometry.intersectCubicBezierLineToLine(e, t).length > 0 ? Geometry.splitBezierByLineGetFirstPart(e, t) : e
}
class g extends ShapeBase {
    render() {
        var e = m(this.props.shape),
        t = ShapeHelper.pathsD(e);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: t,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: t,
            style: this.style()
        }))
    }
}
function y(e) {
    return void 0 === e.data.distance ? 20 : e.data.distance
}
function A(e) {
    return void 0 === e.data.smallDistance ? 6 : e.data.smallDistance
}
function E(e) {
    return void 0 === e.data.trimPercentage ? 0 : e.data.trimPercentage
}
class v extends ShapeBaseC {
    shouldComponentUpdate(e) {
        var t = e.entity.data,
        n = this.props.entity.data;
        return t.distance != n.distance || t.smallDistance != n.smallDistance || t.trimPercentage != n.trimPercentage
    }
    render() {
        var e = y(this.props.entity),
        t = A(this.props.entity),
        n = E(this.props.entity);
        return React.createElement("spring-settings", {
            style: {
                display: "flex"
            }
        },
        React.createElement(NumericSliderComponent, {
            title: "Spring Option One",
            min: 2,
            max: 100,
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
                    transform: "translate(-5px,0)"
                },
                d: " M4.04,2.9 C12.04,2.9 12.04,15.85 9.04,15.85 M9.04,15.85 C6.04,15.85 6.04,2.9 14.04,2.9 M14.04,2.9 C22.04,2.9 22.04,15.85 19.04,15.85 M19.04,15.85 C16.05,15.85 16.04,3.01 23.94,2.9"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 2,
                    y: 10
                },
                p2: {
                    x: 16,
                    y: 10
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .6,
                    fill: "green",
                    fillOpacity: .6
                }
            })),
            unit: "px",
            style: {
                width: 20
            },
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "distance", e),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "distance", e, t)
        }), React.createElement(NumericSliderComponent, {
            title: "Spring Option Two",
            min: 2,
            max: 50,
            step: 1,
            value: t,
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
                    transform: "translate(-5px,-1px)"
                },
                d: " M4.04,3.99 C4.69,3.92 5.37,3.88 6.09,3.88 M6.09,3.88 C20.09,3.88 20.09,17.91 13.09,17.91 M13.09,17.91 C6.09,17.91 6.09,3.88 20.09,3.88 M20.09,3.88 C20.78,3.88 21.44,3.92 22.07,3.98"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 11
                },
                p2: {
                    x: 16,
                    y: 11
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .6,
                    fill: "green",
                    fillOpacity: .6
                }
            })),
            unit: "px",
            style: {
                width: 20
            },
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "smallDistance", e),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "smallDistance", e, t)
        }), React.createElement(NumericSliderComponent, {
            title: "Spring Option Three",
            style: {
                width: 20
            },
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
                    transform: "translate(-5px,-2px)"
                },
                d: " M3.84,11.41 C4.71,7.66 6.96,3.91 11.46,3.91 M11.46,3.91 C20.46,3.91 20.46,18.91 18.46,18.91 M18.46,18.91 C16.75,18.91 16.51,7.97 22.08,4.78"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 12
                },
                p2: {
                    x: 11,
                    y: 12
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .6,
                    fill: "green",
                    fillOpacity: .6
                }
            })),
            unit: "%",
            min: 0,
            max: 100,
            step: 1,
            value: 100 * n,
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "trimPercentage", e / 100),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "trimPercentage", e / 100, t)
        }), ItemRemoveSelected.separator())
    }
}
var S = new class extends ShapeBaseB {
    getComponent() {
        return g
    }
    getType() {
        return "spring"
    }
    createShape(e) {
        var t = super.createShape(e);
        return t.settings = {
            blockIntersection: !0
        },
        t
    }
    styleSupports() {
        return ["thickness", "strokeColor", "strokeType", "rotation", "skewX"]
    }
    getSettingsComponent() {
        return v
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = m(e);
        return {
            boxLines: super.getBreakdownInfoData(e),
            data: t
        }
    }
    getIcon() {
        return {
            caption: "spring",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "spring"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,2px)"
                },
                d: " M2.87,9.35 C3.25,6.52 4.5,3.7 7,3.7 M7,3.7 C12,3.7 12,15 10,15 M10,15 C8,15 8,3.7 13,3.7 M13,3.7 C18,3.7 18,15 16,15 M16,15 C14,15 14,3.7 19,3.7 M19,3.7 C19,3.7 19,3.7 19,3.7"
            }))
        }
    }
    scale(e, t, n, r) {
        var i = super.scale(e, t, n, r),
        o = Geometry.rectWidth(i.data) / Geometry.rectWidth(e.data),
        l = y(e),
        c = A(e);
        return _.assignIn({},
        i, {
            data: _.assignIn({},
            i.data, {
                distance: l * o,
                smallDistance: c * o
            })
        })
    }
}

export { S as ShapeSpringB }

export default m