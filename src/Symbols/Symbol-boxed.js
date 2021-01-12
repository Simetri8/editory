import _ from 'lodash';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';

/// xxx(1115) /*Symbol-boxed*/

/// n.r(t)
/*n.d(t, "Boxed", function () {
    return h
}),*/
/*n.d(t, "BoxedSc", function () {
    return u
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 3 times
/// var o = n.n(i);
/// var s = n(21)/*EditArea*/;  // 1 times
/// var l = n(29)/*CompositeBlock*/;  // 1 times
/// var c = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var d = n(13)/*CreateEditorObject*/;  // 1 times
class h extends CompositeBlock {
    constructor(e) {
        super(e);
        this.containerClassName = "boxed"
    }
    renderComponent() {
        return React.createElement("div", {
            style: {
                borderStyle: "solid",
                borderWidth: 1,
                paddingLeft: "0.3em",
                paddingRight: "0.3em",
                paddingBottom: "0.1em",
                marginTop: "0.1em",
                marginBottom: "0.1em"
            }
        },
        React.createElement(EditArea, Object.assign({
            showBorder: !1,
            displayMode: !0
        },
        this.buildMetaDataFromName("value"))))
    }
}
class u extends CompositeScSymbolBase {
    constructor() {
        super()
    }
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\boxed"
    }
    getSymbol() {
        return "boxed"
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {
                value: {
                    onRemove: "all"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            height: 25,
            renderSymbol: () => React.createElement("div", {
                style: {
                    width: 10,
                    height: 10,
                    border: "1px solid black",
                    transform: "translateX(3px)"
                }
            })
        })
    }
    toModel(e, t, n) {
        var r = this.getModel();
        return r.elements.value = CreateEditorObject.createEditorWith(n),
        r
    }
    toLatex(e, t, n) {
        return t = _.assignIn({},
        t, {
            displayMode: !0
        }),
        "\\boxed{".concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
    toMathml(e, t) {
        return {
            type: "menclose",
            notation: "box",
            element: t.generateEditor(e.elements.value)
        }
    }
}
var SymbolBoxed = new u

export { h as Boxed }

export { u as BoxedSc }

export default SymbolBoxed