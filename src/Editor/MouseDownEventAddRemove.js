import React from 'react';
import ReactDOM from 'react-dom';
import { MovingHandlerB } from './MovingHandler';

/// xxx(60) /*MouseDownEventAddRemove*/

/*n.d(t, "a", function () {
    return l
});*/
/// var r = n(0)/*React*/;  // 1 times
/// var a = n.n(r);
/// var i = n(57)/*MovingHandler*/;  // 4 times
/// var o = n(16)/*ReactDOM*/;  // 2 times
/// var s = n.n(o);
class l extends React.Component {
    componentDidMount() {
        var e = ReactDOM.findDOMNode(this);
        this.props.touchOnly || MovingHandlerB.addEventListenerNonPassive(e, "mousedown", this.props.onTouchOrMouseDown);
        MovingHandlerB.addEventListenerNonPassive(e, "touchstart", this.props.onTouchOrMouseDown)
    }
    componentWillUnmount() {
        var e = ReactDOM.findDOMNode(this);
        this.props.touchOnly || MovingHandlerB.removeEventListenerNonPassive(e, "mousedown", this.props.onTouchOrMouseDown);
        MovingHandlerB.removeEventListenerNonPassive(e, "touchstart", this.props.onTouchOrMouseDown)
    }
    render() {
        return this.props.children
    }
}

export default l