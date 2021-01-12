import { SaveWorker, SilentSaver, DocumentFetcher } from './DocumentActions_v2';
import Api from './Api';
import DocumentProvider from './DocumentProvider';
import PageStates from './PageStates';
import TreeNodeType from './Document/TreeNodeType';

/// xxx(1548) /*PageDispatches*/

/// var Nt = n(40)/*TreeNodeType*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 2 times
/// var states = n(1549)/*PageStates*/;  // 1 times
/// var documentProvider = n(1552)/*DocumentProvider*/;  // 1 times
/// var documentActions = n(1553)/*DocumentActions*/;  // 3 times
const requestSaveStatus = (e) => {
    return {
        type: "requestSaveStatus",
        status: e
    };
}
const setActiveDocumentError = (e, t) => {
    return {
        type: "documents_setActiveDocumentError",
        message: e,
        errorType: t = t || "loadError"
    };
}
const setActiveDocument = (e) => {
    return {
        type: "setActiveDocument",
        document: e
    };
}
var Dispatches = {
    requestNodeRename: (e, t) => {
        return {
            type: "showDocumentRename",
            nodeId: e,
            nodeType: t || TreeNodeType.Document
        };
    },
    requestSaveDocument: () => {
        return function (e, t) {
            var state = t();
            e(requestSaveStatus("saving"));
            var n = DocumentProvider.getCurrentDocumentInfo();
            var r = {
                isAnonymous: state.user.isAnonymous,
                /*byShared:n.notOwner,//sharedLink:n.notOwner?Ft.getPassedSharedLink():null,*/
                //byShared: n.notOwner,
                sharedLink: null
            };
            SaveWorker.save(n, r).then(() => {
                e(requestSaveStatus("saved"));
            }).
                catch((t) => {
                    if (e(requestSaveStatus("forceUnsave")), t.customErrorType) {
                        switch (t.customErrorType) {
                            case "local-save-error":
                                e(setActiveDocumentError("Save failed in private mode,please login or use without private mode"));
                                break;
                            case "server-save-error":
                                e({
                                    type: "documents_saveActiveDocumentError",
                                    message: t.message,
                                    notLoggedIn: t.notLoggedIn,
                                    errorType: "saveError"
                                });
                        }
                    } else {
                        e(setActiveDocumentError(t.message));
                    }
                });
        };
    },
    requestEditingDocument: (e) => {
        return function (t, n) {
            var r = n();
            if (!r.documents.activeDocumentData || r.documents.activeDocumentData.id != e) {
                var a = PageStates.isAnonymousUser(r);
                if ("unsave" == r.documents.saveInfo.requestedStatus) {
                    SilentSaver.silentSave(a);
                }
                t({
                    type: "documents_loading"
                });
                DocumentFetcher.fetch(e, r.documents.tree).then((n) => {
                    t(setActiveDocument(n));
                    if (!a) {
                        (function (e) {
                            Api.Put("/api/documents/".concat(e, "/editing"));
                        })(e);
                    }
                }).
                    catch((e) => {
                        t(setActiveDocumentError(e.message));
                    });
            }
        };
    },
    customDocuments: (e) => {
        return {
            type: "documents_custom",
            func: e
        };
    },
    customUser: (e) => {
        return {
            type: "user_custom",
            func: e
        };
    },
    requestSaveStatus: requestSaveStatus,
    setActiveDocumentError: setActiveDocumentError,
    setLoadingDocumentsError: (e) => {
        return {
            type: "documents_setLoadingDocumentsError",
            message: e
        };
    },
    stopLoadingDocument: () => {
        return {
            type: "documents_stopLoading"
        };
    },
    setInitialized: () => {
        console.log("[][Dispatches].setInitialized")
        return {
            type: "setInitialized"
        };
    },
    setSideBarWidth: (e) => {
        return {
            type: "sidebar_setWidth",
            width: e
        };
    },
    showSideBar: (e) => {
        return {
            type: e ? "sidebar_show" : "sidebar_hide"
        };
    },
    setActiveDocument: setActiveDocument,
    setDocumentWidth: (e, t) => {
        return function (n) {
            n({
                type: "documents_setDocumentWidth",
                id: e,
                width: t
            });
            Api.Put("/api/documents/".concat(e, "/settings/width"), t);
        };
    }
}
/*n.d(t, "a", function () {
    return dispatches;
});*/

export default Dispatches