import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1628) /*RenderingContext*/

/// var Lt = n(19)/*TimerHelper*/;  // 1 times
class RenderingContext {
    constructor() {
        this.nextCycleLastRendering = false;
    }
    isNextCycleLastRendering() {
        return this.nextCycleLastRendering;
    }
    setNextCycleLastRendering(e) {
        this.nextCycleLastRendering = e;
    }
    nextCycleIfRequired(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (this.nextCycleLastRendering) {
            return TimerHelper.next(e, t);
        }
        e();
    }
}
/*n.d(t, "a", function () {
    return RenderingContext;
})*/

export default RenderingContext