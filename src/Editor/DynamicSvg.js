import React from 'react';

/// xxx(89) /*DynamicSvg*/

/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
var DynamicSvg = (e => {
    var t = e.p1,
    n = e.p2,
    r = e.style,
    i = "M".concat(t.x, ",").concat(t.y, " L").concat(n.x, ",").concat(n.y, " \n        M").concat(t.x + 3, ",").concat(t.y - 2, " L").concat(t.x, ",").concat(t.y, "L").concat(t.x + 3, ",").concat(t.y + 2, "\n        M").concat(n.x - 3, ",").concat(n.y - 2, " L").concat(n.x, ",").concat(n.y, "L").concat(n.x - 3, ",").concat(n.y + 2);
    return React.createElement("g", {
        style: r
    },
    React.createElement("path", {
        d: i
    }))
})

export default DynamicSvg