import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
// Not found 'var' for: import  from '../Elements/BlockHelper';
// Not found 'var' for: import  from '../Elements/CreateEditorObject';
// Not found 'var' for: import  from '../Elements/DiagramIdHelper';
// Not found 'var' for: import  from '../InitHelper';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BaseComponent from '../Elements/BaseComponent';
import Global from '../Global';
import HotkeyInfo from '../Mathcha/HotkeyInfo';
import HotkeyInfoHelper from './HotkeyInfoHelper';
import InputWrapper from '../Elements/InputWrapper';
import KeyCodes from '../Mathcha/KeyCodes';
import MathType from '../MathType';
import ModalDialogContainer from '../Editor/ModalDialogContainer';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShortcutMatcher from './ShortcutMatcher';
import TextUtils from '../Editor/TextUtils';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1615) /*ShortcutManagerHandler*/

/// var r = n(3)/*_.assignIn*/;  // 7 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 53 times
/// var o = n.n(i);
/// var C = n(2)/*lodash*/;  // 0 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 1 times
/// var Ae = n.n(ye);
/// var I = n(12)/*BlockHelper*/;  // 0 times
/// var T = n(7)/*PropUpdateHelper*/;  // 1 times
/// var w = n(36)/*TextUtils*/;  // 1 times
/// var O = n(13)/*CreateEditorObject*/;  // 0 times
/// var k = n(6)/*DiagramIdHelper*/;  // 0 times
/// var Y = n(32)/*InitHelper*/;  // 0 times
/// var ee = n(11)/*Global*/;  // 2 times
/// var X = n(143)/*HotkeyInfo*/;  // 1 times
/// var J = n(207)/*KeyCodes*/;  // 2 times
/// var ne = n(43)/*ArrayHelper*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var ia = n(118)/*InputWrapper*/;  // 1 times
/// var modalDialogContainer = n(105)/*ModalDialogContainer*/;  // 1 times
/// var MathType = n(91)/*MathType*/;  // 4 times
/// var ShortcutMatcher = n(1654)/*HotkeyInfoHelper*/;  // 2 times
/// var HotkeyInfoHelper = n(1655)/*HotkeyInfoHelper*/;  // 4 times
class ShortcutInfoHandler extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            shortcutInfo: this.props.shortcutInfo
        };
        this.handleReactTextChange = (e) => {
            var t = TextUtils.length(e.currentTarget.value);
            var n = {
                type: "char-sequence",
                sequence: e.currentTarget.value
            };
            this.changeShortcut(n, t <= 1 ? "At least two characters" : null);
            e.stopPropagation();
            e.preventDefault();
        };
        this.handleKeyDown = (e) => {
            var t = HotkeyInfo.detect(e);
            if (this.anyControlKeyNotShift(t)) {
                return this.handleHotkeyInput(t),
                e.stopPropagation(),
                void e.preventDefault();
            }
            if (this.state.shortcutInfo && "hot-key" == this.state.shortcutInfo.type) {
                var n = String.fromCharCode(e.keyCode);
                return 65 <= e.keyCode && e.keyCode <= 90 || (n = ""),
                t.shift || (n = n.toLowerCase()),
                this.changeShortcut({
                    type: "char-sequence",
                    sequence: n.trim()
                },
                "At least two characters"),
                e.stopPropagation(),
                void e.preventDefault();
            }
        };
    }
    getShortcutInfo() {
        return this.state.shortcutInfo;
    }
    isError() {
        return this.state.error;
    }
    render() {
        var e = _.assignIn({},
        this.props.style, {
            border: this.state.error ? "1px solid #bb0505" : "1px solid lightgray",
            color: "black"
        });
        var t = HotkeyInfoHelper.getText(this.state.shortcutInfo);
        return InputWrapper.wrapInput(React.createElement("input", {
            onChange: this.handleReactTextChange,
            style: e,
            ref: (e) => {
                return this.inputElement = e;
            },
            value: t
        }));
    }
    anyControlKeyNotShift(e) {
        return e.control || e.meta || e.optionOrAlt;
    }
    changeShortcut(e, t) {
        this.setState({
            shortcutInfo: e,
            error: t
        });
        this.props.onShortcutChange(e, t);
    }
    handleHotkeyInput(e) {
        if (e.modifierOnly) {
            this.changeShortcut(_.assignIn({},
            e, {
                type: "hot-key"
            }), "Character required");
        } else {
            var scinfo = _.assignIn({
                type: "hot-key"
            },
            e);
            var ok = "hot-key" == this.state.shortcutInfo.type && !this.state.shortcutInfo.modifierOnly && HotkeyInfoHelper.constructModifierHashForShorctut(this.state.shortcutInfo) == HotkeyInfoHelper.constructModifierHashForShorctut(scinfo);
            if (ok) {
                return void this.changeShortcut(_.assignIn({},
                this.state.shortcutInfo, {
                    secondKeyCode: e.keyCode
                }), null);
            }
            this.changeShortcut(_.assignIn({},
            e, {
                type: "hot-key"
            }), null);
        }
    }
    componentDidMount() {
        this.inputElement.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount() {
        this.inputElement.removeEventListener("keydown", this.handleKeyDown);
    }
}
class ShortcutDataWrapper {
    constructor() {
        this.textModeRootModel = {
            id: "1",
            lines: [{
                id: "1",
                blocks: []
            }],
            pageSettings: {
                fontSize: 14,
                mathFontSize: 15
            }
        };
        this.mathModeRootModel = {
            id: "1",
            lines: [{
                id: "l1",
                blocks: [{
                    id: "b1",
                    type: "composite",
                    text: "\\math-container",
                    elements: {
                        mathValue: {
                            id: "1",
                            lines: [{
                                id: "1",
                                blocks: []
                            }]
                        }
                    }
                }]
            }],
            pageSettings: {
                fontSize: 14,
                mathFontSize: 15
            }
        };
    }
    wrapTextModeModel(e) {
        this.textModeRootModel.lines[0] = e;
        return this.textModeRootModel;
    }
    wrapMathModeModel(e) {
        this.mathModeRootModel.lines[0].blocks[0].elements.mathValue.lines[0] = e;
        return this.mathModeRootModel;
    }
}
class ShortcutSelectedDataRow extends React.Component {
    constructor(e) {
        super(e);
        this.rootEditorWrapper = new ShortcutDataWrapper();
        this.matcher = new ShortcutMatcher();
        this.state = {};
        this.handleShorcutChange = (e, t) => {
            this.setState({
                errorMessage: t
            });
            if (!t) {
                this.checkDuplication(e);
            }
        };
        this.handleOk = () => {
            if (!this.isError()) {
                this.props.onChangeOk(this.getShortcutModel());
            }
        };
        this.matcher.setShortcutModels(this.props.allShortcutModels);
    }
    componentWillReceiveProps(e) {
        this.matcher.setShortcutModels(e.allShortcutModels);
    }
    getLineOrEmpty(e) {
        return e || {
            id: "l1",
            blocks: []
        };
    }
    checkDuplication(e) {
        if (this.matcher.isShorcutDuplicate(_.assignIn({},
        this.props.shortcutData, {
            shortcut: e
        }))) {
            this.setState({
                errorMessage: "Duplicate Shortcut"
            });
        }
    }
    render() {
        var e = this.props.shortcutData;
        return React.createElement("div", {
            className: "test-shortcut-input-row",
            style: {
                padding: "10px 5px 5px 10px",
                fontSize: 14,
                borderTop: "1px solid lightgray",
                borderBottom: "1px solid lightgray",
                background: "whitesmoke"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center"
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 170,
                paddingRight: 10,
                color: "black"
            }
        },
        React.createElement(ShortcutInfoHandler, {
            style: {
                height: 21,
                width: 170
            },
            onShortcutChange: this.handleShorcutChange,
            shortcutInfo: e.shortcut,
            ref: (e) => {
                return this.shortcutInput = e;
            }
        })), React.createElement("span", {
            className: "scroll-without-scrollbar",
            style: {
                display: "inline-block",
                overflowX: "auto",
                border: "1px solid lightgray",
                background: "white",
                marginLeft: 23
            }
        },
        React.createElement(MathType, {
            ref:
            (e) => {
                return this.textMathType = e;
            },
            autoCompleteUsingPositionFixed: true,
            ancestorFixedSelector: "modal-container.mt-common-dialog",
            restrictedView: true,
            model: this.rootEditorWrapper.wrapTextModeModel(this.getLineOrEmpty(e.textModeLine)),
            multiline: false,
            preventFocusOnCreated: true,
            rootSymbolSupports: ["\\inline-math", "\\$", "\\mathcha", "\\checkbox"],
            style: {
                width: 150,
                padding: "3px 2px"
            }
        })), React.createElement("span", {
            className: "scroll-without-scrollbar",
            style: {
                display: "inline-block",
                overflowX: "auto",
                border: "1px solid lightgray",
                background: "white",
                marginLeft: 25
            }
        },
        this.renderMathModeMathType()), this.renderActions()), this.renderErrorMessage());
    }
    renderMathModeMathType() {
        var e = this.props.shortcutData;
        return React.createElement(MathType, {
            ref:
            (e) => {
                return this.mathMathType = e;
            },
            autoCompleteUsingPositionFixed: true,
            ancestorFixedSelector: "modal-container.mt-common-dialog",
            restrictedView: true,
            oneMode: "math-mode",
            multiline: false,
            preventFocusOnCreated: true,
            model: this.rootEditorWrapper.wrapMathModeModel(this.getLineOrEmpty(e.mathModeLine)),
            style: {
                width: 150,
                padding: "4px 2px"
            }
        });
    }
    renderErrorMessage() {
        return this.state.errorMessage ? React.createElement("span", {
            style: {
                color: "#ce0303",
                fontSize: 12
            }
        },
        this.state.errorMessage) : React.createElement("span", {
            style: {
                color: "#ce0303",
                fontSize: 12,
                visibility: "hidden"
            }
        },
        "A");
    }
    isError() {
        return this.shortcutInput.isError() || this.state.errorMessage;
    }
    getShortcutModel() {
        var e = this.textMathType.getModel();
        var t = this.mathMathType.getModel();
        var n = e.lines[0];
        if (n && 0 === n.blocks.length) {
            n = null;
        }
        var r = t.lines[0].blocks[0].elements.mathValue.lines[0];
        return r && 0 === r.blocks.length && (r = null),
        _.assignIn({},
        this.props.shortcutData, {
            textModeLine: n,
            mathModeLine: r,
            shortcut: this.shortcutInput.getShortcutInfo()
        });
    }
    renderActions() {
        return [React.createElement("span", {
            key: "1",
            style: {
                display: "inline-block",
                padding: "2px 5px",
                cursor: "pointer",
                color: "green",
                marginLeft: 19
            },
            onClick: this.handleOk
        },
        React.createElement("i", {
            className: "fa fa-check"
        })), React.createElement("span", {
            key: "2",
            style: {
                display: "inline-block",
                padding: "2px 2px",
                cursor: "pointer",
                color: "#ce0303",
                marginLeft: 13
            },
            onClick: this.props.onCancel
        },
        React.createElement("i", {
            className: "fa fa-times"
        }))];
    }
}
var ShortcutKeyImageStyle = {
    display: "inline-block",
    border: "1px solid lightgray",
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 13,
    boxShadow: "1px 1px 1px -1px #4c4949",
    marginRight: 3
};
class ShortcutDataRow extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hover: false
        };
        this.rootEditorWrapper = new ShortcutDataWrapper();
        this.handleMouseEnter = () => {
            this.setState({
                hover: true
            });
        };
        this.handleMouseLeave = () => {
            this.setState({
                hover: false
            });
        };
    }
    renderActions() {
        return React.createElement("div", {
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
        },
        React.createElement("span", {
            key: "1",
            style: {
                display: "inline-block",
                padding: "2px 5px",
                cursor: "pointer"
            },
            onClick: this.props.onRequestEdit
        },
        React.createElement("i", {
            className: "fa fa-edit"
        })), React.createElement("span", {
            key: "2",
            style: {
                display: "inline-block",
                padding: "2px 2px",
                cursor: "pointer",
                color: "#ce0303",
                marginLeft: 13
            },
            onClick: this.props.onRequestDelete
        },
        React.createElement("i", {
            className: "fa fa-trash"
        })));
    }
    getLineOrEmpty(e) {
        return e || {
            id: "l1",
            blocks: []
        };
    }
    renderTextModeMathType() {
        var e = this.props.shortcutData;
        return e.textModeLine && 0 != e.textModeLine.blocks.length ? React.createElement(MathType, {
            restrictedView:
            true,
            readOnly: true,
            model: this.rootEditorWrapper.wrapTextModeModel(this.getLineOrEmpty(e.textModeLine)),
            multiline: false,
            preventFocusOnCreated: true,
            style: {
                width: 150,
                padding: "0px 2px",
                border: "1px none lightgray",
                cursor: "default",
                overflow: "hidden"
            }
        }) : React.createElement("span", {
            style: {
                color: "lightgray"
            }
        },
        "None");
    }
    renderMathModeMathType() {
        var e = this.props.shortcutData;
        return e.mathModeLine && 0 != e.mathModeLine.blocks.length ? React.createElement(MathType, {
            readOnly:
            true,
            restrictedView: true,
            oneMode: "math-mode",
            multiline: false,
            preventFocusOnCreated: true,
            model: this.rootEditorWrapper.wrapMathModeModel(this.getLineOrEmpty(e.mathModeLine)),
            style: {
                width: 150,
                padding: "0px 2px",
                border: "1px none lightgray",
                cursor: "default",
                overflow: "hidden"
            }
        }) : React.createElement("span", {
            style: {
                color: "lightgray"
            }
        },
        "None");
    }
    toHtml(e) {
        if ("char-sequence" == e.type) {
            return HotkeyInfoHelper.getText(e);
        }
        var t = [];
        var n = KeyCodes[e.keyCode] || "none";
        if (e.meta) {
            if (Global.isMac()) {
                t.push(React.createElement("span", {
                    style: ShortcutKeyImageStyle,
                    key: "Meta"
                },
                "Cmd"));
            } else {
                t.push(React.createElement("span", {
                    style: ShortcutKeyImageStyle,
                    key: "Meta"
                },
                "Win"));
            }
        }
        if (e.control) {
            t.push(React.createElement("span", {
                style: ShortcutKeyImageStyle,
                key: "Ctrl"
            },
            "Ctrl"));
        }
        if (e.optionOrAlt) {
            t.push(React.createElement("span", {
                style: ShortcutKeyImageStyle,
                key: "Alt"
            },
            "Alt"));
        }
        if (e.shift) {
            t.push(React.createElement("span", {
                style: ShortcutKeyImageStyle,
                key: "Shift"
            },
            "Shift"));
        }
        if (!e.modifierOnly) {
            t.push(React.createElement("span", {
                style: ShortcutKeyImageStyle,
                key: "KeyCode"
            },
            n.toUpperCase()));
        }
        if (e.secondKeyCode) {
            var r = KeyCodes[e.secondKeyCode] || "none";
            t.push(React.createElement("span", {
                style: ShortcutKeyImageStyle,
                key: "SecondKeyCode"
            },
            r.toUpperCase()));
        }
        return t;
    }
    render() {
        var e = this.props.shortcutData;
        return React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "baseline",
                padding: "5px 5px 5px 10px",
                fontSize: 14,
                background: this.state.hover ? "#f1f1f1" : void 0
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 190,
                paddingLeft: 5,
                paddingRight: 5,
                color: "black"
            }
        },
        React.createElement("span", null, this.toHtml(e.shortcut))), React.createElement("span", {
            style: {
                display: "inline-block",
                width: 170,
                paddingLeft: 5,
                paddingRight: 5
            }
        },
        this.renderTextModeMathType()), React.createElement("span", {
            style: {
                display: "inline-block",
                width: 170,
                paddingLeft: 5,
                paddingRight: 5
            }
        },
        this.renderMathModeMathType()), this.renderActions());
    }
}
class ShortcutManager extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            shortcuts: this.props.shortcuts
        };
        this.start = (new Date).getTime();
        this.handleChangeOk = (e, t) => {
            this.setState({
                shortcuts: PropUpdateHelper.replaceArrayByEntity(this.state.shortcuts, e),
                selectedEditId: null
            },
            t);
        };
        this.handleAddNewShortcut = () => {
            var e = "s" + Math.random();
            this.setState({
                selectedEditId: e,
                shortcuts: [{
                    id: e,
                    shortcut: {
                        type: "char-sequence",
                        sequence: this.getRandomSequence()
                    },
                    textModeLine: {
                        id: "l1",
                        blocks: [{
                            id: "b1",
                            text: "\u2195"
                        }]
                    },
                    mathModeLine: {
                        id: "l1",
                        blocks: [{
                            id: "b1",
                            text: "\u2195"
                        }]
                    }
                }].concat(this.state.shortcuts)
            });
            TimerHelper.waitABit(() => {
                if (this.rowContainerRef) {
                    jQuery(this.rowContainerRef).scrollTop(0);
                }
            });
        };
        this.handleOk = () => {
            if (this.currentEditingRowRef) {
                if (this.currentEditingRowRef.isError()) {
                    return;
                }
                this.handleChangeOk(this.currentEditingRowRef.getShortcutModel(), () => {
                    this.props.onSave(this.state.shortcuts);
                });
            } else {
                this.props.onSave(this.state.shortcuts);
            }
        };
    }
    componentWillMount() {
        this.start = (new Date).getTime();
    }
    componentDidMount() {
        console.log("take:", (new Date).getTime() - this.start);
    }
    handleRequestEdit(e) {
        this.setState({
            selectedEditId: e.id
        });
    }
    handleRequestDelete(e) {
        var t = this.state.shortcuts.filter((t) => {
            return t.id != e.id;
        });
        this.setState({
            shortcuts: t
        });
    }
    handleCancel() {
        this.setState({
            selectedEditId: null
        });
    }
    getRandomSequence() {
        return Global.isTestEnv() ? "sc 123" : "sc " + Math.floor(1e3 * Math.random());
    }
    renderRow(e) {
        return this.state.selectedEditId === e.id ? React.createElement(ShortcutSelectedDataRow, {
            allShortcutModels: this.state.shortcuts,
            key: e.id,
            ref: (e) => {
                return this.currentEditingRowRef = e;
            },
            onChangeOk: this.handleChangeOk,
            onCancel: () => {
                return this.handleCancel();
            },
            shortcutData: e
        }) : React.createElement(ShortcutDataRow, {
            key: e.id,
            onRequestEdit: () => {
                return this.handleRequestEdit(e);
            },
            onRequestDelete: () => {
                return this.handleRequestDelete(e);
            },
            shortcutData: e
        });
    }
    renderHeader() {
        return React.createElement("div", {
            style: {
                padding: "10px 5px",
                fontSize: 14,
                fontWeight: "bold"
            }
        },
        React.createElement("span", {
            style: {
                display: "inline-block",
                width: 190,
                paddingLeft: 5,
                paddingRight: 5
            }
        },
        "Shortcut"), React.createElement("span", {
            style: {
                display: "inline-block",
                width: 170,
                paddingLeft: 5,
                paddingRight: 5
            }
        },
        "Text Mode"), React.createElement("span", {
            style: {
                display: "inline-block",
                width: 170,
                paddingLeft: 5,
                paddingRight: 5
            }
        },
        "Math Mode"), React.createElement("button", {
            onClick: this.handleAddNewShortcut,
            className: "btn-normal btn-large",
            style: {
                padding: "0px 13px",
                display: "inline-block"
            }
        },
        "Add ", React.createElement("i", {
            className: "fa fa-plus",
            style: {
                color: "green"
            }
        })));
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            style: {
                width: 650,
                maxWidth: "95vw"
            },
            centerButtons: true,
            noLabel: "Cancel",
            okLabel: "Save",
            message: "",
            isProgressing: false,
            onOk: this.handleOk,
            onCancel: this.props.onClose,
            onNo: this.props.onClose,
            isOkDisabled: false,
            show: true,
            btnLarge: true,
            disableEscapeToClose: true
        },
        React.createElement("div", {
            style: {
                flex: 1,
                maxHeight: "80vh",
                minHeight: 250,
                display: "flex",
                flexDirection: "column"
            }
        },
        this.renderHeader(), React.createElement("div", {
            style: {
                borderTop: "1px solid lightgray",
                marginBottom: 5
            }
        }), React.createElement("div", {
            style: {
                overflow: "auto"
            },
            ref: (e) => {
                return this.rowContainerRef = e;
            }
        },
        this.state.shortcuts.map((e) => {
            return this.renderRow(e);
        }))));
    }
}
class ShortcutManagerHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.shortcutMatcher = new ShortcutMatcher();
        this.handleSaveShortcuts = (e) => {
            this.getTarget().raiseShortcutSettingsChange(e);
            this.handleClose();
        };
        this.handleClose = () => {
            this.getTarget().closeRender(this);
        };
    }
    render() {
        return React.createElement(ShortcutManager, {
            onSave: this.handleSaveShortcuts,
            shortcuts: this.getShortcuts(),
            onClose: this.handleClose
        });
    }
    getShortcuts(e) {
        return (e = e || this.getTarget().getMathTypeSettings()).complexObject && e.complexObject.inputShortcuts ? e.complexObject.inputShortcuts : ArrayHelper.emptyArr;
    }
    updateSingleShortcutService(e) {
        this.shortcutMatcher.setShortcutModels(this.getShortcuts(e));
    }
    getShortcutMatcher() {
        return this.shortcutMatcher;
    }
    showShortcutManager() {
        this.getTarget().requestRender(this);
    }
}
/*n.d(t, "a", function () {
    return ShortcutManagerHandler;
})*/

export default ShortcutManagerHandler