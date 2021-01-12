import _ from 'lodash';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';

/// xxx(93) /*ShapeCreaterBase*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return o
}),*/
/*n.d(t, "b", function () {
    return l
}),*/
/*n.d(t, "c", function () {
    return s
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(9)/*ShapeBase*/;  // 1 times
class o extends ShapeBase {}
class s extends ShapeBaseC {}
class l extends ShapeBaseB {
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 30,
            shapeHeight: e.shapeHeight || 30
        }))
    }
}

export { l as ShapeCreaterBaseB }

export { s as ShapeCreaterBaseC }

export default o