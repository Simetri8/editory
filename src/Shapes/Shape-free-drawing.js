import _ from 'lodash';
import React from 'react';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(448) /*Shape-free-drawing*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return f
}),*/
/*n.d(t, "b", function () {
    return y
});*/
/// var r = n(3)/*_.assignIn*/,  // 2 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 7 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 7 times
/// l = n(10)/*ShapeHelper*/,  // 1 times
/// c = n(8)/*ShapeUtil*/,  // 1 times
/// d = n(9)/*ShapeBase*/,  // 1 times
/// h = n(33)/*ItemRemoveSelected*/,  // 1 times
/// u = n(6)/*DiagramIdHelper*/,  // 1 times
/// p = n(42)/*ColorTypeConverter*/;  // 1 times
class m extends ShapeBase {
    getStyle() {
        var e = this.style();
        if (this.props.fixedContextHandler.isDarkMode()) {
            var t = ColorTypeConverter.colorToArr(e.stroke, [0, 0, 0]);
            if (0 === t[0] && 0 === t[1] && 0 === t[2]) return _.assignIn({},
            e, {
                stroke: this.props.fixedContextHandler.getDefaultBorderColor()
            })
        }
        return e
    }
    render() {
        var e = f(this.shape()),
        t = ShapeHelper.pathsD(e);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), this.getTransparentOnlyNoFill(t), React.createElement("path", {
            className: "real",
            d: t,
            style: _.assignIn({},
            this.getStyle(), {
                strokeLinejoin: "round",
                strokeLinecap: "round"
            })
        }))
    }
}
function f(e) {
    var t = e.data.p1,
    n = Geometry.rectWidthHeight(e.data),
    r = n.width,
    a = n.height,
    i = e.data.paths.map(e => ({
        p1: Geometry.relativeToAbsolutePoint(t, e.p1, r, a),
        p2: Geometry.relativeToAbsolutePoint(t, e.p2, r, a),
        cp: Geometry.relativeToAbsolutePoint(t, e.cp, r, a),
        cp2: Geometry.relativeToAbsolutePoint(t, e.cp2, r, a)
    }));
    return ShapeUtil.genericLinesTransformed(e.data, i)
}
class g extends ShapeBaseC {
    constructor() {
        super(...arguments);
        this.handleConvertToCurve = (() => {
            var e = this.props.entity,
            t = f(e).map(e => Geometry.toRelativeControlPointCubic(e)),
            n = {
                id: DiagramIdHelper.nextDiagramArrowId(),
                type: "cubic",
                data: t,
                head: "no",
                tail: "no",
                shaft: "-",
                settings: {
                    isControlPointBreak: !0
                },
                style: {
                    thickness: e.style.thickness,
                    strokeColor: e.style.strokeColor,
                    lineJoin: "round",
                    lineCap: "round"
                }
            };
            this.props.onNewTypeEntityChanged(e, n)
        })
    }
    render() {
        return this.props.forManyEntities ? React.createElement("div", null) : React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("button", {
            className: "btn-normal",
            onClick: this.handleConvertToCurve,
            style: {
                marginTop: 3,
                marginLeft: 5,
                marginRight: 5
            }
        },
        "To Curve"), ItemRemoveSelected.separator())
    }
}
var y = new class extends ShapeBaseB {
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
                    transform: "translate(1px,0px)"
                },
                d: " M4,5.6 L16.1,5.6 L16.1,15.2 L4,15.2 Z"
            }))
        }
    }
    createShape(e) {
        throw new Error("not implemented")
    }
    getComponent() {
        return m
    }
    getType() {
        return "free-drawing"
    }
    getSettingsComponent() {
        return g
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: f(e)
        }
    }
    getSnapablePoints(e) {
        return []
    }
    getBoundingRect(e) {
        return Geometry.genericLinesBbox(f(e))
    }
    styleSupports() {
        return ["thickness", "strokeColor", "strokeType"]
    }
}

export { y as ShapeFreeDrawingB }

export default f