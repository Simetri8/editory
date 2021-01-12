import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CursorHandler from '../Editor/CursorHandler';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import FontList from '../Font/FontList';
import MatrixLayoutDetail, { MatrixLayoutDetailC, MatrixLayoutDetailB } from '../Elements/MatrixLayoutDetail';
import MatrixViewComponent from '../Elements/MatrixViewComponent';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolMatrix, { SymbolMatrixB } from './Symbol-matrix';
import SymbolSettingButton from '../Elements/SymbolSettingButton';

/// xxx(1511) /*Symbol-gather*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 27 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 1 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 3 times
/// var d = n.n(c);
/// var h = n(21)/*EditArea*/;  // 1 times
class u extends React.Component {
    render() {
        var e = {
            display: "flex",
            flexDirection: "column",
            margin: "auto 1px",
            padding: "1px 2px",
            border: "1px solid gray"
        },
        t = {
            border: "1px solid gray",
            width: 8,
            height: 0,
            margin: 1
        };
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row"
            }
        },
        React.createElement("div", {
            style: e
        },
        React.createElement("div", {
            style: t
        }), React.createElement("div", {
            style: t
        }), React.createElement("div", {
            style: t
        })), React.createElement("div", {
            style: e
        },
        React.createElement("div", {
            style: t
        }), React.createElement("div", {
            style: t
        }), React.createElement("div", {
            style: t
        })))
    }
}
/// var p = n(117)/*MatrixViewComponent*/,  // 1 times
/// m = n(24)/*EventHelper*/,  // 2 times
/// f = n(106)/*SymbolSettingButton*/,  // 1 times
/// g = n(85)/*CursorHandler*/,  // 1 times
/// y = n(5)/*sizzle*/,  // 2 times
/// A = n.n(y)
/// E = n(109)/*MatrixLayoutDetail*/,  // 5 times
/// v = n(51)/*SelectBoxContainer*/;  // 1 times
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
/// b = n(66)/*Symbol-matrix*/,  // 2 times
/// L = n(48)/*FontList*/;  // 1 times
class R extends MatrixViewComponent {
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
        return classNames("matrix-symbol", "gather-symbol", "role-mathmode-area", "role-tabular", {
            selected: !(!this.props.selected || !this.props.selected.selected)
        })
    }
    getCompositeBlockStyle() {
        var e = super.getCompositeBlockStyle();
        return _.assignIn({},
        e, {
            fontSize: this.context.mathFontSizeBase
        })
    }
    renderRowContent(e) {
        for (var t = [], n = this.props.data.column, r = 1, a = {},
        i = {
            position: "relative",
            fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.context.baseMathModeFontFamily)
        },
        s = "vertical" == this.props.data.tagDirection, l = 0; l < n; l++) {
            var c = e + "_" + l,
            u = classNames({
                selected: this.shouldShowBorder()
            });
            r++;
            t.push(React.createElement("td", {
                className: "non-select",
                key: l + "_middle",
                style: a
            }));
            t.push(React.createElement("td", {
                "data-tag-group-id": s ? this.props.data.id : void 0,
                "data-c-index": s ? l : void 0,
                "data-r-index": s ? e : void 0,
                key: this.props.data.elements[c].id,
                className: u
            },
            React.createElement(EditArea, Object.assign({},
            this.buildMetaDataFromName(c), {
                style: i,
                className: classNames("editor-cell", {
                    "tag-direction-vertical": s
                }),
                isFirstMathModeLevel: !0,
                allowEditorTag: !0,
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
    getDisplayMode() {
        return !0
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
    componentDidMount() {
        super.componentDidMount();
        this.isChildSelected() && this.recalculateBulbPosition()
    }
    recalculateBulbPosition() {
        this.forceUpdate()
    }
    shouldShowBorder() {
        return this.isSelected()
    }
    componentDidUpdate(e, t) {
        super.componentDidUpdate(e, t);
        e.data.tagDirection != this.props.data.tagDirection && this.context.notifyLineTagRender()
    }
    renderSetting() {
        if (!this.isSelectModeOnly()) {
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
    }
    getBulbAnchorLeft() {
        return this.refMap["0_0"] ? this.getElementRect(this.refMap["0_0"].editor).left - this.getElementRect(this.rootRef).left - 20 : 0
    }
    renderOpenBracket() {
        return null
    }
    renderCloseBracket() {
        return null
    }
}
var SymbolGather = new class extends SymbolMatrix {
    getViewComponent() {
        return R
    }
    getModel() {
        var e = this.getModelFromStructure({
            "0_0":
            "editor",
            "0_1": "editor",
            "1_0": "editor",
            "1_1": "editor"
        },
        "\\gather");
        return e.row = 2,
        e.column = 2,
        e
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: ["\\gather"],
            height: 30,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement(u, null)
        })
    }
    getLatexName() {
        return "\\gather"
    }
    toModel(e, t) {
        return super.toModel(e, t)
    }
    getColumnJoinText() {
        return " & & "
    }
    toLatex(e, t, n) {
        if (1 === e.column) {
            var r = t.inTable ? "gathered" : "gather*";
            return this.innerToLatex(e, t, n, r)
        }
        var a = t.inTable ? "aligned" : "align*";
        return this.innerToLatex(e, t, n, a)
    }
    toMathml(e, t) {
        var n = Object(SymbolMatrixB)(e, t);
        return n.width = "100%",
        {
            type: "math",
            display: "block",
            elements: [n]
        }
    }
}

export default SymbolGather