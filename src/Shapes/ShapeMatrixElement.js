import _ from 'lodash';
import React from 'react';

/// xxx(165) /*ShapeMatrixElement*/

/*n.d(t, "a", function () {
    return l
});*/
/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 10 times
/// var o = n.n(i);
var s = {
    "{": "}",
    "[": "]",
    "(": ")",
    "|": "|",
    " ": " ",
    "‖": "‖"
};
class l extends React.PureComponent {
    render() {
        var e = {
            fontSize: "18px",
            lineHeight: "18px"
        },
        t = "square common-square-icon common-square-icon-expand",
        n = this.props.bracketType || "(",
        r = s[n],
        i = this.props.smaller ? {
            width: 3,
            height: 3,
            minHeight: 3
        } : {};
        return React.createElement("div", {
            style: {
                display: "flex"
            }
        },
        React.createElement("div", {
            style: e
        },
        n), React.createElement("div", null, React.createElement("div", {
            style: _.assignIn({
                marginTop: 3,
                marginRight: 2
            },
            i),
            className: t
        }), React.createElement("div", {
            style: _.assignIn({
                marginTop: 2,
                marginRight: 2
            },
            i),
            className: t
        })), React.createElement("div", null, React.createElement("div", {
            style: _.assignIn({
                marginTop: 3
            },
            i),
            className: t
        }), React.createElement("div", {
            style: _.assignIn({
                marginTop: 2
            },
            i),
            className: t
        })), React.createElement("div", {
            style: e
        },
        r))
    }
}

export default l