import _ from 'lodash';
import update from 'react-addons-update';

/// xxx(7) /*PropUpdateHelper*/

/// var r = n(2)/*lodash*/;  // 2 times
/// var a = n.n(r);
/// var i = n(258)/*react-addons-update*/;  // 5 times
/// var o = n.n(i);
var PropUpdateHelper = new class {
    replaceArrayItemBy(e, t) {
        for (var n = [], r = 0; r < e.length; r++) {
            var a = e[r],
            i = t(a);
            i = i || a;
            n.push(i)
        }
        return n
    }
    replaceArrayByEntity(e, t) {
        var n = e.findIndex(e => e.id === t.id);
        return n < 0 ? e : this.setIndex(e, n, t)
    }
    update(e, t) {
        return _.assign(_.clone(e), t)
    }
    setProp(e, t, n) {
        return this.set(e, t, n)
    }
    setIndex(e, t, n) {
        return this.set(e, t, n)
    }
    set(e, t, n) {
        var r = t.toString().split(".");
        return this.setFromPropsInner(e, r, 0, n)
    }
    insert(e, t, n) {
        return null == e && (e = []),
        update(e, {
            $splice: [[t, 0, n]]
        })
    }
    insertMultiple(e, t, n) {
        return null == e && (e = []),
        e.slice(0, t).concat(n).concat(e.slice(t))
    }
    remove(e, t) {
        return update(e, {
            $splice: [[t, 1]]
        })
    }
    removeEntity(e, t) {
        var n = e.findIndex(e => e.id === t);
        return n < 0 ? e : this.remove(e, n)
    }
    splice(e, t, n) {
        for (var r = arguments.length, a = new Array(r > 3 ? r - 3 : 0), i = 3; i < r; i++) a[i - 3] = arguments[i];
        return update(e, {
            $splice: [[t, n].concat(a)]
        })
    }
    replaceWithArray(e, t, n, r) {
        return e.slice(0, t).concat(r).concat(e.slice(t + n))
    }
    setFromProps(e, t, n) {
        return this.setFromPropsInner(e, t, 0, n)
    }
    setFromPropsInner(e, t, n, r) {
        var a = t[n];
        if (n === t.length - 1) return e[a] == r ? e : ((i = {})[a] = {
            $set: r
        },
        update(e, i));
        var i, s = this.setFromPropsInner(e[a], t, n + 1, r);
        return s === e[a] ? e : ((i = {})[a] = {
            $set: s
        },
        update(e, i))
    }
}

export default PropUpdateHelper