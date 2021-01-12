import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from '../Elements/BaseComponent';
import BlockHelper from '../Elements/BlockHelper';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import SelectionBuilder from './SelectionBuilder';
import StyleHelper from '../Mathcha/StyleHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1606) /*HyperlinkInputBoxHandler*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 18 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 2 times
/// var l = n.n(s);
/// var m = n(4)/*DOMHelper*/;  // 2 times
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 1 times
/// var Ae = n.n(ye);
/// var I = n(12)/*BlockHelper*/;  // 1 times
/// var N = n(18)/*StyleHelper*/;  // 1 times
/// var k = n(6)/*DiagramIdHelper*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 5 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var SelectionBuilder = n(1656)/*SelectionBuilder*/;  // 4 times
class HyperlinkDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.renderDelayRunObj = TimerHelper.createLaterRunObject("latest", "a-little-while");
        this.didMount = false;
    }
    componentDidMount() {
        this.didMount = true;
        this.requestDelayRender();
    }
    componentWillUnmount() {
        this.renderDelayRunObj.cancel();
    }
    shouldComponentUpdate(e) {
        return this.overrideStyle = null,
        this.requestDelayRender(e),
        false;
    }
    componentDidUpdate() {
        this.recalculatePosition();
    }
    recalculatePosition() {
        if (!this.overrideStyle) {
            var e = ReactDOM.findDOMNode(this).firstElementChild;
            if (e) {
                var t = this.props;
                var n = t.rootEditor;
                var r = t.baseElement;
                var a = DOMHelper.getElementRect(e);
                var i = DOMHelper.findRectElementToElement(n, r);
                var o = this.getSelectedRect();
                if (o) {
                    this.overrideStyle = {
                        left: _.clamp(o.left + o.width / 2, i.left + a.width / 2, i.right - a.width / 2),
                        top: o.top + o.height + 5,
                        position: "absolute",
                        transform: "translate(-50%,0)",
                        zIndex: 99999
                    };
                    this.forceUpdate();
                }
            }
        }
    }
    requestDelayRender() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
        this.renderDelayRunObj.later(() => {
            this.forceUpdate();
        },
        e.delay);
    }
    getSelectedRect() {
        var e = this.props;
        var t = e.rootEditor;
        var n = e.selected;
        var r = e.extendSelected;
        var a = e.baseElement;
        if (r && !SelectionBuilder.isSameRoute(n, r)) {
            return SelectionBuilder.buildSelectionRectsFromEditor({
                rootEditor: t,
                selected: n,
                extendSelected: r,
                elementToCalculate: a,
                type: "text-selection"
            })[0];
        }
        var i = this.props.requestCursorPosition();
        return {
            left: i.relativeGeoPosition.left,
            top: i.relativeGeoPosition.top,
            width: 1,
            height: 10,
            right: i.relativeGeoPosition.left + 1,
            bottom: i.relativeGeoPosition.top + 10
        };
    }
    render() {
        var e = this.props;
        var t = e.rootEditor;
        var n = e.baseElement;
        if (!this.didMount || !t || !n) {
            return React.createElement("div", null);
        }
        var r = this.getSelectedRect();
        if (!r) {
            return React.createElement("div", null);
        }
        var a = this.overrideStyle || {
            left: r.left + r.width / 2,
            top: r.top + r.height + 10,
            position: "absolute",
            zIndex: 99999,
            transform: "translate(-50%,0)"
        };
        return React.createElement("div", {
            style: a
        },
        this.props.requestChildren());
    }
}
var Fa = {
    marginLeft: 5
};
var Ha = {
    width: 150
};
var _a = {
    border: "1px solid lightgray",
    padding: 6,
    background: "white",
    display: "flex",
    boxShadow: "1px 1px 1px 0px #e0dddd",
    alignItems: "flex-end"
};
class HyperLinkInput extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            link: this.props.link || "",
            text: ""
        };
        this.unmounted = false;
        this.onLinkChange = (e) => {
            this.setState({
                link: e.currentTarget.value
            });
        };
        this.onTextChange = (e) => {
            this.setState({
                text: e.currentTarget.value
            });
        };
        this.applyChange = () => {
            this.props.onApply(this.state.link, this.state.text);
        };
    }
    renderText() {
        if (this.props.showText) {
            return React.createElement("input", {
                value: this.state.text,
                placeholder: "Text",
                onKeyDown: (e) => {
                    if (13 === e.keyCode) {
                        this.applyChange();
                    }
                },
                style: _.assignIn({},
                Ha, {
                    marginBottom: 5
                }),
                onChange: this.onTextChange
            });
        }
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            if (!this.unmounted) {
                var e = ReactDOM.findDOMNode(this);
                var t = jQuery(e).find("input").get(0);
                t.focus();
                t.select();
            }
        });
    }
    render() {
        return React.createElement("div", {
            style: _a,
            "data-test-name": "hyper-link-input-dialog"
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        },
        this.renderText(), React.createElement("input", {
            value: this.state.link,
            onKeyDown: (e) => {
                if (13 === e.keyCode) {
                    this.applyChange();
                }
            },
            placeholder: "Link",
            style: Ha,
            onChange: this.onLinkChange
        })), React.createElement("button", {
            style: _.assignIn({},
            Fa, {
                width: 60
            }),
            onClick: this.applyChange,
            className: "btn-normal"
        },
        "Apply"));
    }
}
var Wa = {
    marginLeft: 5
};
var Ga = {
    minWidth: 100,
    maxWidth: 250,
    fontSize: 13,
    lineHeight: "1.5em",
    color: "#1155cc",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
};
var za = {
    border: "1px solid lightgray",
    padding: 6,
    background: "white",
    display: "flex",
    boxShadow: "1px 1px 1px 0px #e0dddd"
};
class HyperLinkInfo extends React.Component {
    render() {
        return React.createElement("div", {
            style: za,
            "data-test-name": "hyper-link-info-dialog"
        },
        React.createElement("a", {
            style: Ga,
            href: this.props.link,
            target: "_blank"
        },
        this.props.link), React.createElement("button", {
            style: Wa,
            onClick: this.props.onRequestChange,
            className: "btn-normal"
        },
        "Change"), React.createElement("button", {
            style: Wa,
            onClick: this.props.onClear,
            className: "btn-normal"
        },
        "Remove"));
    }
}
class HyperlinkInputBoxHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.isExpanding = false;
        this.changeImmediately = false;
        this.onHyperLinkApply = (e, t) => {
            if (t) {
                this.insertLink(e, t);
            } else {
                this.setHyperLinkForBlock(e);
            }
            this.hideInput();
        };
    }
    renderContent() {
        var e = this.getFirstSelectedLink();
        if ("info" == this.getState().linkInputState) {
            return React.createElement(HyperLinkInfo, {
                link: e,
                onRequestChange: () => {
                    this.changeImmediately = true;
                    this.showLinkInput();
                },
                onClear: () => {
                    this.clearHyperLink();
                }
            });
        }
        var t = this.getTarget().getContainerModel();
        return React.createElement(HyperLinkInput, {
            link: e,
            onApply: this.onHyperLinkApply,
            showText: SelectionBuilder.isNoSelectionOrSameRoute(t.cursorSelected, t.extendedCursorSelected)
        });
    }
    getFirstSelectedLink() {
        var e = this.getTarget().getContainerModel();
        var t = SelectionBuilder.getFirstSelected(e.cursorSelected, e.extendedCursorSelected);
        var n = BlockHelper.getSelectedBlockFromRoot(e.model, t);
        return StyleHelper.safeGetBlockStyle(n, "hyperLink");
    }
    clearHyperLink() {
        this.expandSelection().then(() => {
            var e = this.getTarget();
            var t = e.getContainerModel();
            var n = e.getController().setStyle(t, "hyperLink", null);
            e.handleResult(n);
            TimerHelper.next(() => {
                this.hideInput();
            });
        });
    }
    render() {
        var e = this.getTarget();
        var t = React.createElement(HyperlinkDialog, {
            delay: this.changeImmediately ? 0 : 200,
            rootEditor: e.getEditorHtmlElement(),
            selected: e.getSafeSelected(),
            extendSelected: e.getSafeExtendedSelected(),
            baseElement: e.getMathTypeHtmlElement(),
            requestCursorPosition: e.getCursorPosition,
            requestChildren: () => {
                return this.renderContent();
            }
        });
        return this.changeImmediately = false,
        t;
    }
    insertLink(e, t) {
        if (t) {
            var n = this.getTarget();
            var r = {
                id: DiagramIdHelper.nextId(),
                text: t,
                style: e ? {
                    hyperLink: e
                } : void 0
            };
            var a = n.getController().insertBlock(r, n.getContainerModel());
            n.handleResult(a);
        }
    }
    setHyperLinkForBlock(e) {
        var t = this.getTarget();
        var n = t.getController().setStyle(t.getContainerModel(), "hyperLink", e);
        t.handleResult(n);
    }
    expandSelection() {
        return new Promise((e) => {
            this.isExpanding = true;
            var t = this.getTarget();
            var n = t.getContainerModel();
            var r = t.getController().expandSelectionWithSameStyle(n, "hyperLink");
            t.handleResult(r);
            TimerHelper.next(() => {
                this.isExpanding = false;
                e();
            });
        });
    }
    showLinkInput(e) {
        this.getTarget().needFocusAcquire();
        if (e) {
            this.changeImmediately = true;
        }
        this.expandSelection().then(() => {
            this.setState({
                linkInputState: "input"
            });
            TimerHelper.next(() => {
                this.getTarget().requestRender(this);
            });
        });
    }
    showLinkInfo() {
        this.getTarget().requestRender(this);
        if ("info" != this.getState().linkInputState) {
            this.setState({
                linkInputState: "info"
            });
        }
    }
    hideInput() {
        this.getTarget().closeRender(this);
    }
    handleShowingInputOnMatched(e) {
        if (e.isHyperLinkSelected()) {
            this.showLinkInfo();
            console.log("show info");
        } else {
            if (this.isExpanding) {
                return;
            }
            this.hideInput();
        }
    }
}
/*n.d(t, "a", function () {
    return HyperlinkInputBoxHandler;
})*/

export default HyperlinkInputBoxHandler