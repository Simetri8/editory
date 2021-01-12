import React from 'react';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import SymbolArrowBase from '../Elements/SymbolArrowBase';
import SymbolWrapper from './SymbolWrapper';

/// xxx(347) /*Symbol-unknow*/

/*n.d(t, "a", function () {
    return c
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(241)/*SymbolArrowBase*/;  // 1 times
/// var s = n(348)/*SymbolWrapper*/;  // 1 times
/// var l = n(13)/*CreateEditorObject*/;  // 3 times
class c extends CompositeSymbolBase {
    constructor() {
        super(...arguments);
        this.category = "Relation";
        this.isArrowLike = !0
    }
    getViewComponent() {
        return SymbolArrowBase
    }
    getLatextName() {
        return "\\unknow"
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            keyInsertOnSelection: "top",
            elements: {
                top: {
                    defaultHide: !0,
                    onRemove: "only"
                },
                bottom: {
                    defaultHide: !0,
                    onRemove: "only"
                }
            }
        }
    }
    toModel(e, t, n) {
        var r = CreateEditorObject.createComposite(this.getLatextName());
        return t && t.length > 0 && (r.elements.bottom = CreateEditorObject.createEditorWith(t)),
        n && n.length > 0 && (r.elements.top = CreateEditorObject.createEditorWith(n)),
        r
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            height: 35,
            hasExpanded: !0,
            renderSymbol() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return React.createElement(SymbolWrapper, {
                    symbol: this.symbol,
                    isExpanded: e
                })
            }
        })
    }
    toLatex(e, t, n) {
        if (this.isNotExistOrEmptyEditor(e.elements.top) && this.isNotExistOrEmptyEditor(e.elements.bottom)) return this.getLatextName() + " ";
        var r = "",
        a = "\\x" + this.getLatextName().substr(1);
        this.isNotExistOrEmptyEditor(e.elements.bottom) || (r = "[".concat(n.toLatexFromEditor(e.elements.bottom, t), "]"));
        var i = "{}";
        return this.isNotExistOrEmptyEditor(e.elements.top) || (i = "{".concat(n.toLatexFromEditor(e.elements.top, t), "}")),
        "".concat(a).concat(r).concat(i)
    }
    toMathml(e, t) {
        return e.elements.top || e.elements.bottom ? {
            type: "munderover",
            base: {
                type: "mo",
                value: this.getSymbol()
            },
            overscript: t.generateEditor(e.elements.top),
            underscript: t.generateEditor(e.elements.bottom)
        } : {
            type: "mo",
            value: this.getSymbol()
        }
    }
}

export default c