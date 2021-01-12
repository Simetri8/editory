import React from 'react';
// Not found 'var' for: import  from './MathTypeContainer';
import CollaborativeArea from './CollaborativeArea';
import ExportBar from './ExportBar';
import InitHelper from './InitHelper';
import MathGlobal from './MathGlobal';
import ModalDialogHelper from './Editor/ModalDialogHelper';
import PageHeader from './PageHeader';

/// xxx(1546) /*PageWrapper*/

/// n.r(t)
/// var k = n(0)/*React*/;  // 7 times
/// var B = n.n(k);
/// var page = n(1506)/*MathTypeContainer*/;  // 0 times
/// var pageHeader = n(1547)/*PageHeader*/;  // 1 times
/// var collaborativeArea = n(1557)/*CollaborativeArea*/;  // 1 times
/// var exportBarContainer = n(1558)/*ExportBar*/;  // 1 times
/// var Cl = n(32)/*InitHelper*/;  // 1 times
/// var Be = n(88)/*ModalDialogHelper*/;  // 1 times
/// var Pa = n(28)/*MathGlobal*/;  // 2 times
var ModalDialogWrapper = ModalDialogHelper.getModalDialogContainer();
function PreventDefault(e) {
    e.preventDefault();
}
class Page extends React.Component {
    constructor(e) {
        super(e);
        this.onSelect = (e, t) => {
            this.menuAction(t.key);
        };
        this.onPrint = () => {
            this.editorContainer.showPrintSettings();
        };
        this.showToolbar = () => {
            this.menuAction("show-tool-bar");
        };
        this.handleEditorContainerRef = (e) => {
            this.editorContainer = e.wrappedInstance;
        };
        InitHelper.initAll();
    }
    getMathType() {
        return this.editorContainer.mathType;
    }
    menuAction(e) {
        if ("print" == e) {
            return this.onPrint();
        }
        if ("page-setting" == e) {
            return this.getMathType().showPageSetting();
        }
        if ("export-selection" == e) {
            return this.getMathType().requestExportSelection();
        }
        if ("export-all" == e) {
            return this.getMathType().requestExportAll();
        }
        if ("user-settings" == e) {
            return this.editorContainer.showUserSettings();
        }
        if ("license-dialog" == e) {
            return this.editorContainer.showLicenseDialog();
        }
        if ("import-from-zip" == e) {
            return this.editorContainer.importFromZipFile();
        }
        if ("import" == e) {
            return this.getMathType().showImportFromLatex();
        }
        if ("save-as-html" == e) {
            return this.editorContainer.exportToHtml();
        }
        if ("tutorial" == e) {
            window.open("/tutorial", "_blank").focus();
        }
        return "show-tool-bar" == e ? this.editorContainer.showToolbar() : "about-dialog" == e ? this.editorContainer.showAboutDialog() : void 0;
    }
    onZoomLevelChanged(e) {
        return this.editorContainer.onZoomLevelChanged(e);
    }
    renderCollaborativeArea() {
        if (MathGlobal.isCollaboratingTesting()) {
            return React.createElement(CollaborativeArea, {
                requestMathTypeSourceRef: () => {
                    return this.editorContainer.mathType;
                }
            });
        }
    }
    render() {
        var e = MathGlobal.isIos() ? "ios" : "";
        return React.createElement("x-page", {
            class: e,
            onDragEnter: PreventDefault,
            onDragOver: PreventDefault,
            onDrop: PreventDefault
        },
        React.createElement(page.a, {
            ref: this.handleEditorContainerRef,
            onMathTypeModelChange: (m) => {
                console.log("Page.ModelChange", m)
            }
        }), React.createElement(PageHeader, null), React.createElement(ExportBar, {
            showToolbar: this.showToolbar,
            onPrint: this.onPrint,
            onSelect: this.onSelect
        }), React.createElement(ModalDialogWrapper, null), this.renderCollaborativeArea());
    }
}
/*n.d(t, "a", function () {
    return Page;
});*/

export default Page