import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import { ExpandableComponentB } from './ExpandableComponent';
import ArrayHelper from '../Mathcha/ArrayHelper';
import CheckBoxWrapper from '../Mathcha/CheckBoxWrapper';

/// xxx(126) /*LabelItemContainer*/

/*n.d(t, "a", function () {
    return m
});*/
/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 15 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 1 times
/// var l = n.n(s);
/// var c = n(69)/*ExpandableComponent*/;  // 1 times
/// var d = n(101)/*CheckBoxWrapper*/;  // 1 times
/// var h = n(14)/*classnames*/;  // 1 times
/// var u = n.n(h);
/// var p = n(43)/*ArrayHelper*/;  // 1 times
class m extends ExpandableComponentB {
    constructor() {
        super(...arguments);
        this.handleMainButtonClick = (e => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onItemSelect("default")
        })
    }
    getComponentClassName() {
        return classNames("buton-action", {
            selected: this.state.expand
        })
    }
    shouldComponentUpdate(e, t) {
        return !ArrayHelper.areEqualShallow(this.props, e) || super.shouldComponentUpdate(e, t)
    }
    renderComponent() {
        return this.props.buttonWithMoreOptionsStyle ? React.createElement("div", {
            style: _.assignIn({
                display: "flex"
            },
            this.props.labelStyle)
        },
        React.createElement("button", {
            disabled: this.props.disabled,
            onMouseDown: this.handleMainButtonClick,
            style: {
                width: 70
            },
            className: "btn-primary btn-large"
        },
        this.props.label), React.createElement("button", {
            disabled: this.props.disabled,
            style: {
                width: 20,
                marginLeft: -1
            },
            className: "btn-primary btn-large"
        },
        React.createElement("i", {
            style: {
                verticalAlign: "-1px"
            },
            className: "fa fa-caret-down"
        }))) : !1 === this.props.caret ? React.createElement("label-display", {
            style: this.props.labelStyle
        },
        this.props.icon, React.createElement("span", null, this.props.label)) : React.createElement("label-display", {
            style: this.props.labelStyle
        },
        this.props.icon, React.createElement("span", null, this.props.label), React.createElement("i", {
            className: "fa fa-caret-down"
        }))
    }
    renderExpandComponent() {
        var e = {
            fontSize: 12,
            padding: 5,
            paddingLeft: 8,
            display: "block"
        },
        t = _.map(this.props.items, (t, n) => t.isSeperator ? React.createElement("div", {
            key: n,
            style: {
                height: 0,
                marginTop: 3,
                marginBottom: 3,
                borderTop: "1px solid lightgray"
            }
        }) : t.isCheckBox ? React.createElement("label-item", {
            style: _.assignIn({},
            e, {
                padding: 0,
                paddingLeft: 0
            }),
            key: t.value
        },
        React.createElement(CheckBoxWrapper, {
            style: {
                marginTop: 3,
                marginBottom: 3,
                padding: 5,
                paddingLeft: 8
            },
            textStyle: this.props.checkboxTextStyle,
            disabled: t.disabled,
            checked: t.checked,
            name: t.display.toString(),
            onValueChanged: () => this.onItemSelect(t.value)
        })) : t.disabled ? React.createElement("label-item", {
            style: _.assignIn({},
            e, {
                color: "lightgray"
            }),
            key: t.value
        },
        t.display) : React.createElement("label-item", {
            style: e,
            key: t.value,
            onMouseDown: () => this.onItemSelect(t.value)
        },
        t.icon, t.display));
        return React.createElement("label-item-container", {
            style: _.assignIn({},
            f, this.props.containerStyle)
        },
        t)
    }
}
var f = {
    display: "block",
    position: "absolute",
    left: "0px",
    top: "27px",
    width: "100px",
    background: "rgb(247,247,247)",
    border: "1px solid #c5c5c5",
    boxShadow: "1px 1px 1px 0px #8a8787"
}

export default m