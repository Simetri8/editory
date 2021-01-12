import _ from 'lodash';
import React from 'react';
import ModalDialogContainer from './ModalDialogContainer';
import ModalDialogHelper from './ModalDialogHelper';

/// xxx(339) /*AccessibilityDialog*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 11 times
/// var o = n.n(i);
/// var s = n(88)/*ModalDialogHelper*/;  // 1 times
/// var l = n(105)/*ModalDialogContainer*/;  // 1 times
var c = ModalDialogHelper.getModalDialog();
class d extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            info: this.props.info || {}
        }
    }
    render() {
        return React.createElement(c, {
            show: !0
        },
        React.createElement(ModalDialogContainer, {
            style: {
                width: "auto",
                top: 140
            },
            message: "",
            isProgressing: !1,
            isOkDisabled: !1,
            onOk: () => this.props.onOk(this.state.info),
            onCancel: this.props.onClose,
            okLabel: "Ok",
            centerButtons: !0,
            cancelStyle: {
                width: 100,
                height: 24
            },
            okStyle: {
                width: 100,
                height: 24
            },
            show: !0
        },
        React.createElement("div", {
            style: {
                flex: 1
            }
        },
        React.createElement("form", {
            style: {
                fontSize: 13,
                padding: 5
            }
        },
        React.createElement("p", {
            style: {
                display: this.props.hideTitle ? "none" : void 0
            }
        },
        React.createElement("label", {
            style: {
                display: "inline-block",
                width: 80
            }
        },
        "Title"), React.createElement("input", {
            style: {
                width: 300,
                fontSize: 13
            },
            value: this.state.info.title,
            onChange: e => this.setState({
                info: _.assignIn({},
                this.state.info, {
                    title: e.currentTarget.value
                })
            })
        })), React.createElement("p", null, React.createElement("label", {
            style: {
                display: "inline-block",
                width: 80,
                paddingTop: 3
            }
        },
        "Description"), React.createElement("textarea", {
            style: {
                verticalAlign: "top",
                width: 300,
                resize: "vertical",
                height: 60,
                fontSize: 13
            },
            value: this.state.info.description,
            onChange: e => this.setState({
                info: _.assignIn({},
                this.state.info, {
                    description: e.currentTarget.value
                })
            })
        }))))))
    }
}

export default d