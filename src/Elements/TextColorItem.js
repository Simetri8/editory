import React from 'react';
import ColorPicker from '../Editor/ColorPicker';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';

/// xxx(242) /*TextColorItem*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(173)/*ColorPicker*/;  // 1 times
/// var o = n(42)/*ColorTypeConverter*/;  // 1 times
class s extends ColorPicker {
    renderComponent() {
        var e = {
            strokeWidth: 3,
            stroke: ColorTypeConverter.getHtmlColor(this.props.value)
        };
        return React.createElement("x-item", {
            class: "setting",
            style: {
                width: 26
            },
            title: "Text Color"
        },
        React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%",
                transform: "translate(0px,2px)"
            }
        },
        React.createElement("text", {
            style: {
                fontSize: 15,
                fontFamily: "Asana-Math,Asana"
            },
            x: "8",
            y: "13"
        },
        "A"), React.createElement("line", {
            x1: "2",
            y1: "18",
            x2: "24",
            y2: "18",
            style: e
        })))
    }
}

export default s