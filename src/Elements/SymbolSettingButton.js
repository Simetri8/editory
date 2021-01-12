import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import Global from '../Global';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(106) /*SymbolSettingButton*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 9 times
/// var o = n.n(i);
/// var s = n(7)/*PropUpdateHelper*/;  // 1 times
/// var l = n(11)/*Global*/;  // 1 times
/// var c = n(16)/*ReactDOM*/;  // 2 times
/// var d = n.n(c);
/// var h = n(19)/*TimerHelper*/;  // 1 times
/// var p = n(14)/*classnames*/;  // 1 times
/// var m = n.n(p);
/*n.d(t, "a", function () {
    return g
});*/
class u extends React.Component {
    constructor() {
        super(...arguments);
        this.rootMouseDown = false;
        this.handleDocumentMouseDown = () => {
            if (!this.rootMouseDown) this.props.onClose()
        };
        this.handleRootMouseDown = () => {
            this.rootMouseDown = true;
            TimerHelper.next(() => {
                this.rootMouseDown = false
            })
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleDocumentMouseDown);
        ReactDOM.findDOMNode(this).addEventListener("mousedown", this.handleRootMouseDown)
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);
        ReactDOM.findDOMNode(this).removeEventListener("mousedown", this.handleRootMouseDown)
    }
    render() {
        return this.props.style ? React.cloneElement(this.props.children, {
            style: this.props.style
        }) : this.props.children
    }
}
var f = new class {
    register(e, t, n) {
        this.duration = e;
        this.data = t;
        this.key = n;
        if (this.timeoutID) clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => {
            this.data = null;
            this.timeoutID = null;
            this.key = null
        },
        this.duration)
    }
    retrieveData() {
        return this.timeoutID && (clearTimeout(this.timeoutID), this.timeoutID = null),
        this.data
    }
    getKey() {
        return this.key
    }
};
class g extends React.Component {
    constructor(e) {
        super(e);
        this.onMouseDown = (e) => {
            this.setState({
                showChildren: true
            });
            if (this.props.onExpandDetail) this.props.onExpandDetail();
            e.stopPropagation();
            e.preventDefault();
            if (this.props.onBulbMouseLeave) this.props.onBulbMouseLeave(e.currentTarget)
        };
        this.onBulbMouseEnter = (e) => {
            if (this.props.onBulbMouseEnter) {
                this.isMouseEnter = true;
                this.lastMouseEnterTarget = e.currentTarget;
                this.props.onBulbMouseEnter(e.currentTarget)
            }
        };
        this.onBulbMouseLeave = (e) => {
            if (this.props.onBulbMouseLeave) {
                this.isMouseEnter = false;
                this.props.onBulbMouseLeave(e.currentTarget)
            }
        };
        this.handleClose = () => {
            this.closeChildren()
        };
        this.state = {
            showChildren: false,
            left: void 0,
            top: void 0
        }
    }
    closeChildren() {
        this.setState({
            showChildren: false
        })
    }
    componentDidMount() {
        if (!this.state.showChildren && this.props.childPositionByBulbOriginalPos) this.originalBulbLeft = this.props.left;
        if (this.props.keepOpenTimeDuration && f.retrieveData() && this.props.keepOpenKey === f.getKey()) this.setState(f.retrieveData())
    }
    componentDidUpdate() {
        if (!this.state.showChildren && this.props.childPositionByBulbOriginalPos) this.originalBulbLeft = this.props.left
    }
    setPosition(e, t) {
        this.setState({
            left: e,
            top: t
        })
    }
    componentWillUnmount() {
        if (this.props.onBulbMouseLeave && this.isMouseEnter) this.props.onBulbMouseLeave(this.lastMouseEnterTarget);
        if (this.props.keepOpenTimeDuration) f.register(this.props.keepOpenTimeDuration, this.state, this.props.keepOpenKey)
    }
    isExpandedDetail() {
        return this.state.showChildren
    }
    collapseDetailView() {
        this.setState({
            showChildren: false
        })
    }
    render() {
        if (this.state.showChildren) {
            var e = React.Children.only(this.props.children);
            return this.props.childPositionByBulbOriginalPos && (e = React.cloneElement(e, {
                style: _.assignIn({},
                e.props.style, {
                    left: this.originalBulbLeft
                })
            })),
            this.props.childHasOnClose && (e = React.cloneElement(e, {
                onClose: this.handleClose
            })),
            this.props.closeOnClickOutside ? React.createElement(u, {
                onClose: this.handleClose
            },
            e) : e
        }
        var t = this.props.style;
        if (this.props.left) t = PropUpdateHelper.set(this.props.style || {},
        "left", this.props.left);
        if (this.props.manuallyUpdate && void 0 !== this.state.left) {
            t = _.assignIn(t, {
                left: this.state.left,
                top: this.state.top
            });
        }
        var n = classNames("no-print", {
            "mobile-tablet": Global.isMobileOrTablet(),
            smaller: this.props.smaller
        });
        return React.createElement("x-bulb", {
            className: n,
            style: t,
            onMouseLeave: this.onBulbMouseLeave,
            onMouseEnter: this.onBulbMouseEnter,
            onMouseDown: this.onMouseDown
        },
        React.createElement("i", {
            className: "fa fa-cog",
            "aria-hidden": "true"
        }))
    }
}

export default g