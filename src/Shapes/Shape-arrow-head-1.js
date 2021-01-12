import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeCreaterBase, { ShapeCreaterBaseB, ShapeCreaterBaseC } from './ShapeCreaterBase';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(363) /*Shape-arrow-head-1*/

/*n.d(t, "a", function () {
    return h
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(10)/*ShapeHelper*/;  // 1 times
/// var o = n(1)/*Geometry*/;  // 2 times
/// var s = n(93)/*ShapeCreaterBase*/;  // 3 times
/// var l = n(8)/*ShapeUtil*/;  // 1 times
class c extends ShapeCreaterBase {
    render() {
        var e = h(this.shape()),
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
class d extends ShapeCreaterBaseC {}
function h(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.getCenterPoint(n, r);
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: n,
        p2: {
            x: r.x,
            y: a.y
        }
    },
    {
        p1: {
            x: r.x,
            y: a.y
        },
        p2: {
            x: n.x,
            y: r.y
        }
    }])
}
var u = new class extends ShapeCreaterBaseB {
    getComponent() {
        return c
    }
    getType() {
        return "arrow-head-1"
    }
    getSettingsComponent() {
        return d
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: h(e)
        }
    }
    getBoundingRect(e) {
        return Geometry.genericLinesBbox(h(e))
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
                key: "arrow-head-1"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: "M4.5,5 L16.5,10.5 L4.5,16"
            }))
        }
    }
}

export { u as ShapeArrowHead1B }

export default h