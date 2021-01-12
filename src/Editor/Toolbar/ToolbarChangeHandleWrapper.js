import React from 'react';

/// xxx(56) /*ToolbarChangeHandleWrapper*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(0)/*React*/;  // 2 times
/// var a = n.n(r);
class i extends React.Component {
    shouldComponentUpdate(e) {
        if (!e.watch) return !1;
        var t = this.props.watch,
        n = e.watch;
        if (t.length != n.length) return !0;
        for (var r = 0; r < t.length; r++) if (t[r] != n[r]) return !0;
        return !1
    }
    render() {
        return React.createElement("div", null, this.props.children)
    }
}

export default i