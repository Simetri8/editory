import _ from 'lodash';
import React from 'react';
import Global from './Global';
import MouseDownEventAddRemove from './Editor/MouseDownEventAddRemove';
import MovingHandler from './Editor/MovingHandler';

/// xxx(1573) /*ResizeBar*/

/// var k = n(0)/*React*/;  // 7 times
/// var B = n.n(k);
/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
/// var Ut = n(2)/*lodash*/;  // 1 times
/// var Wt = n.n(Ut);
/// var Aa = n(11)/*Global*/;  // 1 times
/// var Ko = n(60)/*MouseDownEventAddRemove*/;  // 1 times
/// var Qa = n(57)/*MovingHandler*/;  // 1 times
var mobileOrTabletStyle = {
    width: 8,
    border: "1px solid #cccaca",
    cursor: "col-resize",
    position: "absolute",
    right: 0,
    height: "100%",
    top: 0
};
var notMobileOrTabletStyle = {
    width: 2,
    borderLeft: "1px solid #dedcdc",
    cursor: "col-resize",
    position: "absolute",
    right: 0,
    height: "100%",
    top: 0
};
var resizingBarStyle = {
    width: 2,
    borderLeft: "1px solid #4CAF50",
    height: "100%",
    position: "fixed",
    zIndex: 999999
};
var resizingInfoStyle = {
    position: "absolute",
    left: 10,
    top: "45%",
    color: "#4CAF50",
    fontSize: 10,
    display: "block",
    width: 70,
    background: "white",
    border: "1px solid #dedcdc",
    padding: 5
};
class ResizeBar extends React.Component {
    constructor(e) {
        super(e);
        this.state = {
            resizing: false,
            barLeft: 0,
            pageWidth: this.props.pageWidth
        };
        this.movingHandler = new MovingHandler;
        this.handleMoveStarted = (e, t) => {
            console.log("handleMoveStarted");
            this.setState({
                resizing: true,
                pageWidth: this.props.pageWidth,
                barLeft: t.x
            });
        };
        this.handleMoving = (e, t, n) => {
            console.log("handleMoving");
            this.setState({
                pageWidth: Math.round(n.customData.pageWidth + e.x),
                barLeft: t.x
            });
        };
        this.handleMoved = () => {
            console.log("handleMoved");
            this.setState({
                resizing: false
            });
            this.props.onPageWidthChanged(_.clamp(Math.round(this.state.pageWidth), 200, 2400));
        };
        this.handleResizeMouseDown = (e) => {
            e.stopPropagation();
            this.movingHandler.setBaseElement(window.document.body);
            this.movingHandler.mouseDown(e, {
                pageWidth: this.props.pageWidth
            });
        };
        this.movingHandler.onMovingStarted = this.handleMoveStarted;
        this.movingHandler.onMoving = this.handleMoving;
        this.movingHandler.onMoved = this.handleMoved;
    }
    renderResizeBar() {
        var e = Global.isMobileOrTablet() ? mobileOrTabletStyle : notMobileOrTabletStyle;
        return this.state.resizing ? React.createElement("resize-bar", {
            style: e
        },
        React.createElement("resizing-bar", {
            style: _.assignIn({},
            resizingBarStyle, {
                top: this.props.topPosition,
                left: this.state.barLeft,
                display: this.state.resizing ? "block" : "none"
            })
        },
        React.createElement("resizing-info", {
            style: resizingInfoStyle
        },
        "width:", this.state.pageWidth, "px"))) : React.createElement("resize-bar", {
            style: e
        });
    }
    render() {
        return this.props.show ? React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: this.handleResizeMouseDown
        },
        this.renderResizeBar()) : React.createElement("resize-bar", null);
    }
}
/*n.d(t, "a", function () {
    return ResizeBar;
});*/

export default ResizeBar