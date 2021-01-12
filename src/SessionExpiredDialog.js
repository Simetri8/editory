import React from 'react';
import ReactDOM from 'react-dom';
import ModalDialogContainer from './Editor/ModalDialogContainer';
import ModalDialogHelper from './Editor/ModalDialogHelper';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1570) /*SessionExpiredDialog*/

/// var k = n(0)/*React*/;  // 6 times
/// var B = n.n(k);
/// var He = n(16)/*ReactDOM*/;  // 1 times
/// var _e = n.n(He);
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var n19 = n(19)/*TimerHelper*/;  // 1 times
/// var Be = n(88)/*ModalDialogHelper*/;  // 1 times
var Bo = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    color: "orange",
    fontSize: 13,
    padding: 10,
    textAlign: "center"
};
var No = ModalDialogHelper.getModalDialog();
class SessionExpiredDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.onOk = () => {
            window.location.reload();
        };
        this.onCancel = () => {
            this.props.onIgnore();
        };
    }
    componentDidMount() {
        TimerHelper.waitALitteWhile(() => {
            ReactDOM.findDOMNode(this).focus();
        });
    }
    render() {
        return React.createElement("div", {
            tabIndex: -1,
            style: {
                outline: "none"
            }
        },
        React.createElement(No, {
            show: true
        },
        React.createElement(ModalDialogContainer, {
            style: {
                width: 440,
                height: 120,
                top: 140
            },
            message: "",
            isProgressing: false,
            isOkDisabled: false,
            onOk: this.onOk,
            onCancel: this.onCancel,
            cancelLabel: "Continue to Edit",
            okLabel: "Reload",
            centerButtons: true,
            cancelStyle: {
                width: 120,
                height: 24
            },
            okStyle: {
                width: 120,
                height: 24
            },
            show: true
        },
        React.createElement("content", {
            style: Bo
        },
        React.createElement("i", {
            className: "fa fa-exclamation-triangle",
            style: {
                textAlign: "center",
                fontSize: 20,
                paddingBottom: 10
            },
            "aria-hidden": "true"
        }), "Your session has expired,please refresh page and login again"))));
    }
}
/*n.d(t, "a", function () {
    return SessionExpiredDialog;
});*/

export default SessionExpiredDialog