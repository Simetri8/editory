import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import DOMHelper from '../Elements/DOMHelper';
import InitHelper from '../InitHelper';

/// xxx(1601) /*MathTagHandler*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 5 times
/// var o = n.n(i);
/// var s = n(16)/*ReactDOM*/;  // 2 times
/// var l = n.n(s);
/// var m = n(4)/*DOMHelper*/;  // 3 times
/// var C = n(2)/*lodash*/;  // 3 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 24 times
/// var Ae = n.n(ye);
/// var Y = n(32)/*InitHelper*/;  // 1 times
var ua = new class {
    autoNumbering(e) {
        if (e) {
            var t = {};
            var n = {};
            var r = 1;
            jQuery(e).find("ref-tag.line-tag").each(function () {
                if (jQuery(this).hasClass("automatic")) {
                    if (jQuery(this).parent().hasClass("tag-direction-vertical")) {
                        var e = jQuery(this).parent().parent();
                        var a = e.attr("data-tag-group-id");
                        n[a] = n[a] || {
                            type: "vertical-numbering",
                            groupId: a,
                            cells: []
                        };
                        var i = n[a];
                        var o = jQuery(this).attr("data-tag-id");
                        i.cells.push({
                            tagHtml: this,
                            originalValue: r,
                            newValue: r,
                            tagId: o,
                            cIndex: Number.parseInt(e.attr("data-c-index"), 10),
                            rIndex: Number.parseInt(e.attr("data-r-index"), 10)
                        });
                        t[o] = i;
                    } else {
                        t[jQuery(this).attr("data-tag-id")] = {
                            type: "numbering",
                            value: r
                        };
                        jQuery(this).children(":first").text("(".concat(r, ")"));
                    }
                    r++;
                } else {
                    t[jQuery(this).attr("data-tag-id")] = {
                        type: "text",
                        value: jQuery(this).children(":first").text()
                    };
                }
            });
            _.values(n).forEach((e) => {
                e.cells = _.orderBy(e.cells, ["cIndex", "rIndex"], ["asc", "asc"]);
                var t = _.minBy(e.cells, (e) => {
                    return e.originalValue;
                }).originalValue;
                e.cells.forEach((e) => {
                    e.newValue = t;
                    jQuery(e.tagHtml).children(":first").text("(".concat(e.newValue, ")"));
                    t++;
                });
            });
            jQuery(e).find("tag-ref-name.tag-ref-name").each(function () {
                var e = jQuery(this).attr("ref-tag-id");
                var n = t[e];
                if (n) {
                    switch (n.type) {
                    case "numbering":
                        jQuery(this).text("(".concat(n.value, ")"));
                        break;
                    case "text":
                        jQuery(this).text(n.value);
                        break;
                    case "vertical-numbering":
                        var r = n.cells.find((t) => {
                            return t.tagId === e;
                        });
                        if (r) {
                            jQuery(this).text("(".concat(r.newValue, ")"));
                        }
                    }
                    jQuery(this).css("color", jQuery(this).attr("data-color"));
                } else {
                    jQuery(this).text("(?)");
                    jQuery(this).css("color", "red");
                }
            });
        }
    }
};
var pa = new class {
    buildTagSelect(e, t, n) {
        var r = DOMHelper.getElementRect(e);
        var a = 0;
        var tagBoxGap = [];
        jQuery(e).find("ref-tag.line-tag").each(function (e) {
            var s = this.parentNode;
            var l = DOMHelper.findRectElementToRect(s, r);
            var c = {
                left: l.left,
                top: l.top,
                height: l.height,
                width: l.width
            };
            if ("EDIT-AREA" == s.tagName) {
                c.width += 50;
                var d = s.parentNode.previousSibling;
                if (d && "TD" == d.tagName && jQuery(d).hasClass("first-in-pair")) {
                    var h = DOMHelper.findRectElementToRect(d, r);
                    c.width += h.width + 10;
                    c.left = h.left - 10;
                }
            }
            if (Math.abs(l.top - a) > 4) {
                var u = {
                    left: 0,
                    top: a,
                    height: Math.max(0, l.top - a),
                    width: r.width
                };
                tagBoxGap.push(React.createElement("tag-box-gap", {
                    onMouseDown: t,
                    key: e + "ga",
                    style: u
                }));
            }
            a = l.bottom;
            var p = jQuery(this).attr("data-tag-id");
            tagBoxGap.push(React.createElement("tag-box-select", {
                onMouseDown: (e) => {
                    return n(e, p);
                },
                key: e,
                style: c
            }));
        });
        if (Math.abs(r.height - a) > 4) {
            var s = {
                left: 0,
                top: a,
                height: Math.max(0, r.height - a),
                width: r.width
            };
            tagBoxGap.push(React.createElement("tag-box-gap", {
                onMouseDown: t,
                key: "randomga",
                style: s
            }));
        }
        return {
            boxMessage: "Please select tag",
            isMessageBoxShow: true,
            messageBoxType: "info",
            component: React.createElement("tag-select-wrapper", null, tagBoxGap)
        };
    }
};
class MathTagHandler {
    constructor(e) {
        this.target = e;
        this.needLineTagProcess = true;
        this.notifyLineTagRender = () => {
            this.needLineTagProcess = true;
        };
        this.onGapMouseDown = (e) => {
            e.stopPropagation();
            this.clearLineTagSelection();
        };
        this.selectLineTag = (e, t) => {
            e.stopPropagation();
            this.clearLineTagSelection();
            this.target.insertBySymbolInfo(_.assignIn({},
            InitHelper.getTagRef(), {
                tagId: t
            }));
        };
    }
    clearLineTagSelection() {
        var e = this.target.getMathTypeHtmlElement();
        if (e) {
            ReactDOM.unmountComponentAtNode(jQuery(e).find(">tag-container").get(0));
            this.target.clearMessage();
        }
    }
    processLineTagNumbering() {
        if (this.needLineTagProcess) {
            console.log("handle tag");
            ua.autoNumbering(this.target.getMathTypeHtmlElement());
            this.needLineTagProcess = false;
        }
    }
    buildTagSelection() {
        if (this.target.getMathTypeHtmlElement()) {
            var e = pa.buildTagSelect(this.target.getMathTypeHtmlElement(), this.onGapMouseDown, this.selectLineTag);
            if (e) {
                if (e.isMessageBoxShow) {
                    this.target.showMessage(e.boxMessage, e.messageBoxType);
                } else {
                    this.target.clearMessage();
                }
                ReactDOM.render(e.component, jQuery(this.target.getMathTypeHtmlElement()).find(">tag-container").get(0));
            }
        }
    }
    renderTagContainer() {
        return React.createElement("tag-container", null);
    }
}
/*n.d(t, "a", function () {
    return MathTagHandler;
})*/

export default MathTagHandler