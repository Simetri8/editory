import jQuery from 'jquery';
import React from 'react';
import Global from '../Global';

/// xxx(88) /*ModalDialogHelper*/

/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(5)/*sizzle*/;  // 8 times
/// var o = n.n(i);
/// var s = n(11)/*Global*/;  // 2 times
var ModalDialogHelper = new class {
    constructor() {
        this.isInShowState = false;
        this.sendModalComponent = null
    }
    getModalDialogContainer() {
        var e = this;
        return class extends React.Component {
            constructor(t) {
                super(t);
                this.state = {
                    component: null
                };
                e.sendModalComponent = (e) => {
                    this.setState({
                        component: e
                    })
                }
            }
            render() {
                return React.createElement("div", null, this.state.component)
            }
        }
    }
    getModalDialog() {
        var e = this;
        return class extends React.Component {
            componentDidMount() {
                if (this.props.show) e.sendModalComponent(this.props.children)
            }
            componentWillUnmount() {
                if (this.props.show) e.sendModalComponent(null)
            }
            componentWillReceiveProps(t) {
                if (t.show) e.sendModalComponent(t.children);
                else if (t.show != this.props.show) return t.show ? void 0 : e.sendModalComponent(null)
            }
            render() {
                return React.createElement("div", null)
            }
        }
    }
    notifyShow() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (!this.isInShowState) {
            this.isInShowState = true;
            jQuery("#page-header").css("background-color", "rgb(112,156,114)");
            if (!e) {
                jQuery("body").css("overflow-y", "hidden");
                if (Global.isSafari()) {
                    jQuery("body").css("position", "fixed");
                    jQuery("body").css("height", "100%")
                }
            }
        }
    }
    notifyHide() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (this.isInShowState) {
            this.isInShowState = false;
            jQuery("#page-header").css("background-color", "");
            if (!e) {
                jQuery("body").css("overflow-y", "");
                if (Global.isSafari()) {
                    jQuery("body").css("position", "");
                    jQuery("body").css("height", "")
                }
            }
        }
    }
}

export default ModalDialogHelper