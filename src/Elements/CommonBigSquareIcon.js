import React from 'react';

/// xxx(74) /*CommonBigSquareIcon*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 6 times
/// var a = n.n(r);
class i extends React.Component {
    constructor(e) {
        super(e);
        this.renderEmpty = this.renderEmpty.bind(this)
    }
    renderEmpty() {
        return React.createElement("div", {
            style: {
                height: 12,
                border: "1px solid lightgray"
            }
        })
    }
    render() {
        return React.createElement("div", {
            style: {
                margin: "auto",
                display: "flex"
            }
        },
        React.createElement("div", null, this.props.start), React.createElement("div", {
            style: {
                margin: "4px 2px"
            },
            className: "square common-big-square-icon common-square-icon-expand"
        }), React.createElement("div", null, this.props.end ? this.props.end : this.renderEmpty()))
    }
}

export default i