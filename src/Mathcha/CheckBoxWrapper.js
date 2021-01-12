import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import MobileTabletClasses from './MobileTabletClasses';

/// xxx(101) /*CheckBoxWrapper*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 5 times
/// var o = n.n(i);
/// var s = n(14)/*classnames*/;  // 1 times
/// var l = n.n(s);
/// var c = n(76)/*MobileTabletClasses*/;  // 1 times
class d extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onMouseDown = (e => {
            e.stopPropagation();
            e.preventDefault();
            this.props.disabled || this.props.onValueChanged(!this.props.checked)
        })
    }
    render() {
        var e = MobileTabletClasses.addMobileTabletClssIfRequired(classNames(this.props.checked ? "checked" : "unchecked", {
            disabled: this.props.disabled
        }));
        return React.createElement("check-box-wrapper", {
            onMouseDown: this.onMouseDown,
            class: e,
            style: this.props.style
        },
        React.createElement("check-box-rect", {
            onTouchStart: this.onMouseDown
        },
        React.createElement("i", {
            className: "fa fa-check",
            "aria-hidden": "true"
        })), React.createElement("span", {
            style: _.assignIn({},
            {
                paddingTop: 8,
                paddingLeft: 5,
                fontSize: 12
            },
            this.props.textStyle)
        },
        this.props.name))
    }
}

export default d