import HotkeyInfo from '../Mathcha/HotkeyInfo';
import KeyCodes from '../Mathcha/KeyCodes';

/// xxx(1655) /*HotkeyInfoHelper*/

/// var X = n(143)/*HotkeyInfo*/;  // 1 times
/// var J = n(207)/*KeyCodes*/;  // 1 times
var HotkeyInfoHelper = new class {
    getText(e) {
        if ("hot-key" == e.type) {
            var t = HotkeyInfo.hotkeyInfoToText(e);
            if (e.secondKeyCode) {
                return "".concat(t, ",").concat((KeyCodes[e.secondKeyCode] || "none").toUpperCase());
            } else {
                return t;
            }
        }
        return e.sequence;
    }
    constructModifierHashForShorctut(e) {
        var t = 0;
        e.control && (t = t | 1);
        e.meta && (t = t | 2);
        e.optionOrAlt && (t = t | 4);
        e.shift && (t = t | 8);
        return t;
    }
};
/*n.d(t, "a", function () {
    return HotkeyInfoHelper;
})*/

export default HotkeyInfoHelper