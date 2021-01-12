import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ArrayHelper from '../Mathcha/ArrayHelper';
import CursorPositionHelper from './CursorPositionHelper';
import DocumentCorruption from '../Document/DocumentCorruption';
import DOMHelper from '../Elements/DOMHelper';
import Line from '../Elements/Line';
import LineHelper from './LineHelper';
import LineTagSetting from '../Elements/LineTagSetting';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(21) /*EditArea*/

/// var r = n(3);  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 8 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 7 times
/// var l = n.n(s);
/// var c = n(7)/*PropUpdateHelper*/;  // 6 times
/// var d = n(4)/*DOMHelper*/;  // 1 times
/// var h = n(43)/*ArrayHelper*/;  // 1 times
/// var u = n(248)/*Line*/;  // 1 times
/// var p = n(239)/*LineTagSetting*/;  // 1 times
/// var m = n(95)/*DocumentCorruption*/;  // 2 times
/// var f = n(23)/*PropTypesExporter*/;  // 2 times
/// var g = n.n(f);
/// var y = n(18)/*StyleHelper*/;  // 6 times
/// var A = n(80)/*LineHelper*/;  // 2 times
var is15 = React.version.startsWith("15");
var E = new class {
    getSafeIndentCounts(e, t) {
        return e || _.times(t, () => {
            return null
        })
    }
    handleLineInfo(e, t) {
        t = t || {
            indentCounters: null,
            sectionIndentCounters: null,
            lastIndentIndex: -1,
            lastSectionIndentIndex: -1,
            hasListItem: false,
            isBulletListType: false
        };
        var n = StyleHelper.getLineStyle(e, "listType");
        if (t.hasListItem = null != n && "none" != n, t.isBulletListType = LineHelper.isBulletListType(n), t.isBulletListType) {
            var r = this.getAndModifyIndentIfIndentLevelIsSoDeep(e, t, t.lastIndentIndex);
            return LineHelper.isOrderListType(n, r) && (t.indentCounters = this.getSafeIndentCounts(t.indentCounters, StyleHelper.getMaxNestedListLevel() + 1), this.clearNestedLevelListItems(t, r), t.indentCounters[r] = null == t.indentCounters[r] ? 0 : t.indentCounters[r] + 1),
            t.lastIndentIndex = r,
            t
        }
        if ((null != t.indentCounters || t.lastIndentIndex >= 0) && (t.indentCounters = null, t.lastIndentIndex = -1), "section" == n) {
            var a = this.getAndModifyIndentIfIndentLevelIsSoDeep(e, t, t.lastSectionIndentIndex);
            return t.sectionIndentCounters = this.getSafeIndentCounts(t.sectionIndentCounters, StyleHelper.getMaxNestedSectionLevel() + 1),
            this.clearNestedLevelSectionItems(t, a),
            t.sectionIndentCounters[a] = null == t.sectionIndentCounters[a] ? 0 : t.sectionIndentCounters[a] + 1,
            t.lastSectionIndentIndex = a,
            t
        }
        return e.___tempIndentIndex && (e.___tempIndentIndex = void 0),
        t
    }
    getAndModifyIndentIfIndentLevelIsSoDeep(e, t, n) {
        var r = StyleHelper.getLineStyle(e, "indentIndex", 0);
        return r > n + 1 ? (r = n + 1, e.___tempIndentIndex = r) : e.___tempIndentIndex = void 0,
        r
    }
    clearNestedLevelListItems(e, t) {
        var n = t + 1;
        for (; n <= StyleHelper.getMaxNestedListLevel(); n++) e.indentCounters[n] = null;
        return e
    }
    clearNestedLevelSectionItems(e, t) {
        var n = t + 1;
        for (; n <= StyleHelper.getMaxNestedSectionLevel(); n++) e.sectionIndentCounters[n] = null;
        return e
    }
};
/// var v = n(14)/*classnames*/;  // 1 times
/// var S = n.n(v);
/// var C = n(49)/*CursorPositionHelper*/;  // 1 times
String.prototype.replaceAt = function (e, t) {
    return this.substr(0, e) + t + this.substr(e + t.length)
};
class EditArea extends React.Component {
    constructor() {
        super(...arguments);
        console.log("[EditArea]", this.props)
        this.error = false;
        this.onTagInfoChanged = (e, t) => {
            this.props.onDataChanged(PropUpdateHelper.setProp(this.props.data, "tagInfo", e), t)
        };
        this.handleRef = (e) => {
            if (e) {
                this.editor = e;
                e.reactInstance = this
            }
        }
    }
    shouldComponentUpdate(e) {
        return e.data != this.props.data || e.className != this.props.className || !ArrayHelper.areEqualShallow(e.style, this.props.style) || e.selected != this.props.selected || e.showBorder != this.props.showBorder || e.fontSize != this.props.fontSize || e.allowTag != this.props.allowTag || e.allowEditorTag != this.props.allowEditorTag || e.borderIfEmpty != this.props.borderIfEmpty
    }
    componentDidMount() {
        if (this.props.data.tagInfo) this.context.notifyLineTagRender()
    }
    componentWillUnmount() {
        if (this.props.data.tagInfo) this.context.notifyLineTagRender()
    }
    componentDidUpdate(e) {
        if (e.data.tagInfo != this.props.data.tagInfo) this.context.notifyLineTagRender()
    }
    getData() {
        return this.props.data
    }
    getModel() {
        return this.props.data
    }
    showCursor() {
        this.props.needShowCursor()
    }
    select(e, t) {
        var n = {
            cursorContext: {
                direction: e.direction,
                maxRelativeXAxisPosition: e.maxRelativeXAxisPosition,
                htmlEditor: this.editor,
                htmLine: e.line,
                positionOnRange: e.positionOnRange
            },
            isExtendingSelection: !!t
        };
        this.props.onSelectedChanged({
            lineIndex: e.lineIndex,
            charIndex: e.charIndex
        },
        n)
    }
    selectCursorFromPosition(e, t, n, r) {
        var a = CursorPositionHelper.buildCursorPosition(this.editor, e, {
            left: t,
            top: n
        });
        if (!a) return null;
        this.select(a, r)
    }
    onChildDataChanged(e, t, n, r, a) {
        var i = PropUpdateHelper.set(this.props.data.lines[e].blocks, t, r);
        this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "lines", PropUpdateHelper.set(this.props.data.lines, e + ".blocks", i)), a)
    }
    onDataChanged(e, t, n) {
        this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "lines", PropUpdateHelper.setIndex(this.props.data.lines, e, t)), n)
    }
    onChildSelectedChanged(e, t, n, r, i) {
        r = _.assignIn({},
        r, {
            lineIndex: e,
            charIndex: n
        });
        this.props.onSelectedChanged(r, i)
    }
    componentWillUpdate(e) {
        if (e.ignoreFindingMovingBlocks == false) if ((!this.props.optimizeForOneLine || e.data.lines.length >= 2 && this.props.data.lines.length >= 2) && e.data.lines.length != this.props.data.lines.length) {
            console.log("trying finding moving blocks");
            this.movingBlocksInfo = this.findMovedBlocks(this.props.data.lines, e.data.lines);
            if (this.movingBlocksInfo) console.log("moving blocks:TRUE")
        }
    }
    findReactBlockChildren(e) {
        if (is15) {
            var children = e._renderedComponent._renderedChildren;
        } else {
            var children = e.children;
        }
        if (DOMHelper.isRootEditLine(is15 ? e.getHostNode() : e)) {
            return is15 ? children[".1"]._renderedChildren : children[1].children
        } else {
            return children
        }
    }
    findDomMovingBlocks(e) {
        var t = this.findDomByKey(e.changedLine.id);
        var n = {};
        var r = this.findReactBlockChildren(t);
        var i;
        for (i in r) {
            if (r.hasOwnProperty(i)) {
                var a = r[i];
                var endsWith = e.movingBlocks.some((e) => {
                    return i.endsWith("$" + e.id)
                });
                if (endsWith) {
                    n[i] = a
                }
            }
        };
        e.movingDomBlocks = n;
        if (is15) {
            t._instance.keepRemovedBlocks = n;
        }
        return e
    }
    findDomByKey(e) {
        if (is15) {
            var children = this._reactInternalInstance._renderedComponent._renderedChildren;
        } else {
            var children = this._reactInternalFiber.child.stateNode.children;
        }
        if (! (this.props.noAreaContainer || this.props.isTextMode)) {
            if (is15) {
                children = children[".1"]._renderedChildren
            } else {
                children = children[1].children
            }
        }
        var child = _.find(children, (t, n) => {
            if (is15) {
                return n.endsWith("$" + e)
            } else {
                return t.reactInstance._reactInternalFiber.key === e
            }
        });
        return child
    }
    findMovedBlocks(e, t) {
        var n = _.difference(e, t);
        var r = _.difference(t, e);
        var a = null;
        r.forEach((e) => {
            n.forEach((t) => {
                if (!a && e.id != t.id) {
                    var n = _.intersectionBy(e.blocks, t.blocks, "id");
                    if (n.length > 0) a = {
                        lastNewLine: e,
                        changedLine: t,
                        movingBlocks: n
                    }
                }
            })
        });
        if (a) {
            var domMovingBlocks = this.findDomMovingBlocks(a);
            return domMovingBlocks;
        }
    }
    getLineSelected(e) {
        if (null == this.props.selected) return null;
        var t = this.props.selected;
        return t.lineIndex === e ? t : void 0
    }
    handleLineInfo(e, t) {
        return E.handleLineInfo(e, t)
    }
    getEditClss() {
        return Line
    }
    constructLineInfo(e, t) {
        return e.hasListItem ? e.isBulletListType ? {
            previousLine: t,
            indentIndex: e.lastIndentIndex,
            indentCounters: e.indentCounters ? _.clone(e.indentCounters) : null
        } : {
            previousLine: t,
            indentIndex: e.lastSectionIndentIndex,
            indentCounters: e.sectionIndentCounters ? _.clone(e.sectionIndentCounters) : null
        } : {
            previousLine: t
        }
    }
    renderLines(e) {
        var t = null;
        var n = [];
        var r = e.length;
        var a = null;
        var i = 0;
        for (; i < r; i++) {
            var s = DocumentCorruption.makeSureLine(e, i);
            t = this.handleLineInfo(s, t);
            var l = this.constructLineInfo(t, a);
            var c = null;
            var d = null;
            if (this.movingBlocksInfo) {
                if (s.id === this.movingBlocksInfo.changedLine.id) c = this.movingBlocksInfo.movingDomBlocks;
                if (s.id === this.movingBlocksInfo.lastNewLine.id) d = this.movingBlocksInfo.movingDomBlocks
            }
            var h = this.getLineSelected(i);
            var u = this.getEditClss();
            n.push(React.createElement(u, {
                isTextMode: this.props.isTextMode,
                isFirstMathModeLevel: this.props.isFirstMathModeLevel,
                allowTag: this.props.allowTag,
                isFirstLine: this.props.rootLevel ? void 0 : 0 === i,
                isLastLine: this.props.rootLevel ? void 0 : i === r - 1,
                stripInfo: this.props.stripInfo,
                fontSize: this.getFontSize(),
                fracLevel: this.props.fracLevel,
                lineInfo: l,
                keepRemovedBlocks: c,
                movingBlocks: d,
                key: s.id,
                line: s,
                lineIndex: i,
                noSpacingRule: this.props.noSpacingRule,
                renderAsPlainText: this.props.renderAsPlainText,
                inTableOfContent: this.props.inTableOfContent,
                rootLevel: this.props.rootLevel,
                selected: h,
                displayMode: this.props.displayMode,
                onChildDataChanged: this.onChildDataChanged.bind(this, i),
                onDataChanged: this.onDataChanged.bind(this, i),
                onChildSelectedChanged: this.onChildSelectedChanged.bind(this, i),
                renderContext: this.props.renderContext,
                style: this.props.lineStyle
            }));
            a = s
        }
        return n
    }
    getKeyName() {
        return this.props.keyName
    }
    isEditorEmpty() {
        return 1 === this.props.data.lines.length && 0 === this.props.data.lines[0].blocks.length
    }
    getFontSize() {
        return this.props.fontSize
    }
    renderAreaBaseLine() {
        if (!this.props.isTextMode && !this.props.noAreaContainer && !this.isOneLineEditor()) return React.createElement("area-baseline", {
            "aria-hidden": true
        },
        " ")
    }
    isOneLineEditor() {
        return 1 === this.props.data.lines.length
    }
    isOptmizeForOneLine() {
        return this.props.optimizeForOneLine && this.isOneLineEditor()
    }
    renderLinesContainer() {
        return this.props.isTextMode || this.props.noAreaContainer || this.isOptmizeForOneLine() ? this.renderLines(this.props.data.lines) : React.createElement("area-container", null, this.renderLines(this.props.data.lines))
    }
    renderTag() {
        if (this.props.allowEditorTag) return this.props.selected || this.props.data.tagInfo && this.props.data.tagInfo.type ? React.createElement(LineTagSetting, {
            onTagInfoChanged: this.onTagInfoChanged,
            tagInfo: this.props.data.tagInfo
        }) : void 0
    }
    render() {
        if (this.error) return React.createElement("edit-area", null, "This document has been corrupted, please report to bilgi@simetri8.com for recovery, sorry for this issue");
        DocumentCorruption.makeSureLines(this.props.data);
        var e = classNames(this.props.className, {
            selected: this.props.showBorder || this.props.borderIfEmpty && this.isEditorEmpty(),
            "no-area-container": this.props.noAreaContainer || this.isOptmizeForOneLine(),
            "high-order": this.props.highZOrderIndexOfEmpty && this.isEditorEmpty(),
            "text-mode": this.props.isTextMode,
            "read-only": this.props.readOnly
        });
        return React.createElement("edit-area", {
            ref: this.handleRef,
            class: e,
            style: this.props.style
        },
        this.renderAreaBaseLine(), this.renderLinesContainer(), this.renderTag())
    }
}
EditArea.contextTypes = {
    notifyLineTagRender: PropTypes.any,
    fixedContextHandler: PropTypes.any
};

export default EditArea