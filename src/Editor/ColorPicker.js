import React from 'react';
import ReactDOM from 'react-dom';
import { ExpandableComponentB } from '../Elements/ExpandableComponent';
import CursorHandler from './CursorHandler';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import Global from '../Global';
import SketchPickerWrapper from './SketchPickerWrapper';

/// xxx(173) /*ColorPicker*/

/*n.d(t, "a", function () {
    return p
});*/
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 1 times
/// var o = n.n(i);
/// var s = n(69)/*ExpandableComponent*/;  // 1 times
/// var l = n(85)/*CursorHandler*/;  // 1 times
/// var c = n(11)/*Global*/;  // 2 times
/// var d = n(4)/*DOMHelper*/;  // 1 times
/// var h = n(332)/*SketchPickerWrapper*/;  // 1 times
/// var u = n(24)/*EventHelper*/;  // 1 times
class p extends ExpandableComponentB {
    constructor() {
        super(...arguments);
        this.onColorSelectMouseDown = (e => {
            if (this.props.stopPropagation) return e.stopPropagation(),
            void e.preventDefault();
            EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().withHandledCursorSelected().build())
        });
        this.handleColorChange = (e => {
            this.props.onItemSelect(e, !0)
        });
        this.onExpandContainerMouseDown = (e => {
            e.stopPropagation()
        })
    }
    shouldComponentUpdate(e, t) {
        return super.shouldComponentUpdate(e, t) || e.value != this.props.value
    }
    getComponentClassName() {
        return "color-picker"
    }
    renderNoColorSelect() {
        if (!this.disableNoColor && !this.props.disableNoColor) return React.createElement("no-color-select", {
            onMouseDown: () => this.props.onItemSelect("none")
        },
        "No Color")
    }
    renderExpandComponent() {
        var e, t = 1;
        if (Global.shouldUseSmallLayout()) {
            var n = ReactDOM.findDOMNode(this);
            if (t = 1.3, n) {
                var r = Global.getScreenWidth(),
                a = DOMHelper.getElementRect(n);
                a.left + 340 > r && (e = {
                    left: (Math.max(r - 300, 50) - a.left) / t
                })
            }
        }
        return this.innerRenderExpandComponent(e, t)
    }
    innerRenderExpandComponent(e, t) {
        return React.createElement("color-select", {
            onTouchStart: e => e.nativeEvent.handledTouchStart = !0,
            style: e,
            onMouseDown: this.onColorSelectMouseDown
        },
        this.renderNoColorSelect(), React.createElement(SketchPickerWrapper, {
            color: this.props.value,
            onChange: this.handleColorChange,
            scale: t
        }))
    }
}

export default p