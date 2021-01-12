import React from 'react';
import { Cancel, CancelSc } from './Symbol-cancel';
import { DOMHelperB } from '../Elements/DOMHelper';

/// xxx(1528) /*Symbol-xcancel*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 9 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 2 times
/// var o = n(225)/*Symbol-cancel*/;  // 2 times
class s extends React.Component {
    render() {
        return React.createElement("div", {
            className: "icon-xcancel"
        },
        React.createElement("svg", {
            style: {
                height: 20,
                width: 15,
                stroke: "gray"
            }
        },
        React.createElement("polyline", {
            points: "3,13 13,3",
            strokeWidth: 1,
            fill: "none"
        }), React.createElement("polyline", {
            points: "3,3 13,13",
            strokeWidth: 1,
            fill: "none"
        })), React.createElement("div", {
            style: {
                marginTop: -19,
                marginLeft: 6.5
            },
            className: "common-big-square-icon square"
        }))
    }
}
class l extends Cancel {
    renderSvg(e, t, n) {
        var r = this.getDy(n),
        o = "".concat(0, ",").concat(0 + r, " ").concat(e - 0, ",").concat(t - r),
        s = "".concat(e - 0, ",").concat(0 + r, " ").concat(0, ",").concat(t - r);
        return [React.createElement("polyline", {
            key: 1,
            points: o,
            strokeWidth: Object(DOMHelperB)(n),
            fill: "none"
        }), React.createElement("polyline", {
            key: 2,
            points: s,
            strokeWidth: Object(DOMHelperB)(n),
            fill: "none"
        })]
    }
}
var SymbolXcancel = new class extends CancelSc {
    constructor() {
        super()
    }
    getViewComponent() {
        return l
    }
    getLatextName() {
        return "\\xcancel"
    }
    getSymbol() {
        return "xcancel"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            height: 25,
            renderSymbol: () => React.createElement(s, null)
        })
    }
    toMathml(e, t) {
        return {
            type: "menclose",
            notation: "downdiagonalstrike updiagonalstrike",
            element: t.generateEditor(e.elements.value)
        }
    }
}

export default SymbolXcancel