import _ from 'lodash';
import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import Geometry from '../Geometry/Geometry';
import ItemRemoveSelected from '../Elements/ItemRemoveSelected';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(356) /*Shape-parallelogram*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return m
}),*/
/*n.d(t, "b", function () {
    return y
});*/
/// var r = n(0)/*React*/,  // 7 times
/// a = n.n(r)
/// i = n(2)/*lodash*/,  // 1 times
/// o = n.n(i)
/// s = n(9)/*ShapeBase*/,  // 1 times
/// l = n(1)/*Geometry*/,  // 4 times
/// c = n(10)/*ShapeHelper*/,  // 1 times
/// d = n(33)/*ItemRemoveSelected*/,  // 1 times
/// h = n(8)/*ShapeUtil*/,  // 5 times
/// u = n(25)/*ColorHelper*/;  // 1 times
class p extends ShapeBase {
    render() {
        var e = m(this.shape()),
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
function m(e) {
    var t = f(e),
    n = t.leftTop,
    r = t.topRight,
    a = t.rightBottom,
    i = t.bottomLeft;
    return ShapeUtil.genericLinesTransformed(e.data, [{
        p1: n,
        p2: r
    },
    {
        p1: r,
        p2: a
    },
    {
        p1: a,
        p2: i
    },
    {
        p1: i,
        p2: n
    }])
}
function f(e) {
    var t, n, r, a, i = e.data,
    o = i.p1,
    s = i.p2,
    c = i.percentage,
    d = void 0 === c ? 30 : c,
    h = i.right,
    u = void 0 !== h && h,
    p = Geometry.rectWidth(e.data);
    return u ? (t = {
        x: o.x,
        y: o.y
    },
    n = {
        x: s.x - d / 100 * p,
        y: o.y
    },
    r = {
        x: s.x,
        y: s.y
    },
    a = {
        x: o.x + d / 100 * p,
        y: s.y
    }) : (t = {
        x: o.x + d / 100 * p,
        y: o.y
    },
    n = {
        x: s.x,
        y: o.y
    },
    r = {
        x: s.x - d / 100 * p,
        y: s.y
    },
    a = {
        x: o.x,
        y: s.y
    }),
    {
        leftTop: t,
        topRight: n,
        rightBottom: r,
        bottomLeft: a
    }
}
class g extends ShapeBaseC {
    constructor() {
        super(...arguments);
        this.handleFlip = (() => {
            this.props.onEntityPropertyChanged(this.props.entity, "data", "right", !this.props.entity.data.right, !1)
        })
    }
    shouldComponentUpdate(e) {
        var t = e.entity,
        n = this.props.entity;
        return t.data.percentage != n.data.percentage
    }
    render() {
        return React.createElement("parallelogram-settings", null, React.createElement("main", null, React.createElement("button", {
            className: "btn-normal",
            style: {
                marginTop: 3,
                marginLeft: 5,
                marginRight: 5,
                width: 60
            },
            onClick: this.handleFlip
        },
        "Flip"), ItemRemoveSelected.separator()))
    }
}
var y = new class extends ShapeBaseB {
    getComponent() {
        return p
    }
    getIcon() {
        var e = ColorHelper.getIconSvgStyle();
        return {
            component: React.createElement("svg", {
                key: this.getType(),
                style: e
            },
            React.createElement("path", {
                d: " M7.41,5.5 L17.13,5.5 L12.96,14.5 L3.25,14.5 Z",
                style: {
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                }
            }))
        }
    }
    getType() {
        return "parallelogram"
    }
    getSettingsComponent() {
        return g
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: m(e)
        }
    }
    getSnapablePoints(e) {
        var t = f(e),
        n = t.leftTop,
        r = t.topRight,
        a = t.rightBottom,
        i = t.bottomLeft;
        return ShapeUtil.pointsTransformed(e.data, [n, r, a, i]).concat(Geometry.getCenterPoint(e.data))
    }
    getControlPoints(e, t) {
        var n = super.getControlPoints(e, t),
        r = e.data,
        a = r.p1,
        i = r.p2,
        o = r.percentage,
        s = void 0 === o ? 30 : o,
        c = r.right,
        d = void 0 !== c && c,
        u = Geometry.rectWidth(e.data),
        p = ShapeUtil.pointTransformed(e.data, {
            x: a.x + u * (s / 100),
            y: a.y
        });
        return d && (p = ShapeUtil.pointTransformed(e.data, {
            x: i.x - u * (s / 100),
            y: a.y
        })),
        n.concat([{
            key: "md1",
            type: "square",
            p: p
        }])
    }
    moveControlPoint(e) {
        if ("md1" != e.key) return super.moveControlPoint(e);
        var t = e.shape.data,
        n = t.p1,
        r = t.p2,
        a = ShapeUtil.reversePointFixedY(e.shape.data, n.y, e.point),
        i = e.shape.data.right,
        s = void 0 !== i && i;
        if ("md1" == e.key) {
            var l = _.clamp(a.x, n.x, r.x),
            c = (l - n.x) / (r.x - n.x) * 100;
            return s && (c = (r.x - l) / (r.x - n.x) * 100),
            this.changeShapeData(e.shape, "percentage", c)
        }
    }
    getBoundingRect(e) {
        return Geometry.genericLinesBbox(m(e))
    }
}

export { y as ShapeParallelogramB }

export default m