import React from 'react';

/// xxx(348) /*SymbolWrapper*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
class i extends React.Component {
    render() {
        var e = {
            margin: "2px auto 2px auto",
            background: this.props.isExpanded ? "white" : void 0
        };
        return React.createElement("div", {
            style: {
                margin: "auto"
            }
        },
        React.createElement("div", {
            className: "common-square-icon",
            style: e
        }), React.createElement("div", {
            style: {
                height: 5,
                lineHeight: "4px",
                margin: "auto",
                textAlign: "center"
            }
        },
        this.props.symbol), React.createElement("div", {
            className: "common-square-icon",
            style: e
        }))
    }
}

export default i