import React from 'react';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(154) /*Shape-regular-polygon-almost*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "c", function () {
    return h
}),*/
/*n.d(t, "b", function () {
    return u
}),*/
/*n.d(t, "a", function () {
    return p
}),*/
/*n.d(t, "d", function () {
    return m
});*/
/// var r = n(0)/*React*/,  // 13 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 6 times
/// o = n(10)/*ShapeHelper*/,  // 1 times
/// s = n(33)/*ItemRemoveSelected*/,  // 1 times
/// l = n(41)/*NumericSliderComponent*/,  // 1 times
/// c = n(9)/*ShapeBase*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 2 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.pathsD(e);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), this.getTransparentOnlyNoFill(t), React.createElement("path", {
            className: "real",
            d: t,
            style: this.style()
        }))
    }
}
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.sides;
    a = a || 6;
    for (var o = (r.x - n.x) / 2, s = (r.y - n.y) / 2, l = Geometry.getCenterPoint(n, r), c = [], h = 0; h < a; h += 1) c.push({
        p1: {
            x: l.x + o * Math.cos(2 * h * Math.PI / a),
            y: l.y + s * Math.sin(2 * h * Math.PI / a)
        },
        p2: {
            x: l.x + o * Math.cos(2 * (h + 1) * Math.PI / a),
            y: l.y + s * Math.sin(2 * (h + 1) * Math.PI / a)
        }
    });
    return ShapeUtil.genericLinesTransformed(e.data, c)
}
class p extends ShapeBaseC {
    shouldComponentUpdate(e) {
        var t = e.entity,
        n = this.props.entity;
        return t.data.sides != n.data.sides
    }
    render() {
        var e = this.props.entity.data.sides || 6,
        t = {
            stroke: "green",
            strokeWidth: 1,
            fill: "green"
        };
        return React.createElement("regular-polygon-settings", null, React.createElement("main", null, React.createElement(NumericSliderComponent, {
            unit: "",
            min: 3,
            max: 50,
            step: 1,
            value: e,
            icon: React.createElement("svg", {
                style: {
                    width: "21px",
                    height: "14px",
                    strokeWidth: "1px",
                    stroke: "lightgray",
                    fill: "none",
                    overflow: "visible",
                    transform: "translate(0px,-1px)"
                }
            },
            React.createElement("path", {
                style: {
                    transform: "translate(0,0)"
                },
                d: " M18,10.7 L14.8,16.24 L8.4,16.24 L5.2,10.7 L8.4,5.16 L14.8,5.16 L18,10.7 L14.8,16.24"
            }), React.createElement("circle", {
                cx: "18",
                cy: "10.7",
                r: "1",
                style: t
            }), React.createElement("circle", {
                cx: "14.8",
                cy: "16.24",
                r: "1",
                style: t
            }), React.createElement("circle", {
                cx: "8.4",
                cy: "16.24",
                r: "1",
                style: t
            }), React.createElement("circle", {
                cx: "5.2",
                cy: "10.7",
                r: "1",
                style: t
            }), React.createElement("circle", {
                cx: "8.4",
                cy: "5.16",
                r: "1",
                style: t
            }), React.createElement("circle", {
                cx: "14.8",
                cy: "5.16",
                r: "1",
                style: t
            })),
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "sides", e),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "sides", e, t)
        }), ItemRemoveSelected.separator()))
    }
}
var m = new class extends ShapeBaseB {
    constructor() {
        super(...arguments);
        this.getSupplementaryLines = (e => {
            var t = [];
            return t = (t = Geometry.pointsToLines(Geometry.getPointsRect(e.data))).concat(Geometry.ellipseToCubicBeziers(e.data.p1, e.data.p2)),
            ShapeUtil.genericLinesTransformed(e.data, t)
        })
    }
    getComponent() {
        return h
    }
    getType() {
        return "regular-polygon-almost"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: u(e)
        }
    }
    getSnapablePoints(e) {
        var t = e.data,
        n = t.p1,
        r = t.p2,
        a = Geometry.getCenterPoint(n, r);
        return u(e).map(e => e.p2).concat(a).concat(a)
    }
    getBoundingRect(e) {
        return Geometry.genericLinesBbox(u(e))
    }
}

export { h as ShapeRegularPolygonAlmostC }

export { u as ShapeRegularPolygonAlmostB }

export { m as ShapeRegularPolygonAlmostD }

export default p