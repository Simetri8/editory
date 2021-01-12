import _ from 'lodash';
import BlockHelper from '../Elements/BlockHelper';
import CheckComponent from '../Editor/CheckComponent';
import InitHelper from '../InitHelper';
import LatexParser from './LatexParser';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper from '../Mathcha/StyleHelper';
import TextUtils from '../Editor/TextUtils';
import TheoremHelper from '../Mathcha/TheoremHelper';

/// xxx(177) /*LatexConverterBase*/

/// var r = n(2)/*lodash*/;  // 17 times
/// var a = n.n(r);
/// var i = n(32)/*InitHelper*/;  // 2 times
/// var o = n(465)/*LatexParser*/;  // 1 times
/// var s = n(22)/*CheckComponent*/;  // 1 times
/// var c = n(18)/*StyleHelper*/,  // 12 times
/// d = n(36)/*TextUtils*/,  // 2 times
/// h = n(12)/*BlockHelper*/,  // 2 times
/// u = n(7)/*PropUpdateHelper*/,  // 1 times
/// p = n(122)/*TheoremHelper*/;  // 1 times
/*n.d(t, "a", function () {
    return m
});*/
var l = new class {
    partition(e) {
        var t = this.extractStyleRanges(e);
        return this.mergeRanges(t);
    }
    mergeRanges(e) {
        var t = [];
        var n = _.clone(e);
        for (; n.length > 0;) {
            var r = _.last(t);
            if (null != r) {
                n = this.splitBySingle(r, n);
            }
            var i = _.maxBy(n, (e) => {
                return e.end - e.start;
            });
            n = _.filter(n, (e) => {
                return e != i;
            });
            t.push(i);
        }
        return t;
    }
    splitBySingle(e, t) {
        var n = this.splitByStart(e.start, t);
        return this.splitByEnd(e.end, n);
    }
    splitByStart(e, t) {
        return _.flatMap(t, (t) => {
            return t.start < e && e <= t.end ? this.splitRangeAt(t, e - 1) : [t];
        });
    }
    splitByEnd(e, t) {
        return _.flatMap(t, (t) => {
            return t.start <= e && e < t.end ? this.splitRangeAt(t, e) : [t];
        });
    }
    splitRangeAt(e, t) {
        var n = _.clone(e);
        var r = _.clone(e);
        return n.start = e.start,
        n.end = t,
        r.start = t + 1,
        r.end = e.end,
        [n, r];
    }
    extractStyleRanges(e) {
        var t = [];
        var n = [];
        e.forEach((e, r) => {
            var a = this.withStyle(e.style, t, r, e);
            t = a.accumulatedStyles;
            n = n.concat(a.ranges);
        });
        var r = this.withStyle({},
        t, e.length, null);
        return n.concat(r.ranges);
    }
    withStyle(e, t, n, r) {
        e = e || {};
        var i = [];
        _.keys(e).forEach((a) => {
            if (null !== e[a] && void 0 !== e[a] && "bgColor" != a) {
                if (! ("mathModeType" == a && "\\displaystyle" == e[a] && r && CheckComponent.isInlineMathContainer(r) || this.hasStyle(t, a, e[a]))) {
                    this.addStyle(i, a, e[a], n);
                }
            }
        });
        var o = [];
        return {
            accumulatedStyles: (t = _.filter(t, (t) => {
                var r = e[t.key] == t.value;
                return r || o.push({
                    key: t.key,
                    value: t.value,
                    start: t.start,
                    end: n - 1
                }),
                r;
            })).concat(i),
            ranges: o
        };
    }
    hasStyle(e, t, n) {
        return _.some(e, (e) => {
            return e.key === t && e.value === n;
        });
    }
    addStyle(e, t, n, r) {
        return e.push({
            key: t,
            value: n,
            start: r
        }),
        e;
    }
};
class m {
    constructor() {
        this.latexParser = new LatexParser;
    }
    getListTypeAsString(e) {
        return e instanceof Array ? "unorder" : e;
    }
    toLatex(e, t) {
        t = PropUpdateHelper.update(t, {
            mathType: "mathjax",
            textType: this.getTextType(),
            convertedInfo: new f
        });
        var n = this.toLatexInner(e, t);
        var r = t.convertedInfo.getTheoremDefinition();
        var a = [];
        return r && a.push(r + "\n"),
        a.push(n),
        a.join("\n");
    }
    getTextType() {
        return "plain";
    }
    toLatexFromEditor(e, t, n) {
        return this.toLatexInner(e.lines, t, n);
    }
    toLatexInner(e, t, n) {
        var r = {
            indents: [],
            lastSectionIndentIndex: -1,
            currentStr: "",
            align: null
        };
        var a = null;
        var i = 0;
        var o = e.length;
        for (; i < o; i++) {
            var s = e[i];
            var l = (n && n.normalLinePrefix || "") + this.toLatexLineExtended(s, t);
            var d = StyleHelper.getLineStyle(s, "listType", void 0);
            if (null != d && r.align) {
                r = this.handleLineAlign(r, void 0);
            }
            r = "order" == d || "unorder" == d || d instanceof Array ? this.processListItem(s, l, d, r) : "section" == d ? this.processSection(s, l, r) : t.inMathExpression ? this.toLatexMathLine(s, l, r, a, t) : this.toLatexTextLine(s, l, r, a, t);
            a = s;
        }
        if (r.align && (r = this.handleLineAlign(r, void 0)), r.currentStr += this.popAllIndents(r), t.inMathExpression && e.length > 1 && (!n || !n.ignoreWrapMultiline)) {
            var h = t.displayMode ? "{>{\\displaystyle}l}" : "l";
            r.currentStr = this.surroundByLine(r.currentStr, " \\begin{array}{".concat(h, "}"), "\\end{array}");
        }
        return r.currentStr;
    }
    toLatexMathLine(e, t, n, r, a) {
        var i = "" == n.currentStr ? "" : "\\\\\n";
        var o = StyleHelper.getLineStyle(e, "align");
        return "left" == o && (o = void 0),
        (n = this.handleLineAlign(n, o)).currentStr += i + t,
        n;
    }
    popAllIndentsIfExists(e) {
        return e.indents.length - 1 >= 0 && (e.currentStr += this.popAllIndents(e)),
        e;
    }
    getNewLine(e) {
        return e.newLineUsingBackSlash ? "\\\\" : "\n\n";
    }
    toLatexTextLine(e, t, n, r, a) {
        var i = "" == n.currentStr ? "" : this.getNewLine(a);
        var o = StyleHelper.getLineStyle(e, "align");
        return "left" == o && (o = void 0),
        (n = this.popAllIndentsIfExists(n)).align != o && (i = ""),
        n = this.handleLineAlign(n, o),
        BlockHelper.isSingeLineBlockInLine(e) && (i = "\n"),
        r && BlockHelper.isSingeLineBlockInLine(r) && (i = "\n"),
        n.currentStr += i + t,
        n;
    }
    processSection(e, t, n) {
        n = this.popAllIndentsIfExists(n);
        var r = StyleHelper.getLineTempOrStoreIndent(e, 0);
        var a = "";
        return a = 0 === r ? "section" : 1 === r ? "subsection" : "subsubsection",
        n.currentStr += "\n\\".concat(a, "{").concat(t, "}"),
        n;
    }
    processListItem(e, t, n, r) {
        var a = StyleHelper.getLineStyle(e, "listTypeSkip", false);
        var i = StyleHelper.lineStyleToLatex("listType", n);
        var o = r.indents.length - 1;
        var s = StyleHelper.getLineTempOrStoreIndent(e, 0);
        return o < s ? (r.currentStr += "\n\\begin{".concat(i, "}"), r.indents.push(i)) : o === s ? r = this.changeListItemIfDiffent(r, i) : (r.currentStr += this.popAllIndents(r, o - s), r = this.changeListItemIfDiffent(r, i)),
        r.currentStr += a ? "\n\n" : "\n\\item ",
        r.currentStr += t,
        r;
    }
    handleLineAlign(e, t) {
        return e.align && t && e.align != t && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "\\end{".concat(StyleHelper.lineStyleToLatex("align", e.align), "}")), e.currentStr += "\n\\begin{".concat(StyleHelper.lineStyleToLatex("align", t), "}\n")),
        !e.align && t && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "\\begin{".concat(StyleHelper.lineStyleToLatex("align", t), "}\n"))),
        e.align && !t && (e.currentStr = this.addNewLineStrAtEnd(e.currentStr, "\\end{".concat(StyleHelper.lineStyleToLatex("align", e.align), "}\n"))),
        e.align = t,
        e;
    }
    surroundByLine(e, t, n) {
        return this.addNewLineStrAtStart(this.addNewLineStrAtEnd(e, n), t);
    }
    addNewLineStrAtStart(e, t) {
        return e ? "\n" == e[0] ? t + e : t + "\n" + e : t;
    }
    addNewLineStrAtEnd(e, t) {
        return e ? "\n" == e[e.length - 1] ? e + t : e + "\n" + t : t;
    }
    changeListItemIfDiffent(e, t) {
        var n = _.last(e.indents);
        return t != n && (e.currentStr += "\n\\end{".concat(n, "}\n\\begin{").concat(t, "}")),
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
            var r = e.indents.pop();
            n = n + "\n\\end{".concat(r, "}");
            t--;
        }
        return n;
    }
    toModel(e, t) {
        return this.latexParser.parse(e, t);
    }
    toLatexLineExtended(e, t) {
        var n = e.blocks;
        var r = _.map(n, (e) => {
            return {
                block: e,
                styles: [],
                closeBraceTotal: 0,
                closeStyles: []
            };
        });
        l.partition(e.blocks).forEach((e) => {
            r[e.start].styles.push({
                key: e.key,
                value: e.value
            });
            r[e.end].closeBraceTotal += 1;
            r[e.end].closeStyles.unshift({
                key: e.key,
                value: e.value
            });
        });
        var i = [];
        var o = 0;
        for (; o < r.length; o++) {
            var s = r[o];
            var c = {
                latexArray: i,
                blockIndex: o,
                wrapBlocks: r
            };
            if (i = t.inMathExpression ? this.appendStyleBeginForMath(s, i) : this.appendStyleBeginForText(s, i), "composite" == s.block.type || "single" == s.block.type) {
                var d = t.inMathExpression ? this.processNonTextForMathMode(s, t, c) : this.processNonTextForTextMode(s, t, c);
                i = this.pushIfNotEmpty(i, d);
            } else {
                i = "unknown-command" == s.block.type ? this.pushIfNotEmpty(i, s.block.text + " ") : true === t.inMathExpression ? this.pushIfNotEmpty(i, this.processTextForMathMode(i, s.block.text, t.customMappingSymbols)) : this.pushIfNotEmpty(i, this.processTextForTextMode(i, s.block.text));
            }
            i = t.inMathExpression ? this.appendStyleEndForMath(s, i) : this.appendStyleEndForText(s, i);
        }
        var h = i.join("");
        return !t.inMathExpression && t.tikzNode && this.startWithHyphen(h) ? h.replace("-", "\\mbox{-}") : h;
    }
    pushIfNotEmpty(e, t) {
        return t ? _.isString(t) ? (e.push(t), e) : t.arrStr || e : e;
    }
    startWithHyphen(e) {
        return "-" == e.trim()[0] && "-" != e.trim()[1];
    }
    appendStyleBeginForMath(e, t) {
        return this.appendStyleBegin(e, t);
    }
    appendStyleEndForMath(e, t) {
        return this.appendStyleEnd(e, t);
    }
    appendStyleBeginForText(e, t) {
        return this.appendStyleBegin(e, t);
    }
    appendStyleEndForText(e, t) {
        return this.appendStyleEnd(e, t);
    }
    appendStyleBegin(e, t) {
        return e.styles.forEach((e) => {
            var n = StyleHelper.styleToLatex(e.key, e.value);
            if ("mathModeType" != e.key || "\\displaystyle" != e.value && "\\textstyle" != e.value) {
                t.push(n + "{");
            } else {
                t.push("{" + n + " ");
            }
        }),
        t;
    }
    appendStyleEnd(e, t) {
        return e.closeBraceTotal > 0 && t.push(_.times(e.closeBraceTotal, () => {
            return "}";
        }).join("") + ""),
        t;
    }
    processNonTextForTextMode(e, t, n) {
        return this.processNonTextForAll(e, t, n);
    }
    processNonTextForMathMode(e, t, n) {
        return this.processNonTextForAll(e, t, n);
    }
    processNonTextForAll(e, t, n) {
        var r = InitHelper.getCustomSymbolComponent(e.block.text);
        if (null == r) {
            throw new Error("could not found composite block info");
        }
        if (r.isBracket && e.block.___normal) {
            if ("\\left." == e.block.text || "\\right." == e.block.text) {
                return "";
            }
            var o = r.toLatex(e.block, t, this, n);
            if ("string" != typeof o) {
                return "";
            }
            if (_.startsWith(o, "\\left")) {
                return o.substr(5);
            }
            if (_.startsWith(o, "\\right")) {
                return o.substr(6);
            }
        }
        return r.toLatex(e.block, t, this, n);
    }
    processTextForTextMode(e, t) {
        var n = TextUtils.getUnistringUncached(t);
        var r = [];
        var a = false;
        var i = 0;
        for (; i < n.length; i++) {
            var o = n.clusterAt(i);
            if (" " != o) {
                a = false;
                var s = o.codePointAt(0);
                if (s >= 48 && s <= 57 || s >= 65 && s <= 90 || s >= 97 && s <= 122) {
                    r.push(o);
                } else {
                    var l = this.getLatexForSpecialCharTextMode(o);
                    if (l) {
                        a = l.comsumeSpace;
                        r.push(l.text);
                    } else {
                        r.push(o);
                    }
                }
            } else {
                r.push(a ? "\\ " : " ");
                a = true;
            }
        }
        return "" + r.join("");
    }
    processTextForMathMode(e, t, n) {
        var r = TextUtils.getUnistringUncached(t);
        var a = this.getSpaceIfRequire(e);
        var i = [];
        var o = 0;
        for (; o < r.length; o++) {
            var s = r.clusterAt(o);
            if (" " != s) {
                if ("\u200a" != s) {
                    if ("\u2007" != s) {
                        if ("<" != s) {
                            if (">" != s) {
                                if ("\u03a9" != s) {
                                    if ("\u2227" != s) {
                                        if ("\u2228" != s) {
                                            var l = s.codePointAt(0);
                                            if (l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122) {
                                                i.push(s);
                                            } else {
                                                var c = this.getLatexForSpecialCharMathMode(s);
                                                if (c) {
                                                    i.push(c.text);
                                                } else {
                                                    var h = this.getForLatexTextCommand(s, n);
                                                    if (h) {
                                                        if ("\\vectimes" == h) {
                                                            h = "\\times";
                                                        }
                                                        i.push(h + " ");
                                                    } else {
                                                        i.push(s);
                                                    }
                                                }
                                            }
                                        } else {
                                            i.push("\\lor ");
                                        }
                                    } else {
                                        i.push("\\land ");
                                    }
                                } else {
                                    i.push("\\si{\\ohm}");
                                }
                            } else {
                                i.push(" " + s);
                            }
                        } else {
                            i.push(s + " ");
                        }
                    } else {
                        i.push("\\kern+0.4em ");
                    }
                } else {
                    i.push("\\kern+0.01em ");
                }
            } else {
                i.push("\\ ");
            }
        }
        return a + i.join("");
    }
    buildLatexInfo(e) {
        return {
            text: e,
            comsumeSpace: arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
        };
    }
    getForLatexTextCommand(e, t) {
        if (t) {
            var n = t.find((t) => {
                return !t.type && t.symbol === e;
            });
            if (n) {
                return n.names[0];
            }
        }
        return InitHelper.getLatexTextCommandFromUnicode(e);
    }
    getLatexForSpecialCharTextMode(e) {
        switch (e) {
        case "$":
            return this.buildLatexInfo("\\$");
        case "&":
            return this.buildLatexInfo("\\&");
        case "%":
            return this.buildLatexInfo("\\%");
        case "#":
            return this.buildLatexInfo("\\#");
        case "_":
            return this.buildLatexInfo("\\_");
        case "{":
            return this.buildLatexInfo("\\{");
        case "}":
            return this.buildLatexInfo("\\}");
        case "~":
            return this.buildLatexInfo("\\textasciitilde ", true);
        case "^":
            return this.buildLatexInfo("\\textasciicircum ", true);
        case "\\":
            return this.buildLatexInfo("\\textbackslash ", true);
        }
        return null;
    }
    getLatexForSpecialCharMathMode(e) {
        switch (e) {
        case "\u2206":
            return this.buildLatexInfo("\\Delta ");
        case "$":
            return this.buildLatexInfo("\\$");
        case "&":
            return this.buildLatexInfo("\\&");
        case "%":
            return this.buildLatexInfo("\\%");
        case "#":
            return this.buildLatexInfo("\\#");
        case "_":
            return this.buildLatexInfo("\\_");
        case "{":
            return this.buildLatexInfo("\\{");
        case "}":
            return this.buildLatexInfo("\\}");
        case "~":
            return this.buildLatexInfo("\\sim ");
        case "^":
            return this.buildLatexInfo("\\hat{}");
        case "\\":
            return this.buildLatexInfo("\\backslash ");
        }
        return null;
    }
    getSpaceIfRequire(e) {
        if (0 === e.length) {
            return "";
        }
        var t = e[e.length - 1];
        return t && (" " == t[t.length - 1] || "\n" == t[t.length - 1] || "{" == t[t.length - 1]) ? "" : " ";
    }
}
class f {
    constructor() {
        this.unSupportedLatexes = [];
        this.preambles = [];
        this.theoremKeys = [];
    }
    addUnSupportedLatex(e) {
        if (! (this.unSupportedLatexes.indexOf(e) >= 0)) {
            this.unSupportedLatexes.push(e);
        }
    }
    addPreable(e) {
        if (! (this.preambles.indexOf(e) >= 0)) {
            this.preambles.push(e);
        }
    }
    addRequiredTheorem(e, t) {
        this.theoremInfo = t;
        if (! (this.theoremKeys.indexOf(e) >= 0)) {
            this.theoremKeys.push(e);
        }
    }
    getTheoremDefinition() {
        return this.theoremKeys.length <= 0 ? "" : TheoremHelper.toLatex(this.theoremKeys, this.theoremInfo);
    }
}
var LatexConverterBase = new m

export { m as LatexConverterBaseA }

export default LatexConverterBase