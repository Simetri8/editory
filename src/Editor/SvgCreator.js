
/// xxx(128) /*SvgCreator*/

/*n.d(t, "a", function () {
    return r
});*/
class r {
    constructor() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        this.fragments = e
    }
    push(e) {
        this.fragments.push(this.parse(e))
    }
    pushArr(e) {
        e.forEach(e => this.fragments.push(this.parse(e)))
    }
    parse(e) {
        var t = e.substr(1).split(/[,\s]/).filter(e => !!e.trim()).map(e => Number.parseFloat(e));
        return [e[0]].concat(t)
    }
    wrap(e) {
        return new r(e)
    }
    shift(e, t) {
        return this.wrap(this.fragments.map(n => {
            var r = n[0];
            switch (r) {
            case "M":
                case "T":
                return [r, n[1] + e, n[2] + t];
            default:
                return n
            }
        }))
    }
    curveScaleX(e, t) {
        return this.wrap(this.fragments.map(n => {
            var r = n[0];
            switch (r.toLowerCase()) {
            case "t":
                return [r, n[1] * e, n[2] * t];
            case "q":
                return [r, n[1] * e, n[2] * t, n[3] * e, n[4] * t];
            default:
                return n
            }
        }))
    }
    scale(e, t) {
        return this.wrap(this.fragments.map(n => {
            var r = n[0];
            switch (r.toLowerCase()) {
            case "m":
                case "l":
                case "t":
                return [r, n[1] * e, n[2] * t];
            case "q":
                return [r, n[1] * e, n[2] * t, n[3] * e, n[4] * t];
            case "v":
                return [r, n[1] * t];
            case "h":
                return [r, n[1] * e];
            default:
                return n
            }
        }))
    }
    flipY() {
        return this.wrap(this.fragments.map(e => {
            var t = e[0];
            switch (t.toLowerCase()) {
            case "m":
                case "l":
                case "t":
                return [t, e[1], -1 * e[2]];
            case "q":
                return [t, e[1], -1 * e[2], e[3], -1 * e[4]];
            case "v":
                return [t, -1 * e[1]];
            default:
                return e
            }
        }))
    }
    flipX() {
        return this.wrap(this.fragments.map(e => {
            var t = e[0];
            switch (t.toLowerCase()) {
            case "m":
                case "t":
                case "l":
                return [t, -1 * e[1], e[2]];
            case "q":
                return [t, -1 * e[1], e[2], -1 * e[3], e[4]];
            case "h":
                return [t, -1 * e[1]];
            default:
                return e
            }
        }))
    }
    path() {
        var e = "";
        for (var t = 0; t < this.fragments.length; t++) {
            var n = this.fragments[t];
            e += " " + n[0];
            for (var r = 1; r < n.length; r++) {
                e += " " + n[r].toFixed(2)
            }
        }
        return e
    }
}

export default r