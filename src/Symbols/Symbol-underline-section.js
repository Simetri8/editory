import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import CheckBoxWrapper from '../Mathcha/CheckBoxWrapper';
import ColorTypeConverter from '../Mathcha/ColorTypeConverter';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import FillColorIcon from '../Shapes/FillColorIcon';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolSettingButton from '../Elements/SymbolSettingButton';
import SymbolUnderlineSvg from './SymbolUnderlineSvg';

/// xxx(1519) /*Symbol-underline-section*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 6 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 13 times
/// var o = n.n(i);
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var c = n(21)/*EditArea*/;  // 1 times
/// var d = n(106)/*SymbolSettingButton*/;  // 1 times
/// var h = n(24)/*EventHelper*/;  // 2 times
/// var u = n(51)/*SelectBoxContainer*/;  // 1 times
/// var p = n(160)/*FillColorIcon*/;  // 1 times
/// var m = n(101)/*CheckBoxWrapper*/;  // 1 times
/// var f = n(16)/*ReactDOM*/;  // 2 times
/// var g = n.n(f);
/// var y = n(333)/*SymbolUnderlineSvg*/;  // 1 times
/// var E = n(42)/*ColorTypeConverter*/;  // 1 times
class A {
    constructor(e, t) {
        this.element = e;
        this.callback = t;
        this.onScroll = () => {
            var e = this.element.getBoundingClientRect();
            var t = e.width;
            var n = e.height;
            if (! (t === this.currentWidth && n === this.currentHeight)) {
                this.currentWidth = t;
                this.currentHeight = n;
                this.callback();
            }
            this.setScroll(this.expand, this.shrink);
        };
    }
    start() {
        var e = parseInt(getComputedStyle(this.element).zIndex, 10);
        if (isNaN(e)) {
            e = 0;
        }
        e--;
        var t = document.createElement("div");
        t.style.position = "absolute";
        t.style.left = "0px";
        t.style.top = "0px";
        t.style.right = "0px";
        t.style.bottom = "0px";
        t.style.overflow = "hidden";
        t.style.zIndex = e.toString();
        t.style.visibility = "hidden";
        var n = document.createElement("div");
        n.style.position = "absolute";
        n.style.left = "0px";
        n.style.top = "0px";
        n.style.width = "10000000px";
        n.style.height = "10000000px";
        t.appendChild(n);
        var r = document.createElement("div");
        r.style.position = "absolute";
        r.style.left = "0px";
        r.style.top = "0px";
        r.style.right = "0px";
        r.style.bottom = "0px";
        r.style.overflow = "hidden";
        r.style.zIndex = e.toString();
        r.style.visibility = "hidden";
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.left = "0px";
        a.style.top = "0px";
        a.style.width = "200%";
        a.style.height = "200%";
        r.appendChild(a);
        this.element.appendChild(t);
        this.element.appendChild(r);
        this.setScroll(t, r);
        var i = this.element.getBoundingClientRect();
        this.currentWidth = i.width;
        this.currentHeight = i.height;
        t.addEventListener("scroll", this.onScroll);
        r.addEventListener("scroll", this.onScroll);
        this.expand = t;
        this.shrink = r;
    }
    setScroll(e, t) {
        e.scrollLeft = 1e7;
        e.scrollTop = 1e7;
        t.scrollLeft = 1e7;
        t.scrollTop = 1e7;
    }
}
class v extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "underline-section-symbol";
        this.handleLineTypeChanged = (e) => {
            var t = this.props.data.lineStyle || {};
            var n = _.assignIn({},
            t, {
                line: e
            });
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                lineStyle: n
            }));
        };
        this.handleColorSelect = (e, t) => {
            var n = this.props.data.lineStyle || {};
            var r = _.assignIn({},
            n, {
                color: e
            });
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                lineStyle: r
            }), {
                focusAcquired: t
            });
        };
        this.handleLineOnTextChange = (e) => {
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                lineOnText: e
            }));
        };
        this.handleRenderLines = () => {
            this.context.fixedContextHandler.getRenderingContext().nextCycleIfRequired(() => {
                var e = ReactDOM.findDOMNode(this);
                SymbolUnderlineSvg.generate(e, this.divPlaceHolder, this.getLineInfo());
            });
        };
    }
    getCompositeBlockStyle() {
        return _.assignIn({},
        super.getCompositeBlockStyle(), {
            display: "block"
        });
    }
    componentDidMount() {
        super.componentDidMount();
        var e = ReactDOM.findDOMNode(this);
        this.resizeSensor = new A(e, () => {
            console.log("changed");
            this.updateLinesPosition();
        });
        this.resizeSensor.start();
    }
    renderComponent() {
        var e = this.getLineInfo();
        return [React.createElement("div", {
            className: "role-lines-container",
            "data-line-type": e.lineType,
            "data-line-color": e.color,
            "data-line-on-text": !!e.lineOnText,
            key: "place-holder",
            ref: (e) => {
                return this.divPlaceHolder = e;
            },
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                userSelect: "none",
                pointerEvents: "none"
            }
        }), React.createElement(EditArea, Object.assign({
            key: "editor"
        },
        this.buildMetaDataFromName("ulvalue"), {
            isTextMode: true,
            style: {
                lineHeight: "1.4em"
            },
            showBorder: this.isChildSelected()
        })), this.renderSettings()];
    }
    renderSettings() {
        if (this.isChildSelected()) {
            var e = this.props.data.lineStyle || {};
            return React.createElement(SymbolSettingButton, {
                key: "settings",
                smaller: true,
                closeOnClickOutside: true,
                style: {
                    left: -25
                }
            },
            React.createElement("x-setting", {
                class: "mt-common-dialog no-print",
                style: {
                    top: -41,
                    left: -1,
                    position: "absolute",
                    fontSize: 12,
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "gray"
                },
                onMouseDown: EventHelper.focusAndCursorSelectAcquired,
                onDoubleClick: EventHelper.onDoubleClickStopPropagation
            },
            React.createElement("span", {
                style: {
                    paddingRight: 3
                }
            },
            "Line:"), React.createElement(SelectBoxContainer, {
                width: 110,
                style: {
                    display: "inline-block"
                },
                data: [{
                    key: "solid",
                    value: "Solid"
                },
                {
                    key: "dotted",
                    value: "Dotted"
                },
                {
                    key: "dashed",
                    value: "Dashed"
                }],
                value: e.line || "solid",
                onChange: this.handleLineTypeChanged
            }), React.createElement(FillColorIcon, {
                stopPropagation: true,
                style: {
                    display: "inline-block",
                    verticalAlign: "bottom",
                    marginLeft: 5
                },
                value: e.color || this.getDefaultFillBorderColor(),
                onItemSelect: this.handleColorSelect
            }), React.createElement(CheckBoxWrapper, {
                style: {
                    marginLeft: 5,
                    display: "inline-block"
                },
                name: "Line On Text",
                checked: this.props.data.lineOnText,
                onValueChanged: this.handleLineOnTextChange
            })));
        }
    }
    afterReactRenderWhenDataChanged() {
        this.context.fixedContextHandler.getBatchUpdater().pushToEnd(this.handleRenderLines, this);
    }
    updateLinesPosition() {
        this.handleRenderLines();
    }
    getDefaultFillBorderColor() {
        return this.context.fixedContextHandler.getDefaultBorderColor();
    }
    getLineInfo() {
        var e = this.props.data.lineStyle || {};
        return {
            lineOnText: this.props.data.lineOnText,
            lineType: e.line || "solid",
            color: e.color ? ColorTypeConverter.getHtmlColor(e.color) : this.getDefaultFillBorderColor()
        };
    }
}
var SymbolUnderlineSection = new class extends CompositeSymbolBase {
    getViewComponent() {
        return v;
    }
    getLatextName() {
        return "\\underline-section";
    }
    getSymbol() {
        return "underline-section";
    }
    getModelMeta() {
        return {
            text:
            "\\underline-section",
            keyInsertOnSelection: "ulvalue",
            elements: {
                ulvalue: {
                    onRemove: "all"
                }
            }
        };
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            renderSymbol: () => {
                return React.createElement("div", {
                    style: {
                        width: 40,
                        height: 20
                    }
                },
                React.createElement("svg", null, React.createElement("path", {
                    d: "M1,15 L40,15",
                    fill: "none",
                    stroke: "black"
                }), React.createElement("path", {
                    d: "M5,10 L15,10 L15,15 L5,15 Z",
                    fill: "gray",
                    stroke: "none"
                }), React.createElement("path", {
                    d: "M25,10 L30,10 L30,15 L25,15 Z",
                    fill: "gray",
                    stroke: "none"
                })));
            },
            description: "Section filled with underline for all lines",
            insertInTextModeOnly: true
        });
    }
    toModel(e, t, n) {
        return this.getModel();
    }
    toLatex(e, t, n) {
        return n.toLatexFromEditor(e.elements.ulvalue, t);
    }
    toMathml(e, t) {
        return {
            type: "empty"
        };
    }
}

export default SymbolUnderlineSection