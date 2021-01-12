import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';
import Api from './Api';
import LoginDialog from './LoginDialog';
import MathGlobal from './MathGlobal';
import ModalDialogContainer from './Editor/ModalDialogContainer';
import ModalDialogHelper from './Editor/ModalDialogHelper';
import PageDispatches from './PageDispatches';
import PageStates from './PageStates';
import UserPopup from './UserPopup';

/// xxx(1547) /*PageHeader*/

/// var k = n(0)/*React*/;  // 39 times
/// var B = n.n(k);
/// var Ue = n(14)/*classnames*/;  // 1 times
/// var We = n.n(Ue);
/// var redux = n(1544)/*Rdx*/;  // 1 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 2 times
/// var states = n(1549)/*PageStates*/;  // 6 times
/// var Be = n(88)/*ModalDialogHelper*/;  // 1 times
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var Pa = n(28)/*MathGlobal*/;  // 9 times
/// var api = n(1542)/*Api*/;  // 2 times
/// var userPopup = n(1586)/*UserPopup*/;  // 1 times
/// var loginDialog = n(1587)/*LoginDialog*/;  // 1 times
var modalDialog = ModalDialogHelper.getModalDialog();
var mapStateToProps = (e) => {
    return {
        activeDocumentOverview: PageStates.activeDocumentOverview(e),
        isInitialized: PageStates.isInitialized(e),
        isAnonymousUser: PageStates.isAnonymousUser(e),
        userDisplayName: PageStates.userDisplayName(e),
        isDocumentLoading: PageStates.isDocumentLoading(e),
        saveStatus: PageStates.saveStatus(e)
    };
}
var mapDispatchToProps = {
    requestNodeRename: PageDispatches.requestNodeRename,
    requestSaveDocument: PageDispatches.requestSaveDocument
}
class PageHeaderComponent extends React.Component {
    constructor(e) {
        super(e);
        this.onLogout = (e) => {
            this.setState({
                showLogoutDialog: true,
                logoutProcessing: true,
                logoutErrorMessage: ""
            });
            if (e || "unsave" != this.props.saveStatus) {
                this.sendLogoutRequest();
            } else {
                this.props.requestSaveDocument();
                setTimeout(() => {
                    this.sendLogoutRequest();
                },
                1E3);
            }
        };
        this.onLogoutCancel = () => {
            this.setState({
                showLogoutDialog: false
            });
        };
        this.onWindowMinimizeClick = () => {
            if (window.onWindowMinimizeClick) {
                window.onWindowMinimizeClick();
            }
        };
        this.onWindowMaximizeClick = () => {
            if (window.onWindowMaximizeClick) {
                window.onWindowMaximizeClick();
            }
        };
        this.onWindowCloseClick = () => {
            if (window.onWindowCloseClick) {
                window.onWindowCloseClick();
            }
        };
        this.handleDoubleClick = () => {
            if (MathGlobal.headerDoubleClickToToggleMaximize()) {
                Api.Get("/api/commands/header-toggle-maximize");
            }
        };
        this.state = {
            showUserPopup: false,
            showLoginDialog: false,
            showLogoutDialog: false,
            logoutErrorMessage: "",
            logoutProcessing: false
        };
    }
    sendLogoutRequest() {
        Api.Get("/logout").then((e) => {
            return e.json();
        }).then((x) => {
            var e = x.JSON || x;
            if (e.isSuccessful) {
                window.location.reload();
            } else {
                this.setState({
                    logoutProcessing: false,
                    logoutErrorMessage: "Internal error"
                });
            }
        }).
        catch((e) => {
            var t = e.message;
            this.setState({
                logoutProcessing: false,
                logoutErrorMessage: t
            });
        });
    }
    renderWindowControls() {
        if (!MathGlobal.windowControls()) {
            return null;
        }
        var e = {
            width: 25,
            height: 12,
            display: "block"
        };
        var t = {
            cursor: "pointer",
            paddingTop: 4,
            paddingBottom: 4
        };
        return React.createElement("div", {
            className: "windows-controls",
            style: {
                position: "absolute",
                right: 10,
                top: 0,
                bottom: 0,
                alignItems: "center",
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("div", {
            onClick: this.onWindowMinimizeClick,
            className: "windows-control",
            style: t
        },
        React.createElement("svg", {
            style: e,
            viewBox: "0 0 512 512"
        },
        React.createElement("path", {
            d: "M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
        }))), React.createElement("div", {
            onClick: this.onWindowMaximizeClick,
            className: "windows-control",
            style: t
        },
        React.createElement("svg", {
            style: e,
            viewBox: "0 0 512 512"
        },
        React.createElement("path", {
            d: "M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V192h416v234z"
        }))), React.createElement("div", {
            onClick: this.onWindowCloseClick,
            className: "windows-control close",
            style: t
        },
        React.createElement("svg", {
            style: e,
            viewBox: "0 0 512 512"
        },
        React.createElement("path", {
            d: "M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
        }))));
    }
    renderAccountSection() {
        if (!this.props.isInitialized) {
            return null;
        }
        if (MathGlobal.accountFeatureDisabled()) {
            return null;
        }
        var e = {
            width: MathGlobal.shouldUseSmallLayout() ? 50 : void 0
        };
        if (this.props.isAnonymousUser) {
            return React.createElement("login-name", {
                style: e,
                class: "need-login"
            },
            React.createElement("display-name", {
                onMouseDown: () => {
                    return this.setState({
                        showLoginDialog: true
                    });
                }
            },
            "Login"), React.createElement(modalDialog, {
                show: this.state.showLoginDialog
            },
            React.createElement(LoginDialog, {
                show: this.state.showLoginDialog,
                onClose: () => {
                    return this.setState({
                        showLoginDialog: false
                    });
                }
            })));
        }
        var t = null;
        var n = null;
        if (this.state.showUserPopup) {
            t = React.createElement(UserPopup, {
                onClose: () => {
                    return this.setState({
                        showUserPopup: false
                    });
                },
                onLogout: this.onLogout
            });
        }
        if (this.state.showLogoutDialog) {
            n = React.createElement(ModalDialogContainer, {
                message: this.state.logoutErrorMessage,
                isProgressing: this.state.logoutProcessing,
                onCancel: this.onLogoutCancel,
                show: this.state.showLogoutDialog,
                className: "logout-dialog"
            },
            React.createElement("logout-dialog", null, "Logging out..."));
        }
        var r = MathGlobal.shouldUseSmallLayout() ? "" : this.props.userDisplayName;
        return React.createElement("login-name", {
            style: e
        },
        React.createElement("display-name", {
            onClick: () => {
                return this.setState({
                    showUserPopup: true
                });
            }
        },
        React.createElement("i", {
            className: "fa fa-user",
            "aria-hidden": "true",
            style: {
                paddingRight: 3
            }
        }), r), t, n);
    }
    renderLogo() {
        return MathGlobal.shouldUseSmallLayout() ? null : MathGlobal.hideMenu() ? React.createElement("x-logo", null) : React.createElement("x-logo", null, React.createElement("x-index", null, React.createElement("svg", {
            x: "0px",
            y: "0px",
            width: "189px",
            height: "222px",
            viewBox: "0 0 189 222",
            enableBackground: "new 0 0 189 222"
        },
        React.createElement("g", null, React.createElement("path", {
            fill: "white",
            d: "M149.737,86.424l-0.283-1.701c-0.351-2.062-1.969-3.504-3.621-3.227l-95.247,16.01l2.228,13.222\n\t\tl6.139-1.028c2.186-0.37,4.33,1.541,4.786,4.265l4.315,25.66c0.455,2.725-0.943,5.234-3.129,5.605l-20.587,3.45\n\t\tc-2.186,0.371-4.33-1.545-4.791-4.264l-4.311-25.655c-0.461-2.729,0.943-5.239,3.129-5.6l6.139-1.028l-2.228-13.227l-33.078,5.561\n\t\tc-1.657,0.278-2.71,2.169-2.364,4.226l0.577,3.436c6.329,37.645,28.229,68.378,54.817,77.288\n\t\tc-3.602,0.79,64.913-10.722,61.268-10.293c5.156-3.982,9.708-8.973,13.544-14.787c8.202-1.993,18.359-5.692,26.874-11.239\n\t\tc19.197-12.53,21.029-28.257,19.188-39.252C179.827,94.422,167.429,84.299,149.737,86.424z M147.062,142.691\n\t\tc3.641-11.809,5.269-25.1,4.625-38.931c15.167-2.076,16.937,8.412,17.608,12.409C171.337,128.309,159.558,137.262,147.062,142.691z\n\t\t"
        })), React.createElement("g", {
            transform: "matrix(2.654321,0,0,-2.654321,-230.92593,1554.3519)"
        },
        React.createElement("path", {
            id: "alpha_13_",
            fill: "#4CAF50",
            d: "M128.54,547.009l3.507,0.589l-0.54-9.787c-0.108-1.862-0.209-3.009-0.294-3.439\n\t\tc0.969-2.405,1.976-3.518,3.018-3.344c1.24,0.209,1.737,1.157,1.495,2.85l0.742,0.125c0.22-1.583,0.145-2.899-0.235-3.962\n\t\tc-0.378-1.063-1.006-1.667-1.884-1.818c-0.731-0.119-1.324,0.075-1.777,0.604c-0.455,0.525-1.043,1.653-1.757,3.39\n\t\tc-0.935-3.21-3.015-5.092-6.263-5.641c-2.216-0.375-4.117,0.185-5.709,1.667s-2.655,3.814-3.189,6.992\n\t\tc-0.524,3.12-0.219,5.67,0.918,7.646c1.139,1.976,2.71,3.134,4.722,3.474c1.418,0.239,2.66-0.064,3.737-0.903\n\t\tc1.074-0.839,2.152-2.315,3.232-4.442L128.54,547.009z M128.064,538.724c-1.012,2.077-2.022,3.658-3.024,4.756\n\t\tc-1.003,1.094-2.061,1.548-3.174,1.362c-2.516-0.424-3.29-3.538-2.311-9.346c0.928-5.51,2.595-8.066,5-7.662\n\t\tc2.093,0.354,3.23,3.041,3.415,8.07L128.064,538.724z"
        })), React.createElement("path", {
            fill: "white",
            d: "M33.594,198.661c-0.838,0.853,0.059,3.548,1.134,5.507c1.062,1.959,1.896,4.654,2.738,5.508\n\tc0.5,0.497,1.185,0.809,1.942,0.809h120.145c0.755,0,1.438-0.316,1.93-0.813c0.839-0.849,1.667-3.539,2.739-5.503\n\tc1.067-1.959,1.974-4.649,1.131-5.507c-0.497-0.507-1.18-0.819-1.949-0.819H35.536C34.775,197.847,34.094,198.164,33.594,198.661z"
        }), React.createElement("path", {
            fill: "white",
            d: "M62.391,51.572c-2.866,2.968-11.578,11.975-8.13,21.005C58.304,83.149,76,83.89,79.509,83.929\n\tc0.234,0,0.454-0.015,0.668-0.054c1.933-0.322,3.383-2.135,3.349-4.333c-0.034-2.452-1.896-4.469-4.162-4.484\n\tc-6.319-0.073-16.205-2.14-17.553-5.678c-0.634-1.657,0.699-5.488,6.318-11.302c7.392-7.647,10.226-13.125,9.478-18.315\n\tc-0.863-5.946-5.925-8.846-11.278-11.921c-5.6-3.211-11.39-6.531-13.86-13.3c-0.839-2.295-3.197-3.47-5.325-2.627\n\tc-2.096,0.848-3.119,3.402-2.28,5.702c3.623,9.923,11.818,14.617,17.786,18.042c2.971,1.701,6.652,3.816,6.862,5.239\n\tC69.586,41.377,69.571,44.15,62.391,51.572z"
        }), React.createElement("path", {
            fill: "white",
            d: "M73.285,62.913c0.005,2.452,1.845,4.479,4.106,4.542c1.353,0.039,2.914-0.063,4.562-0.336\n\tc8.585-1.442,19.802-7.715,19.816-24.846c0.01-2.456-1.822-4.499-4.086-4.571c-2.291-0.098-4.092,1.862-4.097,4.303\n\tC93.562,58.386,79.005,58.62,77.348,58.586C75.081,58.547,73.28,60.472,73.285,62.913z"
        }))));
    }
    isDocumentWriteable(e) {
        return e && (!e.notOwner || !!e.writeable);
    }
    isDocumentReadonly(e) {
        return !this.isDocumentWriteable(e);
    }
    render() {
        var e = !(this.isDocumentReadonly(this.props.activeDocumentOverview) || this.props.isAnonymousUser || this.props.isDocumentLoading);
        var t = {
            paddingTop: "10px"
        };
        if (MathGlobal.shouldUseSmallLayout()) {
            t.right = "40px";
            t.left = 90;
        }
        var n = void 0;
        return MathGlobal.isMobileOrTablet() && e && (n = () => {
            this.props.requestNodeRename(this.props.activeDocumentOverview.id);
        }),
        React.createElement("header", {
            id: "page-header",
            onDoubleClick: this.handleDoubleClick
        },
        this.renderLogo(), React.createElement("document-name", {
            onTouchStart: n,
            onMouseDown: n,
            style: t
        },
        React.createElement("display-name", null, React.createElement("span", {
            title: this.props.activeDocumentOverview && this.props.activeDocumentOverview.name
        },
        React.createElement("div", {
            className: classNames("rename-icon", {
                hide: !e
            }),
            onMouseDown: () => {
                return this.props.requestNodeRename(this.props.activeDocumentOverview.id);
            }
        },
        React.createElement("i", {
            className: "fa fa-i-cursor",
            "aria-hidden": "true"
        }), React.createElement("i", {
            className: "fa fa-font",
            "aria-hidden": "true"
        })), this.props.activeDocumentOverview ? this.props.activeDocumentOverview.name : ""))), this.renderAccountSection(), this.renderWindowControls());
    }
}
var PageHeader = connect(mapStateToProps, mapDispatchToProps, null)(PageHeaderComponent);
/*n.d(t, "a", function () {
    return PageHeader;
});*/

export default PageHeader