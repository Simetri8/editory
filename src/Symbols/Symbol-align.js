import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CreateEditorObject from '../Elements/CreateEditorObject';
import CursorHandler from '../Editor/CursorHandler';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import FontList from '../Font/FontList';
import MatrixLayoutDetail, { MatrixLayoutDetailC, MatrixLayoutDetailB } from '../Elements/MatrixLayoutDetail';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolAlignComponent from '../Elements/SymbolAlignComponent';
import SymbolMatrix, { SymbolMatrixB } from './Symbol-matrix';
import SymbolSettingButton from '../Elements/SymbolSettingButton';

/// xxx(1520) /*Symbol-align*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 17 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 5 times
/// var d = n.n(c);
/// var h = n(21)/*EditArea*/;  // 1 times
/// var u = n(344)/*SymbolAlignComponent*/;  // 1 times
/// var p = n(66)/*Symbol-matrix*/;  // 2 times
/// var m = n(24)/*EventHelper*/;  // 2 times
/// var f = n(106)/*SymbolSettingButton*/;  // 1 times
/// var g = n(85)/*CursorHandler*/;  // 1 times
/// var y = n(109)/*MatrixLayoutDetail*/;  // 5 times
/// var A = n(5)/*sizzle*/;  // 2 times
/// var E = n.n(A);
/// var v = n(51)/*SelectBoxContainer*/;  // 1 times
function S(e) {
    EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().withHandledCursorSelected().build())
}
var C = e => {
    jQuery(e).parent().find("td.selected").css("background", "#d2f3d2")
},
x = e => {
    jQuery(e).parent().find("td.selected").css("background", "")
};
class I extends React.Component {
    render() {
        var e = this.props;
        return React.createElement(SymbolSettingButton, {
            smaller: !0,
            closeOnClickOutside: !0,
            onBulbMouseEnter: C,
            onBulbMouseLeave: x,
            childPositionByBulbOriginalPos: !0,
            left: e.left
        },
        React.createElement("x-setting", {
            style: {
                color: "#757575"
            },
            class: "mt-common-dialog  no-print",
            onMouseDown: S,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
        React.createElement("main-setting", {
            style: {
                fontSize: 12,
                alignItems: "baseline"
            }
        },
        React.createElement(MatrixLayoutDetailC, null, React.createElement(MatrixLayoutDetailB, null, "Row"), React.createElement(MatrixLayoutDetail, {
            value: e.row,
            isFirstOne: !0,
            onChange: e.onRowChange
        }), React.createElement(MatrixLayoutDetailB, null, "Col"), React.createElement(MatrixLayoutDetail, {
            value: e.column,
            onChange: e.onColumnChange
        })), React.createElement("span", {
            style: {
                paddingLeft: 10,
                paddingRight: 4
            }
        },
        "Tag Numbering"), React.createElement(SelectBoxContainer, {
            data: T,
            isReadOnly: !0,
            onChange: e.onTagDirectionChange,
            width: 100,
            value: e.tagDirection
        }))))
    }
}
var T = [{
    key: "vertical",
    value: "Vertically"
},
{
    key: "horizontal",
    value: "Horizontally"
}]
/// b = n(117)/*MatrixViewComponent*/,  // 1 times
/// L = n(2)/*lodash*/,  // 2 times
/// R = n.n(L)
/// M = n(48)/*FontList*/,  // 1 times
/// w = n(13)/*CreateEditorObject*/;  // 1 times
class O extends MatrixViewComponent {
    constructor() {
        super(...arguments);
        this.showSelectedEvenNotDescendant = !0;
        this.selfManageBaseLine = !1;
        this.handleTagDirectionChange = (e => {
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                tagDirection: e
            }))
        })
    }
    getClassName() {
        return classNames("matrix-symbol", "align-symbol", "role-mathmode-area", "role-tabular", {
            selected: !(!this.props.selected || !this.props.selected.selected)
        })
    }
    useCustomBaseLine() {
        return !1
    }
    isInlineMode() {
        return !1
    }
    afterReactRender(e, t) {
        super.afterReactRender(e, t);
        this.rootRef = ReactDOM.findDOMNode(this)
    }
    getDisplayMode() {
        return !0
    }
    getCompositeBlockStyle() {
        var e = super.getCompositeBlockStyle();
        return _.assignIn({},
        e, {
            fontSize: this.context.mathFontSizeBase
        })
    }
    shouldShowBorder() {
        return this.isSelected()
    }
    renderRowContent(e) {
        for (var t = [], n = this.props.data.column, r = 1, a = {},
        i = {
            position: "relative",
            fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.context.baseMathModeFontFamily)
        },
        s = 0; s < n; s++) {
            var l = e + "_" + s,
            c = classNames({
                selected: this.shouldShowBorder()
            }),
            u = s % 2 === 0,
            p = !u || s === n - 1,
            m = "vertical" == this.props.data.tagDirection && p;
            if (u) {
                r++;
                t.push(React.createElement("td", {
                    className: "non-select",
                    key: s + "_middle",
                    style: a
                }));
                c = classNames(c, "align-right", "first-in-pair");
            } else {
                c = classNames(c, "second-in-pair");
            }
            t.push(React.createElement("td", {
                "data-tag-group-id": m ? this.props.data.id : void 0,
                "data-c-index": m ? s : void 0,
                "data-r-index": m ? e : void 0,
                key: this.props.data.elements[l].id,
                className: c
            },
            React.createElement(EditArea, Object.assign({},
            this.buildMetaDataFromName(l), {
                style: i,
                className: classNames("editor-cell", {
                    "tag-direction-vertical": m
                }),
                isFirstMathModeLevel: !0,
                allowEditorTag: p,
                displayMode: !0,
                showBorder: !1
            }))))
        }
        return t.push(React.createElement("td", {
            className: "non-select",
            key: "last",
            style: a
        })),
        a.width = Math.round(100 / r) + "%",
        t
    }
    recalculateBulbPosition() {
        this.forceUpdate()
    }
    getBulbAnchorLeft() {
        return this.refMap["0_0"] ? this.getElementRect(this.refMap["0_0"].editor).left - this.getElementRect(this.rootRef).left - 20 : 0
    }
    componentDidMount() {
        super.componentDidMount();
        this.isChildSelected() && this.recalculateBulbPosition()
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        e.data.tagDirection != this.props.data.tagDirection && this.context.notifyLineTagRender()
    }
    renderSetting() {
        var e = this.props.data;
        if (this.isChildSelected() && !this.isTabularDescendantSelected() && !this.state.showBorderDesign) {
            var t = this.getBulbAnchorLeft();
            return React.createElement(I, {
                left: t,
                onRowChange: this.onRowChange,
                onColumnChange: this.onColumnChange,
                onTagDirectionChange: this.handleTagDirectionChange,
                text: e.text,
                row: this.state.row,
                column: this.state.column,
                tagDirection: e.tagDirection || "horizontal"
            })
        }
    }
    renderOpenBracket() {
        return null
    }
    renderCloseBracket() {
        return null
    }
}
var SymbolAlign = new class extends SymbolMatrix {
    getViewComponent() {
        return O
    }
    getModel() {
        var e = this.getModelFromStructure({
            "0_0":
            "editor",
            "0_1": "editor"
        },
        "\\align");
        return e.elements["0_1"] = CreateEditorObject.createOneTextEditor("="),
        e.row = 1,
        e.column = 2,
        e
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\align"],
            height: 30,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement(SymbolAlignComponent, null)
        })
    }
    getLatexName() {
        return "\\align"
    }
    toLatex(e, t, n) {
        return super.innerToLatex(e, t, n, "align*")
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        return n.columnalign = _.times(e.column, e => e % 2 === 0 ? "right" : "left").join(" "),
        n.columnspacing = _.times(e.column, e => e % 2 === 0 ? "0em" : "2em").join(" "),
        1 === n.rows[0].cells.length && (n.columnalign = "center"),
        n.width = "100%",
        {
            type: "math",
            display: "block",
            elements: [n]
        }
    }
}

export default SymbolAlign