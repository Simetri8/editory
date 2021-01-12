import BlockHelper from '../Elements/BlockHelper';
import CheckComponent from '../Editor/CheckComponent';
import PropUpdateHelper from './PropUpdateHelper';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(206) /*MathPlotSettingsBuilder*/

/// var r = n(22)/*CheckComponent*/;  // 2 times
/// var a = n(7)/*PropUpdateHelper*/;  // 1 times
/// var i = n(12)/*BlockHelper*/;  // 3 times
/// var o = n(15)/*TabularHelper*/;  // 3 times
var MathPlotSettingsBuilder = new class {
    editorWithMathModelToExpression(e) {
        return e ? (e = e.lines[0].blocks[0].elements.mathValue, this.editorModelToExpression(e)) : ""
    }
    editorModelToExpression(e) {
        if (!e) return "";
        for (var t = "", n = 0; n < e.lines.length; n++) for (var r = e.lines[n], a = this.preProcessBlocks(r.blocks), i = 0; i < a.length; i++) {
            var o = a[i];
            t += this.blockToFormula(o)
        }
        return t
    }
    preProcessBlocks(e) {
        for (var t = !0, n = [], i = 0; i < e.length; i++) {
            var o = e[i];
            if (o.type == null) {
                for (var s = o.text, l = "", c = 0; c < s.length; c++) {
                    var d = s[c];
                    if ("|" == d && "|" != s[c - 1] && "|" != s[c + 1]) {
                        l = l + (t ? "abs(": ")");
                        t = !t
                    } else l = l + d
                }
                n.push(PropUpdateHelper.setProp(o, "text", l))
            } else n.push(o)
        }
        return n
    }
    blockToFormula(e) {
        if (e.type == null) return this.replaceTextSymbol(e.text);
        var t = e;
        if (CheckComponent.isOpenClose(t)) return 1 === t.text.length ? t.text : "\\left\\lceil" == t.text ? "ceil(": "\\right\\rceil" == t.text ? ")" : "\\left\\lfloor" == t.text ? "floor(" : "\\right\\rfloor" == t.text ? ")" : "\\left|" == t.text ? "abs(" : "\\right|" == t.text ? ")" : "";
        var n = this.getMapFunction(e);
        if (n) return n;
        if (BlockHelper.isSqrtLatexName(t.text)) {
            var a = this.editorModelToExpression(t.elements.value);
            if (!BlockHelper.isEditorEmpty(t.elements.sub1)) {
                var o = this.editorModelToExpression(t.elements.sub1);
                return "(".concat(a, ")^(1/").concat(o, ")")
            }
            return "sqrt(".concat(a, ")")
        }
        if (BlockHelper.isFracClassLatexName(t.text)) {
            var s = this.editorModelToExpression(t.elements.value),
            l = this.editorModelToExpression(t.elements.sub1);
            return "((".concat(s, ")/(").concat(l, "))")
        }
        return "\\power" == t.text || "\\power-index" == t.text ? "^(".concat(this.editorModelToExpression(t.elements.powerValue), ")") : CheckComponent.isPlotCases(t) ? this.processPlotCases(t) : ""
    }
    processPlotCases(e) {
        for (var t = [], n = 0; n < e.row; n++) {
            var r = e.elements[TabularHelper.getKeyFromRowCol(n, 0)],
            a = this.editorModelToExpression(r),
            i = this.editorModelToExpression(e.elements[TabularHelper.getKeyFromRowCol(n, 1)]),
            s = this.editorModelToExpression(e.elements[TabularHelper.getKeyFromRowCol(n, 2)]);
            t.push({
                result: a,
                condition: "".concat(i, " ").concat(this.comparisonToStr(r.comparison), " ").concat(s)
            })
        }
        return this.buildConditionExpression(t)
    }
    comparisonToStr(e) {
        if (!e) return ">";
        switch (e) {
        case "≤":
            return "<=";
        case "≥":
            return ">=";
        case "=":
            return "==";
        case "≠":
            return "!=";
        default:
            return e
        }
    }
    buildConditionExpression(e) {
        for (var t = null, n = e.length - 1; n >= 0; n--) {
            var r = e[n],
            a = t || " NotANumber() ";
            t = "((".concat(r.condition, ")?((").concat(r.result, ")+breakMark(").concat(n, ")) : ").concat(a, " )")
        }
        return t
    }
    replaceTextSymbol(e) {
        return e.replace(/×/g, "*").replace(/𝜋/g, "(pi)").replace(/°/g, " deg ")
    }
    getMapFunction(e) {
        switch (e.text) {
        case "\\acos":
            return "acos ";
        case "\\acosh":
            return "acosh ";
        case "\\acot":
            return "acot ";
        case "\\acoth":
            return "acoth ";
        case "\\asec":
            return "asec ";
        case "\\asech":
            return "asech ";
        case "\\asin":
            return "asin ";
        case "\\asinh":
            return "asinh ";
        case "\\atan":
            return "atan ";
        case "\\atanh":
            return "atanh ";
        case "\\cos":
            return "cos ";
        case "\\cosh":
            return "cosh ";
        case "\\cot":
            return "cot ";
        case "\\coth":
            return "coth ";
        case "\\csc":
            case "\\cosec":
            return "csc ";
        case "\\csch":
            return "csch ";
        case "\\sec":
            return "sec ";
        case "\\sech":
            return "sech ";
        case "\\sin":
            return "sin ";
        case "\\sinh":
            return "sinh ";
        case "\\tan":
            return "tan ";
        case "\\tanh":
            return "tanh ";
        case "\\abs":
            return "abs ";
        case "\\log2":
            return "log2 ";
        case "\\log10":
            return "log10 ";
        case "\\ln":
            return "ln ";
        case "\\max":
            return "max ";
        case "\\min":
            return "min ";
        case "\\mod":
            return "mod ";
        case "\\floor":
            return "floor ";
        case "\\ceil-fun":
            return "ceil "
        }
        return ""
    }
    buildMathPlotSettings(e, t, n, r, a) {
        var i = e.p1,
        o = e.p2,
        s = o.x - i.x,
        l = o.y - i.y,
        c = {
            from: 0,
            to: s / t
        };
        return {
            viewWidth: s,
            viewHeight: l,
            xDomain: c,
            yDomain: {
                from: 0,
                to: l * (c.to - c.from) / s
            },
            xScale: t,
            yScale: n,
            centerDelta: {
                x: r / t,
                y: a / n
            },
            unscaledCenterDelta: {
                x: r,
                y: a
            },
            startPoint: i
        }
    }
}

export default MathPlotSettingsBuilder