import _ from 'lodash';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Geometry from '../Geometry/Geometry';
import ItemDefaultSettings from '../Editor/Toolbar/ItemDefaultSettings';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeIntersectHelper from './ShapeIntersectHelper';
import TemporaryShapeCreator from './TemporaryShapeCreator';

/// xxx(130) /*ShapeConnectionHelper*/

/// var r = n(3);  // 2 times
/// var a = n.n(r);
/// var i = n(6)/*DiagramIdHelper*/;  // 6 times
/// var o = n(1)/*Geometry*/;  // 14 times
/// var l = n(189)/*ShapeIntersectHelper*/;  // 2 times
/// var c = n(99)/*TemporaryShapeCreator*/;  // 4 times
/// var d = n(2)/*lodash*/;  // 2 times
/// var h = n.n(d);
/// var u = n(17)/*ItemDefaultSettings*/;  // 3 times
/// var p = n(7)/*PropUpdateHelper*/;  // 2 times
var ShapeConnectionHelper = new class {
    isConnectTheSame2Editor(e, t) {
        if (! (e.fromEditorId === t.fromEditorId && e.toEditorId === t.toEditorId)) if (e.fromEditorId === t.toEditorId) return e.toEditorId === t.fromEditorId;
        return false
    }
    addNewConnection(e, t) {
        var n = [];
        if (t.connections.forEach((t, r) => {
            if (this.isConnectTheSame2Editor(t, e)) n.push({
                c: t,
                index: r
            })
        }), n.length >= 2) return t;
        var r = t.connections;
        if (1 === n.length) {
            r = _.clone(r);
            var a = n[0];
            r[a.index] = ItemDefaultSettings.setSetting(a.c, "perpendicularDistance", 5);
            var i = a.c.fromEditorId === e.fromEditorId ? -5 : 5;
            var o = ItemDefaultSettings.setSetting(e, "perpendicularDistance", i);
            return r = r.concat(o),
            PropUpdateHelper.setProp(t, "connections", r)
        }
        return r = r.concat(e),
        PropUpdateHelper.setProp(t, "connections", r)
    }
    setConnectionsInGroup(e, t, n) {
        return e && 0 != e.length ? t.map((t) => {
            return e.indexOf(t.id) >= 0 ? _.assignIn({},
            t, {
                isInGroup: n
            }) : t
        }) : t
    }
    getIdRectMap(e, t) {
        var n = {};
        return e.forEach((e) => {
            var r = t.editors[e.fromEditorId];
            var a = t.editorRef[e.fromEditorId].editor.parentElement;
            var i = t.editors[e.toEditorId];
            var o = t.editorRef[e.toEditorId].editor.parentElement;
            if (!n[e.fromEditorId]) n[e.fromEditorId] = TemporaryShapeCreator.getTextRectInfo(a, r);
            if (!n[e.toEditorId]) n[e.toEditorId] = TemporaryShapeCreator.getTextRectInfo(o, i)
        }),
        n
    }
    createConnectionShapesTemporary(e, t, n) {
        return _.map(e, (e) => {
            var r = this.getCalculatedPosition(e, t, n);
            return r ? (Geometry.isQuadraticBezierPath(r) && (r = Geometry.quadraticToCubic(r)), {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: [r]
                },
                realId: e.id
            }) : {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: []
                },
                realId: e.id
            }
        })
    }
    getTempShape(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        var r = {
            id: DiagramIdHelper.nextTemporaryEntity(),
            breakDownInfo: {
                data: null
            }
        };
        switch (e || "rectangle") {
        case "circle":
            var s = t.outsideShape || t.shape;
            var l = s.cp;
            var c = s.r;
            c = c + n;
            r.breakDownInfo.data = Geometry.ellipseToCubicBeziers({
                x: l.x - c,
                y: l.y - c
            },
            {
                x: l.x + c,
                y: l.y + c
            });
            break;
        case "ellipse":
            var d = t.outsideShape || t.shape;
            var h = d.cp;
            var u = d.rx;
            var p = d.ry;
            u = u + n;
            p = p + n;
            r.breakDownInfo.data = Geometry.ellipseToCubicBeziers({
                x: h.x - u,
                y: h.y - p
            },
            {
                x: h.x + u,
                y: h.y + p
            });
            break;
        default:
            var m = (t.outsideShape || t.shape).rect;
            if (n) m = _.assignIn({},
            m, {
                left: m.left - n,
                top: m.top - n,
                width: m.width + 2 * n,
                height: m.height + 2 * n
            });
            var f = {
                p1: {
                    x: m.left,
                    y: m.top
                },
                p2: {
                    x: m.left + m.width,
                    y: m.top + m.height
                }
            };
            r.breakDownInfo.data = Geometry.pointsToLines(Geometry.getPointsRect(f))
        }
        return r
    }
    getConnectionPointsInConnection(e, t) {
        return {
            from: e[t.fromEditorId].shape.data.p,
            to: e[t.toEditorId].shape.data.p
        }
    }
    getCalculatedPosition(e, t, n) {
        var r = this.getConnectionPointsInConnection(n, e);
        var a = r.from;
        var s = r.to;
        var d = ItemDefaultSettings.getSettings(e, "perpendicularDistance");
        if (d) {
            var h = Geometry.parallelLine(a, s, d);
            a = h.p1;
            s = h.p2
        }
        var p = n[e.fromEditorId];
        var m = n[e.toEditorId];
        var f = t[e.fromEditorId];
        var g = t[e.toEditorId];
        var y = TemporaryShapeCreator.getFrameShape(p, f);
        var A = TemporaryShapeCreator.getFrameShape(m, g);
        var E = null;
        if (e.type) if ("quadratic" == e.type) {
            var v = Geometry.toAbsoluteConnectionControlPoint(e.data.cp, a, s);
            var S = Geometry.quadraticToCubic({
                p1: a,
                cp: v,
                p2: s
            });
            E = {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: [S]
                }
            }
        } else {
            var C = Geometry.toAbsoluteConnectionControlPoint(e.data.cp, a, s);
            var x = Geometry.toAbsoluteConnectionControlPoint(e.data.cp2, a, s);
            E = {
                id: DiagramIdHelper.nextTemporaryEntity(),
                breakDownInfo: {
                    data: [{
                        p1: a,
                        cp: C,
                        cp2: x,
                        p2: s
                    }]
                }
            }
        } else E = {
            id: DiagramIdHelper.nextTemporaryEntity(),
            breakDownInfo: {
                data: [{
                    p1: a,
                    p2: s
                }]
            }
        };
        var I = this.getHeadTailRedundantSize("tail", e.tail);
        var T = this.getHeadTailRedundantSize("head", e.head);
        var b = this.getTempShape(p.shape.frameType, y, I);
        var L = this.getTempShape(m.shape.frameType, A, T);
        var R = ShapeIntersectHelper.getIntersects(E, b);
        var M = ShapeIntersectHelper.getIntersects(E, L);
        return !R || R.length <= 0 || !M || M.length <= 0 ? null : "quadratic" == e.type ? {
            p1: R[0],
            p2: M[0],
            cp: Geometry.toAbsoluteConnectionControlPoint(e.data.cp, a, s)
        } : "cubic" == e.type ? {
            p1: R[0],
            p2: M[0],
            cp: Geometry.toAbsoluteConnectionControlPoint(e.data.cp, a, s),
            cp2: Geometry.toAbsoluteConnectionControlPoint(e.data.cp2, a, s)
        } : {
            p1: R[0],
            p2: M[0]
        }
    }
    getHeadTailRedundantSize(e, t) {
        switch (e) {
        case "head":
            switch (t) {
            case "o":
                case "*":
                return 5;
            case "2|<<":
                case "|<<":
                return 20;
            case "2>>|":
                case ">>|":
                return 2;
            case "x":
                return 6;
            case "+":
                return 8;
            case "2|<":
                case "|<":
                return 13;
            case "2>|":
                case ">|":
                return 2;
            case "2<<":
                case "<<":
                return 20;
            case "2>>":
                case ">>":
                return 0;
            case "||":
                case "|":
                return 3;
            case "(":
                return 7;
            case ")":
                return 0;
            case "2<":
                return 13;
            case "fh<":
                return 10;
            case "f<":
                return 9;
            case "<":
                return 11;
            case "2>":
                case "fh>":
                case "f>":
                case ">":
                case "no":
                case "hook-up-(":
                return 0;
            case "hook-up-)":
                return 8;
            case "hook-down-(":
                return 0;
            case "hook-down-)":
                return 8
            }
        case "tail":
            switch (t) {
            case "o":
                case "*":
                return 5;
            case "2|<<":
                case "|<<":
                return 2;
            case "2>>|":
                case ">>|":
                return 20;
            case "x":
                return 6;
            case "+":
                return 8;
            case "2|<":
                case "|<":
                return 2;
            case "2>|":
                case ">|":
                return 13;
            case "2<<":
                case "<<":
                return 0;
            case "2>>":
                case ">>":
                return 20;
            case "||":
                case "|":
                return 2;
            case "(":
                return 0;
            case ")":
                return 7;
            case "2<":
                case "fh<":
                case "f<":
                case "<":
                return 0;
            case "2>":
                return 13;
            case "fh>":
                return 10;
            case "f>":
                return 9;
            case ">":
                return 11;
            case "no":
                return 0;
            case "hook-up-(":
                return 8;
            case "hook-up-)":
                return 0;
            case "hook-down-(":
                return 8;
            case "hook-down-)":
                return 0
            }
        }
        return 0
    }
}

export default ShapeConnectionHelper