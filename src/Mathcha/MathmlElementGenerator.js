import _ from 'lodash';
// Not found 'var' for: import  from '../Editor/CheckComponent';
import ColorTypeConverter from './ColorTypeConverter';
import InitHelper from '../InitHelper';
import PropUpdateHelper from './PropUpdateHelper';
import TextBlockInfo from '../Editor/TextBlockInfo';
import TextUtils from '../Editor/TextUtils';

/// xxx(293) /*MathmlElementGenerator*/

/*n.d(t, "a", function () {
    return p
});*/
/// var r = n(3)/*_.assignIn*/;  // 5 times
/// var a = n.n(r);
/// var i = n(22)/*CheckComponent*/;  // 0 times
/// var o = n(36)/*TextUtils*/;  // 1 times
/// var s = n(210)/*TextBlockInfo*/;  // 4 times
/// var l = n(32)/*InitHelper*/;  // 4 times
/// var c = n(7)/*PropUpdateHelper*/;  // 1 times
/// var d = n(42)/*ColorTypeConverter*/;  // 2 times
/// var h = n(2)/*lodash*/;  // 1 times
/// var u = n.n(h);
class p {
    constructor() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.options = e
    }
    withContextMathvariant(e) {
        var t = this.clone();
        return t.options = _.assignIn({},
        t.options, {
            context: _.assignIn({},
            (t.options || {}).context, {
                mathvariant: e
            })
        }),
        t
    }
    getEmptyElement() {
        return this.options.screenReader ? {
            type: "mrow",
            elements: [{
                type: "mi",
                value: ""
            }],
            isNone: !0
        } : {
            type: "mrow",
            elements: [],
            isNone: !0
        }
    }
    clone() {
        return new p(_.cloneDeep(this.options))
    }
    generateEditor(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!e || !e.lines || 0 === e.lines.length) return this.getEmptyElement();
        if (1 === e.lines.length && 0 === e.lines[0].blocks.length) return this.getEmptyElement();
        if (!t.forceTable && 1 === e.lines.length) {
            var n = {
                type: "mrow",
                elements: this.generateLine(e.lines[0])
            };
            return 1 === n.elements.length ? n.elements[0] : n
        }
        return {
            type: "mtable",
            columnwidth: "100%",
            mcEditorGroup: !0,
            rows: e.lines.map(e => {
                return {
                    type: "mtr",
                    cells: [{
                        type: "mtd",
                        element: this.firstOrWrapInRow(this.generateLine(e))
                    }]
                }
            })
        }
    }
    firstOrWrapInRow(e) {
        return 1 === e.length ? e[0] : {
            type: "mrow",
            elements: e
        }
    }
    generateLine(e) {
        var t = {},
        n = e.blocks.flatMap(e => {
            var n = this.innerGenerateBlock(e, t),
            r = n.blockInfo,
            a = n.elements;
            return t = r,
            a
        });
        return n = this.combineNumber(n),
        n = this.combineSpace(n),
        n = this.assignBaseForPower(n)
    }
    assignBaseForPower(e) {
        for (;;) {
            var t = e.findIndex(e => ("msub" == e.type || "msup" == e.type || "msubsup" == e.type) && null == e.base);
            if (t < 0) break;
            if (0 != t) {
                e[t].base = e[t - 1];
                e = PropUpdateHelper.remove(e, t - 1)
            } else e[t].base = {
                type: "mrow",
                elements: []
            };
        }
        return e
    }
    combineBy(e, t, n) {
        for (var r = [], a = null, i = 0; i < e.length; i++) {
            var o = e[i];
            if (t(o)) {
                if (a) {
                    a = n(o, a);
                    r[r.length - 1] = a
                } else {
                    a = n(o, null);
                    r.push(a)
                }
            } else {
                a = null;
                r.push(o)
            }
        }
        return r
    }
    combineNumber(e) {
        return this.combineBy(e, e => "mn" == e.type && "string" == typeof e.value, (e, t) => (t = t || {
            type: "mn",
            value: ""
        },
        _.assignIn({},
        t, {
            value: t.value.toString() + e.value.toString()
        })))
    }
    combineSpace(e) {
        return this.combineBy(e, e => "mspace" == e.type, (e, t) => (t = t || {
            type: "mspace",
            count: 0
        },
        _.assignIn({},
        t, {
            count: t.count + 1
        })))
    }
    innerGenerateBlock(e, t) {
        return e.type == null ? this.generateTextBlock(e, t) : this.innerGenerateCompositeBlock(e)
    }
    innerGenerateCompositeBlock(e) {
        var t = InitHelper.getCustomSymbolComponent(e.text);
        if (!t || !t.toMathml) return {
            blockInfo: {
                category: t.category,
                block: e,
                isOperatorName: t.isOperatorName
            },
            elements: []
        };
        var n = this.getMathVariant(e),
        r = this;
        n && (r = r.withContextMathvariant(n));
        var a = t.toMathml(e, r);
        return this.assignStyle(a, e.style),
        {
            blockInfo: {
                category: t.category,
                block: e,
                isOperatorName: t.isOperatorName
            },
            elements: [this.wrapInStyleIfRequired(e, a)]
        }
    }
    getContextMathVariant() {
        return this.getSafeContext().mathvariant
    }
    getSafeContext() {
        return this.options && this.options.context || {}
    }
    getMathVariant(e) {
        var t = (e.style || {}).mathType;
        if (!t) return this.getContextMathVariant();
        var n = [{
            l: "\\mathrm",
            f: "normal"
        },
        {
            l: "\\mathbf",
            f: "bold"
        },
        {
            l: "\\boldsymbol",
            f: "bold-italic"
        },
        {
            l: "\\mathit",
            f: "italic"
        },
        {
            l: "\\mathbb",
            f: "double-struck"
        },
        {
            l: "\\mathcal",
            f: "script"
        },
        {
            l: "\\mathscr",
            f: "script"
        },
        {
            l: "\\mathfrak",
            f: "fraktur"
        },
        {
            l: "\\mathsf",
            f: "sans-serif"
        },
        {
            l: "\\mathtt",
            f: "monospace"
        },
        {
            l: "\\text",
            f: "normal"
        }].find(e => e.l === t);
        return n ? n.f : this.getContextMathVariant()
    }
    generateTextBlock(e, t) {
        for (var n = [], r = TextUtils.getUnistringUncached(e.text), a = this.getMathVariant(e), i = null, l = 0; l < r.length; l++) {
            var c = r.clusterAt(l),
            d = this.getCharCategory(c, r.clusterAt(l - 1), r.clusterAt(l + 1));
            switch ("Vary" == d && (d = TextBlockInfo.resolveVaryCategory(i, t)), d) {
            case "Space":
                n.push({
                    type: "mspace",
                    count: 1
                });
                break;
            case "Number":
                n.push({
                    type: "mn",
                    value: c
                });
                break;
            case "Unary":
                n.push({
                    type: "mo",
                    value: c,
                    form: "prefix"
                });
                break;
            case "Binary":
                case "Relation":
                n.push({
                    type: "mo",
                    value: c,
                    form: "infix"
                });
                break;
            case "Glyph":
                n.push({
                    type: "mo",
                    value: c
                });
                break;
            case "Opening":
                case "Closing":
                case "Fence":
                n.push({
                    type: "mo",
                    value: c,
                    stretchy: !1
                });
                break;
            case "Punctuation":
                n.push({
                    type: "mo",
                    value: c,
                    separator: !0
                });
                break;
            case "Diacritic":
                n.push({
                    type: "mo",
                    value: c,
                    accent: !0
                });
                break;
            case "Normal":
                case "Alphabetic":
                default:
                n.push({
                    type: "mi",
                    value: c
                })
            }
            i = this.getAbstractCategory(c, r.clusterAt(l - 1), r.clusterAt(l + 1))
        }
        return a && n.forEach(e => {
            "mi" != e.type && "mo" != e.type && "mn" != e.type || (e.mathvariant = a)
        }),
        n.forEach(t => {
            this.assignStyle(t, e.style)
        }),
        {
            elements: n,
            blockInfo: {
                block: e
            }
        }
    }
    getCharCategory(e, t, n) {
        if (" " == e) return "Space";
        if ("." == e && "Normal" == TextBlockInfo.resolveDotCategory(t, n)) return "Number";
        var r = e.codePointAt(0);
        return r >= 48 && r <= 57 ? "Number" : InitHelper.categoryByUnicodeChar(e)
    }
    getAbstractCategory(e, t, n) {
        return "." == e ? TextBlockInfo.resolveDotCategory(t, n) : TextBlockInfo.getAbstractCategory(InitHelper.categoryByUnicodeChar(e))
    }
    wrapInStyleIfRequired(e, t) {
        return e.style ? "msup" == t.type || "msub" == t.type || "msubsup" == t.type ? t : e.style.mathModeType ? {
            type: "mstyle",
            displaystyle: "\\textstyle" != e.style.mathModeType,
            element: t
        } : t : t
    }
    generateCompositeBlock(e) {
        var t = InitHelper.getCustomSymbolComponent(e.text);
        if (t && t.toMathml) {
            var n = t.toMathml(e, this);
            return this.assignStyle(n, e.style),
            n
        }
        return null
    }
    generateMath(e) {
        var t = this.generateCompositeBlock(e);
        if (!t) return null;
        if ("math" != t.type) return {
            type: "math",
            elements: [t]
        };
        if (1 === t.elements.length && "mrow" == t.elements[0].type) {
            var n = t.elements[0];
            return n.isNone ? {
                type: "math",
                elements: []
            } : _.assignIn({},
            t, {
                elements: n.elements
            })
        }
        return t
    }
    assignStyle(e, t) {
        this.options.screenReader || t && t.color && (e.mathcolor = ColorTypeConverter.colorToHex(t.color, ColorTypeConverter.blackArr))
    }
    getOptions() {
        return this.options
    }
}

export default p