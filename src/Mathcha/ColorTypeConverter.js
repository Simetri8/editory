import _ from 'lodash';
import NumberUtils from './NumberUtils';

/// xxx(42) /*ColorTypeConverter*/

/// var r = n(2)/*lodash*/;  // 4 times
/// var a = n.n(r);
/// var i = n(52)/*NumberUtils*/;  // 1 times
var ColorTypeConverter = new class {
    constructor() {
        this.blackArr = [0, 0, 0]
    }
    getHtmlColor(e) {
        return _.isString(e) ? e : 3 === e.length ? "rgb(".concat(e[0], ",").concat(e[1], ",").concat(e[2], "})") : "rgba(".concat(e[0], ",").concat(e[1], ",").concat(e[2], ",").concat(e[3], ")")
    }
    colorToHex(e, t) {
        return this.colorArrToHex(this.colorToArr(e, t))
    }
    colorArrToHex(e) {
        return 4 === e.length ? "#".concat(this.byteHex(e[0])).concat(this.byteHex(e[1])).concat(this.byteHex(e[2])).concat(this.byteHex(Math.round(255 * e[3]))) : "#".concat(this.byteHex(e[0])).concat(this.byteHex(e[1])).concat(this.byteHex(e[2]))
    }
    byteHex(e) {
        e > 255 && (e = 255);
        e < 0 && (e = 0);
        var t = e.toString(16).toUpperCase();
        return t.length < 2 ? "0" + t : t
    }
    colorToArr(e, t) {
        return e instanceof Array ? e : this.stringToRgbaArr(e, t)
    }
    stringToRgbaArr(e, t) {
        if ("none" === e || !e) return t;
        if (_.startsWith(e, "rgba")) {
            var n = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g.exec(e);
            return [Number.parseInt(n[1], 10), Number.parseInt(n[2], 10), Number.parseInt(n[3], 10), Number.parseFloat(n[4])]
        }
        if (_.startsWith(e, "rgb")) {
            var r = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g.exec(e);
            return [Number.parseInt(r[1], 10), Number.parseInt(r[2], 10), Number.parseInt(r[3], 10), 1]
        }
        if (_.startsWith(e, "#")) {
            if (9 === e.length || 5 === e.length) {
                var o = this.hexToRgba(e);
                return [o.r, o.g, o.b, NumberUtils.round2(o.a / 255)]
            }
            var s = this.hexToRgb(e);
            return [s.r, s.g, s.b, 1]
        }
        return t
    }
    hexToRgb(e) {
        e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, r) {
            return t + t + n + n + r + r
        });
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16)
        } : null
    }
    hexToRgba(e) {
        e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, r, a) {
            return t + t + n + n + r + r + a + a
        });
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16),
            a: parseInt(t[4], 16)
        } : null
    }
}

export default ColorTypeConverter