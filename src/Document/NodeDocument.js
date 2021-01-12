import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import TreeNodeType from './TreeNodeType';

/// xxx(457) /*NodeDocument*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3);  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 9 times
/// var o = n.n(i);
/// var s = n(14)/*classnames*/;  // 2 times
/// var l = n.n(s);
/// var c = n(40)/*TreeNodeType*/;  // 4 times
class d extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onNameSelect = (e) => {
            if (!this.isDisabled()) {
                var t = e.ctrlKey || e.metaKey ? "multiple" : null;
                if (e.shiftKey) t = "list";
                this.props.onSelect(this.props.document.id, TreeNodeType.Document, t)
            }
        };
        this.handleContextMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isDisabled()) this.props.onSelect(this.props.document.id, TreeNodeType.Document, null, true)
        };
        this.handleDragStart = (e) => {
            this.selectForDrag();
            this.props.onDragStart(e)
        };
        this.handleDragEnd = (e) => {
            console.log("drag end");
            this.props.onDragEnd();
            e.preventDefault()
        }
    }
    isSelected() {
        return this.props.isSelected
    }
    isDocumentOpened() {
        return this.props.openedDocumentId === this.props.document.id
    }
    selectForDrag() {
        if (!this.isSelected()) this.props.onSelect(this.props.document.id, TreeNodeType.Document, null)
    }
    isDisabled() {
        return this.props.isDisabled || this.props.disableNodes.some((e) => {
            return e.id === this.props.document.id && e.type === TreeNodeType.Document
        })
    }
    renderUserInfo(e) {
        return this.props.showUserInfo && e ? React.createElement("x-by", {
            style: h
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
        var t = e.document;
        var n = e.level;
        var r = e.dragDropDisabled;
        var i = e.inDragState;
        var s = e.isParentOpacity;
        var c = this.isDisabled();
        var d = {
            paddingLeft: 16 * n + 5 + 9,
            opacity: !s && (i && this.isSelected() || c) ? .3 : 1
        };
        var h = classNames("fa", this.isDocumentOpened() ? "fa-file-o" : "fa-file");
        var p = t.isShared || t.isFullAccessShared ? React.createElement("i", {
            className: "fa fa-share",
            "aria-hidden": "true",
            style: _.assignIn({},
            u, {
                color: this.isDocumentOpened() ? void 0 : "white"
            })
        }) : null;
        return React.createElement("node-document", {
            title: t.name,
            id: this.isSelected() ? "tn-".concat(t.id) : "",
            key: t.id,
            draggable: !r,
            onDragStart: this.handleDragStart,
            onDragEnd: this.handleDragEnd,
            onClick: this.onNameSelect,
            onContextMenu: this.handleContextMenu,
            onDoubleClick: () => {
                return this.props.requestOpen(this.props.document.id)
            },
            class: classNames("node-name", {
                selected: this.isSelected(),
                disabled: c
            }),
            style: d
        },
        React.createElement("x-icon", null, React.createElement("i", {
            className: h,
            "aria-hidden": "true"
        }), p), React.createElement("span", null, t.name), this.renderUserInfo(t.user))
    }
}
d.contextTypes = {
    tree: () => {}
};
var h = {
    display: "block",
    fontSize: "0.85em",
    paddingLeft: 10
};
var u = {
    position: "absolute",
    fontSize: "0.7em",
    top: "0.6em",
    left: 5
}

export default d