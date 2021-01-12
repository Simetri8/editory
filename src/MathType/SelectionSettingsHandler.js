import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ColorPicker from '../Editor/ColorPicker';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramExportDialog from '../Editor/DiagramExportDialog';
import ExportHandlerForTest from '../Document/ExportHandlerForTest';
import FontList from '../Font/FontList';
import FontSelectBox from '../Editor/FontSelectBox';
import FontSizeSelectBox from '../Editor/FontSizeSelectBox';
import Global from '../Global';
import LatexConverter from '../Latex/LatexConverter';
import MathmlElementGenerator from '../Mathcha/MathmlElementGenerator';
import MathmlGenerator from '../Mathcha/MathmlGenerator';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SelectionFinder from './SelectionFinder';
import StyleHelper from '../Mathcha/StyleHelper';
import TimerHelper from '../Mathcha/TimerHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';
import TooltipData from '../Mathcha/TooltipData';

/// xxx(1620) /*SelectionSettingsHandler*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 70 times
/// var o = n.n(i);
/// var c = n(14)/*classnames*/;  // 9 times
/// var d = n.n(c);
/// var O = n(13)/*CreateEditorObject*/;  // 1 times
/// var N = n(18)/*StyleHelper*/;  // 1 times
/// var ee = n(11)/*Global*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var Dt = n(193)/*LatexConverter*/;  // 3 times
/// var En = n(173)/*ColorPicker*/;  // 2 times
/// var vn = n(37)/*ToolbarIcons*/;  // 4 times
/// var Sn = n(42)/*ColorTypeConverter*/;  // 2 times
/// var In = n(67)/*TooltipData*/;  // 10 times
/// var Tn = n(291)/*FontSizeSelectBox*/;  // 2 times
/// var bn = n(51)/*SelectBoxContainer*/;  // 1 times
/// var Ln = n(48)/*FontList*/;  // 1 times
/// var Dn = n(467)/*DiagramExportDialog*/;  // 1 times
/// var Nn = n(293)/*MathmlElementGenerator*/;  // 2 times
/// var kn = n(294)/*MathmlGenerator*/;  // 2 times
/// var Bn = n(155)/*ReactDOM-server-exp*/;  // 2 times
/// var Pn = n(244)/*ExportHandlerForTest*/;  // 1 times
/// var Fn = n(454)/*FontSelectBox*/;  // 1 times
/// var SelectionFinder = n(1658)/*SelectionFinder*/;  // 3 times
class Cn extends ColorPicker {
    renderComponent() {
        var e = {
            strokeWidth: 3,
            stroke: ColorTypeConverter.getHtmlColor(this.props.value)
        };
        return React.createElement("x-item", {
            class: "setting",
            style: {
                width: 19,
                height: 19,
                padding: 0,
                marginTop: 4
            },
            title: "Text Color"
        },
            ToolbarIcons.textColor(e));
    }
}
class xn extends ColorPicker {
    renderComponent() {
        var e = {
            fill: ColorTypeConverter.getHtmlColor(this.props.value),
            stroke: "rgb(202,199,199)"
        };
        return React.createElement("x-item", {
            class: "setting",
            style: {
                width: 19,
                height: 20,
                padding: 0,
                marginTop: 4
            },
            title: "Text Background Color"
        },
            ToolbarIcons.bgTextColor(e));
    }
}
var Mn = [{
    key: "default",
    value: "(font default)"
},
{
    key: "\\mathnormal",
    value: "mathnormal"
},
{
    key: "\\mathrm",
    value: "mathrm"
},
{
    key: "\\mathbf",
    value: "mathbf"
},
{
    key: "\\boldsymbol",
    value: "boldsymbol"
},
{
    key: "\\mathit",
    value: "mathit"
},
{
    key: "\\mathbb",
    value: "mathbb"
},
{
    key: "\\mathcal",
    value: "mathcal"
},
{
    key: "\\mathscr",
    value: "mathscr"
},
{
    key: "\\mathfrak",
    value: "mathfrak"
},
{
    key: "\\mathsf",
    value: "mathsf"
},
{
    key: "\\mathtt",
    value: "mathtt"
},
{
    key: "\\text",
    value: "text"
}];
class Rn extends React.Component {
    constructor() {
        super(...arguments);
        this.onRenderItem = (e) => {
            var t = e.key;
            var n = {
                paddingLeft: 10,
                fontSize: 14,
                fontFamily: FontList.mathFontFamiltyFromKey(e.key, this.props.baseMathModeFontFamily),
                fontWeight: void 0
            };
            return "\\boldsymbol" != e.key && "\\mathbf" != e.key || (n.fontWeight = "bold"),
                React.createElement("div", null, React.createElement("span", {
                    style: {
                        width: 65,
                        display: "inline-block"
                    }
                },
                    t), React.createElement("span", {
                        style: n
                    },
                        "ABCDabc"));
        };
    }
    render() {
        return React.createElement(SelectBoxContainer, {
            data: Mn,
            isReadOnly: true,
            style: {
                color: "#757575"
            },
            onChange: this.props.onChange,
            value: this.props.value,
            width: 100,
            expansionWidth: 160,
            onRenderItem: this.onRenderItem,
            title: TooltipData.getToolTipByKey("math-font").value
        });
    }
}
class wn extends React.PureComponent {
    render() {
        return React.createElement("list-items-options", {
            class: "setting-group-options",
            style: {
                marginLeft: 3
            },
            title: "Hyper Link",
            onClick: this.props.onClick
        },
            ToolbarIcons.link);
    }
}
class On extends React.PureComponent {
    render() {
        return React.createElement("list-items-options", {
            class: "setting-group-options",
            style: {
                marginLeft: 3
            },
            title: "Copy Style",
            onClick: this.props.onClick
        },
            ToolbarIcons.stylePaste(this.props.selected));
    }
}
var _n = {
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 1
};
class Hn extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showExportDialog: null
        };
        this.onFontSizeChange = (e) => {
            if ("\\normalsize" == e) {
                return this.props.handlers.onFontSizeChange(void 0);
            }
            this.props.handlers.onFontSizeChange(e);
        };
        this.onFontChange = (e) => {
            if (console.log("key:", e), "default" == e) {
                return this.props.handlers.onFontChange(void 0);
            }
            this.props.handlers.onFontChange(e);
        };
        this.handleFontBoldSelected = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.handlers.onFontBoldChange(!this.isStyleSelected("isBold"));
        };
        this.handleFontItalicSelect = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.handlers.onFontItalicChange(!this.isStyleSelected("isItalic"));
        };
        this.handleFontUnderlineSelect = (e) => {
            if (e.stopPropagation(), e.preventDefault(), this.textDecorationSelected("underline")) {
                return this.props.handlers.onTextDecorationChange(void 0);
            }
            this.props.handlers.onTextDecorationChange("underline");
        };
        this.handleFontLineThroughSelect = (e) => {
            if (e.stopPropagation(), e.preventDefault(), this.textDecorationSelected("line-through")) {
                return this.props.handlers.onTextDecorationChange(void 0);
            }
            this.props.handlers.onTextDecorationChange("line-through");
        };
        this.onFontColorChanged = (e) => {
            this.props.handlers.onFontColorChanged(e, true);
        };
        this.onBgColorChanged = (e) => {
            this.props.handlers.onFontBgColorChanged(e, true);
        };
        this.onExportMouseDown = (e) => {
            if (Global.isTestEnv()) {
                ExportHandlerForTest.handleMathExportForTest(this.getMathEditAreaElement());
            } else {
                this.setState({
                    showExportDialog: e
                });
            }
        };
        this.onExportLatex = () => {
            var e = this.props.selectionSettingInfo.selected;
            if (this.props.selectionSettingInfo.isInsideLatexTable) {
                var t = SelectionFinder.closestCompositeBlock(this.props.editorRef.editor, e).reactInstance.getModel();
                var n = LatexConverter.toLatex([{
                    id: "fake-line-id",
                    blocks: [t]
                }], {
                    inMathExpression: false
                });
                this.props.handlers.requestExportDialog(n, null);
            } else {
                var r = SelectionFinder.closestMathArea(this.props.editorRef.editor, e);
                if ("dg-editor-container" == r.tagName.toLowerCase()) {
                    var a = r.firstElementChild.reactInstance.getModel();
                    var i = LatexConverter.toLatex(a.lines, {
                        inMathExpression: true
                    });
                    var o = this.generateMathmlFromEditor(a);
                    this.props.handlers.requestExportDialog(i, o);
                } else {
                    var s = r.reactInstance.getModel();
                    var l = CreateEditorObject.createLineFromBlock(s);
                    var c = LatexConverter.toLatex([l], {
                        inMathExpression: false
                    });
                    var d = this.generateMathml(s);
                    this.props.handlers.requestExportDialog(c, d);
                }
            }
        };
        this.handleRequestMathEditAreaElement = () => {
            return this.getMathEditAreaElement();
        };
        this.handleDisplayStyleSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.selectMathModeType("\\displaystyle");
        };
        this.handleTextStyleSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.selectMathModeType("\\textstyle");
        };
    }
    selectFontName(e) {
        if ("default" == e) {
            e = void 0;
        }
        this.props.handlers.onFontNameChange(e);
    }
    selectMathModeType(e) {
        if (this.isMathModeTypeSelected(e)) {
            e = null;
        }
        this.props.handlers.onMathModeTypeChange(e);
    }
    isMathModeTypeSelected(e) {
        return this.getStyleInfo().mathModeType === e;
    }
    getStyleInfo() {
        var e = this.props.selectionSettingInfo.style || {};
        return this.props.temporarySelectedBlockStyle ? _.assignIn({},
            e, this.props.temporarySelectedBlockStyle) : e;
    }
    getFontSize() {
        return void 0 === this.getStyleInfo().fontSize ? "\\normalsize" : this.getStyleInfo().fontSize;
    }
    getFontName() {
        return void 0 === this.getStyleInfo().fontName ? "default" : this.getStyleInfo().fontName;
    }
    getFontColor() {
        return this.getStyleInfo().color || "#000";
    }
    getBackgroundColor() {
        return this.getStyleInfo().bgColor || "#FFF";
    }
    isStyleSelected(e) {
        return !!this.getStyleInfo()[e];
    }
    textDecorationSelected(e) {
        return this.getStyleInfo().textDecoration === e;
    }
    renderListItemSettings() {
        return this.lastSelectionComponent = React.createElement("selection-content", null, React.createElement("styled-select", {
            class: "font-size-select"
        },
            React.createElement(FontSizeSelectBox, {
                onChange: this.onFontSizeChange,
                value: this.getFontSize()
            })), React.createElement("separate-hbar", {
                style: {
                    marginLeft: 5,
                    marginRight: 5
                }
            }), React.createElement("list-items-options", {
                class: "setting-group-options"
            },
                React.createElement("i", {
                    className: classNames("fa fa-bold", {
                        selected: this.isStyleSelected("isBold")
                    }),
                    onMouseDown: this.handleFontBoldSelected,
                    "aria-hidden": "true",
                    title: TooltipData.getToolTipByKey("bold").value
                }), React.createElement("i", {
                    className: classNames("fa fa-italic", {
                        selected: this.isStyleSelected("isItalic")
                    }),
                    onMouseDown: this.handleFontItalicSelect,
                    "aria-hidden": "true",
                    title: TooltipData.getToolTipByKey("italic").value
                }), React.createElement("i", {
                    className: classNames("fa fa-strikethrough", {
                        selected: this.textDecorationSelected("line-through")
                    }),
                    onMouseDown: this.handleFontLineThroughSelect,
                    "aria-hidden": "true",
                    title: TooltipData.getToolTipByKey("strike-through").value
                })), React.createElement("separate-hbar", {
                    style: {
                        marginLeft: 5,
                        marginRight: 5
                    }
                }), React.createElement(Cn, {
                    stopPropagation: true,
                    style: {
                        marginTop: -1,
                        zIndex: 0
                    },
                    value: this.getFontColor(),
                    onItemSelect: this.onFontColorChanged
                }), React.createElement("separate-hbar", {
                    style: {
                        marginLeft: 5,
                        marginRight: 5
                    }
                })),
            this.lastSelectionComponent;
    }
    renderRootSelectionSetting() {
        return this.props.selectionSettingInfo.listTypeSelected
            ? this.renderListItemSettings()
            : (this.lastSelectionComponent = React.createElement("selection-content", null,
                // React.createElement("styled-select", {
                //     class: "font-select",
                //     style: {
                //         color: "#757575",
                //         paddingTop: 3
                //     }
                // },
                //     React.createElement(FontSelectBox, {
                //         fontName: this.getFontName(),
                //         onFontNameChange: this.onFontChange,
                //         width: 100,
                //         expansionWidth: 170,
                //         showDefault: true
                //     })), 
                React.createElement("styled-select", {
                    class: "font-size-select",
                    style: {
                        color: "#757575",
                        paddingTop: 3
                    }
                },
                    React.createElement(FontSizeSelectBox, {
                        onChange: this.onFontSizeChange,
                        value: this.getFontSize()
                    })), React.createElement("list-items-options", {
                        class: "setting-group-options"
                    },
                        React.createElement("i", {
                            className: classNames("fa fa-bold", {
                                selected: this.isStyleSelected("isBold")
                            }),
                            onMouseDown: this.handleFontBoldSelected,
                            "aria-hidden": "true",
                            title: TooltipData.getToolTipByKey("bold").value
                        }), React.createElement("i", {
                            className: classNames("fa fa-italic", {
                                selected: this.isStyleSelected("isItalic")
                            }),
                            onMouseDown: this.handleFontItalicSelect,
                            "aria-hidden": "true",
                            title: TooltipData.getToolTipByKey("italic").value
                        }), React.createElement("i", {
                            className: classNames("fa fa-underline", {
                                selected: this.textDecorationSelected("underline")
                            }),
                            onMouseDown: this.handleFontUnderlineSelect,
                            "aria-hidden": "true",
                            title: TooltipData.getToolTipByKey("underline").value
                        }), React.createElement("i", {
                            className: classNames("fa fa-strikethrough", {
                                selected: this.textDecorationSelected("line-through")
                            }),
                            onMouseDown: this.handleFontLineThroughSelect,
                            "aria-hidden": "true",
                            title: TooltipData.getToolTipByKey("strike-through").value
                        })), React.createElement("separate-hbar", {
                            style: {
                                marginLeft: 5,
                                marginRight: 5
                            }
                        }), React.createElement(Cn, {
                            stopPropagation: true,
                            style: {
                                marginTop: -1,
                                zIndex: 0
                            },
                            value: this.getFontColor(),
                            onItemSelect: this.onFontColorChanged
                        }), React.createElement(xn, {
                            stopPropagation: true,
                            style: {
                                marginTop: -1,
                                zIndex: 0
                            },
                            value: this.getBackgroundColor(),
                            onItemSelect: this.onBgColorChanged
                        }), React.createElement("separate-hbar", {
                            style: {
                                marginLeft: 5,
                                marginRight: 5
                            }
                        }),
                // React.createElement(wn,
                //     {
                //         onClick: this.props.handlers.requestLinkInput
                //     }), React.createElement("separate-hbar", {
                //         style: {
                //             marginLeft: 5,
                //             marginRight: 5
                //         }
                //     }), React.createElement(On, {
                //         selected: this.props.styleCopiedSelected,
                //         onClick: this.props.handlers.onCopyStyle
                //     }),
                this.renderExportLatexButtonForTextMode()), this.lastSelectionComponent);
    }
    renderExportLatexButtonForTextMode() {
        if (this.props.selectionSettingInfo.isInsideLatexTable) {
            return [React.createElement("separate-hbar", {
                key: "separator",
                style: _n
            }), React.createElement("button", {
                key: "Latex",
                className: "btn-normal",
                title: "Export Latex",
                onMouseDown: this.onExportLatex,
                style: {
                    marginTop: 2,
                    marginLeft: 4,
                    width: 52,
                    zIndex: 10
                }
            },
                "Latex")];
        }
    }
    generateMathmlFromEditor(e) {
        var t = {
            type: "math",
            elements: [(new MathmlElementGenerator).generateEditor(e)]
        };
        var n = MathmlGenerator.generate(t);
        return Object(ReactDOMServer.renderToStaticMarkup)(n.mathml);
    }
    generateMathml(e) {
        var t = (new MathmlElementGenerator).generateMath(e);
        var n = MathmlGenerator.generate(t);
        return Object(ReactDOMServer.renderToStaticMarkup)(n.mathml);
    }
    getMathEditAreaElement() {
        var e = this.props.selectionSettingInfo.selected;
        return SelectionFinder.closestMathArea(this.props.editorRef.editor, e);
    }
    renderExportDialog() {
        if (this.state.showExportDialog) {
            return React.createElement(DiagramExportDialog, {
                fixedContextHandler: this.props.fixedContextHandler,
                imageType: this.state.showExportDialog,
                requestMathAreaElement: this.handleRequestMathEditAreaElement,
                onCancel: () => {
                    return this.setState({
                        showExportDialog: null
                    });
                }
            });
        }
    }
    renderMathSelectionSettings() {
        var e = [React.createElement("span", {
            key: "export-span",
            style: {
                marginTop: 6,
                color: "gray",
                fontSize: 12,
                marginLeft: 3
            }
        },
            "Export:"), React.createElement("button", {
                key: "SVG",
                className: "btn-normal save-as-svg",
                title: "Export Image",
                onMouseDown: () => {
                    return this.onExportMouseDown("SVG");
                },
                style: {
                    marginTop: 2,
                    marginLeft: 4,
                    width: 60,
                    zIndex: 10,
                    height: 22,
                    fontSize: 12
                }
            },
                "Image"), React.createElement("button", {
                    key: "Latex",
                    className: "btn-normal",
                    title: "Export Latex",
                    onMouseDown: this.onExportLatex,
                    style: {
                        marginTop: 2,
                        marginLeft: 4,
                        width: 95,
                        zIndex: 10,
                        height: 22,
                        fontSize: 12
                    }
                },
                    "Latex/MathML")];
        return this.props.exportOptionsHide && (e = []),
            React.createElement("selection-content", null, React.createElement("styled-select", null, React.createElement(Rn, {
                baseMathModeFontFamily: this.props.baseMathModeFontFamily,
                onChange: (e) => {
                    return this.selectFontName(e);
                },
                value: this.getStyleInfo().mathType || "default"
            })), React.createElement("separate-hbar", {
                style: _n
            }), React.createElement("font-select", {
                class: classNames("displaystyle", {
                    selected: this.isMathModeTypeSelected("\\displaystyle")
                }),
                onMouseDown: this.handleDisplayStyleSelect,
                title: TooltipData.getToolTipByKey("displayStyle").value
            },
                React.createElement("font-select-container", null, React.createElement("small-symbol", null, "\u2211"), React.createElement("arrow-inside", null, "\u2192"), React.createElement("big-symbol", null, "\u2211"))), React.createElement("separate-hbar", {
                    style: _n
                }), React.createElement("font-select", {
                    class: classNames("textstyle", {
                        selected: this.isMathModeTypeSelected("\\textstyle")
                    }),
                    onMouseDown: this.handleTextStyleSelect,
                    title: TooltipData.getToolTipByKey("textStyle").value
                },
                    React.createElement("font-select-container", null, React.createElement("big-symbol", null, "\u2211"), React.createElement("arrow-inside", null, "\u2192"), React.createElement("small-symbol", null, "\u2211"))), React.createElement("separate-hbar", {
                        style: _n
                    }), React.createElement(Cn, {
                        style: {
                            marginTop: -2,
                            zIndex: 0
                        },
                        value: this.getFontColor(),
                        onItemSelect: this.onFontColorChanged
                    }), React.createElement("separate-hbar", {
                        style: {
                            marginLeft: 5,
                            marginRight: 5
                        }
                    }), React.createElement(On, {
                        selected: this.props.styleCopiedSelected,
                        onClick: this.props.handlers.onCopyStyle
                    }), React.createElement("separate-hbar", {
                        style: _n
                    }), e);
    }
    renderDisableLayer(e) {
        if (e) {
            return React.createElement("disabled-layer", null);
        }
    }
    render() {
        var e = this.props.selectionSettingInfo.isInsideTextSymbol || this.props.selectionSettingInfo.noSelected || this.props.isDisabled;
        return this.props.selectionSettingInfo.isRootSelected || this.props.selectionSettingInfo.isTextMode ? React.createElement("selection-settings", {
            class: "math mt-common-dialog"
        },
            this.renderRootSelectionSetting(), this.renderDisableLayer(e)) : React.createElement("selection-settings", {
                class: "math mt-common-dialog"
            },
                this.renderMathSelectionSettings(), this.renderDisableLayer(e), this.renderExportDialog());
    }
}
class SelectionSettingsHandler {
    constructor(e) {
        this.target = e;
        this.renderSelectionSettingDelayRunObj = TimerHelper.createLaterRunObject("latest", "a-little-while", true);
        this.handleRequestExportDialog = (e, t) => {
            this.target.requestExportDialog(e, t);
        };
        this.setSelectionSettingState = () => {
            var e = null;
            var t = this.target;
            var n = t.getContainerModel();
            var r = this.target.getController();
            if (!n.isDiagramSelected) {
                if (!t.getSafeSelected() || !n.isSelected()) {
                    return e = {
                        noSelected: true,
                        isRootSelected: true
                    },
                        void this.requestSelectionSetting(e, n);
                }
                var a = this.getIntersectedStyle(r, n);
                e = {
                    mathType: t.getMathTypeHtmlElement(),
                    style: a,
                    mainEditor: t.getEditorHtmlElement(),
                    selected: t.getSafeSelected(),
                    isRootSelected: n.isRootLineSelected(),
                    isTextMode: n.isTextModeSelected(),
                    isInsideTextSymbol: n.isInsideTextSymbol(),
                    isInsideLatexTable: n.isInsideLatexTable(),
                    listTypeSelected: n.getListItemSelectedType()
                };
                this.requestSelectionSetting(e, n);
            }
        };
        this.handleCopyStyle = () => {
            var e = this.target.getContainerModel();
            var t = this.target.getController().getSelectedStyleIgnoreSelection(e);
            this.target.setState({
                blockStyleClipboard: {
                    style: t,
                    isTextMode: e.isTextModeSelected()
                }
            });
        };
        this.onFontChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "fontName", e);
            t.handleResult(n);
        };
        this.onFontNameChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "mathType", e);
            t.handleResult(n);
        };
        this.onMathModeTypeChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "mathModeType", e);
            t.handleResult(n);
        };
        this.onFontSizeChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "fontSize", e);
            t.handleResult(n);
        };
        this.onFontBoldChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "isBold", e);
            t.handleResult(n);
        };
        this.onFontItalicChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "isItalic", e);
            t.handleResult(n);
        };
        this.onTextDecorationChange = (e) => {
            var t = this.target;
            var n = t.getController().setStyle(t.getContainerModel(), "textDecoration", e);
            t.handleResult(n);
        };
        this.onFontColorChanged = (e, t) => {
            var n = this.target;
            if (t) {
                n.needFocusAcquire();
            }
            var r = n.getController().setStyle(n.getContainerModel(), "color", e);
            n.handleResult(r);
        };
        this.onFontBgColorChanged = (e, t) => {
            var n = this.target;
            if (t) {
                n.needFocusAcquire();
            }
            var r = n.getController().setStyle(n.getContainerModel(), "bgColor", e);
            n.handleResult(r);
        };
        this.handleRequestLinkInput = () => {
            this.target.showLinkInput();
        };
        this.handlers = {
            onFontNameChange: this.onFontNameChange,
            onMathModeTypeChange: this.onMathModeTypeChange,
            onFontSizeChange: this.onFontSizeChange,
            onFontBoldChange: this.onFontBoldChange,
            onFontItalicChange: this.onFontItalicChange,
            onTextDecorationChange: this.onTextDecorationChange,
            onFontColorChanged: this.onFontColorChanged,
            onFontBgColorChanged: this.onFontBgColorChanged,
            onFontChange: this.onFontChange,
            onCopyStyle: this.handleCopyStyle,
            requestLinkInput: this.handleRequestLinkInput,
            requestExportDialog: this.handleRequestExportDialog
        };
    }
    triggerRenderSelectionSetting() {
        this.renderSelectionSettingDelayRunObj.later(() => {
            if (!this.target.unMounted) {
                this.setSelectionSettingState();
            }
        },
            100);
    }
    clearCopiedBlockStyle() {
        this.target.setState({
            blockStyleClipboard: null
        });
    }
    getIntersectedStyle(e, t) {
        return t.isListBulletSelected() ? e.getIntersectStyleForBullets(t) : StyleHelper.getComputedStyle(e.getIntersectStyle(t));
    }
    requestSelectionSetting(e, t) {
        if (this.target.isToolBarReady()) {
            var n = false;
            n = t.isCursorControlled;
            if (e.listTypeSelected) {
                n = false;
            }
            if (!(!this.target.isSelectOnly() && this.target.getSafeSelected())) {
                n = true;
            }
            this.target.requestRenderToolBarComponent({
                type: "add",
                key: "SelectionSettings",
                component: React.createElement(Hn, {
                    fixedContextHandler: this.target.getFixedContextHandler(),
                    baseMathModeFontFamily: this.target.getBaseMathModeFontFamily(),
                    exportOptionsHide: this.target.props.toolbarExportOptionsHide,
                    editorRef: this.target.getRootEditorRef(),
                    temporarySelectedBlockStyle: this.target.state.temporarySelectedBlockStyle,
                    isDisabled: n,
                    selectionSettingInfo: e,
                    styleCopiedSelected: !!this.target.state.blockStyleClipboard,
                    handlers: this.handlers
                })
            });
        }
    }
    setMathFontName(e) {
        this.onFontNameChange(e);
    }
}
/*n.d(t, "a", function () {
    return SelectionSettingsHandler;
})*/

export default SelectionSettingsHandler