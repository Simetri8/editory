import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from '../Elements/BaseComponent';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Global from '../Global';
import LatexConverter, { LatexConverterBase } from '../Latex/LatexConverter';
import LatexParser from '../Latex/LatexParser';
import LatexSamples from '../Latex/LatexSamples';
import MathType from '../MathType';
import ModalDialog from '../Editor/ModalDialog';
import ModalDialogHelper from '../Editor/ModalDialogHelper';
import StyleHelper from '../Mathcha/StyleHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1591) /*LatexIoHandler*/

/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 41 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 1 times
/// var d = n.n(c);
/// var C = n(2)/*lodash*/;  // 4 times
/// var x = n.n(C);
/// var kt = n(455)/*react-copy-to-clipboard-exp*/;  // 1 times
/// var Bt = n.n(kt);
/// var jt = n(715)/*LatexSamples*/;  // 1 times
/// var qt = n.n(jt);
/// var N = n(18)/*StyleHelper*/;  // 5 times
/// var k = n(6)/*DiagramIdHelper*/;  // 5 times
/// var ee = n(11)/*Global*/;  // 3 times
/// var St = n(124)/*ModalDialog*/;  // 2 times
/// var Lt = n(19)/*TimerHelper*/;  // 7 times
/// var Dt = n(193)/*LatexConverter*/;  // 2 times
/// var Pt = n(88)/*ModalDialogHelper*/;  // 2 times
/// var Vt = n(465)/*LatexParser*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var MathType = n(91);  // 1 times
var Ut = {
    fontSize: 12,
    color: "gray",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
};
var Wt = {
    height: 25
};
var Gt = {
    cursor: "pointer",
    margin: "0px 3px"
};
var zt = {
    cursor: "pointer"
};
var Yt = {
    outline: "none",
    flexGrow: 1,
    minHeight: 150,
    resize: "none"
};
var Kt = [{
    name: "amsmath"
},
{
    name: "tikz"
},
{
    name: "mathdots"
},
{
    name: "yhmath"
},
{
    name: "cancel"
},
{
    name: "color"
},
{
    name: "siunitx"
},
{
    name: "array"
},
{
    name: "multirow"
},
{
    name: "amssymb"
},
{
    name: "gensymb"
},
{
    name: "tabularx"
},
{
    name: "booktabs"
},
{
    name: "fadings",
    isTikzPackage: true
}];
var Xt = {
    margin: "auto",
    marginTop: "4px",
    width: "80px"
};
var Jt = {
    fontSize: "12px",
    color: "#e44c4c",
    textAlign: "center"
};
var dst = {
    overflow: "auto",
    flexGrow: 1,
    height: "10px"
};
var en = {
    display: "flex",
    flexDirection: "column",
    width: "100%"
};
var tn = {
    marginBottom: "2px",
    fontSize: "12px",
    color: "gray"
};
var nn = {
    background: "white",
    fontSize: 13,
    color: "green",
    padding: 5,
    opacity: .6
};
var Qt = new LatexParser();
class wt extends LatexConverterBase {
    getTextType() {
        return "plain";
    }
    processTextForTextMode(t) {
        return t;
    }
    toLatexTextLine(t, n) {
        return n.currentStr += this.getLatexTextLine(t, n),
        n;
    }
    getLatexTextLine(t, n) {
        return ("" == n.currentStr ? "" : "\n") + t;
    }
    processListItem(e, t, r) {
        return r.currentStr += this.getLineWithPrefixText(e, t, r),
        r;
    }
    getLineWithPrefixText(e, t, n) {
        var r = "" == n.currentStr ? "" : "\n";
        var a = "";
        var i = "";
        var o = StyleHelper.getLineTempOrStoreIndent(e, 0);
        return o > 0 && (i = _.repeat(" ", o)),
        e.___prefixText && (a = e.___prefixText),
        r + i + a + t;
    }
    handleLineAlign(e) {
        return e;
    }
    processSection(e, t, n) {
        return n.currentStr += this.getLineWithPrefixText(e, t, n),
        n;
    }
    appendStyleBeginForText(t) {
        return t;
    }
    appendStyleEndForText(t) {
        return t;
    }
}
var Ot = new wt();
var Nt = new class extends wt {
    getTextType() {
        return "bbcode";
    }
    appendStyleBeginForText(e, t) {
        return e.styles.forEach((e) => {
            var n = this.styleToBBCode(e.key, e.value, true);
            if (n) {
                t.push(n);
            }
        }),
        t;
    }
    appendStyleEndForText(e, t) {
        return e.closeStyles.forEach((e) => {
            var n = this.styleToBBCode(e.key, e.value, false);
            if (n) {
                t.push(n);
            }
        }),
        t;
    }
    handleLineAlign(e, t) {
        var n;
        var r;
        return e.align && t && e.align != t && ((r = this.styleToBBCodeTagName("align", e.align)) && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "[/".concat(r, "]")), e.currentStr = this.removeEmptyAlign(e.currentStr, r)), (n = this.styleToBBCodeTagName("align", t)) && (e.currentStr += "[".concat(n, "]"))),
        !e.align && t && (n = this.styleToBBCodeTagName("align", t)) && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "[".concat(n, "]"))),
        e.align && !t && (r = this.styleToBBCodeTagName("align", e.align)) && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "[/".concat(r, "]")), e.currentStr = this.removeEmptyAlign(e.currentStr, r)),
        e.align = t,
        e;
    }
    processSection(e, t, n) {
        n = this.popAllIndentsIfExists(n);
        var r = this.getLineWithPrefixText(e, t, n);
        var a = StyleHelper.getLineTempOrStoreIndent(e, 0);
        var i = this.getSectionSizeFromIndentIndex(a);
        return n.currentStr += "[size=".concat(i, "][b]").concat(r, "[/b][/size]"),
        n;
    }
    processListItem(e, t, n, r) {
        var a = StyleHelper.getLineStyle(e, "listTypeSkip", false);
        var i = r.indents.length - 1;
        var o = StyleHelper.getLineTempOrStoreIndent(e, 0);
        var s = this.getBBCodeListChar(o, n);
        var l = this.getListTypeAsString(n);
        return i < o ? (r.currentStr = this.addNewLineStrAtEnd(r.currentStr, "[list".concat(s, "]")), r.indents.push(l)) : i === o ? r = this.changeListItemIfDiffentBBCode(r, l, s) : (r.currentStr += this.popAllIndents(r, i - o), r = this.changeListItemIfDiffentBBCode(r, l, s)),
        r.currentStr += a ? "\n" : "\n[*] ",
        r.currentStr += t,
        r;
    }
    changeListItemIfDiffentBBCode(e, t, n) {
        return t != _.last(e.indents) && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "[/list][list".concat(n, "]"))),
        e.indents.pop(),
        e.indents.push(t),
        e;
    }
    popAllIndents(e, t) {
        var n = "";
        if (void 0 === t) {
            t = 999;
        }
        for (; e.indents.length > 0 && t > 0;) {
            e.indents.pop();
            n = n + "\n[/list]";
            t--;
        }
        return n;
    }
    getBBCodeListChar(e, t) {
        if ("unorder" == t) {
            return "";
        }
        switch (e) {
        case 0:
            return "=1";
        case 1:
            return "=a";
        case 2:
            return "=i";
        case 3:
            return "=A";
        }
        return "";
    }
    getSectionSizeFromIndentIndex(e) {
        switch (e) {
        case 0:
            return 4;
        case 1:
            return 3;
        case 2:
            return 2;
        }
        return 2;
    }
    removeEmptyAlign(e, t) {
        var n = "[".concat(t, "]\n[/").concat(t, "]");
        return _.endsWith(e, n) ? e.substr(0, e.length - n.length) : e;
    }
    styleToBBCode(e, t, n) {
        var r = this.styleToBBCodeTagName(e, t);
        return r ? ("fontSize" == e && (r = n ? "size=".concat(r) : "size"), n ? "[".concat(r, "]") : "[/".concat(r, "]")) : null;
    }
    toLatexTextLine(e, t, n) {
        var r = "" == n.currentStr ? "" : "\n";
        var a = StyleHelper.getLineStyle(e, "align");
        return "left" == a && (a = void 0),
        (n = this.popAllIndentsIfExists(n)).align != a && (r = ""),
        (n = this.handleLineAlign(n, a)).currentStr += r + t,
        n;
    }
    styleToBBCodeTagName(e, t) {
        switch (e) {
        case "isBold":
            return t ? "b" : "";
        case "isItalic":
            return t ? "i" : "";
        case "textDecoration":
            return "underline" == t ? "u" : "line-through" == t ? "s" : "";
        case "align":
            switch (t) {
            case "left":
                return "";
            case "center":
                return "center";
            case "right":
                return "right";
            }
        case "fontSize":
            switch (t) {
            case "\\tiny":
                case "\\scriptsize":
                case "\\footnotesize":
                case "\\small":
                return "1";
            case "\\normalsize":
                return "2";
            case "\\large":
                return "3";
            case "\\Large":
                return "4";
            case "\\LARGE":
                return "5";
            case "\\huge":
                return "6";
            case "\\Huge":
                return "7";
            }
        }
    }
};
class Ft extends React.Component {
    constructor(e) {
        super(e);
        this.onSelectedChange = (e) => {
            this.setState({
                selectedOption: e
            });
            if (!e.startsWith("internal")) {
                this.props.onSelectedChange(e);
            }
        };
        this.onCancelClick = () => {
            this.props.onExportSettingVisibilityChanged(false, this.state.selectedOption);
        };
        this.state = {
            selectedOption: this.props.mathml ? "internal-latex" : "latex-latex",
            copied: false
        };
    }
    shouldComponenetUpdate(e, t) {
        return e.latex != this.props.latex || e.mathml != this.props.mathml || t.isConvertToPlainText != this.state.isConvertToPlainText || t.isConvertToBBCode != this.state.isConvertToBBCode;
    }
    selectAllTextArea() {
        if (!Global.isMobileOrTablet()) {
            if (this.latexArea) {
                TimerHelper.waitALitteWhile(() => {
                    if (this.latexArea) {
                        this.latexArea.focus();
                        this.latexArea.setSelectionRange(0, 9999999);
                    }
                });
            }
        }
    }
    componentDidMount() {
        if (this.props.latex) {
            this.selectAllTextArea();
        }
    }
    componentDidUpdate(e) {
        if (e.latex != this.props.latex && this.props.latex) {
            this.selectAllTextArea();
        }
    }
    getConverterType() {
        return this.state.selectedOption;
    }
    renderOutputSettings() {
        var e = [];
        return this.props.hideExportOutputOptions || this.props.mathml ? this.props.mathml && e.push(React.createElement("div", {
            key: "div",
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("div", {
            style: {
                height: 20,
                marginRight: 30,
                marginLeft: 5
            },
            key: "internal-latex"
        },
        React.createElement("input", {
            style: zt,
            type: "radio",
            value: "internal-latex",
            checked: "internal-latex" === this.state.selectedOption,
            onClick: () => {
                return this.onSelectedChange("internal-latex");
            }
        }), React.createElement("label", {
            style: Gt,
            onClick: () => {
                this.onSelectedChange("internal-latex");
            }
        },
        "LaTex")), React.createElement("div", {
            style: {
                height: 20
            },
            key: "internal-mathml"
        },
        React.createElement("input", {
            style: zt,
            type: "radio",
            value: "internal-mathml",
            checked: "internal-mathml" === this.state.selectedOption,
            onClick: () => {
                return this.onSelectedChange("internal-mathml");
            }
        }), React.createElement("label", {
            style: Gt,
            onClick: () => {
                this.onSelectedChange("internal-mathml");
            }
        },
        "MathML")))) : e = [React.createElement("div", {
            style: Wt,
            key: "1"
        },
        React.createElement("input", {
            style: zt,
            type: "radio",
            value: "latex-latex",
            checked: "latex-latex" === this.state.selectedOption,
            onClick: () => {
                return this.onSelectedChange("latex-latex");
            }
        }), React.createElement("label", {
            style: Gt,
            onClick: () => {
                this.onSelectedChange("latex-latex");
            }
        },
        "Convert to Math Mode Latex+Latex (Diagram-Tikz,Section,List Item,Style)")), React.createElement("div", {
            style: _.assignIn({},
            Wt, {
                height: 20
            }),
            key: "2"
        },
        React.createElement("input", {
            style: zt,
            type: "radio",
            value: "latex",
            checked: "latex" === this.state.selectedOption,
            onClick: () => {
                return this.onSelectedChange("latex");
            }
        }), React.createElement("label", {
            style: Gt,
            onClick: () => {
                this.onSelectedChange("latex");
            }
        },
        "Convert to Math Mode Latex+Plain Text"))],
        e;
    }
    isMathmlSelect() {
        return "internal-mathml" == this.state.selectedOption;
    }
    renderImportPackagesScript() {
        if (!this.isMathmlSelect() && this.state.showImportScript) {
            var e = Kt.map((e) => {
                return e.isTikzPackage ? "\\usetikzlibrary{".concat(e.name, "}") : "\\usepackage{".concat(e.name, "}");
            }).join("\n") + "\n\n\n";
            return React.createElement("div", {
                style: {
                    display: "flex"
                }
            },
            React.createElement("textarea", {
                readOnly: true,
                style: _.assignIn({},
                Yt, {
                    minHeight: 100,
                    marginTop: 5
                })
            },
            e));
        }
    }
    renderPackageHelper() {
        if (!this.isMathmlSelect()) {
            return React.createElement("span", {
                style: {
                    fontSize: 12,
                    color: "gray",
                    paddingTop: 5
                }
            },
            "For latex,you may need to include these packages:", Kt.map((e) => {
                return e.name;
            }).join(","), " -", React.createElement("span", {
                onClick: () => {
                    return this.setState({
                        showImportScript: true
                    });
                },
                style: {
                    paddingLeft: 5,
                    color: "#4CAF50",
                    cursor: "pointer"
                }
            },
            "Show Include Script"));
        }
    }
    getCurrentLatexOrMathml() {
        return this.isMathmlSelect() ? this.props.mathml : this.props.latex;
    }
    renderWarning() {
        if ("internal-mathml" != this.state.selectedOption) {
            return React.createElement("span", {
                style: {
                    color: "orange",
                    paddingBottom: 5
                }
            },
            React.createElement("i", {
                className: "fa fa-warning",
                style: {
                    padding: 5,
                    fontSize: 13
                }
            }), "Note:Latex below is just for reference,it does not guarantee to be full compatible (or compiled) in Latex Document.");
        }
    }
    render() {
        return this.props.latex ? (ModalDialogHelper.notifyShow(), Global.isMobileOrTablet() || (e = React.createElement(CopyToClipboard, {
            text: this.getCurrentLatexOrMathml(),
            onCopy: () => {
                return this.setState({
                    copied: true
                });
            }
        },
        React.createElement("button", {
            style: {
                width: 60,
                margin: "auto",
                marginTop: 10
            },
            className: classNames("btn-normal")
        },
        "Copy"))), React.createElement(ModalDialog, {
            style: {
                maxWidth: "95vw"
            },
            title: "Export Latex Dialog",
            show: !_.isEmpty(this.props.latex),
            className: "export-latex",
            backDrop: true,
            onClose: this.onCancelClick
        },
        React.createElement("export-container", {
            style: Ut,
            onTouchStart: (e) => {
                e.nativeEvent.handledTouchStart = true;
            }
        },
        this.renderOutputSettings(), this.renderWarning(), React.createElement("textarea", {
            style: Yt,
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: false,
            ref: (e) => {
                return this.latexArea = e;
            },
            value: this.getCurrentLatexOrMathml()
        }), e, void 0, this.renderPackageHelper(), this.renderImportPackagesScript()))) : (ModalDialogHelper.notifyHide(), null);
        var e;
    }
}
var Ht;
var _t;
class Zt extends React.Component {
    constructor(e) {
        super(e);
        this.textChangeDelayRunObj = TimerHelper.createLaterRunObject("latest", 600);
        this.onTextAreaChange = (e) => {
            var t = e.currentTarget.value;
            this.cacheLastLatex(t);
            this.setState({
                latex: t
            });
            this.textChangeDelayRunObj.later(() => {
                var e = this.parseLatex(t);
                if (0 != e.length) {
                    var n = {
                        id: DiagramIdHelper.nextId(),
                        lines: e
                    };
                    this.setState({
                        model: n,
                        errorMessage: ""
                    });
                    this.mathType.setModel(n, null);
                } else {
                    this.setState({
                        errorMessage: "Could not parse latex"
                    });
                }
            });
        };
        this.onOkClick = () => {
            var e = this.parseLatex(this.state.latex);
            if (0 != e.length) {
                if (this.props.forMathMode) {
                    this.props.onSuccessfulParse(e[0].blocks[0].elements.mathValue.lines);
                } else {
                    this.props.onSuccessfulParse(e);
                }
            }
        };
        this.onCancelClick = () => {
            this.props.onClose();
        };
        var t = LatexSamples;
        if (Global.isMobileOrTablet()) {
            t = "$$ \na^2 \n$$";
        }
        if (this.props.forMathMode) {
            t = "\\frac{a}{b}";
        }
        t = this.getCachedLastLatex() || t;
        var n = this.parseLatex(t);
        this.state = {
            latex: t,
            model: {
                id: DiagramIdHelper.nextId(),
                lines: n
            },
            errorMessage: ""
        };
    }
    wrapInMathContainer(e) {
        var t = {
            id: DiagramIdHelper.nextId(),
            type: "composite",
            text: "\\math-container",
            elements: {
                mathValue: {
                    id: DiagramIdHelper.nextId(),
                    lines: e
                }
            },
            displayMode: true
        };
        return [{
            id: DiagramIdHelper.nextId(),
            blocks: [t]
        }];
    }
    parseLatex(e) {
        var t = this.props.forMathMode ? "MathExpression" : "Expression";
        var n = Qt.parse(e, t);
        return 0 === n.length ? n : this.props.forMathMode ? this.wrapInMathContainer(n) : n;
    }
    shouldComponentUpdate(e, t) {
        return e.show != this.props.show || t.latex != this.state.latex || t.model != this.state.model || t.errorMessage != this.state.errorMessage;
    }
    cacheLastLatex(e) {
        if (this.props.forMathMode) {
            _t = e;
        } else {
            Ht = e;
        }
    }
    getCachedLastLatex() {
        return this.props.forMathMode ? _t : Ht;
    }
    renderTextAreaHeader() {
        if (this.props.forMathMode) {
            return React.createElement("div", {
                style: _.assignIn({},
                nn, {
                    borderBottom: "1px solid lightgray"
                })
            },
            "\\begin{equation*}", React.createElement("span", {
                style: {
                    fontSize: 12,
                    color: "gray",
                    float: "right",
                    paddingRight: 5
                }
            },
            "(You are inserting latex inside Math Mode area)"));
        }
    }
    renderTextAreaFooter() {
        if (this.props.forMathMode) {
            return React.createElement("div", {
                style: _.assignIn({},
                nn, {
                    borderTop: "1px solid lightgray"
                })
            },
            "\\end{equation*}");
        }
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            this.textArea.select();
            this.textArea.focus();
        });
    }
    render() {
        var e = function () {
            return MathType;
        } ();
        return React.createElement(ModalDialog, {
            style:
            {
                maxWidth: "95vw"
            },
            title: "Import Latex Dialog",
            show: this.props.show,
            className: "import-latex",
            onClose: this.onCancelClick,
            renderFooterContent: () => {
                return React.createElement("button", {
                    style: Xt,
                    className: "ok btn-normal",
                    onClick: this.onOkClick
                },
                " Ok ");
            }
        },
        React.createElement("import-container", {
            style: en
        },
        React.createElement("import-info", {
            style: tn
        },
        "* Only support basic Math Mode with commands/symbols existed in this app ", React.createElement("br", null), "* Do not support macro or commands like:\\hphantom,\\rlap,\\hskip"), React.createElement("div", {
            style: {
                border: "1px solid gray",
                display: "flex",
                flexDirection: "column",
                alignContent: "stretch"
            }
        },
        this.renderTextAreaHeader(), React.createElement("textarea", {
            ref: (e) => {
                return this.textArea = e;
            },
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: false,
            style: {
                border: "none",
                minHeight: 200,
                resize: "none",
                outline: "none",
                flex: 1,
                background: "white",
                padding: "5px 10px"
            },
            className: "latex",
            value: this.state.latex,
            onChange: this.onTextAreaChange
        }), this.renderTextAreaFooter()), React.createElement("parse-error", {
            style: Jt
        },
        this.state.errorMessage), React.createElement("display-math", {
            style: dst
        },
        React.createElement(e, {
            ref: (e) => {
                return this.mathType = e;
            },
            readOnly: true,
            model: this.state.model
        }))));
    }
}
class LatexIoHandler extends BaseComponent {
    constructor(e) {
        super(e);
        this.getExportSettingRef = (e) => {
            this.exportLatexMathmlDialogRef = e;
        };
        this.onExportSettingSelectedChanged = (e) => {
            this.exportLatex(e);
        };
        this.handleRequestExportSelection = (e) => {
            var t = this.getState();
            TimerHelper.next(() => {
                if (!e) {
                    e = this.exportLatexMathmlDialogRef.getConverterType();
                }
                var t = this.getSelectedLatex(e) || "no selection";
                this.setState({
                    exportInfo: {
                        latex: t
                    },
                    isExportAll: false
                });
            });
            if (! (t.exportInfo && t.exportInfo.latex)) {
                this.setState({
                    exportInfo: {
                        latex: "loading"
                    }
                });
            }
        };
        this.onExportSettingVisibilityChanged = (e, t) => {
            if (e) {
                this.exportLatex(t);
            } else {
                this.setState({
                    exportInfo: null,
                    hideExportOutputOptions: false
                });
            }
        };
        this.requestExportDialog = (e, t) => {
            this.setState({
                exportInfo: {
                    latex: e,
                    mathml: t
                },
                isExportAll: false,
                hideExportOutputOptions: true
            });
        };
        this.onImportLatexBoxClose = () => {
            this.setState({
                importLatexBoxShow: false
            });
            this.getTarget().hidenInputFocus();
        };
        this.onSuccessfulParse = (e) => {
            var t = this.getTarget().getContainerModel();
            if (!t.cursorSelected) {
                this.setSelectAtBegin();
            }
            TimerHelper.next(() => {
                ReactDOM.unstable_batchedUpdates(() => {
                    if (t.cursorSelected) {
                        var n = this.getTarget().getController().insertLines(e, t);
                        this.getTarget().handleResult(n);
                    } else {
                        this.getTarget().setSelected({
                            lineIndex: 0,
                            charIndex: 0
                        });
                        TimerHelper.waitABit(() => {
                            this.onSuccessfulParse(e);
                        });
                    }
                    this.setState({
                        importLatexBoxShow: false
                    });
                    this.getTarget().hidenInputFocus();
                });
            });
        };
    }
    getConverter(e) {
        switch (e) {
        case "bbcode":
            return Nt;
        case "latex":
            return Ot;
        case "latex-latex":
            case "text":
            return LatexConverter;
        default:
            throw new Error("Convert type " + e + "not supported error");
        }
    }
    getSelectedLatex(e) {
        if (void 0 === e) {
            throw new Error("no convert type");
        }
        var t = this.getTarget();
        var n = t.getController().getSelectionData(t.getContainerModel(), true);
        return null == n ? null : this.getConverter(e).toLatex(n, {
            inMathExpression: !t.getContainerModel().isRootLineSelected(),
            theoremInfo: t.state.mainModel.theoremInfo
        });
    }
    requestExportAll(e) {
        var t = this.getState();
        TimerHelper.next(() => {
            e = e || this.exportLatexMathmlDialogRef.getConverterType();
            var n = t.mainModel.lines;
            var r = this.getConverter(e).toLatex(n, {
                inMathExpression: false,
                theoremInfo: t.mainModel.theoremInfo
            });
            r = r || " ";
            this.setState({
                exportInfo: {
                    latex: r
                },
                isExportAll: true
            });
        });
        if (! (t.exportInfo && t.exportInfo.latex)) {
            this.setState({
                exportInfo: {
                    latex: "loading"
                }
            });
        }
    }
    exportLatex(e, t) {
        if (void 0 === t) {
            t = this.getState().isExportAll;
        }
        if (t) {
            this.requestExportAll(e);
        } else {
            this.handleRequestExportSelection(e);
        }
    }
    requestExportSelection(e) {
        this.handleRequestExportSelection(e);
    }
    renderExportSettings() {
        var e = this.getState();
        return e.exportInfo ? React.createElement(Ft, {
            latex: e.exportInfo.latex,
            mathml: e.exportInfo.mathml,
            ref: this.getExportSettingRef,
            hideExportOutputOptions: e.hideExportOutputOptions,
            isExportAll: e.isExportAll,
            onSelectedChange: this.onExportSettingSelectedChanged,
            onExportSettingVisibilityChanged: this.onExportSettingVisibilityChanged
        }) : null;
    }
    setSelectAtBegin() {
        this.getTarget().setSelected({
            lineIndex: 0,
            charIndex: 0
        });
    }
    showImportFromLatex() {
        var e = this.getTarget().getContainerModel();
        if (!e.isInsideTextSymbol()) {
            this.setState({
                importLatexBoxShow: true,
                forMathMode: !e.isTextModeSelected()
            });
        }
    }
    renderImportLatexBox() {
        if (! (this.getTarget().isReadOnly() || this.getTarget().isSelectOnly() || this.getTarget().isRestrictedView()) && this.getState().importLatexBoxShow) {
            return React.createElement(Zt, {
                show: this.getState().importLatexBoxShow,
                forMathMode: this.getState().forMathMode,
                onClose: this.onImportLatexBoxClose,
                onSuccessfulParse: this.onSuccessfulParse
            });
        }
    }
}
/*n.d(t, "a", function () {
    return LatexIoHandler;
})*/

export default LatexIoHandler