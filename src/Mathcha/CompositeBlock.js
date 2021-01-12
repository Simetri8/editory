import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
// Not found 'var' for: import  from '../Editor/CheckComponent';
import BlockHelper from '../Elements/BlockHelper';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DocumentCorruption from '../Document/DocumentCorruption';
import DOMHelper from '../Elements/DOMHelper';
import Geometry from '../Geometry/Geometry';
import PropUpdateHelper from './PropUpdateHelper';
import StyleHelper from './StyleHelper';
import TabularHelper from '../Tabular/TabularHelper';
import TextHelper from './TextHelper';

/// xxx(29) /*CompositeBlock*/

/*n.d(t, "a", function () {
    return T
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 1 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 13 times
/// var l = n.n(s);
/// var c = n(5)/*sizzle*/;  // 1 times
/// var d = n.n(c);
/// var h = n(7)/*PropUpdateHelper*/;  // 1 times
/// var u = n(22)/*CheckComponent*/;  // 0 times
/// var p = n(4)/*DOMHelper*/;  // 7 times
/// var m = n(12)/*BlockHelper*/;  // 1 times
/// var f = n(14)/*classnames*/;  // 1 times
/// var g = n.n(f);
/// var y = n(18)/*StyleHelper*/;  // 1 times
/// var A = n(77)/*TextHelper*/;  // 6 times
/// var E = n(1)/*Geometry*/;  // 1 times
/// var v = n(6)/*DiagramIdHelper*/;  // 1 times
/// var S = n(95)/*DocumentCorruption*/;  // 1 times
/// var C = n(23)/*PropTypesExporter*/;  // 7 times
/// var x = n.n(C);
/// var I = n(15)/*TabularHelper*/;  // 1 times
class T extends React.Component {
    constructor(e) {
        super(e);
        this.refMap = {};
        this.elementMethodsCache = {};
        this.elementLighMethodsCache = {};
        this.cacheRefMethod = {};
        this.willComponentUnmount = false;
        this.updateBaseLine = () => {
            if (this.getBaseLine) {
                var e = DOMHelper.getComputedFontSize(this.compositeBlock);
                jQuery(this.baseline).css("margin-top", this.getBaseLine() / e + "em")
            }
        };
        this.getCompositeInstance = (e) => {
            if (e) {
                e.reactInstance = this;
                this.compositeBlock = e
            }
        };
        this.getReverseScale = () => {
            return this.context.getScale ? 1 / this.context.getScale() : 1
        };
        this.refMap = {};
        this.elementMethodsCache = {};
        this.cacheRefMethod = {}
    }
    getLatexName() {
        return this.props.data.text
    }
    getModel() {
        return this.props.data
    }
    shouldComponentUpdate(e, t) {
        return e.data != this.props.data || e.selected != this.props.selected || e.fontSize != this.props.fontSize || e.isLastBlock != this.props.isLastBlock || e.allowTag != this.props.allowTag || this.state != t
    }
    fromString(e) {
        return _.map(e.split(""), (e) => {
            return {
                id: DiagramIdHelper.nextId(),
                char: e
            }
        })
    }
    getEditors() {
        return _.map(_.keys(this.refMap), (e) => {
            return this.refMap[e]
        })
    }
    hasEditor() {
        return _.keys(this.refMap).length > 0
    }
    hasElementsData() {
        return _.keys(this.props.data.elements).length > 0
    }
    getEditorDoms() {
        return _.map(_.keys(this.refMap), (e) => {
            return this.refMap[e].editor
        })
    }
    getEditorDomByKey(e) {
        return this.refMap[e] ? this.refMap[e].editor : null
    }
    getRootDom() {
        return ReactDOM.findDOMNode(this)
    }
    isSelected() {
        return null != this.props.selected
    }
    isChildSelected() {
        return null != this.props.selected && null != this.props.selected.key
    }
    isTabularDescendantSelected() {
        return !! this.isChildSelected() && this.isTabularSelectedRecursive(this.props.selected.selected)
    }
    isTabularSelectedRecursive(e) {
        if (!e || !e.key) return false;
        var t = TabularHelper.isKeyInTabularFormat(e.key);
        return t || this.isTabularSelectedRecursive(e.selected)
    }
    isDirectSelected() {
        return this.isSelected() && (null == this.props.selected.selected || null == this.props.selected.selected.selected)
    }
    isDirectSelectedNoSelectionMode() {
        return this.isDirectSelected() && !this.isInSelectionMode()
    }
    isSelectModeOnly() {
        return this.context.getEditorInfo().selectOnly
    }
    isDirectAndChildSelected() {
        return this.isDirectSelected() && this.isChildSelected()
    }
    isEditorEmpty(e) {
        return BlockHelper.isEditorEmpty(e)
    }
    isOneLineEditor(e) {
        return 1 === e.lines.length
    }
    isMultiline(e) {
        return !this.isOneLineEditor(e)
    }
    isPower(e) {
        return "composite" == e.type && ("\\power" == e.text || "\\power-index" == e.text && null == e.elements.indexValue)
    }
    isLastLineAllTextBlocksSingleOrPower(e) {
        var t = _.last(e.lines);
        return _.every(t.blocks, (e) => {
            return e.type == null || "single" == e.type || this.isPower(e)
        })
    }
    isOneTextBlock(e) {
        if (1 != e.lines.length) return false;
        var t = e.lines[0].blocks;
        return 1 === t.length && t[0].type == null
    }
    isOneOr2Char(e) {
        return this.isOneTextBlock(e) && e.lines[0].blocks[0].text.length <= 2
    }
    isEmptyOrOneChar(e) {
        return this.isEditorEmpty(e) || this.isOneChar(e)
    }
    isOneChar(e) {
        return this.isOneTextBlock(e) && 1 === e.lines[0].blocks[0].text.length
    }
    isLineAllNormalText(e) {
        return _.every(e.blocks, (e) => {
            return e.type == null
        })
    }
    isFirstTextBlock(e) {
        return e.blocks[0] && e.blocks[0].type == null
    }
    getClassName() {
        return this.containerClassName || ""
    }
    isFirstMathModeLevel() {
        return this.props.isFirstMathModeLevel
    }
    isInlineMode() {
        var e = this.props.data;
        var isMathContainer = "composite" == e.type && "\\math-container" == e.text;
        var isInlineLatexComposite = "composite" == e.type && "\\inline-math" == e.text;
        var isInlineMathContainer = isMathContainer && !e.displayMode || isInlineLatexComposite;
        return !! isInlineMathContainer || (!(!e.style || "\\textstyle" != e.style.mathModeType) || (!e.style || "\\displaystyle" != e.style.mathModeType) && (!this.props.displayMode && !e.displayMode))
    }
    isInSelectionMode() {
        return this.getEditorInfo().isSelectionMode
    }
    getEditorInfo() {
        return this.context.getEditorInfo()
    }
    isSingleTextBlockAndUperSmall(e) {
        return this.isEditorEmpty(e) || this.isOneTextBlock(e) && TextHelper.isUpperSmall(e.lines[0].blocks[0].text)
    }
    isSingleTextBlockLeftUpperSign(e) {
        return this.isOneTextBlock(e) && TextHelper.isUpperLeftSign(e.lines[0].blocks[0].text)
    }
    isSingleTextBlockRightUpperSign(e) {
        return this.isOneTextBlock(e) && TextHelper.isUpperRightSign(e.lines[0].blocks[0].text)
    }
    isSingleTextBlockAndOneChar(e) {
        return this.isOneTextBlock(e) && 1 === e.lines[0].blocks[0].text.length
    }
    getRoundEm(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return DOMHelper.getEmRound(e, this.getFontSizePixel(t))
    }
    getRoundEmStr(e, t) {
        return this.getRoundEm(e, t) + "em"
    }
    isSingleTextBlockFirstLine(e) {
        if (this.isEditorEmpty(e)) return true;
        var t = e.lines[0];
        return 1 === t.blocks.length && t.blocks[0].type == null
    }
    isFirstCharOfLastLineLowerSmall(e) {
        if (this.isEditorEmpty(e)) return true;
        var t = _.last(e.lines);
        return !! t.blocks[0].type == null && TextHelper.isLowerSmall(t.blocks[0].text[0])
    }
    isSingleTextBlockAndLowerSmall(e) {
        return !! this.isEditorEmpty(e) || _.every(_.last(e.lines).blocks, (e) => {
            return e.type == null && TextHelper.isLowerSmall(e.text) || this.isPower(e)
        })
    }
    componentDidUpdate(e, t) {
        this.afterReactRenderBase(e, t);
        if (! (!this.useCustomBaseLine() || e.data === this.props.data && e.fontSize === this.props.fontSize)) this.context.fixedContextHandler.getBatchUpdater().push(this.updateBaseLine, this)
    }
    componentDidMount() {
        if (this.useCustomBaseLine()) this.context.fixedContextHandler.getBatchUpdater().push(this.updateBaseLine, this);
        this.afterReactRenderBase({},
        {})
    }
    afterReactRenderBase(e, t) {
        this.afterReactRender(e, t);
        if (! (e.data === this.props.data && e.fontSize === this.props.fontSize && e.fracLevel === this.props.fracLevel && e.displayMode === this.props.displayMode)) this.afterReactRenderWhenDataChanged(e, t)
    }
    getCachedRefMethod(e, t) {
        return this.cacheRefMethod[e] || (this.cacheRefMethod[e] = t.bind(this)),
        this.cacheRefMethod[e]
    }
    afterReactRender(e, t) {}
    afterReactRenderWhenDataChanged(e, t) {}
    componentWillUnmount() {
        this.willComponentUnmount = true
    }
    getBaseLineEditor(e, t) {
        return this.isOneLineEditor(t) ? DOMHelper.getBaselineOfFirstLine(e) : Math.round(DOMHelper.getElementHeightRound2Dec(e) / 2 + .3 * DOMHelper.getComputedFontSize(this.compositeBlock))
    }
    useCustomBaseLine() {
        return false
    }
    renderBaseLine() {
        if (this.useCustomBaseLine() || this.selfManageBaseLine) return React.createElement("base-line-indicator", {
            class: this.baselineClass,
            ref: (e) => {
                return this.baseline = e
            }
        },
        "a")
    }
    getFracLevel() {
        return this.props.fracLevel || 0
    }
    setStripInfo(e) {
        return e.stripUp && e.stripDown ? e : (e.stripUp ? e.stripDown = this.props.stripInfo && this.props.stripInfo.stripDown : e.stripUp = this.props.stripInfo && this.props.stripInfo.stripUp, e)
    }
    getCompositeBlockStyle() {
        return StyleHelper.getHtmlFromStyle(this.props.data, this.context.baseMathModeFontFamily)
    }
    getFontSizePixel(e) {
        return e = e || 1,
        this.context.mathFontSizeBase * this.props.fontSize * e
    }
    getTextFontSizePixel(e) {
        return e = e || 1,
        this.context.fontSizeBase * this.props.fontSize * e
    }
    renderComponentBase() {
        return this.renderComponent()
    }
    getAriaLabel() {}
    render() {
        var e = this.isChildSelected();
        var t = this.showSelectedAnyLevel && e || this.isDirectSelected() && e || this.showSelectedEvenNotDescendant && this.isSelected();
        var n = classNames(this.getClassName(), {
            selected: t,
            inline: this.isInlineMode()
        },
        this.baselineClass);
        return React.createElement("composite-block", {
            dir: "ltr",
            id: this.props.id,
            style: this.getCompositeBlockStyle(),
            ref: this.getCompositeInstance,
            class: n,
            "aria-label": this.getAriaLabel(),
            role: this.role
        },
        this.renderBaseLine(), this.renderComponentBase())
    }
    getFontSize() {
        return this.props.data.style && void 0 !== this.props.data.style.fontSize ? TextHelper.fontSizePercentageFromCommand(this.props.data.style.fontSize) : this.props.fontSize
    }
    selectElement(e) {
        var t = {
            key: e,
            selected: {
                lineIndex: 0,
                charIndex: 0
            }
        };
        this.props.onSelectedChanged(t)
    }
    buildMetaDataFromName(e, t) {
        
        if (this.elementMethodsCache[e] === undefined || null == this.elementMethodsCache[e]) {
            this.elementMethodsCache[e] = {
                onDataChanged: null,
                onSelectedChanged: null,
                ref: null
            };
            this.elementMethodsCache[e].onDataChanged = function (e, t, n) {
                this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "elements." + e, t), n)
            }.bind(this, e);
            this.elementMethodsCache[e].onSelectedChanged = function (e, t, n) {
                this.props.onSelectedChanged({
                    key: e,
                    selected: t
                },
                n)
            }.bind(this, e);
            this.elementMethodsCache[e].ref = function (e, t) {
                if (t) this.refMap[e] = t;
                else delete this.refMap[e]
            }.bind(this, e)
        }
        var n = DocumentCorruption.makeSureEditorModel(e, this.props.data.elements);
        return {
            data: n,
            id: n.id,
            keyName: e,
            fontSize: this.getFontSize(),
            stripInfo: this.props.stripInfo,
            onDataChanged: this.elementMethodsCache[e].onDataChanged,
            onSelectedChanged: this.elementMethodsCache[e].onSelectedChanged,
            ref: this.elementMethodsCache[e].ref,
            noSpacingRule: this.props.noSpacingRule,
            selected: this.props.selected && this.props.selected.key === e ? this.props.selected.selected : void 0,
            showBorder: !t && this.isDirectSelected() && this.isChildSelected()
        }
    }
    buildLightMetadata(e) {
        return null == this.elementLighMethodsCache[e] && (this.elementLighMethodsCache[e] = {
            onSelectedChanged: null,
            ref: null
        },
        this.elementLighMethodsCache[e].onSelectedChanged = function (e, t, n) {
            this.props.onSelectedChanged({
                key: e,
                selected: t
            },
            n)
        }.bind(this, e), this.elementLighMethodsCache[e].ref = function (e, t) {
            if (t) this.refMap[e] = t;
            else delete this.refMap[e]
        }.bind(this, e)),
        {
            onSelectedChanged: this.elementLighMethodsCache[e].onSelectedChanged,
            ref: this.elementLighMethodsCache[e].ref,
            keyName: e,
            selected: this.props.selected && this.props.selected.key === e ? this.props.selected.selected : void 0,
            model: this.props.data.elements[e]
        }
    }
    getElementRect(e) {
        if (this.context.getScale) {
            var t = this.context.getScale();
            return Geometry.scaleRect(DOMHelper.getElementRect(e), 1 / t)
        }
        return DOMHelper.getElementRect(e)
    }
    getElementHeight(e) {
        return this.getElementRect(e).height
    }
    getUnscaledValue(e) {
        return this.context.getScale ? 1 * e / this.context.getScale() : e
    }
}
T.contextTypes = {
    getEditorInfo: PropTypes.any,
    mathFontSizeBase: PropTypes.any,
    fontSizeBase: PropTypes.any,
    getScale: PropTypes.any,
    notifyLineTagRender: PropTypes.any,
    baseMathModeFontFamily: PropTypes.any,
    fixedContextHandler: PropTypes.any
}

export default T