import jQuery from 'jquery';
import React from 'react';
import EventHelper from '../Mathcha/EventHelper';
import MatrixLayoutDetail, { MatrixLayoutDetailC, MatrixLayoutDetailB } from '../Elements/MatrixLayoutDetail';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolSettingButton from '../Elements/SymbolSettingButton';
import TooltipData from '../Mathcha/TooltipData';

/// xxx(343) /*TableSettingComponent*/

/*n.d(t, "a", function () {
    return y
});*/
/// var r = n(0)/*React*/;  // 22 times
/// var a = n.n(r);
/// var i = n(24)/*EventHelper*/;  // 2 times
/// var o = n(106)/*SymbolSettingButton*/;  // 1 times
/// var s = n(51)/*SelectBoxContainer*/;  // 2 times
/// var l = n(67)/*TooltipData*/;  // 4 times
/// var c = n(109)/*MatrixLayoutDetail*/;  // 7 times
/// var d = n(5)/*sizzle*/;  // 2 times
/// var h = n.n(d);
function u(e) {
    return "\\array" == e
}
var p = [{
    key: "",
    value: "No"
},
{
    key: "{",
    value: "{ }"
},
{
    key: "[",
    value: "[ ]"
},
{
    key: "(",
    value: "( )"
},
{
    key: "|",
    value: "| |"
},
{
    key: "‖",
    value: "‖ ‖"
}];
var m = [{
    key: "\\matrix",
    value: "Matrix"
},
{
    key: "\\cases",
    value: "Cases"
},
{
    key: "\\array",
    value: "Array"
},
{
    key: "\\gathered",
    value: "Gathered"
},
{
    key: "\\aligned",
    value: "Aligned"
}];
var f = e => {
    jQuery(e).parent().css("background", "#d2f3d2")
},
g = e => {
    jQuery(e).parent().css("background", "")
};
class y extends React.Component {
    render() {
        var e, t, n, r, d, h = this.props,
        y = h.disableLayoutType ? null : React.createElement("layout-type", null, React.createElement("styled-select", {
            style: {
                color: "#757575"
            }
        },
        React.createElement(SelectBoxContainer, {
            data: m,
            isReadOnly: !0,
            onChange: h.onLayoutChange,
            width: 100,
            height: 100,
            value: h.text,
            title: TooltipData.getToolTipByKey("layout").value
        })));
        return React.createElement(SymbolSettingButton, {
            smaller: !0,
            keepOpenTimeDuration: 200,
            closeOnClickOutside: !u(h.text),
            onBulbMouseEnter: f,
            onBulbMouseLeave: g
        },
        React.createElement("x-setting", {
            class: "mt-common-dialog no-print",
            onMouseDown: EventHelper.focusAndCursorSelectAcquired,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
        React.createElement("main-setting", null, y, React.createElement(MatrixLayoutDetailC, null, React.createElement(MatrixLayoutDetailB, null, "Row"), React.createElement(MatrixLayoutDetail, {
            value: h.row,
            isFirstOne: !0,
            onChange: h.onRowChange
        }), (d = h, [React.createElement(MatrixLayoutDetailB, {
            key: "col_label"
        },
        "Col"), React.createElement(MatrixLayoutDetail, {
            key: "col_input",
            value: d.column,
            onChange: d.onColumnChange
        })]), (e = h.text, t = h.bracket, n = h.onBracketChange, r = h.onShowBorderDesignChange, "\\matrix" == e ? [React.createElement(MatrixLayoutDetailB, {
            key: "label"
        },
        "Bracket"), React.createElement("styled-select", {
            key: "value",
            style: {
                color: "#757575"
            }
        },
        React.createElement(SelectBoxContainer, {
            data: p,
            noAutoAddedEmpty: !0,
            isReadOnly: !0,
            onChange: n,
            width: 50,
            height: 100,
            value: t
        }))] : u(e) ? [React.createElement(MatrixLayoutDetailB, {
            key: "label"
        },
        "Border"), React.createElement("i", {
            key: "border",
            className: "fa fa-table",
            onClick: () => r(!0)
        })] : void 0))), function (e, t, n) {
            if (u(t)) return React.createElement("column-setting", {
                style: {
                    marginTop: 5,
                    display: "block"
                }
            },
            React.createElement("align-options", {
                class: "setting-group-options",
                style: {
                    marginLeft: 0
                }
            },
            React.createElement("i", {
                className: "fa fa-align-left" + ("left" == e ? " selected" : ""),
                onClick: () => n("left"),
                title: TooltipData.getToolTipByKey("align-left").value
            }), React.createElement("i", {
                className: "fa fa-align-center" + ("center" == e ? " selected" : ""),
                onClick: () => n("center"),
                title: TooltipData.getToolTipByKey("align-center").value
            }), React.createElement("i", {
                className: "fa fa-align-right" + ("right" == e ? " selected" : ""),
                onClick: () => n("right"),
                title: TooltipData.getToolTipByKey("align-right").value
            })))
        } (h.colAlign, h.text, h.changeCurrentColumnAlign)))
    }
}

export default y