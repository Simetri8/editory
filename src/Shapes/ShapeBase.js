import _ from 'lodash';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
// Not found 'var' for: import  from '../Editor/DiagramElementCreater';
// Not found 'var' for: import  from '../Editor/SnapToGridSize';
// Not found 'var' for: import  from '../Elements/DiagramIdHelper';
// Not found 'var' for: import  from '../Geometry/Geometry';
// Not found 'var' for: import  from '../Geometry/RotationControlPointHelper';
// Not found 'var' for: import  from '../Geometry/SkewHelper';
// Not found 'var' for: import  from './GuideDetector';
// Not found 'var' for: import  from './PointDetector';
// Not found 'var' for: import  from './ShapeControlDistance';
// Not found 'var' for: import  from './ShapeScale';
// Not found 'var' for: import  from './ShapeSnapper';
// Not found 'var' for: import  from './ShapeUtil';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ShapeStyleBase from './ShapeStyleBase';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(9) /*ShapeBase*/

/*n.d(t, "a", function () {
    return I
});*/
/// var r = n(35)/*slicedToArray*/;  // 0 times
/// var a = n.n(r);
/// var i = n(3)/*_.assignIn*/;  // 1 times
/// var o = n.n(i);
/// var s = n(2)/*lodash*/;  // 0 times
/// var l = n.n(s);
/// var c = n(7)/*PropUpdateHelper*/;  // 1 times
/// var d = n(1)/*Geometry*/;  // 0 times
/// var h = n(6)/*DiagramIdHelper*/;  // 0 times
/// var u = n(113)/*SnapToGridSize*/;  // 0 times
/// var p = n(166)/*ShapeStyleBase*/;  // 1 times
/// var m = n(167)/*ShapeScale*/;  // 0 times
/// var f = n(287)/*ShapeSnapper*/;  // 0 times
/// var g = n(47)/*RotationControlPointHelper*/;  // 0 times
/// var y = n(153)/*PointDetector*/;  // 0 times
/// var A = n(81)/*SkewHelper*/;  // 0 times
/// var E = n(8)/*ShapeUtil*/;  // 0 times
/// var v = n(70)/*TransformHelper*/;  // 2 times
/// var S = n(162)/*GuideDetector*/;  // 0 times
/// var C = n(141)/*DiagramElementCreater*/;  // 0 times
/// var x = n(161)/*ShapeControlDistance*/;  // 0 times
class I extends ShapeStyleBase {
    getWidth() {
        var e = this.props.shape.data,
        t = e.p1,
        n = e.p2;
        return Math.abs(n.x - t.x)
    }
    getHeight() {
        var e = this.props.shape.data,
        t = e.p1,
        n = e.p2;
        return Math.abs(n.y - t.y)
    }
    shape() {
        return this.props.shape
    }
    getCp() {
        var e = this.props.shape.data,
        t = e.p1,
        n = e.p2;
        return {
            x: (t.x + n.x) / 2,
            y: (t.y + n.y) / 2
        }
    }
    styleWithRotation() {
        var e = this.props.styleInfo.style,
        t = this.props.shape.data.rotation;
        if (t) {
            var n = this.getCp();
            e = PropUpdateHelper.update(e, {
                transform: (new TransformHelper).orgin(n.x, n.y).rotate(t).toCssStyle()
            })
        }
        return e
    }
    transparentStyleWithRotation() {
        var e = this.props.shape.data.rotation;
        if (e) {
            var t = this.getCp();
            return _.assignIn({
                transform: (new TransformHelper).orgin(t.x, t.y).rotate(e).toCssStyle()
            },
            this.transparentStyle())
        }
        return {}
    }
}

export default I