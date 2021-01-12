import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import ModalDialog from './ModalDialog';

/// xxx(105) /*ModalDialogContainer*/

/*n.d(t, "a", function () {
    return u
});*/
/// var r = n(61)/*_.omit*/;  // 1 times
/// var a = n.n(r);
/// var i = n(3)/*_.assignIn*/;  // 8 times
/// var o = n.n(i);
/// var s = n(0)/*React*/;  // 17 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 5 times
/// var d = n.n(c);
/// var h = n(124)/*ModalDialog*/;  // 1 times
class u extends React.Component {
    constructor(e) {
        super(e);
        this.raiseCancelOrClose = (e => {
            if (! (e && this.props.disableEscapeToClose)) {
                if (this.props.onCancel) this.props.onCancel();
                if (this.props.onClose) this.props.onClose(e)
            };
        });
        this.renderFooterContent = (() => {
            var e = {
                display: "flex",
                justifyContent: "flex-end"
            };
            if (this.props.centerButtons || this.isYesNoOrCancel()) {
                e.justifyContent = "center";
                e.width = "100%"
            };
            var t, n = _.assignIn({},
            y, this.props.footerStyle);
            return this.isYesNoOrCancel() && (n.justifyContent = "center", n.flexDirection = "column", t = {
                textAlign: "center",
                paddingBottom: 10
            }),
            React.createElement("div", {
                style: n
            },
            React.createElement("div", {
                style: g,
                className: classNames("thin-loader", {
                    suppress: !this.props.isProgressing
                },
                {
                    show: this.props.isDocumentLoading
                })
            }), this.renderMessage(t), React.createElement("buttons-group", {
                style: e
            },
            this.getCancelButton(), this.getNoButton(), this.getOkOrYesButton()))
        })
    }
    isOkDisabled() {
        return this.props.isOkDisabled
    }
    renderMessage(e) {
        if (this.props.message) {
            var t = JSON.stringify(this.props.message);
            return this.props.isMessageOk ? React.createElement("x-message", {
                style: _.assignIn({},
                f, {
                    innerMessageStyle: e,
                    color: "green"
                },
                this.props.messageStyle)
            },
            React.createElement("span", {
                style: {
                    paddingLeft: 3
                }
            },
            t)) : this.props.isMessageWarning ? React.createElement("x-message", {
                style: _.assignIn({},
                f, {
                    innerMessageStyle: e,
                    color: "orange"
                },
                this.props.messageStyle)
            },
            React.createElement("span", {
                style: {
                    paddingLeft: 3
                }
            },
            t)) : React.createElement("x-message", {
                style: _.assignIn({},
                f, {
                    innerMessageStyle: e
                },
                this.props.messageStyle)
            },
            React.createElement("x-icon", null, React.createElement("i", {
                className: "fa fa-exclamation-triangle",
                "aria-hidden": "true"
            })), React.createElement("span", {
                style: {
                    paddingLeft: 3
                }
            },
            t))
        }
    }
    shouldDisableButtons() {
        return !this.props.preventDisableButtonOnProgressing && !!this.props.isProgressing
    }
    getCancelButton() {
        if ("YesNo" != this.props.dialogType) {
            var e = this.props.cancelLabel ? this.props.cancelLabel : "Cancel";
            return React.createElement("button", {
                disabled: this.shouldDisableButtons(),
                style: _.assignIn({},
                p, this.props.cancelStyle),
                className: classNames("cancel btn-normal", {
                    "btn-large": this.props.btnLarge
                }),
                onClick: () => this.raiseCancelOrClose(!1)
            },
            " ", e, " ")
        }
    }
    isYesNoOrCancel() {
        return "YesNo" == this.props.dialogType || "YesNoCancel" == this.props.dialogType
    }
    getOkOrYesButton() {
        var e = this.props.okLabel || (this.isYesNoOrCancel() ? "Yes" : "Ok");
        return React.createElement("button", {
            disabled: this.shouldDisableButtons() || this.isOkDisabled(),
            style: _.assignIn({},
            p, this.props.okStyle),
            className: classNames("ok btn-primary", {
                "btn-large": this.props.btnLarge
            }),
            onClick: this.props.onOk
        },
        " ", e, " ")
    }
    getNoButton() {
        if (this.isYesNoOrCancel()) {
            var e = this.props.noLabel ? this.props.noLabel : "No";
            return React.createElement("button", {
                disabled: this.shouldDisableButtons(),
                style: p,
                className: classNames("no btn-normal", {
                    "btn-large": this.props.btnLarge
                }),
                onClick: this.props.onNo
            },
            " ", e, " ")
        }
    }
    notifyShow() {}
    getModalClassName() {
        return classNames("swift", this.props.className)
    }
    render() {
        if (!this.props.show) return React.createElement("div", {
            style: {
                display: "none"
            }
        });
        var e = this.props,
        t = e.style,
        n = (e.headerStyle, e.contentStyle),
        r = (e.footerStyle, _.omit(e, ["style", "headerStyle", "contentStyle", "footerStyle"]));
        return React.createElement(ModalDialog, Object.assign({},
        r, {
            onClose: this.raiseCancelOrClose,
            style: _.assignIn({},
            m, t),
            contentStyle: _.assignIn({
                fontSize: 12
            },
            n),
            headerStyle: {
                display: "none"
            },
            footerStyle: {
                display: "block"
            },
            notifyShow: this.notifyShow,
            className: this.getModalClassName(),
            renderFooterContent: this.renderFooterContent
        }))
    }
}
var p = {
    width: 70,
    marginLeft: 10
},
m = {
    minHeight: 0,
    height: "auto",
    background: "white",
    border: "none"
},
f = {
    flexGrow: 1,
    fontSize: 12,
    paddingTop: 3,
    color: "#ce0303"
},
g = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 1,
    display: "block"
},
y = {
    display: "flex",
    position: "relative",
    paddingTop: 10,
    paddingBottom: 4,
    justifyContent: "flex-end"
}

export default u