import _ from 'lodash';
import { Promise } from 'bluebird';
import classNames from 'classnames';
import React from 'react';
import BaseComponent from '../Elements/BaseComponent';
import CheckBoxWrapper from './CheckBoxWrapper';
import FontList from '../Font/FontList';
import FontSelectBox from '../Editor/FontSelectBox';
import Global from '../Global';
import LabelItemContainer from '../Elements/LabelItemContainer';
import ModalDialog from '../Editor/ModalDialog';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import SpellCheckRunner from './SpellCheckRunner';
import TimerHelper from './TimerHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(462) /*PageSettings*/

/// var r = n(3)/*_.assignIn*/;  // 11 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 38 times
/// var o = n.n(i);
/// var s = n(51)/*SelectBoxContainer*/;  // 4 times
/// var c = n(228)/*SpellCheckRunner*/;  // 1 times
/// var d = n(454)/*FontSelectBox*/;  // 1 times
/// var h = n(11)/*Global*/;  // 2 times
/// var u = n(101)/*CheckBoxWrapper*/;  // 1 times
/// var p = n(37)/*ToolbarIcons*/;  // 1 times
/// var x = n(124)/*ModalDialog*/,  // 1 times
/// I = n(126)/*LabelItemContainer*/,  // 1 times
/// T = n(14)/*classnames*/,  // 1 times
/// b = n.n(T)
/// L = n(30)/*blubirdjs*/,  // 3 times
/// R = n.n(L);
/// var O = n(62)/*BaseComponent*/,  // 1 times
/// D = n(19)/*TimerHelper*/,  // 1 times
/// N = n(48)/*FontList*/;  // 1 times
/*n.d(t, "b", function () {
    return F
}),*/
/*n.d(t, "a", function () {
    return H
});*/
var m = [{
    key: "Asana",
    value: "Asana (default)"
},
{
    key: "LatinModern",
    value: "Latin Modern (similar to Latex)"
}];
var f = [{
    key: 7,
    value: "7 px"
},
{
    key: 8,
    value: "8 px"
},
{
    key: 9,
    value: "9 px"
},
{
    key: 10,
    value: "10 px"
},
{
    key: 11,
    value: "11 px"
},
{
    key: 12,
    value: "12 px"
},
{
    key: 13,
    value: "13 px"
},
{
    key: 14,
    value: "14 px"
},
{
    key: 15,
    value: "15 px"
},
{
    key: 16,
    value: "16 px"
},
{
    key: 17,
    value: "17 px"
},
{
    key: 18,
    value: "18 px"
},
{
    key: 19,
    value: "19 px"
},
{
    key: 20,
    value: "20 px"
},
{
    key: 21,
    value: "21 px"
},
{
    key: 22,
    value: "22 px"
},
{
    key: 23,
    value: "23 px"
}];
var g = [{
    key: "none",
    value: "None"
},
{
    key: "de",
    value: "German"
},
{
    key: "de-at",
    value: "German (Austria)"
},
{
    key: "de-ch",
    value: "German (Switzerland)"
},
{
    key: "en-au",
    value: "English (Australia)"
},
{
    key: "en-ca",
    value: "English (Canada)"
},
{
    key: "en-gb",
    value: "English (United Kingdom)"
},
{
    key: "en-us",
    value: "English (United State)"
},
{
    key: "en-za",
    value: "English (South Africa)"
},
{
    key: "es",
    value: "Spanish (or Castilian)"
},
{
    key: "fr",
    value: "French"
},
{
    key: "vi",
    value: "Vietnamese"
}];
class y extends React.Component {
    constructor(e) {
        super(e);
        this.onFontChange = (e) => {
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    fontName: e
                })
            });
        };
        this.onMathFontSizeChange = (e) => {
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    mathFontSize: e
                })
            });
        };
        this.onFontSizeChange = (e) => {
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    fontSize: e
                })
            });
        };
        this.onMathFontChange = (e) => {
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    mathFontName: e
                })
            });
        };
        this.onDarkModeChanged = (e) => {
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    isDarkMode: e
                })
            });
        };
        this.onSpellCheckLanguageChanged = (e) => {
            if ("none" != e) {
                SpellCheckRunner.preload(e);
            }
            var t = this.getSpellCheck();
            var n = _.assignIn({},
            t, {
                language: e
            });
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    spellCheck: n
                })
            });
        };
        this.onSpellCheckIgnoreWordsChanged = (e) => {
            var t = this.getSpellCheck();
            var n = _.assignIn({},
            t, {
                ignoreWords: e
            });
            this.setState({
                data: _.assignIn({},
                this.state.data, {
                    spellCheck: n
                })
            });
        };
        this.toggleSpellCheckMore = () => {
            this.setState({
                spellCheckShowMore: !this.state.spellCheckShowMore
            });
        };
        this.state = {
            data: this.props.data,
            spellCheckShowMore: false
        };
    }
    getData() {
        return this.state.data;
    }
    getSpellCheck() {
        return this.state.data.spellCheck || {};
    }
    renderSpellCheckShowMore() {
        var e = this.getSpellCheck();
        if (this.state.spellCheckShowMore) {
            return React.createElement("div", {
                style: v,
                className: "test-spell-check-more"
            },
            React.createElement("st-label", {
                style: S
            },
            "Spell check Ignore"), React.createElement("textarea", {
                onChange: (e) => {
                    return this.onSpellCheckIgnoreWordsChanged(e.currentTarget.value);
                },
                style: {
                    width: 154,
                    height: 70,
                    resize: "none",
                    color: "gray"
                },
                value: e ? void 0 === e.ignoreWords ? "ok\neg" : e.ignoreWords : "ok\neg"
            }));
        }
    }
    renderMathFont() {
        if (Global.moreFonts()) {
            return React.createElement("div", {
                style: v,
                className: "test-math-mode-font"
            },
            React.createElement("st-label", {
                style: S
            },
            "Math Font"), React.createElement(SelectBoxContainer, {
                data: m,
                isReadOnly: true,
                onChange: this.onMathFontChange,
                value: this.state.data.mathFontName,
                inputStyle: {
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                },
                selectBoxStyle: E,
                width: 160,
                expansionWidth: 200,
                title: "Math Fonts"
            }));
        }
    }
    renderDarkModeSetting() {
        return React.createElement("div", {
            style: v,
            className: "test-dark-mode-enable"
        },
        React.createElement("st-label", {
            style: S
        },
        React.createElement("span", null, "Document Dark Mode "), React.createElement("span", {
            className: "toolbar-container",
            style: {
                display: "inline-block",
                position: "relative",
                width: "11",
                fill: "#FF9800"
            }
        },
        React.createElement("span", null, ToolbarIcons.experiment), React.createElement("div", {
            className: "unsupport-justification-text tool-bar-text",
            style: {
                position: "absolute",
                top: -54,
                margintop: 5,
                color: "orange",
                background: "white",
                border: "1px solid lightgray",
                textAlign: "center",
                fontSize: 12,
                padding: 3,
                width: 130,
                left: -60,
                boxShadow: "1px 1px 1px #e2e0e0"
            }
        },
        "Experiment Feature:may be unstable or changed in future"))), React.createElement(CheckBoxWrapper, {
            checked: !!this.state.data.isDarkMode,
            name: "",
            onValueChanged: this.onDarkModeChanged
        }));
    }
    render() {
        var e = this.getSpellCheck();
        return React.createElement("page-settings", {
            style: C
        },
        React.createElement("div", {
            style: v,
            className: "test-text-mode-font"
        },
        React.createElement("st-label", {
            style: S
        },
        "Default Font"), React.createElement(FontSelectBox, {
            fontName: this.state.data.fontName,
            onFontNameChange: this.onFontChange,
            width: 160,
            showDefault: false
        })), React.createElement("div", {
            style: v,
            className: "test-text-mode-font-size"
        },
        React.createElement("st-label", {
            style: S
        },
        "Default Font Size"), React.createElement(SelectBoxContainer, {
            data: f,
            isReadOnly: true,
            onChange: this.onFontSizeChange,
            value: this.state.data.fontSize,
            itemsStyle: A,
            selectBoxStyle: E,
            width: 160
        })), this.renderMathFont(), React.createElement("div", {
            style: v,
            className: "test-math-mode-font-size"
        },
        React.createElement("st-label", {
            style: S
        },
        "Default Math Font Size"), React.createElement(SelectBoxContainer, {
            data: f,
            isReadOnly: true,
            onChange: this.onMathFontSizeChange,
            value: this.state.data.mathFontSize,
            itemsStyle: A,
            selectBoxStyle: E,
            width: 160
        })), React.createElement("div", {
            style: v,
            className: "test-spell-check"
        },
        React.createElement("st-label", {
            style: S
        },
        "Spell check language"), React.createElement(SelectBoxContainer, {
            data: g,
            isReadOnly: true,
            onChange: this.onSpellCheckLanguageChanged,
            value: e.language || "none",
            selectBoxStyle: E,
            itemsStyle: {
                fontSize: 12
            },
            width: 160
        }), React.createElement("button", {
            style: {
                marginLeft: 5,
                width: 50
            },
            onClick: this.toggleSpellCheckMore,
            className: "btn-normal"
        },
        this.state.spellCheckShowMore ? "Less" : "More")), this.renderSpellCheckShowMore(), this.renderDarkModeSetting());
    }
}
var A = {
    height: 200,
    overflow: "auto",
    fontSize: 12
};
var E = {};
var v = {
    display: "flex",
    alignItems: "baseline",
    marginBottom: 5,
    overflow: "visible"
};
var S = {
    width: 150,
    fontSize: 12
};
var C = {
    display: "block",
    padding: 5,
    width: "100%"
};
var M = new class {
    isAnyFontChange(e, t) {
        return e.fontName != t.fontName || e.mathFontName != t.mathFontName;
    }
    detectChangeType(e, t) {
        var n = false;
        var r = false;
        if (e === t) {
            return "none";
        }
        var a = ["fontName", "fontSize", "mathFontSize", "mathFontName", "isDarkMode"];
        var i = 0;
        for (; i < a.length; i++) {
            var o = a[i];
            if (e[o] != t[o]) {
                return "all";
            }
        }
        return e.spellCheck != t.spellCheck && (r = true),
        e.imageCaptions[0] == t.imageCaptions[0] && e.tableCaptions[0] == t.tableCaptions[0] || (n = true),
        n && r ? "all" : n ? "caption-numbering" : r ? "spell-check" : "none";
    }
};
class w extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false
        };
        this.actionItems = [{
            value: "save-set-as-default",
            display: "Save and Set as default for New document"
        }];
        this.onSave = (e) => {
            var t = this.pageSettingsRef.getData();
            this.handleIfFontChange(this.props.data, t).then(() => {
                return "default" == e && this.props.onDataChanged(t, false),
                "save-set-as-default" == e && this.props.onDataChanged(t, true),
                null;
            }).
            catch((e) => {
                console.error(e);
                this.setState({
                    isError: true,
                    errorMessage: "Could not load font,please check internet connection"
                });
            }).
            finally(() => {
                if (this.state.loading) {
                    this.setState({
                        loading: false
                    });
                }
            });
        };
    }
    handleIfFontChange(e, t) {
        if (!M.isAnyFontChange(e, t)) {
            return Promise.resolve();
        }
        this.setState({
            loading: true,
            isError: false,
            loadingMessage: "Loading fonts..."
        });
        var n = Global.isTestEnv() ? 0 : 300;
        return Promise.all([Promise.delay(n), this.props.fontsLoader.loadFontsCssWith([t.fontName, t.mathFontName])]);
    }
    render() {
        return React.createElement(ModalDialog, {
            title: "Document Settings",
            show: true,
            style: {
                width: "auto",
                height: "auto",
                minHeight: 150,
                maxWidth: "95vw",
                top: 100,
                transform: "translate(-50%,0)",
                overflow: "visible"
            },
            contentStyle: {
                overflow: "visible"
            },
            footerStyle: {
                justifyContent: "center"
            },
            onClose: this.props.onClose,
            renderFooterContent: () => {
                return React.createElement("div", {
                    style: {
                        marginTop: 10,
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                    }
                },
                React.createElement("div", null, React.createElement("div", {
                    style: {
                        borderTop: "1px solid lightgray",
                        position: "absolute",
                        top: -10,
                        left: 0,
                        right: 0
                    },
                    className: classNames({
                        "thin-loader": this.state.loading,
                        show: this.state.loading
                    })
                }), React.createElement("div", {
                    style: {
                        color: "green",
                        fontSize: 12,
                        paddingBottom: 10,
                        display: this.state.loading && !this.state.isError ? "block" : "none"
                    }
                },
                this.state.loadingMessage), React.createElement("div", {
                    style: {
                        color: "#ce0303",
                        fontSize: 12,
                        paddingBottom: 10,
                        display: this.state.isError && !this.state.loading ? "block" : "none"
                    }
                },
                this.state.errorMessage), React.createElement(LabelItemContainer, {
                    onItemSelect: this.onSave,
                    buttonWithMoreOptionsStyle: true,
                    containerStyle: {
                        width: 280
                    },
                    disabled: this.state.loading,
                    labelStyle: {
                        justifyContent: "center"
                    },
                    label: "Save",
                    items: this.actionItems
                })));
            }
        },
        React.createElement(y, {
            data: this.props.data,
            ref: (e) => {
                return this.pageSettingsRef = e;
            }
        }));
    }
}
var k = [{
    id: "1",
    name: "Figure",
    numeringType: "default"
}];
var B = [{
    id: "1",
    name: "Table",
    numeringType: "default"
}];
var P = {};
var F = new class {
    getOrDefault(e) {
        return {
            fontName: (e = e || {}).fontName || "helvet",
            fontSize: e.fontSize || 15,
            mathFontSize: e.mathFontSize || 17,
            spellCheck: e.spellCheck || P,
            imageCaptions: e.imageCaptions || k,
            tableCaptions: e.tableCaptions || B,
            mathFontName: e.mathFontName || "Asana",
            isDarkMode: e.isDarkMode
        };
    }
};
class H extends BaseComponent {
    getPageSettings() {
        var e = this.getState().mainModel.pageSettings || {};
        return F.getOrDefault(e);
    }
    setPageSettings(e, t) {
        TimerHelper.waitABit(() => {
            if (t) {
                this.getTarget().raiseSavePageSettingsAsDefault(e);
            }
            var n = M.detectChangeType(this.getPageSettings(), e);
            if ("none" != n) {
                this.getState().mainModel.pageSettings = e;
                var r = this.getTarget();
                return "caption-numbering" == n ? (r.props.onModelChanged && r.props.onModelChanged(this.getState().mainModel), this.getTarget().forceImageCaptionNumbering(), void this.getTarget().forceTableCaptionNumbering()) : "all" == n ? (r.requestRecreateWholePage(), void(r.props.onModelChanged && r.props.onModelChanged(this.getState().mainModel))) : "spell-check" == n ? (r.requestSpellCheckLanguageChange(), void(r.props.onModelChanged && r.props.onModelChanged(this.getState().mainModel))) : void(r.props.onModelChanged && r.props.onModelChanged(this.getState().mainModel));
            }
        });
    }
    addIgnoreWord(e) {
        var t = this.getPageSettings();
        var n = _.assignIn({},
        t.spellCheck, {
            ignoreWords: (t.spellCheck ? void 0 === t.spellCheck.ignoreWords ? "ok\neg" : t.spellCheck.ignoreWords : "ok\neg") + "\n" + e
        });
        this.setPageSettings(_.assignIn({},
        t, {
            spellCheck: n
        }), false);
    }
    showPageSetting() {
        this.getTarget().requestRender(this);
    }
    setMainModelIfChanged(e) {
        var t = this.getState();
        if (e.pageSettings != t.mainModel.pageSettings) {
            e.pageSettings = t.mainModel.pageSettings;
        }
    }
    getAsCssStyle() {
        var e = this.getPageSettings();
        return {
            fontFamily: FontList.textFontFamilyFromKey(e.fontName),
            fontSize: e.fontSize
        };
    }
    render() {
        return React.createElement(w, {
            fontsLoader: this.getTarget().getFontsLoader(),
            data: this.getPageSettings(),
            onClose: () => {
                return this.getTarget().closeRender(this);
            },
            onDataChanged: (e, t) => {
                this.setPageSettings(e, t);
                this.getTarget().closeRender(this);
            }
        });
    }
}

export { F as PageSettingsB }

export default H