import _ from 'lodash';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BlockHelper from '../Elements/BlockHelper';
import DefaultSequenceShortcuts from './DefaultSequenceShortcuts';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import Global from '../Global';
import HotkeyInfoHelper from './HotkeyInfoHelper';
import TextUtils from '../Editor/TextUtils';

/// xxx(1654) /*ShortcutMatcher*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var C = n(2)/*lodash*/;  // 2 times
/// var x = n.n(C);
/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var w = n(36)/*TextUtils*/;  // 2 times
/// var k = n(6)/*DiagramIdHelper*/;  // 2 times
/// var ee = n(11)/*Global*/;  // 1 times
/// var ne = n(43)/*ArrayHelper*/;  // 2 times
/// var DefaultSequenceShortcuts = n(1653)/*DefaultSequenceShortcuts*/;  // 1 times
/// var HotkeyInfoHelper = n(1655)/*HotkeyInfoHelper*/;  // 3 times
class ShortcutMatcher {
    constructor() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.useDefault = e;
        this.defaultSequenceShortcuts = null;
    }
    isShorcutDuplicate(e) {
        var t = e.shortcut;
        if ("char-sequence" == t.type) {
            return !! this.cachedModels.find((n) => {
                return n.id != e.id && ("char-sequence" == n.shortcut.type && (n.shortcut.sequence.includes(t.sequence) || t.sequence.includes(n.shortcut.sequence)));
            });
        }
        var n = HotkeyInfoHelper.constructModifierHashForShorctut(t);
        return !! this.cachedModels.find((r) => {
            if (r.id === e.id) {
                return false;
            }
            if ("hot-key" != r.shortcut.type) {
                return false;
            }
            var a = HotkeyInfoHelper.constructModifierHashForShorctut(r.shortcut);
            return n === a && (r.shortcut.keyCode === t.keyCode && (!r.shortcut.secondKeyCode || !t.secondKeyCode || r.shortcut.secondKeyCode === t.secondKeyCode));
        });
    }
    initDefault() {
        if (!this.defaultSequenceShortcuts) {
            console.log("init default shorcuts");
            this.defaultSequenceShortcuts = DefaultSequenceShortcuts.get();
        }
    }
    matchSequenceByInsertedOneChar(e, t, n) {
        if (!this.analyzedInfo) {
            return null;
        }
        var r = this.analyzedInfo.charRootMap;
        var a = n;
        var i = t;
        for (; a >= 0;) {
            var o = r[i];
            if (!o) {
                return null;
            }
            if (o.data) {
                return {
                    data: this.cloneAndAssignIdReturnData(o.data),
                    replacementInfo: o.replacementInfo
                };
            }
            if (!o.nextMap) {
                return null;
            }
            if (r = o.nextMap, --a < 0) {
                break;
            }
            i = e.clusterAt(a);
        }
        return null;
    }
    cloneAndAssignIdReturnData(e) {
        var t = _.cloneDeep(e.textModeLine);
        DiagramIdHelper.assignIdsForLine(t);
        var n = _.cloneDeep(e.mathModeLine);
        DiagramIdHelper.assignIdsForLine(n);
        return _.assignIn({},
        e, {
            textModeLine: t,
            mathModeLine: n
        });
    }
    matchSequence(e, t, n) {
        if (!this.analyzedInfo) {
            return null;
        }
        var r = this.analyzedInfo.charRootMap;
        var a = n;
        for (; a >= 0; a--) {
            var i = r[a >= e.length ? t.clusterAt(a - e.length) : e.clusterAt(a)];
            if (!i) {
                return null;
            }
            if (i.data) {
                return {
                    data: this.cloneAndAssignIdReturnData(i.data),
                    replacementInfo: i.replacementInfo
                };
            }
            if (!i.nextMap) {
                return null;
            }
            r = i.nextMap;
        }
        return null;
    }
    anyModifierOn(e) {
        return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    }
    matchHotkey(e, t) {
        if (!this.analyzedInfo) {
            return null;
        }
        if (!this.anyModifierOn(e)) {
            return null;
        }
        if (t) {
            var n = this.findKeyCode(t.hotkeyInfo);
            var r = this.constructModifierHash(t.hotkeyInfo);
            var a = this.constructModifierHash(e);
            if (n && r === a && n.secondMap[e.keyCode]) {
                return {
                    type: "found-matched",
                    data: this.cloneAndAssignIdReturnData(n.secondMap[e.keyCode].data),
                    replacementInfo: n.secondMap[e.keyCode].replacementInfo
                };
            }
        }
        var i = this.findKeyCode(e);
        return i ? i.data ? {
            type: "found-matched",
            data: this.cloneAndAssignIdReturnData(i.data),
            replacementInfo: i.replacementInfo
        } : {
            type: "first-matched",
            hotkeyInfo: {
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey,
                keyCode: e.keyCode
            }
        } : null;
    }
    findKeyCode(e) {
        var t = this.constructModifierHash(e);
        if (0 === t) {
            return null;
        }
        var n = this.analyzedInfo.modifierMap[t];
        return n ? n.keyCodeMap[e.keyCode] : null;
    }
    getAnalyzedInfo() {
        return this.analyzedInfo;
    }
    setShortcutModels(e) {
        if (!Global.inNodeEnv() && this.useDefault) {
            this.initDefault();
        } else {
            this.defaultSequenceShortcuts = [];
        }
        if (this.cachedModels != e) {
            this.cachedModels = e;
            this.analyze(e);
        }
    }
    analyze(e) {
        console.log("run analyze");
        e = this.defaultSequenceShortcuts.concat(e);
        this.analyzedInfo = {
            charRootMap: this.analyzeCharSequenceModels(e),
            modifierMap: this.analyzeHotkeyModels(e)
        };
    }
    findOrCreateMatch(e, t, n, r) {
        var a = e.clusterAt(t);
        if (a) {
            if (r[a] = r[a] || {
                char: a
            },
            t <= 0) {
                r[a].data = n;
                var i = n.shortcut;
                r[a].replacementInfo = this.buildReplacementInfo(n, TextUtils.length(i.sequence));
            } else {
                r[a].nextMap = r[a].nextMap || {};
                this.findOrCreateMatch(e, t - 1, n, r[a].nextMap);
            }
        }
    }
    analyzeCharSequenceModels(e) {
        var t = {};
        return e.forEach((e) => {
            if ("char-sequence" == e.shortcut.type) {
                var n = TextUtils.getUnistringUncached(e.shortcut.sequence);
                this.findOrCreateMatch(n, n.length - 1, e, t);
            }
        }),
        t;
    }
    analyzeHotkeyModels(e) {
        var t = {};
        return e.forEach((e) => {
            if ("hot-key" == e.shortcut.type) {
                this.analyzeHotKeyModel(e.shortcut, e, t);
            }
        }),
        t;
    }
    analyzeHotKeyModel(e, t, n) {
        var r = HotkeyInfoHelper.constructModifierHashForShorctut(e);
        n[r] = n[r] || {
            modifierHash: r,
            keyCodeMap: {}
        };
        var a = n[r].keyCodeMap;
        if (a[e.keyCode] = a[e.keyCode] || {
            keyCode: e.keyCode
        },
        !e.secondKeyCode) {
            return a[e.keyCode].data = t,
            void(a[e.keyCode].replacementInfo = this.buildReplacementInfo(t, 0));
        }
        var i = a[e.keyCode];
        i.secondMap = i.secondMap || {};
        i.secondMap[e.secondKeyCode] = i.secondMap[e.secondKeyCode] || {
            keyCode: e.secondKeyCode,
            data: t
        };
        i.secondMap[e.secondKeyCode].data = t;
        i.secondMap[e.secondKeyCode].replacementInfo = this.buildReplacementInfo(t, 0);
    }
    buildReplacementInfo(e, t) {
        var n = e.textModeLine && e.textModeLine.blocks || ArrayHelper.emptyArr;
        var r = e.mathModeLine && e.mathModeLine.blocks || ArrayHelper.emptyArr;
        return {
            deletedCount: t,
            textModeInsertedCount: BlockHelper.getTotalChar(n),
            mathModeInsertedCount: BlockHelper.getTotalChar(r),
            singleTextModeTextOnly: 1 === n.length && n[0].type == null && !n[0].style,
            singleMathModeTextOnly: 1 === r.length && r[0].type == null && !r[0].style
        };
    }
    constructModifierHash(e) {
        var t = 0;
        e.ctrlKey && (t = t | 1);
        e.metaKey && (t = t | 2);
        e.altKey && (t = t | 4);
        e.shiftKey && (t = t | 8);
        return t;
    }
}
/*n.d(t, "a", function () {
    return ShortcutMatcher;
})*/

export default ShortcutMatcher