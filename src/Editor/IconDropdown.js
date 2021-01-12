import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(748) /*IconDropdown*/

/*n.d(t, "a", function () {
    return u
});*/
/// var r = n(3);  // 5 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 9 times
/// var o = n.n(i);
/// var s = n(14)/*classnames*/;  // 2 times
/// var l = n.n(s);
/// var c = n(16)/*ReactDOM*/;  // 3 times
/// var d = n(19)/*TimerHelper*/;  // 2 times
/// var h = n(76)/*MobileTabletClasses*/;  // 1 times
class u extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            open: false
        };
        this.handleIconClick = () => {
            this.setState({
                open: !this.state.open
            });
            ReactDOM.findDOMNode(this).focus()
        };
        this.handleOptionClick = (e) => {
            if (! (this.props.disabled || this.props.disabledItems && this.props.disabledItems.some((t) => {
                return t === e
            }))) {
                console.log("come here");
                this.props.onSelect(e);
                this.setState({
                    open: false
                })
            }
        };
        this.handleBlur = () => {
            TimerHelper.waitABit(() => {
                return this.setState({
                    open: false
                })
            })
        }
    }
    componentDidMount() {
        if (this.props.iconDropDownTrigger) this.props.iconDropDownTrigger.register(this)
    }
    componentWillUnmount() {
        if (this.props.iconDropDownTrigger) this.props.iconDropDownTrigger.unregister(this)
    }
    trigger() {
        this.setState({
            open: true
        });
        TimerHelper.next(() => {
            ReactDOM.findDOMNode(this).focus()
        })
    }
    renderIcon(e) {
        return e.renderIcon ? e.renderIcon() : React.createElement("i", {
            style: m,
            className: classNames("fa", e.icon)
        })
    }
    renderDropdown() {
        if (this.state.open) {
            var e = _.assignIn({},
            g, {
                color: this.props.disabled ? "lightgray" : g.color
            });
            var t = ReactDOM.findDOMNode(this);
            var n = y;
            if (t) {
                var r = t.getBoundingClientRect();
                var i = 28 * this.props.actionItems.length;
                var s = r.bottom;
                var l = r.left - MobileTabletClasses.sidebarMenuDeltaX();
                if (r.bottom + i > window.innerHeight) {
                    s = window.innerHeight - i;
                    l = r.right
                }
                n = _.assignIn({},
                n, {
                    left: l,
                    top: s
                })
            }
            return React.createElement("icon-dropdown-items", {
                style: n
            },
            this.props.actionItems.map((t, n) => {
                if (!t.name) return React.createElement("icon-item-line", {
                    key: n,
                    style: A
                });
                var r = p;
                if (!this.props.disabled && t.iconColor) r = _.assignIn({},
                p, {
                    color: t.iconColor
                });
                var i = e;
                return this.props.disabledItems && this.props.disabledItems.some((e) => {
                    return e === t.name
                }) && (i = _.assignIn({},
                e, {
                    color: "lightgray"
                })),
                React.createElement("icon-dropdown-item", {
                    name: t.name,
                    key: t.name,
                    style: i,
                    onClick: () => {
                        return this.handleOptionClick(t.name)
                    }
                },
                React.createElement("ii-icon", {
                    style: r
                },
                this.renderIcon(t)), React.createElement("span", null, t.text))
            }))
        }
    }
    render() {
        return React.createElement("icon-dropdown", {
            onBlur: this.handleBlur,
            tabIndex: -1,
            onClick: this.handleIconClick,
            style: _.assignIn({},
            f, this.props.style)
        },
        React.createElement("i", {
            title: "More",
            style: {
                padding: "5px 5px"
            },
            className: classNames("fa fa-ellipsis-v", {
                disabled: false
            }),
            "aria-hidden": "true"
        }), this.renderDropdown())
    }
}
var p = {
    width: "1.5em",
    display: "inline-block",
    padding: 0
};
var m = {
    padding: 0
};
var f = {
    outline: "none",
    position: "relative",
    float: "right",
    paddingLeft: 10,
    paddingRight: 5,
    background: "linear-gradient(to right,rgba(225,232,245,0) 0%,rgba(225,232,245,1) 40% )",
    cursor: "pointer"
};
var g = {
    display: "block",
    padding: "6px 9px",
    fontSize: "0.95em"
};
var y = {
    display: "block",
    position: "fixed",
    paddingTop: 2,
    paddingBottom: 2,
    right: 0,
    top: 20,
    background: "white",
    zIndex: 999999,
    width: "13em",
    border: "1px solid #cecbcb",
    boxShadow: "1px 1px 1px 0px #e0dddd"
};
var A = {
    height: 1,
    marginTop: 4,
    marginBottom: 3,
    borderTop: "1px solid lightgray",
    display: "block"
}

export default u