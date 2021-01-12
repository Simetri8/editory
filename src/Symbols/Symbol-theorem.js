import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import EditArea from '../Editor/EditArea';
import LatexConverterBase from '../Latex/LatexConverterBase';
import TheoremHelper from '../Mathcha/TheoremHelper';

/// xxx(1369) /*Symbol-theorem*/

/// n.r(t)
/*n.d(t, "Theorem", function () {
    return g
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var c = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var d = n(177)/*LatexConverterBase*/;  // 1 times
/// var h = n(29)/*CompositeBlock*/;  // 2 times
/// var u = n(21)/*EditArea*/;  // 1 times
/// var p = n(122)/*TheoremHelper*/;  // 2 times
/// var m = n(23)/*PropTypesExporter*/;  // 2 times
/// var f = n.n(m);
class g extends CompositeBlock {
    constructor(e) {
        super(e);
        this.handleTheoremMouseDown = (e => {
            this.props.onSelectedChanged({
                key: "theorem",
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            });
            e.stopPropagation();
            e.preventDefault()
        });
        this.containerClassName = "theorem";
        this.showSelectedAnyLevel = !0
    }
    getDefaultBaseLine(e) {
        var t = ReactDOM.findDOMNode(this);
        return "line-start" == e ? {
            top: this.getElementRect(t.firstElementChild).bottom,
            positionType: "bottom"
        } : {
            top: this.getElementRect(t.lastElementChild).bottom,
            positionType: "bottom"
        }
    }
    componentDidMount() {
        super.componentDidMount();
        this.context.notifyTheoremNumbering()
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.context.notifyTheoremNumbering()
    }
    renderComponent() {
        var e = this.context.getTheoremInfo(),
        t = TheoremHelper.getTheorem(this.props.data.theoremKey, e);
        return [React.createElement("theorem-name", {
            key: "theorem-name",
            onMouseDown: this.handleTheoremMouseDown
        },
        t.name), React.createElement("theorem-counting", {
            key: "couting",
            onMouseDown: this.handleTheoremMouseDown
        },
        "1"), React.createElement(EditArea, Object.assign({
            key: "content",
            className: "edit-theorem-content"
        },
        this.buildMetaDataFromName("theorem"), {
            showBorder: !1,
            isTextMode: !0
        }))]
    }
}
g.contextTypes = _.assignIn({
    getTheoremInfo: PropTypes.any,
    notifyTheoremNumbering: PropTypes.any
},
CompositeBlock.contextTypes);
var SymbolTheorem = new class extends CompositeSymbolBase {
    toModel() {
        throw new Error("Method not implemented.")
    }
    getModel(e) {
        var t = super.getModel(e);
        return e ? (t.theoremKey = e.theorem.key, t):
        t
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {
                theorem: {
                    onRemove: "all"
                }
            }
        }
    }
    getViewComponent() {
        return g
    }
    getLatextName() {
        return "\\theorem"
    }
    getSymbol() {
        return "theorem"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement("theorem-symbol", null, "Theorem")
        })
    }
    toLatex(e, t, n) {
        if ("latex-latex" == t.textType) {
            var r = TheoremHelper.getTheorem(e.theoremKey, t.theoremInfo);
            t.convertedInfo.addRequiredTheorem(r.key, t.theoremInfo);
            var a = n.toLatexFromEditor(e.elements.theorem, t);
            return LatexConverterBase.surroundByLine(a, "\\begin{".concat(r.env, "}"), "\\end{".concat(r.env, "}"))
        }
        return "bbcode" == t.textType ? "[b]".concat(e.___theoremName, "[/b]  [i]").concat(n.toLatexFromEditor(e.elements.theorem, t), "[/i]") : e.___theoremName + " " + n.toLatexFromEditor(e.elements.theorem, t)
    }
}

export { g as Theorem }

export default SymbolTheorem