import classNames from 'classnames';
import CheckComponent from './CheckComponent';
import InitHelper from '../InitHelper';
import TextUtils from './TextUtils';

/// xxx(210) /*TextBlockInfo*/

/// var r = n(32)/*InitHelper*/;  // 2 times
/// var a = n(22)/*CheckComponent*/;  // 3 times
/// var i = n(36)/*TextUtils*/;  // 1 times
/// var o = n(14)/*classnames*/;  // 1 times
/// var s = n.n(o);
var TextBlockInfo = new class {
    getAbstractCategory(e) {
        switch (e) {
        case "Normal":
            case "Alphabetic":
            case "Diacritic":
            case "Fence":
            case "Glyph":
            case "Large":
            case "Space":
            case "Special":
            return "Normal";
        default:
            return e
        }
    }
    resolveVaryCategory(e, t) {
        var n = "Vary";
        if ("Vary" == n) {
            var r = e || null;
            switch (r) {
            case "Unary":
                case "Binary":
                n = r;
                break;
            case "Normal":
                case "Closing":
                n = "Binary"
            }
        }
        if ("Vary" == n && t.block) {
            var i = t.block;
            "composite" != i.type && i.type || (n = "Relation" == t.category || "OpOrFn" == t.category ? "Unary" : "Binary");
            "single" == i.type && CheckComponent.isCloseBlock(i) && (n = "Binary")
        }
        return "Vary" == n && (n = "Unary"),
        n
    }
    isNumber(e) {
        if (!e) return !1;
        if (1 === e.length) {
            var t = e.codePointAt(0);
            return t >= 48 && t <= 57
        }
        return !1
    }
    resolveDotCategory(e, t) {
        return this.isNumber(e) || this.isNumber(t) ? "Normal" : "Punctuation"
    }
    isSpace(e) {
        return " " == e || " " == e
    }
    getTextBlockInfo(e, t, n, a) {
        var i = [];
        var o = null;
        var s = null;
        var l = null;
        var c = 0;
        for (; c < t.length; c++) {
            var d = t.clusterAt(c);
            var h = void 0;
            if ("Vary" == (h = "." == d ? this.resolveDotCategory(t.clusterAt(c - 1), t.clusterAt(c + 1)) : this.getAbstractCategory(InitHelper.categoryByUnicodeChar(d)))) h = this.resolveVaryCategory(l, n);
            if ("|" == d && "z-spec" == a) h = "Binary";
            if (o && this.isRelatedCategory(o.category, h, s, d)) {
                o.text += d;
                o.category = h;
                s = d;
                l = this.isSpace(d) ? l : h
            } else {
                o = {
                    text: d,
                    category: h,
                    key: e.id + "" + c
                };
                i.push(o);
                s = d;
                l = this.isSpace(d) ? l : h
            }
        }
        return i
    }
    buildCloseLeftForOperatorName(e) {
        return e && e.block ? CheckComponent.isOpenClose(e.block) || e.isOperatorName ? "close-left" : this.isTextBlockQualifyToCloseToOperatorName(e.block, "last") ? "close-left" : "" : "close-left"
    }
    buildCloseRightForOperatorName(e) {
        return e && e.block ? CheckComponent.isOpenCloseOrPowerIndex(e.block) ? "close-right" : this.isTextBlockQualifyToCloseToOperatorName(e.block, "first") ? "close-right" : "" : ""
    }
    buildClassForOperatorName(e, t) {
        return classNames(this.buildCloseLeftForOperatorName(e), this.buildCloseRightForOperatorName(t))
    }
    isTextBlockQualifyToCloseToOperatorName(e, t) {
        if (!e.type == null) return !1;
        var n = TextUtils.getUnistring(e),
        o = "first" == t ? n.clusterAt(0) : n.clusterAt(n.length - 1),
        s = InitHelper.categoryByUnicodeChar(o);
        return "Binary" == s || "Closing" == s || "Opening" == s || "Relation" == s || "Space" == s || "Unary" == s || "Vary" == s
    }
    isRelatedCategory(e, t, n, r) {
        return null != e && null != t && (":" == n && "Relation" == t || "Relation" == e && ":" == r || n === r || (":" != n || "Relation" == t) && ("Relation" == e || ":" != r) && e === t)
    }
}

export default TextBlockInfo