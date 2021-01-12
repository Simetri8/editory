import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';

/// xxx(1534) /*ShapeStyleBaseC*/

/*n.d(t, "a", function () {
    return h
});*/
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var s = n(25)/*ColorHelper*/;  // 2 times
/// var l = n(17)/*ItemDefaultSettings*/;  // 2 times
class h extends React.Component {
    shouldComponentUpdate(e) {
        return e.entity != this.props.entity || e.forManyEntities != this.props.forManyEntities
    }
    isStyleDifferent(e, t, n) {
        return ColorHelper.getEntityStyle(e, n) != ColorHelper.getEntityStyle(t, n)
    }
    isSettingDifferent(e, t, n) {
        return ItemDefaultSettings.getSettings(e, n) != ItemDefaultSettings.getSettings(t, n)
    }
    render() {
        return React.createElement("base-composite-settings", null)
    }
}

export default h