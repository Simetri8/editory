import React from 'react';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(359) /*Shape-polynomial*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return p
}),*/
/*n.d(t, "b", function () {
    return m
});*/
/// var r = n(0)/*React*/,  // 13 times
/// a = n.n(r)
/// i = n(41)/*NumericSliderComponent*/,  // 1 times
/// o = n(10)/*ShapeHelper*/,  // 1 times
/// s = n(33)/*ItemRemoveSelected*/,  // 1 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(1)/*Geometry*/,  // 1 times
/// d = n(8)/*ShapeUtil*/;  // 1 times
class h extends ShapeBase {
    render() {
        var e = p(this.shape()),
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
class u extends ShapeBaseC {
    shouldComponentUpdate(e) {
        var t = e.entity,
        n = this.props.entity;
        return t.data.curveDegree != n.data.curveDegree
    }
    render() {
        var e = this.props.entity.data.curveDegree;
        e = null == e ? 1 : e;
        var t = Math.floor(e / 1.5 * 100);
        return React.createElement("polynomial-settings", null, React.createElement("main", null, React.createElement(NumericSliderComponent, {
            unit: "%",
            min: 0,
            max: 100,
            step: 1,
            value: t,
            title: "extrema",
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
                    transform: "translate(4px,0)"
                },
                d: "M1,15 C5,-12 10,27 15,1 "
            }), React.createElement("path", {
                d: "M5,15 L5,4 M3,6 L5,4 L7,6",
                style: {
                    stroke: "green",
                    strokeOpacity: .8,
                    transform: "translate(4px,-2px)"
                }
            })),
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "curveDegree", e / 100 * 1.5),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "curveDegree", e / 100 * 1.5, t)
        }), ItemRemoveSelected.separator()))
    }
}
function p(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.curveDegree,
    i = void 0 === a ? 1 : a,
    o = r.x - n.x,
    s = r.y - n.y,
    l = {
        p1: {
            x: n.x,
            y: r.y
        },
        cp: {
            x: n.x + o / 3,
            y: r.y - s * i * 2
        },
        cp2: {
            x: n.x + 2 * o / 3,
            y: n.y + s * i * 2
        },
        p2: {
            x: r.x,
            y: n.y
        }
    };
    return ShapeUtil.genericLinesTransformed(e.data, [l])
}
var m = new class extends ShapeBaseB {
    getComponent() {
        return h
    }
    getType() {
        return "polynomial"
    }
    getSettingsComponent() {
        return u
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: p(e)
        }
    }
    getIcon() {
        return {
            caption: React.createElement("div", {
                style: {
                    marginTop: -3
                }
            },
            "y=x", React.createElement("span", {
                style: {
                    fontSize: "0.8em",
                    verticalAlign: 2
                }
            },
            "3")),
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "polynomial"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,0px)"
                },
                d: "M4,18 C8.333333333333332,-10.979999999999997 12.666666666666666,32.98 17,4"
            }))
        }
    }
    getSnapablePoints(e) {
        return this.getControlPoints(e).filter(e => "bottom-left" == e.key || "top-right" == e.key).map(e => e.p)
    }
    getBoundingRect(e) {
        return e.data.rotation ? Geometry.genericLinesBbox(p(e)) : e.data
    }
}

export { m as ShapePolynomialB }

export default p