import classNames from 'classnames';
import React from 'react';

/// xxx(175) /*CommonSquareIcon*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(14)/*classnames*/;  // 1 times
/// var o = n.n(i);
class s extends React.Component {
    render() {
        var e = classNames("common-square-icon", {
            "common-square-icon-expand": this.props.isExpanded
        });
        return React.createElement("div", {
            style: {
                margin: "auto",
                fontSize: 12
            }
        },
        React.createElement("div", {
            className: e,
            style: {
                margin: "auto auto 1px auto"
            }
        }), React.createElement("div", {
            style: {
                margin: "auto",
                height: 15,
                lineHeight: "12px"
            }
        },
        this.props.symbol), React.createElement("div", {
            className: e,
            style: {
                margin: "1px auto"
            }
        }))
    }
}

export default s