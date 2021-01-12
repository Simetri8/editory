import _ from 'lodash';
import { setImmediate } from 'timers-browserify';
import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentDragData from './DocumentDragData';
import DocumentIcons from '../Editor/DocumentIcons';
import DocumentTreeHelper from './DocumentTreeHelper';
import DOMHelper from '../Elements/DOMHelper';
import IconDropdown from '../Editor/IconDropdown';
import MathGlobal from '../MathGlobal';
import NodeDirectory from './NodeDirectory';
import NodeDocument from './NodeDocument';
import NodeDragIn from './NodeDragIn';
import TimerHelper from '../Mathcha/TimerHelper';
import TreeNodeType from './TreeNodeType';

/// xxx(247) /*DocumentsArea*/

/// e = n(296)/*timers-browserify*/.setImmediate;  // 1 times
/*n.d(t, "a", function () {
    return x;
});*/
/// var r = n(0)/*React*/;  // 7 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 2 times
/// var o = n.n(i);
/// var s = n(14)/*classnames*/;  // 1 times
/// var l = n.n(s);
/// var c = (n(1435), n(747)/*NodeDirectory*/);  // 1 times
/// var d = n(457)/*NodeDocument*/;  // 1 times
/// var h = n(464)/*NodeDragIn*/;  // 1 times
/// var u = n(16)/*ReactDOM*/;  // 2 times
/// var p = n(4)/*DOMHelper*/;  // 1 times
/// var m = n(748)/*IconDropdown*/;  // 1 times
/// var f = n(257)/*DocumentIcons*/;  // 2 times
/// var g = n(5)/*sizzle*/;  // 1 times
/// var y = n.n(g);
/// var A = n(68)/*DocumentTreeHelper*/;  // 2 times
/// var E = n(458)/*DocumentDragData*/;  // 1 times
/// var v = n(28)/*MathGlobal*/;  // 2 times
/// var S = n(40)/*TreeNodeType*/;  // 2 times
/// var C = n(19)/*TimerHelper*/;  // 1 times
class x extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.handleOptionsSelect = (e) => {
            switch (e) {
            case "move":
                this.props.onRequestOpenMove();
                break;
            case "duplicate-document":
                this.props.onRequestDuplicateDocument();
                break;
            case "delete":
                this.props.onRequestDelete();
                break;
            case "rename":
                this.props.onRequestRename();
                break;
            case "add-document":
                this.props.onRequestAddDocument();
                break;
            case "add-directory":
                this.props.onRequestAddDirectory();
                break;
            case "share":
                this.props.onRequestShare();
                break;
            case "open":
                this.handleRequestOpen(this.props.selectedNodes[0].id);
                break;
            case "save-as-zip":
                this.props.onRequestSaveAsZip();
            }
        };
        this.handleNodeSelect = (e, t, n, r) => {
            if (this.props.onNodeSelect) {
                if (r && this.props.iconDropDownTrigger) {
                    return this.lastSelect = {
                        id: e,
                        type: t
                    },
                    this.props.onNodeSelect([{
                        id: e,
                        type: t
                    }]),
                    void TimerHelper.waitABit(() => {
                        this.props.iconDropDownTrigger.notify();
                    });
                }
                if ("list" != n) {
                    if (this.lastSelect = {
                        id: e,
                        type: t
                    },
                    n) {
                        var a = this.props.selectedNodes;
                        if ("multiple" == n) {
                            if (a.some((n) => {
                                return n.id === e && n.type === t;
                            })) {
                                return void this.props.onNodeSelect(a.filter((n) => {
                                    return n.id != e || n.type != t;
                                }));
                            }
                            this.props.onNodeSelect(a.concat([{
                                id: e,
                                type: t
                            }]));
                        }
                    } else {
                        this.props.onNodeSelect([{
                            id: e,
                            type: t
                        }]);
                    }
                } else {
                    if (!this.lastSelect || !this.props.selectedNodes.some((e) => {
                        return e.id === this.lastSelect.id && e.type === this.lastSelect.type;
                    })) {
                        return void(this.lastSelect = null);
                    }
                    var i = DocumentTreeHelper.getNodesRange(this.props.tree, this.lastSelect, {
                        id: e,
                        type: t
                    });
                    this.props.onNodeSelect(i);
                }
            }
        };
        this.handleRequestOpen = (e) => {
            this.props.onRequestDocumentOpen(e);
        };
        this.handleMoveTo = (e) => {
            if (this.state.inDragState) {
                this.setState({
                    inDragState: false
                });
            }
            if (0 != this.props.selectedNodes.length) {
                console.log("drop to", this.props.selectedNodes);
                this.props.onRequestMove(this.props.selectedNodes, e);
            }
        };
        this.handleDragStart = (t) => {
            t.dataTransfer.effectAllowed = "move";
            t.dataTransfer.setData("text", "a");
            setImmediate(() => {
                var e = this.props.selectedNodes;
                var t = DocumentTreeHelper.getBlackListForMovingTo(this.props.tree, e);
                DocumentDragData.setDragData({
                    selectedNodes: e,
                    blackListNodes: t
                });
                this.setState({
                    inDragState: true
                });
                console.log("drag started");
            });
        };
        this.handleDragEnd = () => {
            this.setState({
                inDragState: false
            });
        };
    }
    getChildContext() {
        return {
            tree: this.props.tree
        };
    }
    componentDidUpdate() {
        if (!this.props.showAction) {
            if (1 != this.props.selectedNodes.length || this.state.inDragState) {
                ReactDOM.unmountComponentAtNode(this.optionSelectPlaceholder);
            } else {
                var e = this.props.selectedNodes[0];
                var t = {
                    position: "absolute",
                    right: 0,
                    top: DOMHelper.findRectElementToElement(jQuery("#tn-".concat(e.id)).get(0), this.documentTreeElement).top,
                    zIndex: 9999999
                };
                var n = e.type === TreeNodeType.Document ? I : T;
                ReactDOM.render(React.createElement(IconDropdown, {
                    iconDropDownTrigger: this.props.iconDropDownTrigger,
                    disabledItems: [0 === this.props.tree.directories.length ? "move" : ""],
                    disabled: this.props.disableAction,
                    style: t,
                    actionItems: n,
                    onSelect: this.handleOptionsSelect
                }), this.optionSelectPlaceholder);
            }
        }
    }
    renderDirectories() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return _.chain(e).sortBy((e) => {
            return e.name.toLowerCase();
        }).map((e) => {
            return React.createElement(NodeDirectory, {
                inDragState: this.state.inDragState,
                onDragStart: this.handleDragStart,
                onDragEnd: this.handleDragEnd,
                initAllExpanded: this.props.initAllExpanded,
                showUserInfo: this.props.showUserInfo,
                disableNodes: this.props.disableNodes || [],
                isDisabled: false,
                dragDropDisabled: this.props.dragDropDisabled,
                onMoveTo: this.handleMoveTo,
                requestOpen: this.handleRequestOpen,
                onCollapseToggle: this.props.onExpandToggle,
                openedDocumentId: this.props.openedDocumentId,
                key: e.id,
                onSelect: this.handleNodeSelect,
                directory: e,
                level: 0,
                selectedNodes: this.props.selectedNodes
            });
        }).value();
    }
    renderDocuments() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return _.chain(e).sortBy((e) => {
            return e.name.toLowerCase();
        }).map((e) => {
            return React.createElement(NodeDocument, {
                inDragState: this.state.inDragState,
                onDragStart: this.handleDragStart,
                onDragEnd: this.handleDragEnd,
                showUserInfo: this.props.showUserInfo,
                disableNodes: this.props.disableNodes || [],
                isDisabled: false,
                dragDropDisabled: this.props.dragDropDisabled,
                requestOpen: this.handleRequestOpen,
                openedDocumentId: this.props.openedDocumentId,
                key: e.id,
                onSelect: this.handleNodeSelect,
                document: e,
                level: 0,
                isSelected: this.props.selectedNodes.some((t) => {
                    return t.id === e.id && t.type === TreeNodeType.Document;
                })
            });
        }).value();
    }
    render() {
        var e = this.props;
        var t = e.tree;
        var n = e.className;
        var r = e.dragDropDisabled;
        var i = classNames(n, {
            active: !this.state.inDragState,
            "mobile-tablet": MathGlobal.isMobileOrTablet()
        });
        return React.createElement(NodeDragIn, {
            style: {
                height: "100%"
            },
            id: null,
            disabled: r,
            onDrop: this.handleMoveTo
        },
        React.createElement("document-tree", {
            class: i,
            ref: (e) => {
                return this.documentTreeElement = e;
            }
        },
        this.renderDirectories(t.directories), this.renderDocuments(t.documents), React.createElement("option-select-placeholder", {
            ref: (e) => {
                return this.optionSelectPlaceholder = e;
            }
        })));
    }
}
x.childContextTypes = {
    tree: () => {}
};
var I = [{
    icon: "",
    name: "open",
    text: "Open Document"
},
{
    icon: "fa-font",
    name: "rename",
    text: "Rename Document"
},
{
    icon: "",
    name: "move",
    text: "Move Document"
},
{
    icon: "fa-share-alt",
    name: "share",
    text: "Share Document"
},
{
    name: "duplicate-document",
    icon: "fa-clone",
    text: "Duplicate Document"
},
{
    icon: "",
    name: "save-as-zip",
    text: "Save as .mathcha file"
},
{},
{
    name: "delete",
    icon: "fa-trash",
    text: "Delete Document",
    iconColor: "#bb0505"
}];
var T = [{
    icon: "fa-file",
    name: "add-document",
    text: "Add Document",
    renderIcon: () => {
        return DocumentIcons.addDocument(false, null);
    }
},
{
    icon: "fa-folder",
    name: "add-directory",
    text: "Add Directory",
    renderIcon: () => {
        return DocumentIcons.addDirectory(false, null);
    }
},
{
    icon: "fa-font",
    name: "rename",
    text: "Rename Directory"
},
{
    icon: "fa-share-alt",
    name: "share",
    text: "Share Directory"
},
{
    icon: "",
    name: "move",
    text: "Move Directory"
},
{
    icon: "",
    name: "save-as-zip",
    text: "Save as .mathcha file"
},
{},
{
    name: "delete",
    icon: "fa-trash",
    text: "Delete Directory",
    iconColor: "#bb0505"
}];
if (MathGlobal.shareFeatureDisabled()) {
    I = I.filter((e) => {
        return "share" != e.name;
    });
    T = T.filter((e) => {
        return "share" != e.name;
    });
}

export default x