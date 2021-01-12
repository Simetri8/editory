import React from 'react';

/// xxx(209) /*InputRadio*/

/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
var InputRadio = class extends React.Component {
    render() {
        return React.createElement("div", {
            style: {
                display: "inline-block",
                paddingRight: 20
            },
            onClick: this.props.onSelect
        },
        React.createElement("input", {
            type: "radio",
            value: this.props.value,
            checked: this.props.checked,
            onChange: this.props.onSelect
        }), React.createElement("label", {
            style: {
                marginLeft: 3
            }
        },
        this.props.label))
    }
}

export default InputRadio