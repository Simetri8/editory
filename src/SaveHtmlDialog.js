import _ from 'lodash';
import React from 'react';
import CheckBoxWrapper from './Mathcha/CheckBoxWrapper';
import ModalDialogContainer from './Editor/ModalDialogContainer';

/// xxx(1569) /*SaveHtmlDialog*/

/// var k = n(0)/*React*/;  // 4 times
/// var B = n.n(k);
/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var So = n(101)/*CheckBoxWrapper*/;  // 1 times
class SaveHtmlDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            info: {
                keepDocumentWidth: true
            },
            isProcessing: false
        };
        this.handleOk = () => {
            this.setState({
                isProcessing: true,
                error: null,
                warning: null
            });
            this.props.onRequestSave(this.state.info).then((e) => {
                if (e.message) {
                    this.setState({
                        warning: e.message
                    });
                }
            }).
            catch((e) => {
                var t = e.message || JSON.stringify(e);
                this.setState({
                    error: t
                });
            }).
            finally(() => {
                this.setState({
                    isProcessing: false
                });
            });
        };
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            style: {
                width: 350,
                maxWidth: "95vw"
            },
            centerButtons: true,
            noLabel: "Cancel",
            okLabel: "Save Html",
            okStyle: {
                width: 100
            },
            btnLarge: true,
            message: this.state.error || this.state.warning,
            isMessageWarning: !!this.state.warning,
            isProgressing: this.state.isProcessing,
            onOk: this.handleOk,
            onCancel: this.props.onClose,
            onNo: this.props.onClose,
            isOkDisabled: false,
            show: true,
            footerStyle: {
                flexDirection: "column",
                alignItems: "center"
            },
            messageStyle: {
                marginBottom: 10
            }
        },
        React.createElement("div", {
            style: {
                flex: 1,
                maxHeight: "80vh",
                overflow: "visible",
                minHeight: 60,
                position: "relative",
                padding: 10
            }
        },
        React.createElement(CheckBoxWrapper, {
            onValueChanged: (e) => {
                return this.setState({
                    info: _.assignIn({},
                    this.state.info, {
                        keepDocumentWidth: e
                    })
                });
            },
            checked: this.state.info.keepDocumentWidth,
            name: "Keep Document Width"
        })));
    }
}
/*n.d(t, "a", function () {
    return SaveHtmlDialog;
});*/

export default SaveHtmlDialog