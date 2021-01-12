import _ from 'lodash';
import React from 'react';
import ModalDialogContainer from './ModalDialogContainer';

/// xxx(342) /*ModalConfirmDialog*/

/*n.d(t, "a", function () {
    return l
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 5 times
/// var o = n.n(i);
/// var s = n(105)/*ModalDialogContainer*/;  // 1 times
class l extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            errorMessage: "",
            isProgressing: !1
        };
        this.onProgressing = (e => {
            this.setState({
                isProgressing: e
            })
        });
        this.onOk = (() => {
            this.onProgressing(!0);
            this.props.onOk(this.onSuccessCallback, this.onErrorCallback)
        });
        this.close = (() => {
            this.setState({
                isProgressing: !1
            });
            this.props.onClose()
        });
        this.onSuccessCallback = (() => {
            this.close()
        });
        this.onErrorCallback = (e => {
            this.setState({
                isProgressing: !1,
                errorMessage: e
            })
        });
        this.onCancel = (() => {
            this.close()
        })
    }
    componentWillReceiveProps(e) {
        e.show && !this.props.show && this.state.errorMessage && this.setState({
            errorMessage: "",
            isProgressing: !1
        })
    }
    getLabel() {
        return React.createElement("label", {
            style: d
        },
        this.props.label)
    }
    getErrorMessage() {
        return this.state.errorMessage
    }
    render() {
        return React.createElement("div", null, React.createElement(ModalDialogContainer, {
            style: _.assignIn({
                width: 400,
                maxWidth: "95vw"
            },
            this.props.style),
            centerButtons: !0,
            dialogType: "YesNo",
            noLabel: "Cancel",
            message: this.getErrorMessage(),
            isProgressing: this.state.isProgressing,
            onOk: this.onOk,
            onCancel: this.onCancel,
            onNo: this.onCancel,
            show: this.props.show,
            className: "confirm-dialog"
        },
        React.createElement("confirm-dialog", {
            style: c
        },
        this.getLabel())))
    }
}
var c = {
    width: "100%",
    display: "flex",
    flexDirection: "column"
},
d = {
    display: "block",
    textAlign: "center",
    fontSize: 13,
    padding: 10
}

export default l