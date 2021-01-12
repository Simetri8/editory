import _ from 'lodash';
import React from 'react';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import PrintSettingsMarginInput from '../Document/PrintSettingsMarginInput';

/// xxx(41) /*NumericSliderComponent*/

/*n.d(t, "a", function () {
    return c
});*/
/// var r = n(61)/*_.omit*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 5 times
/// var o = n.n(i);
/// var s = n(195)/*PrintSettingsMarginInput*/;  // 1 times
/// var l = n(76)/*MobileTabletClasses*/;  // 1 times
class c extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSelectedChanged = (() => {
            this.props.onSelectedChanged && this.props.onSelectedChanged()
        })
    }
    shouldComponentUpdate(e) {
        return e.value != this.props.value || e.disabled != this.props.disabled
    }
    render() {
        var e = this.props,
        t = e.title,
        n = e.icon,
        r = e.unit,
        i = e.containerStyle,
        c = _.omit(e, ["title", "icon", "unit", "containerStyle"]),
        d = MobileTabletClasses.addMobileTabletClssIfRequired();
        return React.createElement("numeric-slider", {
            style: i,
            title: t,
            class: d
        },
        React.createElement("numeric-icon", {
            onMouseDown: this.handleSelectedChanged
        },
        n), React.createElement(PrintSettingsMarginInput, Object.assign({},
        c)), React.createElement("numeric-unit", {
            style: this.props.unitStyle
        },
        r))
    }
}

export default c