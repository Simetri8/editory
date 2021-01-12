import { connect } from 'react-redux';
import React from 'react';
import PageStates from './PageStates';
import ScContainer from './ScContainer';
import TimerHelper from './Mathcha/TimerHelper';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';

/// xxx(1586) /*UserPopup*/

var mapStateToProps = (e) => {
    return {
        userDetail: PageStates.user(e)
    };
};
class UserPopup extends React.Component {

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

    render() {

        return <user-popup
            ref={(e) => {
                return this.userPopup = e;
            }}
            tabIndex={-111}
            onBlur={() => {
                TimerHelper.waitALitteWhile(() => {
                    this.props.onClose();
                });
            }}>
            <display-name style={{ padding: "24px" }}>
                <Badge color="secondary" style={{ paddingRight: "12px" }}>
                    <i className={"fab fa-" + this.props.userDetail.userNetworkType} fontSize="small" />
                </Badge>
                <Badge>
                    <Typography>{this.props.userDetail.displayName}</Typography>
                </Badge>
            </display-name>
            <account-type></account-type>
            <logout-region>
                <button className="btn-normal btn-large"
                    onMouseDown={this.onLogout}>Logout</button>
            </logout-region>
        </user-popup>

    }
}

export default connect(mapStateToProps, {}, null)(UserPopup)