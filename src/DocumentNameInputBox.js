import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ArrayHelper from './Mathcha/ArrayHelper';
import ModalDialogContainer from './Editor/ModalDialogContainer';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1562) /*DocumentNameInputBox*/

/// var k = n(0)/*React*/;  // 7 times
/// var B = n.n(k);
/// var Ut = n(2)/*lodash*/;  // 4 times
/// var Wt = n.n(Ut);
/// var He = n(16)/*ReactDOM*/;  // 2 times
/// var _e = n.n(He);
/// var gi = n(5)/*sizzle*/;  // 2 times
/// var yi = n.n(gi);
/// var ze = n(43)/*ArrayHelper*/;  // 2 times
/// var n19 = n(19)/*TimerHelper*/;  // 2 times
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
class DocumentNameInputBox extends React.Component {
    constructor(e) {
        super(e);
        this.onProgressing = (e) => {
            this.setState({
                isProgressing: e
            });
        };
        this.onOk = () => {
            this.onProgressing(true);
            this.props.onOk(this.state.nodeName, this.onSuccessCallback, this.onErrorCallback);
        };
        this.onSuccessCallback = () => {
            this.close();
        };
        this.onErrorCallback = (e) => {
            this.setError(e);
        };
        this.onCancel = () => {
            this.close();
        };
        this.onTextAreaKeyDown = (e) => {
            if (13 === e.keyCode) {
                this.onOk();
                e.preventDefault();
                e.stopPropagation();
            }
        };
        this.state = {
            nodeName: this.props.documentName || "",
            isProgressing: false,
            errorMessage: ""
        };
    }
    shouldComponentUpdate(e, t) {
        return !ArrayHelper.areEqualShallow(this.state, t) || !ArrayHelper.areEqualShallow(this.props, e);
    }
    componentDidMount() {
        if (this.props.show) {
            TimerHelper.waitALitteWhile(() => {
                var e = ReactDOM.findDOMNode(this);
                jQuery(e).find("textarea").focus();
            });
        }
    }
    componentWillReceiveProps(e) {
        if (e.show && !this.props.show && this.state.errorMessage) {
            this.setState({
                errorMessage: "",
                isProgressing: false
            });
        }
        if (e.show && !this.props.show) {
            TimerHelper.waitALitteWhile(() => {
                var e = ReactDOM.findDOMNode(this);
                jQuery(e).find("textarea").focus();
            });
            if (null != e.documentName) {
                this.setState({
                    nodeName: e.documentName
                });
            }
        }
    }
    close() {
        this.setState({
            isProgressing: false
        });
        this.props.onClose();
    }
    setError(e) {
        this.setState({
            errorMessage: e,
            isProgressing: false
        });
    }
    getLabel() {
        return React.createElement("label", null, this.props.label);
    }
    isOkDisabled() {
        return null == this.state.nodeName || _.isEmpty(_.trim(this.state.nodeName)) || this.isNameTooLong(this.state.nodeName) || this.isNameDuplicated(this.state.nodeName);
    }
    isNameDuplicated(e) {
        return this.props.documentNames.indexOf(_.trim(e)) >= 0;
    }
    isNameTooLong(e) {
        return _.trim(e).length > 300;
    }
    getMessage() {
        return this.props.message ? this.props.message : this.isNameTooLong(this.state.nodeName) ? "Maximum character is 300" : this.isNameDuplicated(this.state.nodeName) ? "Name is duplicated" : this.state.errorMessage;
    }
    render() {
        return this.props.show ? React.createElement("div", null, React.createElement(ModalDialogContainer, {
            message: this.getMessage(),
            isProgressing: this.state.isProgressing,
            isOkDisabled: this.isOkDisabled(),
            onOk: this.onOk,
            onCancel: this.onCancel,
            show: this.props.show,
            className: "document-name"
        },
        React.createElement("document-name", null, this.getLabel(), React.createElement("textarea", {
            rows: 1,
            value: this.state.nodeName,
            onKeyDown: this.onTextAreaKeyDown,
            onChange: (e) => {
                return this.setState({
                    nodeName: e.target.value.replace(/(\r\n|\n|\r)/gm, "")
                });
            }
        })))) : React.createElement("div", null);
    }
}
/*n.d(t, "a", function () {
    return DocumentNameInputBox;
});*/

export default DocumentNameInputBox