import _ from 'lodash';
import asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import jQuery from 'jquery';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import regeneratorRuntime from 'regenerator-runtime';
import DOMHelper from '../Elements/DOMHelper';
import ElementTypes from '../Elements/ElementTypes';
import FontHelper from './FontHelper';
import FontList from './FontList';
import Geometry from '../Geometry/Geometry';
import ImageDataHelper from '../Editor/ImageDataHelper';
import ShapeDocRoundedRect from '../Shapes/Shape-doc-rounded-rect';
import ShapeHelper from '../Shapes/ShapeHelper';
import TextUtils from '../Editor/TextUtils';
import TimerHelper from '../Mathcha/TimerHelper';
import TransformHelper from '../Editor/TransformHelper';
import VectorFontLoader from './VectorFontLoader';

/// xxx(121) /*FontProcessor*/

function createNewFileName(e) {
    var t = e.getMonth() + 1;
    var n = e.getDate();
    var h = e.getHours();
    var m = e.getMinutes();
    var s = e.getSeconds();
    return [e.getFullYear(), (t > 9 ? "" : "0") + t, (n > 9 ? "" : "0") + n, "-", (h > 9 ? "" : "0") + h, (m > 9 ? "" : "0") + m, (s > 9 ? "" : "0") + s].join("")
}
/// var r = n(34)/*regenerator-runtime-exp*/;  // 72 times
/// var a = n.n(r);
/// var i = n(53)/*babel-asyncToGenerator*/;  // 36 times
/// var o = n.n(i);
/// var s = n(0)/*React*/;  // 19 times
/// var l = n.n(s);
/// var c = n(155)/*ReactDOM-server-exp*/;  // 2 times
/// var d = n(3);  // 6 times
/// var h = n.n(d);
/// var u = n(4)/*DOMHelper*/;  // 55 times
/// var p = n(5)/*sizzle*/;  // 120 times
/// var m = n.n(p);
/// var f = n(2)/*lodash*/;  // 6 times
/// var g = n.n(f);
var y = {
    U: {},
    parse: function (e) {
        var t = y._bin;
        var n = new Uint8Array(e);
        var r = 0;
        t.readFixed(n, r);
        r = r + 4;
        var a = t.readUshort(n, r);
        r = r + 2;
        t.readUshort(n, r);
        r = r + 2;
        t.readUshort(n, r);
        r = r + 2;
        t.readUshort(n, r);
        r = r + 2;
        var i = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post", "loca", "glyf", "kern", "CFF ", "GPOS", "GSUB", "SVG "];
        var o = {
            _data: n
        };
        var s = {};
        var l = 0;
        for (; l < a; l++) {
            var c = t.readASCII(n, r, 4);
            r = r + 4;
            t.readUint(n, r);
            r = r + 4;
            var d = t.readUint(n, r);
            r = r + 4;
            var h = t.readUint(n, r);
            r = r + 4;
            s[c] = {
                offset: d,
                length: h
            }
        }
        l = 0;
        for (; l < i.length; l++) {
            var u = i[l];
            if (s[u]) o[u.trim()] = y[u.trim()].parse(n, s[u].offset, s[u].length, o)
        }
        return o
    },
    _tabOffset: function (e, t) {
        var n = y._bin;
        var r = n.readUshort(e, 4);
        var a = 12;
        var i = 0;
        for (; i < r; i++) {
            var o = n.readASCII(e, a, 4);
            a = a + 4;
            n.readUint(e, a);
            a = a + 4;
            var s = n.readUint(e, a);
            a = a + 4;
            n.readUint(e, a);
            if (a = a + 4, o == t) return s
        }
        return 0
    }
};
y._bin = {
    readFixed: function (e, t) {
        return (e[t] << 8 | e[t + 1]) + (e[t + 2] << 8 | e[t + 3]) / 65540
    },
    readF2dot14: function (e, t) {
        var n = y._bin.readShort(e, t);
        return n / 16384
    },
    readInt: function (e, t) {
        var n = y._bin.t.uint8;
        return n[0] = e[t + 3],
        n[1] = e[t + 2],
        n[2] = e[t + 1],
        n[3] = e[t],
        y._bin.t.int32[0]
    },
    readInt8: function (e, t) {
        return y._bin.t.uint8[0] = e[t],
        y._bin.t.int8[0]
    },
    readShort: function (e, t) {
        var n = y._bin.t.uint8;
        return n[1] = e[t],
        n[0] = e[t + 1],
        y._bin.t.int16[0]
    },
    readUshort: function (e, t) {
        return e[t] << 8 | e[t + 1]
    },
    readUshorts: function (e, t, n) {
        var r = [];
        var a = 0;
        for (; a < n; a++) r.push(y._bin.readUshort(e, t + 2 * a));
        return r
    },
    readUint: function (e, t) {
        var n = y._bin.t.uint8;
        return n[3] = e[t],
        n[2] = e[t + 1],
        n[1] = e[t + 2],
        n[0] = e[t + 3],
        y._bin.t.uint32[0]
    },
    readUint64: function (e, t) {
        return 4294967296 * y._bin.readUint(e, t) + y._bin.readUint(e, t + 4)
    },
    readASCII: function (e, t, n) {
        var r = "";
        var a = 0;
        for (; a < n; a++) r = r + String.fromCharCode(e[t + a]);
        return r
    },
    readUnicode: function (e, t, n) {
        var r = "";
        var a = 0;
        for (; a < n; a++) {
            var i = e[t++] << 8 | e[t++];
            r = r + String.fromCharCode(i)
        }
        return r
    },
    _tdec: window.TextDecoder ? new window.TextDecoder : null,
    readUTF8: function (e, t, n) {
        var r = y._bin._tdec;
        return r && 0 == t && n == e.length ? r.decode(e) : y._bin.readASCII(e, t, n)
    },
    readBytes: function (e, t, n) {
        var r = [];
        var a = 0;
        for (; a < n; a++) r.push(e[t + a]);
        return r
    },
    readASCIIArray: function (e, t, n) {
        var r = [];
        var a = 0;
        for (; a < n; a++) r.push(String.fromCharCode(e[t + a]));
        return r
    }
};
y._bin.t = {
    buff: new ArrayBuffer(8)
};
y._bin.t.int8 = new Int8Array(y._bin.t.buff);
y._bin.t.uint8 = new Uint8Array(y._bin.t.buff);
y._bin.t.int16 = new Int16Array(y._bin.t.buff);
y._bin.t.uint16 = new Uint16Array(y._bin.t.buff);
y._bin.t.int32 = new Int32Array(y._bin.t.buff);
y._bin.t.uint32 = new Uint32Array(y._bin.t.buff);
y._lctf = {};
y._lctf.parse = function (e, t, n, r, a) {
    var i = y._bin;
    var o = {};
    var s = t;
    i.readFixed(e, t);
    t = t + 4;
    var l = i.readUshort(e, t);
    t = t + 2;
    var c = i.readUshort(e, t);
    t = t + 2;
    var d = i.readUshort(e, t);
    return t = t + 2,
    o.scriptList = y._lctf.readScriptList(e, s + l),
    o.featureList = y._lctf.readFeatureList(e, s + c),
    o.lookupList = y._lctf.readLookupList(e, s + d, a),
    o
};
y._lctf.readLookupList = function (e, t, n) {
    var r = y._bin;
    var a = t;
    var i = [];
    var o = r.readUshort(e, t);
    t = t + 2;
    var s = 0;
    for (; s < o; s++) {
        var l = r.readUshort(e, t);
        t = t + 2;
        var c = y._lctf.readLookupTable(e, a + l, n);
        i.push(c)
    }
    return i
};
y._lctf.readLookupTable = function (e, t, n) {
    var r = y._bin;
    var a = t;
    var i = {
        tabs: []
    };
    i.ltype = r.readUshort(e, t);
    t = t + 2;
    i.flag = r.readUshort(e, t);
    t = t + 2;
    var o = r.readUshort(e, t);
    t = t + 2;
    var s = 0;
    for (; s < o; s++) {
        var l = r.readUshort(e, t);
        t = t + 2;
        var c = n(e, i.ltype, a + l);
        i.tabs.push(c)
    }
    return i
};
y._lctf.numOfOnes = function (e) {
    var t = 0;
    var n = 0;
    for (; n < 32; n++) if (0 != (e >>> n & 1)) t++;
    return t
};
y._lctf.readClassDef = function (e, t) {
    var n = y._bin;
    var r = [];
    var a = n.readUshort(e, t);
    if (t = t + 2, 1 == a) {
        var i = n.readUshort(e, t);
        t = t + 2;
        var o = n.readUshort(e, t);
        t = t + 2;
        var s = 0;
        for (; s < o; s++) {
            r.push(i + s);
            r.push(i + s);
            r.push(n.readUshort(e, t));
            t = t + 2
        }
    }
    if (2 == a) {
        var l = n.readUshort(e, t);
        t = t + 2;
        s = 0;
        for (; s < l; s++) {
            r.push(n.readUshort(e, t));
            t = t + 2;
            r.push(n.readUshort(e, t));
            t = t + 2;
            r.push(n.readUshort(e, t));
            t = t + 2
        }
    }
    return r
};
y._lctf.getInterval = function (e, t) {
    var n = 0;
    for (; n < e.length; n = n + 3) {
        var r = e[n];
        var a = e[n + 1];
        var a1 = e[n + 2];
        if (r <= t && t <= a) return n
    }
    return -1
};
y._lctf.readValueRecord = function (e, t, n) {
    var r = y._bin;
    var a = [];
    return a.push(1 & n ? r.readShort(e, t) : 0),
    t = t + (1 & n ? 2 : 0),
    a.push(2 & n ? r.readShort(e, t) : 0),
    t = t + (2 & n ? 2 : 0),
    a.push(4 & n ? r.readShort(e, t) : 0),
    t = t + (4 & n ? 2 : 0),
    a.push(8 & n ? r.readShort(e, t) : 0),
    t = t + (8 & n ? 2 : 0),
    a
};
y._lctf.readCoverage = function (e, t) {
    var n = y._bin;
    var r = {};
    r.fmt = n.readUshort(e, t);
    t = t + 2;
    var a = n.readUshort(e, t);
    return t = t + 2,
    1 == r.fmt && (r.tab = n.readUshorts(e, t, a)),
    2 == r.fmt && (r.tab = n.readUshorts(e, t, 3 * a)),
    r
};
y._lctf.coverageIndex = function (e, t) {
    var n = e.tab;
    if (1 == e.fmt) return n.indexOf(t);
    if (2 == e.fmt) {
        var r = y._lctf.getInterval(n, t);
        if (-1 != r) return n[r + 2] + (t - n[r])
    }
    return -1
};
y._lctf.readFeatureList = function (e, t) {
    var n = y._bin;
    var r = t;
    var a = [];
    var i = n.readUshort(e, t);
    t = t + 2;
    var o = 0;
    for (; o < i; o++) {
        var s = n.readASCII(e, t, 4);
        t = t + 4;
        var l = n.readUshort(e, t);
        t = t + 2;
        a.push({
            tag: s.trim(),
            tab: y._lctf.readFeatureTable(e, r + l)
        })
    }
    return a
};
y._lctf.readFeatureTable = function (e, t) {
    var n = y._bin;
    n.readUshort(e, t);
    t = t + 2;
    var r = n.readUshort(e, t);
    t = t + 2;
    var a = [];
    var i = 0;
    for (; i < r; i++) a.push(n.readUshort(e, t + 2 * i));
    return a
};
y._lctf.readScriptList = function (e, t) {
    var n = y._bin;
    var r = t;
    var a = {};
    var i = n.readUshort(e, t);
    t = t + 2;
    var o = 0;
    for (; o < i; o++) {
        var s = n.readASCII(e, t, 4);
        t = t + 4;
        var l = n.readUshort(e, t);
        t = t + 2;
        a[s.trim()] = y._lctf.readScriptTable(e, r + l)
    }
    return a
};
y._lctf.readScriptTable = function (e, t) {
    var n = y._bin;
    var r = t;
    var a = {};
    var i = n.readUshort(e, t);
    t = t + 2;
    a.default = y._lctf.readLangSysTable(e, r + i);
    var o = n.readUshort(e, t);
    t = t + 2;
    var s = 0;
    for (; s < o; s++) {
        var l = n.readASCII(e, t, 4);
        t = t + 4;
        var c = n.readUshort(e, t);
        t = t + 2;
        a[l.trim()] = y._lctf.readLangSysTable(e, r + c)
    }
    return a
};
y._lctf.readLangSysTable = function (e, t) {
    var n = y._bin;
    var r = {};
    n.readUshort(e, t);
    t = t + 2;
    r.reqFeature = n.readUshort(e, t);
    t = t + 2;
    var a = n.readUshort(e, t);
    return t = t + 2,
    r.features = n.readUshorts(e, t, a),
    r
};
y.CFF = {};
y.CFF.parse = function (e, t, n) {
    var r = y._bin;
    var a1 = (e = new Uint8Array(e.buffer, t, n))[t = 0];
    var a2 = e[++t];
    var a3 = e[++t];
    var a4 = e[++t];
    t++;
    var a = [];
    t = y.CFF.readIndex(e, t, a);
    var i = [];
    var o = 0;
    for (; o < a.length - 1; o++) i.push(r.readASCII(e, t + a[o], a[o + 1] - a[o]));
    t = t + a[a.length - 1];
    var s = [];
    t = y.CFF.readIndex(e, t, s);
    var l = [];
    o = 0;
    for (; o < s.length - 1; o++) l.push(y.CFF.readDict(e, t + s[o], t + s[o + 1]));
    t = t + s[s.length - 1];
    var c = l[0];
    var d = [];
    t = y.CFF.readIndex(e, t, d);
    var h = [];
    o = 0;
    for (; o < d.length - 1; o++) h.push(r.readASCII(e, t + d[o], d[o + 1] - d[o]));
    if (t = t + d[d.length - 1], y.CFF.readSubrs(e, t, c), c.CharStrings) {
        t = c.CharStrings;
        d = [];
        t = y.CFF.readIndex(e, t, d);
        var u = [];
        o = 0;
        for (; o < d.length - 1; o++) u.push(r.readBytes(e, t + d[o], d[o + 1] - d[o]));
        c.CharStrings = u
    }
    if (c.Encoding) c.Encoding = y.CFF.readEncoding(e, c.Encoding, c.CharStrings.length);
    if (c.charset) c.charset = y.CFF.readCharset(e, c.charset, c.CharStrings.length);
    if (c.Private) {
        t = c.Private[1];
        c.Private = y.CFF.readDict(e, t, t + c.Private[0]);
        if (c.Private.Subrs) y.CFF.readSubrs(e, t + c.Private.Subrs, c.Private)
    }
    var p = {};
    var m;
    for (m in c) if (-1 != ["FamilyName", "FullName", "Notice", "version", "Copyright"].indexOf(m)) p[m] = h[c[m] - 426 + 35];
    else p[m] = c[m];
    return p
};
y.CFF.readSubrs = function (e, t, n) {
    var r = y._bin;
    var a = [];
    t = y.CFF.readIndex(e, t, a);
    var i;
    var o = a.length;
    i = o < 1240 ? 107:
    o < 33900 ? 1131 : 32768;
    n.Bias = i;
    n.Subrs = [];
    var s = 0;
    for (; s < a.length - 1; s++) n.Subrs.push(r.readBytes(e, t + a[s], a[s + 1] - a[s]))
};
y.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0];
y.CFF.glyphByUnicode = function (e, t) {
    var n = 0;
    for (; n < e.charset.length; n++) if (e.charset[n] == t) return n;
    return -1
};
y.CFF.glyphBySE = function (e, t) {
    return t < 0 || t > 255 ? -1 : y.CFF.glyphByUnicode(e, y.CFF.tableSE[t])
};
y.CFF.readEncoding = function (e, t, n) {
    var a1 = y._bin;
    var r = [".notdef"];
    var a = e[t];
    if (0 != a) throw "error:unknown encoding format:" + a;
    var i = e[++t];
    t++;
    var o = 0;
    for (; o < i; o++) r.push(e[t + o]);
    return r
};
y.CFF.readCharset = function (e, t, n) {
    var r = y._bin;
    var a = [".notdef"];
    var i = e[t];
    if (t++, 0 == i) {
        var o = 0;
        for (; o < n; o++) {
            var s = r.readUshort(e, t);
            t = t + 2;
            a.push(s)
        }
    } else {
        if (1 != i && 2 != i) throw "error:format:" + i;
        for (; a.length < n;) {
            s = r.readUshort(e, t);
            t = t + 2;
            var l = 0;
            if (1 == i) {
                l = e[t];
                t++
            } else {
                l = r.readUshort(e, t);
                t = t + 2
            }
            o = 0;
            for (; o <= l; o++) {
                a.push(s);
                s++
            }
        }
    }
    return a
};
y.CFF.readIndex = function (e, t, n) {
    var r = y._bin;
    var a = r.readUshort(e, t);
    var i = e[t = t + 2];
    if (t++, 1 == i) {
        var o = 0;
        for (; o < a + 1; o++) n.push(e[t + o])
    } else if (2 == i) {
        o = 0;
        for (; o < a + 1; o++) n.push(r.readUshort(e, t + 2 * o))
    } else if (3 == i) {
        o = 0;
        for (; o < a + 1; o++) n.push(16777215 & r.readUint(e, t + 3 * o - 1))
    } else if (0 != a) throw "unsupported offset size:" + i + ",count:" + a;
    return (t = t + (a + 1) * i) - 1
};
y.CFF.getCharString = function (e, t, n) {
    var r = y._bin;
    var a = e[t];
    var i = e[t + 1];
    var o = (e[t + 2], e[t + 3], e[t + 4], 1);
    var s = null;
    var l = null;
    if (a <= 20) {
        s = a;
        o = 1
    }
    if (12 == a) {
        s = 100 * a + i;
        o = 2
    }
    if (21 <= a && a <= 27) {
        s = a;
        o = 1
    }
    if (28 == a) {
        l = r.readShort(e, t + 1);
        o = 3
    }
    if (29 <= a && a <= 31) {
        s = a;
        o = 1
    }
    if (32 <= a && a <= 246) {
        l = a - 139;
        o = 1
    }
    if (247 <= a && a <= 250) {
        l = 256 * (a - 247) + i + 108;
        o = 2
    }
    if (251 <= a && a <= 254) {
        l = 256 * -(a - 251) - i - 108;
        o = 2
    }
    if (255 == a) {
        l = r.readInt(e, t + 1) / 65535;
        o = 5
    }
    n.val = null != l ? l : "o" + s;
    n.size = o
};
y.CFF.readCharString = function (e, t, n) {
    var r = t + n;
    var a = y._bin;
    var i = [];
    for (; t < r;) {
        var o = e[t];
        var s = e[t + 1];
        var l = (e[t + 2], e[t + 3], e[t + 4], 1);
        var c = null;
        var d = null;
        if (o <= 20) {
            c = o;
            l = 1
        }
        if (12 == o) {
            c = 100 * o + s;
            l = 2
        }
        if (! (19 != o && 20 != o)) {
            c = o;
            l = 2
        }
        if (21 <= o && o <= 27) {
            c = o;
            l = 1
        }
        if (28 == o) {
            d = a.readShort(e, t + 1);
            l = 3
        }
        if (29 <= o && o <= 31) {
            c = o;
            l = 1
        }
        if (32 <= o && o <= 246) {
            d = o - 139;
            l = 1
        }
        if (247 <= o && o <= 250) {
            d = 256 * (o - 247) + s + 108;
            l = 2
        }
        if (251 <= o && o <= 254) {
            d = 256 * -(o - 251) - s - 108;
            l = 2
        }
        if (255 == o) {
            d = a.readInt(e, t + 1) / 65535;
            l = 5
        }
        i.push(null != d ? d : "o" + c);
        t = t + l
    }
    return i
};
y.CFF.readDict = function (e, t, n) {
    var r = y._bin;
    var a = {};
    var i = [];
    for (; t < n;) {
        var o = e[t];
        var s = e[t + 1];
        var l = (e[t + 2], e[t + 3], e[t + 4], 1);
        var c = null;
        var d = null;
        if (28 == o && (d = r.readShort(e, t + 1), l = 3), 29 == o && (d = r.readInt(e, t + 1), l = 5), 32 <= o && o <= 246 && (d = o - 139, l = 1), 247 <= o && o <= 250 && (d = 256 * (o - 247) + s + 108, l = 2), 251 <= o && o <= 254 && (d = 256 * -(o - 251) - s - 108, l = 2), 255 == o) throw d = r.readInt(e, t + 1) / 65535,
        l = 5,
        "unknown number";
        if (30 == o) {
            var h = [];
            l = 1;
            for (;;) {
                var u = e[t + l];
                l++;
                var p = u >> 4;
                var m = 15 & u;
                if (15 != p && h.push(p), 15 != m && h.push(m), 15 == m) break
            }
            var f = "";
            var g = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"];
            var A = 0;
            for (; A < h.length; A++) f = f + g[h[A]];
            d = parseFloat(f)
        }
        if (o <= 21) if (c = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"][o], l = 1, 12 == o) {
            c = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"][s];
            l = 2
        }
        if (null != c) {
            a[c] = 1 == i.length ? i[0] : i;
            i = []
        } else i.push(d);
        t = t + l
    }
    return a
};
y.cmap = {};
y.cmap.parse = function (e, t, n) {
    e = new Uint8Array(e.buffer, t, n);
    t = 0;
    var r = y._bin;
    var a = {};
    r.readUshort(e, t);
    t = t + 2;
    var i = r.readUshort(e, t);
    t = t + 2;
    var o = [];
    a.tables = [];
    var s = 0;
    for (; s < i; s++) {
        var l = r.readUshort(e, t);
        t = t + 2;
        var c = r.readUshort(e, t);
        t = t + 2;
        var d = r.readUint(e, t);
        t = t + 4;
        var h = "p" + l + "e" + c;
        var u = o.indexOf(d);
        if (-1 == u) {
            var p;
            u = a.tables.length;
            o.push(d);
            var m = r.readUshort(e, d);
            if (0 == m) p = y.cmap.parse0(e, d);
            else if (4 == m) p = y.cmap.parse4(e, d);
            else if (6 == m) p = y.cmap.parse6(e, d);
            else if (12 == m) p = y.cmap.parse12(e, d);
            else console.log("unknown format:" + m, l, c, d);
            a.tables.push(p)
        }
        if (null != a[h]) throw "multiple tables for one platform+encoding";
        a[h] = u
    }
    return a
};
y.cmap.parse0 = function (e, t) {
    var n = y._bin;
    var r = {};
    r.format = n.readUshort(e, t);
    t = t + 2;
    var a = n.readUshort(e, t);
    t = t + 2;
    n.readUshort(e, t);
    t = t + 2;
    r.map = [];
    var i = 0;
    for (; i < a - 6; i++) r.map.push(e[t + i]);
    return r
};
y.cmap.parse4 = function (e, t) {
    var n = y._bin;
    var r = t;
    var a = {};
    a.format = n.readUshort(e, t);
    t = t + 2;
    var i = n.readUshort(e, t);
    t = t + 2;
    n.readUshort(e, t);
    t = t + 2;
    var o = n.readUshort(e, t);
    t = t + 2;
    var s = o / 2;
    a.searchRange = n.readUshort(e, t);
    t = t + 2;
    a.entrySelector = n.readUshort(e, t);
    t = t + 2;
    a.rangeShift = n.readUshort(e, t);
    t = t + 2;
    a.endCount = n.readUshorts(e, t, s);
    t = t + 2 * s;
    t = t + 2;
    a.startCount = n.readUshorts(e, t, s);
    t = t + 2 * s;
    a.idDelta = [];
    var l = 0;
    for (; l < s; l++) {
        a.idDelta.push(n.readShort(e, t));
        t = t + 2
    }
    a.idRangeOffset = n.readUshorts(e, t, s);
    t = t + 2 * s;
    a.glyphIdArray = [];
    for (; t < r + i;) {
        a.glyphIdArray.push(n.readUshort(e, t));
        t = t + 2
    }
    return a
};
y.cmap.parse6 = function (e, t) {
    var n = y._bin;
    var r = {};
    r.format = n.readUshort(e, t);
    t = t + 2;
    n.readUshort(e, t);
    t = t + 2;
    n.readUshort(e, t);
    t = t + 2;
    r.firstCode = n.readUshort(e, t);
    t = t + 2;
    var a = n.readUshort(e, t);
    t = t + 2;
    r.glyphIdArray = [];
    var i = 0;
    for (; i < a; i++) {
        r.glyphIdArray.push(n.readUshort(e, t));
        t = t + 2
    }
    return r
};
y.cmap.parse12 = function (e, t) {
    var n = y._bin;
    var r = {};
    r.format = n.readUshort(e, t);
    t = t + 2;
    t = t + 2;
    n.readUint(e, t);
    t = t + 4;
    n.readUint(e, t);
    t = t + 4;
    var a = n.readUint(e, t);
    t = t + 4;
    r.groups = [];
    var i = 0;
    for (; i < a; i++) {
        var o = t + 12 * i;
        var s = n.readUint(e, o + 0);
        var l = n.readUint(e, o + 4);
        var c = n.readUint(e, o + 8);
        r.groups.push([s, l, c])
    }
    return r
};
y.glyf = {};
y.glyf.parse = function (e, t, n, r) {
    var a = [];
    var i = 0;
    for (; i < r.maxp.numGlyphs; i++) a.push(null);
    return a
};
y.glyf._parseGlyf = function (e, t) {
    var n = y._bin;
    var r = e._data;
    var a = y._tabOffset(r, "glyf") + e.loca[t];
    if (e.loca[t] == e.loca[t + 1]) return null;
    var i = {};
    if (i.noc = n.readShort(r, a), a = a + 2, i.xMin = n.readShort(r, a), a = a + 2, i.yMin = n.readShort(r, a), a = a + 2, i.xMax = n.readShort(r, a), a = a + 2, i.yMax = n.readShort(r, a), a = a + 2, i.xMin >= i.xMax || i.yMin >= i.yMax) return null;
    if (i.noc > 0) {
        i.endPts = [];
        var o = 0;
        for (; o < i.noc; o++) {
            i.endPts.push(n.readUshort(r, a));
            a = a + 2
        }
        var s = n.readUshort(r, a);
        if (a = a + 2, r.length - a < s) return null;
        i.instructions = n.readBytes(r, a, s);
        a = a + s;
        var l = i.endPts[i.noc - 1] + 1;
        i.flags = [];
        o = 0;
        for (; o < l; o++) {
            var c = r[a];
            if (a++, i.flags.push(c), 0 != (8 & c)) {
                var d = r[a];
                a++;
                var h = 0;
                for (; h < d; h++) {
                    i.flags.push(c);
                    o++
                }
            }
        }
        i.xs = [];
        o = 0;
        for (; o < l; o++) {
            var u = 0 != (2 & i.flags[o]);
            var p = 0 != (16 & i.flags[o]);
            if (u) {
                i.xs.push(p ? r[a] : -r[a]);
                a++
            } else if (p) i.xs.push(0);
            else {
                i.xs.push(n.readShort(r, a));
                a = a + 2
            }
        }
        i.ys = [];
        o = 0;
        for (; o < l; o++) {
            u = 0 != (4 & i.flags[o]);
            p = 0 != (32 & i.flags[o]);
            if (u) {
                i.ys.push(p ? r[a] : -r[a]);
                a++
            } else if (p) i.ys.push(0);
            else {
                i.ys.push(n.readShort(r, a));
                a = a + 2
            }
        }
        var m = 0;
        var f = 0;
        o = 0;
        for (; o < l; o++) {
            m = m + i.xs[o];
            f = f + i.ys[o];
            i.xs[o] = m;
            i.ys[o] = f
        }
    } else {
        var g;
        i.parts = [];
        do {
            g = n.readUshort(r, a);
            a = a + 2;
            var A = {
                m: {
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    tx: 0,
                    ty: 0
                },
                p1: -1,
                p2: -1
            };
            if (i.parts.push(A), A.glyphIndex = n.readUshort(r, a), a = a + 2, 1 & g) {
                var E = n.readShort(r, a);
                a = a + 2;
                var v = n.readShort(r, a);
                a = a + 2
            } else {
                E = n.readInt8(r, a);
                a++;
                v = n.readInt8(r, a);
                a++
            }
            if (2 & g) {
                A.m.tx = E;
                A.m.ty = v
            } else {
                A.p1 = E;
                A.p2 = v
            }
            if (8 & g) {
                A.m.a = A.m.d = n.readF2dot14(r, a);
                a = a + 2
            } else if (64 & g) {
                A.m.a = n.readF2dot14(r, a);
                a = a + 2;
                A.m.d = n.readF2dot14(r, a);
                a = a + 2
            } else if (128 & g) {
                A.m.a = n.readF2dot14(r, a);
                a = a + 2;
                A.m.b = n.readF2dot14(r, a);
                a = a + 2;
                A.m.c = n.readF2dot14(r, a);
                a = a + 2;
                A.m.d = n.readF2dot14(r, a);
                a = a + 2
            }
        } while (32 & g);
        if (256 & g) {
            var S = n.readUshort(r, a);
            a = a + 2;
            i.instr = [];
            o = 0;
            for (; o < S; o++) {
                i.instr.push(r[a]);
                a++
            }
        }
    }
    return i
};
y.GPOS = {};
y.GPOS.parse = function (e, t, n, r) {
    return y._lctf.parse(e, t, n, r, y.GPOS.subt)
};
y.GPOS.subt = function (e, t, n) {
    if (2 != t) return null;
    var r = y._bin;
    var a = n;
    var i = {};
    i.format = r.readUshort(e, n);
    n = n + 2;
    var o = r.readUshort(e, n);
    n = n + 2;
    i.coverage = y._lctf.readCoverage(e, o + a);
    i.valFmt1 = r.readUshort(e, n);
    n = n + 2;
    i.valFmt2 = r.readUshort(e, n);
    n = n + 2;
    var s = y._lctf.numOfOnes(i.valFmt1);
    var l = y._lctf.numOfOnes(i.valFmt2);
    if (1 == i.format) {
        i.pairsets = [];
        var c = r.readUshort(e, n);
        n = n + 2;
        var d = 0;
        for (; d < c; d++) {
            var h = r.readUshort(e, n);
            n = n + 2;
            h = h + a;
            var u = r.readUshort(e, h);
            h = h + 2;
            var p = [];
            var m = 0;
            for (; m < u; m++) {
                var f = r.readUshort(e, h);
                h = h + 2;
                if (0 != i.valFmt1) {
                    C = y._lctf.readValueRecord(e, h, i.valFmt1);
                    h = h + 2 * s
                }
                if (0 != i.valFmt2) {
                    x = y._lctf.readValueRecord(e, h, i.valFmt2);
                    h = h + 2 * l
                }
                p.push({
                    gid2: f,
                    val1: C,
                    val2: x
                })
            }
            i.pairsets.push(p)
        }
    }
    if (2 == i.format) {
        var g = r.readUshort(e, n);
        n = n + 2;
        var A = r.readUshort(e, n);
        n = n + 2;
        var E = r.readUshort(e, n);
        n = n + 2;
        var v = r.readUshort(e, n);
        n = n + 2;
        i.classDef1 = y._lctf.readClassDef(e, a + g);
        i.classDef2 = y._lctf.readClassDef(e, a + A);
        i.matrix = [];
        d = 0;
        for (; d < E; d++) {
            var S = [];
            m = 0;
            for (; m < v; m++) {
                var C = null;
                var x = null;
                if (0 != i.valFmt1) {
                    C = y._lctf.readValueRecord(e, n, i.valFmt1);
                    n = n + 2 * s
                }
                if (0 != i.valFmt2) {
                    x = y._lctf.readValueRecord(e, n, i.valFmt2);
                    n = n + 2 * l
                }
                S.push({
                    val1: C,
                    val2: x
                })
            }
            i.matrix.push(S)
        }
    }
    return i
};
y.GSUB = {};
y.GSUB.parse = function (e, t, n, r) {
    return y._lctf.parse(e, t, n, r, y.GSUB.subt)
};
y.GSUB.subt = function (e, t, n) {
    var r = y._bin;
    var a = n;
    var i = {};
    if (1 != t && 4 != t && 5 != t) return null;
    i.fmt = r.readUshort(e, n);
    n = n + 2;
    var o = r.readUshort(e, n);
    if (n = n + 2, i.coverage = y._lctf.readCoverage(e, o + a), 1 == t) if (1 == i.fmt) {
        i.delta = r.readShort(e, n);
        n = n + 2
    } else {
        if (2 == i.fmt) {
            var s = r.readUshort(e, n);
            n = n + 2;
            i.newg = r.readUshorts(e, n, s);
            n = n + 2 * i.newg.length
        }
    } else if (4 == t) {
        i.vals = [];
        s = r.readUshort(e, n);
        n = n + 2;
        var l = 0;
        for (; l < s; l++) {
            var c = r.readUshort(e, n);
            n = n + 2;
            i.vals.push(y.GSUB.readLigatureSet(e, a + c))
        }
    } else if (5 == t) if (2 == i.fmt) {
        var d = r.readUshort(e, n);
        n = n + 2;
        i.cDef = y._lctf.readClassDef(e, a + d);
        i.scset = [];
        var h = r.readUshort(e, n);
        n = n + 2;
        l = 0;
        for (; l < h; l++) {
            var u = r.readUshort(e, n);
            n = n + 2;
            i.scset.push(0 == u ? null : y.GSUB.readSubClassSet(e, a + u))
        }
    } else console.log("unknown table format", i.fmt);
    return i
};
y.GSUB.readSubClassSet = function (e, t) {
    var n = y._bin.readUshort;
    var r = t;
    var a = [];
    var i = n(e, t);
    t = t + 2;
    var o = 0;
    for (; o < i; o++) {
        var s = n(e, t);
        t = t + 2;
        a.push(y.GSUB.readSubClassRule(e, r + s))
    }
    return a
};
y.GSUB.readSubClassRule = function (e, t) {
    var n = y._bin.readUshort;
    var r = {};
    var a = n(e, t);
    var i = n(e, t = t + 2);
    t = t + 2;
    r.input = [];
    var o = 0;
    for (; o < a - 1; o++) {
        r.input.push(n(e, t));
        t = t + 2
    }
    return r.substLookupRecords = y.GSUB.readSubstLookupRecords(e, t, i),
    r
};
y.GSUB.readSubstLookupRecords = function (e, t, n) {
    var r = y._bin.readUshort;
    var a = [];
    var i = 0;
    for (; i < n; i++) {
        a.push(r(e, t), r(e, t + 2));
        t = t + 4
    }
    return a
};
y.GSUB.readChainSubClassSet = function (e, t) {
    var n = y._bin;
    var r = t;
    var a = [];
    var i = n.readUshort(e, t);
    t = t + 2;
    var o = 0;
    for (; o < i; o++) {
        var s = n.readUshort(e, t);
        t = t + 2;
        a.push(y.GSUB.readChainSubClassRule(e, r + s))
    }
    return a
};
y.GSUB.readChainSubClassRule = function (e, t) {
    var n = y._bin;
    var r = {};
    var a = ["backtrack", "input", "lookahead"];
    var i = 0;
    for (; i < a.length; i++) {
        var o = n.readUshort(e, t);
        t = t + 2;
        if (1 == i) o--;
        r[a[i]] = n.readUshorts(e, t, o);
        t = t + 2 * r[a[i]].length
    }
    o = n.readUshort(e, t);
    return t = t + 2,
    r.subst = n.readUshorts(e, t, 2 * o),
    t = t + 2 * r.subst.length,
    r
};
y.GSUB.readLigatureSet = function (e, t) {
    var n = y._bin;
    var r = t;
    var a = [];
    var i = n.readUshort(e, t);
    t = t + 2;
    var o = 0;
    for (; o < i; o++) {
        var s = n.readUshort(e, t);
        t = t + 2;
        a.push(y.GSUB.readLigature(e, r + s))
    }
    return a
};
y.GSUB.readLigature = function (e, t) {
    var n = y._bin;
    var r = {
        chain: []
    };
    r.nglyph = n.readUshort(e, t);
    t = t + 2;
    var a = n.readUshort(e, t);
    t = t + 2;
    var i = 0;
    for (; i < a - 1; i++) {
        r.chain.push(n.readUshort(e, t));
        t = t + 2
    }
    return r
};
y.head = {};
y.head.parse = function (e, t, n) {
    var r = y._bin;
    var a = {};
    r.readFixed(e, t);
    t = t + 4;
    a.fontRevision = r.readFixed(e, t);
    t = t + 4;
    r.readUint(e, t);
    t = t + 4;
    r.readUint(e, t);
    return t = t + 4,
    a.flags = r.readUshort(e, t),
    t = t + 2,
    a.unitsPerEm = r.readUshort(e, t),
    t = t + 2,
    a.created = r.readUint64(e, t),
    t = t + 8,
    a.modified = r.readUint64(e, t),
    t = t + 8,
    a.xMin = r.readShort(e, t),
    t = t + 2,
    a.yMin = r.readShort(e, t),
    t = t + 2,
    a.xMax = r.readShort(e, t),
    t = t + 2,
    a.yMax = r.readShort(e, t),
    t = t + 2,
    a.macStyle = r.readUshort(e, t),
    t = t + 2,
    a.lowestRecPPEM = r.readUshort(e, t),
    t = t + 2,
    a.fontDirectionHint = r.readShort(e, t),
    t = t + 2,
    a.indexToLocFormat = r.readShort(e, t),
    t = t + 2,
    a.glyphDataFormat = r.readShort(e, t),
    t = t + 2,
    a
};
y.hhea = {};
y.hhea.parse = function (e, t, n) {
    var r = y._bin;
    var a = {};
    r.readFixed(e, t);
    return t = t + 4,
    a.ascender = r.readShort(e, t),
    t = t + 2,
    a.descender = r.readShort(e, t),
    t = t + 2,
    a.lineGap = r.readShort(e, t),
    t = t + 2,
    a.advanceWidthMax = r.readUshort(e, t),
    t = t + 2,
    a.minLeftSideBearing = r.readShort(e, t),
    t = t + 2,
    a.minRightSideBearing = r.readShort(e, t),
    t = t + 2,
    a.xMaxExtent = r.readShort(e, t),
    t = t + 2,
    a.caretSlopeRise = r.readShort(e, t),
    t = t + 2,
    a.caretSlopeRun = r.readShort(e, t),
    t = t + 2,
    a.caretOffset = r.readShort(e, t),
    t = t + 2,
    t = t + 8,
    a.metricDataFormat = r.readShort(e, t),
    t = t + 2,
    a.numberOfHMetrics = r.readUshort(e, t),
    t = t + 2,
    a
};
y.hmtx = {};
y.hmtx.parse = function (e, t, n, r) {
    var a = y._bin;
    var i = {
        aWidth: [],
        lsBearing: []
    };
    var o = 0;
    var s = 0;
    var l = 0;
    for (; l < r.maxp.numGlyphs; l++) {
        if (l < r.hhea.numberOfHMetrics) {
            o = a.readUshort(e, t);
            t = t + 2;
            s = a.readShort(e, t);
            t = t + 2
        }
        i.aWidth.push(o);
        i.lsBearing.push(s)
    }
    return i
};
y.kern = {};
y.kern.parse = function (e, t, n, r) {
    var a = y._bin;
    var i = a.readUshort(e, t);
    if (t = t + 2, 1 == i) return y.kern.parseV1(e, t - 2, n, r);
    var o = a.readUshort(e, t);
    t = t + 2;
    var s = {
        glyph1: [],
        rval: []
    };
    var l = 0;
    for (; l < o; l++) {
        t = t + 2;
        n = a.readUshort(e, t);
        t = t + 2;
        var c = a.readUshort(e, t);
        t = t + 2;
        var d = c >>> 8;
        if (0 != (d = d & 15)) throw "unknown kern table format:" + d;
        t = y.kern.readFormat0(e, t, s)
    }
    return s
};
y.kern.parseV1 = function (e, t, n, r) {
    var a = y._bin;
    a.readFixed(e, t);
    t = t + 4;
    var i = a.readUint(e, t);
    t = t + 4;
    var o = {
        glyph1: [],
        rval: []
    };
    var s = 0;
    for (; s < i; s++) {
        a.readUint(e, t);
        t = t + 4;
        var l = a.readUshort(e, t);
        t = t + 2;
        a.readUshort(e, t);
        t = t + 2;
        var c = l >>> 8;
        if (0 != (c = c & 15)) throw "unknown kern table format:" + c;
        t = y.kern.readFormat0(e, t, o)
    }
    return o
};
y.kern.readFormat0 = function (e, t, n) {
    var r = y._bin;
    var a = -1;
    var i = r.readUshort(e, t);
    t = t + 2;
    r.readUshort(e, t);
    t = t + 2;
    r.readUshort(e, t);
    t = t + 2;
    r.readUshort(e, t);
    t = t + 2;
    var o = 0;
    for (; o < i; o++) {
        var s = r.readUshort(e, t);
        t = t + 2;
        var l = r.readUshort(e, t);
        t = t + 2;
        var c = r.readShort(e, t);
        t = t + 2;
        if (s != a) {
            n.glyph1.push(s);
            n.rval.push({
                glyph2: [],
                vals: []
            })
        }
        var d = n.rval[n.rval.length - 1];
        d.glyph2.push(l);
        d.vals.push(c);
        a = s
    }
    return t
};
y.loca = {};
y.loca.parse = function (e, t, n, r) {
    var a = y._bin;
    var i = [];
    var o = r.head.indexToLocFormat;
    var s = r.maxp.numGlyphs + 1;
    if (0 == o) {
        var l = 0;
        for (; l < s; l++) i.push(a.readUshort(e, t + (l << 1)) << 1)
    }
    if (1 == o) {
        l = 0;
        for (; l < s; l++) i.push(a.readUint(e, t + (l << 2)))
    }
    return i
};
y.maxp = {};
y.maxp.parse = function (e, t, n) {
    var r = y._bin;
    var a = {};
    var i = r.readUint(e, t);
    return t = t + 4,
    a.numGlyphs = r.readUshort(e, t),
    t = t + 2,
    65536 == i && (a.maxPoints = r.readUshort(e, t), t = t + 2, a.maxContours = r.readUshort(e, t), t = t + 2, a.maxCompositePoints = r.readUshort(e, t), t = t + 2, a.maxCompositeContours = r.readUshort(e, t), t = t + 2, a.maxZones = r.readUshort(e, t), t = t + 2, a.maxTwilightPoints = r.readUshort(e, t), t = t + 2, a.maxStorage = r.readUshort(e, t), t = t + 2, a.maxFunctionDefs = r.readUshort(e, t), t = t + 2, a.maxInstructionDefs = r.readUshort(e, t), t = t + 2, a.maxStackElements = r.readUshort(e, t), t = t + 2, a.maxSizeOfInstructions = r.readUshort(e, t), t = t + 2, a.maxComponentElements = r.readUshort(e, t), t = t + 2, a.maxComponentDepth = r.readUshort(e, t), t = t + 2),
    a
};
y.name = {};
y.name.parse = function (e, t, n) {
    var r = y._bin;
    var a = {};
    r.readUshort(e, t);
    t = t + 2;
    var i = r.readUshort(e, t);
    t = t + 2;
    r.readUshort(e, t);
    var o;
    var s = t = t + 2;
    var l = 0;
    for (; l < i; l++) {
        var c = r.readUshort(e, t);
        t = t + 2;
        var d = r.readUshort(e, t);
        t = t + 2;
        var h = r.readUshort(e, t);
        t = t + 2;
        var u = r.readUshort(e, t);
        t = t + 2;
        n = r.readUshort(e, t);
        t = t + 2;
        var p = r.readUshort(e, t);
        t = t + 2;
        var m = "p" + c;
        if (null == a[m]) a[m] = {};
        var f;
        var g = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"][u];
        var A = s + 12 * i + p;
        if (0 == c) f = r.readUnicode(e, A, n / 2);
        else if (3 == c && 0 == d) f = r.readUnicode(e, A, n / 2);
        else if (0 == d) f = r.readASCII(e, A, n);
        else if (1 == d) f = r.readUnicode(e, A, n / 2);
        else if (3 == d) f = r.readUnicode(e, A, n / 2);
        else {
            if (1 != c) throw "unknown encoding " + d + ",platformID:" + c;
            f = r.readASCII(e, A, n);
            console.log("reading unknown MAC encoding " + d + " as ASCII")
        }
        a[m][g] = f;
        a[m]._lang = h
    }
    var E;
    for (E in a) if (null != a[E].postScriptName && 1033 == a[E]._lang) return a[E];
    for (E in a) if (null != a[E].postScriptName && 3084 == a[E]._lang) return a[E];
    for (E in a) if (null != a[E].postScriptName) return a[E];
    for (E in a) {
        o = E;
        break
    }
    return console.log("returning name table with languageID " + a[o]._lang),
    a[o]
};
y["OS/2"] = {};
y["OS/2"].parse = function (e, t, n) {
    var r = y._bin.readUshort(e, t);
    t = t + 2;
    var a = {};
    if (0 == r) y["OS/2"].version0(e, t, a);
    else if (1 == r) y["OS/2"].version1(e, t, a);
    else if (2 == r || 3 == r || 4 == r) y["OS/2"].version2(e, t, a);
    else {
        if (5 != r) throw "unknown OS/2 table version:" + r;
        y["OS/2"].version5(e, t, a)
    }
    return a
};
y["OS/2"].version0 = function (e, t, n) {
    var r = y._bin;
    return n.xAvgCharWidth = r.readShort(e, t),
    t = t + 2,
    n.usWeightClass = r.readUshort(e, t),
    t = t + 2,
    n.usWidthClass = r.readUshort(e, t),
    t = t + 2,
    n.fsType = r.readUshort(e, t),
    t = t + 2,
    n.ySubscriptXSize = r.readShort(e, t),
    t = t + 2,
    n.ySubscriptYSize = r.readShort(e, t),
    t = t + 2,
    n.ySubscriptXOffset = r.readShort(e, t),
    t = t + 2,
    n.ySubscriptYOffset = r.readShort(e, t),
    t = t + 2,
    n.ySuperscriptXSize = r.readShort(e, t),
    t = t + 2,
    n.ySuperscriptYSize = r.readShort(e, t),
    t = t + 2,
    n.ySuperscriptXOffset = r.readShort(e, t),
    t = t + 2,
    n.ySuperscriptYOffset = r.readShort(e, t),
    t = t + 2,
    n.yStrikeoutSize = r.readShort(e, t),
    t = t + 2,
    n.yStrikeoutPosition = r.readShort(e, t),
    t = t + 2,
    n.sFamilyClass = r.readShort(e, t),
    t = t + 2,
    n.panose = r.readBytes(e, t, 10),
    t = t + 10,
    n.ulUnicodeRange1 = r.readUint(e, t),
    t = t + 4,
    n.ulUnicodeRange2 = r.readUint(e, t),
    t = t + 4,
    n.ulUnicodeRange3 = r.readUint(e, t),
    t = t + 4,
    n.ulUnicodeRange4 = r.readUint(e, t),
    t = t + 4,
    n.achVendID = [r.readInt8(e, t), r.readInt8(e, t + 1), r.readInt8(e, t + 2), r.readInt8(e, t + 3)],
    t = t + 4,
    n.fsSelection = r.readUshort(e, t),
    t = t + 2,
    n.usFirstCharIndex = r.readUshort(e, t),
    t = t + 2,
    n.usLastCharIndex = r.readUshort(e, t),
    t = t + 2,
    n.sTypoAscender = r.readShort(e, t),
    t = t + 2,
    n.sTypoDescender = r.readShort(e, t),
    t = t + 2,
    n.sTypoLineGap = r.readShort(e, t),
    t = t + 2,
    n.usWinAscent = r.readUshort(e, t),
    t = t + 2,
    n.usWinDescent = r.readUshort(e, t),
    t = t + 2
};
y["OS/2"].version1 = function (e, t, n) {
    var r = y._bin;
    return t = y["OS/2"].version0(e, t, n),
    n.ulCodePageRange1 = r.readUint(e, t),
    t = t + 4,
    n.ulCodePageRange2 = r.readUint(e, t),
    t = t + 4
};
y["OS/2"].version2 = function (e, t, n) {
    var r = y._bin;
    return t = y["OS/2"].version1(e, t, n),
    n.sxHeight = r.readShort(e, t),
    t = t + 2,
    n.sCapHeight = r.readShort(e, t),
    t = t + 2,
    n.usDefault = r.readUshort(e, t),
    t = t + 2,
    n.usBreak = r.readUshort(e, t),
    t = t + 2,
    n.usMaxContext = r.readUshort(e, t),
    t = t + 2
};
y["OS/2"].version5 = function (e, t, n) {
    var r = y._bin;
    return t = y["OS/2"].version2(e, t, n),
    n.usLowerOpticalPointSize = r.readUshort(e, t),
    t = t + 2,
    n.usUpperOpticalPointSize = r.readUshort(e, t),
    t = t + 2
};
y.post = {};
y.post.parse = function (e, t, n) {
    var r = y._bin;
    var a = {};
    return a.version = r.readFixed(e, t),
    t = t + 4,
    a.italicAngle = r.readFixed(e, t),
    t = t + 4,
    a.underlinePosition = r.readShort(e, t),
    t = t + 2,
    a.underlineThickness = r.readShort(e, t),
    t = t + 2,
    a
};
y.SVG = {};
y.SVG.parse = function (e, t, n) {
    var r = y._bin;
    var a = {
        entries: []
    };
    var i = t;
    r.readUshort(e, t);
    t = t + 2;
    var o = r.readUint(e, t);
    t = t + 4;
    r.readUint(e, t);
    t = t + 4;
    t = o + i;
    var s = r.readUshort(e, t);
    t = t + 2;
    var l = 0;
    for (; l < s; l++) {
        var c = r.readUshort(e, t);
        t = t + 2;
        var d = r.readUshort(e, t);
        t = t + 2;
        var h = r.readUint(e, t);
        t = t + 4;
        var u = r.readUint(e, t);
        t = t + 4;
        var p = new Uint8Array(e.buffer, i + h + o, u);
        var m = r.readUTF8(p, 0, p.length);
        var f = c;
        for (; f <= d; f++) a.entries[f] = m
    }
    return a
};
y.SVG.toPath = function (e) {
    var t = {
        cmds: [],
        crds: []
    };
    if (null == e) return t;
    var n = (new DOMParser).parseFromString(e, "image/svg+xml").firstChild;
    for (;
    "svg" != n.tagName;) n = n.nextSibling;
    var r = n.getAttribute("viewBox");
    r = r ? r.trim().split(" ").map(parseFloat) : [0, 0, 1E3, 1E3];
    y.SVG._toPath(n.children, t);
    var a = 0;
    for (; a < t.crds.length; a = a + 2) {
        var i = t.crds[a];
        var o = t.crds[a + 1];
        i = i - r[0];
        o = -(o = o - r[1]);
        t.crds[a] = i;
        t.crds[a + 1] = o
    }
    return t
};
y.SVG._toPath = function (e, t, n) {
    var r = 0;
    for (; r < e.length; r++) {
        var a = e[r];
        var i = a.tagName;
        var o = a.getAttribute("fill");
        if (null == o && (o = n), "g" == i) y.SVG._toPath(a.children, t, o);
        else if ("path" == i) {
            t.cmds.push(o || "#000000");
            var s = a.getAttribute("d");
            var l = y.SVG._tokens(s);
            y.SVG._toksToPath(l, t);
            t.cmds.push("X")
        } else if (! ("defs" == i)) console.log(i, a)
    }
};
y.SVG._tokens = function (e) {
    var t = [];
    var n = 0;
    var r = false;
    var a = "";
    for (; n < e.length;) {
        var i = e.charCodeAt(n);
        var o = e.charAt(n);
        n++;
        var s = 48 <= i && i <= 57 || "." == o || "-" == o;
        if (r) if ("-" == o) {
            t.push(parseFloat(a));
            a = o
        } else if (s) a = a + o;
        else {
            t.push(parseFloat(a));
            if ("," != o && " " != o) t.push(o);
            r = false
        } else if (s) {
            a = o;
            r = true
        } else if ("," != o && " " != o) t.push(o)
    }
    return r && t.push(parseFloat(a)),
    t
};
y.SVG._toksToPath = function (e, t) {
    var n = 0;
    var r = 0;
    var a = 0;
    var i = 0;
    var o = 0;
    var s = {
        M: 2,
        L: 2,
        H: 1,
        V: 1,
        S: 4,
        C: 6
    };
    var l = t.cmds;
    var c = t.crds;
    for (; n < e.length;) {
        var d = e[n];
        if (n++, "z" == d) {
            l.push("Z");
            r = i;
            a = o
        } else {
            var h = d.toUpperCase();
            var u = s[h];
            var p = y.SVG._reps(e, n, u);
            var m = 0;
            for (; m < p; m++) {
                var f = 0;
                var g = 0;
                if (d != h && (f = r, g = a), "M" == h) {
                    r = f + e[n++];
                    a = g + e[n++];
                    l.push("M");
                    c.push(r, a);
                    i = r;
                    o = a
                } else if ("L" == h) {
                    r = f + e[n++];
                    a = g + e[n++];
                    l.push("L");
                    c.push(r, a)
                } else if ("H" == h) {
                    r = f + e[n++];
                    l.push("L");
                    c.push(r, a)
                } else if ("V" == h) {
                    a = g + e[n++];
                    l.push("L");
                    c.push(r, a)
                } else if ("C" == h) {
                    var A = f + e[n++];
                    var E = g + e[n++];
                    var v = f + e[n++];
                    var S = g + e[n++];
                    var C = f + e[n++];
                    var x = g + e[n++];
                    l.push("C");
                    c.push(A, E, v, S, C, x);
                    r = C;
                    a = x
                } else if ("S" == h) {
                    var I = Math.max(c.length - 4, 0);
                    A = r + r - c[I];
                    E = a + a - c[I + 1];
                    v = f + e[n++];
                    S = g + e[n++];
                    C = f + e[n++];
                    x = g + e[n++];
                    l.push("C");
                    c.push(A, E, v, S, C, x);
                    r = C;
                    a = x
                } else console.log("Unknown SVG command " + d)
            }
        }
    }
};
y.SVG._reps = function (e, t, n) {
    var r = t;
    for (; r < e.length && "string" != typeof e[r];) r = r + n;
    return (r - t) / n
};
var A = y;
if (null == A.U) A.U = {};
A.U.codeToGlyph = function (e, t) {
    var n = e.cmap;
    var r = -1;
    if (null != n.p0e10 ? r = n.p0e10 : null != n.p0e4 ? r = n.p0e4 : null != n.p3e1 ? r = n.p3e1 : null != n.p1e0 && (r = n.p1e0), -1 == r) throw "no familiar platform and encoding!";
    var a = n.tables[r];
    if (0 == a.format) return t >= a.map.length ? 0 : a.map[t];
    if (4 == a.format) {
        var i = -1;
        var o = 0;
        for (; o < a.endCount.length; o++) if (t <= a.endCount[o]) {
            i = o;
            break
        }
        if (-1 == i) return 0;
        if (a.startCount[i] > t) return 0;
        return 65535 & (0 != a.idRangeOffset[i] ? a.glyphIdArray[t - a.startCount[i] + (a.idRangeOffset[i] >> 1) - (a.idRangeOffset.length - i)] : t + a.idDelta[i])
    }
    if (12 == a.format) {
        if (t > a.groups[a.groups.length - 1][1]) return 0;
        o = 0;
        for (; o < a.groups.length; o++) {
            var s = a.groups[o];
            if (s[0] <= t && t <= s[1]) return s[2] + (t - s[0])
        }
        return 0
    }
    throw "unknown cmap table format " + a.format;
};
A.U.glyphToPath = function (e, t) {
    var n = {
        cmds: [],
        crds: []
    };
    if (e.SVG && e.SVG.entries[t]) {
        var r = e.SVG.entries[t];
        return null == r ? n : ("string" == typeof r && (r = A.SVG.toPath(r), e.SVG.entries[t] = r), r)
    }
    if (e.CFF) {
        var a = {
            x: 0,
            y: 0,
            stack: [],
            nStems: 0,
            haveWidth: false,
            width: e.CFF.Private ? e.CFF.Private.defaultWidthX : 0,
            open: false
        };
        A.U._drawCFF(e.CFF.CharStrings[t], a, e.CFF, n)
    } else if (e.glyf) A.U._drawGlyf(t, e, n);
    return n
};
A.U._drawGlyf = function (e, t, n) {
    var r = t.glyf[e];
    if (null == r) r = t.glyf[e] = A.glyf._parseGlyf(t, e);
    if (null != r) if (r.noc > -1) A.U._simpleGlyph(r, n);
    else A.U._compoGlyph(r, t, n)
};
A.U._simpleGlyph = function (e, t) {
    var n = 0;
    for (; n < e.noc; n++) {
        var r = 0 == n ? 0 : e.endPts[n - 1] + 1;
        var a = e.endPts[n];
        var i = r;
        for (; i <= a; i++) {
            var o = i == r ? a : i - 1;
            var s = i == a ? r : i + 1;
            var l = 1 & e.flags[i];
            var c = 1 & e.flags[o];
            var d = 1 & e.flags[s];
            var h = e.xs[i];
            var u = e.ys[i];
            if (i == r) if (l) {
                if (!c) {
                    A.U.P.moveTo(t, h, u);
                    continue
                }
                A.U.P.moveTo(t, e.xs[o], e.ys[o])
            } else if (c) A.U.P.moveTo(t, e.xs[o], e.ys[o]);
            else A.U.P.moveTo(t, (e.xs[o] + h) / 2, (e.ys[o] + u) / 2);
            if (l) {
                if (c) A.U.P.lineTo(t, h, u)
            } else if (d) A.U.P.qcurveTo(t, h, u, e.xs[s], e.ys[s]);
            else A.U.P.qcurveTo(t, h, u, (h + e.xs[s]) / 2, (u + e.ys[s]) / 2)
        }
        A.U.P.closePath(t)
    }
};
A.U._compoGlyph = function (e, t, n) {
    var r = 0;
    for (; r < e.parts.length; r++) {
        var a = {
            cmds: [],
            crds: []
        };
        var i = e.parts[r];
        A.U._drawGlyf(i.glyphIndex, t, a);
        var o = i.m;
        var s = 0;
        for (; s < a.crds.length; s = s + 2) {
            var l = a.crds[s];
            var c = a.crds[s + 1];
            n.crds.push(l * o.a + c * o.b + o.tx);
            n.crds.push(l * o.c + c * o.d + o.ty)
        }
        s = 0;
        for (; s < a.cmds.length; s++) n.cmds.push(a.cmds[s])
    }
};
A.U._getGlyphClass = function (e, t) {
    var n = A._lctf.getInterval(t, e);
    return -1 == n ? 0 : t[n + 2]
};
A.U.getPairAdjustment = function (e, t, n) {
    if (e.GPOS) {
        var r = null;
        var a = 0;
        for (; a < e.GPOS.featureList.length; a++) {
            var i = e.GPOS.featureList[a];
            if ("kern" == i.tag) {
                var o = 0;
                for (; o < i.tab.length; o++) if (2 == e.GPOS.lookupList[i.tab[o]].ltype) r = e.GPOS.lookupList[i.tab[o]]
            }
        }
        if (r) {
            a = 0;
            for (; a < r.tabs.length; a++) {
                var s = r.tabs[a];
                var l = A._lctf.coverageIndex(s.coverage, t);
                if (-1 != l) {
                    if (1 == s.format) {
                        var c = s.pairsets[l];
                        o = 0;
                        for (; o < c.length; o++) if (c[o].gid2 == n) u = c[o];
                        if (null == u) continue
                    } else if (2 == s.format) {
                        var d = A.U._getGlyphClass(t, s.classDef1);
                        var h = A.U._getGlyphClass(n, s.classDef2);
                        var u = s.matrix[d][h]
                    }
                    return u.val1[2]
                }
            }
        }
    }
    if (e.kern) {
        var p = e.kern.glyph1.indexOf(t);
        if (-1 != p) {
            var m = e.kern.rval[p].glyph2.indexOf(n);
            if (-1 != m) return e.kern.rval[p].vals[m]
        }
    }
    return 0
};
A.U.processLFList = function (e) {
    var t = e.llist;
    var n = e.flist;
    var r = e.gls;
    var a = e.str;
    var i = '\n\t" ,.:;!?()  \u060c';
    var o = "\u0622\u0623\u0624\u0625\u0627\u0629\u062f\u0630\u0631\u0632\u0648\u0671\u0672\u0673\u0675\u0676\u0677\u0688\u0689\u068a\u068b\u068c\u068d\u068e\u068f\u0690\u0691\u0692\u0693\u0694\u0695\u0696\u0697\u0698\u0699\u06c0\u06c3\u06c4\u06c5\u06c6\u06c7\u06c8\u06c9\u06ca\u06cb\u06cd\u06cf\u06d2\u06d3\u06d5\u06ee\u06ef\u0710\u0715\u0716\u0717\u0718\u0719\u071e\u0728\u072a\u072c\u072f\u074d\u0759\u075a\u075b\u076b\u076c\u0771\u0773\u0774\u0778\u0779\u0840\u0846\u0847\u0849\u0854\u0867\u0869\u086a\u08aa\u08ab\u08ac\u08ae\u08b1\u08b2\u08b9\u0ac5\u0ac7\u0ac9\u0aca\u0ace\u0acf\u0ad0\u0ad1\u0ad2\u0add\u0ae1\u0ae4\u0aef\u0b81\u0b83\u0b84\u0b85\u0b89\u0b8c\u0b8e\u0b8f\u0b91\u0ba9\u0baa\u0bab\u0bac";
    var s = 0;
    for (; s < r.length; s++) {
        var l = r[s];
        var c = 0 == s || -1 != i.indexOf(a[s - 1]);
        var d = s == r.length - 1 || -1 != i.indexOf(a[s + 1]);
        if (! (c || -1 == o.indexOf(a[s - 1]))) c = true;
        if (! (d || -1 == o.indexOf(a[s]))) d = true;
        if (! (d || -1 == "\ua872\u0acd\u0ad7".indexOf(a[s + 1]))) d = true;
        if (! (c || -1 == "\ua872\u0acd\u0ad7".indexOf(a[s]))) c = true;
        var h = null;
        h = c ? d ? "isol" : "init" : d ? "fina" : "medi";
        var u = 0;
        for (; u < n.length; u++) if (n[u].tag == h) {
            var p = 0;
            for (; p < n[u].tab.length; p++) if (1 == (y = t[n[u].tab[p]]).ltype) A.U._applyType1(r, s, y)
        }
    }
    var m = ["rlig", "liga", "mset"];
    s = 0;
    for (; s < r.length; s++) {
        l = r[s];
        var f = Math.min(3, r.length - s - 1);
        u = 0;
        for (; u < n.length; u++) {
            var g = n[u];
            if (-1 != m.indexOf(g.tag)) {
                p = 0;
                for (; p < g.tab.length; p++) {
                    var y = t[g.tab[p]];
                    var E = 0;
                    for (; E < y.tabs.length; E++) if (null != y.tabs[E]) {
                        var v = A._lctf.coverageIndex(y.tabs[E].coverage, l);
                        if (-1 != v) if (4 == y.ltype) {
                            var S = y.tabs[E].vals[v];
                            var C = 0;
                            for (; C < S.length; C++) {
                                var x = S[C];
                                var I = x.chain.length;
                                if (! (I > f)) {
                                    var T = true;
                                    var b = 0;
                                    for (; b < I; b++) if (x.chain[b] != r[s + (1 + b)]) T = false;
                                    if (T) {
                                        r[s] = x.nglyph;
                                        b = 0;
                                        for (; b < I; b++) r[s + b + 1] = -1
                                    }
                                }
                            }
                        } else if (5 == y.ltype) {
                            var L = y.tabs[E];
                            if (2 != L.fmt) continue;
                            var R = A._lctf.getInterval(L.cDef, l);
                            var M = L.cDef[R + 2];
                            var w = L.scset[M];
                            var O = 0;
                            for (; O < w.length; O++) {
                                var D = w[O].input;
                                if (! (D.length > f)) {
                                    T = true;
                                    b = 0;
                                    for (; b < D.length; b++) {
                                        var N = A._lctf.getInterval(L.cDef, r[s + 1 + b]);
                                        if (-1 == R && L.cDef[N + 2] != D[b]) {
                                            T = false;
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
A.U.stringToGlyphs = function (e, t) {
    var n = Array.isArray(e) ? e : [e];
    var r = [];
    var a = [];
    var i = 0;
    for (; i < t.length; i++) {
        var o = t.codePointAt(i);
        if (o > 65535) i++;
        var s = n.find((e) => {
            return A.U.codeToGlyph(e, o)
        });
        if (s) {
            r.push(A.U.codeToGlyph(s, o));
            a.push(s)
        } else {
            r.push(0);
            a.push(n[0])
        }
    }
    var l = function (e) {
        var t = [];
        var n = [];
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r].GSUB;
            if (a) {
                t = t.concat(a.lookupList);
                n = n.concat(a.featureList)
            }
        }
        return {
            llist: t,
            flist: n
        }
    } (n);
    var c = l.llist;
    var d = l.flist;
    return A.U.processLFList({
        llist: c,
        flist: d,
        gls: r,
        str: t
    }),
    {
        gls: r,
        glsFonts: a
    }
};
A.U._applyType1 = function (e, t, n) {
    var r = e[t];
    var a = 0;
    for (; a < n.tabs.length; a++) {
        var i = n.tabs[a];
        var o = A._lctf.coverageIndex(i.coverage, r);
        if (-1 != o) if (1 == i.fmt) e[t] = e[t] + i.delta;
        else e[t] = i.newg[o]
    }
};
A.U.glyphsToPath = function (e, t) {
    var n = {
        cmds: [],
        crds: []
    };
    var r = 0;
    var a = 0;
    for (; a < e.length; a++) {
        var i = t[a];
        var o = e[a];
        if (-1 != o) {
            var s = a < e.length - 1 && -1 != e[a + 1] ? e[a + 1] : 0;
            var l = A.U.glyphToPath(i, o);
            var c = 0;
            for (; c < l.crds.length; c = c + 2) {
                n.crds.push(l.crds[c] + r);
                n.crds.push(l.crds[c + 1])
            }
            var d = 0;
            for (; d < l.cmds.length; d++) n.cmds.push(l.cmds[d]);
            r = r + i.hmtx.aWidth[o];
            if (a < e.length - 1) r = r + A.U.getPairAdjustment(i, o, s)
        }
    }
    return n.width = r,
    n
};
A.U.pathToSVG = function (e, t) {
    if (null == t) t = 5;
    var n = [];
    var r = 0;
    var a = {
        M: 2,
        L: 2,
        Q: 4,
        C: 6
    };
    var i = 0;
    for (; i < e.cmds.length; i++) {
        var o = e.cmds[i];
        var s = r + (a[o] ? a[o] : 0);
        n.push(o);
        for (; r < s;) {
            var l = e.crds[r++];
            n.push(parseFloat(l.toFixed(t)) + (r == s ? "" : " "))
        }
    }
    return n.join("")
};
A.U.pathToContext = function (e, t) {
    var n = 0;
    var r = e.crds;
    var a = 0;
    for (; a < e.cmds.length; a++) {
        var i = e.cmds[a];
        if ("M" == i) {
            t.moveTo(r[n], r[n + 1]);
            n = n + 2
        } else if ("L" == i) {
            t.lineTo(r[n], r[n + 1]);
            n = n + 2
        } else if ("C" == i) {
            t.bezierCurveTo(r[n], r[n + 1], r[n + 2], r[n + 3], r[n + 4], r[n + 5]);
            n = n + 6
        } else if ("Q" == i) {
            t.quadraticCurveTo(r[n], r[n + 1], r[n + 2], r[n + 3]);
            n = n + 4
        } else if ("#" == i.charAt(0)) {
            t.beginPath();
            t.fillStyle = i
        } else if ("Z" == i) t.closePath();
        else if ("X" == i) t.fill()
    }
};
A.U.P = {};
A.U.P.moveTo = function (e, t, n) {
    e.cmds.push("M");
    e.crds.push(t, n)
};
A.U.P.lineTo = function (e, t, n) {
    e.cmds.push("L");
    e.crds.push(t, n)
};
A.U.P.curveTo = function (e, t, n, r, a, i, o) {
    e.cmds.push("C");
    e.crds.push(t, n, r, a, i, o)
};
A.U.P.qcurveTo = function (e, t, n, r, a) {
    e.cmds.push("Q");
    e.crds.push(t, n, r, a)
};
A.U.P.closePath = function (e) {
    e.cmds.push("Z")
};
A.U._drawCFF = function (e, t, n, r) {
    var a = t.stack;
    var i = t.nStems;
    var o = t.haveWidth;
    var s = t.width;
    var l = t.open;
    var c = 0;
    var d = t.x;
    var h = t.y;
    var u = 0;
    var p = 0;
    var m = 0;
    var f = 0;
    var g = 0;
    var y = 0;
    var E = 0;
    var v = 0;
    var S = 0;
    var C = 0;
    var x = {
        val: 0,
        size: 0
    };
    for (; c < e.length;) {
        A.CFF.getCharString(e, c, x);
        var I = x.val;
        if (c = c + x.size, "o1" == I || "o18" == I) {
            if (a.length % 2 != 0 && !o) s = a.shift() + n.Private.nominalWidthX;
            i = i + (a.length >> 1);
            a.length = 0;
            o = true
        } else if ("o3" == I || "o23" == I) {
            if (a.length % 2 != 0 && !o) s = a.shift() + n.Private.nominalWidthX;
            i = i + (a.length >> 1);
            a.length = 0;
            o = true
        } else if ("o4" == I) {
            if (a.length > 1 && !o) {
                s = a.shift() + n.Private.nominalWidthX;
                o = true
            }
            if (l) A.U.P.closePath(r);
            h = h + a.pop();
            A.U.P.moveTo(r, d, h);
            l = true
        } else if ("o5" == I) for (; a.length > 0;) {
            d = d + a.shift();
            h = h + a.shift();
            A.U.P.lineTo(r, d, h)
        } else if ("o6" == I || "o7" == I) {
            var T = a.length;
            var b = "o6" == I;
            var L = 0;
            for (; L < T; L++) {
                var R = a.shift();
                if (b) d = d + R;
                else h = h + R;
                b = !b;
                A.U.P.lineTo(r, d, h)
            }
        } else if ("o8" == I || "o24" == I) {
            T = a.length;
            var M = 0;
            for (; M + 6 <= T;) {
                u = d + a.shift();
                p = h + a.shift();
                m = u + a.shift();
                f = p + a.shift();
                d = m + a.shift();
                h = f + a.shift();
                A.U.P.curveTo(r, u, p, m, f, d, h);
                M = M + 6
            }
            if ("o24" == I) {
                d = d + a.shift();
                h = h + a.shift();
                A.U.P.lineTo(r, d, h)
            }
        } else {
            if ("o11" == I) break;
            if ("o1234" == I || "o1235" == I || "o1236" == I || "o1237" == I) {
                if ("o1234" == I) {
                    p = h;
                    m = (u = d + a.shift()) + a.shift();
                    C = f = p + a.shift();
                    y = f;
                    v = h;
                    d = (E = (g = (S = m + a.shift()) + a.shift()) + a.shift()) + a.shift();
                    A.U.P.curveTo(r, u, p, m, f, S, C);
                    A.U.P.curveTo(r, g, y, E, v, d, h)
                }
                if ("o1235" == I) {
                    u = d + a.shift();
                    p = h + a.shift();
                    m = u + a.shift();
                    f = p + a.shift();
                    S = m + a.shift();
                    C = f + a.shift();
                    g = S + a.shift();
                    y = C + a.shift();
                    E = g + a.shift();
                    v = y + a.shift();
                    d = E + a.shift();
                    h = v + a.shift();
                    a.shift();
                    A.U.P.curveTo(r, u, p, m, f, S, C);
                    A.U.P.curveTo(r, g, y, E, v, d, h)
                }
                if ("o1236" == I) {
                    u = d + a.shift();
                    p = h + a.shift();
                    m = u + a.shift();
                    C = f = p + a.shift();
                    y = f;
                    E = (g = (S = m + a.shift()) + a.shift()) + a.shift();
                    v = y + a.shift();
                    d = E + a.shift();
                    A.U.P.curveTo(r, u, p, m, f, S, C);
                    A.U.P.curveTo(r, g, y, E, v, d, h)
                }
                if ("o1237" == I) {
                    u = d + a.shift();
                    p = h + a.shift();
                    m = u + a.shift();
                    f = p + a.shift();
                    S = m + a.shift();
                    C = f + a.shift();
                    g = S + a.shift();
                    y = C + a.shift();
                    E = g + a.shift();
                    v = y + a.shift();
                    if (Math.abs(E - d) > Math.abs(v - h)) d = E + a.shift();
                    else h = v + a.shift();
                    A.U.P.curveTo(r, u, p, m, f, S, C);
                    A.U.P.curveTo(r, g, y, E, v, d, h)
                }
            } else if ("o14" == I) {
                if (a.length > 0 && !o && (s = a.shift() + n.nominalWidthX, o = true), 4 == a.length) {
                    var w = a.shift();
                    var O = a.shift();
                    var D = a.shift();
                    var N = a.shift();
                    var k = A.CFF.glyphBySE(n, D);
                    var B = A.CFF.glyphBySE(n, N);
                    A.U._drawCFF(n.CharStrings[k], t, n, r);
                    t.x = w;
                    t.y = O;
                    A.U._drawCFF(n.CharStrings[B], t, n, r)
                }
                if (l) {
                    A.U.P.closePath(r);
                    l = false
                }
            } else if ("o19" == I || "o20" == I) {
                if (a.length % 2 != 0 && !o) s = a.shift() + n.Private.nominalWidthX;
                i = i + (a.length >> 1);
                a.length = 0;
                o = true;
                c = c + (i + 7 >> 3)
            } else if ("o21" == I) {
                if (a.length > 2 && !o) {
                    s = a.shift() + n.Private.nominalWidthX;
                    o = true
                }
                h = h + a.pop();
                d = d + a.pop();
                if (l) A.U.P.closePath(r);
                A.U.P.moveTo(r, d, h);
                l = true
            } else if ("o22" == I) {
                if (a.length > 1 && !o) {
                    s = a.shift() + n.Private.nominalWidthX;
                    o = true
                }
                d = d + a.pop();
                if (l) A.U.P.closePath(r);
                A.U.P.moveTo(r, d, h);
                l = true
            } else if ("o25" == I) {
                for (; a.length > 6;) {
                    d = d + a.shift();
                    h = h + a.shift();
                    A.U.P.lineTo(r, d, h)
                }
                u = d + a.shift();
                p = h + a.shift();
                m = u + a.shift();
                f = p + a.shift();
                d = m + a.shift();
                h = f + a.shift();
                A.U.P.curveTo(r, u, p, m, f, d, h)
            } else if ("o26" == I) {
                if (a.length % 2) d = d + a.shift();
                for (; a.length > 0;) {
                    u = d;
                    p = h + a.shift();
                    d = m = u + a.shift();
                    h = (f = p + a.shift()) + a.shift();
                    A.U.P.curveTo(r, u, p, m, f, d, h)
                }
            } else if ("o27" == I) {
                if (a.length % 2) h = h + a.shift();
                for (; a.length > 0;) {
                    p = h;
                    m = (u = d + a.shift()) + a.shift();
                    f = p + a.shift();
                    d = m + a.shift();
                    h = f;
                    A.U.P.curveTo(r, u, p, m, f, d, h)
                }
            } else if ("o10" == I || "o29" == I) {
                var P = "o10" == I ? n.Private : n;
                if (0 == a.length) console.log("error:empty stack");
                else {
                    var F = a.pop();
                    var H = P.Subrs[F + P.Bias];
                    t.x = d;
                    t.y = h;
                    t.nStems = i;
                    t.haveWidth = o;
                    t.width = s;
                    t.open = l;
                    A.U._drawCFF(H, t, n, r);
                    d = t.x;
                    h = t.y;
                    i = t.nStems;
                    o = t.haveWidth;
                    s = t.width;
                    l = t.open
                }
            } else if ("o30" == I || "o31" == I) {
                var _ = a.length;
                var U = (M = 0, "o31" == I);
                M = M + (_ - (T = -3 & _));
                for (; M < T;) {
                    if (U) {
                        p = h;
                        m = (u = d + a.shift()) + a.shift();
                        h = (f = p + a.shift()) + a.shift();
                        if (T - M == 5) {
                            d = m + a.shift();
                            M++
                        } else d = m;
                        U = false
                    } else {
                        u = d;
                        p = h + a.shift();
                        m = u + a.shift();
                        f = p + a.shift();
                        d = m + a.shift();
                        if (T - M == 5) {
                            h = f + a.shift();
                            M++
                        } else h = f;
                        U = true
                    }
                    A.U.P.curveTo(r, u, p, m, f, d, h);
                    M = M + 4
                }
            } else {
                if ("o" == (I + "").charAt(0)) throw console.log("Unknown operation:" + I, e),
                I;
                a.push(I)
            }
        }
    }
    t.x = d;
    t.y = h;
    t.nStems = i;
    t.haveWidth = o;
    t.width = s;
    t.open = l
};
var E = A;
/// var v = n(36)/*TextUtils*/;  // 1 times
/// var S = n(145)/*FontHelper*/;  // 3 times
/// var C = n(449)/*VectorFontLoader*/;  // 1 times
var x = new class {
    constructor() {
        this.cached = {}
    }
    getAppliedFontsFromElement(e) {
        var t = jQuery(e).css("font-family");
        var n = this.isElementBold(e);
        var r = "italic" == jQuery(e).css("font-style");
        return this.getAppliedFonts(t, n, r)
    }
    splitFamilyNames(e) {
        return e.split(",").map((e) => {
            return _.trim(_.trim(e), '"')
        })
    }
    getAppliedFonts(e, t, n) {
        var r = this.splitFamilyNames(e).filter((e) => {
            return FontHelper.isFontLoadable(e)
        });
        return Promise.all(r.map((e) => {
            return VectorFontLoader.loadFontDataIfRequire(e, t, n)
        })).then((e) => {
            return e.filter((e) => {
                return e
            }).map((e) => {
                if (console.log("load:", e.fullName), !this.cached[e.fullName]) {
                    var t = {
                        name: e.fullName,
                        font: A.parse(e.data)
                    };
                    this.cached[e.fullName] = t;
                    console.log("fonts parsed no cache hit")
                }
                return this.cached[e.fullName]
            })
        })
    }
    isBoldAlreadyForGlyph(e, t) {
        return t == e[0].font && FontHelper.isTextModeFontBold(e[0].name)
    }
    isItalicAlreadyForGlyph(e, t) {
        return t == e[0].font && FontHelper.isTextModeFontItalic(e[0].name)
    }
    buildTextBlock(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return e.innerText ? this.getAppliedFontsFromElement(e).then((r) => {
            var a;
            var i = r.map((e) => {
                return e.font
            });
            var o = TextUtils.getUnistringUncached(e.innerText);
            var s = "";
            var l = [];
            var c = 0;
            var d = 0;
            for (; d < o.length + 1; d++) {
                var h = d >= o.length;
                var p = [];
                var m = null;
                if (!h) {
                    p = o.codePointsAt(d);
                    var f = this.findGlyph(r, p);
                    if (f) m = f[0]
                }
                var g = !("path" != a || m && !h || !s);
                var y = !("text" != a || !m && !h || !s);
                var A = !g && !y;
                var S = g || y;
                if (g) {
                    var C = E.U.stringToGlyphs(i, s);
                    var x = C.gls;
                    var I = C.glsFonts;
                    var T = this.getRect(e, t, o.rawIndexAt(c), o.rawIndexAt(d));
                    l.push({
                        type: "vector-text",
                        rect: T,
                        text: s,
                        path: E.U.glyphsToPath(x, I),
                        fontSize: DOMHelper.getComputedStyleAsNumber(e, "font-size"),
                        color: DOMHelper.getComputedStyle(e, "color"),
                        unitsPerEm: I[0].head.unitsPerEm,
                        textWidth: DOMHelper.measureInnerOneLineTextWidth(e),
                        textDecoration: this.getTextDecoration(e),
                        isItalic: !this.isItalicAlreadyForGlyph(r, I[0]) && this.isElementItalic(e),
                        isBold: !this.isBoldAlreadyForGlyph(r, I[0]) && this.isElementBold(e)
                    })
                }
                if (y) {
                    var b = this.getRect(e, t, o.rawIndexAt(c), o.rawIndexAt(d));
                    l.push({
                        isHidden: this.isElementHidden(e),
                        type: "text",
                        rect: b,
                        text: s,
                        fontWeight: DOMHelper.getComputedStyle(e, "font-weight"),
                        fontSize: DOMHelper.getComputedStyleAsNumber(e, "font-size"),
                        fontFamily: DOMHelper.getComputedStyle(e, "font-family"),
                        isCustomLoadedFont: r.length > 0,
                        fontStyle: DOMHelper.getComputedStyle(e, "font-style"),
                        color: DOMHelper.getComputedStyle(e, "color"),
                        textDecoration: DOMHelper.getComputedStyle(e, "text-decoration"),
                        notNormalText: !!n,
                        isRtl: "rtl" == DOMHelper.getComputedStyle(e, "direction")
                    })
                }
                if (A) s = s + o.clusterAt(d);
                if (S) {
                    c = d;
                    s = o.clusterAt(d)
                }
                a = m ? "path" : "text"
            }
            return 1 == l.length ? l[0] : {
                type: "composite-text",
                rect: DOMHelper.findRectElementToRect(e, t),
                textWidth: this.getRect(e, t, 0, e.innerText.length).width,
                blocks: l
            }
        }) : Promise.resolve({
            type: "empty-text",
            rect: DOMHelper.findRectElementToRect(e, t)
        })
    }
    isElementHidden(e) {
        return "none" == jQuery(e).css("display") || "hidden" == jQuery(e).css("visibility") || "collapsed" == jQuery(e).css("visibility")
    }
    isElementBold(e) {
        return "bold" == jQuery(e).css("font-weight") || "700" == jQuery(e).css("font-weight")
    }
    getTextDecoration(e) {
        var t = jQuery(e).css("text-decoration");
        return t.includes("underline") ? "underline" : t.includes("line-through") ? "line-through" : null
    }
    isElementItalic(e) {
        return jQuery(e).css("font-style").includes("italic")
    }
    getRect(e, t, n, r) {
        var a = DOMHelper.getElementRect(DOMHelper.rangeFrom2Indexes(e, n, r));
        var i = a.left;
        var o = a.right;
        var s = DOMHelper.getElementRect(e);
        return {
            left: i - t.left,
            top: s.top - t.top,
            width: o - i,
            height: s.height,
            right: o - t.left,
            bottom: s.bottom - t.top
        }
    }
    findGlyph(e, t) {
        if (t.length > 1) return null;
        var n = 0;
        for (; n < e.length; n++) {
            var r = e[n].font;
            var a = A.U.codeToGlyph(r, t[0]);
            if (a) return [a, r]
        }
        return null
    }
};
/// var I = n(1)/*Geometry*/;  // 5 times
/// var T = n(38)/*ElementTypes*/;  // 4 times
var b = new class {
    find(e, t) {
        return DOMHelper.isInlineMathContainer(e) ? Geometry.extendRect(DOMHelper.getElementRect(e), t) : DOMHelper.isDiagram(e) ? Geometry.extendRect(DOMHelper.getElementRect(e), t) : DOMHelper.isAlignBlock(e) ? this.findForAlignAndGather(e, t) : DOMHelper.isGatherBlock(e) ? this.findForAlignAndGather(e, t) : DOMHelper.isZSchemaBlock(e) ? Geometry.extendRect(DOMHelper.getElementRect(e), t) : this.findForMathContainer(e, t)
    }
    findForAlignAndGather(e, t) {
        var n = jQuery(e).find(">x-matrix>table>tbody>tr:first>td:not(.non-select)");
        var r = n.first().get(0);
        var a = n.last().get(0);
        var i = {
            left: 1E4,
            right: 0
        };
        i = {
            left: (i = {
                left: Math.min(DOMHelper.getElementRect(r).left, i.left),
                right: i.right
            }).left,
            right: Math.max(DOMHelper.getElementRect(a).right, i.right)
        };
        var o = DOMHelper.getElementRect(e);
        return Geometry.extendRect({
            top: o.top,
            bottom: o.bottom,
            height: o.height,
            left: i.left,
            right: i.right,
            width: i.right - i.left
        },
        t)
    }
    findForMathContainer(e, t) {
        var n = {
            left: 1E4,
            right: 0
        };
        jQuery(e).find(">edit-area>x-line").each((e, t) => {
            var r = jQuery(t).children("".concat(ElementTypes.block, ",").concat(ElementTypes.opensymbolblock, ",").concat(ElementTypes.closesymbolblock, ",").concat(ElementTypes.composite));
            var a = r.first().get(0);
            var i = r.last().get(0);
            if (a && i) n = {
                left: (n = {
                    left: Math.min(DOMHelper.getElementRect(a).left, n.left),
                    right: n.right
                }).left,
                right: Math.max(DOMHelper.getElementRect(i).right, n.right)
            }
        });
        var r = DOMHelper.getElementRect(e);
        return 1E4 == n.left && (n.left = r.left + r.width / 2 - 10, n.right = r.left + r.width / 2 + 10),
        Geometry.extendRect({
            top: r.top,
            bottom: r.bottom,
            height: r.height,
            left: n.left,
            right: n.right,
            width: n.right - n.left
        },
        t)
    }
};
/// var L = n(243)/*Shape-doc-rounded-rect*/;  // 1 times
/// var R = n(10)/*ShapeHelper*/;  // 1 times
var M = function (e, t) {
    var n = jQuery(e);
    return n.find(t).filter(function () {
        if (jQuery(this).closest("x-setting.setting-popup-zindex").length > 0) return false;
        var e = jQuery(this).parent().closest(t);
        return 0 == e.length || 0 == n.find(e).length
    })
};
var w = new class {
    generate(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return i = b.find(e, t),
                    r.t0 = i,
                    r.next = 4,
                    n.findAndGenerateEditAreas(e, i);
                case 4:
                    return r.t1 = r.sent,
                    r.t2 = n.findAndGenerateSvgs(e, i),
                    r.abrupt("return", {
                        baseRect: r.t0,
                        areas: r.t1,
                        drawings: r.t2
                    });
                case 7:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateDiagramTexts(e) {
        var t = this;
        return asyncToGenerator(regeneratorRuntime.mark(function n() {
            var r;
            return regeneratorRuntime.wrap(function (n) {
                for (;;) switch (n.prev = n.next) {
                case 0:
                    return r = DOMHelper.getElementRect(e),
                    n.t0 = r,
                    n.next = 4,
                    t.findAndGenerateEditAreasForDiagramTexts(e, r);
                case 4:
                    return n.t1 = n.sent,
                    n.t2 = [],
                    n.abrupt("return", {
                        baseRect: n.t0,
                        areas: n.t1,
                        drawings: n.t2
                    });
                case 7:
                    case "end":
                    return n.stop()
                }
            },
            n)
        }))()
    }
    findAndGenerateEditAreasForDiagramTexts(e, t) {
        var n;
        var r = this;
        return Promise.all(jQuery(e).find(">diagram-editors>position-container").toArray().map((n = asyncToGenerator(regeneratorRuntime.mark(function e(n) {
            var i;
            var o;
            var s;
            var l;
            var c;
            return regeneratorRuntime.wrap(function (e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    return i = r.getTransformRotation(n),
                    o = r.getTransformSkewX(n),
                    s = r.getTransformFlipX(n),
                    l = jQuery(n).attr("style"),
                    jQuery(n).css("transform", "rotate(0)"),
                    e.next = 7,
                    r.generateEditArea(jQuery(n).find(">dg-editor-container>edit-area").get(0), t);
                case 7:
                    return (c = e.sent).rotation = i,
                    c.skewX = o,
                    c.flipX = s,
                    jQuery(n).attr("style", l),
                    e.abrupt("return", c);
                case 13:
                    case "end":
                    return e.stop()
                }
            },
            e)
        })), function (e) {
            return n.apply(this, arguments)
        })))
    }
    getTransformSkewX(e) {
        return Number.parseFloat(e.getAttribute("data-skewx"))
    }
    getTransformRotation(e) {
        return Number.parseFloat(e.getAttribute("data-rotation"))
    }
    getTransformFlipX(e) {
        return "true" == e.getAttribute("data-flipx")
    }
    generateSvg(e, t) {
        var n = DOMHelper.findRectElementToRect(e, t);
        return {
            type: "drawing",
            viewBox: jQuery(e).attr("viewBox"),
            rect: n,
            elements: jQuery(e).children().toArray().map((e) => {
                return this.generateSvgElement(e)
            }).filter((e) => {
                return e
            })
        }
    }
    getSvgElementStyle(e) {
        return {
            strokeWidth: jQuery(e).css("stroke-width"),
            stroke: jQuery(e).css("stroke"),
            fill: jQuery(e).css("fill")
        }
    }
    generateSvgElement(e) {
        var t = e.tagName.toLowerCase();
        switch (t) {
        case "g":
            return {
                type: "group",
                transform: jQuery(e).attr("transform"),
                elements: jQuery(e).children().toArray().map((e) => {
                    return this.generateSvgElement(e)
                }).filter((e) => {
                    return e
                })
            };
        case "path":
            return _.assignIn({
                type: "path",
                d: jQuery(e).attr("d")
            },
            this.getSvgElementStyle(e));
        case "polygon":
            return _.assignIn({
                type: "polygon",
                points: jQuery(e).attr("points")
            },
            this.getSvgElementStyle(e));
        case "polyline":
            return _.assignIn({
                type: "polyline",
                points: jQuery(e).attr("points")
            },
            this.getSvgElementStyle(e));
        case "rect":
            return _.assignIn({
                type: "rect",
                x: Number.parseFloat(jQuery(e).attr("x")),
                y: Number.parseFloat(jQuery(e).attr("y")),
                width: Number.parseFloat(jQuery(e).attr("width")),
                height: Number.parseFloat(jQuery(e).attr("height"))
            },
            this.getSvgElementStyle(e));
        default:
            throw new Error("".concat(t, " not supported"));
        }
    }
    findFirstLevelEditors(e) {
        return M(e, "edit-area,editarea-block,editarea-line").toArray()
    }
    findAndGenerateEditAreas(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    Promise.all(n.findFirstLevelEditors(e).map((e) => {
                        return n.generateEditArea(e, t)
                    }));
                case 2:
                    if (i = r.sent, !DOMHelper.isZSchemaBlock(e)) {
                        r.next = 5;
                        break
                    }
                    return r.abrupt("return", n.generateLeftRightBracketsForZSpec(e, t, i));
                case 5:
                    return r.abrupt("return", i);
                case 6:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateLeftRightBracketsForZSpec(e, t, n) {
        var r = this;
        return asyncToGenerator(regeneratorRuntime.mark(function i() {
            var o;
            var s;
            var l;
            var c;
            var d;
            var h;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    if (o = jQuery(e).find(">.role-name-section>.role-name-content>span:eq(0)").get(0), s = jQuery(e).find(">.role-name-section>.role-name-content>span:eq(1)").get(0), !o || "none" == jQuery(o).css("display")) {
                        a.next = 22;
                        break
                    }
                    return l = DOMHelper.findRectElementToRect(o, t),
                    a.t0 = l,
                    a.next = 7,
                    r.buildTextBlock(o, t);
                case 7:
                    return a.t1 = a.sent,
                    a.t2 = [a.t1],
                    a.t3 = {
                        blocks: a.t2
                    },
                    a.t4 = [a.t3],
                    c = {
                        rect: a.t0,
                        lines: a.t4
                    },
                    d = DOMHelper.findRectElementToRect(s, t),
                    a.t5 = d,
                    a.next = 16,
                    r.buildTextBlock(s, t);
                case 16:
                    return a.t6 = a.sent,
                    a.t7 = [a.t6],
                    a.t8 = {
                        blocks: a.t7
                    },
                    a.t9 = [a.t8],
                    h = {
                        rect: a.t5,
                        lines: a.t9
                    },
                    a.abrupt("return", [c, h].concat(n));
                case 22:
                    return a.abrupt("return", n);
                case 23:
                    case "end":
                    return a.stop()
                }
            },
            i)
        }))()
    }
    findAndGenerateSvgs(e, t) {
        if (DOMHelper.isZSchemaBlock(e)) return this.generateZSchemaBorder(e, t);
        var n = M(e, "edit-area,editarea-block,editarea-line").toArray();
        return M(e, "svg").toArray().filter((e) => {
            return !n.some((t) => {
                return jQuery(t).find(e).length > 0
            })
        }).map((e) => {
            return this.generateSvg(e, t)
        })
    }
    generateZSchemaBorder(e, t) {
        var n = this.buildLineFromBorderPosition(jQuery(e).find(">.role-another-top-border").get(0), t, "top")[0];
        var r = this.buildLineFromBorderPosition(jQuery(e).find(">.role-another-top-border").get(0), t, "left")[0];
        var a = this.buildLineFromBorderPosition(jQuery(e).find(">.role-dec-pred-section").get(0), t, "top")[0];
        var i = this.buildLineFromBorderPosition(jQuery(e).find(">.role-dec-pred-section").get(0), t, "left")[0];
        var o = this.buildLineFromBorderPosition(jQuery(e).find(">.role-dec-pred-section").get(0), t, "bottom")[0];
        var s = this.buildLineFromBorderPosition(jQuery(e).find(">.role-dec-pred-section>.role-pred-border").get(0), t, "top")[0];
        return this.splitLineByZNameSection(n, e, t).concat(this.splitLineByZNameSection(a, e, t)).concat([r, i, o, s].filter((e) => {
            return e
        }))
    }
    splitLineByZNameSection(e, t, n) {
        if (!e) return [];
        var r = jQuery(t).find(">.role-name-section>.role-name-content");
        if (!r.get(0)) return [e];
        var a = DOMHelper.findRectElementToRect(r.get(0), n);
        var i = _.cloneDeep(e);
        var o = _.cloneDeep(e);
        return i.x2 = a.left,
        o.x1 = a.right,
        [i, o]
    }
    generateEditArea(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    if (i = DOMHelper.findRectElementToRect(e, t), "EDITAREA-BLOCK" != e.tagName) {
                        r.next = 10;
                        break
                    }
                    return r.t0 = i,
                    r.next = 5,
                    n.buildTextBlock(e, t);
                case 5:
                    return r.t1 = r.sent,
                    r.t2 = [r.t1],
                    r.t3 = {
                        blocks: r.t2
                    },
                    r.t4 = [r.t3],
                    r.abrupt("return", {
                        rect: r.t0,
                        lines: r.t4
                    });
                case 10:
                    if ("EDITAREA-LINE" != e.tagName) {
                        r.next = 17;
                        break
                    }
                    return r.t5 = i,
                    r.next = 14,
                    n.generateLine(e, t);
                case 14:
                    return r.t6 = r.sent,
                    r.t7 = [r.t6],
                    r.abrupt("return", {
                        rect: r.t5,
                        lines: r.t7
                    });
                case 17:
                    return r.t8 = i,
                    r.next = 20,
                    Promise.all(jQuery(e).find(">x-line,>area-container>x-line").toArray().map((e) => {
                        return n.generateLine(e, t)
                    }));
                case 20:
                    return r.t9 = r.sent,
                    r.abrupt("return", {
                        rect: r.t8,
                        lines: r.t9
                    });
                case 22:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    buildTextBlock(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return x.buildTextBlock(e, t, n)
    }
    generateDefaultComposite(e, t) {
        var n = this;
        var r = arguments;
        return asyncToGenerator(regeneratorRuntime.mark(function i() {
            var o;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    if (o = r.length > 2 && void 0 !== r[2] ? r[2] : {},
                    o = _.assignIn({
                        editareas: true,
                        svg: true
                    },
                    o), a.t0 = DOMHelper.findRectElementToRect(e, t), !o.editareas) {
                        a.next = 9;
                        break
                    }
                    return a.next = 6,
                    n.findAndGenerateEditAreas(e, t);
                case 6:
                    a.t1 = a.sent;
                    a.next = 10;
                    break;
                case 9:
                    a.t1 = [];
                case 10:
                    return a.t2 = a.t1,
                    a.t3 = o.svg ? n.findAndGenerateSvgs(e, t) : [],
                    a.abrupt("return", {
                        type: "composite",
                        rect: a.t0,
                        areas: a.t2,
                        drawings: a.t3
                    });
                case 13:
                    case "end":
                    return a.stop()
                }
            },
            i)
        }))()
    }
    generateFractionComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t);
                case 2:
                    return i = r.sent,
                    o = jQuery(e).find(">.frac-line>in-line").get(0),
                    i.drawings = i.drawings.concat(n.buildLineFromBorderPosition(o, t, "bottom")),
                    r.abrupt("return", i);
                case 6:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateBoxexComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t);
                case 2:
                    return i = r.sent,
                    o = jQuery(e).find(">div").get(0),
                    i.drawings = i.drawings.concat(n.buildLinesFromBorder(o, t)),
                    r.abrupt("return", i);
                case 6:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateIntegralLikeComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            var s;
            var l;
            var c;
            var d;
            var h;
            var p;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t);
                case 2:
                    return i = r.sent,
                    o = jQuery(e).find(">x-symbol"),
                    s = jQuery(e).find(">x-symbol>span"),
                    l = {},
                    o.hasClass("inf") && (l.textDecoration = "underline", c = DOMHelper.findRectElementToRect(s.get(0), t), d = .11, o.css("font-family").includes("LatinModern") && (d = .09), h = c.bottom - c.height * d, i.drawings.push({
                        type: "line",
                        x1: c.left,
                        y1: h,
                        x2: c.right,
                        y2: h,
                        stroke: s.css("color")
                    })),
                    o.hasClass("sup") && (l.textDecoration = "overline", p = DOMHelper.findRectElementToRect(s.get(0), t), i.drawings.push({
                        type: "line",
                        x1: p.left,
                        y1: p.top,
                        x2: p.right,
                        y2: p.top,
                        stroke: s.css("color")
                    })),
                    r.next = 10,
                    n.buildTextBlock(s.get(0), t);
                case 10:
                    return r.t0 = r.sent,
                    i.textBlocks = [r.t0],
                    r.abrupt("return", i);
                case 13:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateConstantComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: false,
                        svg: false
                    });
                case 2:
                    return i = r.sent,
                    o = jQuery(e).find("constant-text"),
                    r.next = 6,
                    n.buildTextBlock(o.get(0), t);
                case 6:
                    return r.t0 = r.sent,
                    i.textBlocks = [r.t0],
                    r.abrupt("return", i);
                case 9:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    getAllNodesHasTextNode(e) {
        return this.getTextNodesIn(e, false).map((e) => {
            return e.parentElement
        })
    }
    getTextNodesIn(e, t) {
        var n = [];
        var r = /\S/;
        return function e(a) {
            if (3 == a.nodeType) {
                if (t || r.test(a.nodeValue)) n.push(a)
            } else {
                var i = 0;
                var o = a.childNodes.length;
                for (; i < o; ++i) e(a.childNodes[i])
            }
        } (e),
        n
    }
    buildClipDrawingWithSelector(e, t, n) {
        var r = this;
        var i = arguments;
        return asyncToGenerator(regeneratorRuntime.mark(function o() {
            var s;
            var l;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    if (s = i.length > 3 && void 0 !== i[3] && i[3], l = jQuery(e).find(t).get(0), !s || l) {
                        a.next = 4;
                        break
                    }
                    return a.abrupt("return", null);
                case 4:
                    if (l) {
                        a.next = 6;
                        break
                    }
                    throw new Error("element not found");
                case 6:
                    return a.t0 = DOMHelper.findRectElementToRect(l, n),
                    a.next = 9,
                    r.buildAllClipTexts(l, DOMHelper.getElementRect(l));
                case 9:
                    return a.t1 = a.sent,
                    a.abrupt("return", {
                        type: "drawing",
                        rect: a.t0,
                        clip: true,
                        elements: a.t1
                    });
                case 11:
                    case "end":
                    return a.stop()
                }
            },
            o)
        }))()
    }
    buildAllClipTexts(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.abrupt("return", Promise.all(n.getAllNodesHasTextNode(e).map(function () {
                        var e = asyncToGenerator(regeneratorRuntime.mark(function e(r) {
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.t0 = DOMHelper.findRectElementToRect(r, t),
                                    e.next = 3,
                                    n.buildTextBlock(r, DOMHelper.getElementRect(r));
                                case 3:
                                    return e.t1 = e.sent,
                                    e.t2 = [e.t1],
                                    e.abrupt("return", {
                                        type: "drawing",
                                        rect: e.t0,
                                        clip: true,
                                        elements: e.t2
                                    });
                                case 6:
                                    case "end":
                                    return e.stop()
                                }
                            },
                            e)
                        }));
                        return function (t) {
                            return e.apply(this, arguments)
                        }
                    } ())));
                case 1:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateArrowLikeComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            var s;
            var l;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t);
                case 2:
                    if (i = r.sent, o = jQuery(e).find(">arrow-like-simple>span"), s = jQuery(e).find(">x-middle"), !(o.length > 0)) {
                        r.next = 10;
                        break
                    }
                    return r.next = 8,
                    n.buildTextBlock(o.get(0), t);
                case 8:
                    r.t0 = r.sent;
                    i.textBlocks = [r.t0];
                case 10:
                    if (! (s.length > 0)) {
                        r.next = 17;
                        break
                    }
                    return l = s.find("hcomposed-symbol"),
                    r.t1 = i.drawings,
                    r.next = 15,
                    n.generateFromHVComposed(l.get(0), t);
                case 15:
                    r.t2 = r.sent;
                    i.drawings = r.t1.concat.call(r.t1, r.t2);
                case 17:
                    return r.abrupt("return", i);
                case 18:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateOverUnderbraceComposite(e, t, n) {
        var r = this;
        return asyncToGenerator(regeneratorRuntime.mark(function i() {
            var o;
            var s;
            var l;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    return a.next = 2,
                    r.generateDefaultComposite(e, t);
                case 2:
                    if (o = a.sent, s = jQuery(e).find(">".concat(n)), !(jQuery(e).find(">".concat(n, " middle-wrapper")).length > 0)) {
                        a.next = 33;
                        break
                    }
                    return l = s.find(">brace-top-wrapper").get(0),
                    a.t0 = o.drawings,
                    a.next = 10,
                    r.buildClipDrawingWithSelector(l, ">first", t);
                case 10:
                    return a.t1 = a.sent,
                    a.t0.push.call(a.t0, a.t1),
                    a.t2 = o.drawings,
                    a.next = 15,
                    r.buildClipDrawingWithSelector(l, ">middle-wrapper:eq(0)", t);
                case 15:
                    return a.t3 = a.sent,
                    a.t2.push.call(a.t2, a.t3),
                    a.t4 = o.drawings,
                    a.next = 20,
                    r.buildClipDrawingWithSelector(l, ">middle", t);
                case 20:
                    return a.t5 = a.sent,
                    a.t4.push.call(a.t4, a.t5),
                    a.t6 = o.drawings,
                    a.next = 25,
                    r.buildClipDrawingWithSelector(l, ">middle-wrapper:eq(1)", t);
                case 25:
                    return a.t7 = a.sent,
                    a.t6.push.call(a.t6, a.t7),
                    a.t8 = o.drawings,
                    a.next = 30,
                    r.buildClipDrawingWithSelector(l, ">last", t);
                case 30:
                    return a.t9 = a.sent,
                    a.t8.push.call(a.t8, a.t9),
                    a.abrupt("return", o);
                case 33:
                    if (! (s.length > 0)) {
                        a.next = 37;
                        break
                    }
                    return a.next = 36,
                    Promise.all(r.getAllNodesHasTextNode(s.get(0)).map((e) => {
                        return r.buildTextBlock(e, t)
                    }));
                case 36:
                    o.textBlocks = a.sent;
                case 37:
                    return a.abrupt("return", o);
                case 38:
                    case "end":
                    return a.stop()
                }
            },
            i)
        }))()
    }
    generateOverbraceComposite(e, t) {
        return this.generateOverUnderbraceComposite(e, t, "top-brace")
    }
    generateUnderbraceComposite(e, t) {
        return this.generateOverUnderbraceComposite(e, t, "bottom-brace")
    }
    generateOverSymbolComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: true,
                        svg: false
                    });
                case 2:
                    return i = r.sent,
                    r.next = 5,
                    Promise.all(n.getAllNodesHasTextNode(jQuery(e).find(">x-symbol").get(0)).map((e) => {
                        return n.buildTextBlock(e, t, true)
                    }));
                case 5:
                    return i.textBlocks = r.sent,
                    r.abrupt("return", i);
                case 7:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateUnderLineSymbolComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return i = n.generateDefaultComposite(e, t, {
                        editareas: true,
                        svg: true
                    }),
                    r.abrupt("return", i);
                case 2:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateOverlineSymbolComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: true,
                        svg: false
                    });
                case 2:
                    return i = r.sent,
                    o = jQuery(e).find(">line-border").get(0),
                    r.t0 = i.drawings,
                    r.next = 7,
                    n.buildClipDrawingWithSelector(o, ">hcomposed-symbol", t);
                case 7:
                    return r.t1 = r.sent,
                    r.t0.push.call(r.t0, r.t1),
                    r.abrupt("return", i);
                case 10:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateGroupInlineCollapsedBlock(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: true,
                        svg: true
                    });
                case 2:
                    return (i = r.sent).drawings = i.drawings.concat(n.buildLinesFromBorder(e, t)),
                    i.drawings = i.drawings.concat(n.buildLinesFromBorder(jQuery(e).find(">span:eq(0)").get(0), t)),
                    r.abrupt("return", i);
                case 6:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateMathchaTextBlock(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: false,
                        svg: false
                    });
                case 2:
                    return i = r.sent,
                    r.next = 5,
                    n.buildTextBlock(jQuery(e).find(">mathcha-text>span:eq(0)").get(0), t);
                case 5:
                    return o = r.sent,
                    i.textBlocks = [o],
                    i.drawings = [n.generateSvg(jQuery(e).find(">mathcha-text>svg:eq(0)").get(0), t)],
                    r.abrupt("return", i);
                case 9:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateLongDivision(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            var s;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.t0 = DOMHelper.findRectElementToRect(e, t),
                    r.next = 3,
                    n.findAndGenerateEditAreas(e, t);
                case 3:
                    return r.t1 = r.sent,
                    r.t2 = n.findAndGenerateSvgs(e, t),
                    i = {
                        type: "composite",
                        rect: r.t0,
                        areas: r.t1,
                        drawings: r.t2
                    },
                    o = jQuery(e).find(">div>.role-division-svg-text,>div>div>div>.role-division-svg-text,>div>div>.role-division-svg-text").toArray(),
                    r.next = 9,
                    Promise.all(o.map((e) => {
                        return n.buildTextBlock(e, t)
                    }));
                case 9:
                    return s = r.sent,
                    i.drawings = i.drawings.concat(s),
                    r.abrupt("return", i);
                case 12:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateCheckBoxBlock(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            var s;
            var l;
            var c;
            var d;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: false,
                        svg: false
                    });
                case 2:
                    return i = r.sent,
                    o = jQuery(e).find(".regular-checkbox").get(0),
                    s = DOMHelper.findRectElementToRect(o, t),
                    l = Object(ShapeDocRoundedRect)({
                        type: "doc-rounded-rect",
                        id: "fake",
                        data: {
                            p1: {
                                x: s.left,
                                y: s.top
                            },
                            p2: {
                                x: s.right,
                                y: s.bottom
                            },
                            cornerRadiusPercentage: 2 / s.width
                        }
                    }),
                    c = ShapeHelper.pathsD(l),
                    d = {
                        type: "path",
                        d: c,
                        stroke: jQuery(o).css("color")
                    },
                    i.drawings = [d].concat(n.findAndGenerateSvgs(e, t)),
                    r.abrupt("return", i);
                case 10:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateOverArrowSymbolComposite(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateDefaultComposite(e, t, {
                        editareas: true,
                        svg: true
                    });
                case 2:
                    if (i = r.sent, o = jQuery(e).find(">arrow-symbol").get(0), !(jQuery(o).find(">svg").length > 0)) {
                        r.next = 6;
                        break
                    }
                    return r.abrupt("return", i);
                case 6:
                    return r.t0 = i.drawings,
                    r.next = 9,
                    n.buildClipDrawingWithSelector(o, ">hcomposed-symbol>start", t);
                case 9:
                    return r.t1 = r.sent,
                    r.t0.push.call(r.t0, r.t1),
                    r.t2 = i.drawings,
                    r.next = 14,
                    n.buildClipDrawingWithSelector(o, ">hcomposed-symbol>middle", t);
                case 14:
                    return r.t3 = r.sent,
                    r.t2.push.call(r.t2, r.t3),
                    r.abrupt("return", i);
                case 17:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateFromHVComposed(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    if (e) {
                        r.next = 2;
                        break
                    }
                    return r.abrupt("return", []);
                case 2:
                    return r.next = 4,
                    n.buildClipDrawingWithSelector(e, ">start", t, true);
                case 4:
                    return r.t0 = r.sent,
                    r.next = 7,
                    n.buildClipDrawingWithSelector(e, ">middle:eq(0)", t, true);
                case 7:
                    return r.t1 = r.sent,
                    r.next = 10,
                    n.buildClipDrawingWithSelector(e, ">middle-center", t, true);
                case 10:
                    return r.t2 = r.sent,
                    r.next = 13,
                    n.buildClipDrawingWithSelector(e, ">middle:eq(1)", t, true);
                case 13:
                    return r.t3 = r.sent,
                    r.next = 16,
                    n.buildClipDrawingWithSelector(e, ">end", t, true);
                case 16:
                    return r.t4 = r.sent,
                    r.t5 = (e) => {
                        return e
                    },
                    r.abrupt("return", [r.t0, r.t1, r.t2, r.t3, r.t4].filter(r.t5));
                case 19:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateOpenCloseBlock(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    if (! (jQuery(e).find(">bracket-span").length > 0)) {
                        r.next = 2;
                        break
                    }
                    return r.abrupt("return", n.buildTextBlock(jQuery(e).find(">bracket-span").get(0), t));
                case 2:
                    if (! (jQuery(e).find(">vcomposed-symbol").length > 0)) {
                        r.next = 9;
                        break
                    }
                    return r.t0 = DOMHelper.findRectElementToRect(e, t),
                    r.t1 = [],
                    r.next = 7,
                    n.generateFromHVComposed(jQuery(e).find(">vcomposed-symbol").get(0), t);
                case 7:
                    return r.t2 = r.sent,
                    r.abrupt("return", {
                        type: "composite",
                        rect: r.t0,
                        areas: r.t1,
                        drawings: r.t2
                    });
                case 9:
                    return r.abrupt("return", n.generateDefaultComposite(e, t, {
                        editareas: false,
                        svg: true
                    }));
                case 10:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateBigDelimiterBlock(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    if (! (jQuery(e).find(">big-delimiter>vcomposed-symbol").length > 0)) {
                        r.next = 7;
                        break
                    }
                    return r.t0 = DOMHelper.findRectElementToRect(e, t),
                    r.t1 = [],
                    r.next = 5,
                    n.generateFromHVComposed(jQuery(e).find(">big-delimiter>vcomposed-symbol").get(0), t);
                case 5:
                    return r.t2 = r.sent,
                    r.abrupt("return", {
                        type: "composite",
                        rect: r.t0,
                        areas: r.t1,
                        drawings: r.t2
                    });
                case 7:
                    return r.abrupt("return", n.generateDefaultComposite(e, t, {
                        editareas: false,
                        svg: true
                    }));
                case 8:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    getBorderColor(e, t) {
        return jQuery(e).css("border-".concat(t, "-color"))
    }
    getBorderStyle(e, t) {
        return jQuery(e).css("border-".concat(t, "-style"))
    }
    buildLineFromBorderPosition(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        var a = this.getBorderStyle(e, n);
        if ("solid" != a && "dotted" != a) return [];
        if (r.ignoreColors) {
            var i = this.getBorderColor(e, n);
            if (r.ignoreColors.some((e) => {
                return i.includes(e)
            })) return []
        }
        var o;
        var s = DOMHelper.findRectElementToRect(e, t);
        switch (n) {
        case "top":
            o = {
                x1: s.left,
                x2: s.right,
                y1: s.top,
                y2: s.top
            };
            break;
        case "bottom":
            o = {
                x1: s.left,
                x2: s.right,
                y1: s.bottom,
                y2: s.bottom
            };
            break;
        case "left":
            o = {
                x1: s.left,
                x2: s.left,
                y1: s.top,
                y2: s.bottom
            };
            break;
        case "right":
            o = {
                x1: s.right,
                x2: s.right,
                y1: s.top,
                y2: s.bottom
            }
        }
        return [_.assignIn({
            type: "line",
            fill: "none",
            strokeDashArray: "dotted" == a ? "1" : void 0,
            stroke: jQuery(e).css("border-".concat(n, "-color")),
            strokeWidth: r.forceLineWidth ? r : jQuery(e).css("border-".concat(n, "-width"))
        },
        o)]
    }
    buildLinesFromBorder(e, t, n) {
        return _.flatten([this.buildLineFromBorderPosition(e, t, "top", n), this.buildLineFromBorderPosition(e, t, "left", n), this.buildLineFromBorderPosition(e, t, "right", n), this.buildLineFromBorderPosition(e, t, "bottom", n)])
    }
    generateMatrixBlock(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            var s;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    if (! (jQuery(e).find(">x-matrix.array").length > 0)) {
                        r.next = 8;
                        break
                    }
                    return i = {
                        ignoreColors: ["115,113,113,0", "224,224,224"],
                        forceLineWidth: "1px"
                    },
                    r.t0 = DOMHelper.findRectElementToRect(e, t),
                    r.next = 5,
                    n.findAndGenerateEditAreas(e, t);
                case 5:
                    return r.t1 = r.sent,
                    r.t2 = _.flatten(jQuery(e).find("x-matrix>table>tbody>tr").toArray().map((e) => {
                        return n.buildLinesFromBorder(e, t, i)
                    }).concat(jQuery(e).find("x-matrix>table>tbody>tr>td").toArray().map((e) => {
                        return n.buildLinesFromBorder(e, t, i)
                    }))),
                    r.abrupt("return", {
                        type: "composite",
                        rect: r.t0,
                        areas: r.t1,
                        drawings: r.t2
                    });
                case 8:
                    if (! (jQuery(e).find(">x-matrix>vcomposed-symbol").length > 0)) {
                        r.next = 21;
                        break
                    }
                    return r.next = 11,
                    n.generateFromHVComposed(jQuery(e).find(">x-matrix>vcomposed-symbol").get(0), t);
                case 11:
                    return o = r.sent,
                    r.next = 14,
                    n.generateFromHVComposed(jQuery(e).find(">x-matrix>vcomposed-symbol").get(1), t);
                case 14:
                    return s = r.sent,
                    r.t3 = DOMHelper.findRectElementToRect(e, t),
                    r.next = 18,
                    n.findAndGenerateEditAreas(e, t);
                case 18:
                    return r.t4 = r.sent,
                    r.t5 = o.concat(s),
                    r.abrupt("return", {
                        type: "composite",
                        rect: r.t3,
                        areas: r.t4,
                        drawings: r.t5
                    });
                case 21:
                    return r.abrupt("return", n.generateDefaultComposite(e, t, {
                        editareas: true,
                        svg: true
                    }));
                case 22:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    generateLine(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return i = jQuery(e).find(">x-block,>composite-block,>opensymbol-block,>closesymbol-block").toArray().map((e) => {
                        switch (e.tagName.toLowerCase()) {
                        case "x-block":
                            return n.buildTextBlock(e, t);
                        case "composite-block":
                            return jQuery(e).hasClass("fraction-symbol") ? n.generateFractionComposite(e, t) : jQuery(e).hasClass("boxed") ? n.generateBoxexComposite(e, t) : jQuery(e).hasClass("integral-like-symbol") ? n.generateIntegralLikeComposite(e, t) : jQuery(e).hasClass("summation-like-symbol") ? n.generateIntegralLikeComposite(e, t) : jQuery(e).find(">constant-text").length > 0 ? n.generateConstantComposite(e, t) : jQuery(e).hasClass("lim-like-symbol") ? n.generateIntegralLikeComposite(e, t) : jQuery(e).hasClass("arrow-like-symbol") ? n.generateArrowLikeComposite(e, t) : jQuery(e).hasClass("over-brace-symbol") ? n.generateOverbraceComposite(e, t) : jQuery(e).hasClass("under-brace-symbol") ? n.generateUnderbraceComposite(e, t) : jQuery(e).hasClass("over-symbol") ? n.generateOverSymbolComposite(e, t) : jQuery(e).hasClass("under-line-symbol") ? n.generateUnderLineSymbolComposite(e, t) : jQuery(e).hasClass("over-line-symbol") ? n.generateOverlineSymbolComposite(e, t) : jQuery(e).hasClass("over-arrow-symbol") ? n.generateOverArrowSymbolComposite(e, t) : jQuery(e).hasClass("big-delimiter-symbol") ? n.generateBigDelimiterBlock(e, t) : jQuery(e).hasClass("matrix-symbol") ? n.generateMatrixBlock(e, t) : jQuery(e).hasClass("text-mode-group-inline-collapsed") ? n.generateGroupInlineCollapsedBlock(e, t) : jQuery(e).hasClass("math-mode-group-collapsed") ? n.generateGroupInlineCollapsedBlock(e, t) : jQuery(e).hasClass("mathcha-text") ? n.generateMathchaTextBlock(e, t) : jQuery(e).hasClass("checkbox-symbol") ? n.generateCheckBoxBlock(e, t) : jQuery(e).hasClass("long-division-symbol") ? n.generateLongDivision(e, t) : n.generateDefaultComposite(e, t);
                        case "opensymbol-block":
                            case "closesymbol-block":
                            return n.generateOpenCloseBlock(e, t)
                        }
                    }),
                    r.next = 3,
                    Promise.all(i);
                case 3:
                    return r.t0 = r.sent,
                    r.abrupt("return", {
                        blocks: r.t0
                    });
                case 5:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
};
/// var O = n(187)/*ImageViewer*/;  // 1 times
/// var D = n(70)/*TransformHelper*/;  // 3 times
/// var N = n(19)/*TimerHelper*/;  // 1 times
/// var k = n(48)/*FontList*/;  // 1 times
/*n.d(t, "createNewFileName", function () {
    return createNewFileName
});*/
var B = {};
var F = function (e) {
    var t = jQuery('<div style="position:fixed;left:0;top:0;visibility:hidden;line-height:line-height:960px;"/>');
    var n = jQuery('<span style="font-size:0;line-height:0;">A</span>');
    var r = jQuery('<span style="font-size:800px;line-height:960px;">A</span>');
    return t.css("font-family", e).append(n).append(r).appendTo("body"),
    TimerHelper.waitABit(function () {
        return t.remove()
    }),
    console.log("top:", n.position().top),
    console.log("height:", r.height()),
    n.position().top / r.height()
};
var FontProcessor = new class {
    blobToCanvas(e) {
        var t = document.createElement("canvas");
        t.style.width = "".concat(e.width, "px");
        t.style.height = "".concat(e.height, "px");
        jQuery(t).attr("width", "".concat(2 * e.width, "px"));
        jQuery(t).attr("height", "".concat(2 * e.height, "px"));
        var n = new Image;
        return n.onload = () => {
            var r = t.getContext("2d");
            if (e.blob.type.indexOf("svg+xml") >= 0) r.scale(2, 2);
            r.drawImage(n, 0, 0, 2 * e.width, 2 * e.height)
        },
        n.src = URL.createObjectURL(e.blob),
        n.width = 2 * e.width,
        n.height = 2 * e.height,
        t
    }
    exportSvg(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.next = 2,
                    n.generateToStr(e, false, t.padding, t.transparent, t.bgColor);
                case 2:
                    return i = r.sent,
                    o = new Blob([i.resultStr], {
                        type: "image/svg+xml;charset=utf-8"
                    }),
                    r.abrupt("return", Promise.resolve({
                        width: i.width,
                        height: i.height,
                        blob: o,
                        str: i.resultStr
                    }));
                case 5:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    exportPng(e, t) {
        var n = this;
        return asyncToGenerator(regeneratorRuntime.mark(function r() {
            var i;
            var o;
            var s;
            var l;
            return regeneratorRuntime.wrap(function (r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return i = new Image,
                    r.next = 3,
                    n.generateToStr(e, true, t.padding, t.transparent, t.bgColor);
                case 3:
                    return o = r.sent,
                    s = t.scale || 2,
                    (l = document.createElement("canvas")).style.width = "".concat(o.width, "px"),
                    l.style.height = "".concat(o.height, "px"),
                    jQuery(l).attr("width", "".concat(o.width * s, "px")),
                    jQuery(l).attr("height", "".concat(o.height * s, "px")),
                    r.abrupt("return", new Promise((e) => {
                        i.onload = () => {
                            var t = l.getContext("2d");
                            t.scale(2, 2);
                            t.drawImage(i, 0, 0, o.width * s, o.height * s);
                            l.toBlob((t) => {
                                e({
                                    width: o.width,
                                    height: o.height,
                                    blob: t,
                                    str: null
                                })
                            })
                        };
                        i.style.width = "".concat(o.width * s, "px");
                        i.style.height = "".concat(o.height * s, "px");
                        i.src = "data:image/svg+xml;charset=utf8," + encodeURIComponent(o.resultStr)
                    }));
                case 11:
                    case "end":
                    return r.stop()
                }
            },
            r)
        }))()
    }
    exportCanvas(e, t, n) {
        var r = this;
        return asyncToGenerator(regeneratorRuntime.mark(function i() {
            var o;
            var s;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    return o = new Image,
                    a.next = 3,
                    r.generateToStr(e, true, n.padding, n.transparent, n.bgColor);
                case 3:
                    return s = a.sent,
                    jQuery(t).attr("width", "".concat(2 * s.width, "px")),
                    jQuery(t).attr("height", "".concat(2 * s.height, "px")),
                    a.abrupt("return", new Promise((e) => {
                        o.onload = () => {
                            var n = t.getContext("2d");
                            n.scale(2, 2);
                            n.drawImage(o, 0, 0, 2 * s.width, 2 * s.height);
                            e()
                        };
                        o.style.width = "".concat(2 * s.width, "px");
                        o.style.height = "".concat(2 * s.height, "px");
                        o.src = "data:image/svg+xml;charset=utf8," + encodeURIComponent(s.resultStr)
                    }));
                case 8:
                    case "end":
                    return a.stop()
                }
            },
            i)
        }))()
    }
    exportDiagramSvg(e, t) {
        return this.generateDiagram(e, false, t.transparent, t.noGrid, t.bgColor, 2).then((t) => {
            var n = new Blob([t], {
                type: "image/svg+xml;charset=utf-8"
            });
            var r = DOMHelper.getElementRect(e);
            return {
                width: r.width,
                height: r.height,
                blob: n,
                str: t
            }
        })
    }
    exportDiagramCanvas(e, t, n) {
        return this.generateDiagram(e, true, n.transparent, n.noGrid, n.bgColor, 2).then((n) => {
            var r = new Image;
            var a = DOMHelper.getElementRect(e);
            return jQuery(t).attr("width", "".concat(2 * a.width, "px")),
            jQuery(t).attr("height", "".concat(2 * a.height, "px")),
            new Promise((e) => {
                r.onload = () => {
                    var n = t.getContext("2d");
                    n.scale(2, 2);
                    n.drawImage(r, 0, 0, 2 * a.width, 2 * a.height);
                    e()
                };
                r.style.width = "".concat(2 * a.width, "px");
                r.style.height = "".concat(2 * a.height, "px");
                r.src = "data:image/svg+xml;charset=utf8," + encodeURIComponent(n)
            })
        })
    }
    exportDiagramPng(e, t) {
        return this.generateDiagram(e, true, t.transparent, t.noGrid, t.bgColor, t.scale).then((n) => {
            var r = new Image;
            var a = t.scale || 2;
            var i = DOMHelper.getElementRect(e);
            var o = document.createElement("canvas");
            return o.style.width = "".concat(i.width, "px"),
            o.style.height = "".concat(i.height, "px"),
            jQuery(o).attr("width", "".concat(i.width * a, "px")),
            jQuery(o).attr("height", "".concat(i.height * a, "px")),
            new Promise((e) => {
                r.onload = () => {
                    var t = o.getContext("2d");
                    t.scale(2, 2);
                    t.drawImage(r, 0, 0, i.width * a, i.height * a);
                    o.toBlob((t) => {
                        e({
                            width: i.width,
                            height: i.height,
                            blob: t,
                            str: null
                        })
                    })
                };
                r.style.width = "".concat(i.width * a, "px");
                r.style.height = "".concat(i.height * a, "px");
                r.src = "data:image/svg+xml;charset=utf8," + encodeURIComponent(n)
            })
        })
    }
    generateToStr(e, t, n, r, i) {
        var s = this;
        return asyncToGenerator(regeneratorRuntime.mark(function o() {
            var l;
            var d;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    return a.next = 2,
                    w.generate(e, n);
                case 2:
                    return l = a.sent,
                    d = s.generateRootBlock(l, t, r, i),
                    a.abrupt("return", {
                        resultStr: Object(ReactDOMServer.renderToStaticMarkup)(d),
                        width: l.baseRect.width,
                        height: l.baseRect.height
                    });
                case 5:
                    case "end":
                    return a.stop()
                }
            },
            o)
        }))()
    }
    generateToJSX(e, t, n, r) {
        var i = this;
        return asyncToGenerator(regeneratorRuntime.mark(function o() {
            var s;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    return a.next = 2,
                    w.generate(e, t);
                case 2:
                    return s = a.sent,
                    a.abrupt("return", i.generateRootBlock(s, false, n, r));
                case 4:
                    case "end":
                    return a.stop()
                }
            },
            o)
        }))()
    }
    generateDiagram(e, t, n, r, i) {
        var s = this;
        var l = arguments;
        return asyncToGenerator(regeneratorRuntime.mark(function o() {
            var d;
            var h;
            var p;
            var f;
            var g;
            var y;
            var A;
            var E;
            var v;
            var S;
            var C;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    return d = l.length > 5 && void 0 !== l[5] ? l[5] : 2,
                    h = DOMHelper.getElementRect(e),
                    p = jQuery(e).find(">clip-region>zoom-region>svg:eq(0)").clone(),
                    f = jQuery(e).find(">clip-region>zoom-region>svg:eq(1)").clone(),
                    a.next = 6,
                    s.inlineSvgImagesInfo(f, d);
                case 6:
                    return f.find(".transparent").remove(),
                    g = r ? "" : (new XMLSerializer).serializeToString(p.get(0)),
                    y = (new XMLSerializer).serializeToString(f.get(0)),
                    a.next = 11,
                    s.generateDiagramTextsToJSX(jQuery(e).find(">clip-region>zoom-region").get(0), n, i);
                case 11:
                    return A = a.sent,
                    E = t ? 2 * h.width : h.width,
                    v = t ? 2 * h.height : h.height,
                    S = "\nwidth:".concat(E, "px;\nheight:").concat(v, "px;\nbackground:").concat(n ? "transparent" : i || "white", ";\nfill:none;\n"),
                    C = Object(ReactDOMServer.renderToStaticMarkup)(A),
                    a.abrupt("return", '<svg xmlns="http://www.w3.org/2000/svg" width="'.concat(E, '" height="').concat(v, '" style="').concat(S, '">\n').concat(g, "\n").concat(y, "\n").concat(C, "\n</svg>\n"));
                case 17:
                    case "end":
                    return a.stop()
                }
            },
            o)
        }))()
    }
    inlineSvgImagesInfo(e, t) {
        return Promise.all(e.find("image").toArray().map((e) => {
            var n = jQuery(e);
            return ImageDataHelper.getImageBase64(e, t).then((e) => {
                n.attr("xlink:href", e)
            }).
            catch((e) => {
                console.log(e);
                n.removeAttr("xlink:href")
            })
        }))
    }
    generateDiagramTextsToJSX(e, t, n) {
        var r = this;
        return asyncToGenerator(regeneratorRuntime.mark(function i() {
            var o;
            return regeneratorRuntime.wrap(function (a) {
                for (;;) switch (a.prev = a.next) {
                case 0:
                    return a.next = 2,
                    w.generateDiagramTexts(e);
                case 2:
                    return o = a.sent,
                    a.abrupt("return", r.generateRootBlock(o, false, t, n));
                case 4:
                    case "end":
                    return a.stop()
                }
            },
            i)
        }))()
    }
    generateRootBlock(e, t, n, r) {
        var a = e.baseRect;
        var i = a.width;
        var o = a.height;
        return React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: t ? 2 * i : i,
            height: t ? 2 * o : o,
            style: {
                width: t ? 2 * i : i,
                height: t ? 2 * o : o,
                fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", "Asana"),
                background: n ? "transparent" : r || "white"
            }
        },
        e.areas.map((e) => {
            return this.generateEditArea(e)
        }), e.drawings.map((e) => {
            return this.generateDrawingElement(e)
        }))
    }
    generateEditArea(e) {
        var t = (new TransformHelper).orgin(e.rect.left + e.rect.width / 2, e.rect.top + e.rect.height / 2);
        if (e.rotation) t = t.rotate(e.rotation, "deg");
        if (e.skewX) t = t.skew(e.skewX, 0, "deg");
        if (e.flipX) t = t.scale(-1, 1);
        var n = {
            transform: t.toCssStyle()
        };
        return React.createElement("g", {
            style: n,
            key: Math.random()
        },
        e.lines.map((e) => {
            return this.generateLine(e)
        }))
    }
    getSvgStyle(e) {
        return {
            fill: e.fill,
            strokeWidth: e.strokeWidth,
            stroke: e.stroke
        }
    }
    generateDrawingElement(e) {
        switch (e.type) {
        case "drawing":
            var t = e.rect;
            var n = t.left;
            var r = t.top;
            var a = t.width;
            var i = t.height;
            return React.createElement("svg", {
                x: n,
                key: Math.random(),
                style: {
                    overflow: e.clip ? "hidden" : "visible"
                },
                y: r,
                viewBox: e.viewBox,
                height: i || 1,
                width: a || 1
            },
            e.elements.map((e) => {
                return this.generateDrawingElement(e)
            }));
        case "path":
            return React.createElement("path", {
                key: Math.random(),
                d: e.d,
                style: this.getSvgStyle(e)
            });
        case "group":
            return React.createElement("g", {
                transform: e.transform,
                key: Math.random()
            },
            e.elements.map((e) => {
                return this.generateDrawingElement(e)
            }));
        case "polygon":
            return React.createElement("polygon", {
                key: Math.random(),
                points: e.points,
                style: this.getSvgStyle(e)
            });
        case "polyline":
            return React.createElement("polyline", {
                key: Math.random(),
                points: e.points,
                style: this.getSvgStyle(e)
            });
        case "line":
            return React.createElement("line", {
                key: Math.random(),
                strokeDasharray: e.strokeDashArray,
                style: this.getSvgStyle(e),
                x1: e.x1,
                y1: e.y1,
                x2: e.x2,
                y2: e.y2
            });
        case "rect":
            return React.createElement("rect", {
                key: Math.random(),
                style: this.getSvgStyle(e),
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height
            });
        case "text":
            case "composite-text":
            case "empty-text":
            case "vector-text":
            return this.generateTextBlock(e)
        }
    }
    generateLine(e) {
        return React.createElement("g", {
            key: Math.random()
        },
        e.blocks.map((e) => {
            return this.generateBlock(e)
        }))
    }
    generateBlock(e) {
        switch (e.type) {
        case "text":
            case "composite-text":
            case "vector-text":
            return this.generateTextBlock(e);
        case "composite":
            return this.generateCompositeBlock(e);
        default:
            throw new Error("TODO:bilinmeyen tip. kontrol et!");
        }
    }
    pathToSvgD(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
        var n = [];
        var r = 0;
        var a = {
            M: 2,
            L: 2,
            Q: 4,
            C: 6
        };
        var i = 0;
        for (; i < e.cmds.length; i++) {
            var o = e.cmds[i];
            var s = r + (a[o] ? a[o] : 0);
            n.push(o);
            for (; r < s;) {
                var l = e.crds[r++];
                n.push(parseFloat(l.toFixed(t)) + (r == s ? "" : " "))
            }
        }
        return n.join("")
    }
    generateTextBlock(e) {
        switch (e.type) {
        case "empty-text":
            return React.createElement("g", {
                key: Math.random()
            });
        case "composite-text":
            return React.createElement("g", {
                key: Math.random()
            },
            e.blocks.map((e) => {
                return this.generateTextBlock(e)
            }));
        case "vector-text":
            return this.generateVectorTextBlock(e);
        case "text":
            return this.generatePlainTextBlock(e)
        }
    }
    generatePlainTextBlock(e) {
        if (e.isHidden) return React.createElement("g", {
            key: Math.random()
        });
        var t = e.rect;
        var n = t.left;
        var r = t.top;
        var a = t.height;
        var i = e.isCustomLoadedFont && !e.notNormalText;
        var o = {
            whiteSpace: "pre",
            stroke: "none",
            fill: e.color,
            fontSize: e.fontSize,
            fontFamily: e.fontFamily,
            fontWeight: e.fontWeight,
            fontStyle: e.fontStyle,
            dominantBaseline: i ? "auto" : "text-before-edge",
            textDecoration: e.textDecoration || void 0,
            direction: e.isRtl ? "rtl" : void 0,
            textAnchor: e.isRtl ? "end" : void 0
        };
        if (i && !B[e.fontFamily]) {
            var s = F(e.fontFamily);
            console.log("result baseline:", s);
            B[e.fontFamily] = s;
            console.log("height:", a)
        }
        var c = B[e.fontFamily];
        return React.createElement("text", {
            key: Math.random(),
            x: n,
            y: i ? r + a * (c + .025) : r,
            style: o
        },
        e.text)
    }
    generateVectorTextBlock(e) {
        var t;
        var n = e.rect;
        var r = n.left;
        var a = n.top;
        var i = e.fontSize / e.unitsPerEm;
        if ("underline" == e.textDecoration) {
            var o = 1 + e.fontSize / 16;
            var s = e.fontSize / 16;
            t = React.createElement("path", {
                d: "M 0,".concat(o, " L").concat(e.rect.width, ",").concat(o),
                strokeWidth: s,
                stroke: e.color,
                fill: "none"
            })
        } else if ("line-through" == e.textDecoration) {
            var c = -e.fontSize / 4;
            var d = e.fontSize / 16;
            t = React.createElement("path", {
                d: "M 0,".concat(c, " L").concat(e.rect.width, ",").concat(c),
                strokeWidth: d,
                stroke: e.color,
                fill: "none"
            })
        }
        return React.createElement("g", {
            key: Math.random(),
            style: {
                transform: (new TransformHelper).translate(r, a + e.fontSize).toCssStyle()
            }
        },
        React.createElement("path", {
            d: this.pathToSvgD(e.path),
            stroke: e.color,
            strokeWidth: e.isBold ? 24 : 8,
            fill: e.color,
            style: {
                transform: (new TransformHelper).scale(i, -i).toCssStyle()
            }
        }), t)
    }
    generateCompositeBlock(e) {
        return React.createElement("g", {
            key: Math.random()
        },
        e.areas.map((e) => {
            return this.generateEditArea(e)
        }), e.drawings.map((e) => {
            return this.generateDrawingElement(e)
        }), (e.textBlocks || []).map((e) => {
            return this.generateTextBlock(e)
        }))
    }
}

export { createNewFileName }

export default FontProcessor