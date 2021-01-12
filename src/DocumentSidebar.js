import _ from 'lodash';
import { connect } from 'react-redux';
import { Promise } from 'bluebird';
import classNames from 'classnames';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import React from 'react';
import ReactDOM from 'react-dom';
import toArray from '@babel/runtime/helpers/toArray';
import Api from './Api';
import ConsoleLog from './ConsoleLog';
import DocumentActions, { DocumentWi, DocumentFt } from './DocumentActions_v2';
import DocumentDownloader from './DocumentDownloader';
import DocumentIcons from './Editor/DocumentIcons';
import DocumentNameInputBox from './DocumentNameInputBox';
import DocumentsArea from './Document/DocumentsArea';
import DocumentTreeHelper from './Document/DocumentTreeHelper';
import DOMHelper from './Elements/DOMHelper';
import EventHelper from './Mathcha/EventHelper';
import GuidGenerator from './GuidGenerator';
import ImageLoader from './Mathcha/ImageLoader';
import LoginActions from './LoginActions';
import MathGlobal from './MathGlobal';
import MobileTabletClasses from './Mathcha/MobileTabletClasses';
import ModalConfirmDialog from './Editor/ModalConfirmDialog';
import ModalDialogContainer from './Editor/ModalDialogContainer';
import ModalDialogHelper from './Editor/ModalDialogHelper';
import MovingHandler from './Editor/MovingHandler';
import OfflineController from './OfflineController';
import PageDispatches from './PageDispatches';
import PageStates from './PageStates';
import ScContainer from './ScContainer';
import TimerHelper from './Mathcha/TimerHelper';
import TreeNodeType from './Document/TreeNodeType';

/// xxx(1561) /*DocumentSidebar*/

/// var k = n(0)/*React*/;  // 98 times
/// var B = n.n(k);
/// var Ut = n(2)/*lodash*/;  // 3 times
/// var Wt = n.n(Ut);
/// var Pe = n(3);  // 16 times
/// var Fe = n.n(Pe);
/// var Ue = n(14)/*classnames*/;  // 6 times
/// var We = n.n(Ue);
/// var He = n(16)/*ReactDOM*/;  // 2 times
/// var _e = n.n(He);
/// var Ne = n(30)/*blubirdjs*/;  // 3 times
/// var ke = n.n(Ne);
/// var Di = n(459)/*jszip*/;  // 1 times
/// var Ni = n.n(Di);
/// var ki = n(168)/*FileSaver*/;  // 1 times
/// var Bi = n.n(ki);
var is15 = React.version.startsWith("15");
/// var n19 = n(19)/*TimerHelper*/;  // 1 times
/// var Xa = n(4)/*DOMHelper*/;  // 2 times
/// var Rt = n(65)/*ConsoleLog*/;  // 1 times
/// var Oi = n(103)/*ImageLoader*/;  // 1 times
/// var Ye = n(105)/*ModalDialogContainer*/;  // 2 times
/// var za = n(257)/*DocumentIcons*/;  // 2 times
/// var fi = n(342)/*ModalConfirmDialog*/;  // 1 times
/// var Za = n(24)/*EventHelper*/;  // 2 times
/// var Ya = n(76)/*MobileTabletClasses*/;  // 3 times
/// var Be = n(88)/*ModalDialogHelper*/;  // 2 times
/// var Pa = n(28)/*MathGlobal*/;  // 6 times
/// var Ga = n(247)/*DocumentsArea*/;  // 3 times
/// var Qa = n(57)/*MovingHandler*/;  // 1 times
/// var Nt = n(40)/*TreeNodeType*/;  // 12 times
/// var st = n(68)/*DocumentTreeHelper*/;  // 16 times
/// var api = n(1542)/*Api*/;  // 2 times
/// var redux = n(1544)/*Rdx*/;  // 3 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 14 times
/// var states = n(1549)/*PageStates*/;  // 10 times
/// var loginActions = n(1550)/*LoginActions*/;  // 1 times
/// var documentActions = n(1553)/*DocumentActions*/;  // 14 times
/// var scContainer = n(1555)/*ScContainer*/;  // 4 times
/// var offlineController = n(1559)/*OfflineController*/;  // 1 times
/// var documentNameInputBox = n(1562)/*DocumentNameInputBox*/;  // 3 times
/// var documentDownloader = n(1563)/*DocumentDownloader*/;  // 1 times
/// var guidGenerator = n(1564)/*GuidGenerator*/;  // 1 times
var modalDialog = ModalDialogHelper.getModalDialog();
var Ii = {
    display: "block",
    color: "orange",
    fontSize: 13,
    paddingTop: 5
};
var xi = connect((e) => {
    return {
        tree: PageStates.tree(e),
        activeDocumentId: PageStates.activeDocumentId(e),
        userGeneralSettings: PageStates.user(e).settings.generalSettings
    };
},
    {
        customDocuments: PageDispatches.customDocuments
    })(class extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {};
            this.handleDeleteConfirmOk = (e, t) => {
                var n = this.props.actionInfo;
                var r = n.selectedNodes;
                DocumentActions.deleteItems(r).then((x) => {
                    var e = x.JSON || x;
                    return "none" == e.info ? DocumentTreeHelper.deleteDocuments(this.props.tree, r.map((e) => {
                        return e.id;
                    })) : DocumentTreeHelper.constructTree(this.props.tree, e);
                }).then((t) => {
                    e();
                    this.props.onClose(n, t);
                    this.props.customDocuments((e) => {
                        var n = _.assignIn({},
                            e, {
                            tree: t
                        });
                        var r = this.props.activeDocumentId;
                        return r && !DocumentTreeHelper.findDocument(t, r) && (n = _.assignIn({},
                            n, {
                            activeDocumentData: null
                        })),
                            n;
                    });
                }).
                    catch((e) => {
                        var n = e.message;
                        t(n);
                    });
            };
            this.handleDeleteConfirmClose = () => {
                var e = this.props.actionInfo;
                this.props.onClose(e, this.props.tree);
            };
            this.handleAddNewDocumentOk = (e, t, n) => {
                var r = this.props.actionInfo;
                DocumentActions.addNewDocument(e, r.directoryId).then((x) => {
                    var e = x.JSON || x;
                    this.raiseNewTree(DocumentTreeHelper.addDocument(this.props.tree, _.assignIn({},
                        e), r.directoryId));
                    if (this.props.userGeneralSettings.complexObject && this.props.userGeneralSettings.complexObject.defaultPageInformation) {
                        return this.handleAddDefaultPageInformation(e.id, this.props.userGeneralSettings.complexObject.defaultPageInformation, t);
                    }
                    t();
                }).
                    catch((e) => {
                        var t = e.message;
                        n(t);
                    });
            };
            this.handleCommonClose = () => {
                this.props.onClose(this.props.actionInfo);
            };
            this.handleAddNewDirectoryOk = (e, t, n) => {
                var r = this.props.actionInfo;
                DocumentActions.addNewDirectory(e, r.directoryId).then((x) => {
                    var e = x.JSON || x;
                    this.raiseNewTree(DocumentTreeHelper.addDirectory(this.props.tree, _.assignIn({},
                        e), r.directoryId));
                    t();
                }).
                    catch((e) => {
                        var t = e.message;
                        n(t);
                    });
            };
            this.handleDuplicateDocument = (e, t, n) => {
                var r = this.props.actionInfo;
                DocumentActions.duplicateDocument(e, r.id, r.directoryId).then((x) => {
                    var e = x.JSON || x;
                    this.raiseNewTree(DocumentTreeHelper.addDocument(this.props.tree, _.assignIn({},
                        e), r.directoryId));
                    t();
                }).
                    catch((e) => {
                        var t = e.message;
                        n(t);
                    });
            };
        }
        raiseNewTree(e) {
            this.props.customDocuments((t) => {
                return _.assignIn({},
                    t, {
                    tree: e
                });
            });
        }
        renderDeleteAction() {
            var e = this.props.actionInfo;
            var t = Si.buildNamedNodeInfo(this.props.tree, e.selectedNodes);
            var n = Si.fromTreeNodes(t);
            var r = e.selectedNodes.some((e) => {
                return e.type === TreeNodeType.Directory;
            }) ? React.createElement("warning", {
                style: Ii
            },
                " Warning:Delete Directory will delete all Documents/Directories inside ") : null;
            return React.createElement(modalDialog, {
                show: true
            },
                React.createElement(ModalConfirmDialog, {
                    label: React.createElement("span", null, "Do you confirm to delete:", React.createElement("b", null, '"', n, '"'), r),
                    onOk: this.handleDeleteConfirmOk,
                    onCancel: this.handleDeleteConfirmClose,
                    onClose: this.handleDeleteConfirmClose,
                    show: true
                }));
        }
        renderAddNewDocument() {
            return React.createElement(modalDialog, {
                show: true
            },
                React.createElement(DocumentNameInputBox, {
                    documentNames: [],
                    onOk: this.handleAddNewDocumentOk,
                    onClose: this.handleCommonClose,
                    label: "Please enter name for new Document",
                    show: true
                }));
        }
        handleAddDefaultPageInformation(e, t, n) {
            return DocumentActions.fetchFullDocument(e).then((n) => {
                return n.data.pageSettings = t.pageSettings,
                    n.data.theoremInfo = t.theoremInfo,
                    DocumentActions.saveAndIgnore(e, n.data);
            }).then(() => {
                n();
            });
        }
        renderAddNewDirectory() {
            return React.createElement(modalDialog, {
                show: true
            },
                React.createElement(DocumentNameInputBox, {
                    documentNames: [],
                    onOk: this.handleAddNewDirectoryOk,
                    onClose: this.handleCommonClose,
                    label: "Please enter name for new Directory",
                    show: true
                }));
        }
        renderDuplicateAction() {
            var e = this.props.actionInfo;
            return React.createElement(modalDialog, {
                show: true
            },
                React.createElement(DocumentNameInputBox, {
                    documentNames: [],
                    onOk: this.handleDuplicateDocument,
                    onClose: this.handleCommonClose,
                    label: 'Copy from "'.concat(e.name, '" ,please enter name for new Document'),
                    show: true
                }));
        }
        render() {
            var e = this.props.actionInfo;
            if (!e) {
                return React.createElement("div", null);
            }
            switch (e.type) {
                case "delete":
                    return this.renderDeleteAction();
                case "newDocument":
                    return this.renderAddNewDocument();
                case "newDirectory":
                    return this.renderAddNewDirectory();
                case "duplicate":
                    return this.renderDuplicateAction();
            }
        }
    });
