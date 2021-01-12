import jQuery from 'jquery';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import ScrollTo from '../Mathcha/ScrollTo';
import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(1368) /*Symbol-tag-ref*/

/// n.r(t)
/*n.d(t, "TagRef", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
/// var i = n(5)/*sizzle*/;  // 4 times
/// var o = n.n(i);
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(29)/*CompositeBlock*/;  // 1 times
/// var c = n(107)/*ScrollTo*/;  // 2 times
/// var d = n(18)/*StyleHelper*/;  // 1 times
class h extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.handleMouseDown = (e => {
            e.stopPropagation();
            e.preventDefault();
            var t = jQuery("#".concat(this.props.data.refTagId.replace(".", "\\.")));
            if (0 != t.length) {
                var n = t.get(0),
                r = ScrollTo.getScrollSelectorFromContext(this.context);
                ScrollTo.scrollToElement(r, t, {
                    duration: 500,
                    callback: () => {
                        jQuery(n).css("background", "lightgreen");
                        setTimeout(() => {
                            jQuery(n).css("background", "")
                        },
                        500)
                    }
                })
            }
        })
    }
    componentDidMount() {
        this.context.notifyLineTagRender()
    }
    renderComponent() {
        var e = StyleHelper.getHtmlFromStyle(this.props.data, this.context.baseMathModeFontFamily);
        return React.createElement("tag-ref-name", {
            style: {
                color: e.color || "green",
                cursor: "pointer"
            },
            "data-color": e.color || "green",
            onMouseDown: this.handleMouseDown,
            class: "tag-ref-name",
            "ref-tag-id": this.props.data.refTagId
        },
        "(?)")
    }
}
var SymbolTagRef = new class extends CompositeSymbolBase {
    toModel() {
        throw new Error("Method not implemented.")
    }
    getModel(e) {
        e = e || {
            names:
            []
        };
        var t = super.getModel(e);
        return t.refTagId = e.tagId,
        t
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {}
        }
    }
    getViewComponent() {
        return h
    }
    getLatextName() {
        return "\\tag-ref"
    }
    getSymbol() {
        return "ref"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol: () => React.createElement("tag-ref-name", {
                class: "tag-ref-name"
            },
            "(1)")
        })
    }
    toLatex(e) {
        var t = e.refTagId;
        return t ? jQuery("#".concat(t.replace(".", "\\."))).text() : "(?)"
    }
}

export { h as TagRef }

export default SymbolTagRef