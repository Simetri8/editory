import React from 'react';

/// xxx(349) /*IconHat*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
class i extends React.Component {
    render() {
        return React.createElement("div", {
            className: "icon-hat"
        },
        React.createElement("div", {
            className: "hat-wrapper"
        },
        this.props.symbol), React.createElement("div", {
            className: "common-big-square-icon square"
        }))
    }
}

export default i