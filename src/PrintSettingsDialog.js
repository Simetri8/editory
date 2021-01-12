import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Api from './Api';
import ColorHelper from './Mathcha/ColorHelper';
import DiagramIdHelper from './Elements/DiagramIdHelper';
import DOMHelper from './Elements/DOMHelper';
import ElementTypes from './Elements/ElementTypes';
import Geometry from './Geometry/Geometry';
import KeyDownEventRegisterer from './Mathcha/KeyDownEventRegisterer';
import MathGlobal from './MathGlobal';
import MathType, { ModalDialogFromMathType } from './MathType';
import n463 from './n463';
import PrintHelper from './PrintHelper';
import PrintSettingsMarginInput from './Document/PrintSettingsMarginInput';
import SelectBoxContainer from './Editor/SelectBoxContainer';
import SymbolUnderlineSvg from './Symbols/SymbolUnderlineSvg';
import TimerHelper from './Mathcha/TimerHelper';
import ToolbarIcons from './Editor/Toolbar/ToolbarIcons';

/// xxx(1572) /*PrintSettingsDialog*/

/// var k = n(0)/*React*/;  // 82 times
/// var B = n.n(k);
/// var Pe = n(3);  // 19 times
/// var Fe = n.n(Pe);
/// var Ge = n(91)/*MathType*/;  // 3 times
/// var n19 = n(19)/*TimerHelper*/;  // 5 times
/// var Ut = n(2)/*lodash*/;  // 9 times
/// var Wt = n.n(Ut);
/// var Zt = n(35)/*slicedToArray*/;  // 3 times
/// var Xt = n.n(Zt);
/// var Pa = n(28)/*MathGlobal*/;  // 2 times
/// var Xa = n(4)/*DOMHelper*/;  // 31 times
/// var gi = n(5)/*sizzle*/;  // 58 times
/// var yi = n.n(gi);
/// var vs = n(25)/*ColorHelper*/;  // 1 times
/// var Xo = n(463)/*n463*/;  // 1 times
/// var zz = n(195)/*PrintSettingsMarginInput*/;  // 4 times
/// var as = n(37)/*ToolbarIcons*/;  // 1 times
/// var ur = n(6)/*DiagramIdHelper*/;  // 4 times
/// var ls = n(51)/*SelectBoxContainer*/;  // 2 times
/// var ps = n(38)/*ElementTypes*/;  // 4 times
/// var ms = n(1)/*Geometry*/;  // 9 times
/// var Rs = n(333)/*SymbolUnderlineSvg*/;  // 1 times
/// var Os = n(131)/*KeyDownEventRegisterer*/;  // 2 times
/// var api = n(1542)/*Api*/;  // 1 times
/// var printHelper = n(1575)/*PrintHelper*/;  // 2 times
function ds(e, t) {
    return {
        width: e,
        height: t,
        unit: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "inch",
        orientation: "portrait"
    };
}
var Jo = () => {
    return React.createElement("g", {
        style: {
            stroke: "black",
            fill: "none"
        }
    },
    React.createElement("g", null, React.createElement("path", {
        d: " M10.25,7.5 L80.25,7.5 L80.25,92.5 L10.25,92.5 Z",
        style: {
            strokeWidth: 1,
            stroke: "rgb(0,0,0)",
            fill: "rgb(255,255,255)"
        }
    })), React.createElement("g", null, React.createElement("g", null, React.createElement("path", {
        d: "  M10,49 L27.91,49",
        style: {
            stroke: "rgb(65,117,5)",
            strokeWidth: 1,
            fill: "none"
        }
    })), React.createElement("g", null, React.createElement("path", {
        d: "  M63,49 L80.91,49",
        style: {
            stroke: "rgb(65,117,5)",
            strokeWidth: 1,
            fill: "none"
        }
    })), React.createElement("g", null, React.createElement("path", {
        d: "  M45.53,92.88 L45.53,76.25",
        style: {
            stroke: "rgb(65,117,5)",
            strokeWidth: 1,
            fill: "none"
        }
    })), React.createElement("g", null, React.createElement("path", {
        d: "  M45.53,23.55 L45.53,6.92",
        style: {
            stroke: "rgb(65,117,5)",
            strokeWidth: 1,
            fill: "none"
        }
    }))), React.createElement("g", null, React.createElement("path", {
        d: " M27.63,23.75 L62.88,23.75 L62.88,76.25 L27.63,76.25 Z",
        style: {
            strokeWidth: 1,
            stroke: "rgb(155,155,155)",
            fill: "rgb(255,255,255)",
            strokeDasharray: "1.125,3.35"
        }
    })), React.createElement("g", null));
};
var ts = {
    fontSize: 12,
    padding: 3,
    margin: "3px 1px 1px 1px",
    display: "inline-block",
    height: 16,
    width: 26,
    textAlign: "center",
    position: "absolute"
};
class es extends React.Component {
    renderPageMarginText() {
        return React.createElement("span", {
            style: {
                color: "gray",
                width: "100%",
                textAlign: "center",
                display: "inline-block",
                paddingTop: 5,
                fontWeight: "bold"
            }
        },
        React.createElement("span", null, "Page Margin"), React.createElement("span", {
            style: {
                fontWeight: "normal",
                paddingLeft: 4
            }
        },
        "(inches)"));
    }
    render() {
        var e = this.props.marginInfo;
        var t = e.left;
        var n = e.top;
        var r = e.right;
        var a = e.bottom;
        return React.createElement("div", {
            className: "role-margin-input-root-container",
            style: {
                position: "relative",
                height: 200,
                width: 250,
                border: "1px solid lightgray",
                background: "white",
                marginTop: 5,
                marginBottom: 5
            }
        },
        this.renderPageMarginText(), React.createElement("div", {
            style: {
                position: "relative",
                left: 24
            }
        },
        React.createElement("svg", {
            style: {
                position: "absolute",
                left: 60,
                top: 35,
                width: 150,
                height: 150
            }
        },
        Jo()), React.createElement(PrintSettingsMarginInput, {
            style: _.assignIn({},
            ts, {
                left: 30,
                top: 70
            }),
            min: 0,
            max: 1E3,
            decimals: 2,
            disableSlider: true,
            value: t,
            onValueChanged: (e) => {
                this.props.onMarginInfoChanged(_.assignIn({},
                this.props.marginInfo, {
                    left: e
                }));
            },
            onValueChanging: () => {}
        }), React.createElement(PrintSettingsMarginInput, {
            style: _.assignIn({},
            ts, {
                left: 90,
                top: 10
            }),
            min: 0,
            max: 1E3,
            decimals: 2,
            disableSlider: true,
            value: n,
            onValueChanged: (e) => {
                this.props.onMarginInfoChanged(_.assignIn({},
                this.props.marginInfo, {
                    top: e
                }));
            },
            onValueChanging: () => {}
        }), React.createElement(PrintSettingsMarginInput, {
            style: _.assignIn({},
            ts, {
                left: 150,
                top: 70
            }),
            min: 0,
            max: 1E3,
            decimals: 2,
            disableSlider: true,
            value: r,
            onValueChanged: (e) => {
                this.props.onMarginInfoChanged(_.assignIn({},
                this.props.marginInfo, {
                    right: e
                }));
            },
            onValueChanging: () => {}
        }), React.createElement(PrintSettingsMarginInput, {
            style: _.assignIn({},
            ts, {
                left: 90,
                top: 132
            }),
            min: 0,
            max: 1E3,
            decimals: 2,
            disableSlider: true,
            value: a,
            onValueChanged: (e) => {
                this.props.onMarginInfoChanged(_.assignIn({},
                this.props.marginInfo, {
                    bottom: e
                }));
            },
            onValueChanging: () => {}
        })));
    }
}
var ns = {
    height: 34,
    background: "#f7f7f7"
};
class rs extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            element: React.createElement("div", {
                style: ns
            }),
            hide: false !== e.hide
        };
    }
    shouldComponentUpdate(e, t) {
        return this.state != t;
    }
    setHide(e) {
        this.setState({
            hide: e
        });
    }
    updateElement(e) {
        this.setState({
            element: e
        });
    }
    render() {
        return React.createElement("div", {
            style: _.assignIn({
                position: "relative",
                background: "#f7f7f7",
                height: 34
            },
            this.props.containerStyle),
            className: "role-toolbar-wrapper"
        },
        React.createElement("div", {
            style: {
                position: "absolute",
                display: this.state.hide ? void 0 : "none",
                left: 0,
                top: 0,
                padding: 9,
                fontWeight: "bold",
                fontSize: "1.1em"
            }
        },
        "header" == this.props.type ? "Header" : "Footer"), React.createElement("div", {
            style: {
                display: this.state.hide ? "none" : void 0
            }
        },
        this.state.element));
    }
}
var os = {
    flexGrow: 1,
    padding: 0,
    marginTop: 0,
    minHeight: 96
};
var ss = {
    position: "static",
    paddingLeft: 0,
    top: 0,
    width: "100%",
    minWidth: "none",
    boxShadow: "none",
    border: "none",
    borderBottom: "1px solid lightgray"
};
class is extends React.Component {
    constructor(e) {
        super(e);
        this.handleMathTypeRef = (e) => {
            this.mathTypeRef = e;
        };
        this.handleFakeToolbarRef = (e) => {
            this.fakeToolbarRef = e;
        };
        this.handleMathTypeModelChanged = (e) => {
            this.props.onLinesChanged(e.lines);
            console.log("model changed");
        };
        this.handleRequestRenderToolbar = (e) => {
            TimerHelper.next(() => {
                if (this.fakeToolbarRef) {
                    this.fakeToolbarRef.updateElement(e);
                }
            });
        };
        this.handleFocusStateChanged = (e) => {
            TimerHelper.waitALitteWhile(() => {
                if (this.fakeToolbarRef) {
                    switch (e) {
                    case "focus":
                        case "lostInputFocus":
                        this.fakeToolbarRef.setHide(false);
                    }
                }
            });
        };
        this.state = {
            mainModel: {
                id: DiagramIdHelper.nextId(),
                lines: this.props.lines,
                pageSettings: {
                    isDarkMode: this.props.fixedContextHandler.isDarkMode()
                }
            }
        };
    }
    getMathTypeElement() {
        return this.mathTypeRef.getMathTypeHtmlElement();
    }
    setNewModel(e) {
        this.mathTypeRef.setModel(e, null);
    }
    render() {
        return React.createElement("div", {
            className: "header" == this.props.type ? "role-header-edit-root-container" : "role-footer-edit-root-container",
            style: {
                display: "flex",
                flexDirection: "column",
                height: 150,
                position: "relative"
            }
        },
        React.createElement(rs, {
            type: this.props.type,
            ref: this.handleFakeToolbarRef
        }), React.createElement("div", {
            style: {
                overflow: "auto",
                flex: 1,
                marginTop: 0,
                background: "#a7a5a5"
            }
        },
        React.createElement("div", {
            style: {
                margin: "auto",
                marginTop: 5,
                marginBottom: 5,
                width: this.props.pageWidth + 20
            }
        },
        React.createElement("div", {
            className: "header" == this.props.type ? "role-math-type-header-container" : "role-math-type-footer-container",
            style: {
                width: this.props.pageWidth,
                padding: 5,
                background: "white",
                boxShadow: "0 0 1px black",
                margin: "auto"
            }
        },
        React.createElement(MathType, {
            hideUndoRedo:
            true,
            model: this.state.mainModel,
            requestRenderToolbar: this.handleRequestRenderToolbar,
            ancestorFixedSelector: "modal-container.mt-common-dialog",
            autoCompleteUsingPositionFixed: true,
            onModelChanged: this.handleMathTypeModelChanged,
            onFocusStateChanged: this.handleFocusStateChanged,
            ref: this.handleMathTypeRef,
            toolbarEnabled: true,
            restrictedView: true,
            toolbarExportOptionsHide: true,
            toolbarStyle: ss,
            style: os,
            preventFocusOnCreated: true,
            rootAdditionalSymbolSupports: ["\\page-number", "\\page-count", "\\page-section-level-1", "\\page-section-level-2", "\\page-section-level-3"],
            mathTemplatesDisable: true
        })))), React.createElement("div", {
            style: {
                position: "absolute",
                right: 2,
                bottom: 2,
                zIndex: 10
            }
        },
        React.createElement("button", {
            className: "btn-normal",
            style: {
                border: "1px solid #9E9E9E",
                background: "rgb(247,247,247)"
            },
            onClick: () => {
                return this.props.requestFullView(this.mathTypeRef.getModel());
            }
        },
        ToolbarIcons.expand)));
    }
}
var hs = [{
    key: "letter",
    value: 'Letter (8.5" x 11")',
    pageSizeInfo: ds(8.5, 11)
},
{
    key: "tabloid",
    value: 'Tabloid (11" x 17")',
    pageSizeInfo: ds(11, 17)
},
{
    key: "legal",
    value: 'Legal (8.5" x 14")',
    pageSizeInfo: ds(8.5, 14)
},
{
    key: "a3",
    value: 'A3 (11.69" x 16.54")',
    pageSizeInfo: ds(11.69, 16.54)
},
{
    key: "a4",
    value: 'A4 (8.27" x 11.69")',
    pageSizeInfo: ds(8.27, 11.69)
},
{
    key: "a5",
    value: 'A5 (5.83" x 8.27")',
    pageSizeInfo: ds(5.83, 8.27)
},
{
    key: "b4",
    value: 'B4 (9.84" x 13.90")',
    pageSizeInfo: ds(9.84, 13.9)
},
{
    key: "b5",
    value: 'B5 (6.93" x 9.84")',
    pageSizeInfo: ds(6.93, 9.84)
}];
var us = [{
    key: "portrait",
    value: "Portrait"
},
{
    key: "landscape",
    value: "Landscape"
}];
class cs extends React.Component {
    constructor() {
        super(...arguments);
        this.handlePageSizeChanged = (e) => {
            var t = hs.find((t) => {
                return t.key === e;
            });
            this.props.onPageSizeInfoChanged(_.assignIn({},
            t.pageSizeInfo, {
                orientation: this.props.pageSizeInfo.orientation
            }));
        };
        this.handleOrientationChanged = (e) => {
            this.props.onPageSizeInfoChanged(_.assignIn({},
            this.props.pageSizeInfo, {
                orientation: e
            }));
        };
    }
    render() {
        var e = this.props.pageSizeInfo;
        var t = e.width;
        var n = e.height;
        var r = e.unit;
        var a = e.orientation;
        var i = hs.find((e) => {
            return e.pageSizeInfo.width === t && e.pageSizeInfo.height === n && e.pageSizeInfo.unit === r;
        });
        return i ? React.createElement("div", {
            className: "role-page-size-root-container",
            style: {
                width: 240,
                border: "1px solid lightgray",
                background: "white",
                paddingLeft: 10,
                marginLeft: -1,
                marginTop: 5,
                marginBottom: 5
            }
        },
        React.createElement("div", {
            style: {
                textAlign: "center",
                padding: 5,
                marginBottom: 8,
                fontWeight: "bold"
            }
        },
        React.createElement("span", null, "Page Size")), React.createElement("div", {
            style: {
                paddingBottom: 3
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 80
            }
        },
        "Page:"), React.createElement(SelectBoxContainer, {
            width: 150,
            style: {
                display: "inline-block",
                fontSize: 12
            },
            selectBoxStyle: {
                height: 15
            },
            value: i.key,
            data: hs,
            onChange: this.handlePageSizeChanged
        })), React.createElement("div", {
            style: {
                paddingBottom: 3
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 80
            }
        },
        "Orientation:"), React.createElement(SelectBoxContainer, {
            width: 150,
            style: {
                display: "inline-block",
                fontSize: 12
            },
            selectBoxStyle: {
                height: 15
            },
            value: a,
            data: us,
            onChange: this.handleOrientationChanged
        }))) : React.createElement("div", null);
    }
}
var fs = new class {
    handlePaddingMarginLine(e) {
        if (!e.istFirstLine) {
            e.element.style.paddingTop = "0px";
            e.element.style.marginTop = "0px";
        }
        if (!e.isLastLine) {
            e.element.style.paddingBottom = "0px";
            e.element.style.marginBottom = "0px";
        }
    }
    getRectWithMargin(e) {
        var t = DOMHelper.getElementRect(e);
        var n = DOMHelper.getComputedStyleAsNumber(e, "marginTop");
        var r = DOMHelper.getComputedStyleAsNumber(e, "marginBottom");
        return {
            left: t.left,
            top: t.top - n,
            right: t.right,
            bottom: t.bottom + r
        };
    }
};
var gs = new class {
    getRectBounding(e) {
        var t = DOMHelper.getElementRect(e);
        return {
            left: t.left,
            top: t.top,
            right: t.right,
            bottom: t.bottom
        };
    }
    cloneMathTypeForPrint(e, t) {
        var n = e.cloneNode(false);
        var r = jQuery(e).find(">math-edit-container").get(0).cloneNode(true);
        return n.appendChild(r),
        n.style.padding = "0px",
        n.style.width = "".concat(t, "px"),
        jQuery(n).removeClass("math-type-no-print"),
        jQuery(n).addClass("math-type-for-print"),
        n;
    }
};
var ys = new class {
    parse(e) {
        var t = jQuery(e).find(">math-edit-container>edit-area").get(0);
        var n = DOMHelper.findEditLines(t);
        return {
            lines: this.processLines(n, true),
            mathTypeHtml: e
        };
    }
    hasLinePrefix(e) {
        var t = jQuery(e).find(">x-prefix");
        return ! (t.length <= 0 || _.isEmpty(t.get(0).innerText));
    }
    processLines(e, t) {
        return e.flatMap((e) => {
            var n = DOMHelper.findBlocks(e);
            var r = n.flatMap((n) => {
                return this.findPrintBlocks(n, t, e);
            });
            return DOMHelper.isSectionLine(e) ? [{
                blocks: [],
                lineHtml: e,
                rect: gs.getRectBounding(e),
                editAreaType: this.getEditAreaType(e),
                subLineCount: 1,
                subLineIndex: 0,
                isBreakable: false,
                hasPrefix: this.hasLinePrefix(e)
            }] : 0 === n.length ? [{
                blocks: [],
                lineHtml: e,
                rect: gs.getRectBounding(e),
                editAreaType: this.getEditAreaType(e),
                subLineCount: 1,
                subLineIndex: 0,
                isBreakable: false,
                hasPrefix: this.hasLinePrefix(e)
            }] : this.combineToPrintLine(r, e);
        });
    }
    findPrintBlocks(e, t, n) {
        switch (e.tagName) {
        case ElementTypes.block:
            var r = this.buildCharIndexRects(e);
            return this.collapseToLineRects(r, e);
        case ElementTypes.composite:
            if (DOMHelper.isMultiline(e)) {
                return [{
                    type: "multiline-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e)
                }];
            }
            if (DOMHelper.isMathContainer(e) && !DOMHelper.isInlineMathContainer(e)) {
                return [{
                    type: "math-container-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e)
                }];
            }
            if (DOMHelper.isInlineMathContainer(e)) {
                return [{
                    type: "inline-math-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    leadingSpaceWidth: 0,
                    trailingSpaceWidth: 0,
                    alignRight: "right" == jQuery(n).css("text-align")
                }];
            }
            if (DOMHelper.isTheorem(e)) {
                var a = DOMHelper.findEditLines(jQuery(e).find(">edit-area").get(0));
                return [{
                    type: "theorem-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    lines: this.processLines(a, false)
                }];
            }
            if (DOMHelper.isAlignBlock(e)) {
                return [{
                    type: "align-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    lines: jQuery(e).find(">x-matrix>table>tbody>tr").toArray().map((e) => {
                        return {
                            lineHtml: e,
                            rect: gs.getRectBounding(e),
                            subLineCount: 1,
                            subLineIndex: 0
                        };
                    })
                }];
            }
            if (DOMHelper.isGatherBlock(e)) {
                return [{
                    type: "gather-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    lines: jQuery(e).find(">x-matrix>table>tbody>tr").toArray().map((e) => {
                        return {
                            lineHtml: e,
                            rect: gs.getRectBounding(e),
                            subLineCount: 1,
                            subLineIndex: 0
                        };
                    })
                }];
            }
            if (DOMHelper.isTocBlock(e)) {
                return [{
                    type: "toc-block",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    lines: jQuery(e).find(">toc-wrapper>edit-area>x-line").toArray().map((e) => {
                        return {
                            lineHtml: e,
                            rect: gs.getRectBounding(e),
                            subLineCount: 1,
                            subLineIndex: 0
                        };
                    })
                }];
            }
            if (DOMHelper.isTable(e)) {
                return [this.constructTableBlock(e)];
            }
            if (DOMHelper.isPageBreak(e)) {
                return [{
                    type: "page-break",
                    rect: gs.getRectBounding(e)
                }];
            }
            if (DOMHelper.isTextModeGroup(e) && t && !jQuery(e).hasClass("group-symbol-collapsed")) {
                var i = DOMHelper.findEditLines(jQuery(e).find(">edit-area").get(0));
                return [{
                    type: "text-mode-group",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    lines: this.processLines(i, false)
                }];
            }
            if (DOMHelper.isUnderlineSection(e)) {
                var o = DOMHelper.findEditLines(jQuery(e).find(">edit-area").get(0));
                return [{
                    type: "underline-section",
                    blockHtml: e,
                    rect: gs.getRectBounding(e),
                    lines: this.processLines(o, false)
                }];
            }
            return [{
                type: "non-text-block",
                blockHtml: e,
                rect: fs.getRectWithMargin(e)
            }];
        case ElementTypes.opensymbolblock:
            case ElementTypes.closesymbolblock:
            return [{
                type: "non-text-block",
                blockHtml: e,
                rect: fs.getRectWithMargin(e)
            }];
        }
    }
    constructTableBlock(e) {
        var t = jQuery(e).find(">x-matrix>table>tbody>tr").toArray();
        var n = jQuery(e).find(">x-matrix>table>colgroup>col").length;
        var r = [];
        var a = {
            type: "table-line",
            trs: [t[0]],
            isSubLine: false,
            rect: gs.getRectBounding(t[0])
        };
        r.push(a);
        var i = 1;
        for (; i < t.length; i++) {
            var o = t[i];
            if (o.children.length < n) {
                a.trs.push(o);
                a.rect = Geometry.expandMaxRectBounding(a.rect, gs.getRectBounding(o));
            } else {
                a = {
                    type: "table-line",
                    isSubLine: false,
                    rect: gs.getRectBounding(o),
                    trs: [o]
                };
                r.push(a);
            }
        }
        var s = null;
        var l = jQuery(e).find(">x-matrix>.role-table-caption-container");
        return l.length > 0 && (s = {
            type: "table-caption-line",
            html: l.get(0),
            rect: gs.getRectBounding(l.get(0)),
            isSubLine: false
        }),
        {
            type: "table-block",
            blockHtml: e,
            rect: gs.getRectBounding(e),
            lines: r,
            captionLine: s
        };
    }
    buildCharIndexRects(e) {
        var t = e.innerText;
        var n = new Array(t.length);
        var r = 0;
        for (; r < t.length; r++) {
            var a = DOMHelper.rangeFrom2Indexes(e, r, r + 1);
            var i = gs.getRectBounding(a);
            n[r] = {
                rect: i,
                index: r
            };
        }
        return n;
    }
    collapseToLineRects(e, t) {
        if (0 === e.length) {
            return [];
        }
        var n = {
            type: "text-block",
            start: 0,
            end: 0,
            textBlockHtml: t,
            lineIndex: 0,
            rect: e[0].rect
        };
        var r = [];
        r.push(n);
        var a = 1;
        for (; a < e.length; a++) {
            var i = e[a];
            if (this.isSameLinePos(n.rect, i.rect)) {
                n.rect = Geometry.expandMaxRectBounding(n.rect, i.rect);
                n.end = a;
            } else {
                n = {
                    type: "text-block",
                    start: a,
                    end: a,
                    textBlockHtml: t,
                    lineIndex: n.lineIndex + 1,
                    rect: e[a].rect
                };
                r.push(n);
            }
        }
        return r;
    }
    isSameLinePos(e, t) {
        return Math.abs(e.top - t.top) < 1 && Math.abs(e.bottom - t.bottom) < 1;
    }
    combineToPrintLine(e, t) {
        if (0 === e.length) {
            return [];
        }
        var n = [];
        var r = {
            blocks: [],
            rect: null,
            lineHtml: t,
            editAreaType: this.getEditAreaType(t),
            subLineIndex: 0,
            subLineCount: 0,
            isBreakable: true,
            hasPrefix: this.hasLinePrefix(t)
        };
        n.push(r);
        var a = 0;
        for (; a < e.length; a++) {
            var i = e[a];
            if (("math-container-block" != i.type && "align-block" != i.type && "gather-block" != i.type && "multiline-block" != i.type && "table-block" != i.type && "text-mode-group" != i.type && "underline-section" != i.type && "page-break" != i.type && "theorem-block" != i.type || 0 === a) && this.isLineRectIntersect(r.rect, i.rect)) {
                r.rect = Geometry.expandMaxRectBounding(r.rect, i.rect);
                r.blocks.push(i);
            } else {
                r = {
                    blocks: [i],
                    rect: i.rect,
                    lineHtml: t,
                    editAreaType: this.getEditAreaType(t),
                    subLineIndex: n.length,
                    subLineCount: 0,
                    isBreakable: true,
                    hasPrefix: this.hasLinePrefix(t)
                };
                n.push(r);
            }
        }
        return n.forEach((e) => {
            return e.subLineCount = n.length;
        }),
        n;
    }
    isLineRectIntersect(e, t) {
        return ! (null != e && null != t && (Math.round(e.bottom) <= Math.round(t.top) || t.bottom <= e.top || Math.round(e.bottom) <= Math.round(t.top) + 2 && e.right >= t.left + (e.right - e.left) / 2));
    }
    getEditAreaType(e) {
        return jQuery(e).hasClass("root") ? "root" : jQuery(e).hasClass("text-mode") ? "text" : "math";
    }
};
var As = new class {
    construct(e) {
        var t = this.constructLines(e.lines, {
            type: "root-block"
        });
        return this.assignSpacingForLines(t),
        {
            lines: t,
            mathTypeHtml: e.mathTypeHtml
        };
    }
    assignSpacingForLines(e) {
        e.forEach((e) => {
            if ("page-break-line" != e.type && (this.assignSpacing(e), e.parentBlockInfo && e.parentBlockInfo.ancestorBlockInfo)) {
                var t = e.parentBlockInfo.ancestorBlockInfo;
                for (; t;) {
                    if (t.line) {
                        this.assignSpacing(t.line);
                    }
                    t = t.ancestorBlockInfo;
                }
            }
        });
    }
    assignSpacing(e) {
        if ("table-line" != e.type && "page-break-line" != e.type) {
            if ("table-caption-line" == e.type) {
                var t = this.constructSpacing(e.element);
                var n = slicedToArray(t, 2);
                var r = n[0];
                var a = n[1];
                return e.leadingSpacing = r,
                void(e.trailingSpacing = a);
            }
            var i = null;
            switch (e.type) {
            case "ancestor-line":
                i = e.parentBlock;
                break;
            default:
                i = e.parentBlockInfo.block;
            }
            if (0 === e.lineIndex || e.lineIndex >= e.nOfLines - 1) {
                var o = null;
                var s = null;
                switch (i.type) {
                case "math-container-block":
                    case "multiline-block":
                    case "align-block":
                    case "gather-block":
                    var l = this.constructSpacing(i.blockHtml);
                    var c = slicedToArray(l, 2);
                    o = c[0];
                    s = c[1];
                    break;
                case "theorem-block":
                    var d = this.constructSpacing(i.blockHtml.parentElement.parentElement);
                    var h = slicedToArray(d, 2);
                    o = h[0];
                    s = h[1];
                }
                if (0 === e.lineIndex) {
                    e.leadingSpacing = o;
                }
                if (e.lineIndex >= e.nOfLines - 1) {
                    e.trailingSpacing = s;
                }
            }
        }
    }
    findParentOrAncestor(e) {
        if ("page-break-line" == e.type || !e.parentBlockInfo) {
            return null;
        }
        var t = e.parentBlockInfo;
        for (; t.ancestorBlockInfo;) {
            t = t.ancestorBlockInfo;
        }
        return t;
    }
    processLine(e, t, n) {
        if (1 === e.blocks.length) {
            var r = e.blocks[0];
            if ("math-container-block" == r.type) {
                return this.splitLinesOfMathContainer(r, e);
            }
            if (this.validInlineMathBlock(r, e)) {
                return this.splitLinesOfMathContainer(r, e);
            }
            if ("multiline-block" == r.type) {
                return this.splitLinesOfMathContainer(r, e);
            }
            if ("theorem-block" == r.type) {
                return this.handleTheoremBlock(r, e);
            }
            if ("text-mode-group" == r.type) {
                return this.constructLines(r.lines, r, e);
            }
            if ("underline-section" == r.type) {
                return this.constructLines(r.lines, r, e);
            }
            if ("align-block" == r.type || "gather-block" == r.type) {
                return this.handleAlignGatherBlock(r, e);
            }
            if ("toc-block" == r.type) {
                return this.handleTocBlock(r, e);
            }
            if ("table-block" == r.type) {
                return this.handleTableBlock(r, e);
            }
            if ("page-break" == r.type) {
                return [{
                    type: "page-break-line",
                    rect: e.rect
                }];
            }
        }
        if (0 === e.blocks.length) {
            return [{
                type: "empty-text-mode-line",
                htmlLine: e.lineHtml,
                rect: e.rect,
                lineIndex: t,
                nOfLines: n,
                editAreaType: e.editAreaType,
                subLineIndex: e.subLineIndex,
                subLineCount: e.subLineCount,
                isBreakable: e.isBreakable
            }];
        }
        var a = this.findInlineMathWithBlankLeadingTrailing(e.blocks, e);
        return a ? this.splitLinesOfMathContainer(a, e) : [{
            type: "text-mode-line",
            htmlLine: e.lineHtml,
            rect: e.rect,
            blocks: e.blocks.filter((e) => {
                return "math-container-block" != e.type;
            }),
            lineIndex: t,
            nOfLines: n,
            editAreaType: e.editAreaType,
            subLineIndex: e.subLineIndex,
            subLineCount: e.subLineCount,
            isBreakable: e.isBreakable
        }];
    }
    validInlineMathBlock(e, t) {
        return "inline-math-block" == e.type && !t.hasPrefix;
    }
    findInlineMathWithBlankLeadingTrailing(e, t) {
        if (e.length <= 0) {
            return null;
        }
        var n = null;
        var r = 0;
        var a = 0;
        for (; a < e.length; a++) {
            var i = e[a];
            if (n || !this.validInlineMathBlock(i, t)) {
                if ("text-block" != i.type) {
                    return null;
                }
                if (!i.textBlockHtml) {
                    return null;
                }
                if (/\S/.test(i.textBlockHtml.innerText)) {
                    return null;
                }
            } else {
                n = i;
                r = a;
            }
        }
        if (n) {
            if (1 != this.countInlineMathBlock(e, t)) {
                return null;
            }
            var o = 0;
            var s = 0;
            for (; s < r; s++) {
                var l = e[0];
                o = o + (l.rect.right - l.rect.left);
            }
            n.leadingSpaceWidth = o;
            var c = 0;
            var d = r + 1;
            for (; d < e.length; d++) {
                var h = e[0];
                c = c + (h.rect.right - h.rect.left);
            }
            n.trailingSpaceWidth = c;
        }
        return n;
    }
    countInlineMathBlock(e, t) {
        return _.filter(e, (e) => {
            return this.validInlineMathBlock(e, t);
        }).length;
    }
    constructLines(e, t, n) {
        return e.flatMap((r, a) => {
            var i = this.processLine(r, a, e.length);
            return i.forEach((i) => {
                if ("page-break-line" != i.type) {
                    var o = this.findParentOrAncestor(i);
                    if (null == o && t) {
                        i.parentBlockInfo = {
                            block: t
                        };
                    }
                    if (o) {
                        o.ancestorBlockInfo = {
                            block: t,
                            line: {
                                type: "ancestor-line",
                                htmlLine: r.lineHtml,
                                rect: r.rect,
                                lineIndex: a,
                                nOfLines: e.length,
                                parentBlock: t,
                                editAreaType: r.editAreaType,
                                subLineCount: n ? n.subLineCount : 1,
                                subLineIndex: n ? n.subLineIndex : 1
                            }
                        };
                    }
                }
            }),
            i;
        });
    }
    handleTheoremBlock(e, t) {
        return this.constructLines(e.lines, e, t);
    }
    handleAlignGatherBlock(e, t) {
        return e.lines.map((n, r) => {
            return {
                type: "simple-tabular-line",
                editAreaType: "table-row",
                htmlLine: n.lineHtml,
                rect: n.rect,
                lineIndex: r,
                subLineCount: t.subLineCount,
                subLineIndex: t.subLineIndex,
                nOfLines: e.lines.length,
                parentBlockInfo: {
                    block: e
                },
                isBreakable: false
            };
        });
    }
    handleTocBlock(e, t) {
        return e.lines.map((n, r) => {
            return {
                type: "toc-line",
                editAreaType: "toc-line",
                htmlLine: n.lineHtml,
                rect: n.rect,
                lineIndex: r,
                nOfLines: e.lines.length,
                subLineCount: t.subLineCount,
                subLineIndex: t.subLineIndex,
                parentBlockInfo: {
                    block: e
                },
                isBreakable: false
            };
        });
    }
    handleTableBlock(e, t) {
        var n = e.lines.map((n, r) => {
            return {
                type: "table-line",
                editAreaType: "table-row",
                lineIndex: r,
                nOfLines: e.lines.length,
                rect: n.rect,
                trs: n.trs,
                isBreakable: true,
                subLineCount: t.subLineCount,
                subLineIndex: t.subLineIndex,
                parentBlockInfo: {
                    block: e
                }
            };
        });
        return e.captionLine && n.push({
            type: "table-caption-line",
            element: e.captionLine.html,
            rect: e.captionLine.rect,
            parentBlockInfo: {
                block: e
            },
            isBreakable: false,
            lineIndex: 0,
            nOfLines: 1,
            subLineCount: 0,
            subLineIndex: 0,
            editAreaType: "table-caption"
        }),
        n;
    }
    constructSpacing(e) {
        var t = DOMHelper.getComputedStyleAsNumber(e, "marginTop");
        var n = DOMHelper.getComputedStyleAsNumber(e, "marginBottom");
        return [{
            height: t + DOMHelper.getComputedStyleAsNumber(e, "paddingTop")
        },
        {
            height: n + DOMHelper.getComputedStyleAsNumber(e, "paddingBottom")
        }];
    }
    splitLinesOfMathContainer(e, t) {
        var n = DOMHelper.findEditLines(e.blockHtml.firstElementChild);
        return n.map((r, a) => {
            var i = {
                type: "math-line",
                rect: gs.getRectBounding(r),
                htmlLine: r,
                lineIndex: a,
                nOfLines: n.length,
                editAreaType: "math",
                subLineCount: t.subLineCount,
                subLineIndex: t.subLineIndex,
                parentBlockInfo: {
                    block: e
                },
                isBreakable: false
            };
            return "inline-math-block" == e.type && (i.leadingSpaceWidth = e.leadingSpaceWidth, i.trailingSpaceWidth = e.trailingSpaceWidth, i.alignRight = e.alignRight),
            i;
        });
    }
};
var Es = new class {
    getStartY(e) {
        if ("page-break-line" == e.type) {
            return e.rect.bottom;
        }
        if ("split-line" == e.type) {
            return this.getStartY(e.line) + e.linePosition;
        }
        var t = e.rect;
        var n = e.leadingSpacing;
        var r = e.type;
        var a = t.top - (n ? n.height : 0);
        return "table-caption-line" == e.type ? a : ("simple-tabular-line" == r && e.lineIndex > 0 && (a = a - 1), "table-line" == r && e.lineIndex > 0 && (a = a - 1), a);
    }
    getEndY(e) {
        if ("page-break-line" == e.type) {
            return e.rect.bottom;
        }
        if ("split-line" == e.type) {
            return this.getEndY(e.line) + e.linePosition;
        }
        var t = e.rect;
        var n = e.trailingSpacing;
        return t.bottom + (n ? n.height : 0);
    }
    getLineHeightIncludingSpacing(e) {
        if ("page-break-line" == e.type) {
            return 0;
        }
        var t = e.rect;
        var n = e.leadingSpacing;
        var r = e.trailingSpacing;
        return t.bottom - t.top + (n ? n.height : 0) + (r ? r.height : 0);
    }
    splitBigLine(e, t, n) {
        var r = this.getLineHeightIncludingSpacing(e);
        var a = [];
        var i = 0;
        var o = {
            type: "split-line",
            height: n,
            linePosition: 0,
            line: e,
            atEndOfPage: false,
            atStartOfPage: false,
            splitIndex: i
        };
        i++;
        a.push(o);
        var s = r - n;
        var l = n;
        for (; s > 0;) {
            var c = Math.min(s, t);
            a.push({
                type: "split-line",
                height: c,
                atEndOfPage: false,
                atStartOfPage: false,
                line: e,
                linePosition: l,
                splitIndex: i
            });
            s = s - c;
            l = l + c;
            i++;
        }
        var d = _.last(a);
        return "table-line" == d.line.type && (d.height += 1),
        a;
    }
    nextPage(e, t, n) {
        var r = this.getStartY(t);
        e.startPageY = "split-line" == n.type ? r + n.linePosition : r;
        var a = this.getEndY(t);
        var i = "split-line" == n.type ? n.height : a - e.startPageY;
        n.atStartOfPage = true;
        e.currentPage = {
            lines: [n],
            contentHeight: i
        };
        e.pages.push(e.currentPage);
        e.lastPageContentHeight = e.currentPage.contentHeight;
    }
    slot(e, t) {
        var n = e.lines;
        var r = {
            startPageY: this.getStartY(n[0]),
            pages: [],
            currentPage: {
                contentHeight: 0,
                lines: []
            },
            lastPageContentHeight: 0,
            lineIndexForcedPageBreak: -1
        };
        r.pages.push(r.currentPage);
        var a = 0;
        for (; a < n.length; a++) {
            var i = n[a];
            var o = this.getEndY(i) - r.startPageY;
            if ("page-break-line" != i.type) {
                var s = this.makeLine(i);
                var l = this.getLineHeightIncludingSpacing(s);
                if (0 === a && (s.atStartOfPage = true), o + 1 < t && r.lineIndexForcedPageBreak != a) {
                    r.currentPage.contentHeight = o;
                    r.currentPage.lines.push(s);
                    r.lastPageContentHeight = o;
                } else {
                    if (r.currentPage.lines.length > 0 && (_.last(r.currentPage.lines).atEndOfPage = true), l > t) {
                        var c = this.splitBigLine(s, t, t - r.lastPageContentHeight);
                        r.currentPage.lines.push(c[0]);
                        r.currentPage.contentHeight = t;
                        c[0].atEndOfPage = true;
                        var d = 1;
                        for (; d < c.length; d++) {
                            var h = c[d];
                            this.nextPage(r, i, h);
                        }
                    } else {
                        this.nextPage(r, i, s);
                    }
                }
            } else {
                r.lineIndexForcedPageBreak = a + 1;
                r.lastPageContentHeight = 0;
            }
        }
        return {
            pages: r.pages,
            pageHeight: t,
            mathTypeHtml: e.mathTypeHtml
        };
    }
    makeLine(e) {
        return "table-line" == e.type ? this.makeParentBlockInfo(e, _.assignIn({},
        e, {
            editAreaType: "table-row",
            atStartOfPage: false,
            atEndOfPage: false,
            isFirstLine: 0 === e.lineIndex,
            isLastLine: e.lineIndex === e.nOfLines - 1
        })) : (e.type, this.makeParentBlockInfo(e, _.assignIn({},
        e, {
            atStartOfPage: false,
            atEndOfPage: false,
            isFirstLine: 0 === e.lineIndex,
            isLastLine: e.lineIndex === e.nOfLines - 1
        })));
    }
    makeParentBlockInfo(e, t) {
        if (!e.parentBlockInfo) {
            return t;
        }
        var n = e.parentBlockInfo;
        var r = {
            type: "parent-block-info",
            block: e.parentBlockInfo.block
        };
        t.pageParentBlock = r;
        for (; n.ancestorBlockInfo;) {
            var a = n.ancestorBlockInfo.line;
            r.ancestorBlockInfo = {
                type: "ancestor-block-info",
                block: n.block,
                line: _.assignIn({},
                a, {
                    atStartOfPage: false,
                    atEndOfPage: false,
                    isFirstLine: 0 === t.lineIndex,
                    isLastLine: t.lineIndex === t.nOfLines - 1,
                    subLineIndex: e.subLineIndex,
                    subLineCount: e.subLineCount,
                    isBreakable: e.isBreakable
                })
            };
            n = n.ancestorBlockInfo;
            r = r.ancestorBlockInfo;
        }
        return t;
    }
};
var Ss = new class {
    recalculatePrintDomInfo(e) {
        return {
            contentWidth: e.contentWidth,
            pageWidth: e.pageWidth - 2,
            paddingLeft: e.paddingLeft - 1,
            paddingRight: e.paddingRight - 1,
            paddingTop: e.paddingTop - 1,
            paddingBottom: e.paddingBottom - 1
        };
    }
    regeneratePatternId(e) {
        jQuery(e).find("defs *[id]").toArray().forEach((t) => {
            var n = jQuery(t).attr("id");
            var r = DiagramIdHelper.nextId();
            jQuery(t).attr("id", r);
            var a = jQuery(e).find("*[style*='".concat(n, "']"));
            a.css("fill", 'url("#'.concat(r, '")'));
            (a = jQuery(e).find("*[fill*='".concat(n, "']"))).attr("fill", "url(#".concat(r, ")"));
        });
    }
    createDom(e, t) {
        t = this.recalculatePrintDomInfo(t);
        var n = e.mathTypeHtml;
        var r = n.cloneNode(false);
        r.style.width = "".concat(t.pageWidth, "px");
        var a = jQuery(n).children("math-edit-container").get(0);
        var i = a.cloneNode(false);
        r.appendChild(i);
        var o = a.firstElementChild.cloneNode(false);
        jQuery(o).css("background-color", "#eeeeee");
        i.appendChild(o);
        var s = this.processPages(e, t);
        return s.forEach((e) => {
            return this.regeneratePatternId(e);
        }),
        this.appendChildren(o, s),
        {
            mathType: r,
            areaContainers: s
        };
    }
    appendChildren(e, t) {
        t.forEach((t) => {
            return e.appendChild(t);
        });
    }
    createTextModeHtmlBlocksOnSingleLine(e) {
        return e.map((e) => {
            switch (e.type) {
            case "text-block":
                var t = e.textBlockHtml.cloneNode(false);
                return t.innerText = e.textBlockHtml.innerText.substring(e.start, e.end + 1),
                t;
            case "non-text-block":
                case "inline-math-block":
                return e.blockHtml.cloneNode(true);
            }
        });
    }
    constructBlock(e, t) {
        switch (e.type) {
        case "theorem-block":
            return this.cloneTheorem(e.blockHtml, t);
        case "text-mode-group":
            return this.cloneTextModeGroup(e.blockHtml, t);
        case "underline-section":
            return this.cloneUnderlineSection(e.blockHtml, t);
        case "math-container-block":
            case "multiline-block":
            case "inline-math-block":
            return this.cloneMathContainer(e.blockHtml, t);
        case "root-block":
            var n = this.cloneSingleLine(t);
            return {
                htmlBlock: null,
                htmlLine: n.htmlLine,
                htmlLineBlocksContainer: n.blocksContainer
            };
        case "align-block":
            case "gather-block":
            return this.cloneAlignGatherBlock(e.blockHtml, t);
        case "toc-block":
            return this.cloneTocBlock(e.blockHtml, t);
        case "table-block":
            return "table-caption" == t.editAreaType ? this.cloneTableCaptionBlock(e.blockHtml) : this.cloneTableBlock(e.blockHtml, t);
        }
        throw new Error("Not handled this block");
    }
    constructAncestor(e) {
        var t = e.parentBlockInfo;
        var n = e;
        var r = null;
        var a = [];
        for (; t;) {
            var i = this.constructBlock(t.block, n);
            if (a.push({
                parentBlock: t.block,
                line: n,
                clonedParentBlock: i
            }), r && i.htmlLineBlocksContainer.appendChild(r.htmlBlock), r = i, !(t = t.ancestorBlockInfo)) {
                break;
            }
            n = t.line;
        }
        return a.forEach((e) => {
            this.handleMarginPadding(e.parentBlock, e.line, e.clonedParentBlock);
        }),
        r.htmlLine;
    }
    handleTabularRowMargin(e, t) {
        if ("split-line" == e.type) {
            return this.handleTabularRowMargin(e.line, t);
        }
        if (! (e.isFirstLine || "simple-tabular-line" != e.type || e.atStartOfPage)) {
            t.style.marginTop = "-1px";
        }
        if (! (e.isFirstLine || "table-line" != e.type || e.atStartOfPage)) {
            t.style.marginTop = "-1px";
        }
    }
    constructRootLine(e) {
        return "root" == e.editAreaType ? e.isBreakable ? this.cloneSingleLine(e).htmlLine : e.htmlLine.cloneNode(true) : this.constructAncestor(e);
    }
    handleMarginPadding(e, t, n) {
        switch (e.type) {
        case "root-block":
            break;
        case "theorem-block":
            var r = jQuery(n.htmlBlock).closest("x-line").get(0);
            fs.handlePaddingMarginLine({
                element: r,
                istFirstLine: t.isFirstLine,
                isLastLine: t.isLastLine
            });
            break;
        case "math-container-block":
            case "align-block":
            case "gather-block":
            fs.handlePaddingMarginLine({
                element: n.htmlBlock,
                istFirstLine: t.isFirstLine,
                isLastLine: t.isLastLine
            });
            break;
        case "multiline-block":
            fs.handlePaddingMarginLine({
                element: n.htmlBlock,
                istFirstLine: t.isFirstLine,
                isLastLine: t.isLastLine
            });
            this.handleMultilineTag(n.htmlBlock, t);
            if (t.isFirstLine) {
                this.handleMultilieAlign(n.htmlLine, "left");
            } else {
                if (t.isLastLine) {
                    this.handleMultilieAlign(n.htmlLine, "right");
                } else {
                    this.handleMultilieAlign(n.htmlLine, "center");
                }
            }
        }
    }
    handleMultilineTag(e, t) {
        var n = jQuery(e).find(">ref-tag");
        if (! (n.length <= 0 || t.isLastLine)) {
            n.children().remove();
            n.css("flex-shrink", 0).css("width", n.attr("data-print-width")).css("padding", 0);
        }
    }
    processPages(e, t) {
        return e.pages.map((n) => {
            var r = n.lines.map((e) => {
                if ("split-line" == e.type) {
                    var t = this.constructRootLine(e.line);
                    t.style.position = "relative";
                    t.style.top = "-".concat(e.linePosition, "px");
                    var n = this.createSplitLine(e.height);
                    return n.appendChild(t),
                    0 === e.splitIndex && this.handleTabularRowMargin(e, n),
                    n;
                }
                var r = this.constructRootLine(e);
                return this.handleTabularRowMargin(e, r),
                r;
            });
            return this.createAreaContainer(e.pageHeight, n.contentHeight, r, t, e);
        });
    }
    createSplitLine(e) {
        var t = document.createElement("div");
        return t.style.overflow = "hidden",
        t.style.height = "".concat(e, "px"),
        t.style.verticalAlign = "bottom",
        t.style.display = "inline-block",
        t.style.pageBreakInside = "avoid",
        t.style.width = "100%",
        t.className = "print-as-area-container",
        t;
    }
    createEmptyHtmlLine(e) {
        var t;
        var n = e.subLineIndex;
        var r = e.subLineCount;
        switch (e.editAreaType) {
        case "root":
            t = this.createRootLine(e.htmlLine, n > 0);
            var a = this.createBlocksElement();
            return t.appendChild(a),
            jQuery(t).hasClass("align-justify") && n < r - 1 && jQuery(a).addClass("justify-single-line"),
            {
                htmlLine: t,
                blocksContainer: a
            };
        case "text":
            return t = this.createTextLine(e.htmlLine),
            jQuery(t).hasClass("align-justify") && n < r - 1 && jQuery(t).addClass("justify-single-line"),
            {
                htmlLine: t,
                blocksContainer: t
            };
        case "math":
            return {
                htmlLine: t = this.createMathLine(e.htmlLine),
                blocksContainer: t
            };
        }
        throw new Error("should not come here");
    }
    createRootLine(e, t) {
        var n = e.cloneNode(false);
        var r = e.firstElementChild;
        var a = r.innerText;
        if (t && !_.isEmpty(a)) {
            var i = r.cloneNode(false);
            var o = DOMHelper.getElementRect(r);
            i.style.width = "".concat(o.width, "px");
            i.style.minWidth = "".concat(o.width, "px");
            n.appendChild(i);
        } else {
            var s = r.cloneNode(true);
            var l = gs.getRectBounding(r);
            if (l.right - l.left < .5) {
                s.style.display = "none";
            }
            n.appendChild(s);
        }
        return n;
    }
    createTextLine(e) {
        var t = e.cloneNode(false);
        return t.appendChild(e.firstElementChild.cloneNode(true)),
        t;
    }
    createMathLine(e) {
        var t = e.cloneNode(false);
        return t.appendChild(e.firstElementChild.cloneNode(true)),
        t;
    }
    createBlocksElement() {
        var e = document.createElement("blocks");
        var t = document.createElement("baseline-block");
        return t.style.display = "none",
        e.appendChild(t),
        e;
    }
    createAreaContainer(e, t, n, r, a) {
        var i = document.createElement("area-container");
        return i.style.height = "".concat(e, "px"),
        i.style.marginTop = "50px",
        i.style.marginBottom = "50px",
        i.style.border = "1px solid lightgray",
        i.style.position = "relative",
        i.style.background = ColorHelper.getMathTypeBackgroundColor(a.mathTypeHtml),
        i.style.width = "".concat(r.contentWidth, "px"),
        i.style.overflow = "hidden",
        i.style.paddingLeft = "".concat(r.paddingLeft, "px"),
        i.style.paddingTop = "".concat(r.paddingTop, "px"),
        i.style.paddingRight = "".concat(r.paddingRight, "px"),
        i.style.paddingBottom = "".concat(r.paddingBottom, "px"),
        this.appendChildren(i, n),
        i.appendChild(this.createContentHeight(t)),
        i;
    }
    createContentHeight(e) {
        var t = document.createElement("div");
        return t.style.position = "absolute",
        t.style.top = "0px",
        t.style.left = "0px",
        t.style.right = "0px",
        t.style.height = "".concat(e, "px"),
        t.style.pointerEvents = "none",
        t;
    }
    cloneMathContainer(e, t) {
        var n = e.cloneNode(false);
        var r = e.firstElementChild.cloneNode(false);
        jQuery(r).css("background", "transparent");
        n.appendChild(r);
        var a = jQuery(e).find(">ref-tag.line-tag");
        if (a.length > 0) {
            var i = jQuery(e).find(">ref-tag.line-tag").get(0).cloneNode(true);
            jQuery(i).attr("data-print-width", "".concat(a.get(0).getBoundingClientRect().width, "px"));
            n.appendChild(i);
        }
        var o;
        var s = t.htmlLine.cloneNode(true);
        if ("math-line" == t.type && t.leadingSpaceWidth > 0 && (jQuery(n).css("padding-left", "".concat(t.leadingSpaceWidth, "px")), o = jQuery("<x-block/>").css("font-size", "0px").css("line-height", jQuery(e).css("font-size")).get(0)), "math-line" == t.type && t.trailingSpaceWidth > 0 && jQuery(n).css("padding-right", "".concat(t.trailingSpaceWidth, "px")), "math-line" == t.type && t.alignRight) {
            var l = DOMHelper.getElementRect(e);
            jQuery(n).css("width", "".concat(l.width, "px"));
        }
        return n.firstChild.appendChild(s),
        {
            leadingHtmlBlock: o,
            htmlBlock: n,
            htmlLine: s,
            htmlLineBlocksContainer: s
        };
    }
    cloneAlignGatherBlock(e, t) {
        var n = e.cloneNode(false);
        var r = e.firstElementChild.cloneNode(false);
        n.appendChild(r);
        var a = e.firstElementChild.firstElementChild.cloneNode(false);
        r.appendChild(a);
        var i = e.firstElementChild.firstElementChild.firstElementChild.cloneNode(false);
        a.appendChild(i);
        var o = t.htmlLine.cloneNode(true);
        return i.appendChild(o),
        this.handleTdsWidth(_.toArray(t.htmlLine.children), _.toArray(o.children)),
        {
            htmlBlock: n,
            htmlLine: o,
            htmlLineBlocksContainer: null
        };
    }
    cloneTableCaptionBlock(e) {
        var t = e.cloneNode(false);
        var n = e.firstElementChild.cloneNode(false);
        t.appendChild(n);
        var r = jQuery(e.firstElementChild).find(">.role-table-caption-container").get(0).cloneNode(true);
        return n.appendChild(r),
        {
            htmlBlock: t,
            htmlLine: null,
            htmlLineBlocksContainer: null
        };
    }
    cloneTableBlock(e, t) {
        var n = e.cloneNode(false);
        var r = e.firstElementChild.cloneNode(false);
        n.appendChild(r);
        var a = e.firstElementChild.firstElementChild.cloneNode(false);
        r.appendChild(a);
        var i = e.firstElementChild.firstElementChild.children[0].cloneNode(true);
        var o = e.firstElementChild.firstElementChild.children[1].cloneNode(false);
        if (a.appendChild(i), a.appendChild(o), "ancestor-line" == t.type) {
            var s = t.htmlLine.cloneNode(true);
            return o.appendChild(s),
            {
                htmlBlock: n,
                htmlLine: s,
                htmlLineBlocksContainer: null
            };
        }
        return t.trs.forEach((e) => {
            var t = e.cloneNode(true);
            o.appendChild(t);
        }),
        {
            htmlBlock: n,
            htmlLine: null,
            htmlLineBlocksContainer: null
        };
    }
    cloneTocBlock(e, t) {
        var n = e.cloneNode(false);
        var r = e.firstElementChild.cloneNode(false);
        n.appendChild(r);
        var a = e.firstElementChild.firstElementChild.cloneNode(false);
        r.appendChild(a);
        var i = t.htmlLine.cloneNode(true);
        return a.appendChild(i),
        this.handleTdsWidth(_.toArray(t.htmlLine.children), _.toArray(i.children)),
        {
            htmlBlock: n,
            htmlLine: i,
            htmlLineBlocksContainer: null
        };
    }
    handleTdsWidth(e, t) {
        var n = 0;
        for (; n < e.length; n++) {
            var r = e[n];
            var a = t[n];
            if (!jQuery(r).hasClass("non-select")) {
                var i = DOMHelper.getElementRect(r);
                a.style.width = "".concat(i.width, "px");
                a.style.minWidth = "".concat(i.width, "px");
            }
        }
    }
    cloneTheorem(e, t) {
        var n;
        var r;
        n = e.cloneNode(false);
        r = e.children[2].cloneNode(false);
        if (t.isFirstLine) {
            n.appendChild(e.firstElementChild.cloneNode(true));
            n.appendChild(e.children[1].cloneNode(true));
            n.appendChild(r);
        } else {
            n.appendChild(r);
        }
        var a = this.cloneSingleLine(t);
        return r.appendChild(a.htmlLine),
        {
            htmlBlock: n,
            htmlLine: a.htmlLine,
            htmlLineBlocksContainer: a.blocksContainer
        };
    }
    cloneTextModeGroup(e, t) {
        var n;
        var r;
        n = e.cloneNode(false);
        r = e.children[0].cloneNode(false);
        n.appendChild(r);
        var a = this.cloneSingleLine(t);
        return r.appendChild(a.htmlLine),
        {
            htmlBlock: n,
            htmlLine: a.htmlLine,
            htmlLineBlocksContainer: a.blocksContainer
        };
    }
    cloneUnderlineSection(e, t) {
        var n;
        var r;
        var a;
        n = e.cloneNode(false);
        r = e.children[1].cloneNode(false);
        a = e.children[0].cloneNode(false);
        n.appendChild(a);
        n.appendChild(r);
        var i = this.cloneSingleLine(t);
        return r.appendChild(i.htmlLine),
        {
            htmlBlock: n,
            htmlLine: i.htmlLine,
            htmlLineBlocksContainer: i.blocksContainer
        };
    }
    cloneSingleLine(e) {
        switch (e.type) {
        case "ancestor-line":
            return this.createEmptyHtmlLine(e);
        case "empty-text-mode-line":
            var t = this.createEmptyHtmlLine(e);
            return t.blocksContainer.appendChild(jQuery(e.htmlLine).find("empty-block").get(0).cloneNode(true)),
            t;
        case "text-mode-line":
            var n = this.createEmptyHtmlLine(e);
            var r = this.createTextModeHtmlBlocksOnSingleLine(e.blocks);
            return this.appendChildren(n.blocksContainer, r),
            n;
        case "math-line":
            var a = e.htmlLine.cloneNode(true);
            return {
                htmlLine: a,
                blocksContainer: a
            };
        }
    }
    handleMultilieAlign(e, t) {
        switch (t) {
        case "left":
            e.style.justifyContent = "flex-start";
            e.style.textAlign = "left";
            break;
        case "center":
            e.style.justifyContent = "center";
            e.style.textAlign = "center";
            break;
        case "right":
            e.style.justifyContent = "flex-end";
            e.style.textAlign = "right";
        }
    }
};
var Cs = new class {
    assignHeaderFooter(e) {
        var t = e.printHtmlResult;
        var n = e.headerMathType;
        var r = e.footerMathType;
        var a = e.paddingInfo;
        var i = e.contentWidth;
        var o = {
            sectionLevel1: null,
            sectionLevel2: null,
            sectionLevel3: null
        };
        t.areaContainers.forEach((e, s) => {
            this.findSectionInfo(e, o);
            var l = gs.cloneMathTypeForPrint(n, i);
            l.style.minHeight = "auto";
            l.style.width = "100%";
            var c = gs.cloneMathTypeForPrint(r, i);
            c.style.minHeight = "auto";
            c.style.width = "100%";
            this.assignPageInfo(l, s, t.areaContainers.length, o);
            this.assignPageInfo(c, s, t.areaContainers.length, o);
            var d = this.createHeaderContainer(a);
            var h = this.createFooterContainer(a);
            d.appendChild(l);
            h.appendChild(c);
            e.appendChild(d);
            e.appendChild(h);
        });
    }
    findSectionInfo(e, t) {
        var n = jQuery(e).find("x-line.root.section.sindent-0").get(0);
        var r = jQuery(e).find("x-line.root.section.sindent-1").get(0);
        var a = jQuery(e).find("x-line.root.section.sindent-2").get(0);
        t.sectionLevel1 = n || t.sectionLevel1;
        t.sectionLevel2 = r || t.sectionLevel2;
        t.sectionLevel3 = a || t.sectionLevel3;
    }
    createEmptySpan() {
        var e = document.createElement("span");
        return e.style.whiteSpace = "pre",
        e.innerText = " ",
        e;
    }
    assignPageInfo(e, t, n, r) {
        jQuery(e).find(".role-page-number-value").text("".concat(t + 1));
        jQuery(e).find(".role-page-count-value").text("".concat(n));
        jQuery(e).find(".role-page-info-bg").remove();
        jQuery(e).find(".page-print-item-hover").remove();
        var a = jQuery(e).find(".role-page-section-level-1");
        var i = jQuery(e).find(".role-page-section-level-2");
        var o = jQuery(e).find(".role-page-section-level-3");
        a.children().remove();
        i.children().remove();
        o.children().remove();
        var s = r.sectionLevel1 ? this.cloneSectionLine(r.sectionLevel1) : this.createEmptySpan();
        var l = r.sectionLevel2 ? this.cloneSectionLine(r.sectionLevel2) : this.createEmptySpan();
        var c = r.sectionLevel3 ? this.cloneSectionLine(r.sectionLevel3) : this.createEmptySpan();
        a.append(s);
        i.append(l);
        o.append(c);
    }
    cloneSectionLine(e) {
        var t = e.cloneNode(true);
        return jQuery(t).find(">x-blocks>x-block").css("white-space", "pre-wrap"),
        t;
    }
    createHeaderContainer(e) {
        var t = document.createElement("div");
        return t.style.position = "absolute",
        t.style.top = "10px",
        t.style.left = "".concat(e.paddingLeft, "px"),
        t.style.right = "".concat(e.paddingRight, "px"),
        t.style.height = "".concat(e.paddingTop - 10, "px"),
        t.style.overflow = "hidden",
        jQuery(t).addClass("role-header-container"),
        t;
    }
    createFooterContainer(e) {
        var t = document.createElement("div");
        return t.style.position = "absolute",
        t.style.bottom = "0px",
        t.style.left = "".concat(e.paddingLeft, "px"),
        t.style.right = "".concat(e.paddingRight, "px"),
        t.style.height = "".concat(e.paddingBottom - 10, "px"),
        t.style.overflow = "hidden",
        jQuery(t).addClass("role-footer-container"),
        t;
    }
};
var xs = new class {
    createPrintDom(e, t, n, r) {
        var a = ys.parse(e);
        var i = As.construct(a);
        var o = Es.slot(i, t.contentHeight);
        var s = Ss.createDom(o, t);
        return Cs.assignHeaderFooter({
            footerMathType: r,
            headerMathType: n,
            paddingInfo: t,
            printHtmlResult: s,
            contentWidth: t.contentWidth
        }),
        s.mathType;
    }
};
var Is = new class {
    registerPlaceHolderComponent(e) {
        this.component = e;
    }
    requestPrintElement(e, t, n) {
        return this.component ? this.component.requestPrint(e, t, n) : Promise.reject();
    }
    requestPrintClose() {
        this.component.requestPrintClose();
    }
};
var Ts = new class {
    calculatePage(e) {
        return {
            contentWidth: Math.floor(e.pageSizeInfo.width - e.marginInfo.left - e.marginInfo.right),
            contentHeight: Math.floor(e.pageSizeInfo.height - e.marginInfo.top - e.marginInfo.bottom),
            paddingLeft: e.marginInfo.left,
            paddingTop: e.marginInfo.top,
            paddingBottom: e.marginInfo.bottom,
            paddingRight: e.marginInfo.right,
            pageWidth: e.pageSizeInfo.width,
            pageHeight: e.pageSizeInfo.height
        };
    }
    toPixelPrintInfo(e) {
        var t = e.marginInfo;
        var n = e.pageSizeInfo;
        var r = "portrait" == n.orientation ? n.width : n.height;
        var a = "portrait" == n.orientation ? n.height : n.width;
        return {
            marginInfo: {
                left: this.toPixel(t.left, t.unit),
                top: this.toPixel(t.top, t.unit),
                right: this.toPixel(t.right, t.unit),
                bottom: this.toPixel(t.bottom, t.unit)
            },
            pageSizeInfo: {
                width: this.toPixel(r, n.unit),
                height: this.toPixel(a, n.unit)
            }
        };
    }
    toPixel(e, t) {
        switch (t) {
        case "cm":
            return Geometry.floor2(37.795276 * e);
        case "inch":
            return Geometry.floor2(96 * e);
        case "px":
            return e;
        case "pt":
            return Geometry.floor2(e / .75);
        case "mm":
            return Geometry.floor2(37.795276 * e / 10);
        }
        return e;
    }
};
var Ms = new class {
    assignUnderlineSectionLines(e) {
        jQuery(e).find("x-line.root>x-blocks>composite-block.underline-section-symbol").each((e, t) => {
            var n = jQuery(t).find(">div.role-lines-container");
            var r = n.attr("data-line-type");
            var a = n.attr("data-line-color");
            var i = n.attr("data-line-on-text");
            SymbolUnderlineSvg.generate(t, n.get(0), {
                lineType: r,
                color: a,
                lineOnText: "true" == i
            });
        });
    }
};
var Ns = {
    flexGrow: 1,
    minHeight: 100,
    background: "white",
    padding: 0
};
var ks = {
    position: "static",
    paddingLeft: 0,
    top: 0,
    width: "100%",
    minWidth: "none",
    boxShadow: "none",
    border: "none",
    borderBottom: "1px solid lightgray"
};
var Bs = {
    marginInfo: {
        left: 1,
        top: 1,
        right: 1,
        bottom: 1,
        unit: "inch"
    },
    pageSizeInfo: MathGlobal.isTestEnv() ? {
        width: 8.27,
        height: 11.69,
        unit: "inch",
        orientation: "portrait"
    } : {
        width: 8.5,
        height: 11,
        unit: "inch",
        orientation: "portrait"
    },
    headerFooterModel: {
        header: [{
            id: DiagramIdHelper.nextId(),
            blocks: []
        }],
        footer: [{
            id: DiagramIdHelper.nextId(),
            blocks: []
        }]
    }
};
class ws extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            show: false
        };
    }
    close() {
        this.setState({
            show: false
        });
    }
    preview(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        var r = e.printInfo;
        var a = e.mathTypeElement;
        var i = e.headerElement;
        var o = e.footerElement;
        return new Promise((s) => {
            this.setState({
                show: true
            });
            TimerHelper.next(() => {
                var l = Ts.toPixelPrintInfo(r);
                var c = Ts.calculatePage(l);
                var d = gs.cloneMathTypeForPrint(a, c.contentWidth);
                document.getElementById("math-type-cloned-container").appendChild(d);
                TimerHelper.waitALitteWhile(() => {
                    var r = xs.createPrintDom(d, c, i, o);
                    r.style.background = "rgb(238,238,238)";
                    r.style.margin = "auto";
                    Is.requestPrintElement(r, t, {
                        width: e.printInfo.pageSizeInfo.width,
                        height: e.printInfo.pageSizeInfo.height,
                        orientation: e.printInfo.pageSizeInfo.orientation,
                        afterRenderCallback() {
                            Ms.assignUnderlineSectionLines(r);
                        }
                    }).then(() => {
                        d.remove();
                        if (!n) {
                            this.close();
                        }
                        s();
                    });
                });
            });
        });
    }
    print(e) {
        this.preview(e, true).then(() => {
            PrintHelper.print(e.printInfo.pageSizeInfo.width, e.printInfo.pageSizeInfo.height, e.printInfo.pageSizeInfo.orientation);
            console.log("after print");
            Is.requestPrintClose();
        });
    }
    saveAsPdf(e) {
        this.preview(e, true, true).then(() => {
            PrintHelper.setupCssPrint(e.printInfo.pageSizeInfo.width, e.printInfo.pageSizeInfo.height, e.printInfo.pageSizeInfo.orientation);
            Api.Post("/api/commands/save-as-pdf", {
                printCssBackground: true
            }).
            finally(() => {
                this.close();
                Is.requestPrintClose();
            });
        });
    }
    render() {
        if (!this.state.show) {
            return React.createElement("div", {
                style: {
                    display: "none"
                }
            });
        }
        return React.createElement("div", {
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.43)",
                zIndex: 999999999
            }
        },
        React.createElement("div", {
            style: {
                width: 300,
                height: 200,
                position: "absolute",
                left: "calc(50%-".concat(150, "px)"),
                top: "calc(50%-".concat(100, "px)"),
                border: "1px solid gray",
                overflow: "hidden"
            }
        },
        React.createElement("div", {
            id: "math-type-cloned-container",
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                overflow: "auto"
            }
        }), React.createElement("div", {
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                background: "white",
                padding: "90px 120px",
                zIndex: 999999
            }
        },
        "Processing...")));
    }
}
class Ds extends React.Component {
    constructor(e) {
        super(e);
        this.handleFakeToolbarRef = (e) => {
            this.fakeToolbarRef = e;
        };
        this.handleRequestRenderToolbar = (e) => {
            TimerHelper.next(() => {
                if (this.fakeToolbarRef) {
                    this.fakeToolbarRef.updateElement(e);
                }
            });
        };
        this.handleModelChanged = (e) => {
            this.newModel = e;
        };
        this.handleKeyDown = (e) => {
            if (27 === e.keyCode) {
                this.props.onClose(this.newModel);
                e.stopOther = true;
            }
        };
        this.newModel = e.model;
    }
    componentDidMount() {
        KeyDownEventRegisterer.stack(this.handleKeyDown);
    }
    componentWillUnmount() {
        KeyDownEventRegisterer.remove(this.handleKeyDown);
    }
    render() {
        return React.createElement("div", {
            className: "role-fullview-edit-root",
            style: {
                padding: 10,
                position: "absolute",
                left: -2,
                top: -2,
                right: -2,
                bottom: -2,
                display: "flex",
                border: "1px solid gray",
                background: "#e4e3e3",
                zIndex: 9999999
            }
        },
        React.createElement("div", {
            style: {
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }
        },
        React.createElement(rs, {
            containerStyle: {
                height: 35,
                border: "1px solid #b9b8b8"
            },
            type: "header",
            ref: this.handleFakeToolbarRef,
            hide: false
        }), React.createElement("div", {
            style: {
                overflow: "auto",
                flex: 1,
                marginTop: 0,
                marginBottom: 30,
                background: "rgb(167,165,165)"
            }
        },
        React.createElement("div", {
            style: {
                width: this.props.pageWidth + 50 + 50,
                margin: "auto"
            }
        },
        React.createElement("div", {
            className: "role-math-type-wrapper",
            style: {
                width: this.props.pageWidth,
                marginTop: 25,
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 34,
                padding: 10,
                boxShadow: "0px 0 3px black",
                background: "white"
            }
        },
        React.createElement(MathType, {
            hideUndoRedo:
            true,
            model: this.props.model,
            onModelChanged: this.handleModelChanged,
            requestRenderToolbar: this.handleRequestRenderToolbar,
            ancestorFixedSelector: "modal-container.mt-common-dialog",
            autoCompleteUsingPositionFixed: true,
            toolbarEnabled: true,
            restrictedView: true,
            toolbarExportOptionsHide: true,
            toolbarStyle: ks,
            style: Ns,
            preventFocusOnCreated: true,
            itemsBarEnabled: "component-specific",
            itemsBarContainerStyle: {
                left: 5,
                top: 69,
                position: "fixed"
            },
            mathTemplatesDisable: true
        })))), React.createElement("div", {
            style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                position: "absolute",
                bottom: 5,
                width: "100%"
            }
        },
        React.createElement("button", {
            style: {
                width: 100
            },
            className: "btn-normal btn-large",
            onClick: () => {
                return this.props.onClose(this.newModel);
            }
        },
        "Close"))));
    }
}
class PrintSettingsDialog extends React.Component {
    constructor(e) {
        super(e);
        this.setPrintInfo = (e, t) => {
            var n = _.assignIn({},
            this.state.printInfo.get(), {
                [e] : t
            });
            this.setState({
                printInfo: this.state.printInfo.set(this.normalizePrintInfo(n))
            });
        };
        this.handleMarginInfoChanged = (e) => {
            this.setPrintInfo("marginInfo", e);
        };
        this.handlePageSizeInfoChanged = (e) => {
            this.setPrintInfo("pageSizeInfo", e);
        };
        this.handlePreviewClick = () => {
            var e = this.constructPrintProcessInput();
            this.printProcessContainer.preview(e);
        };
        this.handlePrintClick = () => {
            var e = this.constructPrintProcessInput();
            this.printProcessContainer.print(e);
        };
        this.handleSaveAsPdf = () => {
            var e = this.constructPrintProcessInput();
            this.printProcessContainer.saveAsPdf(e);
        };
        this.renderFooterContent = () => {
            return React.createElement("div", null, React.createElement("buttons-group", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 5
                }
            },
            React.createElement("button", {
                className: "btn-normal btn-large",
                onClick: this.handlePreviewClick,
                style: {
                    marginRight: 5,
                    width: 100
                }
            },
            "Print Preview"), React.createElement("button", {
                className: "btn-primary btn-large",
                onClick: this.handlePrintClick,
                style: {
                    marginRight: 5,
                    width: 100
                }
            },
            "Print"), this.renderSaveAsPdfButton()));
        };
        this.handlePrintProcessContainerRef = (e) => {
            this.printProcessContainer = e;
        };
        this.handleHeaderLinesChanged = (e) => {
            var t = this.state.printInfo.get().headerFooterModel;
            var n = _.assignIn({},
            t, {
                header: e
            });
            this.setPrintInfo("headerFooterModel", n);
        };
        this.handleFooterLinesChanged = (e) => {
            var t = this.state.printInfo.get().headerFooterModel;
            var n = _.assignIn({},
            t, {
                footer: e
            });
            this.setPrintInfo("headerFooterModel", n);
        };
        this.handleFullViewClosed = (e) => {
            if ("header" == this.state.fullView.type) {
                this.headerEdit.setNewModel(e);
                this.handleHeaderLinesChanged(e.lines);
            }
            if ("footer" == this.state.fullView.type) {
                this.footerEdit.setNewModel(e);
                this.handleFooterLinesChanged(e.lines);
            }
            this.setState({
                fullView: null
            });
        };
        this.state = {
            printInfo: n463.createOnDocument("print", Bs),
            fullView: null
        };
    }
    normalizePrintInfo(e) {
        var t = e.marginInfo;
        var n = e.pageSizeInfo;
        var r = "portrait" == n.orientation ? n.width : n.height;
        var a = "portrait" == n.orientation ? n.height : n.width;
        var i = Geometry.round2(r / 3);
        var o = Geometry.round2(a / 3);
        return _.assignIn({},
        e, {
            marginInfo: _.assignIn({},
            t, {
                left: Math.min(t.left, i),
                right: Math.min(t.right, i),
                top: Math.min(t.top, o),
                bottom: Math.min(t.bottom, o)
            })
        });
    }
    constructPrintProcessInput() {
        return {
            mathTypeElement: this.props.mathTypeHtml,
            printInfo: this.state.printInfo.get(),
            headerElement: this.headerEdit.getMathTypeElement(),
            footerElement: this.footerEdit.getMathTypeElement(),
            printCssBackground: this.props.fixedContextHandler.isDarkMode()
        };
    }
    renderSaveAsPdfButton() {
        if (MathGlobal.supportSaveAsPDF()) {
            return React.createElement("button", {
                className: "btn-primary btn-large",
                onClick: this.handleSaveAsPdf,
                style: {
                    marginRight: 5,
                    width: 100
                }
            },
            "Save as PDF");
        }
    }
    renderFullView() {
        if (this.state.fullView) {
            var e = this.state.printInfo.get();
            var t = Ts.toPixelPrintInfo(e);
            var n = Ts.calculatePage(t);
            return React.createElement(Ds, {
                pageWidth: n.contentWidth,
                onClose: this.handleFullViewClosed,
                model: this.state.fullView.model
            });
        }
    }
    render() {
        var e = this.state.printInfo.get();
        var t = e.pageSizeInfo;
        var n = e.marginInfo;
        var r = e.headerFooterModel;
        var a = Ts.toPixelPrintInfo(e);
        var i = Ts.calculatePage(a);
        return React.createElement(ModalDialogFromMathType, {
            title: "Print Settings",
            show: true,
            style: {
                width: 750,
                height: "auto",
                maxWidth: "95vw",
                fontSize: 12,
                background: "white"
            },
            contentStyle: {
                background: "#eeeeee"
            },
            footerStyle: {
                justifyContent: "center"
            },
            onClose: this.props.onClose,
            renderFooterContent: this.renderFooterContent
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }
        },
        React.createElement(is, {
            fixedContextHandler: this.props.fixedContextHandler,
            pageWidth: i.contentWidth,
            requestFullView: (e) => {
                return this.setState({
                    fullView: {
                        type: "header",
                        model: e
                    }
                });
            },
            ref: (e) => {
                return this.headerEdit = e;
            },
            onLinesChanged: this.handleHeaderLinesChanged,
            lines: r.header,
            type: "header"
        }), React.createElement(is, {
            fixedContextHandler: this.props.fixedContextHandler,
            pageWidth: i.contentWidth,
            requestFullView: (e) => {
                return this.setState({
                    fullView: {
                        type: "footer",
                        model: e
                    }
                });
            },
            ref: (e) => {
                return this.footerEdit = e;
            },
            onLinesChanged: this.handleFooterLinesChanged,
            lines: r.footer,
            type: "footer"
        }), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }
        },
        React.createElement(es, {
            marginInfo: n,
            onMarginInfoChanged: this.handleMarginInfoChanged
        }), React.createElement(cs, {
            onPageSizeInfoChanged: this.handlePageSizeInfoChanged,
            pageSizeInfo: t
        })), React.createElement(ws, {
            ref: this.handlePrintProcessContainerRef
        }), this.renderFullView()));
    }
}
/*n.d(t, "PrintPlaceHolderRegisterer", function () {
    return Is;
});*/
/*n.d(t, "a", function () {
    return PrintSettingsDialog;
});*/

export { Is as PrintPlaceHolderRegisterer }

export default PrintSettingsDialog