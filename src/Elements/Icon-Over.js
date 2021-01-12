import _ from 'lodash';
import React from 'react';

/// xxx(111) /*Icon-Over*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
class s extends React.Component {
    render() {
        var e = 6,
        t = 1;
        if (this.props.height) {
            e = this.props.height;
            t = 10
        }
        var n = _.assignIn({
            height: e,
            lineHeight: t + "px"
        },
        this.props.overStyle);
        return React.createElement("div", {
            className: "over-icon"
        },
        React.createElement("div", {
            style: n
        },
        this.props.symbol), React.createElement("div", {
            className: "common-big-square-icon"
        }))
    }
}

export default s