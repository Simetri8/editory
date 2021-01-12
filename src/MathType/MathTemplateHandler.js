import _ from 'lodash';
import React from 'react';
import BaseComponent from '../Elements/BaseComponent';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import MathType from '../MathType';
import ModalDialogContainer from '../Editor/ModalDialogContainer';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1610) /*MathTemplateHandler*/

/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 27 times
/// var o = n.n(i);
/// var C = n(2)/*lodash*/;  // 1 times
/// var x = n.n(C);
/// var T = n(7)/*PropUpdateHelper*/;  // 3 times
/// var O = n(13)/*CreateEditorObject*/;  // 5 times
/// var k = n(6)/*DiagramIdHelper*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 3 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var MathType = n(91)/*MathType*/;  // 1 times
/// var modalDialogContainer = n(105)/*ModalDialogContainer*/;  // 1 times
var ni = {
    flex: 1,
    alignItems: "stretch",
    display: "flex",
    marginLeft: 5,
    position: "relative",
    flexDirection: "column"
};
var ai = {
    display: "flex",
    padding: "0 0 5px 0px",
    minHeight: 25
};
var ii = {
    position: "static",
    paddingLeft: 0,
    top: 0,
    width: "100%",
    minWidth: "none",
    boxShadow: "none",
    border: "none",
    borderBottom: "1px solid lightgray"
};
var oi = {
    flexGrow: 1,
    padding: 5,
    marginTop: 0,
    paddingTop: 20,
    minHeight: 200
};
var si = _.assignIn({},
oi, {
    visibility: "hidden"
});
var di = {
    border: "1px solid lightgray",
    flexGrow: 1,
    overflowY: "auto"
};
class MathTemplateNameItems extends React.Component {
    shouldComponentUpdate(e) {
        var t = this.props;
        var n = t.names;
        var r = e.names;
        if ( !! n != !!r) {
            return true;
        }
        if (t.selectedNameId != e.selectedNameId) {
            return true;
        }
        if (n.length != r.length) {
            return true;
        }
        var a = 0;
        for (; a < n.length; a++) {
            if (n[a] != r[a]) {
                return true;
            }
        }
        return false;
    }
    renderItem(e) {
        var t = {
            padding: "5px 10px"
        };
        if (e.id === this.props.selectedNameId) {
            t = _.assignIn({},
            t, {
                backgroundColor: "#e1e8f5"
            })
        }
        return React.createElement("div", {
            className: "math-template-name-item",
            key: e.id,
            onClick: () => {
                return this.props.selectedNameIdChanged(e.id);
            },
            style: t
        },
        e.name || "Missing");
    }
    static firstName(e) {
        return e.length < 0 ? null : MathTemplateNameItems.orderNames(e)[0];
    }
    static orderNames(e) {
        return _.orderBy(e, [(e) => {
            return e.name;
        }], ["asc"]);
    }
    renderItems(e) {
        return MathTemplateNameItems.orderNames(e).map((e) => {
            return this.renderItem(e);
        });
    }
    render() {
        return React.createElement("div", {
            style: di
        },
        this.renderItems(this.props.names));
    }
}
var fi = {
    height: 35,
    background: "#f7f7f7",
    borderBottom: "1px lightgray solid"
};
class MathTemplateFakeToolbar extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            element: React.createElement("div", {
                style: fi
            })
        };
    }
    shouldComponentUpdate(t) {
        return this.state != t;
    }
    updateElement(e) {
        this.setState({
            element: e
        });
    }
    render() {
        return this.props.hide ? React.createElement("div", {
            style: fi
        }) : this.state.element;
    }
}
class MathTemplateDialog extends React.Component {
    constructor(e) {
        var t;
        super(e);
        t = this;
        this.changedWrap = function (e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return function () {
                TimerHelper.next(() => {
                    if (t.state.lastTemplates && !n.noDismissUndo) {
                        t.setState({
                            lastTemplates: null,
                            lastSelectedTemplateId: null
                        });
                    }
                    if (!t.state.isDirty) {
                        t.setState({
                            isDirty: true
                        });
                    }
                    if (t.state.successMessage) {
                        t.setState({
                            successMessage: ""
                        });
                    }
                });
                var r = arguments.length;
                var a = new Array(r);
                var i = 0;
                for (; i < r; i++) {
                    a[i] = arguments[i];
                }
                return e.apply(t, a);
            };
        };
        this.handleSelectedTemplateChanged = (e) => {
            this.setState({
                selectedTemplateId: e
            });
            var t = this.state.templates.find((t) => {
                return t.id === e;
            });
            var n = t ? t.lines : [CreateEditorObject.createEmptyLine()];
            if (this.mathTypeRef) {
                this.mathTypeRef.setModel(this.wrapToMainModel(n), null);
            }
        };
        this.handleNameChanged = (e) => {
            var t = this.findSelectedTemplate();
            if (t) {
                var n = _.assignIn({},
                t, {
                    name: e.currentTarget.value
                });
                var r = PropUpdateHelper.replaceArrayByEntity(this.state.templates, n);
                this.setState({
                    templates: r
                });
            }
        };
        this.handleAddItem = () => {
            var e = "tl" + Math.random();
            this.setState({
                templates: this.state.templates.concat({
                    id: e,
                    name: "New Item",
                    lines: [CreateEditorObject.createEmptyLine()]
                })
            });
            this.handleSelectedTemplateChanged(e);
        };
        this.handleRemoveItem = () => {
            if (this.state.selectedTemplateId) {
                var e = PropUpdateHelper.removeEntity(this.state.templates, this.state.selectedTemplateId);
                this.setState({
                    templates: e,
                    selectedTemplateId: this.state.lastSelectedTemplateId,
                    lastTemplates: this.state.templates,
                    lastSelectedTemplateId: this.state.selectedTemplateId
                });
                this.handleSelectedTemplateChanged(e[0] ? e[0].id : null);
            }
        };
        this.handleMathTypeModelChanged = (e) => {
            var t = this.findSelectedTemplate();
            if (t) {
                var n = _.assignIn({},
                t, {
                    lines: e.lines[0].blocks[0].elements.mathValue.lines
                });
                this.setState({
                    templates: PropUpdateHelper.replaceArrayByEntity(this.state.templates, n)
                });
            }
        };
        this.handleUndoDelete = () => {
            if (this.setState({
                templates: this.state.lastTemplates,
                lastTemplates: null,
                lastSelectedTemplateId: null
            }), this.state.lastSelectedTemplateId) {
                var e = this.state.lastSelectedTemplateId;
                TimerHelper.waitABit(() => {
                    this.handleSelectedTemplateChanged(e);
                });
            }
        };
        this.handleSave = () => {
            this.setState({
                isSaving: true,
                errorMessage: null,
                successMessage: null
            });
            this.props.onSaveTemplates(this.state.templates).then(() => {
                this.setState({
                    isDirty: false,
                    errorMessage: null,
                    successMessage: "Saved."
                });
            }).
            catch((e) => {
                this.setState({
                    errorMessage: e.message,
                    successMessage: null
                });
            }).
            finally(() => {
                this.setState({
                    isSaving: false
                });
            });
        };
        this.handleMathTypeRef = (e) => {
            this.mathTypeRef = e;
        };
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
        this.state = {
            templates: this.props.templates
        };
        this.handleNameChanged = this.changedWrap(this.handleNameChanged);
        this.handleMathTypeModelChanged = this.changedWrap(this.handleMathTypeModelChanged);
        this.handleAddItem = this.changedWrap(this.handleAddItem);
        this.handleRemoveItem = this.changedWrap(this.handleRemoveItem, {
            noDismissUndo: true
        });
        this.handleUndoDelete = this.changedWrap(this.handleUndoDelete);
    }
    componentDidMount() {
        var e = MathTemplateNameItems.firstName(this.props.templates || []);
        if (e) {
            this.handleSelectedTemplateChanged(e.id);
        }
    }
    wrapToMainModel(e) {
        var t = CreateEditorObject.createComposite("\\inline-math");
        t.elements.mathValue = CreateEditorObject.createEmptyEditor();
        var n = CreateEditorObject.createEmptyEditor();
        return n.lines[0].blocks.push(t),
        t.elements.mathValue.lines = DiagramIdHelper.assignIds(e),
        n;
    }
    getSelectedTemplate() {
        var e = this.state.templates.find((e) => {
            return e.id === this.state.selectedTemplateId;
        });
        return e || {
            id: "empty",
            name: "",
            lines: []
        };
    }
    findSelectedTemplate() {
        return this.state.templates.find((e) => {
            return e.id === this.state.selectedTemplateId;
        });
    }
    renderUndoDeleteButton() {
        if (this.state.lastTemplates) {
            return React.createElement("button", {
                className: "btn-normal math-template-btb",
                style: {
                    marginLeft: 10
                },
                onClick: this.handleUndoDelete
            },
            React.createElement("span", {
                style: {
                    color: "rgb(76,175,80)"
                }
            },
            "Undo Delete"));
        }
    }
    noSelect() {
        return !this.state.selectedTemplateId;
    }
    render() {
        var e = this.getSelectedTemplate();
        return React.createElement(ModalDialogContainer, {
            disableEscapeToClose: true,
            message: this.state.errorMessage || this.state.successMessage,
            isMessageOk: !this.state.errorMessage,
            isProgressing: this.state.isSaving,
            isOkDisabled: !this.state.isDirty,
            backDrop: false,
            okLabel: "Save",
            onOk: this.handleSave,
            onCancel: this.props.onClose,
            show: true
        },
        React.createElement("div", {
            style: {
                height: 300,
                display: "flex",
                flexDirection: "row",
                alignContent: "stretch",
                flexGrow: 1,
                marginBottom: 3,
                fontSize: 12
            }
        },
        React.createElement("div", {
            style: {
                width: 200,
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                minHeight: 25,
                border: "1px solid lightgray",
                borderBottom: "none",
                background: "#f7f7f7",
                alignItems: "center",
                padding: "2px 4px"
            }
        },
        React.createElement("button", {
            className: "btn-normal math-template-btb",
            onClick: this.handleAddItem
        },
        React.createElement("i", {
            className: "fa fa-plus",
            "aria-hidden": "true",
            style: {
                fontSize: "1.1em",
                color: "rgb(76,175,80)",
                paddingRight: 5
            }
        }), React.createElement("span", null, "Add")), React.createElement("button", {
            className: "btn-normal math-template-btb",
            onClick: this.handleRemoveItem,
            style: {
                marginLeft: 10
            }
        },
        React.createElement("i", {
            className: "fa fa-trash",
            "aria-hidden": "true",
            style: {
                fontSize: "1.1em",
                color: "#ce0303"
            }
        })), this.renderUndoDeleteButton()), React.createElement(MathTemplateNameItems, {
            selectedNameId: this.state.selectedTemplateId,
            names: this.state.templates,
            selectedNameIdChanged: this.handleSelectedTemplateChanged
        })), React.createElement("div", {
            style: ni
        },
        React.createElement("div", {
            style: ai
        },
        React.createElement("input", {
            disabled: !this.state.selectedTemplateId,
            style: {
                flexGrow: 1,
                paddingLeft: 5,
                color: "gray"
            },
            onChange: this.handleNameChanged,
            type: "text",
            value: e.name
        })), React.createElement("div", {
            style: {
                border: "1px solid lightgray",
                display: "flex",
                flexGrow: 1,
                flexDirection: "column"
            }
        },
        React.createElement(MathTemplateFakeToolbar, {
            ref: this.handleFakeToolbarRef,
            hide: this.noSelect()
        }), React.createElement("div", {
            style: {
                overflow: "auto",
                flex: 1,
                marginTop: 0
            }
        },
        React.createElement(MathType, {
            requestRenderToolbar:
            this.handleRequestRenderToolbar,
            ancestorFixedSelector: "modal-container.mt-common-dialog",
            autoCompleteUsingPositionFixed: true,
            onModelChanged: this.handleMathTypeModelChanged,
            ref: this.handleMathTypeRef,
            toolbarEnabled: true,
            restrictedView: true,
            toolbarMathOptionOnly: true,
            toolbarExportOptionsHide: true,
            toolbarStyle: ii,
            style: this.noSelect() ? si : oi,
            oneMode: "math-mode",
            mathTemplatesDisable: false
        }))))));
    }
}
class MathTemplateHandler extends BaseComponent {
    render() {
        return React.createElement(MathTemplateDialog, {
            templates: this.getTarget().getMathTemplates(),
            onSaveTemplates: this.getTarget().setMathTemplates,
            onClose: () => {
                return this.getTarget().closeRender(this);
            }
        });
    }
    getKey() {
        return "MathTemplateHandler";
    }
    showMathTemplate() {
        if (!this.getTarget().props.mathTemplatesDisable) {
            this.getTarget().requestRender(this);
        }
    }
}
/*n.d(t, "a", function () {
    return MathTemplateHandler;
})*/

export default MathTemplateHandler