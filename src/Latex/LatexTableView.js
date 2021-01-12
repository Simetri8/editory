import _ from 'lodash';

/// xxx(345) /*LatexTableView*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 1 times
/// var o = n.n(i);
var LatexTableView = new class {
    toLatexStructure(e) {
        var t = [];
        var n = {
            columnsOptions: this.constructColumnsOptions(e, t),
            rows: [],
            definitions: t,
            environmentName: "full-width" == e.tableWidth ? "tabularx" : "tabular"
        };
        var r = _.assignIn({},
        e, {
            columnAligns: this.findColumnOption(n.columnsOptions)
        });
        return this.constructCells(r, n),
        n;
    }
    getNumberOfFullLine(e) {
        return e && e.nOfLines || 0;
    }
    isLineSectionExist(e, t) {
        return !! e && (e.nOfLines > 0 || e.borders && !!e.borders[t]);
    }
    isPartialSectionEnabled(e, t) {
        return !! e && e.borders && !!e.borders[t];
    }
    constructColumnsOptions(e, t) {
        var n = this;
        var r = [];
        var a = e.vLines || [];
        var i = function (i) {
            var o = n.getNumberOfFullLine(a[i]);
            if (o > 0) {
                r.push({
                    type: "line",
                    numberOfLines: o
                });
            }
            var s = n.getMostAlignment(e, i);
            if ("number" == typeof e.columnWidths[i] ? "left" == s ? r.push({
                type: "fixed",
                align: "left",
                cIndex: i,
                width: "".concat(e.columnWidths[i], "cm")
            }) : (t.some((e) => {
                return "fixed-column-definition" == e.type && e.align === s;
            }) || t.push({
                type: "fixed-column-definition",
                align: s
            }), r.push({
                type: "fixed",
                align: s,
                cIndex: i,
                width: "".concat(e.columnWidths[i], "cm")
            })) : "full-width" == e.tableWidth ? ("left" != s && (t.some((e) => {
                return "grow-column-definition" == e.type && e.align === s;
            }) || t.push({
                type: "grow-column-definition",
                align: s
            })), r.push({
                type: "grow",
                align: s,
                cIndex: i
            })) : r.push({
                type: "align",
                align: s,
                cIndex: i
            }), i >= e.column - 1) {
                var l = n.getNumberOfFullLine(a[e.column]);
                if (l > 0) {
                    r.push({
                        type: "line",
                        numberOfLines: l
                    });
                }
            }
        };
        var o = 0;
        for (; o < e.column; o++) {
            i(o);
        }
        return r;
    }
    getMostAlignment(e, t) {
        var n = {
            left: 0,
            center: 0,
            right: 0
        };
        var r = 0;
        for (; r < e.row; r++) {
            n[e.cells[r][t].align]++;
        }
        return n.left >= n.right && n.left > n.center ? "left" : n.right >= n.center ? "right" : "center";
    }
    constructHLines(e, t, n, r, a) {
        if (!t) {
            return [];
        }
        var i = this.getNumberOfFullLine(t);
        var s = e.some((e) => {
            return e.lineIndex === n;
        });
        if (i > 0 && !s) {
            if (t.booktabRule) {
                var l = "middle";
                return 0 === n && (l = "top"),
                a && (l = "bottom"),
                [{
                    type: "booktab-full-line",
                    numberOfLines: i,
                    ruleType: l
                }];
            }
            return [{
                type: "full-line",
                numberOfLines: i
            }];
        }
        var c = _.times(r).map((r) => {
            return this.isLineSectionExist(t, r) && !e.some((e) => {
                return e.lineIndex === n && e.sectionIndex === r;
            });
        });
        var d = [];
        var h = null;
        var u = 0;
        for (; u < c.length; u++) {
            if (c[u]) {
                if (h) {
                    h.to = u;
                } else {
                    h = t.booktabRule ? {
                        type: "booktab-column-line",
                        from: u,
                        to: u
                    } : {
                        type: "column-line",
                        from: u,
                        to: u
                    };
                    d.push(h);
                }
            } else {
                h = null;
            }
        }
        return d;
    }
    findColumnOption(e) {
        return e.filter((e) => {
            return "align" == e.type || "paragraph" == e.type || "fixed" == e.type || "grow" == e.type;
        }).map((e) => {
            switch (e.type) {
            case "align":
                case "fixed":
                case "grow":
                return e.align;
            default:
                return "left";
            }
        });
    }
    constructCells(e, t) {
        var n = this.extractInformation(e);
        var r = new Array(e.row);
        var a = e.hLines || [];
        var i = 0;
        for (; i < e.row; i++) {
            r[i] = {
                cells: new Array(e.column),
                leadings: [],
                trailings: []
            };
            var o = r[i];
            o.leadings = this.constructHLines(n, a[i], i, e.column, false);
            var s = 0;
            for (; s < e.column; s++) {
                this.constructCellInfo(o, e, i, s);
            }
            if (i >= e.row - 1) {
                o.trailings = this.constructHLines(n, a[e.row], e.row, e.column, true);
            }
        }
        t.rows = r;
        this.makeHiddenForColumnSpans(r);
        this.adjustMergedRowsWithPartialVLines(r, e.vLines || [], e);
        this.adjustVLinesMergedRowsBelow(r, e.vLines || [], e);
        this.reduceJoinVLines(r, e.vLines || []);
        this.adjustCellAlign(e, t);
    }
    adjustCellAlign(e, t) {
        var n = t.rows;
        var r = 0;
        for (; r < n.length; r++) {
            var a = n[r];
            var i = 0;
            for (; i < a.cells.length; i++) {
                var o = a.cells[i];
                var s = e.cells[r][i];
                var l = e.columnAligns[i];
                if ("normal" == o.type && "model" == o.data.type && "none" != l && s.align != l) {
                    a.cells[i] = {
                        type: "multicolumn",
                        colSpan: 1,
                        columnsOptions: this.getThreeValuesColumnOptions(e, r, i),
                        data: o.data
                    };
                }
                if ("multirow" == o.type && "none" != l && s.align != l) {
                    a.cells[i] = {
                        type: "multicolumnrow",
                        colSpan: 1,
                        columnsOptions: this.getThreeValuesColumnOptions(e, r, i),
                        cell: o
                    };
                }
            }
        }
    }
    adjustMergedRowsWithPartialVLines(e, t, n) {
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r];
            var i = 0;
            for (; i < a.cells.length; i++) {
                var o = a.cells[i];
                if ("multirow" == o.type) {
                    var s = t[i + 1] && !!t[i + 1].borders;
                    if (0 === i) {
                        s = s || t[i] && !!t[i].borders;
                    }
                    if (s) {
                        a.cells[i] = {
                            type: "multicolumnrow",
                            colSpan: 1,
                            cell: {
                                type: "multirow",
                                data: o.data,
                                rowSpan: o.rowSpan
                            },
                            columnsOptions: this.getThreeValuesColumnOptions(n, r, i)
                        };
                    }
                }
            }
        }
    }
    adjustVLinesMergedRowsBelow(e, t, n) {
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r];
            var i = 0;
            for (; i < a.cells.length; i++) {
                var o = a.cells[i];
                if ("multicolumnrow" == o.type) {
                    this.setCellRightFromTo(e, r + 1, r + o.cell.rowSpan - 1, i, i + o.colSpan - 1, t, n.cells[r][i].align);
                }
            }
        }
    }
    shouldConvertToMultiColumn(e, t) {
        return this.isLineSectionExist(e, t) !== (1 === this.getNumberOfFullLine(e));
    }
    setCellRightFromTo(e, t, n, r, a, i, o) {
        var s = t;
        for (; s <= n; s++) {
            var l = e[s];
            var c = r;
            for (; c <= a; c++) {
                if (c != a || 0 != c) {
                    if (c != a) {
                        if (0 != c) {
                            l.cells[c] = {
                                type: "multicolumn",
                                colSpan: 1,
                                columnsOptions: {
                                    align: {
                                        type: "align",
                                        align: o,
                                        cIndex: 0
                                    }
                                }
                            };
                        } else {
                            var d = i[c];
                            if (this.shouldConvertToMultiColumn(d, s)) {
                                l.cells[c] = {
                                    type: "multicolumn",
                                    colSpan: 1,
                                    columnsOptions: {
                                        left: this.isLineSectionExist(d, s) ? {
                                            type: "line",
                                            numberOfLines: Math.max(1, this.getNumberOfFullLine(d))
                                        } : void 0,
                                        align: {
                                            type: "align",
                                            align: o,
                                            cIndex: 0
                                        }
                                    }
                                };
                            }
                        }
                    } else {
                        var h = i[c + 1];
                        if (this.shouldConvertToMultiColumn(h, s)) {
                            l.cells[c] = {
                                type: "multicolumn",
                                colSpan: 1,
                                columnsOptions: {
                                    align: {
                                        type: "align",
                                        align: o,
                                        cIndex: 0
                                    },
                                    right: this.isLineSectionExist(h, s) ? {
                                        type: "line",
                                        numberOfLines: Math.max(1, this.getNumberOfFullLine(h))
                                    } : void 0
                                }
                            };
                        }
                    }
                } else {
                    var u = i[c];
                    var p = i[c + 1];
                    var m = this.shouldConvertToMultiColumn(u, s);
                    if (m = m || this.shouldConvertToMultiColumn(p, s)) {
                        l.cells[c] = {
                            type: "multicolumn",
                            colSpan: 1,
                            columnsOptions: {
                                left: this.isLineSectionExist(u, s) ? {
                                    type: "line",
                                    numberOfLines: Math.max(1, this.getNumberOfFullLine(u))
                                } : void 0,
                                align: {
                                    type: "align",
                                    align: o,
                                    cIndex: 0
                                },
                                right: this.isLineSectionExist(p, s) ? {
                                    type: "line",
                                    numberOfLines: Math.max(1, this.getNumberOfFullLine(p))
                                } : void 0
                            }
                        };
                    }
                }
            }
        }
    }
    reduceJoinVLines(e, t) {
        var n = 0;
        for (; n < e.length; n++) {
            var r = e[n];
            var a = 0;
            for (; a < r.cells.length - 1; a++) {
                var i = r.cells[a];
                if (i && ("multicolumn" == i.type || "multicolumnrow" == i.type)) {
                    if (a > 0 && this.getNumberOfFullLine(t[a]) > 0) {
                        i.columnsOptions.left = void 0;
                    }
                    var o = r.cells[a + i.colSpan];
                    if (o) {
                        if (! ("multicolumn" != o.type && "multicolumnrow" != o.type)) {
                            o.columnsOptions.left = void 0;
                        }
                    }
                }
            }
        }
    }
    makeHiddenForColumnSpans(e) {
        var t = 0;
        for (; t < e.length; t++) {
            var n = e[t];
            var r = 0;
            for (; r < n.cells.length; r++) {
                var a = n.cells[r];
                if ("multicolumn" == a.type || "multicolumnrow" == a.type) {
                    var i = r + 1;
                    for (; i < r + a.colSpan; i++) {
                        n.cells[i] = {
                            type: "hidden"
                        };
                    }
                }
            }
        }
    }
    constructCellData(e, t) {
        return e.lines.length > 1 ? {
            type: "makecell",
            model: e,
            align: t
        } : {
            type: "model",
            model: e
        };
    }
    constructCellInfo(e, t, n, r) {
        var a = t.cells[n][r];
        var i = a.rowSpan;
        var o = a.colSpan;
        var s = a.hidden;
        var l = a.data;
        var c = a.align;
        var d = t.vLines || [];
        if (i > 1 && o > 1) {
            var h = {
                type: "multicolumnrow",
                colSpan: o,
                cell: {
                    type: "multirow",
                    rowSpan: i,
                    data: this.constructCellData(l, c)
                },
                columnsOptions: this.getThreeValuesColumnOptions(t, n, r)
            };
            e.cells[r] = h;
        } else {
            if (o > 1) {
                var u = {
                    type: "multicolumn",
                    colSpan: o,
                    data: this.constructCellData(l, c),
                    columnsOptions: this.getThreeValuesColumnOptions(t, n, r)
                };
                e.cells[r] = u;
            } else {
                if (i > 1) {
                    var p = {
                        type: "multirow",
                        rowSpan: i,
                        data: this.constructCellData(l, c)
                    };
                    e.cells[r] = p;
                } else {
                    if (s) {
                        e.cells[r] = {
                            type: "empty"
                        };
                    } else {
                        var m = d[r];
                        var f = d[r + 1];
                        if (this.isPartialSectionEnabled(m, n) || this.isPartialSectionEnabled(f, n)) {
                            var g = {
                                type: "multicolumn",
                                colSpan: 1,
                                data: this.constructCellData(l, c),
                                columnsOptions: this.getThreeValuesColumnOptions(t, n, r)
                            };
                            e.cells[r] = g;
                        } else {
                            var y = {
                                type: "normal",
                                data: this.constructCellData(l, c)
                            };
                            e.cells[r] = y;
                        }
                    }
                }
            }
        }
    }
    getThreeValuesColumnOptions(e, t, n) {
        var r = e.cells[t][n];
        var a = r.colSpan;
        var i = r.align;
        var o = e.vLines || [];
        var s = o[n];
        var l = o[n + a];
        var c = {
            align: {
                type: "align",
                align: i,
                cIndex: 0
            }
        };
        return 0 === n && this.isLineSectionExist(s, t) && (c.left = {
            type: "line",
            numberOfLines: Math.max(1, this.getNumberOfFullLine(s))
        }),
        this.isLineSectionExist(l, t) && (c.right = {
            type: "line",
            numberOfLines: Math.max(1, this.getNumberOfFullLine(l))
        }),
        c;
    }
    extractInformation(e) {
        var t = [];
        var n = 0;
        for (; n < e.row; n++) {
            var r = 0;
            for (; r < e.column; r++) {
                var a = e.cells[n][r];
                var i = a.colSpan;
                var o = a.rowSpan;
                if (o > 1 || i > 1) {
                    this.extractHiddenLines({
                        rIndex: n,
                        cIndex: r,
                        colSpan: i,
                        rowSpan: o
                    },
                    t);
                }
            }
        }
        return t;
    }
    extractHiddenLines(e, t) {
        var n = e.rIndex;
        for (; n < e.rIndex + e.rowSpan; n++) {
            var r = e.cIndex;
            for (; r < e.cIndex + e.colSpan; r++) {
                if (n > e.rIndex) {
                    t.push({
                        lineIndex: n,
                        sectionIndex: r
                    });
                }
            }
        }
    }
}

export default LatexTableView