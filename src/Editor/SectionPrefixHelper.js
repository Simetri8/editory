import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(208) /*SectionPrefixHelper*/

/// var r = n(18)/*StyleHelper*/;  // 1 times
var SectionPrefixHelper = new class {
    findCurrentSectionInfo(e, t) {
        var n = this.findSectionString(t, e);
        return this.parseSectionStr(n)
    }
    buildPrefix(e, t, n) {
        var r = this.findCurrentSectionInfo(e, t);
        return this.buildNumberPrefixForSection(r, n)
    }
    parseSectionStr(e) {
        var t = (e = e.trim()).split(".").filter(e => e);
        return {
            maxLevel: t.length,
            level1: t[0],
            level2: t[1],
            level3: t[2]
        }
    }
    buildNumberPrefixForSection(e, t) {
        var n = "";
        return 1 === t && (n += (e.level1 || "0") + "."),
        2 === t ? (n += (e.level1 || "0") + ".", n += (e.level2 || "0") + ".") : 3 === t && (n += (e.level1 || "0") + ".", n += (e.level2 || "0") + ".", n += (e.level3 || "0") + "."),
        n
    }
    findSectionString(e, t) {
        for (var n = e.indexOf(t); n >= 0;) {
            var a = e[n].reactInstance.getLineData();
            if ("section" == StyleHelper.getLineStyle(a, "listType")) return a.___prefixText;
            n--
        }
        return ""
    }
}

export default SectionPrefixHelper