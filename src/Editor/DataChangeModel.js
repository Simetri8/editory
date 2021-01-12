
/// xxx(203) /*DataChangeModel*/

/*n.d(t, "a", function () {
    return r
});*/
class r {
    build() {
        return {
            focusAcquired: this.focusAcquired,
            preventScroll: this.preventScroll
        }
    }
    withFocusAcquired() {
        return this.focusAcquired = !0,
        this
    }
    withPreventScroll() {
        return this.preventScroll = !0,
        this
    }
    static getBuilder() {
        return new r
    }
    static getDefault() {
        return r.empty
    }
}
r.empty = {}

export default r