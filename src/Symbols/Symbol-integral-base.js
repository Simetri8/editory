import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import BlockHelper from '../Elements/BlockHelper';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditArea from '../Editor/EditArea';
import EditAreaBlock from '../Elements/EditAreaBlock';
import FontList from '../Font/FontList';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import SwitchCaseError from '../Mathcha/SwitchCaseError';
import SymbolPowerIndex from './Symbol-power-index';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(92) /*Symbol-integral-base*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 18 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 1 times
/// var l = n.n(s);
/// var c = n(21)/*EditArea*/;  // 2 times
/// var d = n(29)/*CompositeBlock*/;  // 1 times
/// var h = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var u = n(7)/*PropUpdateHelper*/;  // 2 times
/// var p = n(188)/*Symbol-power-index*/;  // 1 times
/// var m = n(12)/*BlockHelper*/;  // 1 times
/// var f = n(6)/*DiagramIdHelper*/;  // 4 times
/// var g = n(163)/*EditAreaBlock*/;  // 2 times
/// var y = n(37)/*ToolbarIcons*/;  // 2 times
class A extends React.Component {
    render() {
        var e = "square-down common-square-icon ",
        t = "square-up common-square-icon ";
        return this.props.isExpanded && (e = e.concat("common-square-icon-expand"), t = t.concat("common-square-icon-expand")),
        React.createElement("div", {
            className: "icon-integral-symbol"
        },
        React.createElement("div", {
            className: e
        }), React.createElement("div", {
            className: t
        }), React.createElement("div", {
            className: "align-end"
        },
        this.props.symbol))
    }
}
/// var E = n(76)/*MobileTabletClasses*/,  // 2 times
/// v = n(48)/*FontList*/,  // 1 times
/// S = n(174)/*SwitchCaseError*/;  // 1 times
function C(e) {
    return Math.round(100 * e) / 100
}
var x = new class {
    getEditorStyle(e, t, n, r, i, o) {
        var s = this.rawGetEditorStyle(e, t, n, r, i, o);
        return _.assignIn({},
        s, {
            marginLeft: s.marginLeft ? "".concat(s.marginLeft, "em") : void 0,
            marginRight: s.marginRight ? "".concat(s.marginRight, "em") : void 0
        })
    }
    rawGetEditorStyleAsana(e, t, n, r, a) {
        switch (r) {
        case "limit":
            switch (a) {
            case "inline":
                switch (t) {
                case "editor":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .2,
                            marginBottom: .05
                        };
                    case "to":
                        return {
                            marginLeft: -.2,
                            marginRight: .2,
                            marginTop: .23
                        }
                    }
                case "editor-block":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .284,
                            marginBottom: .05
                        };
                    case "to":
                        return {
                            marginLeft: -.284,
                            marginRight: .284,
                            marginTop: .23
                        }
                    }
                }
            case "display":
                switch (t) {
                case "editor":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .2,
                            marginBottom: -.05
                        };
                    case "to":
                        return {
                            marginLeft: -.2,
                            marginRight: .2,
                            marginTop: .35
                        }
                    }
                case "editor-block":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .284,
                            marginBottom: -.05
                        };
                    case "to":
                        return {
                            marginLeft: -.284,
                            marginRight: .284,
                            marginTop: .45
                        }
                    }
                }
            }
        case "non-limit":
            switch (a) {
            case "inline":
                switch (t) {
                case "editor":
                    return this.styleForIntNonLimitKind(.95, e, n, -.7, -.3);
                case "editor-block":
                    return this.styleForIntNonLimitKind(1.42 - .05, e, n, -.4, -.3)
                }
            case "display":
                switch (t) {
                case "editor":
                    return this.styleForIntNonLimitKind(1.4, e, n, -1, -.6);
                case "editor-block":
                    return this.styleForIntNonLimitKind(2.01, e, n, -.6, -.6)
                }
            }
        }
    }
    rawGetEditorStyleLatin(e, t, n, r, a) {
        switch (r) {
        case "limit":
            switch (a) {
            case "inline":
                switch (t) {
                case "editor":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .2,
                            marginBottom: -.05
                        };
                    case "to":
                        return {
                            marginLeft: -.2,
                            marginRight: .2,
                            marginTop: .07
                        }
                    }
                case "editor-block":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .284,
                            marginBottom: -.05
                        };
                    case "to":
                        return {
                            marginLeft: -.284,
                            marginRight: .284,
                            marginTop: .07
                        }
                    }
                }
            case "display":
                switch (t) {
                case "editor":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .2,
                            marginBottom: -.2
                        };
                    case "to":
                        return {
                            marginLeft: -.2,
                            marginRight: .2,
                            marginTop: .07
                        }
                    }
                case "editor-block":
                    switch (e) {
                    case "from":
                        return {
                            marginLeft: .284,
                            marginBottom: -.2
                        };
                    case "to":
                        return {
                            marginLeft: -.284,
                            marginRight: .284,
                            marginTop: .07
                        }
                    }
                }
            }
        case "non-limit":
            switch (a) {
            case "inline":
                switch (t) {
                case "editor":
                    return this.styleForIntNonLimitKind(.83, e, n, -.7, -.4);
                case "editor-block":
                    return this.styleForIntNonLimitKind(1.17, e, n, -.4, -.4)
                }
            case "display":
                switch (t) {
                case "editor":
                    return this.styleForIntNonLimitKind(1.28, e, n, -1.1, -.74);
                case "editor-block":
                    return this.styleForIntNonLimitKind(2.13 - .35, e, n, -.7, -.8)
                }
            }
        }
    }
    rawGetEditorStyle(e, t, n, r, a, i) {
        switch (i) {
        case "Asana":
            return this.rawGetEditorStyleAsana(e, t, n, r, a);
        case "LatinModern":
            return this.rawGetEditorStyleLatin(e, t, n, r, a)
        }
        Object(SwitchCaseError)(i)
    }
    styleForIntNonLimitKind(e, t, n, r, a) {
        switch (t) {
        case "from":
            return {
                justifyContent: "flex-start",
                marginLeft: this.leftMarginForIntNonLimitKind(e, t, n),
                marginBottom: r
            };
        case "to":
            return {
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                marginLeft: this.leftMarginForIntNonLimitKind(e, t, n),
                marginTop: a
            }
        }
    }
    leftMarginForIntNonLimitKind(e, t, n) {
        switch (n) {
        case "\\int":
            case "\\oint":
            switch (t) {
            case "from":
                return C(.85 * e);
            case "to":
                return C(.5 * e)
            }
        case "\\iint":
            case "\\oiint":
            switch (t) {
            case "from":
                return C(1.25 * e);
            case "to":
                return C(.9 * e)
            }
        case "\\iiint":
            case "\\oiiint":
            switch (t) {
            case "from":
                return C(1.65 * e);
            case "to":
                return C(1.3 * e)
            }
        }
    }
}
/// I = n(14)/*classnames*/,  // 2 times
/// T = n.n(I)
/// b = n(13)/*CreateEditorObject*/,  // 3 times
/// L = n(16)/*ReactDOM*/,  // 1 times
/// R = n.n(L)
/// M = n(5)/*sizzle*/,  // 1 times
/// w = n.n(M);
/*n.d(t, "a", function () {
    return O
}),*/
/*n.d(t, "b", function () {
    return D
});*/
class O extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.containerClassName = "integral-like-symbol limit-type";
        this.onSettingClick = (e => {
            e.stopPropagation();
            e.preventDefault();
            console.log("see");
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "isLimitKind", !this.isLimitKind()))
        })
    }
    useCustomBaseLine() {
        return !1
    }
    getSymbol() {
        return "∫"
    }
    getSymbolClassName() {
        return ""
    }
    isLimitKind() {
        return !! this.props.data.isLimitKind
    }
    getPowerIndexInfo() {
        var e = ReactDOM.findDOMNode(this),
        t = jQuery(e).children("x-symbol").get(0) || e,
        n = this.getElementRect(t),
        r = .09 * n.height,
        a = .05 * -n.height;
        return {
            shouldConsiderAsChar: !1,
            rect: {
                top: n.top + r,
                height: n.height - r - a
            }
        }
    }
    onAddClick(e) {
        e.stopPropagation();
        e.preventDefault();
        var t = {
            from: {
                id: DiagramIdHelper.nextId(),
                lines: [{
                    id: DiagramIdHelper.nextId(),
                    blocks: []
                }]
            },
            to: {
                id: DiagramIdHelper.nextId(),
                lines: [{
                    id: DiagramIdHelper.nextId(),
                    blocks: []
                }]
            }
        };
        this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "elements", t));
        this.selectElement("from")
    }
    getSettingTopEm() {
        return this.isEditorEmpty(this.props.data.elements.from) ? -2.9 : -1.9
    }
    renderSetting() {
        if (!this.isSelectModeOnly() && this.isDirectSelectedNoSelectionMode() && (this.props.data.elements.to || this.props.data.elements.from)) {
            var e = {
                transform: MobileTabletClasses.getSettingScaleTransform()
            };
            return this.isLimitKind() ? (e.top = this.getSettingTopEm() + "em", React.createElement("x-setting", {
                key: "setting",
                class: "setting-popup-zindex  no-print",
                style: e,
                onMouseDown: this.onSettingClick
            },
            ToolbarIcons.limitTypeIcon)) : React.createElement("x-setting", {
                key: "setting",
                class: "setting-popup-zindex  no-print",
                style: e,
                onMouseDown: this.onSettingClick
            },
            ToolbarIcons.limitTypeIcon)
        }
    }
    renderAdd() {
        if (!this.isSelectModeOnly()) {
            var e = {
                transform: MobileTabletClasses.getSettingScaleTransform()
            };
            return !this.isDirectSelectedNoSelectionMode() || this.props.data.elements.to || this.props.data.elements.from ? void 0 : React.createElement("x-add", {
                key: "add",
                class: "no-print",
                style: e,
                onMouseDown: e => {
                    this.onAddClick(e)
                }
            },
            React.createElement("i", {
                className: "fa fa-plus",
                "aria-hidden": "true"
            }))
        }
    }
    getIntBaseEditorStyle(e) {
        var t = this.shoudUseEditAreaBlock(this.props.data.elements[e]),
        n = this.isInlineMode(),
        r = this.isLimitKind();
        return x.getEditorStyle(e, t ? "editor-block" : "editor", this.props.data.text, r ? "limit" : "non-limit", n ? "inline" : "display", this.context.baseMathModeFontFamily)
    }
    getFromStyle() {
        var e = this.isInlineMode(),
        t = this.isLimitKind(),
        n = this.getIntBaseEditorStyle("from");
        return _.assignIn({},
        n, {
            marginBottom: this.getRoundEmStr(n.marginBottom),
            minHeight: t ? "" : e ? this.getRoundEmStr(1) : this.getRoundEmStr(1.1)
        })
    }
    getToStyle() {
        var e = this.isInlineMode(),
        t = this.isLimitKind(),
        n = this.getIntBaseEditorStyle("to");
        return _.assignIn({},
        n, {
            marginTop: this.getRoundEmStr(n.marginTop),
            minHeight: t || e ? "" : this.getRoundEmStr(1)
        })
    }
    renderFrom() {
        var e = this.props.data.elements.from;
        if (e) {
            var t, n = classNames("from", this.getFromClass());
            return t = this.shoudUseEditAreaBlock(e) ? React.createElement(EditAreaBlock, Object.assign({
                key: "from"
            },
            this.buildLightMetadata("from"), {
                border: this.isChildSelected(),
                className: n,
                borderIfEmpty: this.isSelected(),
                style: this.getFromStyle(),
                fontScale: .7,
                fontSize: .7 * this.props.fontSize,
                stripInfo: this.setStripInfo({
                    stripDown: !0
                })
            })) : React.createElement(EditArea, Object.assign({
                key: "from",
                className: n,
                style: this.getFromStyle()
            },
            this.buildMetaDataFromName("from"), {
                borderIfEmpty: this.isSelected(),
                fontSize: .7 * this.props.fontSize,
                noAreaContainer: !0,
                noSpacingRule: !0,
                stripInfo: this.setStripInfo({
                    stripDown: !0
                })
            })),
            this.isEditorEmpty(e) && this.isLimitKind() ? React.createElement("x-empty", {
                key: "from-wrap",
                class: "from"
            },
            t) : t
        }
    }
    shoudUseEditAreaBlock(e) {
        return BlockHelper.isEmptyOrOneTextEditor(e)
    }
    renderTo() {
        var e = this.props.data.elements.to;
        if (e) {
            var t, n = classNames("to", this.getToClass());
            return t = this.shoudUseEditAreaBlock(e) ? React.createElement(EditAreaBlock, Object.assign({
                key: "to"
            },
            this.buildLightMetadata("to"), {
                border: this.isChildSelected(),
                className: n,
                borderIfEmpty: this.isSelected(),
                style: this.getToStyle(),
                fontScale: .7,
                takeHeightIntoAccount: !this.isInlineMode(),
                fontSize: .7 * this.props.fontSize,
                stripInfo: this.setStripInfo({
                    stripUp: this.isLimitKind() || this.isInlineMode()
                })
            })) : React.createElement(EditArea, Object.assign({
                key: "to",
                style: this.getToStyle(),
                className: n
            },
            this.buildMetaDataFromName("to"), {
                borderIfEmpty: this.isSelected(),
                highZOrderIndexOfEmpty: !0,
                fontSize: .7 * this.props.fontSize,
                noSpacingRule: !0,
                noAreaContainer: !0,
                stripInfo: this.setStripInfo({
                    stripUp: !0
                })
            })),
            this.isEditorEmpty(e) && this.isLimitKind() ? React.createElement("x-empty", {
                key: "to-wrap",
                class: "to"
            },
            t) : t
        }
    }
    getEditorFromToMarginLeft() {
        return ""
    }
    getFromClass() {
        return ""
    }
    getToClass() {
        return ""
    }
    getClassName() {
        return this.containerClassName + (this.isLimitKind() ? " limit-kind " : " non-limit-kind ")
    }
    getSymbolFontFamily() {
        return FontList.mathFontFamiltyFromKey("\\mathnormal", this.context.baseMathModeFontFamily)
    }
    renderComponent() {
        return [this.renderFrom(), React.createElement("x-symbol", {
            key: "symbol",
            class: this.getSymbolClassName(),
            style: {
                fontFamily: this.getSymbolFontFamily()
            }
        },
        React.createElement("span", null, this.getSymbol())), this.renderTo(), this.renderSetting(), this.renderAdd()]
    }
}
class D extends CompositeSymbolBase {
    constructor() {
        super(...arguments);
        this.isIntegralLike = !0
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            keyInsertOnSelection: "from",
            elements: {
                from: {
                    defaultHide: !0,
                    onRemove: "only"
                },
                to: {
                    defaultHide: !0,
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName(), this.getSymbol()],
            symbol: this.getSymbol(),
            height: 40,
            hasExpanded: !0,
            renderSymbol() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return React.createElement(A, {
                    symbol: this.symbol,
                    isExpanded: e
                })
            }
        })
    }
    toLatex(e, t, n, r) {
        var a = {
            id: "fake-id",
            text: "\\fake",
            type: "composite",
            elements: {
                powerValue: this.isEmptyEditor(e.elements.from) ? null : e.elements.from,
                indexValue: this.isEmptyEditor(e.elements.to) ? null : e.elements.to
            }
        },
        i = " ";
        if (void 0 !== e.isLimitKind && null !== e.isLimitKind) i = e.isLimitKind ? "\\limits " : "\\nolimits ";
        this.isEmptyEditor(e.elements.from) && this.isEmptyEditor(e.elements.to) && (i = "");
        var o = SymbolPowerIndex.toLatex(a, t, n, {
            blockIndex:
            r.blockIndex,
            wrapBlocks: r.wrapBlocks,
            latexArray: []
        }),
        s = this.getLatextName() + i + o;
        return o && _.endsWith(o, "}") || (s += " "),
        s
    }
    toModel(e, t, n) {
        var r = {};
        null != n && (r = {
            from: n.elements.powerValue || CreateEditorObject.createEmptyEditor(),
            to: n.elements.indexValue || CreateEditorObject.createEmptyEditor()
        });
        var a = CreateEditorObject.createComposite(e);
        return a.elements = r,
        null != t && ("\\limits" == t && (a.isLimitKind = !0), "\\nolimits" == t && (a.isLimitKind = !1)),
        a
    }
    toMathml(e, t) {
        return e.elements.from || e.elements.to ? {
            type: "munderover",
            base: {
                type: "mo",
                value: this.getSymbol(),
                largeop: !0,
                movablelimit: !0
            },
            overscript: t.generateEditor(e.elements.from),
            underscript: t.generateEditor(e.elements.to)
        } : {
            type: "mo",
            value: this.getSymbol(),
            largeop: !0
        }
    }
}

export { D as SymbolIntegralBaseB }

export default O