
/// xxx(85) /*CursorHandler*/

/*n.d(t, "a", function () {
    return r
});*/
class r {
    withHandledCursorSelected() {
        return this.handledCursorSelected = !0,
        this
    }
    withFocusAcquired() {
        return this.focusAcquired = !0,
        this
    }
    withRequestCursorSelect() {
        return this.requestCursorSelect = !0,
        this
    }
    build() {
        return {
            handledCursorSelected: this.handledCursorSelected,
            focusAcquired: this.focusAcquired,
            requestCursorSelect: this.requestCursorSelect
        }
    }
    static getBuilder(e) {
        var t = new r;
        return e && (t.focusAcquired = e.focusAcquired, t.handledCursorSelected = e.handledCursorSelected, t.requestCursorSelect = e.requestCursorSelect),
        t
    }
    static getDefault() {
        return r.empty
    }
}
r.empty = {}

export default r