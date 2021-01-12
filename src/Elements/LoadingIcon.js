import React from 'react';

/// xxx(447) /*LoadingIcon*/

/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
var LoadingIcon = (e => {
    var t = e.width,
    n = e.height,
    r = "translate(".concat(t / 2 - 24, "px,").concat(n / 2 - 26, "px) scale(0.5,0.5)");
    return React.createElement("g", null, React.createElement("rect", {
        fill: "rgba(0,0,0,0.35)",
        stroke: "none",
        x: 0,
        y: 0,
        width: t,
        height: n
    }), React.createElement("g", {
        style: {
            transform: r
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
    }))))
})

export default LoadingIcon