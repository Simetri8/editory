import _ from 'lodash';
// Not found 'var' for: 
//import ShapeLoader from './ShapeLoader';
import EntityUtils from '../Editor/EntityUtils';
//import EntityFinder from '../Editor/EntityFinder';
import Geometry from '../Geometry/Geometry';

/// xxx(153) /*PointDetector*/

var r;
/// var a = n(1532)/*ShapeLoader*/;  // 0 times
/// var i = n(2)/*lodash*/;  // 4 times
/// var o = n.n(i);
/// var s = n(1)/*Geometry*/;  // 4 times
/// var l = n(20)/*EntityUtils*/;  // 9 times
var PointDetector = new class {
	detect(e, t, n, r) {
		var a = this.getSnapablePointsEntity(e);
		return 0 === a.length ? null : this.detectPoints(a, t, n, r)
	}
	detectPoint(e, t) {
		var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
			r = arguments.length > 3 ? arguments[3] : void 0;
		return this.detectPoints([e], t, n, r)
	}
	detectPoints(e, t, n, r) {
		isNaN(r) && (r = 2);
		var a = this.getSnapablePoints(t).concat(n);
		if (0 === a.length) return null;
		var i = {
			inputPoint: e[0],
			minPoint: a[0],
			distance: Geometry.distance2Points(e[0], a[0])
		};
		return e.forEach(e => {
			a.forEach(t => {
				var n = Geometry.distance2Points(e, t);
				n < i.distance && (i = {
					inputPoint: e,
					minPoint: t,
					distance: n
				})
			})
		}),
			i.distance > r ? null : {
				inputPoint: i.inputPoint,
				snapPoint: i.minPoint,
				distance: i.distance,
				delta: {
					x: i.minPoint.x - i.inputPoint.x,
					y: i.minPoint.y - i.inputPoint.y
				}
			}
	}
	getSnapablePoints(e) {
		if (r && r.otherShapes === e) return console.log("cached hit"),
			r.points;
		var t = _.flatMap(e, e => this.getSnapablePointsEntity(e));
		return r = {
			otherShapes: e,
			points: t
		},
			t
	}
	getSnapablePointsEntity(e, t) {
		console.log("TODO getSnapablePointsEntity ", e, t,
			EntityUtils.isShapeArrow(e),
			EntityUtils.isShapeComposite(e),
			EntityUtils.isPrimitiveShape(e),
			EntityUtils.isGroupedEntity(e))

		if (EntityUtils.isShapeArrow(e)) {
			if (EntityUtils.isStraightLineArrow(e)) return this.getSnapPointsForStraightLine(e, t);
			if (EntityUtils.isCubicLineArrow(e)) {
				var n = e.data.map(e => e.p1).concat(_.last(e.data).p2);
				return void 0 !== t && n.splice(t, 1),
					n
			}
		} else {
			if (EntityUtils.isShapeComposite(e)) {
				var snapablePoints = this.getSnapablePoints(e)
				console.log("TODO: ", snapablePoints)
				console.warn("TODO: Shape Loader .getShapeManagement");/*return a .a .getShapeManagement(e).getSnapablePoints(e);*/
				return snapablePoints
			}

			if (EntityUtils.isPrimitiveShape(e)) {
				if (EntityUtils.isPolygon(e)) return this.getSnapPointsForPolygon(e, t);
				if (EntityUtils.isPolygonCurve(e)) {
					var r = e.data.map(e => e.p1).concat(_.last(e.data).p2);
					return void 0 !== t && r.splice(t, 1),
						0 === t && r.splice(r.length - 1, 1),
						r
				}
			} else {
				if (EntityUtils.isGroupedEntity(e)) return _.flatMap(e.entities, e => this.getSnapablePointsEntity(e));
				if (EntityUtils.isTemporaryEntity(e)) return e.snapPoints || []
			}
		}
		return []
	}
	getSnapPointsForPolygon(e, t) {
		for (var n = e.data, r = [], a = e.data.concat([e.data[0]]), i = 0; i < a.length - 1; i++) if (i !== t - 1 && i !== t && (0 !== t || i !== a.length - 2)) {
			var o = a[i],
				l = a[i + 1];
			Geometry.distance2Points(o, l) <= 20 || r.push({
				x: (o.x + l.x) / 2,
				y: (o.y + l.y) / 2
			})
		}
		return void 0 !== t && (n = n.filter((e, n) => n != t)),
			n.concat(r)
	}
	getSnapPointsForStraightLine(e, t) {
		for (var n = e.data, r = [], a = 0; a < e.data.length - 1; a++) if (a !== t - 1 && a !== t) {
			var i = e.data[a],
				o = e.data[a + 1];
			Geometry.distance2Points(i, o) <= 20 || r.push({
				x: (i.x + o.x) / 2,
				y: (i.y + o.y) / 2
			})
		}
		return void 0 !== t && (n = n.filter((e, n) => n != t)),
			n.concat(r)
	}
}

export default PointDetector