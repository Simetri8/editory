import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { LatexTableSc } from './Symbol-latex-table';
import ArrayHelper from '../Mathcha/ArrayHelper';
import DOMHelper from '../Elements/DOMHelper';
import LatexBehaviors from '../Latex/LatexBehaviors';
import LatexTableDesignerDialog from '../Editor/LatexTableDesignerDialog';
import LatexTableModelNotifier from '../Tabular/LatexTableModelNotifier';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TableInfoHelper from '../Tabular/TableInfoHelper';
import TimerHelper from '../Mathcha/TimerHelper';
import Toggler from '../Editor/Toggler';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(1510) /*Symbol-latex-table-designed*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 24 times
/// var a = n.n(r);
/// var i = n(540)/*Symbol-latex-table*/;  // 1 times
/// var o = n(3)/*_.assignIn*/;  // 10 times
/// var s = n.n(o);
/// var l = n(461)/*LatexTableDesignerDialog*/;  // 1 times
/// var c = n(5)/*sizzle*/;  // 7 times
/// var d = n.n(c);
/// var h = n(4)/*DOMHelper*/;  // 1 times
/// var u = n(37)/*ToolbarIcons*/;  // 5 times
/// var p = n(140)/*TableInfoHelper*/;  // 10 times
/// var m = n(43)/*ArrayHelper*/;  // 1 times
/// var g = n(16)/*ReactDOM*/,  // 1 times
/// y = n.n(g)
/// A = n(146)/*Toggler*/,  // 7 times
/// E = n(7)/*PropUpdateHelper*/,  // 3 times
/// v = n(285)/*LatexBehaviors*/,  // 2 times
/// S = n(19)/*TimerHelper*/,  // 1 times
/// C = n(156)/*LatexTableModelNotifier*/;  // 4 times
class f extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hBorders: {
                borders: [],
                fullLines: []
            },
            vBorders: {
                borders: [],
                fullLines: []
            },
            selectedColumn: 0
        };
        this.toggleBooktab = (e) => {
            this.props.onToggleBooktab(e);
        };
        this.handleAddNewLine = (e) => {
            this.props.onAddHorizontalLine(e);
        };
        this.handleDeleteLine = (e) => {
            this.props.onDeleteHorizontalLine(e);
        };
    }
    shouldComponentUpdate(e, t) {
        return !ArrayHelper.areEqualShallow(t, this.state);
    }
    setElementInfo(e, t, n) {
        this.tableHtml = e;
        this.symbolHtml = t;
        this.data = n;
        this.calculatePosition();
    }
    invalidatePosition(e) {
        if (this.tableHtml) {
            this.data = e;
            this.calculatePosition();
        }
    }
    calculatePosition() {
        var e = jQuery(this.tableHtml).find(">tbody>tr>td.role-cell-data").toArray().map((e) => {
            return {
                colSpan: Number.parseInt(jQuery(e).attr("data-colSpan"), 10),
                rowSpan: Number.parseInt(jQuery(e).attr("data-rowSpan"), 10),
                rIndex: Number.parseInt(jQuery(e).attr("data-r-index"), 10),
                cIndex: Number.parseInt(jQuery(e).attr("data-c-index"), 10),
                rect: DOMHelper.findRectElementToElement(e, this.symbolHtml),
                editorId: jQuery(e).attr("data-editorId")
            };
        });
        this.setState({
            hBorders: this.calculateHLines(e),
            vBorders: this.calculateVLines(e)
        });
    }
    calculateHLines(e) {
        return TableInfoHelper.calculateHorizontalSections(e, this.data);
    }
    calculateVLines(e) {
        return TableInfoHelper.calculateVerticalSections(e, this.data);
    }
    rectangleBoundingToStyle(e) {
        return {
            left: e.left,
            top: e.top,
            width: e.right - e.left,
            height: e.bottom - e.top,
            position: "absolute"
        };
    }
    renderHorizontalBorderSelection() {
        var e = {
            width: "0.8em",
            height: "0.8em",
            cursor: "pointer",
            position: "absolute"
        };
        return React.createElement("div", null, React.createElement("div", null, this.state.hBorders.borders.map((e, t) => {
            return React.createElement("div", {
                key: t,
                onClick: () => {
                    return this.props.onHorizontalLineClick(e.lineIndex, e.sectionIndex);
                },
                style: this.rectangleBoundingToStyle(e.rect),
                className: "border-selection__line-section role-h-border-section"
            });
        })), React.createElement("div", null, this.state.hBorders.fullLines.map((t, n) => {
            return React.createElement("div", {
                key: n
            },
            React.createElement("div", {
                className: "role-h-decrease",
                onClick: () => {
                    return this.handleDeleteLine(t.lineIndex);
                },
                style: _.assignIn({},
                e, {
                    right: -20,
                    top: t.rect.top - 3,
                    fill: "red"
                })
            },
            ToolbarIcons.minus), React.createElement("div", {
                className: "role-h-increase",
                onClick: () => {
                    return this.handleAddNewLine(t.lineIndex);
                },
                style: _.assignIn({},
                e, {
                    right: -40,
                    top: t.rect.top - 5,
                    fill: "green"
                })
            },
            ToolbarIcons.plus), React.createElement("div", {
                className: "role-booktab-tick",
                onClick: () => {
                    return this.toggleBooktab(t.lineIndex);
                },
                style: _.assignIn({},
                e, {
                    right: -70,
                    top: t.rect.top - 7,
                    fill: t.booktabRule ? "green" : "gray",
                    stroke: t.booktabRule ? "green" : "gray"
                })
            },
            ToolbarIcons.checkIcon));
        })));
    }
    renderVerticalBorderSelection() {
        var e = {
            width: "0.8em",
            height: "0.8em",
            position: "absolute",
            cursor: "pointer"
        };
        return React.createElement("div", null, React.createElement("div", null, this.state.vBorders.borders.map((e, t) => {
            return React.createElement("div", {
                onClick: () => {
                    return this.props.onVerticalLineClick(e.lineIndex, e.sectionIndex);
                },
                style: this.rectangleBoundingToStyle(e.rect),
                key: t,
                className: "border-selection__line-section role-v-border-section"
            });
        })), React.createElement("div", null, this.state.vBorders.fullLines.map((t, n) => {
            return React.createElement("div", {
                key: n
            },
            React.createElement("div", {
                className: "role-v-decrease",
                onClick: () => {
                    return this.props.onDeleteVerticalLine(t.lineIndex);
                },
                style: _.assignIn({},
                e, {
                    top: -17,
                    fill: "red",
                    left: t.rect.left - 3
                })
            },
            ToolbarIcons.minus), React.createElement("div", {
                className: "role-v-increase",
                onClick: () => {
                    return this.props.onAddVerticalLine(t.lineIndex);
                },
                style: _.assignIn({},
                e, {
                    top: -35,
                    fill: "green",
                    left: t.rect.left - 3
                })
            },
            ToolbarIcons.plus));
        })));
    }
    render() {
        var e = [];
        return this.state.hBorders.borders.forEach((t) => {
            var n = e.find((e) => {
                return e.cIndex === t.sectionIndex;
            });
            if (!n) {
                n = {
                    cIndex: t.sectionIndex,
                    rect: t.rect
                };
                e.push(n);
            }
            n.rect = TableInfoHelper.extendRect(n.rect, t.rect);
        }),
        React.createElement("div", {
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        },
        React.createElement("div", null, e.map((e, t) => {
            return React.createElement("div", {
                key: t,
                onClick: () => {
                    this.props.onColumnSelected(t);
                    this.setState({
                        selectedColumn: t
                    });
                },
                style: _.assignIn({},
                this.rectangleBoundingToStyle(e.rect), {
                    background: this.state.selectedColumn === t ? "rgba(135,206,250,0.2)" : void 0
                }),
                className: "border-selection__column-section"
            });
        })), this.renderHorizontalBorderSelection(), this.renderVerticalBorderSelection(), React.createElement("div", {
            style: {
                position: "absolute",
                right: -100,
                top: -30,
                fontSize: "0.9em"
            }
        },
        "Booktabs"));
    }
}
class x extends LatexTableDesignerDialog {
    constructor() {
        super(...arguments);
        this.handleColumnSelected = (e) => {
            var t = this.getTableProperties(e);
            LatexTableModelNotifier.changeData(_.assignIn({},
            t, {
                columnIndex: e
            }));
        };
        this.handleToggleBooktab = (e) => {
            var t = TableInfoHelper.getSafeLineInfo(this.props.data.hLines, e);
            var n = Toggler.toggleBooktab(t, 0 === e || e >= this.props.data.row);
            var r = this.getChangedHorizontalLineData(this.props.data, e, () => {
                return n;
            });
            this.props.onDataChanged(r);
        };
        this.handleAddHorizontalLine = (e) => {
            var t = TableInfoHelper.getSafeLineInfo(this.props.data.hLines, e);
            var n = Toggler.increaseLine(t);
            var r = this.getChangedHorizontalLineData(this.props.data, e, () => {
                return n;
            });
            this.props.onDataChanged(r);
        };
        this.handleDeleteHorizontalLine = (e) => {
            var t = TableInfoHelper.getSafeLineInfo(this.props.data.hLines, e);
            var n = Toggler.reduceLine(t);
            var r = this.getChangedHorizontalLineData(this.props.data, e, () => {
                return n;
            });
            this.props.onDataChanged(r);
        };
        this.handleAddVerticalLine = (e) => {
            var t = TableInfoHelper.getSafeLineInfo(this.props.data.vLines, e);
            var n = Toggler.increaseLine(t);
            var r = this.getChangedVerticalLineData(this.props.data, e, () => {
                return n;
            });
            this.props.onDataChanged(r);
        };
        this.handleDeleteVerticalLine = (e) => {
            var t = TableInfoHelper.getSafeLineInfo(this.props.data.vLines, e);
            var n = Toggler.reduceLine(t);
            var r = this.getChangedVerticalLineData(this.props.data, e, () => {
                return n;
            });
            this.props.onDataChanged(r);
        };
        this.handleHorizontalLineClick = (e, t) => {
            var n = TableInfoHelper.getSafeLineInfo(this.props.data.hLines, e);
            var r = Toggler.toggleLineSection(n, {
                nOfSections: this.props.data.column,
                toggleIndex: t
            },
            0 === e || e >= this.props.data.row);
            var a = this.getChangedHorizontalLineData(this.props.data, e, () => {
                return r;
            });
            this.props.onDataChanged(a);
        };
        this.handleVerticalLineClick = (e, t) => {
            var n = TableInfoHelper.getSafeLineInfo(this.props.data.vLines, e);
            var r = Toggler.toggleLineSection(n, {
                nOfSections: this.props.data.row,
                toggleIndex: t
            },
            false);
            var a = this.getChangedVerticalLineData(this.props.data, e, () => {
                return r;
            });
            this.props.onDataChanged(a);
        };
    }
    getTableProperties(e) {
        var t = (this.props.data.columnWidths || [])[e];
        return t = t || "auto",
        {
            tableWidth: this.props.data.tableWidth || "grow",
            columnWidth: t,
            columnIndex: e
        };
    }
    getNoneBorderStyle() {
        return "1px solid rgba(0,0,0,0.13)";
    }
    notifiy(e) {
        var t = this.getTableProperties(e.columnIndex);
        if (e.columnWidth != t.columnWidth || e.tableWidth != t.tableWidth) {
            var n = _.assignIn({},
            this.props.data, {
                columnWidths: PropUpdateHelper.setIndex(this.props.data.columnWidths || [], e.columnIndex, e.columnWidth),
                tableWidth: "grow" == e.tableWidth ? void 0 : e.tableWidth
            });
            console.log(n.columnWidths);
            console.log(n.tableWidth);
            this.props.onDataChanged(n);
        }
    }
    componentDidMount() {
        super.componentDidMount();
        LatexTableModelNotifier.subscribeModelHandler(this);
        LatexTableModelNotifier.changeData(this.getTableProperties(0));
        if (this.borderSelection) {
            TimerHelper.waitALitteWhile(() => {
                var e = ReactDOM.findDOMNode(this);
                this.borderSelection.setElementInfo(jQuery(e).find(">table").get(0), e, this.props.data);
            });
        }
    }
    componentWillUnmount() {
        LatexTableModelNotifier.unsubscribeModelHandler();
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        if (e.data != this.props.data && this.borderSelection) {
            this.borderSelection.invalidatePosition(this.props.data);
        }
    }
    extraInfoOnDataTd(e, t) {
        return {
            "data-r-index": e.originRow,
            "data-c-index": e.originColumn,
            "data-rowSpan": e.originalRowSpan,
            "data-colSpan": e.originalColSpan,
            "data-editorId": t.id
        };
    }
    renderSettings() {
        return React.createElement("div", null, this.renderBorderSelection());
    }
    renderBorderSelection() {
        return React.createElement(f, {
            key: "border-selection",
            onAddHorizontalLine: this.handleAddHorizontalLine,
            onDeleteHorizontalLine: this.handleDeleteHorizontalLine,
            onAddVerticalLine: this.handleAddVerticalLine,
            onDeleteVerticalLine: this.handleDeleteVerticalLine,
            onHorizontalLineClick: this.handleHorizontalLineClick,
            onVerticalLineClick: this.handleVerticalLineClick,
            onToggleBooktab: this.handleToggleBooktab,
            onColumnSelected: this.handleColumnSelected,
            ref: (e) => {
                return this.borderSelection = e;
            }
        });
    }
    getChangedHorizontalLineData(e, t, n) {
        var r = e.hLines || [];
        var a = n(r[t] || {
            nOfLines: 0
        });
        var i = PropUpdateHelper.setIndex(r, t, a);
        return LatexBehaviors.normalizeTabular(_.assignIn({},
        e, {
            hLines: i
        }));
    }
    getChangedVerticalLineData(e, t, n) {
        var r = e.vLines || [];
        var a = n(r[t] || {
            nOfLines: 0
        });
        var i = PropUpdateHelper.setIndex(r, t, a);
        return LatexBehaviors.normalizeTabular(_.assignIn({},
        e, {
            vLines: i
        }));
    }
}
var SymbolLatexTableDesigned = new class extends LatexTableSc {
    getViewComponent() {
        return x;
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type:
            "composite",
            names: [this.getLatexName()],
            height: 30,
            insertInTextModeOnly: true,
            isHidden: true,
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
        return "\\latex-table-designed";
    }
}

export default SymbolLatexTableDesigned