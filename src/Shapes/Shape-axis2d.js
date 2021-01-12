import _ from 'lodash';
import React from 'react';
// Not found 'var' for: import  from '../Editor/SnapToGridSize';
// Not found 'var' for: import  from './ShapeBase';
import ColorHelper from '../Mathcha/ColorHelper';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import ControlPoints from '../Geometry/ControlPoints';
import DiagramElementCreater from '../Editor/DiagramElementCreater';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DynamicSvg from '../Editor/DynamicSvg';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeBaseB from './ShapeBaseB';
import ShapeStyleBase from './ShapeStyleBase';
import ShapeStyleBaseC from './ShapeStyleBaseC';
import ShapeUtil from './ShapeUtil';
import TextColorItem from '../Elements/TextColorItem';

/// xxx(352) /*Shape-axis2d*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeStyleBaseC = n(1534)/*ShapeStyleBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return I
}),*/
/*n.d(t, "b", function () {
    return T
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 15 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 10 times
/// l = n(6)/*DiagramIdHelper*/,  // 1 times
/// c = n(41)/*NumericSliderComponent*/,  // 1 times
/// d = n(89)/*DynamicSvg*/,  // 1 times
/// h = n(33)/*ItemRemoveSelected*/,  // 5 times
/// u = n(242)/*TextColorItem*/,  // 1 times
/// p = n(113)/*SnapToGridSize*/,  // 0 times
/// m = n(166)/*ShapeStyleBase*/,  // 1 times
/// f = n(84)/*ControlPoints*/,  // 5 times
/// g = n(9)/*ShapeBase*/,  // 0 times
/// y = n(8)/*ShapeUtil*/,  // 13 times
/// A = n(141)/*DiagramElementCreater*/,  // 1 times
/// E = n(42)/*ColorTypeConverter*/,  // 1 times
/// v = n(25)/*ColorHelper*/,  // 2 times
/// S = n(17)/*ItemDefaultSettings*/;  // 6 times
class C extends ShapeStyleBase {
    render() {
        var e = this.props.shape,
        t = I(e),
        n = ControlPoints.fromPaths([t.xAxis, t.yAxis], "real"),
        r = ControlPoints.fromPaths([t.xAxis, t.yAxis], "transparent", this.transparentStyle()),
        a = t.lines ? ControlPoints.fromPaths(t.lines) : void 0,
        i = ColorTypeConverter.getHtmlColor(ColorHelper.getEntityStyle(e, "textColor")),
        s = t.textPoints ? React.createElement("g", {
            style: {
                fill: i,
                fontSize: 11,
                fontWeight: "normal",
                textAnchor: "end",
                stroke: "none",
                fontFamily: "Times"
            }
        },
        t.textPoints.map((e, t) => React.createElement("text", {
            key: t,
            x: e.p.x,
            y: e.p.y
        },
        e.text))) : void 0,
        l = ControlPoints.fromPoints(t.xArrow),
        c = ControlPoints.fromPoints(t.yArrow);
        return React.createElement("g", {
            className: this.props.className + " axis2d",
            style: this.props.styleInfo.style,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        n, r, l, c, a, s)
    }
}
class x extends ShapeStyleBaseC {
    shouldComponentUpdate(e) {
        var t = e.entity,
        n = this.props.entity;
        return this.isSettingDifferent(t, n, "separatorDistance") || this.isSettingDifferent(t, n, "numering") || this.isStyleDifferent(t, n, "textColor") || this.isSettingDifferent(t, n, "separator")
    }
    renderSepratorDistance(e) {
        if (e) {
            var t = this.props.entity,
            n = ItemDefaultSettings.getSettings(t, "separatorDistance");
            return [React.createElement(NumericSliderComponent, {
                title: "Separator distance",
                key: "2",
                unit: "px",
                min: 5,
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
                onValueChanging: e => this.props.onEntityPropertyChanging(t, "settings", "separatorDistance", e),
                onValueChanged: (e, n) => this.props.onEntityPropertyChanged(t, "settings", "separatorDistance", e, n)
            }), ItemRemoveSelected.separator1()]
        }
    }
    renderNumering(e) {
        if (e) {
            var t = this.props.entity,
            n = ItemDefaultSettings.getSettings(t, "numering");
            return React.createElement("numering-settings", {
                style: {
                    display: "flex"
                }
            },
            React.createElement("x-item", {
                title: "Show Number",
                onMouseDown: () => this.props.onEntityPropertyChanged(t, "settings", "numering", !n),
                class: n ? "selected" : "",
                style: {
                    width: 22
                }
            },
            ItemRemoveSelected.svgNumberIcon()), React.createElement(TextColorItem, {
                value: ColorHelper.getEntityStyle(t, "textColor"),
                onItemSelect: (e, n) => this.props.onEntityPropertyChanged(t, "style", "textColor", e, n)
            }), ItemRemoveSelected.separator())
        }
    }
    render() {
        var e = this.props.entity,
        t = ItemDefaultSettings.getSettings(e, "separator");
        return React.createElement("axis2d-settings", {
            style: {
                display: "flex"
            }
        },
        React.createElement("x-item", {
            title: "Enable Separator",
            onMouseDown: () => this.props.onEntityPropertyChanged(e, "settings", "separator", !t),
            class: t ? "selected" : "",
            style: {
                width: 22
            }
        },
        ItemRemoveSelected.svgAxisIcon()), ItemRemoveSelected.separator(), this.renderSepratorDistance(t), this.renderNumering(t))
    }
}
function I(e) {
    var t = ItemDefaultSettings.getSettings(e, "separator"),
    n = e.data,
    r = n.p1,
    a = n.p2,
    i = n.cp,
    o = function (e, t, n) {
        return {
            xAxis: {
                p1: {
                    x: e.x,
                    y: n.y
                },
                p2: {
                    x: t.x,
                    y: n.y
                }
            },
            yAxis: {
                p1: {
                    x: n.x,
                    y: e.y
                },
                p2: {
                    x: n.x,
                    y: t.y
                }
            }
        }
    } (r, a, i),
    l = o.xAxis,
    c = o.yAxis,
    d = [{
        x: l.p2.x - 7,
        y: l.p2.y - 5
    },
    {
        x: l.p2.x,
        y: l.p2.y
    },
    {
        x: l.p2.x - 7,
        y: l.p2.y + 5
    }],
    h = [{
        x: c.p1.x - 5,
        y: c.p1.y + 7
    },
    {
        x: c.p1.x,
        y: c.p1.y
    },
    {
        x: c.p1.x + 5,
        y: c.p1.y + 7
    }];
    if (!t) return {
        xAxis: ShapeUtil.genericLinesTransformed(e.data, [l])[0],
        yAxis: ShapeUtil.genericLinesTransformed(e.data, [c])[0],
        xArrow: ShapeUtil.pointsTransformed(e.data, d),
        yArrow: ShapeUtil.pointsTransformed(e.data, h),
        lines: null,
        textPoints: null
    };
    for (var u = ItemDefaultSettings.getSettings(e, "separatorDistance"), p = ItemDefaultSettings.getSettings(e, "numering"), m = Geometry.distance2Points(i, l.p2), f = [], g = [], A = u, E = 1; A < m - 15; A += u, E++) {
        f.push({
            p1: {
                x: i.x + A,
                y: i.y - 5
            },
            p2: {
                x: i.x + A,
                y: i.y + 5
            }
        });
        p && g.push({
            text: E.toString(),
            p: {
                x: i.x + A + 3,
                y: i.y + 15
            }
        });
    }
    for (var v = Geometry.distance2Points(i, l.p1), C = u, x = 1; C < v - 5; C += u, x++) {
        f.push({
            p1: {
                x: i.x - C,
                y: i.y - 5
            },
            p2: {
                x: i.x - C,
                y: i.y + 5
            }
        });
        p && g.push({
            text: (-x).toString(),
            p: {
                x: i.x - C + 3,
                y: i.y + 15
            }
        });
    }
    for (var I = Geometry.distance2Points(i, c.p1), T = u, b = 1; T < I - 15; T += u, b++) {
        f.push({
            p1: {
                x: i.x - 5,
                y: i.y - T
            },
            p2: {
                x: i.x + 5,
                y: i.y - T
            }
        });
        p && g.push({
            text: b.toString(),
            p: {
                x: i.x - 7,
                y: i.y - T + 3
            }
        });
    }
    for (var L = Geometry.distance2Points(i, c.p2), R = u, M = 1; R < L - 5; R += u, M++) {
        f.push({
            p1: {
                x: i.x - 5,
                y: i.y + R
            },
            p2: {
                x: i.x + 5,
                y: i.y + R
            }
        });
        p && g.push({
            text: (-M).toString(),
            p: {
                x: i.x - 7,
                y: i.y + R + 3
            }
        });
    }
    return {
        lines: ShapeUtil.genericLinesTransformed(e.data, f),
        textPoints: g.map(t => ({
            p: ShapeUtil.pointTransformed(e.data, t.p),
            text: t.text
        })),
        xAxis: ShapeUtil.genericLinesTransformed(e.data, [l])[0],
        yAxis: ShapeUtil.genericLinesTransformed(e.data, [c])[0],
        xArrow: ShapeUtil.pointsTransformed(e.data, d),
        yArrow: ShapeUtil.pointsTransformed(e.data, h)
    }
}
var T = new class extends ShapeBaseB {
    getComponent() {
        return C
    }
    getType() {
        return "axis2d"
    }
    getSettingDefaultValue(e) {
        return "separator" != e && ("separatorDistance" == e ? 20 : "textColor" == e ? "#000" : void 0)
    }
    getSettingsComponent() {
        return x
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = I(e);
        return {
            data: [t.xAxis, t.yAxis]
        }
    }
    createShape(e) {
        return e = _.assignIn({},
        e, {
            shapeWidth: 100,
            shapeHeight: 10
        }),
        DiagramElementCreater.createBy(e, e => {
            var t = e.bottom,
            n = this.getRandomPosYAround(e.top + 50, e.top + 150, t);
            return {
                id: DiagramIdHelper.nextDiagramCompositeShapeId(),
                type: "axis2d",
                data: {
                    p1: {
                        x: e.left + 50,
                        y: n.y1
                    },
                    p2: {
                        x: e.left + 150,
                        y: n.y1 + 100
                    },
                    cp: {
                        x: e.left + 60,
                        y: n.y1 + 90
                    }
                }
            }
        })
    }
    getIcon() {
        return {
            caption: "axis",
            component: React.createElement("svg", {
                style: {
                    width: 25,
                    height: 20,
                    position: "relative"
                },
                key: "axis2d"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(3px,8px)"
                },
                d: "M2,7 L18,7   M15,5 L18,7 L15,9"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "rotate(-90deg) translate(-21px,2px)"
                },
                d: "M2,7 L18,7 M15,5 L18,7 L15,9"
            }))
        }
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = ShapeUtil.pointTransformed(e.data, e.data.cp);
        return n.concat([{
            key: "md1",
            type: "square",
            p: r
        }])
    }
    keepCenterRatio(e, t) {
        var n = e.data,
        r = n.cp,
        a = n.p1,
        i = Geometry.rectWidthHeight(e.data),
        o = i.width,
        l = i.height,
        c = (r.x - a.x) / o,
        d = (r.y - a.y) / l,
        h = Geometry.rectWidthHeight(t.data),
        u = h.width,
        p = h.height,
        m = {
            x: t.data.p1.x + u * c,
            y: t.data.p1.y + p * d
        };
        return m = Geometry.clampPoint(m, t.data.p1, t.data.p2),
        this.changeShapeData(t, "cp", m)
    }
    moveControlPoint(e) {
        if ("md1" != e.key && "md2" != e.key) {
            var t = super.moveControlPoint(e);
            return this.keepCenterRatio(e.shape, t)
        }
        if ("md1" == e.key) {
            var n = e.shape.data,
            r = n.p1,
            a = n.p2,
            i = ShapeUtil.reversePoint(e.shape.data, e.point),
            o = Geometry.clampPoint(i, r, a);
            return this.changeShapeData(e.shape, "cp", o)
        }
        return e.shape
    }
    move(e, t, n) {
        var r = e.data,
        a = r.p1,
        i = r.cp,
        o = super.move(e, t, n),
        l = Geometry.substractPoint(i, a),
        c = Geometry.addPoint(o.data.p1, l);
        return this.changeShapeData(o, "cp", c)
    }
    scale(e, t, n, r) {
        var a = super.scale(e, t, n, r);
        return this.keepCenterRatio(e, a)
    }
    styleSupports() {
        return ["thickness", "strokeColor", "intersection", "strokeType", "rotation", "skewX"]
    }
    getSnapablePoints(e) {
        return ShapeUtil.pointsTransformed(e.data, [e.data.cp])
    }
    rotateAround(e, t, n) {
        var r = super.rotateAround(e, t, n);
        return this.keepCenterRatio(e, r)
    }
    skewXAtCenter(e, t, n) {
        var r = super.skewXAtCenter(e, t, n);
        return this.keepCenterRatio(e, r)
    }
}

export { T as ShapeAxis2dB }

export default I