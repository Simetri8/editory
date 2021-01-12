import _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';
import Api from './Api';
import CheckBoxWrapper from './Mathcha/CheckBoxWrapper';
import GeneralSettingsSender from './GeneralSettingsSender';
import HotkeyInfo from './Mathcha/HotkeyInfo';
import InputWrapper from './Elements/InputWrapper';
import MathGlobal from './MathGlobal';
import ModalDialog from './Editor/ModalDialog';
import PageDispatches from './PageDispatches';
import PageStates from './PageStates';

/// xxx(1567) /*UserSettingsDialog*/

/// var k = n(0)/*React*/;  // 34 times
/// var B = n.n(k);
/// var Pe = n(3);  // 9 times
/// var Fe = n.n(Pe);
/// var Ue = n(14)/*classnames*/;  // 1 times
/// var We = n.n(Ue);
/// var Pa = n(28)/*MathGlobal*/;  // 4 times
/// var xo = n(143)/*HotkeyInfo*/;  // 4 times
/// var Co = n(118)/*InputWrapper*/;  // 1 times
/// var So = n(101)/*CheckBoxWrapper*/;  // 2 times
/// var vo = n(124)/*ModalDialog*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 4 times
/// var redux = n(1544)/*Rdx*/;  // 2 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 1 times
/// var states = n(1549)/*PageStates*/;  // 1 times
/// var generalSettingsSender = n(1574)/*GeneralSettingsSender*/;  // 1 times
var bo = {
    width: 220,
    fontSize: 13,
    paddingLeft: 8
};
var Lo = {
    display: "flex",
    alignItems: "baseline",
    overflow: "visible"
};
var Ro = {
    display: "block",
    padding: 5,
    width: "100%",
    fontSize: 13
};
class HotkeyInput extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            text: HotkeyInfo.hotkeyInfoToText(this.props.hotkey)
        };
        this.handleKeyDown = (e) => {
            var t = HotkeyInfo.detect(e);
            e.stopPropagation();
            e.preventDefault();
            var n = HotkeyInfo.hotkeyInfoToText(t);
            if (t.modifierOnly) {
                this.setState({
                    text: n,
                    error: true
                });
                this.props.onError();
            } else {
                this.props.onHotkeyChanged(t);
                this.setState({
                    text: n,
                    error: false
                });
            }
        };
    }
    componentDidMount() {
        this.inputElement.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount() {
        this.inputElement.removeEventListener("keydown", this.handleKeyDown);
    }
    render() {
        var e = _.assignIn({
            border: this.state.error ? "1px solid #bb0505" : "1px solid lightgray"
        },
        this.props.style);
        return InputWrapper.wrapInput(React.createElement("input", {
            style: e,
            ref: (e) => {
                return this.inputElement = e;
            },
            value: this.state.text,
            onChange: (e) => console.log(e)
        }));
    }
}
class UserSettings extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            settings: this.props.settings
        };
        this.onPowerIndexCursorChanged = (e) => {
            this.setState({
                settings: _.assignIn({},
                this.state.settings, {
                    isDisablePowerIndexOneChar: e
                })
            });
        };
        this.onDisplayStyleForInlineMathChanged = (e) => {
            this.setState({
                settings: _.assignIn({},
                this.state.settings, {
                    displayStyleForInlineMath: e
                })
            });
        };
        this.onHotKeyChanged = (e) => {
            this.setState({
                settings: _.assignIn({},
                this.state.settings, {
                    suggestionBoxTriggerShortcut: JSON.stringify(e)
                })
            });
            this.props.onOk();
        };
        this.handleError = () => {
            this.props.onError();
        };
    }
    onZoomLevelChanged(e) {
        if (this.state.offlineInfo) {
            this.setState({
                offlineInfo: _.assignIn({},
                this.state.offlineInfo, {
                    zoomLevel: e
                })
            });
        }
    }
    getHotKeyInfo() {
        return HotkeyInfo.safeParseHotkey(this.props.settings.suggestionBoxTriggerShortcut);
    }
    getSettings() {
        return this.state.settings;
    }
    getOfflineInfo() {
        return this.state.offlineInfo;
    }
    setError(e) {
        this.setState({
            errorMessage: e
        });
    }
    componentDidMount() {
        if (MathGlobal.isDataOffline()) {
            Api.Get("/api/commands/offline-info").then((e) => {
                return e.json();
            }).then((x) => {
                var e = x.JSON || x;
                this.setState({
                    offlineInfo: e
                });
                this.originalOffLineInfo = e;
            });
        }
    }
    renderSeparator() {
        return React.createElement("div", {
            style: {
                borderTop: "1px solid lightgray",
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 8,
                marginRight: 8
            }
        });
    }
    requestNewLocation(e, t) {
        Api.Get(t).then((e) => {
            return e.json();
        }).then((x) => {
            var t = x.JSON || x;
            var n = this.getLocationFromKey(e);
            if (t.location && t.location != n) {
                this.setState({
                    offlineInfo: _.assignIn({},
                    this.state.offlineInfo, {
                        [e] : t.location
                    })
                });
                if ("dataLocation" == e) {
                    this.setState({
                        dbExists: t.exists
                    });
                    this.props.onDbExist(t.exists);
                }
                this.props.onRestartRequired(this.isLocationChanged());
            }
        });
    }
    getLocationFromKey(e) {
        return (this.state.offlineInfo || {})[e];
    }
    renderLocationInfo(e, t, n) {
        var r = this.getLocationFromKey(t);
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                marginLeft: 8,
                marginRight: 8,
                marginBottom: 10
            }
        },
        React.createElement("span", {
            style: {
                width: 90,
                flexShrink: 1
            }
        },
        e, " "), React.createElement("input", {
            value: r,
            readOnly: true,
            style: {
                flex: 1,
                whiteSpace: "nowrap",
                background: "#f7f6f6"
            }
        }), React.createElement("button", {
            style: {
                marginLeft: 10,
                width: 60
            },
            className: "btn-normal",
            onClick: () => {
                return Api.Post("/api/commands/request-open-location", r);
            }
        },
        "Open"), React.createElement("button", {
            style: {
                marginLeft: 10,
                width: 60,
                visibility: n ? "visible" : "hidden"
            },
            className: "btn-normal",
            onClick: () => {
                return this.requestNewLocation(t, n);
            }
        },
        "Change"));
    }
    renderOfflineSection() {
        if (MathGlobal.isDataOffline()) {
            return React.createElement("div", null, this.renderSeparator(), this.renderLocationInfo("Data Location:", "dataLocation", "/api/commands/request-change-data-location"), this.renderLocationInfo("App Log:", "appLogLocation"), this.renderLocationInfo("Service Log:", "serviceLogLocation"), this.renderLocationInfo("Data Backup Location:", "dataBackupLocation", "/api/commands/change-data-backup-location"), this.renderSeparator());
        }
    }
    getZoomInstructionText() {
        return MathGlobal.isMac() ? "Press Cmd=to increase,Cmd-(Minus) to decrease,Cmd 0 to reset Zoom Level" : "Press Ctrl=to increase,Ctrl-(Minus) to decrease,Ctrl 0 to reset Zoom Level";
    }
    renderAppZoom() {
        return MathGlobal.isDataOffline() ? React.createElement("div", {
            style: {
                marginTop: 10,
                paddingLeft: 8
            }
        },
        React.createElement("st-label", {
            style: {
                display: "inline-block",
                width: 220
            }
        },
        "App Zoom Level:"), React.createElement("span", {
            className: "toolbar-container",
            style: {
                position: "relative"
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 20,
                padding: 2,
                border: "1px solid lightgray",
                textAlign: "center",
                color: "black"
            }
        },
        this.state.offlineInfo && this.state.offlineInfo.zoomLevel), React.createElement("i", {
            className: "fa fa-info-circle",
            style: {
                color: "#4CAF50",
                paddingLeft: 5
            }
        }), React.createElement("div", {
            className: "unsupport-justification-text tool-bar-text",
            style: {
                position: "absolute",
                top: "100%",
                marginTop: 10,
                color: "orange",
                background: "white",
                border: "1px solid lightgray",
                textAlign: "center",
                fontSize: 12,
                padding: 3,
                width: 220,
                lineHeight: "1.4em",
                left: -90
            }
        },
        this.getZoomInstructionText()))) : this.renderSeparator();
    }
    isLocationChanged() {
        return ! (!this.originalOffLineInfo || !this.state.offlineInfo) && (this.originalOffLineInfo.dataLocation != this.state.offlineInfo.dataLocation || this.originalOffLineInfo.dataBackupLocation != this.state.offlineInfo.dataBackupLocation);
    }
    renderRestartWarning() {
        return this.isLocationChanged() ? React.createElement("span", {
            style: {
                color: "orange",
                fontSize: 12,
                paddingLeft: 8,
                marginBottom: 5,
                display: "block"
            }
        },
        "* Locations changed require restarting the app") : null;
    }
    renderDbExistsWarning() {
        if (this.state.dbExists) {
            return React.createElement("span", {
                style: {
                    color: "orange",
                    fontSize: 12,
                    paddingLeft: 8,
                    marginBottom: 5,
                    display: "block"
                }
            },
            "* Data exists in new location,and will be used after restart");
        }
    }
    renderErrorMessage() {
        if (this.state.errorMessage) {
            return React.createElement("span", {
                style: {
                    color: "#ce0303",
                    fontSize: 13,
                    paddingLeft: 8,
                    marginBottom: 5,
                    display: "block"
                }
            },
            "Error when migrating data to new location:", this.state.errorMessage);
        }
    }
    render() {
        var e = this.state.settings;
        return React.createElement("user-settings", {
            style: Ro
        },
        React.createElement("div", {
            style: Lo
        },
        React.createElement(CheckBoxWrapper, {
            style: {
                marginTop: 3,
                marginBottom: 5,
                paddingLeft: 8
            },
            textStyle: {
                fontSize: 13
            },
            checked: e.isDisablePowerIndexOneChar,
            name: "Stop Cursor automatically moving out Power/Index Region",
            onValueChanged: this.onPowerIndexCursorChanged
        })), React.createElement("div", {
            style: Lo
        },
        React.createElement(CheckBoxWrapper, {
            style: {
                marginTop: 3,
                marginBottom: 5,
                paddingLeft: 8
            },
            textStyle: {
                fontSize: 13
            },
            checked: e.displayStyleForInlineMath,
            name: "Insert \\inline-math with \\displaystyle (Example:\\frac will have normal size)",
            onValueChanged: this.onDisplayStyleForInlineMathChanged
        })), this.renderSeparator(), React.createElement("div", {
            style: {
                paddingLeft: 8
            }
        },
        React.createElement("span", {
            style: {
                width: 220,
                display: "inline-block"
            }
        },
        "Editor Input Shortcut"), React.createElement("button", {
            onClick: this.props.requestShortcutConfigure,
            style: {
                width: 154,
                display: "inline-block",
                height: 22
            },
            className: "btn-normal"
        },
        "Configure")), React.createElement("div", {
            style: _.assignIn({},
            Lo, {
                alignItems: "stretch",
                marginTop: 10
            })
        },
        React.createElement("st-label", {
            style: bo
        },
        "Alternative Suggestion Box Hotkey:"), React.createElement(HotkeyInput, {
            style: {
                width: 148
            },
            onHotkeyChanged: this.onHotKeyChanged,
            onError: this.handleError,
            hotkey: this.getHotKeyInfo()
        })), this.renderAppZoom(), this.renderOfflineSection(), this.renderErrorMessage(), this.renderRestartWarning(), this.renderDbExistsWarning());
    }
}
var UserSettingsDialog = connect((e) => {
    return {
        settings: PageStates.user(e).settings.generalSettings
    };
},
{
    customUser: PageDispatches.customUser
},
null, {
    forwardRef: true
})(class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onSave = () => {
            if (!this.state.error) {
                if (this.state.restartRequired) {
                    this.saveSettings();
                    var e = this.userSettingsRef.getOfflineInfo();
                    var t = {
                        dataLocation: e.dataLocation,
                        dataBackupLocation: e.dataBackupLocation
                    };
                    Api.Post("/api/commands/save-data-location", t).then(() => {
                        this.props.onClose();
                    }).
                    catch((e) => {
                        this.userSettingsRef.setError(e.message);
                        console.log(e);
                    });
                } else {
                    this.saveSettings();
                    this.props.onClose();
                }
            }
        };
        this.handleOk = () => {
            this.setState({
                error: false
            });
        };
        this.handleError = () => {
            this.setState({
                error: true
            });
        };
        this.handleRestartRequired = (e) => {
            this.setState({
                restartRequired: e
            });
        };
        this.handleDbExistOnNewLocation = (e) => {
            this.setState({
                dbExists: e
            });
        };
        this.handleRequestShortcutConfigure = () => {
            this.props.onClose();
            this.props.requestShortcutConfigure();
        };
    }
    onZoomLevelChanged(e) {
        if (this.userSettingsRef) {
            this.userSettingsRef.onZoomLevelChanged(e);
        }
    }
    saveSettings() {
        var e = this.userSettingsRef.getSettings();
        this.props.customUser((t) => {
            return _.assignIn({},
            t, {
                settings: _.assignIn({},
                t.settings, {
                    generalSettings: e
                })
            });
        });
        GeneralSettingsSender.updateGeneralSettings(e);
    }
    render() {
        return React.createElement(ModalDialog, {
            title: "User Settings",
            show: true,
            style: {
                width: 540,
                height: "auto",
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
            onClose: this.props.onClose,
            renderFooterContent: () => {
                return React.createElement("button", {
                    style: {
                        paddingLeft: 15,
                        paddingRight: 15,
                        width: 80
                    },
                    onMouseDown: () => {
                        return this.onSave();
                    },
                    className: classNames("ok btn-normal btn-large"),
                    disabled: this.state.error
                },
                this.state.restartRequired ? "Save and Restart" : "Save");
            }
        },
        React.createElement(UserSettings, {
            requestShortcutConfigure: this.handleRequestShortcutConfigure,
            onDbExist: this.handleDbExistOnNewLocation,
            onRestartRequired: this.handleRestartRequired,
            onError: this.handleError,
            onOk: this.handleOk,
            settings: this.props.settings,
            ref: (e) => {
                return this.userSettingsRef = e;
            }
        }));
    }
});
/*n.d(t, "a", function () {
    return UserSettingsDialog;
});*/

export default UserSettingsDialog