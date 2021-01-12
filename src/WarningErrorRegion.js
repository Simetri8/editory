import React from 'react';

/// xxx(1584) /*WarningErrorRegion*/

/// var k = n(0)/*React*/;  // 19 times
/// var B = n.n(k);
class WarningErrorRegion extends React.Component {
    render() {
        var e = {
            top: this.props.topPosition,
            left: this.props.sideBarWidth + 10,
            right: 10,
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        };
        return React.createElement("warning-error-region", {
            style: e
        },
        this.renderConnectionWarning(), this.renderLoadingError(), this.renderMaintainInfo(), this.renderDataBackupWarning());
    }
    renderLoadingError() {
        if (this.props.activeDocumentError && !this.props.forceShowSessionExpiredDialog) {
            return React.createElement("x-error", null, React.createElement("i", {
                className: "fa fa-exclamation-triangle",
                "aria-hidden": "true"
            }), React.createElement("span", null, this.props.activeDocumentError.message));
        }
    }
    renderConnectionWarning() {
        if ("down" == this.props.netWorkStatus) {
            return React.createElement("warning", null, React.createElement("i", {
                className: "fa fa-exclamation-triangle",
                "aria-hidden": "true"
            }), React.createElement("span", null, "Your network appears to be offline"));
        }
    }
    renderDataBackupWarning() {
        if (this.props.dataBackupInfo) {
            return React.createElement("warning", {
                style: {
                    fontSize: 13,
                    display: "flex",
                    maxWidth: 500,
                    alignItems: "center",
                    lineHeight: "1.4em"
                }
            },
            React.createElement("i", {
                className: "fa fa-exclamation-triangle",
                "aria-hidden": "true"
            }), React.createElement("span", null, this.props.dataBackupInfo.message), React.createElement("i", {
                onClick: this.props.onDataBackupInfoClose,
                style: {
                    padding: 5,
                    paddingLeft: 10,
                    verticalAlign: "-1px",
                    cursor: "pointer"
                },
                className: "fa fa-times",
                "aria-hidden": "true"
            }));
        }
    }
    buildMaintenanceText(e) {
        var t = (new Date(e.startTime)).toLocaleString();
        var n = e.reason ? "\n Reason:".concat(e.reason) : "";
        return React.createElement("span", null, "Website will be unavailable on ", React.createElement("b", null, t), ",for ", React.createElement("b", null, e.durationInHours), " hours. ", n);
    }
    renderMaintainInfo() {
        if (this.props.maintainInfo) {
            return React.createElement("info", {
                style: {
                    fontSize: 13,
                    display: "flex",
                    maxWidth: 500,
                    alignItems: "center",
                    lineHeight: "1.4em"
                }
            },
            React.createElement("i", {
                style: {
                    paddingRight: 10
                },
                className: "fa fa-exclamation-triangle",
                "aria-hidden": "true"
            }), React.createElement("span", null, "Mathcha maintenance plan:\n", this.buildMaintenanceText(this.props.maintainInfo)), React.createElement("i", {
                onClick: this.props.onMaintainClose,
                style: {
                    padding: 5,
                    paddingLeft: 10,
                    verticalAlign: "-1px",
                    cursor: "pointer"
                },
                className: "fa fa-times",
                "aria-hidden": "true"
            }));
        }
    }
}
/*n.d(t, "a", function () {
    return WarningErrorRegion;
});*/

export default WarningErrorRegion