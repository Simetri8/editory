import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(418) /*Shape-doc-right-angle*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return p
}),*/
/*n.d(t, "b", function () {
    return f
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 7 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 4 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(8)/*ShapeUtil*/,  // 2 times
/// h = n(33)/*ItemRemoveSelected*/;  // 1 times
class u extends ShapeBase {
    render() {
        var e = p(this.shape()),
        t = ShapeHelper.getLineD(e);
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
function p(e) {
    var t = e.data,
    n = t.p1,
    r = t.p2,
    a = n.y,
    i = r.y,
    o = n.x,
    s = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: o,
        y: a
    },
    {
        x: s,
        y: a
    },
    {
        x: s,
        y: i
    }])
}
class m extends ShapeBaseC {
    constructor() {
        super(...arguments);
        this.handleRotate90 = (() => {
            var e = this.props.entity,
            t = Geometry.addRotation360(e.data.rotation, 90);
            this.props.onEntityPropertyChanged(this.props.entity, "data", "rotation", t, !1)
        })
    }
    shouldComponentUpdate(e) {
        return !1
    }
    render() {
        return React.createElement("parallelogram-settings", null, React.createElement("main", null, React.createElement("button", {
            className: "btn-normal",
            style: {
                marginTop: 3,
                marginLeft: 5,
                marginRight: 5,
                width: 90
            },
            onClick: this.handleRotate90
        },
        "Rotate 90"), ItemRemoveSelected.separator()))
    }
}
var f = new class extends ShapeBaseB {
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
                d: " M4,5.6 L16.1,5.6 L16.1,15.2 "
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 70,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getComponent() {
        return u
    }
    getType() {
        return "doc-right-angle"
    }
    getSettingsComponent() {
        return m
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(p(e))
        }
    }
    buildSnapPoints(e) {
        var t = e.data,
        n = t.p1,
        r = t.p2,
        a = n.y,
        i = r.y,
        o = n.x,
        s = r.x;
        return ShapeUtil.pointsTransformed(e.data, [{
            x: o,
            y: a
        },
        {
            x: s,
            y: a
        },
        {
            x: s,
            y: i
        },
        {
            x: o,
            y: i
        }])
    }
    getSnapablePoints(e) {
        return this.buildSnapPoints(e).concat(Geometry.getCenterPoint(e.data))
    }
    getBoundingRect(e) {
        var t = p(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
}

export { f as ShapeDocRightAngleB }

export default p