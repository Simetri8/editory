import React from 'react';
import SelectBoxContainer from './SelectBoxContainer';
import TooltipData from '../Mathcha/TooltipData';

/// xxx(291) /*FontSizeSelectBox*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 12 times
/// var a = n.n(r);
/// var i = n(51)/*SelectBoxContainer*/;  // 1 times
/// var o = n(67)/*TooltipData*/;  // 1 times
class s extends React.Component {
    constructor() {
        super(...arguments);
        this.onFontSizeRenderItem = (e => {
            switch (e.key) {
                case "\\tiny":
                    return React.createElement("div", {
                        style: {
                            fontSize: 8
                        }
                    },
                        e.value);
                case "\\scriptsize":
                    return React.createElement("div", {
                        style: {
                            fontSize: 11.2
                        }
                    },
                        e.value);
                case "\\footnotesize":
                    return React.createElement("div", {
                        style: {
                            fontSize: 12.8
                        }
                    },
                        e.value);
                case "\\small":
                    return React.createElement("div", {
                        style: {
                            fontSize: 14.4
                        }
                    },
                        e.value);
                case "\\normalsize":
                    return React.createElement("div", {
                        style: {
                            fontSize: 16
                        }
                    },
                        e.value);
                case "\\large":
                    return React.createElement("div", {
                        style: {
                            fontSize: 19.2
                        }
                    },
                        e.value);
                case "\\Large":
                    return React.createElement("div", {
                        style: {
                            fontSize: 23.04
                        }
                    },
                        e.value);
                case "\\LARGE":
                    return React.createElement("div", {
                        style: {
                            fontSize: 276.48 / 10
                        }
                    },
                        e.value);
                case "\\huge":
                    return React.createElement("div", {
                        style: {
                            fontSize: 33.184
                        }
                    },
                        e.value);
                case "\\Huge":
                    return React.createElement("div", {
                        style: {
                            fontSize: 39.808
                        }
                    },
                        e.value)
            }
        })
    }
    render() {
        return React.createElement(SelectBoxContainer, {
            data: l,
            isReadOnly: !0,
            onChange: this.props.onChange,
            value: this.props.value,
            width: 100,
            expansionWidth: 125,
            onRenderItem: this.onFontSizeRenderItem,
            title: TooltipData.getToolTipByKey("font-size").value
        })
    }
}
var l = [
    //     {
    //     key: "\\tiny",
    //     value: "tiny"
    // },
    // {
    //     key: "\\scriptsize",
    //     value: "scriptsize"
    // },
    // {
    //     key: "\\footnotesize",
    //     value: "footnotesize"
    // },
    {
        key: "\\small",
        value: "Small"
    },
    {
        key: "\\normalsize",
        value: "Normal"
    },
    {
        key: "\\large",
        value: "Large"
    }
    //, {
    //     key: "\\Large",
    //     value: "Large"
    // },
    // {
    //     key: "\\LARGE",
    //     value: "LARGE"
    // },
    // {
    //     key: "\\huge",
    //     value: "huge"
    // },
    // {
    //     key: "\\Huge",
    //     value: "Huge"
    // }
]

export default s