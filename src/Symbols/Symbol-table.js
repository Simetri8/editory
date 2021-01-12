import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { SymbolMatrixC } from './Symbol-matrix';
import ArrayHelper2 from '../Mathcha/ArrayHelper2';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import DataChangeModel from '../Editor/DataChangeModel';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import Global from '../Global';
import LatexTableView from '../Latex/LatexTableView';
import MovingHandler from '../Editor/MovingHandler';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper, { StyleHelperA } from '../Mathcha/StyleHelper';
import TableInfoHelper from '../Tabular/TableInfoHelper';
import TableLatexConverter from '../Latex/TableLatexConverter';
import TabularActions from '../Tabular/TabularActions';
import TabularCellHelper from '../Tabular/TabularCellHelper';
import TabularHelper from '../Tabular/TabularHelper';
import TabularUtils from '../Tabular/TabularUtils';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1509) /*Symbol-table*/

/// n.r(t)
/// var r = n(3);  // 8 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 41 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 30 times
/// var l = n.n(s);
/// var c = n(66)/*Symbol-matrix*/;  // 1 times
/// var d = n(18)/*StyleHelper*/;  // 14 times
/// var h = n(345)/*LatexTableView*/;  // 1 times
/// var u = n(64)/*TabularCellHelper*/;  // 1 times
/// var p = n(346)/*TableLatexConverter*/;  // 1 times
/// var m = n(55)/*ArrayHelper2*/;  // 2 times
var f = new class {
    toInputTabular(e) {
        var t = {
            cells: ArrayHelper2.newArray(e.row, true),
            column: e.column,
            row: e.row,
            hLines: [],
            vLines: [],
            columnWidths: _.times(e.column, () => {
                return "auto";
            }),
            tableWidth: "grow"
        };
        var n = _.times(e.row + 1, () => {
            return {
                borders: _.times(e.column, () => {
                    return false;
                })
            };
        });
        var r = _.times(e.column + 1, () => {
            return {
                borders: _.times(e.row, () => {
                    return false;
                })
            };
        });
        return _.times(t.row).forEach((n) => {
            return t.cells[n] = ArrayHelper2.newArray(e.column, true);
        }),
            TabularCellHelper.cellLoop(e, (e) => {
                var a = e.rIndex;
                var i = e.cIndex;
                var o = e.rowSpan;
                var s = e.colSpan;
                var c = e.hidden;
                var h = e.editor;
                if (t.cells[a][i] = {
                    rowSpan: o,
                    colSpan: s,
                    hidden: c,
                    data: h,
                    align: "left"
                },
                    !c) {
                    var u = StyleHelperA.Full;
                    if (h.style && null != h.style.border) {
                        u = h.style.border;
                    }
                    if ((u & StyleHelperA.Left) > 0) {
                        _.times(o, (e) => {
                            return r[i].borders[a + e] = true;
                        });
                    }
                    if ((u & StyleHelperA.Right) > 0) {
                        _.times(o, (e) => {
                            return r[i + s].borders[a + e] = true;
                        });
                    }
                    if ((u & StyleHelperA.Top) > 0) {
                        _.times(s, (e) => {
                            return n[a].borders[i + e] = true;
                        });
                    }
                    if ((u & StyleHelperA.Bottom) > 0) {
                        _.times(s, (e) => {
                            return n[a + o].borders[i + e] = true;
                        });
                    }
                }
            }),
            console.log(n),
            console.log(r),
            this.normalizeLinesInfo(n),
            this.normalizeLinesInfo(r),
            t.hLines = n,
            t.vLines = r,
            this.ignoreVHiddenForVLines(t),
            t;
    }
    normalizeLinesInfo(e) {
        var t = 0;
        for (; t < e.length; t++) {
            var n = e[t];
            if (n.borders.every((e) => {
                return e;
            })) {
                e[t] = {
                    nOfLines: 1
                };
            } else {
                if (n.borders.every((e) => {
                    return !e;
                })) {
                    e[t] = null;
                }
            }
        }
    }
    ignoreVHiddenForVLines(e) {
        var t = 0;
        for (; t < e.column - 1; t++) {
            var n = e.vLines[t + 1];
            if (n && n.borders) {
                var r = true;
                var a = 0;
                for (; a < n.borders.length; a++) {
                    var i = e.cells[a][t];
                    var o = e.cells[a][t + 1];
                    if (!((i.hidden || i.colSpan > 1) && o.hidden)) {
                        r = r && n.borders[a];
                    }
                }
                if (r) {
                    e.vLines[t + 1] = {
                        nOfLines: 1
                    };
                }
            }
        }
    }
    assignColumnWidths(e, t) {
        var n = 0;
        var r = 0;
        for (; r < e.columnsOptions.length; r++) {
            if ("align" == e.columnsOptions[r].type) {
                e.columnsOptions[r] = {
                    type: "paragraph",
                    width: "".concat((t.columnWidths[n] / t.tableWidth).toFixed(2), "\\textwidth"),
                    cIndex: n
                };
                n++;
            }
        }
    }
    toLatex(e, t, n) {
        var r = this.toInputTabular(e);
        var a = LatexTableView.toLatexStructure(r);
        this.assignColumnWidths(a, t);
        var i = TableLatexConverter.toLatex(a, n, t);
        return t.isNestedTable ? i : "\\begin{table}[!h]\n\\centering\n".concat(i, "\n").concat(this.convertCaption(e.elements.caption, t, n), "\n\\end{table}");
    }
    convertCaption(e, t, n) {
        if (!e) {
            return "";
        }
        var r = e.lines.map((e) => {
            return _.assignIn({},
                e, {
                style: void 0
            });
        });
        var i = _.assignIn({},
            e, {
            lines: r
        });
        var o = n.toLatexFromEditor(i, t);
        return "\\caption{".concat(o, "}");
    }
};
/// var g = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var y = n(16)/*ReactDOM*/;  // 14 times
/// var A = n.n(y);
/// var E = n(5)/*sizzle*/;  // 24 times
/// var v = n.n(E);
/// var S = n(203)/*DataChangeModel*/;  // 1 times
/// var C = n(45)/*TabularUtils*/;  // 2 times
/// var x = n(7)/*PropUpdateHelper*/;  // 4 times
/// var I = n(24)/*EventHelper*/;  // 2 times
/// var T = n(11)/*Global*/;  // 10 times
/// var b = n(4)/*DOMHelper*/;  // 13 times
/// var L = n(15)/*TabularHelper*/;  // 10 times
var R = new class {
    getNextAvailableLine(e, t) {
        t++;
        for (; e[t].length <= 0;) {
            t++;
        }
        return {
            line: t,
            spans: e[t]
        };
    }
    getPreviousAvailableLine(e, t) {
        t--;
        for (; e[t].length <= 0;) {
            t--;
        }
        return {
            line: t,
            spans: e[t]
        };
    }
    findKeysHandleAtVLine(e, t) {
        var n = [];
        var r = 0;
        for (; r < t.row; r++) {
            var a = 0;
            for (; a < t.column; a++) {
                var i = TabularHelper.getKeyFromRowCol(r, a);
                var o = t.elements[i];
                if (!o.hidden) {
                    if (!(o.rowSpan || r != e - 1)) {
                        n.push({
                            key: i,
                            rowSpan: 1
                        });
                    }
                    if (o.rowSpan && r + o.rowSpan === e) {
                        n.push({
                            key: i,
                            rowSpan: o.rowSpan
                        });
                    }
                }
            }
        }
        return _.map(n, (e) => {
            return e.key;
        });
    }
    buildResizeRowLines(e, t, n, r) {
        var a = DOMHelper.getElementRect(n);
        var i = _.range(0, e.row + 1).map(() => {
            return [{
                from: 0,
                to: e.column
            }];
        });
        var o = 0;
        for (; o < e.row; o++) {
            var s = 0;
            for (; s < e.column; s++) {
                var c = TabularHelper.getKeyFromRowCol(o, s);
                if (e.elements[c].rowSpan) {
                    this.splitOfRowSpan(o, s, e.elements[c].rowSpan, e.elements[c].colSpan || 1, i);
                }
            }
        }
        return _.map(i, (n, i) => {
            return n.map((n) => {
                return this.getRowFromToPoint(i, n.from, n.to, e, t, a, r);
            });
        });
    }
    buildResizeColumnLines(e, t, n, r) {
        var a = DOMHelper.getElementRect(n);
        var i = _.range(0, e.column + 1).map(() => {
            return [{
                from: 0,
                to: e.row
            }];
        });
        var o = 0;
        for (; o < e.column; o++) {
            var s = 0;
            for (; s < e.row; s++) {
                var c = TabularHelper.getKeyFromRowCol(s, o);
                if (e.elements[c].colSpan) {
                    this.splitOfColumnSpan(s, o, e.elements[c].rowSpan || 1, e.elements[c].colSpan, i);
                }
            }
        }
        return _.map(i, (n, i) => {
            return n.map((n) => {
                return this.getColumnFromToPoint(i, n.from, n.to, e, t, a, r);
            });
        });
    }
    getColumnFromToPoint(e, t, n, r, a, i, o) {
        var s;
        if (0 === e) {
            return {
                fromPoint: {
                    x: (s = DOMHelper.findRectElementToRect(o, i)).left,
                    y: s.top
                },
                toPoint: {
                    x: s.left,
                    y: s.bottom
                }
            };
        }
        if (e === r.column) {
            return {
                fromPoint: {
                    x: (s = DOMHelper.findRectElementToRect(o, i)).right,
                    y: s.top
                },
                toPoint: {
                    x: s.right,
                    y: s.bottom
                }
            };
        }
        var l = a[TabularHelper.getKeyFromRowCol(t, e)];
        var c = a[TabularHelper.getKeyFromRowCol(this.whileRowPrevious(n - 1, e, r), e)];
        if (!l || !c) {
            return {
                fromPoint: {
                    x: 0,
                    y: 0
                },
                toPoint: {
                    x: 0,
                    y: 0
                }
            };
        }
        var d = DOMHelper.findRectElementToRect(l.editor.parentElement, i);
        var h = DOMHelper.findRectElementToRect(c.editor.parentElement, i);
        return {
            fromPoint: {
                x: d.left,
                y: d.top
            },
            toPoint: {
                x: h.left,
                y: h.bottom
            }
        };
    }
    getRowFromToPoint(e, t, n, r, a, i, o) {
        var s;
        if (0 === e) {
            return {
                fromPoint: {
                    x: (s = DOMHelper.findRectElementToRect(o, i)).left,
                    y: s.top
                },
                toPoint: {
                    x: s.right,
                    y: s.top
                }
            };
        }
        if (e === r.row) {
            return {
                fromPoint: {
                    x: (s = DOMHelper.findRectElementToRect(o, i)).left,
                    y: s.bottom
                },
                toPoint: {
                    x: s.right,
                    y: s.bottom
                }
            };
        }
        var l = a[TabularHelper.getKeyFromRowCol(e, t)];
        var c = a[TabularHelper.getKeyFromRowCol(e, this.whileColPrevious(e, n - 1, r))];
        if (!l || !c) {
            return {
                fromPoint: {
                    x: 0,
                    y: 0
                },
                toPoint: {
                    x: 0,
                    y: 0
                }
            };
        }
        var d = DOMHelper.findRectElementToRect(l.editor.parentElement, i);
        var h = DOMHelper.findRectElementToRect(c.editor.parentElement, i);
        return {
            fromPoint: {
                x: d.left,
                y: d.top
            },
            toPoint: {
                x: h.right,
                y: h.top
            }
        };
    }
    whileColPrevious(e, t, n) {
        for (; ;) {
            var r = TabularHelper.getKeyFromRowCol(e, t);
            if (!n.elements[r].hidden) {
                return t;
            }
            if (t <= 0) {
                return t;
            }
            t--;
        }
    }
    whileRowPrevious(e, t, n) {
        for (; ;) {
            var r = TabularHelper.getKeyFromRowCol(e, t);
            if (!n.elements[r].hidden) {
                return e;
            }
            if (e <= 0) {
                return e;
            }
            e--;
        }
    }
    splitOfRowSpan(e, t, n, r, a) {
        var i = e + 1;
        for (; i < e + n; i++) {
            a[i] = this.splitCells(t, r, a[i]);
        }
        return a;
    }
    splitOfColumnSpan(e, t, n, r, a) {
        var i = t + 1;
        for (; i < t + r; i++) {
            a[i] = this.splitCells(e, n, a[i]);
        }
        return a;
    }
    splitCells(e, t, n) {
        var r = 0;
        for (; r < n.length; r++) {
            var a = n[r];
            if (a.from <= e && e + t <= a.to) {
                return n.splice(r, 1, ...this.splitSpan(a, e, e + t)),
                    n;
            }
        }
        return n;
    }
    splitSpan(e, t, n) {
        return e.from === t && e.to === n ? [] : e.from === t ? [{
            from: n,
            to: e.to
        }] : e.to === n ? [{
            from: e.from,
            to: t
        }] : [{
            from: e.from,
            to: t
        },
        {
            from: n,
            to: e.to
        }];
    }
};
/// var M = n(57)/*MovingHandler*/;  // 1 times
class w extends React.Component {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.onVerticalLineMouseDown = (e, t, n, r) => {
            r.preventDefault();
            r.stopPropagation();
            this.handleResizingMoving(r, true, e, t, n);
        };
        this.onHorizontalLineMouseDown = (e, t, n, r) => {
            r.preventDefault();
            r.stopPropagation();
            this.handleResizingMoving(r, false, e, t, n);
        };
        this.handleResizingMoving = (e, t, n, r, a) => {
            if (!this.movingHandler.baseElement) {
                var i = ReactDOM.findDOMNode(this).parentNode.parentNode;
                this.movingHandler.setBaseElement(i);
                this.movingHandler.setContainer(jQuery("body"));
            }
            this.props.onResizeStart();
            this.movingHandler.mouseDown(e, {
                isVertical: t,
                lineIndex: n,
                lines: a,
                span: r
            });
        };
        this.movingHandler.onMoving = (e, t, n, r) => {
            r.stopPropagation();
            r.preventDefault();
            var a = ReactDOM.findDOMNode(this);
            var i = a.parentNode.parentNode;
            var o = DOMHelper.getElementRect(i);
            var s = EventHelper.getLeftTopFromEvent(r);
            n.customData.lastPoint = {
                x: s.left,
                y: s.top
            };
            var l = this.getTableRect();
            if (n.customData.isVertical) {
                jQuery(a).find(">border-v-resizing").css({
                    display: "block",
                    position: "fixed",
                    height: 2,
                    borderTop: "1px solid green",
                    left: l.left + o.left,
                    width: l.right - l.left,
                    top: s.top
                });
            } else {
                jQuery(a).find(">border-h-resizing").css({
                    display: "block",
                    position: "fixed",
                    width: 2,
                    borderRight: "1px solid green",
                    top: l.top + o.top,
                    height: l.bottom - l.top,
                    left: s.left
                });
            }
        };
        this.movingHandler.onMoved = (e) => {
            if (e.customData && e.customData.lastPoint) {
                var t = ReactDOM.findDOMNode(this);
                var n = jQuery(t).find(">border-v-resizing");
                var r = jQuery(t).find(">border-h-resizing");
                n.css({
                    position: "",
                    display: "none"
                });
                r.css({
                    position: "",
                    display: "none"
                });
                this.props.onResizeEnd(_.assignIn({},
                    e.customData, e.customData.lastPoint));
            }
        };
    }
    getTableRect() {
        var e = this.props.vLines;
        var t = this.props.hLines;
        return {
            left: t[0][0].fromPoint.x,
            top: e[0][0].fromPoint.y,
            right: t[t.length - 1][0].fromPoint.x,
            bottom: e[e.length - 1][0].fromPoint.y
        };
    }
    render() {
        var e = this.props.vLines;
        var t = this.props.hLines;
        var n = null;
        var r = null;
        if (Global.isMobileOrTablet()) {
            var a = this.getTableRect();
            n = _.flatMap(e, (t, n) => {
                if (!t || t.length <= 0) {
                    return [];
                }
                var r = {
                    display: "block",
                    position: "absolute",
                    padding: "2px",
                    left: a.left - 30,
                    top: t[0].fromPoint.y - 11,
                    height: "19px",
                    width: "19px",
                    background: "#f7f7f7",
                    border: "1px solid lightgray",
                    boxShadow: "#e0dddd 1px 1px 1px 0px",
                    opacity: .5,
                    zIndex: 100
                };
                var i = _.assign({},
                    r, {
                    left: a.right + 10
                });
                var s = React.createElement("svg", {
                    style: {
                        width: "100%",
                        height: "100%",
                        stroke: "none",
                        transform: "scale(1.2)",
                        transformOrigin: " 0 0"
                    }
                },
                    React.createElement("path", {
                        fill: "gray",
                        d: "M0 7h16v2h-16v-2z"
                    }), React.createElement("path", {
                        fill: "gray",
                        d: "M7 6h2v-3h2l-3-3-3 3h2z"
                    }), React.createElement("path", {
                        fill: "gray",
                        d: "M9 10h-2v3h-2l3 3 3-3h-2z"
                    }));
                return [React.createElement("vline-support", {
                    onTouchStart: this.onVerticalLineMouseDown.bind(this, n, t[0], e),
                    key: n,
                    style: r
                },
                    s), React.createElement("vline-support", {
                        onTouchStart: this.onVerticalLineMouseDown.bind(this, n, t[0], e),
                        key: n + "_right",
                        style: i
                    },
                        s)];
            });
            r = _.flatMap(t, (e, n) => {
                if (!e || e.length <= 0) {
                    return [];
                }
                var r = {
                    display: "block",
                    position: "absolute",
                    padding: "2px",
                    left: e[0].fromPoint.x - 11,
                    top: a.top - 30,
                    height: "19px",
                    width: "19px",
                    background: "#f7f7f7",
                    border: "1px solid lightgray",
                    boxShadow: "#e0dddd 1px 1px 1px 0px",
                    opacity: .5,
                    zIndex: 100
                };
                var i = _.assign({},
                    r, {
                    top: a.bottom + 10
                });
                var s = React.createElement("svg", {
                    style: {
                        width: "100%",
                        height: "100%",
                        stroke: "none",
                        transform: "scale(1.2)",
                        transformOrigin: " 0 0"
                    }
                },
                    React.createElement("path", {
                        fill: "gray",
                        d: "M7 0h2v16h-2v-16z"
                    }), React.createElement("path", {
                        fill: "gray",
                        d: "M3 5l-3 3 3 3v-2h3v-2h-3z"
                    }), React.createElement("path", {
                        fill: "gray",
                        d: "M16 8l-3-3v2h-3v2h3v2z"
                    }));
                return [React.createElement("vline-support", {
                    onTouchStart: this.onHorizontalLineMouseDown.bind(this, n, e[0], t),
                    key: n,
                    style: r
                },
                    s), React.createElement("vline-support", {
                        onTouchStart: this.onHorizontalLineMouseDown.bind(this, n, e[0], t),
                        key: n + "_right",
                        style: i
                    },
                        s)];
            });
        } else {
            n = _.flatMap(e, (t, n) => {
                return _.map(t, (t, r) => {
                    return React.createElement("border-line", {
                        onMouseDown: this.onVerticalLineMouseDown.bind(this, n, t, e),
                        key: n + "_" + r,
                        style: {
                            position: "absolute",
                            top: t.fromPoint.y - 3,
                            height: 6,
                            left: t.fromPoint.x,
                            width: t.toPoint.x - t.fromPoint.x,
                            cursor: "row-resize",
                            background: "transparent"
                        }
                    });
                });
            });
            r = _.map(t, (e, n) => {
                return _.map(e, (e, r) => {
                    return React.createElement("border-line", {
                        onMouseDown: this.onHorizontalLineMouseDown.bind(this, n, e, t),
                        key: n + "_" + r,
                        style: {
                            position: "absolute",
                            left: e.fromPoint.x - 3,
                            width: 6,
                            top: e.fromPoint.y,
                            height: e.toPoint.y - e.fromPoint.y,
                            cursor: "col-resize",
                            background: "transparent"
                        }
                    });
                });
            });
        }
        return React.createElement("border-resizing-container", null, n, r, React.createElement("border-v-resizing", null), React.createElement("border-h-resizing", null));
    }
}
/// var O = n(19)/*TimerHelper*/;  // 2 times
/// var D = n(23)/*PropTypesExporter*/;  // 3 times
/// var N = n.n(D);
/// var k = n(21)/*EditArea*/;  // 2 times
/// var B = n(14)/*classnames*/;  // 1 times
/// var P = n.n(B);
/// var F = n(251)/*TabularActions*/;  // 1 times
/// var H = n(29)/*CompositeBlock*/;  // 1 times
/// var z = n(96)/*BatchedUpdates*/;  // 1 times
class U extends TabularActions {
    constructor() {
        super(...arguments);
        this.refMap = {};
        this.selfManageBaseLine = false;
        this.runObj = TimerHelper.createLaterRunObject("latest", 500);
        this.fixBorderLookUglyOnChrome = () => {
            var e = ReactDOM.findDOMNode(this);
            jQuery(e).find(">x-matrix>table>tbody>tr>td>.cell-border-box").toArray().forEach((e) => {
                var t = DOMHelper.getElementRect(e.parentElement).height % 1;
                if (!(t < .05)) {
                    if (t < .5) {
                        e.style.bottom = "-".concat(1 - t, "px");
                    } else {
                        if (t >= .5) {
                            e.style.bottom = "-".concat(1 - t + 1, "px");
                        }
                    }
                }
            });
        };
        this.handleDeleteCaption = (e) => {
            var t = _.assignIn({},
                this.props.data, {
                elements: _.assignIn({},
                    this.props.data.elements)
            });
            delete t.elements.caption;
            BatchedUpdates.in(() => {
                this.props.onDataChanged(t);
                this.props.onSelectedChanged({
                    key: "0_0",
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                });
            });
            e.preventDefault();
            e.stopPropagation();
        };
        this.handleEditCaptionPrefix = (e) => {
            this.context.notifyTableCaptionNumbering("request-prefix-edit");
            e.preventDefault();
            e.stopPropagation();
        };
        this.handleCaptionPrefixMouseDown = (e) => {
            this.props.onSelectedChanged({
                key: "caption",
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            });
            e.stopPropagation();
            e.preventDefault();
        };
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this.runObj.cancel();
    }
    afterReactRender(e, t) {
        super.afterReactRender(e, t);
        if (Global.isChrome()) {
            this.runObj.later(this.fixBorderLookUglyOnChrome);
        }
    }
    getClassName() {
        return classNames("matrix-symbol", "table-symbol", "role-tabular");
    }
    useCustomBaseLine() {
        return false;
    }
    isInlineMode() {
        return false;
    }
    getDisplayMode() {
        return true;
    }
    renderRow(e) {
        var t = {};
        return this.props.data.rowHeights && this.props.data.rowHeights[e] && (t.height = this.props.data.rowHeights[e]),
            React.createElement("tr", {
                style: t,
                key: this.getKeyForRow(e)
            },
                this.renderRowContent(e));
    }
    getNoneStyle() { }
    getSelectedStyle() {
        return this.props.selected ? "1px solid #e2e1e1" : "1px solid transparent";
    }
    gatherCellEditorCssStyle(e) {
        var t = this.context.fixedContextHandler.getDefaultBorderColor();
        var n = e.style || {};
        var r = {
            pointerEvents: "none"
        };
        return null == n.border || n.border === StyleHelperA.Full ? r.border = "1px solid ".concat(t) : n.border === StyleHelperA.None ? r.border = this.getNoneStyle() : (r.borderLeft = this.getNoneStyle(), r.borderTop = this.getNoneStyle(), r.borderRight = this.getNoneStyle(), r.borderBottom = this.getNoneStyle(), (n.border & StyleHelperA.Left) > 0 && (r.borderLeft = "1px solid ".concat(t)), (n.border & StyleHelperA.Right) > 0 && (r.borderRight = "1px solid ".concat(t)), (n.border & StyleHelperA.Top) > 0 && (r.borderTop = "1px solid ".concat(t)), (n.border & StyleHelperA.Bottom) > 0 && (r.borderBottom = "1px solid ".concat(t))),
            r;
    }
    getTableCssStyle() {
        var e = this.props.data;
        if (!e.style) {
            return {};
        }
        var t = {};
        return e.style.left && (t = _.assign(t, {
            position: "relative",
            top: 0,
            left: e.style.left
        })),
            e.style.width && (t.width = e.style.width),
            t;
    }
    renderRowContent(e) {
        var t = [];
        var n = this.props.data.column;
        var r = 0;
        for (; r < n; r++) {
            var a = e + "_" + r;
            var i = this.props.data.elements[a];
            if (!i.hidden) {
                var s = this.gatherCellEditorCssStyle(i);
                var l = i.colSpan;
                var c = i.rowSpan;
                var d = {
                    padding: "0.5em",
                    verticalAlign: (i.style || {})["v-align"],
                    border: this.getSelectedStyle()
                };
                t.push(React.createElement("td", {
                    "data-r-index": e,
                    "data-c-index": r,
                    colSpan: l,
                    rowSpan: c,
                    style: d,
                    key: i.id
                },
                    React.createElement(EditArea, Object.assign({},
                        this.buildMetaDataFromName(a), {
                        isTextMode: true,
                        showBorder: false
                    })), React.createElement("div", {
                        className: "cell-border-box",
                        style: s
                    })));
            }
        }
        return t;
    }
    renderColumns() {
        return React.createElement("colgroup", null, _.range(0, this.props.data.column).map((e) => {
            var t = {};
            return this.props.data.columnWidths && this.props.data.columnWidths[e] && (t.width = this.props.data.columnWidths[e]),
                React.createElement("col", {
                    style: t,
                    key: e
                });
        }));
    }
    renderSetting() {
        return null;
    }
    renderOpenBracket() {
        return null;
    }
    renderCloseBracket() {
        return null;
    }
    renderPlaceHolderAtEnd() {
        return React.createElement("table-resize", {
            onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
            },
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
        });
    }
    renderTables() {
        var e = [];
        var t = this.props.data.row;
        var n = 0;
        for (; n < t; n++) {
            e.push(this.renderRow(n));
        }
        return e;
    }
    getTextAlignFromFirstLine() {
        var e = this.props.data.elements.caption.lines[0].style;
        return e && e.align || "left";
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        if (e.data.elements.caption != this.props.data.elements.caption) {
            this.context.notifyTableCaptionNumbering();
        }
    }
    renderCaptionActions() {
        return this.props.selected && "caption" == this.props.selected.key ? [React.createElement("span", {
            key: "delete",
            className: "no-print",
            style: {
                position: "absolute",
                left: -53,
                top: -1,
                color: "#ce0303",
                cursor: "pointer",
                background: "white",
                padding: "0px 3px",
                border: "1px solid lightgray",
                lineHeight: "1.2em",
                width: 14,
                textAlign: "center"
            },
            onMouseDown: this.handleDeleteCaption
        },
            React.createElement("i", {
                className: "fa fa-times",
                style: {
                    verticalAlign: "-1px"
                }
            })), React.createElement("span", {
                key: "edit",
                className: "no-print",
                style: {
                    position: "absolute",
                    left: -28,
                    top: -1,
                    color: "rgb(17,85,204)",
                    cursor: "pointer",
                    background: "white",
                    padding: "0px 3px",
                    border: "1px solid lightgray",
                    lineHeight: "1.2em",
                    width: 14,
                    textAlign: "center"
                },
                onMouseDown: this.handleEditCaptionPrefix
            },
                React.createElement("i", {
                    className: "fa fa-edit",
                    style: {
                        verticalAlign: "-2px"
                    }
                }))] : null;
    }
    renderCaption() {
        if (this.props.data.elements.caption) {
            var e = this.context.getTableCaptionInfo();
            return React.createElement("div", {
                key: "caption",
                className: "role-table-caption-container",
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10
                }
            },
                React.createElement("span", {
                    className: "no-print-outline",
                    style: {
                        outline: this.props.selected ? "1px solid lightgray" : "none",
                        position: "relative",
                        textAlign: this.getTextAlignFromFirstLine()
                    }
                },
                    React.createElement("span", {
                        className: "role-table-caption-prefix",
                        style: {
                            paddingRight: 5,
                            fontWeight: "bold"
                        },
                        onMouseDown: this.handleCaptionPrefixMouseDown
                    },
                        React.createElement("span", {
                            className: "role-table-caption-name"
                        },
                            e.caption.name), " ", React.createElement("span", {
                                className: "role-table-caption-number"
                            },
                                "1"), ":"), React.createElement(EditArea, Object.assign({},
                                    this.buildMetaDataFromName("caption"), {
                                    showBorder: false,
                                    isTextMode: true,
                                    className: "table-caption",
                                    style: {
                                        minWidth: 50,
                                        display: "inline"
                                    }
                                })), this.renderCaptionActions()));
        }
    }
    renderComponent() {
        return React.createElement("x-matrix", {
            class: this.props.data.text.substr(1)
        },
            React.createElement("table", {
                "data-table-id": this.props.data.id,
                style: this.getTableCssStyle()
            },
                this.renderColumns(), React.createElement("tbody", null, this.renderTables())), this.renderPlaceHolderAtEnd(), this.renderCaption());
    }
}
U.contextTypes = _.assignIn({
    requestRenderToolBarComponent: PropTypes.any,
    getTableCaptionInfo: PropTypes.any,
    notifyTableCaptionNumbering: PropTypes.any
},
    CompositeBlock.contextTypes);
