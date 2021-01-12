import _ from 'lodash';
import React from 'react';
import MathType, { serialization } from './MathType';

/// xxx(1577) /*QuickStart*/

/// var k = n(0)/*React*/;  // 33 times
/// var B = n.n(k);
/// var Pe = n(3);  // 2 times
/// var Fe = n.n(Pe);
/// var Ge = n(91)/*MathType*/;  // 2 times
var Ki = {
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    background: "#f1f0f0",
    color: "black",
    marginRight: 5,
    fontFamily: "monospace"
};
var Vi = {
    display: "inline-block",
    border: "1px solid lightgray",
    borderRadius: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    fontWeight: "bold",
    boxShadow: "1px 1px 1px -1px #4c4949"
};
var Qi = {
    position: "relative",
    display: "block",
    border: "1px solid lightgray",
    background: "white",
    cursor: "text",
    height: 300
};
var Zi = {
    padding: 5,
    fontSize: 13,
    color: "white",
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translate(-50%,0)"
};
var Xi = {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999999999
};
var Ji = {
    zIndex: 0,
    opacity: .7
};
var eo = {
    display: "inline-block",
    marginTop: -5,
    float: "right"
};
var to = {
    display: "block",
    borderBottom: "1px solid lightgray",
    paddingBottom: 2,
    marginBottom: 7,
    color: "green"
};
var no = {
    cursor: "default",
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 530,
    height: 160,
    transform: "translate(-50%,-310px)",
    padding: 10,
    background: "white",
    boxShadow: "0px 1px 2px 0px #4c4949",
    fontSize: 14,
    color: "gray"
};
var ro = {
    padding: 5,
    zIndex: 1,
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 540,
    transform: "translate(-50%,-50%)",
    marginTop: 50,
    background: "#f3eeee",
    boxShadow: "0px 1px 2px 0px #4c4949"
};
var GuideBoard = (e) => {
    var t = e.currentStepIndex;
    var n = e.onNewIndex;
    var r = ji[t];
    return React.createElement("qs-guide-board-container", {
        style: no
    },
    React.createElement("gb-header", {
        style: to
    },
    r.title, React.createElement("button", {
        style: _.assignIn({},
        eo, {
            marginLeft: 5,
            width: 70
        }),
        onMouseDown: function () {
            n(t + 1);
        },
        className: "btn-normal next"
    },
    "Next"), React.createElement("button", {
        style: _.assignIn({},
        eo, {
            width: 70
        }),
        disabled: t <= 0,
        onMouseDown: function () {
            n(t - 1);
        },
        className: "btn-normal previous"
    },
    "Previous")), r.content);
};
var Yi = (e) => {
    return React.createElement("span", {
        style: {
            fontSize: 13,
            padding: 2,
            display: "block",
            textAlign: e.center ? "center" : null,
            marginTop: e.center ? 11 : null
        }
    },
    e.children);
};
var ji = [{
    title: "Quick Start:1/5-Input formula",
    model: {
        id: "n4422111",
        lines: [{
            id: "n2211534",
            blocks: []
        }]
    },
    selected: {
        lineIndex: 0,
        charIndex: 0
    },
    content: React.createElement("gb-content", null, React.createElement(Yi, null, "- Click on text area below,press ", React.createElement("key-piece", {
        style: Vi
    },
    "\\"), " to trigger Suggestion Box "), React.createElement(Yi, null, "- Select  ", React.createElement("stand-out", {
        style: Ki
    },
    "\\math-container"), " "), React.createElement(Yi, {
        center: true
    },
    " You will see green area for math input,please click ", React.createElement("stand-out", {
        style: Ki
    },
    "Next"), " button to go to next step "))
},
{
    title: "Quick Start:2/5-Input formula",
    model: {
        id: "n44222111",
        lines: serialization.fromPasteText('/*!)-*&~n/{"isRoot":true,"isTabularRoot":false,"isPureText":false,"insideInlineMath":false,"lines":[{"blocks":[{"text":"Hello"}]},{"blocks":[{"text":"\\\\math-container","type":"composite","elements":{"mathValue":{"lines":[{"blocks":[]}]}},"displayMode":true}]},{"blocks":[],"style":{}}]}', true).lines
    },
    selected: {
        lineIndex: 1,
        charIndex: 0,
        key: "mathValue",
        selected: {
            lineIndex: 0,
            charIndex: 0
        }
    },
    content: React.createElement("gb-content", null, React.createElement(Yi, null, "- Make sure your cursor is inside green area with green cursor (Math Mode area) "), React.createElement(Yi, null, "- Type ", React.createElement("stand-out", {
        style: Ki
    },
    "a=+-"), ",and press ", React.createElement("key-piece", {
        style: Vi
    },
    "\\"), " on keyboard to trigger Suggestion Box "), React.createElement(Yi, null, "- Select  ", React.createElement("stand-out", {
        style: Ki
    },
    "\\sqrt"), ",then type ", React.createElement("stand-out", {
        style: Ki
    },
    "b^2+c^2")), React.createElement(Yi, {
        center: true
    },
    " That's how to type mathematics symbols !!!,click ", React.createElement("stand-out", {
        style: Ki
    },
    "Next"), " button to go to next step "))
}];
class QuickStart extends React.Component {
    constructor(e) {
        super(e);
        this.onMouseDown = (e) => {
            e.stopPropagation();
        };
        this.state = {
            currentStepIndex: 0
        };
    }
    static Footer(e) {
        var t = e.onClose;
        return React.createElement("qs-footer", {
            style: Zi
        },
        React.createElement("span", {
            style: {
                paddingRight: 10
            }
        },
        "Ok,I've got it"), React.createElement("button", {
            style: {
                display: "inline-block",
                width: 70
            },
            onMouseDown: t,
            className: "btn-normal"
        },
        "Close"));
    }
    render() {
        return this.props.show ? React.createElement("quick-start", {
            style: Xi,
            onMouseDown: this.onMouseDown
        },
        React.createElement("x-overlay", {
            style: Ji
        }), React.createElement(GuideBoard, {
            currentStepIndex: this.state.currentStepIndex,
            onNewIndex: (e) => {
                if (e >= ji.length) {
                    this.props.nextStep();
                } else {
                    this.setState({
                        currentStepIndex: e
                    });
                }
            }
        }), React.createElement("qs-math-type-container", {
            style: ro
        },
        React.createElement(MathType, {
            style:
            Qi,
            shouldFocusOnCreated: true,
            model: ji[this.state.currentStepIndex].model,
            selected: ji[this.state.currentStepIndex].selected,
            restrictedView: true
        })), React.createElement(QuickStart.Footer, {
            onClose: this.props.onClose
        })) : React.createElement("div", null);
    }
}
/*n.d(t, "a", function () {
    return QuickStart;
});*/

export default QuickStart