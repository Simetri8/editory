import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import ArrayHelper2 from '../Mathcha/ArrayHelper2';
import CheckBoxWrapper from '../Mathcha/CheckBoxWrapper';
import EditArea from './EditArea';
import Global from '../Global';
import InputRadio from '../Elements/InputRadio';
import LatexTableModelNotifier from '../Tabular/LatexTableModelNotifier';
import MathType from '../MathType';
import ModalDialogContainer from './ModalDialogContainer';
import NumericSliderComponent from '../Elements/NumericSliderComponent';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import StyleHelper from '../Mathcha/StyleHelper';
import SymbolSettingButton from '../Elements/SymbolSettingButton';
import TabularActions from '../Tabular/TabularActions';
import TabularCellHelper from '../Tabular/TabularCellHelper';
import TabularExtraction from '../Tabular/TabularExtraction';
import TabularHelper from '../Tabular/TabularHelper';

/// xxx(461) /*LatexTableDesignerDialog*/

/// var xy = n(91)/*MathType*/;  // 1 times
/// var a = n(3)/*_.assignIn*/,  // 13 times
/// i = n.n(a)
/// o = n(0)/*React*/,  // 38 times
/// s = n.n(o)
/// l = n(21)/*EditArea*/,  // 1 times
/// c = n(105)/*ModalDialogContainer*/,  // 1 times
/// d = n(209)/*InputRadio*/,  // 2 times
/// h = n(41)/*NumericSliderComponent*/,  // 1 times
/// u = n(101)/*CheckBoxWrapper*/,  // 1 times
/// p = n(156)/*LatexTableModelNotifier*/;  // 6 times
/// var g = n(106)/*SymbolSettingButton*/,  // 1 times
/// y = n(14)/*classnames*/,  // 1 times
/// A = n.n(y)
/// E = n(64)/*TabularCellHelper*/,  // 1 times
/// v = n(2)/*lodash*/,  // 7 times
/// S = n.n(v)
/// C = n(224)/*TabularExtraction*/,  // 1 times
/// x = n(7)/*PropUpdateHelper*/,  // 6 times
/// I = n(55)/*ArrayHelper2*/;  // 4 times
/// var b = n(11)/*Global*/,  // 2 times
/// L = n(251)/*TabularActions*/,  // 1 times
/// R = n(18)/*StyleHelper*/,  // 1 times
/// M = n(15)/*TabularHelper*/;  // 1 times
/*n.d(t, "a", function () {
    return k
});*/
class m extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tableWidth: "grow",
            columnWidth: "auto",
            columnIndex: 0
        };
        this.handleColumnWidthChanged = (e) => {
            LatexTableModelNotifier.changeData(_.assignIn({},
            this.state, {
                columnWidth: e
            }));
        };
        this.handleColumnWidthAutoCheckChanged = (e) => {
            if (e) {
                LatexTableModelNotifier.changeData(_.assignIn({},
                this.state, {
                    columnWidth: "auto"
                }));
            } else {
                LatexTableModelNotifier.changeData(_.assignIn({},
                this.state, {
                    columnWidth: 2
                }));
            }
        };
        this.onTableWidthSelect = (e) => {
            LatexTableModelNotifier.changeData(_.assignIn({},
            this.state, {
                tableWidth: e
            }));
        };
    }
    notifiy(e) {
        if (this.state != e) {
            this.setState(e);
        }
    }
    componentDidMount() {
        LatexTableModelNotifier.subscribeTablePropertiesHandler(this);
    }
    componentWillUnmount() {
        LatexTableModelNotifier.unsubscribeTablePropertiesHandler();
    }
    getSafeColumnWidthNumber() {
        return "string" == typeof this.state.columnWidth ? 2 : this.state.columnWidth;
    }
    renderColumnWidthInput() {
        if ("auto" != this.state.columnWidth) {
            return React.createElement(NumericSliderComponent, {
                style: {
                    fontSize: 13,
                    width: 30
                },
                unitStyle: {
                    fontSize: 13
                },
                min: .1,
                max: 10,
                step: .5,
                decimals: 2,
                disableSlider: true,
                value: this.getSafeColumnWidthNumber(),
                unit: "cm",
                onValueChanged: this.handleColumnWidthChanged,
                onValueChanging: this.handleColumnWidthChanged
            });
        }
    }
    render() {
        var e = this.state.tableWidth || "grow";
        return React.createElement("div", {
            style: {
                width: 210,
                paddingLeft: 10,
                flexShrink: 0,
                flexDirection: "column",
                fontSize: 13,
                lineHeight: "17px",
                paddingTop: 10
            }
        },
        React.createElement("div", {
            style: {
                fontWeight: "bold",
                paddingBottom: 5
            }
        },
        "Table Width:"), React.createElement("div", null, React.createElement(InputRadio, {
            value: "tableWidth",
            checked: "grow" == e,
            onSelect: () => {
                return this.onTableWidthSelect("grow");
            },
            label: "Growing"
        }), React.createElement(InputRadio, {
            value: "tableWidth",
            checked: "full-width" == e,
            onSelect: () => {
                return this.onTableWidthSelect("full-width");
            },
            label: "Full Width"
        })), React.createElement("div", {
            style: {
                marginTop: 10,
                fontWeight: "bold"
            }
        },
        "Column Width:"), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline"
            }
        },
        React.createElement(CheckBoxWrapper, {
            style: {
                marginRight: 42,
                lineHeight: "28px"
            },
            textStyle: {
                fontSize: 13
            },
            name: "Auto",
            checked: "auto" == this.state.columnWidth,
            onValueChanged: this.handleColumnWidthAutoCheckChanged
        }), this.renderColumnWidthInput()), React.createElement("div", {
            style: {
                marginTop: 10,
                fontWeight: "bold"
            }
        },
        "Selected Column:", this.state.columnIndex + 1));
    }
}
class f extends React.Component {
    constructor(e) {
        super(e);
        this.handleOk = () => {
            var e = this.mathType.getModel().lines[0].blocks[0];
            this.props.onOk(_.assignIn({},
            e, {
                text: "\\latex-table",
                ___designedWidth: void 0
            }));
            this.props.onClose();
        };
        var t = _.assignIn({},
        this.props.model, {
            ___designedWidth: this.props.designedWidth
        });
        this.editorModel = {
            id: "tt1",
            lines: [{
                id: "tt2",
                blocks: [_.assignIn({},
                t, {
                    text: "\\latex-table-designed"
                })]
            }]
        };
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            style: {
                width: this.props.designedWidth + 360,
                maxWidth: "95vw",
                maxHeight: "80vh"
            },
            centerButtons: true,
            noLabel: "Cancel",
            okLabel: "Ok",
            message: "",
            isProgressing: false,
            onOk: this.handleOk,
            onCancel: this.props.onClose,
            onNo: null,
            isOkDisabled: null,
            show: true
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                width: "100%"
            }
        },
        React.createElement(m, null), React.createElement("div", {
            style: {
                overflow: "auto",
                flexGrow: 1,
                borderLeft: "1px solid lightgray"
            }
        },
        React.createElement(MathType, {
            ref:
            (e) => {
                return this.mathType = e;
            },
            onModelChanged: null,
            model: this.editorModel,
            readOnly: true,
            style: {
                paddingTop: 40,
                border: "none",
                marginTop: 0,
                background: "white",
                width: "100%"
            },
            rootEditorStyle: {
                height: "auto",
                minHeight: "auto"
            }
        }))));
    }
}
var T = new class {
    makeSureLinesInfoSafe(e, t) {
        var n = ArrayHelper2.newArray(t + 1, true);
        var r = 0;
        for (; r < t + 1; r++) {
            if (e && e[r]) {
                n[r] = e[r];
                if (n[r].borders && n[r].nOfLines) {
                    n[r] = {
                        borders: n[r].borders
                    };
                }
            } else {
                n[r] = {};
            }
        }
        return n;
    }
    countExtraLineFromLineInfo(e, t, n) {
        return t.nOfLines > 1 ? t.nOfLines - 1 : n.includes(e) ? 1 : 0;
    }
    countExtraLineColumnForSpan(e, t, n, r) {
        var a = 0;
        var i = t + 1;
        for (; i < t + n; i++) {
            var o = e.vLines[i];
            a = a + this.countExtraLineFromLineInfo(i, o, r.vLineIndexesPartialInMergedRows);
        }
        return a;
    }
    countExtraLineRowForSpan(e, t, n, r) {
        var a = 0;
        var i = t + 1;
        for (; i < t + n; i++) {
            var o = e.hLines[i];
            a = a + this.countExtraLineFromLineInfo(i, o, r.hLineIndexesPartialInMergedColumns);
        }
        return a;
    }
    isLastColumnIncludingSpan(e, t, n) {
        return e + t >= n.column;
    }
    isLastRowIncludingSpan(e, t, n) {
        return e + t >= n.row;
    }
    countColumnIncludingLineColumn(e, t) {
        var n = 0;
        var r = 0;
        for (; r < e.column + 1; r++) {
            var a = e.vLines[r];
            n = n + this.countExtraLineFromLineInfo(r, a, t.vLineIndexesPartialInMergedRows);
        }
        return e.column + n;
    }
    countRowIncludingLineRow(e, t) {
        var n = 0;
        var r = 0;
        for (; r < e.row + 1; r++) {
            var a = e.hLines[r];
            n = n + this.countExtraLineFromLineInfo(r, a, t.hLineIndexesPartialInMergedColumns);
        }
        return e.row + n;
    }
    constructBorderForCell(e, t, n, r, a) {
        var i = e.hLines[t];
        var o = e.vLines[n];
        var s = e.cells[t][n];
        var l = {
            left: this.calculateBorderStyleForColumn(o, t, n, r),
            top: this.calculateBorderStyleForRow(i, t, n, r)
        };
        return a ? (this.isLastColumnIncludingSpan(n, s.colSpan, e) && (l.right = this.calculateBorderStyleForColumn(e.vLines[e.column], t, e.column, r)), this.isLastRowIncludingSpan(t, s.rowSpan, e) && (l.bottom = this.calculateBorderStyleForRow(e.hLines[e.row], e.row, n, r))) : (n >= e.column - 1 && (l.right = this.calculateBorderStyleForColumn(e.vLines[e.column], t, e.column, r)), t >= e.row - 1 && (l.bottom = this.calculateBorderStyleForRow(e.hLines[e.row], e.row, n, r))),
        l;
    }
    processDataCell(e, t) {
        var n = [];
        var r = 0;
        for (; r < e.row; r++) {
            var a = ArrayHelper2.newArray(e.column, true);
            var i = 0;
            for (; i < e.column; i++) {
                var o = e.cells[r][i];
                if (o.hidden) {
                    a[i] = {
                        type: "data",
                        borderInfo: {},
                        colSpan: 1,
                        rowSpan: 1,
                        hidden: o.hidden,
                        originRow: r,
                        originColumn: i,
                        originalColSpan: o.colSpan,
                        originalRowSpan: o.rowSpan
                    };
                } else {
                    var s = o.colSpan + this.countExtraLineColumnForSpan(e, i, o.colSpan, t);
                    var l = o.rowSpan + this.countExtraLineRowForSpan(e, r, o.rowSpan, t);
                    a[i] = {
                        type: "data",
                        borderInfo: this.constructBorderForCell(e, r, i, t, true),
                        colSpan: s,
                        rowSpan: l,
                        hidden: o.hidden,
                        originRow: r,
                        originColumn: i,
                        originalColSpan: o.colSpan,
                        originalRowSpan: o.rowSpan
                    };
                }
            }
            n.push(a);
        }
        return n;
    }
    process(e) {
        var t = TabularExtraction.extractInformation(e);
        var n = this.constructDataMatrix(e, t);
        var r = this.processDataCell(n, t);
        var a = n.row - 1;
        for (; a >= 0; a--) {
            if (a >= n.row - 1) {
                r = PropUpdateHelper.insertMultiple(r, n.row, this.constructRowPartialLineForMergedCell(n, n.row, t, "top"));
                r = PropUpdateHelper.insertMultiple(r, n.row, this.constructExtraRowLine(n, n.row, "bottom"));
            }
            r = PropUpdateHelper.insertMultiple(r, a, this.constructRowPartialLineForMergedCell(n, a, t, "bottom"));
            r = PropUpdateHelper.insertMultiple(r, a, this.constructExtraRowLine(n, a, "top"));
        }
        var i = n.column - 1;
        for (; i >= 0; i--) {
            var o = 0;
            var s = 0;
            for (; s < r.length; s++) {
                var l = r[s][i];
                var c = r[s][Math.max(0, i - 1)];
                if ("data" == l.type && (o = l.originRow), i >= n.column - 1) {
                    var d = this.constructColumnPartialLineForMergedCell(l, n.vLines[n.column], n.column, o, t, "left");
                    var h = this.constructExtraColumnLine(l, n, n.vLines[n.column], t, true);
                    r[s] = PropUpdateHelper.insertMultiple(r[s], n.column, d.concat(h));
                }
                var u = this.constructColumnPartialLineForMergedCell(l, n.vLines[i], i, o, t, "right");
                var p = this.constructExtraColumnLine(c, n, n.vLines[i], t, false);
                r[s] = PropUpdateHelper.insertMultiple(r[s], i, u.concat(p));
            }
        }
        var m = 0;
        for (; m < r.length; m++) {
            var f = r[m];
            var g = 0;
            for (; g < f.length; g++) {
                var y = f[g];
                if ("data" == y.type && (y.colSpan > 1 || y.rowSpan > 1)) {
                    this.fillHiddenSection(r, m, g, y.colSpan, y.rowSpan);
                }
            }
        }
        return this.modifyForBooktabRules(r, e.hLines || [], e.row),
        r;
    }
    isBooktabRule(e, t) {
        return e[t] && !!e[t].booktabRule;
    }
    anyHLine(e, t) {
        if (!e[t]) {
            return false;
        }
        var n = e[t];
        return n.nOfLines > 0 || n.borders && n.borders.some((e) => {
            return e;
        });
    }
    modifyForBooktabRules(e, t, n) {
        var r = 0;
        var a = 0;
        for (; a < e.length; a++) {
            var i = e[a];
            var o = i.some((e) => {
                return "data" == e.type;
            });
            var s = 0;
            for (; s < i.length; s++) {
                var l = i[s];
                if ("line" == l.type || "extra-line" == l.type || "data" == l.type) {
                    if (this.isBooktabRule(t, r)) {
                        var c = 0 === r || r >= n ? "bold-exist" : "semi-bold-exist";
                        if ("exist" == l.borderInfo.top) {
                            l.borderInfo.top = c;
                        }
                        if (! ("exist" != l.borderInfo.bottom || o)) {
                            l.borderInfo.bottom = c;
                        }
                    }
                    if (o) {
                        var d = r + ("data" == l.type ? l.rowSpan : 1);
                        if (this.isBooktabRule(t, d) && "exist" == l.borderInfo.bottom) {
                            var h = d >= n ? "bold-exist" : "semi-bold-exist";
                            l.borderInfo.bottom = h;
                        }
                    }
                }
                if (o && s >= i.length - 1) {
                    r = i.find((e) => {
                        return "data" == e.type;
                    }).originRow + 1;
                }
                if ("data" == l.type) {
                    if (this.isBooktabRule(t, l.originRow) && this.anyHLine(t, l.originRow)) {
                        l.extraPaddingTop = true;
                    }
                    if (this.isBooktabRule(t, l.originRow + l.rowSpan) && this.anyHLine(t, l.originRow + l.rowSpan)) {
                        l.extraPaddingBottom = true;
                    }
                }
            }
        }
    }
    constructExtraColumnLine(e, t, n, r, a) {
        if (!n.nOfLines || n.nOfLines <= 1) {
            return [];
        }
        if ("data" != e.type) {
            return "extra-line" == e.type || "line" == e.type ? _.times(n.nOfLines - 1).map(() => {
                return {
                    type: "extra-line",
                    borderInfo: e.borderInfo,
                    joinSection: true
                };
            }) : _.times(n.nOfLines - 1).map(() => {
                return {
                    type: "nothing"
                };
            });
        }
        var i = e.originColumn;
        var o = e.originRow;
        var s = this.constructBorderForCell(t, o, i, r, false);
        return r.hLineHiddenPositions.some((e) => {
            return e.lineIndex === o && e.sectionIndex === i;
        }) && (s.top = "transparent"),
        _.times(n.nOfLines - 1).map(() => {
            return {
                type: "extra-line",
                borderInfo: {
                    [a ? "right" : "left"] : "exist",
                    top: s.top,
                    bottom: s.bottom
                }
            };
        });
    }
    fillHiddenSection(e, t, n, r, a) {
        var i = t;
        for (; i < t + a; i++) {
            var o = n;
            for (; o < n + r; o++) {
                if (! (i === t && o === n)) {
                    e[i][o].hidden = true;
                }
            }
        }
    }
    constructDataMatrix(e, t) {
        var n = {
            cells: ArrayHelper2.newArray(e.row, true),
            row: e.row,
            column: e.column,
            hLines: this.makeSureLinesInfoSafe(e.hLines, e.row),
            vLines: this.makeSureLinesInfoSafe(e.vLines, e.column),
            columnIncludingLineColumn: 0,
            rowIncludingLineRow: 0
        };
        return n.columnIncludingLineColumn = this.countColumnIncludingLineColumn(n, t),
        n.rowIncludingLineRow = this.countRowIncludingLineRow(n, t),
        _.times(e.row).forEach((t) => {
            return n.cells[t] = ArrayHelper2.newArray(e.column, true);
        }),
        TabularCellHelper.cellLoop(e, (e) => {
            var t = e.rIndex;
            var r = e.cIndex;
            var a = e.colSpan;
            var i = e.rowSpan;
            var o = e.hidden;
            n.cells[t][r] = {
                colSpan: a,
                rowSpan: i,
                hidden: o
            };
        }),
        n;
    }
    calculateBorderStyleForColumn(e, t, n, r) {
        return r.vLineHiddenPositions.some((e) => {
            return e.lineIndex === n && e.sectionIndex === t;
        }) ? "none" : e.nOfLines > 0 ? "exist" : r.vLineIndexesPartialInMergedRows.includes(n) ? "none" : e.borders && e.borders[t] ? "exist" : "transparent";
    }
    calculateBorderStyleForRow(e, t, n, r) {
        return r.hLineHiddenPositions.some((e) => {
            return e.lineIndex === t && e.sectionIndex === n;
        }) ? "none" : e.nOfLines > 0 ? "exist" : r.hLineIndexesPartialInMergedColumns.includes(t) ? "none" : e.borders && e.borders[n] ? "exist" : "transparent";
    }
    constructRowPartialLineForMergedCell(e, t, n, r) {
        if (n.hLineIndexesPartialInMergedColumns.includes(t)) {
            var a = e.hLines[t];
            return [_.times(e.column).map((e) => {
                var i = n.hLineHiddenPositions.some((n) => {
                    return n.lineIndex === t && n.sectionIndex === e;
                });
                return {
                    type: "line",
                    direction: "row",
                    borderInfo: {
                        [r] : !i && a && a.borders && a.borders[e] ? "exist" : "transparent"
                    }
                };
            })];
        }
        return [];
    }
    constructColumnPartialLineForMergedCell(e, t, n, r, a, i) {
        return a.vLineIndexesPartialInMergedRows.includes(n) ? "data" != e.type ? [{
            type: "nothing"
        }] : [{
            type: "line",
            direction: "column",
            borderInfo: {
                [i] : t && t.borders && t.borders[r] ? "exist" : "transparent"
            }
        }] : [];
    }
    constructExtraRowLine(e, t, n) {
        var r = e.hLines[t];
        return !r.nOfLines || r.nOfLines <= 1 ? [] : _.times(r.nOfLines - 1).map(() => {
            return _.times(e.column).map(() => {
                return {
                    type: "extra-line",
                    borderInfo: {
                        [n] : "exist"
                    }
                };
            });
        });
    }
};
var w = "1px solid";
var O = "2px solid";
var D = "1px solid";
var N = 20;
class k extends TabularActions {
    constructor() {
        super(...arguments);
        this.handleOk = (e) => {
            this.props.onDataChanged(e);
        };
    }
    renderComponent() {
        var e = this.props.data;
        var t = T.process(e);
        var n = e.___designedWidth ? e.___designedWidth : "100%";
        return [React.createElement("table", {
            key: "table",
            style: {
                borderCollapse: "collapse",
                tableLayout: "fixed",
                width: "full-width" == e.tableWidth ? n : void 0
            }
        },
        this.renderColumns(t, e), React.createElement("tbody", null, this.renderTable(t))), React.createElement("div", {
            key: "settings"
        },
        this.renderSettings())];
    }
    renderSettings() {
        return this.renderDesginerDialog(this.props.data);
    }
    renderDesginerDialog(e) {
        return this.isSelected() ? React.createElement(SymbolSettingButton, {
            style: {
                left: -25,
                top: -25
            },
            key: "design",
            childHasOnClose: true
        },
        React.createElement(f, {
            model: e,
            onOk: this.handleOk,
            designedWidth: 500
        })) : null;
    }
    renderRowFromResult(e) {
        return e.map((e, t) => {
            if (e.hidden) {
                return null;
            }
            switch (e.type) {
            case "nothing":
                return React.createElement("td", {
                    style: {
                        padding: 0
                    },
                    key: t,
                    className: "non-select"
                });
            case "extra-line":
                return React.createElement("td", {
                    key: t,
                    className: "non-select",
                    style: _.assignIn({},
                    this.buildBorderStyle(e.borderInfo), {
                        padding: e.joinSection ? 0 : void 0,
                        maxWidth: 0
                    })
                });
            case "line":
                return Global.isFirefox() || Global.inNodeEnv() ? "row" == e.direction ? React.createElement("td", {
                    key: t,
                    className: "non-select",
                    style: _.assignIn({},
                    this.buildBorderStyle(e.borderInfo), {
                        padding: 0,
                        height: 0
                    })
                }) : React.createElement("td", {
                    key: t,
                    className: "non-select",
                    style: _.assignIn({},
                    this.buildBorderStyle(e.borderInfo), {
                        padding: 0,
                        width: 0
                    })
                }) : "row" == e.direction ? React.createElement("td", {
                    key: t,
                    className: "non-select",
                    style: {
                        padding: 0,
                        height: 0,
                        position: "relative"
                    }
                },
                React.createElement("div", {
                    style: _.assignIn({},
                    this.buildBorderStyle(e.borderInfo), {
                        position: "absolute",
                        left: 0,
                        right: -1,
                        userSelect: "none",
                        pointerEvents: "none"
                    })
                })) : React.createElement("td", {
                    key: t,
                    className: "non-select",
                    style: {
                        padding: 0,
                        width: 0,
                        position: "relative"
                    }
                },
                React.createElement("div", {
                    style: _.assignIn({},
                    this.buildBorderStyle(e.borderInfo), {
                        position: "absolute",
                        top: 0,
                        bottom: -1,
                        userSelect: "none",
                        pointerEvents: "none"
                    })
                }));
            case "data":
                var n = TabularHelper.getKeyFromRowCol(e.originRow, e.originColumn);
                var r = this.props.data.elements[n];
                var a = StyleHelper.getLatexTableCellStyle(r, "align");
                return React.createElement("td", Object.assign({},
                this.extraInfoOnDataTd(e, r), {
                    className: "role-cell-data",
                    colSpan: e.colSpan,
                    rowSpan: e.rowSpan,
                    style: _.assignIn({},
                    this.buildBorderStyle(e.borderInfo), {
                        minWidth: N,
                        textAlign: a,
                        paddingTop: e.extraPaddingTop ? 4 : void 0,
                        paddingBottom: e.extraPaddingBottom ? 4 : void 0
                    }),
                    key: "".concat(r.id, "_").concat(t)
                }), this.renderEditArea(n));
            }
        }).filter((e) => {
            return e;
        });
    }
    extraInfoOnDataTd(e, t) {
        return null;
    }
    buildBorderStyle(e) {
        if (!e) {
            return {};
        }
        var t = {};
        return t.borderTop = this.mapeBorderStyle(e.top),
        t.borderRight = this.mapeBorderStyle(e.right),
        t.borderBottom = this.mapeBorderStyle(e.bottom),
        t.borderLeft = this.mapeBorderStyle(e.left),
        t;
    }
    mapeBorderStyle(e) {
        if (e) {
            switch (e) {
            case "exist":
                return w;
            case "bold-exist":
                return O;
            case "semi-bold-exist":
                return D;
            case "transparent":
                return this.getNoneBorderStyle();
            }
        }
    }
    renderTable(e) {
        return e.map((e, t) => {
            var n = this.renderRowFromResult(e);
            return n.length > 0 ? React.createElement("tr", {
                key: t
            },
            n) : null;
        }).filter((e) => {
            return e;
        });
    }
    getNoneBorderStyle() {
        return this.isSelected() ? "1px solid rgba(0,0,0,0.13)" : "1px solid transparent";
    }
    renderEditArea(e) {
        
        var metaData = this.buildMetaDataFromName(e)
        return React.createElement(EditArea, Object.assign({},
            metaData, {
            style: {
                paddingLeft: 7,
                paddingRight: 7
            },
            isTextMode: true,
            showBorder: false,
            allowTag: false,
            allowEditorTag: false,
            fontSize: this.props.fontSize
        }));
    }
    getcolumnInfo(e, t) {
        var n = false;
        var r = true;
        var a = 0;
        for (; a < e.length; a++) {
            var i = e[a][t];
            if ("data" == i.type) {
                n = true;
                if (!i.hidden) {
                    r = false;
                }
            } else {
                r = false;
            }
        }
        return {
            anyData: n,
            hiddenDataColumn: r
        };
    }
    isColumnWidthFixed(e, t) {
        return "number" == typeof(e.columnWidths || [])[t];
    }
    renderColumns(e, t) {
        var n = e[0];
        return React.createElement("colgroup", null, n.map((n, r) => {
            var a = this.getcolumnInfo(e, r);
            var i = a.hiddenDataColumn;
            var o = a.anyData;
            return i ? React.createElement("col", {
                style: {
                    width: N
                },
                key: r
            }) : o ? this.isColumnWidthFixed(t, r) ? React.createElement("col", {
                key: r,
                style: {
                    width: "".concat(t.columnWidths[r], "cm")
                }
            }) : React.createElement("col", {
                key: r
            }) : React.createElement("col", {
                style: {
                    width: 2
                },
                key: r
            });
        }));
    }
    getClassName() {
        return classNames(super.getClassName(), "role-tabular");
    }
}

export default k