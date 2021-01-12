import _ from 'lodash';
import React from 'react';

/// xxx(336) /*EmptyRightIcon*/

/*n.d(t, "a", function () {
    return s
}),*/
/*n.d(t, "b", function () {
    return l
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 3 times
/// var o = n.n(i);
class s extends React.Component {
    render() {
        return React.createElement("div", {
            className: "empty-right-icon"
        },
        React.createElement("div", {
            style: _.assignIn({},
            l, {
                borderLeft: "1px solid gray",
                borderRight: "4px solid gray"
            })
        }))
    }
}
var l = {
    width: "23px",
    height: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    textAlign: "center",
    borderColor: "gray",
    fontFamily: "fantasy",
    color: "black",
    paddingTop: "1px",
    fontSize: "9px",
    lineHeight: "14px",
    verticalAlign: "middle",
    margin: "auto",
    borderLeft: "4px solid gray"
}

export { l as EmptyRightIconB }

export default s