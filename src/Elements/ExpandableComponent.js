import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ArrayHelper from '../Mathcha/ArrayHelper';
import CursorHandler from '../Editor/CursorHandler';
import EventHelper from '../Mathcha/EventHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(69) /*ExpandableComponent*/

/*n.d(t, "b", function () {
    return p
}),*/
/*n.d(t, "a", function () {
    return m
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 3 times
/// var o = n.n(i);
/// var s = n(85)/*CursorHandler*/;  // 1 times
/// var l = n(43)/*ArrayHelper*/;  // 1 times
/// var c = n(5)/*sizzle*/;  // 3 times
/// var d = n.n(c);
/// var h = n(24)/*EventHelper*/;  // 1 times
/// var u = n(19)/*TimerHelper*/;  // 2 times
class p extends React.Component {
    constructor(e) {
        super(e);
        this.onMouseDown = (e => {
            if (!this.state.expand) {
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().build());
                TimerHelper.waitABit(() => {
                    this.component.focus()
                })
            }
            this.setState({
                expand: !this.state.expand
            })
        });
        this.onFocus = (e => {
            this.inFocus = !0;
            e.preventDefault();
            e.stopPropagation();
            var t = ReactDOM.findDOMNode(this);
            jQuery(t).trigger("custom-focus")
        });
        this.handleCustomFocus = (() => {
            this.inFocus = !0
        });
        this.onLostFocus = (e => {
            this.inFocus = !1;
            this.preventCloseOnLostFocus || TimerHelper.next(() => {
                this.inFocus || this.state.expand && this.setState({
                    expand: !1
                })
            })
        });
        this.onItemSelect = ((e, t) => {
            if (t) {
                t.stopPropagation();
                t.preventDefault()
            }
            this.setState({
                expand: !1
            });
            this.props.onItemSelect(e)
        });
        this.onExpandContainerMouseDown = (e => { });
        this.handleRef = (e => {
            this.component = e
        });
        this.state = {
            expand: !1
        }
    }
    shouldComponentUpdate(e, t) {
        return t.expand != this.state.expand || ArrayHelper.areEqualShallow(e.style, this.props.style)
    }
    closeExpand() {
        this.setState({
            expand: !1
        })
    }
    componentDidMount() {
        var e = ReactDOM.findDOMNode(this);
        jQuery(e).on("custom-focus", this.handleCustomFocus)
    }
    componentWillUnmount() {
        var e = ReactDOM.findDOMNode(this);
        jQuery(e).off("custom-focus", this.handleCustomFocus)
    }
    getComponentClassName() {
        return ""
    }
    renderExpandContainer() {
        if (this.state.expand) return React.createElement("div", {
            role: "expand-container",
            onMouseDown: this.onExpandContainerMouseDown
        },
            this.renderExpandComponent())
    }
    getStyle() {
        return this.props.style
    }
    render() {
        return React.createElement("expandable-component", {
            style: this.getStyle(),
            title: this.props.title || this.title,
            tabIndex: -1,
            ref: this.handleRef,
            class: this.getComponentClassName(),
            onMouseDown: this.onMouseDown,
            onFocus: this.onFocus,
            onBlur: this.onLostFocus
        },
            this.renderExpandContainer(), this.renderComponent())
    }
}
var m = e => {
    var t = e.children;
    return React.createElement("item-options", {
        style: f
    },
        t)
},
    f = {
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "0",
        top: "26px",
        background: "white",
        border: "1px solid lightgray",
        boxShadow: "1px 1px 1px 0px #e0dddd",
        padding: "3px"
    }

export { p as ExpandableComponentB }

export default m