import _ from 'lodash';
import React from 'react';
import InputWrapper from './InputWrapper';

/// xxx(109) /*MatrixLayoutDetail*/

/*n.d(t, "c", function () {
    return l
}),*/
/*n.d(t, "b", function () {
    return c
}),*/
/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 4 times
/// var o = n.n(i);
/// var s = n(118)/*InputWrapper*/;  // 1 times
class l extends React.Component {
    render() {
        return React.createElement("matrix-layout-detail", {
            style: u
        },
        this.props.children)
    }
}
var c = e => {
    var t = e.children;
    return React.createElement("label", {
        style: p
    },
    t)
},
d = e => {
    var t = e.value,
    n = e.onChange,
    r = e.isFirstOne ? _.assignIn({},
    h, {
        marginLeft: 0
    }) : h;
    return InputWrapper.wrapInput(React.createElement("input", {
        autoCorrect: "off",
        autoCapitalize: "off",
        value: t,
        onChange: n
    }), r)
},
h = {
    width: 20,
    color: "#757575",
    marginLeft: -1,
    display: "block",
    float: "left"
},
u = {
    display: "flex",
    flexDirection: "row",
    float: "left",
    alignItems: "baseline"
},
p = {
    marginLeft: 6,
    marginRight: 3,
    fontSize: 11,
    display: "inline-block",
    height: 12,
    color: "gray"
}

export { l as MatrixLayoutDetailC }

export { c as MatrixLayoutDetailB }

export default d