import React from 'react';
import ColorPicker from '../Editor/ColorPicker';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';

/// xxx(160) /*FillColorIcon*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 8 times
/// var a = n.n(r);
/// var i = n(173)/*ColorPicker*/;  // 1 times
/// var o = n(42)/*ColorTypeConverter*/;  // 1 times
class s extends ColorPicker {
    renderComponent() {
        return this.props.icon ? this.props.icon : React.createElement("x-item", {
            class: "setting",
            style: {
                width: 26
            },
            title: "Stroke Color"
        },
        React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("g", {
            style: {
                transform: "translate(9px,3px) scale(0.03,0.03)",
                fill: "gray"
            }
        },
        React.createElement("path", {
            d: "M418.483,13.04c-9.292-9.306-22.254-14.023-35.37-12.869c-13.11,1.151-25.046,8.055-32.597,18.846l-50.415,72.107   c-14.161,20.265-41.593,26.087-62.77,13.329l-11.129-6.709c-8.835-5.32-20.159-3.943-27.465,3.356   c-8.757,8.767-8.775,22.99,0,31.756l99.932,99.939c4.206,4.217,9.918,6.581,15.884,6.581c5.952,0,11.659-2.363,15.87-6.59   c7.306-7.297,8.679-18.627,3.354-27.457l-6.694-11.121c-12.755-21.177-6.951-48.618,13.323-62.779l72.112-50.408   c10.803-7.548,17.69-19.481,18.837-32.594C432.515,35.306,427.807,22.355,418.483,13.04z"
        }), React.createElement("path", {
            d: "M65.988,257.776c-4.583,4.597-4.583,12.023,0,16.621l12.659,12.652v-0.016l41.045-33.014   c0.709-0.573,1.741-0.509,2.386,0.145c0.631,0.645,0.663,1.677,0.064,2.37L88.178,296.58l41.483,41.49l56.643-43.86   c0.709-0.548,1.709-0.474,2.335,0.162c0.631,0.645,0.677,1.654,0.115,2.354l-44.965,55.45l13.355,13.355   c4.579,4.588,12.014,4.588,16.612,0l70.735-70.756L136.741,187.03L65.988,257.776z"
        }), React.createElement("polygon", {
            points: "148.419,175.355 256.168,283.099 281.136,258.147 173.382,150.396  "
        }), React.createElement("path", {
            d: "M170.964,407.768c-3.192,0-6.126,1.75-7.642,4.556c-8.665,16.031-21.596,41.773-21.596,52.513   c0,16.144,13.079,29.241,29.225,29.241c16.16,0,29.257-13.097,29.257-29.241c0-10.74-12.936-36.473-21.614-52.504   C177.077,409.526,174.156,407.768,170.964,407.768z"
        })), React.createElement("line", {
            x1: "2",
            y1: "18",
            x2: "24",
            y2: "18",
            style: {
                strokeWidth: 3,
                stroke: ColorTypeConverter.getHtmlColor(this.props.value)
            }
        })))
    }
}

export default s