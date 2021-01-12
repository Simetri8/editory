import _ from 'lodash';
import BatchedUpdates from '../Mathcha/BatchedUpdates';
import CompositeBlock from '../Mathcha/CompositeBlock';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TabularHelper from './TabularHelper';
import TabularUtils from './TabularUtils';

/// xxx(251) /*TabularActions*/

/// var r = n(29)/*CompositeBlock*/;  // 1 times
/// var a = n(7)/*PropUpdateHelper*/;  // 4 times
/// var i = n(45)/*TabularUtils*/;  // 8 times
/// var o = n(15)/*TabularHelper*/;  // 3 times
/// var l = n(2)/*lodash*/;  // 4 times
/// var c = n.n(l);
/// var d = n(96)/*BatchedUpdates*/;  // 6 times
var s = new class {
    insertRowBelow(e, t) {
        var n = e.model;
        var r = e.selected;
        var s = TabularUtils.insertNewRowBelow(n, r.key);
        var l = r;
        return t && (l = PropUpdateHelper.update(r, {
            key: TabularHelper.nextRowFormKey(r.key),
            selected: {
                lineIndex: 0,
                charIndex: 0
            }
        })),
        {
            model: s,
            selected: l
        }
    }
    insertRowAbove(e) {
        var t = e.model;
        var n = e.selected;
        return {
            model: TabularUtils.insertNewRowAbove(t, n.key),
            selected: PropUpdateHelper.update(n, {
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            })
        }
    }
    insertColumnOnLeft(e) {
        var t = e.model;
        var n = e.selected;
        return {
            model: TabularUtils.insertColumnOnLeft(t, n.key),
            selected: PropUpdateHelper.update(n, {
                selected: {
                    lineIndex: 0,
                    charIndex: 0
                }
            })
        }
    }
    insertColumnOnRight(e, t) {
        var n = e.model;
        var r = e.selected;
        var s = TabularUtils.insertColumnOnRight(n, r.key);
        var l = r;
        return t && (l = PropUpdateHelper.update(r, {
            key: TabularHelper.nextColumnFormKey(r.key),
            selected: {
                lineIndex: 0,
                charIndex: 0
            }
        })),
        {
            model: s,
            selected: l
        }
    }
    removeCurrentRow(e, t) {
        var n = e.model;
        var r = e.selected;
        var a = TabularUtils.removeRows(n, t);
        return a.row <= 0 || a.column <= 0 ? {
            model: a,
            selected: r
        } : {
            model: a,
            selected: TabularUtils.findSafeCursorBackward(a, r, t[0])
        }
    }
    removeCurrentColumn(e, t) {
        var n = e.model;
        var r = e.selected;
        var a = TabularUtils.removeColumns(n, t);
        return a.row <= 0 || a.column <= 0 ? {
            model: a,
            selected: r
        } : {
            model: a,
            selected: TabularUtils.findSafeCursorBackward(a, r.selected, t[0])
        }
    }
};
/*n.d(t, "a", function () {
    return h
});*/
class h extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.cacheRowIds = {}
    }
    insertRowBelow() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        BatchedUpdates. in (() => {
            var t = s.insertRowBelow({
                model: this.props.data,
                selected: this.props.selected
            },
            e);
            var n = t.model;
            var r = t.selected;
            this.props.onDataChanged(n);
            if (e) this.props.onSelectedChanged(r)
        })
    }
    insertRowAbove() {
        BatchedUpdates. in (() => {
            var e = s.insertRowAbove({
                model: this.props.data,
                selected: this.props.selected
            });
            var t = e.model;
            var n = e.selected;
            this.props.onDataChanged(t);
            this.props.onSelectedChanged(n)
        })
    }
    insertColumnOnLeft() {
        BatchedUpdates. in (() => {
            var e = s.insertColumnOnLeft({
                model: this.props.data,
                selected: this.props.selected
            });
            var t = e.model;
            var n = e.selected;
            this.props.onDataChanged(t);
            this.props.onSelectedChanged(n)
        })
    }
    insertColumnOnRight() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        BatchedUpdates. in (() => {
            var t = s.insertColumnOnRight({
                model: this.props.data,
                selected: this.props.selected
            },
            e);
            var n = t.model;
            var r = t.selected;
            this.props.onDataChanged(n);
            if (e) this.props.onSelectedChanged(r)
        })
    }
    removeCurrentRow(e) {
        return BatchedUpdates. in (() => {
            e = e || [this.props.selected.key];
            var t = s.removeCurrentRow({
                model: this.props.data,
                selected: this.props.selected
            },
            e);
            var n = t.model;
            var r = t.selected;
            if (n.row <= 0 || n.column <= 0) return {
                removeSelf: true
            };
            this.props.onDataChanged(n);
            this.props.onSelectedChanged(r)
        })
    }
    removeCurrentColumn(e) {
        return BatchedUpdates. in (() => {
            e = e || [this.props.selected.key];
            var t = s.removeCurrentColumn({
                model: this.props.data,
                selected: this.props.selected
            },
            e);
            var n = t.model;
            var r = t.selected;
            if (n.row <= 0 || n.column <= 0) return {
                removeSelf: true
            };
            this.props.onDataChanged(n);
            this.props.onSelectedChanged(r)
        })
    }
    getKeyForRow(e) {
        var t = TabularHelper.getAllKeysFromRow(this.props.data, e);
        var n = _.map(t, (e) => {
            return this.props.data.elements[e].id
        });
        var r = _.find(_.keys(this.cacheRowIds), (e) => {
            var t = this.cacheRowIds[e];
            return _.intersection(n, t).length > 0
        });
        return r || (r = "n" + Math.random()),
        this.cacheRowIds[r] = n,
        r
    }
}

export default h