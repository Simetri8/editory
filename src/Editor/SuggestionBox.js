import { List } from 'react-virtualized';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import DescriptionContainer from '../Elements/DescriptionContainer';
import FontList from '../Font/FontList';
import Global from '../Global';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import ScrollTo from '../Mathcha/ScrollTo';
import StyleHelper from '../Mathcha/StyleHelper';
import SuggestionBoxTab from './SuggestionBoxTab';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(250) /*SuggestionBox*/

/// var r = n(11)/*Global*/;  // 1 times
/// var a = n(0)/*React*/;  // 33 times
/// var i = n.n(a);
/// var o = n(713)/*virtualized-List*/;  // 1 times
class s extends React.Component {
    render() {
        var e = "( ";
        var t = this.props.shortcut;
        var n;
        for (n in t) {
            if (t.hasOwnProperty(n)) {
                if ("char" == n) {
                    e = e.concat(t[n], " )");
                    break;
                }
                e = e.concat(n, " +");
            }
        }
        return React.createElement("div", {
            style: {
                marginRight: 10
            }
        },
        React.createElement("span", null, e, " "));
    }
}
/// var l = n(18)/*StyleHelper*/;  // 1 times
class c extends React.Component {
    constructor() {
        super(...arguments);
        this.handleMouseMove = () => {
            if (!this.props.isSelected) {
                this.props.onSelectedItemChange(this.props.data);
            }
        };
    }
    renderShortCutOrShiftIcon(e) {
        return e.hasExpanded && e.shortcut ? [React.createElement("b", {
            key: "1",
            style: d
        },
        "\u21e7"), React.createElement(s, {
            key: "2",
            shortcut: e.shortcut
        })] : e.hasExpanded ? React.createElement("b", {
            style: d
        },
        "\u21e7") : e.shortcut ? React.createElement(s, {
            shortcut: e.shortcut
        }) : void 0;
    }
    renderSymbol(e) {
        return "mathxx" == e.type ? React.createElement("mathxx", {
            style: {
                fontFamily: StyleHelper.mathTypeToFontFamily(e.mathxxType, this.props.baseMathModeFontFamily)
            }
        },
        e.symbol) : e.renderSymbol ? e.renderSymbol(this.props.isExpanded, this.props.baseMathModeFontFamily) : e.symbol;
    }
    renderSymbolType(e) {
        switch (e) {
        case "composite":
            return React.createElement("svg", {
                width: "9",
                height: "9"
            },
            React.createElement("circle", {
                cx: "5",
                cy: "5",
                r: "3",
                fill: "green"
            }));
        case "settings":
            return React.createElement("i", {
                className: "fa fa-cog",
                "aria-hidden": "true",
                style: {
                    color: "green"
                }
            });
        case "action":
            return React.createElement("svg", {
                width: "11",
                height: "12"
            },
            React.createElement("circle", {
                cx: "5",
                cy: "7",
                r: "4",
                fill: "none",
                stroke: "green"
            }), React.createElement("circle", {
                cx: "5",
                cy: "7",
                r: "2",
                fill: "green",
                stroke: "none"
            }));
        case "single":
            default:
            return null;
        }
    }
    render() {
        var e = "symbol-container ";
        e = e + (this.props.isSelected ? "selected" : "");
        var t = this.props.data;
        return React.createElement("div", {
            onMouseMove: this.handleMouseMove,
            style: this.props.style,
            className: e,
            key: t.symbol,
            onMouseDown: () => {
                this.props.onSelect(t);
            }
        },
        React.createElement("div", {
            style: {
                width: 9,
                paddingRight: 3
            }
        },
        this.renderSymbolType(t.type)), React.createElement("div", {
            className: "symbol-friendly-name"
        },
        t.names.join(",")), React.createElement("div", {
            className: "short-cut"
        },
        this.renderShortCutOrShiftIcon(t)), React.createElement("div", {
            className: "symbol-icon"
        },
        this.renderSymbol(t)));
    }
}
var d = {
    background: "white",
    fontWeight: "normal",
    display: "inline-block",
    color: "#b5b4b4",
    border: "1px solid lightgray",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
    fontSize: 10,
    marginRight: 10,
    fontFamily: "Arial,Times"
};
/// var h = n(19)/*TimerHelper*/;  // 2 times
/// var u = n(76)/*MobileTabletClasses*/;  // 1 times
class p extends React.Component {
    constructor(e) {
        super(e);
        this.supressMouseSelection = true;
        this.onExpandChanged = (e) => {
            this.setState({
                isExpanded: e
            });
        };
        this.onSelectedIndexChange = (e, t) => {
            if (e < 0 || e >= t.length) {
                this.props.onSelectedItemChange(null);
            } else {
                this.setState({
                    selectedItem: t[e]
                });
                if (null != this.lastSelectedIndex) {
                    this.virtualScroll.recomputeRowHeights(this.lastSelectedIndex);
                }
                this.lastSelectedIndex = e;
                this.virtualScroll.recomputeRowHeights(e);
                this.props.onSelectedItemChange(t[e]);
            }
        };
        this.onSelectedItemChange = (e) => {
            if (!this.supressMouseSelection) {
                var t = this.props.data.indexOf(e);
                this.onSelectedIndexChange(t, this.props.data);
            }
        };
        this.onSelect = (e) => {
            e.isExpanded = this.state.isExpanded;
            this.props.onSelect(e);
        };
        this.selectItem = () => {
            this.onSelect(this.state.selectedItem);
        };
        var t = this.props.data;
        this.state = {
            selectedItem: t.length > 0 ? t[0] : null,
            isExpanded: false
        };
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            this.supressMouseSelection = false;
        });
    }
    goDown() {
        var e = this.props.data.indexOf(this.state.selectedItem);
        if (! (++e >= this.props.data.length)) {
            this.onSelectedIndexChange(e, this.props.data);
            this.supressMouseSelection = true;
        }
    }
    goUp() {
        var e = this.props.data.indexOf(this.state.selectedItem);
        if (! (--e < 0)) {
            this.onSelectedIndexChange(e, this.props.data);
            this.supressMouseSelection = true;
        }
    }
    componentWillReceiveProps(e) {
        if (e.data != this.props.data) {
            this.onSelectedIndexChange(0, e.data);
        }
    }
    renderItem(e) {
        var t = e.index;
        var n = e.key;
        var r = e.style;
        var a = this.props.data[t];
        var o = this.state.selectedItem === a;
        return React.createElement(c, {
            key: n,
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            isExpanded: this.state.isExpanded && o,
            style: r,
            isSelected: o,
            onSelectedItemChange: this.onSelectedItemChange,
            onSelect: this.selectItem,
            data: a
        });
    }
    render() {
        var e = this.props.data;
        var t = MobileTabletClasses.autocompleteItemsScale();
        return React.createElement("div", {
            onMouseMove: () => {
                return this.supressMouseSelection = false;
            }
        },
        React.createElement(List, {
            style: {
                outline: "none"
            },
            ref: (e) => {
                this.virtualScroll = e;
            },
            width: this.props.width,
            height: this.props.height,
            rowCount: e.length,
            rowHeight: (n) => {
                var r = e[n.index];
                var a = 25 * t;
                return r.height && (a = r.height * t),
                a;
            },
            scrollToIndex: e.indexOf(this.state.selectedItem),
            rowRenderer: (e) => {
                return this.renderItem(e);
            }
        }));
    }
}
/// var m = n(451)/*DescriptionContainer*/;  // 1 times
/// var f = n(452)/*SuggestionBoxTab*/;  // 1 times
/// var g = n(16)/*ReactDOM*/;  // 3 times
/// var y = n.n(g);
/// var A = n(107)/*ScrollTo*/;  // 2 times
/// var E = n(5)/*sizzle*/;  // 2 times
/// var v = n.n(E);
/// var S = n(48)/*FontList*/;  // 1 times
/*n.d(t, "b", function () {
    return C;
});*/
/*n.d(t, "a", function () {
    return x;
});*/
class C extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedItem: this.props.data[0] || null
        };
        this.onSelect = (e) => {
            this.props.onItemCommit(e);
        };
        this.handleItemsRef = (e) => {
            this.itemsRef = e;
        };
        this.handleItemChange = (e) => {
            this.setState({
                selectedItem: e
            });
        };
        this.handleKeyDown = (e) => {
            if (this.props.onKeyDown) {
                var t = {
                    handled: false
                };
                if (this.props.onKeyDown(e, t), t.handled) {
                    return;
                }
            }
            return 16 === e.keyCode && (this.itemsRef.onExpandChanged(true), e.preventDefault(), e.stopPropagation()),
            13 === e.keyCode ? (this.itemsRef.selectItem(), e.preventDefault(), void e.stopPropagation()) : 38 === e.keyCode ? (this.itemsRef.goUp(), e.preventDefault(), void e.stopPropagation()) : 40 === e.keyCode ? (this.itemsRef.goDown(), e.preventDefault(), void e.stopPropagation()) : 9 === e.keyCode ? (e.shiftKey ? this.previousTabItem() : this.nextTabItem(), e.preventDefault(), void e.stopPropagation()) : void 0;
        };
        this.handleKeyUp = (e) => {
            if (this.props.onKeyUp) {
                var t = {
                    handled: false
                };
                if (this.props.onKeyUp(e, t), t.handled) {
                    return;
                }
            }
            if (16 === e.keyCode) {
                this.itemsRef.onExpandChanged(false);
                e.preventDefault();
            }
            e.stopPropagation();
        };
    }
    renderFilter() {
        return this.props.renderFilter();
    }
    renderContent() {
        var e = this.props.itemsHeight || 209;
        return React.createElement(p, {
            baseMathModeFontFamily: this.props.baseMathModeFontFamily,
            ref: this.handleItemsRef,
            data: this.props.data,
            onSelect: this.onSelect,
            height: e,
            width: 260,
            onSelectedItemChange: this.handleItemChange
        });
    }
    renderDescription(e) {
        if (!Global.isMobileOrTablet()) {
            return e && (e.description || e.hasExpanded || e.shortcut) ? React.createElement(DescriptionContainer, {
                item: e
            }) : null;
        }
    }
    renderTabItem() {
        if (this.hasTabItems()) {
            return React.createElement(SuggestionBoxTab, {
                items: this.props.tabItems,
                selectedKey: this.props.tabSelectedKey,
                onSelect: this.props.onTabSelect
            });
        }
    }
    hasTabItems() {
        return this.props.tabItems && this.props.tabItems.length > 0;
    }
    nextTabItem() {
        if (this.hasTabItems() && this.props.onTabSelect) {
            var e = (this.props.tabItems.findIndex((e) => {
                return e.key === this.props.tabSelectedKey;
            }) + 1) % this.props.tabItems.length;
            this.props.onTabSelect(this.props.tabItems[e].key);
        }
    }
    previousTabItem() {
        if (this.hasTabItems() && this.props.onTabSelect) {
            var e = this.props.tabItems.findIndex((e) => {
                return e.key === this.props.tabSelectedKey;
            });
            var t = e - 1 >= 0 ? e - 1 : this.props.tabItems.length - 1;
            this.props.onTabSelect(this.props.tabItems[t].key);
        }
    }
    focus() {
        ReactDOM.findDOMNode(this).focus();
    }
    componentDidMount() {
        if (this.props.mainContainerFocus) {
            TimerHelper.next(() => {
                this.focus();
            });
        }
        var e = ReactDOM.findDOMNode(this);
        ScrollTo.registerEventToFixScroll(jQuery(e).find(".ReactVirtualized__Grid.ReactVirtualized__List"));
    }
    componentWillUnmount() {
        var e = ReactDOM.findDOMNode(this);
        ScrollTo.unregisterEventToFixScroll(jQuery(e).find(".ReactVirtualized__Grid.ReactVirtualized__List"));
    }
    renderExtra() {
        if (this.props.renderExtra) {
            return this.props.renderExtra();
        }
    }
    render() {
        return React.createElement("div", {
            tabIndex: -1,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            style: {
                outline: "none"
            }
        },
        React.createElement("ac-main", {
            style: x
        },
        React.createElement("div", {
            className: "auto-complete-content"
        },
        this.renderFilter(), React.createElement("div", {
            style: {
                fontFamily: FontList.mathFontFamiltyFromKey("raw", this.props.baseMathModeFontFamily)
            },
            className: "math-symbol-container"
        },
        React.createElement("div", null, this.renderContent()))), this.renderTabItem()), this.renderDescription(this.state.selectedItem), this.renderExtra());
    }
}
var x = {
    display: "block",
    background: "#f7f7f7",
    padding: 3,
    boxShadow: "1px 1px 1px 0px #e0dddd",
    border: "1px lightgray solid"
};

export { C as SuggestionBoxB }

export default x