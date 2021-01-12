import _ from 'lodash';
import { Promise } from 'bluebird';
import FontHelper from './FontHelper';
import MathGlobal from '../MathGlobal';

/// xxx(449) /*VectorFontLoader*/

/// var r = n(28)/*MathGlobal*/;  // 1 times
/// var a = n(30)/*blubirdjs*/;  // 3 times
/// var i = n.n(a);
/// var o = n(145)/*FontHelper*/;  // 5 times
/// var s = n(2)/*lodash*/;  // 4 times
/// var l = n.n(s);
var VectorFontLoader = new class {
    constructor() {
        this.loadedMap = {};
        this.loadingMap = {}
    }
    loadFontDataIfRequire(e, t, n) {
        var r = FontHelper.parseFontInfo(e);
        return "not-found" == r.fontMode || "system-text-mode" == r.fontMode ? null : this.loadFontsDataFromFamilyNames([r.baseFontFamily]).then(() => {
            var r = FontHelper.constructFullFontName(e, {
                bold: t,
                italic: n
            });
            return this.findByExactName(r)
        })
    }
    findByExactName(e) {
        for (var t in this.loadedMap) if (this.loadedMap.hasOwnProperty(t)) {
            var n = this.loadedMap[t];
            if (n.fonts[e]) return n.fonts[e]
        }
    }
    loadFontsData(e) {
        return this.loadFontsDataFromFamilyNames(Array.from(e.foundFontFamilies.values()))
    }
    loadFontsDataFromFamilyNames(e) {
        return Promise.map(e, e => {
            var t = FontHelper.parseFontInfo(e);
            if ("system-text-mode" != t.fontMode && "not-found" != t.fontMode) {
                if (this.loadedMap[e]) return this.loadedMap[e];
                if (this.loadingMap[e]) return this.loadingMap[e];
                console.log("fonts data no cache hit");
                var n = this.loadFont(t).then(t => (this.loadingMap[e] && (this.loadingMap[e] = void 0), t));
                return this.loadingMap[e] = n,
                n
            }
        }).then(e => {
            var t = e.filter(e => e);
            t.forEach(e => {
                this.loadedMap[e.baseFamilyName] = e
            });
            var n = _.flatMap(t, e => _.values(e.fonts));
            return _.keyBy(n, e => e.fullName)
        })
    }
    loadFont(e) {
        var t = FontHelper.getFontFullNameList(e.baseFontFamily);
        return Promise.map(t, e => {
            var t = FontHelper.getFontUrl(e);
            return this.loadFontFromUrl(e, t)
        }).then(t => ({
            baseFamilyName: e.baseFontFamily,
            fonts: _.keyBy(t, e => e.fullName)
        }))
    }
    loadFontFromUrl(e, t) {
        return Promise.resolve(fetch(MathGlobal.resolveStaticAssetPath(t)).then(e => e.arrayBuffer()).then(n => ({
            fullName: e,
            data: n,
            relativeUrl: t
        })))
    }
}

export default VectorFontLoader