
/// xxx(350) /*SymbolArcPathInfo*/

var SymbolArcPathInfo = new class {
    getPathInfo(e, t, n, r) {
        var a = {
            left: 0,
            top: n / 18,
            right: e - 0,
            bottom: Math.max(Math.min(e / 4, t / 1.1), n / 9) + n / 18
        },
        i = {
            x: (a = this.translateToBottom(a, t, n)).left,
            y: a.bottom
        },
        o = {
            x: (a.right + a.left) / 4,
            y: a.top
        },
        s = {
            x: a.left + .75 * (a.right - a.left),
            y: a.top
        },
        l = {
            x: a.right,
            y: a.bottom
        };
        i = r ? this.upsideDown(i, t) : i;
        o = r ? this.upsideDown(o, t) : o;
        s = r ? this.upsideDown(s, t) : s;
        l = r ? this.upsideDown(l, t) : l;
        var c = "M".concat(i.x + "", ", ").concat(i.y),
        d = "C ".concat(o.x + "", " ").concat(o.y + "", ", ").concat(s.x + "", " ").concat(s.y + "", ", ").concat(l.x + "", " ").concat(l.y + "", " ");
        return t > e ? {
            path: c + " " + d,
            strokeWidth: .07,
            fill: "none"
        } : {
            path: c + " " + d + " " + "C ".concat(s.x, " ").concat(s.y + n / 14, ",").concat(o.x, " ").concat(o.y + n / 14, ",").concat(i.x, " ").concat(i.y, " "),
            strokeWidth: .03
        }
    }
    upsideDown(e, t) {
        return {
            x: e.x,
            y: t - e.y
        }
    }
    translateToBottom(e, t, n) {
        var r = Math.max(t - e.bottom - n / 18, 0);
        return e.bottom += r,
        e.top += r,
        e
    }
}

export default SymbolArcPathInfo