import _ from 'lodash';
import React from 'react';
import { SuggestionBoxZSpecTabB } from '../Editor/SuggestionBoxZSpecTab';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import FontList from '../Font/FontList';
import GetSymbolLatex from '../Latex/GetSymbolLatex';
import Global from '../Global';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SymbolSettingButton from '../Elements/SymbolSettingButton';

/// xxx(1529) /*Symbol-Z-notation*/

/// n.r(t)
/// var r = n(3)/*_.assignIn*/;  // 9 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 35 times
/// var o = n.n(i);
/// var s = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var l = n(116)/*CompositeBlockWrapper*/;  // 1 times
/// var c = n(21)/*EditArea*/;  // 4 times
/// var d = n(51)/*SelectBoxContainer*/;  // 1 times
/// var h = n(106)/*SymbolSettingButton*/;  // 1 times
/// var u = n(24)/*EventHelper*/;  // 2 times
class p extends React.Component {
    render() {
        return React.createElement(SymbolSettingButton, {
            smaller: !0,
            keepOpenKey: "z-specification",
            keepOpenTimeDuration: 200,
            closeOnClickOutside: !0,
            style: {
                top: -5,
                left: -24
            }
        },
        React.createElement("x-setting", {
            class: "mt-common-dialog no-print",
            style: _.assignIn({
                top: -38,
                left: 0,
                position: "absolute",
                fontSize: 12,
                paddingLeft: 10,
                paddingRight: 10
            },
            this.props.settingsStyle),
            onMouseDown: EventHelper.focusAndCursorSelectAcquired,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
        React.createElement("span", {
            style: {
                paddingRight: 2
            }
        },
        "Type: "), React.createElement(SelectBoxContainer, {
            width: 110,
            style: {
                display: "inline-block"
            },
            data: [{
                key: "schema",
                value: "Schema"
            },
            {
                key: "axdef",
                value: "Axiomatic"
            },
            {
                key: "gendef",
                value: "Generic"
            },
            {
                key: "basic",
                value: "Basic"
            }],
            value: this.props.type,
            onChange: this.props.onSpecificationTypeChange
        }), this.props.needNameSection ? React.createElement("button", {
            className: "btn-normal",
            onClick: this.props.onAddNameSection,
            style: {
                display: "inline-block",
                marginLeft: 10
            }
        },
        "Add Name Section") : void 0, this.props.needPredicateSection ? React.createElement("button", {
            className: "btn-normal",
            onClick: this.props.onAddPredicateSection,
            style: {
                display: "inline-block",
                marginLeft: 10
            }
        },
        "Add Predicate Section") : void 0))
    }
}
/// var m = n(102)/*GetSymbolLatex*/,  // 4 times
/// f = n(227)/*SuggestionBoxZSpecTab*/,  // 1 times
/// g = n(11)/*Global*/,  // 1 times
/// y = n(48)/*FontList*/,  // 4 times
/// A = n(96)/*BatchedUpdates*/,  // 1 times
/// E = n(13)/*CreateEditorObject*/;  // 5 times
class v extends CompositeBlockWrapper {
    constructor() {
        super(...arguments);
        this.containerClassName = "z-schema-symbol role-mathmode-area";
        this.handleSpecificationTypeChange = (e => {
            var t, n = this.props.data,
            r = this.props.data.___tempElements || {};
            switch (e) {
            case "axdef":
                t = _.assignIn({},
                n, {
                    elements: {
                        symDec: n.elements.symDec,
                        conPre: n.elements.conPre || r.conPre || CreateEditorObject.createEmptyEditor()
                    },
                    ___tempElements: {
                        name: n.elements.name
                    },
                    zType: e
                });
                break;
            case "basic":
                t = _.assignIn({},
                n, {
                    elements: {
                        symDec: n.elements.symDec
                    },
                    ___tempElements: {
                        name: n.elements.name,
                        conPre: n.elements.conPre
                    },
                    zType: e
                });
                break;
            case "gendef":
                case "schema":
                t = _.assignIn({},
                n, {
                    elements: {
                        symDec: n.elements.symDec,
                        conPre: n.elements.conPre || r.conPre || CreateEditorObject.createEmptyEditor(),
                        name: n.elements.name || r.name || CreateEditorObject.createEmptyEditor()
                    },
                    ___tempElements: void 0,
                    zType: e
                })
            }
            BatchedUpdates. in (() => {
                this.props.onDataChanged(t);
                this.props.onSelectedChanged({
                    key: "symDec",
                    selected: {
                        lineIndex: 0,
                        charIndex: 0
                    }
                })
            })
        });
        this.handleAddNameSection = (() => {
            var e = this.props.data;
            e.elements.name || this.props.onDataChanged(_.assignIn({},
            e, {
                elements: _.assignIn({},
                e.elements, {
                    name: CreateEditorObject.createEmptyEditor()
                })
            }))
        });
        this.handleAddPredicateSection = (() => {
            var e = this.props.data;
            e.elements.conPre || this.props.onDataChanged(_.assignIn({},
            e, {
                elements: _.assignIn({},
                e.elements, {
                    conPre: CreateEditorObject.createEmptyEditor()
                })
            }))
        })
    }
    getCompositeBlockStyle() {
        return {
            display: "block",
            paddingTop: "0.5em",
            paddingLeft: "1em",
            paddingBottom: "0.5em",
            fontSize: this.context.mathFontSizeBase,
            background: this.props.selected ? this.getSelectedMathBg() : void 0
        }
    }
    getSelectedMathBg() {
        return this.context.fixedContextHandler.getSelectedMathBg()
    }
    renderSchema(e) {
        var t = "schema" == e || "gendef" == e,
        n = ("schema" == e || "gendef" == e) && !!this.props.data.elements.name,
        r = "gendef" == e,
        a = !!this.props.data.elements.conPre,
        i = "gendef" == e;
        return [n ? React.createElement("div", {
            className: "role-name-section",
            key: "top",
            style: {
                position: "relative",
                zIndex: 1,
                marginBottom: r ? "-0.55em" : "-0.32em",
                marginLeft: 15
            }
        },
        React.createElement("div", {
            className: "role-name-content",
            style: {
                background: this.props.selected ? this.getSelectedMathBg() : this.context.fixedContextHandler.getMainThemeColor(),
                display: "inline-block",
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathit", this.context.baseMathModeFontFamily)
            }
        },
        React.createElement("span", {
            style: {
                paddingLeft: 3,
                display: i ? void 0 : "none"
            }
        },
        "["), React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("name"), {
            style: {
                display: "inline-block",
                minWidth: i ? 5 : 10,
                paddingLeft: i ? void 0 : 3,
                paddingRight: i ? void 0 : 3
            },
            isFirstMathModeLevel: !0,
            className: "math-mode-font",
            showBorder: !1,
            renderContext: "z-spec"
        })), React.createElement("span", {
            style: {
                paddingRight: 3,
                display: i ? void 0 : "none"
            }
        },
        "]"))) : void 0, , r ? React.createElement("div", {
            key: "another-top-border",
            className: "role-another-top-border",
            style: {
                height: 2,
                borderTop: "1px solid ",
                borderLeft: "1px solid "
            }
        }) : void 0, React.createElement("div", {
            key: "bottom",
            className: "role-dec-pred-section",
            style: {
                borderLeft: "1px solid",
                borderTop: t ? "1px solid" : void 0,
                borderBottom: t ? "1px solid" : void 0,
                padding: a ? "4px 7px 7px 15px" : "4px 7px 4px 15px",
                position: "relative"
            }
        },
        React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("symDec"), {
            isFirstMathModeLevel: !0,
            className: "math-mode-font",
            style: {
                paddingBottom: a ? 7 : void 0,
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathit", this.context.baseMathModeFontFamily)
            },
            showBorder: !1,
            renderContext: "z-spec"
        })), a ? React.createElement("div", {
            className: "role-pred-border",
            style: {
                height: 1,
                borderTop: "1px solid ",
                width: 150,
                marginLeft: -15
            }
        }) : void 0, a ? React.createElement(EditArea, Object.assign({
            style: {
                paddingTop: 2,
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathit", this.context.baseMathModeFontFamily)
            }
        },
        this.buildMetaDataFromName("conPre"), {
            isFirstMathModeLevel: !0,
            className: "math-mode-font",
            showBorder: !1,
            renderContext: "z-spec"
        })) : void 0), this.renderSetting()]
    }
    renderSetting() {
        if (!this.isSelectModeOnly() && this.isChildSelected()) {
            var e = this.zType(),
            t = ("schema" == e || "gendef" == e) && !this.props.data.elements.name,
            n = ("schema" == e || "gendef" == e || "axdef" == e) && !this.props.data.elements.conPre;
            return React.createElement(p, {
                key: "z-schema-settings",
                type: e,
                onAddNameSection: this.handleAddNameSection,
                onAddPredicateSection: this.handleAddPredicateSection,
                needNameSection: t,
                needPredicateSection: n,
                onSpecificationTypeChange: this.handleSpecificationTypeChange
            })
        }
    }
    zType() {
        return this.props.data.zType || "schema"
    }
    renderBasic() {
        return [React.createElement("div", {
            key: "bottom"
        },
        React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("symDec"), {
            isFirstMathModeLevel: !0,
            className: "math-mode-font",
            style: {
                paddingBottom: 7,
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathit", this.context.baseMathModeFontFamily)
            },
            borderIfEmpty: !0,
            renderContext: "z-spec"
        }))), this.renderSetting()]
    }
    renderComponent() {
        var e = this.props.data.zType || "schema";
        return "basic" == e ? this.renderBasic() : this.renderSchema(e)
    }
}
var SymbolZNotation = new class extends CompositeSymbolBase {
    getViewComponent() {
        return v
    }
    getModel(e) {
        var t = super.getModel(e);
        switch (e && e.category || "schema") {
        case "schema":
            break;
        case "axdef":
            t.zType = "axdef";
            delete t.elements.name;
            break;
        case "basic":
            t.zType = "basic";
            delete t.elements.name;
            delete t.elements.conPre
        }
        return t
    }
    getModelMeta() {
        return {
            text: "\\z-schema",
            keyInsertOnSelection: "symDec",
            elements: {
                name: {
                    onRemove: "only"
                },
                symDec: {
                    onRemove: "all"
                },
                conPre: {
                    onRemove: "only"
                }
            }
        }
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: ["\\z-schema"],
            description: "Z Notation - Schema Definition",
            symbol: "Z Schema",
            insertInTextModeOnly: !0,
            category: "schema",
            renderSymbol: () => React.createElement("div", {
                style: {
                    width: 30,
                    height: 20
                }
            },
            React.createElement("svg", null, React.createElement("path", {
                d: "M1,2 L4,2 M14,2 L31,2 M1,2 L1,20 L30,20 M1,11 L15,11",
                stroke: "gray",
                fill: "none"
            }), React.createElement("path", {
                d: "M4,5 L23,5 L23,8 L4,8 Z",
                stroke: "none",
                fill: "gray"
            }), React.createElement("path", {
                d: "M4,14 L23,14 L23,17 L4,17 Z",
                stroke: "none",
                fill: "gray"
            }), React.createElement("path", {
                d: "M5,0 L12,0 L12,3 L5,3 Z",
                stroke: "none",
                fill: "gray"
            })))
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\z-axiom"],
            description: "Z Notation - Axiomatic Definition",
            symbol: "Z Axiom",
            insertInTextModeOnly: !0,
            category: "axdef",
            renderSymbol: () => React.createElement("div", {
                style: {
                    width: 30,
                    height: 20
                }
            },
            React.createElement("svg", null, React.createElement("path", {
                d: " M1,2 L1,20  M1,11 L15,11",
                stroke: "gray",
                fill: "none"
            }), React.createElement("path", {
                d: "M4,5 L23,5 L23,8 L4,8 Z",
                stroke: "none",
                fill: "gray"
            }), React.createElement("path", {
                d: "M4,14 L23,14 L23,17 L4,17 Z",
                stroke: "none",
                fill: "gray"
            })))
        }), this.fillSymbolInfo({
            type: "composite",
            names: ["\\z-basic"],
            description: "Z Notation - Free form",
            symbol: "Z Basic",
            insertInTextModeOnly: !0,
            category: "basic",
            renderSymbol: () => React.createElement("div", {
                style: {
                    width: 30,
                    height: 20
                }
            },
            React.createElement("svg", null, React.createElement("path", {
                d: "M4,7 L23,7 L23,10 L4,10 Z",
                stroke: "none",
                fill: "gray"
            }), React.createElement("path", {
                d: "M4,12 L23,12 L23,15 L4,15 Z",
                stroke: "none",
                fill: "gray"
            })))
        })]
    }
    getHelpText() {
        return Global.inNodeEnv() ? "" : "%You need to include zed-csp package (or zed-csp.sty) in order to use z-notation environments \n"
    }
    toLatex(e, t, n) {
        t = _.assignIn({},
        t, {
            inMathExpression: !0,
            customMappingSymbols: SuggestionBoxZSpecTabB.get()
        });
        var r = {
            ignoreWrapMultiline: !0
        };
        switch (e.zType || "schema") {
        case "basic":
            var i = {
                type: "environment",
                name: "zed",
                element: {
                    type: "raw-element",
                    rawText: n.toLatexFromEditor(e.elements.symDec, t, r)
                }
            };
            return this.getHelpText() + GetSymbolLatex.fromEnvironment(i);
        case "gendef":
            var o = {
                type: "environment",
                name: "gendef",
                options: [{
                    type: "environment-option",
                    bracketType: "square",
                    element: {
                        type: "raw-element",
                        rawText: e.elements.name ? n.toLatexFromEditor(e.elements.name, t) : ""
                    }
                }],
                element: {
                    type: "group",
                    elements: [{
                        type: "raw-element",
                        rawText: n.toLatexFromEditor(e.elements.symDec, t, r)
                    },
                    {
                        type: "raw-element",
                        rawText: e.elements.conPre ? "\n\\where\n" : ""
                    },
                    , {
                        type: "raw-element",
                        rawText: e.elements.conPre ? n.toLatexFromEditor(e.elements.conPre, t, r) : ""
                    }]
                }
            };
            return this.getHelpText() + GetSymbolLatex.fromEnvironment(o);
        case "axdef":
            var s = {
                type: "environment",
                name: "axdef",
                element: {
                    type: "group",
                    elements: [{
                        type: "raw-element",
                        rawText: n.toLatexFromEditor(e.elements.symDec, t, r)
                    },
                    {
                        type: "raw-element",
                        rawText: e.elements.conPre ? "\n\\where\n" : ""
                    },
                    , {
                        type: "raw-element",
                        rawText: e.elements.conPre ? n.toLatexFromEditor(e.elements.conPre, t, r) : ""
                    }]
                }
            };
            return this.getHelpText() + GetSymbolLatex.fromEnvironment(s);
        case "schema":
            var l = {
                type: "environment",
                name: "schema",
                options: [{
                    type: "environment-option",
                    bracketType: "brace",
                    element: {
                        type: "raw-element",
                        rawText: e.elements.name ? n.toLatexFromEditor(e.elements.name, t) : ""
                    }
                }],
                element: {
                    type: "group",
                    elements: [{
                        type: "raw-element",
                        rawText: n.toLatexFromEditor(e.elements.symDec, t, r)
                    },
                    {
                        type: "raw-element",
                        rawText: e.elements.conPre ? "\n\\where\n" : ""
                    },
                    , {
                        type: "raw-element",
                        rawText: e.elements.conPre ? n.toLatexFromEditor(e.elements.conPre, t, r) : ""
                    }]
                }
            };
            return this.getHelpText() + GetSymbolLatex.fromEnvironment(l)
        }
        return "????"
    }
    alignLeftIfTable(e) {
        return "mtable" == e.type && (e.columnalign = "left"),
        e
    }
    toMathml(e, t) {
        var n = e.zType || "schema",
        r = [{
            e: this.alignLeftIfTable(t.generateEditor(e.elements.name)),
            type: "name"
        },
        {
            e: this.alignLeftIfTable(t.generateEditor(e.elements.symDec)),
            type: "symDec"
        },
        {
            e: this.alignLeftIfTable(t.generateEditor(e.elements.conPre)),
            type: "conPre"
        }].filter(e => !("empty" == e.e.type || "mrow" == e.e.type && e.e.isNone)),
        a = t.getOptions() || {},
        i = {
            type: "mtable",
            columnalign: "left",
            rows: r.map(e => {
                var t = "";
                switch (e.type) {
                case "name":
                    t = "Name Section: ";
                    break;
                case "symDec":
                    t = "Symbol Declration Section:";
                    break;
                case "conPre":
                    t = "Constraining Predicates Section:"
                }
                return a.screenReader || (t = ""),
                {
                    type: "mtr",
                    cells: [{
                        type: "mtd",
                        element: {
                            type: "mrow",
                            elements: [{
                                type: "mtext",
                                value: t
                            },
                            e.e]
                        }
                    }]
                }
            })
        };
        return {
            type: "math",
            elements: [{
                type: "mtext",
                value: a.screenReader ? this.getDescription(n) : ""
            },
            i]
        }
    }
    getDescription(e) {
        switch (e) {
        case "axdef":
            return "Z-Notation,Axiomatic Definition in Table";
        case "basic":
            return "Z-Notation";
        case "gendef":
            return "Z-Notation,Generic Definition in Table";
        case "schema":
            return "Z-Notation,Schema Definition in Table"
        }
    }
    toModel(e, t, n) {
        return this.getModel()
    }
}

export default SymbolZNotation