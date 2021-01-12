import _ from 'lodash';
import { SketchPicker } from 'react-color';
import React from 'react';

/// xxx(332) /*SketchPickerWrapper*/

/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 1 times
/// var o = n.n(i);
/// var s = n(707)/*ReactColor*/;  // 1 times
var SketchPickerWrapper = (e => {
    var t = e.onChange,
    n = e.color,
    r = e.scale,
    i = e.style;
    return _.isString(n) || (n = {
        r: n[0],
        g: n[1],
        b: n[2],
        a: n[3]
    }),
    React.createElement(SketchPicker, {
        presetColors: ["#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#808080", "#FFFFFF"],
        style: i,
        color: n,
        onChange: e => t([e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a]),
        scale: r
    })
})

export default SketchPickerWrapper