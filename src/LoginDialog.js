import React from 'react';
import LoginActions from './LoginActions';
import ModalDialogContainer from './Editor/ModalDialogContainer';

/// xxx(1587) /*LoginDialog*/

/// var k = n(0)/*React*/;  // 13 times
/// var B = n.n(k);
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var loginActions = n(1550)/*LoginActions*/;  // 1 times
class LoginDialog extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            isProgressing: false
        };
    }
    loginWith(e) {
        LoginActions.login(e);
    }
    renderDialog() {
        if (this.props.show) {
            return React.createElement(ModalDialogContainer, {
                centerButtons: true,
                noLabel: "Cancel",
                message: "",
                isProgressing: this.state.isProgressing,
                onCancel: this.props.onClose,
                show: this.props.show,
                className: "login-dialog"
            },
            React.createElement("login-dialog", null, React.createElement("x-message", null, "Please login with"), React.createElement("a", {
                target: "_blank",
                onMouseDown: () => {
                    return this.loginWith("fce");
                },
                className: "btn btn-block btn-socl btn-sm btn-fce"
            },
            React.createElement("span", {
                className: "fa fa-fce"
            }), " Sign in with Facebook"), React.createElement("a", {
                target: "_blank",
                onMouseDown: () => {
                    return this.loginWith("gg");
                },
                className: "btn btn-block btn-socl btn-sm btn-gg"
            },
            React.createElement("span", {
                className: "fa fa-gg"
            }), " Sign in with Google"), React.createElement("a", {
                target: "_blank",
                onMouseDown: () => {
                    return this.loginWith("twr");
                },
                className: "btn btn-block btn-socl btn-sm btn-twr"
            },
            React.createElement("span", {
                className: "fa fa-twr"
            }), " Sign in with Twitter"), React.createElement("a", {
                target: "_blank",
                onMouseDown: () => {
                    return this.loginWith("gh");
                },
                className: "btn btn-block btn-socl btn-sm btn-gh"
            },
            React.createElement("span", {
                className: "fa fa-gh"
            }), " Sign in with GitHub")));
        }
    }
    render() {
        return React.createElement("div", null, this.renderDialog());
    }
}
/*n.d(t, "a", function () {
    return LoginDialog;
});*/

export default LoginDialog