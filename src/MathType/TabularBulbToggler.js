import jQuery from 'jquery';

/// xxx(1650) /*TabularBulbToggler*/

/// var ye = n(5)/*sizzle*/;  // 1 times
/// var Ae = n.n(ye);
var TabularBulbToggler = new class {
    tempraryHide(e) {
        return jQuery(e).closest("composite-block").find("x-bulb").css("display", "none");
    }
    restore(e) {
        e.css("display", "block");
    }
};
/*n.d(t, "a", function () {
    return TabularBulbToggler;
})*/

export default TabularBulbToggler