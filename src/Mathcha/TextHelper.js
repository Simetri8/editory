import UpperOrLower from './UpperOrLower';

/// xxx(77) /*TextHelper*/

var r = UpperOrLower/*UpperOrLower*/;
class a {
    constructor(e, t, n) {
        this.canvas = e;
        this.width = n;
        this.context = this.canvas.getContext("2d");
        this.context.font = t
    }
    getText(e) {
        var t = this.width;
        var n = e.split(/\b|(?=\W)/);
        var r = this.context.measureText("...").width;
        var a = [];
        var i = 0;
        var o = 0;
        var s = 0;
        var l = false;
        var c = 0;
        for (; c < n.length; c++) {
            var d = n[c];
            var h = this.context.measureText(d);
            if (0 === s && ((i = i + h.width) > t ? s++:a.push(d)), 1 === s) {
                if ((o = o + h.width) > t - r) {
                    l = true;
                    break
                }
                a.push(d)
            }
        }
        e = a.join("");
        return l && (e = e + "..."),
        e
    }
}
var TextHelper = new class {
    constructor() {
        this.leftSignAlphabet = "bhlk";
        this.rightSignAlphabet = "df"
    }
    getMeasureCanvas() {
        return this.measureCanvas || (this.measureCanvas = window.document.createElement("canvas"), this.measureCanvas.style.width = "0px", this.measureCanvas.style.height = "0px"),
        this.measureCanvas
    }
    createTextEllipsisScope(e, t) {
        return new a(this.getMeasureCanvas(), e, t)
    }
    isUpperLeftSign(e) {
        return 1 === e.length && this.leftSignAlphabet.indexOf(e) >= 0
    }
    isUpperRightSign(e) {
        return 1 === e.length && this.rightSignAlphabet.indexOf(e) >= 0
    }
    isUpperSmall(e) {
        return !this.isAnyUpperBig(e)
    }
    isCompositeUpperSmall(e) {
        return e.type ? "composite" == e.type && void 0 : this.isUpperSmall(e.text)
    }
    isLowerSmall(e) {
        return !this.isAnyLowerBig(e)
    }
    isAnyUpperBig(e) {
        return this.isAnyUpperBigUni(e)
    }
    isAnyLowerBig(e) {
        return this.isAnyLowerBigUni(e)
    }
    isAnyLowerBigUni(e) {
        var t = 0;
        for (; t < e.length; t++) {
            var n = e.charCodeAt(t);
            var a = r[n];
            if ("b" == a || "l" == a) return true
        }
        return false
    }
    isAnyUpperBigUni(e) {
        var t = 0;
        for (; t < e.length; t++) {
            var n = e.charCodeAt(t);
            if (55349 === n) return true;
            var a = r[n];
            if ("b" == a || "u" == a) return true
        }
        return false
    }
    heightFromBaseLine(e) {
        return e - e / 6
    }
    bottomToBaseLine(e) {
        return e / 6
    }
    fontSizePercentageFromCommand(e) {
        if (!e) return 1;
        switch (e) {
        case "\\tiny":
            return.5;
        case "\\scriptsize":
            return.7;
        case "\\footnotesize":
            return.8;
        case "\\small":
            return.9;
        case "\\normalsize":
            return 1;
        case "\\large":
            return 1.2;
        case "\\Large":
            return 1.44;
        case "\\LARGE":
            return 17.28 / 10;
        case "\\huge":
            return 2.074;
        case "\\Huge":
            return 2.488
        }
        throw new Error("not implemented");
    }
}

export default TextHelper