import jQuery from 'jquery';
import CompositeBlockWrapper from '../Mathcha/CompositeBlockWrapper';

/// xxx(125) /*Symbol-hat-base*/

/*n.d(t, "a", function () {
    return o
});*/
/// var r = n(5)/*sizzle*/;  // 1 times
/// var a = n.n(r);
/// var i = n(116)/*CompositeBlockWrapper*/;  // 1 times
class o extends CompositeBlockWrapper {
    getEditContentTopBottom() {
        var e = jQuery(this.getRootDom()).children("edit-area,editarea-block,editarea-line").get(0);
        return this.getElementRect(e)
    }
    useCustomBaseLine() {
        return !1
    }
}

export default o