import jQuery from 'jquery';
import React from 'react';
import MathGlobal from './MathGlobal';

/// xxx(1578) /*InstructionPopup*/

/// var k = n(0)/*React*/;  // 41 times
/// var B = n.n(k);
/// var Pa = n(28)/*MathGlobal*/;  // 2 times
/// var gi = n(5)/*sizzle*/;  // 3 times
/// var yi = n.n(gi);
class InstructionPopup extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            step: 0
        };
    }
    renderDocumentOptions() {
        var e = jQuery("icon-dropdown").get(0);
        if (!e) {
            return null;
        }
        var t = e.getBoundingClientRect();
        var n = {
            fontSize: 13,
            position: "fixed",
            left: t.right + 7,
            top: t.top + t.height / 2 - 5,
            transform: "translate(0,-50%)",
            background: "white",
            color: "black",
            maxWidth: 350,
            zIndex: 9E4,
            border: "1px solid #a9bda9",
            filter: "drop-shadow(9px 9px 9px rgba(0,0,0,0.3))"
        };
        return React.createElement("double-click-instruction", {
            style: n
        },
        React.createElement("instruction-header", {
            style: {
                display: "block",
                background: "#bee5bc",
                height: 28
            }
        },
        React.createElement("step", {
            style: {
                display: "inline-block",
                margin: 6,
                color: "green"
            }
        },
        "Quick Start:5/5"), React.createElement("button", {
            onMouseDown: () => {
                return this.props.onClose();
            },
            className: "btn-normal",
            style: {
                float: "right",
                margin: 4,
                width: 60,
                paddingTop: 3
            }
        },
        "Done")), this.renderDocumentOptionsContent(), React.createElement("svg", {
            style: {
                position: "absolute",
                width: 20,
                height: 10,
                left: -15,
                top: "calc(50%+5px)",
                transform: "rotate(90deg)"
            }
        },
        React.createElement("path", {
            d: "M0,0 L8,8 L 16,0 Z",
            style: {
                fill: "white",
                stroke: "none"
            }
        }), React.createElement("path", {
            d: "M0,0 L8,8 L 16,0",
            style: {
                fill: "none",
                stroke: "#a9bda9",
                strokeWidth: 1
            }
        })));
    }
    renderDocumentOptionsContent() {
        return MathGlobal.isOfflineMode() ? React.createElement("span", {
            style: {
                display: "inline-block",
                padding: 10
            }
        },
        "Click ", React.createElement("b", null, React.createElement("i", {
            title: "More",
            className: "fa fa-ellipsis-v",
            style: {
                padding: 5
            }
        })), " to have more options (", React.createElement("b", null, "Delete,Duplicate,..."), "),or ", React.createElement("b", null, "Drag and Drop"), " on Document/Directory Name to move to another Directory") : React.createElement("span", {
            style: {
                display: "inline-block",
                padding: 10
            }
        },
        "Click ", React.createElement("b", null, React.createElement("i", {
            title: "More",
            className: "fa fa-ellipsis-v",
            style: {
                padding: 5
            }
        })), " to have more options (", React.createElement("b", null, "Delete,Duplicate,..."), "),or ", React.createElement("b", null, "Drag and Drop"), " on Document/Directory Name to move to another Directory (please login to use)");
    }
    renderDocumentFunctions() {
        var e = jQuery("document-sidebar-header").get(0);
        if (!e) {
            return null;
        }
        var t = e.getBoundingClientRect();
        var n = {
            fontSize: 13,
            position: "fixed",
            left: 10,
            top: t.top + t.height,
            background: "white",
            color: "black",
            maxWidth: 350,
            zIndex: 9E4,
            border: "1px solid #a9bda9",
            filter: "drop-shadow(9px 9px 9px rgba(0,0,0,0.3))"
        };
        return React.createElement("double-click-instruction", {
            style: n
        },
        React.createElement("instruction-header", {
            style: {
                display: "block",
                background: "#bee5bc",
                height: 28
            }
        },
        React.createElement("step", {
            style: {
                display: "inline-block",
                margin: 6,
                color: "green"
            }
        },
        "Quick Start:4/5"), React.createElement("button", {
            onMouseDown: () => {
                return this.setState({
                    step: this.state.step + 1
                });
            },
            className: "btn-normal",
            style: {
                float: "right",
                margin: 4,
                width: 60
            }
        },
        "Next")), this.renderDocumentFunctionContent(), React.createElement("svg", {
            style: {
                position: "absolute",
                width: 20,
                height: 10,
                left: 45,
                top: -8
            }
        },
        React.createElement("path", {
            d: "M0,8 L8,0 L 16,8 Z",
            style: {
                fill: "#bee5bc",
                stroke: "none"
            }
        }), React.createElement("path", {
            d: "M0,8 L8,0 L 16,8",
            style: {
                fill: "none",
                stroke: "#a9bda9"
            }
        })));
    }
    renderDocumentFunctionContent() {
        return MathGlobal.isOfflineMode() ? React.createElement("span", {
            style: {
                display: "inline-block",
                padding: 10
            }
        },
        "Click on icons to ", React.createElement("b", null, "create new "), " Document,Directory") : React.createElement("span", {
            style: {
                display: "inline-block",
                padding: 10
            }
        },
        "Click on icons to ", React.createElement("b", null, "create new"), ",", React.createElement("b", null, "or share"), " Document,Directory (please login to use)");
    }
    renderDoubleClickDocument() {
        var e = jQuery("node-document").get(0);
        if (!e) {
            return null;
        }
        var t = e.getBoundingClientRect();
        var n = {
            fontSize: 13,
            position: "fixed",
            left: t.left,
            top: t.bottom + 10,
            transform: "translate(0,0)",
            background: "white",
            color: "black",
            zIndex: 9E4,
            border: "1px solid #a9bda9",
            filter: "drop-shadow(9px 9px 9px rgba(0,0,0,0.3))",
            minWidth: 270
        };
        return React.createElement("double-click-instruction", {
            style: n
        },
        React.createElement("instruction-header", {
            style: {
                display: "block",
                background: "#bee5bc",
                height: 28
            }
        },
        React.createElement("step", {
            style: {
                display: "inline-block",
                margin: 6,
                color: "green"
            }
        },
        "Quick Start:3/5"), React.createElement("button", {
            onMouseDown: () => {
                return this.setState({
                    step: this.state.step + 1
                });
            },
            className: "btn-normal",
            style: {
                float: "right",
                margin: 4,
                width: 60
            }
        },
        "Next")), React.createElement("span", {
            style: {
                display: "inline-block",
                padding: 10
            }
        },
        React.createElement("b", null, "Double click "), " to open document"), React.createElement("svg", {
            style: {
                position: "absolute",
                width: 20,
                height: 10,
                left: t.left + t.width / 2 - 5,
                top: -8
            }
        },
        React.createElement("path", {
            d: "M0,8 L8,0 L 16,8 Z",
            style: {
                fill: "#bee5bc",
                stroke: "none"
            }
        }), React.createElement("path", {
            d: "M0,8 L8,0 L 16,8",
            style: {
                fill: "none",
                stroke: "#a9bda9"
            }
        })));
    }
    renderStep() {
        switch (this.state.step) {
        case 0:
            return this.renderDoubleClickDocument();
        case 1:
            return this.renderDocumentFunctions();
        case 2:
            return this.renderDocumentOptions();
        }
    }
    render() {
        return this.props.show ? React.createElement("instructions-container", null, this.renderStep()) : React.createElement("instructions-container", null);
    }
}
/*n.d(t, "a", function () {
    return InstructionPopup;
});*/

export default InstructionPopup