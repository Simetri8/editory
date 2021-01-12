import _ from 'lodash';
import { n456B } from './n456';
import Api from './Api';
import ConsoleLog from './ConsoleLog';
import DocumentTreeHelper from './Document/DocumentTreeHelper';
import MathGlobal from './MathGlobal';
import PropUpdateHelper from './Mathcha/PropUpdateHelper';
import TreeNodeType from './Document/TreeNodeType';

/// xxx(1545) /*Reducers*/

/// var Rl = n(456)/*n456*/;  // 1 times
/// var Pa = n(28)/*MathGlobal*/;  // 3 times
/// var pl = n(7)/*PropUpdateHelper*/;  // 8 times
/// var Rt = n(65)/*ConsoleLog*/;  // 1 times
/// var Nt = n(40)/*TreeNodeType*/;  // 1 times
/// var st = n(68)/*DocumentTreeHelper*/;  // 2 times
/// var Pe = n(3);  // 23 times
/// var Fe = n.n(Pe);
/// var api = n(1542)/*Api*/;  // 1 times
function wl(e, t, n) {
    if ("print" == t) {
        return function (e, t) {
            try {
                Api.Put("/api/documents/".concat(e, "/settings/print"), t);
                console.log("send document print ");
            } catch (e) {
                ConsoleLog.error(e);
            }
        }(e, n);
    }
    throw new Error("not support this settings");
}
function Ol(e, t, n, r) {
    return n === TreeNodeType.Directory ?
        function (e, t, n) {
            var r = DocumentTreeHelper.updateTree(e.tree, null, (e) => {
                return e.id != t ? null : n(e);
            });
            return _.assignIn({},
                e, {
                tree: r
            });
        }(e, t, r) : function (e, t, n) {
            var r = DocumentTreeHelper.updateTree(e.tree, (e) => {
                return e.id != t ? null : n(e);
            });
            return _.assignIn({},
                e, {
                tree: r
            });
        }(e, t, r);
}
var Ml = {
    tree: {
        documents: [],
        directories: []
    },
    sharedTree: {
        documents: [],
        directories: []
    },
    isDocumentLoading: true,
    saveInfo: {
        isSaving: false,
        requestedStatus: "saved"
    }
};
var Dl = {
    networkStatus: "up"
};
var bl = {
    show: !MathGlobal.isMobileOrTablet() && !MathGlobal.isDisableSideBar(),
    width: 220,
    shareSection: {
        height: 135,
        show: true
    }
};
var Reducers = {
    sidebar: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : bl;
        var t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
            case "sidebar_show":
                return PropUpdateHelper.setProp(e, "show", true);
            case "sidebar_hide":
                return PropUpdateHelper.setProp(e, "show", false);
            case "sidebar_setWidth":
                /*pi.setSidebarWidth(t.width)*/
                return PropUpdateHelper.setProp(e, "width", t.width);
            case "sidebar_setShareSection":
                return PropUpdateHelper.setProp(e, "shareSection", PropUpdateHelper.update(e.shareSection, t.settings));
            case "setActiveDocument":
                return MathGlobal.isMobileOrTablet() && e.show ? _.assignIn({},
                    e, {
                    show: false
                }) : e;
            default:
                return e;
        }
    },
    documents: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ml;
        var t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
            case "showDocumentRename":
                return _.assignIn({},
                    e, {
                    renameRequestInfo: {
                        id: t.nodeId,
                        type: t.nodeType
                    }
                });
            case "hideDocumentRename":
                return _.assignIn({},
                    e, {
                    renameRequestInfo: null
                });
            case "setActiveDocument":
                return n456B.setActiveDocument({
                    documentId: t.document.id,
                    settings: t.document.settings,
                    setSettingFunc: wl
                }),
                    _.assignIn({},
                        e, {
                        activeDocumentData: t.document,
                        isDocumentLoading: false,
                        saveInfo: _.assignIn({},
                            e.saveInfo, {
                            requestedStatus: "saved",
                            isSaving: false
                        })
                    });
            case "documents_setDocumentName":
                var n = t.nodeInfo;
                var r = n.id;
                var a = n.name;
                return Ol(e, r, n.type, (e) => {
                    return _.assignIn({},
                        e, {
                        name: a
                    });
                });
            case "documents_stopLoading":
                return _.assignIn({},
                    e, {
                    isDocumentLoading: false
                });
            case "documents_loading":
                return _.assignIn({},
                    e, {
                    isDocumentLoading: true,
                    activeDocumentError: null
                });
            case "documents_setActiveDocumentError":
                return _.assignIn({},
                    e, {
                    isDocumentLoading: false,
                    activeDocumentError: {
                        message: t.message,
                        errorType: t.errorType,
                        notLoggedIn: t.notLoggedIn
                    }
                });
            case "documents_saveActiveDocumentError":
                return _.assignIn({},
                    e, {
                    activeDocumentError: {
                        message: t.message,
                        errorType: t.errorType,
                        notLoggedIn: t.notLoggedIn
                    }
                });
            case "requestSaveStatus":
                return "forceUnsave" == t.status ? _.assignIn({},
                    e, {
                    saveInfo: _.assignIn({},
                        e.saveInfo, {
                        isSaving: false,
                        requestedStatus: "unsave"
                    })
                }) : ("saving" != t.status && "saved" != t.status || (e = _.assignIn({},
                    e, {
                    activeDocumentError: null,
                    saveInfo: _.assignIn({},
                        e.saveInfo, {
                        isSaving: "saving" == t.status
                    })
                })), "saved" == t.status && "unsave" == e.saveInfo.requestedStatus ? e : PropUpdateHelper.set(e, "saveInfo.requestedStatus", t.status));
            case "documents_updateGeneratedLink":
                return Ol(e, t.id, t.nodeType, (e) => {
                    return t.fullAccess ? _.assignIn({},
                        e, {
                        fullAccessGeneratedLink: t.link
                    }) : _.assignIn({},
                        e, {
                        generatedLink: t.link
                    });
                });
            case "documents_updateShared":
                return Ol(e, t.id, t.nodeType, (e) => {
                    return t.fullAccess ? _.assignIn({},
                        e, {
                        isFullAccessShared: t.isShared
                    }) : _.assignIn({},
                        e, {
                        isShared: t.isShared
                    });
                });
            case "documents_setDocumentWidth":
                return _.assignIn({},
                    e, {
                    activeDocumentData: _.assignIn({},
                        e.activeDocumentData, {
                        settings: _.assignIn({},
                            e.activeDocumentData.settings || {},
                            {
                                width: t.width
                            })
                    })
                });
            case "documents_custom":
                return t.func(e);
        }
        return e;
    },
    common: function () {

        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Dl;
        var t = arguments.length > 1 ? arguments[1] : void 0;
        //console.log("Reducers.setInitialized", e, t);
        switch (t.type) {
            case "setInitialized":
                return PropUpdateHelper.setProp(e, "isInitialized", true);
            case "common_setNetworkStatus":
                return PropUpdateHelper.setProp(e, "networkStatus", t.status);
        }
        return e;
    },
    user: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            isAnonymous: true,
            settings: {}
        };
        var t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
            case "user_custom":
                var n = t.func(e);/*pi.setIsLoggedIn(!n.isAnonymous);*/
                return n;
        }
        return e;
    }
};
/*n.d(t, "a", function () {
    return Reducers;
});*/

export default Reducers