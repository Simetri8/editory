import _ from 'lodash';
import classNames from 'classnames';
import Hammer from 'hammerjs';
import jQuery from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import Global from '../Global';
import TimerHelper from '../Mathcha/TimerHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(1602) /*ToolbarHandler*/

/// var i = n(0)/*React*/;  // 12 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 1 times
/// var d = n.n(c);
/// var h = n(23)/*PropTypesExporter*/;  // 4 times
/// var u = n.n(h);
/// var m = n(4)/*DOMHelper*/;  // 1 times
/// var C = n(2)/*lodash*/;  // 6 times
/// var x = n.n(C);
/// var hn = n.n(dn);
/// var ye = n(5)/*sizzle*/;  // 4 times
/// var Ae = n.n(ye);
/// var ee = n(11)/*Global*/;  // 9 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var cn = n(24)/*EventHelper*/;  // 1 times
/// var dn = n(245)/*hammer*/;  // 1 times
/// var vn = n(37)/*ToolbarIcons*/;  // 4 times
var fa = {
    flexGrow: 1
};
var ga = {
    flexGrow: 1,
    position: "fixed",
    width: "77px",
    top: "35px",
    zIndex: 1e9,
    height: "43px",
    display: "block",
    right: "0",
    background: "#f7f7f7",
    boxShadow: "1px 1px 1px 0px #e0dddd",
    border: "1px lightgray solid"
};
var ya = {
    float: "right",
    height: 22,
    marginLeft: 0
};
var Aa = {
    float: "right",
    height: 22
};
var Ea = {
    float: "right",
    height: 22,
    marginLeft: 0,
    display: "none"
};
var va = {
    float: "right",
    height: 22,
    display: "none"
};
var ToolbarScrollHammer = new class {
    registerScroll(e, t) {
        var n = new Hammer(e, {
            presets: ["pan"]
        });
        var r = 0;
        n.on("panstart panmove panend pancancel", (n) => {
            if (!t()) {
                n.preventDefault();
                var a = e.firstElementChild.style;
                if ("panstart" == n.type && (r = Number.parseInt(a.left || "0", 10)), "panend" == n.type) {
                    var i = Number.parseInt(a.left || "0", 10);
                    if (Math.abs(1e3 * n.velocityX) > 100 || i > 0 || i < -500) {
                        if (n.deltaX < 0) {
                            var o = i - Math.abs(1e3 * n.velocityX) / 7;
                        } else {
                            o = i + Math.abs(1e3 * n.velocityX) / 7;
                        }
                        o = _.clamp(o, -500, 0);
                        jQuery(e.firstElementChild).animate({
                            left: o
                        },
                            300);
                    }
                }
                a.left = _.clamp(r + n.deltaX, -600, 100) + "px";
            }
        });
        return n;
    }
};
class ToolbarComponentHandler {
    constructor(e) {
        this.mathOptionOnly = e;
        this.componentMap = {};
    }
    requestComponent(e, t) {
        this.componentMap[e] = t;
        this.lastRequestComponent = {
            key: e,
            component: t
        };
    }
    removeComponent(e) {
        this.componentMap[e] = void 0;
        if (this.lastRequestComponent && this.lastRequestComponent.key === e) {
            this.lastRequestComponent = null;
        }
    }
    clearCycle() {
        this.componentMap = {
            LineSettings: this.componentMap.LineSettings,
            SelectionSettings: this.componentMap.SelectionSettings
        };
    }
    renderAndEndCycle() {
        var e = this.render();
        return this.clearCycle(),
            e;
    }
    render() {
        if (this.lastRequestComponent) {
            this.componentMap[this.lastRequestComponent.key] = this.lastRequestComponent.component;
        }
        if (this.componentMap.TableSettings) {
            return this.renderLayout(["LineSettings", "TableSettings", "SelectionSettings"]);
        } else {
            if (this.componentMap.DiagramSettings) {
                return this.renderLayout(["DiagramSettings"]);
            } else {
                if (this.mathOptionOnly) {
                    return this.renderLayout(["SelectionSettings"]);
                }
                return this.renderLayout(["LineSettings", "SelectionSettings"]);
            }
        }
    }
    renderLayout(e) {
        return _.map(e, (e) => {
            if (this.componentMap[e]) {
                return React.createElement("tool-bar-item", {
                    key: e
                },
                    React.createElement("tool-bar-item-separator", null), this.componentMap[e]);
            }
        });
    }
}
var Ia = {
    fill: "lightgray",
    border: "1px solid transparent",
    cursor: "default"
};
class ToolBar extends React.Component {
    constructor(e) {
        super(e);
        this.shouldIgnoreScrolling = false;
        this.refreshToolbarDelayRunObj = TimerHelper.createLaterRunObject("first-request", 1);
        this.unMounted = false;
        this.onTouchStart = (e) => {
            if (e.nativeEvent.handledTouchStart) {
                this.shouldIgnoreScrolling = true;
            } else {
                this.shouldIgnoreScrolling = false;
            }
        };
        this.handleWindowResize = () => {
            this.requestForceUpdate(100);
        };
        this.forceUpdateDelayRunFunc = () => {
            if (!this.unMounted) {
                this.forceUpdate();
            }
        };
        this.handleUndo = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onUndoRequest();
        };
        this.handleRedo = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onRedoRequest();
        };
        this.componentHandler = new ToolbarComponentHandler(e.mathOptionOnly);
    }
    componentDidMount() {
        if (!this.props.style) {
            jQuery(window).on("resize", this.handleWindowResize);
            this.registerScroll();
        }
    }
    registerScroll() {
        if (Global.isMobileOrTablet()) {
            var e = ReactDOM.findDOMNode(this);
            this.scrollHammer = ToolbarScrollHammer.registerScroll(e, () => {
                return this.shouldIgnoreScrolling;
            });
        }
    }
    unregisterScroll() {
        if (Global.isMobileOrTablet()) {
            this.scrollHammer.off("panstart panmove panend pancancel");
        }
    }
    componentWillUnmount() {
        jQuery(window).off("resize", this.handleWindowResize);
        this.unregisterScroll();
        this.unMounted = true;
    }
    shouldComponentUpdate(e) {
        return e.canUndo != this.props.canUndo || e.selectOnly != this.props.selectOnly || e.canRedo != this.props.canRedo;
    }
    updateUndoRedo(e, t) {
        if (!(this.canUndo === e && this.canRedo === t)) {
            this.canUndo = e;
            this.canRedo = t;
            this.requestForceUpdate(200);
        }
    }
    requestForceUpdate() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.refreshToolbarDelayRunObj.later(this.forceUpdateDelayRunFunc, e);
    }
    requestRender(e) {
        switch (e.type) {
            case "add":
                this.componentHandler.requestComponent(e.key, e.component);
                break;
            case "remove":
                this.componentHandler.removeComponent(e.key);
        }
        this.requestForceUpdate(100);
    }
    renderRequestedComponent() {
        return this.componentHandler.renderAndEndCycle();
    }
    getUndoRedoComponent() {
        if (this.props.mathOptionOnly || this.props.hideUndoRedo) {
            return null;
        }
        var e = Global.shouldUseSmallLayout();
        var t = e ? ga : fa;
        var n = e ? Ea : ya;
        var r = e ? va : Aa;
        var a = this.canUndo ? {} : _.clone(Ia);
        var i = this.canRedo ? {} : _.clone(Ia);
        var s = {
            float: "right",
            paddingTop: 11,
            paddingRight: 4
        };
        return e && (s = {
            float: "right",
            paddingTop: 12,
            paddingRight: 8
        },
            a.paddingTop = 7, i.paddingTop = 7),
            React.createElement("div", {
                style: t
            },
                React.createElement("tool-bar-item-separator", {
                    style: n
                }), React.createElement("div", {
                    style: s
                },
                    React.createElement("span", {
                        title: "Undo",
                        className: "undo-redo-span",
                        onMouseDown: this.handleUndo,
                        style: a
                    },
                        e ? ToolbarIcons.undoMobile : ToolbarIcons.undo), React.createElement("span", {
                            title: "Redo",
                            className: "undo-redo-span",
                            onMouseDown: this.handleRedo,
                            style: i
                        },
                            e ? ToolbarIcons.redoMobile : ToolbarIcons.redo)), React.createElement("tool-bar-item-separator", {
                                style: r
                            }));
    }
    getStyle() {
        if (this.props.style) {
            return this.props.style;
        }
        var e = {
            paddingLeft: 0
        };
        if (!Global.shouldUseSmallLayout() && this.context) {
            var t = this.context.getEditorInfo();
            if (t.mathTypeRef) {
                e.justifyContent = "flex-start";
                var n = DOMHelper.getElementRect(t.mathTypeRef);
                var r = n.left + n.width / 2;
                e.paddingLeft = Math.max(r - 370, 0);
                var a = jQuery(window).width();
                var i = Global.isMobileOrTablet() ? 1.3 : 1;
                e.paddingLeft = _.clamp(e.paddingLeft, 0, a - 740 * i);
            }
        }
        return e;
    }
    getContainerStyle() {
        if (this.props.style) {
            return {
                display: "flex",
                justifyContent: "initial",
                width: "auto",
                minWidth: "auto"
            };
        }
        var e = {};
        return Global.shouldUseSmallLayout() && (e.justifyContent = "flex-start"),
            e;
    }
    render() {
        var e = this.getUndoRedoComponent();
        var t = classNames({
            "mobile-tablet": Global.isMobileOrTablet(),
            "select-only": this.props.selectOnly
        });
        return React.createElement("tool-bar", {
            //style: this.getStyle(),
            class: t,
            onTouchStart: this.onTouchStart,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
            React.createElement("too-bar-container", {
                style: this.getContainerStyle()
            },
                this.renderRequestedComponent(), Global.shouldUseSmallLayout() ? null : e), Global.shouldUseSmallLayout() ? e : null);
    }
}
ToolBar.contextTypes = {
    getEditorInfo: PropTypes.any,
    mathFontSizeBase: PropTypes.any,
    selectFromPos: PropTypes.any,
    requestRenderToolBarComponent: PropTypes.any
};
class ToolbarHandler {
    constructor(e) {
        this.target = e;
        this.getToolbarRef = (e) => {
            this.toolBar = e;
        };
        this.requestRenderToolBarComponent = (e) => {
            if (this.toolBar) {
                this.toolBar.requestRender(e);
            }
        };
        this.handleUndoRequest = () => {
            this.target.handleResult(this.target.getController().requestUndo());
        };
        this.handleRedoRequest = () => {
            this.target.handleResult(this.target.getController().requestRedo());
        };
    }
    renderToolBar(e) {
        var t = this.target.props;
        if (t.toolbarEnabled || !this.target.isRestrictedView() && !this.target.isReadOnly()) {
            var n = React.createElement(ToolBar, {
                mathOptionOnly: t.toolbarMathOptionOnly,
                forceEnabled: t.toolbarEnabled,
                hideUndoRedo: t.hideUndoRedo,
                style: t.toolbarStyle,
                selectOnly: this.target.isSelectOnly(),
                onUndoRequest: this.handleUndoRequest,
                onRedoRequest: this.handleRedoRequest,
                ref: this.getToolbarRef
            });
            if (!e) {
                return n;
            }
            e(n);
        }
    }
    updateUndoRedoState() {
        if (this.toolBar) {
            var e = this.target.getController();
            this.toolBar.updateUndoRedo(e.canUndo(), e.canRedo());
        }
    }
    isToolBarReady() {
        return !!this.toolBar;
    }
}
/*n.d(t, "a", function () {
    return ToolbarHandler;
})*/

export default ToolbarHandler