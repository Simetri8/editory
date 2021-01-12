import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeCreaterBase, { ShapeCreaterBaseB, ShapeCreaterBaseC } from './ShapeCreaterBase';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(366) /*Shape-arrow-head-4*/

/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(1)/*Geometry*/;  // 4 times
/// var o = n(93)/*ShapeCreaterBase*/;  // 3 times
/// var s = n(8)/*ShapeUtil*/;  // 1 times
/// var l = n(10)/*ShapeHelper*/;  // 1 times
class c extends ShapeCreaterBase {
    render() {
        var e = d(this.shape()),
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
function d(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.getCenterPoint(n, r),
    o = r.y - n.y,
    l = r.x - n.x,
    c = {
        p1: n,
        cp: {
            x: n.x + l / 2,
            y: a.y - o / 12
        },
        p2: {
            x: r.x,
            y: a.y
        }
    },
    d = {
        p1: {
            x: r.x,
            y: a.y
        },
        cp: {
            x: n.x + l / 2,
            y: a.y + o / 12
        },
        p2: {
            x: n.x,
            y: r.y
        }
    };
    return ShapeUtil.genericLinesTransformed(e.data, [Geometry.quadraticToCubic(c), Geometry.quadraticToCubic(d)])
}
class h extends ShapeCreaterBaseC {}
var u = new class extends ShapeCreaterBaseB {
    getComponent() {
        return c
    }
    getType() {
        return "arrow-head-4"
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
        return Geometry.genericLinesBbox(d(e))
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
                key: "arrow-head-4"
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(0px,1px)"
                },
                d: "M4,4 Q9.75,9 15.5,10 Q9.75,11  4,16"
            }))
        }
    }
}

export { u as ShapeArrowHead4B }

export default d