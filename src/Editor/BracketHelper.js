
/// xxx(152) /*BracketHelper*/

var BracketHelper = new class {
    bracketWitdhFromHeight(a, b, n) {
        if (this.shouldUseSingleBracket(a, b)) return Math.round(b / 2.6);
        var r = this.fontSizeEmByHeight(a, b, n);
        return this.bracketWidthFromFontSize(b * r, a, n)
    }
    shouldUseSingleBracket(e, t) {
        return e <= 1.4 * t
    }
    getSymmetricBracketHeightInfo(e, t, n) {
        return {
            halfTop: e - n / 4,
            halfBottom: t + n / 4
        }
    }
    bracketWidthFromFontSize(e, t, n) {
        return "open-brace" == n || "close-brace" == n ? Math.round(.8 * e) : "top-brace" == n || "bottom-brace" == n ? Math.round(.6 * e) : "open-parenthesis" == n || "close-parenthesis" == n ? Math.round(.45 * e) : "open-bracket" == n || "close-bracket" == n ? Math.round(.43 * e) : "open-vert" == n || "close-vert" == n ? Math.round(.3 * e) : Math.round(.45 * e)
    }
    fontSizeEmByHeightForBrace(e, t) {
        return.6 + Math.min(.5, (e - t) / 140)
    }
    fontSizeEmByHeightForParenthesis(e, t) {
        return.8 + Math.min(.2, (e - t) / 250)
    }
    fontSizeEmByHeightForBracket() {
        return 1
    }
    fontSizeEmByHeight(e, t, n) {
        return "open-brace" == n || "close-brace" == n || "top-brace" == n || "bottom-brace" == n ? this.fontSizeEmByHeightForBrace(e, t) : "open-parenthesis" == n || "close-parenthesis" == n ? this.fontSizeEmByHeightForParenthesis(e, t) : "open-bracket" == n || "close-bracket" == n ? this.fontSizeEmByHeightForBracket() : 1
    }
    bracketNameToLatex(e) {
        switch (e) {
        case "open-brace":
            return "\\{";
        case "close-brace":
            return "\\}";
        case "open-bracket":
            return "[";
        case "close-bracket":
            return "]";
        case "open-parenthesis":
            return "(";
        case "close-parenthesis":
            return ")";
        case "open-vert":
            case "close-vert":
            return "|";
        case "open-Vert":
            case "close-Vert":
            return "\\Vert";
        case "open-angle":
            return "<";
        case "close-angle":
            return ">";
        case "open-uparrow":
            case "close-uparrow":
            return "\\uparrow";
        case "open-Uparrow":
            case "close-Uparrow":
            return "\\Uparrow";
        case "open-downarrow":
            case "close-downarrow":
            return "\\downarrow";
        case "open-Downarrow":
            case "close-Downarrow":
            return "\\Downarrow";
        case "open-updownarrow":
            case "close-updownarrow":
            return "\\updownarrow";
        case "open-Updownarrow":
            case "close-Updownarrow":
            return "\\Updownarrow";
        case "open-ceil":
            return "\\lceil";
        case "close-ceil":
            return "\\rceil";
        case "open-floor":
            return "\\lfloor";
        case "close-floor":
            return "\\rfloor";
        case "open-slash":
            return "\\/";
        case "close-slash":
            return "\\backslash";
        default:
            return "none"
        }
    }
    bracketNameUnicodeSymbol(e) {
        switch (e) {
        case "open-brace":
            return "{";
        case "close-brace":
            return "}";
        case "open-bracket":
            return "[";
        case "close-bracket":
            return "]";
        case "open-parenthesis":
            return "(";
        case "close-parenthesis":
            return ")";
        case "open-vert":
            case "close-vert":
            return "|";
        case "open-Vert":
            case "close-Vert":
            return "‖";
        case "open-angle":
            return "<";
        case "close-angle":
            return ">";
        case "open-uparrow":
            case "close-uparrow":
            return "↑";
        case "open-Uparrow":
            case "close-Uparrow":
            return "⇑";
        case "open-downarrow":
            case "close-downarrow":
            return "↓";
        case "open-Downarrow":
            case "close-Downarrow":
            return "⇓";
        case "open-updownarrow":
            case "close-updownarrow":
            return "↕";
        case "open-Updownarrow":
            case "close-Updownarrow":
            return "⇕";
        case "open-ceil":
            return "⌈";
        case "close-ceil":
            return "⌉";
        case "open-floor":
            return "⌊";
        case "close-floor":
            return "⌋";
        case "open-slash":
            return "/";
        case "close-slash":
            return "\\";
        default:
            return "none"
        }
    }
}

export default BracketHelper