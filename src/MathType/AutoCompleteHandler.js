import _ from 'lodash';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BaseComponent from '../Elements/BaseComponent';
import CommonBigSquare from '../Elements/CommonBigSquare';
import DescriptionContainer from '../Elements/DescriptionContainer';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import FontList from '../Font/FontList';
import Global from '../Global';
import InitHelper from '../InitHelper';
import KeyDownEventRegisterer from '../Mathcha/KeyDownEventRegisterer';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import RoleGridItemSelect from '../Symbols/RoleGridItemSelect';
import ScrollTo from '../Mathcha/ScrollTo';
import ShapeMatrixElement from '../Shapes/ShapeMatrixElement';
import SortHelper from '../Mathcha/SortHelper';
import SuggestionBox, { SuggestionBoxB } from '../Editor/SuggestionBox';
import SuggestionBoxInput from '../Editor/SuggestionBoxInput';
import SuggestionBoxTab from '../Editor/SuggestionBoxTab';
import SuggestionBoxZSpecTab, { SuggestionBoxZSpecTabB } from '../Editor/SuggestionBoxZSpecTab';
import SymbolWrapper from '../Symbols/SymbolWrapper';
import TheoremHelper from '../Mathcha/TheoremHelper';

/// xxx(1598) /*AutoCompleteHandler*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 69 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 2 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 2 times
/// var d = n.n(c);
/// var m = n(4)/*DOMHelper*/;  // 3 times
/// var C = n(2)/*lodash*/;  // 23 times
/// var x = n.n(C);
/// var wr = n(717)/*fuse*/;  // 1 times
/// var Or = n.n(wr);
/// var ye = n(5)/*sizzle*/;  // 8 times
/// var Ae = n.n(ye);
/// var T = n(7)/*PropUpdateHelper*/;  // 1 times
/// var Y = n(32)/*InitHelper*/;  // 29 times
/// var ee = n(11)/*Global*/;  // 3 times
/// var ne = n(43)/*ArrayHelper*/;  // 1 times
/// var je = n(122)/*TheoremHelper*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var cn = n(24)/*EventHelper*/;  // 3 times
/// var Ln = n(48)/*FontList*/;  // 1 times
/// var rr = n(76)/*MobileTabletClasses*/;  // 2 times
/// var fr = n(107)/*ScrollTo*/;  // 2 times
/// var Lr = n(292)/*SortHelper*/;  // 2 times
/// var kr = n(131)/*KeyDownEventRegisterer*/;  // 2 times
/// var Br = n(137)/*SuggestionBoxInput*/;  // 7 times
/// var sb = n(250)/*SuggestionBox*/;  // 2 times
/// var zr = n(348)/*SymbolWrapper*/;  // 1 times
/// var Yr = n(165)/*ShapeMatrixElement*/;  // 1 times
/// var Kr = n(230)/*CommonBigSquare*/;  // 1 times
/// var Qr = n(227)/*SuggestionBoxZSpecTab*/;  // 3 times
/// var Zr = n(452)/*SuggestionBoxTab*/;  // 1 times
/// var Xr = n(451)/*DescriptionContainer*/;  // 1 times
/// var Jr = n(334)/*RoleGridItemSelect*/;  // 1 times
class br {
    sort() {}
    getForTemplates() {
        return [];
    }
    getBySymbolNames(e) {
        return e.map((e) => {
            return InitHelper.getByName(e);
        });
    }
    getForTextMode() {
        return [InitHelper.getInlineMathContainer(), InitHelper.getDisplayMathContainer(), InitHelper.getDiagram(), InitHelper.getTable(), {
            id: Math.random(),
            type: "action",
            names: ["\\latex-table"],
            symbol: "Latex Table"
        },
        InitHelper.getAlignContainer(), InitHelper.getGatherContainer(), InitHelper.getImageBox(), InitHelper.getInlineImageBox(), InitHelper.getMultilineContainer(), InitHelper.getCheckbox(), InitHelper.getPageBreak(), InitHelper.getHorizontalLine(), InitHelper.getTableOfContent(), InitHelper.getTextModeGroup(), InitHelper.getTextModeGroupInline(), InitHelper.getZSchema(), InitHelper.getZAxiom(), InitHelper.getZBasic(), InitHelper.getUnderlineSection(), {
            id: Math.random(),
            type: "action",
            names: ["\\from-latex"],
            symbol: "from Latex"
        },
        {
            id: Math.random(),
            type: "settings",
            names: ["\\theorem-options"],
            symbol: "Theorem Options"
        },
        {
            id: Math.random(),
            type: "action",
            names: ["\\special-char"],
            symbol: "Insert Special Characters"
        },
        {
            id: Math.random(),
            type: "action",
            names: ["\\tag-select"],
            symbol: "Select Tag"
        },
        InitHelper.getQed(), InitHelper.getDollarSign(), InitHelper.getBackSlashSign(), InitHelper.getMathchaText(), InitHelper.getLatexText()];
    }
    isLeftRightDelimiter(e) {
        return "\\rvert" == e.names[0] || "\\lvert" == e.names[0];
    }
    getForAll(e) {
        var t = InitHelper.getAllSymbols().filter((e) => {
            return !this.isLeftRightDelimiter(e) && !e.isHidden && !e.insertInTextModeOnly && "\\theorem" != e.names[0] && "\\plot-cases" != e.names[0] && "\\page-break" != e.names[0] && "\\horizontal-line" != e.names[0] && "\\mathcha" != e.names[0] && "\\diagram" != e.names[0] && "\\mathbb" != e.names[0] && "\\math-container" != e.names[0] && "\\inline-math" != e.names[0] && "\\mathrel" != e.names[0] && "\\group" != e.names[0] && "\\multiline" != e.names[0] && "\\align" != e.names[0] && "\\gather" != e.names[0] && "\\image-container" != e.names[0] && "\\inline-image" != e.names[0] && "\\table" != e.names[0] && "\\latex-table" != e.names[0] && "\\table-of-content" != e.names[0] && "\\prefix-block" != e.names[0] && "\\checkbox" != e.names[0] && "\\not-found-symbol" != e.names[0] && "\\tag-ref" != e.names[0];
        });
        return ["mathnormal", "mathrm", "mathbf", "boldsymbol", "mathit", "mathbb", "mathcal", "mathscr", "mathfrak", "mathsf", "mathtt"].forEach((e) => {
            t.push({
                type: "action",
                names: ["\\".concat(e)],
                filterTag: e,
                renderSymbol: () => {
                    return "boldsymbol" == e ? React.createElement("span", {
                        className: "math-boldsymbol"
                    },
                    "(ABCabc...)") : "boldsymbol" == e ? React.createElement("span", {
                        className: "math-boldsymbol"
                    },
                    "(ABCabc...)") : React.createElement("span", {
                        className: "".concat(e.replace("math", "math-"))
                    },
                    "(ABCabc...)");
                },
                numberOfFrequency: 0
            });
        }),
        t.concat(this.templatesToInfo(e));
    }
    templatesToInfo(e) {
        return e.map((e) => {
            return {
                searchText: e.name,
                names: ["* " + e.name],
                type: "template",
                insertedLines: e.lines,
                description: e.description,
                templateDynamic: true
            };
        });
    }
    getForComposite() {
        var e = this.getForAll([]);
        return e = _.filter(e, (e) => {
            return "composite" == e.type || "template" == e.type;
        });
    }
    getForCategory() {
        return [];
    }
    getForDrawing(e) {
        return null == e ? InitHelper.getRecognizableSymbols() : InitHelper.recognize(e);
    }
}
var Nr = {
    shouldSort: true,
    caseSensitive: true,
    getFn(e, t) {
        var n = [];
        return t ? "names" == t ? (e.names.forEach((e) => {
            if (_.startsWith(e, "\\")) {
                n.push(e.substr(1));
            } else {
                n.push(e);
            }
        }), n) : "filterTag" == t ? (e.filterTag && n.push(e.filterTag), n) : (e.description && n.push(e.description), n) : (console.warn("not path"), n.push(e.filterTag), n);
    },
    keys: [{
        name: "names",
        weight: .4
    },
    {
        name: "filterTag",
        weight: .4
    },
    {
        name: "description",
        weight: .2
    }]
};
var Rr = new class extends br {
    constructor() {
        super(...arguments);
        this.cachedMathTemplates = [];
    }
    initAll() {
        if (!this.allSortableProvider) {
            var e = super.getForAll([]);
            _.forEach(e, (e) => {
                e.numberOfFrequency = 0;
                if (! ("\\frac" != e.names[0] && "\\power" != e.names[0] && "\\index" != e.names[0] && "\\sqrt" != e.names[0])) {
                    e.numberOfFrequency = 1;
                }
            });
            this.allSortableProvider = new SortHelper(e);
            this.composite = super.getForComposite();
        }
    }
    sort(e) {
        this.allSortableProvider.sort(e);
    }
    getForTextMode() {
        return this.textModes || (this.textModes = super.getForTextMode()),
        this.textModes;
    }
    getForAll(e) {
        return e != this.cachedMathTemplates && (this.allSortableProvider = new SortHelper(super.getForAll(e)), this.cachedMathTemplates = e, console.log("cached invalid")),
        this.allSortableProvider.getdata();
    }
    getForComposite() {
        return this.composite;
    }
    getForTemplates(e, t) {
        var n = this.templatesToInfo(e);
        return t ? n : [{
            names: ["Manage Custom Math"],
            type: "settings",
            description: "Manage Custom Math"
        }].concat(n);
    }
    getForCategory(e) {
        switch (e) {
        case "sin":
            var t = this.composite;
            var n = ["\\sin", "\\sinh", "\\cos", "\\cosh", "\\tan", "\\tanh", "\\cot", "\\coth", "\\sec", "\\sech", "\\csc", "\\csch"];
            t = _.filter(t, (e) => {
                return e.names[0].toLowerCase().indexOf("\\arc") >= 0 || null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "overBrace":
            t = this.composite;
            n = ["\\breve", "\\bar", "\\acute", "\\grave", "\\hat", "\\tilde", "\\overline", "\\dot", "\\ddot", "\\dddot", "\\ddddot", "\\underline", "\\overbrace", "\\underbrace", "\\power", "\\index", "\\power-index", "\\stackrel", "\\overset", "\\underset", "\\overparen", "\\underparen", "\\vec", "\\overunderset", "\\widehat", "\\widetilde", "\\overarc", "\\underarc", "\\angle-pair", "\\ceil-pair", "\\floor-pair", "\\vert-pair", "\\Vert-pair", "\\empty-brace-pair", "\\brace-empty-pair", "\\brace-pair", "\\bracket-pair", "\\parenthesis-pair"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase().indexOf("arrow") >= 0 || e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "summation":
            t = this.composite;
            n = ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\\lim", "\\limsup", "\\varlimsup", "\\sup", "\\liminf", "\\varliminf", "\\sum", "\\prod", "\\coprod", "\\bigwedge", "\\bigvee", "\\bigcup", "\\bigcap", "\\exp", "\\ln", "\\log", "\\mbox", "\\fbox", "\\group", "\\mathrel"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "multiply":
            t = this.allSortableProvider.getdata();
            n = ["\\plus", "\\minus", "\\pm", "\\mp", "\\oplus", "\\ominus", "\\times", "\\cdot", "\\circ", "\\ast", "\\otimes", "\\odot", "\\bullet", "\\div", "/", "%", "\\diameter", "\\diamond", "\\cup", "\\cap", "\\neg", "\\vee", "\\wedge", "\\forall", "\\exists", "\\nexists", "\\pi", "\\infty", "\\smalltriangleup", "\\smalltriangledown", "\\partial", "\\prime", "\\second", "\\complement", "\\rightangle", "\\angle", "\\measuredangle", "\\sphericalangle", "\\perp", "\\parallel", "\\degree", "\\therefore", "\\because"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "less":
            t = this.allSortableProvider.getdata();
            n = ["=", "\\sim", "\\simeq", "\\equiv", "\\approx", "\\cong", "\\leqslant", "\\geqslant", "\\geq", "\\leq", "\\ne", "\\nsim", "\\not", "\\simeq", "\\nequiv", "\\napprox", "\\ncong", ">", "\\ge", "\\gg", "<", "\\le", "\\ll", "\\ngtr", "\\ngeqq", "\\asymp", "\\nless", "\\nleqq", "\\propto", "in", "\\subset", "\\subseteq", "\\ni", "\\supset", "\\supseteq", "\\notin", "\\nsubset", "\\nsubseteq", "\\nni", "\\nsupset", "\\nsupseteq", "\\mathbb{N}", "\\mathbb{Z}", "\\mathbb{R}", "\\prec", "\\preccurlyeq", "\\succ", "\\succcurlyeq", "\\sqsubset", "\\sqsubseteq", "\\vdash", "\\sqsupset", "\\sqsupseteq", "\\dashv", "\\parallel", "\\nparallel", "\\perp"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "arrow":
            t = this.allSortableProvider.getdata();
            n = ["\\leftarrow", "\\to", "\\leftrightarrow", "\\uparrow", "\\downarrow", "\\updownarrow", "\\Leftarrow", "\\Rightarrow", "\\Leftrightarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "\\nearrow", "\\nwarrow", "\\searrow", "\\swarrow", "\\leftleftarrows", "\\rightrightarrows", "\\leftrightarrows", "\\rightleftarrows", "\\upuparrows", "\\downdownarrows", "\\leftrightharpoons", "\\rightleftharpoons", "\\upharpoonleft", "\\upharpoonright", "\\downharpoonleft", "\\downharpoonright", "\\nleftarrow", "\\nrightarrow", "\\nleftrightarrow", "\\nLeftarrow", "\\nRightarrow", "\\nLeftrightarrow", "\\mapsto", "\\dashleftarrow", "\\dashrightarrow", "\\twoheadleftarrow", "\\twoheadrightarrow", "\\hookleftarrow", "\\hookrightarrow", "\\looparrowleft", "\\looparrowright", "\\leftarrowtail", "\\rightarrowtail", "\\Lsh", "\\Rsh", "\\Lleftarrow", "\\Rrightarrow", "\\curvearrowleft", "\\curvearrowright", "\\circlearrowleft", "\\circlearrowright", "\\multimap", "\\leftrightsquigarrow", "\\rightsquigarrow", "\\leftharpoonup", "\\leftharpoondown", "\\rightharpoonup", "\\rightharpoondown", "\\rightsquigarrow"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "alpha":
            t = this.allSortableProvider.getdata();
            n = ["\\alpha", "\\beta", "\\gamma", "\\delta", "\\epsilon", "\\zeta", "\\eta", "\\theta", "\\vartheta", "\\iota", "\\kappa", "\\lambda", "\\mu", "\\nu", "\\xi", "\\pi", "\\varpi", "\\rho", "\\varrho", "\\sigma", "\\varsigma", "\\tau", "\\upsilon", "\\phi", "\\varphi", "\\chi", "\\psi", "\\omega", "\\Gamma", "\\Delta", "\\Theta", "\\Lambda", "\\Xi", "\\Pi", "\\Sigma", "\\Upsilon", "\\Phi", "\\Psi", "\\Omega"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0] == t;
                });
            });
            break;
        case "matrix":
            t = this.composite;
            n = ["\\matrix", "\\pmatrix", "\\bmatrix", "\\Bmatrix", "\\vmatrix", "\\Vmatrix", "\\eqnarray", "\\array", "\\cases", "\\binom", "\\gathered", "\\aligned"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
            break;
        case "frac":
            t = this.composite;
            n = ["\\frac", "\\sqrt", "\\left.", "\\right.", "\\cancel", "\\bcancel", "\\xcancel", "\\cfrac"];
            t = _.filter(t, (e) => {
                return null != _.find(n, function (t) {
                    return e.names[0].toLowerCase() == t;
                });
            });
        }
        return t;
    }
    getForDrawing(e) {
        return null == e ? (null == this.forDrawing && (this.forDrawing = super.getForDrawing(null)), this.forDrawing) : super.getForDrawing(e);
    }
};
var Mr = new class {
    calculatePosition(e, t, n, r) {
        if (r) {
            n = {
                left: 0,
                top: 0
            };
        }
        var a = "categories" == e ? 320 : 280;
        var i = "drawing" == e ? 320 : 308;
        if ("textMode" == e) {
            i = 283;
        }
        var o = window.innerWidth;
        var s = window.innerHeight;
        var l = t.left + n.left;
        var c = t.top + n.top;
        var d = {
            top: t.top,
            left: t.left
        };
        return c + i > s && ((c = s - i - 10) < 75 && (c = 75), d.top = c - n.top),
        l + a > o && (l = o - a - 10, d.left = l - n.left),
        d;
    }
};
var Dr = new class {
    filter(e, t) {
        var n = new Fuse(e, Nr);
        return null != t && "" != t ? (_.startsWith(t, "\\") && t.length > 1 && (t = t.substr(1)), n.search(t)) : e;
    }
};
class Pr extends React.Component {
    render() {
        var e = this.props;
        var t = e.dataProvider;
        var n = e.symbolFilter;
        var r = e.mathTemplates;
        var a = e.tabItems;
        var i = e.onTabSelect;
        var s = t.getForAll(r);
        return React.createElement(SuggestionBoxInput, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            data: s,
            dataProvider: t,
            symbolFilter: n,
            onItemCommit: this.props.onItemCommit,
            tabItems: a,
            tabSelectedKey: "all",
            onTabSelect: i
        });
    }
}
class Fr extends React.Component {
    render() {
        var e = this.props;
        var t = e.dataProvider;
        var n = e.symbolFilter;
        var r = e.tabItems;
        var a = e.onTabSelect;
        var i = t.getForComposite();
        return React.createElement(SuggestionBoxInput, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            data: i,
            dataProvider: t,
            symbolFilter: n,
            onItemCommit: this.props.onItemCommit,
            tabItems: r,
            tabSelectedKey: "composite",
            onTabSelect: a
        });
    }
}
class Hr extends React.Component {
    render() {
        var e = this.props;
        var t = e.dataProvider;
        var n = e.symbolFilter;
        var r = e.tabItems;
        var a = e.onTabSelect;
        var i = t.getForTemplates(this.props.mathTemplates, this.props.disableMathTemplateManagement);
        return React.createElement(SuggestionBoxInput, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            data: i,
            dataProvider: t,
            symbolFilter: n,
            onItemCommit: this.props.onItemCommit,
            tabItems: r,
            tabSelectedKey: "templates",
            onTabSelect: a
        });
    }
}
class Ur extends React.Component {
    constructor() {
        super(...arguments);
        this.previousPoint = {
            x: 0,
            y: 0
        };
        this.currentPoint = {
            x: 0,
            y: 0
        };
        this.mouseDownFlag = false;
        this.strokes = [];
        this.points = [];
        this.onMouseMove = (e) => {
            if (this.mouseDownFlag) {
                e.preventDefault();
                e.stopPropagation();
                this.storePreviousPoint(e);
                this.draw();
                console.log("p:", this.currentPoint);
            }
        };
        this.onMouseDown = (e) => {
            this.points = [];
            this.strokes.push(this.points);
            this.storePreviousPoint(e);
            this.mouseDownFlag = true;
        };
        this.onMouseUp = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.mouseDownFlag) {
                this.props.onStrokesReceived(this.strokes);
            }
            this.mouseDownFlag = false;
        };
        this.onMouseOut = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.mouseDownFlag) {
                this.props.onStrokesReceived(this.strokes);
            }
            this.mouseDownFlag = false;
        };
        this.onClear = () => {
            this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.strokes = [];
            this.points = [];
        };
    }
    componentDidMount() {
        var e = this.getContext();
        e.strokeStyle = "green";
        e.lineWidth = 3;
        e.lineJoin = "round";
        e.lineCap = "round";
        var t = ReactDOM.findDOMNode(this);
        var n = jQuery(t).find(">canvas").get(0);
        var r = EventHelper.getFalsePassiveObject();
        n.addEventListener("touchstart", this.onMouseDown, r);
        n.addEventListener("touchmove", this.onMouseMove, r);
        n.addEventListener("touchend", this.onMouseUp, r);
        n.addEventListener("touchcancel", this.onMouseOut, r);
    }
    componentWillUnmount() {
        var e = ReactDOM.findDOMNode(this);
        var t = jQuery(e).find(">canvas").get(0);
        t.removeEventListener("touchstart", this.onMouseDown);
        t.removeEventListener("touchmove", this.onMouseMove);
        t.removeEventListener("touchend", this.onMouseUp);
        t.removeEventListener("touchcancel", this.onMouseOut);
    }
    shouldComponentUpdate() {
        return false;
    }
    storePreviousPoint(e) {
        this.previousPoint = _.clone(this.currentPoint);
        var t = DOMHelper.getElementRect(this.canvas);
        var n = EventHelper.getLeftTopFromEvent(e);
        this.currentPoint = {
            x: n.left - t.left,
            y: n.top - t.top
        };
        this.points.push({
            x: this.currentPoint.x,
            y: this.currentPoint.y,
            time: (new Date).getTime()
        });
    }
    draw() {
        var e = this.getContext();
        e.beginPath();
        e.moveTo(this.previousPoint.x, this.previousPoint.y);
        e.lineTo(this.currentPoint.x, this.currentPoint.y);
        e.stroke();
        e.closePath();
    }
    getContext() {
        return this.canvas.getContext("2d");
    }
    render() {
        return React.createElement("div", {
            style: {
                marginBottom: 10
            },
            onWheel: (e) => {
                return e.preventDefault();
            },
            className: "drawing-container"
        },
        React.createElement("span", {
            style: {
                position: "absolute",
                left: "50%",
                fontSize: 10,
                color: "#afafaf",
                marginLeft: -69,
                display: "block"
            }
        },
        "Draw to find (support 359 symbols)"), React.createElement("canvas", {
            style: {
                position: "relative",
                marginTop: 10,
                height: 120,
                width: 250,
                cursor: "crosshair"
            },
            width: "250",
            height: "120",
            onMouseMove: this.onMouseMove,
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp,
            onMouseOut: this.onMouseOut,
            ref: (e) => {
                return this.canvas = e;
            }
        }), React.createElement("clear-button", {
            onMouseDown: this.onClear
        },
        " ", React.createElement("i", {
            className: "fa fa-eraser",
            "aria-hidden": "true"
        }), " "));
    }
}
class Wr extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedItem: this.props.data[0] || null
        };
        this.handleRenderFilter = () => {
            return React.createElement(Ur, {
                onStrokesReceived: this.props.onStrokesReceived
            });
        };
    }
    render() {
        return React.createElement(SuggestionBoxB, Object.assign({},
        this.props, {
            data: this.props.data,
            mainContainerFocus: true,
            itemsHeight: 125,
            renderFilter: this.handleRenderFilter
        }));
    }
}
class Gr extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            filteredData: this.props.dataProvider.getForDrawing(null)
        };
        this.handleStrokesReceived = (e) => {
            this.setState({
                filteredData: this.props.dataProvider.getForDrawing(e)
            });
        };
    }
    render() {
        var e = this.props;
        var t = e.dataProvider;
        var n = e.symbolFilter;
        var r = e.tabItems;
        var a = e.onTabSelect;
        return React.createElement(Wr, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            onStrokesReceived: this.handleStrokesReceived,
            data: this.state.filteredData,
            dataProvider: t,
            symbolFilter: n,
            onItemCommit: this.props.onItemCommit,
            tabItems: r,
            tabSelectedKey: "drawing",
            onTabSelect: a
        });
    }
}
class Vr extends React.Component {
    shouldComponentUpdate(e) {
        return e.category != this.props.category;
    }
    onClick(e) {
        this.props.onCategoriesChanged(e);
        this.setState({
            category: e
        });
    }
    render() {
        var e = {
            sin: "",
            overBrace: "",
            summation: "",
            multiply: "",
            less: "",
            arrow: "",
            alpha: "",
            matrix: "",
            frac: ""
        };
        e[this.props.category] += "selected";
        var t = MobileTabletClasses.addMobileTabletClssIfRequired("categories-container");
        return React.createElement("div", {
            className: t
        },
        React.createElement("div", {
            className: e.sin + " item",
            onClick: () => {
                this.onClick("sin");
            },
            style: {
                borderTop: "1px solid lightgray"
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        "Sin")), React.createElement("div", {
            className: e.overBrace + " item",
            onClick: () => {
                this.onClick("overBrace");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        React.createElement(SymbolWrapper, {
            symbol: "\u2192",
            isExpanded: true
        }))), React.createElement("div", {
            className: e.summation + " item",
            onClick: () => {
                this.onClick("summation");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        "\u03a3\u222b")), React.createElement("div", {
            className: e.multiply + " item",
            onClick: () => {
                this.onClick("multiply");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        "\u00d7\u00f7")), React.createElement("div", {
            className: e.less + " item",
            onClick: () => {
                this.onClick("less");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        "<\u2286")), React.createElement("div", {
            className: e.arrow + " item",
            onClick: () => {
                this.onClick("arrow");
            }
        },
        React.createElement("div", {
            className: "symbol",
            style: {
                width: "24px"
            }
        },
        "\u2190\u21d1")), React.createElement("div", {
            className: e.alpha + " item",
            onClick: () => {
                this.onClick("alpha");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        "\u03b1\u03b2")), React.createElement("div", {
            className: e.matrix + " item",
            onClick: () => {
                this.onClick("matrix");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        React.createElement(ShapeMatrixElement, {
            bracketType: "("
        }))), React.createElement("div", {
            className: e.frac + " item",
            onClick: () => {
                this.onClick("frac");
            }
        },
        React.createElement("div", {
            className: "symbol"
        },
        React.createElement(CommonBigSquare, null))));
    }
}
class jr extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedCategory: "sin",
            filteredData: this.props.dataProvider.getForCategory("sin")
        };
        this.subCategories = ["sin", "overBrace", "summation", "multiply", "less", "arrow", "alpha", "matrix", "frac"];
        this.handleCategoryChanged = (e) => {
            this.setSubCategory(e);
        };
        this.handleRenderExtra = () => {
            return React.createElement(Vr, {
                category: this.state.selectedCategory,
                onCategoriesChanged: this.handleCategoryChanged
            });
        };
        this.handleKeyDown = (e, t) => {
            return 38 === e.keyCode && e.shiftKey ? (t.handled = true, this.previousSubCategory(), e.preventDefault(), void e.stopPropagation()) : 40 === e.keyCode && e.shiftKey ? (t.handled = true, this.nextSubCategory(), e.preventDefault(), void e.stopPropagation()) : void 0;
        };
    }
    setSubCategory(e) {
        this.setState({
            filteredData: this.props.dataProvider.getForCategory(e),
            selectedCategory: e
        });
    }
    nextSubCategory() {
        var e = this.subCategories.indexOf(this.state.selectedCategory);
        this.setSubCategory(this.subCategories[(e + 1) % this.subCategories.length]);
    }
    previousSubCategory() {
        var e = this.subCategories.indexOf(this.state.selectedCategory);
        this.setSubCategory(this.subCategories[e > 0 ? e - 1 : this.subCategories.length - 1]);
    }
    render() {
        var e = this.props;
        var t = e.dataProvider;
        var n = e.symbolFilter;
        var r = e.tabItems;
        var a = e.onTabSelect;
        return React.createElement(SuggestionBoxInput, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            onKeyDown: this.handleKeyDown,
            data: this.state.filteredData,
            dataProvider: t,
            symbolFilter: n,
            onItemCommit: this.props.onItemCommit,
            tabItems: r,
            tabSelectedKey: "categories",
            onTabSelect: a,
            renderExtra: this.handleRenderExtra
        });
    }
}
var qr = new class {
    symbolByName(e, t) {
        var n = InitHelper.getByName(e);
        return n || console.log("missing:", e),
        t ? PropUpdateHelper.setProp(n, "description", t) : n;
    }
    getSourceForPlotFunction() {
        return [this.symbolByName("\\sqrt"), this.symbolByName("\\frac"), this.symbolByName("\\dfrac"), this.symbolByName("\\power"), this.symbolByName("\\plot-cases"), this.symbolByName("\\abs", "the absolute value of a number,ex:abs(3-x)"), this.symbolByName("\\acos", "arccosine (in radians) of the given number if it's between -1 and 1,ex:acos(0.5)"), this.symbolByName("\\asin", "arcsine (in radians) of the given number if it's between -1 and 1,ex:asin(0.5) "), this.symbolByName("\\atan", "arctangent (in radians) of the given number,ex:atan(2x)"), this.symbolByName("\\cos", "cosine of the given number (radians),ex:cos(x\ud835\udf0b)"), this.symbolByName("\\cosec", "cosecant of given number (in radians),ex:cosec(x\ud835\udf0b)"), this.symbolByName("\\cosh", "hyperbolic cosine of the given number,ex:cosh(2x)"), this.symbolByName("\\cot", "cotangent of given number (in radians),ex:cot(x\ud835\udf0b) "), this.symbolByName("\\ln", "natural (e) logarithm of a number,ex:ln (10)"), this.symbolByName("\\log10", "logarithm to the base 10,ex:log10(10)"), this.symbolByName("\\log2", "logarithm to the base 2,ex:log2(10)"), this.symbolByName("\\max", "maximum value from numbers,ex:max(10,x,2x,...)"), this.symbolByName("\\min", "minimum value from numbers,ex:min(10,x,2x,...)"), this.symbolByName("\\sin", "sin of the given number (radians),ex:sin(x\ud835\udf0b)"), this.symbolByName("\\sinh", "hyperbolic sin of the given number,ex:sinh(2x)"), this.symbolByName("\\tan", "tangent of the given number,ex:ran (1)"), this.symbolByName("\\tanh", "hyperbolic tangent of the given number,ex:tanh(1)"), this.symbolByName("\\floor-pair", "the largest integer less than or equal to a given number,ex:\u230ax\u230b"), this.symbolByName("\\floor", "the largest integer less than or equal to a given number,ex:floor(x)"), this.symbolByName("\\ceil-pair", "smallest integer greater than or equal to a given number,ex:\u2308x\u2309"), this.symbolByName("\\ceil-fun", "smallest integer greater than or equal to a given number,ex:ceil(x)"), this.symbolByName("\\vert-pair", "the absolute value of a number,ex:|3-x|"), this.symbolByName("\\times"), this.symbolByName("\\plus"), this.symbolByName("\\minus"), this.symbolByName("\\slash"), this.symbolByName("\\percent", "remainder operator. ex:5 % 2=1"), this.symbolByName("\\exclam", "factorials,ex:6!=720"), this.symbolByName("\\ast"), this.symbolByName("\\caret", "power,ex:2^3=8"), this.symbolByName("\\ampersand"), this.symbolByName("\\vert"), this.symbolByName("\\pi")].filter((e) => {
            return e;
        });
    }
};
class $r extends React.Component {
    constructor(e) {
        super(e);
        this.handleKeyDown = (e, t) => {
            if (9 === e.keyCode) {
                return e.shiftKey ? this.previousTabItem() : this.nextTabItem(),
                e.preventDefault(),
                e.stopPropagation(),
                void(t.handled = true);
            }
        };
        this.handleItemSelect = (e) => {
            this.setState({
                selectedItem: e
            });
        };
        this.handleCommit = (e) => {
            this.props.onItemCommit(e.item);
        };
        this.groups = [{
            name: "Functions",
            items: this.buildGroup("function")
        },
        {
            name: "Relations",
            items: this.buildGroup("relation")
        },
        {
            name: "Greeks",
            items: this.buildGroup("greek")
        },
        {
            name: "Brackets",
            items: this.buildGroup("bracket")
        },
        {
            name: "Logic",
            items: this.buildGroup("logic")
        },
        {
            name: "Set and Expression",
            items: this.buildGroup("set").concat(this.buildGroup("expression"))
        },
        {
            name: "Schema",
            items: this.buildGroup("schema")
        },
        {
            name: "Bag",
            items: this.buildGroup("bag")
        },
        {
            name: "Sequence",
            items: this.buildGroup("sequence")
        },
        {
            name: "Number",
            items: this.buildGroup("number")
        },
        {
            name: "Others",
            items: this.buildGroup("others")
        }];
        this.state = {
            selectedItem: {
                group: this.groups[0],
                item: this.groups[0].items[0]
            }
        };
    }
    buildGroup(e) {
        return SuggestionBoxZSpecTabB.get().filter((t) => {
            return t.zcategory instanceof Array ? t.zcategory.includes(e) : t.zcategory === e;
        });
    }
    nextTabItem() {
        if (this.hasTabItems() && this.props.onTabSelect) {
            var e = (this.props.tabItems.findIndex((e) => {
                return "z-spec-fancy" == e.key;
            }) + 1) % this.props.tabItems.length;
            this.props.onTabSelect(this.props.tabItems[e].key);
        }
    }
    previousTabItem() {
        if (this.hasTabItems() && this.props.onTabSelect) {
            var e = this.props.tabItems.findIndex((e) => {
                return "z-spec-fancy" == e.key;
            });
            var t = e - 1 >= 0 ? e - 1 : this.props.tabItems.length - 1;
            this.props.onTabSelect(this.props.tabItems[t].key);
        }
    }
    renderTabItem() {
        if (this.hasTabItems()) {
            return React.createElement(SuggestionBoxTab, {
                items: this.props.tabItems,
                selectedKey: "z-spec-fancy",
                onSelect: this.props.onTabSelect
            });
        }
    }
    hasTabItems() {
        return this.props.tabItems && this.props.tabItems.length > 0;
    }
    renderContent() {
        var e = {
            width: 25,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
            border: "1px solid lightgray",
            display: "flex",
            marginLeft: -1,
            marginBottom: -1,
            cursor: "pointer",
            background: "white"
        };
        var t = _.assignIn({},
        e, {
            background: "#bfe4bd"
        });
        return React.createElement("div", {
            style: {
                height: 242
            }
        },
        React.createElement(RoleGridItemSelect, {
            itemContainerStyle: e,
            itemContainerStyleSelected: t,
            groups: this.groups,
            numberOfItemsPerLine: 9,
            renderGroupName: (e) => {
                return React.createElement("span", {
                    style: {
                        padding: 5,
                        fontWeight: "bold",
                        fontFamily: '"Helvetica Neue",Helvetica,arial,freesans,clean,sans-serif'
                    }
                },
                e.name);
            },
            renderItem: (e, t, n) => {
                var r = e.renderSymbol ? e.renderSymbol(false, this.props.baseMathModeFontFamily) : e.symbol;
                return React.createElement("span", {
                    style: {
                        fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.props.baseMathModeFontFamily)
                    },
                    className: classNames("role-symbol-item", {
                        selected: n
                    }),
                    key: e.names[0]
                },
                r);
            },
            selected: this.state.selectedItem,
            onSelect: this.handleItemSelect,
            onCommit: this.handleCommit,
            onKeyDown: this.handleKeyDown
        }));
    }
    renderDescription(e) {
        if (!Global.isMobileOrTablet()) {
            return e ? React.createElement(DescriptionContainer, {
                item: e,
                showLatex: true
            }) : null;
        }
    }
    render() {
        return React.createElement("div", null, React.createElement("ac-main", {
            style: SuggestionBox
        },
        React.createElement("div", {
            className: "auto-complete-content"
        },
        this.renderContent()), this.renderTabItem()), this.renderDescription(this.state.selectedItem && this.state.selectedItem.item));
    }
}
var AutoCompleteContainer = class extends React.Component {
    constructor(e) {
        super(e);
        this.handleDocumentKeyDown = (e) => {
            if (27 === e.keyCode) {
                this.props.onClose();
                e.stopOther = true;
            }
        };
        this.handleItemCommit = (e) => {
            e.numberOfFrequency += 2;
            if (this.props.insideZSpec) {
                SuggestionBoxZSpecTabB.sort(e);
            }
            if (!this.props.insidePlotFunction) {
                Rr.sort(e);
            }
            if (! ("(" != e.symbol && ")" != e.symbol)) {
                e = _.assignIn({},
                e, {
                    forceCreateModel: true
                });
            }
            this.props.onSelect(e);
            this.props.onClose();
        };
        this.handleTabSelect = (e) => {
            this.setSelectedTab(e);
        };
        Rr.initAll();
        var t = this.props.mathContainerOnly ? "textMode" : "all";
        if (this.props.insideZSpec) {
            t = "z-spec";
        }
        this.state = {
            selectedTab: t
        };
        this.recreationKey = Math.random();
    }
    isPropsChanged(e, t) {
        return e.rect.top != t.rect.top || e.rect.left != t.rect.left || e.parentRect != t.parentRect || this.isContextInputChanged(e, t) || e.show != t.show;
    }
    isContextInputChanged(e, t) {
        return e.mathContainerOnly != t.mathContainerOnly || e.isInsideDiagram != t.isInsideDiagram || e.isInsideLatexTable != t.isInsideLatexTable || e.isInsideRawLatex != t.isInsideRawLatex || e.isAtTextModeGroupInline != t.isAtTextModeGroupInline || e.isAtImageCaption != t.isAtImageCaption || e.isAtTableCaption != t.isAtTableCaption || e.insideZSpec != t.insideZSpec;
    }
    shouldComponentUpdate(e, t) {
        return this.isPropsChanged(e, this.props) || !ArrayHelper.areEqualShallow(t, this.state);
    }
    componentDidMount() {
        KeyDownEventRegisterer.stack(this.handleDocumentKeyDown);
        ScrollTo.registerEventToFixScroll(jQuery(".ReactVirtualized__Grid.ReactVirtualized__List"));
    }
    componentWillUnmount() {
        KeyDownEventRegisterer.remove(this.handleDocumentKeyDown);
        console.log("call me off");
        ScrollTo.unregisterEventToFixScroll(jQuery(".ReactVirtualized__Grid.ReactVirtualized__List"));
    }
    componentWillReceiveProps(e) {
        if (this.isContextInputChanged(e, this.props)) {
            this.recreationKey = Math.random();
        }
    }
    isSelectedAtRoot() {
        return !this.props.selected || !this.props.selected.selected;
    }
    getTheoremsSymbolInfo() {
        var e = this.props.mainModel.theoremInfo;
        return TheoremHelper.getTheorems(e).map((e) => {
            return {
                type: "composite",
                names: ["\\theorem"],
                theorem: e,
                description: e.name,
                searchText: "theorem " + e.name,
                symbol: e.name
            };
        });
    }
    setSelectedTab(e) {
        this.setState({
            selectedTab: e
        });
    }
    renderContent() {
        if (this.props.insidePlotFunction) {
            return React.createElement(SuggestionBoxInput, {
                baseMathModeFontFamily: this.props.baseMathModeFontFamily,
                data: qr.getSourceForPlotFunction(),
                dataProvider: Rr,
                symbolFilter: Dr,
                onItemCommit: this.handleItemCommit
            });
        }
        if ("textMode" == this.state.selectedTab) {
            if (this.props.rootSymbolSupports) {
                var e = Rr.getBySymbolNames(this.props.rootSymbolSupports);
                return React.createElement(SuggestionBoxInput, {
                    baseMathModeFontFamily: this.props.baseMathModeFontFamily,
                    data: e,
                    symbolFilter: Dr,
                    onItemCommit: this.handleItemCommit
                });
            }
            var t = Rr.getForTextMode();
            return (this.props.isInsideDiagram || this.props.isInsideLatexTable || this.props.isInsideRawLatex || this.props.isAtImageCaption || this.props.isAtTableCaption || this.props.isAtTextModeGroupInline) && (t = t.filter((e) => {
                return "\\inline-math" == e.names[0] || "\\$" == e.names[0] || "\\text-mode-group-inline" == e.names[0] || "\\backslash" == e.names[0] || "\\mathcha" == e.names[0] || "\\checkbox" == e.names[0];
            })),
            this.isSelectedAtRoot() && (t = t.concat(this.getTheoremsSymbolInfo())),
            this.props.rootAdditionalSymbolSupports && (t = Rr.getBySymbolNames(this.props.rootAdditionalSymbolSupports).concat(t)),
            React.createElement(SuggestionBoxInput, {
                baseMathModeFontFamily: this.props.baseMathModeFontFamily,
                data: t,
                symbolFilter: Dr,
                onItemCommit: this.handleItemCommit
            });
        }
        var n = [{
            key: "all",
            value: "All"
        },
        {
            key: "composite",
            value: "Composite"
        },
        {
            key: "categories",
            value: "Categories"
        },
        {
            key: "templates",
            value: "Custom"
        },
        {
            key: "drawing",
            value: "Drawing"
        }];
        return this.props.insideZSpec && (n = [{
            key: "z-spec",
            value: "Z Spec"
        },
        {
            key: "z-spec-fancy",
            value: "Z Categories"
        },
        {
            key: "all",
            value: "All Others"
        }]),
        "z-spec" == this.state.selectedTab ? React.createElement(SuggestionBoxZSpecTab, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            data: Rr.getForComposite(),
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            mathTemplates: this.props.mathTemplates,
            onTabSelect: this.handleTabSelect
        }) : "z-spec-fancy" == this.state.selectedTab ? React.createElement($r, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            data: Rr.getForComposite(),
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            mathTemplates: this.props.mathTemplates,
            onTabSelect: this.handleTabSelect
        }) : "all" == this.state.selectedTab ? React.createElement(Pr, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            dataProvider: Rr,
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            mathTemplates: this.props.mathTemplates,
            onTabSelect: this.handleTabSelect
        }) : "composite" == this.state.selectedTab ? React.createElement(Fr, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            dataProvider: Rr,
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            onTabSelect: this.handleTabSelect
        }) : "templates" == this.state.selectedTab ? React.createElement(Hr, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            dataProvider: Rr,
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            onTabSelect: this.handleTabSelect,
            mathTemplates: this.props.mathTemplates,
            disableMathTemplateManagement: this.props.disableMathTemplateManagement
        }) : "drawing" == this.state.selectedTab ? React.createElement(Gr, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            dataProvider: Rr,
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            onTabSelect: this.handleTabSelect
        }) : "categories" == this.state.selectedTab ? React.createElement(jr, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            dataProvider: Rr,
            symbolFilter: Dr,
            onItemCommit: this.handleItemCommit,
            tabItems: n,
            onTabSelect: this.handleTabSelect
        }) : void 0;
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        var e = null;
        if (!Global.isMobileOrTablet()) {
            e = Mr.calculatePosition(this.state.selectedTab, this.props.rect, this.props.parentRect, this.props.usingPositionFixed);
        }
        if (this.props.usingPositionFixed) {
            e.position = "fixed";
            e.zIndex = 999999;
        }
        var t = MobileTabletClasses.addMobileTabletClssIfRequired(classNames("auto-complete-container", {
            "is-android": Global.isAndroid()
        }));
        return React.createElement("div", {
            key: this.recreationKey,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation,
            style: e,
            tabIndex: -1,
            className: t
        },
        this.renderContent());
    }
};
class AutoCompleteHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.handleAutoCompleteClose = () => {
            if (this.getState().autoCompleteInfo) {
                this.setState({
                    autoCompleteInfo: null
                });
                this.getTarget().hidenInputFocus();
            }
        };
        this.onAutoCompleteSelect = (e) => {
            this.getTarget().insertBySymbolInfo(e);
        };
    }
    renderAutoComplete() {
        var e = this.getState();
        if (e.autoCompleteInfo) {
            var t = e.autoCompleteInfo;
            var n = this.getTarget();
            var r = n.props;
            var a = {
                top: t.autoCompleteTop,
                left: t.autoCompleteLeft,
                right: t.autoCompleteTop + 1,
                bottom: t.autoCompleteLeft + 1,
                width: 1,
                height: 1
            };
            return React.createElement(AutoCompleteContainer, {
                baseMathModeFontFamily: n.getBaseMathModeFontFamily(),
                insideZSpec: t.insideZSpec,
                isAtTableCaption: t.isAtTableCaption,
                isAtImageCaption: t.isAtImageCaption,
                isAtTextModeGroupInline: t.isAtTextModeGroupInline,
                rootSymbolSupports: r.rootSymbolSupports,
                rootAdditionalSymbolSupports: r.rootAdditionalSymbolSupports,
                usingPositionFixed: r.autoCompleteUsingPositionFixed,
                disableMathTemplateManagement: !!r.mathTemplatesDisable,
                mathTemplates: n.getMathTemplates(),
                insidePlotFunction: r.insidePlotFunction,
                mathContainerOnly: t.showMathContainerOnly,
                isInsideDiagram: t.isInsideDiagram,
                isInsideLatexTable: t.isInsideLatexTable,
                isInsideRawLatex: t.isInsideRawLatex,
                onSelect: this.onAutoCompleteSelect,
                selected: n.getSafeSelected(),
                mainModel: e.mainModel,
                rect: a,
                parentRect: t.autoCompleteParentRect,
                show: true,
                onClose: this.handleAutoCompleteClose
            });
        }
    }
    closeAutoComplete() {
        if (this.getState().autoCompleteInfo) {
            this.setState({
                autoCompleteInfo: null
            });
        }
    }
    requestAutoComplete() {
        if (this.getTarget().isReadOnly() || this.getTarget().isSelectOnly() || this.getTarget().isPlainTextOnly()) {
            return false;
        }
        var e = this.getTarget().getContainerModel();
        if (!e.isSelected()) {
            return false;
        }
        if (e.isInsideTextSymbol()) {
            return false;
        }
        if (e.isCursorControlled) {
            return false;
        }
        this.getTarget().forceStopCompositionOrReserve();
        var t = jQuery(this.getTarget().getMathTypeHtmlElement()).offset();
        var n = t.top - jQuery(document).scrollTop();
        var r = t.left - jQuery(document).scrollLeft();
        var a = {
            top: n,
            left: r,
            right: r + 1,
            bottom: n + 1,
            width: 1,
            height: 1
        };
        var i = this.getTarget().getCursorGeoPosition();
        if (this.getTarget().props.autoCompleteUsingPositionFixed) {
            var o = DOMHelper.getElementRect(this.getTarget().getMathTypeHtmlElement());
            var s = DOMHelper.getElementRect(jQuery(this.getTarget().props.ancestorFixedSelector || "body").get(0));
            i.left = o.left + i.left - s.left;
            i.top = o.top + i.top - s.top;
        }
        return this.setState({
            autoCompleteInfo: {
                autoCompleteLeft: i.left,
                autoCompleteTop: i.top + 20,
                autoCompleteParentRect: a,
                showMathContainerOnly: e.isTextModeSelected(),
                isInsideDiagram: e.isInsideDiagram(),
                isInsideLatexTable: e.isInsideLatexTable(),
                isInsideRawLatex: e.isInsideRawLatex(),
                isAtTextModeGroupInline: e.isAtTextModeGroupInline(),
                isAtImageCaption: e.isAtImageCaption(),
                isAtTableCaption: e.isAtTableCaption(),
                insideZSpec: e.insideZSpec()
            }
        }),
        true;
    }
}
/*n.d(t, "a", function () {
    return AutoCompleteHandler;
})*/

export default AutoCompleteHandler