import _ from 'lodash';
import React from 'react';
import DiagramIdHelper from '../../Elements/DiagramIdHelper';
import EntityFinder from '../EntityFinder';
import EntityUtils from '../EntityUtils';
import Geometry from '../../Geometry/Geometry';
import ItemDefaultSettings from './ItemDefaultSettings';
import ItemRemoveSelected from '../../Elements/ItemRemoveSelected';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';
import ToolbarChangeHandleWrapper from './ToolbarChangeHandleWrapper';

/// xxx(450) /*LinePointItemGroup*/

/*n.d(t, "a", function () {
    return y
}),*/
/*n.d(t, "b", function () {
    return A
});*/
/// var r = n(3)/*_.assignIn*/;  // 6 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 13 times
/// var o = n.n(i);
/// var s = n(56)/*ToolbarChangeHandleWrapper*/;  // 1 times
/// var l = n(33)/*ItemRemoveSelected*/;  // 2 times
/// var c = n(7)/*PropUpdateHelper*/;  // 7 times
/// var d = n(1)/*Geometry*/;  // 13 times
/// var h = n(2)/*lodash*/;  // 1 times
/// var u = n.n(h);
/// var p = n(6)/*DiagramIdHelper*/;  // 6 times
/// var m = n(20)/*EntityUtils*/;  // 28 times
/// var f = n(17)/*ItemDefaultSettings*/;  // 4 times
/// var g = n(119)/*EntityFinder*/;  // 1 times
class y extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleToBox = () => {
            var e = this.props.getSelectedEntites()[0];
            if (e) {
                var t = EntityFinder.get(e, {
                    editorRef: null,
                    editors: null
                },
                1);
                var n = Math.max(Geometry.rectWidth(t), 1);
                var r = Math.max(Geometry.rectHeight(t), 1);
                if (EntityUtils.isStraightLineArrow(e) || EntityUtils.isPolygon(e)) {
                    var i = e.data.map((e) => {
                        return {
                            x: (e.x - t.p1.x) * (1 / n),
                            y: (e.y - t.p1.y) * (1 / r)
                        };
                    });
                    var o = e.style || {};
                    var s = {
                        id: DiagramIdHelper.nextDiagramCompositeShapeId(),
                        type: "line-box",
                        data: {
                            p1: t.p1,
                            p2: t.p2,
                            innerShape: _.assignIn({
                                type: void 0
                            },
                            e, {
                                data: i
                            })
                        },
                        style: {
                            strokeColor: o.strokeColor,
                            fillColor: o.fillColor,
                            fillRule: o.fillRule,
                            thickness: o.thickness
                        }
                    };
                    if (EntityUtils.isPolygon(e)) {
                        s.style.strokeType = o.strokeType;
                    }
                    this.props.onNewTypeEntityChanged(e, s);
                }
                if (EntityUtils.isCubicLineArrow(e) || EntityUtils.isPolygonCurve(e)) {
                    var l = Geometry.toAbsoluteControlPointCubics(e.data).map((e) => {
                        return Geometry.transformCubicBezier(e, 1, 1, -t.p1.x, -t.p1.y);
                    });
                    l = l.map((e) => {
                        return Geometry.transformCubicBezier(e, 1 / n, 1 / r, 0, 0);
                    });
                    var c = e.style || {};
                    var h = {
                        id: DiagramIdHelper.nextDiagramCompositeShapeId(),
                        type: "line-box",
                        data: {
                            p1: t.p1,
                            p2: t.p2,
                            innerShape: _.assignIn({},
                            e, {
                                data: l
                            })
                        },
                        style: {
                            strokeColor: c.strokeColor,
                            fillColor: c.fillColor,
                            fillRule: c.fillRule,
                            thickness: c.thickness
                        }
                    };
                    if (EntityUtils.isPolygonCurve(e)) {
                        h.style.strokeType = c.strokeType;
                    }
                    this.props.onNewTypeEntityChanged(e, h);
                }
            }
        };
        this.handleCloseLine = () => {
            var e = this.props.getSelectedEntites()[0];
            if (e) {
                if (EntityUtils.isStraightLineArrow(e)) {
                    var t = {
                        id: DiagramIdHelper.nextDiagramShapeId(),
                        type: "polygon",
                        data: e.data,
                        style: _.assignIn({},
                        e.style, {
                            strokeType: "-"
                        })
                    };
                    this.props.onNewTypeEntityChanged(e, t);
                } else {
                    if (EntityUtils.isPolygon(e)) {
                        var n = {
                            id: DiagramIdHelper.nextDiagramArrowId(),
                            type: void 0,
                            data: e.data.slice(0, e.data.length),
                            style: _.assignIn({},
                            e.style, {
                                strokeType: "-"
                            }),
                            head: "no",
                            tail: "no",
                            shaft: "-"
                        };
                        this.props.onNewTypeEntityChanged(e, n);
                    } else {
                        if (EntityUtils.isCubicLineArrow(e)) {
                            var r = e.data[0];
                            var i = e.data[e.data.length - 1];
                            var o = ItemDefaultSettings.getSettings(e, "isControlPointBreak");
                            var s = e.data.concat({
                                p1: i.p2,
                                p2: r.p1,
                                cp: {
                                    dx: 10,
                                    dy: 10
                                },
                                cp2: {
                                    dx: 10,
                                    dy: 10
                                }
                            });
                            if (!o) {
                                s = Geometry.smoothBeziers(s, true);
                            }
                            var l = {
                                id: DiagramIdHelper.nextDiagramShapeId(),
                                type: "polygon-curve",
                                data: s,
                                settings: {
                                    isControlPointBreak: o
                                },
                                style: _.assignIn({},
                                e.style, {
                                    strokeType: "-"
                                })
                            };
                            this.props.onNewTypeEntityChanged(e, l);
                        } else {
                            if (EntityUtils.isPolygonCurve(e)) {
                                var c = ItemDefaultSettings.getSettings(e, "isControlPointBreak");
                                var h = {
                                    id: DiagramIdHelper.nextDiagramArrowId(),
                                    type: "cubic",
                                    data: e.data.slice(0, e.data.length - 1),
                                    settings: {
                                        isControlPointBreak: c
                                    },
                                    style: _.assignIn({},
                                    e.style, {
                                        strokeType: "-"
                                    }),
                                    head: "no",
                                    tail: "no",
                                    shaft: "-"
                                };
                                this.props.onNewTypeEntityChanged(e, h);
                            } else {}
                        }
                    }
                }
            }
        };
        this.handleAddingControlPoint = () => {
            var e = this.props.subSelection ? this.props.subSelection.index : void 0;
            var t = _.map(this.props.getSelectedEntites(), (t) => {
                if (EntityUtils.isStraightLineArrow(t) || EntityUtils.isPolygon(t)) {
                    var n = Geometry.addNewPointToPoints(t.data, e);
                    return PropUpdateHelper.setProp(t, "data", n);
                }
                var r = ItemDefaultSettings.getSettings(t, "isControlPointBreak");
                if (EntityUtils.isCubicLineArrow(t)) {
                    var a = Geometry.addNewBeizer(t.data, !r, e);
                    return PropUpdateHelper.setProp(t, "data", a);
                }
                if (EntityUtils.isPolygonCurve(t)) {
                    var i = Geometry.addNewBeizer(t.data, !r, e, true);
                    return PropUpdateHelper.setProp(t, "data", i);
                }
                throw new Error("not implemented");
            });
            this.props.raiseEntitiesChange(t, false);
        };
        this.handleRemovingPoint = () => {
            var e = this.props.getSelectedEntites()[0];
            var t = A(e, this.props.subSelection);
            if (e != t) {
                this.props.raiseEntitiesChange([t]);
                this.props.onRemoveControlPoint();
            }
        };
    }
    render() {
        var e = this.props.entity;
        var t = "control-point-removing";
        var n = this.handleRemovingPoint;
        var r = this.shouldDisableRemovingControlPoint(e);
        return r && (t = t + " disabled", n = void 0),
        React.createElement(ToolbarChangeHandleWrapper, {
            watch: [r, e]
        },
        React.createElement("item-group", null, React.createElement("x-item", {
            title: "Add new Point",
            class: "control-point-adding",
            onMouseDown: this.handleAddingControlPoint
        },
        React.createElement("svg", null, React.createElement("circle", {
            cx: "8",
            cy: "10",
            r: "4"
        }), React.createElement("path", {
            d: "M0,10 L6,10 M3,7 L3,13"
        }))), React.createElement("x-item", {
            title: "Remove Selected Point",
            class: t,
            onMouseDown: n
        },
        React.createElement("svg", null, React.createElement("circle", {
            cx: "8",
            cy: "10",
            r: "4"
        }), React.createElement("path", {
            d: "M0,10 L6,10"
        }))), ItemRemoveSelected.separator(), this.renderCloseLine(), this.renderToBox()));
    }
    renderCloseLine() {
        if (this.shouldRenderCloseLine()) {
            var e = this.props.getSelectedEntites()[0];
            var t = EntityUtils.isStraightLineArrow(e) || EntityUtils.isCubicLineArrow(e) ? "Closed" : "Unclosed";
            return [React.createElement("button", {
                key: "2",
                className: "btn-normal",
                onClick: this.handleCloseLine,
                style: {
                    marginTop: 3,
                    marginLeft: 5,
                    marginRight: 5
                }
            },
            t)];
        }
    }
    renderToBox() {
        return [React.createElement("button", {
            key: "to-box",
            className: "btn-normal",
            onClick: this.handleToBox,
            style: {
                marginTop: 3,
                marginLeft: 5,
                marginRight: 5,
                paddingLeft: 8,
                paddingRight: 8
            }
        },
        "Boxed"), ItemRemoveSelected.separator1()];
    }
    shouldRenderCloseLine() {
        var e = this.props.getSelectedEntites();
        if (1 != e.length) {
            return false;
        }
        var t = e[0];
        return EntityUtils.isStraightLineArrow(t) ? t.data.length > 2 : EntityUtils.isCubicLineArrow(t) ? t.data.length > 1 : !(!EntityUtils.isPolygon(t) && !EntityUtils.isPolygonCurve(t));
    }
    shouldDisableRemovingControlPoint(e) {
        return !this.props.subSelection || ( !! (EntityUtils.isStraightLineArrow(e) && e.data.length <= 2) || ( !! (EntityUtils.isPolygon(e) && e.data.length <= 3) || ( !! (EntityUtils.isCubicLineArrow(e) && e.data.length <= 1) || !!(EntityUtils.isPolygonCurve(e) && e.data.length <= 2))));
    }
}
function A(e, t) {
    var n = e;
    if (EntityUtils.isStraightLineArrow(e)) {
        if (e.data.length <= 2) {
            return e;
        }
        var r = Geometry.removePointFromPoints(e.data, t.index);
        n = PropUpdateHelper.setProp(e, "data", r);
    }
    if (EntityUtils.isPolygon(e)) {
        if (e.data.length <= 3) {
            return e;
        }
        var a = Geometry.removePointFromPoints(e.data, t.index);
        n = PropUpdateHelper.setProp(e, "data", a);
    }
    var i = ItemDefaultSettings.getSettings(e, "isControlPointBreak");
    if (EntityUtils.isCubicLineArrow(e)) {
        if (e.data.length <= 1) {
            return e;
        }
        var o = Geometry.removeBezier(e.data, t.index, !i);
        n = PropUpdateHelper.setProp(e, "data", o);
    }
    if (EntityUtils.isPolygonCurve(e)) {
        if (e.data.length <= 2) {
            return e;
        }
        var s = Geometry.removeBezierClosed(e.data, t.index, !i);
        n = PropUpdateHelper.setProp(e, "data", s);
    }
    return n;
}

export { A as LinePointItemGroupB }

export default y