class W extends U {
    constructor() {
        super(...arguments);
        this.renderBorderResizeDelayRunObj = TimerHelper.createLaterRunObject("latest", 200);
        this.onTableResizeTouchStart = (e) => {
            e.preventDefault();
        };
        this.renderBorderResizeDelayRunFunc = () => {
            console.log("render border again after change");
            var e = ReactDOM.findDOMNode(this);
            if (jQuery(e).find(">x-matrix>table-resize").get(0).firstElementChild) {
                this.renderBordersResizing();
            }
        };
        this.handleResizeEnd = (e) => {
            if (this.resizing = false, this.requestUnmountResizing && (this.requestUnmountResizing = false, this.unrenderBordersResizing()), e.isVertical) {
                return this.handleRowResize(e),
                    void this.renderBordersResizing();
            }
            this.handleColumnResize(e);
            this.renderBordersResizing();
        };
        this.handleRowResize = (e) => {
            var t = e.lineIndex;
            var n = e.y;
            var r = e.lines;
            var a = ReactDOM.findDOMNode(this);
            var i = this.props.data;
            var o = _.clone(i);
            var s = this.getElementRect(a);
            if (o.rowHeights = o.rowHeights || [], 0 === t) {
                var c = R.getNextAvailableLine(r, 0);
                var d = Math.max(10, c.spans[0].toPoint.y + s.top - n);
                return o.rowHeights = PropUpdateHelper.setIndex(o.rowHeights, 0, d),
                    void this.requestDataChanged(o);
            }
            var h = (c = R.getPreviousAvailableLine(r, t)).line;
            d = Math.max(10, n - (c.spans[0].toPoint.y + s.top));
            o.rowHeights = PropUpdateHelper.setIndex(o.rowHeights, h, d);
            this.requestDataChanged(o);
        };
        this.handleColumnResize = (e) => {
            var t = e.lineIndex;
            var n = e.x;
            var r = e.lines;
            var a = ReactDOM.findDOMNode(this);
            var i = jQuery(ReactDOM.findDOMNode(this)).find(">x-matrix>table").get(0);
            var o = this.getElementRect(jQuery(i).closest("x-line").get(0));
            var s = this.getElementRect(a);
            var c = this.getElementRect(i);
            var h = this.props.data;
            if (0 === t) {
                var u = 10 * h.column;
                var p = _.clamp(o.left + 1, n, c.right - u);
                var m = p - o.left;
                var f = c.right - p;
                var g = StyleHelper.addStyle(h, "left", m);
                return g = StyleHelper.addStyle(g, "width", f),
                    g = TabularUtils.recalculateColumnWidth(g, f),
                    void this.requestDataChanged(g);
            }
            if (t === this.props.data.column) {
                var y = Math.max(n, c.left - 10);
                return f = (y = Math.min(y, o.right)) - c.left + 1,
                    g = StyleHelper.addStyle(this.props.data, "width", f),
                    g = TabularUtils.recalculateColumnWidth(g, f),
                    void this.requestDataChanged(g);
            }
            var E = _.clone(g || this.props.data);
            var S = R.getNextAvailableLine(r, t);
            var I = R.getPreviousAvailableLine(r, t);
            y = _.clamp(I.spans[0].fromPoint.x + s.left + 10, n, S.spans[0].fromPoint.x + s.left - 10);
            E.columnWidths = E.columnWidths || [];
            var T = I.line;
            var b = Math.max(10, y - (I.spans[0].toPoint.x + s.left));
            E.columnWidths = PropUpdateHelper.setIndex(E.columnWidths, T, b);
            var L = S.spans[0].toPoint.x - I.spans[0].toPoint.x;
            var M = 0;
            if (S.line === E.column) {
                M = 1;
            }
            E.columnWidths = PropUpdateHelper.setIndex(E.columnWidths, t, L - b - M);
            this.requestDataChanged(E);
        };
        this.handleMouseEnter = () => {
            this.renderBordersResizing();
        };
        this.handleMouseLeave = () => {
            if (!Global.isTestEnv()) {
                this.unrenderBordersResizing();
            }
        };
    }
    componentDidMount() {
        super.componentDidMount();
        var e = ReactDOM.findDOMNode(this);
        if (Global.isMobileOrTablet() || (jQuery(e).on("mouseenter", this.handleMouseEnter), jQuery(e).on("mouseleave", this.handleMouseLeave)), Global.isMobileOrTablet()) {
            var t = jQuery(e).find(">x-matrix>table-resize");
            var n = EventHelper.getFalsePassiveObject();
            t.get(0).addEventListener("touchstart", this.onTableResizeTouchStart, n);
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        var e = ReactDOM.findDOMNode(this);
        if (Global.isMobileOrTablet() || (jQuery(e).off("mouseenter", this.handleMouseEnter), jQuery(e).off("mouseleave", this.handleMouseLeave)), Global.isMobileOrTablet()) {
            jQuery(e).find(">x-matrix>table-resize").get(0).removeEventListener("touchstart", this.onTableResizeTouchStart, false);
        }
        this.renderBorderResizeDelayRunObj.cancel();
    }
    afterReactRender(e, t) {
        if (super.afterReactRender(e, t), Global.isMobileOrTablet() || Global.isTestEnv()) {
            if (this.isChildSelected()) {
                if (this.context && this.context.getEditorInfo) {
                    if (this.context.getEditorInfo().selectOnly) {
                        return;
                    }
                }
                this.renderBordersResizing();
            } else {
                this.unrenderBordersResizing();
            }
        }
    }
    afterReactRenderWhenDataChanged() {
        if (!Global.isMobileOrTablet()) {
            this.requestRenderBorderResizing();
        }
    }
    requestRenderBorderResizing() {
        this.renderBorderResizeDelayRunObj.later(this.renderBorderResizeDelayRunFunc);
    }
    requestDataChanged(e) {
        this.props.onDataChanged(e, DataChangeModel.getBuilder().withPreventScroll().build());
    }
    renderBordersResizing() {
        if (this.requestUnmountResizing) {
            this.requestUnmountResizing = false;
        } else {
            var e = ReactDOM.findDOMNode(this);
            var t = jQuery(e).find(">x-matrix>table").get(0);
            var n = jQuery(e).find(">x-matrix>table-resize");
            var r = R.buildResizeRowLines(this.props.data, this.refMap, e, t);
            var a = R.buildResizeColumnLines(this.props.data, this.refMap, e, t);
            ReactDOM.render(React.createElement(w, {
                onResizeStart: () => {
                    return this.resizing = true;
                },
                onResizeEnd: (e) => {
                    return this.handleResizeEnd(e);
                },
                vLines: r,
                hLines: a
            }), n.get(0));
        }
    }
    unrenderBordersResizing() {
        if (this.resizing) {
            this.requestUnmountResizing = true;
        } else {
            var e = ReactDOM.findDOMNode(this);
            var t = jQuery(e).find(">x-matrix>table-resize");
            ReactDOM.unmountComponentAtNode(t.get(0));
            console.log("mouse leave");
        }
    }
}
/// var G = n(140)/*TableInfoHelper*/;  // 1 times
var SymbolTable = new class extends CompositeSymbolBase {
    getViewComponent() {
        return W;
    }
    getModel(e) {
        var t = (e = e || {
            names:
                [],
            row: 3,
            column: 3
        }).row || 3;
        var n = e.column || 3;
        var r = {};
        var a = 0;
        for (; a < t; a++) {
            var i = 0;
            for (; i < n; i++) {
                r[TabularHelper.getKeyFromRowCol(a, i)] = "editor";
            }
        }
        var o = this.getModelFromStructure(r, "\\table");
        return o.row = t,
            o.column = n,
            o;
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\table"],
            height: 30,
            insertInTextModeOnly: true,
            renderSymbol: () => {
                return React.createElement("svg", {
                    style: {
                        width: 19,
                        height: 15,
                        transform: "translate(2px,1px)",
                        stroke: "gray"
                    }
                },
                    React.createElement("path", {
                        style: {
                            transform: "translate(2px,2px)"
                        },
                        d: "M-0.5,0 L12.5,0 M-0.5,6 L12.5,6 M-0.5,12 L12.5,12 M0,0 L0,12 M6,0 L6,12 M12,0 L12,12",
                        fill: "none"
                    }));
            }
        });
    }
    getLatexName() {
        return "\\table";
    }
    toModel(e, t) {
        return Object(SymbolMatrixC)(this.getLatexName(), t);
    }
    isInMathExpression() {
        return false;
    }
    isNestedTable(e) {
        return e.parent().closest("table").length > 0;
    }
    toLatex(e, t, n) {
        var r = e.id;
        t = _.assignIn({},
            t, {
            inMathExpression: false,
            inTable: true
        });
        var i = jQuery("table[data-table-id='".concat(r, "']"));
        if (i.length <= 0) {
            return "";
        }
        var o = i.closest("composite-block").get(0).reactInstance.getModel();
        var s = this.getCellsRectInfo(i);
        var l = TableInfoHelper.findSizeSpans(o.column, s, "row");
        var c = this.splitToColumnWidths(l);
        return f.toLatex(o, _.assignIn({},
            t, {
            isNestedTable: this.isNestedTable(i),
            tableWidth: i.width(),
            columnWidths: c
        }), n);
    }
    splitToColumnWidths(e) {
        var t = [];
        return e.forEach((e) => {
            if (e.fromIndex != e.toIndex) {
                var n = e.toIndex - e.fromIndex + 1;
                var r = (e.toPosition - e.fromPosition) / n;
                _.times(n, () => {
                    t.push(r);
                });
            } else {
                t.push(e.toPosition - e.fromPosition);
            }
        }),
            t;
    }
    getCellsRectInfo(e) {
        return jQuery(e).find(">tbody>tr>td").toArray().map((t) => {
            return {
                colSpan: Number.parseInt(jQuery(t).attr("colSpan") || "1", 10),
                rowSpan: Number.parseInt(jQuery(t).attr("rowSpan") || "1", 10),
                rIndex: Number.parseInt(jQuery(t).attr("data-r-index"), 10),
                cIndex: Number.parseInt(jQuery(t).attr("data-c-index"), 10),
                rect: DOMHelper.findRectElementToElement(t, e.get(0))
            };
        });
    }
};

export default SymbolTable