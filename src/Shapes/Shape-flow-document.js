import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(422) /*Shape-flow-document*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return d
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/,  // 4 times
/// a = n.n(r)
/// i = n(1)/*Geometry*/,  // 4 times
/// o = n(9)/*ShapeBase*/,  // 1 times
/// s = n(10)/*ShapeHelper*/,  // 1 times
/// l = n(8)/*ShapeUtil*/;  // 1 times
class c extends ShapeBase {
    render() {
        var e = d(this.shape()),
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
function d(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = Geometry.rectWidth(e.data),
    o = .175 * Geometry.rectHeight(e.data),
    s = .4 * o,
    c = n.y,
    d = r.y - o,
    h = r.y - s,
    u = r.y,
    p = n.x,
    m = r.x,
    f = {
        p1: {
            x: m,
            y: d
        },
        p2: {
            x: p,
            y: h
        },
        cp: {
            x: p + a / 2 - a / 8,
            y: d
        },
        cp2: {
            x: p + a / 4 + a / 4,
            y: u + o / 2 + s / 2
        }
    };
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: {
            x: p,
            y: c
        },
        p2: {
            x: m,
            y: c
        }
    },
    {
        p1: {
            x: m,
            y: c
        },
        p2: {
            x: m,
            y: d
        }
    },
    f, {
        p1: {
            x: p,
            y: h
        },
        p2: {
            x: p,
            y: c
        }
    }])
}
class h extends ShapeBaseC {}
var u = new class extends ShapeBaseB {
    getComponent() {
        return c
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
                key: this.getType()
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4.2,5.4 L16,5.4 L16,13.65 C8.63,13.65 10.1,16.63 4.2,14.7 Z"
            }))
        }
    }
    getType() {
        return "flow-document"
    }
    getSettingsComponent() {
        return h
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: d(e)
        }
    }
    getSnapablePoints(e) {
        return d(e).map(e => e.p2).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = d(e);
        return Geometry.genericLinesBbox(t)
    }
}

export { u as ShapeFlowDocumentB }

export default d