import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import BaseComponent from '../Elements/BaseComponent';
import Global from '../Global';

/// xxx(1604) /*MessageBoxHandler*/

/// var i = n(0)/*React*/;  // 10 times
/// var o = n.n(i);
/// var c = n(14)/*classnames*/;  // 1 times
/// var d = n.n(c);
/// var h = n(23)/*PropTypesExporter*/;  // 1 times
/// var u = n.n(h);
/// var ee = n(11)/*Global*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
class MessageBoxContainer extends React.Component {
    constructor(e) {
        super(e);
        this.onClose = this.onClose.bind(this);
    }
    onClose() {
        this.setState({
            isShow: false
        });
        this.props.onClose();
    }
    renderWarningIcon() {
        if ("warning" == this.props.type) {
            return React.createElement("i", {
                className: "fa fa-warning"
            });
        }
    }
    renderErrorIcon() {
        if ("error" == this.props.type) {
            return React.createElement("i", {
                className: "fa fa-times-circle",
                "aria-hidden": "true"
            });
        }
    }
    renderInfoIcon() {
        if ("info" == this.props.type) {
            return React.createElement("i", {
                className: "fa fa-info-circle",
                "aria-hidden": "true"
            });
        }
    }
    componentWillReceiveProps(e) {
        this.setState({
            isShow: e.show
        });
    }
    render() {
        var e = this.props.show ? "show" : "hide";
        var t = {
            warning: "warning-effect",
            error: "error-effect",
            info: "info-effect"
        } [this.props.type];
        var n = classNames("message-box-container center", t, e, {
            "is-android": Global.isAndroid()
        });
        return React.createElement("div", {
            style: {
                marginLeft: this.props.leftSideBarWidth / 2
            },
            className: n
        },
        React.createElement("div", {
            className: "message-icon "
        },
        this.renderWarningIcon(), this.renderErrorIcon(), this.renderInfoIcon()), React.createElement("div", {
            className: "message "
        },
        JSON.stringify(this.props.message)), React.createElement("div", {
            className: "close-icon",
            onClick: this.onClose
        },
        React.createElement("i", {
            className: "fa fa-times",
            "aria-hidden": "true"
        })));
    }
}
MessageBoxContainer.contextTypes = {
    getEditorInfo: PropTypes.any
};
class MessageBoxHandler extends BaseComponent {
    constructor(e) {
        super(e);
        this.onMessageBoxClose = () => {
            this.setState({
                isMessageBoxShow: false
            });
        };
    }
    renderMessageBox() {
        var e = this.getState();
        return e.isMessageBoxShow ? this.getTarget().isReadOnly() || this.getTarget().isRestrictedView() ? void 0 : React.createElement(MessageBoxContainer, {
            leftSideBarWidth: this.getTarget().getLeftSideBarWidth(),
            type: e.messageBoxType,
            message: e.boxMessage,
            show: e.isMessageBoxShow,
            onClose: this.onMessageBoxClose
        }) : null;
    }
    showError(e) {
        this.setState({
            boxMessage: e,
            isMessageBoxShow: true,
            messageBoxType: "error"
        });
    }
    showInfo(e) {
        this.setState({
            boxMessage: e,
            isMessageBoxShow: true,
            messageBoxType: "info"
        });
    }
    clearMessage() {
        this.setState({
            boxMessage: "",
            isMessageBoxShow: false,
            messageBoxType: "info"
        });
    }
    showMessage(e, t) {
        this.setState({
            boxMessage: e,
            isMessageBoxShow: true,
            messageBoxType: t
        });
    }
}
/*n.d(t, "a", function () {
    return MessageBoxHandler;
})*/

export default MessageBoxHandler