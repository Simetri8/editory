import _ from 'lodash';
import CheckObject from './CheckObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import InitHelper from '../InitHelper';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper from '../Mathcha/StyleHelper';
import TextUtils from './TextUtils';

/// xxx(22) /*CheckComponent*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(36)/*TextUtils*/;  // 4 times
/// var o = n(2)/*lodash*/;  // 8 times
/// var s = n.n(o);
/// var l = n(7)/*PropUpdateHelper*/;  // 7 times
/// var c = n(6)/*DiagramIdHelper*/;  // 1 times
/// var d = n(18)/*StyleHelper*/;  // 6 times
/// var h = n(32)/*InitHelper*/;  // 4 times
/// var u = n(31)/*CheckObject*/;  // 6 times
var CheckComponent = new class {
    constructor() {
        this.bracketLists = ["(", ")", "{", "}", "[", "]"]
    }
    charFromLocalIndex(e, t) {
        return this.isNonTextBlock(e) ? null : TextUtils.charAt(e, t)
    }
    isOpenCloseOrPowerIndex(e) {
        return this.isOpenClose(e) || this.isPowerIndex(e)
    }
    isCompositeBlockWithNestedEditor(e) {
        return CheckObject.isComposite(e) && _.keys(e.elements).length > 0
    }
    isIntegralLikeBlock(e) {
        return !! CheckObject.isComposite(e) && InitHelper.getCustomSymbolComponent(e.text).isIntegralLike
    }
    isPlainIntegralLike(e) {
        return !! this.isIntegralLikeBlock(e) && null == e.elements.from && null == e.elements.to
    }
    isOpenClose(e) {
        if (1 === e.text.length) {
            var t = InitHelper.categoryByUnicodeChar(e.text);
            return "Opening" == t || "Closing" == t
        }
        return "single" == e.type && (e.text.startsWith("\\right") || e.text.startsWith("\\left"))
    }
    isCloseBlock(e) {
        return 1 === e.text.length ? "Closing" == InitHelper.categoryByUnicodeChar(e.text) : "single" == e.type && e.text.startsWith("\\right")
    }
    isOpenBlock(e) {
        return 1 === e.text.length ? "Opening" == InitHelper.categoryByUnicodeChar(e.text) : "single" == e.type && e.text.startsWith("\\left")
    }
    isPowerIndex(e) {
        return CheckObject.isComposite(e) && ("\\power-index" == e.text || "\\power" == e.text || "\\index" == e.text)
    }
    isPower(e) {
        return "composite" == e.type && ("\\power" == e.text || "\\power-index" == e.text && null == e.elements.indexValue)
    }
    isPlotCases(e) {
        return "composite" == e.type && "\\plot-cases" == e.text
    }
    isIndex(e) {
        return "composite" == e.type && ("\\index" == e.text || "\\power-index" == e.text && null == e.elements.powerValue)
    }
    isSingleBlock(e) {
        return "single" == e.type
    }
    isTextBlock(e) {
        return null == e.type
    }
    isNonTextBlock(e) {
        return !this.isTextBlock(e)
    }
    getCharCount(e) {
        return this.isTextBlock(e) ? TextUtils.lengthByCache(e) : 1
    }
    are2TextBlockSameFormat(e, t) {
        if (!this.isTextBlock(e)) return !1;
        if (!this.isTextBlock(t)) return !1;
        var n = e.style || {},
        r = t.style || {};
        if (n.hyperLink && r.hyperLink && n.textDecoration !== r.textDecoration) return !1;
        for (var a in n) if (n.hasOwnProperty(a) && n[a] != r[a]) return !1;
        for (var a in r) if (r.hasOwnProperty(a) && n[a] != r[a]) return !1;
        return !0
    }
    splitBlock(e, t) {
        return 0 === t ? [e] : this.getCharCount(e) <= t ? [e] : [PropUpdateHelper.set(e, "text", TextUtils.substr(e, 0, t)), this.copyFormat({
            text: TextUtils.substr(e, t),
            id: DiagramIdHelper.nextId()
        },
        e, "all")]
    }
    isMathContainer(e) {
        return "composite" == e.type && "\\math-container" == e.text
    }
    isZSpec(e) {
        return "composite" == e.type && ("\\z-schema" == e.text || "\\z-syntax" == e.text)
    }
    isGather(e) {
        return "composite" == e.type && "\\gather" == e.text
    }
    isMultiline(e) {
        return "composite" == e.type && "\\multiline" == e.text
    }
    isAlign(e) {
        return "composite" == e.type && "\\align" == e.text
    }
    isInlineMathContainer(e) {
        return this.isMathContainer(e) && !e.displayMode || this.isInlineLatexComposite(e)
    }
    isInlineLatexComposite(e) {
        return "composite" == e.type && "\\inline-math" == e.text
    }
    isTextModeGroupInline(e) {
        return CheckObject.isComposite(e) && "\\text-mode-group-inline" == e.text
    }
    isDisplayMathContainer(e) {
        return this.isMathContainer(e) && e.displayMode
    }
    getOverSymbolEditorValue(e) {
        return e.elements.value
    }
    copyFormatByMode(e, t, n) {
        return this.copyFormat(e, t, n ? "root" : "math")
    }
    copyFormat(e, t, n) {
        return "root" == n ? (this.isInlineMathContainer(e) || this.isTextModeGroupInline(e)) && t.style && t.style.color ? StyleHelper.addStyle(e, "color", t.style.color) : this.copyFormatForRoot(e, t) : this.copyFormatForMath(e, t)
    }
    addRootStyleForMath(e, t, n) {
        return "fontSize" == t || "color" == t ? StyleHelper.addStyle(e, t, n) : e
    }
    overriddeRootStyleForMath(e, t) {
        return t = t || {},
        StyleHelper.overrideStyle(e, _.assignIn({},
        e.style, {
            fontSize: t.fontSize
        }))
    }
    mergeFormat(e, t) {
        return "root" == (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "all") ? this.mergeFormat(e, t) : this.mergeFormatForMath(e, t)
    }
    mergeFormatForMath(e, t) {
        return this.mergeFormatAll(e, t)
    }
    mergeFormatAll(e, t) {
        return PropUpdateHelper.update(e, {
            displayMode: t.displayMode,
            style: _.assignWith(_.clone(e.style), t.style)
        })
    }
    mergeFormatMod(e, t) {
        return "root" == (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "all") ? this.mergeFormatForRootMod(e, t) : this.mergeFormatForMathMod(e, t)
    }
    mergeFormatForMathMod(e, t) {
        return this.mergeFormatAllMod(e, t)
    }
    mergeFormatForRootMod(e, t) {
        return CheckObject.isComposite(e) ? (t.style && t.style.fontSize && StyleHelper.addStyleMod(e, "fontSize", t.style.fontSize), e) : this.mergeFormatAllMod(e, t)
    }
    mergeFormatAllMod(e, t) {
        return t.style ? (e.style || (e.style = {}), PropUpdateHelper.update(e, {
            displayMode: t.displayMode,
            style: _.assignWith(e.style, t.style)
        })) : e
    }
    copyFormatForMath(e, t) {
        var n = e;
        return (e.style || t.style) && (n = PropUpdateHelper.setProp(n, "style", _.assign({},
        t.style || {},
        e.style || {}))),
        "displayMode" in t ? PropUpdateHelper.update(n, {
            displayMode: t.displayMode
        }) : n
    }
    copyFormatForRoot(e, t) {
        if (CheckObject.isComposite(e)) return t.style && t.style.fontSize && (e = StyleHelper.addStyle(e, "fontSize", t.style.fontSize)),
        "displayMode" in t ? PropUpdateHelper.update(e, {
            displayMode: t.displayMode
        }) : e;
        var n = StyleHelper.normalizeStyle(this.copyStyleForTextModeTextBlock(t.style, e.style));
        return _.assignIn({},
        e, {
            style: n || void 0
        })
    }
    copyStyleForTextModeTextBlock(e, t) {
        if (e || t) {
            var n = _.clone(e || {});
            if (_.keys(t || {}).forEach(e => {
                "mathModeType" != e && (n[e] = t[e])
            }), n.mathModeType && delete n.mathModeType, !(_.keys(n).length <= 0)) return n
        }
    }
    splitBlockAndInsertModel(e, t, n, r) {
        if (0 === n) return [this.copyFormatByMode(t, e, r), e];
        if (this.getCharCount(e) <= n) return [e, this.copyFormatByMode(t, e, r)];
        var a = this.splitBlock(e, n);
        return [a[0], this.copyFormatByMode(t, a[0], r), a[1]]
    }
    splitBlockAndInsertMultipleModels(e, t, n, r) {
        var a = this.copyFormatForBlocks(e, t, r);
        if (0 === n) return a.concat([e]);
        if (this.getCharCount(e) <= n) return [e].concat(a);
        var i = this.splitBlock(e, n);
        return PropUpdateHelper.insertMultiple(i, 1, a)
    }
    copyFormatForBlocks(e, t, n) {
        return t.map(t => this.copyFormatByMode(t, e, n))
    }
}

export default CheckComponent