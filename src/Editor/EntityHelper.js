import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import ArrayHelper from '../Mathcha/ArrayHelper';
import CheckObject from './CheckObject';
import DeltaCalculator from './DeltaCalculator';
import DiagramEntityHelper from './DiagramEntityHelper';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditorAction from './EditorAction';
import EntityFinder from './EntityFinder';
import EntityUtils from './EntityUtils';
import FindEntityHelper from './FindEntityHelper';
import Geometry from '../Geometry/Geometry';
import GuideDetector from '../Shapes/GuideDetector';
import IntersectionEntityHelper from './IntersectionEntityHelper';
import ItemDefaultSettings from './Toolbar/ItemDefaultSettings';
import PointDetector from '../Shapes/PointDetector';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeLoader from '../Shapes/ShapeLoader';
import ShapesDestructer from '../Shapes/ShapesDestructer';
import ShapeSnapper from '../Shapes/ShapeSnapper';
import TemporaryShapeCreator from '../Shapes/TemporaryShapeCreator';

/// xxx(63) /*EntityHelper*/

/// var r = n(3);  // 5 times
/// var a = n.n(r);
/// var i = n(1532)/*ShapeLoader*/;  // 2 times
/// var o = n(6)/*DiagramIdHelper*/;  // 22 times
/// var s = n(7)/*PropUpdateHelper*/;  // 23 times
/// var l = n(226)/*IntersectionEntityHelper*/;  // 1 times
/// var c = n(2)/*lodash*/;  // 36 times
/// var d = n.n(c);
/// var h = n(20)/*EntityUtils*/;  // 29 times
/// var u = n(17)/*ItemDefaultSettings*/;  // 4 times
/// var D = n(31)/*CheckObject*/;  // 1 times
/// var f = n(1)/*Geometry*/;  // 22 times
/// var g = n(43)/*ArrayHelper*/;  // 4 times
/// var y = n(119)/*EntityFinder*/;  // 4 times
/// var A = n(354)/*DeltaCalculator*/;  // 1 times
/// var v = n(98)/*EditorAction*/;  // 10 times
/// var S = n(86)/*FindEntityHelper*/;  // 5 times
/// var C = n(151)/*ShapesDestructer*/;  // 3 times
/// var x = n(190)/*DiagramEntityHelper*/;  // 1 times
/// var I = n(35)/*slicedToArray*/;  // 3 times
/// var T = n.n(I);
/// var b = n(99)/*TemporaryShapeCreator*/;  // 1 times
/// var L = n(162)/*GuideDetector*/;  // 2 times
/// var R = n(153)/*PointDetector*/;  // 2 times
/// var M = n(287)/*ShapeSnapper*/;  // 2 times
var m = new class {
    deleteEntity(e, t) {
        if (DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(t.id) || DiagramIdHelper.isDiagramGroupId(t.id)) {
            var n = _.findIndex(e.shapes, (e) => {
                return e.id === t.id
            });
            var r = PropUpdateHelper.remove(e.shapes, n);
            var a = PropUpdateHelper.setProp(e, "shapes", r);
            var i = IntersectionEntityHelper.removeEntity(e.intersections, t);
            return a = PropUpdateHelper.setProp(a, "intersections", i)
        }
        if (DiagramIdHelper.isDiagramConnectionId(t.id)) return this.deleteConnection(e, t);
        if (DiagramIdHelper.isDiagramEditorId(t.id)) {
            var c = _.clone(e.elements);
            delete c[t.id];
            var h = this.findDAllConnectionsLinkToEditor(e.connections, t.id);
            return PropUpdateHelper.update(e, {
                connections: h.connections,
                elements: c
            })
        }
        return e
    }
    deleteEntities(e, t) {
        return (t = _.sortBy(t, (e) => {
            switch (EntityUtils.getEntityType(e)) {
            case "connection":
                return 2;
            case "text":
                return 10
            }
        })).forEach((t) => {
            return e = this.deleteEntity(e, t)
        }),
        e
    }
    isConnectTheSame2Editor(e, t) {
        if (! (e.fromEditorId === t.fromEditorId && e.toEditorId === t.toEditorId)) if (e.fromEditorId === t.toEditorId) return e.toEditorId === t.fromEditorId;
        return false
    }
    deleteConnection(e, t) {
        var n = _.findIndex(e.connections, (e) => {
            return e.id === t.id
        });
        var r = PropUpdateHelper.remove(e.connections, n);
        var a = _.findIndex(r, (e) => {
            return this.isConnectTheSame2Editor(e, t)
        });
        return a >= 0 && (r = PropUpdateHelper.setIndex(r, a, ItemDefaultSettings.setSetting(r[a], "perpendicularDistance", 0))),
        PropUpdateHelper.setProp(e, "connections", r)
    }
    findDAllConnectionsLinkToEditor(e, t) {
        var n = {
            deletedConnections: [],
            connections: []
        };
        return e.forEach((e) => {
            if (e.fromEditorId != t && e.toEditorId != t) n.connections.push(e);
            else n.deletedConnections.push(e)
        }),
        n
    }
};
var E = new class {
    getVerticalMinMaxEntities(e) {
        var t = {
            min: Number.MAX_SAFE_INTEGER,
            max: Number.MIN_SAFE_INTEGER
        };
        return _.forEach(e, (e) => {
            if (DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(e.id)) {
                var n = this.getVerticalMinMax(e);
                t = {
                    min: Math.min(t.min, n.min),
                    max: Math.max(t.max, n.max)
                }
            }
        }),
        t
    }
    alignShapes(e, t, n, r, a) {
        var i = [];
        var s = [];
        var l = 0;
        for (; l < e.length; l++) {
            var c = e[l];
            if (DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(c.id) || DiagramIdHelper.isDiagramGroupId(c.id)) {
                var d = EntityFinder.get(c, t, a);
                var h = DeltaCalculator.calculateDeltaFromAlignment(r, d, n);
                i.push(this.moveEntity(c, h, {
                    movedLinkedItems: s
                }))
            }
            if (DiagramIdHelper.isDiagramLinkedId(c.id)) i.push(c)
        }
        return {
            newShapes: i,
            movedLinkedItems: s
        }
    }
    moveShapes(e, t, n) {
        return this.internalMoveShapes(e, t, {
            snapGridOptions: n
        })
    }
    internalMoveShapes(e, t, n) {
        var r = [];
        var a = 0;
        for (; a < e.length; a++) {
            var i = this.moveEntity(e[a], t, n);
            if (i) r.push(i)
        }
        return r
    }
    moveGroup(e, t, n) {
        var r = this.internalMoveShapes(e.entities, t, n);
        return _.assignIn({},
        e, {
            entities: r
        })
    }
    moveEntity(e, t, n) {
        return DiagramIdHelper.isDiagramShapeOrArrowOrCompositeId(e.id) ? this.moveShape(e, t, n) : DiagramIdHelper.isDiagramGroupId(e.id) ? this.moveGroup(e, t, n) : DiagramIdHelper.isDiagramLinkedId(e.id) ? (n.movedLinkedItems && n.movedLinkedItems.push({
            linkedEntity: e,
            delta: t
        }), e) : void 0
    }
    moveShape(e, t, n) {
        if (EntityUtils.isShapeArrow(e)) {
            if (EntityUtils.isStraightLineArrow(e)) {
                var r = _.map(e.data, (e) => {
                    return Geometry.addPoint(e, t)
                });
                return PropUpdateHelper.setProp(e, "data", r)
            }
            if (EntityUtils.isCubicLineArrow(e)) {
                var a = _.map(e.data, (e) => {
                    return {
                        p1: Geometry.addPoint(e.p1, t),
                        p2: Geometry.addPoint(e.p2, t),
                        cp: e.cp,
                        cp2: e.cp2
                    }
                });
                return PropUpdateHelper.setProp(e, "data", a)
            }
        }
        if (EntityUtils.isShapeComposite(e)) return ShapeLoader.getShapeManagement(e).move(e, t, {
            snapGridOptions: n && n.snapGridOptions
        });
        if (EntityUtils.isPrimitiveShape(e)) {
            if (EntityUtils.isPolygon(e)) return r = _.map(e.data, (e) => {
                return Geometry.addPoint(e, t)
            }),
            PropUpdateHelper.setProp(e, "data", r);
            if (EntityUtils.isPolygonCurve(e)) {
                var o = _.map(e.data, (e) => {
                    return PropUpdateHelper.update(e, {
                        p1: Geometry.addPoint(e.p1, t),
                        p2: Geometry.addPoint(e.p2, t)
                    })
                });
                return PropUpdateHelper.setProp(e, "data", o)
            }
        }
    }
    getVerticalMinMax(e) {
        if (EntityUtils.isShapeArrow(e)) {
            if (EntityUtils.isStraightLineArrow(e)) return ArrayHelper.minMax(e.data, (e) => {
                return e.y
            });
            if (EntityUtils.isCubicLineArrow(e)) return ArrayHelper.minMax(e.data, (e) => {
                return Math.min(e.p1.y, e.p2.y)
            },
            (e) => {
                return Math.max(e.p1.y, e.p2.y)
            })
        }
        if (EntityUtils.isShapeComposite(e)) return ShapeLoader.getShapeManagement(e).minMaxVertical(e);
        if (EntityUtils.isPrimitiveShape(e)) {
            if (EntityUtils.isPolygon(e)) return ArrayHelper.minMax(e.data, (e) => {
                return e.y
            });
            if (EntityUtils.isPolygonCurve(e)) return ArrayHelper.minMax(e.data, (e) => {
                return Math.min(e.p1.y, e.p2.y)
            },
            (e) => {
                return Math.max(e.p1.y, e.p2.y)
            })
        }
    }
    setShapesInData(e, t) {
        if (!t || !t.length) return e;
        var n = this.replaceShapes(e.shapes, t);
        return PropUpdateHelper.set(e, "shapes", n)
    }
    replaceShapes(e, t) {
        var n = _.clone(e);
        var r = 0;
        for (; r < e.length; r++) {
            var a = e[r];
            var i = _.find(t, (e) => {
                return e.id === a.id
            });
            if (i) n[r] = i
        }
        return n
    }
};
var w = new class {
    constructor() {
        this.emptyMovingInfo = {
            snapToGridSize: 0,
            shapesToSnap: [],
            groupBox: {
                p1: {
                    x: 0,
                    y: 0
                },
                p2: {
                    x: 0,
                    y: 0
                }
            },
            vGuidesToSnap: [],
            hGuidesToSnap: [],
            scale: 1
        }
    }
    moveEntities(e, t, n, r) {
        if (!r) return {
            diagram: e
        };
        if (!t || 0 === t.length) return {
            diagram: e
        };
        var i = 1 === t.length;
        var s = i && !DiagramIdHelper.isDiagramEditorId(t[0].id);
        var l = i && !s;
        var c = t[0];
        var d = r.vGuidesToSnap || [];
        var h = r.hGuidesToSnap || [];
        if (s) {
            var u = E.moveShapes([c], n);
            var p = slicedToArray(u, 1)[0];
            if (null == p) return {
                diagram: e
            };
            var m;
            var f = r.shapesToSnap.length > 0 ? PointDetector.detect(p, r.shapesToSnap, [], 5 / r.scale) : null;
            if (d.length > 0 || h.length > 0) m = GuideDetector.detectGuides(d, h, [p]);
            var g = this.handleGuidesDetectResult(m, f, n, e, t);
            if (g) return g
        }
        if (l && r.editorGuideSnapInfo) {
            var y;
            var A;
            var S = EditorAction.moveEditors(t, n);
            var C = slicedToArray(S, 1)[0];
            if (r.shapesToSnap.length > 0 && (y = PointDetector.detectPoint(C.shape.data.p, r.shapesToSnap, [], 5 / r.scale)), d.length > 0 || h.length > 0) {
                var x = TemporaryShapeCreator.getTemporaryShapes(r.editorGuideSnapInfo, [C]);
                var I = slicedToArray(x, 1)[0];
                A = GuideDetector.detectGuides(d, h, [I])
            }
            var w = this.handleGuidesDetectResult(A, y, n, e, t);
            if (w) return w
        }
        if (r.snapToGridSize < 2) return {
            diagram: this.internalMoveEntities(e, t, n)
        };
        var O = {
            gridSize: r.snapToGridSize,
            delta: n,
            diagram: e,
            groupBox: r.groupBox
        };
        if (s) {
            var D = ShapeSnapper.snapSingle(c, O);
            var N = D.delta;
            return D.handled ? {
                diagram: this.internalMoveEntities(e, t, N, _.assignIn({},
                O, {
                    gridSize: 0
                }))
            } : {
                diagram: this.internalMoveEntities(e, t, N, O)
            }
        }
        var k = ShapeSnapper.snapEntities(t, O);
        return {
            diagram: this.internalMoveEntities(e, t, k.delta, _.assignIn({},
            O, {
                gridSize: 0
            }))
        }
    }
    moveEntitiesIgnoreSnap(e, t, n) {
        return this.internalMoveEntities(e, t, n)
    }
    internalMoveEntities(e, t, n, r) {
        var a = E.moveShapes(t, n, r);
        var i = E.setShapesInData(e, a);
        var o = EditorAction.moveEditors(t, n);
        i = EditorAction.setEditorsInData(i, o);
        var s = FindEntityHelper.findAllOriginalEditors(t, e.elements);
        if (s && s.length > 0) {
            var l = EditorAction.moveEditors(s, n);
            i = EditorAction.setEditorsInData(i, l)
        }
        return i
    }
    handleGuidesDetectResult(e, t, n, r, a) {
        if (e) switch (e.type) {
        case "both":
            var i = Geometry.distanceFromVector(e.delta);
            if (null == t || i < t.distance) {
                var o = Geometry.addPoint(n, e.delta);
                return {
                    diagram: this.internalMoveEntities(r, a, o),
                    snapPoints: [e.hSnapPoint, e.vSnapPoint]
                }
            }
            break;
        case "horizontal":
            var s = e.yDelta;
            if (null == t || s < t.distance) {
                var l = Geometry.addPoint(n, {
                    x: 0,
                    y: e.yDelta
                });
                var c = [e.snapPoint];
                return {
                    diagram: this.internalMoveEntities(r, a, l),
                    snapPoints: c
                }
            }
            break;
        case "vertical":
            var d = e.xDelta;
            if (null == t || d < t.distance) {
                var h = Geometry.addPoint(n, {
                    x: e.xDelta,
                    y: 0
                });
                var u = [e.snapPoint];
                return {
                    diagram: this.internalMoveEntities(r, a, h),
                    snapPoints: u
                }
            }
        }
        if (t) {
            var p = Geometry.addPoint(n, t.delta);
            return {
                diagram: this.internalMoveEntities(r, a, p),
                snapPoints: [t.snapPoint]
            }
        }
    }
};
var O = new class {
    getSize(e, t) {
        return "distribute-horizontally" == t ? Geometry.rectWidth(e) : Geometry.rectHeight(e)
    }
    buildDeltaFirstMinusSecond(e, t, n) {
        return "distribute-horizontally" == n ? {
            x: e.x - t.x,
            y: 0
        } : {
            x: 0,
            y: e.y - t.y
        }
    }
    buildDeltaFirstNumberMinusSecond(e, t, n) {
        return "distribute-horizontally" == n ? {
            x: e - t.x,
            y: 0
        } : {
            x: 0,
            y: e - t.y
        }
    }
    getXOrY(e, t) {
        return "distribute-horizontally" == t ? e.x : e.y
    }
    getLeftSize(e, t, n, r) {
        return "distribute-horizontally" == r ? Math.min(t.rect.p2.x - e.p1.x, n.rect.p1.x - e.p1.x) : Math.min(t.rect.p2.y - e.p1.y, n.rect.p1.y - e.p1.y)
    }
    getRightSize(e, t, n, r) {
        return "distribute-horizontally" == r ? Math.min(e.p2.x - n.rect.p1.x, e.p2.x - t.rect.p2.x) : Math.min(e.p2.y - n.rect.p1.y, e.p2.y - t.rect.p2.y)
    }
    deltaWithinBox(e, t, n) {
        var r = {
            x: n.p1.x - t.p1.x,
            y: n.p1.y - t.p1.y
        };
        var a = {
            x: n.p2.x - t.p2.x,
            y: n.p2.y - t.p2.y
        };
        return {
            x: _.clamp(e.x, r.x, a.x),
            y: _.clamp(e.y, r.y, a.y)
        }
    }
    distributeEntities(e, t, n, r, a) {
        var i = EntityFinder.getFromEntities(t, n, r);
        var s = t.map((e) => {
            if (DiagramIdHelper.isDiagramConnectionId(e.id)) return null;
            var t = EntityFinder.get(e, n, r);
            return t ? {
                entity: e,
                rect: t,
                center: Geometry.getCenterPoint(t)
            } : null
        }).filter((e) => {
            return e
        });
        if ("distribute-horizontally" == a) s = _.sortBy(s, (e) => {
            return e.rect.p2.x
        });
        if ("distribute-vertically" == a) s = _.sortBy(s, (e) => {
            return e.rect.p2.y
        });
        var l = _.first(s);
        var c = _.last(s);
        var h = this.getSize(i, a);
        var u = this.getLeftSize(i, l, c, a);
        var p = this.getRightSize(i, l, c, a);
        var m = Math.max(0, h - u - p);
        var g = s.slice(1, s.length - 1);
        var A = _.sumBy(g, (e) => {
            return this.getSize(e.rect, a)
        });
        var E = m - A;
        var v = Geometry.round2(E / g.length);
        var S = this.buildDeltaFirstMinusSecond(i.p1, l.rect.p1, a);
        var C = this.buildDeltaFirstMinusSecond(i.p2, c.rect.p2, a);
        var x = e;
        x = w.moveEntitiesIgnoreSnap(x, [l.entity], S);
        x = w.moveEntitiesIgnoreSnap(x, [c.entity], C);
        var I = this.getXOrY(i.p1, a) + u;
        var T = 1;
        for (; T < s.length - 1; T++) {
            var b = s[T];
            var L = this.getSize(b.rect, a);
            var R = E > 0 ? L + v : L / A * m;
            var M = I + R / 2;
            var O = this.buildDeltaFirstNumberMinusSecond(M, b.center, a);
            O = this.deltaWithinBox(O, b.rect, i);
            x = w.moveEntitiesIgnoreSnap(x, [b.entity], O);
            I = I + R
        }
        return x
    }
};
var EntityHelper = new class {
    getSelectedIdsOrEmpty(e) {
        var t = e.controlSelectedInfo;
        return t && t.selectedIds || []
    }
    isMultipleEntitiesSelected(e) {
        return this.getSelectedIdsOrEmpty(e).length > 1
    }
    isAtleast3EntitiesSelected(e) {
        return this.getSelectedIdsOrEmpty(e).filter((e) => {
            return !DiagramIdHelper.isDiagramConnectionId(e)
        }).length > 2
    }
    isGroupEntitySelected(e, t) {
        if (!t) return false;
        var n = this.getSelectedIdsOrEmpty(e);
        if (1 != n.length) return false;
        var r = n[0];
        var a = t.shapes.find((e) => {
            return e.id === r
        });
        return a && DiagramIdHelper.isDiagramGroupId(a.id)
    }
    smoothBezierEntityIfRequire(e) {
        if (ItemDefaultSettings.getSettings(e, "isControlPointBreak")) return e;
        var t = Geometry.smoothBeziers(e.data);
        return e = PropUpdateHelper.setProp(e, "data", t)
    }
    moveMainControlPoint(e, t, n, r) {
        if (EntityUtils.isShapeArrow(e) && EntityUtils.isStraightLineArrow(e)) {
            n = n || Geometry.addPoint(e.data[t], r);
            var a = PropUpdateHelper.setIndex(e.data, t, n);
            return PropUpdateHelper.setProp(e, "data", a)
        }
        if (EntityUtils.isPrimitiveShape(e) && EntityUtils.isPolygon(e)) {
            n = n || Geometry.addPoint(e.data[t], r);
            var i = PropUpdateHelper.setIndex(e.data, t, n);
            return PropUpdateHelper.setProp(e, "data", i)
        }
        if (EntityUtils.isShapeArrow(e) && EntityUtils.isCubicLineArrow(e) || EntityUtils.isPrimitiveShape(e) && EntityUtils.isPolygonCurve(e)) {
            if (!n) n = t < e.data.length ? Geometry.addPoint(e.data[t].p1, r) : Geometry.addPoint(e.data[t - 1].p2, r);
            var o = e.data;
            var l = EntityUtils.isPolygonCurve(e);
            return o = Geometry.moveCubicBeizerPoint(o, t, n, l),
            ItemDefaultSettings.getSettings(e, "isControlPointBreak") || (o = Geometry.smoothBeziers(o, l)),
            PropUpdateHelper.setProp(e, "data", o)
        }
    }
    mergeLines(e, t, n, r) {
        var i = e[0].blocks[0];
        return CheckObject.isDiagramBlock(i) ? {
            block: this.mergeBlock(i, t, r),
            selected: _.assignIn({},
            n, {
                controlSelectedInfo: {
                    selectedIds: this.getAllSelectableEntityIds(i)
                }
            })
        } : (console.log("not supported merge arbitrary items"), {
            block: t,
            selected: n
        })
    }
    mergeBlock(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        var r = n.retainShapesInHeight ? ItemDefaultSettings.getSettings(t, "diagramHeight") : void 0;
        if (!n.keepPosition) e = this.moveAllEntities(e, {
            x: 20,
            y: 20
        },
        r);
        var a = _.clone(t);
        return a.connections = t.connections.concat(e.connections),
        a.intersections = _.clone(t.intersections),
        a.intersections.items = t.intersections.items.concat(e.intersections.items),
        a.elements = _.clone(t.elements),
        a.shapes = t.shapes.concat(e.shapes),
        _.keys(e.elements).forEach((t) => {
            return a.elements[t] = e.elements[t]
        }),
        a
    }
    getAllSelectableEntityIds(e) {
        return e.connections.filter((e) => {
            return !e.isInGroup
        }).map((e) => {
            return e.id
        }).concat(_.keys(e.elements).filter((t) => {
            return !e.elements[t].isInGroup
        })).concat(e.shapes.map((e) => {
            return e.id
        }))
    }
    moveEntitiesByIds(e, t, n) {
        var r = EntityUtils.getEntities(e, t);
        return w.moveEntities(e, r, n, w.emptyMovingInfo)
    }
    moveEntities(e, t, n, r) {
        return w.moveEntities(e, t, n, r)
    }
    distributeEntities(e, t, n, r, a) {
        return O.distributeEntities(e, t, n, r, a)
    }
    alignEntities(e, t, n, r, a) {
        if ("distribute-horizontally" == a || "distribute-vertically" == a) return this.distributeEntities(e, t, n, r, a);
        var i = EntityFinder.getFromEntities(t, n, r);
        var o = E.alignShapes(t, n, a, i, r);
        var s = o.newShapes;
        var l = o.movedLinkedItems;
        var c = E.setShapesInData(e, s);
        var d = EditorAction.alignEditors(t, n, a, i, r);
        c = EditorAction.setEditorsInData(c, d);
        var h = FindEntityHelper.findAllOriginalEditors(t, e.elements);
        if (h && h.length > 0) {
            var u = [];
            h.forEach((e) => {
                var t = l.find((t) => {
                    return t.linkedEntity.linkedId === e.id
                });
                if (t) u.push(EditorAction.moveEditor(e, t.delta))
            });
            c = EditorAction.setEditorsInData(c, u)
        }
        return c
    }
    changePropertyEntities(e, t, n, r, a) {
        var i = this.innerChangePropertyEntities(t, n, r, a);
        var o = FindEntityHelper.findAllOriginalEditorIds(t);
        if (o && o.length > 0) {
            var s = ShapesDestructer.findConnectedEditorAndConnections(o, e);
            var l = DiagramEntityHelper.getEntitiesByIds(s, e);
            i = i.concat(this.innerChangePropertyEntities(l, n, r, a))
        }
        return i
    }
    innerChangePropertyEntities(e, t, n, r) {
        return _.map(e, (e) => {
            if (EntityUtils.isDiagramEditor(e)) {
                var i = this.changePropertyForShape(e.shape, t, n, r);
                return PropUpdateHelper.setProp(e, "shape", i)
            }
            if (DiagramIdHelper.isDiagramGroupId(e.id)) {
                var l = e;
                var c = this.innerChangePropertyEntities(l.entities, t, n, r);
                return _.assignIn({},
                l, {
                    entities: c
                })
            }
            return DiagramIdHelper.isDiagramLinkedId(e.id) ? e : this.changePropertyForShape(e, t, n, r)
        })
    }
    changePropertyForShape(e, t, n, r) {
        if (t) {
            var a = e[t] || {};
            return a = PropUpdateHelper.setProp(a, n, r),
            PropUpdateHelper.setProp(e, t, a)
        }
        return PropUpdateHelper.setProp(e, n, r)
    }
    moveAllEntities(e, t, n) {
        if (n) {
            var r = E.getVerticalMinMaxEntities(e.shapes);
            _.keys(e.elements).forEach((t) => {
                r = {
                    min: Math.min(r.min, e.elements[t].shape.data.p.y),
                    max: Math.max(r.max, e.elements[t].shape.data.p.y)
                }
            });
            if (r.max + t.y > n) t = {
                x: t.x,
                y: n - r.max - 10
            }
        }
        return e.shapes = E.moveShapes(e.shapes, t),
        _.keys(e.elements).forEach((n) => {
            e.elements[n] = EditorAction.moveEditor(e.elements[n], t)
        }),
        e
    }
    removeEntities(e, t) {
        var n = EntityUtils.getEntities(e, t);
        return m.deleteEntities(e, n)
    }
    gatherAllEntitiesWithLinkedOnes(e, t) {
        var n = [];
        e.forEach((e) => {
            if (n.push(EntityUtils.getEntityById(t, e)), DiagramIdHelper.isDiagramGroupId(e)) {
                var r = FindEntityHelper.findAllOriginalEditorIds([t.shapes.find((t) => {
                    return t.id === e
                })]);
                if (r.length > 0) {
                    var a = ShapesDestructer.findConnectedEditorAndConnections(r, t);
                    n = n.concat(EntityUtils.getEntities(t, a))
                }
            }
        });
        return n
    }
    removeEntitiesAndRelating(e, t) {
        var n = this.gatherAllEntitiesWithLinkedOnes(t, e);
        return m.deleteEntities(e, n)
    }
    extractSelectedEntities(e, t) {
        var n = _.clone(e);
        n.elements = this.filterElements(e.elements, t);
        var r = _.keys(n.elements);
        n.connections = _.filter(e.connections, (e) => {
            return t.indexOf(e.id) >= 0 && r.indexOf(e.fromEditorId) >= 0 && r.indexOf(e.toEditorId) >= 0
        });
        n.shapes = _.filter(e.shapes, (e) => {
            return t.indexOf(e.id) >= 0
        });
        var a = _.map(n.shapes, (e) => {
            return e.id
        });
        n.intersections = _.clone(e.intersections);
        n.intersections.items = _.filter(e.intersections.items, (e) => {
            if (e.entities.length > 1) throw new Error("not implemented this intersection");
            return a.indexOf(e.entities[0]) >= 0
        });
        var i = t.filter((e) => {
            return DiagramIdHelper.isDiagramGroupId(e)
        }).map((t) => {
            return e.shapes.find((e) => {
                return e.id === t
            })
        });
        var s = FindEntityHelper.findAllOriginalEditors(i, e.elements);
        return this.appendMoreInformationForLinkedEntities(s, e, n),
        n
    }
    appendMoreInformationForLinkedEntities(e, t, n) {
        var r = e.map((e) => {
            return e.id
        });
        ShapesDestructer.findConnectedEditorAndConnections(r, t).forEach((e) => {
            if (DiagramIdHelper.isDiagramEditorId(e)) {
                if (!n.elements[e]) n.elements[e] = t.elements[e]
            } else if (DiagramIdHelper.isDiagramConnectionId(e)) if (!n.connections.some((t) => {
                return t.id === e
            })) n.connections.push(t.connections.find((t) => {
                return t.id === e
            }))
        })
    }
    filterElements(e, t) {
        var n = {};
        return _.keys(e).forEach((r) => {
            if (t.indexOf(r) >= 0) n[r] = e[r]
        }),
        n
    }
    findSelectedAtDiagramEditor(e) {
        return e.key && DiagramIdHelper.isStrictDiagramEditorId(e.key) ? e : e.selected ? this.findSelectedAtDiagramEditor(e.selected) : null
    }
    buildDiagramControlledSelected(e) {
        var t = _.cloneDeep(e);
        var n = this.findSelectedAtDiagramEditor(t);
        if (n) return n.controlSelectedInfo = {
            selectedIds: [n.key]
        },
        n.selected = null,
        n.key = null,
        n.controlled = true,
        t
    }
}

export default EntityHelper