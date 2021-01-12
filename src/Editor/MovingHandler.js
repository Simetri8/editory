import jQuery from 'jquery';
import ReactDOM from 'react-dom';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import Geometry from '../Geometry/Geometry';
import Global from '../Global';

/// xxx(57) /*MovingHandler*/

/*n.d(t, "a", function () {
    return h
}),*/
/*n.d(t, "b", function () {
    return u
});*/
/// var r = n(1)/*Geometry*/;  // 3 times
/// var a = n(24)/*EventHelper*/;  // 3 times
/// var i = n(4)/*DOMHelper*/;  // 1 times
/// var o = n(11)/*Global*/;  // 3 times
/// var s = n(5)/*sizzle*/;  // 2 times
/// var l = n.n(s);
/// var c = n(16)/*ReactDOM*/;  // 3 times
/// var d = n.n(c);
class h {
    constructor() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.options = e;
        this.alwaysRegisterTouch = true;
        this.handleContainerMouseMove = (e) => {
            if (this.options.noPreventDefault || e.preventDefault(), this.options.stopPropagation && e.stopPropagation(), e.handledMove = true, this.movingInfo) {
                var t = this.getPointFromEvent(e);
                if (!this.movingInfo.didMove && this.onMovingStarted) {
                    ReactDOM.unstable_batchedUpdates(() => {
                        console.log("moving started");
                        this.onMovingStarted(e, t, this.movingInfo);
                    });
                }
                this.movingInfo.didMove = true;
                var n = Geometry.substractPoint(t, this.movingInfo.lastPoint);
                this.movingInfo.lastPoint = t;
                var a = Geometry.substractPoint(t, this.movingInfo.downPoint);
                if (this.onMoving) {
                    ReactDOM.unstable_batchedUpdates(() => {
                        this.onMoving(a, t, this.movingInfo, e, n);
                    });
                }
            }
        };
        this.handleContainerMouseUp = (e) => {
            if (!this.options.noPreventDefault) {
                e.preventDefault();
            }
            if (this.options.stopPropagation) {
                e.stopPropagation();
            }
            if (Global.isMobileOrTablet() || this.alwaysRegisterTouch) {
                this.removeEventListener("touchmove", this.handleContainerMouseMove);
                this.removeEventListener("touchend", this.handleContainerMouseUp);
                this.removeEventListener("touchcancel", this.handleContainerMouseUp);
            }
            this.removeEventListener("mousemove", this.handleContainerMouseMove);
            this.removeEventListener("mouseup", this.handleContainerMouseUp);
            var t = this.movingInfo.lastPoint;
            if (this.onMoved) {
                ReactDOM.unstable_batchedUpdates(() => {
                    this.onMoved(this.movingInfo, t, e);
                });
            }
            this.movingInfo = null;
        };
        this.onMoved = null;
        this.onMoving = null;
    }
    setBaseElement(e) {
        this.baseElement = e;
    }
    setContainer(e) {
        this.container = e;
    }
    mouseDown(e, t, n) {
        if (this.container || (this.container = document.body), this.scale = n, Global.isMobileOrTablet()) {
            var r = e.nativeEvent || e;
            r.handledTouchStart = true;
            r.stopPropagation();
        }
        var a = this.getPointFromEvent(e);
        return this.movingInfo = {
            downPoint: a,
            customData: t,
            didMove: false,
            lastPoint: a
        },
        (Global.isMobileOrTablet() || this.alwaysRegisterTouch) && (this.addEventListener("touchmove", this.handleContainerMouseMove), this.addEventListener("touchend", this.handleContainerMouseUp), this.addEventListener("touchcancel", this.handleContainerMouseUp)),
        this.addEventListener("mousemove", this.handleContainerMouseMove),
        this.addEventListener("mouseup", this.handleContainerMouseUp),
        this.options.noPreventDefault || e.preventDefault(),
        this.options.stopPropagation && e.stopPropagation(),
        a;
    }
    addEventListener(e, t) {
        var n = EventHelper.getFalsePassiveObject();
        jQuery(this.container).get(0).addEventListener(e, t, n);
    }
    removeEventListener(e, t) {
        jQuery(this.container).get(0).removeEventListener(e, t);
    }
    getPointFromEvent(e) {
        var t = DOMHelper.getElementRect(this.baseElement);
        var n = EventHelper.getLeftTopFromEvent(e);
        return Geometry.scalePoint({
            x: n.left - t.left,
            y: n.top - t.top
        },
        this.scale);
    }
}
var u = new class {
    addEventListenerNonPassive(e, t, n) {
        if (e) {
            var r = EventHelper.getFalsePassiveObject();
            e.addEventListener(t, n, r);
        }
    }
    removeEventListenerNonPassive(e, t, n) {
        if (e) {
            e.removeEventListener(t, n);
        }
    }
}

export { u as MovingHandlerB }

export default h