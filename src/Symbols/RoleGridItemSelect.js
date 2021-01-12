import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ScrollTo from '../Mathcha/ScrollTo';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(334) /*RoleGridItemSelect*/

/*n.d(t, "a", function () {
    return p
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 4 times
/// var o = n.n(i);
/// var s = n(107)/*ScrollTo*/;  // 2 times
/// var l = n(19)/*TimerHelper*/;  // 1 times
/// var c = n(14)/*classnames*/;  // 1 times
/// var d = n.n(c);
/// var h = n(5)/*sizzle*/;  // 4 times
/// var u = n.n(h);
class p extends React.Component {
    constructor() {
        super(...arguments);
        this.lastSelectedInfo = null;
        this.currentMaxColumn = -1;
        this.handleItemMouseEnter = (e, t) => {
            this.props.onSelect({
                item: e,
                group: t
            })
        };
        this.handleItemMouseLeave = (e, t) => {};
        this.handleKeyDown = (e) => {
            var t = this.props;
            var n = t.onKeyDown;
            var r = t.onCommit;
            var a = t.selected;
            var i = {
                handled: false
            };
            if (n && n(e, i), !i.handled) return 13 === e.keyCode ? (r && r(a), e.preventDefault(), void e.stopPropagation()) : 38 === e.keyCode ? (this.goUp(), e.preventDefault(), void e.stopPropagation()) : 40 === e.keyCode ? (this.goDown(), e.preventDefault(), void e.stopPropagation()) : 37 === e.keyCode ? (this.goLeft(), e.preventDefault(), void e.stopPropagation()) : 39 === e.keyCode ? (this.goRight(), e.preventDefault(), void e.stopPropagation()) : void 0
        }
    }
    goLeft() {
        var e = this.props;
        var t = e.selected;
        var n = e.groups;
        var r = e.onSelect;
        var a = e.numberOfItemsPerLine;
        var i = t || this.lastSelectedInfo;
        if (i) {
            var o = n.findIndex((e) => {
                return e === i.group
            });
            var s = n[o].items.findIndex((e) => {
                return e === i.item
            });
            if (! (o <= 0 && s <= 0)) {
                if (s <= 0) {
                    var l = n[o - 1];
                    return this.currentMaxColumn = (l.items.length - 1) % a,
                    void r({
                        group: l,
                        item: l.items[l.items.length - 1]
                    })
                }
                var c = n[o];
                this.currentMaxColumn = (s - 1) % a;
                r({
                    group: c,
                    item: c.items[s - 1]
                })
            }
        }
    }
    goRight() {
        var e = this.props;
        var t = e.selected;
        var n = e.groups;
        var r = e.onSelect;
        var a = e.numberOfItemsPerLine;
        var i = t || this.lastSelectedInfo;
        if (i) {
            var o = n.findIndex((e) => {
                return e === i.group
            });
            var s = n[o].items.findIndex((e) => {
                return e === i.item
            });
            var l = n[o];
            if (! (o >= n.length - 1 && s >= l.items.length - 1)) {
                if (s >= l.items.length - 1) {
                    var c = n[o + 1];
                    return this.currentMaxColumn = 0,
                    void r({
                        group: c,
                        item: c.items[0]
                    })
                }
                this.currentMaxColumn = (s + 1) % a;
                r({
                    group: l,
                    item: l.items[s + 1]
                })
            }
        }
    }
    goUp() {
        var e = this.props;
        var t = e.selected;
        var n = e.groups;
        var r = e.onSelect;
        var a = e.numberOfItemsPerLine;
        var i = t || this.lastSelectedInfo;
        if (i) {
            var o = n.findIndex((e) => {
                return e === i.group
            });
            var s = n[o].items.findIndex((e) => {
                return e === i.item
            });
            var l = Math.floor(s / a);
            var c = Math.max(l * a + this.currentMaxColumn, s);
            if (l <= 0) {
                var d = n[o - 1];
                if (!d) return;
                var h = Math.ceil(d.items.length / a);
                var u = Math.min(c % a + (h - 1) * a, d.items.length - 1);
                r({
                    group: d,
                    item: d.items[u]
                })
            } else {
                var p = n[o];
                var m = Math.max(c - a, 0);
                r({
                    group: p,
                    item: p.items[m]
                })
            }
        }
    }
    goDown() {
        var e = this.props;
        var t = e.selected;
        var n = e.groups;
        var r = e.onSelect;
        var a = e.numberOfItemsPerLine;
        var i = t || this.lastSelectedInfo;
        if (i) {
            var o = n.findIndex((e) => {
                return e === i.group
            });
            var s = n[o].items.findIndex((e) => {
                return e === i.item
            });
            var l = Math.ceil(n[o].items.length / a);
            var c = Math.floor(s / a);
            var d = Math.max(c * a + this.currentMaxColumn, s);
            if (c >= l - 1) {
                var h = n[o + 1];
                if (!h) return;
                var u = Math.min(d % a, h.items.length - 1);
                r({
                    group: h,
                    item: h.items[u]
                })
            } else {
                var p = n[o];
                var m = Math.min(d + a, p.items.length - 1);
                r({
                    group: p,
                    item: p.items[m]
                })
            }
        }
    }
    componentDidMount() {
        TimerHelper.next(() => {
            this.focus()
        });
        var e = ReactDOM.findDOMNode(this);
        ScrollTo.registerEventToFixScroll(jQuery(e).get(0))
    }
    componentWillUnmount() {
        var e = ReactDOM.findDOMNode(this);
        ScrollTo.unregisterEventToFixScroll(jQuery(e).get(0))
    }
    focus() {
        ReactDOM.findDOMNode(this).focus()
    }
    componentDidUpdate(e) {
        if (e.selected && (this.lastSelectedInfo = e.selected), this.props.selected != e.selected) {
            if (!this.props.selected) return;
            var t = ReactDOM.findDOMNode(this);
            var n = jQuery(t);
            var r = jQuery(t).find(".role-item-selected");
            var a = n.get(0).getBoundingClientRect();
            var i = r.get(0).getBoundingClientRect();
            if (i.top <= a.top) {
                n.finish();
                n.animate({
                    scrollTop: n.scrollTop() - (a.top - i.top) - 40
                })
            } else if (i.bottom >= a.bottom) {
                n.finish();
                n.animate({
                    scrollTop: n.scrollTop() + (i.bottom - a.bottom) + 40
                })
            }
        }
    }
    render() {
        var e = this.props;
        var t = e.groups;
        var n = e.renderGroupName;
        var r = e.renderItem;
        var i = e.itemContainerStyle;
        var o = e.itemContainerStyleSelected;
        var s = e.selected;
        var l = e.lastSelected;
        return React.createElement("div", {
            className: "role-grid-item-select",
            tabIndex: -1,
            onKeyDown: this.handleKeyDown,
            style: {
                display: "flex",
                flexDirection: "column",
                paddingBottom: 5,
                outline: "none",
                overflowY: "auto",
                overflowX: "hidden",
                height: "100%"
            }
        },
        t.map((e) => {
            return React.createElement("div", {
                key: e.name,
                style: {
                    display: "flex",
                    flexDirection: "column"
                }
            },
            n(e), React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingLeft: 5,
                    paddingRight: 5
                }
            },
            e.items.map((t, n) => {
                var c = i;
                var h = s && s.group === e && s.item === t;
                var u = l && l.group === e && l.item === t;
                return h && (c = o || m),
                u && (c = o || m),
                React.createElement("div", {
                    key: n,
                    style: c,
                    className: classNames("role-item", {
                        "role-item-selected": h
                    }),
                    onMouseDown: () => {
                        return this.props.onCommit && this.props.onCommit({
                            group: e,
                            item: t
                        })
                    },
                    onMouseEnter: () => {
                        return this.handleItemMouseEnter(t, e)
                    },
                    onMouseLeave: () => {
                        return this.handleItemMouseLeave(t, e)
                    }
                },
                r(t, e, h))
            })))
        }))
    }
}
var m = {
    background: "#bfe4bd"
}

export default p