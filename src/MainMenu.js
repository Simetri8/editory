import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1589) /*MainMenu*/

/// var k = n(0)/*React*/;  // 21 times
/// var B = n.n(k);
/// var Ut = n(2)/*lodash*/;  // 1 times
/// var Wt = n.n(Ut);
/// var Ue = n(14)/*classnames*/;  // 4 times
/// var We = n.n(Ue);
/// var Th = n(19)/*TimerHelper*/;  // 1 times
class MenuItem extends React.Component {
    renderItem(e) {
        return e.hasOwnProperty("value") ? e.value : e;
    }
    render() {
        var e = this.props.data;
        var t = classNames("inside-box", {
            selected: this.props.isSelected,
            disabled: e.disabled
        });
        return React.createElement("div", null, React.createElement("div", {
            className: "item",
            onClick: () => {
                this.props.onSelected(e);
            },
            onMouseOver: () => {
                this.props.onSelectedItemChange(e);
            }
        },
        React.createElement("div", {
            "data-name": e.key,
            className: t
        },
        e.icon ? React.createElement("i", {
            className: "fa fa-".concat(e.icon)
        }) : React.createElement("i", null), this.renderItem(e), e.shortcut ? React.createElement("short-cut", {
            style: {
                float: "right",
                marginRight: 10
            }
        },
        e.shortcut) : React.createElement("short-cut", null))));
    }
}
class MenuBar extends React.Component {
    constructor(e) {
        super(e);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectedItemChange = this.onSelectedItemChange.bind(this);
        var t = this.props.data;
        this.state = {
            selectedItem: t.length > 1 ? t[0] : null
        };
    }
    goDown() {
        var e = this.props.data.indexOf(this.state.selectedItem);
        e++;
        this.onSelectedIndexChange(e, this.props.data);
    }
    goUp() {
        var e = this.props.data.indexOf(this.state.selectedItem);
        e--;
        this.onSelectedIndexChange(e, this.props.data);
    }
    onSelectedIndexChange(e, t) {
        if (! (e < 0 || e >= t.length)) {
            this.setState({
                selectedItem: t[e]
            });
        }
    }
    onSelectedItemChange(e) {
        var t = this.props.data.indexOf(e);
        this.onSelectedIndexChange(t, this.props.data);
    }
    componentWillReceiveProps(e) {
        if (e.data != this.props.data) {
            this.onSelectedIndexChange(0, e.data);
        }
    }
    onSelect(e) {
        if (!e.disabled) {
            this.props.onSelect(e);
        }
    }
    selectItem() {
        this.onSelect(this.state.selectedItem);
    }
    renderItem(e) {
        return e.key ? React.createElement(MenuItem, {
            isSelected: this.state.selectedItem === e,
            onSelected: this.onSelect,
            onSelectedItemChange: this.onSelectedItemChange,
            data: e
        }) : React.createElement("separator-bar", {
            style: {
                height: 1,
                borderTop: "1px solid lightgray",
                display: "block"
            }
        });
    }
    renderItems(e) {
        var t = false;
        return _.map(e.filter((e) => {
            return !e.hide;
        }), (e, n) => {
            var r = !e.key;
            return t && r ? React.createElement("div", {
                key: n
            }) : (t = r, React.createElement("div", {
                key: n
            },
            this.renderItem(e)));
        });
    }
    render() {
        var e = this.props.data;
        return React.createElement("div", null, this.renderItems(e));
    }
}
class MainMenu extends React.Component {
    constructor(e) {
        super(e);
        this.width = 200;
        this.onKeyDown = (e) => {
            if (e.stopPropagation(), 13 === e.keyCode) {
                return e.preventDefault(),
                void this.items.selectItem();
            }
            if (38 === e.keyCode) {
                this.items.goUp();
                e.preventDefault();
            }
            if (40 === e.keyCode) {
                this.items.goDown();
                e.preventDefault();
            }
            this.props.onKeyDown(e);
        };
        this.onSelect = (e) => {
            this.setState({
                selectedData: e
            });
            this.props.onSelect(e);
            this.onClick();
        };
        this.onClick = () => {
            if (!this.props.disabled) {
                this.onOffClick(!this.state.isExpanded);
            }
        };
        this.onMouseOver = () => {
            if (this.props.isOpenOnMouseOver) {
                this.onOffClick(true);
            }
            this.props.onMouseOver(this.props.name);
        };
        this.onBlur = () => {
            this.props.onBlur(this.props.name);
        };
        this.onFocus = () => {
            this.props.onFocus(this.props.name);
        };
        this.state = {
            isExpanded: false,
            selectedData: this.props.data.length > 0 ? this.props.data[0] : null
        };
    }
    componentWillReceiveProps(e) {
        this.setState({
            isExpanded: e.visibility
        });
        if (e.visibility) {
            TimerHelper.next(() => {
                this.container.focus();
            });
        }
    }
    renderItems() {
        var e = this.width;
        return React.createElement(MenuBar, {
            ref: (e) => {
                return this.items = e;
            },
            data: this.props.data,
            onSelect: this.onSelect,
            height: 200,
            width: e
        });
    }
    onOffClick(e) {
        if (e) {
            this.container.focus();
        }
        this.setState({
            isExpanded: e
        });
        this.props.onChange(this.props.name, e);
    }
    render() {
        var e = this.props.name;
        if (this.props.icon) {
            e = React.createElement("i", {
                className: "fa fa-" + this.props.icon,
                "aria-hidden": "true"
            });
        }
        return React.createElement("div", {
            style: {
                WebkitAppRegion: "no-drag"
            },
            ref: (e) => {
                return this.container = e;
            },
            className: classNames("menu-bar-container", {
                disabled: this.props.disabled
            }),
            tabIndex: 9998,
            onKeyDown: this.onKeyDown,
            onBlur: this.onBlur,
            onFocus: this.onFocus
        },
        React.createElement("div", {
            className: "hide-button"
        }), React.createElement("div", {
            className: classNames("button", {
                selected: this.state.isExpanded
            }),
            onClick: this.onClick,
            onMouseOver: this.onMouseOver
        },
        e), React.createElement("div", {
            className: classNames("items", this.state.isExpanded ? "show" : "hide")
        },
        this.renderItems()));
    }
}
/*n.d(t, "a", function () {
    return MainMenu;
});*/

export default MainMenu