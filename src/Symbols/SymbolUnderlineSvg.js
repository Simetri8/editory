import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { StyleHelperC } from '../Mathcha/StyleHelper';
import DOMHelper from '../Elements/DOMHelper';
import ElementTypes from '../Elements/ElementTypes';

/// xxx(333) /*SymbolUnderlineSvg*/

/// var r = n(3);  // 1 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 1 times
/// var o = n.n(i);
/// var s = n(5)/*sizzle*/;  // 1 times
/// var l = n.n(s);
/// var c = n(38)/*ElementTypes*/;  // 1 times
/// var d = n(4)/*DOMHelper*/;  // 7 times
/// var h = n(2)/*lodash*/;  // 3 times
/// var u = n.n(h);
/// var p = n(0)/*React*/;  // 2 times
/// var m = n.n(p);
/// var f = n(18)/*StyleHelper*/;  // 8 times
var SymbolUnderlineSvg = new class {
    generate(e, t, n) {
        var r = jQuery(e).find(">edit-area");
        var i = DOMHelper.findEditLines(r.get(0));
        var s = [];
        var h = [];
        var p = [];
        i.forEach((e) => {
            if (DOMHelper.isEmptyLine(e)) {
                var t = DOMHelper.getEmptyBlock(e).getBoundingClientRect();
                return s.push(_.assignIn({},
                t, {
                    width: 0,
                    right: t.left
                })),
                void this.addBaseLines([t], p)
            }
            DOMHelper.findBlocks(e).forEach((e) => {
                if (e.tagName === ElementTypes.block) {
                    var t = this.getTextRects(e);
                    var n = t.blockRects;
                    var r = t.spaceRects;
                    h = h.concat(r);
                    this.addBaseLines(n, p);
                    s = s.concat(n)
                } else s.push(e.getBoundingClientRect())
            })
        });
        var g;
        var y = DOMHelper.getElementRect(e);
        var A = [];
        if (n.lineOnText) p.forEach((e) => {
            var t = Object(StyleHelperC)(y.width);
            var n = Object(StyleHelperC)(e - y.top - 2);
            A.push("M".concat(0, ",").concat(n, " L").concat(t, ",").concat(n, " "))
        });
        else {
            _.flatMap(p, (e) => {
                return this.baseLineToGaps(e, s, y.left, y.right)
            }).forEach((e) => {
                var t = Object(StyleHelperC)(e.left - y.left);
                var n = Object(StyleHelperC)(e.right - y.left);
                var r = Object(StyleHelperC)(e.bottom - y.top - 2);
                A.push("M".concat(t, ",").concat(r, " L").concat(n, ",").concat(r, " "))
            });
            h.forEach((e) => {
                var t = Object(StyleHelperC)(e.left - y.left);
                var n = Object(StyleHelperC)(e.right - y.left);
                var r = p.find((t) => {
                    return e.top < t && t <= e.bottom
                });
                if (r) {
                    var a = Object(StyleHelperC)(r - y.top - 2);
                    A.push("M".concat(t, ",").concat(a, " L").concat(n, ",").concat(a, " "))
                }
            })
        }
        if ("dotted" == n.lineType) g = "1";
        if ("dashed" == n.lineType) g = "4 2";
        var E = {
            strokeDasharray: g,
            stroke: n.color
        };
        ReactDOM.render(React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            }
        },
        React.createElement("path", {
            d: A.join(" "),
            fill: "none",
            style: E
        })), t)
    }
    addBaseLines(e, t) {
        e.forEach((e) => {
            if (!t.find((t) => {
                return Math.abs(t - e.bottom) < 3
            })) t.push(e.bottom)
        })
    }
    getTextRects(e) {
        var t;
        var n = _.toArray(e.getClientRects());
        var r = [];
        var a = e.innerText;
        var i = 0;
        for (; i < a.length; i++) if ("\t" == a[i]) if (t) t.to = i;
        else r.push({
            from: i,
            to: i
        });
        else t = null;
        var o = [];
        return r.forEach((t) => {
            o.push(DOMHelper.getElementRect(DOMHelper.rangeFrom2Indexes(e, t.from, t.to + 1)))
        }),
        {
            blockRects: n,
            spaceRects: o
        }
    }
    baseLineToGaps(e, t, n, r) {
        var a = [{
            left: n,
            right: n,
            top: e,
            bottom: e,
            width: 0,
            height: 0
        }].concat(_.sortBy(t.filter((t) => {
            return t.top < e && e <= t.bottom
        }), (e) => {
            return e.right
        })).concat([{
            left: r,
            right: r,
            top: e,
            bottom: e,
            width: 0,
            height: 0
        }]);
        var i = [];
        var o = 0;
        for (; o < a.length - 1; o++) {
            var s = a[o];
            var l = a[o + 1];
            i.push({
                left: s.right,
                right: l.left,
                width: l.left - s.right,
                height: 0,
                top: e,
                bottom: e
            })
        }
        return i.filter((e) => {
            return e.width > 3
        })
    }
}

export default SymbolUnderlineSvg