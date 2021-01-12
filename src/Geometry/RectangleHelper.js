import _ from 'lodash';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';

/// xxx(46) /*RectangleHelper*/

/// var r = n(2)/*lodash*/;  // 9 times
/// var a = n.n(r);
/// var i = n(7)/*PropUpdateHelper*/;  // 2 times
var RectangleHelper = new class {
    setLeftGeoPos(e, t) {
        return PropUpdateHelper.set(e, "left", t)
    }
    setTopGeoPos(e, t) {
        return PropUpdateHelper.set(e, "top", t)
    }
    findNearestVerticalStackOfRect(e, t) {
        for (var n = e[0], r = 999999, a = 0; a < e.length; a++) {
            var i = e[a].rect;
            if (t.top >= i.top && t.top <= i.bottom) return e[a];
            var o = t.top > i.bottom ? t.top - i.bottom : i.top - t.top;
            if (o < r) {
                n = e[a];
                r = o;
            }
        }
        return n
    }
    findNearestLeftRects(e, t) {
        var n = _.filter(e, e => this.isRectOnTheLeftOf(e, t));
        return n.length <= 0 ? null : _.minBy(n, e => this.minDistanceToEdges(e, t))
    }
    findNearestRightRects(e, t) {
        var n = _.filter(e, e => this.isRectOnTheRightOf(e, t));
        return n.length <= 0 ? null : _.minBy(n, e => this.minDistanceToEdges(e, t))
    }
    findNearestTopRects(e, t) {
        var n = _.filter(e, e => this.isRectPartiallyAboveOf(e, t));
        return n.length <= 0 ? null : _.minBy(n, e => this.minDistanceToEdges(e, t))
    }
    findNearestBottomRects(e, t) {
        var n = _.filter(e, e => this.isRectPartiallyBelowOf(e, t));
        return n.length <= 0 ? null : _.minBy(n, e => this.minDistanceToEdges(e, t))
    }
    findNearestRectsInXAxis(e, t) {
        return _.minBy(e, e => this.distanceInXAxisToEdges(e, t))
    }
    minDistanceToEdges(e, t) {
        var n = this.minCloseTo(t.left, e.rect.left, e.rect.right),
        r = this.minCloseTo(t.top, e.rect.top, e.rect.bottom);
        return this.isRectClampPosInYAxis(e, t) ? Math.abs(n - t.left) : this.isRectClampPosInXAxis(e, t) ? Math.abs(r - t.top) : this.distance2Pos({
            left: n,
            top: r
        },
        t)
    }
    distanceInXAxisToEdges(e, t) {
        if (this.isRectClampPosInXAxis(e, t)) return 0;
        var n = this.minCloseTo(t.left, e.rect.left, e.rect.right);
        return Math.abs(t.left - n)
    }
    distance2Pos(e, t) {
        return Math.sqrt((e.left - t.left) * (e.left - t.left) + (e.top - t.top) * (e.top - t.top))
    }
    minMargin(e, t, n) {
        var r = Math.abs(t - e),
        a = Math.abs(n - e);
        return Math.min(r, a)
    }
    minCloseTo(e, t, n) {
        return Math.abs(t - e) < Math.abs(n - e) ? t : n
    }
    isRectClampPosInYAxis(e, t) {
        return e.rect.bottom >= t.top && e.rect.top <= t.top
    }
    isClientRectClampPosInYAxis(e, t, n) {
        return n || (n = 0),
        e.bottom >= t.top - n && e.top <= t.top + n
    }
    isRectClampPosInXAxis(e, t, n) {
        return n || (n = 0),
        e.rect.right + n >= t.left && e.rect.left - n <= t.left
    }
    isRectPartiallyAboveOf(e, t) {
        return e.rect.bottom < t.top
    }
    isRectTopAboveOf(e, t) {
        return e.rect.top < t.top
    }
    isRectMiddleAboveOf(e, t) {
        return e.rect.top + e.rect.height / 2 < t.top
    }
    isRectPartiallyBelowOf(e, t) {
        return e.rect.top >= t.top
    }
    isRectBottomBelowOf(e, t) {
        return e.rect.bottom > t.top
    }
    isRectMiddleBelowOf(e, t) {
        return e.rect.bottom - e.rect.height / 2 > t.top
    }
    isRectOnTheLeftOf(e, t) {
        return e.rect.right < t.left
    }
    isRectOnTheLeftOfRect(e, t) {
        return e.rect.right < t.rect.left
    }
    isClientRectOnTheLeftOf(e, t) {
        return e.right < t.left
    }
    isRectOnTheRightOf(e, t) {
        return e.rect.left > t.left
    }
    isClientRectOnTheRightOf(e, t) {
        return e.left > t.left
    }
    isRectBelowOf(e, t) {
        return e.rect.top >= t.top
    }
    isRectAboveOf(e, t) {
        return e.rect.bottom <= t.top
    }
    isOnMidLeft(e, t) {
        var n = e.rect.left + (e.rect.right - e.rect.left) / 2;
        return t.left < n
    }
    toPosition(e, t) {
        return {
            left: e,
            top: t
        }
    }
    getRelativeRect(e, t, n) {
        return n = void 0 === n ? 0 : n,
        {
            left: e.left - t.left - n,
            top: e.top - t.top - n,
            width: e.width + 2 * n,
            height: e.height + 2 * n,
            right: e.left - t.left + e.width + n,
            bottom: e.top - t.top + e.height + n
        }
    }
    getIntersectRect(e, t) {
        var n = Math.max(e.left, t.left),
        r = Math.min(e.right, t.right),
        a = Math.max(e.top, t.top),
        i = Math.min(e.bottom, t.bottom);
        return {
            left: n,
            right: r,
            top: a,
            bottom: i,
            width: r - n,
            height: i - a
        }
    }
    makePositionWithinRect(e, t) {
        return {
            left: Math.max(Math.min(e.left, t.right), t.left),
            top: Math.max(Math.min(e.top, t.bottom), t.top)
        }
    }
    isIntersect(e, t) {
        return ! (t.left >= e.right || t.right <= e.left || Math.round(t.top) >= Math.round(e.bottom) - 1 || Math.round(t.bottom) <= Math.round(e.top) + 1)
    }
    emptyRect() {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0
        }
    }
    createClientRectWithDy(e, t) {
        return 0 === t ? e : {
            left: e.left,
            right: e.right,
            width: e.width,
            top: e.top - t,
            bottom: e.bottom + t,
            height: e.height + 2 * t
        }
    }
}

export default RectangleHelper