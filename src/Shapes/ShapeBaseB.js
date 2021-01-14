import React from 'react';
import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
// Not found 'var' for: import  from '../Editor/SnapToGridSize';
import DiagramElementCreater from '../Editor/DiagramElementCreater';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Geometry from '../Geometry/Geometry';
import GuideDetector from './GuideDetector';
import PointDetector from './PointDetector';
import RotationControlPointHelper from '../Geometry/RotationControlPointHelper';
import ShapeControlDistance from './ShapeControlDistance';
import ShapeScale from './ShapeScale';
import ShapeSnapper from './ShapeSnapper';
import ShapeUtil from './ShapeUtil';
import SkewHelper from '../Geometry/SkewHelper';

/// xxx(1531) /*ShapeBaseB*/

/// n.r(t)
/// var r = n(35)/*slicedToArray*/;  // 1 times
/// var a = n.n(r);
/// var s = n(2)/*lodash*/;  // 2 times
/// var l = n.n(s);
/// var i = n(3);  // 13 times
/// var o = n.n(i);
/// var d = n(1)/*Geometry*/;  // 22 times
/// var h = n(6)/*DiagramIdHelper*/;  // 1 times
/// var u = n(113)/*SnapToGridSize*/;  // 0 times
/// var m = n(167)/*ShapeScale*/;  // 1 times
/// var f = n(287)/*ShapeSnapper*/;  // 1 times
/// var g = n(47)/*RotationControlPointHelper*/;  // 2 times
/// var y = n(153)/*PointDetector*/;  // 1 times
/// var A = n(81)/*SkewHelper*/;  // 2 times
/// var E = n(8)/*ShapeUtil*/;  // 12 times
/// var S = n(162)/*GuideDetector*/;  // 1 times
/// var C = n(141)/*DiagramElementCreater*/;  // 1 times
/// var x = n(161)/*ShapeControlDistance*/;  // 1 times
/*n.d(t, "a", function () {
		return ShapeBaseB
});*/

class ShapeBaseB {
	constructor() {
		//super(...arguments);
		this.baseSupportedStyles = ["thickness", "strokeColor", "fillColor", "intersection", "strokeType", "rotation", "skewX"];
		this.getSupplementaryLines = (e) => {
			return Geometry.pointsToLines(ShapeUtil.rectTo4Points(e.data), true)
		};
		this.getBaseRotationPoints = (e, t) => {
			return RotationControlPointHelper.getRotationPoint(e.data, 0, t)
		};
		this.getRotationPoints = (e, t) => {
			return RotationControlPointHelper.getRotationPoint(e.data, e.data.rotation, t)
		}
	}

	styleSupports(e) {
		// ["thickness", "strokeColor", "fillColor", "intersection", "strokeType"]
		return this.baseSupportedStyles
	}
	/**ShapeStyleBaseB */

	getIcon() {
		return {
			caption: "",
			component: React.createElement("svg", {
				style: {
					width: 23,
					height: 20,
					position: "relative"
				},
				key: this.getType()
			},
				React.createElement("path", {
					style: {
						stroke: "gray",
						fill: "none",
						transform: "translate(1px,0px)"
					},
					d: " M4,5.6 L16.1,5.6 L16.1,15.2 L4,15.2 Z"
				}))
		}
	}
	getInfo() {
		return {
			entityType: "shape-composite",
			type: this.getType()
		}
	}
	getSettingDefaultValue(e) { }
	getSnapablePoints(e) {
		return []
	}
	isSupportStyle(e, t) {
		return this.styleSupports(t).indexOf(e) >= 0
	}

	getBreakdownInfo(e) {
		return this.wrapBreakdownCachable(e, (e) => {
			return this.getBreakdownInfoWhenInvalidCache(e)
		})
	}
	wrapBreakdownCachable(e, t) {
		if (e.___breakdownInfoCache && e.___breakdownInfoCache.data === e.data && e.___breakdownInfoCache.settings === e.settings) return e.___breakdownInfoCache.info;
		var n = t(e);
		return e.___breakdownInfoCache = {
			data: e.data,
			settings: e.settings,
			info: n
		},
			n
	}
	getControlPoints(e, t) {
		return []
	}
	moveControlPoint(e) {
		return e.shape
	}
	/** */


