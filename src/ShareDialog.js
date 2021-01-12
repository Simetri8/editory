import _ from 'lodash';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Promise } from 'bluebird';
import classNames from 'classnames';
import React from 'react';
import Api from './Api';
import CheckBoxWrapper from './Mathcha/CheckBoxWrapper';
import Global from './Global';
import ModalDialogContainer from './Editor/ModalDialogContainer';
import PageDispatches from './PageDispatches';
import PageStates from './PageStates';
import TimerHelper from './Mathcha/TimerHelper';
import TreeNodeType from './Document/TreeNodeType';

/// xxx(1588) /*ShareDialog*/

/// var k = n(0)/*React*/;  // 23 times
/// var B = n.n(k);
/// var Ue = n(14)/*classnames*/;  // 1 times
/// var We = n.n(Ue);
/// var n19 = n(19)/*TimerHelper*/;  // 1 times
/// var So = n(101)/*CheckBoxWrapper*/;  // 1 times
/// var Pe = n(3);  // 2 times
/// var Fe = n.n(Pe);
/// var Aa = n(11)/*Global*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 4 times
/// var Ne = n(30)/*blubirdjs*/;  // 2 times
/// var ke = n.n(Ne);
/// var Nt = n(40)/*TreeNodeType*/;  // 5 times
/// var Ye = n(105)/*ModalDialogContainer*/;  // 1 times
/// var nl = n(455)/*react-copy-to-clipboard-exp*/;  // 1 times
/// var rl = n.n(nl);
/// var redux = n(1544)/*Rdx*/;  // 1 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 1 times
/// var states = n(1549)/*PageStates*/;  // 1 times
var il = {
    fontSize: 11,
    paddingLeft: 2,
    marginBottom: 5,
    display: "inline-block",
    color: "green"
};
var sl = {
    width: "100%",
    marginBottom: 15,
    display: "block",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
    paddingBottom: 5,
    borderBottom: "1px solid lightgray"
};
var ll = {
    fontSize: 12,
    color: "orange",
    display: "inline-block",
    paddingBottom: 10,
    paddingTop: 10
};
class al extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            copied: false
        };
    }
    componentWillReceiveProps(e) {
        if ((this.props.generatedLink != e.generatedLink || this.props.isShared != e.isShared) && this.state.copied) {
            this.setState({
                copied: false
            });
        }
    }
    render() {
        var e = this.props;
        var t = e.isShared;
        var n = e.isProgressing;
        var r = e.generatedLink;
        var a = e.checkboxText;
        var i = this.state.copied;
        var o = {
            width: "100%",
            display: t ? "flex" : "none",
            marginBottom: 3
        };
        return React.createElement("div", {
            style: {
                marginTop: 10
            }
        },
        React.createElement(CheckBoxWrapper, {
            style: {
                marginBottom: 7
            },
            disabled: n,
            checked: t,
            onValueChanged: () => {
                return this.props.requestShare(!t);
            },
            name: a
        }), React.createElement("div", {
            style: o
        },
        React.createElement("input", {
            style: {
                flexGrow: 1
            },
            placeholder: "Getting link...",
            autoCorrect: "off",
            autoCapitalize: "off",
            readOnly: true,
            value: r
        }), React.createElement(CopyToClipboard, {
            text: r,
            onCopy: () => {
                return TimerHelper.waitABit(() => {
                    this.setState({
                        copied: true
                    });
                });
            }
        },
        React.createElement("button", {
            style: {
                marginLeft: 5,
                width: 70
            },
            disabled: n,
            className: classNames("btn-normal")
        },
        "Copy"))), React.createElement("copied-text", {
            style: _.assignIn({},
            il, {
                display: i && t ? "block" : "none"
            })
        },
        "Link copied!"));
    }
}
class ol extends React.Component {
    renderFullShareSection() {
        var e = this.props;
        var t = e.isWriteableShared;
        var n = e.writeableGeneratedLink;
        var r = e.writeableCheckBoxText;
        var a = e.isProgressing;
        if (Global.isCollaboratingTesting()) {
            return React.createElement(al, {
                checkboxText: r,
                generatedLink: n,
                isProgressing: a,
                isShared: t,
                requestShare: this.props.requestWriteableShare
            });
        }
    }
    render() {
        var e = this.props;
        var t = e.isReadonlyShared;
        var n = e.readonlyCheckboxText;
        var r = e.readonlyGeneratedLink;
        var a = e.titleName;
        var i = e.isProgressing;
        var o = e.note;
        return React.createElement("share-dialog", {
            style: {
                width: "100%",
                margin: 5
            }
        },
        React.createElement("document-name", {
            style: sl
        },
        a), React.createElement(al, {
            checkboxText: n,
            generatedLink: r,
            isProgressing: i,
            isShared: t,
            requestShare: this.props.requestReadonlyShare
        }), this.renderFullShareSection(), React.createElement("x-note", {
            style: ll
        },
        " ", o));
    }
}
class cl extends React.Component {
    render() {
        var e = this.props;
        var t = e.isShared;
        var n = e.documentName;
        var r = e.isProgressing;
        var a = e.generatedLink;
        var i = e.isWriteableShared;
        var o = e.writeableGeneratedLink;
        return React.createElement(ol, {
            titleName: "Document:".concat(n),
            isReadonlyShared: t,
            readonlyGeneratedLink: a,
            readonlyCheckboxText: "Share this document (readonly) with others via link",
            isWriteableShared: i,
            writeableGeneratedLink: o,
            writeableCheckBoxText: "Share this document (write/read) with others via link",
            isProgressing: r,
            requestReadonlyShare: this.props.requestShare,
            requestWriteableShare: this.props.requestWriteableShare
        });
    }
}
class dl extends React.Component {
    render() {
        var e = this.props;
        var t = e.isShared;
        var n = e.directoryName;
        var r = e.isProgressing;
        var a = e.generatedLink;
        var i = e.isWriteableShared;
        var o = e.writeableGeneratedLink;
        return React.createElement(ol, {
            titleName: "Directory:".concat(n),
            isReadonlyShared: t,
            readonlyCheckboxText: "Share this directory (readonly) with others via link",
            note: "*Note:Sharing Directory will also share all Documents/Directories inside",
            readonlyGeneratedLink: a,
            isWriteableShared: i,
            writeableGeneratedLink: o,
            writeableCheckBoxText: "Share this directory (write/read) with others via link",
            isProgressing: r,
            requestReadonlyShare: this.props.requestShare,
            requestWriteableShare: this.props.requestWriteableShare
        });
    }
}
class ShareDialogComponent extends React.Component {
    constructor(e) {
        super(e);
        this.onProgressing = (e) => {
            this.setState({
                isProgressing: e
            });
        };
        this.onCancel = () => {
            this.close();
        };
        this.handleDocumentRequestShare = (e) => {
            this.requestShare("documents", e);
        };
        this.handleDocumentRequestFullAccessShare = (e) => {
            this.requestFullShare("documents", e);
        };
        this.handleDirectoryRequestShare = (e) => {
            this.requestShare("directories", e);
        };
        this.handleDirectoryRequestFullAccessShare = (e) => {
            this.requestFullShare("directories", e);
        };
        this.state = {
            isProgressing: false,
            errorMessage: ""
        };
    }
    setErrorMessage(e) {
        this.setState({
            errorMessage: e
        });
    }
    close() {
        this.setState({
            isProgressing: false
        });
        this.props.customDocuments((e) => {
            return _.assignIn({},
            e, {
                shareRequestInfo: null
            });
        });
    }
    getErrorMessage() {
        return this.state.errorMessage;
    }
    requestShare(e, t) {
        var n = this.props.sharedNodeInfo;
        var r = n.generatedLink;
        var a = n.id;
        var i = n.type;
        var o = Promise.resolve();
        if (t && !r) {
            o = Api.Get("/api/".concat(e, "/").concat(a, "/generate-link")).then((e) => {
                return e.json();
            }).then((x) => {
                var e = x.JSON || x;
                this.props.updateGeneratedLink(a, e.generatedLink, i);
            });
        }
        this.onProgressing(true);
        o.then(() => {
            return Api.Put("/api/".concat(e, "/").concat(a, "/share"), {
                shared: t
            });
        }).then(() => {
            this.props.updateShared(a, t, i);
        }).
        catch((e) => {
            var t = e.message;
            this.setErrorMessage(t);
        }).
        finally(() => {
            this.onProgressing(false);
        });
    }
    requestFullShare(e, t) {
        var n = this.props.sharedNodeInfo;
        var r = n.fullAccessGeneratedLink;
        var a = n.id;
        var i = n.type;
        var o = Promise.resolve();
        if (t && !r) {
            o = Api.Get("/api/".concat(e, "/").concat(a, "/full-access-generate-link")).then((e) => {
                return e.json();
            }).then((x) => {
                var e = x.JSON || x;
                this.props.updateFullAccessGeneratedLink(a, e.fullAccessGeneratedLink, i);
            });
        }
        this.onProgressing(true);
        o.then(() => {
            return Api.Put("/api/".concat(e, "/").concat(a, "/full-access-share"), {
                shared: t
            });
        }).then(() => {
            this.props.updateFullAccessShared(a, t, i);
        }).
        catch((e) => {
            var t = e.message;
            this.setErrorMessage(t);
        }).
        finally(() => {
            this.onProgressing(false);
        });
    }
    renderContent() {
        return this.props.sharedNodeInfo.type === TreeNodeType.Directory ? this.renderDirectoryForm() : this.renderDocumentForm();
    }
    renderDocumentForm() {
        var e = this.props.sharedNodeInfo;
        var t = e.name;
        var n = e.generatedLink;
        var r = e.isShared;
        var a = e.isFullAccessShared;
        var i = e.fullAccessGeneratedLink;
        var o = this.state.isProgressing;
        return React.createElement(cl, {
            documentName: t,
            isShared: !!r,
            generatedLink: n,
            isWriteableShared: a,
            writeableGeneratedLink: i,
            isProgressing: o,
            requestShare: this.handleDocumentRequestShare,
            requestWriteableShare: this.handleDocumentRequestFullAccessShare
        });
    }
    renderDirectoryForm() {
        var e = this.props.sharedNodeInfo;
        var t = e.name;
        var n = e.generatedLink;
        var r = e.isShared;
        var a = e.isFullAccessShared;
        var i = e.fullAccessGeneratedLink;
        var o = this.state.isProgressing;
        return React.createElement(dl, {
            directoryName: t,
            isShared: !!r,
            generatedLink: n,
            isWriteableShared: a,
            writeableGeneratedLink: i,
            isProgressing: o,
            requestShare: this.handleDirectoryRequestShare,
            requestWriteableShare: this.handleDirectoryRequestFullAccessShare
        });
    }
    renderModal() {
        if (this.props.sharedNodeInfo) {
            return React.createElement(ModalDialogContainer, {
                style: {
                    width: 500,
                    maxWidth: "95vw"
                },
                okStyle: {
                    display: "none"
                },
                footerStyle: {
                    flexDirection: "column"
                },
                centerButtons: true,
                message: this.getErrorMessage(),
                isProgressing: this.state.isProgressing,
                cancelLabel: "Close",
                onCancel: this.onCancel,
                show: true,
                className: "share-dialog"
            },
            this.renderContent());
        }
    }
    render() {
        return React.createElement("div", null, this.renderModal());
    }
}
var mapStateToProps = (e) => {
    return {
        sharedNodeInfo: PageStates.sharedNodeInfo(e)
    };
}
var mapDispatchToProps = {
    updateGeneratedLink: (e, t, n) => {
        return {
            type: "documents_updateGeneratedLink",
            id: e,
            link: t,
            nodeType: n || TreeNodeType.Document,
            fullAccess: false
        };
    },
    updateShared: (e, t, n) => {
        return {
            type: "documents_updateShared",
            id: e,
            isShared: t,
            nodeType: n || TreeNodeType.Document,
            fullAccess: false
        };
    },
    updateFullAccessGeneratedLink: (e, t, n) => {
        return {
            type: "documents_updateGeneratedLink",
            id: e,
            link: t,
            nodeType: n || TreeNodeType.Document,
            fullAccess: true
        };
    },
    customDocuments: PageDispatches.customDocuments,
    updateFullAccessShared: (e, t, n) => {
        return {
            type: "documents_updateShared",
            id: e,
            isShared: t,
            nodeType: n || TreeNodeType.Document,
            fullAccess: true
        };
    }
}
var ShareDialog = connect(mapStateToProps, mapDispatchToProps, null)(ShareDialogComponent);
/*n.d(t, "a", function () {
    return ShareDialog;
});*/

export default ShareDialog