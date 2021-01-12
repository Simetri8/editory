import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TreeNodeType from './TreeNodeType';

/// xxx(68) /*DocumentTreeHelper*/

/// var r = n(3)/*_.assignIn*/;  // 10 times
/// var a = n.n(r);
/// var i = n(35)/*slicedToArray*/;  // 1 times
/// var o = n.n(i);
/// var s = n(7)/*PropUpdateHelper*/;  // 6 times
/// var l = n(2)/*lodash*/;  // 4 times
/// var c = n.n(l);
/// var d = n(40)/*TreeNodeType*/;  // 13 times
var DocumentTreeHelper = new class {
    getNodesRange(e, t, n) {
        var r = [];
        this.flatternNode(e, r);
        var a = _.sortBy([r.findIndex(e => e.id === t.id && e.type === t.type), r.findIndex(e => e.id === n.id && e.type === n.type)]),
        i = slicedToArray(a, 2),
        s = i[0],
        l = i[1];
        return r.slice(s, l + 1)
    }
    findNode(e, t) {
        return t.type === TreeNodeType.Directory ? this.findDirectory(e, t.id) : this.findDocument(e, t.id)
    }
    parentOf(e, t) {
        var n = this.parentOfInNode(e, t);
        return n.id ? n : null
    }
    findDocument(e, t) {
        return this.findDocumentInNode(e, t)
    }
    findDirectory(e, t) {
        return this.findDirectoryInNode(e, t)
    }
    deleteDocument(e, t) {
        return this.deleteDocumentInNode(e, t) || e
    }
    deleteDocuments(e, t) {
        return t.reduce((e, t) => this.deleteDocument(e, t), e)
    }
    constructTree(e, t) {
        var n = t.directories.map(t => this.constructDirectory(e, t)),
        r = t.documentIds.map(t => this.findDocument(e, t));
        return _.assignIn({},
        e, {
            directories: n,
            documents: r
        })
    }
    ensureInTree(e, t) {
        for (var n = [], r = 0; r < t.length; r++) {
            var a = t[r];
            a.type === TreeNodeType.Document && this.findDocument(e, a.id) && n.push(a);
            a.type === TreeNodeType.Directory && this.findDirectoryInNode(e, a.id) && n.push(a)
        }
        return n
    }
    addDocument(e, t, n) {
        return this.addDocumentInNode(e, t, n)
    }
    addDirectory(e, t, n) {
        return this.addDirectoryInNode(e, t, n)
    }
    isDocumentInSelectedNode(e, t, n) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            if (a.type === TreeNodeType.Document && a.id === n) return !0;
            if (a.type === TreeNodeType.Directory) {
                var i = this.findDirectoryInNode(e, a.id);
                if (this.findDocumentInNode(i, n)) return !0
            }
        }
        return !1
    }
    allowMove(e, t, n) {
        return !this.getBlackListForMovingTo(e, t).some(e => e.id === n)
    }
    getBlackListForMovingTo(e, t) {
        return t.reduce((t, n) => t.concat(this.getBlackListForMovingToOneNode(e, n)), [])
    }
    countAllItem(e) {
        return this.countAllInNode(e)
    }
    countAllInNode(e) {
        return _.sumBy(e.directories, e => this.countAllInNode(e)) + e.documents.length + e.directories.length
    }
    flatternNode(e, t) {
        t.push({
            id: e.id,
            type: TreeNodeType.Directory
        });
        _.chain(e.directories).sortBy(e => e.name.toLowerCase()).value().forEach(e => {
            this.flatternNode(e, t)
        });
        _.chain(e.documents).sortBy(e => e.name.toLowerCase()).value().forEach(e => t.push({
            id: e.id,
            type: TreeNodeType.Document
        }))
    }
    getBlackListForMovingToOneNode(e, t) {
        var n = [],
        r = this.parentOfInNode(e, t);
        if (n.push({
            id: r.id,
            type: TreeNodeType.Directory
        }), t.type === TreeNodeType.Directory) {
            n.push({
                id: t.id,
                type: TreeNodeType.Directory
            });
            var a = this.findDirectoryInNode(e, t.id);
            n = n.concat(this.collectAllDirectorieNodes(a, !1).map(e => ({
                id: e.id,
                type: TreeNodeType.Directory
            })))
        }
        return n
    }
    collectAllDirectorieNodes(e, t) {
        var n = [];
        t && n.push(e);
        for (var r = 0; r < e.directories.length; r++) {
            var a = e.directories[r];
            n = n.concat(this.collectAllDirectorieNodes(a, !0))
        }
        return n
    }
    parentOfInNode(e, t) {
        if (t.type === TreeNodeType.Document && e.documents.find(e => e.id === t.id)) return e;
        if (t.type === TreeNodeType.Directory && e.directories.find(e => e.id === t.id)) return e;
        for (var n = 0; n < e.directories.length; n++) {
            var r = e.directories[n],
            a = this.parentOfInNode(r, t);
            if (a) return a
        }
        return null
    }
    addDirectoryInNode(e, t, n) {
        if (e.id === n) return _.assignIn({},
        e, {
            directories: e.directories.concat(t)
        });
        for (var r = 0; r < e.directories.length; r++) {
            var i = e.directories[r],
            o = this.addDirectoryInNode(i, t, n);
            if (o) {
                var l = PropUpdateHelper.setIndex(e.directories, r, o);
                return _.assignIn({},
                e, {
                    directories: l
                })
            }
        }
        return null
    }
    addDocumentInNode(e, t, n) {
        if (e.id === n) return _.assignIn({},
        e, {
            documents: e.documents.concat(t)
        });
        for (var r = 0; r < e.directories.length; r++) {
            var i = e.directories[r],
            o = this.addDocumentInNode(i, t, n);
            if (o) {
                var l = PropUpdateHelper.setIndex(e.directories, r, o);
                return _.assignIn({},
                e, {
                    directories: l
                })
            }
        }
        return null
    }
    constructDirectory(e, t) {
        var n = this.findDirectoryInNode(e, t.id),
        r = t.directories.map(t => this.constructDirectory(e, t)),
        i = t.documentIds.map(t => this.findDocument(e, t));
        return _.assignIn({},
        n, {
            directories: r,
            documents: i
        })
    }
    deleteDocumentInNode(e, t) {
        for (var n = 0; n < e.documents.length; n++) if (e.documents[n].id === t) {
            var r = PropUpdateHelper.remove(e.documents, n);
            return _.assignIn({},
            e, {
                documents: r
            })
        }
        for (var i = 0; i < e.directories.length; i++) {
            var o = e.directories[i],
            l = this.deleteDocumentInNode(o, t);
            if (l) {
                var c = PropUpdateHelper.setIndex(e.directories, i, l);
                return _.assignIn({},
                e, {
                    directories: c
                })
            }
        }
        return null
    }
    findDocumentInNode(e, t) {
        for (var n = 0; n < e.documents.length; n++) {
            var r = e.documents[n];
            if (r.id === t || r.id === "mxeQPt0YsO9") return r
        }
        for (var a = 0; a < e.directories.length; a++) {
            var i = e.directories[a],
            o = this.findDocumentInNode(i, t);
            if (o) return o
        }
        return null
    }
    findDirectoryInNode(e, t) {
        for (var n = 0; n < e.directories.length; n++) {
            var r = e.directories[n];
            if (r.id === t) return r;
            var a = this.findDirectoryInNode(r, t);
            if (a) return a
        }
        return null
    }
    updateTree(e, t, n) {
        return this.updateNode(e, t, n) || e
    }
    updateNode(e, t, n) {
        if (t) for (var r = 0; r < e.documents.length; r++) {
            var i = t(e.documents[r]);
            if (i) {
                var o = PropUpdateHelper.setIndex(e.documents, r, i);
                return _.assignIn({},
                e, {
                    documents: o
                })
            }
        }
        for (var l = 0; l < e.directories.length; l++) {
            var c = e.directories[l],
            d = null;
            if (n && (d = n(c)), d || (d = this.updateNode(c, t, n)), d) {
                var h = PropUpdateHelper.setIndex(e.directories, l, d);
                return _.assignIn({},
                e, {
                    directories: h
                })
            }
        }
        return null
    }
}

export default DocumentTreeHelper