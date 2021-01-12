import React from 'react';
import FontList from '../Font/FontList';
import Global from '../Global';
import SelectBoxContainer from './SelectBoxContainer';
import TooltipData from '../Mathcha/TooltipData';

/// xxx(454) /*FontSelectBox*/

/*n.d(t, "a", function () {
    return c
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(51)/*SelectBoxContainer*/;  // 1 times
/// var o = n(67)/*TooltipData*/;  // 1 times
/// var s = n(11)/*Global*/;  // 1 times
/// var l = n(48)/*FontList*/;  // 8 times
class c extends React.Component {
    constructor(e) {
        super(e);
        this.onFontRenderItem = (e) => {
            return React.createElement("div", {
                style: {
                    fontFamily: FontList.textFontFamilyFromKey(e.key)
                }
            },
            e.value)
        };
        this.presetFonts = [{
            key: "pcr",
            value: FontList.textFontDisplayFromKey("pcr")
        },
        {
            key: "helvet",
            value: FontList.textFontDisplayFromKey("helvet")
        },
        {
            key: "ptm",
            value: FontList.textFontDisplayFromKey("ptm")
        }];
        if (this.props.showDefault) this.presetFonts.splice(0, 0, {
            key: "default",
            value: FontList.textFontDisplayFromKey("default")
        });
        if (Global.moreFonts()) this.presetFonts = this.presetFonts.concat([{
            key: "cmun-serif",
            value: FontList.textFontDisplayFromKey("cmun-serif")
        },
        {
            key: "cmun-sans",
            value: FontList.textFontDisplayFromKey("cmun-sans")
        },
        {
            key: "cmun-typewriter",
            value: FontList.textFontDisplayFromKey("cmun-typewriter")
        }])
    }
    render() {
        return React.createElement(SelectBoxContainer, {
            inputStyle: {
                textOverflow: "ellipsis",
                overflow: "hidden"
            },
            expansionWidth: this.props.expansionWidth,
            data: this.presetFonts,
            isReadOnly: true,
            onChange: this.props.onFontNameChange,
            value: this.props.fontName,
            width: this.props.width || 100,
            onRenderItem: this.onFontRenderItem,
            title: TooltipData.getToolTipByKey("font-name").value
        })
    }
}

export default c