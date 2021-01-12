import detectIt from 'detect-it';
import CursorHandler from '../Editor/CursorHandler';

/// xxx(24) /*EventHelper*/

/// var r = n(85)/*CursorHandler*/;  // 1 times
/// var a = n(706)/*detect-it*/;  // 1 times
/// var i = n.n(a);
class o {
    getLeftTopFromEvent(e) {
        return this.isTouchEvent(e) ? {
            left: e.touches[0].clientX,
            top: e.touches[0].clientY
        } : {
            left: e.clientX,
            top: e.clientY
        }
    }
    getTargetOnMoveEvent(e) {
        if (this.isTouchEvent(e)) {
            var t = e.touches[0];
            return document.elementFromPoint(t.clientX, t.clientY)
        }
        return e.target
    }
    isTouchEvent(e) {
        return e.touches
    }
    isLeftButton(e) {
        return 0 === e.button
    }
    isLeftButtonOrTouch(e) {
        return this.isLeftButton(e) || this.isTouchEvent(e)
    }
    isMiddleButton(e) {
        return 1 === e.button
    }
    isRightButton(e) {
        return 2 === e.button
    }
    getStopPropagationForFocusClickMouseDown() {
        return o.stopPropagationForFocusClickMouseDown
    }
    focusAndCursorSelectAcquired(e) {
        e.customInfo = CursorHandler.getBuilder().withFocusAcquired().withHandledCursorSelected().build()
    }
    onDoubleClickStopPropagation(e) {
        e.stopPropagation()
    }
    onMouseDownStopPropagation(e) {
        e.stopPropagation()
    }
    getFalsePassiveObject() {
        return !! detectIt.passiveEvents && {
            passive: !1
        }
    }
    getCustomEventInfo(e) {
        return e.customInfo ? e.customInfo : e.nativeEvent && e.nativeEvent.customInfo ? e.nativeEvent.customInfo : void 0
    }
    cleanCustomInfo(e) {
        e.customInfo && (e.customInfo = void 0)
    }
    setCustomInfo(e, t) {
        e.nativeEvent ? e.nativeEvent.customInfo = t : e.customInfo = t
    }
}
o.stopPropagationForFocusClickMouseDown = {
    onFocus(e) {
        e.stopPropagation()
    },
    onMouseDown(e) {
        e.stopPropagation()
    },
    onClick(e) {
        e.stopPropagation()
    },
    onDoubleClick(e) {
        e.stopPropagation()
    }
};
var EventHelper = new o

export default EventHelper