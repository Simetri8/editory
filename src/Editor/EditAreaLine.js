import _ from 'lodash';
import React from 'react';
import CursorPositionHelper from './CursorPositionHelper';
import Line from '../Elements/Line';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(112) /*EditAreaLine*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var s = n(248)/*Line*/;  // 1 times
/// var l = n(7)/*PropUpdateHelper*/;  // 3 times
/// var c = n(49)/*CursorPositionHelper*/;  // 1 times
class d extends Line {
    constructor() {
        super(...arguments);
        this.getEditorRef = (e => {
            this.editor = e;
            e && (e.reactInstance = this)
        })
    }
    getKeyName() {
        return this.getProps().keyName
    }
    getModel() {
        return this.getProps().data
    }
    getProps() {
        return this.props
    }
    shouldComponentUpdate(e, t) {
        return this.getProps().data != e.data || super.shouldComponentUpdate(e, t)
    }
    select(e, t) {
        var n = {
            cursorContext: {
                direction: e.direction,
                maxRelativeXAxisPosition: e.maxRelativeXAxisPosition,
                htmlEditor: this.editor,
                htmLine: this.editor,
                positionOnRange: e.positionOnRange
            },
            isExtendingSelection: !!t
        };
        this.getProps().onSelectedChanged({
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
    getLineData(e) {
        return e ? e.data.lines[0] : this.getProps().data.lines[0]
    }
    getLineInfo() {
        return {}
    }
    getLineElement() {
        return this.editor
    }
    isLineInfoUpdate() {
        return !1
    }
    onChildSelectedChanged(e, t, n, r) {
        n = _.assignIn({},
        n, {
            lineIndex: 0,
            charIndex: t
        });
        this.getProps().onSelectedChanged(n, r)
    }
    onSelectedChanged(e, t, n, r) {
        this.onChildSelectedChanged(e, t, n, r)
    }
    onChildDataChanged(e, t, n, r) {
        var a = PropUpdateHelper.set(this.getProps().data.lines[0].blocks, e, n);
        this.getProps().onDataChanged(PropUpdateHelper.set(this.getProps().data, "lines", PropUpdateHelper.set(this.getProps().data.lines, "0.blocks", a)), r)
    }
    onDataChanged(e, t, n, r) {
        this.onChildDataChanged(e, t, n, r)
    }
    shouldCollectTextMetrics() {
        return !0
    }
    render() {
        var e = this.getLineData(),
        t = this.getBaseLineClass() + " " + (this.getProps().className || ""),
        n = this.getRenderBlocksInfo(),
        r = n.blockRenders,
        i = n.style,
        s = this.getProps();
        return i = _.assignIn({},
        i, this.getProps().style || {},
        {
            outline: s.selected && (void 0 === s.showBorder || s.showBorder) ? this.context.fixedContextHandler.getOutlineSelected() : ""
        }),
        React.createElement("editarea-line", {
            "data-mgTop": i.marginTop ? Number.parseFloat(i.marginTop.toString()) : 0,
            "data-mgBottom": i.marginBottom ? Number.parseFloat(i.marginBottom.toString()) : 0,
            style: i,
            ref: this.getEditorRef,
            class: t
        },
        React.createElement("baseline-block", null), this.renderEmptyLineBlock(e.blocks), r)
    }
}

export default d