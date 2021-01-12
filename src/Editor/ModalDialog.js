import classNames from 'classnames';
import React from 'react';
import EventHelper from '../Mathcha/EventHelper';
import KeyDownEventRegisterer from '../Mathcha/KeyDownEventRegisterer';
import ModalDialogHelper from './ModalDialogHelper';

/// xxx(124) /*ModalDialog*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(0)/*React*/;  // 10 times
/// var a = n.n(r);
/// var i = n(24)/*EventHelper*/;  // 1 times
/// var o = n(88)/*ModalDialogHelper*/;  // 3 times
/// var s = n(14)/*classnames*/;  // 1 times
/// var l = n.n(s);
/// var c = n(131)/*KeyDownEventRegisterer*/;  // 2 times
class d extends React.Component {
    constructor(e) {
        super(e);
        this.handleEscape = (e) => {
            if (!this.props.preventCloseEscape) if (27 === e.keyCode && this.props.onClose) {
                this.props.onClose(true);
                e.stopOther = true
            }
        };
        this.handleOverlayMouseDown = (e) => {
            if (this.props.backDrop)(this.props.onClose || this.nope)(false);
            e.preventDefault();
            e.stopPropagation()
        };
        this.onMouseDown = (e) => {
            e.stopPropagation();
            if (this.props.onClick) this.props.onClick()
        };
        this.handleCancel = () => {
            if (this.props.onClose) this.props.onClose(false)
        };
        this.handleOverlayMouseDown = this.handleOverlayMouseDown.bind(this)
    }
    componentDidMount() {
        KeyDownEventRegisterer.stack(this.handleEscape)
    }
    componentWillUnmount() {
        ModalDialogHelper.notifyHide(this.props.preventRemoveScrollBar);
        KeyDownEventRegisterer.remove(this.handleEscape)
    }
    renderFooterContent() {
        return this.props.renderFooterContent ? this.props.renderFooterContent() : null
    }
    nope() {}
    notifyShow(e) {
        if (this.props.notifyShow) this.props.notifyShow(e);
        else if (e) ModalDialogHelper.notifyShow(this.props.preventRemoveScrollBar);
        else ModalDialogHelper.notifyHide(this.props.preventRemoveScrollBar)
    }
    getModalClassName() {
        return this.props.className
    }
    render() {
        this.notifyShow(true);
        var e = {
            opacity: this.props.opacity
        };
        return React.createElement("modal-dialog", {
            class: classNames("no-print", this.getModalClassName()),
            onDoubleClick: EventHelper.onDoubleClickStopPropagation,
            onMouseDown: this.onMouseDown
        },
        React.createElement("x-overlay", {
            onWheel: (e) => {
                return e.preventDefault()
            },
            style: e,
            onMouseDown: this.handleOverlayMouseDown
        }), React.createElement("modal-container", {
            class: "mt-common-dialog",
            style: this.props.style
        },
        React.createElement("modal-header", {
            style: this.props.headerStyle
        },
        React.createElement("header-title", null, this.props.title), React.createElement("cancel-button", {
            onClick: this.handleCancel
        },
        " ", React.createElement("i", {
            className: "fa fa-times",
            "aria-hidden": "true"
        }), " ")), React.createElement("modal-content", {
            style: this.props.contentStyle
        },
        this.props.children), React.createElement("modal-footer", {
            style: this.props.footerStyle
        },
        this.renderFooterContent())))
    }
}

export default d