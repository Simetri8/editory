import _ from 'lodash';
import jQuery from 'jquery';
import CheckObject from '../Editor/CheckObject';
import DOMHelper from '../Elements/DOMHelper';
import PropUpdateHelper from './PropUpdateHelper';
import SectionPrefixHelper from '../Editor/SectionPrefixHelper';

/// xxx(122) /*TheoremHelper*/

/// var r = n(5)/*sizzle*/;  // 5 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 1 times
/// var o = n(7)/*PropUpdateHelper*/;  // 2 times
/// var s = n(2)/*lodash*/;  // 8 times
/// var l = n.n(s);
/// var c = n(208)/*SectionPrefixHelper*/;  // 3 times
/// var d = n(31)/*CheckObject*/;  // 1 times
var h = [{
    key: "thm",
    env: "thm",
    name: "Theorem"
},
{
    key: "lema",
    env: "lema",
    name: "Lemma"
},
{
    key: "corollary",
    env: "corollary",
    name: "Corollary"
},
{
    key: "proposition",
    env: "proposition",
    name: "Proposition"
},
{
    key: "definition",
    env: "definition",
    name: "Definition"
}];
var TheoremHelper = new class {
    merge(e, t) {
        var n = _.clone(this.getTheorems(e));
        if (!t || !t.theorems) return {
            info: e,
            keyMap: {}
        };
        var r = _.clone(this.getTheorems(t));
        var a = r.filter((e) => {
            return n.some((t) => {
                return t.name === e.name
            })
        });
        var i = {};
        a.forEach((e) => {
            var t = n.find((t) => {
                return t.name === e.name
            }).key;
            if (t != e.key) i[e.key] = t
        });
        var s = _.difference(r, a);
        var c = [];
        return s.forEach((e) => {
            var t = n.find((t) => {
                return t.env === e.env
            });
            var r = n.find((t) => {
                return t.key === e.key
            });
            var a = e;
            if (t && (a = PropUpdateHelper.setProp(a, "env", e.env + Math.random().toString().substr(3))), r) {
                var s = Math.random().toString();
                i[e.key] = s;
                a = PropUpdateHelper.setProp(a, "key", s)
            }
            c.push(a)
        }),
        {
            info: {
                theorems: n.concat(c)
            },
            keyMap: i
        }
    }
    modifyLinesWithMergeMod(e, t) {
        if (! (_.keys(t.keyMap).length <= 0)) {
            var n = 0;
            for (; n < e.length; n++) {
                var r = e[n];
                var a = 0;
                for (; a < r.blocks.length; a++) {
                    var i = r.blocks[a];
                    if (CheckObject.isTheorem(i) && t.keyMap[i.theoremKey]) i.theoremKey = t.keyMap[i.theoremKey]
                }
            }
        }
    }
    getTheorems(e) {
        return e ? e.theorems : h
    }
    getTheoremsByKeys(e, t) {
        return this.getTheorems(t).filter((t) => {
            return e.indexOf(t.key) >= 0
        })
    }
    getTheorem(e, t) {
        return this.getTheorems(t).find((t) => {
            return t.key === e
        })
    }
    toLatex(e, t) {
        var n = this.getTheorems(t);
        var r = this.buildCountMap(n);
        var a = _.mapKeys(n, (e) => {
            return e.key
        });
        var i = [];
        return e.forEach((e) => {
            var t = n.find((t) => {
                return t.key === e
            });
            this.buildTheoremLatex(t, a, r, i)
        }),
        _.uniq(i).join("\n")
    }
    buildTheoremLatex(e, t, n, r) {
        if (e.ignoreNumbering) return r.push("\\newtheorem*{".concat(e.env, "}{").concat(e.name, "}"));
        if (!e.numeringType || "default" == e.numeringType) return r.push("\\newtheorem{".concat(e.env, "}{").concat(e.name, "}"));
        if ("section" == e.numeringType) return r.push("\\newtheorem{".concat(e.env, "}{").concat(e.name, "}[").concat(e.section, "]"));
        if ("share" == e.numeringType) {
            var a = n[e.key];
            var i = _.keys(n).filter((e) => {
                return n[e] == a
            });
            if (i.length <= 1) return void r.push("\\newtheorem{".concat(e.env, "}{").concat(e.name, "}"));
            var o = i.find((e) => {
                return "share" != t[e].numeringType
            });
            var s = t[o];
            return this.buildTheoremLatex(s, t, n, r),
            void r.push("\\newtheorem{".concat(e.env, "}[").concat(s.env, "]{").concat(e.name, "}"))
        }
        if ("with" == e.numeringType) {
            var c = t[e.nestedWith];
            return c ? (this.buildTheoremLatex(c, t, n, r), r.push("\\newtheorem{".concat(e.env, "}{").concat(e.name, "}[").concat(c.env, "]"))) : void r.push("\\newtheorem{".concat(e.env, "}{").concat(e.name, "}"))
        }
        throw new Error("not supported");
    }
    getTheoremUsages(e) {
        var t = {};
        return jQuery(e).find(">area-container").find("composite-block.theorem").each((e, n) => {
            var r = n.reactInstance.getModel();
            if (!t[r.theoremKey]) t[r.theoremKey] = 0;
            t[r.theoremKey] += 1
        }),
        t
    }
    buildTheoremNumber(e, t) {
        var n = this.getTheorems(t);
        var r = this.theoremMap(n);
        var o = this.buildCountMap(n);
        var s = DOMHelper.findEditLines(e);
        jQuery(e).find(">area-container").find("composite-block.theorem").each((e, t) => {
            var n = t.reactInstance.getModel();
            var i = o[n.theoremKey] || {
                count: 0
            };
            var l = i.count.toString();
            if ((r[n.theoremKey] || {
                env: n.theoremKey,
                key: n.theoremKey,
                name: n.theoremKey,
                numeringType: "default"
            }).ignoreNumbering) l = "";
            else if (i.sectionType || i.parentTheoremLatex) {
                var c = jQuery(t).closest("x-line").get(0);
                var d = this.buildPrefixForParent(i.sectionType || i.parentTheoremLatex, o, c, s);
                if (i.lastPrefix != d) {
                    i.count = 1;
                    i.lastPrefix = d
                }
                l = i.lastPrefix + i.count
            }
            jQuery(t).find(">theorem-counting").text(l);
            jQuery(t).find(">theorem-name").text(r[n.theoremKey].name);
            n.___theoremName = "".concat(r[n.theoremKey].name, " ").concat(l);
            i.count += 1
        })
    }
    buildPrefixForParent(e, t, n, r) {
        if ("section" == e) return SectionPrefixHelper.buildPrefix(n, r, 1);
        if ("subsection" == e) return SectionPrefixHelper.buildPrefix(n, r, 2);
        if ("subsubsection" == e) return SectionPrefixHelper.buildPrefix(n, r, 3);
        var a = t[e];
        var i = "";
        var o = a.count;
        return (a.sectionType || a.parentTheoremLatex) && (i = this.buildPrefixForParent(a.sectionType || a.parentTheoremLatex, t, n, r), a.lastPrefix != i && (o = 1)),
        i + Math.max(o - 1, 0).toString() + "."
    }
    buildCountMap(e) {
        var t = {};
        var n = _.mapKeys(e, (e) => {
            return e.key
        });
        return (e = e.filter((e) => {
            return !e.ignoreNumbering
        })).filter((e) => {
            return !e.numeringType || "default" == e.numeringType
        }).forEach((e) => {
            t[e.key] = {
                count: 1
            }
        }),
        e.filter((e) => {
            return "section" == e.numeringType
        }).forEach((e) => {
            t[e.key] = {
                count: 1,
                sectionType: e.section
            }
        }),
        e.filter((e) => {
            return "with" == e.numeringType
        }).forEach((e) => {
            t[e.key] = {
                count: 1
            };
            if (n[e.nestedWith]) t[e.key].parentTheoremLatex = e.nestedWith
        }),
        e.filter((e) => {
            return "share" == e.numeringType
        }).forEach((e) => {
            var r = e.shareWith;
            var a = n[r];
            for (; a && "share" == a.numeringType;) {
                r = a.shareWith;
                a = n[r]
            }
            if (t[r]) t[e.key] = t[r];
            else t[e.key] = {
                count: 1
            }
        }),
        t
    }
    theoremMap(e) {
        var t = {};
        return e.forEach((e) => {
            t[e.key] = e
        }),
        t
    }
}

export default TheoremHelper