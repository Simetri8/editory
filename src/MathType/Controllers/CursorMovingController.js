import _ from 'lodash';
import jQuery from 'jquery';
import ArrayHelper2 from '../../Mathcha/ArrayHelper2';
import BlockUtils from '../../Elements/BlockUtils';
import CursorHelper from '../../Editor/CursorHelper';
import CursorPositionHelper from '../../Editor/CursorPositionHelper';
import DOMHelper from '../../Elements/DOMHelper';
import NumberUtils from '../../Mathcha/NumberUtils';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import RectangleHelper from '../../Geometry/RectangleHelper';
import Searching from '../../Searching';
import TabularHelper from '../../Tabular/TabularHelper';
import TabularUtils from '../../Tabular/TabularUtils';

/// xxx(1647) /*CursorMovingController*/

/// var m = n(4)/*DOMHelper*/;  // 135 times
/// var C = n(2)/*lodash*/;  // 24 times
/// var x = n.n(C);
/// var ye = n(5)/*sizzle*/;  // 11 times
/// var Ae = n.n(ye);
/// var T = n(7)/*PropUpdateHelper*/;  // 2 times
/// var b = n(45)/*TabularUtils*/;  // 4 times
/// var L = n(15)/*TabularHelper*/;  // 4 times
/// var ce = n(46)/*RectangleHelper*/;  // 18 times
/// var de = n(55)/*ArrayHelper2*/;  // 8 times
/// var he = n(49)/*CursorPositionHelper*/;  // 18 times
/// var pe = n(58)/*BlockUtils*/;  // 3 times
/// var me = n(75)/*CursorHelper*/;  // 7 times
/// var ge = n(144)/*Searching*/;  // 5 times
/// var Ee = n(52)/*NumberUtils*/;  // 2 times
var le = class {
    visit(e, t) {
        return DOMHelper.isEditArea(e) ? this.visitEditArea(e, t) : DOMHelper.isComposite(e) ? this.visitComposite(e, t) : DOMHelper.isEditorLine(e) ? this.visitEditLine(e, t) : DOMHelper.isRoot(e) ? this.visitRoot(e, t) : DOMHelper.isEditAreaBlock(e) ? this.visitEditAreaBlock(e, t) : DOMHelper.isEditAreaLine(e) ? this.visitEditAreaLine(e, t) : void 0;
    }
    visitEditAreaLine(e, t) {
        return null;
    }
    visitEditAreaBlock(e, t) {
        return null;
    }
    visitEditArea(e, t) {
        return null;
    }
    visitEditLine(e, t) {
        return null;
    }
    visitComposite(e, t) {
        return null;
    }
    visitRoot(e, t) {
        return null;
    }
};
var ue = class extends le {
    constructor(e) {
        super();
        this.pos = e;
    }
    reselectCharForCorrectCursorPos(e, t) {
        return RectangleHelper.isOnMidLeft(e, t) ? DOMHelper.findPreviousChar(e.element) : e.element;
    }
    visitNonCharBlock(e, t) {
        if (!e.data.isComposite || !e.data.hasChildEditor || DOMHelper.shouldNotMoveNestedEditor(e.data.element)) {
            var n = CursorPositionHelper.cursorFromBlock(e.data, t, DOMHelper.closestEditor(t));
            return e.rect.left + e.rect.width / 2 < this.pos.left && (n.charIndex += 1),
            n;
        }
        if (RectangleHelper.isRectClampPosInXAxis(e, this.pos)) {
            return this.visitComposite(e.data.element);
        }
        if (RectangleHelper.isRectOnTheLeftOf(e, this.pos)) {
            var r = CursorPositionHelper.cursorFromBlock(e.data, t, DOMHelper.closestEditor(t));
            return r.charIndex += 1,
            r;
        }
        return RectangleHelper.isRectOnTheRightOf(e, this.pos) ? CursorPositionHelper.cursorFromBlock(e.data, t, DOMHelper.closestEditor(t)) : void 0;
    }
};
var fe = class extends ue {
    constructor(e) {
        super(e);
    }
    visitComposite(e) {
        var t = DOMHelper.elementsToRectWrappers(e.reactInstance.getEditorDoms());
        var n = RectangleHelper.findNearestBottomRects(t, this.pos);
        return null == n ? null : this.visit(n.element);
    }
    visitBlock(e, t) {
        return e.data.isChar ? CursorPositionHelper.cursorFromTextBlock(e.data.element, t, DOMHelper.closestEditor(t), {
            left: this.pos.left,
            top: e.rect.top + 2
        }) : this.visitNonCharBlock(e, t);
    }
    visitBlocks(e, t) {
        if (e.length <= 0) {
            return CursorHelper.emptyLine(t);
        }
        var n = RectangleHelper.findNearestRectsInXAxis(e, this.pos);
        return this.visitBlock(n, t);
    }
    visitEditLine(e) {
        var t = BlockUtils.buildLineBlocks(e);
        var n = DOMHelper.lineBlocksToRectWrappers(t);
        return this.visitBlocks(n, e);
    }
    visitEditAreaBlock(e) {
        var t = DOMHelper.getElementRect(e);
        return CursorPositionHelper.buildCursorPositionForEditAreaBlock(e, {
            left: this.pos.left,
            top: t.top + 2
        });
    }
    visitEditAreaLine(e) {
        return this.visitEditLine(e);
    }
    visitEditArea(e) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.visitEditAreaBlock(e);
        }
        if (DOMHelper.isEditAreaLine(e)) {
            return this.visitEditAreaLine(e);
        }
        var t = DOMHelper.findEditLines(e)[0];
        return this.visit(t);
    }
};
class Se {
    handle(e, t) {
        if ("\\power-index" == DOMHelper.getCompositeLatexName(e)) {
            return "powerValue" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "indexValue" == e.reactInstance.getKeyName();
            }) : null;
        }
        if ("\\z-schema" == DOMHelper.getCompositeLatexName(e)) {
            return "name" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "symDec" == e.reactInstance.getKeyName();
            }) : "symDec" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "conPre" == e.reactInstance.getKeyName();
            }) : null;
        }
        if ("\\sqrt" == DOMHelper.getCompositeLatexName(e)) {
            return "sub1" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "value" == e.reactInstance.getKeyName();
            }) : null;
        }
        if (jQuery(e).hasClass("limit-type")) {
            if ("from" == t.reactInstance.getKeyName()) {
                var n = DOMHelper.findEditors(e);
                return (n = ArrayHelper2.exclude(n, t))[0];
            }
            return null;
        }
        if (DOMHelper.isTabularComposite(e)) {
            var r = t.reactInstance.getKeyName();
            if (!TabularHelper.isKeyInTabularFormat(r)) {
                return;
            }
            var a = TabularUtils.getBelowAvailableCellKey(r, e.reactInstance.getModel());
            if (!a) {
                return null;
            }
            var i = DOMHelper.findEditors(e);
            return _.find(i, (e) => {
                return e.reactInstance.getKeyName() == a;
            });
        }
        if (jQuery(e).hasClass("stackrel-symbol")) {
            if ("sub1" == t.reactInstance.getKeyName()) {
                var o = DOMHelper.findEditors(e);
                return (o = ArrayHelper2.exclude(o, t))[0];
            }
            return null;
        }
        if (jQuery(e).hasClass("over-under-set-symbol")) {
            if ("sub1" == t.reactInstance.getKeyName()) {
                return _.find(DOMHelper.findEditors(e), (e) => {
                    return "value" == e.reactInstance.getKeyName();
                });
            }
            if ("value" == t.reactInstance.getKeyName()) {
                return _.find(DOMHelper.findEditors(e), (e) => {
                    return "sub2" == e.reactInstance.getKeyName();
                });
            }
            if ("sub2" == t.reactInstance.getKeyName()) {
                return null;
            }
        }
        return jQuery(e).hasClass("under-brace-symbol") && "value" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
            return "sub1" == e.reactInstance.getKeyName();
        }) : void 0;
    }
}
class ve extends le {
    constructor(e) {
        super();
        this.curPos = e;
        this.customVisitor = new Se;
        this.geoPos = DOMHelper.getMaxXAxisPos(e);
    }
    fillCurPosMeta(e) {
        return CursorHelper.copyMetadata(this.curPos, e);
    }
    visitEditAreaBlock(e) {
        var t = DOMHelper.closestSymbolContainerOrRoot(e);
        return this.visit(t, e);
    }
    visitEditAreaLine(e) {
        var t = DOMHelper.closestSymbolContainerOrRoot(e);
        return this.visit(t, e);
    }
    visitEditArea(e, t) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.visitEditAreaBlock(e);
        }
        if (DOMHelper.isEditAreaLine(e)) {
            return this.visitEditAreaLine(e);
        }
        var n = this.findFromNextLine(e, t, this.geoPos);
        if (null != n) {
            return this.fillCurPosMeta(n);
        }
        var r = DOMHelper.closestSymbolContainerOrRoot(e);
        return this.visit(r, e);
    }
    visitFromTextEditLine(e, t, n) {
        var r = Searching.getNextLineBlockRects(t, e, n, CursorPositionHelper.getMovingIntention(this.curPos));
        if (r.length > 0) {
            return this.fillCurPosMeta((new fe(this.geoPos)).visitBlocks(r, e));
        }
        var a = DOMHelper.closestEditor(e);
        return this.visitEditArea(a, e);
    }
    visitEditLine(e, t) {
        if (DOMHelper.isTextEditLine(e) && !DOMHelper.isEmptyLine(e)) {
            var n = Searching.getNextLineFromComposite(t, e);
            if (n.length > 0) {
                return this.fillCurPosMeta((new fe(this.geoPos)).visitBlocks(n, e));
            }
        }
        var r = DOMHelper.closestEditor(e);
        return this.visitEditArea(r, e);
    }
    visitComposite(e, t) {
        if (DOMHelper.shouldNotMoveOutsideEditor(e)) {
            return null;
        }
        var n = this.customVisitor.handle(e, t);
        if (null != n) {
            return this.fillCurPosMeta((new fe(this.geoPos)).visit(n));
        }
        if (null == n) {
            return this.visitEditLine(DOMHelper.closetEditLine(e), e);
        }
        var r = this.findNearestEditorBottom(e, t, this.geoPos);
        if (r) {
            var a = DOMHelper.getElementRect(r);
            if (_.inRange(this.geoPos.left, a.left - 2, a.right + 3)) {
                return this.fillCurPosMeta((new fe(this.geoPos)).visit(r));
            }
            var i = DOMHelper.getElementRect(t);
            if (NumberUtils.rangeOverlap(a.left - 2, a.right + 2, i.left - 2, i.right + 2)) {
                return this.fillCurPosMeta((new fe(this.geoPos)).visit(r));
            }
        }
        return this.visitEditLine(DOMHelper.closetEditLine(e), e);
    }
    visitRoot(e) {
        return null;
    }
    findNearestEditorBottom(e, t, n) {
        var r = DOMHelper.findEditors(e);
        r = ArrayHelper2.exclude(r, t);
        var a = DOMHelper.elementsToRectWrappers(r);
        var i = RectangleHelper.findNearestBottomRects(a, n);
        return null == i ? null : i.element;
    }
    findFromNextLine(e, t, n) {
        var r = this.getNextLine(e, t);
        return null == r ? null : (new fe(n)).visit(r);
    }
    getNextLine(e, t) {
        var n = DOMHelper.findEditLines(e);
        var r = n.indexOf(t);
        return r >= n.length - 1 ? null : n[r + 1];
    }
}
var xe = class extends ue {
    constructor(e) {
        super(e);
    }
    visitComposite(e) {
        var t = DOMHelper.elementsToRectWrappers(DOMHelper.findEditors(e));
        var n = RectangleHelper.findNearestTopRects(t, this.pos);
        return null == n ? null : this.visitEditArea(n.element);
    }
    visitBlock(e, t) {
        return e.data.isChar ? CursorPositionHelper.cursorFromTextBlock(e.data.element, t, DOMHelper.closestEditor(t), {
            left: this.pos.left,
            top: e.rect.bottom - 2
        }) : this.visitNonCharBlock(e, t);
    }
    visitBlocks(e, t) {
        if ((e = _.reverse(e)).length <= 0) {
            return CursorHelper.emptyLine(t);
        }
        var n = RectangleHelper.findNearestRectsInXAxis(e, this.pos);
        return this.visitBlock(n, t);
    }
    visitEditAreaBlock(e) {
        var t = DOMHelper.getElementRect(e);
        return CursorPositionHelper.buildCursorPositionForEditAreaBlock(e, {
            left: this.pos.left,
            top: t.bottom - 2
        });
    }
    visitEditAreaLine(e) {
        return this.visitEditLine(e);
    }
    visitEditArea(e) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.visitEditAreaBlock(e);
        }
        if (DOMHelper.isEditAreaLine(e)) {
            return this.visitEditAreaLine(e);
        }
        var t = _.last(DOMHelper.findEditLines(e));
        return this.visit(t);
    }
    visitEditLine(e) {
        if (DOMHelper.isTextEditLine(e)) {
            var t = Searching.getLastLineBlocks(e);
            return this.visitBlocks(t, e);
        }
        var n = BlockUtils.buildLineBlocks(e);
        var r = DOMHelper.lineBlocksToRectWrappers(n);
        return this.visitBlocks(r, e);
    }
};
class Te {
    handle(e, t) {
        if ("\\power-index" == DOMHelper.getCompositeLatexName(e)) {
            return "indexValue" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "powerValue" == e.reactInstance.getKeyName();
            }) : null;
        }
        if ("\\z-schema" == DOMHelper.getCompositeLatexName(e)) {
            return "symDec" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "name" == e.reactInstance.getKeyName();
            }) : "conPre" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "symDec" == e.reactInstance.getKeyName();
            }) : null;
        }
        if ("\\sqrt" == DOMHelper.getCompositeLatexName(e)) {
            return "value" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
                return "sub1" == e.reactInstance.getKeyName();
            }) : null;
        }
        if (jQuery(e).hasClass("limit-type")) {
            if ("to" == t.reactInstance.getKeyName()) {
                var n = DOMHelper.findEditors(e);
                return (n = ArrayHelper2.exclude(n, t))[0];
            }
            return null;
        }
        if (DOMHelper.isTabularComposite(e)) {
            var r = t.reactInstance.getKeyName();
            if (!TabularHelper.isKeyInTabularFormat(r)) {
                return;
            }
            var a = TabularUtils.getAboveAvailableCellKey(r, e.reactInstance.getModel());
            if (!a) {
                return null;
            }
            var i = DOMHelper.findEditors(e);
            return _.find(i, (e) => {
                return e.reactInstance.getKeyName() == a;
            });
        }
        if (jQuery(e).hasClass("stackrel-symbol")) {
            if (jQuery(t).hasClass("cur-value")) {
                var o = DOMHelper.findEditors(e);
                return (o = ArrayHelper2.exclude(o, t))[0];
            }
            return null;
        }
        if (jQuery(e).hasClass("over-under-set-symbol")) {
            if ("sub1" == t.reactInstance.getKeyName()) {
                return null;
            }
            if ("value" == t.reactInstance.getKeyName()) {
                return _.find(DOMHelper.findEditors(e), (e) => {
                    return "sub1" == e.reactInstance.getKeyName();
                });
            }
            if ("sub2" == t.reactInstance.getKeyName()) {
                return _.find(DOMHelper.findEditors(e), (e) => {
                    return "value" == e.reactInstance.getKeyName();
                });
            }
        }
        return jQuery(e).hasClass("under-brace-symbol") && "sub1" == t.reactInstance.getKeyName() ? _.find(DOMHelper.findEditors(e), (e) => {
            return "value" == e.reactInstance.getKeyName();
        }) : void 0;
    }
}
var Le = class extends le {
    constructor(e) {
        super();
        this.pos = e;
    }
    visitEditArea(e) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.visitEditAreaBlock(e);
        }
        if (DOMHelper.isEditAreaLine(e)) {
            return this.visitEditAreaLine(e);
        }
        var t = DOMHelper.findEditLines(e);
        var n = DOMHelper.elementsToRectWrappers(t);
        var r = RectangleHelper.findNearestVerticalStackOfRect(n, this.pos);
        return this.visit(r.element);
    }
    visitEditLine(e) {
        return CursorPositionHelper.getLastCursorPositionFromLine(e);
    }
    visitEditAreaBlock(e) {
        return CursorPositionHelper.getLastCursorPositionFormEditAreaBlock(e);
    }
    visitEditAreaLine(e) {
        var t = DOMHelper.elementsToRectWrappers([e]);
        var n = RectangleHelper.findNearestVerticalStackOfRect(t, this.pos);
        return this.visitEditLine(n.element);
    }
    visitComposite(e) {
        var t = _.map(e.reactInstance.getEditorDoms(), (e) => {
            return DOMHelper.elementToRectWrapper(e);
        });
        var n = RectangleHelper.findNearestLeftRects(t, this.pos);
        return null == n ? null : this.visit(n.element);
    }
};
class we {
    handle(e, t) {
        if (jQuery(e).hasClass("integral-like-symbol")) {
            return null;
        }
        if (DOMHelper.isTabularComposite(e)) {
            var n = t.reactInstance.getKeyName();
            if (!TabularHelper.isKeyInTabularFormat(n)) {
                return;
            }
            var r = TabularUtils.getLeftAvailableCellKey(n, e.reactInstance.getModel());
            if (!r) {
                return null;
            }
            var a = DOMHelper.findEditors(e);
            return _.find(a, (e) => {
                return e.reactInstance.getKeyName() == r;
            });
        }
    }
}
class Ie extends le {
    constructor(e) {
        super();
        this.curPos = e;
        this.customVisitor = new Te;
        this.geoPos = DOMHelper.getMaxXAxisPos(e);
    }
    fillCurPosMeta(e) {
        return CursorHelper.copyMetadata(this.curPos, e);
    }
    visitEditAreaBlock(e) {
        var t = DOMHelper.closestSymbolContainerOrRoot(e);
        return this.visit(t, e);
    }
    visitEditAreaLine(e) {
        var t = DOMHelper.closestSymbolContainerOrRoot(e);
        return this.visit(t, e);
    }
    visitEditArea(e, t) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.visitEditAreaBlock(e);
        }
        if (DOMHelper.isEditAreaLine(e)) {
            return this.visitEditAreaLine(e);
        }
        var n = this.findFromPreviousLine(e, t, this.geoPos);
        if (null != n) {
            return this.fillCurPosMeta(n);
        }
        var r = DOMHelper.closestSymbolContainerOrRoot(e);
        return this.visit(r, e);
    }
    visitFromTextEditLine(e, t, n) {
        var r = Searching.getPreviousLineBlockRects(t, e, n, CursorPositionHelper.getMovingIntention(this.curPos));
        if (r.length > 0) {
            return this.fillCurPosMeta((new xe(this.geoPos)).visitBlocks(r, e));
        }
        var a = DOMHelper.closestEditor(e);
        return this.visitEditArea(a, e);
    }
    visitEditLine(e, t) {
        if (DOMHelper.isTextEditLine(e) && !DOMHelper.isEmptyLine(e)) {
            var n = Searching.getPreviousLineFromComposite(t, e, CursorPositionHelper.getMovingIntention(this.curPos));
            if (n.length > 0) {
                return this.fillCurPosMeta((new xe(this.geoPos)).visitBlocks(n, e));
            }
        }
        var r = DOMHelper.closestEditor(e);
        return this.visitEditArea(r, e);
    }
    visitComposite(e, t) {
        if (DOMHelper.shouldNotMoveOutsideEditor(e)) {
            return null;
        }
        var n = this.customVisitor.handle(e, t);
        if (null != n) {
            return this.fillCurPosMeta((new xe(this.geoPos)).visit(n));
        }
        if (null == n) {
            return this.visitEditLine(DOMHelper.closetEditLine(e), e);
        }
        var r = this.findNearestEditorTop(e, t, this.geoPos);
        if (r) {
            var a = DOMHelper.getElementRect(r);
            if (_.inRange(this.geoPos.left, a.left - 2, a.right + 3)) {
                return this.fillCurPosMeta((new xe(this.geoPos)).visit(r));
            }
            var i = DOMHelper.getElementRect(t);
            if (NumberUtils.rangeOverlap(a.left - 2, a.right + 2, i.left - 2, i.right + 2)) {
                return this.fillCurPosMeta((new xe(this.geoPos)).visit(r));
            }
        }
        return this.visitEditLine(DOMHelper.closetEditLine(e), e);
    }
    visitRoot(e) {
        return null;
    }
    findNearestEditorTop(e, t, n) {
        var r = DOMHelper.findEditors(e);
        r = ArrayHelper2.exclude(r, t);
        var a = DOMHelper.elementsToRectWrappers(r);
        var i = RectangleHelper.findNearestTopRects(a, n);
        return null == i ? null : i.element;
    }
    findFromPreviousLine(e, t, n) {
        var r = this.getPreviousLine(e, t);
        return null == r ? null : (new xe(n)).visitEditLine(r);
    }
    getPreviousLine(e, t) {
        var n = DOMHelper.findEditLines(e);
        var r = n.indexOf(t);
        return r <= 0 ? null : n[r - 1];
    }
}
class Re extends le {
    constructor(e) {
        super();
        this.customVisitor = new we;
        this.pos = DOMHelper.geoPosFromCursor(e);
    }
    visitEditAreaBlock(e, t) {
        return this.visitEditArea(e, t);
    }
    visitEditAreaLine(e, t) {
        return this.visitEditArea(e, t);
    }
    visitEditArea(e, t) {
        var n = DOMHelper.closestSymbolContainerOrRoot(e);
        return DOMHelper.isRoot(n) ? this.visitLastBlockOfPreviousLineOrStop(e, t) : DOMHelper.shouldNotMoveOutsideEditor(n) ? null : this.visitComposite(n, e, t);
    }
    visitLastBlockOfPreviousLineOrStop(e, t) {
        var n = DOMHelper.findEditLines(e);
        var r = n.indexOf(t);
        if (r <= 0) {
            return null;
        }
        var a = n[r - 1];
        return CursorPositionHelper.getLastCursorPositionFromLine(a);
    }
    visitEditLine(e, t) {
        return CursorPositionHelper.getFirstCursorFromBlock(e, t);
    }
    visitComposite(e, t, n) {
        var r = this.customVisitor.handle(e, t);
        if (null != r) {
            return (new Le(this.pos)).visit(r);
        }
        if (null == r) {
            return this.visitEditLine(DOMHelper.closetEditLine(e), e);
        }
        var a = DOMHelper.findEditors(e);
        var i = DOMHelper.elementsToRectWrappers(ArrayHelper2.exclude(a, t));
        var o = RectangleHelper.findNearestLeftRects(i, this.pos);
        if (null != o) {
            return (new Le(this.pos)).visit(o.element);
        }
        var s = DOMHelper.closetEditLine(e);
        return this.visitEditLine(s, e);
    }
}
class Be {
    handle(e, t, n) {
        if (jQuery(e).hasClass("integral-like-symbol")) {
            return null;
        }
        if (DOMHelper.isTabularComposite(e)) {
            var r = t.reactInstance.getKeyName();
            if (!TabularHelper.isKeyInTabularFormat(r)) {
                return;
            }
            var a = TabularUtils.getRightAvailableCellKey(r, e.reactInstance.getModel());
            if (!a) {
                return null;
            }
            var i = DOMHelper.findEditors(e);
            return _.find(i, (e) => {
                return e.reactInstance.getKeyName() == a;
            });
        }
    }
}
var De = class extends le {
    constructor(e) {
        super();
        this.pos = e;
    }
    visitEditArea(e) {
        if (DOMHelper.isEditAreaBlock(e)) {
            return this.visitEditAreaBlock(e);
        }
        if (DOMHelper.isEditAreaLine(e)) {
            return this.visitEditAreaLine(e);
        }
        var t = DOMHelper.findEditLines(e);
        var n = DOMHelper.elementsToRectWrappers(t);
        var r = RectangleHelper.findNearestVerticalStackOfRect(n, this.pos);
        return this.visit(r.element);
    }
    visitEditLine(e) {
        return CursorHelper.emptyLine(e);
    }
    visitEditAreaLine(e) {
        var t = DOMHelper.elementsToRectWrappers([e]);
        var n = RectangleHelper.findNearestVerticalStackOfRect(t, this.pos);
        return this.visitEditLine(n.element);
    }
    visitEditAreaBlock(e) {
        return CursorPositionHelper.getFirstCursorPositionFormEditAreaBlock(e);
    }
    visitComposite(e) {
        var t = _.map(e.reactInstance.getEditorDoms(), (e) => {
            return DOMHelper.elementToRectWrapper(e);
        });
        if (1 === t.length) {
            return this.visitEditArea(t[0].element);
        }
        var n = RectangleHelper.findNearestRightRects(t, this.pos);
        return null == n ? null : this.visitEditArea(n.element);
    }
};
var Me = class {
    constructor(e, t) {
        this.currentLine = e;
        this.curPos = t;
    }
    visit() {
        var e = DOMHelper.closestEditor(this.currentLine);
        return (new Re(this.curPos)).visitEditArea(e, this.currentLine);
    }
};
class Ne extends le {
    constructor(e, t) {
        super();
        this.customVisitor = new Be;
        this.pos = DOMHelper.geoPosFromCursor(t);
    }
    visitEditAreaBlock(e, t) {
        return this.visitEditArea(e, t);
    }
    visitEditAreaLine(e, t) {
        return this.visitEditArea(e, t);
    }
    visitEditArea(e, t) {
        var n = DOMHelper.closestSymbolContainerOrRoot(e);
        return DOMHelper.isRoot(n) ? this.getFirstCharNextNextLineOrStop(e, t) : DOMHelper.shouldNotMoveOutsideEditor(n) ? null : this.visitComposite(n, e, t);
    }
    getFirstCharNextNextLineOrStop(e, t) {
        var n = DOMHelper.findEditLines(e);
        var r = n.indexOf(t);
        if (r >= n.length - 1) {
            return null;
        }
        var a = n[r + 1];
        return this.visitEditLine(a, null);
    }
    visitEditLine(e, t) {
        return CursorPositionHelper.getFirstCursorNextBlock(e, t);
    }
    visitComposite(e, t, n) {
        var r = this.customVisitor.handle(e, t, this.pos);
        if (null != r) {
            return (new De(this.pos)).visit(r);
        }
        if (null == r) {
            return this.visitEditLine(DOMHelper.closetEditLine(e), e);
        }
        var a = DOMHelper.findEditors(e);
        var i = DOMHelper.elementsToRectWrappers(ArrayHelper2.exclude(a, t));
        var o = RectangleHelper.findNearestRightRects(i, this.pos);
        if (null != o) {
            return (new De(this.pos)).visit(o.element);
        }
        var s = DOMHelper.closetEditLine(e);
        return this.visitEditLine(s, e);
    }
}
var ke = class {
    constructor(e, t) {
        this.currentLine = e;
        this.curPos = t;
    }
    visit() {
        var e = DOMHelper.closestEditor(this.currentLine);
        return (new Ne(this.currentLine, this.curPos)).visitEditArea(e, this.currentLine);
    }
};
var Left = new class {
    move(e) {
        if (0 === e.charIndex) {
            if (e.isEditAreaBlock) {
                return (new Me(e.line, e)).visit();
            }
            if (e.isEditAreaLine) {
                return (new Me(e.line, e)).visit();
            }
            if (e.lineIndex > 0) {
                var t = DOMHelper.getPreviousLine(e.line);
                return (new CursorHelper(e)).withCharIndex(BlockUtils.getNumberOfCharsFromLine(t)).withLineIndex(e.lineIndex - 1).withLine(t).build();
            }
            return (new Me(e.line, e)).visit();
        }
        if (e.block.isComposite && !DOMHelper.shouldNotMoveNestedEditor(e.block.element) && e.block.hasChildEditor) {
            var n = DOMHelper.geoPosFromCursor(e);
            n = PropUpdateHelper.update(n, {
                left: n.left + 5
            });
            return (new Le(n)).visit(e.block.element);
        }
        if (e.charIndex > 0) {
            return {
                charIndex: e.charIndex - 1,
                lineIndex: e.lineIndex,
                line: e.line,
                editor: e.editor
            };
        }
    }
};
var Right = new class {
    move(e) {
        if (e.charIndex === e.totalChar) {
            if (e.isEditAreaBlock) {
                return (new ke(e.line, e)).visit();
            } else {
                if (e.isEditAreaLine) {
                    return (new ke(e.line, e)).visit();
                } else {
                    if (DOMHelper.hasNextLine(e.line)) {
                        return (new CursorHelper(e)).withCharIndex(0).withLineIndex(e.lineIndex + 1).withLine(DOMHelper.getNextLine(e.line)).build();
                    } else {
                        return (new ke(e.line, e)).visit();
                    }
                }
            }
        }
        var t = CursorPositionHelper.getBlockFromCharIndex(e.lineBlocks, e.charIndex, false);
        t.subBlock && (t = t.subBlock);
        if (t.isComposite && !DOMHelper.shouldNotMoveNestedEditor(t.element) && t.hasChildEditor) {
            var n = DOMHelper.geoPosFromCursor(e);
            n = PropUpdateHelper.update(n, {
                left: DOMHelper.getElementRect(t.element).left - 2
            });
            return (new De(n)).visitComposite(t.element);
        }
        if (null != CursorPositionHelper.findNextCharIndex(e)) {
            return {
                charIndex: e.charIndex + 1,
                lineIndex: e.lineIndex,
                line: e.line,
                editor: e.editor
            };
        } else {
            return (new ke(e.line, e)).visit();
        }
    }
};
var Up = new class {
    move(e) {
        if ((e.isRootLine || e.isTextMode) && e.block) {
            return (new Ie(e)).visitFromTextEditLine(e.line, e.block, e.lineBlocks);
        } else {
            if (e.isEditAreaBlock) {
                return (new Ie(e)).visitEditAreaBlock(e.editor);
            } else {
                if (e.isEditAreaLine) {
                    return (new Ie(e)).visitEditLine(e.editor);
                } else {
                    return (new Ie(e)).visitEditLine(e.line);
                }
            }
        }
    }
};
var Down = new class {
    move(e) {
        if ((e.isRootLine || e.isTextMode) && e.block) {
            return (new ve(e)).visitFromTextEditLine(e.line, e.block, e.lineBlocks);
        } else {
            if (e.isEditAreaBlock) {
                return (new ve(e)).visitEditAreaBlock(e.editor);
            } else {
                if (e.isEditAreaLine) {
                    return (new ve(e)).visitEditLine(e.editor);
                } else {
                    return (new ve(e)).visitEditLine(e.line);
                }
            }
        }
    }
};
var CursorMovingController = {
    Down: Down,
    Up: Up,
    Left: Left,
    Right: Right
}
/*n.d(t, "a", function () {
    return CursorMovingController;
});*/
/*n.d(t, "Down", function () {
    return Down;
});*/
/*n.d(t, "Up", function () {
    return Up;
});*/
/*n.d(t, "Left", function () {
    return Left;
});*/
/*n.d(t, "Right", function () {
    return Right;
})*/

export { Down }

export { Up as CursorMovingControllerUP }

export { Left }

export { Right }

export default CursorMovingController