	minMaxVertical(e) {
		var t = e.data;
		var n = t.p1;
		var r = t.p2;
		var a = t.rotation;
		if (!n || !r) throw new Error("could not figure out");
		if (!a) return {
			min: Math.min(n.y, r.y),
			max: Math.max(n.y, r.y)
		};
		var i = this.getCp(n, r);
		return n = Geometry.pointRotate(n, i, a),
			r = Geometry.pointRotate(r, i, a),
		{
			min: Math.min(n.y, r.y),
			max: Math.max(n.y, r.y)
		}
	}
	getBreakdownInfoWhenInvalidCache(e) {
		return {
			data: this.getBreakdownInfoData(e)
		}
	}
	getBreakdownInfoData(e) {
		return Geometry.pointsToLines(ShapeUtil.rectTo4Points(e.data), true)
	}
	getControlPoints(e) {
		return function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
			var n = e.data.rotation;
			var r = Geometry.getCenterPoint(e.data.p1, e.data.p2);
			var i = ShapeUtil.rectTo4Points(e.data);
			var o = slicedToArray(i, 4);
			var s = o[0];
			var c = o[1];
			var h = o[2];
			var u = o[3];
			var p = Geometry.getMiddlePointLine(s, u);
			var m = Geometry.getMiddlePointLine(s, c);
			var f = Geometry.getMiddlePointLine(c, h);
			var g = Geometry.getMiddlePointLine(h, u);
			var y = e.data.flipX ? h : u;
			y = {
				x: (y = Geometry.pointRotate(y, r, -n)).x,
				y: y.y + ShapeControlDistance.skewControlDistance() / t
			};
			y = Geometry.pointRotate(y, r, n);
			var A = [{
				key: "left-top",
				p: s,
				cursor: "nwse-resize",
				rotation: n
			},
			{
				key: "top",
				p: m,
				cursor: "ns-resize",
				rotation: n
			},
			{
				key: "top-right",
				p: c,
				cursor: "nesw-resize",
				rotation: n
			},
			{
				key: "right",
				p: f,
				cursor: "ew-resize",
				rotation: n
			},
			{
				key: "right-bottom",
				p: h,
				cursor: "nwse-resize",
				rotation: n
			},
			{
				key: "bottom",
				p: g,
				cursor: "ns-resize",
				rotation: n
			},
			{
				key: "bottom-left",
				p: u,
				cursor: "nesw-resize",
				rotation: n
			},
			{
				key: "left",
				p: p,
				cursor: "ew-resize",
				rotation: n
			},
			{
				key: "skew-x",
				p: y,
				cursor: "crosshair",
				rotation: n,
				type: "skew"
			}];
			var v = Geometry.rectWidth(e.data);
			var S = Geometry.rectHeight(e.data);
			if (v * t <= 20) A = _.filter(A, (e) => {
				return "top" != e.key && "bottom" != e.key
			});
			if (S * t <= 20) A = _.filter(A, (e) => {
				return "right" != e.key && "left" != e.key
			});
			if (S * t <= 25 && v * t <= 25) A.forEach((e) => {
				return e.smaller = true
			});
			return A
		}(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1)
	}
	moveControlPoint(e) {
		var t = e.isShift;
		var n = e.isAlt;
		var r = e.otherShapes;
		var a = e.isControl;
		var i = e.key;
		var s = e.point;
		var l = e.shape;
		var c = e.snapToGridSize;
		var h = l.data;
		var u = h.p1;
		var p = h.p2;
		var m = h.rotation;
		var f = e.diagramModel.horizontalGuides || [];
		var g = e.diagramModel.verticalGuides || [];
		var v = (f.length > 0 || g.length > 0) && !e.isControl;
		var C = s;
		var x = r.length > 0 && !a;
		var I = c && !e.isControl;
		if (x) {
			var T = PointDetector.detectPoint(C, e.otherShapes, [], 5 / e.scale);
			if (T) {
				e.outputSnapPoint = T.snapPoint;
				I = false;
				v = false;
				C = T.snapPoint
			}
		}
		if (v) {
			var b = GuideDetector.detectWithPoints(g, f, [C]);
			if (b) switch (I = false, b.type) {
				case "horizontal":
				case "vertical":
					C = b.snapPoint;
					e.outputSnapPoint = b.snapPoint;
					break;
				case "both":
					C = {
						x: b.vSnapPoint.x,
						y: b.hSnapPoint.y
					};
					e.outputSnapPoint = C
			}
		}
		if (I && (C = Geometry.snapToGridSize(C, c), !m || "bottom" != i && "top" != i && "left" != i && "right" != i || (e.outputSnapPoint = C)), "skew-x" == i) {
			var L = this.getCp(u, p);
			var R = Geometry.pointRotate(C, L, -m);
			var M = SkewHelper.skewXAngleFromDisplacement(e.shape.data, {
				x: u.x,
				y: p.y
			},
				R);
			return this.changeShapeData(e.shape, "skewX", M)
		}
		var w = ShapeUtil.moveControlPoint(i, l.data, C, {
			keepRatio: t,
			symmetricResize: n
		});
		return _.assignIn({},
			l, {
			data: _.assignIn({},
				l.data, w)
		})
	}
	getCp(e, t) {
		return {
			x: (e.x + t.x) / 2,
			y: (e.y + t.y) / 2
		}
	}
	rotate(e, t) {
		return this.changeShapeData(e, "rotation", Geometry.round2(t))
	}
	rotateAround(e, t, n) {
		var r = ShapeUtil.rectTo4Points(e.data);
		var a = Geometry.pointsRotate(r, n, t);
		var i = ShapeUtil.threePointsToRectangleInfo(a[0], a[1], a[2]);
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, i)
		})
	}
	skewXAtCenter(e, t, n) {
		var r = ShapeUtil.rectTo4Points(e.data);
		var a = SkewHelper.pointsFromSkew(n, t, r);
		var i = ShapeUtil.threePointsToRectangleInfo(a[0], a[1], a[2]);
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, i)
		})
	}
	move(e, t, n) {
		if (n && n.snapGridOptions && n.snapGridOptions.gridSize >= 2) {
			var r = e.data;
			var a = r.p1;
			var i = r.p2;
			var s = r.rotation;
			var l = [a, i, {
				x: a.x,
				y: i.y
			},
				{
					x: i.x,
					y: a.y
				}];
			if (s) l = Geometry.rotatePointsByShapeRect(e, l);
			t = ShapeSnapper.getMinDeltaForPoints(l, n.snapGridOptions)
		}
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, {
				p1: Geometry.addPoint(e.data.p1, t),
				p2: Geometry.addPoint(e.data.p2, t)
			})
		})
	}
	getRandomPosYAround(e, t, n) {
		var r = (t = t || e) - e;
		n = n || 1E4;
		var a = Math.floor(30 * Math.random() + 1);
		return {
			y1: (e = Math.max(0, Math.min(e, n - r))) + a,
			y2: e + r + a
		}
	}
	createShape(e) {
		return e = _.assignIn({},
			e, {
			shapeWidth: e.shapeWidth || 70,
			shapeHeight: e.shapeHeight || 40
		}),
			DiagramElementCreater.createBy(e, (t) => {
				var n = t.bottom;
				var r = this.getRandomPosYAround(t.top + 100, t.top + 180, n);
				return {
					id: DiagramIdHelper.nextDiagramCompositeShapeId(),
					type: this.getType(),
					data: {
						p1: {
							x: t.left + 100,
							y: r.y1
						},
						p2: {
							x: t.left + 100 + e.shapeWidth,
							y: r.y1 + e.shapeHeight
						}
					}
				}
			})
	}
	getRectangleBreakdownInfoData(e) {
		return Geometry.pointsToLines(ShapeUtil.rectTo4Points(e.data), true)
	}
	getBoundingRect(e) {
		return Geometry.getBoundingRectFromPoints(ShapeUtil.rectTo4Points(e.data))
	}
	scale(e, t, n, r) {
		var a = ShapeUtil.rectTo4Points(e.data);
		var i = ShapeScale.scalePoints(a, t, n, r);
		var s = ShapeUtil.threePointsToRectangleInfo(i[0], i[1], i[2]);
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, s)
		})
	}
	changeShapeData(e, t, n) {
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, {
				[t]: n
			})
		})
	}
}

export default ShapeBaseB