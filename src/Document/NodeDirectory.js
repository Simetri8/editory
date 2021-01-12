import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import NodeDocument from './NodeDocument';
import NodeDragIn from './NodeDragIn';
import TreeNodeType from './TreeNodeType';

/// xxx(747) /*NodeDirectory*/

/*n.d(t, "a", function () {
    return u
});*/
/// var r = n(0)/*React*/;  // 16 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 2 times
/// var o = n.n(i);
/// var s = n(457)/*NodeDocument*/;  // 1 times
/// var l = n(14)/*classnames*/;  // 1 times
/// var c = n.n(l);
/// var d = n(464)/*NodeDragIn*/;  // 1 times
/// var h = n(40)/*TreeNodeType*/;  // 7 times
class u extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            collapsed: !this.props.initAllExpanded && this.props.directory.collapsed
        };
        this.onCollapseToggle = () => {
            this.setState({
                collapsed: !this.state.collapsed
            });
            if (this.props.onCollapseToggle) this.props.onCollapseToggle(this.props.directory.id, !this.state.collapsed)
        };
        this.onNameSelect = (e) => {
            if (!this.isDisabled()) {
                var t = e.ctrlKey || e.metaKey ? "multiple" : null;
                if (e.shiftKey) t = "list";
                this.props.onSelect(this.props.directory.id, TreeNodeType.Directory, t)
            }
        };
        this.handleDragStart = (e) => {
            this.selectForDrag();
            this.props.onDragStart(e)
        };
        this.handleDragEnd = (e) => {
            this.props.onDragEnd();
            e.preventDefault()
        };
        this.handleContextMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isDisabled()) this.props.onSelect(this.props.directory.id, TreeNodeType.Directory, null, true)
        }
    }
    isDisabled() {
        return this.props.isDisabled || this.props.disableNodes.some((e) => {
            return e.id === this.props.directory.id && e.type === TreeNodeType.Directory
        })
    }
    renderChildren(e, t, n, r) {
        var i = {
            display: this.state.collapsed ? "none" : "block"
        };
        return React.createElement("node-children", {
            style: i
        },
        this.renderDirectories(e, n, r), this.renderDocuments(t, n, r))
    }
    renderDirectories() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return _.chain(e).sortBy((e) => {
            return e.name.toLowerCase()
        }).map((e) => {
            return React.createElement(u, {
                directory: e,
                isParentOpacity: n,
                initAllExpanded: this.props.initAllExpanded,
                isDisabled: false,
                disableNodes: this.props.disableNodes,
                dragDropDisabled: this.props.dragDropDisabled,
                onMoveTo: this.props.onMoveTo,
                requestOpen: this.props.requestOpen,
                openedDocumentId: this.props.openedDocumentId,
                onCollapseToggle: this.props.onCollapseToggle,
                onDragStart: this.props.onDragStart,
                onDragEnd: this.props.onDragEnd,
                key: e.id,
                level: t,
                selectedNodes: this.props.selectedNodes,
                inDragState: this.props.inDragState,
                onSelect: this.props.onSelect
            })
        }).value()
    }
    renderDocuments() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        var r = this.isDisabled();
        return _.chain(e).sortBy((e) => {
            return e.name.toLowerCase()
        }).map((e) => {
            return React.createElement(NodeDocument, {
                inDragState: this.props.inDragState,
                isParentOpacity: n,
                isDisabled: r,
                disableNodes: this.props.disableNodes,
                dragDropDisabled: this.props.dragDropDisabled,
                requestOpen: this.props.requestOpen,
                openedDocumentId: this.props.openedDocumentId,
                onSelect: this.props.onSelect,
                onDragStart: this.props.onDragStart,
                onDragEnd: this.props.onDragEnd,
                key: e.id,
                document: e,
                level: t,
                isSelected: this.props.selectedNodes.some((t) => {
                    return t.id === e.id && t.type === TreeNodeType.Document
                })
            })
        }).value()
    }
    isSelected() {
        var e = this.props;
        var t = e.directory;
        return e.selectedNodes.some((e) => {
            return e.id === t.id && e.type === TreeNodeType.Directory
        })
    }
    selectForDrag() {
        if (!this.props.selectedNodes.some((e) => {
            return e.id === this.props.directory.id && e.type === TreeNodeType.Directory
        })) this.props.onSelect(this.props.directory.id, TreeNodeType.Directory, null)
    }
    renderUserInfo(e) {
        return this.props.showUserInfo && e ? React.createElement("x-by", {
            style: f
        },
        "by", React.createElement("i", {
            className: "fa fa-user",
            "aria-hidden": "true",
            style: {
                paddingLeft: 3
            }
        }), React.createElement("display-name", {
            style: {
                paddingLeft: 3,
                color: "#4caf50"
            }
        },
        e.displayName)) : null
    }
    render() {
        var e = this.props;
        var t = e.directory;
        var n = e.level;
        var r = e.dragDropDisabled;
        var i = e.inDragState;
        var o = e.isParentOpacity;
        var s = this.isDisabled();
        var l = this.isSelected();
        var h = {
            paddingLeft: 16 * n + 5,
            opacity: !o && s ? .4 : 1
        };
        var u = i && l;
        var f = {
            opacity: !o && u ? .3 : 1
        };
        var g = t.isShared ? React.createElement("i", {
            className: "fa fa-share",
            "aria-hidden": "true",
            style: m
        }) : null;
        return React.createElement(NodeDragIn, {
            disabled: r,
            id: this.props.directory.id,
            onDrop: (e) => {
                this.props.onMoveTo(e)
            }
        },
        React.createElement("node-directory", {
            onContextMenu: this.handleContextMenu,
            style: f,
            key: t.id
        },
        React.createElement("node-directory-name", {
            title: t.name,
            id: l ? "tn-".concat(t.id) : "",
            draggable: !this.props.dragDropDisabled,
            onDragStart: this.handleDragStart,
            onDragEnd: this.handleDragEnd,
            onClick: this.onNameSelect,
            onDoubleClick: this.onCollapseToggle,
            class: classNames("node-name", {
                expanded: !this.state.collapsed,
                selected: l,
                disabled: s
            }),
            style: h
        },
        React.createElement("x-icon", {
            onClick: this.onCollapseToggle,
            style: {
                visibility: 0 === t.directories.length && 0 === t.documents.length ? "hidden" : "visible"
            }
        },
        React.createElement("i", {
            className: "fa fa-caret-right",
            "aria-hidden": "true"
        })), React.createElement("icon-dir", {
            style: p
        },
        React.createElement("i", {
            className: "fa fa-folder",
            "aria-hidden": "true"
        }), g), React.createElement("span", null, t.name), this.renderUserInfo(t.user)), this.renderChildren(t.directories, t.documents, n + 1, u)))
    }
}
u.contextTypes = {
    tree: () => {}
};
var p = {
    paddingRight: 5,
    color: "#b9b8b8",
    position: "relative"
};
var m = {
    color: "white",
    position: "absolute",
    fontSize: "0.7em",
    top: "0.5em",
    left: 3
};
var f = {
    display: "block",
    fontSize: "0.85em",
    paddingLeft: 10
}

export default u