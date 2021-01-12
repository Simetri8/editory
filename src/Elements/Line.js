import _ from 'lodash';
import { Promise } from 'bluebird';
import classNames from 'classnames';
import jQuery from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BlockHelper from './BlockHelper';
import CheckObject from '../Editor/CheckObject';
import DocumentCorruption from '../Document/DocumentCorruption';
import DOMHelper from './DOMHelper';
import ElementTypes from './ElementTypes';
import Geometry from '../Geometry/Geometry';
import InitHelper from '../InitHelper';
import LineHashTopBottom from './LineHashTopBottom';
import LineHelper from '../Editor/LineHelper';
import LineTagSetting from './LineTagSetting';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper from '../Mathcha/StyleHelper';
import SymbolElementNames from '../Symbols/SymbolElementNames';
import TextBlockInfo from '../Editor/TextBlockInfo';
import TextBlockMetricInfo from '../Editor/TextBlockMetricInfo';
import TextHelper from '../Mathcha/TextHelper';
import TextUtils from '../Editor/TextUtils';

/// xxx(248) /*Line*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 18 times
/// var o = n.n(i);
/// var s = n(7)/*PropUpdateHelper*/;  // 1 times
/// var l = n(4)/*DOMHelper*/;  // 37 times
/// var c = n(32)/*InitHelper*/;  // 1 times
/// var d = n(36)/*TextUtils*/;  // 1 times
/// var h = n(18)/*StyleHelper*/;  // 15 times
/// var u = n(2)/*lodash*/;  // 9 times
/// var p = n.n(u);
/// var f = n(97)/*SymbolElementNames*/,  // 2 times
/// g = n(159)/*TextBlockMetricInfo*/,  // 2 times
/// y = n(239)/*LineTagSetting*/,  // 1 times
/// A = n(95)/*DocumentCorruption*/,  // 3 times
/// E = n(14)/*classnames*/,  // 4 times
/// v = n.n(E)
/// S = n(12)/*BlockHelper*/;  // 2 times
/// var x = n(80)/*LineHelper*/;  // 5 times
/// var T = n(210)/*TextBlockInfo*/,  // 2 times
/// b = n(43)/*ArrayHelper*/;  // 1 times
/// var R = n(31)/*CheckObject*/,  // 1 times
/// M = n(5)/*sizzle*/,  // 4 times
/// w = n.n(M)
/// O = n(77)/*TextHelper*/,  // 1 times
/// D = n(1)/*Geometry*/,  // 3 times
/// N = n(547)/*LineHashTopBottom*/,  // 2 times
/// k = n.n(N)
/// B = n(38)/*ElementTypes*/;  // 2 times
/// var F = n(30)/*blubirdjs*/,  // 1 times
/// H = n.n(F)
/// rdom = n(16)/*ReactDOM*/,  // 1 times
/// U = n.n(rdom);
/// var pte = n(23)/*PropTypesExporter*/;  // 9 times
/// var propTypes = n.n(pte);
var is15 = React.version.startsWith("15");
class m extends React.Component {
    shouldComponentUpdate(e, t) {
        return e.line != this.props.line || e.selected != this.props.selected || e.showLineBorder != this.props.showLineBorder || e.fontSize != this.props.fontSize || e.tagInfo != this.props.tagInfo
    }
    ignoreRemoveBlocks(e) {
        var t = is15 ? this._reactInternalInstance._renderedComponent : this._reactInternalFiber.child.stateNode;
        if (DOMHelper.isRootEditLine(is15 ? t.getHostNode() : t)) {
            _.keys(e).forEach((e) => {
                if (is15) {
                    delete t._renderedChildren[".1"]._renderedChildren[e]
                } else {
                    delete t.children[1].children[e]
                }
            })
        } else {
            _.keys(e).forEach((e) => {
                if (is15) {
                    delete t._renderedChildren[e]
                } else {
                    delete t.children[e]
                }
            })
        }
    }
    componentWillMount() {
        if (this.props.movingBlocks) {
            this.movingBlocks = this.props.movingBlocks;
            this.suppress = true
        }
    }
    componentDidMount() {
        if (this.movingBlocks) {
            this.handleMovingBlocks();
            this.suppress = false;
            this.registerForceUpdate()
        } else if (!this.props.rootLevel) this.queuePostProcessLineIfNecessary(void 0, false)
    }
    registerForceUpdate() {
        this.context.fixedContextHandler.getBatchUpdater().pushOnCallback((e) => {
            this.forceUpdate(e)
        },
        this)
    }
    queuePostProcessLineIfNecessary(e, t) {
        this.context.fixedContextHandler.getBatchUpdater().push(this.postLineProcess, this)
    }
    componentWillUpdate(e) {
        if (e.keepRemovedBlocks) {
            this.ignoreRemoveBlocks(e.keepRemovedBlocks);
            this.keepRemovedBlocks = null
        }
        if (e.movingBlocks != this.props.movingBlocks && e.movingBlocks) {
            this.movingBlocks = e.movingBlocks;
            this.handleMovingBlocks()
        }
    }
    getLineElement() {
        return this.line
    }
    componentDidUpdate(e, t) {
        if (this.movingBlocks) {
            this.movingBlocks = null;
            this.queuePostProcessLineIfNecessary(e, true)
        } else if (!this.props.rootLevel && this.getLineElement()) this.queuePostProcessLineIfNecessary(e, false)
    }
    handleMovingBlocks() {
        if (is15) {
            var hostNode = this._reactInternalInstance.getHostNode();
            var comp = this._reactInternalInstance._renderedComponent;
            if (DOMHelper.isRootEditLine(hostNode)) {
                hostNode = DOMHelper.getRootLineBlocksElement(hostNode);
                var children = comp._renderedChildren[".1"]._renderedChildren
            } else {
                var children = comp._renderedChildren
            }
            _.forEach(this.movingBlocks, (movingBlock) => {
                if (this.isValidBlock(movingBlock)) {
                    movingBlock._hostParent = this._renderedComponent;
                    hostNode.appendChild(movingBlock.getHostNode())
                }
            });
            _.forEach(this.movingBlocks, (e, t) => {
                if (this.isValidBlock(this.movingBlocks[t])) {
                    children[t] = this.movingBlocks[t]
                }
            })
        } else {
            var hostNode = this._reactInternalFiber.child.stateNode;
            var comp = this._reactInternalFiber.child.stateNode;
            if (DOMHelper.isRootEditLine(hostNode)) {
                hostNode = DOMHelper.getRootLineBlocksElement(hostNode);
                var children = comp.children[1].children
            } else {
                var children = comp.children
            }
            _.forEach(this.movingBlocks, (movingBlock) => {
                if (this.isValidBlock(movingBlock)) {
                    hostNode.appendChild(movingBlock)
                }
            });
            _.forEach(this.movingBlocks, (e, t) => {
                if (this.isValidBlock(this.movingBlocks[t])) {/*children[t]=this.movingBlocks[t]*/
                }
            })
        }
    }
    isValidBlock(e) {
        try {
            return e.getHostNode(),
            true
        } catch(e) {
            return console.warn(e),
            false
        }
    }
    componentWillUnmount() {
        this.willComponentUnmount = true;
        if (this.keepRemovedBlocks) {
            this.ignoreRemoveBlocks(this.keepRemovedBlocks);
            this.keepRemovedBlocks = null
        }
    }
}
m.contextTypes = {
    getEditorInfo: PropTypes.any,
    mathFontSizeBase: PropTypes.any,
    notifyLineTagRender: PropTypes.any,
    getScale: PropTypes.any,
    baseMathModeFontFamily: PropTypes.any,
    fixedContextHandler: PropTypes.any
};
var C = new class {
    getClass(e) {
        if (e.inTableOfContent) return "";
        var t = StyleHelper.getLineAlign(e.line.style, "");
        var n = StyleHelper.getLineStyle(e.line, "listType");
        var r = StyleHelper.getLineStyle(e.line, "indentIndex", 0);
        var a = StyleHelper.getLineStyle(e.lineInfo.previousLine, "listType");
        var i = BlockHelper.isLineWithSingleTheorem(e.line);
        var o = e.lineInfo.previousLine && BlockHelper.isLineWithSingleTheorem(e.lineInfo.previousLine);
        var s = i && (o || "section" == a);
        var l = "order" == n || "unorder" == n || n instanceof Array;
        return classNames({
            root: e.rootLevel,
            "text-mode": e.isTextMode,
            selected: !!e.selected,
            taggable: !!e.allowTag,
            ["align-".concat(t)] : !!t,
            ["indent-".concat(r - 1)] : !!r && !n,
            ["indent-".concat(e.lineInfo.indentIndex)] : l,
            "list-item": l,
            ["section sindent-".concat(e.lineInfo.indentIndex)] : "section" == n,
            "section-half": "section" == n && "section" == a,
            theorem: i && !s,
            "theorem-half": s
        })
    }
};
var I = new class {
    getPrefix(e) {
        var t = StyleHelper.getLineStyle(e.line, "listType");
        var n = e.lineInfo.indentIndex || 0;
        if ("section" == t) return LineHelper.getSection(n, e.lineInfo.indentCounters);
        if (StyleHelper.getLineStyle(e.line, "listTypeSkip", false)) return "";
        var r = (e.lineInfo.indentCounters || [])[n] || 0;
        return t instanceof Array ? LineHelper.getBuletText(t, n, e.lineInfo.indentCounters) : "order" == t ? LineHelper.getOrderNumber(n, r) : "unorder" == t ? LineHelper.getUnorderBullet(n) : ""
    }
};
class L extends React.Component {
    constructor() {
        super(...arguments);
        this.preventEvent = (e) => {
            e.stopPropagation();
            e.preventDefault()
        }
    }
    shouldComponentUpdate(e) {
        return e.data != this.props.data
    }
    componentDidUpdate() {
        this.context.notifyTheoremNumbering();
        this.context.notifyImageCaptionNumbering();
        this.context.notifyTableCaptionNumbering()
    }
    componentDidMount() {
        this.context.notifyTheoremNumbering();
        this.context.notifyImageCaptionNumbering();
        this.context.notifyTableCaptionNumbering()
    }
    componentWillUnmount() {
        this.context.notifyTheoremNumbering();
        this.context.notifyImageCaptionNumbering();
        this.context.notifyTableCaptionNumbering()
    }
    render() {
        return React.createElement("x-prefix", {
            onDoubleClick: this.preventEvent,
            onMouseDown: this.preventEvent
        },
        this.props.data)
    }
}
L.contextTypes = {
    notifyTheoremNumbering: PropTypes.any,
    notifyImageCaptionNumbering: PropTypes.any,
    notifyTableCaptionNumbering: PropTypes.any
};
var P = new class {
    update(e, t, n, r) {
        var a = 0;
        var i = 0;
        var o = null == t || DOMHelper.isChar(t);
        var s = t && DOMHelper.isConstantTextSymbol(t);
        var c = o || s;
        if (t) if (DOMHelper.isOpenCloseSymbol(t)) {
            var d = this.getHalfTopBottomFromOpenClose(t);
            if (null == d) {
                if (this.isEditAreaBlockOrLine(e)) return this.handlePowerIndexForNormalCharAttached(e),
                c = true;
                var h = this.calculateFromAttached(n, r, t);
                a = h.halfTop;
                i = h.halfBottom
            } else {
                a = d.halfTop;
                i = d.halfBottom
            }
        } else if (DOMHelper.isComposite(t) && t.reactInstance.getPowerIndexInfo) {
            var u = Geometry.scaleRect(DOMHelper.getElementRect(n), r);
            var p = t.reactInstance.getPowerIndexInfo();
            var m = p.rect;
            a = u.top - m.top;
            i = 1 * (m.height - a);
            c = c || p.shouldConsiderAsChar
        } else {
            if (!DOMHelper.isComposite(t) && !s && this.isEditAreaBlockOrLine(e)) return this.handlePowerIndexForNormalCharAttached(e);
            var f = this.calculateFromAttached(n, r, t);
            a = f.halfTop;
            i = f.halfBottom
        } else {
            var g = DOMHelper.getComputedCharHeight(e);
            var y = this.getSelftHalf(g);
            a = y.halfTop;
            i = y.halfBottom
        };
        var A = jQuery(e).children(".power-value");
        var E = jQuery(e).children(".index-value");
        var v = this.getPowerIndexFontSize(A);
        var S = this.getPowerIndexFontSize(E);
        var C = e.reactInstance.getModel();
        if (!this.isNoModified(e, a, i, C)) {
            this.cachePositions(e, a, i, C);
            var x = DOMHelper.getComputedFontSize(e);
            var I = x / v;
            var T = x / S;
            if (c) {
                this.setMargin(A, "bottom", (a / x - 1.55) * I);
                this.setMargin(E, "top", (i / x - .63) * T)
            } else {
                this.setMargin(A, "bottom", (a / x - 1.4) * I);
                this.setMargin(E, "top", (i / x - .53) * T)
            }
        }
    }
    isEditAreaBlockOrLine(e) {
        return e.firstElementChild.tagName != ElementTypes.editarea && e.lastElementChild.tagName != ElementTypes.editarea
    }
    calculateFromAttached(e, t, n) {
        var r = Geometry.scaleRect(DOMHelper.getElementRect(e), t);
        var a = Geometry.scaleRect(DOMHelper.getElementRect(n), t);
        var i = 1 * (r.top - a.top);
        return {
            halfTop: i,
            halfBottom: 1 * (a.height - i)
        }
    }
    clearCache(e) {
        if (e.hash) {
            e.hash = void 0;
            e.prevModel = void 0
        }
    }
    handlePowerIndexForNormalCharAttached(e) {
        var t = jQuery(e).children(".power-value");
        var n = jQuery(e).children(".index-value");
        this.setMargin(t, "bottom", -.925714);
        this.setMargin(n, "top", -.547899);
        this.clearCache(e)
    }
    setMargin(e, t, n) {
        if (! (e.length <= 0)) {
            var r = e.attr("top" == t ? "data-mgTop" : "data-mgBottom");
            var a = r ? Number.parseFloat(r) : 0;
            e.css("top" == t ? "margin-top" : "margin-bottom", a + n + "em")
        }
    }
    getPowerIndexFontSize(e) {
        return e.length > 0 ? DOMHelper.getComputedFontSize(e.get(0)) : 1
    }
    cachePositions(e, t, n, r) {
        var a = LineHashTopBottom([t, n]);
        e.hashTopBottom = a;
        e.prevModel = r
    }
    isNoModified(e, t, n, r) {
        var a = LineHashTopBottom([t, n]);
        return e.hash === a && e.prevModel === r
    }
    getSelftHalf(e) {
        var t = TextHelper.heightFromBaseLine(e);
        return {
            halfTop: t,
            halfBottom: e - t
        }
    }
    getHalfTopBottomFromOpenClose(e) {
        var t = e.reactInstance.getVerticalInfo();
        return t === undefined || null == t ? null : {
            halfTop: t.heightTop,
            halfBottom: t.heightBottom
        }
    }
};
var W = new class {
    flushUpdate(e) {
        return ReactDOM.unstable_batchedUpdates(() => {
            e.forEach((e) => {
                if (DOMHelper.isOpenCloseSymbol(e)) e.reactInstance.flushUpdate()
            })
        }),
        Promise.resolve()
    }
    maxTopBottom(e, t) {
        return _.reduce(e, (e, n) => {
            if (DOMHelper.isOpenCloseSymbol(n)) {
                var r = n.reactInstance.getVerticalInfo();
                return null != r ? {
                    maxTop: Math.max(e.maxTop, r.heightTop),
                    maxBottom: Math.max(e.maxBottom, r.heightBottom)
                } : e
            };
            var a = DOMHelper.getElementRect(n);
            var i = t - a.top;
            return DOMHelper.isPowerIndexSymbol(n) && (i = i - DOMHelper.getComputedFontSize(n) / 7),
            {
                maxTop: Math.max(e.maxTop, i),
                maxBottom: Math.max(e.maxBottom, a.bottom - t)
            }
        },
        {
            maxTop: 0,
            maxBottom: 0
        })
    }
    updateOpenClose(e, t, n, r) {
        var a = n.slice(e.index + 1, t.index);
        if (_.isEmpty(_.filter(a, (e) => {
            return ! (DOMHelper.isIndexSymbol(e) || DOMHelper.isChar(e) || DOMHelper.isOpenCloseSymbol(e) || DOMHelper.isConstantTextSymbol(e))
        }))) return this.clearCustomHeight(e.info.element),
        void this.clearCustomHeight(t.info.element);
        var i = DOMHelper.getElementRect(r);
        var o = this.maxTopBottom(a, i.bottom);
        var s = o.maxTop;
        var c = o.maxBottom;
        var d = DOMHelper.getComputedStyleAsNumber(r, "font-size");
        s = s + d / 10;
        c = c + d / 10;
        var h = "brace" == e.info.bracketType || "brace" == t.info.bracketType;
        e.info.element.reactInstance.setHeightInfo(s, c, d, h, i.top);
        t.info.element.reactInstance.setHeightInfo(s, c, d, h, i.top)
    }
    clearCustomHeight(e) {
        e.reactInstance.clearCustomHeight()
    }
};
var G = new class {
    process(e, t) {
        var n = [];
        var r = DOMHelper.findBlocks(e);
        var a = DOMHelper.findBaseLineBlock(e);
        var i = r.length;
        var o = false;
        var s = 0;
        for (; s < i; s++) {
            var c = r[s];
            if (DOMHelper.isPowerIndexSymbol(c)) {
                var d = this.getPreviousBlock(r, s);
                if (! (d && DOMHelper.isOpenCloseSymbol(d))) P.update(c, d, a, t)
            }
            if (DOMHelper.isPreScriptSymbol(c)) {
                var h = this.getNextBlock(r, s);
                if (! (h && DOMHelper.isOpenCloseSymbol(h))) P.update(c, h, a, t)
            };
            var u = DOMHelper.findOpenCloseSymbolInfo(c);
            if (u) if (o = true, "open" != u.bracketPosition) {
                if ("close" == u.bracketPosition) {
                    var p = n.length <= 0 ? void 0 : n.pop();
                    this.processPair(r, p, {
                        info: u,
                        index: s
                    },
                    a, t)
                }
            } else n.push({
                index: s,
                info: u
            })
        };
        var m = 0;
        for (; m < n.length; m++) {
            var f = n[m];
            this.clearCustomHeight(f);
            this.processBracketAround(r, f, a, t)
        }
        if (o) return W.flushUpdate(r)
    }
    processPair(e, t, n, r, a) {
        if (t && n) this.processSafePair(e, t, n, r);
        else {
            this.clearCustomHeight(t);
            this.clearCustomHeight(n)
        }
        this.processBracketAround(e, t, r, a);
        this.processBracketAround(e, n, r, a)
    }
    clearCustomHeight(e) {
        if (e) W.clearCustomHeight(e.info.element)
    }
    processSafePair(e, t, n, r) {
        W.updateOpenClose(t, n, e, r)
    }
    processBracketAround(e, t, n, r) {
        if (t) {
            var a = this.getNextBlock(e, t.index);
            if (a && DOMHelper.isPowerIndexSymbol(a)) P.update(a, t.info.element, n, r);
            var i = this.getPreviousBlock(e, t.index);
            if (i && DOMHelper.isPreScriptSymbol(i)) P.update(i, t.info.element, n, r)
        }
    }
    getPreviousBlock(e, t) {
        if (! (t <= 0)) return e[t - 1]
    }
    getNextBlock(e, t) {
        if (! (t >= e.length - 1)) return e[t + 1]
    }
};
/*n.d(t, "a", function () {
    return z
});*/
class z extends m {
    constructor(e) {
        super(e);
        this.lastHasAnyBracketOrPowerIndex = false;
        this.postLineProcess = () => {
            if (this.getLineElement()) return G.process(this.getLineElement(), this.getReverseScale())
        };
        this.handlePrefixMouseDown = (e) => {
            e.stopPropagation();
            e.preventDefault();
            var t = this.getLineData();
            var n = StyleHelper.getLineStyle(t, "listType");
            if (LineHelper.isBulletListType(n)) this.props.onChildSelectedChanged(0, 0, {
                controlled: true,
                listTypeSelect: "all"
            },
            {})
        };
        this.onTagInfoChanged = (e, t) => {
            var n = PropUpdateHelper.setProp(this.getLineData(), "tagInfo", e);
            this.props.onDataChanged(n, t)
        };
        this.getRef = (e) => {
            this.line = e;
            if (e) e.reactInstance = this
        };
        if (this.props.allowTag) this.state = {
            showTagSetting: false
        }
    }
    getLineSelected() {
        return this.props.selected
    }
    getSelectedData(e) {
        var t = this.getLineSelected();
        return t === undefined || null == t ? null : t.charIndex === e ? t : void 0
    }
    shouldComponentUpdate(e, t) {
        return this.state != t || super.shouldComponentUpdate(e, t) || e.isFirstLine != this.props.isFirstLine || e.isLastLine != this.props.isLastLine || e.allowTag != this.props.allowTag || this.isLineInfoUpdate(e, this.props)
    }
    componentDidMount() {
        super.componentDidMount();
        if (this.getLineData().tagInfo) this.context.notifyLineTagRender()
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.getLineData().tagInfo) this.context.notifyLineTagRender()
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        if (this.getLineData(e).tagInfo != this.getLineData(this.props).tagInfo) this.context.notifyLineTagRender()
    }
    isLineInfoUpdate(e, t) {
        var n = e.lineInfo;
        var r = this.getLineInfo(t);
        return (null != n || null != r) && ( !! n != !!r || (n.indentIndex != r.indentIndex || !ArrayHelper.arrayEquals(n.indentCounters, r.indentCounters)))
    }
    queuePostProcessLineIfNecessary(e, t) {
        if ((t || !e || this.shouldCallPostProcess(e)) && this.lastHasAnyBracketOrPowerIndex) this.context.fixedContextHandler.getBatchUpdater().push(this.postLineProcess, this)
    }
    shouldCallPostProcess(e) {
        return this.getLineData(e) != this.getLineData(this.props) || e.fontSize != this.props.fontSize || this.isLineInfoUpdate(this.props, e)
    }
    renderEmptyLineBlock(e) {
        return 0 === e.length ? React.createElement("empty-block", {
            "aria-label": "empty line"
        },
        " ") : null
    }
    getLineInfo(e) {
        return e ? e.lineInfo || {} : this.props.lineInfo
    }
    renderPrefix() {
        var e = this.getLineData();
        var t = this.getLineInfo();
        var n = I.getPrefix({
            line: e,
            lineInfo: t
        });
        if (e.___prefixText = n, !n) return React.createElement("x-prefix", null);
        var r = StyleHelper.getHtmlFromStyleForBullet(e) || {};
        return r.flexShrink = 0,
        "section" == StyleHelper.getLineStyle(e, "listType") ? React.createElement(L, {
            data: n
        }) : (r.minWidth = 15, React.createElement("x-prefix", {
            style: r,
            onDoubleClick: this.handleDoubleClick,
            onMouseDown: this.handlePrefixMouseDown
        },
        n))
    }
    handleDoubleClick(e) {
        e.stopPropagation();
        e.preventDefault()
    }
    getFontSizePixel() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        return this.context.mathFontSizeBase * this.props.fontSize * e
    }
    getRoundEm(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return DOMHelper.getEmRound(e, this.getFontSizePixel(t))
    }
    getRoundEmStr(e, t) {
        return this.getRoundEm(e, t) + "em"
    }
    renderTag() {
        if (this.props.allowTag) {
            var e = this.getLineData();
            return this.props.selected || e.tagInfo && e.tagInfo.type ? React.createElement(LineTagSetting, {
                onTagInfoChanged: this.onTagInfoChanged,
                tagInfo: e.tagInfo
            }) : void 0
        }
    }
    getBaseLineClass() {
        var e = this.props;
        var t = e.rootLevel;
        var n = e.isTextMode;
        return C.getClass({
            rootLevel: t,
            isTextMode: n,
            allowTag: this.props.allowTag,
            selected: this.getLineSelected(),
            line: this.getLineData(),
            lineInfo: this.getLineInfo(),
            inTableOfContent: this.props.inTableOfContent
        })
    }
    getRenderBlocksInfo() {
        var e = this.props.isTextMode;
        var t = {};
        var n = this.getLineData().blocks;
        var r = this.renderBlocks(n, !e && this.shouldCollectTextMetrics());
        return this.props.stripInfo && r.metrics && !r.metrics.haveComposite && (this.props.stripInfo.stripUp && !r.metrics.haveUpperChar && (t.marginTop = this.getRoundEmStr(SymbolElementNames.upperSmallMarginTopEm)), this.props.stripInfo.stripDown && !r.metrics.haveLowerChar && (t.marginBottom = this.getRoundEmStr(SymbolElementNames.lowerSmallMarginBottomEm))),
        {
            blockRenders: r.blockRenders,
            style: t,
            shouldSingleBlockLine: r.shouldSingleBlockLine
        }
    }
    render() {
        var e;
        var t = this.props.rootLevel;
        var n = this.getLineData();
        var r = n.blocks;
        var i = this.getBaseLineClass();
        var s = [];
        var l = StyleHelper.getLineStyle(n, "textDirection");
        if (t) {
            if (!this.suppress) {
                var c = this.renderBlocks(r, false);
                s = c.blockRenders;
                i = classNames(i, {
                    "full-line-block-inside": c.shouldSingleBlockLine
                })
            }
            return React.createElement("x-line", {
                ref: this.getRef,
                key: n.id,
                style: this.props.style,
                class: i,
                "data-line-id": "section" == StyleHelper.getLineStyle(n, "listType") ? n.id : void 0
            },
            this.renderPrefix(), React.createElement("x-blocks", {
                dir: l
            },
            React.createElement("baseline-block", null), this.renderEmptyLineBlock(r), s))
        }
        if (!this.suppress) {
            var d = this.getRenderBlocksInfo();
            e = d.style;
            s = d.blockRenders;
            i = classNames(i, {
                "full-line-block-inside": d.shouldSingleBlockLine
            })
        }
        return this.props.style && (e = _.assignIn({},
        e, this.props.style)),
        React.createElement("x-line", {
            dir: l,
            style: e,
            ref: this.getRef,
            key: n.id,
            class: i
        },
        React.createElement("baseline-block", null), this.renderEmptyLineBlock(r), this.renderTag(), s)
    }
    onDataChanged(e, t, n, r) {
        this.props.onChildDataChanged(e, t, n, r)
    }
    onSelectedChanged(e, t, n, r) {
        this.props.onChildSelectedChanged(e, t, n, r)
    }
    getLineData(e) {
        return e ? (DocumentCorruption.makeSureBlocks(e.line), e.line) : (DocumentCorruption.makeSureBlocks(this.props.line), this.props.line)
    }
    renderNormalTextBlock(e, t, n, r) {
        var a = this.context.baseMathModeFontFamily;
        if (this.props.isTextMode || this.props.rootLevel || this.props.renderAsPlainText || this.props.noSpacingRule) return StyleHelper.hasHyperLink(e) ? void n.push(React.createElement("x-block", {
            class: "role-hyper-link",
            "data-hyper-link-url": e.style.hyperLink,
            style: StyleHelper.getHtmlFromStyle(e, a),
            key: e.id
        },
        e.text)) : void n.push(React.createElement("x-block", {
            style: StyleHelper.getHtmlFromStyle(e, a),
            key: e.id
        },
        e.text));
        var i = TextBlockInfo.getTextBlockInfo(e, t, r || {},
        this.props.renderContext);
        var s = 0;
        for (; s < i.length; s++) {
            var l = i[s];
            n.push(React.createElement("x-block", {
                style: StyleHelper.getHtmlFromStyle(e, a),
                class: classNames(l.category),
                key: l.key
            },
            l.text))
        }
    }
    shouldCollectTextMetrics() {
        return (this.props.isFirstLine || this.props.isLastLine) && this.props.stripInfo && (this.props.stripInfo.stripUp || this.props.stripInfo.stripDown)
    }
    getReverseScale() {
        return this.context.getScale ? 1 / this.context.getScale() : 1
    }
    renderBlocks(e, t) {
        var n = 0;
        var r = [];
        var a = {};
        var i = {};
        var s = null;
        var l = false;
        this.lastHasAnyBracketOrPowerIndex = false;
        var h = 0;
        var u = e.length;
        for (; h < u; h++) {
            var p = DocumentCorruption.makeSureBlock(e, h);
            if (i = {
                block: h < u - 1 ? e[h + 1] : null
            },
            !l && CheckObject.isSingeLineBlock(p) && (l = true), "composite" == p.type || "single" == p.type) {
                var m = "";
                var f = InitHelper.getCustomSymbolComponent(p.text);
                if (f.isOperatorName) m = TextBlockInfo.buildClassForOperatorName(a, i);
                if (t) s = TextBlockMetricInfo.fillMetricsForNonTextBlock(p, f, s);
                if (!this.lastHasAnyBracketOrPowerIndex) if (f.isBracket || f.isDynamicPowerIndexPosition) this.lastHasAnyBracketOrPowerIndex = true;
                var y = f.getViewComponent();
                var E = this.props;
                var v = this.getSelectedData(n);
                var S = React.createElement(y, {
                    isRootLine: E.rootLevel,
                    isFirstMathModeLevel: E.isFirstMathModeLevel,
                    allowTag: E.allowTag,
                    stripInfo: E.stripInfo,
                    fracLevel: E.fracLevel,
                    fontSize: E.fontSize,
                    lineSelected: !!this.getLineSelected(),
                    displayMode: E.displayMode,
                    data: p,
                    insideDiagram: E.insideDiagram,
                    selected: v,
                    onDataChanged: this.onDataChanged.bind(this, h, n),
                    onSelectedChanged: this.onSelectedChanged.bind(this, h, n),
                    key: p.id,
                    customDataStr: m,
                    previousBlockInfo: a,
                    renderContext: E.renderContext,
                    isLastBlock: h >= e.length - 1
                });
                n = n + 1;
                r.push(S);
                a = {
                    category: f.category,
                    block: p,
                    isOperatorName: f.isOperatorName
                }
            } else {
                var C = TextUtils.getUnistring(p);
                if (t) s = TextBlockMetricInfo.fillMetricsForTextBlock(C, s);
                n = n + C.length;
                this.renderNormalTextBlock(p, C, r, a);
                a = {
                    block: p
                }
            }
        }
        return {
            blockRenders: r,
            metrics: s,
            shouldSingleBlockLine: l
        }
    }
}

export default z