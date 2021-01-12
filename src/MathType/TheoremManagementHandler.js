import _ from 'lodash';
import React from 'react';
import BaseComponent from '../Elements/BaseComponent';
import CheckBoxWrapper from '../Mathcha/CheckBoxWrapper';
import InputWrapper from '../Elements/InputWrapper';
import ModalDialog from '../Editor/ModalDialog';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import SelectBoxContainer from '../Editor/SelectBoxContainer';
import TheoremHelper from '../Mathcha/TheoremHelper';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1600) /*TheoremManagementHandler*/

/// var i = n(0)/*React*/;  // 29 times
/// var o = n.n(i);
/// var C = n(2)/*lodash*/;  // 3 times
/// var x = n.n(C);
/// var T = n(7)/*PropUpdateHelper*/;  // 18 times
/// var je = n(122)/*TheoremHelper*/;  // 3 times
/// var St = n(124)/*ModalDialog*/;  // 1 times
/// var Lt = n(19)/*TimerHelper*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var bn = n(51)/*SelectBoxContainer*/;  // 4 times
/// var ia = n(118)/*InputWrapper*/;  // 2 times
/// var oa = n(101)/*CheckBoxWrapper*/;  // 2 times
var la = [{
    key: "default",
    value: "Default"
},
{
    key: "share",
    value: "Share With"
},
{
    key: "section",
    value: "Section"
},
{
    key: "with",
    value: "Nested With "
}];
var ca = [{
    key: "section",
    value: "First Level"
},
{
    key: "subsection",
    value: "Second Level"
},
{
    key: "subsubsection",
    value: "Third Level"
}];
class sa extends React.Component {
    constructor(e) {
        super(e);
        this.onNumeringTypeChanged = (e, t) => {
            var n = this.state.theorems.findIndex((e) => {
                return e === t;
            });
            var r = PropUpdateHelper.setProp(t, "numeringType", e);
            if ("share" == e) {
                var a = this.getSharableKeys(t);
                var i = t.shareWith || (a[0] || {
                    key: ""
                }).key;
                r = PropUpdateHelper.setProp(r, "shareWith", i);
                r = PropUpdateHelper.setProp(r, "section", void 0);
                r = PropUpdateHelper.setProp(r, "nestedWith", void 0);
            } else {
                if ("section" == e) {
                    r = PropUpdateHelper.setProp(r, "section", "section");
                    r = PropUpdateHelper.setProp(r, "shareWith", void 0);
                    r = PropUpdateHelper.setProp(r, "nestedWith", void 0);
                } else {
                    if ("with" == e) {
                        var o = this.getSharableKeys(t);
                        var s = t.nestedWith || (o[0] || {
                            key: ""
                        }).key;
                        r = PropUpdateHelper.setProp(r, "nestedWith", s);
                        r = PropUpdateHelper.setProp(r, "shareWith", void 0);
                        r = PropUpdateHelper.setProp(r, "section", void 0);
                    }
                }
            }
            this.setState({
                theorems: PropUpdateHelper.setIndex(this.state.theorems, n, r)
            });
        };
        this.onShareNumeringChanged = (e, t) => {
            this.changeStateForTheorem(t, "shareWith", e);
        };
        this.onWithNestedNumeringChanged = (e, t) => {
            this.changeStateForTheorem(t, "nestedWith", e);
        };
        this.onNumeringSectionChanged = (e, t) => {
            this.changeStateForTheorem(t, "section", e);
        };
        this.onAdd = () => {
            var e = this.state.theorems.concat([{
                key: Math.random().toString(),
                env: "new theorem",
                name: "New Theorem"
            }]);
            this.setState({
                theorems: e
            });
        };
        this.state = {
            theorems: TheoremHelper.getTheorems(this.props.theoremInfo)
        };
    }
    getAllUsages() {
        return this.props.theoremUsages || {};
    }
    getUsageOf(e) {
        return this.getAllUsages()[e.key] || 0;
    }
    onTheoremNameChanged(e, t) {
        this.changeStateForTheorem(t, "name", e);
    }
    onTheoremEnvChanged(e, t) {
        this.changeStateForTheorem(t, "env", e);
    }
    changeStateForTheorem(e, t, n) {
        var r = this.state.theorems.findIndex((t) => {
            return t === e;
        });
        var a = PropUpdateHelper.setProp(e, t, n);
        this.setState({
            theorems: PropUpdateHelper.setIndex(this.state.theorems, r, a)
        });
    }
    getTheorems() {
        return this.state.theorems;
    }
    onCheckboxNumeringChanged(e, t) {
        var n = this.state.theorems.findIndex((e) => {
            return e === t;
        });
        var r = PropUpdateHelper.setProp(t, "ignoreNumbering", e);
        if (e) {
            r = PropUpdateHelper.update(r, {
                section: void 0,
                shareWith: void 0
            });
        }
        this.setState({
            theorems: PropUpdateHelper.setIndex(this.state.theorems, n, r)
        });
    }
    getSharableKeys(e) {
        return this.state.theorems.filter((t) => {
            return t != e && !t.ignoreNumbering;
        }).map((e) => {
            return {
                key: e.key,
                value: e.name
            };
        });
    }
    renderOptions(e) {
        if (e.ignoreNumbering) {
            return React.createElement("span", null, React.createElement(CheckBoxWrapper, {
                name: "Numbering",
                checked: false,
                onValueChanged: () => {
                    return this.onCheckboxNumeringChanged(false, e);
                }
            }));
        }
        var t;
        if ("section" == e.numeringType) {
            t = React.createElement(SelectBoxContainer, {
                style: {
                    display: "inline-block",
                    paddingLeft: 5
                },
                width: 90,
                value: e.section,
                onChange: (t) => {
                    return this.onNumeringSectionChanged(t, e);
                },
                data: ca
            });
        } else {
            if ("share" == e.numeringType) {
                var n = this.getSharableKeys(e);
                t = React.createElement(SelectBoxContainer, {
                    style: {
                        display: "inline-block",
                        paddingLeft: 5
                    },
                    width: 120,
                    value: e.shareWith,
                    onChange: (t) => {
                        return this.onShareNumeringChanged(t, e);
                    },
                    data: n
                });
            } else {
                if ("with" == e.numeringType) {
                    n = this.getSharableKeys(e);
                    t = React.createElement(SelectBoxContainer, {
                        style: {
                            display: "inline-block",
                            paddingLeft: 5
                        },
                        width: 120,
                        value: e.nestedWith,
                        onChange: (t) => {
                            return this.onWithNestedNumeringChanged(t, e);
                        },
                        data: n
                    });
                }
            }
        }
        return React.createElement("span", null, React.createElement(CheckBoxWrapper, {
            checked: true,
            onValueChanged: () => {
                return this.onCheckboxNumeringChanged(true, e);
            },
            name: "Numbering on",
            style: {
                display: "inline-block"
            }
        }), React.createElement(SelectBoxContainer, {
            style: {
                display: "inline-block",
                paddingLeft: 5
            },
            width: 90,
            value: e.numeringType || "default",
            onChange: (t) => {
                return this.onNumeringTypeChanged(t, e);
            },
            data: la
        }), t);
    }
    removeTheorem(e) {
        var t = this.state.theorems.findIndex((t) => {
            return t === e;
        });
        var n = PropUpdateHelper.splice(this.state.theorems, t, 1);
        this.setState({
            theorems: n
        });
    }
    validate(e) {
        var t = _.uniqBy(e, (e) => {
            return e.name;
        }).length < e.length;
        return t ? {
            isError: true,
            messages: "Duplication of theorem name is not allowed"
        } : (t = _.uniqBy(e, (e) => {
            return e.env;
        }).length < e.length) ? {
            isError: true,
            messages: "Duplication of theorem Latex environment is not allowed"
        } : _.some(e, (e) => {
            return !e.name || !e.env;
        }) ? {
            isError: true,
            messages: "Name and Latex Environemnt must have value"
        } : {
            isError: false
        };
    }
    renderUseOrDelete(e) {
        var t = this.getUsageOf(e);
        return t ? React.createElement("span", {
            style: {
                paddingRight: 10
            }
        },
        "(", t, " used)") : React.createElement("span", {
            style: {
                paddingRight: 10,
                fontSize: 14
            }
        },
        React.createElement("i", {
            onMouseDown: () => {
                return this.removeTheorem(e);
            },
            className: "fa fa-trash deletable",
            style: {
                padding: "1px 4px"
            }
        }));
    }
    renderTheorems(e) {
        return e.map((e) => {
            return React.createElement("theorem-input", {
                style: {
                    fontSize: 12,
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "row",
                    padding: 4
                },
                key: e.key
            },
            InputWrapper.wrapInput(React.createElement("input", {
                value: e.env,
                onChange: (t) => {
                    return this.onTheoremEnvChanged(t.target.value, e);
                }
            }), {
                width: 80,
                marginRight: 5
            }), InputWrapper.wrapInput(React.createElement("input", {
                value: e.name,
                onChange: (t) => {
                    return this.onTheoremNameChanged(t.target.value, e);
                }
            })), React.createElement("theorem-input-options", {
                style: {
                    flexGrow: 1,
                    paddingLeft: 5
                }
            },
            this.renderOptions(e)), this.renderUseOrDelete(e));
        });
    }
    isValid() {
        return !this.validate(this.state.theorems).isError;
    }
    renderValidationError() {
        var e = this.validate(this.state.theorems);
        if (e.isError) {
            return React.createElement("validation-error-message", {
                style: {
                    color: "#ce0303",
                    textAlign: "center",
                    width: "100%",
                    fontSize: 12
                }
            },
            e.messages);
        }
    }
    render() {
        return React.createElement("theorem-management", {
            style: {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                minWidth: 630
            }
        },
        React.createElement("theorem-header", {
            style: {
                fontSize: 12,
                paddingBottom: 5
            }
        },
        React.createElement("span", {
            style: {
                width: 91,
                display: "inline-block",
                marginLeft: 5
            }
        },
        "Latex Env"), React.createElement("span", null, "Name")), React.createElement("theorem-content", {
            style: {
                flexGrow: 1,
                overflow: "auto"
            }
        },
        this.renderTheorems(this.state.theorems), React.createElement("span", {
            style: {
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: 10,
                paddingRight: 10
            }
        },
        React.createElement("button", {
            onMouseDown: this.onAdd,
            className: "btn-normal",
            style: {
                width: 60
            }
        },
        "Add"))), this.renderValidationError());
    }
}
class da extends React.Component {
    onSave() {
        if (this.theormManagement.isValid()) {
            this.props.onSave(this.theormManagement.getTheorems());
        }
    }
    render() {
        return React.createElement(ModalDialog, {
            title: "Theorem Options",
            show: true,
            style: {
                width: 630,
                height: 400,
                maxWidth: "95vw",
                top: "50%",
                transform: "translate(-50%,-50%)",
                overflowY: "auto",
                overflowX: "hidden"
            },
            contentStyle: {
                overflow: "auto"
            },
            footerStyle: {
                justifyContent: "center"
            },
            onClose: this.props.onClose,
            renderFooterContent: () => {
                return React.createElement("button", {
                    style: {
                        width: 60
                    },
                    onMouseDown: () => {
                        return this.onSave();
                    },
                    className: "ok btn-normal"
                },
                " Save ");
            }
        },
        React.createElement(sa, {
            theoremUsages: this.props.theoremUsages,
            theoremInfo: this.props.theoremInfo,
            ref: (e) => {
                return this.theormManagement = e;
            }
        }));
    }
}
class TheoremManagementHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.needTheoremNumbering = true;
        this.notifyTheoremNumbering = () => {
            console.log("notify theorem numbering !!!!!!!!!!!!!");
            this.needTheoremNumbering = true;
        };
    }
    render() {
        var e = this.getState();
        var t = this.getTarget();
        var n = TheoremHelper.getTheoremUsages(t.getEditorHtmlElement());
        return React.createElement(da, {
            theoremInfo: e.mainModel.theoremInfo,
            theoremUsages: n,
            onSave: (e) => {
                this.setTheoremInfo({
                    theorems: e
                });
                TimerHelper.next(() => {
                    this.getTarget().closeRender(this);
                });
            },
            onClose: () => {
                return this.getTarget().closeRender(this);
            }
        });
    }
    setTheoremInfo(e) {
        var t = this.getState();
        var n = this.getTarget();
        var r = PropUpdateHelper.setProp(t.mainModel, "theoremInfo", e);
        this.needTheoremNumbering = true;
        n.setMainModel(r);
    }
    processTheoremNumbering() {
        if (this.needTheoremNumbering) {
            console.log("processing theorem!!!!");
            this.needTheoremNumbering = false;
            TheoremHelper.buildTheoremNumber(this.getTarget().getEditorHtmlElement(), this.getState().mainModel.theoremInfo);
        }
    }
    showTheoremManagement() {
        this.getTarget().requestRender(this);
    }
}
/*n.d(t, "a", function () {
    return TheoremManagementHandler;
})*/

export default TheoremManagementHandler