var Va = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    background: "#f7f7f7",
    fontSize: 13,
    color: "#565555",
    border: "2px solid #4CAF50"
};
var pi = new class {
    constructor() {
        this.collapsedToggleActions = [];
        this.lastSideBarWidth = null;
        this.isLoggedIn = false;
        this.submitSettings = () => {
            if (this.isLoggedIn) {
                if (this.collapsedToggleActions.length > 0) {
                    DocumentActions.notifyTreeInfo(this.collapsedToggleActions);
                    this.collapsedToggleActions = [];
                }
                if (this.lastSideBarWidth) {
                    DocumentActions.setSidebarWidthSettings(this.lastSideBarWidth);
                    this.lastSideBarWidth = null;
                }
            }
        };
        setInterval(this.submitSettings, 2E3);
    }
    setIsLoggedIn(e) {
        this.isLoggedIn = e;
    }
    addCollapsedToggleAction(e) {
        if (this.isLoggedIn) {
            this.collapsedToggleActions.push(e);
        }
    }
    setSidebarWidth(e) {
        if (this.isLoggedIn) {
            this.lastSideBarWidth = e;
        }
    }
};
var Pi = new class {
    traverseResources(e, t) {
        (e.lines || []).forEach((e) => {
            (e.blocks || []).forEach((e) => {
                if ("composite" == e.type) {
                    if (!("\\image-container" != e.text && "\\inline-image" != e.text)) {
                        t({
                            block: e,
                            type: "image"
                        });
                    }
                    var n = e.elements || {};
                    var r;
                    for (r in n) {
                        if (n.hasOwnProperty(r)) {
                            this.traverseResources(n[r], t);
                        }
                    }
                    if ("\\diagram" == e.text) {
                        e.shapes.forEach((e) => {
                            this.traverseShape(e, t);
                        });
                    }
                }
            });
        });
    }
    traverseShape(e, t) {
        if (this.isDiagramCompositeShapeId(e.id) && "image" == e.type) {
            t({
                block: e.data,
                type: "image"
            });
        }
        if (this.isDiagramGroupId(e.id)) {
            e.entities.forEach((e) => {
                return this.traverseShape(e, t);
            });
        }
    }
    isDiagramGroupId(e) {
        return 0 == (e || "").indexOf("dg");
    }
    isDiagramCompositeShapeId(e) {
        return 0 == (e || "").indexOf("dp");
    }
};
var _i = new class {
    handle(e) {
        var t = [];
        e.documents.forEach((e) => {
            var n = JSON.parse(e.data);
            this.scanAndReplaceResource(n, t);
            e.data = JSON.stringify(n);
        });
        var n = [];
        var r = null;
        return Promise.map(t, (e) => {
            return DocumentDownloader.download(e.originalLink).then((t) => {
                n.push({
                    id: e.id,
                    data: t
                });
            }).
                catch(() => {
                    r = "Some of images could not download into .mathcha file";
                });
        },
            {
                concurrency: 5
            }).then(() => {
                return {
                    tree: e.tree,
                    directories: e.directories,
                    documents: e.documents,
                    resourcesInfo: t,
                    resourcesData: n,
                    warning: r
                };
            });
    }
    downloadZipFile(e) {
        return new Promise((t, n) => {
            try {
                var r = new JSZip;
                r.file("tree.json", e.tree);
                r.file("documents.json", JSON.stringify(e.documents, null, 4));
                r.file("directories.json", JSON.stringify(e.directories, null, 4));
                r.file("resources-info.json", JSON.stringify(e.resourcesInfo, null, 4));
                var a = r.folder("resources");
                e.resourcesData.forEach((e) => {
                    a.file(e.id, e.data, {
                        binary: true
                    });
                });
                r.generateAsync({
                    type: "blob"
                }).then((e) => {
                    FileSaver.saveAs(e, "online-document(s).mathcha");
                    t();
                }).
                    catch(n);
            } catch (e) {
                n(e);
            }
        });
    }
    scanAndReplaceResource(e, t) {
        Pi.traverseResources(e, (e) => {
            if ("image" == e.type && e.block.url) {
                console.log("found:", e.block);
                var n = ImageLoader.getComponentUrlToRawUrl(e.block.url);
                var r = this.generateUUID();
                t.push({
                    id: r,
                    type: "image",
                    originalLink: n
                });
                e.block.url = "data-resources/".concat(r);
            }
        });
    }
    generateUUID() {
        return GuidGenerator.next();
    }
};
class DocumentSidebarHeader extends React.Component {
    moreOneNodeSelect() {
        return this.props.selectedNodes.length > 1;
    }
    isOneNodeSelect() {
        return 1 === this.props.selectedNodes.length;
    }
    renderMultipleSelect() {
        if (this.props.selectedNodes.length > 1) {
            var e = this.props.selectedNodes.filter((e) => {
                return e.type === TreeNodeType.Document;
            }).length;
            var t = this.props.selectedNodes.filter((e) => {
                return e.type === TreeNodeType.Directory;
            }).length;
            return React.createElement("multiple-select", {
                style: Va
            },
                React.createElement("span", {
                    style: {
                        paddingLeft: 5,
                        paddingRight: 5,
                        color: "gray"
                    }
                },
                    "Select:"), React.createElement("span", null, e), " ", React.createElement("i", {
                        style: {
                            paddingRight: 10
                        },
                        className: classNames("fa fa-file-text")
                    }), React.createElement("span", null, t), " ", React.createElement("i", {
                        style: {
                            verticalAlign: -2,
                            fontSize: 15
                        },
                        className: classNames("fa fa-folder")
                    }), React.createElement("button", {
                        className: "btn-normal",
                        onClick: this.props.onMove,
                        style: {
                            float: "right",
                            marginTop: 7,
                            marginRight: 10,
                            paddingLeft: 10,
                            paddingRight: 10
                        }
                    },
                        "Move"));
        }
    }
    renderShareButton() {
        if (MathGlobal.shareFeatureDisabled()) {
            return null;
        }
        var e = this.props.isDisable;
        return React.createElement("x-icon", {
            style: {
                verticalAlign: -2,
                paddingLeft: 4
            },
            class: classNames({
                disabled: e || !this.isOneNodeSelect()
            }),
            onClick: e || !this.isOneNodeSelect() ? null : this.props.onShare
        },
            React.createElement("i", {
                title: "Share",
                className: classNames("fa fa-share-alt"),
                "aria-hidden": "true"
            }), React.createElement("span", {
                style: {
                    fontSize: "0.8em",
                    verticalAlign: 1,
                    paddingLeft: 2
                }
            },
                "Share"));
    }
    render() {
        var e = this.props.isDisable;
        return React.createElement("document-sidebar-header", {
            class: MobileTabletClasses.addMobileTabletClssIfRequired()
        },
            DocumentIcons.addDocument(e || this.moreOneNodeSelect(), this.props.onCreate), DocumentIcons.addDirectory(e || this.moreOneNodeSelect(), this.props.onDirectoryCreate), this.renderShareButton(), React.createElement("i", {
                title: "Hide Sidebar",
                className: "fa fa-angle-double-left hide-side-bar",
                "aria-hidden": "true",
                onClick: () => {
                    return this.props.onHide();
                }
            }), this.renderMultipleSelect());
    }
}
var ii = {
    fontSize: 12,
    width: "96%",
    position: "absolute",
    display: "block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    color: "#b7b5b5"
};
var oi = {
    display: "block",
    margin: 10,
    color: "black"
};
class si {
    register(e) {
        this.instance = e;
    }
    unregister(e) {
        if (this.instance === e) {
            this.instance = null;
        }
    }
    notify() {
        if (this.instance) {
            this.instance.trigger();
        }
    }
}
class ai extends React.Component {
    loginWith(e) {
        this.props.requestSaveDocument();
        setTimeout(() => {
            LoginActions.login(e);
        },
            200);
    }
    render() {
        return this.props.show ? React.createElement("login-message", {
            style: ii
        },
            React.createElement("span", null, "Please login to add more free documents,store online and share with others"), React.createElement("login-text", {
                style: oi
            },
                "Login with"), React.createElement("login-icons", null, React.createElement(ScContainer, {
                    onMouseDown: () => {
                        return this.loginWith("twr");
                    },
                    network: "twr"
                }), React.createElement(ScContainer, {
                    onMouseDown: () => {
                        return this.loginWith("fce");
                    },
                    network: "fce"
                }), React.createElement(ScContainer, {
                    onMouseDown: () => {
                        return this.loginWith("gg");
                    },
                    network: "gg"
                }), React.createElement(ScContainer, {
                    onMouseDown: () => {
                        return this.loginWith("gh");
                    },
                    network: "gh"
                }))) : React.createElement("div", null);
    }
}
class ti extends React.Component {
    renderError() {
        return this.props.error ? React.createElement("warning-error-region", null, React.createElement("x-error", null, React.createElement("i", {
            className: "fa fa-exclamation-triangle",
            "aria-hidden": "true"
        }), this.props.error)) : null;
    }
    renderOverlay() {
        if (this.props.isLoading) {
            return React.createElement("loadable-overlay", {
                style: {
                    display: "block",
                    position: "absolute",
                    background: "white",
                    opacity: .5,
                    left: 0,
                    top: 4,
                    right: 0,
                    bottom: 0
                }
            });
        }
    }
    render() {
        var e = {
            height: 4,
            width: "100%",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            display: this.props.isLoading ? "block" : "none"
        };
        return React.createElement("loadable-area", {
            class: this.props.className
        },
            React.createElement("div", {
                className: classNames("thin-loader"),
                style: e
            }), this.renderError(), React.createElement("loadable-content-area", null, this.props.children), this.renderOverlay());
    }
}
class ResizableContainer extends React.Component {
    constructor(e) {
        super(e);
        this.movingHandler = new MovingHandler;
        this.onMoving = (e, t, n, r) => {
            var a = EventHelper.getLeftTopFromEvent(r);
            if ("top" != this.props.position) {
                this.setState({
                    indicatorStyle: {
                        position: "fixed",
                        left: a.left,
                        right: "default",
                        borderRight: "1px solid gray",
                        width: 2,
                        top: this.lastResizeIndicatorRect.top,
                        height: this.lastResizeIndicatorRect.height,
                        zIndex: 999999
                    }
                });
            } else {
                this.setState({
                    indicatorStyle: {
                        position: "fixed",
                        top: a.top,
                        borderTop: "1px solid gray",
                        left: this.lastResizeIndicatorRect.left,
                        width: this.lastResizeIndicatorRect.width,
                        height: 1,
                        zIndex: 999999
                    }
                });
            }
        };
        this.onEndMove = (e, t, n) => {
            var r = this.props.onResized;
            var a = EventHelper.getLeftTopFromEvent(n);
            this.setState({
                indicatorStyle: this.getInitIndicatorStyle(),
                inResizing: false
            });
            r(this.calculateSize(a));
        };
        this.onResizeMouseDown = (e) => {
            if (!this.props.disabled) {
                this.movingHandler.mouseDown(e);
                this.lastResizeIndicatorRect = DOMHelper.getElementRect(this.resizeIndicator);
                this.setState({
                    inResizing: true
                });
            }
        };
        this.movingHandler.setContainer(document.body);
        this.movingHandler.setBaseElement(document.body);
        this.movingHandler.onMoving = this.onMoving;
        this.movingHandler.onMoved = this.onEndMove;
        this.state = {
            indicatorStyle: this.getInitIndicatorStyle(),
            inResizing: false
        };
    }
    getInitIndicatorStyle() {
        return "top" == this.props.position ? {
            position: "absolute",
            top: -2,
            borderTop: "4px solid transparent",
            left: 0,
            right: 0,
            cursor: "ns-resize"
        } : {
                position: "absolute",
                right: -2,
                borderRight: "4px solid transparent",
                top: 0,
                bottom: 0,
                cursor: "ew-resize"
            };
    }
    calculateSize(e) {
        var t = e.left;
        var n = e.top;
        var r = this.props;
        var a = r.min;
        var i = r.max;
        var o = r.position;
        var s = ReactDOM.findDOMNode(this);
        var l = DOMHelper.getElementRect(s);
        return "top" == o ? _.clamp(l.bottom - n, a, i) : _.clamp(t - l.left, a, i);
    }
    render() {
        return React.createElement("resizable-container", {
            class: this.props.className,
            style: this.props.style
        },
            this.props.children, React.createElement("resize-indicator", {
                style: _.assignIn({},
                    this.state.indicatorStyle, {
                    display: this.props.disabled ? "none" : void 0
                }),
                ref: (e) => {
                    return this.resizeIndicator = e;
                },
                onMouseDown: this.onResizeMouseDown
            }), React.createElement("resize-overlay", {
                style: _.assignIn({},
                    {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999999,
                        background: "transparent"
                    },
                    {
                        display: this.state.inResizing ? "block" : "none"
                    })
            }));
    }
}
class ei extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            height: 160,
            show: true
        };
        this.onResize = (e) => {
            this.setState({
                height: e
            });
        };
    }
    componentWillUpdate(e) {
        if (e.tree != this.props.tree) {
            var t = DocumentTreeHelper.countAllItem(e.tree);
            this.setState({
                height: _.clamp(23 * t + 20, 160, 500)
            });
        }
    }
    render() {
        return React.createElement(ResizableContainer, {
            style: {
                height: this.state.show ? this.state.height : "auto",
                flexShrink: 0
            },
            disabled: !this.state.show,
            show: true,
            min: 50,
            max: 500,
            position: "top",
            onResized: this.onResize
        },
            React.createElement(ShareView, Object.assign({},
                this.props, {
                show: this.state.show,
                onShow: () => {
                    return this.setState({
                        show: true
                    });
                },
                onHide: () => {
                    return this.setState({
                        show: false
                    });
                }
            })));
    }
}
class ja extends React.Component {
    constructor() {
        super(...arguments);
        this.handleOnClick = () => {
            if (this.props.show) {
                this.props.onHide();
            } else {
                this.props.onShow();
            }
        };
    }
    render() {
        var e = classNames("fa hide-share", this.props.show ? "fa-angle-double-down" : "fa-angle-double-up");
        return React.createElement("share-view-header", {
            class: MobileTabletClasses.addMobileTabletClssIfRequired()
        },
            "Shared by Others", React.createElement("i", {
                className: e,
                "aria-hidden": "true",
                onClick: this.handleOnClick
            }));
    }
}
class ShareView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedNodes: []
        };
        this.handleSelectNodes = (e) => {
            this.setState({
                selectedNodes: e
            });
            this.props.onSelectNodes(e);
        };
    }
    render() {
        return React.createElement("share-view", null, React.createElement(ja, {
            show: this.props.show,
            onHide: this.props.onHide,
            onShow: this.props.onShow
        }), React.createElement("share-view-content", {
            style: {
                display: this.props.show ? void 0 : "none"
            }
        },
            React.createElement(DocumentsArea, {
                tree: this.props.tree || {},
                dragDropDisabled: true,
                initAllExpanded: true,
                showUserInfo: true,
                showAction: true,
                selectedNodes: this.props.shareViewSelectedNodes,
                onNodeSelect: this.handleSelectNodes,
                openedDocumentId: this.props.openedDocumentId,
                onRequestMove: () => { },
                onRequestDocumentOpen: this.props.onRequestDocumentOpen
            })));
    }
}
class DocumentSidebar extends React.Component {
    constructor() {
        super(...arguments);
        this.iconDropDownTrigger = new si;
    }
    renderShareView() {
        return MathGlobal.shareFeatureDisabled() ? null : React.createElement(ei, {
            tree: this.props.sharedTree,
            onSelectNodes: this.props.onShareViewNodeSelect,
            shareViewSelectedNodes: this.props.shareViewSelectedNodes,
            openedDocumentId: this.props.openedDocumentId,
            onRequestDocumentOpen: (e) => {
                return this.props.onRequestDocumentOpen(e);
            }
        });
    }
    renderLoginInfo() {
        if (!MathGlobal.accountFeatureDisabled()) {
            var e = this.props.isAnonymous;
            return React.createElement(ai, {
                show: e,
                requestSaveDocument: this.props.onRequestSaveDocument
            });
        }
    }
    render() {
        var e = this.props;
        var t = e.tree;
        var n = e.isTreeLoading;
        var r = e.treeLoadError;
        var a = e.selectedNodes;
        var i = e.openedDocumentId;
        var o = e.isHeaderDisable;
        return React.createElement("document-sidebar", null, React.createElement(DocumentSidebarHeader, {
            onMove: this.props.onMove,
            onShare: this.props.onRequestShare,
            onCreate: this.props.onDocumentCreate,
            onDirectoryCreate: this.props.onDirectoryCreate,
            onHide: this.props.onHide,
            isDisable: o,
            selectedNodes: a
        }), React.createElement(ti, {
            className: "documents-area",
            isLoading: n,
            error: r
        },
            React.createElement(DocumentsArea, {
                iconDropDownTrigger: this.iconDropDownTrigger,
                tree: t,
                onExpandToggle: this.props.onExpandToggle,
                disableAction: this.props.isHeaderDisable,
                selectedNodes: a,
                onRequestShare: this.props.onRequestShare,
                onRequestAddDocument: this.props.onRequestAddDocument,
                onRequestAddDirectory: this.props.onRequestAddDirectory,
                openedDocumentId: i,
                onRequestRename: this.props.onRename,
                onNodeSelect: this.props.onNodeSelect,
                onRequestMove: this.props.onRequestMove,
                onRequestDocumentOpen: (e) => {
                    return this.props.onRequestDocumentOpen(e);
                },
                onRequestDelete: this.props.onDocumentDelete,
                onRequestDuplicateDocument: this.props.onDocumentDuplicate,
                onRequestOpenMove: this.props.onMove,
                onRequestSaveAsZip: this.props.onRequestSaveAsZip
            }), this.renderLoginInfo()), this.renderShareView());
    }
}
class MainSideBar extends React.Component {
    render() {
        return React.createElement(ResizableContainer, {
            min: 180,
            max: 700,
            className: "main-side-bar",
            position: "right",
            onResized: this.props.onResize
        },
            React.createElement(DocumentSidebar, Object.assign({},
                this.props)));
    }
}
/// var Ei = n(749)/*toArray*/;  // 1 times
/// var vi = n.n(Ei);
var Si = new class {
    fromTreeNodes(e) {
        if (0 === e.length) {
            return "(Nothing)";
        }
        if (1 === e.length) {
            var t = this.getNodeTypeName(e[0].type);
            return "".concat(t, ":").concat(this.ellipseIfToLong(e[0].name));
        }
        var n = toArray(e);
        var r = n[0];
        var a = n.slice(1);
        var i = a.filter((e) => {
            return e.type === TreeNodeType.Directory;
        }).length;
        var o = a.filter((e) => {
            return e.type === TreeNodeType.Document;
        }).length;
        var s = this.getNodeTypeName(r.type);
        var l = i > 0 ? "and ".concat(this.buildCountStr(i, "directories", "a directory")) : "";
        var c = o > 0 ? "and ".concat(this.buildCountStr(o, "documents", "a document")) : "";
        return ["".concat(s, ":").concat(this.ellipseIfToLong(r.name)), l, c].filter((e) => {
            return e;
        }).join(",");
    }
    buildNamedNodeInfo(e, t) {
        return t.map((t) => {
            if (t.type === TreeNodeType.Directory) {
                var n = DocumentTreeHelper.findDirectory(e, t.id);
                return _.assignIn({},
                    t, {
                    name: n.name
                });
            }
            if (t.type === TreeNodeType.Document) {
                var r = DocumentTreeHelper.findDocument(e, t.id);
                return _.assignIn({},
                    t, {
                    name: r.name
                });
            }
        });
    }
    buildCountStr(e, t, n) {
        switch (e) {
            case 0:
                return "";
            case 1:
                return n;
            default:
                return "".concat(e, " ").concat(t);
        }
    }
    getNodeTypeName(e) {
        return e === TreeNodeType.Directory ? "Directory" : "Document";
    }
    ellipseIfToLong(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 40;
        return e ? e.length > t ? "".concat(e.substr(0, t), "...") : e : "(Nothing)";
    }
};
class Ti extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    buildDirectoryTree() {
        return {
            id: null,
            directories: [{
                name: "Root",
                id: "RootId",
                directories: this.props.tree.directories.map((e) => {
                    return this.buildDirectory(e);
                })
            }]
        };
    }
    buildDirectory(e) {
        return _.assignIn({},
            e, {
            documents: [],
            directories: e.directories.map((e) => {
                return this.buildDirectory(e);
            })
        });
    }
    render() {
        var e = DocumentTreeHelper.getBlackListForMovingTo(this.props.tree, this.props.sourceNodes);
        return e.some((e) => {
            return null == e.id;
        }) && e.push({
            id: "RootId",
            type: TreeNodeType.Directory
        }),
            React.createElement("div", {
                style: bi
            },
                React.createElement(DocumentsArea, {
                    initAllExpanded: true,
                    showAction: true,
                    disableNodes: e,
                    dragDropDisabled: true,
                    tree: this.buildDirectoryTree(),
                    selectedNodes: this.props.selectedNodes,
                    openedDocumentId: null,
                    onNodeSelect: this.props.onSelect,
                    onRequestMove: () => { },
                    onRequestDocumentOpen: () => { }
                }));
    }
}
var bi = {
    width: "100%",
    overflow: "auto",
    border: "1px solid lightgray",
    marginBottom: 5,
    flexGrow: 1
};
var Li = ModalDialogHelper.getModalDialog();
class Ri extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedNodes: []
        };
        this.onOk = () => {
            var e = this.state.selectedNodes[0].id;
            e = "RootId" == e ? null : e;
            this.props.onOk(e);
            this.setState({
                selectedNodes: []
            });
        };
        this.onCancel = () => {
            this.props.onClose();
            this.setState({
                selectedNodes: []
            });
        };
        this.handleSelect = (e) => {
            this.setState({
                selectedNodes: e
            });
        };
    }
    renderMessageArea() {
        var e = this.props;
        var t = e.tree;
        var n = e.sourceNodes;
        var r = Si.buildNamedNodeInfo(t, n);
        var a = Si.fromTreeNodes(r);
        return React.createElement("x-message", {
            style: wi
        },
            "Moving ", React.createElement("b", null, '"', a, '"'), ",please select Directory");
    }
    render() {
        return this.props.show ? React.createElement("div", null, React.createElement(Li, {
            show: true
        },
            React.createElement(ModalDialogContainer, {
                style: {
                    width: 400,
                    minHeight: 300,
                    maxHeight: "calc(100%-200px)",
                    maxWidth: " calc(100%-20px)"
                },
                message: "",
                isProgressing: false,
                isOkDisabled: this.state.selectedNodes.length <= 0,
                onOk: this.onOk,
                onCancel: this.onCancel,
                show: true
            },
                React.createElement("content", {
                    style: Mi
                },
                    this.renderMessageArea(), React.createElement(Ti, {
                        sourceNodes: this.props.sourceNodes,
                        tree: this.props.tree,
                        selectedNodes: this.state.selectedNodes,
                        onSelect: this.handleSelect
                    }))))) : React.createElement("div", null);
    }
}
var Mi = {
    display: "flex",
    flexDirection: "column",
    width: "100%"
};
var wi = {
    padding: 5
};
class ZipExportDialog extends React.Component {
    renderMessage() {
        return this.props.info.errorMessage ? React.createElement("span", {
            style: {
                color: "#ce0303"
            }
        },
            "Error on generating .mathcha file,please notify team@mathcha.io") : this.props.info.warningMessage ? React.createElement("span", {
                style: {
                    color: "orange"
                }
            },
                "Warning:", this.props.info.warningMessage) : React.createElement("span", null, "Process and Downloading .mathcha file...");
    }
    render() {
        return React.createElement(ModalDialogContainer, {
            message: null,
            isProgressing: !this.props.info.errorMessage && !this.props.info.warningMessage,
            isOkDisabled: false,
            onOk: this.props.onClose,
            onCancel: this.props.onClose,
            okStyle: {
                display: "none"
            },
            show: true,
            footerStyle: {
                justifyContent: "center",
                paddingTop: 15
            },
            preventDisableButtonOnProgressing: true
        },
            React.createElement("div", {
                style: {
                    padding: 10,
                    fontSize: 14,
                    textAlign: "center",
                    flexGrow: 1
                }
            },
                this.renderMessage()));
    }
}
class DocumentSidebarContainerComponent extends React.Component {
    constructor(e) {
        super(e);
        this.onCreateDocument = () => {
            this.setState({
                dialogActionInfo: {
                    type: "newDocument",
                    directoryId: this.getSelectedDirectoryId()
                }
            });
        };
        this.onCreateDirectory = () => {
            this.setState({
                dialogActionInfo: {
                    type: "newDirectory",
                    directoryId: this.getSelectedDirectoryId()
                }
            });
        };
        this.onDeleteDocument = () => {
            this.setState({
                dialogActionInfo: {
                    type: "delete",
                    selectedNodes: this.state.selectedNodes
                }
            });
        };
        this.onDuplicateDocument = () => {
            var e = this.state.selectedNodes[0].id;
            var t = DocumentTreeHelper.findDocument(this.props.tree, e);
            var n = DocumentTreeHelper.parentOf(this.props.tree, {
                id: e,
                type: TreeNodeType.Document
            });
            this.setState({
                dialogActionInfo: {
                    type: "duplicate",
                    id: e,
                    name: t.name,
                    directoryId: n ? n.id : null
                }
            });
        };
        this.onRename = () => {
            var e = this.state.selectedNodes[0];
            if (e) {
                this.props.requestNodeRename(e.id, e.type);
            }
        };
        this.onHide = () => {
            this.props.showSideBar(false);
        };
        this.onShow = () => {
            this.props.showSideBar(true);
        };
        this.handleNodeSelect = (e) => {
            this.setState({
                selectedNodes: e,
                shareViewSelectedNodes: []
            });
        };
        this.handleShareViewNodeSelect = (e) => {
            this.setState({
                shareViewSelectedNodes: e,
                selectedNodes: []
            });
        };
        this.handleRequestOpenDocument = (e) => {
            this.setState({
                requestingOpenDocumentId: e
            });
            this.props.requestEditingDocument(e);
        };
        this.onActionDialogClose = (e, t) => {
            if ("delete" == e.type) {
                this.setState({
                    selectedNodes: DocumentTreeHelper.ensureInTree(t, this.state.selectedNodes)
                });
            }
            this.setState({
                dialogActionInfo: null
            });
        };
        this.handleRequestMove = (e, t) => {
            console.log(e, t);
            this.moveNodesTo(e, t);
        };
        this.handleResize = (e) => {
            this.props.setSideBarWidth(e);
        };
        this.handleMove = () => {
            this.setState({
                directorySelectShow: true
            });
        };
        this.handleMoveSelected = (e) => {
            this.moveNodesTo(this.state.selectedNodes, e);
            this.setState({
                directorySelectShow: false
            });
        };
        this.handleRequestShare = () => {
            var e = this.state.selectedNodes[0];
            if (e) {
                this.props.customDocuments((t) => {
                    return _.assignIn({},
                        t, {
                        shareRequestInfo: {
                            id: e.id,
                            type: e.type
                        }
                    });
                });
            }
        };
        this.handleRequestSaveAsZip = () => {
            var e = this.state.selectedNodes[0];
            if (MathGlobal.isElectronEnv()) {
                Api.Post("/api/request-save-as-zip", {
                    nodes: [e]
                });
                console.log(e);
            } else {
                this.setState({
                    showExportZipProgressing: {
                        errorMessage: null
                    }
                });
                Api.Post("/api/export/zip", {
                    nodes: [e]
                }).then((e) => {
                    return e.json();
                }).then((x) => {
                    var e = x.JSON || x;
                    return _i.handle(e);
                }).then((e) => {
                    debugger;
                    return _i.downloadZipFile(e).then(() => {
                        return e;
                    });
                }).then((e) => {
                    debugger;
                    if (e.warning) {
                        this.setState({
                            showExportZipProgressing: {
                                warningMessage: e.warning
                            }
                        });
                    } else {
                        this.setState({
                            showExportZipProgressing: null
                        });
                    }
                }).
                    catch((e) => {
                        var t = e || {
                            message: "Unknown Error"
                        };
                        console.log(t);
                        this.setState({
                            showExportZipProgressing: {
                                errorMessage: t.message
                            }
                        });
                    });
            }
        };
        this.handleExpandToggle = (e, t) => {
            var n = DocumentTreeHelper.updateTree(this.props.tree, null, (n) => {
                return n.id != e ? null : _.assignIn({},
                    n, {
                    collapsed: t
                });
            });
            this.raiseNewTree(n);
            pi.addCollapsedToggleAction({
                id: e,
                collapsed: t
            });
        };
        this.state = {
            isTreeLoading: true,
            selectedNodes: [],
            shareViewSelectedNodes: [],
            requestingOpenDocumentId: null
        };
    }
    getSelectedDirectoryId() {
        var e = this.state.selectedNodes;
        if (e.length <= 0) {
            return null;
        }
        var t = e[0];
        if (t.type === TreeNodeType.Directory) {
            return t.id;
        }
        var n = DocumentTreeHelper.parentOf(this.props.tree, t);
        return n ? n.id : null;
    }
    componentWillReceiveProps(e) {
        if (!(e.activeDocumentId === this.props.activeDocumentId && e.activeDocumentError === this.props.activeDocumentError)) {
            this.setState({
                requestingOpenDocumentId: null
            });
        }
    }
    componentDidMount() {
        this.fetchInit();
        this.fetchActiveDocument();
    }
    fetchActiveDocument() {
        var e = DocumentFt.getPassedSharedLink();
        DocumentWi.fetch(e).then((e) => {
            if ("shared-not-available" == e.status) {
                this.props.setActiveDocumentError("Shared link is not available");
                return this.props.stopLoadingDocument();
            } else {
                if ("not-found-in-shared-dir" == e.status) {
                    this.props.setActiveDocumentError("There is no document in this shared Directory");
                    return this.props.stopLoadingDocument();
                } else {
                    if ("not-found" != e.status) {
                        if ("found-document" == e.status) {
                            this.props.stopLoadingDocument();
                            return this.props.setActiveDocument(e.documentResponse);
                        } else {
                            return void 0;
                        }
                    } else {
                        return this.props.stopLoadingDocument();
                    }
                }
            }
        }).
            catch((e) => {
                this.props.stopLoadingDocument();
                if (e && e.isManaged) {
                    this.props.setActiveDocumentError(e.message);
                } else {
                    this.props.setActiveDocumentError("Error while loading First Document");
                }
                ConsoleLog.info(e);
            });
    }
    initComplete(e) {
        this.props.customUser((t) => {
            return _.assignIn({},
                t, {
                isAnonymous: e.user.isAnonymous,
                isFirstLogin: e.user.isFirstLogin,
                displayName: e.user.displayName,
                userNetworkType: e.user.userNetworkType,
                settings: e.user.settings
            });
        });
        this.props.setInitialized();
        this.props.onInitCompleted();
    }
    raiseNewTree(e, t) {
        this.props.customDocuments((n) => {
            return _.assignIn({},
                n, {
                tree: e,
                sharedTree: t || n.sharedTree
            });
        });
    }
    fetchInit() {
        var e = DocumentFt.getPassedSharedLink();
        DocumentActions.fetchInit(e).then((t) => {
            return ReactDOM.unstable_batchedUpdates(() => {
                if (t.isFirstLoginAndNoDocument) {
                    var n = DocumentActions.handleFirstUserLogin(t.tree);
                    if (!e) {
                        TimerHelper.next(() => {
                            this.props.requestEditingDocument(n);
                        });
                    }
                }
                this.raiseNewTree(t.tree, t.sharedTree);
                var r = t.tree.documents[0] && t.tree.documents[0].id;
                if (r) {
                    this.setState({
                        selectedNodes: [{
                            id: r,
                            type: TreeNodeType.Document
                        }]
                    });
                }
                if (t.user.settings.sidebarWidth) {
                    this.props.setSideBarWidth(t.user.settings.sidebarWidth);
                }
                if (this.props.onMaintainInfo && t.maintainInfo) {
                    this.props.onMaintainInfo(_.assignIn({},
                        t.maintainInfo));
                }
                Promise.resolve().then(() => {
                    return this.initComplete(t),
                        null;
                });
            }),
                null;
        }).
            catch((e) => {
                console.error(e);
                this.props.setActiveDocumentError("Connection error,could not load document");
                this.setState({
                    treeLoadError: "Connection error,could not load documents"
                });
            }).
            finally(() => {
                this.setState({
                    isTreeLoading: false
                });
            });
    }
    moveNodesTo(e, t) {
        this.setState({
            isTreeLoading: true
        });
        DocumentActions.move(e, t).then((x) => {
            var e = x.JSON || x;
            var t = DocumentTreeHelper.constructTree(this.props.tree, e);
            this.raiseNewTree(t);
        }).
            catch((e) => {
                var t = e.message;
                this.setState({
                    treeLoadError: t
                });
            }).
            finally(() => {
                return this.setState({
                    isTreeLoading: false
                });
            });
    }
    renderNetworkChecking() {
        return MathGlobal.isOfflineMode() ? null : React.createElement(OfflineController, null);
    }
    renderZipExporting() {
        if (this.state.showExportZipProgressing) {
            return React.createElement(ZipExportDialog, {
                onClose: () => {
                    return this.setState({
                        showExportZipProgressing: null
                    });
                },
                info: this.state.showExportZipProgressing
            });
        }
    }
    render() {
        var e = this.props;
        var t = e.tree;
        var n = e.activeDocumentId;
        var r = e.isSideBarShown;
        var a = {
            width: this.props.sidebarWidth,
            minWidth: MathGlobal.isMobileOrTablet() ? 300 : void 0,
            display: r ? void 0 : "none"
        };
        return React.createElement("document-sidebar-container", {
            class: "document-sidebar-container"
        },
            React.createElement("document-sidebar-expanded", {
                style: a
            },
                React.createElement(MainSideBar, {
                    onExpandToggle: this.handleExpandToggle,
                    isAnonymous: this.props.user.isAnonymous && !this.state.isTreeLoading,
                    onRequestSaveDocument: this.props.requestSaveDocument,
                    show: this.props.isSideBarShown,
                    onRequestShare: this.handleRequestShare,
                    onRequestAddDocument: this.onCreateDocument,
                    onRequestAddDirectory: this.onCreateDirectory,
                    onMove: this.handleMove,
                    onResize: this.handleResize,
                    onRequestMove: this.handleRequestMove,
                    onRequestDocumentOpen: this.handleRequestOpenDocument,
                    onNodeSelect: this.handleNodeSelect,
                    onShareViewNodeSelect: this.handleShareViewNodeSelect,
                    selectedNodes: this.state.selectedNodes,
                    shareViewSelectedNodes: this.state.shareViewSelectedNodes,
                    openedDocumentId: this.state.requestingOpenDocumentId || n,
                    treeLoadError: this.state.treeLoadError,
                    isTreeLoading: this.state.isTreeLoading,
                    tree: t,
                    sharedTree: this.props.sharedTree,
                    onDocumentCreate: this.onCreateDocument,
                    onDirectoryCreate: this.onCreateDirectory,
                    onDocumentDelete: this.onDeleteDocument,
                    onDocumentDuplicate: this.onDuplicateDocument,
                    onRename: this.onRename,
                    isHeaderDisable: !!(this.state.isTreeLoading || this.state.treeLoadError || this.props.user.isAnonymous),
                    onHide: this.onHide,
                    onRequestSaveAsZip: this.handleRequestSaveAsZip
                })), React.createElement("document-sidebar-collapsed", {
                    class: MobileTabletClasses.addMobileTabletClssIfRequired(),
                    style: {
                        display: r ? "none" : void 0
                    },
                    onClick: () => {
                        return this.onShow();
                    }
                },
                    React.createElement("i", {
                        title: "Show Sidebar",
                        className: "fa fa-angle-double-right",
                        "aria-hidden": "true"
                    })), React.createElement(xi, {
                        actionInfo: this.state.dialogActionInfo,
                        onClose: this.onActionDialogClose
                    }), React.createElement(Ri, {
                        sourceNodes: this.state.selectedNodes,
                        onOk: this.handleMoveSelected,
                        onClose: () => {
                            return this.setState({
                                directorySelectShow: false
                            });
                        },
                        show: this.state.directorySelectShow,
                        tree: this.props.tree
                    }), this.renderNetworkChecking(), this.renderZipExporting());
    }
}
var mapStateToProps = (e) => {
    return {
        tree: PageStates.tree(e),
        sharedTree: PageStates.sharedTree(e),
        activeDocumentId: PageStates.activeDocumentId(e),
        activeDocumentError: PageStates.activeDocumentError(e),
        isSideBarShown: PageStates.isSideBarShown(e),
        sidebarWidth: PageStates.sidebarWidth(e),
        user: PageStates.user(e)
    };
};
var mapDispatchToProps = {
    requestSaveStatus: PageDispatches.requestSaveStatus,
    setLoadingDocumentsError: PageDispatches.setLoadingDocumentsError,
    stopLoadingDocument: PageDispatches.stopLoadingDocument,
    setActiveDocumentError: PageDispatches.setActiveDocumentError,
    setActiveDocument: PageDispatches.setActiveDocument,
    customDocuments: PageDispatches.customDocuments,
    requestEditingDocument: PageDispatches.requestEditingDocument,
    setInitialized: PageDispatches.setInitialized,
    customUser: PageDispatches.customUser,
    requestNodeRename: PageDispatches.requestNodeRename,
    setSideBarWidth: PageDispatches.setSideBarWidth,
    showSideBar: PageDispatches.showSideBar,
    requestSaveDocument: PageDispatches.requestSaveDocument
};
var DocumentSidebarContainer = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
})(DocumentSidebarContainerComponent);
/*n.d(t, "a", function () {
    return DocumentSidebarContainer;
});*/

export default DocumentSidebarContainer