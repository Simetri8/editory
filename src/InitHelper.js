import _ from 'lodash';
import { fetch } from 'whatwg-fetch';
import convnetjs from 'convnetjs';
import LZString from 'lz-string';
import { arraySc, caseSc, matrixSc, gatheredSc, alignedSc } from './Symbols/Symbol-cases';
import { spaceEvenlyStrokes, scaleAndSlide, connectStrokes, flatStrokesToArray } from './Geometry/StrokeHelper';
import CreateEditorObject from './Elements/CreateEditorObject';
import DiagramIdHelper from './Elements/DiagramIdHelper';
import FullSymbolsData from './Mathcha/FullSymbolsData';
import Global from './Global';
import SymbolAbs from './Symbols/Symbol-abs';
import SymbolAcos from './Symbols/Symbol-acos';
import SymbolAcute from './Symbols/Symbol-acute';
import SymbolAlign from './Symbols/Symbol-align';
import SymbolAnglePair from './Symbols/Symbol-angle-pair';
import SymbolArccos from './Symbols/Symbol-arccos';
import SymbolArccosh from './Symbols/Symbol-arccosh';
import SymbolArccot from './Symbols/Symbol-arccot';
import SymbolArccoth from './Symbols/Symbol-arccoth';
import SymbolArccsc from './Symbols/Symbol-arccsc';
import SymbolArccsch from './Symbols/Symbol-arccsch';
import SymbolArcsec from './Symbols/Symbol-arcsec';
import SymbolArcsech from './Symbols/Symbol-arcsech';
import SymbolArcsin from './Symbols/Symbol-arcsin';
import SymbolArcsinh from './Symbols/Symbol-arcsinh';
import SymbolArctan from './Symbols/Symbol-arctan';
import SymbolArctanh from './Symbols/Symbol-arctanh';
import SymbolArg from './Symbols/Symbol-arg';
import SymbolAsin from './Symbols/Symbol-asin';
import SymbolAtan from './Symbols/Symbol-atan';
import SymbolBcancel from './Symbols/Symbol-bcancel';
import SymbolBigcap from './Symbols/Symbol-bigcap';
import SymbolBigcup from './Symbols/Symbol-bigcup';
import SymbolBigDelimiter from './Symbols/Symbol-big-delimiter';
import SymbolBigvee from './Symbols/Symbol-bigvee';
import SymbolBigwedge from './Symbols/Symbol-bigwedge';
import SymbolBinom from './Symbols/Symbol-binom';
import SymbolBmod from './Symbols/Symbol-bmod';
import SymbolBoxed from './Symbols/Symbol-boxed';
import SymbolBraceEmptyPair from './Symbols/Symbol-brace-empty-pair';
import SymbolBracePair from './Symbols/Symbol-brace-pair';
import SymbolBracketPair from './Symbols/Symbol-bracket-pair';
import SymbolBrackets from './Symbols/Symbol-brackets';
import SymbolBreve from './Symbols/Symbol-breve';
import SymbolCancel from './Symbols/Symbol-cancel';
import SymbolCeilFun from './Symbols/Symbol-ceil-fun';
import SymbolCeilPair from './Symbols/Symbol-ceil-pair';
import SymbolCheck from './Symbols/Symbol-check';
import SymbolCheckbox from './Symbols/Symbol-checkbox';
import SymbolCoprod from './Symbols/Symbol-coprod';
import SymbolCos from './Symbols/Symbol-cos';
import SymbolCosec from './Symbols/Symbol-cosec';
import SymbolCosh from './Symbols/Symbol-cosh';
import SymbolCot from './Symbols/Symbol-cot';
import SymbolCoth from './Symbols/Symbol-coth';
import SymbolCsc from './Symbols/Symbol-csc';
import SymbolCsch from './Symbols/Symbol-csch';
import SymbolDdddot from './Symbols/Symbol-ddddot';
import SymbolDddot from './Symbols/Symbol-dddot';
import SymbolDdot from './Symbols/Symbol-ddot';
import SymbolDeg from './Symbols/Symbol-deg';
import SymbolDet from './Symbols/Symbol-det';
import SymbolDiagram from './Symbols/Symbol-diagram';
import SymbolDim from './Symbols/Symbol-dim';
import SymbolDot from './Symbols/Symbol-dot';
import SymbolDownarrowPair from './Symbols/Symbol-downarrow-pair';
import SymbolDownarrowPair2 from './Symbols/Symbol-Downarrow-pair2';
import SymbolEmptyBracePair from './Symbols/Symbol-empty-brace-pair';
import SymbolExp from './Symbols/Symbol-exp';
import SymbolFloor from './Symbols/Symbol-floor';
import SymbolFloorPair from './Symbols/Symbol-floor-pair';
import SymbolFraction from './Symbols/Symbol-fraction';
import SymbolGather from './Symbols/Symbol-gather';
import SymbolGcd from './Symbols/Symbol-gcd';
import SymbolGrave from './Symbols/Symbol-grave';
import SymbolGroup from './Symbols/Symbol-group';
import SymbolHat from './Symbols/Symbol-hat';
import SymbolHom from './Symbols/Symbol-hom';
import SymbolHorizontalLine from './Symbols/Symbol-horizontal-line';
import SymbolIiint from './Symbols/Symbol-iiint';
import SymbolIint from './Symbols/Symbol-iint';
import SymbolImageContainer from './Symbols/Symbol-image-container';
import SymbolIndex from './Symbols/Symbol-index';
import SymbolInf from './Symbols/Symbol-inf';
import SymbolInlineImage from './Symbols/Symbol-inline-image';
import SymbolInt from './Symbols/Symbol-int';
import SymbolKer from './Symbols/Symbol-ker';
import SymbolLatex from './Symbols/Symbol-LaTeX';
import SymbolLatexTable from './Symbols/Symbol-latex-table';
import SymbolLatexTableDesigned from './Symbols/Symbol-latex-table-designed';
import SymbolLeft from './Symbols/Symbol-left';
import SymbolLeftAnglebslash from './Symbols/Symbol-left-anglebslash';
import SymbolLeftarrow from './Symbols/Symbol-leftarrow';
import SymbolLeftBrace from './Symbols/Symbol-left-brace';
import SymbolLeftBracket from './Symbols/Symbol-left-bracket';
import SymbolLeftDDownarrowbslash from './Symbols/Symbol-left-d-Downarrowbslash';
import SymbolLeftDot from './Symbols/Symbol-left-dot';
import SymbolLeftDownarrowbslash from './Symbols/Symbol-left-downarrowbslash';
import SymbolLeftDUparrowbslash from './Symbols/Symbol-left-d-Uparrowbslash';
import SymbolLeftDUpdownarrowbslash from './Symbols/Symbol-left-d-Updownarrowbslash';
import SymbolLeftLceilbslash from './Symbols/Symbol-left-lceilbslash';
import SymbolLeftLfloorbslash from './Symbols/Symbol-left-lfloorbslash';
import SymbolLeftSlash from './Symbols/Symbol-left-slash';
import SymbolLeftUparrowbslash from './Symbols/Symbol-left-uparrowbslash';
import SymbolLeftUpdownarrowbslash from './Symbols/Symbol-left-updownarrowbslash';
import SymbolLeftVbar from './Symbols/Symbol-left-vbar';
import SymbolLeftVertbslash from './Symbols/Symbol-left-Vertbslash';
import SymbolLg from './Symbols/Symbol-lg';
import SymbolLim from './Symbols/Symbol-lim';
import SymbolLiminf from './Symbols/Symbol-liminf';
import SymbolLimsup from './Symbols/Symbol-limsup';
import SymbolLn from './Symbols/Symbol-ln';
import SymbolLog from './Symbols/Symbol-log';
import SymbolLog10 from './Symbols/Symbol-log10';
import SymbolLog2 from './Symbols/Symbol-log2';
import SymbolLongdivision from './Symbols/Symbol-longdivision';
import SymbolMathbb from './Symbols/Symbol-mathbb';
import SymbolMathcha from './Symbols/Symbol-mathcha';
import SymbolMathContainer from './Symbols/Symbol-math-container';
import SymbolMathModeGroup from './Symbols/Symbol-math-mode-group';
import SymbolMathrel from './Symbols/Symbol-mathrel';
import SymbolMax from './Symbols/Symbol-max';
import SymbolMin from './Symbols/Symbol-min';
import SymbolMod from './Symbols/Symbol-mod';
import SymbolMultline from './Symbols/Symbol-multline';
import SymbolNot from './Symbols/Symbol-not';
import SymbolNotFoundSymbol from './Symbols/Symbol-not-found-symbol';
import SymbolOiiint from './Symbols/Symbol-oiiint';
import SymbolOiint from './Symbols/Symbol-oiint';
import SymbolOint from './Symbols/Symbol-oint';
import SymbolOperatorname from './Symbols/Symbol-operatorname';
import SymbolOverarc from './Symbols/Symbol-overarc';
import SymbolOverbrace from './Symbols/Symbol-overbrace';
import SymbolOverleftarrow from './Symbols/Symbol-overleftarrow';
import SymbolOverline from './Symbols/Symbol-overline';
import SymbolOverrightarrow from './Symbols/Symbol-overrightarrow';
import SymbolOverset from './Symbols/Symbol-overset';
import SymbolOverunderset from './Symbols/Symbol-overunderset';
import SymbolPageBreak from './Symbols/Symbol-page-break';
import SymbolPageCount from './Symbols/Symbol-page-count';
import SymbolPageNumber from './Symbols/Symbol-page-number';
import SymbolPageSectionLevel1 from './Symbols/Symbol-page-section-level-1';
import SymbolPageSectionLevel2 from './Symbols/Symbol-page-section-level-2';
import SymbolPageSectionLevel3 from './Symbols/Symbol-page-section-level-3';
import SymbolParenthesisPair from './Symbols/Symbol-parenthesis-pair';
import SymbolPlotCases from './Symbols/Symbol-plot-cases';
import SymbolPower from './Symbols/Symbol-power';
import SymbolPowerIndex from './Symbols/Symbol-power-index';
import SymbolPr from './Symbols/Symbol-Pr';
import SymbolPrefixBlock from './Symbols/Symbol-prefix-block';
import SymbolPrescript from './Symbols/Symbol-prescript';
import SymbolProd from './Symbols/Symbol-prod';
import SymbolQed from './Symbols/Symbol-qed';
import SymbolRawLatex from './Symbols/Symbol-raw-latex';
import SymbolRight from './Symbols/Symbol-right';
import SymbolRightAnglebslash from './Symbols/Symbol-right-anglebslash';
import SymbolRightarrow from './Symbols/Symbol-rightarrow';
import SymbolRightBackslash from './Symbols/Symbol-right-backslash';
import SymbolRightBrace from './Symbols/Symbol-right-brace';
import SymbolRightBracket from './Symbols/Symbol-right-bracket';
import SymbolRightDDownarrowbslash from './Symbols/Symbol-right-d-Downarrowbslash';
import SymbolRightDot from './Symbols/Symbol-right-dot';
import SymbolRightDownarrowbslash from './Symbols/Symbol-right-downarrowbslash';
import SymbolRightDUparrowbslash from './Symbols/Symbol-right-d-Uparrowbslash';
import SymbolRightDUpdownarrowbslash from './Symbols/Symbol-right-d-Updownarrowbslash';
import SymbolRightRceilbslash from './Symbols/Symbol-right-rceilbslash';
import SymbolRightRfloorbslash from './Symbols/Symbol-right-rfloorbslash';
import SymbolRightUparrowbslash from './Symbols/Symbol-right-uparrowbslash';
import SymbolRightUpdownarrowbslash from './Symbols/Symbol-right-updownarrowbslash';
import SymbolRightVbar from './Symbols/Symbol-right-vbar';
import SymbolRightVertbslash from './Symbols/Symbol-right-Vertbslash';
import SymbolRing from './Symbols/Symbol-ring';
import SymbolSec from './Symbols/Symbol-sec';
import SymbolSech from './Symbols/Symbol-sech';
import SymbolSgn from './Symbols/Symbol-sgn';
import SymbolSin from './Symbols/Symbol-sin';
import SymbolSinh from './Symbols/Symbol-sinh';
import SymbolSmallmatrix from './Symbols/Symbol-smallmatrix';
import SymbolSqrt from './Symbols/Symbol-sqrt';
import SymbolStackrel from './Symbols/Symbol-stackrel';
import SymbolSum from './Symbols/Symbol-sum';
import SymbolSup from './Symbols/Symbol-sup';
import SymbolTable from './Symbols/Symbol-table';
import SymbolTableOfContent from './Symbols/Symbol-table-of-content';
import SymbolTagRef from './Symbols/Symbol-tag-ref';
import SymbolTan from './Symbols/Symbol-tan';
import SymbolTanh from './Symbols/Symbol-tanh';
import SymbolText from './Symbols/Symbol-text';
import SymbolTextModeGroup from './Symbols/Symbol-text-mode-group';
import SymbolTextModeGroupInline from './Symbols/Symbol-text-mode-group-inline';
import SymbolTheorem from './Symbols/Symbol-theorem';
import SymbolTilde from './Symbols/Symbol-tilde';
import SymbolUnderarc from './Symbols/Symbol-underarc';
import SymbolUnderbrace from './Symbols/Symbol-underbrace';
import SymbolUnderline from './Symbols/Symbol-underline';
import SymbolUnderlineSection from './Symbols/Symbol-underline-section';
import SymbolUnderset from './Symbols/Symbol-underset';
import SymbolUparrowPair from './Symbols/Symbol-uparrow-pair';
import SymbolUparrowPair2 from './Symbols/Symbol-Uparrow-pair2';
import SymbolUpdownarrowPair from './Symbols/Symbol-updownarrow-pair';
import SymbolUpdownarrowPair2 from './Symbols/Symbol-Updownarrow-pair2';
import SymbolVarliminf from './Symbols/Symbol-varliminf';
import SymbolVarlimsup from './Symbols/Symbol-varlimsup';
import SymbolVertPair from './Symbols/Symbol-vert-pair';
import SymbolVertPair2 from './Symbols/Symbol-Vert-pair2';
import SymbolWideHat from './Symbols/Symbol-wide-hat';
import SymbolWidetilde from './Symbols/Symbol-widetilde';
import SymbolXcancel from './Symbols/Symbol-xcancel';
import SymbolZNotation from './Symbols/Symbol-Z-notation';
import TextSymbolsBase64Data from './Mathcha/TextSymbolsBase64Data';

