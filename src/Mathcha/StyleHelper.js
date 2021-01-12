import _ from 'lodash';
// Not found 'var' for: import  from '../Editor/CheckComponent';
import ArrayHelper from './ArrayHelper';
import BlockHelper from '../Elements/BlockHelper';
import CheckObject from '../Editor/CheckObject';
import ColorHelper from './ColorHelper';
import ColorTypeConverter from './ColorTypeConverter';
import FontList from '../Font/FontList';
import Geometry from '../Geometry/Geometry';
import Global from '../Global';
import IntersectStyleChecker from '../Elements/IntersectStyleChecker';
import TabularHelper from '../Tabular/TabularHelper';
import TabularUtils from '../Tabular/TabularUtils';

/// xxx(18) /*StyleHelper*/

function v(e) {
    return Geometry.round2(e);
}
function runNow(e) {
    e[e.None = 0] = "None";
    e[e.Left = 1] = "Left";
    e[e.Top = 2] = "Top";
    e[e.Right = 4] = "Right";
    e[e.Bottom = 8] = "Bottom";
    e[e.Full = 15] = "Full";
}
var r;
/// var a = n(3);  // 11 times
/// var i = n.n(a);
/// var o = n(2)/*lodash*/;  // 15 times
/// var s = n.n(o);
/// var l = n(22)/*CheckComponent*/;  // 0 times
/// var c = n(25)/*ColorHelper*/;  // 1 times
/// var d = n(12)/*BlockHelper*/;  // 3 times
/// var h = n(45)/*TabularUtils*/;  // 10 times
/// var u = n(1)/*Geometry*/;  // 1 times
/// var p = n(252)/*IntersectStyleChecker*/;  // 3 times
/// var m = n(11)/*Global*/;  // 1 times
/// var f = n(42)/*ColorTypeConverter*/;  // 3 times
/// var g = n(48)/*FontList*/;  // 2 times
/// var y = n(15)/*TabularHelper*/;  // 14 times
/// var A = n(31)/*CheckObject*/;  // 2 times
/// var E = n(43)/*ArrayHelper*/;  // 4 times
/*n.d(t, "c", function () {
    return v;
});*/
/*n.d(t, "a", function () {
    return r;
});*/
runNow(r || (r = {}));
var S = "rgb(17,85,204)";
var C = "rgb(0,0,0)";
var x = ["fontName", "mathType", "fontSize"];
var StyleHelper = new class {
    normalizeStyle(e) {
        if (!e) {
            return e;
        }
        var t = null;
        var n;
        for (n in e) {
            if (e.hasOwnProperty(n) && void 0 === e[n]) {
                delete(t = t || _.clone(e))[n];
            }
        }
        return t || e;
    }
    setEditorsStyleForRow(e, t, n, r) {
        var a = _.range(0, e.column).map((e) => {
            return TabularHelper.getKeyFromRowCol(t, e);
        });
        return TabularUtils.modifyEditors(e, a, (e) => {
            return this.setStyleToEditor(e, n, r);
        });
    }
    setEditorsStyleForColumn(e, t, n, r) {
        var a = _.range(0, e.row).map((e) => {
            return TabularHelper.getKeyFromRowCol(e, t);
        });
        return TabularUtils.modifyEditors(e, a, (e) => {
            return this.setStyleToEditor(e, n, r);
        });
    }
    setStyleToEditor(e, t, n) {
        var r = null == e.style ? {} : _.clone(e.style);
        return null == n ? delete r[t] : r[t] = n,
        _.assignIn({},
        e, {
            style: ArrayHelper.undefinedIfEmptyObj(r)
        });
    }
    getStyleForEditor(e, t, n) {
        var r = (e.style || {})[t];
        return void 0 !== r ? r : n;
    }
    addStyleMod(e, t, n) {
        if (null == e.style) {
            e.style = {};
        }
        e.style[t] = n;
    }
    hasHyperLink(e) {
        return ! (!e.style || !e.style.hyperLink);
    }
    overrideStyle(e, t) {
        var n = t || {};
        var r = e.style || {};
        return r.hyperLink && n.hyperLink ? n = _.assignIn({},
        n, {
            hyperLink: r.hyperLink
        }) : n.hyperLink ? n = _.assignIn({},
        n, {
            hyperLink: void 0,
            color: n.color || S,
            textDecoration: void 0 === n.textDecoration ? "underline" : n.textDecoration
        }) : r.hyperLink && (n = _.assignIn({},
        n, {
            hyperLink: r.hyperLink,
            color: n.color || C,
            textDecoration: n.textDecoration || null
        }), console.log(n)),
        _.assignIn({},
        e, {
            style: ArrayHelper.undefinedIfEmptyObj(this.normalizeStyle(_.assignIn({},
            n)))
        });
    }
    getComputedStyle(e) {
        if (!e) {
            return {};
        }
        if (!e.hyperLink && !e.textDecoration) {
            return e;
        }
        var t = e || {};
        var n = _.assignIn({},
        t);
        return t.hyperLink && (n.color = n.color || S, n.textDecoration = void 0 === n.textDecoration ? "underline" : void 0, delete n.hyperLink),
        null !== n.textDecoration && "none" !== n.textDecoration || delete n.textDecoration,
        n;
    }
    addStyleForBullet(e, t, n) {
        var r = _.clone(e) || {};
        return r[t] = n,
        r;
    }
    addStyleForBulletLine(e, t, n) {
        var r = (e.style || {}).listBulletStyle;
        var a = this.addStyleForBullet(r, t, n);
        return _.assignIn({},
        e, {
            style: _.assignIn({},
            e.style, {
                listBulletStyle: a
            })
        });
    }
    addStyle(e, t, n) {
        var r = null == e.style ? {} : _.clone(e.style);
        return r[t] = n,
        "textDecoration" != t || n || (r.textDecoration = null),
        "bgColor" == t && "none" == n && delete r[t],
        _.assignIn({},
        e, {
            style: ArrayHelper.undefinedIfEmptyObj(r)
        });
    }
    safeGetBlockStyle(e, t, n) {
        return e && e.style && e.style[t] || n;
    }
    setLineStyleMod(e, t, n) {
        var r = e;
        return void 0 === n ? delete r.style[t] : r.style[t] = n,
        r;
    }
    contextDefaultShouldIgnore(e) {
        return this.tempDefaultLineStyleToIgnore === e;
    }
    setLineStyle(e, t, n) {
        var r = null == e.style ? {} : _.clone(e.style);
        return void 0 === n ? delete r[t] : r[t] = n,
        "align" == t && "left" == n && (this.contextDefaultShouldIgnore("align") || delete r[t]),
        "textDirection" == t && "ltr" == n && delete r[t],
        _.assignIn({},
        e, {
            style: ArrayHelper.undefinedIfEmptyObj(r)
        });
    }
    setListType(e, t) {
        return null == t || "none" == t ? this.removeListType(e) : (null != this.getLineStyle(e, "align") && (e = this.removeLineStyle(e, "align")), "section" == t && this.getLineTempOrStoreIndent(e, void 0) > 2 && (e = this.setLineStyle(e, "indentIndex", 2)), this.setLineStyle(e, "listType", t));
    }
    hasListType(e) {
        return null != this.getLineStyle(e, "listType", void 0);
    }
    removeLineStyle(e, t) {
        return this.setLineStyle(e, t, void 0);
    }
    removeListType(e) {
        var t = this.removeLineStyle(e, "listType");
        return t = this.removeLineStyle(t, "indentIndex"),
        t = this.removeLineStyle(t, "listTypeSkip"),
        (t = this.removeLineStyle(t, "listBulletStyle")).___tempIndentIndex = void 0,
        t;
    }
    indentLine(e) {
        var t = this.getLineStyle(e, "listType");
        var n = this.getLineTempOrStoreIndent(e, 0);
        if ("section" == t && n >= 2) {
            return e;
        }
        if (n >= 3) {
            return e;
        }
        var r = this.setLineStyle(e, "indentIndex", n + 1);
        return r = this.removeLineStyle(r, "listTypeSkip");
    }
    getLineAlign(e, t) {
        if (!e) {
            return t;
        }
        var n = e.align;
        return n ? "justify" != n || Global.supportTextJustify() ? n : "left" : t;
    }
    outdentLine(e) {
        var t = this.getLineTempOrStoreIndent(e, 0);
        if (t > 0) {
            var n = this.setLineStyle(e, "indentIndex", t - 1);
            return n = this.removeLineStyle(n, "listTypeSkip");
        }
        return e;
    }
    getLatexTableCellStyle(e, t) {
        var n = e.style || {};
        if ("align" == t) {
            return n.align || "center";
        }
    }
    getLineStyle(e, t, n) {
        return e && e.style ? void 0 === e.style[t] ? n : e.style[t] : n;
    }
    getLineTempOrStoreIndent(e, t) {
        return null != e.___tempIndentIndex ? e.___tempIndentIndex : this.getLineStyle(e, "indentIndex", t);
    }
    getMaxNestedListLevel() {
        return 3;
    }
    getMaxNestedSectionLevel() {
        return 2;
    }
    getMaxLineIndentLevel() {
        return 3;
    }
    getMaxIndentLevelByListType(e) {
        return "section" == e ? this.getMaxNestedSectionLevel() : 3;
    }
    getIntersectStyleForTabular(e, t, n) {
        var r = t.getTabularSelectedKeys();
        var a = BlockHelper.blockFromIndex(e[t.fromLineIndex], t.fromCharIndex).block;
        var i = new IntersectStyleChecker(x);
        var o = 0;
        for (; o < r.length; o++) {
            var s = r[o];
            var l = a.elements[s];
            if (l) {
                var c = 0;
                for (; c < l.lines.length; c++) {
                    var h = l.lines[c];
                    var u = 0;
                    for (; u < h.blocks.length; u++) {
                        var m = h.blocks[u];
                        if ((!n || "composite" != m.type || CheckObject.isRootCompositeBlockAsTextBlockProperty(m)) && "stop" == i.next(m.style)) {
                            return i.end();
                        }
                    }
                }
            }
        }
        return i.end();
    }
    setStyleForTabular(e, t, n, r) {
        var a = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var i = 0;
        for (; i < t.length; i++) {
            var o = t[i];
            var s = e.elements[o];
            a.elements[o] = this.setStyleToEditor(s, n, r);
        }
        return a;
    }
    setBorderStyleForTabular(e, t, n) {
        var a = BlockHelper.cloneCompositeBlockWithNewElements(e);
        var i = TabularHelper.getMinMaxTabularKeyIndex(t);
        switch (n) {
        case "full":
            case "none":
            var o = 0;
            for (; o < t.length; o++) {
                var l = t[o];
                var c = e.elements[l];
                a.elements[l] = this.addBorderStyleForEditor(c, "full" == n ? r.Full : r.None);
            }
            return a;
        }
        if ("outside" == n) {
            return _.range(i.minRow, i.maxRow + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(e, i.minCol);
            }).forEach((e) => {
                return a.elements[e] = this.addBorderStyleForEditor(a.elements[e], r.Left);
            }),
            _.range(i.minCol, i.maxCol + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(i.minRow, e);
            }).forEach((e) => {
                return a.elements[e] = this.addBorderStyleForEditor(a.elements[e], r.Top);
            }),
            _.range(i.minRow, i.maxRow + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(e, i.maxCol);
            }).forEach((e) => {
                var t = TabularUtils.checkAndFindValidKeyPosition(e, a);
                a.elements[t] = this.addBorderStyleForEditor(a.elements[t], r.Right);
            }),
            _.range(i.minCol, i.maxCol + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(i.maxRow, e);
            }).forEach((e) => {
                var t = TabularUtils.checkAndFindValidKeyPosition(e, a);
                a.elements[t] = this.addBorderStyleForEditor(a.elements[t], r.Bottom);
            }),
            a;
        }
        if ("inside" == n) {
            var u = i.minRow;
            for (; u <= i.maxRow; u++) {
                var p = i.minCol;
                for (; p <= i.maxCol; p++) {
                    var m = TabularHelper.getKeyFromRowCol(u, p);
                    var f = a.elements[m];
                    var g = TabularUtils.getColSpan(f);
                    var A = TabularUtils.getRowSpan(f);
                    if (u === i.minRow && u != i.maxRow && u + A - 1 < i.maxRow) {
                        a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Bottom);
                    } else {
                        if (u === i.maxRow && u != i.minRow) {
                            a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Top);
                        } else {
                            if (u != i.minRow && u != i.maxRow) {
                                a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Top);
                                if (u + A - 1 < i.maxRow) {
                                    a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Bottom);
                                }
                            }
                        }
                    }
                    if (p === i.minCol && p != i.maxCol && p + g - 1 < i.maxCol) {
                        a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Right);
                    } else {
                        if (p === i.maxCol && p != i.minCol) {
                            a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Left);
                        } else {
                            if (p != i.minCol && p != i.maxCol) {
                                a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Left);
                                if (p + g - 1 < i.maxCol) {
                                    a.elements[m] = this.addBorderStyleForEditor(a.elements[m], r.Right);
                                }
                            }
                        }
                    }
                }
            }
            return a;
        }
        switch (n) {
        case "top":
            return _.range(i.minCol, i.maxCol + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(i.minRow, e);
            }).forEach((e) => {
                return a.elements[e] = this.addBorderStyleForEditor(a.elements[e], r.Top);
            }),
            a;
        case "middle":
            var E = i.minRow;
            for (; E <= i.maxRow; E++) {
                var v = i.minCol;
                for (; v <= i.maxCol; v++) {
                    var S = TabularHelper.getKeyFromRowCol(E, v);
                    var C = a.elements[S];
                    var x = TabularUtils.getRowSpan(C);
                    if (E === i.minRow && E != i.maxRow && E + x - 1 < i.maxRow) {
                        a.elements[S] = this.addBorderStyleForEditor(a.elements[S], r.Bottom);
                    } else {
                        if (E === i.maxRow && E != i.minRow) {
                            a.elements[S] = this.addBorderStyleForEditor(a.elements[S], r.Top);
                        } else {
                            if (E != i.minRow && E != i.maxRow) {
                                a.elements[S] = this.addBorderStyleForEditor(a.elements[S], r.Top);
                                if (E + x - 1 < i.maxRow) {
                                    a.elements[S] = this.addBorderStyleForEditor(a.elements[S], r.Bottom);
                                }
                            }
                        }
                    }
                }
            }
            return a;
        case "bottom":
            return _.range(i.minCol, i.maxCol + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(i.maxRow, e);
            }).forEach((e) => {
                var t = TabularUtils.checkAndFindValidKeyPosition(e, a);
                a.elements[t] = this.addBorderStyleForEditor(a.elements[t], r.Bottom);
            }),
            a;
        case "left":
            return _.range(i.minRow, i.maxRow + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(e, i.minCol);
            }).forEach((e) => {
                return a.elements[e] = this.addBorderStyleForEditor(a.elements[e], r.Left);
            }),
            a;
        case "center":
            var I = i.minRow;
            for (; I <= i.maxRow; I++) {
                var T = i.minCol;
                for (; T <= i.maxCol; T++) {
                    var b = TabularHelper.getKeyFromRowCol(I, T);
                    var L = a.elements[b];
                    var R = TabularUtils.getColSpan(L);
                    if (T === i.minCol && T != i.maxCol && T + R - 1 < i.maxCol) {
                        a.elements[b] = this.addBorderStyleForEditor(a.elements[b], r.Right);
                    } else {
                        if (T === i.maxCol && T != i.minCol) {
                            a.elements[b] = this.addBorderStyleForEditor(a.elements[b], r.Left);
                        } else {
                            if (T != i.minCol && T != i.maxCol) {
                                a.elements[b] = this.addBorderStyleForEditor(a.elements[b], r.Left);
                                if (T + R - 1 < i.maxCol) {
                                    a.elements[b] = this.addBorderStyleForEditor(a.elements[b], r.Right);
                                }
                            }
                        }
                    }
                }
            }
            return a;
        case "right":
            return _.range(i.minRow, i.maxRow + 1).map((e) => {
                return TabularHelper.getKeyFromRowCol(e, i.maxCol);
            }).forEach((e) => {
                var t = TabularUtils.checkAndFindValidKeyPosition(e, a);
                a.elements[t] = this.addBorderStyleForEditor(a.elements[t], r.Right);
            }),
            a;
        }
    }
    addBorderStyleForEditor(e, t) {
        if (t === r.Full || null == t) {
            return this.setStyleToEditor(e, "border", void 0);
        }
        if (t === r.None) {
            return this.setStyleToEditor(e, "border", r.None);
        }
        var n = this.getStyleForEditor(e, "border", r.Full);
        return n === r.Full ? e : (n = n | t, this.setStyleToEditor(e, "border", n));
    }
    getIntersectEditorStyleForTabular(e, t) {
        var n = new IntersectStyleChecker([]);
        var r = 0;
        for (; r < t.length; r++) {
            var a = t[r];
            var i = e.elements[a];
            if ("stop" == n.next(i.style)) {
                break;
            }
        }
        return n.end();
    }
    getIntersectStyle(e, t, n) {
        if (t.isSameRoute()) {
            return {};
        }
        if (t.isTabularRoute()) {
            return this.getIntersectStyleForTabular(e, t, n);
        }
        var r = new IntersectStyleChecker(x);
        return t.forEach(e, (e, t, a, i) => {
            if (! (n && "composite" == e.type && !CheckObject.isRootCompositeBlockAsTextBlockProperty(e))) {
                if ("stop" == r.next(e.style)) {
                    i();
                }
            }
        }),
        r.end();
    }
    getHtmlFromStyleForBullet(e) {
        if (!e.style) {
            return null;
        }
        if (!e.style.listBulletStyle) {
            return null;
        }
        var t = e.style.listBulletStyle;
        var n = {};
        return t.color && (n.color = ColorTypeConverter.getHtmlColor(t.color)),
        "line-through" == t.textDecoration && (n.textDecoration = "line-through"),
        t.fontSize && this.fillFontSizeStyle(t.fontSize, n),
        t.isBold && (n.fontWeight = "bold"),
        t.isItalic && (n.fontStyle = "italic"),
        n;
    }
    mathTypeToFontFamily(e, t) {
        return FontList.mathFontFamiltyFromKey(e, t);
    }
    getHtmlFromStyle(e, t) {
        if (!e.style) {
            return {};
        }
        var n = this.getComputedStyle(e.style);
        var r = {};
        if (n.textDecoration && "none" != n.textDecoration && (r.textDecoration = n.textDecoration), n.mathType) {
            switch (r.fontFamily = this.mathTypeToFontFamily(n.mathType, t), n.mathType) {
            case "\\boldsymbol":
                case "\\mathbf":
                r.fontWeight = "bold";
                break;
            case "\\text":
                r.fontSize = "0.8888em";
            }
        }
        if (n.fontName && (r.fontFamily = FontList.textFontFamilyFromKey(n.fontName)), n.fontSize && this.fillFontSizeStyle(n.fontSize, r), n.isBold && (r.fontWeight = "bold"), n.isItalic && (r.fontStyle = "italic"), n.color) {
            var a = ColorTypeConverter.getHtmlColor(n.color);
            if (e.type == null) {
                r.color = a;
            } else {
                r.color = a;
                r.stroke = a;
                r.borderColor = a;
                r.fill = a;
            }
        }
        if (n.bgColor) {
            var i = ColorTypeConverter.getHtmlColor(n.bgColor);
            if (e.type == null) {
                r.backgroundColor = i;
            }
        }
        return r;
    }
    getReactFontSizeStyle(e) {
        var t = {};
        return this.fillFontSizeStyle(e, t),
        t.fontSize;
    }
    fillFontSizeStyle(e, t) {
        switch (e) {
        case "\\tiny":
            t.fontSize = "0.5em";
            break;
        case "\\scriptsize":
            t.fontSize = "0.7em";
            break;
        case "\\footnotesize":
            t.fontSize = "0.8em";
            break;
        case "\\small":
            t.fontSize = "0.9em";
            break;
        case "\\large":
            t.fontSize = "1.2em";
            break;
        case "\\Large":
            t.fontSize = "1.44em";
            break;
        case "\\LARGE":
            t.fontSize = 17.28 / 10 + "em";
            break;
        case "\\huge":
            t.fontSize = "2.074em";
            break;
        case "\\Huge":
            t.fontSize = "2.488em";
        }
    }
    styleToLatex(e, t) {
        if ("mathType" == e) {
            return t;
        }
        if ("color" == e) {
            var n = ColorHelper.colorAsArray(t, [0, 0, 0]);
            return "\\textcolor[rgb]{".concat(v(n[0] / 255), ",").concat(v(n[1] / 255), ",").concat(v(n[2] / 255), "}");
        }
        return t;
    }
    lineStyleToLatex(e, t) {
        if ("listType" == e) {
            switch (t) {
            case "order":
                return "enumerate";
            case "unorder":
                return "itemize";
            case "section":
                return "second";
            default:
                return "itemize";
            }
        }
        if ("align" == e) {
            switch (t) {
            case "left":
                return "flushleft";
            case "center":
                return "center";
            case "right":
                return "flushright";
            }
        }
    }
    lineStyleContext(e, t) {
        this.tempDefaultLineStyleToIgnore = e;
        t();
        this.tempDefaultLineStyleToIgnore = void 0;
    }
};

export { v as StyleHelperC }

export { r as StyleHelperA }

export default StyleHelper