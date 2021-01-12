import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import DOMHelper from '../Elements/DOMHelper';
import Global from '../Global';
import InitHelper from '../InitHelper';
import TimerHelper from '../Mathcha/TimerHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(1599) /*ItemsBarHandler*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 28 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 4 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 2 times
/// var d = n.n(c);
/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var C = n(2)/*lodash*/;  // 5 times
/// var x = n.n(C);
/// var Y = n(32)/*InitHelper*/;  // 3 times
/// var ee = n(11)/*Global*/;  // 5 times
/// var Lt = n(19)/*TimerHelper*/;  // 3 times
/// var vn = n(37)/*ToolbarIcons*/;  // 4 times
class TableCreator extends React.Component {
    constructor(e) {
        super(e);
        this.fixedRow = 6;
        this.fixedColumn = 6;
        this.handleMouseMove = (e) => {
            var t = this.calculateRowColumn(e.clientX, e.clientY);
            var n = t.row;
            var r = t.column;
            this.setState({
                row: n,
                column: r,
                regionWidth: 15 * Math.max(r, 6) + 2,
                regionHeight: 15 * Math.max(n, 6) + 2
            });
        };
        this.state = {
            row: 3,
            column: 3,
            regionWidth: 92,
            regionHeight: 92
        };
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            ReactDOM.findDOMNode(this).focus();
        });
    }
    calculateRowColumn(e, t) {
        var n = ReactDOM.findDOMNode(this);
        var r = DOMHelper.getElementRect(n);
        var a = Math.max(0, e - r.left);
        var i = Math.max(0, t - r.top);
        return {
            row: Math.min(Math.ceil(i / 15), 12),
            column: Math.min(Math.ceil(a / 15), 12)
        };
    }
    renderCells() {
        var e = {
            border: "1px solid lightgray",
            background: "lightgreen",
            display: "inline-block",
            width: 9,
            height: 9,
            margin: 2
        };
        var t = {
            display: "block",
            height: 15
        };
        return React.createElement("tc-cells", {
            style: {
                position: "absolute",
                left: 2,
                top: 2
            }
        },
            _.range(0, this.state.row).map((n) => {
                return React.createElement("tc-row", {
                    style: t,
                    key: n
                },
                    _.range(0, this.state.column).map((t) => {
                        return React.createElement("tc-box", {
                            style: e,
                            key: n + "_" + t
                        });
                    }));
            }));
    }
    renderFixedCells() {
        var e = {
            border: "1px solid lightgray",
            background: "white",
            display: "inline-block",
            width: 9,
            height: 9,
            margin: 2
        };
        var t = {
            display: "block",
            height: 15
        };
        return React.createElement("tc-cells", {
            style: {
                position: "absolute",
                left: 2,
                top: 2
            }
        },
            _.range(0, this.fixedRow).map((n) => {
                return React.createElement("tc-row", {
                    style: t,
                    key: n
                },
                    _.range(0, this.fixedColumn).map((t) => {
                        return React.createElement("tc-box", {
                            style: e,
                            key: n + "_" + t
                        });
                    }));
            }));
    }
    render() {
        var e = {
            position: "fixed",
            top: this.props.top || 300,
            left: this.props.left || 300,
            width: 200,
            height: 200,
            outline: "none",
            overflow: "hidden"
        };
        var t = {
            display: "block",
            padding: 0,
            margin: 0,
            border: "1px solid lightgray",
            background: "#f7f7f7",
            width: this.state.regionWidth,
            height: this.state.regionHeight
        };
        return React.createElement("table-creator", {
            tabIndex: -1,
            onMouseDown: (e) => {
                var t = this.calculateRowColumn(e.clientX, e.clientY);
                var n = t.row;
                var r = t.column;
                this.props.onSelect(n, r);
            },
            onBlur: () => {
                return this.props.onClose();
            },
            style: e,
            onMouseMove: this.handleMouseMove
        },
            React.createElement("tc-wrapper", {
                style: t
            },
                this.renderFixedCells(), this.renderCells()));
    }
}
class ra extends React.Component {
    constructor() {
        super(...arguments);
        this.autoCompleteEnabled = true;
        this.enableTheRest = true;
        this.component = null;
        this.renderDelayRunObj = TimerHelper.createLaterRunObject("first-request", "a-little-while");
        this.state = {
            showTableCreator: false
        };
        this.handleForceRefreshDelayFunc = () => {
            this.forceUpdate();
        };
    }
    shouldComponentUpdate(e, t) {
        return t != this.state || e.isSidebarShown != this.props.isSidebarShown || e.sideBarWidth != this.props.sideBarWidth || e.hide != this.props.hide;
    }
    raiseRequestItem(e, t) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onRequestItem(t);
    }
    setItemsEnable(e, t) {
        if (!(this.autoCompleteEnabled === e && this.enableTheRest === t && null == this.component)) {
            this.autoCompleteEnabled = e;
            this.enableTheRest = t;
            this.component = null;
            this.forceRefresh();
        }
    }
    requestRender(e) {
        if (this.component != e) {
            this.component = e;
            this.forceRefresh();
        }
    }
    forceRefresh() {
        this.renderDelayRunObj.later(this.handleForceRefreshDelayFunc);
    }
    renderNormalItems() {
        var e = this.autoCompleteEnabled ? "" : " disabled";
        var t = this.enableTheRest ? "" : " disabled";
        return React.createElement("item-container", null, React.createElement("x-item", {
            title: "Show Suggestion Box",
            class: "trigger-item" + e,
            onMouseDown: (e) => {
                return this.raiseRequestItem(e, "autocomplete");
            }
        },
            React.createElement("svg", null, React.createElement("path", {
                d: "M0 4v11h16v-14h-16v3zM14 2h1v1h-1v-1zM1 4h14v10h-14v-10z",
                stroke: "none"
            })), React.createElement("i", {
                className: "fa fa-bars",
                "aria-hidden": "true"
            })), React.createElement("x-item", {
                title: "Insert Diagram",
                "data-amt": "insert-diagram",
                class: "diagram-item" + t,
                onMouseDown: (e) => {
                    if (this.enableTheRest) {
                        this.raiseRequestItem(e, "diagram");
                    }
                }
            },
                ToolbarIcons.diagram), React.createElement("x-item", {
                    title: "Insert Table",
                    class: "table-item" + t,
                    onMouseDown: () => {
                        if (this.enableTheRest) {
                            this.setState({
                                showTableCreator: true
                            });
                        }
                    }
                },
                    ToolbarIcons.table), React.createElement("x-item", {
                        title: "Insert Image",
                        class: "table-item" + t,
                        onMouseDown: (e) => {
                            if (this.enableTheRest) {
                                this.raiseRequestItem(e, "image");
                            }
                        }
                    },
                        ToolbarIcons.imageIcon), React.createElement("x-item", {
                            title: "Insert Checkbox",
                            style: {
                                paddingBottom: 1
                            },
                            class: "table-item" + t,
                            onMouseDown: (e) => {
                                if (this.enableTheRest) {
                                    this.raiseRequestItem(e, "checkbox");
                                }
                            }
                        },
                            ToolbarIcons.checkboxIcon));
    }
    renderTableCreator() {
        if (this.state.showTableCreator) {
            /*var e=ReactDOM.findDOMNode(this);if(e){var t=DOMHelper.getElementRect(e);var n=t.left+40;var r=t.top+60;}*/
            var n = 40;
            var r = 160;
            return React.createElement(TableCreator, {
                left: n,
                top: r,
                onSelect: (e, t) => {
                    this.setState({
                        showTableCreator: false
                    });
                    this.props.onRequestItem("table", {
                        row: e,
                        column: t
                    });
                },
                onClose: () => {
                    return this.setState({
                        showTableCreator: false
                    });
                }
            });
        }
    }
    render() {
        var e = this.props.itemsBarContainerStyle ? _.clone(this.props.itemsBarContainerStyle) : {};
        if (this.props.isSidebarShown && !Global.isMobileOrTablet()) {
            e.left = this.props.sideBarWidth + 10;
        }
        var t = classNames({
            "mobile-tablet": Global.isMobileOrTablet(),
            "is-android": Global.isAndroid()
        });
        return this.component ? (e.padding = 3, "nothing" == this.component.key && (e.display = "none"),
            React.createElement("items-bar", {
                class: classNames(t, "diagram"),
                style: e
            },
                this.component)) : this.props.hide || "component-specific" == this.props.itemsBarEnabled
                ? React.createElement("x-nothing", null) :
                React.createElement("items-bar", {
                    class: t,
                    style: e
                },
                    this.renderNormalItems(),
                    this.renderTableCreator()
                    //, React.createElement("round-close-icon", {
                    //     onClick: this.props.onHide
                    // },
                    // React.createElement("div", {
                    //     style: {
                    //         position: "absolute",
                    //         width: 24,
                    //         height: 15,
                    //         top: -6,
                    //         left: -2,
                    //         background: "transparent"
                    //     }
                    // }), React.createElement("i", {
                    //     className: "fa fa-times",
                    //     "aria-hidden": "true"
                    // }))
                );
    }
}
class ItemsBarHandler {
    constructor(e) {
        this.target = e;
        this.getItemsBarRef = (e) => {
            this.itemsBar = e;
        };
        this.requestRenderItemsBarComponent = (e) => {
            if (this.itemsBar) {
                this.itemsBar.requestRender(e);
            }
        };
        this.handleRequestItem = (e, t) => {
            if ("autocomplete" == e && this.target.requestAutoComplete(), "diagram" == e) {
                var n = InitHelper.getByName("\\diagram");
                var r = this.target.getController().handleBySymbolInfo(n, this.target.getContainerModel());
                this.target.handleResult(r);
            }
            if ("table" == e) {
                var i = _.assignIn({},
                    InitHelper.getByName("\\table"), {
                    row: t.row,
                    column: t.column
                });
                var o = this.target.getController().handleBySymbolInfo(i, this.target.getContainerModel());
                this.target.handleResult(o);
            }
            if ("image" == e) {
                var s = this.target.getController().insertImageContainer(this.target.getContainerModel());
                this.target.handleResult(s);
            }
            if ("checkbox" == e) {
                var l = this.target.getController().handleBySymbolInfo(InitHelper.getCheckbox(), this.target.getContainerModel());
                this.target.handleResult(l);
            }
        };
    }
    updateItemsBar() {
        if (this.itemsBar) {
            TimerHelper.next(() => {
                ReactDOM.unstable_batchedUpdates(() => {
                    var e = this.target.getContainerModel();
                    if (!e.isDiagramSelected) {
                        if (Global.isMobileOrTablet() && (e.isImageContainerSelected || e.isInlineImageSelected)) {
                            this.itemsBar.requestRender(React.createElement("x-nothing", {
                                key: "nothing"
                            }));
                        } else {
                            if (e.isSelected()) {
                                if (e.isInsideDiagram() || e.isInsideLatexTable() || e.isInsideRawLatex() || e.isAtImageCaption() || e.isAtTableCaption() || e.isAtTextModeGroupInline()) {
                                    this.itemsBar.setItemsEnable(true, false);
                                } else {
                                    if (e.isImageContainerSelected || e.isInlineImageSelected) {
                                        this.itemsBar.setItemsEnable(false, false);
                                    } else {
                                        var t = !e.isInsideTextSymbol() && !this.target.isSelectOnly();
                                        this.itemsBar.setItemsEnable(t, e.isTextModeSelected() && t);
                                    }
                                }
                            } else {
                                this.itemsBar.setItemsEnable(false, false);
                            }
                        }
                    }
                });
            });
        }
    }
    renderItemsBar() {
        var e = this.target.props;
        if (e.itemsBarEnabled || !this.target.isRestrictedView() && !this.target.isReadOnly()) {
            return React.createElement(ra, {
                itemsBarContainerStyle: e.itemsBarContainerStyle,
                itemsBarEnabled: e.itemsBarEnabled,
                hide: Global.isMobileOrTablet() && this.target.isSelectOnly() || e.itemsBarHide,
                isSidebarShown: e.isSidebarShown,
                sideBarWidth: e.sideBarWidth,
                onHide: e.onItemsBarHide,
                onRequestItem: this.handleRequestItem,
                ref: this.getItemsBarRef
            });
        }
    }
}
/*n.d(t, "a", function () {
    return ItemsBarHandler;
})*/

export default ItemsBarHandler