/// xxx(32) /*InitHelper*/

/// var r = n(2)/*lodash*/;  // 22 times
/// var a = n.n(r);
/// var i = n(702)/*FullSymbolsData*/;  // 1 times
/// var o = n.n(i);
/// var s = n(328)/*fetch*/;  // 1 times
/// var l = n.n(s);
/// var c = n(11)/*Global*/;  // 2 times
/// var d = n(491)/*lz-string*/;  // 1 times
/// var h = n(866)/*convnet*/;  // 2 times
var u = {
    Accept: "application/json,text/plain,*/*"
};
/// var p = n(867)/*StrokeHelper*/;  // 4 times
var m = spaceEvenlyStrokes;
var f = scaleAndSlide;
var g = connectStrokes;
var y = flatStrokesToArray;
var A = new class {
    constructor() {
        this.net = new convnetjs.Net;
        this.fullSymbols = _.chain(FullSymbolsData.split("\n")).map((e, t) => {
            return {
                latex: e.split(";")[1],
                symbolIndex: t
            }
        }).value();
        this.symbols = _.reduce(this.fullSymbols, (e, t) => {
            var n = _.clone(t);
            var r = this.filterName(n.latex);
            return null == r ? e : (n.latex = r, _.some(e, (e) => {
                return e.latex === n.latex
            }) || e.push(n), e)
        },
        []);
        try {
            if (Global.inNodeEnv()) return void console.log("In Node Environment")
        } catch(e) {}
        fetch(Global.resolveStaticAssetPath("/dynamic-resources/data1"), {
            headers: u,
            credentials: "same-origin"
        }).then((e) => {
            return e.text()
        }).then((e) => {
            var t = JSON.parse(LZString.decompressFromBase64(e));
            this.net.fromJSON(t)
        })
    }
    filterName(e) {
        if (1 === e.length && "\\" != e[0]) {
            if (e = "\\mathbb{" + e + "}", !_.some(this.fullSymbols, (t) => {
                return t.latex === e
            })) return null
        } else if (e.indexOf("mathds") >= 0) e = e.replace("mathds", "mathbb");
        return e
    }
    getAllSupportSymbols() {
        return this.symbols
    }
    recognize(e) {
        if (null == this.net) return [];
        var t = g(e);
        t = f(t);
        t = m(t);
        var n = new convnetjs.Vol(y(t));
        var r = _.map(this.net.forward(n).w, (e, t) => {
            return {
                index: t,
                pro: e
            }
        });
        var i = _.orderBy(r, [(e) => {
            return e.pro
        }], ["desc"]);
        return _.reduce(i, (e, t) => {
            var n = this.fullSymbols[t.index];
            var r = this.filterName(n.latex);
            return null == r ? e : (_.some(e, (e) => {
                return e.latex === r
            }) || e.push({
                probability: t.pro,
                latex: r
            }), e)
        },
        [])
    }
};
/// var E = n(703)/*TextSymbolsBase64Data*/;  // 1 times
/// var v = n.n(E);
/// var S = n(6)/*DiagramIdHelper*/;  // 1 times
var CorePrivider = new class {
    setCoreProvider(e) {
        this.corePrivider = e
    }
    getModelByName(e) {
        return this.corePrivider.getModelByName(e)
    }
};
/// var x = n(13)/*CreateEditorObject*/;  // 1 times
/// var I = n(491)/*lz-string*/;  // 1 times
var T = JSON.parse(LZString.decompressFromBase64(TextSymbolsBase64Data));
var InitHelper = new class {
    constructor() {
        this.dollarSign = {
            symbol: "$",
            names: ["\\$"],
            searchText: "$ dollar",
            forceCreateModel: true
        };
        this.backSlashSign = {
            symbol: "\\",
            names: ["\\backslash", "\\\\"],
            searchText: "\\ back slash",
            forceCreateModel: true
        }
    }
    initAll() {
        if (this.symbols === undefined || this.symbols === null) {
            var e = (new Date).getTime();
            var t = this.initExtendedSymbols();
            console.log("32", "ExtendedSymbols", t);
            var n = t.map((e) => {
                return e.getSymbolInfo()
            });
            this.extendedSymbolMap = this.createSymbolMapByName(n);
            this.extendedCustomMap = this.createCustomSymbolComponentMap(t);
            this.customSymbolComponents = this.initCustomSymbols();
            this.textSymbols = T;
            this.symbolMapByUnicodeChar = this.createSymbolMapByUnicodeChar(this.textSymbols);
            this.fullSymbols = this.initData(this.textSymbols, this.customSymbolComponents);
            this.symbols = this.fullSymbols;
            this.recSymbols = this.buildRecSymbols(this.symbols);
            this.symbolMap = this.createSymbolMapByName(this.symbols);
            this.customSymbolMap = this.createCustomSymbolComponentMap(this.customSymbolComponents);
            this.alphabetMap = this.getAlphabetMap();
            CorePrivider.setCoreProvider(this);
            console.log("basic info init:", (new Date).getTime() - e)
        }
    }
    isCaseSymbol(e) {
        return "\\case" == e.text
    }
    getMetaDataByName(e) {
        var t = this.getCustomSymbolComponent(e);
        if (t.getModelMeta) return t.getModelMeta()
    }
    tryReplaceWithMathAlphaBet(e) {
        return _.map(e.split(""), (e) => {
            return this.tryMathAlphaBetMap(e)
        }).join("")
    }
    recognize(e) {
        var t = A.recognize(e);
        return _.map(t, (e) => {
            return this.getByName(e.latex)
        })
    }
    getAlphabetMap() {
        var e = {};
        var t = "abcdefghijklmnopqrstuvwxyz";
        return t.split("").forEach((t, n) => {
            e[t] = "h" != t ? String.fromCharCode(55349) + String.fromCharCode(56398 + n) : "\u210e"
        }),
        t.toUpperCase().split("").forEach((t, n) => {
            e[t] = String.fromCharCode(55349) + String.fromCharCode(56372 + n)
        }),
        e["-"] = "\u2212",
        e
    }
    getLatexTextCommandFromUnicode(e) {
        var t = e.codePointAt(0);
        if (t >= 33 && t <= 126) return null;
        var n = this.symbolMapByUnicodeChar[e];
        return n && _.startsWith(n.names[0], "\\") ? n.names[0] : null
    }
    getAllSymbols() {
        return this.symbols
    }
    getAllCompositeSymbols() {
        return this.customSymbolComponents
    }
    getRecognizableSymbols() {
        return this.recSymbols
    }
    getByName(e) {
        var t = this.symbolMap[e];
        return t || this.extendedSymbolMap[e]
    }
    getModelByName(e) {
        var t = this.symbolMap[e];
        return "composite" == t.type || "single" == t.type ? this.customSymbolMap[e].getModel(t) : t.symbol
    }
    getCompositeOrSingleModel(e) {
        var t = this.customSymbolMap[e];
        return t ? t.getModel() : null
    }
    getLinesByInfo(e) {
        var t = this.symbolMap[e.names[0]];
        if (e.templateDynamic && "template" == e.type) return {
            lines: DiagramIdHelper.assignIds(e.insertedLines)
        };
        if (t.commandBlocks) return {
            lines: this.createLinesFromcommandBlocks(t.commandBlocks),
            selected: t.selected
        };
        throw new Error("Not implmented");
    }
    getModelByInfo(e) {
        var t = this.customSymbolMap[e.names[0]];
        return t ? t.getModel(e) : this.extendedCustomMap[e.names[0]].getModel(e)
    }
    createLinesFromcommandBlocks(e) {
        var t = _.map(e, (e) => {
            return this.getModelByName(e)
        });
        return [CreateEditorObject.createLineFromBlocks(t)]
    }
    getView(e) {
        return this.getCustomSymbolComponent(e).getViewComponent()
    }
    getCustomSymbolComponent(e) {
        return this.customSymbolMap[e] || this.extendedCustomMap[e] || this.customSymbolMap["\\not-found-symbol"]
    }
    getDollarSign() {
        return this.dollarSign
    }
    getBackSlashSign() {
        return this.backSlashSign
    }
    categoryByUnicodeChar(e) {
        if ("-" == e) return "Vary";
        if (":" == e) return "Binary";
        var t = this.symbolMapByUnicodeChar[e];
        if (null == t) return "Normal";
        if (null == t.category) return "Normal";
        switch (t.category) {
        case "N":
            return "Normal";
        case "A":
            return "Alphabetic";
        case "B":
            return "Binary";
        case "C":
            return "Closing";
        case "D":
            return "Diacritic";
        case "F":
            return "Fence";
        case "G":
            return "Glyph";
        case "L":
            return "Large";
        case "O":
            return "Opening";
        case "P":
            return "Punctuation";
        case "R":
            return "Relation";
        case "S":
            return "Space";
        case "U":
            return "Unary";
        case "V":
            return "Vary";
        case "X":
            return "Special"
        }
    }
    buildRecSymbols(e) {
        var t = A.getAllSupportSymbols();
        var n = [];
        var r = _.map(t, (t) => {
            var r = _.find(e, (e) => {
                return e.names.indexOf(t.latex) >= 0
            });
            return r || (_.startsWith(t.latex, "\\") && n.push(t), {
                symbol: t.latex,
                names: [t.latex],
                searchText: t.latex
            })
        });
        return n.length > 0 && console.log("missings:", JSON.stringify(n, null, 2)),
        r
    }
    createCustomSymbolComponentMap(e) {
        var t = {};
        return e.forEach((e) => {
            var n = e.getSymbolInfo();
            if (_.isArray(n)) n.forEach((n) => {
                n.names.forEach((n) => {
                    t[n] = e
                })
            });
            else n.names.forEach((n) => {
                t[n] = e
            })
        }),
        t
    }
    createSymbolMapByName(e) {
        var t = {};
        return e.forEach((e) => {
            e.names.forEach((n) => {
                t[n] = e
            })
        }),
        t
    }
    createSymbolMapByUnicodeChar(e) {
        var t = {};
        return e.forEach((e) => {
            if (!e.isHidden) t[e.symbol] = e
        }),
        t
    }
    initData(e, t) {
        var n = e.concat([{
            symbol: "^",
            names: ["\\caret", "\\^"],
            searchText: "^ caret",
            forceCreateModel: true
        },
        {
            symbol: "_",
            names: ["\\underscore", "\\_"],
            searchText: "_ underscore",
            forceCreateModel: true
        },
        this.backSlashSign]);
        var r = _.flatMap(t, (e) => {
            var t = e.getSymbolInfo();
            return _.isArray(t) ? t : [t]
        });
        return n = _.filter(n, (e) => {
            return e.names.indexOf("\\vec") < 0
        }),
        r.forEach((e) => {
            var t = n.findIndex((t) => {
                return t.names.indexOf(e.names[0]) >= 0
            });
            e.id = Math.random();
            if (t >= 0) n[t] = e;
            else n.push(e)
        }),
        n.forEach((e) => {
            return e.id = Math.random()
        }),
        n
    }
    getImageBox() {
        return this.symbolMap["\\image-container"]
    }
    getMathchaText() {
        return this.symbolMap["\\mathcha"]
    }
    getDiagram() {
        return this.symbolMap["\\diagram"]
    }
    getInlineImageBox() {
        return this.symbolMap["\\inline-image"]
    }
    getImageContainer() {
        return this.symbolMap["\\image-container"]
    }
    getDisplayMathContainer() {
        return this.symbolMap["\\math-container"]
    }
    getAlignContainer() {
        return this.symbolMap["\\align"]
    }
    getGatherContainer() {
        return this.symbolMap["\\gather"]
    }
    getMultilineContainer() {
        return this.symbolMap["\\multiline"]
    }
    getCheckbox() {
        return this.symbolMap["\\checkbox"]
    }
    getInlineMathContainer() {
        return this.symbolMap["\\inline-math"]
    }
    getTagRef() {
        return this.symbolMap["\\tag-ref"]
    }
    getTable() {
        return this.symbolMap["\\table"]
    }
    getLatexTable() {
        return this.symbolMap["\\latex-table"]
    }
    getTheorem() {
        return this.symbolMap["\\theorem"]
    }
    getTableOfContent() {
        return this.symbolMap["\\table-of-content"]
    }
    getTextModeGroup() {
        return this.symbolMap["\\text-mode-group"]
    }
    getTextModeGroupInline() {
        return this.symbolMap["\\text-mode-group-inline"]
    }
    getZSchema() {
        return this.symbolMap["\\z-schema"]
    }
    getZAxiom() {
        return this.symbolMap["\\z-axiom"]
    }
    getZBasic() {
        return this.symbolMap["\\z-basic"]
    }
    getLatexText() {
        return this.symbolMap["\\LaTeX"]
    }
    getQed() {
        return this.symbolMap["\\qed"]
    }
    getUnderlineSection() {
        return this.symbolMap["\\underline-section"]
    }
    getPageBreak() {
        return this.symbolMap["\\page-break"]
    }
    getHorizontalLine() {
        return this.symbolMap["\\horizontal-line"]
    }
    getDisplayMathContainerModel() {
        return this.customSymbolMap["\\math-container"].getModel(this.symbolMap["\\math-container"])
    }
    getInlineMathContainerModel() {
        return this.customSymbolMap["\\inline-math"].getModel(this.symbolMap["\\inline-math"])
    }
    tryMathAlphaBetMap(e) {
        return this.alphabetMap[e] || e
    }
    initExtendedSymbols() {
        return _.map([SymbolAcos/*Symbol-acos*/, SymbolAsin/*Symbol-asin*/, SymbolAtan/*Symbol-atan*/, SymbolCosec/*Symbol-cosec*/, SymbolAbs/*Symbol-abs*/, SymbolLog2/*Symbol-log2*/, SymbolLog10/*Symbol-log10*/, SymbolFloor/*Symbol-floor*/, SymbolCeilFun/*Symbol-ceil-fun*/], (e) => {
            return e.default || e
        })
    }
    initCustomSymbols() {
///         var sCancel = n(225)/*Symbol-cancel*/;  // 1 times
///         var sStackrel = n(284)/*Symbol-stackrel*/;  // 1 times
///         var sLatexTable = n(540)/*Symbol-latex-table*/;  // 1 times
///         var sGroup = n(538)/*Symbol-group*/;  // 1 times
///         var sCases = n(283)/*Symbol-cases*/;  // 5 times
///         var sWidehat = n(536)/*Symbol-wide-hat*/;  // 1 times
///         var sPowerIndex = n(188)/*Symbol-power-index*/;  // 1 times
        return _.map([SymbolMathcha/*Symbol-mathcha*/, SymbolLatex/*Symbol-LaTeX*/, SymbolQed/*Symbol-qed*/, SymbolUnderlineSection/*Symbol-underline-section*/, SymbolLongdivision/*Symbol-longdivision*/, SymbolLeftBrace/*Symbol-left-brace*/, SymbolRightBrace/*Symbol-right-brace*/, SymbolLeftBracket/*Symbol-left-bracket*/, SymbolRightBracket/*Symbol-right-bracket*/, SymbolLeft/*Symbol-left*/, SymbolRight/*Symbol-right*/, SymbolLeftVbar/*Symbol-left-vbar*/, SymbolRightVbar/*Symbol-right-vbar*/, SymbolLeftVertbslash/*Symbol-left-Vertbslash*/, SymbolRightVertbslash/*Symbol-right-Vertbslash*/, SymbolLeftDot/*Symbol-left-dot*/, SymbolRightDot/*Symbol-right-dot*/, SymbolLeftLfloorbslash/*Symbol-left-lfloorbslash*/, SymbolRightRfloorbslash/*Symbol-right-rfloorbslash*/, SymbolLeftLceilbslash/*Symbol-left-lceilbslash*/, SymbolRightRceilbslash/*Symbol-right-rceilbslash*/, SymbolLeftUparrowbslash/*Symbol-left-uparrowbslash*/, SymbolRightUparrowbslash/*Symbol-right-uparrowbslash*/, SymbolLeftDownarrowbslash/*Symbol-left-downarrowbslash*/, SymbolRightDownarrowbslash/*Symbol-right-downarrowbslash*/, SymbolLeftUpdownarrowbslash/*Symbol-left-updownarrowbslash*/, SymbolRightUpdownarrowbslash/*Symbol-right-updownarrowbslash*/, SymbolLeftDUparrowbslash/*Symbol-left-d-Uparrowbslash*/, SymbolRightDUparrowbslash/*Symbol-right-d-Uparrowbslash*/, SymbolLeftDDownarrowbslash/*Symbol-left-d-Downarrowbslash*/, SymbolRightDDownarrowbslash/*Symbol-right-d-Downarrowbslash*/, SymbolLeftDUpdownarrowbslash/*Symbol-left-d-Updownarrowbslash*/, SymbolRightDUpdownarrowbslash/*Symbol-right-d-Updownarrowbslash*/, SymbolLeftAnglebslash/*Symbol-left-anglebslash*/, SymbolRightAnglebslash/*Symbol-right-anglebslash*/, SymbolLeftSlash/*Symbol-left-slash*/, SymbolRightBackslash/*Symbol-right-backslash*/, SymbolCancel, SymbolNot/*Symbol-not*/, SymbolBcancel/*Symbol-bcancel*/, SymbolXcancel/*Symbol-xcancel*/, SymbolFraction/*Symbol-fraction*/, SymbolStackrel, SymbolOverset/*Symbol-overset*/, SymbolUnderset/*Symbol-underset*/, SymbolOverunderset/*Symbol-overunderset*/, SymbolBoxed/*Symbol-boxed*/, SymbolMathContainer/*Symbol-math-container*/, SymbolMultline/*Symbol-multline*/, SymbolSqrt/*Symbol-sqrt*/, SymbolImageContainer/*Symbol-image-container*/, SymbolInlineImage/*Symbol-inline-image*/, SymbolPower/*Symbol-power*/, SymbolIndex/*Symbol-index*/, SymbolPowerIndex, SymbolPrescript/*Symbol-prescript*/, arraySc, caseSc, matrixSc, gatheredSc, alignedSc, SymbolPlotCases/*Symbol-plot-cases*/, SymbolSmallmatrix/*Symbol-smallmatrix*/, SymbolBinom/*Symbol-binom*/, SymbolAlign/*Symbol-align*/, SymbolGather/*Symbol-gather*/, SymbolTable/*Symbol-table*/, SymbolLatexTable, SymbolLatexTableDesigned/*Symbol-latex-table-designed*/, SymbolTableOfContent/*Symbol-table-of-content*/, SymbolPrefixBlock/*Symbol-prefix-block*/, SymbolInt/*Symbol-int*/, SymbolIint/*Symbol-iint*/, SymbolIiint/*Symbol-iiint*/, SymbolOint/*Symbol-oint*/, SymbolOiint/*Symbol-oiint*/, SymbolOiiint/*Symbol-oiiint*/, SymbolLim/*Symbol-lim*/, SymbolLimsup/*Symbol-limsup*/, SymbolVarlimsup/*Symbol-varlimsup*/, SymbolSup/*Symbol-sup*/, SymbolLiminf/*Symbol-liminf*/, SymbolVarliminf/*Symbol-varliminf*/, SymbolSum/*Symbol-sum*/, SymbolProd/*Symbol-prod*/, SymbolCoprod/*Symbol-coprod*/, SymbolBigvee/*Symbol-bigvee*/, SymbolBigwedge/*Symbol-bigwedge*/, SymbolBigcap/*Symbol-bigcap*/, SymbolBigcup/*Symbol-bigcup*/, SymbolLeftarrow/*Symbol-leftarrow*/, SymbolRightarrow/*Symbol-rightarrow*/, SymbolOverrightarrow/*Symbol-overrightarrow*/, SymbolOverleftarrow/*Symbol-overleftarrow*/, SymbolOverline/*Symbol-overline*/, SymbolOverbrace/*Symbol-overbrace*/, SymbolWideHat, SymbolWidetilde/*Symbol-widetilde*/, SymbolOverarc/*Symbol-overarc*/, SymbolUnderarc/*Symbol-underarc*/, SymbolUnderline/*Symbol-underline*/, SymbolUnderbrace/*Symbol-underbrace*/, SymbolText/*Symbol-text*/, SymbolOperatorname/*Symbol-operatorname*/, SymbolSin/*Symbol-sin*/, SymbolDim/*Symbol-dim*/, SymbolCos/*Symbol-cos*/, SymbolTan/*Symbol-tan*/, SymbolSec/*Symbol-sec*/, SymbolCot/*Symbol-cot*/, SymbolCsc/*Symbol-csc*/, SymbolArccos/*Symbol-arccos*/, SymbolArccot/*Symbol-arccot*/, SymbolArccsc/*Symbol-arccsc*/, SymbolArcsec/*Symbol-arcsec*/, SymbolArcsin/*Symbol-arcsin*/, SymbolArctan/*Symbol-arctan*/, SymbolSinh/*Symbol-sinh*/, SymbolCosh/*Symbol-cosh*/, SymbolTanh/*Symbol-tanh*/, SymbolSech/*Symbol-sech*/, SymbolCoth/*Symbol-coth*/, SymbolCsch/*Symbol-csch*/, SymbolArccosh/*Symbol-arccosh*/, SymbolArccoth/*Symbol-arccoth*/, SymbolArccsch/*Symbol-arccsch*/, SymbolArcsech/*Symbol-arcsech*/, SymbolArcsinh/*Symbol-arcsinh*/, SymbolArctanh/*Symbol-arctanh*/, SymbolExp/*Symbol-exp*/, SymbolLn/*Symbol-ln*/, SymbolLog/*Symbol-log*/, SymbolMin/*Symbol-min*/, SymbolMax/*Symbol-max*/, SymbolSgn/*Symbol-sgn*/, SymbolInf/*Symbol-inf*/, SymbolDeg/*Symbol-deg*/, SymbolDet/*Symbol-det*/, SymbolKer/*Symbol-ker*/, SymbolHom/*Symbol-hom*/, SymbolArg/*Symbol-arg*/, SymbolPr/*Symbol-Pr*/, SymbolGcd/*Symbol-gcd*/, SymbolLg/*Symbol-lg*/, SymbolMod/*Symbol-mod*/, SymbolBmod/*Symbol-bmod*/, SymbolGroup, SymbolMathrel/*Symbol-mathrel*/, SymbolTilde/*Symbol-tilde*/, SymbolHat/*Symbol-hat*/, SymbolDot/*Symbol-dot*/, SymbolDdot/*Symbol-ddot*/, SymbolDddot/*Symbol-dddot*/, SymbolDdddot/*Symbol-ddddot*/, SymbolAcute/*Symbol-acute*/, SymbolGrave/*Symbol-grave*/, SymbolBreve/*Symbol-breve*/, SymbolCheck/*Symbol-check*/, SymbolRing/*Symbol-ring*/, SymbolMathbb/*Symbol-mathbb*/, SymbolAnglePair/*Symbol-angle-pair*/, SymbolCeilPair/*Symbol-ceil-pair*/, SymbolFloorPair/*Symbol-floor-pair*/, SymbolVertPair/*Symbol-vert-pair*/, SymbolVertPair2/*Symbol-Vert-pair2*/, SymbolEmptyBracePair/*Symbol-empty-brace-pair*/, SymbolBraceEmptyPair/*Symbol-brace-empty-pair*/, SymbolBrackets/*Symbol-brackets*/, SymbolBracePair/*Symbol-brace-pair*/, SymbolBracketPair/*Symbol-bracket-pair*/, SymbolDownarrowPair/*Symbol-downarrow-pair*/, SymbolDownarrowPair2/*Symbol-Downarrow-pair2*/, SymbolUparrowPair/*Symbol-uparrow-pair*/, SymbolUparrowPair2/*Symbol-Uparrow-pair2*/, SymbolUpdownarrowPair/*Symbol-updownarrow-pair*/, SymbolUpdownarrowPair2/*Symbol-Updownarrow-pair2*/, SymbolParenthesisPair/*Symbol-parenthesis-pair*/, SymbolBigDelimiter/*Symbol-big-delimiter*/, SymbolDiagram/*Symbol-diagram*/, SymbolTagRef/*Symbol-tag-ref*/, SymbolTheorem/*Symbol-theorem*/, SymbolRawLatex/*Symbol-raw-latex*/, SymbolCheckbox/*Symbol-checkbox*/, SymbolNotFoundSymbol/*Symbol-not-found-symbol*/, SymbolPageBreak/*Symbol-page-break*/, SymbolHorizontalLine/*Symbol-horizontal-line*/, SymbolPageNumber/*Symbol-page-number*/, SymbolPageCount/*Symbol-page-count*/, SymbolPageSectionLevel1/*Symbol-page-section-level-1*/, SymbolPageSectionLevel2/*Symbol-page-section-level-2*/, SymbolPageSectionLevel3/*Symbol-page-section-level-3*/, SymbolTextModeGroup/*Symbol-text-mode-group*/, SymbolTextModeGroupInline/*Symbol-text-mode-group-inline*/, SymbolMathModeGroup/*Symbol-math-mode-group*/, SymbolZNotation/*Symbol-Z-notation*/], (e) => {
            return e.default || e
        })
    }
}

export default InitHelper