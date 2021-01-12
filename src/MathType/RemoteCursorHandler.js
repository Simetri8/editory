import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BaseComponent from '../Elements/BaseComponent';
import BlockHelper from '../Elements/BlockHelper';
import CursorDrawer from './CursorDrawer';
import CursorInformationBuilder from './CursorInformationBuilder';
import CursorPositionHelper from '../Editor/CursorPositionHelper';
import DOMHelper from '../Elements/DOMHelper';
import Global from '../Global';
import RemoteCursorColor from '../Document/RemoteCursorColor';
import SelectionFinder from './SelectionFinder';
import TextUtils from '../Editor/TextUtils';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1617) /*RemoteCursorHandler*/

/// var i = n(0)/*React*/;  // 5 times
/// var o = n.n(i);
/// var h = n(23)/*PropTypesExporter*/;  // 1 times
/// var u = n.n(h);
/// var m = n(4)/*DOMHelper*/;  // 6 times
/// var C = n(2)/*lodash*/;  // 7 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var w = n(36)/*TextUtils*/;  // 3 times
/// var ee = n(11)/*Global*/;  // 1 times
/// var ne = n(43)/*ArrayHelper*/;  // 1 times
/// var he = n(49)/*CursorPositionHelper*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var Oo = n(256)/*RemoteCursorColor*/;  // 1 times
/// var CursorDrawer = n(1651)/*CursorDrawer*/;  // 1 times
/// var CursorInformationBuilder = n(1652)/*CursorInformationBuilder*/;  // 1 times
/// var SelectionFinder = n(1658)/*SelectionFinder*/;  // 1 times
class RemoteCursorDrawing {
    constructor() {
        this.map = {};
    }
    draw() {
        return _.values(this.map);
    }
    removeCursors(e) {
        e.forEach((e) => {
            delete this.map[e];
        });
    }
    setRemoteCursors(e, t, n) {
        e.map((e) => {
            return this.buildRemoteCursorDrawing(e, t, n);
        }).forEach((e) => {
            this.map[e.siteId] = e;
        });
    }
    getSiteIds() {
        return _.keys(this.map).map((e) => {
            return Number.parseInt(e, 10);
        });
    }
    invalidateCursorPositions(e, t) {
        _.keys(this.map).forEach((n) => {
            var r = this.prepositionCursor(this.map[n], e, t);
            if (r) {
                this.map[n] = r;
            }
        });
    }
    changeCursorName(e, t) {
        if (this.map[e]) {
            this.map[e].remoteCursor.displayName = t;
            this.map[e].name = t;
        }
    }
    prepositionCursor(e, t, n) {
        var r = e.objectMetrics;
        var a = this.getObjectMetrics(e.position.attachGeoPosElement, e.remoteCursor.selected, n);
        if (r && a) {
            var i = this.getPositionShift(r, a);
            return i ? (e.style.top += i.top, void(e.style.left += i.left)) : this.getPositionTextChanged(r.lineText, a.lineText, e, t, n);
        }
    }
    getPositionTextChanged(e, t, n, r, a) {
        if (e.length != t.length) {
            var i = _.cloneDeep(n.remoteCursor.selected);
            var o = BlockHelper.findLeafSelected(i);
            var s = TextUtils.getUnistringUncached(t).rawIndexAt(o.charIndex);
            if (e.substring(0, s) != t.substring(0, s)) {
                var l = TextUtils.length(t) - TextUtils.length(e);
                return console.log("text changed,increase number of char"),
                o.charIndex += l,
                this.buildRemoteCursorDrawing({
                    siteId: n.siteId,
                    selected: i,
                    displayName: n.remoteCursor.displayName
                },
                r, a);
            }
        }
    }
    getPositionShift(e, t) {
        if (e.boxes.length != t.boxes.length) {
            return null;
        }
        var n = 0;
        for (; n < e.boxes.length; n++) {
            var r = e.boxes[n];
            var a = t.boxes[n];
            if (r.width != a.width || r.height != a.height) {
                return null;
            }
        }
        return {
            left: t.left - e.left,
            top: t.top - e.top
        };
    }
    buildRemoteCursorDrawing(e, t, n) {
        var r = CursorInformationBuilder.buildFullCursorInformation(n, e.selected, t, CursorPositionHelper.emptyCursorContext(), "closest");
        if ("not-matched" == r) {
            return null;
        }
        var a = CursorDrawer.drawRemote(r, {
            name: "Nha",
            color: RemoteCursorColor.generate(e.siteId)
        });
        return {
            siteId: e.siteId,
            name: e.displayName,
            style: a,
            remoteCursor: e,
            position: r,
            objectMetrics: this.getObjectMetrics(r.attachGeoPosElement, null, null)
        };
    }
    getObjectMetrics(e, t, n) {
        try {
            if (!e) {
                return null;
            }
            if (DOMHelper.notInDomeTree(e)) {
                if (!t) {
                    return null;
                }
                var r = SelectionFinder.findLine(n, t);
                if (!r) {
                    return;
                }
                return {
                    left: 0,
                    top: 0,
                    boxes: [],
                    lineText: this.getLineText(r)
                };
            }
            var a = e.getClientRects();
            if (a.length <= 0) {
                return null;
            }
            if (!DOMHelper.isChar(e) && !DOMHelper.isEmptyBlock(e)) {
                return;
            }
            var i = DOMHelper.closetEditLine(e);
            return {
                left: Math.round(a[0].left),
                top: Math.round(a[0].top),
                boxes: _.toArray(a).map((e) => {
                    return {
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    };
                }),
                lineText: this.getLineText(i)
            };
        } catch(e) {
            return console.warn(e),
            null;
        }
    }
    getLineText(e) {
        return DOMHelper.findBlocks(e).map((e) => {
            return DOMHelper.isChar(e) ? e.innerText : "_";
        }).join("");
    }
}
class RemoteCursorContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cursors: [],
            transparentSiteIds: []
        };
        this.drawing = new RemoteCursorDrawing();
        this.runObj = TimerHelper.createLaterRunObject("latest", 200, false);
        this.tryUpdateWithMainCursorChanged = () => {
            var e = this.buildTransparentSiteIds(this.mainCursorPos, this.state.cursors);
            if (!ArrayHelper.arrayEquals(e, this.state.transparentSiteIds)) {
                this.setState({
                    transparentSiteIds: e
                });
            }
        };
        this.processUpdateRemoteCursorPositions = () => {
            if (this.adapter) {
                this.adapter.requestPreposition(this.drawing.getSiteIds());
            }
            var e = this.context.getEditorInfo();
            this.drawing.invalidateCursorPositions(e.mathTypeRef, e.rootEditorElement);
            this.refreshCursorsFromDrawing();
        };
    }
    shouldComponentUpdate(t) {
        return this.state.cursors != t.cursors || this.state.transparentSiteIds != t.transparentSiteIds;
    }
    render() {
        return this.runObj.cancel(),
        React.createElement("div", {
            className: "remote-cursor-container",
            style: {
                position: "absolute",
                left: 0,
                top: 0
            }
        },
        this.state.cursors.map((e) => {
            return this.renderCursor(e);
        }));
    }
    renderCursor(e) {
        var t = .8;
        return this.state.transparentSiteIds.includes(e.siteId) && (t = .1),
        React.createElement("div", {
            key: e.siteId,
            style: {
                width: 1,
                position: "absolute",
                left: e.style.left,
                top: e.style.top,
                borderLeft: "2px solid ".concat(e.style.borderColor),
                height: e.style.height,
                zIndex: 1e4,
                opacity: 1,
                pointerEvents: "none"
            }
        },
        React.createElement("div", {
            style: {
                position: "absolute",
                left: -2,
                top: -18,
                background: e.style.borderColor,
                color: "white",
                fontSize: 12,
                padding: 2,
                maxWidth: 100,
                whiteSpace: "nowrap",
                opacity: t
            }
        },
        e.name));
    }
    changeCursorName(e, t) {
        this.drawing.changeCursorName(e, t);
        this.refreshCursorsFromDrawing();
    }
    setRemoteCursors(e, t) {
        if (t && !this.adapter) {
            this.adapter = t;
        }
        var n = this.context.getEditorInfo();
        this.drawing.setRemoteCursors(e, n.mathTypeRef, n.rootEditorElement);
        this.refreshCursorsFromDrawing();
    }
    shouldTransparentCursorTagName(e, t) {
        return _.inRange(e.left, t.left, t.left + 100) && _.inRange(e.top, t.top - 50, t.top);
    }
    buildTransparentSiteIds(e, t) {
        if (!e) {
            return [];
        }
        var n = [];
        return t.forEach((t) => {
            if (this.shouldTransparentCursorTagName(e, t.style)) {
                n.push(t.siteId);
            }
        }),
        n;
    }
    notifyMainSelectedPosition(e) {
        this.mainCursorPos = e;
        this.runObj.later(this.tryUpdateWithMainCursorChanged);
    }
    refreshCursorsFromDrawing() {
        var e = this.drawing.draw();
        var t = this.buildTransparentSiteIds(this.mainCursorPos, e);
        this.setState({
            cursors: e,
            transparentSiteIds: t
        });
    }
    removeSites(e) {
        this.drawing.removeCursors(e);
        this.refreshCursorsFromDrawing();
    }
}
RemoteCursorContainer.contextTypes = {
    getEditorInfo: PropTypes.any
};
class RemoteCursorHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.handleRef = (e) => {
            this.remoteCursors = e;
        };
    }
    render() {
        if (Global.isCollaboratingTesting()) {
            return React.createElement(RemoteCursorContainer, {
                ref: this.handleRef
            });
        } else {
            return null;
        }
    }
    notifyMainSelectedPosition(e) {
        if (this.remoteCursors) {
            this.remoteCursors.notifyMainSelectedPosition(e);
        }
    }
    setRemoteCursors(e, t) {
        if (this.remoteCursors) {
            this.remoteCursors.setRemoteCursors(e, t);
        }
    }
    processUpdateRemoteCursorPositions() {
        if (this.remoteCursors) {
            this.remoteCursors.processUpdateRemoteCursorPositions();
        }
    }
    removeSites(e) {
        if (this.remoteCursors) {
            this.remoteCursors.removeSites(e);
        }
    }
    changeCursorName(e, t) {
        if (this.remoteCursors) {
            this.remoteCursors.changeCursorName(e, t);
        }
    }
}
/*n.d(t, "a", function () {
    return RemoteCursorHandler;
})*/

export default RemoteCursorHandler