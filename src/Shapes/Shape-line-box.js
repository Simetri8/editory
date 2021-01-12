import _ from 'lodash';
import React from 'react';
import { ArrowRendererC } from '../Editor/ArrowRenderer';
import ColorHelper from '../Mathcha/ColorHelper';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EntityUtils from '../Editor/EntityUtils';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import PolygonRenderer from '../Editor/PolygonRenderer';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(357) /*Shape-line-box*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return E
}),*/
/*n.d(t, "b", function () {
    return v
});*/
/// var r = n(3)/*_.assignIn*/,  // 7 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 8 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 11 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(8)/*ShapeUtil*/,  // 4 times
/// d = n(10)/*ShapeHelper*/,  // 1 times
/// h = n(25)/*ColorHelper*/,  // 5 times
/// u = n(139)/*ArrowRenderer*/,  // 1 times
/// p = n(33)/*ItemRemoveSelected*/,  // 1 times
/// m = n(6)/*DiagramIdHelper*/,  // 2 times
/// f = n(20)/*EntityUtils*/,  // 4 times
/// g = n(255)/*PolygonRenderer*/;  // 2 times
class y extends ShapeBase {
    constructor() {
        super(...arguments);
        this.handleSelect = (e => {
            this.props.onMouseDown(e)
        })
    }
    getDefaultFillBorderColor() {
        return this.props.fixedContextHandler.getDefaultBorderColor()
    }
    render() {
        var e = this.shape(),
        t = e.data.innerShape,
        n = E(this.shape());
        if (EntityUtils.isCubicLineArrow(t) || EntityUtils.isStraightLineArrow(t)) {
            var r = ColorHelper.getReactStyleInfo(_.assignIn({},
            t.style, e.style), ["strokeColor", "thickness", "fillColor", "lineJoin", "lineCap"], this.getDefaultFillBorderColor()),
            i = ColorHelper.getEntityStyle(t, "thickness");
            return React.createElement(ArrowRendererC, {
                key: t.id,
                type: t.type || "straight",
                tail: t.tail,
                head: t.head,
                shaft: t.shaft,
                thickness: i,
                data: n.data,
                onMouseDown: this.props.onMouseDown,
                className: "connection",
                isSelected: this.props.isSelected,
                isGroupSelected: this.props.isGroupSelected,
                isRemoteSelected: !1,
                remoteSelectedColor: void 0,
                settings: t.settings,
                noControlPointGuideLine: !0,
                htmlStyleInfo: r
            })
        }
        if (EntityUtils.isPolygon(t)) {
            var l = ColorHelper.getReactStyleInfo(_.assignIn({},
            t.style, e.style), ["strokeColor", "thickness", "fillColor", "lineJoin", "lineCap", "strokeType"], this.getDefaultFillBorderColor());
            return PolygonRenderer.renderPolygon(t, n.data, this.props.className, this.handleSelect, l, {
                isSelected: this.props.isSelected,
                isGroupSelected: this.props.isGroupSelected,
                isRemoteSelected: this.props.isRemoteSelected,
                remoteSelectedColor: this.props.remoteSelectedColor
            })
        }
        if (EntityUtils.isPolygonCurve(t)) {
            var c = ColorHelper.getReactStyleInfo(_.assignIn({},
            t.style, e.style), ["strokeColor", "thickness", "fillColor", "lineJoin", "lineCap", "strokeType"], this.getDefaultFillBorderColor());
            return PolygonRenderer.renderPolygonCurve(t, n.data, this.props.className, c, {
                isSelected: this.props.isSelected,
                isGroupSelected: this.props.isGroupSelected,
                isRemoteSelected: this.props.isRemoteSelected,
                remoteSelectedColor: this.props.remoteSelectedColor,
                disableGuide: !0
            },
            this.handleSelect)
        }
        var p = Geometry.getPointsRect(e.data),
        m = Geometry.pointsToLines(p),
        y = ShapeHelper.pathsD(m);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), this.getTransparentOnlyNoFill(y), React.createElement("path", {
            className: "real",
            d: y,
            style: this.style()
        }))
    }
}
class A extends ShapeBaseC {
    constructor() {
        super(...arguments);
        this.handleUnBox = (() => {
            var e = this.props.entity,
            t = e.data.innerShape,
            n = Geometry.rectWidth(e.data),
            r = Geometry.rectHeight(e.data);
            switch (t.type) {
            case "cubic":
                case "polygon-curve":
                var i = t,
                o = i.data.map(t => Geometry.transformCubicBezier(t, n, r, e.data.p1.x, e.data.p1.y)),
                l = ShapeUtil.genericLinesTransformed(e.data, o).map(e => Geometry.toRelativeControlPointCubic(e)),
                d = _.assignIn({
                    id: DiagramIdHelper.nextIdByPreviousId(i.id)
                },
                i, {
                    data: l,
                    style: _.assignIn({},
                    i.style, e.style)
                });
                return void this.props.onNewTypeEntityChanged(e, d);
            case "polygon":
                default:
                var h = t,
                u = h.data.map(t => ({
                    x: t.x * n + e.data.p1.x,
                    y: t.y * r + e.data.p1.y
                })),
                p = _.assignIn({
                    id: DiagramIdHelper.nextIdByPreviousId(h.id)
                },
                h, {
                    data: ShapeUtil.pointsTransformed(e.data, u),
                    style: _.assignIn({},
                    h.style, e.style)
                });
                this.props.onNewTypeEntityChanged(e, p)
            }
        })
    }
    shouldComponentUpdate() {
        return !1
    }
    render() {
        return React.createElement("line-box-settings", null, React.createElement("main", null, React.createElement("button", {
            className: "btn-normal",
            style: {
                marginTop: 3,
                marginLeft: 5,
                marginRight: 5,
                width: 60
            },
            onClick: this.handleUnBox
        },
        "Unboxed"), ItemRemoveSelected.separator()))
    }
}
function E(e) {
    var t = e.data.innerShape,
    n = Math.max(Geometry.rectWidth(e.data), 1),
    r = Math.max(Geometry.rectHeight(e.data), 1);
    if ("cubic" == t.type || "polygon-curve" == t.type) {
        var a = e.data.innerShape.data.map(t => Geometry.transformCubicBezier(t, n, r, e.data.p1.x, e.data.p1.y));
        return {
            type: "line",
            data: ShapeUtil.genericLinesTransformed(e.data, a)
        }
    }
    if (!t.type || "polygon" == t.type) {
        var i = e.data.innerShape.data.map(t => ({
            x: t.x * n + e.data.p1.x,
            y: t.y * r + e.data.p1.y
        }));
        return {
            type: "points",
            data: ShapeUtil.pointsTransformed(e.data, i)
        }
    }
    return {
        type: "points",
        data: Geometry.getPointsRect(e.data)
    }
}
var v = new class extends ShapeBaseB {
    getComponent() {
        return y
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return {
            component: React.createElement("svg", {
                key: this.getType(),
                style: e
            },
            React.createElement("rect", {
                x: "5",
                y: "6",
                width: "13",
                height: "9"
            }))
        }
    }
    styleSupports(e) {
        return "cubic" != e.data.innerShape.type && e.data.innerShape.type ? ["thickness", "strokeColor", "fillColor", "strokeType", "rotation", "skewX"] : ["thickness", "strokeColor", "fillColor", "rotation", "skewX"]
    }
    getType() {
        return "line-box"
    }
    getSettingsComponent() {
        return A
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = E(e);
        return "line" == t.type ? {
            data: t.data
        } : {
            data: Geometry.pointsToLines(t.data)
        }
    }
    getSnapablePoints(e) {
        var t = E(e);
        if ("line" == t.type) {
            var n = t.data;
            return n.length <= 0 ? [] : [n[0].p1].concat(n.map(e => e.p2))
        }
        return t.data
    }
}

export { v as ShapeLineBoxB }

export default E