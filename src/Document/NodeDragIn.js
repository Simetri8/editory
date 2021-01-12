import _ from 'lodash';
import React from 'react';
import DocumentDragData from './DocumentDragData';

/// xxx(464) /*NodeDragIn*/

/// var r = n(3);  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 3 times
/// var o = n.n(i);
class s {
    constructor() {
        this.handleDragLeave = (e) => {
            if (this.enterTarget === e.target) {
                e.preventDefault();
                e.stopPropagation();
                this.onDragLeave()
            }
        };
        this.handleDragEnter = (e) => {
            this.enterTarget = e.target;
            e.dataTransfer.dropEffect = "move";
            this.onDragEnter();
            e.preventDefault();
            e.stopPropagation()
        };
        this.handleDragOver = (e) => {
            e.preventDefault()
        }
    }
}
/// var l = n(458)/*DocumentDragData*/;  // 1 times
/*n.d(t, "a", function () {
    return c
});*/
class c extends React.Component {
    constructor(e) {
        super(e);
        this.dragHandler = new s;
        this.state = {};
        this.handleDragEnter = () => {
            if (this.allowDrop() && "enter" != this.state.dragState) this.setState({
                dragState: "enter"
            })
        };
        this.handleDragLeave = () => {
            if ("enter" == this.state.dragState) this.setState({
                dragState: null
            })
        };
        this.handleDrop = (e) => {
            e.stopPropagation();
            console.log("on drop");
            if (this.allowDrop()) {
                this.setState({
                    dragState: null
                });
                this.props.onDrop(this.props.id);
                e.preventDefault()
            }
        };
        this.dragHandler.onDragEnter = this.handleDragEnter;
        this.dragHandler.onDragLeave = this.handleDragLeave
    }
    allowDrop() {
        var e = DocumentDragData.getDragData();
        return !! e && !e.blackListNodes.some((e) => {
            return e.id === this.props.id
        })
    }
    render() {
        var e = _.assignIn({},
        this.props.style, {
            display: "block",
            background: "enter" == this.state.dragState ? "lightgray" : void 0
        });
        return this.props.disabled ? React.createElement("node-drag-in", {
            style: e
        },
        this.props.children) : React.createElement("node-drag-in", {
            style: e,
            onDragEnter: this.dragHandler.handleDragEnter,
            onDragLeave: this.dragHandler.handleDragLeave,
            onDragOver: this.dragHandler.handleDragOver,
            onDrop: this.handleDrop
        },
        this.props.children)
    }
}

export default c