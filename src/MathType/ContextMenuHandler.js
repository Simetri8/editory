import _ from 'lodash';
import classNames from 'classnames';
import ClipboardJS from 'clipboard';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import EntityHelper from '../Editor/EntityHelper';
import Global from '../Global';
import TimerHelper from '../Mathcha/TimerHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';
import TooltipData from '../Mathcha/TooltipData';

/// xxx(1619) /*ContextMenuHandler*/

/// var r = n(3)/*_.assignIn*/;  // 7 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 109 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 4 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 4 times
/// var d = n.n(c);
/// var m = n(4)/*DOMHelper*/;  // 3 times
/// var C = n(2)/*lodash*/;  // 2 times
/// var x = n.n(C);
/// var yr = n(716)/*clipboard*/;  // 1 times
/// var Ar = n.n(yr);
/// var ye = n(5)/*sizzle*/;  // 9 times
/// var Ae = n.n(ye);
/// var k = n(6)/*DiagramIdHelper*/;  // 2 times
/// var j = n(63)/*EntityHelper*/;  // 4 times
/// var ee = n(11)/*Global*/;  // 5 times
/// var Lt = n(19)/*TimerHelper*/;  // 12 times
/// var vn = n(37)/*ToolbarIcons*/;  // 9 times
/// var In = n(67)/*TooltipData*/;  // 3 times
class Er {
    constructor(e) {
        this.itemFuncMap = e;
    }
    get(e) {
        return e.filter((e) => {
            return "none" != e;
        }).map((e, t) => {
            switch (e) {
            case "paste":
                return React.createElement("ct-item", {
                    key: e,
                    class: "paste disabled",
                    tabIndex: -1
                },
                React.createElement("ct-icon", null, React.createElement("i", {
                    className: "fa fa-clipboard",
                    "aria-hidden": "true"
                })), React.createElement("ct-name", null, " Paste ", React.createElement("span", {
                    style: {
                        fontSize: 11
                    }
                },
                "(Please press ".concat(TooltipData.getToolTipByKey("paste").value, ")"))));
            case "seperator":
                return React.createElement("ct-separator", {
                    key: "key_".concat(t)
                });
            case "insert-row-above":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Insert Row Above"));
            case "insert-row-below":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Insert Row Below"));
            case "insert-column-left":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Insert Column on Left"));
            case "insert-column-right":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Insert Column on Right"));
            case "delete-row":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Delete Row"));
            case "delete-column":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Delete Column"));
            case "remove-table":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Delete Table"));
            case "unmerge-cells":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Unmerge Cells"));
            case "merge-cells":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Merge Cells"));
            case "group":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Group"));
            case "ungroup":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "Ungroup"));
            case "to-latex":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "To Latex"));
            case "from-latex":
                return React.createElement("ct-item", {
                    key: e,
                    onMouseDown: this.itemFuncMap[e]
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, "From Latex"));
            }
        });
    }
}
class vr extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showSub: false,
            suggestionWords: [],
            disabled: false
        };
        this.handleMouseEnter = () => {
            this.setState({
                showSub: true
            });
        };
        this.handleMouseLeave = () => {
            this.setState({
                showSub: false
            });
        };
    }
    componentDidMount() {
        this.rootElement = ReactDOM.findDOMNode(this);
        TimerHelper.next(() => {
            this.props.requestSpellCheckSuggestions().then((e) => {
                if (e && e.suggestions) {
                    this.setState({
                        suggestionWords: e.suggestions,
                        suggestionResult: e
                    });
                } else {
                    this.setState({
                        disabled: true
                    });
                }
            });
        });
    }
    render() {
        return React.createElement("ct-item", {
            class: classNames({
                disabled: this.state.disabled
            }),
            style: {
                position: "relative"
            },
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
        },
        React.createElement("ct-icon", null), React.createElement("ct-name", null, "Spell Check"), React.createElement("ct-more", {
            style: {
                position: "absolute",
                right: "1em",
                top: "0.5em"
            }
        },
        React.createElement("i", {
            className: "fa fa-caret-right",
            "aria-hidden": "true"
        })), this.renderSubMenu());
    }
    handleWordClick(e) {
        if (this.state.suggestionResult) {
            var t = this.state.suggestionResult;
            this.props.replaceWordWith({
                originalWord: t.word,
                newWord: e,
                selected: t.selected,
                extendedSelected: t.extendedSelected
            });
        }
    }
    getSubMenuStyle() {
        if (!this.rootElement) {
            return {
                position: "absolute",
                left: "100%",
                top: 0,
                marginLeft: -2
            };
        }
        var e = DOMHelper.getElementRect(this.rootElement);
        var t = window.innerWidth;
        var n = window.innerHeight - e.top;
        var r = Math.min(n - 28 * (this.state.suggestionWords.length + 1) - 20, -5);
        return e.right > t - 150 ? {
            position: "absolute",
            left: "-100%",
            top: r,
            marginRight: -2
        } : {
            position: "absolute",
            left: "100%",
            top: r,
            marginLeft: -2
        };
    }
    getLimitedCharWord(e) {
        return e.length > 15 ? e.substring(0, 15) + "..." : e;
    }
    renderSubMenu() {
        if (this.state.showSub && this.state.suggestionWords && this.state.suggestionResult) {
            return React.createElement("context-menu-container", {
                style: this.getSubMenuStyle()
            },
            React.createElement("ct-item", {
                key: "ignore",
                onClick: () => {
                    return this.props.ignoreWord(this.state.suggestionResult.word);
                }
            },
            React.createElement("ct-icon", null), React.createElement("ct-name", null, 'Ignore "', React.createElement("span", {
                style: {
                    fontWeight: "bold"
                }
            },
            this.getLimitedCharWord(this.state.suggestionResult.word)), '"')), React.createElement("ct-separator", {
                key: "key_seperator"
            }), this.state.suggestionWords.map((e) => {
                return React.createElement("ct-item", {
                    key: e,
                    onClick: () => {
                        return this.handleWordClick(e);
                    }
                },
                React.createElement("ct-icon", null), React.createElement("ct-name", null, e));
            }));
        }
    }
}
class Sr extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showSub: false
        };
        this.handleMouseEnter = () => {
            this.setState({
                showSub: true
            });
        };
        this.handleMouseLeave = () => {
            this.setState({
                showSub: false
            });
        };
    }
    componentDidMount() {
        this.rootElement = ReactDOM.findDOMNode(this);
    }
    render() {
        return React.createElement("ct-item", {
            style: {
                position: "relative"
            },
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
        },
        React.createElement("ct-icon", null), React.createElement("ct-name", null, this.props.text), React.createElement("ct-more", {
            style: {
                position: "absolute",
                right: "1em",
                top: "0.5em"
            }
        },
        React.createElement("i", {
            className: "fa fa-caret-right",
            "aria-hidden": "true"
        })), this.renderSubMenu());
    }
    getSubMenuStyle() {
        if (!this.rootElement) {
            return {
                position: "absolute",
                left: "100%",
                top: 0,
                marginLeft: -2
            };
        }
        var e = DOMHelper.getElementRect(this.rootElement);
        var t = window.innerWidth;
        var n = window.innerHeight - e.top;
        var r = _.sumBy(this.props.items, (e) => {
            return e.value ? 29 : 10;
        }) + 20;
        var a = Math.min(n - r, -5);
        return e.right > t - 160 ? {
            position: "absolute",
            left: "-100%",
            top: a,
            marginRight: -2
        } : {
            position: "absolute",
            left: "100%",
            top: a,
            marginLeft: -2
        };
    }
    handleItemSelect(e) {
        this.props.onItemSelect(e);
    }
    renderSubMenu() {
        var e = {
            padding: "5px 12px"
        };
        if (this.state.showSub) {
            return React.createElement("context-menu-container", {
                style: _.assignIn({},
                this.getSubMenuStyle(), {
                    fill: "gray",
                    stroke: "none",
                    paddingTop: 3,
                    paddingBottom: 3
                })
            },
            this.props.items.map((t, n) => {
                return null == t.value ? React.createElement("ct-separator", {
                    key: "s".concat(n)
                }) : React.createElement("ct-item", {
                    key: (t.value || "").toString(),
                    style: e,
                    onClick: () => {
                        return this.handleItemSelect(t.value);
                    }
                },
                t.icon || React.createElement("ct-icon", null), React.createElement("ct-name", null, t.display, " "));
            }));
        }
    }
}
class Cr extends React.Component {
    constructor() {
        super(...arguments);
        this.ctIcon = {
            verticalAlign: "-6px",
            lineHeight: "8px",
            marginRight: "10px",
            marginBottom: -2
        };
        this.items = [{
            value: "top",
            display: "Top",
            icon: React.createElement("ct-icon", {
                style: _.assignIn({},
                this.ctIcon, {
                    transform: "rotate(-90deg)"
                })
            },
            ToolbarIcons.shapeRightAlign)
        },
        {
            value: "middle",
            display: "Middle",
            icon: React.createElement("ct-icon", {
                style: _.assignIn({},
                this.ctIcon, {
                    transform: "rotate(-90deg) translate(2px,0px)"
                })
            },
            ToolbarIcons.shapeCenterAlign)
        },
        {
            value: "bottom",
            display: "Bottom",
            icon: React.createElement("ct-icon", {
                style: _.assignIn({},
                this.ctIcon, {
                    transform: "rotate(90deg) translate(0px,1px)"
                })
            },
            ToolbarIcons.shapeRightAlign)
        },
        {
            value: null,
            display: null
        },
        {
            value: "left",
            display: "Left",
            icon: React.createElement("ct-icon", {
                style: _.assignIn({},
                this.ctIcon, {
                    transform: "scaleX(-1) translate(1px,0px)"
                })
            },
            ToolbarIcons.shapeRightAlign)
        },
        {
            value: "center",
            display: "Center",
            icon: React.createElement("ct-icon", {
                style: this.ctIcon
            },
            ToolbarIcons.shapeCenterAlign)
        },
        {
            value: "right",
            display: "Right",
            icon: React.createElement("ct-icon", {
                style: this.ctIcon
            },
            ToolbarIcons.shapeRightAlign)
        },
        {
            value: null,
            display: null
        },
        {
            value: "central",
            display: "Central",
            icon: React.createElement("ct-icon", {
                style: this.ctIcon
            },
            ToolbarIcons.shapeCentralAlign)
        }];
    }
    render() {
        return React.createElement(Sr, {
            text: "Align",
            items: this.items,
            onItemSelect: this.props.onShapeAlignmentSelect
        });
    }
}
class xr extends React.Component {
    constructor() {
        super(...arguments);
        this.ctIcon = {
            verticalAlign: "-6px",
            lineHeight: "8px",
            marginRight: "10px",
            marginBottom: -2
        };
        this.items = [{
            value: "distribute-horizontally",
            display: "Horizontally",
            icon: React.createElement("ct-icon", {
                style: this.ctIcon
            },
            ToolbarIcons.shapeDistributionHorizontally)
        },
        {
            value: "distribute-vertically",
            display: "Vertically",
            icon: React.createElement("ct-icon", {
                style: _.assignIn({},
                this.ctIcon, {
                    transform: "rotate(-90deg) translate(2px,0)"
                })
            },
            ToolbarIcons.shapeDistributionHorizontally)
        }];
        this.handleShapeAlignment = (e) => {
            this.props.onShapeDistributionSelect(e);
        };
    }
    render() {
        return React.createElement(Sr, {
            text: "Distribute",
            items: this.items,
            onItemSelect: this.handleShapeAlignment
        });
    }
}
class Ir extends React.Component {
    constructor(e) {
        super(e);
        this.clipboard = null;
        this.componentUnmounted = false;
        this.exportLatex = () => {
            TimerHelper.next(() => {
                this.props.onClose();
            });
            this.props.requestExportLatex();
        };
        this.importLatex = () => {
            TimerHelper.next(() => {
                this.props.onClose();
            });
            this.props.requestImportLatex();
        };
        this.onBlur = () => {
            console.log((new Date).getMilliseconds());
            this.focus = false;
            console.log("on blur-------------------context");
            TimerHelper.waitALitteWhile(() => {
                if (! (this.componentUnmounted || this.focus)) {
                    console.log("close context-menu");
                    this.props.onClose();
                }
            });
        };
        this.onFocus = () => {
            setTimeout(() => {
                console.log((new Date).getMilliseconds());
                console.log("on focus-------------------context");
                this.focus = true;
            },
            50);
        };
        this.handleInsertRowBelow = () => {
            this.findTabularReactInstance().insertRowBelow();
        };
        this.handleInsertRowAbove = () => {
            this.findTabularReactInstance().insertRowAbove();
        };
        this.handleInsertNewColumnOnLeft = () => {
            this.findTabularReactInstance().insertColumnOnLeft();
        };
        this.handleInsertNewColumnOnRight = () => {
            this.findTabularReactInstance().insertColumnOnRight();
        };
        this.handleRemoveCurrentColumn = () => {
            var e = this.props.containerModel;
            var t = null;
            if ((t = e.isTabularCellsSelected() ? this.findTabularReactInstance().removeCurrentColumn(e.getTabularCellKeysSelected()) : this.findTabularReactInstance().removeCurrentColumn()) && t.removeSelf) {
                this.props.requestRemoveTabular();
            }
        };
        this.handleRemoveTable = () => {
            this.props.requestRemoveTabular();
        };
        this.handleRemoveCurrentRow = () => {
            var e = this.props.containerModel;
            var t = null;
            if ((t = e.isTabularCellsSelected() ? this.findTabularReactInstance().removeCurrentRow(e.getTabularCellKeysSelected()) : this.findTabularReactInstance().removeCurrentRow()) && t.removeSelf) {
                this.props.requestRemoveTabular();
            }
        };
        this.handleMergeCells = () => {
            this.props.requestMergeCells();
        };
        this.handleUnmergeCells = () => {
            this.props.requestUnmergeCells();
        };
        this.handleDiagramGroup = () => {
            jQuery(".btn-diagram-group").trigger("click");
        };
        this.handleDiagramUngroup = () => {
            jQuery(".btn-diagram-ungroup").trigger("click");
        };
        this.handleIgnoreWord = (e) => {
            this.props.ignoreWord(e);
            TimerHelper.next(() => {
                return this.props.onClose();
            });
        };
        this.handleShapeAlignment = (e) => {
            var t = jQuery(".role-diagram-selected").get(0);
            if (t) {
                t.reactInstance.alignShapes(e);
            }
            TimerHelper.next(() => {
                return this.props.onClose();
            });
        };
        this.clipboard = null;
        this.componentUnmounted = false;
    }
    registerClipboard() {
        if (!this.clipboard) {
            if (false !== this.props.info.touchRelease) {
                this.clipboard = new ClipboardJS("context-menu-container ct-item.clipboard", {
                    text: (e) => {
                        return TimerHelper.waitABit(() => {
                            this.props.onClose();
                        }),
                        jQuery(e).hasClass("copy") ? (console.log("----------copy----------", e), this.props.requestCopy() || void 0) : jQuery(e).hasClass("copy-text-only") && !jQuery(e).hasClass("disabled") ? (console.log("----------copy-text-only----------", e), this.props.requestCopyTextOnly() || void 0) : jQuery(e).hasClass("cut") ? (console.log("----------cut----------", e), this.props.requestCut() || void 0) : void 0;
                    }
                });
            }
        }
    }
    componentDidMount() {
        this.registerClipboard();
        if (false !== this.props.info.touchRelease) {
            TimerHelper.waitALitteWhile(() => {
                if (!this.componentUnmounted) {
                    ReactDOM.findDOMNode(this).focus();
                }
            });
        }
    }
    componentDidUpdate() {
        this.registerClipboard();
        if (true === this.props.info.touchRelease) {
            TimerHelper.waitALitteWhile(() => {
                if (!this.componentUnmounted) {
                    ReactDOM.findDOMNode(this).focus();
                }
            });
        }
    }
    componentWillUnmount() {
        this.componentUnmounted = true;
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
    findTabularReactInstance() {
        return DOMHelper.findTabularReactInstance(this.props.containerModel.cursorPos);
    }
    nop() {
        console.log("call nop");
    }
    wrapMouseDown(e) {
        return false === this.props.info.touchRelease ? this.nop : e;
    }
    createBuilder() {
        return new Er({
            "insert-row-above": this.wrapMouseDown(this.handleInsertRowAbove),
            "insert-row-below": this.wrapMouseDown(this.handleInsertRowBelow),
            "insert-column-left": this.wrapMouseDown(this.handleInsertNewColumnOnLeft),
            "insert-column-right": this.wrapMouseDown(this.handleInsertNewColumnOnRight),
            "delete-row": this.wrapMouseDown(this.handleRemoveCurrentRow),
            "delete-column": this.wrapMouseDown(this.handleRemoveCurrentColumn),
            "remove-table": this.wrapMouseDown(this.handleRemoveTable),
            "unmerge-cells": this.wrapMouseDown(this.handleUnmergeCells),
            "merge-cells": this.wrapMouseDown(this.handleMergeCells),
            group: this.wrapMouseDown(this.handleDiagramGroup),
            ungroup: this.wrapMouseDown(this.handleDiagramUngroup),
            "to-latex": this.wrapMouseDown(this.exportLatex),
            "from-latex": this.wrapMouseDown(this.importLatex),
            seperator: null,
            paste: null,
            none: null
        });
    }
    calculateLeftTop(e) {
        var t = this.props.info;
        var n = t.left;
        var r = t.top;
        return n = Math.min(n, window.innerWidth - 200),
        n = Math.max(0, n),
        r = Math.min(window.innerHeight - 28 * e - 10 - 10, r),
        console.log("top:", r),
        console.log("left:", n),
        console.log("window.innerHeight:", window.innerHeight),
        {
            left: n,
            top: r
        };
    }
    renderSpellCheckItem() {
        var e = this.props.containerModel;
        if (!e.isInSelection() && !e.isCursorControlled) {
            return React.createElement(vr, {
                replaceWordWith: this.props.replaceWordWith,
                ignoreWord: this.handleIgnoreWord,
                requestSpellCheckSuggestions: this.props.requestSpellCheckSuggestions
            });
        }
    }
    renderShapeAlignItem() {
        var e = this.props.containerModel;
        if (e.isDiagramSelected && EntityHelper.isMultipleEntitiesSelected(e.leafCursorSelected)) {
            return React.createElement(Cr, {
                onShapeAlignmentSelect: this.handleShapeAlignment
            });
        }
    }
    renderShapeDistribution() {
        var e = this.props.containerModel;
        if (e.isDiagramSelected && EntityHelper.isAtleast3EntitiesSelected(e.leafCursorSelected)) {
            return React.createElement(xr, {
                onShapeDistributionSelect: this.handleShapeAlignment
            });
        }
    }
    render() {
        var e = this.props.containerModel;
        var t = [];
        var n = this.createBuilder();
        if (e.findBinomSelected()) {
            t = [];
        } else {
            if (e.isPlotCasesSelected()) {
                t = n.get(["seperator", "insert-row-above", "insert-row-below", "delete-row"]);
            } else {
                if (e.isTabularCellsSelected()) {
                    t = n.get(["seperator", "delete-row", "delete-column", "remove-table", e.isCellsMergable() ? "seperator" : "none", e.isCellsMergable() ? "merge-cells" : "none"]);
                } else {
                    if (e.isAtTabularCell() && !e.isCursorControlled) {
                        t = n.get(["seperator", "insert-row-above", "insert-row-below", "insert-column-left", "insert-column-right", "seperator", "delete-row", "delete-column", "remove-table", e.isMergedCell() ? "seperator" : "none", e.isMergedCell() ? "unmerge-cells" : "none"]);
                    } else {
                        if (e.isDiagramSelected) {
                            if (EntityHelper.isMultipleEntitiesSelected(e.leafCursorSelected)) {
                                t = n.get(["seperator", "group"]);
                            } else {
                                if (EntityHelper.isGroupEntitySelected(e.leafCursorSelected, e.selectedBlockModel)) {
                                    t = n.get(["seperator", "ungroup"]);
                                }
                            }
                        } else {
                            t = n.get(["seperator", "to-latex", "from-latex"]);
                        }
                    }
                }
            }
        }
        var r = _.assignIn({},
        this.calculateLeftTop(t.length + 5));
        return React.createElement("context-menu-container", {
            onPaste: () => {
                return console.log("paste");
            },
            style: r,
            tabIndex: -1,
            onBlur: this.onBlur,
            onFocus: this.onFocus
        },
        React.createElement("ct-menus", null, React.createElement("ct-item", {
            class: "clipboard copy",
            onMouseDown: this.wrapMouseDown(() => {
                return TimerHelper.waitABit(() => {
                    return this.focus = true;
                });
            }),
            tabIndex: -1
        },
        React.createElement("ct-icon", null, React.createElement("i", {
            className: "fa fa-clone",
            "aria-hidden": "true"
        })), React.createElement("ct-name", null, "Copy ", React.createElement("span", {
            style: {
                fontSize: 11,
                color: "lightgray"
            }
        },
        "(", TooltipData.getToolTipByKey("copy").value, ")"))), React.createElement("ct-item", {
            onMouseDown: this.wrapMouseDown(() => {
                return TimerHelper.waitABit(() => {
                    return this.focus = true;
                });
            }),
            class: classNames("clipboard copy-text-only", {
                disabled: this.props.selected && this.props.selected.controlled
            }),
            tabIndex: -1
        },
        React.createElement("ct-icon", null, React.createElement("i", {
            className: "fa fa-clone",
            "aria-hidden": "true"
        })), React.createElement("ct-name", null, "Copy Plain Text")), React.createElement("ct-item", {
            class: classNames("clipboard cut", {
                disabled: this.props.readOnly
            }),
            onMouseDown: this.wrapMouseDown(() => {
                return TimerHelper.waitABit(() => {
                    return this.focus = true;
                });
            })
        },
        React.createElement("ct-icon", null, React.createElement("i", {
            className: "fa fa-scissors",
            "aria-hidden": "true"
        })), React.createElement("ct-name", null, "Cut ", React.createElement("span", {
            style: {
                fontSize: 11,
                color: "lightgray"
            }
        },
        "(", TooltipData.getToolTipByKey("cut").value, ")"))), React.createElement("ct-item", {
            class: classNames({
                disabled: this.props.readOnly
            }),
            onMouseDown: this.wrapMouseDown(() => {
                return this.props.requestDelete();
            })
        },
        React.createElement("ct-icon", null, React.createElement("i", {
            className: "fa fa-trash",
            "aria-hidden": "true"
        })), React.createElement("ct-name", null, "Delete")), this.renderSpellCheckItem(), t, this.renderShapeAlignItem(), this.renderShapeDistribution()));
    }
}
class ContextMenuHandler {
    constructor(e, t, n) {
        this.target = e;
        this.copyPasteHandler = t;
        this.latexIoHandler = n;
        this.onMathTypeContextMenu = (e) => {
            if (Global.isMobileOrTablet()) {
                e.preventDefault();
            } else {
                if (this.target.isArrowKeyPressOrHold()) {
                    e.preventDefault();
                } else {
                    if (!e.nativeEvent.handledContextMenu) {
                        this.showContextMenu({
                            left: e.clientX,
                            top: e.clientY
                        },
                        e.target);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        };
        this.handleRequestSpellCheckSuggestions = () => {
            return this.target.handleRequestSpellCheckSuggestions();
        };
        this.handleReplaceWordWith = (e) => {
            console.log("new word:", e);
            var t = this.target.getController();
            var n = this.target.getContainerModel();
            var r = {
                cursorSelected: e.selected,
                extendedCursorSelected: e.extendedSelected,
                model: n.model,
                isInSelection: () => {
                    return true;
                }
            };
            var a = [{
                id: DiagramIdHelper.nextId(),
                blocks: [{
                    id: DiagramIdHelper.nextId(),
                    text: e.newWord
                }]
            }];
            var i = t.replaceLines(r, true, a);
            this.target.handleResult(i);
        };
        this.handleIgnoreWord = (e) => {
            this.target.addIgnoreWord(e);
        };
    }
    showContextMenu(e, t, n) {
        if (this.target.props.enableContextMenu || !this.target.isReadOnly() && !this.target.isRestrictedView()) {
            var r = t.tagName;
            if ("SELECTION-MARK" != r && "INPUT" != r && "TEXTAREA" != r) {
                var a = e.left;
                var i = e.top;
                if (Global.shouldUseSmallLayout()) {
                    a = jQuery(window).width() / 2 - 90;
                    i = 140;
                }
                this.target.setState({
                    contextMenuShowInfo: _.assign({},
                    {
                        left: a,
                        top: i
                    },
                    n || {})
                });
            }
        }
    }
    renderContextMenu() {
        if (!this.target.state.contextMenuShowInfo || this.target.isReadOnly()) {
            return null;
        }
        var e = this.target.getContainerModel();
        return React.createElement(Ir, {
            containerModel: e,
            ignoreWord: this.handleIgnoreWord,
            replaceWordWith: this.handleReplaceWordWith,
            requestSpellCheckSuggestions: this.handleRequestSpellCheckSuggestions,
            readOnly: this.target.isSelectOnly(),
            selected: this.target.getSafeSelected(),
            requestMergeCells: () => {
                return this.requestMergeCells();
            },
            requestUnmergeCells: () => {
                return this.requestUnmergeCells();
            },
            requestRemoveTabular: () => {
                return this.requestRemoveTabular();
            },
            requestExportLatex: () => {
                return this.latexIoHandler.requestExportSelection();
            },
            requestImportLatex: () => {
                this.latexIoHandler.showImportFromLatex();
            },
            requestDelete: () => {
                this.target.requestDeleteHandle();
            },
            onPaste: this.copyPasteHandler.onPaste,
            requestCopy: () => {
                var e = this.copyPasteHandler.executeCopy();
                return Global.isMobileOrTablet() && (this.target.getInternalClipboard().copyText = e),
                e;
            },
            requestCopyTextOnly: () => {
                var e = this.executeCopyTextOnly();
                return Global.isMobileOrTablet() && (this.target.getInternalClipboard().copyText = e),
                this.executeCopyTextOnly();
            },
            requestCut: () => {
                var e = this.copyPasteHandler.executeCut();
                return Global.isMobileOrTablet() && (this.target.getInternalClipboard().copyText = e),
                e;
            },
            info: this.target.state.contextMenuShowInfo,
            onClose: () => {
                return this.target.setState({
                    contextMenuShowInfo: false
                });
            }
        });
    }
    requestRemoveTabular() {
        var e = this.target.getController().removeMostNestedTabular(this.target.getContainerModel());
        this.target.handleResult(e);
    }
    requestMergeCells() {
        var e = this.target.getController().mergeTableCells(this.target.getContainerModel());
        this.target.handleResult(e);
    }
    requestUnmergeCells() {
        var e = this.target.getContainerModel();
        var t = jQuery(e.cursorPos.editor).closest("table");
        var n = this.target.getController().unmergeTableCells(e, t.width());
        this.target.handleResult(n);
    }
    executeCopyTextOnly() {
        return console.log("------------------oncopy-text-only------------------"),
        this.latexIoHandler.getSelectedLatex("text");
    }
}
/*n.d(t, "a", function () {
    return ContextMenuHandler;
})*/

export default ContextMenuHandler