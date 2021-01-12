import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditArea from '../Editor/EditArea';
import FontList from '../Font/FontList';
import LatexConverterBase from '../Latex/LatexConverterBase';
import LineTagSetting from '../Elements/LineTagSetting';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TextHelper from '../Mathcha/TextHelper';

/// xxx(1516) /*Symbol-multline*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 8 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 3 times
/// var l = n.n(s);
/// var c = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var d = n(6)/*DiagramIdHelper*/;  // 2 times
/// var h = n(177)/*LatexConverterBase*/;  // 1 times
/// var u = n(21)/*EditArea*/;  // 1 times
/// var p = n(7)/*PropUpdateHelper*/;  // 1 times
/// var m = n(239)/*LineTagSetting*/;  // 1 times
class f extends React.Component {
    render() {
        return React.createElement("div", {
            style: E
        },
        React.createElement("div", {
            style: A
        }), React.createElement("div", {
            style: y
        }), React.createElement("div", {
            style: g
        }))
    }
}
var g = {
    marginLeft: 9,
    border: "1px solid gray",
    width: 20
},
y = {
    height: 2
},
A = {
    border: "1px solid gray",
    width: 20
},
E = {
    display: "flex",
    flexDirection: "column",
    width: 32,
    border: "1px solid gray",
    padding: "2px 2px"
}
/// v = n(29)/*CompositeBlock*/,  // 1 times
/// S = n(77)/*TextHelper*/,  // 1 times
/// C = n(14)/*classnames*/,  // 1 times
/// x = n.n(C)
/// I = n(48)/*FontList*/;  // 1 times
class T extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.onTagInfoChanged = ((e, t) => {
            var n = PropUpdateHelper.setProp(this.props.data, "tagInfo", e);
            this.props.onDataChanged(n, t)
        })
    }
    componentDidMount() {
        super.componentDidMount();
        this.props.data.tagInfo && this.context.notifyLineTagRender()
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.props.data.tagInfo && this.context.notifyLineTagRender()
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        e.data.tagInfo != this.props.data.tagInfo && this.context.notifyLineTagRender()
    }
    getCompositeBlockStyle() {
        var e = super.getCompositeBlockStyle(),
        t = this.props.data,
        n = t.style && t.style.fontSize ? TextHelper.fontSizePercentageFromCommand(t.style.fontSize) : 1;
        return _.assignIn({},
        e, {
            fontSize: this.context.mathFontSizeBase * n,
            display: "flex",
            alignItems: "flex-end",
            background: "transparent"
        })
    }
    useCustomBaseLine() {
        return !1
    }
    isInlineMode() {
        return !1
    }
    getClassName() {
        return classNames("math-container-symbol", "display", "composite-multiline", "role-mathmode-area", "role-multiline-block")
    }
    renderTag() {
        if (this.props.selected || this.props.data.tagInfo && this.props.data.tagInfo.type) return React.createElement(LineTagSetting, {
            key: "tag",
            emptyStyle: {
                marginRight: -28,
                top: "unset",
                transform: "none",
                bottom: 0
            },
            existStyle: {
                display: "block",
                position: "relative",
                transform: "none",
                paddingLeft: 10,
                top: "unset",
                right: "unset",
                marginBottom: 1
            },
            onTagInfoChanged: this.onTagInfoChanged,
            tagInfo: this.props.data.tagInfo
        })
    }
    getSelectedBg() {
        return this.context.fixedContextHandler.getSelectedMathBg()
    }
    renderComponent() {
        return [React.createElement(EditArea, Object.assign({
            key: "edit-area",
            className: "math-mode-font multiline",
            displayMode: !0
        },
        this.buildMetaDataFromName("mathValue"), {
            showBorder: !1,
            noAreaContainer: !0,
            isFirstMathModeLevel: !0,
            style: {
                background: this.props.selected ? this.getSelectedBg() : void 0,
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.context.baseMathModeFontFamily)
            }
        })), this.renderTag()]
    }
}
var SymbolMultline = new class extends CompositeSymbolBase {
    getViewComponent() {
        return T
    }
    getModel() {
        return this.getModelFromStructure({
            mathValue:
            "editor"
        },
        "\\multiline")
    }
    getModelMeta() {
        return {
            text: "\\multiline",
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
            text: "\\multiline",
            elements: {
                mathValue: {
                    id: DiagramIdHelper.nextId(),
                    lines: t
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\multiline"],
            height: 25,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement(f, null)
        })
    }
    toLatex(e, t, n) {
        t = _.assign({},
        t, {
            inMathExpression: !0
        });
        var r = n.toLatexFromEditor(e.elements.mathValue, t, {
            ignoreWrapMultiline: !0
        });
        return LatexConverterBase.surroundByLine(r, "\\begin{multline*}", "\\end{multline*}")
    }
    toMathml(e, t) {
        var n = t.generateEditor(e.elements.mathValue, {
            forceTable: !0
        });
        if ("mtable" == n.type && n.mcEditorGroup) {
            n.columnalign = void 0;
            for (var r = 1; r < n.rows.length - 1; r++) n.rows[r].cells[0].columnalign = "center";
            _.last(n.rows).cells[0].columnalign = "right";
            _.first(n.rows).cells[0].columnalign = "left"
        }
        return {
            type: "math",
            display: "block",
            elements: [n]
        }
    }
}

export default SymbolMultline