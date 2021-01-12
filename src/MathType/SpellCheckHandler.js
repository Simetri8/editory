import _ from 'lodash';
import { Promise } from 'bluebird';
import React from 'react';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import BaseComponent from '../Elements/BaseComponent';
import BlockHelper from '../Elements/BlockHelper';
import DOMHelper from '../Elements/DOMHelper';
import SpellCheckRunner from '../Mathcha/SpellCheckRunner';
import TimerHelper from '../Mathcha/TimerHelper';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(1613) /*SpellCheckHandler*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 12 times
/// var o = n.n(i);
/// var m = n(4)/*DOMHelper*/;  // 17 times
/// var C = n(2)/*lodash*/;  // 3 times
/// var x = n.n(C);
/// var mn = n(30)/*blubirdjs*/;  // 1 times
/// var fn = n.n(mn);
/// var Ei = n(35)/*slicedToArray*/;  // 1 times
/// var vi = n.n(Ei);
/// var I = n(12)/*BlockHelper*/;  // 4 times
/// var Lt = n(19)/*TimerHelper*/;  // 6 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var ba = n(70)/*TransformHelper*/;  // 1 times
/// var po = n(228)/*SpellCheckRunner*/;  // 3 times
var SpellCheckPathUpdater = new class {
    assignPathD(e, t, n, r) {
        return r || (r = this.toBlockInfo(e)),
        t.map((e) => {
            var t = r.find((t) => {
                return t.isText && t.start <= e.from && e.from <= t.end + 1;
            });
            var a = e.to + 1;
            var i = r.find((e) => {
                return e.isText && e.start <= a && a <= e.end + 1;
            });
            if (t && i) {
                var o;
                if (t === i) {
                    var s = DOMHelper.rangeFrom2Indexes(t.block, e.from - t.start, a - i.start);
                    o = DOMHelper.findRectElementToRect(s, n);
                } else {
                    var l;
                    l = e.from - t.start === t.block.innerText.length ? DOMHelper.rangeFromIndex(t.block.nextElementSibling, 0) : DOMHelper.rangeFromIndex(t.block, e.from - t.start);
                    var c = DOMHelper.rangeFrom2Indexes(i.block, 0, a - i.start);
                    var d = DOMHelper.findRectElementToRect(l, n);
                    var h = DOMHelper.findRectElementToRect(c, n);
                    o = {
                        left: d.left,
                        top: d.top,
                        right: h.right,
                        bottom: h.bottom,
                        width: h.right - d.left,
                        height: h.bottom - d.bottom
                    };
                }
                var u = this.buildPathFromRect(o);
                return e.pathD = u,
                u;
            }
        });
    }
    toBlockInfo(e) {
        var t = DOMHelper.findBlocks(e);
        var n = 0;
        var r = [];
        var a = 0;
        for (; a < t.length; a++) {
            var i = t[a];
            var o = DOMHelper.isNonChar(i);
            var s = o ? 1 : i.innerText.length;
            r.push({
                block: i,
                isText: !o,
                start: n,
                end: n + s - 1
            });
            n = n + s;
        }
        return r;
    }
    buildPathFromRect(e) {
        var t = e.right - e.left;
        var n = Math.floor(t / 4);
        var r = [];
        var a = 0;
        for (; a < n; a++) {
            r.push({
                x: Math.round(e.left + 4 * a),
                y: Math.round(e.bottom + 2)
            });
            r.push({
                x: Math.round(e.left + 4 * a + 2),
                y: Math.round(e.bottom)
            });
            r.push({
                x: Math.round(e.left + 4 * a + 4),
                y: Math.round(e.bottom + 2)
            });
        }
        return r.length <= 0 ? "" : "M ".concat(r[0].x, " ").concat(r[0].y, " ") + r.map((e) => {
            return "".concat(e.x, " ").concat(e.y);
        }).join(" L ");
    }
};
var SpellCheckPositionUpdater = new class {
    updateSpellCheckLineOf(e, t, n) {
        var r = this.findSelectedLine(e.editor, t);
        if (r) {
            return this.updateSpellCheckPosition(r, n);
        }
    }
    findSelectedLine(e, t) {
        var n = e.lines.find((e) => {
            return e.lineIndex === t.lineIndex;
        });
        if (!n) {
            return null;
        }
        if (t.selected) {
            var r = n.compositeBlocks.find((e) => {
                return e.charIndex === t.charIndex;
            });
            if (!r) {
                return null;
            }
            var a = r.editors.find((e) => {
                return e.key === t.key;
            });
            return a ? this.findSelectedLine(a, t.selected) : null;
        }
        return n;
    }
    updateSpellCheckPosition(e, t) {
        if (e.model) {
            var n = e.anchorElement;
            var r = e.model;
            var a = n.reactInstance.getLineData();
            if (!e.originalCharRanges) {
                e.originalCharRanges = e.charRanges;
            }
            var i = this.analyze(r, a);
            var o = this.rebuildRanges(e.originalCharRanges, i);
            e.charRanges = o;
            SpellCheckPathUpdater.assignPathD(e.anchorElement, e.charRanges, t);
        }
    }
    rebuildRanges(e, t) {
        var n = e.filter((e) => {
            return e.from <= t.start && e.to <= t.start;
        });
        var r = e.filter((e) => {
            return e.from >= t.prevEnd && e.to >= t.prevEnd;
        });
        var a = t.nextTotal - t.prevTotal;
        var i = r.map((e) => {
            return {
                from: e.from + a,
                to: e.to + a
            };
        });
        return n.concat(i);
    }
    analyze(e, t) {
        var n = this.getLineText(e);
        var r = this.getLineText(t);
        var a = -1;
        var i = 0;
        for (; i < n.length && n[i] == r[i]; i++) {
            a = i;
        }
        var o = n.length - 1;
        var s = r.length - 1;
        var l = n.length - 1;
        var c = r.length - 1;
        for (; l >= 0 && c >= 0 && !(n[l] != r[c] || l <= a || c <= a); l--, c--) {
            o = l;
            s = c;
        }
        return {
            start: a,
            prevEnd: o,
            nextEnd: s,
            prevTotal: n.length,
            nextTotal: r.length
        };
    }
    getLineText(e) {
        return e.blocks.map((e) => {
            return e.type ? " " : e.text;
        }).join("");
    }
};
var SpellCheckRectUpdater = new class {
    constructor() {
        this.count = 0;
    }
    resetCount() {
        this.count = 0;
    }
    getCount() {
        return this.count;
    }
    asignAnchor(e, t, n) {
        if (!e.anchorElement) {
            e.anchorElement = t;
            e.originalAnchorRect = DOMHelper.findRectElementToRect(t, n);
            e.time = (new Date).getTime();
            var r = this.getModelFromElement(e);
            if (r) {
                e.model = r;
            }
        }
    }
    getModelFromElement(e) {
        var t = e.anchorElement.reactInstance;
        return t.getModel ? t.getModel() : t.getModel ? t.getModel() : t.getLineData ? t.getLineData() : void 0;
    }
    updateRect(e, t, n) {
        this.updateRectSpellCheckRootEditor(e.editor, t, n);
    }
    updateRectSpellCheckRootEditor(e, t, n) {
        this.count++;
        var r = e.lines;
        if (void 0 !== n && n >= 0) {
            var a = _.partition(r, (e) => {
                return e.lineIndex <= n;
            });
            var i = slicedToArray(a, 2);
            var o = i[0];
            var s = i[1];
            var l = o.length - 1;
            for (; l >= 0; l--) {
                var c = o[l];
                if (!this.updateRectSpellCheckLine(c, t)) {
                    break;
                }
                c.changed = true;
            }
            var d = 0;
            for (; d < s.length; d++) {
                var h = s[d];
                if (!this.updateRectSpellCheckLine(h, t)) {
                    break;
                }
                h.changed = true;
            }
        } else {
            var u = 0;
            for (; u < r.length; u++) {
                var p = r[u];
                this.updateRectSpellCheckLine(p, t);
                p.changed = true;
            }
        }
    }
    updateRectSpellCheckEditor(e, t) {
        this.count++;
        var n = false;
        var r = e.lines;
        var a = 0;
        for (; a < r.length; a++) {
            var i = r[a];
            n = this.updateRectSpellCheckLine(i, t) || n;
        }
        return n;
    }
    updateRectSpellCheckLine(e, t) {
        return !! e.anchorElement && (this.count++, this.isModelChanged(e) ? (SpellCheckPositionUpdater.updateSpellCheckPosition(e, t), e.compositeBlocks.forEach((e) => {
            this.updateCompositeBlock(e, t);
        }), true) : this.updateAnchorElementIfChanged(e, t));
    }
    updateCompositeBlock(e, t) {
        if (this.isModelChanged(e)) {
            this.count++;
            e.editors.forEach((e) => {
                this.updateRectSpellCheckEditor(e, t);
            });
        } else {
            this.updateAnchorElementIfChanged(e, t);
        }
    }
    updateAnchorElementIfChanged(e, t) {
        var n = DOMHelper.findRectElementToRect(e.anchorElement, t);
        return 0 === n.width ? (e.isHidden = true, true) : !!this.compareAnchorRectChanged(n, e.originalAnchorRect) && (e.delta = this.getDelta(n, e.originalAnchorRect), true);
    }
    isModelChanged(e) {
        return !! e.model && e.model != this.getModelFromElement(e);
    }
    compareAnchorRectChanged(e, t) {
        return e.left != t.left || e.top != t.top;
    }
    getDelta(e, t) {
        return {
            x: e.left - t.left,
            y: e.top - t.top
        };
    }
};
var SpellCheckLineLimit = 100;
var SpellCheckProcessor = new class {
    processSpellCheckEditor(e, t, n) {
        SpellCheckRectUpdater.asignAnchor(e, t, n);
        var r = DOMHelper.findEditLines(t);
        e.lines.forEach((e) => {
            var t = r[e.lineIndex];
            return this.processSpellCheckLine(e, t, n);
        });
    }
    processSpellCheckLines(e) {
        var t = e.lines;
        var n = e.htmlEditor;
        var r = e.rectAnchor;
        var a = DOMHelper.findEditLines(n);
        return t.forEach((e) => {
            var t = a[e.lineIndex];
            return this.processSpellCheckLine(e, t, r);
        }),
        this.limitLines(t, e.limitType);
    }
    mergeSpellCheckLines(e, t, n) {
        var r = e.lines;
        var a = e.htmlEditor;
        var i = e.rectAnchor;
        var o = DOMHelper.findEditLines(a);
        r.forEach((e) => {
            var t = o[e.lineIndex];
            return this.processSpellCheckLine(e, t, i);
        });
        var s = this.mergeLines(t, r, n);
        return this.limitLines(s, e.limitType);
    }
    mergeLines(e, t, n) {
        var r = 0;
        var a = 0;
        var i = [];
        for (; r < e.length || a < t.length;) {
            var o = e[r] || {
                lineIndex: Number.MAX_SAFE_INTEGER
            };
            var s = t[a] || {
                lineIndex: Number.MAX_SAFE_INTEGER
            };
            if (s.lineIndex != o.lineIndex) {
                if (s.lineIndex < o.lineIndex) {
                    i.push(s);
                    a++;
                } else {
                    if (!n.includes(o.lineIndex)) {
                        i.push(o);
                    }
                    r++;
                }
            } else {
                i.push(s);
                a++;
                r++;
            }
        }
        return i;
    }
    limitLines(e, t) {
        if (e.length < SpellCheckLineLimit) {
            return e;
        }
        var n = e.length - SpellCheckLineLimit + Math.round(SpellCheckLineLimit / 4);
        if ("line-index" == t) {
            return e.slice(0, e.length - n);
        }
        var r = _.orderBy(e, [(e) => {
            return e.time;
        }], ["desc"]);
        return _.sortBy(r.slice(0, e.length - n), (e) => {
            return e.lineIndex;
        });
    }
    processSpellCheckLine(e, t, n) {
        SpellCheckRectUpdater.asignAnchor(e, t, n);
        var r = SpellCheckPathUpdater.toBlockInfo(t);
        SpellCheckPathUpdater.assignPathD(t, e.charRanges, n, r);
        e.compositeBlocks.forEach((e) => {
            var t = r.find((t) => {
                return t.start >= e.charIndex && e.charIndex <= t.end;
            });
            SpellCheckRectUpdater.asignAnchor(e, t.block, n);
            e.editors.forEach((t) => {
                var r = e.anchorElement.reactInstance.getEditorDomByKey(t.key);
                if (r) {
                    return this.processSpellCheckEditor(t, r, n);
                }
            });
        });
    }
};
var SpellCheckErrorWordFinder = new class {
    getSpellCheckErrorWord(e, t, n) {
        return t && n ? this.findSpellCheckErrorWordRecursive(t, e, n.editor) : null;
    }
    findSpellCheckErrorWordRecursive(e, t, n) {
        if (!e || !t || !n) {
            return null;
        }
        var r = t.lines[e.lineIndex];
        var a = n.lines.find((t) => {
            return t.lineIndex === e.lineIndex;
        });
        if (!r || !a) {
            return null;
        }
        var i = BlockHelper.toRawIndex(r, e.charIndex);
        if (e.selected && e.key) {
            var o = BlockHelper.blockFromIndex(r, e.charIndex);
            if (!o) {
                return null;
            }
            if ("composite" != o.block.type) {
                return null;
            }
            var s = o.block.elements[e.key];
            var l = a.compositeBlocks.find((e) => {
                return e.charIndex === i;
            });
            if (!s || !l) {
                return null;
            }
            var c = l.editors.find((t) => {
                return t.key === e.key;
            });
            if (!c) {
                return null;
            }
            var d = this.findSpellCheckErrorWordRecursive(e.selected, s, c);
            return d ? {
                word: d.word,
                selected: {
                    selected: d.selected,
                    lineIndex: e.lineIndex,
                    charIndex: e.charIndex,
                    key: e.key
                },
                extendedSelected: {
                    selected: d.extendedSelected,
                    lineIndex: e.lineIndex,
                    charIndex: e.charIndex,
                    key: e.key
                }
            } : null;
        }
        var h = a.charRanges.find((e) => {
            return e.from <= i && i <= e.to;
        });
        return h ? {
            word: r.blocks.map((e) => {
                return e.type ? " " : e.text;
            }).join("").substring(h.from, h.to + 1),
            selected: {
                lineIndex: e.lineIndex,
                charIndex: BlockHelper.toCharIndex(r, h.from)
            },
            extendedSelected: {
                lineIndex: e.lineIndex,
                charIndex: BlockHelper.toCharIndex(r, h.to) + 1
            }
        } : null;
    }
};
class SpellCheckEditor extends React.Component {
    render() {
        return this.renderSpellCheckLine(this.props.line);
    }
    shouldComponentUpdate(e) {
        return e.line != this.props.line || !!e.line.changed && (e.line.changed = false, true);
    }
    renderSpellCheckLine(e) {
        if (e.isHidden) {
            return null;
        }
        var t = e.charRanges.map((e) => {
            return React.createElement("path", {
                key: "".concat(e.from, "-").concat(e.to),
                fill: "none",
                strokeLinecap: "square",
                stroke: "#dd0000",
                d: e.pathD
            });
        });
        var n = e.compositeBlocks.map((e) => {
            var t = e.editors.map((e) => {
                return this.renderSpellCheckEditor(e);
            });
            return React.createElement("g", {
                key: e.charIndex,
                style: this.anchorStyleTransform(e)
            },
            t);
        });
        return React.createElement("g", {
            key: e.lineIndex,
            style: this.anchorStyleTransform(e)
        },
        t, n);
    }
    renderSpellCheckEditor(e) {
        if (e.isHidden) {
            return null;
        }
        var t = e.lines.map((e) => {
            return this.renderSpellCheckLine(e);
        });
        return React.createElement("g", {
            key: e.key || "root",
            style: this.anchorStyleTransform(e)
        },
        t, ";");
    }
    anchorStyleTransform(e) {
        if (e.delta) {
            return {
                transform: (new TransformHelper).translate(e.delta.x, e.delta.y).toCssStyle()
            };
        }
    }
}
class SameDataChecking {
    setData(e) {
        this.data = e;
    }
    isSame(e) {
        return this.data === e;
    }
}
class SpellCheckerContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.runLater = TimerHelper.createLaterRunObject("latest", 350);
        this.sameDataChecking = new SameDataChecking;
        this.state = {
            spellCheckResult: null
        };
        this.updateSpellCheckOnVisibleView = () => {
            if (this.anchor) {
                var e = this.props.requestVisibleLines();
                this.requestSpellCheckOnLines(e);
            }
        };
        this.updateRectWithAnchor = (e) => {
            if (this.state.spellCheckResult) {
                var t = DOMHelper.getElementRect(this.anchor);
                SpellCheckRectUpdater.resetCount();
                var n = -1;
                if (e && this.props.selected) {
                    n = this.props.selected.lineIndex;
                }
                SpellCheckRectUpdater.updateRect(this.state.spellCheckResult, t, n);
                this.setState({
                    spellCheckResult: _.assignIn({},
                    this.state.spellCheckResult, {
                        editor: this.state.spellCheckResult.editor
                    })
                });
            }
        };
        this.processSpellCheckForAll = () => {
            if (this.rootEditorElement && this.shouldRenderSpellCheck()) {
                this.sameDataChecking.setData(this.props.model);
                SpellCheckRunner.request({
                    model: this.props.model,
                    ignoreWords: this.getIgnoreWordArr(),
                    action: "check"
                },
                this.props.language).then((e) => {
                    if ("result" == e.status) {
                        if (!this.anchor) {
                            return void console.warn("there is no anchor yet");
                        }
                        if (!this.sameDataChecking.isSame(this.props.model)) {
                            return;
                        }
                        console.log("n of lines:", e.data.editor.lines.length);
                        var t = e.data;
                        var n = DOMHelper.getElementRect(this.anchor);
                        var r = SpellCheckProcessor.processSpellCheckLines({
                            lines: t.editor.lines,
                            htmlEditor: this.rootEditorElement,
                            rectAnchor: n,
                            limitType: "line-index"
                        });
                        this.setLinesForState(r);
                    }
                });
            }
        };
    }
    getSpellCheckErrorWord() {
        return SpellCheckErrorWordFinder.getSpellCheckErrorWord(this.props.model, this.props.selected, this.state.spellCheckResult);
    }
    componentWillReceiveProps(e) {
        if (e.language != this.props.language) {
            return this.setState({
                spellCheckResult: null
            }),
            void TimerHelper.waitALitteWhile(this.processSpellCheckForAll);
        }
        if (e.ignoreWords === this.props.ignoreWords) {
            if (e.model != this.props.model) {
                TimerHelper.next(() => {
                    return this.updateRectWithAnchor(e.isOneLineChanged);
                });
                if (e.isOneLineChanged) {
                    this.runLater.later(this.updateSpellCheckOnVisibleView);
                } else {
                    this.runLater.later(this.processSpellCheckForAll);
                }
            }
        } else {
            TimerHelper.waitALitteWhile(this.processSpellCheckForAll);
        }
    }
    refreshSpellCheckAll() {
        this.runLater.later(this.processSpellCheckForAll);
    }
    shouldComponentUpdate(t) {
        return t.spellCheckResult != this.state.spellCheckResult;
    }
    setRootEditorElement(e, t) {
        this.rootEditorElement = e;
        this.anchor = t;
        TimerHelper.waitALitteWhile(this.processSpellCheckForAll);
    }
    onMathViewChanged() {}
    getIgnoreWordArr() {
        return this.props.ignoreWords.split(/[\r\n\t\s]/).map((e) => {
            return e.trim();
        }).filter((e) => {
            return e;
        });
    }
    requestSpellCheckOnLines(e) {
        if (this.anchor && this.shouldRenderSpellCheck()) {
            var t = e.map((e) => {
                return {
                    index: e.lineIndex,
                    line: e.line.reactInstance.getLineData()
                };
            });
            this.sameDataChecking.setData(this.props.model);
            SpellCheckRunner.request({
                request: {
                    lines: t
                },
                ignoreWords: this.getIgnoreWordArr(),
                action: "check-multiple-lines"
            },
            this.props.language).then((t) => {
                if ("result" == t.status) {
                    if (!this.sameDataChecking.isSame(this.props.model)) {
                        return;
                    }
                    var n = t.data;
                    var r = this.state.spellCheckResult ? this.state.spellCheckResult.editor.lines : [];
                    var a = DOMHelper.getElementRect(this.anchor);
                    var i = SpellCheckProcessor.mergeSpellCheckLines({
                        lines: n,
                        htmlEditor: this.rootEditorElement,
                        rectAnchor: a,
                        limitType: "time"
                    },
                    r, e.map((e) => {
                        return e.lineIndex;
                    }));
                    this.setLinesForState(i);
                }
            });
        }
    }
    setLinesForState(e) {
        this.setState({
            spellCheckResult: {
                editor: {
                    key: "root",
                    lines: e
                }
            }
        });
    }
    renderSpellCheckEditor(e) {
        var t = e.lines.map((e) => {
            return React.createElement(SpellCheckEditor, {
                key: e.lineIndex,
                line: e
            });
        });
        return React.createElement("g", {
            key: "root"
        },
        t, ";");
    }
    renderSpellCheckingResult() {
        return React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        this.renderSpellCheckEditor(this.state.spellCheckResult.editor));
    }
    shouldRenderSpellCheck() {
        return !! this.props.language && "none" != this.props.language;
    }
    render() {
        return this.anchor && this.shouldRenderSpellCheck() && this.state.spellCheckResult ? React.createElement("div", {
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                userSelect: "none",
                pointerEvents: "none"
            },
            className: "no-print role-spell-checker-container"
        },
        this.renderSpellCheckingResult()) : React.createElement("div", null);
    }
}
class SpellCheckHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.handleRef = (e) => {
            this.spellCheckerRef = e;
            if (this.spellCheckerRef) {
                TimerHelper.waitABit(() => {
                    var e = this.getTarget();
                    this.spellCheckerRef.setRootEditorElement(e.getEditorHtmlElement(), e.getMathTypeHtmlElement());
                });
            }
        };
        this.handleRequestSpellCheckSuggestions = () => {
            if (this.spellCheckerRef) {
                return new Promise((e, t) => {
                    var n = this.spellCheckerRef.getSpellCheckErrorWord();
                    if (console.log("word to lookup:", n), n) {
                        var r = this.getSpellCheckInfo();
                        SpellCheckRunner.request({
                            action: "suggestion",
                            word: n.word
                        },
                        r.language).then((t) => {
                            if ("result" == t.status) {
                                e({
                                    word: n.word,
                                    suggestions: t.data,
                                    selected: n.selected,
                                    extendedSelected: n.extendedSelected
                                });
                            }
                        }).
                        catch(t);
                    } else {
                        e(null);
                    }
                });
            }
        };
    }
    getSpellCheckInfo() {
        return this.getTarget().getCurrentSpellCheckInfo();
    }
    onMathViewChanged(e) {
        if (this.spellCheckerRef) {
            this.spellCheckerRef.onMathViewChanged(e);
        }
    }
    refreshSpellCheckAll() {
        if (this.spellCheckerRef) {
            this.spellCheckerRef.refreshSpellCheckAll();
        }
    }
    render() {
        var e = this.getTarget();
        if (e.props.spellCheck) {
            var t = e.getCurrentSpellCheckInfo();
            return React.createElement(SpellCheckerContainer, {
                language: t.language,
                ignoreWords: t.ignoreWords,
                requestVisibleLines: e.requestVisibleLines,
                isOneLineChanged: e.checkIsOneLineChanged(),
                selected: e.getSafeSelected(),
                ref: this.handleRef,
                model: this.getState().mainModel
            });
        }
    }
}
/*n.d(t, "a", function () {
    return SpellCheckHandler;
})*/

export default SpellCheckHandler