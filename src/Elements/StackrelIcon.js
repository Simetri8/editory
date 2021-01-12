import React from 'react';

/// xxx(338) /*StackrelIcon*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 7 times
/// var a = n.n(r);
class i extends React.Component {
    render() {
        return this.props.isUnder ? React.createElement("div", {
            className: "stackrel-icon"
        },
        React.createElement("div", {
            className: "common-big-square-icon"
        }), React.createElement("div", {
            className: "common-square-icon common-square-icon-expand distance"
        })) : React.createElement("div", {
            className: "stackrel-icon"
        },
        React.createElement("div", {
            className: "common-square-icon common-square-icon-expand"
        }), React.createElement("div", {
            className: "common-big-square-icon distance"
        }))
    }
}

export default i