import jQuery from 'jquery';
import React from 'react';
import BracketHelper from '../Editor/BracketHelper';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EventHelper from '../Mathcha/EventHelper';
import FontList from '../Font/FontList';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolSettingButton from '../Elements/SymbolSettingButton';
import VComposedSymbol from '../Elements/VComposedSymbol';

/// xxx(1350) /*Symbol-big-delimiter*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 7 times
/// var a = n.n(r);
/// var i = n(249)/*VComposedSymbol*/;  // 1 times
/// var o = n(152)/*BracketHelper*/;  // 3 times
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var c = n(106)/*SymbolSettingButton*/;  // 1 times
/// var d = n(24)/*EventHelper*/;  // 1 times
/// var h = n(51)/*SelectBoxContainer*/;  // 3 times
/// var u = n(7)/*PropUpdateHelper*/;  // 4 times
/// var p = n(5)/*sizzle*/;  // 2 times
/// var m = n.n(p);
/// var f = n(48)/*FontList*/;  // 1 times
/// var g = n(13)/*CreateEditorObject*/;  // 1 times
class y extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.selfManageBaseLine = !0;
        this.containerClassName = "big-delimiter-symbol";
        this.onSizeChanged = (e => {
            var t = PropUpdateHelper.set(this.props.data, "size", e);
            this.props.onDataChanged(t)
        });
        this.onBracketNameChanged = (e => {
            var t = PropUpdateHelper.set(this.props.data, "bracketName", e);
            this.props.onDataChanged(t)
        });
        this.onLeftRightChanged = (e => {
            var t = PropUpdateHelper.set(this.props.data, "isClose", "left" != e);
            t = PropUpdateHelper.set(t, "text", "left" == e ? "\\bigl" : "\\bigr");
            this.props.onDataChanged(t)
        });
        this.onBulbMouseEnter = (e => {
            jQuery(e).parent().css("background", "#d2f3d2")
        });
        this.onBulbMouseLeave = (e => {
            jQuery(e).parent().css("background", "")
        })
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.data.bracketName != this.props.data.bracketName || e.data.size != this.props.data.size || e.data.isClose != this.props.data.isClose
    }
    getSizeEmFromLatexName(e) {
        switch (e) {
        case "big":
            return 1.5;
        case "Big":
            return 2.2;
        case "bigg":
            return 2.9;
        case "Bigg":
            return 3.6
        }
    }
    getOpenCloseBracketName(e, t) {
        return (t ? "close-" : "open-") + e
    }
    renderSetting() {
        if (!this.isSelectModeOnly()) return this.isSelected() ? React.createElement(SymbolSettingButton, {
            smaller: !0,
            onBulbMouseEnter: this.onBulbMouseEnter,
            onBulbMouseLeave: this.onBulbMouseLeave
        },
        React.createElement("x-setting", Object.assign({
            style: {
                color: "#757575"
            },
            class: "mt-common-dialog  no-print"
        },
        EventHelper.getStopPropagationForFocusClickMouseDown()), React.createElement(SelectBoxContainer, {
            data: A,
            isReadOnly: !0,
            onChange: this.onSizeChanged,
            width: 50,
            value: this.props.data.size
        }), React.createElement(SelectBoxContainer, {
            data: E,
            isReadOnly: !0,
            onChange: this.onBracketNameChanged,
            width: 50,
            value: this.props.data.bracketName
        }), React.createElement(SelectBoxContainer, {
            data: v,
            isReadOnly: !0,
            onChange: this.onLeftRightChanged,
            width: 50,
            value: this.props.data.isClose ? "right" : "left"
        }))) : void 0
    }
    renderComponent() {
        var e = this.getOpenCloseBracketName(this.props.data.bracketName, this.props.data.isClose),
        t = this.getSizeEmFromLatexName(this.props.data.size),
        n = this.getFontSizePixel(),
        r = n * t,
        s = {
            height: t + "em",
            width: BracketHelper.bracketWitdhFromHeight(r, n, e),
            fontFamily: FontList.mathFontFamiltyFromKey("\\mathrm", this.context.baseMathModeFontFamily)
        };
        return React.createElement("big-delimiter", {
            style: s
        },
        React.createElement(VComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            notifyData: this.props.data,
            baseMathModeFontFamily: this.context.baseMathModeFontFamily,
            delimiter: e,
            fontSize: this.getFontSizePixel()
        }), this.renderSetting())
    }
}
var A = [{
    key: "big",
    value: "big"
},
{
    key: "Big",
    value: "Big"
},
{
    key: "bigg",
    value: "bigg"
},
{
    key: "Bigg",
    value: "Bigg"
}],
E = [{
    key: "brace",
    value: "{ }"
},
{
    key: "bracket",
    value: "[ ]"
},
{
    key: "parenthesis",
    value: "( )"
},
{
    key: "ceil",
    value: "⌈ ⌉"
},
{
    key: "floor",
    value: "⌊ ⌋"
},
{
    key: "vert",
    value: "| |"
},
{
    key: "Vert",
    value: "‖ ‖"
},
{
    key: "angle",
    value: "< >"
},
{
    key: "uparrow",
    value: "↑ ↑"
},
{
    key: "Uparrow",
    value: "⇑ ⇑"
},
{
    key: "downarrow",
    value: "↓ ↓"
},
{
    key: "Downarrow",
    value: "⇓ ⇓"
},
{
    key: "updownarrow",
    value: "↕ ↕"
},
{
    key: "Updownarrow",
    value: "⇕ ⇕"
},
{
    key: "slash",
    value: "/ \\"
}],
v = [{
    key: "left",
    value: "Left"
},
{
    key: "right",
    value: "Right"
}];
var SymbolBigDelimiter = new class extends CompositeSymbolBase {
    getViewComponent() {
        return y
    }
    getModel(e) {
        e = e || {
            names:
            ["\\bigl"]
        };
        var t = CreateEditorObject.createComposite(e.names[0]);
        return t.bracketName = "brace",
        t.size = "big",
        t.isClose = "\\bigr" == e.names[0],
        t
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: ["\\bigl"],
            symbol: "{ [ (",
            description: "manually adjustable bracket size "
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\bigr"],
            symbol: "} ] )",
            description: "manually adjustable bracket size "
        })]
    }
    toModel(e, t, n) {
        n || (n = "(");
        var r = "";
        return r = n.substring(1),
        "\\lceil" == n && (r = "ceil", t = "l"),
        "\\rceil" == n && (r = "ceil", t = "r"),
        "\\lfloor" == n && (r = "floor", t = "l"),
        "\\rfloor" == n && (r = "floor", t = "r"),
        "<" == n && (r = "angle", t = "l"),
        ">" == n && (r = "angle", t = "r"),
        "\\{" == n && (r = "brace", t = "l"),
        "\\}" == n && (r = "brace", t = "r"),
        "[" == n && (r = "bracket", t = "l"),
        "]" == n && (r = "bracket", t = "r"),
        "(" == n && (r = "parenthesis", t = "l"),
        ")" == n && (r = "parenthesis", t = "r"),
        "|" == n && (r = "vert"),
        "/" == n && (r = "slash", t = "l"),
        "\\backslash" == n && (r = "slash", t = "r"),
        this.toModelInner(e, "r" == t, r)
    }
    toModelInner(e, t, n) {
        var r = this.getModel();
        return r.size = e,
        r.isClose = t,
        r.bracketName = n,
        r.text = t ? "\\bigr" : "\\bigl",
        r
    }
    toLatex(e) {
        var t = e.isClose ? "r" : "l",
        n = BracketHelper.bracketNameToLatex((e.isClose ? "close-" : "open-") + e.bracketName);
        return "\\".concat(e.size).concat(t).concat(n)
    }
    toMathml(e, t) {
        var n = this.getMathmlSize(e.size);
        return {
            type: "mo",
            value: BracketHelper.bracketNameUnicodeSymbol((e.isClose ? "close-" : "open-") + (e.bracketName || "brace")),
            maxsize: n,
            minsize: n
        }
    }
    getMathmlSize() {
        switch (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "big") {
        case "big":
            return "1.2em";
        case "Big":
            return "1.623em";
        case "bigg":
            return "2.047em";
        case "Bigg":
            return "2.470em"
        }
        return "1.2em"
    }
}

export default SymbolBigDelimiter