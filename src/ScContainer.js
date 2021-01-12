import React from 'react';

/// xxx(1555) /*ScContainer*/

/// var k = n(0)/*React*/;  // 7 times
/// var B = n.n(k);
class ScContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.handleIconMouseDown = (e) => {
            if (this.props.onMouseDown) {
                this.props.onMouseDown(e);
            }
        };
    }
    render() {
        var e = this.props.isSmall;
        var t = {
            display: "inline-block",
            width: e ? "20px" : "25px",
            height: e ? "20px" : "25px",
            position: "relative",
            overflow: "hidden",
            verticalAlign: "middle",
            margin: "5px"
        };
        var n = {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            fontSize: e ? "12px" : "14px",
            paddingTop: e ? "4px" : "5px"
        };
        return React.createElement("a", {
            target: "_blank",
            className: "sc-icon " + this.props.network,
            onMouseDown: this.handleIconMouseDown,
            style: t
        },
        React.createElement("div", {
            className: "sc-container",
            style: {
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("svg", {
            className: "sc-svg",
            viewBox: "0 0 64 64",
            style: {
                borderRadius: "50%",
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                fillRule: "evenodd"
            }
        },
        React.createElement("g", {
            className: "sc-svg-background"
        },
        React.createElement("circle", {
            cx: "32",
            cy: "32",
            r: "31"
        }))), React.createElement("i", {
            style: n,
            className: "fa fa-" + this.props.network
        })));
    }
}
/*n.d(t, "a", function () {
    return ScContainer;
});*/

export default ScContainer