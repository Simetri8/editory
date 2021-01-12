import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeCreaterBase, { ShapeCreaterBaseB, ShapeCreaterBaseC } from './ShapeCreaterBase';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(365) /*Shape-arrow-head-3*/

/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return g
});*/
/// var r = n(0)/*React*/;  // 10 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 3 times
/// var o = n.n(i);
/// var s = n(1)/*Geometry*/;  // 2 times
/// var l = n(41)/*NumericSliderComponent*/;  // 1 times
/// var c = n(10)/*ShapeHelper*/;  // 1 times
/// var d = n(33)/*ItemRemoveSelected*/;  // 1 times
/// var h = n(93)/*ShapeCreaterBase*/;  // 3 times
/// var u = n(8)/*ShapeUtil*/;  // 1 times
class p extends ShapeCreaterBase {
    render() {
        var e = m(this.shape()),
        t = ShapeHelper.pathsD(e);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            style: this.transparentStyle(),
            d: t
        }), React.createElement("path", {
            className: "real",
            d: t,
            style: this.style()
        }))
    }
}
function m(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.percentage,
    i = void 0 === a ? .5 : a,
    l = Geometry.getCenterPoint(n, r),
    c = r.x - n.x,
    d = [];
    return d.push({
        p1: n,
        p2: {
            x: r.x,
            y: l.y
        }
    }),
    d.push({
        p1: _.last(d).p2,
        p2: {
            x: n.x,
            y: r.y
        }
    }),
    d.push({
        p1: _.last(d).p2,
        p2: {
            x: n.x + i * c,
            y: l.y
        }
    }),
    d.push({
        p1: _.last(d).p2,
        p2: n
    }),
    ShapeUtil.genericLinesTransformed(e.data, d)
}
class f extends ShapeCreaterBaseC {
    render() {
        var e = this.props.entity.data.percentage,
        t = void 0 === e ? .5 : e;
        return React.createElement("arrow-head-3-settings", null, React.createElement(NumericSliderComponent, {
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
            React.createElement("path", {
                style: {
                    transform: "translate(0px,-1px)"
                },
                d: " M3.968907834428151,3.986814462515074 L16.74460106340797,10.88404171757177 L3.968907834428151,17.781268972628467 L10.35675444891806,10.88404171757177 L3.968907834428151,3.986814462515074"
            }), React.createElement("circle", {
                cx: 8,
                cy: 10,
                r: 2,
                style: {
                    stroke: "green",
                    fill: "#9af79a",
                    strokeWidth: 1
                }
            })),
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "percentage", e / 100),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "percentage", e / 100, t)
        }), ItemRemoveSelected.separator())
    }
}
var g = new class extends ShapeCreaterBaseB {
    getComponent() {
        return p
    }
    getType() {
        return "arrow-head-3"
    }
    getSettingsComponent() {
        return f
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: m(e)
        }
    }
    getBoundingRect(e) {
        return Geometry.genericLinesBbox(m(e))
    }
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: "arrow-head-3"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: " M4,4 L17.5,10 L4,16 L10.75,10 L4,4"
            }))
        }
    }
}

export { g as ShapeArrowHead3B }

export default m