import _ from 'lodash';
import React from 'react';
import ShapeBaseC from './ShapeBaseC';
import ShapeRectangle, { ShapeRectangleC } from './Shape-rectangle';

/// xxx(1535) /*Shape-not-found*/

/*n.d(t, "a", function () {
    return ShapeNotFound
});*/
function dn(e) {
    var t = function (e) {
        if (!e) return e = {
            p1: {
                x: 10,
                y: 10
            },
            p2: {
                x: 20,
                y: 20
            }
        };
        if (!e.p1 && !e.p2) return e.p1 = {
            x: 10,
            y: 10
        },
        e.p2 = {
            x: 20,
            y: 20
        },
        e;
        if (!e.p1) {
            var t = e.p2;
            return e.p1 = {
                x: t.x - 10,
                y: t.y - 10
            },
            e
        }
        if (!e.p2) {
            var n = e.p1;
            return e.p2 = {
                x: n.x + 10,
                y: n.y + 10
            },
            e
        }
        return e
    } (e.data);
    if (t != e.data) e.data = t;
    return e
}
/// var f = n(3);  // 1 times
/// var g = n.n(f);
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/// var h = n(127)/*Shape-rectangle*/;  // 2 times
/// var S = n(0)/*React*/;  // 4 times
/// var C = n.n(S);
class ln extends ShapeRectangleC {
    render() {
        dn(this.props.shape);
        var e = this.shape().data.p1;
        var t = this.getWidth();
        var n = this.getHeight();
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("rect", {
            className: "transparent no-print",
            rx: 0,
            ry: 0,
            style: this.transparentStyleWithRotation(),
            x: e.x,
            y: e.y,
            width: t,
            height: n
        }), React.createElement("rect", {
            className: "real",
            rx: 0,
            ry: 0,
            x: e.x,
            y: e.y,
            width: t,
            style: _.assignIn({},
            this.styleWithRotation(), {
                stroke: "red"
            }),
            height: n
        }), React.createElement("text", {
            x: e.x + t / 2,
            y: e.y + n / 2 + 10,
            textAnchor: "middle",
            fill: "red",
            stroke: "red"
        },
        "?"))
    }
}
class cn extends ShapeBaseC {}
var ShapeNotFound = new class extends ShapeRectangle {
    getComponent() {
        return ln
    }
    getType() {
        return "not-found"
    }
    getSettingsComponent() {
        return cn
    }
    scale(e, t, n, r) {
        return e = dn(e),
        super.scale(e, t, n, r)
    }
    getBoundingRect(e) {
        return e = dn(e),
        super.getBoundingRect(e)
    }
    getRectangleBreakdownInfoData(e) {
        return e = dn(e),
        super.getRectangleBreakdownInfoData(e)
    }
    minMaxVertical(e) {
        return e = dn(e),
        super.minMaxVertical(e)
    }
}

export default ShapeNotFound