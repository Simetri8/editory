import React from 'react';

/// xxx(240) /*IconLim*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
class i extends React.Component {
    render() {
        var e = "square-down common-square-icon ";
        var t = "square-up common-square-icon ";
        if (this.props.isExpanded) {
            e = e.concat("common-square-icon-expand");
            t = t.concat("common-square-icon-expand")
        }
        var n = "align-center ";
        if (this.props.isBorderTop) n = n + "border-top";
        if (this.props.isBorderBottom) n = n + "border-bottom";
        return React.createElement("div", {
            className: "icon-lim"
        },
        React.createElement("div", {
            className: n
        },
        this.props.symbol), React.createElement("div", {
            className: t
        }))
    }
}

export default i