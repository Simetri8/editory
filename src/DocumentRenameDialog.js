import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import Api from './Api';
import DocumentNameInputBox from './DocumentNameInputBox';
import DocumentTreeHelper from './Document/DocumentTreeHelper';
import PageDispatches from './PageDispatches';
import TreeNodeType from './Document/TreeNodeType';

/// xxx(1568) /*DocumentRenameDialog*/

/// var k = n(0)/*React*/;  // 1 times
/// var B = n.n(k);
/// var Pe = n(3);  // 2 times
/// var Fe = n.n(Pe);
/// var Nt = n(40)/*TreeNodeType*/;  // 2 times
/// var st = n(68)/*DocumentTreeHelper*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 1 times
/// var redux = n(1544)/*Rdx*/;  // 2 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 1 times
/// var documentNameInputBox = n(1562)/*DocumentNameInputBox*/;  // 1 times
var mapStateToProps = (state) => {
    var nodeInfo = ((e) => {
        var t = e.documents.renameRequestInfo;
        if (!t) {
            return null;
        }
        var n = DocumentTreeHelper.findNode(e.documents.tree, t);
        return _.assignIn({},
        t, {
            name: n.name
        });
    })(state);
    return {
        nodeInfo: nodeInfo,
        documentName: nodeInfo && nodeInfo.name,
        show: null != nodeInfo,
        documentNames: []
    };
};
var mapDispatchToProps = {
    onClose: () => {
        return {
            type: "hideDocumentRename"
        };
    },
    requestNodeRename: PageDispatches.requestNodeRename,
    setDocumentName: (e) => {
        return {
            type: "documents_setDocumentName",
            nodeInfo: e
        };
    }
}
class DocumentRenameDialogComponent extends DocumentNameInputBox {
    constructor() {
        super(...arguments);
        this.onOk = () => {
            var e = this.props.nodeInfo;
            this.onProgressing(true);
            var t = e.type === TreeNodeType.Directory ? "/api/directories/".concat(e.id, "/rename") : "/api/documents/".concat(e.id, "/rename");
            Api.Put(t, {
                name: this.state.nodeName
            }).then(() => {
                this.props.setDocumentName(_.assignIn({},
                e, {
                    name: this.state.nodeName
                }));
                this.close();
            }).
            catch((e) => {
                var t = e.message;
                this.setError(t);
            }).
            finally(() => {
                this.onProgressing(false);
            });
        };
    }
    getLabel() {
        var e = this.props.nodeInfo.type === TreeNodeType.Directory ? "Please enter Directory name" : "Please enter Document name";
        return React.createElement("label", null, e);
    }
}
var DocumentRenameDialog = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
})(DocumentRenameDialogComponent);
/*n.d(t, "a", function () {
    return DocumentRenameDialog;
});*/

export default DocumentRenameDialog