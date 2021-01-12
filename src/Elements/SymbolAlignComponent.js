import _ from 'lodash';
import React from 'react';

/// xxx(344) /*SymbolAlignComponent*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 10 times
/// var o = n.n(i);
class s extends React.Component {
    render() {
        var e = {
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            padding: "3px 2px 0px 2px"
        },
        t = {
            border: "1px solid gray",
            width: "8px",
            height: "0px",
            marginTop: "1px"
        },
        n = {
            width: "12px",
            marginTop: "-6px"
        },
        r = {
            border: "1px solid gray",
            width: "8px",
            height: "0px",
            marginTop: "1px"
        };
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                border: "1px solid gray"
            }
        },
        React.createElement("div", {
            style: e
        },
        React.createElement("div", {
            style: t
        }), React.createElement("div", {
            style: n
        },
        "="), React.createElement("div", {
            style: r
        })), React.createElement("div", {
            style: _.assignIn({},
            e, {
                marginTop: "-5px"
            })
        },
        React.createElement("div", {
            style: t
        }), React.createElement("div", {
            style: _.assignIn({},
            n, {
                marginBottom: "-2px"
            })
        },
        "="), React.createElement("div", {
            style: r
        })))
    }
}

export default s