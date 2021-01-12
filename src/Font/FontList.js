
/// xxx(48) /*FontList*/

var FontList = new class {
    asanaMathFontFamiltyFromKey(e) {
        switch (e) {
        case "raw":
            return "Asana";
        case "\\boldsymbol":
            return "Asana-Math,Asana";
        case "\\mathbf":
            return "Asana-Mathrm,Asana-Math,Asana";
        case "\\mathit":
            return "Asana-Mathit,Asana-Math,Asana";
        case "\\mathbb":
            return "Asana-Mathbb,Asana-Math,Asana";
        case "\\mathcal":
            return "Asana-Mathcal,Asana-Math,Asana";
        case "\\mathfrak":
            return "Asana-Mathfrak,Asana-Math,Asana";
        case "\\mathsf":
            return "Asana-Mathsf,Asana-Math,Asana";
        case "\\mathtt":
            return "Asana-Mathtt,Asana-Math,Asana";
        case "\\mathscr":
            return "Asana-Mathscr,Asana-Math,Asana";
        case "\\mathnormal":
            return "Asana-Math,Asana";
        case "\\mathrm":
            return "Asana-Mathrm,Asana-Math,Asana";
        case "\\text":
            return "arial,verdana,geneva,lucida,'lucida grande',arial,helvetica,sans-serif"
        }
        return "Asana-Math,Asana"
    }
    latinModernMathFontFamiltyFromKey(e) {
        switch (e) {
        case "raw":
            return "LatinModern,Asana";
        case "\\boldsymbol":
            return "LatinModern-Math,LatinModern,Asana-Math,Asana";
        case "\\mathbf":
            return "LatinModern-Mathrm,LatinModern-Math,LatinModern,Asana";
        case "\\mathit":
            return "LatinModern-Mathit,LatinModern-Math,LatinModern,Asana";
        case "\\mathbb":
            return "LatinModern-Mathbb,LatinModern-Math,LatinModern,Asana";
        case "\\mathcal":
            return "LatinModern-Mathcal,LatinModern-Math,LatinModern,Asana";
        case "\\mathfrak":
            return "LatinModern-Mathfrak,LatinModern-Math,LatinModern,Asana";
        case "\\mathsf":
            return "LatinModern-Mathsf,LatinModern-Math,LatinModern,Asana";
        case "\\mathtt":
            return "LatinModern-Mathtt,LatinModern-Math,LatinModern,Asana";
        case "\\mathscr":
            return "LatinModern-Mathscr,LatinModern-Math,LatinModern,Asana";
        case "\\mathnormal":
            return "LatinModern-Math,LatinModern,Asana-Math,Asana";
        case "\\mathrm":
            return "LatinModern-Mathrm,LatinModern-Math,LatinModern,Asana";
        case "\\text":
            return "arial,verdana,geneva,lucida,'lucida grande',arial,helvetica,sans-serif"
        }
        return "LatinModern-Math,LatinModern,Asana-Math,Asana"
    }
    mathFontFamiltyFromKey(e, t) {
        return t && "LatinModern" == t ? this.latinModernMathFontFamiltyFromKey(e) : this.asanaMathFontFamiltyFromKey(e)
    }
    textFontFamilyFromKey(e) {
        switch (e) {
        case "default":
            return "'Times New Roman',Times,serif";
        case "pcr":
            return "Courier New,Courier,monospace";
        case "helvet":
            return "Arial,Helvetica,sans-serif";
        case "ptm":
            return "'Times New Roman',Times,serif";
        case "cmun-serif":
            return "Computer Modern Serif,serif";
        case "cmun-sans":
            return "Computer Modern Sans,serif";
        case "cmun-typewriter":
            return "Computer Modern Typewriter,serif"
        }
        return "'Times New Roman',Times,serif"
    }
    textFontDisplayFromKey(e) {
        switch (e) {
        case "default":
            return "(font default)";
        case "pcr":
            return "Courier New";
        case "helvet":
            return "Arial";
        case "ptm":
            return "Times New Roman";
        case "cmun-serif":
            return "Computer Modern Serif";
        case "cmun-sans":
            return "Computer Modern Sans";
        case "cmun-typewriter":
            return "Computer Modern Typewriter"
        }
        return "Times New Roman"
    }
}

export default FontList