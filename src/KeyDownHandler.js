import React from 'react';
import MathGlobal from './MathGlobal';
import TimerHelper from './Mathcha/TimerHelper';

/// xxx(1582) /*KeyDownHandler*/

/// var k = n(0)/*React*/;  // 2 times
/// var B = n.n(k);
/// var n19 = n(19)/*TimerHelper*/;  // 1 times
/// var Pa = n(28)/*MathGlobal*/;  // 7 times
class KeyDownHandler extends React.Component {
    constructor() {
        super(...arguments);
        this.handleKeyDown = (e) => {
            if (83 === e.keyCode) {
                if (MathGlobal.isMac() && e.metaKey) {
                    this.props.onSave();
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    if (!MathGlobal.isMac() && e.ctrlKey) {
                        this.props.onSave();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
            if (70 === e.keyCode) {
                if (MathGlobal.isMac() && e.metaKey) {
                    this.props.onShowFindAndReplace(e.altKey);
                    e.preventDefault();
                } else {
                    if (!MathGlobal.isMac() && e.ctrlKey) {
                        this.props.onShowFindAndReplace(false);
                        e.preventDefault();
                    }
                }
            }
            TimerHelper.next(() => {
                if (!e.defaultPrevented) {
                    if (27 === e.keyCode && this.props.showFindAndReplace) {
                        this.props.onCloseFindAndReplace();
                    }
                }
            });
            if (72 === e.keyCode && !MathGlobal.isMac() && e.ctrlKey) {
                this.props.onShowFindAndReplace(true);
            }
            if (80 === e.keyCode) {
                if (MathGlobal.isMac() && e.metaKey) {
                    e.preventDefault();
                    this.props.onPrint();
                } else {
                    if (!MathGlobal.isMac() && e.ctrlKey) {
                        e.preventDefault();
                        this.props.onPrint();
                    }
                }
            }
        };
    }
    componentDidMount() {
        document.body.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.handleKeyDown);
    }
    render() {
        return React.createElement("div", null);
    }
}
/*n.d(t, "a", function () {
    return KeyDownHandler;
});*/

export default KeyDownHandler