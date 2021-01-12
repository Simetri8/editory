import React from 'react';
import { EmptyRightIconB } from '../Elements/EmptyRightIcon';
import OpenSymbolBlock from '../Elements/OpenSymbolBlock';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1521) /*Symbol-left-dot*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 6 times
/// var a = n.n(r);
/// var i = n(71)/*OpenSymbolBlock*/;  // 1 times
/// var o = n(39)/*SymbolBracketBase*/;  // 1 times
/// var s = n(336)/*EmptyRightIcon*/;  // 1 times
class l extends React.Component {
    render() {
        return React.createElement("div", {
            className: "empty-left-icon"
        },
        React.createElement("div", {
            style: EmptyRightIconB
        }))
    }
}
/*n.d(t, "EmptyLeft", function () {
    return c
}),*/
/*n.d(t, "EmptyLeftSc", function () {
    return d
});*/
class c extends OpenSymbolBlock {
    constructor() {
        super(...arguments);
        this.bracketType = "empty";
        this.bracketText = "|"
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.lineSelected != this.props.lineSelected
    }
    getSelectedClssName() {
        return this.props.lineSelected ? "line-selected" : ""
    }
    renderNormal() {
        return React.createElement("x-empty", {
            class: "normal-size " + this.getSelectedClssName()
        })
    }
    renderComposed() {
        return React.createElement("x-empty", {
            class: this.getSelectedClssName()
        })
    }
}
class d extends SymbolBracketBase {
    getSymbol() {
        return ""
    }
    getViewComponent() {
        return c
    }
    getLatextName() {
        return "\\left."
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            description: "Left empty bracket!",
            renderSymbol: () => React.createElement(l, null)
        })
    }
}
var SymbolLeftDot = new d

export { c as EmptyLeft }

export { d as EmptyLeftSc }

export default SymbolLeftDot