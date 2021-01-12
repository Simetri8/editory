import _ from 'lodash';
import React from 'react';
import Api, { ServerResponseTypes } from './Api';
import ModalDialogContainer from './Editor/ModalDialogContainer';

/// xxx(1576) /*LicenseCheck*/

/// var k = n(0)/*React*/;  // 61 times
/// var B = n.n(k);
/// var Pe = n(3);  // 3 times
/// var Fe = n.n(Pe);
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 25 times
class LicenseCheckContent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tempLicenseCode: null,
            messageInfo: {
                type: "info",
                message: ""
            }
        };
        this.handleDetailsClick = () => {
            this.setState({
                serverErrorDetails: _.assignIn({},
                this.state.serverErrorDetails, {
                    show: !this.state.serverErrorDetails.show
                })
            });
        };
        this.handleInputChanged = (e) => {
            this.setState({
                tempLicenseCode: (e.currentTarget.value || "").trim()
            });
        };
        this.handleRequestLicenseUpdate = () => {
            this.setState({
                isReinputLicenseCode: true,
                tempLicenseCode: this.props.licenseData.lcs || ""
            });
        };
        this.handleVerification = () => {
            if (this.state.messageInfo.isChecking) {
                console.log("Is Checking,Ignore");
            } else {
                this.setState({
                    messageInfo: {
                        type: "info",
                        message: "Checking...",
                        isChecking: true
                    }
                });
                Api.Post("/api/license-register", this.state.tempLicenseCode).then((e) => {
                    return e.json();
                }).then(this.handleServerResponse).
                finally(() => {
                    return this.setState({
                        messageInfo: _.assignIn({},
                        this.state.messageInfo, {
                            isChecking: false
                        })
                    });
                });
            }
        };
        this.handleServerResponse = (x) => {
            var e = x.JSON || x;
            switch (e.type) {
            case ServerResponseTypes.Valid:
                this.setState({
                    messageInfo: {
                        type: "ok",
                        message: "License Valid!"
                    },
                    isReinputLicenseCode: false
                });
                this.props.onLicenseDataChanged(e);
                break;
            case ServerResponseTypes.LicenseExpired:
                this.setState({
                    messageInfo: {
                        type: "warning",
                        message: "Requested License Code is expired!,please try another one"
                    }
                });
                break;
            case ServerResponseTypes.ServerResponseError:
                this.setState({
                    messageInfo: {
                        type: "error",
                        message: e.msg
                    }
                });
                break;
            case ServerResponseTypes.LicenseInvalid:
                this.setState({
                    messageInfo: {
                        type: "error",
                        message: "License Invalid,please try another one"
                    }
                });
                break;
            case ServerResponseTypes.LicenseCheckingError:
                console.log("License Server Response --------------------------------------------");
                console.log(e.msg);
                console.log("END --------------------------------------------");
                this.setState({
                    messageInfo: {
                        type: "error",
                        message: "Something wrong,please check your internet connection"
                    },
                    serverErrorDetails: {
                        show: false,
                        details: e.msg
                    }
                });
                break;
            case ServerResponseTypes.ServerResponseLicenseCorrupted:
                this.setState({
                    messageInfo: {
                        type: "error",
                        message: "Something wrong with response from server,please try again"
                    }
                });
            }
            if (null == this.state.tempLicenseCode && e.lcs) {
                this.setState({
                    tempLicenseCode: e.lcs
                });
            }
            if (e.type != ServerResponseTypes.LicenseCheckingError) {
                this.setState({
                    serverErrorDetails: null
                });
            }
            if (this.state.messageInfo.isChecking) {
                this.setState({
                    messageInfo: _.assignIn({},
                    this.state.messageInfo, {
                        isChecking: false,
                        message: ""
                    })
                });
            }
        };
        this.handleInputKeydown = (e) => {
            if (13 === e.keyCode) {
                this.handleVerification();
            }
        };
    }
    componentWillReceiveProps(e) {
        if (e.licenseData.lcs && null == this.state.tempLicenseCode) {
            this.setState({
                tempLicenseCode: e.licenseData.lcs
            });
        }
    }
    renderContent() {
        switch (this.props.licenseData.type) {
        case ServerResponseTypes.Checking:
            return this.renderCheckingState();
        case ServerResponseTypes.Valid:
            return this.renderLicenseValidState();
        case ServerResponseTypes.LicenseMissing:
            return this.renderLicenseMissingState();
        case ServerResponseTypes.LicenseExpired:
            return this.renderLicenseExpired();
        case ServerResponseTypes.LicenseCorrupted:
            return this.renderLicenseCorruptedState();
        case ServerResponseTypes.LicenseCheckingError:
            return this.renderLicenseCheckingErrorState();
        case ServerResponseTypes.LicenseInvalid:
            return this.renderLicenseInvalidState();
        case ServerResponseTypes.ServerResponseLicenseCorrupted:
            return this.renderLicenseCorruptedState();
        case ServerResponseTypes.ServerResponseError:
            return this.renderLicenseErrorFromServerState();
        case ServerResponseTypes.MachineCheckingFailed:
            return this.renderLicenseMachineIdFailedState();
        }
    }
    renderLicenseErrorFromServerState() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "orange"
            }
        },
        "License Data Error From Server"), React.createElement("div", {
            style: {
                color: "black"
            }
        },
        "Error:", React.createElement("b", null, this.props.licenseData.msg), React.createElement("br", null), React.createElement("b", null, "As Error from server,You may need to provide different license code")), React.createElement("br", null), this.renderCommonLicenseInput());
    }
    renderLicenseMachineIdFailedState() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "orange"
            }
        },
        "License Data is for Different Machine"), React.createElement("b", null, "It appears that your license data is belong to another machine,You may need to provide different license code"), React.createElement("br", null), this.renderCommonLicenseInput());
    }
    renderCheckingState() {
        return React.createElement("div", {
            style: {
                textAlign: "center"
            }
        },
        "Checking license information,please wait couple of seconds....");
    }
    renderLicenseCheckingErrorState() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "#ce0303"
            }
        },
        "Error occurred !!!"), React.createElement("b", null, "There is an error while checking license data,please contact team@mathcha.io for support"));
    }
    renderDayLeft(e) {
        if (e <= 7) {
            return React.createElement("span", {
                style: {
                    color: "orange",
                    display: "block",
                    paddingBottom: 10
                }
            },
            "You only have ", e, " day(s) left,please extend or get new license code", React.createElement("br", null));
        }
    }
    renderLicenseValidState() {
        var e = this.state.isReinputLicenseCode ? this.state.tempLicenseCode : this.props.licenseData.lcs;
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "#4CAF50"
            }
        },
        "License Valid"), this.renderDayLeft(this.props.licenseData.dl), React.createElement("span", null, "Expired Date:", React.createElement("b", null, this.formatDate(new Date(this.props.licenseData.date)))), this.renderLicenseInput(!this.state.isReinputLicenseCode, e));
    }
    formatDate(e) {
        var t = e.getDate();
        var n = e.getMonth();
        var r = e.getFullYear();
        return t + " " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][n] + " " + r;
    }
    renderLicenseMissingState() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "orange"
            }
        },
        "No license registered"), this.renderCommonLicenseInput());
    }
    renderLicenseExpired() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "orange"
            }
        },
        "Your license was expired"), React.createElement("span", {
            style: {
                color: "black",
                display: "block",
                paddingBottom: 10
            }
        },
        "Expired Date:", React.createElement("b", null, this.formatDate(new Date(this.props.licenseData.date))), ",please extend your license,or get a new one"), this.renderCommonLicenseInput());
    }
    renderLicenseCorruptedState() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "orange"
            }
        },
        "License Data is corrupted"), React.createElement("b", null, "It appears that your license data is corrupted,please input license Code again as Verification is required"), React.createElement("br", null), this.renderCommonLicenseInput());
    }
    renderLicenseInvalidState() {
        return React.createElement("div", {
            style: {}
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: "orange"
            }
        },
        "License Data is invalid"), React.createElement("b", null, "It appears that your license data is invalid,please input license Code again as Verification is required"), React.createElement("br", null), this.renderCommonLicenseInput());
    }
    renderCommonLicenseInput() {
        return React.createElement("div", null, "Please follow this ", React.createElement("a", {
            href: "https://www.mathcha.io/notebook/",
            style: {
                color: "#1155cc"
            }
        },
        "link"), " to know how to get a license.", React.createElement("br", null), React.createElement("b", null, "Internet connection"), " is required to verify the license code", React.createElement("br", null), this.renderLicenseInput(false, this.state.tempLicenseCode));
    }
    renderLicenseInput(e, t) {
        t = t || "";
        var n = React.createElement("button", {
            className: "btn-primary",
            style: {
                width: 55,
                marginLeft: 8
            },
            onClick: this.handleVerification
        },
        "Verify");
        return e && (n = React.createElement("button", {
            className: "btn-normal",
            style: {
                width: 55,
                marginLeft: 8
            },
            onClick: this.handleRequestLicenseUpdate
        },
        "Change")),
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                alignItems: "baseline"
            }
        },
        React.createElement("span", null, "License Code:"), React.createElement("input", {
            disabled: e,
            value: t,
            onKeyDown: this.handleInputKeydown,
            onChange: this.handleInputChanged,
            style: {
                marginBottom: 5,
                flexGrow: 1,
                fontWeight: "bold",
                marginLeft: 5,
                backgroundColor: e ? "#e6e6e6" : ""
            }
        }), n);
    }
    renderMessageInfo() {
        if (this.state.messageInfo) {
            var e = this.state.messageInfo;
            var t = "black";
            if ("error" == e.type) {
                t = "red";
            }
            if ("warning" == e.type) {
                t = "orange";
            }
            if ("ok" == e.type) {
                t = "green";
            }
            var n = null;
            return this.state.serverErrorDetails && (n = React.createElement("span", {
                style: {
                    color: "#1155cc",
                    cursor: "pointer"
                },
                onClick: this.handleDetailsClick
            },
            " Details"), this.state.serverErrorDetails.show && (n = [React.createElement("span", {
                key: "1",
                style: {
                    color: "#1155cc",
                    cursor: "pointer"
                },
                onClick: this.handleDetailsClick
            },
            " Details"), React.createElement("textarea", {
                key: "2",
                style: {
                    display: "block",
                    height: 100,
                    width: "calc(100%-5px)",
                    resize: "none",
                    marginTop: 5
                },
                readOnly: true,
                value: this.state.serverErrorDetails.details
            })])),
            React.createElement("div", null, React.createElement("span", {
                style: {
                    color: t
                }
            },
            e.message), n);
        }
    }
    render() {
        return React.createElement("div", {
            style: {
                fontSize: 12,
                padding: 5,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignContent: "stretch"
            }
        },
        this.renderContent(), this.renderMessageInfo());
    }
}
class LicenseCheckDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            mode: "license-code"
        };
    }
    renderContent() {
        if ("license-code" == this.state.mode) {
            return React.createElement(LicenseCheckContent, {
                licenseData: this.props.licenseData,
                onLicenseDataChanged: this.props.onLicenseDataChanged
            });
        }
    }
    render() {
        return React.createElement("div", null, React.createElement(ModalDialogContainer, {
            show: true,
            okLabel: "Verify",
            okStyle: {
                display: "none"
            },
            style: {
                width: 450,
                minHeight: 150,
                maxWidth: "95vw",
                top: 100,
                transform: "translate(-50%,0)",
                overflow: "visible"
            },
            contentStyle: {
                overflow: "visible"
            },
            footerStyle: {
                justifyContent: "center"
            },
            onClose: this.props.onClose
        },
        this.renderContent()));
    }
}
class LicenseCheck extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            licenseData: {
                type: ServerResponseTypes.Checking
            }
        };
        this.handleLicenseData = (e) => {
            if (! (this.isLicenseOk(e.type) || this.state.ignoreLicenseProblem)) {
                this.setState({
                    showLicenseDialog: true
                });
            }
            if (this.isLicenseValidButAboutToExpired() && !this.state.ignoreLicenseProblem) {
                this.setState({
                    showLicenseDialog: true
                });
            }
            if (this.state.licenseData.type === ServerResponseTypes.Valid && e.type != ServerResponseTypes.Valid) {
                this.setState({
                    showLicenseDialog: true
                });
            }
            this.setState({
                licenseData: e
            });
        };
        this.handleDialogClose = () => {
            this.setState({
                ignoreLicenseProblem: true,
                showLicenseDialog: false
            });
        };
        this.checkLicense();
    }
    checkLicense() {
        setTimeout(() => {
            Api.Get("/api/license-info").then((e) => {
                return e.json();
            }).then((x) => {
                var e = x.JSON || x;
                return this.handleLicenseData(e);
            }).
            finally(() => {
                this.checkLicense();
            });
        },
        2E3);
    }
    showDialog() {
        this.setState({
            showLicenseDialog: true
        });
    }
    isLicenseOk() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.licenseData.type;
        return e === ServerResponseTypes.Checking || e === ServerResponseTypes.Valid;
    }
    isLicenseValidButAboutToExpired() {
        return this.state.licenseData.type === ServerResponseTypes.Valid && this.state.licenseData.dl <= 7;
    }
    renderContent() {
        return this.state.showLicenseDialog ? this.renderDialog() : this.isLicenseOk() ? void 0 : this.state.ignoreLicenseProblem ? this.renderLicenseNote() : this.renderDialog();
    }
    renderLicenseNote() {
        return React.createElement("div", {
            style: {
                position: "fixed",
                left: 0,
                bottom: 0,
                padding: "5px 10px",
                color: "orange",
                fontSize: 12,
                zIndex: 999999,
                backgroundColor: "white",
                boxShadow: "0px 0px 1px 0px black"
            }
        },
        " Application is in readonly mode (no document is saved),as no valid license.", React.createElement("b", {
            style: {
                cursor: "pointer"
            },
            onClick: () => {
                return this.setState({
                    ignoreLicenseProblem: false,
                    showLicenseDialog: true
                });
            }
        },
        " Show"), " ");
    }
    renderDialog() {
        return React.createElement(LicenseCheckDialog, {
            onClose: this.handleDialogClose,
            licenseData: this.state.licenseData,
            onLicenseDataChanged: this.handleLicenseData
        });
    }
    render() {
        return React.createElement("div", null, this.renderContent());
    }
}
/*n.d(t, "a", function () {
    return LicenseCheck;
});*/

export default LicenseCheck