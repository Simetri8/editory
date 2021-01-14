import _ from 'lodash';
import React from 'react';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import DiagramElementCreater from '../Editor/DiagramElementCreater';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Geometry from '../Geometry/Geometry';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeHelper from './ShapeHelper';
import ShapeScale from './ShapeScale';
import ShapeStyleBase from './ShapeStyleBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeStyleBaseC from './ShapeStyleBaseC';
import ShapeUtil from './ShapeUtil';
import SkewHelper from '../Geometry/SkewHelper';
import SnapToGridSize from '../Editor/SnapToGridSize';

/// xxx(361) /*Shape-brace*/

function x(e) {
	var t = e.data;
	var n = t.p1;
	var r = t.p2;
	var a = t.nibPercentage;
	a = null == a ? .5 : a;
	var i = Geometry.distance2Points(n, r);
	var o = {
		x: n.x + i,
		y: n.y
	};
	var s = Geometry.angleFrom3Points360(o, r, n);
	var l = 1;
	if (i < 2 * C + 2 * v) {
		l = i / (2 * C + 2 * v);
		var c = 0
	} else c = (i - 2 * C - 2 * v) * a;
	return {
		angle: s,
		md: {
			x: n.x + C * l + v * l + c * l,
			y: n.y
		},
		newP2: o,
		scale: l,
		nibHeight: E * l,
		nibWidth: v * l,
		brimWidth: C * l,
		brimHeight: S * l
	}
}
function I(e) {
	var t = e.data.p1;
	var n = x(e);
	var r = n.md;
	var a = n.angle;
	var i = n.newP2;
	var o = n.nibHeight;
	var s = n.nibWidth;
	var l = n.brimHeight;
	var c = n.brimWidth;
	return [Geometry.quadraticBezierRotate({
		p1: t,
		cp: {
			x: t.x,
			y: t.y + l
		},
		p2: {
			x: t.x + c,
			y: t.y + l
		}
	},
		t, a), Geometry.lineRotate({
			p1: {
				x: t.x + c,
				y: t.y + l
			},
			p2: {
				x: r.x - s,
				y: t.y + l
			}
		},
			t, a), Geometry.quadraticBezierRotate({
				p1: {
					x: r.x - s,
					y: t.y + l
				},
				cp: {
					x: r.x,
					y: t.y + l
				},
				p2: {
					x: r.x,
					y: t.y + l + o
				}
			},
				t, a), Geometry.quadraticBezierRotate({
					p1: {
						x: r.x,
						y: t.y + l + o
					},
					cp: {
						x: r.x,
						y: t.y + l
					},
					p2: {
						x: r.x + s,
						y: t.y + l
					}
				},
					t, a), Geometry.lineRotate({
						p1: {
							x: r.x + c,
							y: t.y + l
						},
						p2: {
							x: i.x - c,
							y: t.y + l
						}
					},
						t, a), Geometry.quadraticBezierRotate({
							p1: {
								x: i.x - c,
								y: t.y + l
							},
							cp: {
								x: i.x,
								y: t.y + l
							},
							p2: i
						},
							t, a)]
}
/*n.d(t, "a", function () {
		return I
});*/
/*n.d(t, "b", function () {
		return L
});*/
/// var r = n(35)/*slicedToArray*/;  // 1 times
/// var a = n.n(r);
/// var i = n(3);  // 7 times
/// var o = n.n(i);
/// var s = n(0)/*React*/;  // 5 times
/// var l = n.n(s);
/// var c = n(7)/*PropUpdateHelper*/;  // 5 times
/// var d = n(1)/*Geometry*/;  // 23 times
/// var h = n(10)/*ShapeHelper*/;  // 1 times
/// var u = n(6)/*DiagramIdHelper*/;  // 1 times
/// var p = n(113)/*SnapToGridSize*/;  // 1 times
/// var m = n(166)/*ShapeStyleBase*/;  // 1 times
/// var ssbc = n(1534)/*ShapeStyleBaseC*/;  // 1 times
/// var f = n(167)/*ShapeScale*/;  // 2 times
/// var g = n(81)/*SkewHelper*/;  // 2 times
/// var y = n(8)/*ShapeUtil*/;  // 1 times
/// var A = n(141)/*DiagramElementCreater*/;  // 1 times
var E = 7;
var v = 10;
var S = 7;
var C = 7;
class T extends ShapeStyleBase {
	render() {
		var e = I(this.shape());
		var t = ShapeHelper.pathsD(e);
		return React.createElement("g", {
			className: this.props.className,
			onMouseDown: this.props.onMouseDown,
			onTouchStart: this.props.onMouseDown
		},
			this.props.styleInfo.defs, React.createElement("path", {
				className: "transparent no-print",
				d: t,
				style: this.transparentStyle()
			}), React.createElement("path", {
				className: "real",
				d: t,
				style: this.props.styleInfo.style
			}), "/>")
	}
}
class b extends ShapeStyleBaseC { }
var L = new class extends ShapeBaseB {
	getComponent() {
		return T
	}
	getType() {
		return "brace"
	}
	getSettingsComponent() {
		return b
	}
	minMaxVertical(e) {
		var t = e.data;
		var n = t.p1;
		var r = t.p2;
		return {
			min: Math.min(n.y, r.y),
			max: Math.max(n.y, r.y)
		}
	}
	getControlPoints(e) {
		var t = e.data;
		var n = t.p1;
		var r = t.p2;
		var a = x(e);
		var i = a.md;
		var o = a.angle;
		var s = a.brimHeight;
		var l = a.nibHeight;
		return [{
			key: "p1",
			p: n
		},
		{
			key: "p2",
			p: r
		},
		{
			key: "md",
			type: "square",
			p: Geometry.pointRotate({
				x: i.x,
				y: n.y + s + l
			},
				n, o)
		}]
	}
	moveControlPoint(e) {
		var t = e.key;
		var n = e.shape;
		var r = e.isShift;
		var a = e.point;
		var i = n.data;
		var o = i.p1;
		var s = i.p2;
		var l = a;
		switch (t) {
			case "p1":
				return r && (l = Geometry.snapLinePoint45(n.data.p2, l)),
					PropUpdateHelper.set(n, "data.p1", l);
			case "p2":
				return r && (l = Geometry.snapLinePoint45(n.data.p1, l)),
					PropUpdateHelper.set(n, "data.p2", l);
			case "md":
				var h = x(n);
				var u = h.angle;
				var p = h.newP2;
				var m = h.nibWidth;
				var f = h.brimWidth;
				var g = Geometry.distance2Points(o, s);
				l = Geometry.pointRotate(l, o, -u);
				var y = o.x + f + m;
				var A = p.x - f - m;
				var E = Math.max(y, Math.min(A, l.x));
				var v = g - 2 * f - 2 * m;
				var S = 0 === v ? 0 : (E - y) / v;
				return PropUpdateHelper.set(n, "data.nibPercentage", S)
		}
	}
	move(e, t) {
		var n = PropUpdateHelper.update(e.data, {
			p1: Geometry.addPoint(e.data.p1, t),
			p2: Geometry.addPoint(e.data.p2, t)
		});
		return PropUpdateHelper.setProp(e, "data", n)
	}
	getBreakdownInfoWhenInvalidCache(e) {
		var t = I(e);
		return {
			data: [Geometry.quadraticToCubic(t[0]), t[1], Geometry.quadraticToCubic(t[2]), Geometry.quadraticToCubic(t[3]), t[4], Geometry.quadraticToCubic(t[5])]
		}
	}
	getIcon() {
		return {
			caption: "brace",
			component: React.createElement("svg", {
				style: {
					width: 23,
					height: 20,
					position: "relative"
				},
				key: "brace"
			},
				React.createElement("path", {
					style: {
						stroke: "gray",
						fill: "none",
						transform: "scale(0.5,0.5) translate(1px,12px)",
						strokeWidth: 2
					},
					d: " M6,6 Q6,13 13,13 L12.86,13 Q22.86,13 22.86,20 Q22.86,13 32.86,13 M29.86,13 L32,13 Q39,13 39,6"
				}))
		}
	}
	createShape(e) {
		return e = _.assignIn({},
			e, {
			shapeWidth: 100,
			shapeHeight: 10
		}),
			DiagramElementCreater.createBy(e, (e) => {
				var t = e.bottom;
				var n = SnapToGridSize.getRandomPosYAround(e.top + 100, e.top + 180, t);
				return {
					id: DiagramIdHelper.nextDiagramCompositeShapeId(),
					type: this.getType(),
					settings: {
						blockIntersection: true
					},
					data: {
						p1: {
							x: e.left + 100,
							y: n.y1
						},
						p2: {
							x: e.left + 200,
							y: n.y1
						}
					}
				}
			})
	}
	getBoundingRect(e) {
		return Geometry.genericLinesBbox(I(e))
	}
	scale(e, t, n, r) {
		var i = ShapeScale.scalePoint(e.data.p1, t, n, false);
		var s = ShapeScale.scalePoint(e.data.p2, t, n, false);
		if (r) {
			var l = Geometry.getCenterPoint(n);
			var c = ShapeUtil.pointsFlipped(l, true, [i, s]);
			var h = slicedToArray(c, 2);
			s = h[0];
			i = h[1]
		}
		var u = _.assignIn({},
			e.data, {
			p1: i,
			p2: s
		});
		return _.assignIn({},
			e, {
			data: u
		})
	}
	rotate(e) {
		return e
	}
	rotateAround(e, t, n) {
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, {
				p1: Geometry.pointRotate(e.data.p1, n, t),
				p2: Geometry.pointRotate(e.data.p2, n, t)
			})
		})
	}
	skewXAtCenter(e, t, n) {
		return _.assignIn({},
			e, {
			data: _.assignIn({},
				e.data, {
				p1: SkewHelper.pointSkewed(n, t, e.data.p1),
				p2: SkewHelper.pointSkewed(n, t, e.data.p2)
			})
		})
	}
}

export { L as ShapeBraceB }

export default I