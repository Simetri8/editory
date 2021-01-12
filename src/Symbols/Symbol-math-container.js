import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditArea from '../Editor/EditArea';
import FontList from '../Font/FontList';
import LatexConverterBase from '../Latex/LatexConverterBase';
import TextHelper from '../Mathcha/TextHelper';

/// xxx(1515) /*Symbol-math-container*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 9 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 1 times
/// var l = n.n(s);
/// var c = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var d = n(177)/*LatexConverterBase*/;  // 1 times
/// var h = n(6)/*DiagramIdHelper*/;  // 2 times
/// var u = n(14)/*classnames*/;  // 1 times
/// var p = n.n(u);
/// var m = n(21)/*EditArea*/;  // 1 times
/// var f = n(29)/*CompositeBlock*/;  // 1 times
/// var g = n(77)/*TextHelper*/;  // 1 times
/// var y = n(48)/*FontList*/;  // 1 times
class A extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.showSelectedAnyLevel = !0
    }
    useCustomBaseLine() {
        return !1
    }
    getClassName() {
        return classNames("math-container-symbol role-mathmode-area", {
            display: !!this.props.data.displayMode
        })
    }
    getCompositeBlockStyle() {
        var e = super.getCompositeBlockStyle(),
        t = this.props.data,
        n = t.style && t.style.fontSize ? TextHelper.fontSizePercentageFromCommand(t.style.fontSize) : 1;
        return _.assignIn({},
        e, {
            fontSize: this.context.mathFontSizeBase * n
        })
    }
    renderComponent() {
        var e = this.props.data,
        t = e.style && "\\displaystyle" == e.style.mathModeType;
        return [React.createElement(EditArea, Object.assign({
            key: "1",
            allowTag: e.displayMode && !1 !== this.props.allowTag,
            className: "math-mode-font",
            noAreaContainer: e.displayMode,
            displayMode: e.displayMode || t,
            isFirstMathModeLevel: !0
        },
        this.buildMetaDataFromName("mathValue"), {
            showBorder: !1,
            optimizeForOneLine: !0,
            style: {
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.context.baseMathModeFontFamily)
            }
        }))]
    }
}
/*n.d(t, "MathContainerSc", function () {
    return E
});*/
class E extends CompositeSymbolBase {
    getViewComponent() {
        return A
    }
    getModel(e) {
        var t = super.getModel(e);
        return t.displayMode = e && e.displayMode,
        t
    }
    getModelMeta() {
        return {
            text: "\\math-container",
            keyInsertOnSelection: "mathValue",
            elements: {
                mathValue: {
                    onRemove: "all"
                }
            }
        }
    }
    toModel(e, t) {
        return {
            id: DiagramIdHelper.nextId(),
            type: "composite",
            text: "\\math-container",
            displayMode: e,
            elements: {
                mathValue: {
                    id: DiagramIdHelper.nextId(),
                    lines: t
                }
            }
        }
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: ["\\inline-math"],
            height: 25,
            shortcut: {
                char: "$"
            },
            displayMode: !1,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement("div", {
                className: "icon-math-container-symbol"
            },
            React.createElement("mcs-border", {
                style: {
                    borderBottom: "2px solid gray",
                    marginBottom: "3px",
                    display: "inline-block",
                    width: "5px"
                }
            }), React.createElement("mcs-fx", {
                style: {
                    color: "gray",
                    paddingLeft: 2,
                    paddingRight: 2
                }
            },
            "fx"), React.createElement("mcs-border", {
                style: {
                    borderBottom: "2px solid gray",
                    marginBottom: "3px",
                    display: "inline-block",
                    width: "5px"
                }
            }))
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\math-container"],
            height: 40,
            displayMode: !0,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement("div", {
                className: "icon-display-math-container-symbol",
                style: {
                    minWidth: 28
                }
            },
            React.createElement("mcs-border", {
                style: {
                    borderBottom: "2px solid gray",
                    marginBottom: "1px",
                    display: "block",
                    width: "auto",
                    marginLeft: 4,
                    marginRight: 4
                }
            }), React.createElement("mcs-fx", {
                style: {
                    color: "gray",
                    paddingLeft: 2,
                    paddingRight: 2
                }
            },
            "fx"), React.createElement("mcs-border", {
                style: {
                    borderBottom: "2px solid gray",
                    marginBottom: "1px",
                    display: "block",
                    width: "auto",
                    marginLeft: 4,
                    marginRight: 4
                }
            }))
        })]
    }
    toLatex(e, t, n, r) {
        var i = (t = _.assign({},
        t, {
            inMathExpression: !0
        })).inTable ? "\\vspace{-1em}" : "";
        if (e.displayMode) {
            var o = "equation*";
            e.elements.mathValue && e.elements.mathValue.lines.length > 1 && (o = "gather*");
            var s = n.toLatexFromEditor(e.elements.mathValue, t, {
                ignoreWrapMultiline: !0
            });
            return LatexConverterBase.surroundByLine(s, "".concat("", "\\begin{").concat(o, "}"), "".concat(i, "\\end{").concat(o, "}"))
        }
        var c = e.style && "\\displaystyle" == e.style.mathModeType ? "\\displaystyle " : "";
        t = _.assignIn({},
        t, {
            displayMode: e.style && "\\displaystyle" == e.style.mathModeType
        });
        var h = n.toLatexFromEditor(e.elements.mathValue, t);
        return h ? "$".concat(c).concat(h, "$") : "$ $"
    }
    toMathml(e, t) {
        var n = t.generateEditor(e.elements.mathValue);
        return "mtable" == n.type && n.mcEditorGroup && (n.columnalign = e.displayMode ? "center" : "left", n.width = "100%"),
        e.style && "\\displaystyle" == e.style.mathModeType && (n = {
            type: "mstyle",
            displaystyle: !0,
            element: n
        }),
        {
            type: "math",
            display: e.displayMode ? "block" : void 0,
            elements: [n]
        }
    }
}
var SymbolMathContainer = new E

export { E as MathContainerSc }

export default SymbolMathContainer