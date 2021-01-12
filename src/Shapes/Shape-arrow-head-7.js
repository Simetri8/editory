import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeCreaterBase, { ShapeCreaterBaseB, ShapeCreaterBaseC } from './ShapeCreaterBase';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(368) /*Shape-arrow-head-7*/

/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 2 times
/// var o = n(10)/*ShapeHelper*/;  // 1 times
/// var s = n(93)/*ShapeCreaterBase*/;  // 3 times
/// var l = n(8)/*ShapeUtil*/;  // 1 times
class c extends ShapeCreaterBase {
    render() {
        var e = ShapeHelper.pathsD(d(this.shape()));
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            style: this.transparentStyle(),
            d: e
        }), React.createElement("path", {
            className: "real",
            d: e,
            style: this.style()
        }))
    }
}
function d(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.getCenterPoint(n, r);
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: n.x,
            y: a.y
        },
        p2: {
            x: r.x,
            y: a.y
        }
    },
    {
        p1: {
            x: a.x,
            y: n.y
        },
        p2: {
            x: a.x,
            y: r.y
        }
    }])
}
class h extends ShapeCreaterBaseC {}
var u = new class extends ShapeCreaterBaseB {
    getComponent() {
        return c
    }
    getType() {
        return "arrow-head-7"
    }
    getSettingsComponent() {
        return h
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: d(e)
        }
    }
    getBoundingRect(e) {
        var t = d(e);
        return Geometry.genericLinesBbox(t)
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
                key: "arrow-head-7"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: "M4.66609690743087,10.049157637614059 L17.5,10.049157637614059 M11.083048453715435,4.098315275228117 L11.083048453715435,16"
            }))
        }
    }
}

export { u as ShapeArrowHead7B }

export default d