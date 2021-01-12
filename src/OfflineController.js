import { connect } from 'react-redux';
import 'offline-js';
import React from 'react';

/// xxx(1559) /*OfflineController*/

/// var k = n(0)/*React*/;  // 2 times
/// var B = n.n(k);
/// var off = n(1441)/*offline*/;  // 0 times
/// var redux = n(1544)/*Rdx*/;  // 1 times
class OfflineControllerComponent extends React.Component {
    getOffOnline() {
        return window.Offline;
    }
    componentDidMount() {
        var e = this.getOffOnline();
        e.on("up", () => {
            this.props.setNetworkStatus("up");
        });
        e.on("down", () => {
            this.props.setNetworkStatus("down");
        });
    }
    render() {
        return React.createElement("div", null);
    }
}
var OfflineController = connect(null, {
    setNetworkStatus: (e) => {
        return {
            type: "common_setNetworkStatus",
            status: e
        };
    }
})(OfflineControllerComponent);
/*n.d(t, "a", function () {
    return OfflineController;
});*/

export default OfflineController