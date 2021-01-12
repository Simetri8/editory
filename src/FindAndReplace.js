import React from 'react';
import FindAndReplaceOptionsComponent from './Editor/FindAndReplaceOptionsComponent';
import MathType from './MathType';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1560) /*FindAndReplace*/

/// var k = n(0)/*React*/;  // 32 times
/// var B = n.n(k);
var is15 = React.version.startsWith("15");
/// var Ge = n(91)/*MathType*/;  // 2 times
/// var n19 = n(19)/*TimerHelper*/;  // 1 times
/// var Fa = n(138)/*FindAndReplaceOptionsComponent*/;  // 3 times
var _a = [{
    style: {
        marginRight: 3,
        padding: "2px 8px"
    },
    key: "show-replace",
    element: React.createElement("i", {
        style: {
            padding: "0 0px"
        },
        className: "fa fa-angle-double-down",
        "aria-hidden": "true"
    })
},
{
    key: "plain-text",
    element: React.createElement("span", {
        style: {
            padding: "0 5px"
        }
    },
    "A")
},
{
    key: "math-mode",
    element: React.createElement("span", {
        style: {
            padding: "0 3px",
            fontFamily: "Asana-Math,Asana",
            fontSize: 12
        }
    },
    "fx")
}];
var Ua = [{
    key: "previous",
    element: React.createElement("i", {
        style: {
            padding: "0 3px"
        },
        className: "fa fa-chevron-left",
        "aria-hidden": "true"
    })
},
{
    key: "next",
    element: React.createElement("i", {
        style: {
            padding: "0 3px"
        },
        className: "fa fa-chevron-right",
        "aria-hidden": "true"
    })
},
{
    key: "close",
    style: {
        marginLeft: "5px"
    },
    element: React.createElement("i", {
        style: {
            padding: "0 3px"
        },
        className: "fa fa-times",
        "aria-hidden": "true"
    })
}];
class FindAndReplaceComponent extends React.Component {
    constructor(e) {
        super(e);
        this.raiseFindRunLaterObj = TimerHelper.createLaterRunObject("latest", "a-little-while");
        this.onOptionSelect = (e) => {
            if (this.state.optionSelectedKey != e.key) {
                if ("show-replace" != e.key) {
                    this.setState({
                        optionSelectedKey: e.key
                    });
                    console.log(e);
                } else {
                    this.setState({
                        showReplace: true
                    });
                }
            }
        };
        this.onReplace = (e) => {
            e.preventDefault();
            e.stopPropagation();
            var t = this.getTextInfo("replace");
            this.props.requestReplace(t, this.state.optionSelectedKey);
        };
        this.onReplaceAll = (e) => {
            e.preventDefault();
            e.stopPropagation();
            var t = this.getTextInfo("replace");
            this.props.requestReplaceAll(t, this.state.optionSelectedKey);
        };
        this.handleFindAction = (e) => {
            if ("close" == e.key && this.props.onClose(), "next" == e.key && this.raiseFindNext(), "previous" == e.key) {
                var t = this.props.onPrevious();
                this.setState({
                    currentIndex: t
                });
            }
        };
        this.raiseFindRunLaterFunc = () => {
            var e = this.getTextInfo("find");
            var t = this.props.onFind(e, this.state.optionSelectedKey);
            var n = t.result;
            var r = t.index;
            this.setState({
                total: n.total,
                currentIndex: r
            });
            this.lastSearch = e;
        };
        this.onMathTypeModelChanged = () => {
            console.log("model changed");
            this.raiseFind();
        };
        this.handleEnter = (e) => {
            e.stopPropagation();
            e.preventDefault();
            var t = this.getTextInfo("find");
            if (this.lastSearch != t) {
                this.raiseFind();
            } else {
                this.raiseFindNext();
            }
        };
        this.state = {
            optionSelectedKey: "plain-text",
            showReplace: this.props.showReplace,
            total: 0,
            currentIndex: void 0
        };
    }
    componentWillReceiveProps(e) {
        if (!this.state.showReplace && e.showReplace) {
            this.setState({
                showReplace: true
            });
        }
    }
    updateIncrementalFindInfoChanged(e) {
        this.setState({
            total: e.result.total,
            currentIndex: e.index
        });
    }
    focus() {
        this.mathType.hidenInputFocus();
    }
    raiseFindNext() {
        var e = this.props.onNext();
        this.setState({
            currentIndex: e
        });
    }
    raiseFind() {
        this.raiseFindRunLaterObj.later(this.raiseFindRunLaterFunc);
    }
    getTextInfo(e) {
        var t = ("find" == e ? this.mathType.getModel() : this.mathTypeReplace.getModel()).lines[0].blocks[0];
        return t ? "plain-text" == this.state.optionSelectedKey ? t.text : t.elements.mathValue.lines[0].blocks : "";
    }
    renderReplace() {
        if (this.state.showReplace && !this.props.selectOnly) {
            return React.createElement("tr", null, React.createElement("td", null, React.createElement(FindAndReplaceOptionsComponent, {
                style: {
                    textAlign: "center"
                },
                preventDefault: true,
                stopPropagation: true,
                selectedKeys: [],
                onSelect: () => {
                    return this.setState({
                        showReplace: false
                    });
                },
                items: [{
                    key: "up",
                    element: React.createElement("i", {
                        style: {
                            padding: "0 3px"
                        },
                        className: "fa fa-angle-double-up",
                        "aria-hidden": "true"
                    })
                }]
            })), React.createElement("td", null, React.createElement("far-inputs", {
                "data-test-name": "replace",
                style: {
                    minHeight: 27,
                    marginLeft: -1,
                    display: "block",
                    border: "1px solid lightgray",
                    background: "white"
                }
            },
            React.createElement(MathType, {
                ref:
                (e) => {
                    return this.mathTypeReplace = e;
                },
                restrictedView: true,
                oneMode: this.state.optionSelectedKey,
                multiline: false,
                style: {
                    width: 150,
                    padding: "2px 5px"
                }
            }))), React.createElement("td", {
                style: {
                    width: 140
                }
            },
            React.createElement("button", {
                onMouseDown: this.onReplace,
                style: {
                    display: "inline-block",
                    marginLeft: 2
                },
                className: "btn-normal"
            },
            "Replace"), React.createElement("button", {
                onMouseDown: this.onReplaceAll,
                style: {
                    display: "inline-block",
                    marginLeft: 5
                },
                className: "btn-normal"
            },
            "Replace All")));
        }
    }
    render() {
        return React.createElement("find-and-replace-area", {
            class: "no-print",
            style: {
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                top: 71,
                right: -1,
                alignItems: "flex-start",
                border: "1px solid lightgray",
                background: "#f7f7f7",
                boxShadow: "1px 1px 1px 0px #e0dddd"
            }
        },
        React.createElement("table", {
            style: {
                borderCollapse: "collapse"
            }
        },
        React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement("far-options", {
            style: {
                padding: 3,
                display: "block"
            }
        },
        React.createElement(FindAndReplaceOptionsComponent, {
            preventDefault: true,
            stopPropagation: true,
            hiddenKeys: [this.state.showReplace || this.props.selectOnly ? "show-replace" : ""],
            selectedKeys: [this.state.optionSelectedKey],
            items: _a,
            onSelect: this.onOptionSelect
        }))), React.createElement("td", null, React.createElement("far-inputs", {
            "data-test-name": "find",
            style: {
                minHeight: 27,
                marginLeft: -1,
                display: "block",
                border: "1px solid lightgray",
                background: "white"
            }
        },
        React.createElement(MathType, {
            ref:
            (e) => {
                return this.mathType = e;
            },
            handleEnter: this.handleEnter,
            shouldFocusOnCreated: true,
            restrictedView: true,
            onModelChanged: this.onMathTypeModelChanged,
            oneMode: this.state.optionSelectedKey,
            multiline: false,
            style: {
                width: 150,
                padding: "2px 5px"
            }
        }))), React.createElement("td", null, React.createElement("far-last", {
            style: {
                minHeight: 15,
                fontSize: 12,
                minWidth: 50,
                marginLeft: -1,
                color: "gray",
                padding: "3px 3px",
                display: "flex"
            }
        },
        React.createElement("span", {
            style: {
                lineHeight: "1.8em",
                minWidth: "70px",
                fontSize: 13
            }
        },
        this.buildCountString()), React.createElement(FindAndReplaceOptionsComponent, {
            preventDefault: true,
            stopPropagation: true,
            style: {
                display: "flex",
                alignItems: "center"
            },
            onSelect: this.handleFindAction,
            selectedKeys: [],
            items: Ua
        })))), this.renderReplace())));
    }
    buildCountString() {
        var e = void 0 !== this.state.currentIndex ? (this.state.currentIndex + 1).toString() : "0";
        var t = this.state.total > 999 ? "999+" : this.state.total.toString();
        return "".concat(e, " of ").concat(t);
    }
}
/*n.d(t, "a", function () {
    return FindAndReplaceComponent;
});*/

export default FindAndReplaceComponent