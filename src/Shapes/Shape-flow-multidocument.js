import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(423) /*Shape-flow-multidocument*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return f
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 11 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 5 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 3 times
/// d = n(8)/*ShapeUtil*/;  // 3 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.pathsD(e.part1),
        n = ShapeHelper.pathsD(e.part2),
        r = ShapeHelper.pathsD(e.part3);
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
            className: "transparent no-print",
            d: n,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "transparent no-print",
            d: r,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: t,
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: r,
            style: this.style()
        }))
    }
}
function u(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = .1 * Geometry.rectWidth(e.data),
    i = .1 * Geometry.rectHeight(e.data),
    o = p({
        p1: {
            x: n.x + 2 * a,
            y: n.y
        },
        p2: {
            x: r.x,
            y: r.y - 2 * i
        }
    }),
    l = p({
        p1: {
            x: n.x + a,
            y: n.y + i
        },
        p2: {
            x: r.x - a,
            y: r.y - i
        }
    }),
    c = p({
        p1: {
            x: n.x,
            y: n.y + 2 * i
        },
        p2: {
            x: r.x - 2 * a,
            y: r.y
        }
    });
    return {
        part1: ShapeUtil.genericLinesTransformed(e.data, o),
        part2: ShapeUtil.genericLinesTransformed(e.data, l),
        part3: ShapeUtil.genericLinesTransformed(e.data, c)
    }
}
function p(e) {
    var t = e.p1,
    n = e.p2,
    r = Geometry.rectWidth(e),
    a = .175 * Geometry.rectHeight(e),
    i = .4 * a,
    o = t.y,
    l = n.y - a,
    c = n.y - i,
    d = n.y,
    h = t.x,
    u = n.x;
    return [{
        p1: {
            x: h,
            y: o
        },
        p2: {
            x: u,
            y: o
        }
    },
    {
        p1: {
            x: u,
            y: o
        },
        p2: {
            x: u,
            y: l
        }
    },
    {
        p1: {
            x: u,
            y: l
        },
        p2: {
            x: h,
            y: c
        },
        cp: {
            x: h + r / 2 - r / 8,
            y: l
        },
        cp2: {
            x: h + r / 4 + r / 4,
            y: d + a / 2 + i / 2
        }
    },
    {
        p1: {
            x: h,
            y: c
        },
        p2: {
            x: h,
            y: o
        }
    }]
}
class m extends ShapeBaseC {}
var f = new class extends ShapeBaseB {
    getComponent() {
        return h
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
                    fill: "white",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M7.42,5.2 L16.8,5.2 L16.8,11.09 C10.94,11.09 12.11,13.21 7.42,11.84 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "white",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M5.41,6.73 L14.79,6.73 L14.79,12.62 C8.93,12.62 10.1,14.74 5.41,13.37 Z"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "white",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.4,8.26 L12.78,8.26 L12.78,14.15 C6.92,14.15 8.09,16.27 3.4,14.9 Z"
            }))
        }
    }
    createShape(e) {
        var t = super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 40,
            shapeHeight: e.shapeHeight || 170
        }));
        return t.style = {
            fillColor: [255, 255, 255, 1]
        },
        t
    }
    getType() {
        return "flow-multidocument"
    }
    getSettingsComponent() {
        return m
    }
    getBreakdownInfoWhenInvalidCache(e) {
        var t = u(e);
        return {
            data: t.part1.concat(t.part2).concat(t.part3)
        }
    }
    getSnapablePoints(e) {
        var t = u(e);
        return t.part3.map(e => e.p2).concat([t.part1[0].p1], t.part2[0].p1, t.part1[1].p1, t.part1[1].p2, t.part2[1].p2)
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.genericLinesBbox(t.part1.concat(t.part2).concat(t.part3))
    }
}

export { f as ShapeFlowMultidocumentB }

export default u