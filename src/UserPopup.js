import { connect } from 'react-redux';
import React from 'react';
import PageStates from './PageStates';
import ScContainer from './ScContainer';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1586) /*UserPopup*/

/// var k = n(0)/*React*/;  // 10 times
/// var B = n.n(k);
/// var redux = n(1544)/*Rdx*/;  // 1 times
/// var states = n(1549)/*PageStates*/;  // 1 times
/// var Th = n(19)/*TimerHelper*/;  // 2 times
/// var scContainer = n(1555)/*ScContainer*/;  // 1 times
var mapStateToProps = (e) => {
    return {
        userDetail: PageStates.user(e)
    };
};
class UserPopupComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.onLogout = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onLogout();
        };
    }
    componentDidMount() {
        TimerHelper.waitABit(() => {
            this.userPopup.focus();
        });
    }
    networkToShortname(e) {
        switch (e) {
            case "facebook":
                return "fce";
            case "github":
                return "gh";
            case "google":
                return "gg";
            case "twitter":
                return "twr";
        }
    }
    render() {
        return React.createElement("user-popup", {
            ref: (e) => {
                return this.userPopup = e;
            },
            tabIndex: -111,
            onBlur: () => {
                TimerHelper.waitALitteWhile(() => {
                    this.props.onClose();
                });
            }
        },
            React.createElement("svg", null, React.createElement("path", {
                d: "M0,8 L8,0 L 16,8",
                style: {
                    fill: "none",
                    stroke: "lightgray"
                }
            }), React.createElement("path", {
                d: "M0,8 L8,0 L 16,8 Z",
                style: {
                    fill: "#f7f7f7",
                    stroke: "none"
                }
            })), React.createElement("display-name", null, React.createElement(ScContainer, {
                network: this.networkToShortname(this.props.userDetail.userNetworkType),
                isSmall: true,
                style: {
                    height: 18,
                    width: 18,
                    margin: 5
                }
            }), this.props.userDetail.displayName), React.createElement("account-type", null), React.createElement("logout-region", null, React.createElement("button", {
                className: "btn-normal btn-large",
                onMouseDown: this.onLogout
            },
                "Logout")));
    }
}
var UserPopup = connect(mapStateToProps, {}, null)(UserPopupComponent);
/*n.d(t, "a", function () {
    return UserPopup;
});*/

export default UserPopup