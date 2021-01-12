import _ from 'lodash';
import ActionDataController from './ActionDataController';
import BlockHelper from '../../Elements/BlockHelper';

/// xxx(1637) /*ElementSwitchController*/

/// var C = n(2)/*lodash*/;  // 4 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var ActionDataController = n(1641)/*ActionDataController*/;  // 4 times
class ElementSwitchController {
    next(e) {
        try {
            var t = e.findNextElementNameOfComposite();
            var n = _.cloneDeep(e.cursorSelected);
            var r = BlockHelper.findLeafParentSelected(n);
            return r.key = t,
            r.selected = {
                lineIndex: 0,
                charIndex: 0
            },
            ActionDataController.cursorPosition(n, _.clone(r.selected), false);
        } catch(e) {
            return ActionDataController.emptyResult();
        }
    }
    previous(e) {
        try {
            var t = e.findPreviousElementNameOfComposite();
            var n = _.cloneDeep(e.cursorSelected);
            var r = BlockHelper.findLeafParentSelected(n);
            return r.key = t,
            r.selected = {
                lineIndex: 0,
                charIndex: 0
            },
            ActionDataController.cursorPosition(n, _.clone(r.selected), false);
        } catch(e) {
            return ActionDataController.emptyResult();
        }
    }
}
/*n.d(t, "a", function () {
    return ElementSwitchController;
})*/

export default ElementSwitchController