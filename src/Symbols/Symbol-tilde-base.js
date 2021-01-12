import React from 'react';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import IconOver from '../Elements/Icon-Over';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(78) /*Symbol-tilde-base*/

/*n.d(t, "a", function () {
    return c
}),*/
/*n.d(t, "b", function () {
    return d
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(125)/*Symbol-hat-base*/;  // 1 times
/// var s = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var l = n(111)/*Icon-Over*/;  // 1 times
class c extends SymbolHatBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "over-symbol";
        this.shouldAdjustSymbolWithCharacterSign = !1
    }
    getSymbol() {
        return "*"
    }
    getPowerIndexInfo() {
        return {
            rect: this.getElementRect(this.refMap.value.editor),
            shouldConsiderAsChar: this.isSingleTextBlockFirstLine(this.props.data.elements.value)
        }
    }
    getInnerSymbolClass() {
        return this.shouldAdjustSymbolWithCharacterSign ? this.isSingleTextBlockLeftUpperSign(this.props.data.elements.value) ? "left-sign" : this.isSingleTextBlockRightUpperSign(this.props.data.elements.value) ? "right-sign" : "" : ""
    }
    getSymbolHeight() {
        return this.getRoundEmStr(.4)
    }
    getMarginBottom() {
        return this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.4) : this.getRoundEmStr(-.2)
    }
    getSymbolClassName() {
        return null
    }
    renderComponent() {
        var e = {
            height: this.getSymbolHeight(),
            marginBottom: this.getMarginBottom()
        },
        t = this.getSymbolClassName ? this.getSymbolClassName() : null;
        return [React.createElement("x-symbol", {
            key: "symbol",
            style: e,
            class: t,
            ref: e => this.symbol = e
        },
        React.createElement("x-inner", {
            class: this.getInnerSymbolClass()
        },
        this.getSymbol())), React.createElement(EditArea, Object.assign({
            key: "value",
            className: "center",
            style: {
                display: "inline-flex",
                width: "100%"
            },
            borderIfEmpty: !0,
            optimizeForOneLine: !0
        },
        this.buildMetaDataFromName("value")))]
    }
}
class d extends CompositeScSymbolBase {
    constructor() {
        super();
        this.isOverSymbol = !0
    }
    getLatextName() {
        return "\\tilde"
    }
    getSymbol() {
        return "~"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    symbol: this.symbol
                })
            }
        })
    }
    toMathml(e, t) {
        return {
            type: "mover",
            base: t.generateEditor(e.elements.value),
            accent: !0,
            overscript: {
                type: "mo",
                value: this.getSymbol()
            }
        }
    }
}

export { d as SymbolTildeBaseB }

export default c