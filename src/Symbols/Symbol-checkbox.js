import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import StyleHelper from '../Mathcha/StyleHelper';
import TextHelper from '../Mathcha/TextHelper';

/// xxx(1372) /*Symbol-checkbox*/

/// n.r(t)
/*n.d(t, "Checkbox", function () {
    return f
}),*/
/*n.d(t, "CheckboxSc", function () {
    return g
});*/
/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(18)/*StyleHelper*/;  // 1 times
/// var c = n(16)/*ReactDOM*/;  // 1 times
/// var d = n.n(c);
/// var h = n(77)/*TextHelper*/;  // 1 times
/// var u = n(27)/*CompositeSymbolBase*/;  // 1 times
var p = {
    display: "inline-block",
    cursor: "pointer",
    border: "1px solid",
    width: "14px",
    height: "14px",
    borderRadius: 2,
    position: "relative",
    transform: "translateY(0.16em)"
},
m = {
    fontSize: "0.7em",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "70%",
    height: "100%"
};
class f extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "checkbox-symbol";
        this.handleCheckClick = (e => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                checked: !this.props.data.checked
            }), {
                preventScroll: !0,
                isOneLineChanged: !0
            })
        })
    }
    getDefaultBaseLine() {
        var e = ReactDOM.findDOMNode(this),
        t = this.getElementRect(e);
        return {
            top: t.top + t.height / 2,
            positionType: "middle"
        }
    }
    getCompositeBlockStyle() {
        return _.assignIn({},
        StyleHelper.getHtmlFromStyle(this.props.data, this.context.baseMathModeFontFamily), {
            lineHeight: "1.4em",
            paddingRight: "0.4em",
            overflow: "visible"
        })
    }
    renderComponent() {
        var e = TextHelper.fontSizePercentageFromCommand(this.props.data.style && this.props.data.style.fontSize),
        t = React.createElement("div", {
            "aria-hidden": !0,
            style: m
        },
        React.createElement("svg", {
            viewBox: "0 0 24 24",
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
        }))),
        n = Math.round(.95 * (this.getTextFontSizePixel(e) || 17)),
        r = this.props.data.checked ? t : "";
        return React.createElement("div", {
            role: "checkbox",
            "aria-checked": !!this.props.data.checked,
            className: "regular-checkbox",
            style: _.assignIn({},
            p, {
                width: n,
                height: n,
                zIndex: 600
            }),
            onMouseDown: this.handleCheckClick
        },
        r)
    }
}
class g extends CompositeSymbolBase {
    getViewComponent() {
        return f
    }
    getLatextName() {
        return "\\checkbox"
    }
    getSymbol() {
        return "checkbox"
    }
    getModel() {
        return this.getModelFromStructure({},
        this.getLatextName())
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            insertInTextModeOnly: !0,
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
    toModel() {
        return this.getModel()
    }
    toLatex(e) {
        return e.checked ? "\\makebox[0pt][l]{$\\square$}\\raisebox{.15ex}{\\hspace{0.1em}$\\checkmark$}" : "\\makebox[0pt][l]{$\\square$}\\raisebox{.15ex}{\\hspace{1em}}"
    }
}
var SymbolCheckbox = new g

export { f as Checkbox }

export { g as CheckboxSc }

export default SymbolCheckbox