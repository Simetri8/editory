import { PageSettingsB } from './Mathcha/PageSettings';
import FontNames from './Font/FontNames';

/// xxx(1556) /*ModelFontAnalyzer*/

/// var va = n(462)/*PageSettings*/;  // 1 times
/// var Sa = n(114)/*FontNames*/;  // 1 times
var ModelFontAnalyzer = new class {
    analyze(e, t) {
        t = PageSettingsB.getOrDefault(t);
        var n = {
            foundFontFamilies: new Set,
            textModeDefaultFont: this.mapKeyFont(t.fontName, "helvet"),
            mathModeFont: this.mapKeyFont(t.mathFontName, "Asana")
        };
        n.foundFontFamilies.add(n.textModeDefaultFont);
        n.foundFontFamilies.add(n.mathModeFont);
        this.analyzeEditor(e, n);
        return n;
    }
    mapKeyFont(e, t) {
        return FontNames[e] || t;
    }
    analyzeEditor(e, t) {
        e.lines.forEach((e) => {
            this.analyzeLine(e, t);
        });
    }
    analyzeLine(e, t) {
        e.blocks.forEach((e) => {
            this.analyzeBlock(e, t);
        });
    }
    analyzeBlock(e, t) {
        if (e.type || this.analyzeEditorMap(e.elements, t), e.style) {
            var n = e.style;
            if (n.fontName) {
                t.foundFontFamilies.add(this.mapKeyFont(n.fontName, t.textModeDefaultFont));
            }
        }
    }
    analyzeEditorMap(e, t) {
        if (e) {
            var n;
            for (n in e) {
                if (e.hasOwnProperty(n)) {
                    this.analyzeEditor(e[n], t);
                }
            }
        }
    }
}
/*n.d(t, "a", function () {
    return ModelFontAnalyzer;
});*/

export default ModelFontAnalyzer