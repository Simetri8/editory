import React from 'react';
import CloseSymbolBlock from '../Elements/CloseSymbolBlock';
import EmptyRightIcon from '../Elements/EmptyRightIcon';
import SymbolBracketBase from '../Elements/SymbolBracketBase';

/// xxx(1085) /*Symbol-right-dot*/

/// n.r(t)
/*n.d(t, "EmptyRight", function () {
    return l
}),*/
/*n.d(t, "EmptyRightSc", function () {
    return c
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(72)/*CloseSymbolBlock*/;  // 1 times
/// var o = n(336)/*EmptyRightIcon*/;  // 1 times
/// var s = n(39)/*SymbolBracketBase*/;  // 1 times
class l extends CloseSymbolBlock {
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
class c extends SymbolBracketBase {
    getSymbol() {
        return ""
    }
    getViewComponent() {
        return l
    }
    getLatextName() {
        return "\\right."
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            description: "Right empty bracket!",
            renderSymbol: () => React.createElement(EmptyRightIcon, null)
        })
    }
}
var SymbolRightDot = new c

export { l as EmptyRight }

export { c as EmptyRightSc }

export default SymbolRightDot