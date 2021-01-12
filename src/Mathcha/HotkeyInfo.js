import Global from '../Global';
import KeyCodes from './KeyCodes';

/// xxx(143) /*HotkeyInfo*/

/// var r = n(207)/*KeyCodes*/;  // 2 times
/// var a = n(11)/*Global*/;  // 1 times
var HotkeyInfo = new class {
    detect(e) {
        var t = KeyCodes[e.keyCode] || "none",
        n = "shift" == t || "alt" == t || "ctrl" == t || "Windows Key / Left ⌘ / Chromebook Search key" == t || "Windows Menu / Right ⌘" == t || "right window key" == t;
        return {
            shift: e.shiftKey,
            optionOrAlt: e.altKey,
            control: e.ctrlKey,
            meta: e.metaKey,
            keyCode: e.keyCode,
            modifierOnly: n
        }
    }
    hotkeyInfoToText(e) {
        var t = [],
        n = KeyCodes[e.keyCode] || "none";
        return e.meta && (Global.isMac() ? t.push("Cmd") : t.push("Win")),
        e.control && t.push("Ctrl"),
        e.optionOrAlt && t.push("Alt"),
        e.shift && t.push("Shift"),
        e.modifierOnly || t.push(n.toUpperCase()),
        t.join("+")
    }
    safeParseHotkey(e) {
        if (!e) return {
            keyCode: 220
        };
        try {
            return JSON.parse(e)
        } catch(e) {
            return {
                keyCode: 220
            }
        }
    }
    match(e, t) {
        return e.metaKey === t.meta && e.ctrlKey === t.control && e.shiftKey === t.shift && e.altKey === t.optionOrAlt && e.keyCode === t.keyCode
    }
}

export default HotkeyInfo