import { LatexConverterBaseA } from './LatexConverterBase';
import ColorHelper from '../Mathcha/ColorHelper';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import Geometry from '../Geometry/Geometry';

/// xxx(193) /*LatexConverter*/

/*n.d(t, "a", function () {
    return l
});*/
/*n.d(t, "LatexConverterBase", function () {
    return LatexConverterBaseA
});*/
/// var r = n(177)/*LatexConverterBase*/;  // 3 times
/// var a = n(1)/*Geometry*/;  // 1 times
/// var i = n(25)/*ColorHelper*/;  // 1 times
/// var o = n(42)/*ColorTypeConverter*/;  // 1 times
function s(e) {
    return Geometry.round2(e)
}
var l = new class extends LatexConverterBaseA {
    appendStyleBeginForText(e, t) {
        return e.styles.forEach(e => {
            if ("isBold" == e.key) t.push("\\textbf{");
            else if ("isItalic" == e.key) t.push("\\textit{");
            else if ("textDecoration" == e.key)"underline" == e.value ? t.push("\\underline{") : "line-through" == e.value && t.push("\\st{");
            else if ("fontName" == e.key) {
                var n = e.value;
                "pcr" == n || "helvet" == n || "ptm" == n ? t.push("{\\fontfamily{".concat(e.value, "}\\selectfont ")) : t.push("{\\fontfamily{pcr}\\selectfont ")
            } else if ("fontSize" == e.key) t.push("{".concat(e.value, " "));
            else if ("color" == e.key) {
                var r = ColorHelper.colorAsArray(e.value, ColorTypeConverter.blackArr);
                t.push("\\textcolor[rgb]{".concat(s(r[0] / 255), ",").concat(s(r[1] / 255), ",").concat(s(r[2] / 255), "}{"))
            } else "hyperLink" == e.key ? t.push("\\href{".concat(this.sanitizeLink(e.value), "}{")) : "bgColor" == e.key && t.push("{")
        }),
        t
    }
    sanitizeLink(e) {
        return e.replace(/\\/g, "\\\\").replace(/\^/g, "\\^").replace(/\#/g, "\\#").replace(/\$/g, "\\$").replace(/\%/g, "\\%").replace(/\&/g, "\\&").replace(/\~/g, "\\~").replace(/\_/g, "\\_").replace(/\{/g, "\\{").replace(/\}/g, "\\}")
    }
    getTextType() {
        return "latex-latex"
    }
}

export { LatexConverterBaseA as LatexConverterBase }

export default l