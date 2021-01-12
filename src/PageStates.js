import _ from 'lodash';
import DocumentTreeHelper from './Document/DocumentTreeHelper';

/// xxx(1549) /*PageStates*/

/// var st = n(68)/*DocumentTreeHelper*/;  // 3 times
/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
var states = {
    activeDocumentOverview: (state) => {
        if (state.documents.activeDocumentData && state.documents.tree) 
        return DocumentTreeHelper.findDocument(state.documents.tree, state.documents.activeDocumentData.id) || 
            DocumentTreeHelper.findDocument(state.documents.sharedTree, state.documents.activeDocumentData.id);
        else return null;
    },
    user: (state) => {
        return state.user;
    },
    tree: (e) => {
        return e.documents.tree;
    },
    isInitialized: (e) => {
        return e.common.isInitialized;
    },
    isAnonymousUser: (e) => {
        return e.user.isAnonymous;
    },
    userDisplayName: (e) => {
        //console.log("[][PageStates].userDisplayName",e.user.displayName);
        return e.user.displayName;
    },
    isDocumentLoading: (e) => {
        return e.documents.isDocumentLoading;
    },
    saveStatus: (e) => {
        return e.documents.saveInfo.requestedStatus;
    },
    sharedTree: (e) => {
        return e.documents.sharedTree;
    },
    isSideBarShown: (e) => {
        return e.sidebar.show;
    },
    sidebarWidth: (e) => {
        return e.sidebar.width;
    },
    itemsBarHide: (e) => {
        return e.user.settings.hideQuickToolBar;
    },
    activeDocumentId: (e) => {
        return e.documents.activeDocumentData && e.documents.activeDocumentData.id;
    },
    sharedNodeInfo: (e) => {
        var t = e.documents.shareRequestInfo;
        if (!t) {
            return null;
        }
        var n = DocumentTreeHelper.findNode(e.documents.tree, t);
        return _.assignIn({},
            t, {
            generatedLink: n.generatedLink,
            isShared: n.isShared,
            fullAccessGeneratedLink: n.fullAccessGeneratedLink,
            isFullAccessShared: n.isFullAccessShared,
            name: n.name
        });
    },
    activeLoadedDocumentData: (e) => {
        return e.documents.activeDocumentData;
    },
    isSaving: (e) => {
        return e.documents.saveInfo.isSaving;
    },
    activeDocumentError: (e) => {
        return e.documents.activeDocumentError;
    },
    netWorkStatus: (e) => {
        return e.common.networkStatus;
    },
    isQuickStartReadFromServer: (e) => {
        return e.user.settings.isQuickStartRead;
    }
}
/*n.d(t, "a", function () {
    return states;
});*/

export default states