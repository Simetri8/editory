import _ from 'lodash';
import PointDetector from './PointDetector';

/// xxx(162) /*GuideDetector*/

/// var r = n(3)/*_.assignIn*/;  // 2 times
/// var a = n.n(r);
/// var i = n(153)/*PointDetector*/;  // 3 times
var GuideDetector = new class {
    detectVerticalGuides(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
        r = PointDetector.getSnapablePoints(t);
        return 0 === r.length ? null : this.detectVerticalWithPoints(e, r, n)
    }
    detectHorizontalGuides(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
        r = PointDetector.getSnapablePoints(t);
        return 0 === r.length ? null : this.detectHorizontalWithPoints(e, r, n)
    }
    detectGuides(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 5,
        a = PointDetector.getSnapablePoints(n);
        return 0 === a.length ? null : this.detectWithPoints(e, t, a, r)
    }
    detectWithPoints(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 5,
        i = this.detectVerticalWithPoints(e, n, r),
        o = this.detectHorizontalWithPoints(t, n, r);
        return i && o ? {
            type: "both",
            hGuide: o.guide,
            vGuide: i.guide,
            hInputPoint: o.inputPoint,
            vInputPoint: i.inputPoint,
            hSnapPoint: _.assignIn({},
            o.snapPoint, {
                x: o.snapPoint.x + i.xDelta
            }),
            vSnapPoint: _.assignIn({},
            i.snapPoint, {
                y: i.snapPoint.y + o.yDelta
            }),
            delta: {
                x: i.xDelta,
                y: o.yDelta
            }
        } : o || i
    }
    detectHorizontalWithPoints(e, t, n) {
        var r = null;
        return e.forEach(e => {
            t.forEach(t => {
                var a = Math.abs(t.y - e.y);
                a > n || (null == r || Math.abs(r.yDelta) > a) && (r = {
                    type: "horizontal",
                    guide: e,
                    inputPoint: t,
                    yDelta: e.y - t.y,
                    snapPoint: {
                        x: t.x,
                        y: e.y
                    }
                })
            })
        }),
        r
    }
    detectVerticalWithPoints(e, t, n) {
        var r = null;
        return e.forEach(e => {
            t.forEach(t => {
                var a = Math.abs(t.x - e.x);
                a > n || (null == r || Math.abs(r.xDelta) > a) && (r = {
                    type: "vertical",
                    guide: e,
                    inputPoint: t,
                    xDelta: e.x - t.x,
                    snapPoint: {
                        x: e.x,
                        y: t.y
                    }
                })
            })
        }),
        r
    }
}

export default GuideDetector