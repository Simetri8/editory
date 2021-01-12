import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CursorHandler from './CursorHandler';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(51) /*SelectBoxContainer*/

/// var r = n(3);  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 18 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 2 times
/// var l = n.n(s);
/// var c = n(85)/*CursorHandler*/;  // 1 times
/// var d = n(16)/*ReactDOM*/;  // 1 times
/// var h = n.n(d);
/// var u = n(5)/*sizzle*/;  // 2 times
/// var p = n.n(u);
/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var f = n(14)/*classnames*/;  // 1 times
/// var g = n.n(f);
class y extends React.Component {
    renderItem(e) {
        return null != this.props.onRenderItem ? this.props.onRenderItem(e) : e.hasOwnProperty("value") ? e.value : e
    }
    getKeyAsString(e) {
        return "number" == typeof e || "string" == typeof e ? e.toString() : JSON.stringify(e)
    }
    render() {
        var e = classNames("item", {
            "last-selected": this.props.isLastSelected,
            selected: this.props.isSelected
        });
        return React.createElement("div", null, React.createElement("div", {
            className: e,
            onMouseDown: () => {
                this.props.onSelected(this.props.data)
            },
            onMouseOver: () => {
                this.props.onSelectedItemChange(this.props.data)
            }
        },
        React.createElement("div", {
            "data-key": this.getKeyAsString(this.props.data.key)
        },
        this.renderItem(this.props.data))))
    }
}
class A extends React.Component {
    constructor(e) {
        super(e);
        this.onSelectedItemChange = (e) => {
            var t = this.props.data.indexOf(e);
            this.onSelectedIndexChange(t, this.props.data)
        };
        this.onSelect = (e) => {
            this.props.onSelect(e)
        };
        this.state = {
            selectedItem: this.props.selectedData
        };
        this.lastSelectedItem = this.props.selectedData
    }
    componentDidMount() {
        var e = ReactDOM.findDOMNode(this);
        var t = jQuery(e).find("div.selected");
        if (! (t.length <= 0)) {
            var n = DOMHelper.getElementRect(e);
            var r = DOMHelper.getElementRect(t.get(0));
            if (r.bottom > n.bottom) jQuery(e).scrollTop(r.top - n.top - n.height / 2 + r.height / 2)
        }
    }
    goDown() {
        var e = this.props.data.indexOf(this.state.selectedItem);
        e++;
        this.onSelectedIndexChange(e, this.props.data)
    }
    goUp() {
        var e = this.props.data.indexOf(this.state.selectedItem);
        e--;
        this.onSelectedIndexChange(e, this.props.data)
    }
    onSelectedIndexChange(e, t) {
        if (! (e < 0 || e >= t.length)) this.setState({
            selectedItem: t[e]
        })
    }
    componentWillReceiveProps(e) {
        if (e.data != this.props.data || e.selectedData != this.props.selectedData) {
            var t = e.data.indexOf(e.selectedData);
            if (t <= 0) t = 0;
            this.onSelectedIndexChange(t, e.data)
        }
    }
    selectItem() {
        this.onSelect(this.state.selectedItem)
    }
    getSelectedKey(e) {
        return e ? e.key ? e.key : e : null
    }
    renderItem(e) {
        var t = this.getSelectedKey(this.state.selectedItem);
        var n = this.getSelectedKey(this.lastSelectedItem);
        return React.createElement(y, {
            isSelected: t === e.key,
            isLastSelected: n === e.key,
            onSelected: this.onSelect,
            onSelectedItemChange: this.onSelectedItemChange,
            onRenderItem: this.props.onRenderItem,
            data: e
        })
    }
    renderItems(e) {
        return _.map(e, (e) => {
            return React.createElement("div", {
                key: e.key
            },
            this.renderItem(e))
        })
    }
    render() {
        var e = this.props.data;
        return React.createElement("div", {
            style: this.props.style
        },
        this.renderItems(e))
    }
}
/// var E = n(24)/*EventHelper*/;  // 1 times
/// var v = n(19)/*TimerHelper*/;  // 1 times
/*n.d(t, "a", function () {
    return S
});*/
class S extends React.Component {
    constructor(e) {
        super(e);
        this.width = 200;
        this.onKeyDown = (e) => {
            if (e.stopPropagation(), 13 === e.keyCode) return e.preventDefault(),
            void this.items.selectItem();
            if (38 === e.keyCode) {
                this.items.goUp();
                e.preventDefault()
            }
            if (40 === e.keyCode) {
                this.items.goDown();
                e.preventDefault()
            }
        };
        this.onSelect = (e) => {
            this.setState({
                selectedData: e,
                isExpanded: false
            });
            if (! ("" === e.key && "" === e.value)) this.props.onChange(e.key)
        };
        this.onBlur = () => {
            this.setState({
                isExpanded: false
            })
        };
        this.onSelectBoxMouseDown = (e) => {
            if (!this.state.isExpanded) {
                console.log("come here");
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().build());
                TimerHelper.next(() => {
                    if (this.container) this.container.focus()
                })
            }
            this.setState({
                isExpanded: !this.state.isExpanded
            });
            e.preventDefault()
        };
        var t = this.getData();
        this.state = {
            isExpanded: false,
            selectedData: this.getSelectedData(t, this.props.value),
            arrowClassName: ""
        };
        if (this.props.width) this.width = this.props.width
    }
    getData(e, t) {
        return e = e || this.props.data,
        "" !== (t = void 0 === t ? this.props.value : t) || this.props.noAutoAddedEmpty || (e = [{
            key: "",
            value: ""
        }].concat(this.props.data)),
        e
    }
    getSelectedData(e, t) {
        return null == e || 0 === e.length ? null : null == t ? e[0] : _.find(e, (e) => {
            return e.key === t
        })
    }
    renderItems() {
        if (!this.state.isExpanded) return null;
        var e = this.getData();
        return React.createElement(A, {
            style: this.props.itemsStyle,
            ref: (e) => {
                return this.items = e
            },
            data: e,
            onSelect: this.onSelect,
            onBlur: this.onBlur,
            selectedData: this.state.selectedData,
            onRenderItem: this.props.onRenderItem
        })
    }
    componentWillReceiveProps(e) {
        if (! (e.value === this.props.value && e.data === this.props.data)) this.setState({
            selectedData: this.getSelectedData(this.getData(e.data, e.value), e.value)
        })
    }
    renderInput() {
        return this.state.selectedData && this.state.selectedData.value ? this.state.selectedData.hasOwnProperty("value") ? React.createElement("input-like", {
            style: this.props.inputStyle,
            readOnly: true
        },
        this.state.selectedData.value) : React.createElement("input-like", {
            style: this.props.inputStyle,
            readOnly: true
        },
        this.state.selectedData) : React.createElement("input-like", {
            readOnly: true,
            style: _.assignIn({
                whiteSpace: "pre"
            },
            this.props.inputStyle)
        },
        " ")
    }
    render() {
        var e = this.props.expansionWidth || this.width;
        var t = _.assignIn({},
        this.props.style, {
            width: this.width
        });
        var n = this.props.selectBoxStyle;
        return React.createElement("div", {
            className: "select-box-container",
            ref: (e) => {
                return this.container = e
            },
            onKeyDown: this.onKeyDown,
            style: t,
            onBlur: this.onBlur,
            title: this.props.title,
            tabIndex: 998
        },
        React.createElement("div", {
            style: n,
            "data-for": "select-box",
            className: "input-container",
            onMouseDown: this.onSelectBoxMouseDown,
            onMouseOver: () => {
                this.setState({
                    arrowClassName: "selected"
                })
            },
            onMouseLeave: () => {
                this.setState({
                    arrowClassName: ""
                })
            }
        },
        this.renderInput(), React.createElement("div", {
            className: "arrow-down-icon " + this.state.arrowClassName,
            style: {
                left: this.width - 10
            }
        },
        React.createElement("i", {
            className: "fa fa-caret-down",
            "aria-hidden": "true"
        }))), React.createElement("div", {
            className: (this.state.isExpanded ? "show" : "hide") + " items",
            style: {
                width: e - 2
            }
        },
        this.renderItems()))
    }
}

export default S