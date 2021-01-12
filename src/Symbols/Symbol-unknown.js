import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import EditAreaBlock from '../Elements/EditAreaBlock';
import IconOver from '../Elements/Icon-Over';
import SymbolHatBase from './Symbol-hat-base';

/// xxx(253) /*Symbol-unknown*/

/*n.d(t, "a", function () {
    return h
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(21)/*EditArea*/;  // 1 times
/// var o = n(163)/*EditAreaBlock*/;  // 1 times
/// var s = n(125)/*Symbol-hat-base*/;  // 1 times
/// var l = n(12)/*BlockHelper*/;  // 1 times
/// var c = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var d = n(111)/*Icon-Over*/;  // 1 times
class h extends SymbolHatBase {
    constructor() {
        super(...arguments);
        this.containerClassName = "over-arrow-symbol"
    }
    getSymbol() {
        return "unknown"
    }
    getArrowStyle() {
        return {
            height: this.getRoundEmStr(.5),
            marginBottom: this.isSingleTextBlockAndUperSmall(this.props.data.elements.value) ? this.getRoundEmStr(-.45) : this.getRoundEmStr(-.15)
        }
    }
    renderEditArea() {
        return BlockHelper.isEmptyOrOneTextEditor(this.props.data.elements.value) ? React.createElement(EditAreaBlock, Object.assign({
            key: "value"
        },
        this.buildLightMetadata("value"))) : React.createElement(EditArea, Object.assign({
            key: "value"
        },
        this.buildMetaDataFromName("value"), {
            borderIfEmpty: this.isSelected(),
            optimizeForOneLine: !0
        }))
    }
    renderComponent() {
        return [this.renderArrow(), this.renderEditArea()]
    }
}
class u extends CompositeScSymbolBase {
    getLatextName() {
        return "\\unknown"
    }
    getModel() {
        return this.getModelFromStructure({
            value: "editor"
        },
        this.getLatextName())
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol() {
                return React.createElement(IconOver, {
                    symbol: this.symbol,
                    height: 10
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

export { u as SymbolUnknownB }

export default h