import _ from 'lodash';
import React from 'react';
import ColorHelper from '../Mathcha/ColorHelper';
import ShapeSelection from './ShapeSelection';

/// xxx(166) /*ShapeStyleBase*/

/*n.d(t, "a", function () {
    return d
});*/
/// var r = n(3);  // 2 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var s = n(25)/*ColorHelper*/;  // 1 times
/// var c = n(192)/*ShapeSelection*/;  // 2 times
class d extends React.Component {
    shouldComponentUpdate(e, t) {
        return e.shape != this.props.shape || e.className != this.props.className || e.subSelection != this.props.subSelection || e.isSelected != this.props.isSelected || e.isGroupSelected != this.props.isGroupSelected || e.isRemoteSelected != this.props.isRemoteSelected || e.remoteSelectedColor != this.props.remoteSelectedColor
    }
    shape() {
        return this.props.shape
    }
    hasFillColor() {
        return ColorHelper.hasFillColor(this.style())
    }
    noFillColor() {
        return !this.hasFillColor()
    }
    style() {
        return this.props.styleInfo.style
    }
    styleNoFill() {
        return _.assignIn({},
        this.style(), {
            fill: "none"
        })
    }
    styleNoStroke() {
        return _.assignIn({},
        this.style(), {
            stroke: "none"
        })
    }
    getStyleDefs() {
        if (this.props.styleInfo.defs) return this.props.styleInfo.defs
    }
    transparentStyle() {
        return ShapeSelection.getSelectionStyle(this.props, this.props.shape)
    }
    isAnySelected() {
        return ShapeSelection.isAnySelection(this.props)
    }
    getTransparentOnlyNoFill(e) {
        return this.hasFillColor() && !this.isAnySelected() ? null : React.createElement("path", {
            className: "transparent no-print",
            d: e,
            style: this.transparentStyle()
        })
    }
}

export default d