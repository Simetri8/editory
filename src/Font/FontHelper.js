import _ from 'lodash';
import { FontNamesC, FontNamesD, FontNamesB } from './FontNames';

/// xxx(145) /*FontHelper*/

/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(114)/*FontNames*/;  // 16 times
var FontHelper = new class {
    constructor() {
        this.systemFonts = new Set(["pcr", "helvet", "ptm"]);
        this.downloadTextModeFonts = new Set(["Computer Modern Serif", "Computer Modern Sans", "Computer Modern Typewriter"]);
        this.mathModeFonts = new Set(["Asana", "LatinModern"])
    }
    isFontLoadable(e) {
        var t = this.parseFontInfo(e);
        return "not-found" != t.fontMode && "system-text-mode" != t.fontMode
    }
    isTextModeFontBold(e) {
        var t = this.parseFontInfo(e);
        return "text-mode" == t.fontMode && t.bold
    }
    isTextModeFontItalic(e) {
        var t = this.parseFontInfo(e);
        return "text-mode" == t.fontMode && t.italic
    }
    isSystemFont(e) {
        return this.systemFonts.has(e)
    }
    isTextModeFont(e) {
        var t = this.parseFontInfo(e);
        return "system-text-mode" == t.fontMode || "text-mode" == t.fontMode
    }
    isMathModeFont(e) {
        return "math-mode" == this.parseFontInfo(e).fontMode
    }
    getFontFullNameList(e) {
        var t = this.parseFontInfo(e);
        if ("not-found" == t.fontMode || "system-text-mode" == t.fontMode) return [e];
        if ("math-mode" == t.fontMode) return this.getMathFontFullNames(t.baseFontFamily);
        if ("text-mode" == t.fontMode) return this.getTextFontFullNames(t.baseFontFamily);
        throw new Error("Should not be here")
    }
    getTextFontFullNames(e) {
        return [e, Object(FontNamesC)(e, {
            bold: !0
        }), Object(FontNamesC)(e, {
            italic: !0
        }), Object(FontNamesC)(e, {
            bold: !0,
            italic: !0
        })]
    }
    getMathFontFullNames(e) {
        return [Object(FontNamesD)(e), Object(FontNamesD)(e, "Math"), Object(FontNamesD)(e, "Mathbb"), Object(FontNamesD)(e, "Mathit"), Object(FontNamesD)(e, "Mathcal"), Object(FontNamesD)(e, "Mathscr"), Object(FontNamesD)(e, "Mathfrak"), Object(FontNamesD)(e, "Mathsf"), Object(FontNamesD)(e, "Mathtt"), Object(FontNamesD)(e, "Mathrm")]
    }
    getFontUrl(e) {
        return FontNamesB[e]
    }
    getAllFontsInfoNeedToDownload() {
        return [this.fetchFontInfoOfFamily("Computer Modern Sans"), this.fetchFontInfoOfFamily("Computer Modern Serif"), this.fetchFontInfoOfFamily("Computer Modern Typewriter"), this.fetchFontInfoOfFamily("LatinModern")]
    }
    parseTextModeFontInfo(e, t) {
        return {
            fontMode: "text-mode",
            baseFontFamily: t,
            bold: e.endsWith("-Bold-Italic") || e.endsWith("-Bold"),
            italic: e.endsWith("-Bold-Italic") || e.endsWith("-Italic")
        }
    }
    findMathPostfix(e) {
        return e.endsWith("Mathbb") ? "Mathbb" : e.endsWith("Mathit") ? "Mathit" : e.endsWith("Mathcal") ? "Mathcal" : e.endsWith("Mathscr") ? "Mathscr" : e.endsWith("Mathfrak") ? "Mathfrak" : e.endsWith("Mathsf") ? "Mathsf" : e.endsWith("Mathtt") ? "Mathtt" : e.endsWith("Mathrm") ? "Mathrm" : e.endsWith("Math") ? "Math" : null
    }
    parseMathModeFontInfo(e, t) {
        return {
            fontMode: "math-mode",
            baseFontFamily: e,
            postfix: this.findMathPostfix(t),
            fullFontName: t
        }
    }
    makeMathFontParsedInfo(e, t) {
        return {
            fontMode: "math-mode",
            baseFontFamily: e.baseFontFamily,
            fullFontName: Object(FontNamesD)(e.baseFontFamily, t),
            postfix: t
        }
    }
    fetchFontInfoOfFamily(e) {
        var t = this.parseFontInfo(e);
        switch (t.fontMode) {
        case "math-mode":
            return [t.baseFontFamily, [this.makeMathFontParsedInfo(t, null), this.makeMathFontParsedInfo(t, "Math"), this.makeMathFontParsedInfo(t, "Mathbb"), this.makeMathFontParsedInfo(t, "Mathit"), this.makeMathFontParsedInfo(t, "Mathcal"), this.makeMathFontParsedInfo(t, "Mathscr"), this.makeMathFontParsedInfo(t, "Mathfrak"), this.makeMathFontParsedInfo(t, "Mathsf"), this.makeMathFontParsedInfo(t, "Mathtt"), this.makeMathFontParsedInfo(t, "Mathrm")]];
        case "text-mode":
            return [t.baseFontFamily, [_.assignIn({},
            t, {
                bold: !1,
                italic: !1
            }), _.assignIn({},
            t, {
                bold: !0,
                italic: !1
            }), _.assignIn({},
            t, {
                bold: !1,
                italic: !0
            }), _.assignIn({},
            t, {
                bold: !0,
                italic: !0
            })]];
        case "system-text-mode":
            case "not-found":
            return [e, [t]]
        }
    }
    constructFullFontName(e, t) {
        var n = this.parseFontInfo(e);
        return "not-found" == n.fontMode || "system-text-mode" == n.fontMode ? e : "math-mode" == n.fontMode ? e : "text-mode" == n.fontMode ? Object(FontNamesC)(n.baseFontFamily, t) : void 0
    }
    parseFontInfo(e) {
        if (!e) return {
            fontMode: "not-found",
            name: e
        };
        if (this.isSystemFont(e)) return {
            fontMode: "system-text-mode",
            name: e
        };
        var t = Array.from(this.downloadTextModeFonts.values()).find(t => e.startsWith(t));
        if (t) return this.parseTextModeFontInfo(e, t);
        var n = Array.from(this.mathModeFonts.values()).find(t => e.startsWith(t));
        return n ? this.parseMathModeFontInfo(n, e) : {
            fontMode: "not-found",
            name: e
        }
    }
}

export default FontHelper