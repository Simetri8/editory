import classNames from 'classnames';
import Global from '../Global';

/// xxx(76) /*MobileTabletClasses*/

/// var r = n(14)/*classnames*/;  // 1 times
/// var a = n.n(r);
/// var i = n(11)/*Global*/;  // 4 times
var MobileTabletClasses = new class {
    addMobileTabletClssIfRequired(e) {
        return Global.isMobileOrTablet() ? classNames(e, "mobile-tablet") : e
    }
    autocompleteItemsScale() {
        return Global.isMobileOrTablet() ? 1.2 : 1
    }
    sidebarMenuDeltaX() {
        return Global.isMobileOrTablet() ? 220 : 120
    }
    getSettingScaleTransform() {
        return Global.isMobileOrTablet() ? "scale(1.3)" : void 0
    }
}

export default MobileTabletClasses