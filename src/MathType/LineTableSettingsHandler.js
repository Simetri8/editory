import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import BlockHelper from '../Elements/BlockHelper';
import ExpandableComponent, { ExpandableComponentB } from '../Elements/ExpandableComponent';
import Global from '../Global';
import LabelItemContainer from '../Elements/LabelItemContainer';
import LineHelper from '../Editor/LineHelper';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import StyleHelper from '../Mathcha/StyleHelper';
import TimerHelper from '../Mathcha/TimerHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';
import TooltipData from '../Mathcha/TooltipData';

/// xxx(1596) /*LineTableSettingsHandler*/

/// var r = n(3)/*_.assignIn*/;  // 9 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 160 times
/// var o = n.n(i);
/// var c = n(14)/*classnames*/;  // 13 times
/// var d = n.n(c);
/// var I = n(12)/*BlockHelper*/;  // 3 times
/// var N = n(18)/*StyleHelper*/;  // 12 times
/// var P = n(80)/*LineHelper*/;  // 4 times
/// var ee = n(11)/*Global*/;  // 3 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var vn = n(37)/*ToolbarIcons*/;  // 6 times
/// var In = n(67)/*TooltipData*/;  // 5 times
/// var Wn = n(69)/*ExpandableComponent*/;  // 6 times
/// var Yn = n(126)/*LabelItemContainer*/;  // 2 times
/// var rr = n(76)/*MobileTabletClasses*/;  // 1 times
class Gn extends ExpandableComponentB {
    constructor() {
        super(...arguments);
        this.onColorSelectMouseDown = () => { };
        this.onExpandContainerMouseDown = (e) => {
            e.stopPropagation();
        };
        this.onAction = (e) => {
            this.props.onAction(e);
        };
    }
    getComponentClassName() {
        return "table-border-picker";
    }
    renderComponent() {
        return React.createElement("div", {
            title: "Table Border"
        },
            this.drawBorder(null));
    }
    drawBorder(e) {
        return React.createElement("svg", {
            className: "selectable",
            style: {
                width: 16,
                height: 16,
                overflow: "visible",
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 1,
                paddingRight: 1
            }
        },
            React.createElement("path", {
                style: {
                    transform: "translate(2px,2px)"
                },
                d: "M-0.5,0 L12.5,0 M-0.5,6 L12.5,6 M-0.5,12 L12.5,12 M0,0 L0,12 M6,0 L6,12 M12,0 L12,12",
                stroke: "gray",
                strokeWidth: "0.5",
                strokeDasharray: "1 1"
            }), e);
    }
    renderExpandComponent() {
        var e = {
            transform: "translate(2px,2px)",
            stroke: "gray",
            strokeWidth: 1
        };
        var t = {
            display: "flex"
        };
        return React.createElement(ExpandableComponent, {
            onMouseDown: this.onColorSelectMouseDown
        },
            React.createElement("setting-line", {
                style: t
            },
                React.createElement("border-cell", {
                    onMouseDown: () => {
                        return this.onAction("full");
                    }
                },
                    this.drawBorder(React.createElement("path", {
                        style: e,
                        d: "M-0.5,0 L12.5,0 M-0.5,6 L12.5,6 M-0.5,12 L12.5,12 M0,0 L0,12 M6,0 L6,12 M12,0 L12,12"
                    }))), React.createElement("border-cell", {
                        onMouseDown: () => {
                            return this.onAction("inside");
                        }
                    },
                        this.drawBorder(React.createElement("path", {
                            style: e,
                            d: "M-0.5,6 L12.5,6 M6,0 L6,12 "
                        }))), React.createElement("border-cell", {
                            onMouseDown: () => {
                                return this.onAction("outside");
                            }
                        },
                            this.drawBorder(React.createElement("path", {
                                style: e,
                                d: "M-0.5,0 L12.5,0 M-0.5,12 L12.5,12 M0,0 L0,12 M12,0 L12,12"
                            })))), React.createElement("setting-line", {
                                style: t
                            },
                                React.createElement("border-cell", {
                                    onMouseDown: () => {
                                        return this.onAction("top");
                                    }
                                },
                                    this.drawBorder(React.createElement("path", {
                                        style: e,
                                        d: "M-0.5,0 L12.5,0"
                                    }))), React.createElement("border-cell", {
                                        onMouseDown: () => {
                                            return this.onAction("middle");
                                        }
                                    },
                                        this.drawBorder(React.createElement("path", {
                                            style: e,
                                            d: " M-0.5,6 L12.5,6"
                                        }))), React.createElement("border-cell", {
                                            onMouseDown: () => {
                                                return this.onAction("bottom");
                                            }
                                        },
                                            this.drawBorder(React.createElement("path", {
                                                style: e,
                                                d: "M-0.5,12 L12.5,12"
                                            })))), React.createElement("setting-line", {
                                                style: t
                                            },
                                                React.createElement("border-cell", {
                                                    onMouseDown: () => {
                                                        return this.onAction("left");
                                                    }
                                                },
                                                    this.drawBorder(React.createElement("path", {
                                                        style: e,
                                                        d: "M0,0 L0,12"
                                                    }))), React.createElement("border-cell", {
                                                        onMouseDown: () => {
                                                            return this.onAction("center");
                                                        }
                                                    },
                                                        this.drawBorder(React.createElement("path", {
                                                            style: e,
                                                            d: "M6,0 L6,12"
                                                        }))), React.createElement("border-cell", {
                                                            onMouseDown: () => {
                                                                return this.onAction("right");
                                                            }
                                                        },
                                                            this.drawBorder(React.createElement("path", {
                                                                style: e,
                                                                d: "M12,0 L12,12"
                                                            })))), React.createElement("setting-line", {
                                                                style: t
                                                            },
                                                                React.createElement("border-cell", {
                                                                    onMouseDown: () => {
                                                                        return this.onAction("none");
                                                                    }
                                                                },
                                                                    this.drawBorder())));
    }
}
class zn extends ExpandableComponentB {
    constructor() {
        super(...arguments);
        this.onExpandContainerMouseDown = (e) => {
            e.stopPropagation();
        };
        this.onAlignChanged = (e) => {
            this.props.onAlignChanged(e);
        };
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.align != this.props.align;
    }
    getComponentClassName() {
        return "vertical-align-picker";
    }
    renderComponent() {
        return React.createElement("div", null, this.drawAlign());
    }
    drawAlign() {
        var e = {
            width: 16,
            height: 16,
            fill: "gray",
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 1,
            paddingRight: 1
        };
        var t = {
            transform: "scale(0.32,0.32)"
        };
        switch (this.props.align) {
            case "top":
                return React.createElement("align-item", {
                    title: "Vertical Align"
                },
                    React.createElement("svg", {
                        className: "selectable",
                        style: e
                    },
                        React.createElement("path", {
                            style: t,
                            d: "M16 22h6v20h4v-20h6l-8-8-8 8zm-8-16v4h32v-4h-32z"
                        })));
            case "middle":
                return React.createElement("align-item", {
                    title: "Vertical Align"
                },
                    React.createElement("svg", {
                        className: "selectable",
                        style: e
                    },
                        React.createElement("path", {
                            style: t,
                            d: "M16 38h6v8h4v-8h6l-8-8-8 8zm16-28h-6v-8h-4v8h-6l8 8 8-8zm-24 12v4h32v-4h-32z"
                        })));
            case "bottom":
                return React.createElement("align-item", {
                    title: "Vertical Align"
                },
                    React.createElement("svg", {
                        className: "selectable",
                        style: e
                    },
                        React.createElement("path", {
                            style: t,
                            d: "M32 26h-6v-20h-4v20h-6l8 8 8-8zm-24 12v4h32v-4h-32z"
                        })));
            default:
                throw new Error("not supported");
        }
    }
    renderExpandComponent() {
        var e = {
            width: 16,
            height: 16,
            fill: "gray"
        };
        var t = {
            transform: "scale(0.32,0.32)"
        };
        var n = this.props.align;
        return React.createElement(ExpandableComponent, null, React.createElement("align-item", null, React.createElement("svg", {
            className: classNames("selectable", {
                selected: "top" == n
            }),
            onMouseDown: () => {
                return this.onAlignChanged("top");
            },
            style: e
        },
            React.createElement("path", {
                style: t,
                d: "M16 22h6v20h4v-20h6l-8-8-8 8zm-8-16v4h32v-4h-32z"
            }))), React.createElement("align-item", null, React.createElement("svg", {
                className: classNames("selectable", {
                    selected: "middle" == n
                }),
                onMouseDown: () => {
                    return this.onAlignChanged("middle");
                },
                style: e
            },
                React.createElement("path", {
                    style: t,
                    d: "M16 38h6v8h4v-8h6l-8-8-8 8zm16-28h-6v-8h-4v8h-6l8 8 8-8zm-24 12v4h32v-4h-32z"
                }))), React.createElement("align-item", null, React.createElement("svg", {
                    className: classNames("selectable", {
                        selected: "bottom" == n
                    }),
                    onMouseDown: () => {
                        return this.onAlignChanged("bottom");
                    },
                    style: e
                },
                    React.createElement("path", {
                        style: t,
                        d: "M32 26h-6v-20h-4v20h-6l8 8 8-8zm-24 12v4h32v-4h-32z"
                    }))));
    }
}
class Kn extends React.Component {
    constructor() {
        super(...arguments);
        this.handleAddCaption = () => {
            this.props.onAddCaption();
        };
    }
    getAlignClassName(e, t) {
        return e === t ? "selected" : "";
    }
    getStyle() {
        return this.props.editorStyle || {};
    }
    renderSetting() {
        var e = this.getStyle()["v-align"] || "top";
        return React.createElement("x-detail", {
            class: "table-settings-detail"
        },
            React.createElement(zn, {
                align: e,
                onAlignChanged: (e) => {
                    return this.props.onChanged("v-align", "top" == e ? void 0 : e);
                }
            }), React.createElement("v-separator", null), React.createElement("list-items-options", {
                class: "setting-group-options"
            },
                React.createElement(Gn, {
                    onAction: (e) => {
                        return this.props.onChanged("border", e);
                    }
                })), React.createElement("v-separator", null), React.createElement(LabelItemContainer, {
                    style: {
                        marginLeft: 4
                    },
                    labelStyle: {
                        paddingBottom: 0,
                        paddingLeft: 4,
                        paddingRight: 4
                    },
                    caret: false,
                    label: "...",
                    items: Vn,
                    onItemSelect: this.handleAddCaption
                }));
    }
    render() {
        return React.createElement("line-setting", null, this.renderSetting());
    }
}
var Vn = [{
    value: "add-caption",
    display: "Add Caption"
}];
class jn extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            mouseEnter: false
        };
    }
    render() {
        var e = this.props.data;
        var t = {
            width: 70,
            border: this.state.mouseEnter ? "1px solid gray" : "1px solid lightgray",
            margin: 3,
            padding: 8,
            fontFamily: '"Helvetica Neue",Helvetica,arial,freesans,clean,sans-serif',
            fontWeight: 400,
            fontSize: "0.9em"
        };
        var n = {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "2px 0"
        };
        var r = {
            flex: 1,
            height: 3,
            background: "lightgray",
            marginLeft: 5
        };
        return React.createElement("div", {
            style: t,
            onMouseDown: this.props.onSelect,
            onMouseEnter: () => {
                return this.setState({
                    mouseEnter: true
                });
            },
            onMouseLeave: () => {
                return this.setState({
                    mouseEnter: false
                });
            }
        },
            React.createElement("div", {
                style: _.assignIn({},
                    n, {
                    marginLeft: 0
                })
            },
                React.createElement("span", null, e[0]), React.createElement("div", {
                    style: r
                })), React.createElement("div", {
                    style: _.assignIn({},
                        n, {
                        marginLeft: 15
                    })
                },
                    React.createElement("span", null, e[1]), React.createElement("div", {
                        style: r
                    })), React.createElement("div", {
                        style: _.assignIn({},
                            n, {
                            marginLeft: 15
                        })
                    },
                        React.createElement("span", null, e[2]), React.createElement("div", {
                            style: r
                        })), React.createElement("div", {
                            style: _.assignIn({},
                                n, {
                                marginLeft: 30
                            })
                        },
                            React.createElement("span", null, e[3]), React.createElement("div", {
                                style: r
                            })), React.createElement("div", {
                                style: _.assignIn({},
                                    n, {
                                    marginLeft: 0
                                })
                            },
                                React.createElement("span", null, e[4]), React.createElement("div", {
                                    style: r
                                })));
    }
}
class qn extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            mouseEnter: false
        };
    }
    render() {
        var e = this.state.mouseEnter;
        var t = _.assignIn({
            border: e ? "1px solid gray" : "1px solid lightgray",
            width: 27,
            height: 25,
            margin: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.9em"
        },
            this.props.style);
        return React.createElement("div", {
            style: t,
            onMouseDown: this.props.onSelect,
            onMouseEnter: () => {
                return this.setState({
                    mouseEnter: true
                });
            },
            onMouseLeave: () => {
                return this.setState({
                    mouseEnter: false
                });
            }
        },
            React.createElement("span", null, this.props.text));
    }
}
var Zn = {
    position: "absolute",
    left: 0,
    top: 25,
    border: "1px solid lightgray",
    padding: "10px 7px",
    background: "white",
    display: "flex",
    flexDirection: "column"
};
var Xn = {
    display: "flex",
    flexDirection: "row"
};
class Qn extends React.Component {
    renderItemContent(e, t) {
        return React.createElement(jn, {
            data: e,
            onSelect: () => {
                return this.props.onSelectBullets(t);
            }
        });
    }
    render() {
        return React.createElement("div", {
            style: er
        },
            React.createElement("div", {
                style: {
                    fontSize: "0.9em",
                    textAlign: "center",
                    paddingBottom: 5
                }
            },
                "Change Templates for related lines"), React.createElement("div", {
                    style: Xn
                },
                    this.renderItemContent(["1.", "a.", "b.", "i.", "2."], ["\\1.", "\\a.", "\\i.", "\\A."]), this.renderItemContent(["1)", "a)", "b)", "i)", "2)"], ["\\1)", "\\a)", "\\i)", "\\A)"]), this.renderItemContent(["1.", "1.1.", "1.2.", "1.2.1.", "2."], ["\\.1.", "\\.1.", "\\.1.", "\\.1."])), React.createElement("div", {
                        style: Xn
                    },
                        this.renderItemContent(["A.", "a.", "b.", "i.", "B."], ["\\A.", "\\a.", "\\i.", "\\1."]), this.renderItemContent(["I.", "A.", "B.", "1.", "II."], ["\\I.", "\\A.", "\\1.", "\\a."]), this.renderItemContent(["01.", "a.", "b.", "i.", "02."], ["\\01.", "\\a.", "\\i.", "\\A."])), React.createElement("div", {
                            style: {
                                fontSize: "0.9em",
                                textAlign: "center",
                                paddingTop: 5,
                                paddingBottom: 5
                            }
                        },
                            "Change List Item for selected lines"), React.createElement("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "row"
                                }
                            },
                                React.createElement(qn, {
                                    text: "1.",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\1.");
                                    }
                                }), React.createElement(qn, {
                                    text: "1)",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\1)");
                                    }
                                }), React.createElement(qn, {
                                    text: "01.",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\01.");
                                    }
                                }), React.createElement(qn, {
                                    text: React.createElement("span", null, "1.", React.createElement("span", {
                                        style: {
                                            color: "lightgray"
                                        }
                                    },
                                        "1.")),
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\.1.");
                                    }
                                }), React.createElement(qn, {
                                    text: "a.",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\a.");
                                    }
                                }), React.createElement(qn, {
                                    text: "a)",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\a)");
                                    }
                                }), React.createElement(qn, {
                                    text: "A.",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\A.");
                                    }
                                }), React.createElement(qn, {
                                    text: "A)",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\\A)");
                                    }
                                })), React.createElement("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "row"
                                    }
                                },
                                    React.createElement(qn, {
                                        text: "i.",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\\i.");
                                        }
                                    }), React.createElement(qn, {
                                        text: "i)",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\\i)");
                                        }
                                    }), React.createElement(qn, {
                                        text: "I.",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\\I.");
                                        }
                                    }), React.createElement(qn, {
                                        text: "I)",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\\I)");
                                        }
                                    })));
    }
}
var er = {
    position: "absolute",
    left: 0,
    top: 25,
    border: "1px solid lightgray",
    padding: "10px 7px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000
};
var tr = {
    display: "flex",
    flexDirection: "row"
};
class Jn extends ExpandableComponentB {
    constructor() {
        super(...arguments);
        this.handleSelectSingleBullet = (e) => {
            this.props.onSingleBulletSelect(e);
        };
        this.handleOrderListSelect = (e) => {
            e.stopPropagation();
            e.preventDefault();
            var t = this.props;
            var n = t.listType;
            var r = t.indentIndex;
            if (LineHelper.isOrderListType(n, r)) {
                this.props.onListItemOrderSelect("none");
            } else {
                this.props.onListItemOrderSelect("order");
            }
        };
    }
    renderExpandComponent() {
        return React.createElement(Qn, {
            onSelectSingleBullet: this.handleSelectSingleBullet,
            onSelectBullets: this.props.onListItemOrderSelect
        });
    }
    renderComponent() {
        var e = this.props;
        var t = e.listType;
        var n = e.indentIndex;
        var r = {
            padding: 3,
            border: "1px solid transparent",
            margin: -1
        };
        return LineHelper.isOrderListType(t, n) && (r = _.assignIn({},
            r, {
            background: "white",
            border: "1px solid lightgray"
        })),
            React.createElement("div", {
                title: TooltipData.getToolTipByKey("ordered-list").value,
                className: "toolbar__item-with-option",
                style: {
                    paddingRight: 3
                }
            },
                React.createElement("i", {
                    style: r,
                    className: "fa fa-list-ol",
                    onMouseDown: this.handleOrderListSelect
                }), React.createElement("i", {
                    className: "fa fa-caret-down toolbar__item-with-option__caret",
                    "aria-hidden": "true"
                }));
    }
    getStyle() {
        return {
            display: "inline-block"
        };
    }
}
class $n extends React.Component {
    renderItemContent(e, t) {
        return React.createElement(jn, {
            data: e,
            onSelect: () => {
                return this.props.onSelectBullets(t);
            }
        });
    }
    render() {
        return React.createElement("div", {
            style: er
        },
            React.createElement("div", {
                style: {
                    fontSize: "0.9em",
                    textAlign: "center",
                    paddingBottom: 5
                }
            },
                "Change Templates for related lines"), React.createElement("div", {
                    style: tr
                },
                    this.renderItemContent(["\u2022", "\u2013", "\u2013", "*", "\u2022"], ["\u2022", "\u2013", "*", "\u00b7"]), this.renderItemContent(["\u2756", "\u27a2", "\u27a2", "\u25a0", "\u2756"], ["\u2756", "\u27a2", "\u25a0", "\u25cf"]), this.renderItemContent(["\u274f", "\u274f", "\u274f", "\u274f", "\u274f"], ["\u274f", "\u274f", "\u274f", "\u274f"])), React.createElement("div", {
                        style: tr
                    },
                        this.renderItemContent(["\u2794", "\u25c6", "\u25c6", "\u25cf", "\u2794"], ["\u2794", "\u25c6", "\u25cf", "\u25cb"]), this.renderItemContent(["\u2605", "\u25cb", "\u25cb", "\u25a0", "\u2605"], ["\u2605", "\u25cb", "\u25a0", "\u25cf"]), this.renderItemContent(["\u27a2", "\u25cb", "\u25cb", "\u25a0", "\u27a2"], ["\u27a2", "\u25cb", "\u25a0", "\u25cf"])), React.createElement("div", {
                            style: {
                                fontSize: "0.9em",
                                textAlign: "center",
                                paddingTop: 5,
                                paddingBottom: 5
                            }
                        },
                            "Change List Item for selected lines"), React.createElement("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "row"
                                }
                            },
                                React.createElement(qn, {
                                    text: "\u2605",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u2605");
                                    }
                                }), React.createElement(qn, {
                                    text: "\u2022",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u2022");
                                    }
                                }), React.createElement(qn, {
                                    text: "\u2013",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u2013");
                                    }
                                }), React.createElement(qn, {
                                    text: "*",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("*");
                                    }
                                }), React.createElement(qn, {
                                    text: "\u2756",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u2756");
                                    }
                                }), React.createElement(qn, {
                                    text: "\u27a2",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u27a2");
                                    }
                                }), React.createElement(qn, {
                                    text: "\u25a0",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u25a0");
                                    }
                                }), React.createElement(qn, {
                                    text: "\u25cf",
                                    onSelect: () => {
                                        return this.props.onSelectSingleBullet("\u25cf");
                                    }
                                })), React.createElement("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "row"
                                    }
                                },
                                    React.createElement(qn, {
                                        text: "\u274f",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\u274f");
                                        }
                                    }), React.createElement(qn, {
                                        text: "\u2794",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\u2794");
                                        }
                                    }), React.createElement(qn, {
                                        text: "\u25cb",
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("\u25cb");
                                        }
                                    }), React.createElement(qn, {
                                        text: "More ...",
                                        style: {
                                            width: 62,
                                            color: "#4CAF50"
                                        },
                                        onSelect: () => {
                                            return this.props.onSelectSingleBullet("More");
                                        }
                                    })));
    }
}
class nr extends ExpandableComponentB {
    constructor() {
        super(...arguments);
        this.handleSelectSingleBullet = (e) => {
            this.props.onSingleBulletSelect(e);
        };
        this.handleOrderListSelect = (e) => {
            e.stopPropagation();
            e.preventDefault();
            var t = this.props;
            var n = t.listType;
            var r = t.indentIndex;
            if (LineHelper.isUnOrderListType(n, r)) {
                this.props.onListItemUnOrderSelect("none");
            } else {
                this.props.onListItemUnOrderSelect("unorder");
            }
        };
    }
    renderExpandComponent() {
        return React.createElement($n, {
            onSelectSingleBullet: this.handleSelectSingleBullet,
            onSelectBullets: this.props.onListItemUnOrderSelect
        });
    }
    renderComponent() {
        var e = this.props;
        var t = e.listType;
        var n = e.indentIndex;
        var r = {
            padding: 3,
            border: "1px solid transparent",
            margin: -1
        };
        return LineHelper.isUnOrderListType(t, n) && (r = _.assignIn({},
            r, {
            background: "white",
            border: "1px solid lightgray"
        })),
            React.createElement("div", {
                title: TooltipData.getToolTipByKey("unordered-list").value,
                className: "toolbar__item-with-option",
                style: {
                    paddingRight: 3
                }
            },
                React.createElement("i", {
                    style: r,
                    className: "fa fa-list-ul",
                    onMouseDown: this.handleOrderListSelect
                }), React.createElement("i", {
                    className: "fa fa-caret-down toolbar__item-with-option__caret",
                    "aria-hidden": "true"
                }));
    }
    getStyle() {
        return {
            display: "inline-block"
        };
    }
}
var ir = {
    width: "1.6em",
    display: "inline-block",
    verticalAlign: "-5px",
    marginRight: 5,
    marginBottom: -4
};
var or = _.assignIn({},
    ir, {
    transform: "scaleX(-1)"
});
var sr = [{
    value: "ltr",
    display: React.createElement("span", null, "Text Left to Right"),
    icon: React.createElement("span", {
        style: or
    },
        ToolbarIcons.textDirectionRight)
},
{
    value: "rtl",
    display: React.createElement("span", null, "Text Right to Left"),
    icon: React.createElement("span", {
        style: ir
    },
        ToolbarIcons.textDirectionRight)
}];
var lr = {
    display: "inline-block",
    cursor: "pointer",
    height: 15,
    position: "relative",
    width: 19
};
class ar extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSectionSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setLineSection(this.props.lineInfo.listType);
        };
        this.handleListItemOrderSelect = (e) => {
            this.props.triggers.setLineList(e);
        };
        this.handleListItemUnOrderSelect = (e) => {
            this.props.triggers.setLineList(e);
        };
        this.handleIndentSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.triggers.indent();
        };
        this.handleOutdentSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.triggers.outdent();
        };
        this.handleAlignLeftSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if ("image-caption" != this.props.renderRequestType && "table-caption" != this.props.renderRequestType) {
                this.changeAlign("left");
            } else {
                StyleHelper.lineStyleContext("align", () => {
                    this.changeAlign("left");
                });
            }
        };
        this.handleAlignCenterSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.changeAlign("center");
        };
        this.handleAlignRightSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.changeAlign("right");
        };
        this.handleAlignJustifySelect = (e) => {
            if (Global.supportTextJustify()) {
                e.preventDefault();
                e.stopPropagation();
                this.changeAlign("justify");
            }
        };
        this.handleTextDirection = (e) => {
            this.props.triggers.onTextDirectionSelect(e);
        };
    }
    shouldComponentUpdate(e) {
        return e.editorModel != this.props.editorModel || e.renderRequestType != this.props.renderRequestType || e.selected != this.props.selected;
    }
    changeAlign(e) {
        if ("latex-table" != this.props.renderRequestType) {
            this.props.triggers.changeLineAlign(e, this.props.selected.lineIndex);
        } else {
            this.props.triggers.changeCellAlign(e);
        }
    }
    setLineSection(e) {
        if ("section" != e) {
            this.props.triggers.setLineList("section");
        } else {
            this.props.triggers.setLineList("none");
        }
    }
    getAlignClassName(e, t) {
        return classNames({
            selected: e === t
        });
    }
    isIndentDisabled() {
        if ("root-list-bullet" == this.props.renderRequestType) {
            return true;
        }
        var e = this.props.lineInfo;
        return e.indentIndex >= e.maxIndentIndex;
    }
    isOutdentDisabled() {
        return "root-list-bullet" == this.props.renderRequestType || this.props.lineInfo.indentIndex <= 0;
    }
    getSectionIcon() {
        return React.createElement("svg", {
            style: {
                width: "15px",
                height: "15px",
                fontSize: 6.5
            }
        },
            React.createElement("text", {
                x: "2",
                y: "6.5"
            },
                "1."), React.createElement("text", {
                    x: "2",
                    y: "13.5"
                },
                    "1.2."));
    }
    renderListItemIndentSetting() {
        if ("root-list-item" != this.props.renderRequestType && "root" != this.props.renderRequestType && "root-list-bullet" != this.props.renderRequestType) {
            return null;
        }
        var e = this.props.lineInfo;
        var t = e.listType;
        var n = e.indentIndex;
        var r = classNames("fa fa-indent", {
            disabled: this.isIndentDisabled()
        });
        var a = classNames("fa fa-outdent", {
            disabled: this.isOutdentDisabled()
        });
        return [React.createElement("v-separator", {
            key: "0"
        }), React.createElement("list-items-options", {
            key: "1",
            class: this.getGroupSettingClass()
        },
            this.renderSectionItem(t), React.createElement(Jn, {
                onSingleBulletSelect: this.props.triggers.onSingleBulletSelect,
                indentIndex: n,
                listType: t,
                onListItemOrderSelect: this.handleListItemOrderSelect
            }), React.createElement(nr, {
                onSingleBulletSelect: this.props.triggers.onSingleBulletSelect,
                indentIndex: n,
                listType: t,
                onListItemUnOrderSelect: this.handleListItemUnOrderSelect
            })), React.createElement("v-separator", {
                key: "2"
            }), React.createElement("indent-outdent-options", {
                key: "3",
                class: this.getGroupSettingClass()
            },
                React.createElement("i", {
                    className: a,
                    onMouseDown: this.handleOutdentSelect,
                    title: TooltipData.getToolTipByKey("decrease-indent").value
                }), React.createElement("i", {
                    className: r,
                    onMouseDown: this.handleIndentSelect,
                    title: TooltipData.getToolTipByKey("increase-indent").value
                }))];
    }
    renderSectionItem(e) {
        return React.createElement("section-item-wrapper", {
            style: lr,
            title: TooltipData.getToolTipByKey("section").value
        },
            React.createElement("x-wrap", {
                class: classNames({
                    selected: "section" == e,
                    disabled: "root-list-bullet" == this.props.renderRequestType
                }),
                onMouseDown: this.handleSectionSelect
            },
                this.getSectionIcon()));
    }
    getGroupSettingClass() {
        return MobileTabletClasses.addMobileTabletClssIfRequired("setting-group-options");
    }
    renderSetting() {
        return !this.props.selected && this.lastRenderSettings ? this.lastRenderSettings : (this.lastRenderSettings = React.createElement("x-detail", null, this.renderAlignOptions(), this.renderListItemIndentSetting()/*, this.renderMoreSettings()*/), this.lastRenderSettings);
    }
    renderMoreSettings() {
        return [React.createElement("v-separator", {
            key: "0"
        }), React.createElement(LabelItemContainer, {
            key: "1",
            containerStyle: {
                width: 150
            },
            caret: false,
            label: "...",
            style: {
                marginLeft: 4,
                color: "gray",
                fill: "gray"
            },
            labelStyle: {
                paddingTop: 0,
                lineHeight: "1.5em",
                paddingBottom: 1
            },
            items: sr,
            onItemSelect: this.handleTextDirection
        })];
    }
    renderUnsupportJustificationText() {
        return Global.supportTextJustify() ? null : React.createElement("div", {
            className: "unsupport-justification-text tool-bar-text",
            style: {
                position: "absolute",
                top: "100%",
                margintop: 5,
                color: "orange",
                background: "white",
                border: "1px solid lightgray",
                textAlign: "center",
                fontSize: 13,
                padding: 3,
                width: 130
            }
        },
            "Justification is only supported in Chrome");
    }
    renderAlignOptions() {
        var e = "root" == this.props.renderRequestType || "table" == this.props.renderRequestType || "text-mode-grouping" == this.props.renderRequestType || "underline-section" == this.props.renderRequestType || "image-caption" == this.props.renderRequestType || "table-caption" == this.props.renderRequestType || "latex-table" == this.props.renderRequestType;
        var t = classNames({
            disabled: !e
        });
        var n = classNames({
            disabled: !e || !Global.supportTextJustify()
        });
        var r = StyleHelper.getLineAlign(this.props.lineInfo, "left");
        return React.createElement("align-options", {
            class: this.getGroupSettingClass()
        },
            React.createElement("div", {
                title: "Left Align",
                className: classNames("toolbar_svg-icon-wrapper role-align-left-item", t, this.getAlignClassName(r, "left")),
                onMouseDown: e ? this.handleAlignLeftSelect : undefined
            },
                ToolbarIcons.alignLeft), React.createElement("div", {
                    title: "Center Align",
                    className: classNames("toolbar_svg-icon-wrapper role-align-center-item", t, this.getAlignClassName(r, "center")),
                    onMouseDown: e ? this.handleAlignCenterSelect : undefined
                },
                    ToolbarIcons.alignCenter), React.createElement("div", {
                        title: "Right Align",
                        className: classNames("toolbar_svg-icon-wrapper role-align-right-item", t, this.getAlignClassName(r, "right")),
                        onMouseDown: e ? this.handleAlignRightSelect : undefined
                    },
                        ToolbarIcons.alignRight), React.createElement("div", {
                            title: "Justify Align",
                            className: classNames("toolbar_svg-icon-wrapper role-align-justify-item toolbar-container", n, this.getAlignClassName(r, "justify")),
                            onMouseDown: e ? this.handleAlignJustifySelect : undefined
                        },
                            ToolbarIcons.alignJustify, this.renderUnsupportJustificationText()));
    }
    renderDisabledLayer(e) {
        if (e) {
            return React.createElement("disabled-layer", null);
        }
    }
    render() {
        var e = this.props;
        var t = e.selected;
        var n = e.renderRequestType;
        return React.createElement("line-setting", null, this.renderSetting(), this.renderDisabledLayer(!t || "none" == n));
    }
}
class LineTableSettingsHandler {
    constructor(e) {
        this.target = e;
        this.runLaterObj = TimerHelper.createLaterRunObject("latest", "a-little-while", true);
        this.handleLineSetting = () => {
            this.runLaterObj.later(this.handleLineSettingRunLaterFunc);
        };
        this.handleTextDirectionSelect = (e) => {
            var t = this.target;
            var n = t.getController().setLineStyle(t.getContainerModel(), "textDirection", e);
            t.handleResult(n);
        };
        this.handleChangeCellAlign = (e) => {
            var t = this.target.getContainerModel();
            this.target.handleResult(this.target.getController().setTabularEditorsStyle(t, "align", e));
        };
        this.handleLineSettingRunLaterFunc = () => {
            if (!this.target.unMounted) {
                var e = this.target.getContainerModel();
                if (!e.isDiagramSelected) {
                    if (this.isNoSelect()) {
                        this.requestRenderDisabledLineSettings();
                    } else {
                        if (!e.isCursorControlled || e.isListBulletSelected()) {
                            this.requestRenderTableToolbar(e);
                            this.requestRenderLineSettings(e);
                        } else {
                            this.requestRenderDisabledLineSettings();
                        }
                    }
                }
            }
        };
        this.handleTableSettingsChange = (e, t) => {
            var n = this.target.getContainerModel();
            this.target.handleResult(this.target.getController().setTabularEditorsStyle(n, e, t));
        };
        this.handleAddCaption = () => {
            var e = this.target.getContainerModel();
            this.target.handleResult(this.target.getController().addTableCaption(e));
        };
        this.handleSpecialSymbolSelected = (e) => {
            if (e) {
                var t = this.target;
                var n = t.getController().setBulletLine(t.getContainerModel(), e);
                t.handleResult(n);
            }
        };
        this.handleSingleBulletSelect = (e) => {
            var t = this.target;
            if ("More" != e) {
                var n = t.getController().setBulletLine(t.getContainerModel(), e);
                t.handleResult(n);
            } else {
                t.showSpecialSymbolDialog("single", this.handleSpecialSymbolSelected);
            }
        };
        this.onSetLineList = (e) => {
            var t = this.target;
            var n = t.getController().setLineStyle(t.getContainerModel(), "listType", e);
            t.handleResult(n);
        };
        this.onChangeLineAlign = (e) => {
            var t = this.target;
            var n = t.getController().setLineStyle(t.getContainerModel(), "align", e);
            t.handleResult(n);
        };
        this.onIndentLine = () => {
            var e = this.target;
            var t = e.getController().indentLine(e.getContainerModel());
            e.handleResult(t);
        };
        this.onOutdentLine = () => {
            var e = this.target;
            var t = e.getController().outdentLine(e.getContainerModel());
            e.handleResult(t);
        };
        this.lineSettingTriggers = {
            changeLineAlign: this.onChangeLineAlign,
            setLineList: this.onSetLineList,
            onSingleBulletSelect: this.handleSingleBulletSelect,
            indent: this.onIndentLine,
            outdent: this.onOutdentLine,
            changeCellAlign: this.handleChangeCellAlign,
            onTextDirectionSelect: this.handleTextDirectionSelect
        };
        this.nullLineInfo = {
            align: "left",
            indentIndex: 0,
            listType: "none",
            maxIndentIndex: StyleHelper.getMaxLineIndentLevel()
        };
    }
    requestRenderTableToolbar(e) {
        if (e.isTableSelected()) {
            var t = this.target.getController().getIntersectTabularEditorStyle(e);
            this.target.requestRenderToolBarComponent({
                type: "add",
                key: "TableSettings",
                component: React.createElement(Kn, {
                    onAddCaption: this.handleAddCaption,
                    onChanged: this.handleTableSettingsChange,
                    editorStyle: t
                })
            });
        } else { }
    }
    getSelectedLine() {
        var e = this.target.state.mainModel;
        var t = this.target.getSafeSelected();
        return t ? BlockHelper.getSelectedLineFromRoot(e, t) : {
            blocks: []
        };
    }
    getSelectedCell() {
        var e = this.target.state.mainModel;
        var t = this.target.getSafeSelected();
        var n = BlockHelper.findTabularBlock(e, t);
        return n ? n.elements[BlockHelper.findLeafParentSelected(t).key] : null;
    }
    getLineInfoWithAlignNoIndent(e) {
        return {
            listType: "none",
            maxIndentIndex: StyleHelper.getMaxIndentLevelByListType("none"),
            align: StyleHelper.getLineStyle(e, "align", "left"),
            indentIndex: StyleHelper.getLineTempOrStoreIndent(e, 0)
        };
    }
    requestRenderLineSettings(e) {
        var t = "none";
        var n = this.nullLineInfo;
        if (e.isListBulletSelected()) {
            t = "root-list-bullet";
        } else {
            if (e.isRootLineSelected()) {
                t = "root";
                var r = this.getSelectedLine();
                var a = StyleHelper.getLineStyle(r, "listType");
                if (a && "none" != a) {
                    t = "root-list-item";
                }
                n = {
                    listType: a,
                    maxIndentIndex: StyleHelper.getMaxIndentLevelByListType(a),
                    align: StyleHelper.getLineStyle(r, "align", "left"),
                    indentIndex: StyleHelper.getLineTempOrStoreIndent(r, 0)
                };
            } else {
                if (e.isTableSelected()) {
                    t = "table";
                    n = this.getLineInfoWithAlignNoIndent(this.getSelectedLine());
                } else {
                    if (e.isInsideLatexTable()) {
                        var i = this.getSelectedCell();
                        if (i) {
                            t = "latex-table";
                            n = {
                                listType: "none",
                                maxIndentIndex: StyleHelper.getMaxIndentLevelByListType("none"),
                                align: StyleHelper.getLatexTableCellStyle(i, "align"),
                                indentIndex: 0
                            };
                        }
                    } else {
                        if (e.isAtTextModeGroup()) {
                            t = "text-mode-grouping";
                            n = this.getLineInfoWithAlignNoIndent(this.getSelectedLine());
                        } else {
                            if (e.isAtUnderlineSection()) {
                                t = "underline-section";
                                n = this.getLineInfoWithAlignNoIndent(this.getSelectedLine());
                            } else {
                                if (e.isAtImageCaption()) {
                                    t = "image-caption";
                                    n = this.getLineInfoWithAlignNoIndent(this.getSelectedLine());
                                } else {
                                    if (e.isAtTableCaption()) {
                                        t = "table-caption";
                                        n = this.getLineInfoWithAlignNoIndent(this.getSelectedLine());
                                    } else {
                                        if (e.isInsideDiagram() && e.isTextModeSelected()) {
                                            t = "inside-diagram-text";
                                            n = this.getLineInfoWithAlignNoIndent(this.getSelectedLine());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.target.requestRenderToolBarComponent({
            type: "add",
            key: "LineSettings",
            component: React.createElement(ar, {
                renderRequestType: t,
                editorModel: this.target.state.mainModel,
                selected: this.target.getSafeSelected(),
                triggers: this.lineSettingTriggers,
                lineInfo: n
            })
        });
    }
    requestRenderDisabledLineSettings() {
        this.target.requestRenderToolBarComponent({
            type: "add",
            key: "LineSettings",
            component: React.createElement(ar, {
                renderRequestType: "none",
                editorModel: this.target.state.mainModel,
                selected: this.target.getSafeSelected(),
                triggers: this.lineSettingTriggers,
                lineInfo: this.nullLineInfo
            })
        });
    }
    isNoSelect() {
        return !this.target.getSafeSelected();
    }
}
/*n.d(t, "a", function () {
    return LineTableSettingsHandler;
})*/

export default LineTableSettingsHandler