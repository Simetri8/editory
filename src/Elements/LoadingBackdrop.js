import React from 'react';

/// xxx(340) /*LoadingBackdrop*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 8 times
/// var a = n.n(r);
class i extends React.Component {
    render() {
        return React.createElement("div", null, React.createElement("div", {
            style: {
                background: "black",
                opacity: .4,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            onMouseDown: this.props.onSelected
        }), React.createElement("div", {
            style: {
                color: "white",
                display: "block",
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -20,
                marginTop: -20
            }
        },
        React.createElement("svg", {
            style: {
                width: 50,
                height: 50
            }
        },
        React.createElement("g", {
            style: {
                transform: "scale(0.5,0.5)"
            }
        },
        React.createElement("path", {
            fill: "#fff",
            stroke: "none",
            d: "M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        },
        React.createElement("animateTransform", {
            attributeName: "transform",
            attributeType: "XML",
            type: "rotate",
            dur: "1s",
            from: "0 50 50",
            to: "360 50 50",
            repeatCount: "indefinite"
        }))))))
    }
}

export default i