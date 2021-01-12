import equal from 'fast-deep-equal';
import ReactDOM from 'react-dom';
import DocumentCorruption from '../Document/DocumentCorruption';
import DOMHelper from '../Elements/DOMHelper';
import EditArea from '../Editor/EditArea';
import Line from '../Elements/Line';

/// xxx(1639) /*EditAreaContainer*/

/// var s = n(16)/*ReactDOM*/;  // 2 times
/// var l = n.n(s);
/// var p = n(21)/*EditArea*/;  // 1 times
/// var m = n(4)/*DOMHelper*/;  // 4 times
/// var f = n(248)/*Line*/;  // 1 times
/// var g = n(95)/*DocumentCorruption*/;  // 1 times
/// var A = n(714)/*fast-deep-equal*/;  // 1 times
/// var E = n.n(A);
class y extends Line {
    constructor() {
        super(...arguments);
        this.getRef = (e) => {
            this.line = e;
            if (e) {
                e.reactInstance = this;
            }
        };
    }
    shouldComponentUpdate(e, t) {
        return void 0 !== this.selected || void 0 !== this.lineData ? (this.selected = void 0, this.lineData = void 0, true) : super.shouldComponentUpdate(e, t);
    }
    updateSelected(e) {
        this.selected = e;
        this.registerForceUpdate();
    }
    updateData(e, t) {
        this.selected = t;
        this.lineData = e;
        this.registerForceUpdate();
    }
    getLineSelected() {
        return void 0 !== this.selected ? this.selected : this.props.selected;
    }
    getLineData() {
        var e = void 0 !== this.lineData ? this.lineData : this.props.line;
        return DocumentCorruption.makeSureBlocks(e),
        e;
    }
}
var v = new class {
    getUpdateInfo(e, t) {
        try {
            if (e.fontSize != t.fontSize) {
                return "all";
            }
            if (e.isOneLineChanged && e.data != t.data && e.data.lines.length === t.data.lines.length && e.selected && t.selected && e.selected.lineIndex === t.selected.lineIndex) {
                var n = e.data.lines[e.selected.lineIndex];
                var r = t.data.lines[t.selected.lineIndex];
                return n.style != r.style || n.id != r.id ? "all" : n === r ? "all" : "one-line";
            }
            return e.data != t.data ? "all" : null == e.selected && null == t.selected ? "none" : equal(e.selected, t.selected) ? "none" : "cursor";
        } catch(e) {
            return "all";
        }
    }
};
var EditAreaContainer = class extends EditArea {
    shouldComponentUpdate(e) {
        var t = v.getUpdateInfo(e, this.props);
        if ("all" == t) {
            return true;
        }
        if ("one-line" == t) {
            var n = e.data.lines[e.selected.lineIndex];
            var r = this.updateDataCache.bind(this, n, e.selected);
            return this.context.fixedContextHandler.getBatchUpdater().push(r, this),
            false;
        }
        if ("cursor" == t) {
            var a = this.updateLineCacheBySelectedChange.bind(this, this.props.selected, e.selected);
            return this.context.fixedContextHandler.getBatchUpdater().push(a, this),
            false;
        }
        return false;
    }
    updateDataCache(e, t) {
        var n = ReactDOM.findDOMNode(this);
        DOMHelper.findLineByIndex(n, t.lineIndex).reactInstance.updateData(e, t);
    }
    updateLineCacheBySelectedChange(e, t) {
        var n = ReactDOM.findDOMNode(this);
        if (e && t && e.lineIndex === t.lineIndex) {
            DOMHelper.findLineByIndex(n, t.lineIndex).reactInstance.updateSelected(t);
        } else {
            if (t && (this.props.data.lines && t.lineIndex >= this.props.data.lines.length ? console.warn("selected line invalid") : DOMHelper.findLineByIndex(n, t.lineIndex).reactInstance.updateSelected(t)), e) {
                var r = DOMHelper.findLineByIndex(n, e.lineIndex);
                if (r && r.reactInstance) {
                    r.reactInstance.updateSelected(null);
                }
            }
        }
    }
    getEditClss() {
        return y;
    }
};
/*n.d(t, "a", function () {
    return EditAreaContainer;
})*/

export default EditAreaContainer