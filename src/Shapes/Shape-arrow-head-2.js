import _ from 'lodash';
import React from 'react';
import DynamicSvg from '../Editor/DynamicSvg';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import ShapeCreaterBase, { ShapeCreaterBaseB, ShapeCreaterBaseC } from './ShapeCreaterBase';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(364) /*Shape-arrow-head-2*/

/*n.d(t, "a", function () {
    return f
}),*/
/*n.d(t, "b", function () {
    return y
});*/
/// var r = n(0)/*React*/;  // 10 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 2 times
/// var o = n.n(i);
/// var s = n(1)/*Geometry*/;  // 2 times
/// var l = n(41)/*NumericSliderComponent*/;  // 1 times
/// var c = n(89)/*DynamicSvg*/;  // 1 times
/// var d = n(10)/*ShapeHelper*/;  // 1 times
/// var h = n(33)/*ItemRemoveSelected*/;  // 1 times
/// var u = n(93)/*ShapeCreaterBase*/;  // 3 times
/// var p = n(8)/*ShapeUtil*/;  // 1 times
class m extends ShapeCreaterBase {
    render() {
        var e = f(this.shape()),
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
function f(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = t.distance,
    i = void 0 === a ? 4 : a,
    l = r.x - n.x,
    c = Geometry.getCenterPoint(n, r),
    d = [];
    return d.push({
        p1: n,
        p2: {
            x: Math.max(r.x - i, n.x),
            y: c.y
        }
    }),
    d.push({
        p1: _.last(d).p2,
        p2: {
            x: n.x,
            y: r.y
        }
    }),
    l > i && (d.push({
        p1: {
            x: n.x + i,
            y: n.y
        },
        p2: {
            x: r.x,
            y: c.y
        }
    }), d.push({
        p1: _.last(d).p2,
        p2: {
            x: n.x + i,
            y: r.y
        }
    })),
    ShapeUtil.genericLinesTransformed(e.data, d)
}
class g extends ShapeCreaterBaseC {
    render() {
        var e = this.props.entity.data.distance,
        t = void 0 === e ? 4 : e;
        return React.createElement("arrow-head-2-settings", null, React.createElement(NumericSliderComponent, {
            unit: "px",
            min: 0,
            max: 100,
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
                    transform: "translate(2px,0)"
                },
                d: "M2,4 L10.5,10 L2,16M8,4 L16.5,10 L8,16 "
            }), React.createElement(DynamicSvg, {
                p1: {
                    x: 8,
                    y: 10
                },
                p2: {
                    x: 19,
                    y: 10
                },
                style: {
                    stroke: "green",
                    strokeOpacity: .6,
                    fill: "none",
                    fillOpacity: .6
                }
            })),
            onValueChanging: e => this.props.onEntityPropertyChanging(this.props.entity, "data", "distance", e),
            onValueChanged: (e, t) => this.props.onEntityPropertyChanged(this.props.entity, "data", "distance", e, t)
        }), ItemRemoveSelected.separator())
    }
}
var y = new class extends ShapeCreaterBaseB {
    getComponent() {
        return m
    }
    getType() {
        return "arrow-head-2"
    }
    getSettingsComponent() {
        return g
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: f(e)
        }
    }
    getBoundingRect(e) {
        return Geometry.genericLinesBbox(f(e))
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
                key: "arrow-head-2"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: "M3.5,4 L13.5,10 L3.5,16M7.5,4 L17.5,10 L7.5,16"
            }))
        }
    }
}

export { y as ShapeArrowHead2B }

export default f