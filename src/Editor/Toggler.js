import _ from 'lodash';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(146) /*Toggler*/

/// var r = n(3)/*_.assignIn*/;  // 6 times
/// var a = n.n(r);
/// var i = n(2)/*lodash*/;  // 2 times
/// var o = n.n(i);
/// var s = n(7)/*PropUpdateHelper*/;  // 3 times
var Toggler = new class {
    toggleLineSection(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return (e = e || {}).borders ? this.toggleFromToSections(e, t, n) : e.nOfLines ? this.toggleOffLineSection(e, t, n) : this.toggleOnBorderSections(e, t, n)
    }
    isInsideRange(e, t) {
        return !! e && !!e[t]
    }
    toggleFromToSections(e, t, n) {
        var r = t.nOfSections,
        a = t.toggleIndex,
        i = e.borders,
        o = PropUpdateHelper.setIndex(i, a, !i[a]);
        return this.normalizeLineInfo(o, e, r, n)
    }
    normalizeLineInfo(e, t, n, r) {
        var i = void 0,
        s = this.removeFalseBorderAtEnd(e);
        if (0 === s.length) {
            i = 0;
            s = void 0
        }
        if (_.times(n).every((t, n) => e[n])) {
            i = 1;
            s = void 0
        }
        var l = _.assignIn({},
        t, {
            nOfLines: i,
            borders: s
        });
        return r && (l.booktabRule = t.booktabRule && void 0 === s),
        void 0 === l.booktabRule && delete l.booktabRule,
        l
    }
    removeFalseBorderAtEnd(e) {
        if (!e) return e;
        var t = e.lastIndexOf(!0);
        return t < 0 ? [] : e.slice(0, t + 1)
    }
    getSafeBorders(e, t, n) {
        return e || _.times(t).map(() => n)
    }
    toggleOnBorderSections(e, t, n) {
        var r = t.nOfSections,
        a = t.toggleIndex,
        i = PropUpdateHelper.setIndex(this.getSafeBorders(e.borders, r, !1), a, !0);
        return this.normalizeLineInfo(i, e, r, n)
    }
    toggleOffLineSection(e, t, n) {
        var r = t.nOfSections,
        a = t.toggleIndex,
        i = PropUpdateHelper.setIndex(this.getSafeBorders(e.borders, r, !0), a, !1);
        return this.normalizeLineInfo(i, e, r, n)
    }
    toggleBooktab(e, t) {
        return e ? t && !e.booktabRule ? _.assignIn({},
        e, {
            booktabRule: !e.booktabRule,
            borders: void 0,
            nOfLines: e.nOfLines || 1
        }) : _.assignIn({},
        e, {
            booktabRule: !e.booktabRule
        }) : e
    }
    increaseLine(e) {
        return (e = e || {}).borders ? _.assignIn({},
        e, {
            nOfLines: 1,
            borders: void 0
        }) : _.assignIn({},
        e, {
            nOfLines: Math.min((e.nOfLines || 0) + 1, 10),
            borders: void 0
        })
    }
    reduceLine(e) {
        return e = e || {},
        _.assignIn({},
        e, {
            nOfLines: Math.max((e.nOfLines || 0) - 1, 0),
            borders: void 0
        })
    }
}

export default Toggler