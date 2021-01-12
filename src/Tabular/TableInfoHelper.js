import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Geometry from '../Geometry/Geometry';
import TabularExtraction from './TabularExtraction';

/// xxx(140) /*TableInfoHelper*/

/// var r = n(35)/*slicedToArray*/;  // 2 times
/// var a = n.n(r);
/// var i = n(3);  // 4 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 3 times
/// var l = n.n(s);
/// var c = n(224)/*TabularExtraction*/;  // 2 times
/// var d = n(1)/*Geometry*/;  // 1 times
var TableInfoHelper = new class {
    getSafeLineInfo(e, t) {
        var n = (e || [])[t] || {
            nOfLines: 0
        };
        return n.borders ? _.assignIn({},
        n, {
            nOfLines: 0
        }) : n.nOfLines ? n : _.assignIn({},
        n, {
            nOfLines: 0
        });
    }
    constructFullLines(e, t) {
        var n = [];
        return e.forEach((e) => {
            var t = n.find((t) => {
                return t.lineIndex === e.lineIndex;
            });
            if (!t) {
                t = {
                    lineIndex: e.lineIndex,
                    rect: e.rect,
                    sectionIndex: void 0
                };
                n.push(t);
            }
            t.rect = this.extendRect(e.rect, t.rect);
        }),
        t && n.forEach((e) => {
            if (t.includes(e.lineIndex)) {
                e.booktabRule = true;
            }
        }),
        n;
    }
    extendRect(e, t) {
        return Geometry.expandMaxRectBounding(e, t);
    }
    splitMultipleSections(e, t) {
        var n = [];
        return e.forEach((e) => {
            if (e.startSectionIndex != e.endSectionIndex) {
                var r = e.endSectionIndex - e.startSectionIndex + 1;
                if ("row" == t) {
                    var a = (e.rect.right - e.rect.left) / r;
                    _.times(r, (t) => {
                        n.push({
                            lineIndex: e.lineIndex,
                            sectionIndex: e.startSectionIndex + t,
                            rect: {
                                top: e.rect.top,
                                bottom: e.rect.bottom,
                                left: e.rect.left + a * t,
                                right: e.rect.left + a * (t + 1)
                            }
                        });
                    });
                } else {
                    var i = (e.rect.bottom - e.rect.top) / r;
                    _.times(r, (t) => {
                        n.push({
                            lineIndex: e.lineIndex,
                            sectionIndex: e.startSectionIndex + t,
                            rect: {
                                top: e.rect.top + i * t,
                                bottom: e.rect.top + i * (t + 1),
                                left: e.rect.left,
                                right: e.rect.right
                            }
                        });
                    });
                }
            } else {
                n.push({
                    lineIndex: e.lineIndex,
                    sectionIndex: e.startSectionIndex,
                    rect: e.rect
                });
            }
        }),
        n;
    }
    calculateHorizontalSections(e, t) {
        var n = this;
        var r = TabularExtraction.extractInformation(t);
        var i = this.findSizeSpans(t.column, e, "row");
        var s = [];
        var l = function (o) {
            var l = function (t) {
                if (r.hLineHiddenPositions.some((e) => {
                    return e.lineIndex === o && e.sectionIndex === t;
                })) {
                    return "continue";
                }
                var l = n.findCellsInfoBoundToHLine(o, t, e);
                var c = n.calculateTopBottom(l);
                var d = slicedToArray(c, 2);
                var h = d[0];
                var u = d[1];
                var p = i.find((e) => {
                    return t >= e.fromIndex && t <= e.toIndex;
                });
                var m = p.fromPosition;
                var f = p.toPosition;
                var g = p.fromIndex;
                var y = p.toIndex;
                if (s.every((e) => {
                    return e.lineIndex != o || e.startSectionIndex != g || e.endSectionIndex != y;
                })) {
                    s.push({
                        rect: {
                            top: h,
                            left: m,
                            bottom: u,
                            right: f
                        },
                        startSectionIndex: g,
                        endSectionIndex: y,
                        lineIndex: o
                    });
                }
            };
            var c = 0;
            for (; c < t.column; c++) {
                l(c);
            }
        };
        var d = 0;
        for (; d <= t.row; d++) {
            l(d);
        }
        var h = this.splitMultipleSections(s, "row");
        h = h.map((e) => {
            return _.assignIn({},
            e, {
                rect: {
                    left: e.rect.left,
                    top: e.rect.top - 3,
                    right: e.rect.right,
                    bottom: e.rect.bottom + 3
                }
            });
        });
        var u = (t.hLines || []).map((e, t) => {
            return e && e.booktabRule ? t : void 0;
        }).filter((e) => {
            return void 0 !== e;
        });
        return {
            borders: h,
            fullLines: this.constructFullLines(h, u)
        };
    }
    calculateVerticalSections(e, t) {
        var n = this;
        var r = this.findSizeSpans(t.row, e, "column");
        var i = TabularExtraction.extractInformation(t);
        var s = [];
        var l = function (o) {
            var l = function (t) {
                if (i.vLineHiddenPositions.some((e) => {
                    return e.lineIndex === o && e.sectionIndex === t;
                })) {
                    return "continue";
                }
                var l = n.findCellsInfoBoundToVLine(o, t, e);
                var c = n.calculateLeftRight(l);
                var d = slicedToArray(c, 2);
                var h = d[0];
                var u = d[1];
                var p = r.find((e) => {
                    return t >= e.fromIndex && t <= e.toIndex;
                });
                var m = p.fromPosition;
                var f = p.toPosition;
                var g = p.fromIndex;
                var y = p.toIndex;
                if (s.every((e) => {
                    return e.lineIndex != o || e.startSectionIndex != g || e.endSectionIndex != y;
                })) {
                    s.push({
                        rect: {
                            top: m,
                            left: h,
                            bottom: f,
                            right: u
                        },
                        startSectionIndex: g,
                        endSectionIndex: y,
                        lineIndex: o
                    });
                }
            };
            var c = 0;
            for (; c < t.row; c++) {
                l(c);
            }
        };
        var d = 0;
        for (; d <= t.column; d++) {
            l(d);
        }
        var h = this.splitMultipleSections(s, "column");
        return {
            borders: h = h.map((e) => {
                return _.assignIn({},
                e, {
                    rect: {
                        left: e.rect.left - 3,
                        top: e.rect.top,
                        right: e.rect.right + 3,
                        bottom: e.rect.bottom
                    }
                });
            }),
            fullLines: this.constructFullLines(h)
        };
    }
    calculateTopBottom(e) {
        var t = 0;
        var n = 0;
        if (e.length > 1) {
            t = e.find((e) => {
                return "before" == e.cellPosition;
            }).cellInfo.rect.bottom;
            n = e.find((e) => {
                return "after" == e.cellPosition;
            }).cellInfo.rect.top;
        } else {
            var r = e[0];
            t = n = "before" == r.cellPosition ? r.cellInfo.rect.bottom : r.cellInfo.rect.top;
        }
        return [t, n];
    }
    calculateLeftRight(e) {
        var t = 0;
        var n = 0;
        if (e.length > 1) {
            t = e.find((e) => {
                return "before" == e.cellPosition;
            }).cellInfo.rect.right;
            n = e.find((e) => {
                return "after" == e.cellPosition;
            }).cellInfo.rect.left;
        } else {
            var r = e[0];
            t = n = "before" == r.cellPosition ? r.cellInfo.rect.right : r.cellInfo.rect.left;
        }
        return [t, n];
    }
    findSizeSpans(e, t, n) {
        var r = _.times(e).map(() => {
            return {
                fromPosition: void 0,
                toPosition: void 0
            };
        });
        if ("row" == n) {
            t.forEach((e) => {
                var t = e.cIndex;
                var n = e.cIndex + e.colSpan - 1;
                r[t].fromPosition = e.rect.left;
                r[n].toPosition = e.rect.right;
            });
        } else {
            t.forEach((e) => {
                var t = e.rIndex;
                var n = e.rIndex + e.rowSpan - 1;
                r[t].fromPosition = e.rect.top;
                r[n].toPosition = e.rect.bottom;
            });
        }
        var a = [];
        var i = {
            fromPosition: r[0].fromPosition,
            toPosition: r[0].toPosition,
            fromIndex: 0,
            toIndex: 0
        };
        a.push(i);
        var o = 1;
        for (; o < r.length; o++) {
            var s = r[o];
            if (void 0 === s.fromPosition) {
                if (! (void 0 === s.toPosition)) {
                    if (void 0 === a[a.length - 1].toPosition) {
                        a[a.length - 1].toPosition = s.toPosition;
                        a[a.length - 1].toIndex = o;
                    }
                }
            } else {
                if (void 0 === a[a.length - 1].toPosition) {
                    a[a.length - 1].toPosition = s.fromPosition;
                    a[a.length - 1].toIndex = o - 1;
                }
                a.push({
                    fromPosition: r[o].fromPosition,
                    toPosition: r[o].toPosition,
                    fromIndex: o,
                    toIndex: o
                });
            }
        }
        return a;
    }
    findCellsInfoBoundToHLine(e, t, n) {
        var r = [];
        var a = 0;
        for (; a < n.length; a++) {
            var i = n[a];
            if (e >= i.rIndex && e < i.rIndex + i.rowSpan && t >= i.cIndex && t < i.cIndex + i.colSpan) {
                r.push({
                    cellInfo: i,
                    indexFromSpan: t - i.cIndex,
                    cellPosition: "after"
                });
            }
            if (i.rIndex + i.rowSpan === e && t >= i.cIndex && t < i.cIndex + i.colSpan) {
                r.push({
                    cellInfo: i,
                    indexFromSpan: t - i.cIndex,
                    cellPosition: "before"
                });
            }
        }
        return r;
    }
    findCellsInfoBoundToVLine(e, t, n) {
        var r = [];
        var a = 0;
        for (; a < n.length; a++) {
            var i = n[a];
            if (e >= i.cIndex && e < i.cIndex + i.colSpan && t >= i.rIndex && t < i.rIndex + i.rowSpan) {
                r.push({
                    cellInfo: i,
                    indexFromSpan: t - i.cIndex,
                    cellPosition: "after"
                });
            }
            if (e === i.cIndex + i.colSpan && t >= i.rIndex && t < i.rIndex + i.rowSpan) {
                r.push({
                    cellInfo: i,
                    indexFromSpan: t - i.cIndex,
                    cellPosition: "before"
                });
            }
        }
        return r;
    }
};

export default TableInfoHelper