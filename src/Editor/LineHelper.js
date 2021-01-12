import _ from 'lodash';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(80) /*LineHelper*/

/// var r = n(3);  // 2 times
/// var a = n.n(r);
/// var i = n(18)/*StyleHelper*/;  // 10 times
/// var o = n(7)/*PropUpdateHelper*/;  // 1 times
var s = ["\u2022", "\u2013", "*", "\u00b7"];
var l = ["\\1.", "\\a.", "\\i.", "\\A."];
var LineHelper = new class {
    getSupportedStyleNames() {
        return ["color", "fontSize", "isBold", "isItalic", "textDecoration"]
    }
    getUnorderBullet(e) {
        return 0 === e ? "\u2022 " : 1 === e ? "\u2013 " : 2 === e ? "* " : 3 === e ? "\u00b7 " : void 0
    }
    expandOrDefaultForOrder(e) {
        return e instanceof Array ? e : "unorder" == e ? s : l
    }
    expandOrDefaultForUnOrder(e) {
        return e instanceof Array ? e : "order" == e ? l : ["\u2022", "\u2013", "*", "\u00b7"]
    }
    toAlphabet(e) {
        return (e >= 26 ? this.toAlphabet((e / 26 >> 0) - 1) : "") + "abcdefghijklmnopqrstuvwxyz" [e % 26 >> 0]
    }
    toRoman(e) {
        var t = "";
        var n = [1E3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        var r = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        var a = 0;
        for (; a < n.length; a++) for (; e >= n[a];) {
            t = t + r[a];
            e = e - n[a]
        }
        return t
    }
    getOrderNumber(e, t) {
        return 0 === e ? t + 1 + ". " : 1 === e ? "(".concat(this.toAlphabet(t), ") ") : 2 === e ? "".concat(this.toRoman(t + 1).toLowerCase(), ". ") : 3 === e ? "".concat(this.toAlphabet(t).toUpperCase(), ". ") : void 0
    }
    getBuletText(e, t, n) {
        var r = (n = n || [])[t] || 0;
        var a = e[t] || "\\1.";
        if ("\\.1." == a) {
            var i = "";
            var o = 0;
            for (; o <= t; o++) i = i + "".concat(n[o] + 1, ".");
            return i + " "
        }
        switch (a) {
        case "\\1.":
            return "".concat(r + 1, ". ");
        case "\\01.":
            return r + 1 >= 10 ? "".concat(r + 1, ". ") : "0".concat(r + 1, ". ");
        case "\\1)":
            return "".concat(r + 1, ") ");
        case "\\a.":
            return "".concat(this.toAlphabet(r), ". ");
        case "\\a)":
            return "".concat(this.toAlphabet(r), ") ");
        case "\\A.":
            return "".concat(this.toAlphabet(r).toUpperCase(), ". ");
        case "\\A)":
            return "".concat(this.toAlphabet(r).toUpperCase(), ") ");
        case "\\i.":
            return "".concat(this.toRoman(r + 1).toLowerCase(), ". ");
        case "\\i)":
            return "".concat(this.toRoman(r + 1).toLowerCase(), ") ");
        case "\\I.":
            return "".concat(this.toRoman(r + 1).toUpperCase(), ". ");
        case "\\I)":
            return "".concat(this.toRoman(r + 1).toUpperCase(), ") ");
        default:
            return "".concat(a.startsWith("\\") ? (r + 1).toString() : a, " ")
        }
    }
    isOrderListType(e, t) {
        if ("order" == e) return true;
        if (e instanceof Array) {
            var n = e[t] || ".";
            return this.isOrderBullet(n)
        }
        return false
    }
    isUnOrderListType(e, t) {
        if ("unorder" == e) return true;
        if (e instanceof Array) {
            var n = e[t] || ".";
            return this.isUnOrderBullet(n)
        }
        return false
    }
    isOrderBullet(e) {
        return e.length > 1 && e.startsWith("\\")
    }
    isUnOrderBullet(e) {
        return !this.isOrderBullet(e)
    }
    isBulletListType(e) {
        return "order" == e || "unorder" == e || e instanceof Array
    }
    getSection(e, t) {
        t = t || [0, 0, 0, 0, 0];
        var n = "";
        var r = 0;
        for (; r <= e; r++) n = n + ((t[r] || 0) + 1 + ".");
        return n + " "
    }
    setBulletForLine(e, t) {
        var n;
        var r = StyleHelper.getLineStyle(e, "listType");
        var s = StyleHelper.getLineTempOrStoreIndent(e, 0);
        return n = this.isOrderBullet(t) ? this.expandOrDefaultForOrder(r) : this.expandOrDefaultForUnOrder(r),
        n = PropUpdateHelper.setIndex(n, s, t),
        _.assignIn({},
        e, {
            style: _.assignIn({},
            e.style, {
                listType: n
            })
        })
    }
    findHtmlLinesSameLevel(e, t) {
        var n = [];
        var r = StyleHelper.getLineTempOrStoreIndent(e.reactInstance.getLineData(), 0);
        var a = 0;
        for (; a < t.length; a++) {
            var o = t[a];
            if (StyleHelper.getLineTempOrStoreIndent(o.reactInstance.getLineData(), 0) == r) n.push(o)
        }
        return n
    }
    expandRelatedListItemHtmlLines(e) {
        var t = [];
        var n = e;
        for (;;) {
            var r = n.previousElementSibling;
            if (!r) break;
            var a = r.reactInstance.getLineData();
            if (!this.isBulletListType(StyleHelper.getLineStyle(a, "listType"))) break;
            t.unshift(r);
            n = r
        }
        var o = [];
        n = e;
        for (;;) {
            var s = n.nextElementSibling;
            if (!s) break;
            var l = s.reactInstance.getLineData();
            if (!this.isBulletListType(StyleHelper.getLineStyle(l, "listType"))) break;
            o.push(s);
            n = s
        }
        return t.concat(e).concat(o)
    }
    findRelatedListItemLinesByAction(e, t, n) {
        var r = this.expandRelatedListItemLines(e, t, t);
        var a = r.from;
        var i = r.to;
        var o = e.slice(a, i + 1);
        var s = [];
        if ("all" == n && (s = o), "level" == n) {
            var l = e[t];
            s = this.findLinesSameLevel(l, o)
        }
        return "single" == n && (s = [e[t]]),
        {
            scopeLineFrom: a,
            scopeLineTo: i,
            selectedLines: s,
            action: n
        }
    }
    expandRelatedListItemLines(e, t, n) {
        var r = t;
        var a = n;
        var o = t - 1;
        for (; o >= 0; o--) {
            var s = e[o];
            if (!this.isBulletListType(StyleHelper.getLineStyle(s, "listType"))) break;
            r = o
        }
        var l = n + 1;
        for (; l < e.length; l++) {
            var c = e[l];
            if (!this.isBulletListType(StyleHelper.getLineStyle(c, "listType"))) break;
            a = l
        }
        return {
            from: r,
            to: a
        }
    }
    findLinesSameLevel(e, t) {
        var n = [];
        var r = StyleHelper.getLineTempOrStoreIndent(e, 0);
        var a = 0;
        for (; a < t.length; a++) {
            var o = t[a];
            if (StyleHelper.getLineTempOrStoreIndent(o, 0) == r) n.push(o)
        }
        return n
    }
}

export default LineHelper