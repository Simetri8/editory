import ColorHelper from '../Mathcha/ColorHelper';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import DOMHelper from '../Elements/DOMHelper';
import Geometry from '../Geometry/Geometry';
import SkewHelper from '../Geometry/SkewHelper';

/// xxx(99) /*TemporaryShapeCreator*/

/// var r = n(4)/*DOMHelper*/;  // 1 times
/// var a = n(81)/*SkewHelper*/;  // 2 times
/// var i = n(1)/*Geometry*/;  // 9 times
/// var o = n(6)/*DiagramIdHelper*/;  // 3 times
/// var s = n(25)/*ColorHelper*/;  // 1 times
var TemporaryShapeCreator = new class {
    getTemporaryShapes(e, t) {
        return t.map(t => {
            var n = e.refMap[t.id],
            r = this.getTextRectInfo(n.editor.parentNode, t),
            a = this.getFrameShape(t, r);
            return this.frameToTemporaryShape(a)
        })
    }
    frameToTemporaryShape(e) {
        var t = e.outsideShape || e.shape;
        switch (e.type || "rectangle") {
        case "circle":
            var n = t.cp,
            r = t.r,
            a = [{
                x: n.x,
                y: n.y - r
            },
            {
                x: n.x + r,
                y: n.y
            },
            {
                x: n.x,
                y: n.y + r
            },
            {
                x: n.x - r,
                y: n.y
            },
            n];
            return {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: Geometry.ellipseToCubicBeziers({
                        x: n.x - r,
                        y: n.y - r
                    },
                    {
                        x: n.x + r,
                        y: n.y + r
                    })
                },
                snapPoints: a
            };
        case "rectangle":
            var s = t.rect,
            l = [{
                x: s.left,
                y: s.top
            },
            {
                x: s.left + s.width,
                y: s.top
            },
            {
                x: s.left + s.width,
                y: s.top + s.height
            },
            {
                x: s.left,
                y: s.top + s.height
            },
            {
                x: s.left + s.width / 2,
                y: s.top + s.height / 2
            }];
            return {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: [{
                        p1: l[0],
                        p2: l[1]
                    },
                    {
                        p1: l[1],
                        p2: l[2]
                    },
                    {
                        p1: l[2],
                        p2: l[3]
                    },
                    {
                        p1: l[3],
                        p2: l[0]
                    }]
                },
                snapPoints: l
            };
        case "ellipse":
            var c = t.cp,
            d = t.rx,
            h = t.ry,
            u = [{
                x: c.x,
                y: c.y - h
            },
            {
                x: c.x + d,
                y: c.y
            },
            {
                x: c.x,
                y: c.y + h
            },
            {
                x: c.x - d,
                y: c.y
            },
            c];
            return {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: Geometry.ellipseToCubicBeziers({
                        x: c.x - d,
                        y: c.y - h
                    },
                    {
                        x: c.x + d,
                        y: c.y + h
                    })
                },
                snapPoints: u
            }
        }
    }
    getFrameShape(e, t) {
        var n = ColorHelper.getEditorStyle(e, "strokeType"),
        r = "2-" == n || "2." == n || "2--" == n;
        switch (e.shape.frameType || "rectangle") {
        case "ellipse":
            var o = this.findBoundingRect(t),
            l = Geometry.getCenterPoint(o),
            c = Geometry.rectWidthHeight(o),
            d = c.width,
            h = c.height,
            u = Math.max(d / Math.sqrt(2), 6),
            p = Math.max(h / Math.sqrt(2), 6);
            return {
                shape: {
                    cp: l,
                    rx: u,
                    ry: p
                },
                outsideShape: r ? {
                    cp: l,
                    rx: u + 3,
                    ry: p + 3
                } : null,
                type: e.shape.frameType
            };
        case "rectangle":
            var m = this.findBoundingRect(t),
            f = Geometry.rectWidthHeight(m),
            g = f.width,
            y = f.height,
            A = m.p1.x,
            E = m.p1.y;
            return {
                shape: {
                    rect: {
                        left: A - 2,
                        top: E - 2,
                        width: g + 4,
                        height: y + 4
                    }
                },
                outsideShape: r ? {
                    rect: {
                        left: A - 2 - 3,
                        top: E - 2 - 3,
                        width: g + 4 + 6,
                        height: y + 4 + 6
                    }
                } : null,
                type: e.shape.frameType
            };
        case "circle":
            var v = t.p,
            S = t.width,
            C = t.height,
            x = t.skewX,
            I = {
                p1: {
                    x: v.x - S / 2,
                    y: v.y - C / 2
                },
                p2: {
                    x: v.x + S / 2,
                    y: v.y + C / 2
                }
            },
            T = SkewHelper.rectTo4PointsSkewed(I, x, 0),
            b = Geometry.getBoundingRectFromPoints(T),
            L = Geometry.getCenterPoint(b),
            R = Geometry.rectWidthHeight(b),
            M = R.width,
            w = R.height,
            O = Math.sqrt(Math.pow((M + 2) / 2, 2) + Math.pow((w + 2) / 2, 2));
            return {
                shape: {
                    cp: L,
                    r: O = Math.max(O, 6),
                    doubleLineDistance: 3
                },
                outsideShape: r ? {
                    cp: L,
                    r: O + 3
                } : null,
                type: e.shape.frameType
            }
        }
    }
    getFrameRectInfo(e) {
        return {
            rect: {
                left: e.left,
                top: e.top,
                width: e.width,
                height: e.height
            },
            cp: {
                x: e.left + e.width / 2,
                y: e.top + e.height / 2
            }
        }
    }
    getTextRectInfo(e, t) {
        var n = t.shape.data,
        a = n.p,
        i = n.rotation,
        o = void 0 === i ? 0 : i,
        s = n.skewX,
        l = void 0 === s ? 0 : s,
        c = DOMHelper.getElementClientSize(e);
        return {
            id: t.id,
            p: a,
            rotation: o,
            skewX: l,
            width: c.width,
            height: c.height
        }
    }
    findBoundingRect(e) {
        var t = e.p,
        n = e.width,
        r = e.height,
        o = e.skewX,
        s = e.rotation,
        l = {
            p1: {
                x: t.x - n / 2,
                y: t.y - r / 2
            },
            p2: {
                x: t.x + n / 2,
                y: t.y + r / 2
            }
        },
        c = SkewHelper.rectTo4PointsSkewed(l, o, s);
        return Geometry.getBoundingRectFromPoints(c)
    }
}

export default TemporaryShapeCreator