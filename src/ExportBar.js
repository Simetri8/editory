import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import MainMenu from './MainMenu';
import MathGlobal from './MathGlobal';
import PageDispatches from './PageDispatches';
import PageStates from './PageStates';
import PropUpdateHelper from './Mathcha/PropUpdateHelper';
import ShareDialog from './ShareDialog';
import TimerHelper from './Mathcha/TimerHelper';
import TreeNodeType from './Document/TreeNodeType';

/// xxx(1558) /*ExportBar*/

/// var k = n(0)/*React*/;  // 8 times
/// var B = n.n(k);
/// var Ut = n(2)/*lodash*/;  // 5 times
/// var Wt = n.n(Ut);
/// var pl = n(7)/*PropUpdateHelper*/;  // 2 times
/// var Th = n(19)/*TimerHelper*/;  // 1 times
/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
/// var Pa = n(28)/*MathGlobal*/;  // 13 times
/// var Nt = n(40)/*TreeNodeType*/;  // 1 times
/// var redux = n(1544)/*Rdx*/;  // 2 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 3 times
/// var states = n(1549)/*PageStates*/;  // 8 times
/// var shareDialog = n(1588)/*ShareDialog*/;  // 1 times
/// var mainMenu = n(1589)/*MainMenu*/;  // 1 times
var ul = {
    temporaryId: "temporaryId",
    anonymousDocumentId: "-1"
};
class ExportBarComponent extends React.Component {
    constructor(e) {
        super(e);
        this.menuBarMap = {};
        this.onChange = (e, t) => {
            if (t) {
                this.setState({
                    selectedName: e
                });
            }
            this.setState({
                isOpenOnMouseOver: t
            });
            var n = _.map(this.state.menuBars, (n) => {
                return n.visibility = false,
                n.name === e && (n.visibility = t),
                n;
            });
            this.setState({
                menuBars: n
            });
        };
        this.onMouseOver = (e) => {
            this.setState({
                selectedName: e
            });
        };
        this.onKeyDown = (e) => {
            if (e.stopPropagation(), 39 != e.keyCode) {
                if (37 === e.keyCode) {
                    return e.preventDefault(),
                    void((t = _.findIndex(this.state.menuBars, (e) => {
                        return e.name === this.state.selectedName;
                    })) > 0 && (t--, n = this.state.menuBars[t].name, this.onChange(n, this.state.isOpenOnMouseOver)));
                }
            } else {
                e.preventDefault();
                var t = _.findIndex(this.state.menuBars, (e) => {
                    return e.name === this.state.selectedName;
                });
                if (t < this.state.menuBars.length - 1) {
                    t++;
                    var n = this.state.menuBars[t].name;
                    this.onChange(n, this.state.isOpenOnMouseOver);
                }
            }
        };
        this.onBlur = (e) => {
            this.blurMenuBar = e;
            TimerHelper.next(() => {
                if (this.blurMenuBar === this.focusMenuBar && this.menuBarMap[this.blurMenuBar]) {
                    this.menuBarMap[this.blurMenuBar].onOffClick(false);
                }
            });
        };
        this.onFocus = (e) => {
            this.focusMenuBar = e;
        };
        this.onSelect = (e) => {
            this.setState({
                selectedMenuItem: e
            });
            if ("share" != e.key) {
                if ("show-tool-bar" != e.key) {
                    this.props.onSelect(this.state.selectedName, e);
                } else {
                    this.props.showToolbar();
                }
            } else {
                this.onShareButtonMouseDown();
            }
        };
        this.onSaveClick = () => {
            if ("unsave" == this.props.saveStatus) {
                this.props.requestSaveDocument();
            }
        };
        this.onShareButtonMouseDown = () => {
            if (!this.shouldDisableShare()) {
                this.props.customDocuments((e) => {
                    return _.assignIn({},
                    e, {
                        shareRequestInfo: {
                            id: this.props.activeDocumentOverview.id,
                            type: TreeNodeType.Document
                        }
                    });
                });
            }
        };
        this.state = {
            isOpenOnMouseOver: false,
            selectedName: "",
            selectedMenuItem: null,
            menuBars: [{
                name: "Menu",
                visibility: false,
                data: [{
                    key: "save-as-html",
                    value: "Save as Html (.zip)"
                },
                {
                    key: "export-all",
                    value: "Export Document to Latex"
                },
                {
                    key: "export-selection",
                    value: "Export Selection to Latex"
                },
                {
                    key: "import",
                    value: "Import from Latex"
                },
                {
                    key: "import-from-zip",
                    value: "Import from .mathcha file",
                    hide: !MathGlobal.allowImportFromMathchaFile()
                },
                {},
                {
                    key: "page-setting",
                    value: "Document Settings"
                },
                {
                    key: "user-settings",
                    value: "User Settings"
                }]
            }],
            showShareDialog: false
        };
        if (!MathGlobal.isMobileOrTablet()) {
            this.state.menuBars[0].data.push({});
            this.state.menuBars[0].data.push({
                key: "show-tool-bar",
                value: "Show Left Toolbar",
                disabled: true
            });
            if (MathGlobal.licenseManagement()) {
                this.state.menuBars[0].data.push({});
                this.state.menuBars[0].data.push({
                    key: "license-dialog",
                    value: "License"
                });
            }
            if (!MathGlobal.isMac() && MathGlobal.isOfflineMode()) {
                this.state.menuBars[0].data.push({
                    key: "about-dialog",
                    value: "About"
                });
            }
            this.state.menuBars[0].data.push({});
            if (MathGlobal.supportSaveAsPDF()) {
                this.state.menuBars[0].data.push({
                    key: "print",
                    value: "Print|Save as PDF",
                    icon: "print",
                    shortcut: MathGlobal.isMac() ? "\u2318+P" : "Ctrl+P"
                });
            } else {
                this.state.menuBars[0].data.push({
                    key: "print",
                    value: "Print",
                    icon: "print",
                    shortcut: MathGlobal.isMac() ? "\u2318+P" : "Ctrl+P"
                });
            }
        }
    }
    setMenuItemState(e, t) {
        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        var r = _.findIndex(e, (e) => {
            return e.key === t;
        });
        if (r < 0) {
            return e;
        }
        var a = PropUpdateHelper.setProp(e[r], "disabled", n);
        return PropUpdateHelper.setIndex(e, r, a);
    }
    isDocumentWriteable(e) {
        return e && (!e.notOwner || !!e.writeable);
    }
    isDocumentReadonly(e) {
        return !this.isDocumentWriteable(e);
    }
    renderMenuBars() {
        if (MathGlobal.hideMenu()) {
            return React.createElement("div", {
                style: {
                    width: 25
                }
            });
        }
        var e = this.isDocumentReadonly(this.props.activeDocumentOverview);
        var t = this.props.activeDocumentOverview && this.props.activeDocumentOverview.isAnonymous;
        return _.map(this.state.menuBars, (n, r) => {
            var a = n.data;
            return e && (a = this.setMenuItemState(a, "import"), a = this.setMenuItemState(a, "page-setting"), a = this.setMenuItemState(a, "share")),
            this.props.itemsBarHide && (a = this.setMenuItemState(a, "show-tool-bar", false)),
            t && (a = this.setMenuItemState(a, "share")),
            React.createElement("div", {
                key: r
            },
            React.createElement(MainMenu, {
                ref: (e) => {
                    return this.menuBarMap[n.name] = e;
                },
                data: a,
                disabled: this.shouldBeDisabled(),
                onChange: this.onChange,
                name: n.name,
                icon: n.icon,
                visibility: n.visibility,
                isOpenOnMouseOver: this.state.isOpenOnMouseOver,
                onMouseOver: this.onMouseOver,
                onKeyDown: this.onKeyDown,
                onBlur: this.onBlur,
                onFocus: this.onFocus,
                onSelect: this.onSelect
            }));
        });
    }
    shouldBeDisabled() {
        return !this.props.activeDocumentData || this.props.isDocumentLoading || !this.props.isInitialized;
    }
    renderSave() {
        if (this.shouldBeDisabled()) {
            return null;
        }
        if (this.isDocumentReadonly(this.props.activeDocumentOverview)) {
            return React.createElement("save-button", {
                class: "readonly"
            });
        }
        if (MathGlobal.isAppSettingStoreDisabled()) {
            return null;
        }
        var e = MathGlobal.isMac() ? "\u2318+S" : "Ctrl+S";
        var t = this.props.saveStatus;
        return this.props.isSaving && (t = "saving"),
        React.createElement("save-button", {
            title: e,
            onClick: this.onSaveClick,
            class: t,
            style: {
                marginTop: "8px",
                WebkitAppRegion: "no-drag"
            }
        });
    }
    shouldDisableShare() {
        return this.shouldBeDisabled() || this.props.activeDocumentOverview.id === ul.temporaryId || this.props.activeDocumentOverview.notOwner || this.props.isAnonymousUser;
    }
    renderShare() {
        MathGlobal.shouldUseSmallLayout();
    }
    render() {
        var e = {};
        var t = "export-bar-container ";
        if (MathGlobal.shouldUseSmallLayout()) {
            e.left = 0;
            t = t + "mobile-small-layout";
        };
        return React.createElement("div", {
            style: e,
            className: t
        },
        this.renderMenuBars(), this.renderShare(), this.renderSave(), React.createElement(ShareDialog, null));
    }
}
var mapStateToProps = (e) => {
    return {
        activeDocumentOverview: PageStates.activeDocumentOverview(e),
        saveStatus: PageStates.saveStatus(e),
        isSaving: PageStates.isSaving(e),
        activeDocumentData: PageStates.activeLoadedDocumentData(e),
        isDocumentLoading: PageStates.isDocumentLoading(e),
        isInitialized: PageStates.isInitialized(e),
        isAnonymousUser: PageStates.isAnonymousUser(e),
        itemsBarHide: PageStates.itemsBarHide(e)
    };
}
var mapDispatchToProps = {
    requestSaveDocument: PageDispatches.requestSaveDocument,
    customDocuments: PageDispatches.customDocuments,
    customUser: PageDispatches.customUser
}
var ExportBar = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
})(ExportBarComponent);
/*n.d(t, "a", function () {
    return ExportBar;
});*/

export default ExportBar