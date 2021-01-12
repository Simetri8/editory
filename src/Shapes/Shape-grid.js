import _ from 'lodash';
import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import DynamicSvg from '../Editor/DynamicSvg';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(362) /*Shape-grid*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return v
}),*/
/*n.d(t, "b", function () {
    return C
});*/
/// var r = n(3)/*_.assignIn*/,  // 2 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 22 times
/// o = n.n(i)
/// s = n(2)/*lodash*/,  // 1 times
/// l = n.n(s)
/// c = n(33)/*ItemRemoveSelected*/,  // 3 times
/// d = n(89)/*DynamicSvg*/,  // 3 times
/// h = n(41)/*NumericSliderComponent*/,  // 2 times
/// u = n(37)/*ToolbarIcons*/,  // 1 times
/// p = n(9)/*ShapeBase*/,  // 1 times
/// m = n(25)/*ColorHelper*/,  // 1 times
/// f = n(1)/*Geometry*/,  // 5 times
/// g = n(8)/*ShapeUtil*/,  // 5 times
/// y = n(10)/*ShapeHelper*/,  // 4 times
/// A = n(17)/*ItemDefaultSettings*/;  // 8 times
class E extends ShapeBase {
    render() {
        var e = v(this.shape()),
        t = ShapeHelper.pathsD(e.vLines),
        n = ShapeHelper.pathsD(e.hLines),
        r = ShapeHelper.getLineD(e.borders),
        a = ShapeHelper.getLineD(e.rect);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.props.styleInfo.defs, React.createElement("path", {
            className: "transparent no-print",
            style: this.transparentStyle(),
            d: t
        }), React.createElement("path", {
            className: "transparent no-print",
            style: this.transparentStyle(),
            d: n
        }), React.createElement("path", {
            className: "transparent no-print",
            style: this.transparentStyle(),
            d: r
        }), React.createElement("path", {
            className: "real",
            style: this.styleNoStroke(),
            d: a
        }), React.createElement("path", {
            className: "real",
            style: this.styleNoFill(),
            d: t
        }), React.createElement("path", {
            className: "real",
            style: this.styleNoFill(),
            d: n
        }), React.createElement("path", {
            className: "real",
            style: this.styleNoFill(),
            d: r
        }))
    }
}
function v(e) {
    var t = ItemDefaultSettings.getSettings(e, "cellSize"),
    n = ItemDefaultSettings.getSettings(e, "topLeftDistance"),
    r = ItemDefaultSettings.getSettings(e, "cellBorderOnly"),
    a = e.data,
    i = a.p1,
    o = a.p2,
    s = o.x - i.x,
    l = o.y - i.y,
    c = [],
    d = [],
    h = [],
    u = [],
    p = i.y,
    m = o.y,
    f = i.x,
    y = o.x,
    E = 0;
    if (r) {
        var v = Math.floor((l - n) / t),
        S = Math.floor((s - n) / t);
        E = t;
        p = n + i.y;
        m = i.y + n + v * t;
        u = [{
            x: f = n + i.x,
            y: p
        },
        {
            x: y = i.x + n + S * t,
            y: p
        },
        {
            x: y,
            y: m
        },
        {
            x: f,
            y: m
        },
        {
            x: f,
            y: p
        }]
    }
    for (var C = n + E; C < s - E; C += t) c.push({
        p1: {
            x: i.x + C,
            y: p
        },
        p2: {
            x: i.x + C,
            y: m
        }
    });
    for (var x = n + E; x < l - E; x += t) d.push({
        p1: {
            x: f,
            y: i.y + x
        },
        p2: {
            x: y,
            y: i.y + x
        }
    });
    for (var I = n; I < s; I += t) for (var T = n; T < l; T += t) h.push({
        x: i.x + I,
        y: i.y + T
    });
    return {
        vLines: ShapeUtil.genericLinesTransformed(e.data, c),
        hLines: ShapeUtil.genericLinesTransformed(e.data, d),
        borders: ShapeUtil.pointsTransformed(e.data, u),
        intersectPoints: ShapeUtil.pointsTransformed(e.data, h),
        rect: ShapeUtil.pointsTransformed(e.data, [{
            x: f,
            y: p
        },
        {
            x: y,
            y: p
        },
        {
            x: y,
            y: m
        },
        {
            x: f,
            y: m
        },
        {
            x: f,
            y: p
        }])
    }
}
class S extends ShapeBaseC {
    render() {
        var e = this.props.entity,
        t = ItemDefaultSettings.getSettings(e, "cellSize"),
        n = ItemDefaultSettings.getSettings(e, "topLeftDistance"),
        r = ItemDefaultSettings.getSettings(e, "cellBorderOnly");
        return React.createElement("grid-settings", {
            style: {
                display: "flex"
            }
        },
        React.createElement(NumericSliderComponent, {
            title: "Size",
            unit: "px",
            min: 5,
            max: 200,
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
                    transform: "translate(-4px,5px)",
                    stroke: "gray"
                },
                d: "M2,7 L20,7 M6,4 L6,10  M16,4 L16,10"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 6
                },
                p2: {
                    x: 14,
                    y: 6
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6
                }
            })),
            onValueChanging: t => this.props.onEntityPropertyChanging(e, "settings", "cellSize", t),
            onValueChanged: (t, n) => this.props.onEntityPropertyChanged(e, "settings", "cellSize", t, n)
        }), ItemRemoveSelected.separator(), React.createElement(NumericSliderComponent, {
            title: "Corner Shift",
            unit: "px",
            min: 0,
            max: 200,
            step: 1,
            value: n,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible",
                    transform: "translate(5px,1px)"
                }
            },
            React.createElement("path", {
                style: {
                    transform: "translate(-4px,5px)",
                    stroke: "gray"
                },
                d: "M5,10 L5,3 L13,3"
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 6
                },
                p2: {
                    x: 14,
                    y: 6
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6,
                    transform: "scale(0.8) translate(-4px,-2px)"
                }
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 0,
                    y: 6
                },
                p2: {
                    x: 14,
                    y: 6
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    fill: "none",
                    fillOpacity: .6,
                    transform: "scale(0.8) rotate(90deg) translate(4px,0px)"
                }
            })),
            onValueChanging: t => this.props.onEntityPropertyChanging(e, "settings", "topLeftDistance", t),
            onValueChanged: (t, n) => this.props.onEntityPropertyChanged(e, "settings", "topLeftDistance", t, n)
        }), ItemRemoveSelected.separator(), React.createElement("x-item", {
            title: "Rect Border Only",
            onMouseDown: () => {
                this.props.onEntityPropertyChanged(e, "settings", "cellBorderOnly", !r)
            },
            class: r ? "selected" : "",
            style: {
                width: 22
            }
        },
        ToolbarIcons.grid), ItemRemoveSelected.separator())
    }
}
var C = new class extends ShapeBaseB {
    getComponent() {
        return E
    }
    getType() {
        return "grid"
    }
    getSettingsComponent() {
        return S
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = v(e);
        return {
            data: t.vLines.concat(t.hLines).concat(Geometry.pointsToLines(t.borders, !1))
        }
    }
    getSettingDefaultValue(e) {
        var t = super.getSettingDefaultValue(e);
        return t || ("cellSize" == e ? 20 : "topLeftDistance" == e ? 0 : "cellBorderOnly" != e && void 0)
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return e = _.assign(e, {
            height: 20,
            strokeWidth: 1
        }),
        {
            caption: "grid",
            component: React.createElement("span", {
                key: "grid"
            },
            React.createElement("svg", {
                style: e
            },
            React.createElement("path", {
                d: "M2,4 L20,4 M2,11 L20,11 M2,18 L20,18   M4,2 L4,20 M11,2 L11,20 M18,2 L18,20"
            })))
        }
    }
    getSnapablePoints(e) {
        return v(e).intersectPoints
    }
    scale(e, t, n, r) {
        var i = super.scale(e, t, n, r),
        o = ItemDefaultSettings.getSettings(e, "cellSize"),
        s = ItemDefaultSettings.getSettings(e, "topLeftDistance"),
        l = Geometry.rectWidth(i.data) / Geometry.rectWidth(e.data),
        c = Geometry.rectHeight(i.data) / Geometry.rectHeight(e.data),
        d = Math.max(l, c);
        return _.assignIn({},
        i, {
            settings: _.assignIn({},
            i.settings, {
                cellSize: o * d,
                topLeftDistance: s * d
            })
        })
    }
}

export { C as ShapeGridB }

export default v