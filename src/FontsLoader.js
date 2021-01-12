import { Promise } from 'bluebird';
import FontFaceObserver from 'fontfaceobserver';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import FontHelper from './Font/FontHelper';
import Global from './Global';

/// xxx(1554) /*FontsLoader*/

/// var xa = n(548)/*fontfaceobserver*/;  // 2 times
/// var Ia = n.n(xa);
/// var Ta = n(145)/*FontHelper*/;  // 2 times
/// var Aa = n(11)/*Global*/;  // 2 times
/// var Ne = n(30)/*blubirdjs*/;  // 7 times
/// var ke = n.n(Ne);
/// var Zt = n(35)/*slicedToArray*/;  // 1 times
/// var Xt = n.n(Zt);
/*n.d(t, "a", function () {
    return FontsLoader;
});*/
var FontsLoader = new class {
    constructor() {
        this.loadedSet = new Set(["Asana"]);
        this.loadFontTimeout = 1E4;
        this.mathCalCharToTest = "ABCDEFGHIJKLMNOPQRSTXYZW";
        try {
            if (Global.inNodeEnv() || Global.suppressPreloadFont()) {
                return void console.log("In Node Environment or suppress preload font");
            }
        } catch(e) {}
        setTimeout(() => {
            this.loadAllFonts();
        },
        4500);
    }
    loadAllFonts() {
        Promise.all(FontHelper.getAllFontsInfoNeedToDownload().map((e) => {
            return this.loadFontsInfo(e[1], e[0]);
        })).then(() => {
            console.log("loaded all other fonts");
        });
    }
    loadFonts(e) {
        return Promise.all(Array.from(e.foundFontFamilies.values()).map((e) => {
            return this.loadFontFullName(e);
        }));
    }
    loadFontsCssWith(e) {
        return Promise.all(e.map((e) => {
            return this.loadFontFullName(e);
        }));
    }
    loadFontFullName(e) {
        var t = FontHelper.fetchFontInfoOfFamily(e);
        var n = slicedToArray(t, 2);
        var r = n[0];
        var a = n[1];
        return this.loadedSet.has(r) ? Promise.resolve() : this.loadFontsInfo(a, r);
    }
    loadFontsInfo(e, t) {
        return Promise.all(e.map((e) => {
            switch (e.fontMode) {
            case "math-mode":
                return this.loadMathModeFont(e);
            case "text-mode":
                return this.loadTextModeFont(e);
            default:
                return null;
            }
        })).then(() => {
            this.loadedSet.add(t);
        });
    }
    loadTextModeFont(e) {
        return Promise.resolve((new FontFaceObserver(e.baseFontFamily, {
            weight: e.bold ? "bold" : void 0,
            style: e.italic ? "italic" : void 0
        })).load(null, this.loadFontTimeout));
    }
    loadMathModeFont(e) {
        return Promise.resolve((new FontFaceObserver(e.fullFontName)).load("Mathcal" == e.postfix ? this.mathCalCharToTest : null, this.loadFontTimeout));
    }
};

export default FontsLoader